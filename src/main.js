/* ==========================================================================
   Menassaty Educational Platform - Main Entry Point (main.js)
   Orchestrates Auth session, Courses loading, Theme, and custom SPA Router
   ========================================================================== */

import './index.css';
import { authService } from './services/authService.js';
import { courseService } from './services/courseService.js';
import { router } from './router/router.js';
import appStore from './store/appStore.js';

// Application Initializer
async function bootstrap() {
    console.log("Bootstrapping Menassaty SPA Platform...");

    try {
        // 1. Initialize the authentication state (restore session)
        const user = await authService.init();
        console.log("Session verified. Active User:", user ? user.email : "Guest");

        // 2. Load the courses database (sync with Firestore/Mock database)
        await courseService.loadCourses();
        console.log("Courses successfully loaded and cached.");

        // 3. Boot up the user interface based on current state route
        const state = appStore.getState();
        
        // Restore theme
        const savedTheme = state.theme || 'light';
        document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';

        // Navigate to current active route (default to landing)
        const activeRoute = state.currentRoute || 'landing';
        const params = state.activeRouteParams || {};
        
        await router.navigate(activeRoute, params);
        console.log(`Navigated to active route: "${activeRoute}"`);

    } catch (error) {
        console.error("Critical failure during SPA bootstrap:", error);
    }
}

// Subtle header scroll effect for Landing Page sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Keep transparent/scrolled transition uniform
        }
    }
});

// Boot up!
document.addEventListener('DOMContentLoaded', bootstrap);
bootstrap(); // Back-up execution in case DOM loaded already
