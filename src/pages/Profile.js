import { courseService } from '../services/courseService.js';
import { storageService } from '../services/storageService.js';
import { authService } from '../services/authService.js';
import appStore from '../store/appStore.js';
import { escapeHTML } from '../utils/xss.js';

export function initProfile(container, state, router) {
    
    const unsubscribe = appStore.subscribe((newState) => {
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
        const passedQuizIds = (state.progress && state.progress.passedQuizzes) || [];
        
        // Stats
        const totalEnrolled = enrolledIds.length;
        const totalFavorites = favoriteIds.length;
        const totalQuizzes = passedQuizIds.length;
        
        let totalCompletedLessons = 0;
        enrolledIds.forEach(id => {
            const prog = calculateCourseProgress(id);
            totalCompletedLessons += prog.completedCount;
        });

        // Translate role
        const roleAr = state.user.role === 'admin' ? 'مدير المنصة' : 
                     state.user.role === 'instructor' ? 'معلم خبير' : 'طالب متفوق';

        const lastActivity = state.progress && state.progress.lastActivity;

        container.innerHTML = `
            <!-- Top Elegant Header -->
            <header class="main-header glass-panel scrolled">
                <div class="logo-container" id="profile-logo-btn" style="cursor: pointer;">
                    <div class="logo-icon-wrap">
                        <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                    </div>
                    <span>منصتي</span>
                </div>
                <nav class="main-nav">
                    <a href="#" class="nav-link" id="nav-landing-p">الرئيسية</a>
                    <a href="#" class="nav-link" id="nav-db-p">بوابة الطالب</a>
                    <a href="#" class="nav-link active" id="nav-profile-p">الملف الشخصي</a>
                </nav>
                <div class="header-actions">
                    <button class="btn-icon" id="profile-theme-toggle" title="تغيير المظهر">
                        <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                    </button>
                    <button class="btn-secondary" id="profile-logout-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 8px;">
                        <span>تسجيل الخروج</span>
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </header>

            <div class="profile-container" style="max-width: 1100px; margin: 6rem auto 3rem; padding: 0 2rem; display: grid; grid-template-columns: 320px 1fr; gap: 2.5rem; align-items: start;">
                
                <!-- Left User Profile Summary Panel -->
                <aside class="glass-panel" style="padding: 2.5rem 2rem; border-radius: var(--radius-xl); text-align: center; border-color: rgba(99,102,241,0.15); display:flex; flex-direction:column; align-items:center;">
                    <div style="position:relative; margin-bottom: 1.5rem;">
                        <img src="${escapeHTML(state.user.avatar)}" alt="${escapeHTML(state.user.name)}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary); box-shadow: var(--shadow-md);">
                        <span class="badge ${state.user.role === 'admin' ? 'badge-secondary' : state.user.role === 'instructor' ? 'badge-primary' : 'badge-success'}" style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); font-size:0.75rem; padding: 0.25rem 0.75rem; white-space:nowrap;">
                            ${escapeHTML(roleAr)}
                        </span>
                    </div>
                    
                    <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.25rem;">${escapeHTML(state.user.name)}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem;">${escapeHTML(state.user.email)}</p>
                    
                    <div style="width: 100%; display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid var(--card-border); padding-top: 1.5rem;">
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-graduation-cap" style="margin-left:6px; width:16px;"></i> مواد مسجلة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${totalEnrolled}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-circle-check" style="margin-left:6px; width:16px;"></i> حصص مكتملة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${totalCompletedLessons}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-trophy-star" style="margin-left:6px; width:16px;"></i> كويزات مجتازة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${totalQuizzes}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-heart" style="margin-left:6px; width:16px;"></i> مواد مفضلة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${totalFavorites}</span>
                        </div>
                    </div>
                </aside>

                <!-- Right Advanced User Analytics Panel -->
                <main style="display: flex; flex-direction: column; gap: 2.5rem;">
                    
                    <!-- 1. Enrolled Courses Tracking -->
                    <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fa-solid fa-chart-line-up" style="color:var(--primary);"></i>
                            <span>تتبع إنجاز المناهج الدراسية</span>
                        </h3>
                        
                        ${totalEnrolled === 0 ? `
                            <p style="color:var(--text-secondary); text-align:center; padding: 2rem 0;">لم تلتحق بأي مواد دراسية حتى الآن.</p>
                        ` : `
                            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                ${enrolledList.map(course => {
                                    const prog = calculateCourseProgress(course.id);
                                    return `
                                        <div style="display:flex; flex-direction:column; gap:0.5rem; background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border:1px solid var(--card-border);">
                                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                                <h4 style="font-weight:700; font-size:1rem; color:var(--text-primary);">${escapeHTML(course.title)}</h4>
                                                <span class="badge badge-primary" style="font-size:0.75rem;">${escapeHTML(course.gradeAr)}</span>
                                            </div>
                                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">تم إكمال ${prog.completedCount} من أصل ${prog.totalLessons} حصة مقررة بالمنهج</p>
                                            <div style="display:flex; align-items:center; gap:1rem;">
                                                <div class="progress-bar-container" style="flex:1; max-width:100%; height:8px;">
                                                    <div class="progress-bar-fill" style="width: ${prog.percentage}%;"></div>
                                                </div>
                                                <span style="font-size:0.85rem; font-weight:700; color:var(--primary); min-width:35px; text-align:left;">${prog.percentage}%</span>
                                            </div>
                                            <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem;">
                                                <button class="btn-secondary" data-profile-play="${course.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px;">
                                                    <span>متابعة الحصص</span>
                                                    <i class="fa-solid fa-play" style="font-size:0.7rem; margin-right:4px;"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>

                    <!-- 2. Favorite Courses Panel -->
                    <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fa-solid fa-heart" style="color:var(--secondary);"></i>
                            <span>المواد الدراسية المفضلة</span>
                        </h3>
                        
                        ${totalFavorites === 0 ? `
                            <p style="color:var(--text-secondary); text-align:center; padding: 2rem 0;">لا توجد مواد في المفضلة حالياً.</p>
                        ` : `
                            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.25rem;">
                                ${favoriteList.map(course => {
                                    const isEnrolled = enrolledIds.includes(course.id);
                                    return `
                                        <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border:1px solid var(--card-border); display:flex; flex-direction:column; justify-content:space-between; gap:1rem;">
                                            <div>
                                                <h4 style="font-weight:700; color:var(--text-primary); font-size:0.95rem; margin-bottom:0.25rem;">${escapeHTML(course.title)}</h4>
                                                <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(course.instructor.name)}</span>
                                            </div>
                                            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                                                <button class="btn-icon" data-profile-unfav="${course.id}" title="حذف من المفضلة" style="color:var(--secondary); background:rgba(244,63,94,0.1); width:32px; height:32px; border-radius:6px; flex-shrink:0;">
                                                    <i class="fa-solid fa-trash" style="font-size:0.8rem;"></i>
                                                </button>
                                                <button class="btn-primary" data-profile-fav-action="${course.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; flex:1; justify-content:center;">
                                                    <span>${isEnrolled ? 'دراسة المادة' : 'التحاق مجاني'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>

                    <!-- 3. Recent Activity Log Widget -->
                    <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fa-solid fa-clock-rotate-left" style="color:var(--primary);"></i>
                            <span>آخر نشاط دراسي للمستخدم</span>
                        </h3>
                        
                        ${lastActivity ? `
                            <div style="display:flex; gap:1.25rem; align-items:center; background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border:1px solid var(--card-border);">
                                <div style="font-size:2.5rem; background:rgba(99,102,241,0.1); padding:0.5rem 1rem; border-radius:12px;">
                                    ${lastActivity.action === 'register' ? '🎉' : 
                                      lastActivity.action === 'enroll' ? '🎓' : 
                                      lastActivity.action === 'lesson_complete' ? '🚀' : 
                                      lastActivity.action === 'quiz_pass' ? '🏆' : '💖'}
                                </div>
                                <div>
                                    <h4 style="font-weight:700; color:var(--text-primary); font-size:1.1rem; margin-bottom:0.25rem;">
                                        ${lastActivity.action === 'register' ? 'إنشاء وتأسيس الحساب الجديد' : 
                                          lastActivity.action === 'enroll' ? 'التحاق بمادة دراسية جديدة' : 
                                          lastActivity.action === 'lesson_complete' ? 'إكمال مذاكرة درس مقرر' : 
                                          lastActivity.action === 'quiz_pass' ? 'اجتياز وتقييم اختبار الوحدة' : 'تحديث قائمة المفضلة الدراسية'}
                                    </h4>
                                    <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
                                        ${lastActivity.courseId ? `الدورة: <strong>${escapeHTML(courseService.getCourseById(lastActivity.courseId)?.title || '')}</strong>` : ''}
                                        ${lastActivity.score ? ` | درجة التفوق: <strong>${lastActivity.score}%</strong>` : ''}
                                    </p>
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-top:0.25rem;">
                                        تاريخ النشاط: ${new Date(lastActivity.timestamp).toLocaleString('ar-EG')}
                                    </span>
                                </div>
                            </div>
                        ` : `
                            <p style="color:var(--text-secondary); text-align:center; padding: 1.5rem 0;">لا تتوفر أنشطة مسجلة مؤخراً.</p>
                        `}
                    </div>

                </main>
            </div>

            <!-- Elegant Footer -->
            <footer class="main-footer" style="margin-top:4rem;">
                <div class="footer-bottom">
                    <span>جميع الحقوق محفوظة © منصتي التعليمية 2026</span>
                </div>
            </footer>
        `;

        setupEventListeners();
    }

    function setupEventListeners() {
        // Logo & Navigation Links
        container.querySelector('#profile-logo-btn')?.addEventListener('click', () => router.navigate('landing'));
        container.querySelector('#nav-landing-p')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('landing');
        });
        
        container.querySelector('#nav-db-p')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('dashboard');
        });

        // Theme toggle
        container.querySelector('#profile-theme-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            appStore.setTheme(nextTheme);
            document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
        });

        // Logout action
        container.querySelector('#profile-logout-btn')?.addEventListener('click', async () => {
            await authService.logout();
            router.navigate('landing');
        });

        // Play Course from tracker
        container.querySelectorAll('[data-profile-play]').forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = btn.getAttribute('data-profile-play');
                router.navigate('classroom', { courseId });
            });
        });

        // Studies Fav Course or enrolls
        container.querySelectorAll('[data-profile-fav-action]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const courseId = btn.getAttribute('data-profile-fav-action');
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

        // Unfavorite Course
        container.querySelectorAll('[data-profile-unfav]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const courseId = btn.getAttribute('data-profile-unfav');
                const course = courseService.getCourseById(courseId);
                if (course) {
                    await storageService.toggleFavorite(courseId, course.title);
                }
            });
        });
    }

    render();

    return () => {
        unsubscribe();
    };
}
export default initProfile;
