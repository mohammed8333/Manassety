import { supabase, dbService } from './supabase.js';
import appStore from '../store/appStore.js';
import { notificationService } from './notificationService.js';

export const authService = {
    // Check if user is logged in and restore state
    init() {
        return new Promise((resolve) => {
            supabase.auth.onAuthStateChange(async (event, session) => {
                const user = session?.user || null;
                
                if (user) {
                    try {
                        let userData = {
                            uid: user.id,
                            email: user.email,
                            name: user.user_metadata?.name || user.email.split('@')[0],
                            role: user.user_metadata?.role || 'student',
                            avatar: user.user_metadata?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
                        };

                        // Fetch from dbService (Supabase table users)
                        const cloudData = await dbService.getDoc('users', user.id);

                        if (cloudData) {
                            userData = { ...userData, ...cloudData };
                        } else {
                            // If user details not in users table, save them
                            await dbService.setDoc('users', user.id, userData);
                        }

                        appStore.setUser(userData);
                        
                        // Dynamically import storageService to fetch progress on login
                        const { storageService } = await import('./storageService.js');
                        await storageService.loadProgress(user.id);
                        
                    } catch (error) {
                        console.error("Error fetching user profile:", error);
                        appStore.setUser({
                            uid: user.id,
                            email: user.email,
                            name: user.email.split('@')[0],
                            role: 'student',
                            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
                        });
                    }
                } else {
                    appStore.reset();
                }
                resolve(appStore.getState().user);
            });
        });
    },

    // Login
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        const user = data.user;
        let userData = {
            uid: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email.split('@')[0],
            role: user.user_metadata?.role || 'student',
            avatar: user.user_metadata?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
        };

        const cloudData = await dbService.getDoc('users', user.id);
        if (cloudData) {
            userData = { ...userData, ...cloudData };
        }
        
        appStore.setUser(userData);
        
        // Load progress
        const { storageService } = await import('./storageService.js');
        await storageService.loadProgress(user.id);

        // Push login notification
        notificationService.addNotification(
            'success', 
            'تسجيل دخول ناجح', 
            `مرحباً بك مجدداً يا ${userData.name}! سعداء بوجودك اليوم.`
        );

        return userData;
    },

    // Register
    async register(email, password, name, role = 'student') {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role,
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
                }
            }
        });
        if (error) throw error;

        const user = data.user;
        const userData = {
            uid: user.id,
            email: user.email,
            name: name,
            role: role,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
        };

        // Save profile in database
        await dbService.setDoc('users', user.id, userData);
        await dbService.setDoc('progress', user.id, {
            enrolledCourses: [],
            completedLessons: {},
            passedQuizzes: [],
            favoriteCourses: [],
            lastActivity: { timestamp: new Date().toISOString(), action: 'register' }
        });

        appStore.setUser(userData);
        appStore.setProgress({
            enrolledCourses: [],
            completedLessons: {},
            passedQuizzes: [],
            favoriteCourses: [],
            lastActivity: { timestamp: new Date().toISOString(), action: 'register' }
        });

        notificationService.addNotification(
            'success',
            'مرحباً بك في منصتي!',
            `تهانينا ${name} على إنشاء حسابك التعليمي الجديد. ابدأ رحلة التفوق والدرجات النهائية الآن!`
        );

        return userData;
    },

    // Logout
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        appStore.reset();
    },

    // Password Reset
    async resetPassword(email) {
        // Supabase has resetPasswordForEmail API
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
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
