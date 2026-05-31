import routes from './routes.js';
import appStore from '../store/appStore.js';
import { analyticsService } from '../services/analyticsService.js';

// Lazy loading views to optimize bundle sizes
let initLandingPage, initDashboard, initCoursePlayer, initAdminDashboard, initAuth, initProfile;

export const router = {
    // Navigate to a new route
    async navigate(route, params = {}) {
        const user = appStore.getState().user;
        const routeConfig = routes[route];

        if (!routeConfig) {
            console.error(`Route "${route}" not found. Redirecting to landing.`);
            return this.navigate('landing');
        }

        // 1. Guard check: Requires auth but user is guest
        if (routeConfig.requiresAuth && !user) {
            appStore.setState({ redirectAfterAuth: { route, params } });
            return this.navigate('auth');
        }

        // 2. Guard check: Requires guest but user is logged in
        if (routeConfig.requiresGuest && user) {
            return this.navigate('dashboard');
        }

        // 3. Guard check: Requires instructor/admin
        if (routeConfig.requiresInstructor) {
            const role = user ? user.role : 'student';
            if (role !== 'admin' && role !== 'instructor') {
                console.warn("Unauthorized access attempt to admin panel by student.");
                return this.navigate('dashboard');
            }
        }

        // Set document title
        document.title = routeConfig.title;

        // Save navigation in app state
        appStore.setState({ 
            currentRoute: route,
            activeRouteParams: params 
        });

        // Track page view
        analyticsService.trackView(route);

        // Render page
        await this.render();
    },

    // Render current active route
    async render() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        const state = appStore.getState();
        const route = state.currentRoute;
        const params = state.activeRouteParams || {};

        appContainer.innerHTML = ''; // Clear DOM

        try {
            switch (route) {
                case 'landing':
                    if (!initLandingPage) {
                        const m = await import('../pages/LandingPage.js');
                        initLandingPage = m.initLandingPage;
                    }
                    initLandingPage(appContainer, state, router);
                    break;
                case 'dashboard':
                    if (!initDashboard) {
                        const m = await import('../pages/Dashboard.js');
                        initDashboard = m.initDashboard;
                    }
                    initDashboard(appContainer, state, router);
                    break;
                case 'classroom':
                    if (!initCoursePlayer) {
                        const m = await import('../pages/CoursePlayer.js');
                        initCoursePlayer = m.initCoursePlayer;
                    }
                    initCoursePlayer(appContainer, state, router, params.courseId);
                    break;
                case 'admin':
                    if (!initAdminDashboard) {
                        const m = await import('../pages/AdminDashboard.js');
                        initAdminDashboard = m.initAdminDashboard;
                    }
                    initAdminDashboard(appContainer, state, router);
                    break;
                case 'auth':
                    if (!initAuth) {
                        const m = await import('../pages/Auth.js');
                        initAuth = m.initAuth;
                    }
                    initAuth(appContainer, state, router);
                    break;
                case 'profile':
                    if (!initProfile) {
                        const m = await import('../pages/Profile.js');
                        initProfile = m.initProfile;
                    }
                    initProfile(appContainer, state, router);
                    break;
                default:
                    console.error("Unknown route, rendering landing page");
                    this.navigate('landing');
            }
        } catch (error) {
            console.error("Rendering error on route change:", error);
            appContainer.innerHTML = `
                <div class="glass-panel" style="padding: 4rem; text-align: center; max-width: 500px; margin: 6rem auto; border: 1px solid var(--card-border); border-radius: var(--radius-lg);">
                    <h2 style="color:var(--secondary); margin-bottom:1rem; font-weight:800;">حدث خطأ في تحميل الصفحة</h2>
                    <p style="color:var(--text-secondary); margin-bottom:2rem; line-height: 1.7;">الرجاء إعادة تحميل الصفحة أو العودة للرئيسية.</p>
                    <button class="btn-primary" id="router-error-btn">العودة للرئيسية</button>
                </div>
            `;
            document.getElementById('router-error-btn')?.addEventListener('click', () => {
                this.navigate('landing');
            });
        }
    }
};

export default router;
