import { courses as initialCourses } from '../data/coursesData.js';

// Central app store state
let state = {
    user: null, // Logged in user details (uid, name, email, role, avatar)
    theme: 'light', // 'light' or 'dark'
    courses: [...initialCourses], // All available courses (original + user added)
    progress: {
        enrolledCourses: [], // courseIds
        completedLessons: {}, // { courseId: [lessonIds] }
        passedQuizzes: [], // courseIds
        favoriteCourses: [], // courseIds
        lastActivity: null // { timestamp, action, courseId }
    },
    notifications: [] // Notification list { id, type, title, message, date, read }
};

// Event listeners to notify when state changes
const listeners = new Set();

export const appStore = {
    getState() {
        return state;
    },
    
    // Subscribe to state changes
    subscribe(listener) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
    
    // Notify all listeners
    notify() {
        listeners.forEach(listener => listener(appStore.getState()));
    },
    
    // Update specific parts of state
    setState(newState) {
        state = { ...state, ...newState };
        appStore.notify();
    },

    // Set User
    setUser(user) {
        state.user = user;
        appStore.notify();
    },

    // Theme Actions
    setTheme(theme) {
        state.theme = theme;
        appStore.notify();
    },

    // Course Actions
    setCourses(courses) {
        state.courses = courses;
        appStore.notify();
    },

    // Progress Actions
    setProgress(progress) {
        state.progress = { ...state.progress, ...progress };
        appStore.notify();
    },

    // Notification Actions
    setNotifications(notifications) {
        state.notifications = notifications;
        appStore.notify();
    },
    
    // Reset Store
    reset() {
        state = {
            user: null,
            theme: 'light',
            courses: [...initialCourses],
            progress: {
                enrolledCourses: [],
                completedLessons: {},
                passedQuizzes: [],
                favoriteCourses: [],
                lastActivity: null
            },
            notifications: []
        };
        appStore.notify();
    }
};
export default appStore;
