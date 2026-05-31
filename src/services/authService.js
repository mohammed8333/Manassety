import { localDBService as dbService } from './localDBService.js';
import appStore from '../store/appStore.js';
import { notificationService } from './notificationService.js';

export const authService = {
    // Check if user is logged in and restore state
    init() {
        return new Promise((resolve) => {
            try {
                const sessionStr = localStorage.getItem('menassaty_session');
                if (sessionStr) {
                    const session = JSON.parse(sessionStr);
                    if (session && session.uid) {
                        // Fetch latest user details from local db
                        dbService.getDoc('users', session.uid).then(async (userData) => {
                            if (userData) {
                                appStore.setUser(userData);
                                
                                // Dynamically import storageService to fetch progress on login
                                const { storageService } = await import('./storageService.js');
                                await storageService.loadProgress(userData.uid);
                                
                                resolve(userData);
                            } else {
                                // Session is invalid, clear it
                                localStorage.removeItem('menassaty_session');
                                appStore.reset();
                                resolve(null);
                            }
                        }).catch(err => {
                            console.error("Error loading user profile on init:", err);
                            appStore.reset();
                            resolve(null);
                        });
                    } else {
                        appStore.reset();
                        resolve(null);
                    }
                } else {
                    appStore.reset();
                    resolve(null);
                }
            } catch (e) {
                console.error("Failed to restore session:", e);
                appStore.reset();
                resolve(null);
            }
        });
    },

    // Login
    async login(email, password) {
        // Fetch local registered users convenience map
        const localUsers = JSON.parse(localStorage.getItem('menassaty_local_users')) || {};
        const user = localUsers[email.toLowerCase().trim()];
        
        if (!user || user.password !== password) {
            throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.");
        }
        
        const userData = {
            uid: user.uid,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
        };

        // Save session
        localStorage.setItem('menassaty_session', JSON.stringify({ uid: user.uid, email: user.email }));
        appStore.setUser(userData);
        
        // Load progress
        const { storageService } = await import('./storageService.js');
        await storageService.loadProgress(user.uid);

        // Push login notification
        notificationService.addNotification(
            'success', 
            'تسجيل دخول ناجح', 
            `مرحباً بك مجدداً يا ${userData.name}! سعداء بوجودك اليوم في منصتي.`
        );

        return userData;
    },

    // Register
    async register(email, password, name, role = 'student') {
        const localUsers = JSON.parse(localStorage.getItem('menassaty_local_users')) || {};
        const cleanEmail = email.toLowerCase().trim();
        
        if (localUsers[cleanEmail]) {
            throw new Error("البريد الإلكتروني هذا مسجل بالفعل لدينا. جرب تسجيل الدخول.");
        }

        const uid = 'user-' + Math.random().toString(36).substr(2, 9);
        const userData = {
            uid,
            email: cleanEmail,
            password, // Store password locally for validation
            name,
            role,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
        };

        const initialProgress = {
            enrolledCourses: [],
            completedLessons: {},
            passedQuizzes: [],
            favoriteCourses: [],
            lastActivity: { timestamp: new Date().toISOString(), action: 'register' }
        };

        // Save profile in local database
        await dbService.setDoc('users', uid, userData);
        await dbService.setDoc('progress', uid, initialProgress);

        // Save session
        localStorage.setItem('menassaty_session', JSON.stringify({ uid, email: cleanEmail }));
        
        appStore.setUser(userData);
        appStore.setProgress(initialProgress);

        notificationService.addNotification(
            'success',
            'مرحباً بك في منصتي!',
            `تهانينا ${name} على إنشاء حسابك التعليمي الجديد. ابدأ رحلة التفوق والدرجات النهائية الآن!`
        );

        return userData;
    },

    // Logout
    async logout() {
        localStorage.removeItem('menassaty_session');
        appStore.reset();
    },

    // Password Reset
    async resetPassword(email) {
        const localUsers = JSON.parse(localStorage.getItem('menassaty_local_users')) || {};
        const user = localUsers[email.toLowerCase().trim()];
        
        if (!user) {
            throw new Error("البريد الإلكتروني هذا غير مسجل لدينا في المنصة.");
        }

        // Mock password reset
        notificationService.addNotification(
            'info',
            'إعادة تعيين كلمة المرور',
            `تم إرسال رابط إعادة تعيين كلمة المرور بنجاح إلى بريدك الإلكتروني: ${email}.`
        );
        return true;
    },

    // Check if user is admin
    isAdmin() {
        const user = appStore.getState().user;
        return user && user.role === 'admin';
    },

    // Check if user is instructor
    isInstructor() {
        const user = appStore.getState().user;
        return user && (user.role === 'instructor' || user.role === 'admin');
    }
};

export default authService;

