/* ==========================================================================
   Menassaty School Student Dashboard Component
   ========================================================================== */

import { courses } from '../coursesData.js';

export function initDashboard(container, state, actions) {
    
    function calculateCourseProgress(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;
        
        // Count total lessons
        let totalLessons = 0;
        course.chapters.forEach(ch => totalLessons += ch.lessons.length);
        
        if (totalLessons === 0) return 0;
        
        // Count completed lessons in state
        let completedCount = 0;
        course.chapters.forEach(ch => {
            ch.lessons.forEach(l => {
                const isCompleted = state.completedLessons[courseId] && state.completedLessons[courseId].includes(l.id);
                if (isCompleted) completedCount++;
            });
        });
        
        return {
            percentage: Math.round((completedCount / totalLessons) * 100),
            completedCount,
            totalLessons
        };
    }

    function render() {
        const enrolledIds = state.enrolledCourses;
        const enrolledList = courses.filter(c => enrolledIds.includes(c.id));
        
        // Calculate overall stats
        let totalEnrolled = enrolledIds.length;
        let quizzesPassed = state.passedQuizzes.length;
        
        let overallProgress = 0;
        if (totalEnrolled > 0) {
            let sum = 0;
            enrolledIds.forEach(id => {
                sum += calculateCourseProgress(id).percentage || 0;
            });
            overallProgress = Math.round(sum / totalEnrolled);
        }

        // Determine "Resume Course" - the last enrolled course or the one with progress < 100
        let resumeCourse = null;
        let resumeProgress = null;
        if (totalEnrolled > 0) {
            // Find a course that is not 100% completed
            for (let i = enrolledList.length - 1; i >= 0; i--) {
                const prog = calculateCourseProgress(enrolledList[i].id);
                if (prog.percentage < 100) {
                    resumeCourse = enrolledList[i];
                    resumeProgress = prog;
                    break;
                }
            }
            // Fallback to the last course if all are completed or none found
            if (!resumeCourse) {
                resumeCourse = enrolledList[enrolledList.length - 1];
                resumeProgress = calculateCourseProgress(resumeCourse.id);
            }
        }

        container.innerHTML = `
            <div class="dashboard-container">
                <!-- Premium School Dashboard Sidebar -->
                <aside class="dashboard-sidebar glass-panel">
                    <div class="sidebar-logo">
                        <div class="logo-container" style="font-size: 1.3rem;">
                            <div class="logo-icon-wrap" style="width: 38px; height: 38px; font-size: 1rem;">
                                <i class="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span>منصتي المدرسية</span>
                        </div>
                    </div>
                    
                    <ul class="sidebar-menu">
                        <li class="sidebar-item active">
                            <a href="#" id="sidebar-db-link">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span>لوحة التحكم</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" id="sidebar-courses-link">
                                <i class="fa-solid fa-book-open"></i>
                                <span>المواد الدراسية</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" id="sidebar-home-link">
                                <i class="fa-solid fa-house"></i>
                                <span>الصفحة الرئيسية</span>
                            </a>
                        </li>
                    </ul>
                    
                    <div class="sidebar-footer">
                        <div class="user-profile-badge">
                            <img src="${state.user.avatar}" alt="${state.user.name}" class="user-avatar">
                            <div class="user-details">
                                <h4 class="user-name">${state.user.name}</h4>
                                <span class="user-role">${state.user.email}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Dashboard Main Content -->
                <main class="dashboard-content">
                    <header class="dashboard-header">
                        <div class="welcome-msg">
                            <h2>أهلاً بك مجدداً يا ${state.user.name.split(' ')[0]}! 👋</h2>
                            <p>سعداء برؤيتك اليوم. إليك ملخص تقدمك ومذاكرتك المدرسية الحالية.</p>
                        </div>
                        <div class="dashboard-actions">
                            <!-- Theme Toggle inside Dashboard -->
                            <button class="btn-icon" id="dashboard-theme-toggle" title="تغيير المظهر">
                                <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                            </button>
                            <button class="btn-primary" id="explore-more-btn">
                                <i class="fa-solid fa-plus" style="margin-left: 6px;"></i>
                                <span>دراسة مادة جديدة</span>
                            </button>
                        </div>
                    </header>

                    <!-- Stats Row -->
                    <div class="stats-grid">
                        <div class="dashboard-stat-card card-1">
                            <div class="db-stat-details">
                                <h4>المواد المسجل بها</h4>
                                <span class="db-stat-num">${totalEnrolled}</span>
                            </div>
                            <div class="db-stat-icon-wrap">
                                <i class="fa-solid fa-book-bookmark"></i>
                            </div>
                        </div>
                        <div class="dashboard-stat-card card-2">
                            <div class="db-stat-details">
                                <h4>معدل المذاكرة والإكمال</h4>
                                <span class="db-stat-num">${overallProgress}%</span>
                            </div>
                            <div class="db-stat-icon-wrap">
                                <i class="fa-solid fa-chart-line-up"></i>
                            </div>
                        </div>
                        <div class="dashboard-stat-card card-3">
                            <div class="db-stat-details">
                                <h4>اختبارات تم اجتيازها</h4>
                                <span class="db-stat-num">${quizzesPassed}</span>
                            </div>
                            <div class="db-stat-icon-wrap">
                                <i class="fa-solid fa-trophy-star"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Continue Learning Widget -->
                    ${resumeCourse ? `
                        <div class="dashboard-section-title">
                            <i class="fa-solid fa-circle-play" style="color: var(--primary);"></i>
                            <h3>مواصلة المذاكرة</h3>
                        </div>
                        <div class="resume-course-widget glass-panel">
                            <div class="resume-details">
                                <span class="badge badge-primary" style="margin-bottom: 0.75rem;">
                                    ${resumeCourse.categoryAr}
                                </span>
                                <h3>${resumeCourse.title}</h3>
                                <p>المعلم: ${resumeCourse.instructor.name} | تبقت لك ${resumeProgress.totalLessons - resumeProgress.completedCount} حصص لإكمال المنهج بالكامل</p>
                                
                                <div style="display: flex; align-items: center; width: 100%;">
                                    <div class="progress-bar-container">
                                        <div class="progress-bar-fill" style="width: ${resumeProgress.percentage}%;"></div>
                                    </div>
                                    <span class="progress-pct">${resumeProgress.percentage}% مكتمل</span>
                                </div>
                            </div>
                            <button class="btn-primary" id="resume-course-action-btn" data-course-id="${resumeCourse.id}">
                                <span>متابعة المذاكرة</span>
                                <i class="fa-solid fa-play"></i>
                            </button>
                        </div>
                    ` : ''}

                    <!-- Enrolled Courses Grid -->
                    <div class="dashboard-section-title" style="margin-top: 2rem;">
                        <i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i>
                        <h3>موادي الدراسية الحالية</h3>
                    </div>

                    ${totalEnrolled === 0 ? `
                        <!-- Empty State -->
                        <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-xl); margin-top: 1rem;">
                            <div style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                                <i class="fa-solid fa-book-open-reader"></i>
                            </div>
                            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">لا توجد مواد مسجلة بعد</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 480px; margin-left: auto; margin-right: auto;">
                                ابدأ رحلة التفوق والدرجات النهائية اليوم! سجل في أحد موادنا الدراسية المنهجية التفاعلية مجاناً للبدء في تصفح الفصول والدروس وإجراء الكويزات.
                            </p>
                            <button class="btn-primary" id="dashboard-empty-cta">
                                <span>استكشف المواد الدراسية</span>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    ` : `
                        <div class="my-courses-grid">
                            ${enrolledList.map(course => {
                                const prog = calculateCourseProgress(course.id);
                                return `
                                    <div class="db-course-card glass-panel">
                                        <img src="${course.image}" alt="${course.title}" class="db-card-img">
                                        <div class="db-card-info">
                                            <div>
                                                <h4 class="db-card-title">${course.title}</h4>
                                                <div class="db-card-lessons">
                                                    <span>${prog.completedCount} / ${prog.totalLessons} حصص مكتملة</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="db-card-progress-wrap" style="margin-bottom: 0.75rem;">
                                                    <div class="progress-bar-container" style="max-width: 100%; height: 6px;">
                                                        <div class="progress-bar-fill db-card-progress-fill" style="width: ${prog.percentage}%;"></div>
                                                    </div>
                                                    <span class="progress-pct" style="font-size: 0.8rem;">${prog.percentage}%</span>
                                                </div>
                                                <button class="db-card-btn" data-open-course="${course.id}">
                                                    <span>دخول الفصل الدراسي</span>
                                                    <i class="fa-solid fa-chevron-left"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </main>
            </div>
        `;

        setupEventListeners();
    }

    function setupEventListeners() {
        // Theme toggle inside dashboard
        const themeBtn = container.querySelector('#dashboard-theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                actions.toggleTheme();
            });
        }

        // Sidebar link routing
        const sidebarDb = container.querySelector('#sidebar-db-link');
        if (sidebarDb) {
            sidebarDb.addEventListener('click', (e) => {
                e.preventDefault();
                actions.navigate('dashboard');
            });
        }

        const sidebarCourses = container.querySelector('#sidebar-courses-link');
        if (sidebarCourses) {
            sidebarCourses.addEventListener('click', (e) => {
                e.preventDefault();
                actions.navigate('landing');
                // Scroll to courses section on landing
                setTimeout(() => {
                    const sec = document.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
        }

        const sidebarHome = container.querySelector('#sidebar-home-link');
        if (sidebarHome) {
            sidebarHome.addEventListener('click', (e) => {
                e.preventDefault();
                actions.navigate('landing');
            });
        }

        // Explore button in header & empty state
        const exploreBtn = container.querySelector('#explore-more-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                actions.navigate('landing');
                setTimeout(() => {
                    const sec = document.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
        }

        const emptyCta = container.querySelector('#dashboard-empty-cta');
        if (emptyCta) {
            emptyCta.addEventListener('click', () => {
                actions.navigate('landing');
                setTimeout(() => {
                    const sec = document.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
        }

        // Resume Course Widget CTA
        const resumeBtn = container.querySelector('#resume-course-action-btn');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                const courseId = resumeBtn.getAttribute('data-course-id');
                actions.openCoursePlayer(courseId);
            });
        }

        // Entry buttons on course cards
        container.querySelectorAll('[data-open-course]').forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = btn.getAttribute('data-open-course');
                actions.openCoursePlayer(courseId);
            });
        });
    }

    render();
}
