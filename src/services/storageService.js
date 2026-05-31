import { dbService } from './supabase.js';
import appStore from '../store/appStore.js';
import { analyticsService } from './analyticsService.js';
import { notificationService } from './notificationService.js';

export const storageService = {
    // Load student progress from database/local
    async loadProgress(userId) {
        if (!userId) return null;
        try {
            // Try fetching from Firestore/Mock db
            const cloudProgress = await dbService.getDoc('progress', userId);
            
            let progressData;
            if (cloudProgress) {
                progressData = cloudProgress;
            } else {
                // Fallback to localstorage or default empty progress
                const local = localStorage.getItem(`menassaty_progress_${userId}`);
                if (local) {
                    progressData = JSON.parse(local);
                } else {
                    progressData = {
                        enrolledCourses: ['course-math-sec3', 'course-physics-sec3'], // Default enrolled courses
                        completedLessons: {
                            'course-math-sec3': ['c1-l1']
                        },
                        passedQuizzes: [],
                        favoriteCourses: [],
                        lastActivity: null
                    };
                }
                // Save default initial to database
                await dbService.setDoc('progress', userId, progressData);
            }
            
            // Sync to local storage & store
            localStorage.setItem(`menassaty_progress_${userId}`, JSON.stringify(progressData));
            appStore.setProgress(progressData);
            
            // Also load notifications
            await notificationService.loadNotifications(userId);

            return progressData;
        } catch (error) {
            console.error("Error loading progress:", error);
            return null;
        }
    },

    // Save progress to database/local
    async saveProgress(userId, updatedProgress) {
        if (!userId) return;
        try {
            // Update Store
            appStore.setProgress(updatedProgress);
            
            // Update LocalStorage
            localStorage.setItem(`menassaty_progress_${userId}`, JSON.stringify(updatedProgress));
            
            // Update Cloud Firestore
            await dbService.setDoc('progress', userId, updatedProgress);
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    },

    // Course enrollment action
    async enrollInCourse(courseId) {
        const user = appStore.getState().user;
        if (!user) {
            notificationService.addNotification('warning', 'يرجى تسجيل الدخول', 'سجل دخولك أولاً لتتمكن من الالتحاق بالمنهج التعليمي.');
            return false;
        }

        const progress = { ...appStore.getState().progress };
        if (!progress.enrolledCourses.includes(courseId)) {
            progress.enrolledCourses = [...progress.enrolledCourses, courseId];
            if (!progress.completedLessons[courseId]) {
                progress.completedLessons[courseId] = [];
            }
            progress.lastActivity = {
                timestamp: new Date().toISOString(),
                action: 'enroll',
                courseId
            };

            await this.saveProgress(user.uid, progress);
            
            // Logs
            await analyticsService.trackEnrollment(courseId);
            notificationService.addNotification(
                'success', 
                'التحاق ناجح بالدورة', 
                'تهانينا! لقد تم تسجيلك في الدورة بنجاح. نتمنى لك رحلة ممتعة 🎓'
            );
            return true;
        }
        return true;
    },

    // Lesson complete toggle
    async markLessonComplete(courseId, lessonId, lessonTitle) {
        const user = appStore.getState().user;
        if (!user) return;

        const progress = { ...appStore.getState().progress };
        if (!progress.completedLessons[courseId]) {
            progress.completedLessons[courseId] = [];
        }

        if (!progress.completedLessons[courseId].includes(lessonId)) {
            progress.completedLessons[courseId] = [...progress.completedLessons[courseId], lessonId];
            progress.lastActivity = {
                timestamp: new Date().toISOString(),
                action: 'lesson_complete',
                courseId,
                lessonId
            };

            await this.saveProgress(user.uid, progress);
            await analyticsService.trackLessonComplete(courseId, lessonId);
            
            notificationService.addNotification(
                'success', 
                'درس مكتمل!', 
                `أحسنت! أكملت بنجاح مذاكرة: "${lessonTitle}" 🚀`
            );
        }
    },

    async unmarkLessonComplete(courseId, lessonId) {
        const user = appStore.getState().user;
        if (!user) return;

        const progress = { ...appStore.getState().progress };
        if (progress.completedLessons[courseId]) {
            progress.completedLessons[courseId] = progress.completedLessons[courseId].filter(id => id !== lessonId);
            progress.lastActivity = {
                timestamp: new Date().toISOString(),
                action: 'lesson_uncomplete',
                courseId,
                lessonId
            };

            await this.saveProgress(user.uid, progress);
        }
    },

    // Pass Quiz
    async passQuiz(courseId, quizTitle, score) {
        const user = appStore.getState().user;
        if (!user) return;

        const progress = { ...appStore.getState().progress };
        if (!progress.passedQuizzes.includes(courseId)) {
            progress.passedQuizzes = [...progress.passedQuizzes, courseId];
            progress.lastActivity = {
                timestamp: new Date().toISOString(),
                action: 'quiz_pass',
                courseId,
                score
            };

            await this.saveProgress(user.uid, progress);
            await analyticsService.trackQuizPassed(courseId, score);

            notificationService.addNotification(
                'success', 
                'اجتياز الامتحان بنجاح!', 
                `تهانينا الحارة! لقد تفوقت في اختبار: "${quizTitle}" وحصلت على ${score}%! 🏆`
            );
        }
    },

    // Favorite toggle
    async toggleFavorite(courseId, courseTitle) {
        const user = appStore.getState().user;
        if (!user) {
            notificationService.addNotification('warning', 'يرجى تسجيل الدخول', 'سجل دخولك أولاً لتتمكن من إضافة المناهج للمفضلة.');
            return;
        }

        const progress = { ...appStore.getState().progress };
        const favorites = progress.favoriteCourses || [];
        
        let isFav = false;
        if (favorites.includes(courseId)) {
            progress.favoriteCourses = favorites.filter(id => id !== courseId);
            notificationService.addNotification('info', 'إزالة من المفضلة', `تم إزالة مادة "${courseTitle}" من قائمة المفضلة.`);
        } else {
            progress.favoriteCourses = [...favorites, courseId];
            isFav = true;
            notificationService.addNotification('success', 'أضيف للمفضلة', `تم إضافة مادة "${courseTitle}" لقائمة المفضلة بنجاح 💖`);
        }

        progress.lastActivity = {
            timestamp: new Date().toISOString(),
            action: isFav ? 'favorite_add' : 'favorite_remove',
            courseId
        };

        await this.saveProgress(user.uid, progress);
    }
};

export default storageService;
