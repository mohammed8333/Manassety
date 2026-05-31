import { courseService } from '../services/courseService.js';
import { storageService } from '../services/storageService.js';
import { authService } from '../services/authService.js';
import appStore from '../store/appStore.js';
import { escapeHTML } from '../utils/xss.js';
import { notificationService } from '../services/notificationService.js';

export function initDashboard(container, state, router) {
    let activeTab = 'home'; // 'home', 'favorites', 'notifications'

    const unsubscribe = appStore.subscribe((newState) => {
        // Redraw on state changes
        if (state !== newState) {
            state = newState;
            render();
        }
    });

    function calculateCourseProgress(courseId) {
        const course = courseService.getCourseById(courseId);
        if (!course) return { percentage: 0, completedCount: 0, totalLessons: 0 };
        
        let totalLessons = 0;
        course.chapters.forEach(ch => totalLessons += ch.lessons.length);
        
        if (totalLessons === 0) return { percentage: 0, completedCount: 0, totalLessons: 0 };
        
        let completedCount = 0;
        course.chapters.forEach(ch => {
            ch.lessons.forEach(l => {
                const isCompleted = state.progress && state.progress.completedLessons && 
                    state.progress.completedLessons[courseId] && 
                    state.progress.completedLessons[courseId].includes(l.id);
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
        const enrolledIds = (state.progress && state.progress.enrolledCourses) || [];
        const enrolledList = state.courses.filter(c => enrolledIds.includes(c.id));
        const favoriteIds = (state.progress && state.progress.favoriteCourses) || [];
        const favoriteList = state.courses.filter(c => favoriteIds.includes(c.id));
        
        // Stats
        const totalEnrolled = enrolledIds.length;
        const quizzesPassed = (state.progress && state.progress.passedQuizzes && state.progress.passedQuizzes.length) || 0;
        
        let overallProgress = 0;
        if (totalEnrolled > 0) {
            let sum = 0;
            enrolledIds.forEach(id => {
                sum += calculateCourseProgress(id).percentage || 0;
            });
            overallProgress = Math.round(sum / totalEnrolled);
        }

        // Resume Course
        let resumeCourse = null;
        let resumeProgress = null;
        if (totalEnrolled > 0) {
            for (let i = enrolledList.length - 1; i >= 0; i--) {
                const prog = calculateCourseProgress(enrolledList[i].id);
                if (prog.percentage < 100) {
                    resumeCourse = enrolledList[i];
                    resumeProgress = prog;
                    break;
                }
            }
            if (!resumeCourse) {
                resumeCourse = enrolledList[enrolledList.length - 1];
                resumeProgress = calculateCourseProgress(resumeCourse.id);
            }
        }

        const isAdmin = authService.isAdmin();
        const isInstructor = authService.isInstructor();

        container.innerHTML = `
            <div class="dashboard-container">
                <!-- Premium School Dashboard Sidebar -->
                <aside class="dashboard-sidebar glass-panel">
                    <div class="sidebar-logo" id="db-logo-btn" style="cursor:pointer;">
                        <div class="logo-container" style="font-size: 1.3rem;">
                            <div class="logo-icon-wrap" style="width: 38px; height: 38px; font-size: 1rem;">
                                <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                            </div>
                            <span>منصتي</span>
                        </div>
                    </div>
                    
                    <ul class="sidebar-menu">
                        <li class="sidebar-item ${activeTab === 'home' ? 'active' : ''}">
                            <a href="#" id="sb-home-link">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span>لوحة التحكم</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${activeTab === 'favorites' ? 'active' : ''}">
                            <a href="#" id="sb-favorites-link">
                                <i class="fa-solid fa-heart"></i>
                                <span>المفضلة</span>
                                ${favoriteIds.length > 0 ? `<span class="badge badge-primary" style="margin-right:auto; padding: 0.15rem 0.4rem; font-size:0.7rem;">${favoriteIds.length}</span>` : ''}
                            </a>
                        </li>
                        <li class="sidebar-item ${activeTab === 'notifications' ? 'active' : ''}">
                            <a href="#" id="sb-notifications-link">
                                <i class="fa-solid fa-bell"></i>
                                <span>الإشعارات</span>
                                ${state.notifications && state.notifications.filter(n=>!n.read).length > 0 ? `
                                    <span class="badge badge-secondary" style="margin-right:auto; padding: 0.15rem 0.4rem; font-size:0.7rem;">
                                        ${state.notifications.filter(n=>!n.read).length}
                                    </span>
                                ` : ''}
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" id="sb-explore-link">
                                <i class="fa-solid fa-book-open"></i>
                                <span>تصفح المناهج</span>
                            </a>
                        </li>
                        ${isInstructor ? `
                            <li class="sidebar-item">
                                <a href="#" id="sb-admin-link">
                                    <i class="fa-solid fa-toolbox"></i>
                                    <span style="color:var(--primary); font-weight:700;">لوحة الإدارة</span>
                                </a>
                            </li>
                        ` : ''}
                        <li class="sidebar-item">
                            <a href="#" id="sb-profile-link">
                                <i class="fa-solid fa-user-gear"></i>
                                <span>الملف الشخصي</span>
                            </a>
                        </li>
                    </ul>
                    
                    <div class="sidebar-footer">
                        <div class="user-profile-badge" id="sidebar-profile-card" style="cursor:pointer;" title="عرض الملف الشخصي">
                            <img src="${escapeHTML(state.user.avatar)}" alt="${escapeHTML(state.user.name)}" class="user-avatar">
                            <div class="user-details">
                                <h4 class="user-name">${escapeHTML(state.user.name)}</h4>
                                <span class="user-role" style="font-size:0.75rem;">${escapeHTML(state.user.email)}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Dashboard Main Content -->
                <main class="dashboard-content">
                    <header class="dashboard-header">
                        <div class="welcome-msg">
                            <h2>أهلاً بك مجدداً يا ${escapeHTML(state.user.name.split(' ')[0])}! 👋</h2>
                            <p>سعداء برؤيتك اليوم. إليك ملخص تقدمك ومذاكرتك المدرسية الحالية.</p>
                        </div>
                        <div class="dashboard-actions">
                            <button class="btn-icon" id="dashboard-theme-toggle" title="تغيير المظهر">
                                <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                            </button>
                            <button class="btn-primary" id="explore-more-btn">
                                <i class="fa-solid fa-plus" style="margin-left: 6px;"></i>
                                <span>دراسة مادة جديدة</span>
                            </button>
                        </div>
                    </header>

                    ${renderTabContent(
                        activeTab, 
                        totalEnrolled, 
                        overallProgress, 
                        quizzesPassed, 
                        resumeCourse, 
                        resumeProgress, 
                        enrolledList, 
                        favoriteList
                    )}
                </main>
            </div>
        `;

        setupEventListeners();
    }

    function renderTabContent(tab, totalEnrolled, overallProgress, quizzesPassed, resumeCourse, resumeProgress, enrolledList, favoriteList) {
        if (tab === 'home') {
            return `
                <!-- Active Grade Level Card Widget -->
                <div class="glass-panel" style="padding: 1.25rem 2rem; border-radius: var(--radius-lg); margin-bottom: 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-color: rgba(99,102,241,0.25);">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="badge badge-primary" style="width: 46px; height: 46px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                            🏫
                        </div>
                        <div>
                            <h4 style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">صفك الدراسي الحالي</h4>
                            <p style="font-size: 0.85rem; color: var(--text-secondary);">${escapeHTML(state.selectedGradeAr)}</p>
                        </div>
                    </div>
                    <button class="btn-secondary" id="change-grade-dashboard-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 8px;">
                        <span>تغيير الصف الدراسي</span>
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                </div>

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
                                ${escapeHTML(resumeCourse.categoryAr)}
                            </span>
                            <h3>${escapeHTML(resumeCourse.title)}</h3>
                            <p>المعلم: ${escapeHTML(resumeCourse.instructor.name)} | تبقت لك ${resumeProgress.totalLessons - resumeProgress.completedCount} حصص لإكمال المنهج بالكامل</p>
                            
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
                                    <img src="${escapeHTML(course.image)}" alt="${escapeHTML(course.title)}" class="db-card-img">
                                    <div class="db-card-info">
                                        <div>
                                            <h4 class="db-card-title">${escapeHTML(course.title)}</h4>
                                            <div class="db-card-lessons" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom: 0.5rem;">
                                                <span>${prog.completedCount} / ${prog.totalLessons} حصص مكتملة</span>
                                                <span class="badge badge-secondary" style="font-size:0.75rem;">${escapeHTML(course.gradeAr)}</span>
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
            `;
        }

        if (tab === 'favorites') {
            return `
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-heart" style="color: var(--secondary);"></i>
                    <h3>مفصلتي الدراسية (المواد المفضلة)</h3>
                </div>

                ${favoriteList.length === 0 ? `
                    <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-xl); margin-top: 1rem;">
                        <div style="font-size: 4.5rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                            <i class="fa-solid fa-heart-crack"></i>
                        </div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">قائمتك المفضلة فارغة</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 480px; margin-left: auto; margin-right: auto;">
                            أضف بعض المناهج الدراسية المهمة أو الصعبة إلى مفضلتك للوصول السريع إليها في أي وقت بالضغط على أيقونة القلب على كارت المادة.
                        </p>
                        <button class="btn-primary" id="db-fav-empty-cta">
                            <span>استكشف المواد الآن</span>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                ` : `
                    <div class="my-courses-grid">
                        ${favoriteList.map(course => {
                            const isEnrolled = enrolledIds.includes(course.id);
                            return `
                                <div class="db-course-card glass-panel">
                                    <img src="${escapeHTML(course.image)}" alt="${escapeHTML(course.title)}" class="db-card-img">
                                    <div class="db-card-info">
                                        <div>
                                            <h4 class="db-card-title">${escapeHTML(course.title)}</h4>
                                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">الأستاذ: ${escapeHTML(course.instructor.name)}</p>
                                        </div>
                                        <div>
                                            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                                                <button class="btn-icon" data-remove-fav="${course.id}" title="إزالة من المفضلة" style="color:var(--secondary); background:rgba(244,63,94,0.1); width:36px; height:36px; border-radius:8px;">
                                                    <i class="fa-solid fa-heart"></i>
                                                </button>
                                                <button class="db-card-btn" data-fav-action="${course.id}" style="flex:1;">
                                                    <span>${isEnrolled ? 'مواصلة المذاكرة' : 'ابدأ الدراسة الآن'}</span>
                                                    <i class="fa-solid fa-chevron-left"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            `;
        }

        if (tab === 'notifications') {
            const list = state.notifications || [];
            return `
                <div class="dashboard-section-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div>
                        <i class="fa-solid fa-bell" style="color: var(--primary);"></i>
                        <h3>إشعارات منصتي التعليمية</h3>
                    </div>
                    ${list.length > 0 ? `<button class="btn-secondary" id="clear-all-notifs-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:8px;">حذف كافة التنبيهات</button>` : ''}
                </div>

                ${list.length === 0 ? `
                    <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-xl); margin-top: 1rem;">
                        <div style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                            <i class="fa-solid fa-bell-slash"></i>
                        </div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">صندوق الإشعارات فارغ</h3>
                        <p style="color: var(--text-secondary); max-width: 480px; margin-left: auto; margin-right: auto;">
                            أنت على اطلاع تام بكافة التحديثات! ستظهر هنا إشعارات إكمال الحصص، اجتياز الكويزات، والتنبيهات المنهجية الجديدة من الإدارة.
                        </p>
                    </div>
                ` : `
                    <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem;">
                        ${list.map(n => `
                            <div class="glass-panel notif-item-card ${n.read ? 'read' : 'unread'}" data-notif-id="${n.id}" style="padding:1.25rem 1.75rem; border-radius:var(--radius-lg); display:flex; gap:1.25rem; align-items:center; position:relative; transition:var(--transition-base); border-right:4px solid ${n.type === 'success' ? 'var(--success)' : n.type === 'warning' ? 'var(--secondary)' : 'var(--primary)'}; background: ${n.read ? 'var(--bg-secondary)' : 'rgba(99,102,241,0.03)'}; cursor:pointer;">
                                <div style="font-size:1.5rem;">
                                    ${n.type === 'success' ? '🏆' : n.type === 'warning' ? '⚠️' : '🔔'}
                                </div>
                                <div style="flex:1;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                                        <h4 style="font-weight:700; color: var(--text-primary); font-size:1.05rem;">${escapeHTML(n.title)}</h4>
                                        <span style="font-size:0.75rem; color:var(--text-muted);">${new Date(n.date).toLocaleDateString('ar-EG', {hour:'2-digit', minute:'2-digit'})}</span>
                                    </div>
                                    <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">${escapeHTML(n.message)}</p>
                                </div>
                                ${!n.read ? `<div style="width:10px; height:10px; border-radius:50%; background:var(--primary); position:absolute; left:20px; top:20px;"></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `}
            `;
        }
    }

    function setupEventListeners() {
        // Theme toggle action
        container.querySelector('#dashboard-theme-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            appStore.setTheme(nextTheme);
            document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
        });

        // Logo click
        container.querySelector('#db-logo-btn')?.addEventListener('click', () => router.navigate('landing'));

        // Change Grade Portal Redirection
        container.querySelector('#change-grade-dashboard-btn')?.addEventListener('click', () => {
            router.navigate('landing');
            setTimeout(() => {
                const sec = document.querySelector('#stages-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        // Sidebar actions
        container.querySelector('#sb-home-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeTab = 'home';
            render();
        });

        container.querySelector('#sb-favorites-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeTab = 'favorites';
            render();
        });

        container.querySelector('#sb-notifications-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeTab = 'notifications';
            render();
        });

        container.querySelector('#sb-explore-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('landing');
            setTimeout(() => {
                const sec = document.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        container.querySelector('#sb-admin-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('admin');
        });

        container.querySelector('#sb-profile-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('profile');
        });

        container.querySelector('#sidebar-profile-card')?.addEventListener('click', () => router.navigate('profile'));

        // Main CTA
        container.querySelector('#explore-more-btn')?.addEventListener('click', () => {
            router.navigate('landing');
            setTimeout(() => {
                const sec = document.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        container.querySelector('#dashboard-empty-cta')?.addEventListener('click', () => {
            router.navigate('landing');
            setTimeout(() => {
                const sec = document.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        container.querySelector('#db-fav-empty-cta')?.addEventListener('click', () => {
            router.navigate('landing');
        });

        // Resume Learning Action
        container.querySelector('#resume-course-action-btn')?.addEventListener('click', (e) => {
            const courseId = e.currentTarget.getAttribute('data-course-id');
            router.navigate('classroom', { courseId });
        });

        // Enter classroom buttons
        container.querySelectorAll('[data-open-course]').forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = btn.getAttribute('data-open-course');
                router.navigate('classroom', { courseId });
            });
        });

        // Fav List action button (enroll or resume)
        container.querySelectorAll('[data-fav-action]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const courseId = btn.getAttribute('data-fav-action');
                const isEnrolled = state.progress && state.progress.enrolledCourses && state.progress.enrolledCourses.includes(courseId);
                if (isEnrolled) {
                    router.navigate('classroom', { courseId });
                } else {
                    const success = await storageService.enrollInCourse(courseId);
                    if (success) {
                        router.navigate('classroom', { courseId });
                    }
                }
            });
        });

        // Remove from Favorites
        container.querySelectorAll('[data-remove-fav]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const courseId = btn.getAttribute('data-remove-fav');
                const course = courseService.getCourseById(courseId);
                if (course) {
                    await storageService.toggleFavorite(courseId, course.title);
                }
            });
        });

        // Notifications - Mark as read
        container.querySelectorAll('.notif-item-card').forEach(card => {
            card.addEventListener('click', async () => {
                const id = card.getAttribute('data-notif-id');
                await notificationService.markAsRead(id);
            });
        });

        // Clear all notifications
        container.querySelector('#clear-all-notifs-btn')?.addEventListener('click', async () => {
            if (confirm('هل أنت متأكد من حذف كافة الإشعارات والتنبيهات؟')) {
                await notificationService.clearAll();
            }
        });
    }

    render();

    return () => {
        unsubscribe();
    };
}
export default initDashboard;
