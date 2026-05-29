/* ==========================================================================
   Menassaty Main Controller (app.js)
   SPA Orchestrator, State Manager & Toast Alert System
   ========================================================================== */

import { initLandingPage } from './components/LandingPage.js';
import { initDashboard } from './components/Dashboard.js';
import { initCoursePlayer } from './components/CoursePlayer.js';

// 1. Initial Default State
const DEFAULT_STATE = {
    theme: 'light',
    currentRoute: 'landing', // 'landing', 'dashboard', 'classroom'
    activeCourseId: null,
    user: {
        name: 'م. محمد السالم',
        email: 'mohamed.developer@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100'
    },
    enrolledCourses: ['course-1'], // Mohamed is enrolled in course 1 by default to show progress
    completedLessons: {
        'course-1': ['c1-l1', 'c1-l2'] // Defaults to show some progress in the first course
    },
    passedQuizzes: []
};

let state = { ...DEFAULT_STATE };

// 2. Local Storage Syncing
function loadState() {
    const saved = localStorage.getItem('menassaty_state');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            console.error("Error loading saved state, resetting...", e);
            state = { ...DEFAULT_STATE };
        }
    }
}

function saveState() {
    localStorage.setItem('menassaty_state', JSON.stringify(state));
}

// 3. Central Actions definitions
const actions = {
    // Theme Management
    toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme();
        saveState();
        actions.showToast(
            state.theme === 'dark' ? 'تم تفعيل الوضع الليلي الهادئ 🌙' : 'تم تفعيل الوضع النهاري المشرق ☀️',
            'success'
        );
        renderCurrentRoute();
    },

    // Navigation and SPA Routing
    navigate(route) {
        state.currentRoute = route;
        if (route !== 'classroom') {
            state.activeCourseId = null;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        saveState();
        renderCurrentRoute();
    },

    // Course Enrollment Flow
    enrollInCourse(courseId) {
        if (!state.enrolledCourses.includes(courseId)) {
            state.enrolledCourses.push(courseId);
            state.completedLessons[courseId] = [];
            saveState();
            actions.showToast("تهانينا! لقد تم تسجيلك في الدورة بنجاح. نتمنى لك رحلة ممتعة 🎓", "success");
            // Navigate to Dashboard to let them see their active courses
            setTimeout(() => {
                actions.navigate('dashboard');
            }, 1200);
        } else {
            actions.openCoursePlayer(courseId);
        }
    },

    // Open Specific course classroom
    openCoursePlayer(courseId) {
        state.activeCourseId = courseId;
        state.currentRoute = 'classroom';
        saveState();
        renderCurrentRoute();
    },

    // Course Progress Actions
    markLessonComplete(courseId, lessonId) {
        if (!state.completedLessons[courseId]) {
            state.completedLessons[courseId] = [];
        }
        if (!state.completedLessons[courseId].includes(lessonId)) {
            state.completedLessons[courseId].push(lessonId);
            saveState();
            actions.showToast("أحسنت! تم تحديد الدرس كمكتمل وبطل التميز يتقدم 🚀", "success");
        }
    },

    unmarkLessonComplete(courseId, lessonId) {
        if (state.completedLessons[courseId]) {
            state.completedLessons[courseId] = state.completedLessons[courseId].filter(id => id !== lessonId);
            saveState();
            actions.showToast("تم إزالة تحديد الدرس من قائمة الاكتمال.", "success");
        }
    },

    // Quizzes Achievements
    passQuiz(courseId) {
        if (!state.passedQuizzes.includes(courseId)) {
            state.passedQuizzes.push(courseId);
            saveState();
        }
    },

    // Toast alert triggers
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} glass-panel`;
        
        const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Slide out after 3.5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    }
};

// 4. Page Rendering Manager
const appContainer = document.getElementById('app');

function renderCurrentRoute() {
    if (!appContainer) return;
    
    // Clear dynamic grids before changing routes
    appContainer.innerHTML = '';

    switch (state.currentRoute) {
        case 'landing':
            initLandingPage(appContainer, state, actions);
            break;
            
        case 'dashboard':
            initDashboard(appContainer, state, actions);
            break;
            
        case 'classroom':
            if (state.activeCourseId) {
                initCoursePlayer(appContainer, state, actions, state.activeCourseId);
            } else {
                actions.navigate('dashboard');
            }
            break;
            
        default:
            actions.navigate('landing');
    }
}

// 5. Apply Theme Utility
function applyTheme() {
    document.body.className = state.theme === 'dark' ? 'dark-theme' : 'light-theme';
}

// 6. Application Initializer
function init() {
    loadState();
    applyTheme();
    renderCurrentRoute();

    // Subtle header scrolling effect for Landing page sticky header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                // If we want it totally transparent at the absolute top, but scrolled has better visibility
                // Let's keep it scrolled for uniform glass aesthetics!
            }
        }
    });
}

// Fire up!
document.addEventListener('DOMContentLoaded', init);
init(); // Back-up execution in case DOM already loaded
