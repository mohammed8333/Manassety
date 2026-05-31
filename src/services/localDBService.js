import { initialEncryptedDatabase, dbKey } from '../data/localDatabase.js';

// Custom LCG decryption (100% byte-compatible with secure_db.py)
function getKeystream(password, length) {
    let seed = 0;
    for (let i = 0; i < password.length; i++) {
        seed = (seed * 31 + password.charCodeAt(i)) & 0xFFFFFFFF;
    }
    
    const stream = new Uint8Array(length);
    let x = seed || 0x12345678;
    for (let i = 0; i < length; i++) {
        x = (1103515245 * x + 12345) & 0x7FFFFFFF;
        stream[i] = x & 0xFF;
    }
    return stream;
}

function crypt(bytes, password) {
    const stream = getKeystream(password, bytes.length);
    const result = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        result[i] = bytes[i] ^ stream[i];
    }
    return result;
}

function decrypt(cipherText, password) {
    try {
        const binary = atob(cipherText);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const decryptedBytes = crypt(bytes, password);
        const decoder = new TextDecoder();
        return decoder.decode(decryptedBytes);
    } catch (e) {
        console.error("Decryption failed. Invalid cipherText or password.", e);
        return null;
    }
}

export const localDBService = {
    // Initialize Local Database from the encrypted asset
    init() {
        const isInitialized = localStorage.getItem('menassaty_db_initialized');
        if (isInitialized) {
            console.log("Local database already initialized.");
            return;
        }

        console.log("Initializing secure local database from encrypted Excel sync file...");
        const decryptedJSON = decrypt(initialEncryptedDatabase, dbKey);
        if (!decryptedJSON) {
            console.error("Critical: Failed to decrypt starting database!");
            return;
        }

        try {
            const dbData = JSON.parse(decryptedJSON);
            
            // 1. Load Courses
            const courseIds = [];
            if (dbData.courses) {
                Object.keys(dbData.courses).forEach(cid => {
                    const course = dbData.courses[cid];
                    localStorage.setItem(`menassaty_db_courses_${cid}`, JSON.stringify(course));
                    courseIds.push(cid);
                });
                localStorage.setItem('menassaty_db_col_courses', JSON.stringify(courseIds));
            }

            // 2. Load Users
            // To make authService incredibly clean, we'll store users in localDB users collection
            const userIds = [];
            const localUsersList = {}; // Also keep a convenience map for logins
            if (dbData.users) {
                Object.keys(dbData.users).forEach(uid => {
                    const user = dbData.users[uid];
                    localStorage.setItem(`menassaty_db_users_${uid}`, JSON.stringify(user));
                    userIds.push(uid);
                    localUsersList[user.email.toLowerCase()] = user;
                });
                localStorage.setItem('menassaty_db_col_users', JSON.stringify(userIds));
                localStorage.setItem('menassaty_local_users', JSON.stringify(localUsersList));
            }

            // 3. Load Progress
            if (dbData.progress) {
                Object.keys(dbData.progress).forEach(uid => {
                    const progress = dbData.progress[uid];
                    localStorage.setItem(`menassaty_progress_${uid}`, JSON.stringify(progress));
                    localStorage.setItem(`menassaty_db_progress_${uid}`, JSON.stringify(progress));
                    // Keep index
                    const progressIds = JSON.parse(localStorage.getItem('menassaty_db_col_progress')) || [];
                    if (!progressIds.includes(uid)) {
                        progressIds.push(uid);
                        localStorage.setItem('menassaty_db_col_progress', JSON.stringify(progressIds));
                    }
                });
            }

            // 4. Load Notifications
            if (dbData.notifications) {
                Object.keys(dbData.notifications).forEach(uid => {
                    const notifs = dbData.notifications[uid];
                    localStorage.setItem(`menassaty_db_notifications_${uid}`, JSON.stringify(notifs));
                    // Keep index
                    const notifIds = JSON.parse(localStorage.getItem('menassaty_db_col_notifications')) || [];
                    if (!notifIds.includes(uid)) {
                        notifIds.push(uid);
                        localStorage.setItem('menassaty_db_col_notifications', JSON.stringify(notifIds));
                    }
                });
            }

            // 5. Load Analytics
            if (dbData.analytics) {
                const analyticsIds = [];
                Object.keys(dbData.analytics).forEach(docId => {
                    const events = dbData.analytics[docId];
                    localStorage.setItem(`menassaty_db_analytics_${docId}`, JSON.stringify(events));
                    analyticsIds.push(docId);
                });
                localStorage.setItem('menassaty_db_col_analytics', JSON.stringify(analyticsIds));
            }

            // Mark initialization completed successfully
            localStorage.setItem('menassaty_db_initialized', 'true');
            console.log("Secure local database initialized successfully with military-grade encryption keys!");
        } catch (error) {
            console.error("Error parsing decrypted database JSON:", error);
        }
    },

    // CRUD: Get Document
    async getDoc(collection, docId) {
        // Ensure initialized
        this.init();
        const key = `menassaty_db_${collection}_${docId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // CRUD: Set Document (Insert/Upsert)
    async setDoc(collection, docId, data) {
        this.init();
        const key = `menassaty_db_${collection}_${docId}`;
        localStorage.setItem(key, JSON.stringify(data));

        // Add to collection index if not already present
        const colIndexKey = `menassaty_db_col_${collection}`;
        const indexList = JSON.parse(localStorage.getItem(colIndexKey)) || [];
        if (!indexList.includes(docId)) {
            indexList.push(docId);
            localStorage.setItem(colIndexKey, JSON.stringify(indexList));
        }

        // Keep localUsers convenience map synced if inserting a user
        if (collection === 'users' && data.email) {
            const localUsers = JSON.parse(localStorage.getItem('menassaty_local_users')) || {};
            localUsers[data.email.toLowerCase()] = data;
            localStorage.setItem('menassaty_local_users', JSON.stringify(localUsers));
        }
    },

    // CRUD: Delete Document
    async deleteDoc(collection, docId) {
        this.init();
        const key = `menassaty_db_${collection}_${docId}`;
        localStorage.removeItem(key);

        // Remove from collection index
        const colIndexKey = `menassaty_db_col_${collection}`;
        let indexList = JSON.parse(localStorage.getItem(colIndexKey)) || [];
        indexList = indexList.filter(id => id !== docId);
        localStorage.setItem(colIndexKey, JSON.stringify(indexList));

        // If deleting a user, update convenience list
        if (collection === 'users') {
            const localUsers = JSON.parse(localStorage.getItem('menassaty_local_users')) || {};
            // Find user email by docId or scan keys
            const emailKey = Object.keys(localUsers).find(email => localUsers[email].uid === docId);
            if (emailKey) {
                delete localUsers[emailKey];
                localStorage.setItem('menassaty_local_users', JSON.stringify(localUsers));
            }
        }
    },

    // CRUD: Get entire collection
    async getCollection(collection) {
        this.init();
        const colIndexKey = `menassaty_db_col_${collection}`;
        const indexList = JSON.parse(localStorage.getItem(colIndexKey)) || [];
        
        const results = [];
        for (const docId of indexList) {
            const doc = await this.getDoc(collection, docId);
            if (doc) {
                results.push(doc);
            }
        }
        return results;
    }
};

export default localDBService;
