import { courseService } from '../services/courseService.js';
import { analyticsService } from '../services/analyticsService.js';
import { validateCourse, validateQuiz } from '../utils/validators.js';
import appStore from '../store/appStore.js';
import { escapeHTML } from '../utils/xss.js';

export function initAdminDashboard(container, state, router) {
    let activeSection = 'courses'; // 'courses', 'analytics', 'add_course'
    let editingCourseId = null;
    let errorMsg = '';
    let successMsg = '';
    let analyticsData = { viewsCount: 15, enrollmentsCount: 3, completionsCount: 7, quizzesCount: 1 };

    // Form states for creating/editing courses
    let courseForm = {
        title: '',
        description: '',
        stage: 'secondary',
        grade: 'sec3',
        gradeAr: 'الصف الثالث الثانوي',
        category: 'math',
        categoryAr: 'رياضيات',
        instructorName: '',
        instructorRole: '',
        instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100',
        duration: '10 حصة',
        image: 'assets/images/course_math.jpg'
    };

    const unsubscribe = appStore.subscribe((newState) => {
        if (state !== newState) {
            state = newState;
            render();
        }
    });

    async function loadAnalytics() {
        analyticsData = await analyticsService.getAnalyticsSummary();
        const statsViews = container.querySelector('#stats-views');
        const statsEnrolls = container.querySelector('#stats-enrolls');
        const statsComps = container.querySelector('#stats-comps');
        const statsQuizzes = container.querySelector('#stats-quizzes');
        
        if (statsViews) statsViews.textContent = analyticsData.viewsCount;
        if (statsEnrolls) statsEnrolls.textContent = analyticsData.enrollmentsCount;
        if (statsComps) statsComps.textContent = analyticsData.completionsCount;
        if (statsQuizzes) statsQuizzes.textContent = analyticsData.quizzesCount;
    }

    // Load initial analytics async
    setTimeout(loadAnalytics, 50);

    function render() {
        container.innerHTML = `
            <div class="dashboard-container">
                <!-- Premium Sidebar -->
                <aside class="dashboard-sidebar glass-panel">
                    <div class="sidebar-logo" id="admin-logo-btn" style="cursor:pointer;">
                        <div class="logo-container" style="font-size: 1.3rem;">
                            <div class="logo-icon-wrap" style="width: 38px; height: 38px; font-size: 1rem; background: var(--secondary);">
                                <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                            </div>
                            <span>منصتي <span style="font-size:0.7rem; color:var(--secondary); font-weight:800; border:1px solid var(--secondary); padding:0.1rem 0.3rem; border-radius:4px; margin-right:4px;">إدارة</span></span>
                        </div>
                    </div>
                    
                    <ul class="sidebar-menu">
                        <li class="sidebar-item ${activeSection === 'courses' ? 'active' : ''}">
                            <a href="#" id="admin-sb-courses">
                                <i class="fa-solid fa-list-check"></i>
                                <span>إدارة المناهج</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${activeSection === 'add_course' ? 'active' : ''}">
                            <a href="#" id="admin-sb-add">
                                <i class="fa-solid fa-square-plus"></i>
                                <span>إضافة مادة جديدة</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${activeSection === 'analytics' ? 'active' : ''}">
                            <a href="#" id="admin-sb-analytics">
                                <i class="fa-solid fa-chart-line"></i>
                                <span>تحليلات المنصة</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" id="admin-sb-student">
                                <i class="fa-solid fa-circle-user"></i>
                                <span>بوابة الطالب</span>
                            </a>
                        </li>
                    </ul>

                    <div class="sidebar-footer">
                        <div class="user-profile-badge">
                            <img src="${escapeHTML(state.user.avatar)}" alt="${escapeHTML(state.user.name)}" class="user-avatar" style="border-color:var(--secondary);">
                            <div class="user-details">
                                <h4 class="user-name">${escapeHTML(state.user.name)}</h4>
                                <span class="user-role" style="font-size:0.75rem; color:var(--secondary); font-weight:700;">مشرف المنصة</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="dashboard-content">
                    <header class="dashboard-header">
                        <div class="welcome-msg">
                            <h2>بوابة إدارة منصتي التعليمية 🛠️</h2>
                            <p>أهلاً بك يا ${escapeHTML(state.user.name.split(' ')[0])}. تحكم بكافة المناهج الدراسية، أضف فصول ودروس جديدة، وشاهد أداء الطلاب.</p>
                        </div>
                        <div class="dashboard-actions">
                            <button class="btn-icon" id="admin-theme-toggle" title="تغيير المظهر">
                                <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                            </button>
                        </div>
                    </header>

                    ${errorMsg ? `
                        <div class="badge badge-secondary" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: #ef4444; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span>${escapeHTML(errorMsg)}</span>
                        </div>
                    ` : ''}

                    ${successMsg ? `
                        <div class="badge badge-success" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--success); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>${escapeHTML(successMsg)}</span>
                        </div>
                    ` : ''}

                    ${renderSection(activeSection)}
                </main>
            </div>
        `;

        setupEventListeners();
    }

    function renderSection(section) {
        if (section === 'courses') {
            return `
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-graduation-cap" style="color:var(--secondary);"></i>
                    <h3>قائمة المناهج الدراسية الحالية</h3>
                </div>

                <div style="display:flex; flex-direction:column; gap:1.25rem;">
                    ${state.courses.map(course => `
                        <div class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-lg); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                            <div style="display:flex; gap:1rem; align-items:center;">
                                <img src="${escapeHTML(course.image)}" style="width:64px; height:64px; border-radius:8px; object-fit:cover;">
                                <div>
                                    <h4 style="font-weight:700; color:var(--text-primary); font-size:1.1rem; margin-bottom:0.25rem;">${escapeHTML(course.title)}</h4>
                                    <p style="font-size:0.8rem; color:var(--text-secondary);">
                                        المعلم: ${escapeHTML(course.instructor.name)} | 
                                        المرحلة: ${escapeHTML(course.gradeAr)} | 
                                        الفصول: ${course.chapters?.length || 0}
                                    </p>
                                </div>
                            </div>
                            <div style="display:flex; gap:0.5rem;">
                                <button class="btn-secondary" data-admin-edit-course="${course.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px;">تعديل تفاصيل</button>
                                <button class="btn-primary" data-admin-manage-content="${course.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; background:var(--secondary); border-color:var(--secondary);">إدارة المحتوى</button>
                                <button class="btn-secondary" data-admin-delete-course="${course.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; color:#ef4444; border-color:rgba(239,68,68,0.2); background:rgba(239,68,68,0.02);">حذف</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (section === 'add_course' || section === 'edit_course') {
            const isEdit = section === 'edit_course';
            const submitBtnText = isEdit ? 'حفظ التعديلات' : 'إضافة المادة بالمنصة';
            return `
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-square-plus" style="color:var(--secondary);"></i>
                    <h3>${isEdit ? 'تعديل تفاصيل المادة التعليمية' : 'إضافة مادة تعليمية جديدة'}</h3>
                </div>

                <form id="admin-course-form" class="glass-panel" style="padding:2.5rem; border-radius:var(--radius-xl); display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                    <div style="display:flex; flex-direction:column; gap:0.4rem; grid-column:1 / -1;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">عنوان المادة الدراسية</label>
                        <input type="text" id="form-title" value="${escapeHTML(courseForm.title)}" required placeholder="الرياضيات - الهندسة الفراغية..." style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem; grid-column:1 / -1;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">وصف وشرح المادة بالكامل</label>
                        <textarea id="form-desc" required placeholder="اكتب شرحاً وافياً ومحفزاً للمادة الدراسية..." style="width:100%; height:100px; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; resize:none;">${escapeHTML(courseForm.description)}</textarea>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">المرحلة الدراسية</label>
                        <select id="form-stage" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="primary" ${courseForm.stage === 'primary' ? 'selected' : ''}>المرحلة الابتدائية</option>
                            <option value="preparatory" ${courseForm.stage === 'preparatory' ? 'selected' : ''}>المرحلة الإعدادية</option>
                            <option value="secondary" ${courseForm.stage === 'secondary' ? 'selected' : ''}>المرحلة الثانوية</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">الصف الدراسي</label>
                        <select id="form-grade" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="sec3" ${courseForm.grade === 'sec3' ? 'selected' : ''}>الصف الثالث الثانوي</option>
                            <option value="sec2" ${courseForm.grade === 'sec2' ? 'selected' : ''}>الصف الثاني الثانوي</option>
                            <option value="sec1" ${courseForm.grade === 'sec1' ? 'selected' : ''}>الصف الأول الثانوي</option>
                            <option value="prep3" ${courseForm.grade === 'prep3' ? 'selected' : ''}>الصف الثالث الإعدادي</option>
                            <option value="prep1" ${courseForm.grade === 'prep1' ? 'selected' : ''}>الصف الأول الإعدادي</option>
                            <option value="prim6" ${courseForm.grade === 'prim6' ? 'selected' : ''}>الصف السادس الابتدائي</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">التصنيف الأساسي</label>
                        <select id="form-category" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="math" ${courseForm.category === 'math' ? 'selected' : ''}>الرياضيات</option>
                            <option value="physics" ${courseForm.category === 'physics' ? 'selected' : ''}>الفيزياء والعلوم</option>
                            <option value="arabic" ${courseForm.category === 'arabic' ? 'selected' : ''}>اللغة العربية</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">اسم المعلم</label>
                        <input type="text" id="form-instructor-name" value="${escapeHTML(courseForm.instructorName)}" required placeholder="أ. أحمد رأفت" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">دور ومسمى المعلم</label>
                        <input type="text" id="form-instructor-role" value="${escapeHTML(courseForm.instructorRole)}" required placeholder="كبير معلمي المادة بوزارة التربية" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">رابط غلاف المادة (صورة)</label>
                        <input type="text" id="form-image" value="${escapeHTML(courseForm.image)}" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:1rem; margin-top:1rem;">
                        ${isEdit ? `<button type="button" class="btn-secondary" id="admin-cancel-edit-btn">إلغاء التعديل</button>` : ''}
                        <button type="submit" class="btn-primary" style="background:var(--secondary); border-color:var(--secondary); padding:0.75rem 2rem;">${submitBtnText}</button>
                    </div>
                </form>
            `;
        }

        if (section === 'analytics') {
            return `
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-chart-line" style="color:var(--secondary);"></i>
                    <h3>تحليلات أداء المنصة التعليمية</h3>
                </div>

                <!-- Stats grid -->
                <div class="stats-grid" style="margin-bottom:2.5rem;">
                    <div class="dashboard-stat-card card-1" style="background:linear-gradient(135deg, #4f46e5, #6366f1);">
                        <div class="db-stat-details">
                            <h4>مشاهدات الطلاب الكلية</h4>
                            <span class="db-stat-num" id="stats-views">${analyticsData.viewsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-eye"></i></div>
                    </div>
                    <div class="dashboard-stat-card card-2" style="background:linear-gradient(135deg, #06b6d4, #0891b2);">
                        <div class="db-stat-details">
                            <h4>التحاقات المواد اليوم</h4>
                            <span class="db-stat-num" id="stats-enrolls">${analyticsData.enrollmentsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div>
                    </div>
                    <div class="dashboard-stat-card card-3" style="background:linear-gradient(135deg, #10b981, #059669);">
                        <div class="db-stat-details">
                            <h4>حصص مكتملة اليوم</h4>
                            <span class="db-stat-num" id="stats-comps">${analyticsData.completionsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-circle-check"></i></div>
                    </div>
                    <div class="dashboard-stat-card" style="background:linear-gradient(135deg, #fbbf24, #d97706);">
                        <div class="db-stat-details">
                            <h4>كويزات ناجحة</h4>
                            <span class="db-stat-num" id="stats-quizzes">${analyticsData.quizzesCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-trophy"></i></div>
                    </div>
                </div>

                <div class="glass-panel" style="padding:2.5rem; border-radius:var(--radius-xl); text-align:center;">
                    <i class="fa-solid fa-chart-line-up" style="font-size:3.5rem; color:var(--text-muted); margin-bottom:1rem;"></i>
                    <h3 style="font-weight:800; font-size:1.3rem; margin-bottom:0.5rem;">رسم بياني ذكي للتفاعل</h3>
                    <p style="color:var(--text-secondary); max-width:500px; margin:0 auto;">سيتم قريباً دمج الرسوم البيانية التفاعلية لحساب نشاط الطلاب في المناهج بصورة دورية دقيقة وسريعة.</p>
                </div>
            `;
        }

        if (section === 'manage_content') {
            const course = courseService.getCourseById(editingCourseId);
            if (!course) return '<p>المادة غير موجودة</p>';

            return `
                <div class="dashboard-section-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div>
                        <i class="fa-solid fa-folder-open" style="color:var(--secondary);"></i>
                        <h3>إدارة المحتوى الدراسي لمادة: ${escapeHTML(course.title)}</h3>
                    </div>
                    <button class="btn-secondary" id="back-to-courses-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:8px;">العودة لقائمة المواد</button>
                </div>

                <div style="display:grid; grid-template-columns:1fr 400px; gap:2rem; align-items:start; margin-top:1.5rem;">
                    
                    <!-- Chapters & Lessons list -->
                    <div class="glass-panel" style="padding:2rem; border-radius:var(--radius-xl);">
                        <h4 style="font-weight:800; font-size:1.15rem; margin-bottom:1.25rem;">فصول ودروس المنهج الحالية</h4>
                        
                        ${!course.chapters || course.chapters.length === 0 ? `
                            <p style="color:var(--text-secondary); text-align:center; padding:2rem 0;">لا توجد فصول مضافة للمادة بعد. أضف أول فصول المادة الآن!</p>
                        ` : course.chapters.map((ch, chIdx) => `
                            <div style="margin-bottom:1.5rem; border:1px solid var(--card-border); border-radius:8px; overflow:hidden;">
                                <div style="background:var(--bg-secondary); padding:0.75rem 1.25rem; font-weight:700; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center;">
                                    <span>${escapeHTML(ch.title)}</span>
                                    <button class="btn-icon" data-admin-delete-chapter="${chIdx}" title="حذف الفصل بالكامل" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                                <ul style="list-style:none;">
                                    ${!ch.lessons || ch.lessons.length === 0 ? `
                                        <li style="padding:0.75rem 1.25rem; font-size:0.85rem; color:var(--text-muted); text-align:center;">لا توجد دروس مضافة للفصل بعد</li>
                                    ` : ch.lessons.map((l, lIdx) => `
                                        <li style="padding:0.75rem 1.25rem; border-top:1px solid var(--card-border); font-size:0.9rem; display:flex; justify-content:space-between; align-items:center;">
                                            <div>
                                                <div style="font-weight:700; color:var(--text-primary);">${escapeHTML(l.title)}</div>
                                                <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-regular fa-clock" style="margin-left:4px;"></i>مدة الدرس: ${escapeHTML(l.duration)}</span>
                                            </div>
                                            <button class="btn-icon" data-admin-delete-lesson="${chIdx}-${lIdx}" title="حذف الدرس" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Side Editor to Add Chapter / Lesson -->
                    <div style="display:flex; flex-direction:column; gap:1.5rem;">
                        <!-- Add Chapter -->
                        <form id="add-chapter-form" class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-lg); display:flex; flex-direction:column; gap:1rem;">
                            <h4 style="font-weight:800; font-size:1rem; color:var(--text-primary);"><i class="fa-solid fa-plus" style="margin-left:6px; color:var(--secondary);"></i>أضف فصلاً دراسياً جديداً</h4>
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">عنوان الباب / الفصل</label>
                                <input type="text" id="chapter-title-input" required placeholder="الباب الثاني: المصفوفات..." style="width:100%; padding:0.6rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                            </div>
                            <button type="submit" class="btn-primary" style="background:var(--secondary); border-color:var(--secondary); justify-content:center;">إنشاء الفصل الدراسي</button>
                        </form>

                        <!-- Add Lesson -->
                        <form id="add-lesson-form" class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-lg); display:flex; flex-direction:column; gap:1rem;">
                            <h4 style="font-weight:800; font-size:1rem; color:var(--text-primary);"><i class="fa-solid fa-video" style="margin-left:6px; color:var(--secondary);"></i>أضف درساً / حصة فيديو</h4>
                            
                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">اختر الفصل الدراسي</label>
                                <select id="lesson-chapter-select" style="width:100%; padding:0.6rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:37px;">
                                    ${!course.chapters || course.chapters.length === 0 ? `<option value="">أضف فصلاً أولاً</option>` : course.chapters.map((ch, idx) => `<option value="${idx}">${escapeHTML(ch.title)}</option>`).join('')}
                                </select>
                            </div>

                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">عنوان الدرس الجديد</label>
                                <input type="text" id="lesson-title-input" required placeholder="مفهوم المحددات الثنائية..." style="width:100%; padding:0.6rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                            </div>

                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">مدة الدرس (مثال: 15:45)</label>
                                <input type="text" id="lesson-duration-input" required placeholder="14:30" style="width:100%; padding:0.6rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                            </div>

                            <div style="display:flex; flex-direction:column; gap:0.4rem;">
                                <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">رابط فيديو الدرس (Stream/MP4 URL)</label>
                                <input type="text" id="lesson-video-input" value="https://www.w3schools.com/html/movie.mp4" required placeholder="https://..." style="width:100%; padding:0.6rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                            </div>

                            <button type="submit" class="btn-primary" style="background:var(--secondary); border-color:var(--secondary); justify-content:center;" ${!course.chapters || course.chapters.length === 0 ? 'disabled' : ''}>رفع وإضافة الدرس</button>
                        </form>
                    </div>

                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Theme switch
        container.querySelector('#admin-theme-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            appStore.setTheme(nextTheme);
            document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
        });

        // Logo
        container.querySelector('#admin-logo-btn')?.addEventListener('click', () => router.navigate('landing'));

        // Sidebar clicks
        container.querySelector('#admin-sb-courses')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeSection = 'courses';
            errorMsg = '';
            successMsg = '';
            render();
        });

        container.querySelector('#admin-sb-add')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeSection = 'add_course';
            editingCourseId = null;
            errorMsg = '';
            successMsg = '';
            // Reset form
            courseForm = {
                title: '',
                description: '',
                stage: 'secondary',
                grade: 'sec3',
                gradeAr: 'الصف الثالث الثانوي',
                category: 'math',
                categoryAr: 'رياضيات',
                instructorName: 'أ. أحمد رأفت',
                instructorRole: 'كبير معلمي المادة بوزارة التربية والتعليم',
                instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100',
                duration: '12 حصة',
                image: 'assets/images/course_math.jpg'
            };
            render();
        });

        container.querySelector('#admin-sb-analytics')?.addEventListener('click', (e) => {
            e.preventDefault();
            activeSection = 'analytics';
            errorMsg = '';
            successMsg = '';
            render();
        });

        container.querySelector('#admin-sb-student')?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('dashboard');
        });

        // Delete course click
        container.querySelectorAll('[data-admin-delete-course]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-admin-delete-course');
                if (confirm('هل أنت متأكد من رغبتك في حذف هذه المادة الدراسية نهائياً وكل محتوياتها من المنصة؟')) {
                    try {
                        await courseService.deleteCourse(id);
                        successMsg = 'تم حذف المادة بنجاح';
                        render();
                    } catch (error) {
                        errorMsg = error.message;
                        render();
                    }
                }
            });
        });

        // Edit course click
        container.querySelectorAll('[data-admin-edit-course]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-admin-edit-course');
                const course = courseService.getCourseById(id);
                if (course) {
                    editingCourseId = id;
                    activeSection = 'edit_course';
                    courseForm = {
                        title: course.title,
                        description: course.description,
                        stage: course.stage,
                        grade: course.grade,
                        gradeAr: course.gradeAr,
                        category: course.category,
                        categoryAr: course.categoryAr,
                        instructorName: course.instructor.name,
                        instructorRole: course.instructor.role,
                        instructorAvatar: course.instructor.avatar,
                        duration: course.duration,
                        image: course.image
                    };
                    render();
                }
            });
        });

        // Manage content click
        container.querySelectorAll('[data-admin-manage-content]').forEach(btn => {
            btn.addEventListener('click', () => {
                editingCourseId = btn.getAttribute('data-admin-manage-content');
                activeSection = 'manage_content';
                errorMsg = '';
                successMsg = '';
                render();
            });
        });

        // Course Add / Edit submit
        const courseFormEl = container.querySelector('#admin-course-form');
        if (courseFormEl) {
            courseFormEl.addEventListener('submit', async (e) => {
                e.preventDefault();
                errorMsg = '';
                successMsg = '';

                // Get dynamic selects
                const stageSelect = container.querySelector('#form-stage');
                const gradeSelect = container.querySelector('#form-grade');
                const categorySelect = container.querySelector('#form-category');
                
                const updatedCourse = {
                    title: container.querySelector('#form-title').value.trim(),
                    description: container.querySelector('#form-desc').value.trim(),
                    stage: stageSelect.value,
                    grade: gradeSelect.value,
                    gradeAr: gradeSelect.options[gradeSelect.selectedIndex].text,
                    category: categorySelect.value,
                    categoryAr: categorySelect.options[categorySelect.selectedIndex].text,
                    instructor: {
                        name: container.querySelector('#form-instructor-name').value.trim(),
                        role: container.querySelector('#form-instructor-role').value.trim(),
                        avatar: courseForm.instructorAvatar
                    },
                    image: container.querySelector('#form-image').value.trim(),
                    duration: courseForm.duration
                };

                const err = validateCourse(updatedCourse);
                if (err) {
                    errorMsg = err;
                    render();
                    return;
                }

                try {
                    if (activeSection === 'edit_course') {
                        await courseService.updateCourse(editingCourseId, updatedCourse);
                        successMsg = 'تم تعديل المادة التعليمية بنجاح';
                        activeSection = 'courses';
                    } else {
                        await courseService.addCourse(updatedCourse);
                        successMsg = 'تم إضافة المادة التعليمية بنجاح';
                        activeSection = 'courses';
                    }
                    render();
                } catch (error) {
                    errorMsg = error.message;
                    render();
                }
            });
        }

        container.querySelector('#admin-cancel-edit-btn')?.addEventListener('click', () => {
            activeSection = 'courses';
            editingCourseId = null;
            render();
        });

        // Manage content: Back to courses list
        container.querySelector('#back-to-courses-btn')?.addEventListener('click', () => {
            activeSection = 'courses';
            editingCourseId = null;
            render();
        });

        // Add Chapter Form
        const addChapterForm = container.querySelector('#add-chapter-form');
        if (addChapterForm) {
            addChapterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const titleInput = container.querySelector('#chapter-title-input');
                const title = titleInput.value.trim();
                
                if (!title) return;

                try {
                    const course = courseService.getCourseById(editingCourseId);
                    const chapters = [...(course.chapters || [])];
                    
                    chapters.push({
                        id: 'ch-' + Math.random().toString(36).substr(2, 9),
                        title,
                        lessons: []
                    });

                    await courseService.updateCourse(editingCourseId, { chapters });
                    successMsg = 'تم إضافة الفصل بنجاح';
                    render();
                } catch (error) {
                    errorMsg = error.message;
                    render();
                }
            });
        }

        // Add Lesson Form
        const addLessonForm = container.querySelector('#add-lesson-form');
        if (addLessonForm) {
            addLessonForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const chIdx = parseInt(container.querySelector('#lesson-chapter-select').value, 10);
                const title = container.querySelector('#lesson-title-input').value.trim();
                const duration = container.querySelector('#lesson-duration-input').value.trim();
                const videoUrl = container.querySelector('#lesson-video-input').value.trim();

                if (isNaN(chIdx) || !title || !duration || !videoUrl) return;

                try {
                    const course = courseService.getCourseById(editingCourseId);
                    const chapters = [...(course.chapters || [])];
                    const ch = chapters[chIdx];
                    
                    if (ch) {
                        const lessons = [...(ch.lessons || [])];
                        lessons.push({
                            id: 'l-' + Math.random().toString(36).substr(2, 9),
                            title,
                            duration,
                            videoUrl,
                            completed: false
                        });
                        ch.lessons = lessons;

                        // Recalculate total course lessons duration for aesthetics
                        let totalL = 0;
                        chapters.forEach(c => totalL += (c.lessons || []).length);
                        const durationStr = `${totalL} حصة`;

                        await courseService.updateCourse(editingCourseId, { chapters, duration: durationStr });
                        successMsg = 'تم إضافة الدرس الجديد بنجاح';
                        render();
                    }
                } catch (error) {
                    errorMsg = error.message;
                    render();
                }
            });
        }

        // Delete Chapter
        container.querySelectorAll('[data-admin-delete-chapter]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const idx = parseInt(btn.getAttribute('data-admin-delete-chapter'), 10);
                if (confirm('هل أنت متأكد من حذف هذا الباب وكل الدروس المتواجدة داخله نهائياً؟')) {
                    try {
                        const course = courseService.getCourseById(editingCourseId);
                        const chapters = course.chapters.filter((_, i) => i !== idx);

                        let totalL = 0;
                        chapters.forEach(c => totalL += (c.lessons || []).length);
                        const durationStr = `${totalL} حصة`;

                        await courseService.updateCourse(editingCourseId, { chapters, duration: durationStr });
                        successMsg = 'تم إزالة الفصل بالكامل';
                        render();
                    } catch (error) {
                        errorMsg = error.message;
                        render();
                    }
                }
            });
        });

        // Delete Lesson
        container.querySelectorAll('[data-admin-delete-lesson]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const ids = btn.getAttribute('data-admin-delete-lesson').split('-');
                const chIdx = parseInt(ids[0], 10);
                const lIdx = parseInt(ids[1], 10);

                if (confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
                    try {
                        const course = courseService.getCourseById(editingCourseId);
                        const chapters = [...course.chapters];
                        
                        chapters[chIdx].lessons = chapters[chIdx].lessons.filter((_, i) => i !== lIdx);

                        let totalL = 0;
                        chapters.forEach(c => totalL += (c.lessons || []).length);
                        const durationStr = `${totalL} حصة`;

                        await courseService.updateCourse(editingCourseId, { chapters, duration: durationStr });
                        successMsg = 'تم إزالة الدرس';
                        render();
                    } catch (error) {
                        errorMsg = error.message;
                        render();
                    }
                }
            });
        });
    }

    render();

    return () => {
        unsubscribe();
    };
}
export default initAdminDashboard;
