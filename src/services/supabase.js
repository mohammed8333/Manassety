import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
let isRealSupabase = false;

// Custom Mock Database client
class MockDatabase {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('menassaty_supabase_mock')) || {
            users: {},
            courses: {},
            progress: {},
            notifications: {},
            analytics: {}
        };
    }

    _save() {
        localStorage.setItem('menassaty_supabase_mock', JSON.stringify(this.data));
    }

    from(colName) {
        if (!this.data[colName]) {
            this.data[colName] = {};
        }
        const self = this;
        return {
            select(query) {
                return {
                    eq(field, val) {
                        return {
                            async maybeSingle() {
                                const record = self.data[colName][val] || null;
                                return { data: record, error: null };
                            },
                            async single() {
                                const record = self.data[colName][val] || null;
                                if (!record) return { data: null, error: { message: 'Not found' } };
                                return { data: record, error: null };
                            }
                        };
                    },
                    async get() {
                        const docs = Object.keys(self.data[colName] || {}).map(id => ({
                            id,
                            ...self.data[colName][id]
                        }));
                        return { data: docs, error: null };
                    },
                    then(onfulfilled) {
                        const docs = Object.keys(self.data[colName] || {}).map(id => ({
                            id,
                            ...self.data[colName][id]
                        }));
                        onfulfilled({ data: docs, error: null });
                    }
                };
            },
            async upsert(record) {
                const id = record.id;
                if (!id) return { data: null, error: { message: 'id is required' } };
                self.data[colName][id] = { ...self.data[colName][id], ...record };
                self._save();
                return { data: record, error: null };
            },
            update(record) {
                return {
                    eq(field, val) {
                        return {
                            async get() {
                                if (self.data[colName][val]) {
                                    self.data[colName][val] = { ...self.data[colName][val], ...record };
                                    self._save();
                                }
                                return { data: self.data[colName][val], error: null };
                            }
                        };
                    }
                };
            },
            delete() {
                return {
                    eq(field, val) {
                        return {
                            async get() {
                                delete self.data[colName][val];
                                self._save();
                                return { data: null, error: null };
                            }
                        };
                    }
                };
            }
        };
    }
}

// Mock Supabase Auth
class MockSupabaseAuth {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('menassaty_mock_user')) || null;
        this.authStateListeners = [];
    }

    onAuthStateChange(callback) {
        this.authStateListeners.push(callback);
        setTimeout(() => callback('SIGNED_IN', { user: this.currentUser }), 50);
        return {
            data: {
                subscription: {
                    unsubscribe: () => {
                        this.authStateListeners = this.authStateListeners.filter(cb => cb !== callback);
                    }
                }
            }
        };
    }

    _trigger(event, session) {
        this.authStateListeners.forEach(cb => cb(event, session));
    }

    async signUp({ email, password, options }) {
        await new Promise(r => setTimeout(r, 600));
        const users = JSON.parse(localStorage.getItem('menassaty_mock_users')) || {};
        if (users[email]) {
            return { data: null, error: { message: 'البريد الإلكتروني مسجل بالفعل' } };
        }
        const id = 'mock-uid-' + Math.random().toString(36).substr(2, 9);
        const newUser = { id, email, role: 'student', user_metadata: options?.data || {} };
        users[email] = { ...newUser, password };
        localStorage.setItem('menassaty_mock_users', JSON.stringify(users));
        this.currentUser = newUser;
        localStorage.setItem('menassaty_mock_user', JSON.stringify(newUser));
        this._trigger('SIGNED_IN', { user: newUser });
        return { data: { user: newUser }, error: null };
    }

    async signInWithPassword({ email, password }) {
        await new Promise(r => setTimeout(r, 600));
        const users = JSON.parse(localStorage.getItem('menassaty_mock_users')) || {};
        
        // Default admin
        if (!users['admin@menassaty.com']) {
            users['admin@menassaty.com'] = {
                id: 'admin-mock-id',
                email: 'admin@menassaty.com',
                password: 'admin123',
                role: 'admin',
                user_metadata: {
                    name: 'المهندس محمد',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
                }
            };
            localStorage.setItem('menassaty_mock_users', JSON.stringify(users));
        }

        const record = users[email];
        if (!record || record.password !== password) {
            return { data: null, error: { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' } };
        }

        const user = {
            id: record.id,
            email: record.email,
            role: record.role || 'student',
            user_metadata: record.user_metadata || {}
        };
        this.currentUser = user;
        localStorage.setItem('menassaty_mock_user', JSON.stringify(user));
        this._trigger('SIGNED_IN', { user });
        return { data: { user }, error: null };
    }

    async signOut() {
        await new Promise(r => setTimeout(r, 300));
        this.currentUser = null;
        localStorage.removeItem('menassaty_mock_user');
        this._trigger('SIGNED_OUT', null);
        return { error: null };
    }
}

// Initializing Supabase
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl.trim() !== '') {
    try {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
        isRealSupabase = true;
        console.log("Supabase Client SDK successfully connected to Cloud Database.");
    } catch (e) {
        console.error("Supabase SDK connection failed. Falling back to local emulator mock.", e);
        supabase = new MockDatabase();
        supabase.auth = new MockSupabaseAuth();
    }
} else {
    console.log("Initializing premium offline-first Mock Supabase client.");
    supabase = new MockDatabase();
    supabase.auth = new MockSupabaseAuth();
}

// Helper to determine if a Supabase error is a relation missing error (42P01)
function isTableMissingError(error) {
    return error && (error.code === '42P01' || error.message?.includes('relation') && error.message?.includes('does not exist'));
}

// Global local database instance for automatic missing tables fallback
const localFallbackDB = new MockDatabase();

// dbService wraps both Supabase Client and Local Mock DB to keep query signatures uniform
export const dbService = {
    async getDoc(col, docId) {
        if (isRealSupabase) {
            try {
                const { data, error } = await supabase.from(col).select('*').eq('id', docId).maybeSingle();
                if (error) {
                    if (isTableMissingError(error)) {
                        console.warn(`Table "${col}" does not exist in Supabase yet. Falling back to local Mock database.`);
                        return await localFallbackDB.from(col).select('*').eq('id', docId).maybeSingle().then(r => r.data);
                    }
                    console.error(`getDoc error for col "${col}":`, error);
                    return null;
                }
                return data;
            } catch (e) {
                console.error("Supabase doc get exception:", e);
                return null;
            }
        } else {
            const { data } = await supabase.from(col).select('*').eq('id', docId).maybeSingle();
            return data;
        }
    },

    async setDoc(col, docId, data, merge = false) {
        if (isRealSupabase) {
            try {
                const record = { id: docId, ...data };
                const { error } = await supabase.from(col).upsert(record);
                if (error) {
                    if (isTableMissingError(error)) {
                        console.warn(`Table "${col}" does not exist in Supabase yet. Saving to local Mock database.`);
                        return await localFallbackDB.from(col).upsert(record);
                    }
                    throw error;
                }
                return true;
            } catch (e) {
                console.error("Supabase doc set exception:", e);
                throw e;
            }
        } else {
            await supabase.from(col).upsert({ id: docId, ...data });
            return true;
        }
    },

    async updateDoc(col, docId, data) {
        if (isRealSupabase) {
            try {
                const { error } = await supabase.from(col).update(data).eq('id', docId);
                if (error) {
                    if (isTableMissingError(error)) {
                        console.warn(`Table "${col}" does not exist in Supabase yet. Updating in local Mock database.`);
                        return await localFallbackDB.from(col).update(data).eq('id', docId).get();
                    }
                    throw error;
                }
                return true;
            } catch (e) {
                console.error("Supabase doc update exception:", e);
                throw e;
            }
        } else {
            await supabase.from(col).update(data).eq('id', docId).get();
            return true;
        }
    },

    async deleteDoc(col, docId) {
        if (isRealSupabase) {
            try {
                const { error } = await supabase.from(col).delete().eq('id', docId);
                if (error) {
                    if (isTableMissingError(error)) {
                        console.warn(`Table "${col}" does not exist in Supabase yet. Deleting from local Mock database.`);
                        return await localFallbackDB.from(col).delete().eq('id', docId).get();
                    }
                    throw error;
                }
                return true;
            } catch (e) {
                console.error("Supabase doc delete exception:", e);
                throw e;
            }
        } else {
            await supabase.from(col).delete().eq('id', docId).get();
            return true;
        }
    },

    async getCollection(col) {
        if (isRealSupabase) {
            try {
                const { data, error } = await supabase.from(col).select('*');
                if (error) {
                    if (isTableMissingError(error)) {
                        console.warn(`Table "${col}" does not exist in Supabase yet. Pulling all records from local Mock database.`);
                        return await localFallbackDB.from(col).select('*').then(r => r.data);
                    }
                    console.error(`getCollection error for col "${col}":`, error);
                    return [];
                }
                return data || [];
            } catch (e) {
                console.error("Supabase collection get exception:", e);
                return [];
            }
        } else {
            const res = await supabase.from(col).select('*');
            return res.data || [];
        }
    }
};

export { supabase, isRealSupabase };
export default supabase;
