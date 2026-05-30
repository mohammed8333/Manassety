/* ==========================================================================
   Menassaty School Landing Page Component (With Stages & Grades Selector)
   ========================================================================== */

import { courses } from '../coursesData.js';

export function initLandingPage(container, state, actions) {
    let currentFilter = 'all';

    function render() {
        // 1. Filter courses based on user's active grade selection
        let filteredGradeCourses = courses.filter(c => c.grade === state.selectedGrade);
        
        // 2. Filter courses based on subject category tab
        const finalFilteredCourses = currentFilter === 'all' 
            ? filteredGradeCourses 
            : filteredGradeCourses.filter(c => c.category === currentFilter);

        container.innerHTML = `
            <!-- Top Elegant Header -->
            <header class="main-header glass-panel scrolled">
                <div class="logo-container">
                    <div class="logo-icon-wrap">
                        <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                    </div>
                    <span>منصتي</span>
                </div>
                <nav class="main-nav">
                    <a href="#" class="nav-link active" data-nav="landing">الرئيسية</a>
                    <a href="#courses-section" class="nav-link" id="nav-to-courses">المواد الدراسية</a>
                    <a href="#" class="nav-link" data-nav="dashboard">بوابة الطالب</a>
                </nav>
                <div class="header-actions">
                    <!-- Light/Dark Mode Switcher -->
                    <button class="btn-icon" id="theme-toggle-btn" title="تغيير المظهر">
                        <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                    </button>
                    <button class="btn-primary" id="header-cta-btn">
                        <span>ابدأ المذاكرة الآن</span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </header>

            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content">
                    <div class="badge badge-primary" style="margin-bottom: 1.5rem; padding: 0.5rem 1rem;">
                        <i class="fa-solid fa-sparkles"></i>
                        <span>بوابتك للتفوق والدرجات النهائية</span>
                    </div>
                    <h1>
                        افهم، ذاكر وتفوّق <br>
                        في <span class="gradient-text">مناهجك المدرسية</span> مع منصتي
                    </h1>
                    <p class="hero-description">
                        اكتشف شروحات تفاعلية وممتعة للمناهج الدراسية (الرياضيات، الفيزياء، واللغات) يقدمها لك نخبة من المعلمين الخبراء لمساعدتك في فهم الدروس واجتياز الامتحانات بتفوق ويسر.
                    </p>
                    <div class="hero-buttons">
                        <button class="btn-primary" id="hero-primary-btn">
                            <span>اختر صفك الدراسي</span>
                            <i class="fa-solid fa-compass"></i>
                        </button>
                        <button class="btn-secondary" id="hero-secondary-btn">
                            <span>لوحة تقدم الطالب</span>
                            <i class="fa-solid fa-chart-line"></i>
                        </button>
                    </div>
                </div>
                <div class="hero-image-container">
                    <img src="assets/images/hero_vector.jpg" alt="التعلم المدرسي منصتي" class="hero-main-img">
                    <!-- Floating Card 1 -->
                    <div class="hero-floating-card card-1 glass-panel">
                        <div class="float-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <h4 style="font-weight: 700; font-size: 0.95rem;">+10,000 طالب</h4>
                            <p style="font-size: 0.75rem; color: var(--text-secondary);">يتعلمون ويتفوقون بنشاط</p>
                        </div>
                    </div>
                    <!-- Floating Card 2 -->
                    <div class="hero-floating-card card-2 glass-panel">
                        <div class="float-icon">
                            <i class="fa-solid fa-star" style="color: #fbbf24;"></i>
                        </div>
                        <div>
                            <h4 style="font-weight: 700; font-size: 0.95rem;">درجة كاملة</h4>
                            <p style="font-size: 0.75rem; color: var(--text-secondary);">هو هدفنا الدائم لك</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Statistics Row -->
            <section class="stats-section">
                <div class="stat-card">
                    <span class="stat-num" data-val="10000">+12K</span>
                    <span class="stat-label">طلاب متفوقين</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num" data-val="50">3 مراحل</span>
                    <span class="stat-label">ابتدائي، إعدادي، ثانوي</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num" data-val="200">12 صفاً</span>
                    <span class="stat-label">دراسياً متكاملاً</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num" data-val="98">99.2%</span>
                    <span class="stat-label">نسبة النجاح والتفوق</span>
                </div>
            </section>

            <!-- Interactive Academic Stages & Grades Portal -->
            <section id="stages-section" class="stages-section" style="padding: 4rem; border-top: 1px solid var(--card-border);">
                <div class="section-title" style="text-align: center; margin-bottom: 3.5rem;">
                    <div class="badge badge-secondary" style="margin-bottom: 1rem; padding: 0.5rem 1rem;">
                        <i class="fa-solid fa-school" style="margin-left: 6px;"></i>
                        <span>اختر صفك الدراسي للبدء</span>
                    </div>
                    <h2>بوابة الصفوف الدراسية المنهجية</h2>
                    <p>اختر مرحلتك وصفك الدراسي الحالي لعرض الدروس والمناهج الخاصة بك فوراً</p>
                </div>

                <!-- Stage Tab Switchers -->
                <div class="stage-tabs-bar">
                    <button class="stage-tab-btn ${state.selectedStage === 'primary' ? 'active' : ''}" data-stage="primary">
                        <i class="fa-solid fa-child" style="margin-left: 8px;"></i>
                        <span>المرحلة الابتدائية</span>
                    </button>
                    <button class="stage-tab-btn ${state.selectedStage === 'preparatory' ? 'active' : ''}" data-stage="preparatory">
                        <i class="fa-solid fa-user-graduate" style="margin-left: 8px;"></i>
                        <span>المرحلة الإعدادية</span>
                    </button>
                    <button class="stage-tab-btn ${state.selectedStage === 'secondary' ? 'active' : ''}" data-stage="secondary">
                        <i class="fa-solid fa-award" style="margin-left: 8px;"></i>
                        <span>المرحلة الثانوية</span>
                    </button>
                </div>

                <!-- Grades panels grids -->
                <div class="grades-panels-container">
                    <!-- Primary panel (1st to 6th) -->
                    <div class="grades-panel-content ${state.selectedStage === 'primary' ? 'active' : ''}">
                        <div class="grades-cards-grid">
                            ${[
                                { id: 'prim1', name: 'الصف الأول الابتدائي' },
                                { id: 'prim2', name: 'الصف الثاني الابتدائي' },
                                { id: 'prim3', name: 'الصف الثالث الابتدائي' },
                                { id: 'prim4', name: 'الصف الرابع الابتدائي' },
                                { id: 'prim5', name: 'الصف الخامس الابتدائي' },
                                { id: 'prim6', name: 'الصف السادس الابتدائي' }
                            ].map(g => `
                                <div class="grade-card glass-panel ${state.selectedGrade === g.id ? 'active' : ''}" data-grade-id="${g.id}" data-grade-title="${g.name}" data-grade-stage="primary">
                                    <div class="grade-card-icon"><i class="fa-solid fa-circle-1" style="display:none;"></i>🏫</div>
                                    <h3>${g.name}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Preparatory panel (1st to 3rd) -->
                    <div class="grades-panel-content ${state.selectedStage === 'preparatory' ? 'active' : ''}">
                        <div class="grades-cards-grid">
                            ${[
                                { id: 'prep1', name: 'الصف الأول الإعدادي' },
                                { id: 'prep2', name: 'الصف الثاني الإعدادي' },
                                { id: 'prep3', name: 'الصف الثالث الإعدادي' }
                            ].map(g => `
                                <div class="grade-card glass-panel ${state.selectedGrade === g.id ? 'active' : ''}" data-grade-id="${g.id}" data-grade-title="${g.name}" data-grade-stage="preparatory">
                                    <div class="grade-card-icon">🎓</div>
                                    <h3>${g.name}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Secondary panel (1st to 3rd) -->
                    <div class="grades-panel-content ${state.selectedStage === 'secondary' ? 'active' : ''}">
                        <div class="grades-cards-grid">
                            ${[
                                { id: 'sec1', name: 'الصف الأول الثانوي' },
                                { id: 'sec2', name: 'الصف الثاني الثانوي' },
                                { id: 'sec3', name: 'الصف الثالث الثانوي' }
                            ].map(g => `
                                <div class="grade-card glass-panel ${state.selectedGrade === g.id ? 'active' : ''}" data-grade-id="${g.id}" data-grade-title="${g.name}" data-grade-stage="secondary">
                                    <div class="grade-card-icon">🏆</div>
                                    <h3>${g.name}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>

            <!-- Featured Courses Section -->
            <section id="courses-section" class="featured-courses" style="border-top: 1px solid var(--card-border);">
                <div class="section-header">
                    <div class="section-title">
                        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">
                            <i class="fa-solid fa-book-open"></i>
                            <span>تصفح مناهج: ${state.selectedGradeAr}</span>
                        </div>
                        <h2>المواد الدراسية المتاحة</h2>
                        <p>اختر المادة للبدء في تصفح الفصول والدروس وإجراء الاختبارات التفاعلية</p>
                    </div>
                    <div class="course-filters">
                        <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">الكل</button>
                        <button class="filter-btn ${currentFilter === 'math' ? 'active' : ''}" data-filter="math">الرياضيات</button>
                        <button class="filter-btn ${currentFilter === 'physics' ? 'active' : ''}" data-filter="physics">الفيزياء والعلوم</button>
                        <button class="filter-btn ${currentFilter === 'arabic' ? 'active' : ''}" data-filter="arabic">اللغة العربية</button>
                    </div>
                </div>

                <div class="courses-grid">
                    ${finalFilteredCourses.length === 0 ? `
                        <!-- Friendly empty state with direct demo grade switches -->
                        <div class="glass-panel" style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; border-radius: var(--radius-lg); border: 1px solid var(--card-border);">
                            <div style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                                <i class="fa-solid fa-circle-nodes"></i>
                            </div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem;">منهج دراسي قيد التجهيز</h3>
                            <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7;">
                                لم نقم برفع شروحات مخصصة لـ <strong>${state.selectedGradeAr}</strong> بعد في نسختنا التجريبية الحالية. <br>
                                نقترح عليك اختيار أحد الصفوف الدراسية الممتلئة بالكامل بالدروس والكويزات لمعاينتها فوراً:
                            </p>
                            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                                <button class="btn-primary" id="demo-grade-sec3-btn" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
                                    <span>الصف الثالث الثانوي (كامل المنهج)</span>
                                </button>
                                <button class="btn-secondary" id="demo-grade-prim6-btn" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
                                    <span>الصف السادس الابتدائي (علوم)</span>
                                </button>
                                <button class="btn-secondary" id="demo-grade-prep1-btn" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
                                    <span>الصف الأول الإعدادي (لغة عربية)</span>
                                </button>
                            </div>
                        </div>
                    ` : finalFilteredCourses.map(course => {
                        const isEnrolled = state.enrolledCourses.includes(course.id);
                        return `
                            <div class="course-card">
                                <div class="course-card-img-wrap">
                                    <img src="${course.image}" alt="${course.title}" class="course-card-img">
                                    <span class="course-card-badge badge ${
                                        course.category === 'math' ? 'badge-primary' : 
                                        course.category === 'physics' ? 'badge-secondary' : 'badge-success'
                                    }">
                                        ${course.categoryAr}
                                    </span>
                                </div>
                                <div class="course-card-content">
                                    <div class="course-meta">
                                        <span><i class="fa-regular fa-video" style="margin-left: 4px;"></i>${course.duration}</span>
                                        <span><i class="fa-solid fa-star" style="color: #fbbf24; margin-left: 4px;"></i>${course.rating}</span>
                                    </div>
                                    <h3 class="course-card-title">${course.title}</h3>
                                    <p class="course-card-desc">${course.description}</p>
                                    <div class="course-card-footer">
                                        <div class="instructor-info">
                                            <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="instructor-avatar">
                                            <span class="instructor-name">${course.instructor.name}</span>
                                        </div>
                                        <button class="enroll-card-btn" data-course-id="${course.id}">
                                            <span>${isEnrolled ? 'مواصلة المذاكرة' : 'ابدأ الدراسة الآن مجاناً'}</span>
                                            <i class="fa-solid fa-chevron-left"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </section>

            <!-- Premium App Value Statement Section -->
            <section class="glass-panel promo-section">
                <div>
                    <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem;">لماذا يختار الطلاب وأولياء الأمور منصتنا؟</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.05rem;">نحن لا نقدم مجرد دروس مسجلة، بل نبني بيئة دراسية متكاملة تزيد من استيعاب الطلاب وتهيئهم للامتحانات عبر أحدث التقنيات التفاعلية الذكية.</p>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 1.25rem;">
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div class="badge badge-primary" style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div>
                                <h4 style="font-weight: 700;">شروحات وحصص تفاعلية بجودة ممتازة</h4>
                                <p style="font-size: 0.9rem; color: var(--text-secondary);">مشاهدة مريحة في أي وقت للدروس وتجارب معملية مبسطة للغاية.</p>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div class="badge badge-secondary" style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div>
                                <h4 style="font-weight: 700;">اختبارات وتقييمات تفاعلية مستمرة</h4>
                                <p style="font-size: 0.9rem; color: var(--text-secondary);">اختبر معلوماتك بعد الفصول التدريبية واحصل على تقارير تفصيلية فورا لتثبيت المعلومات.</p>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div class="badge badge-success" style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div>
                                <h4 style="font-weight: 700;">ملخصات وكتب وملفات PDF للتحميل</h4>
                                <p style="font-size: 0.9rem; color: var(--text-secondary);">احصل على كامل الملخصات المدرسية المجهزة للطباعة والمراجعة النهائية مجاناً.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div style="position: relative;">
                    <img src="assets/images/learning_vector.jpg" alt="التجربة التفاعلية المدرسية" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: 1px solid var(--glass-border); width: 100%; aspect-ratio: 4/3; object-fit: cover;">
                </div>
            </section>

            <!-- Testimonials & Reviews Section -->
            <section class="testimonials-section">
                <div class="section-title" style="text-align: center; margin-bottom: 3.5rem;">
                    <h2>قصص نجاح وتفوق ملهمة</h2>
                    <p>طلابنا يحصدون الدرجات النهائية ويتصدرون قوائم المتفوقين دائماً</p>
                </div>
                <div class="testimonials-grid">
                    <!-- Testimonial 1 -->
                    <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-lg);">
                        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="أنس" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <h4 style="font-weight: 700;">أنس بن خالد</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted);">طالب بالصف الثالث الثانوي - علمي</p>
                            </div>
                        </div>
                        <p style="font-size: 0.95rem; color: var(--text-secondary);">"ساعدتني منصتي كثيراً في استيعاب دروس الرياضيات المعقدة وحساب المحددات والمصفوفات. الكويزات التفاعلية وحلها فوراً ثبتت القوانين في ذهني وجعلتني متفوقاً في المدرسة!"</p>
                    </div>
                    <!-- Testimonial 2 -->
                    <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-lg);">
                        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="ريم" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <h4 style="font-weight: 700;">ريم السعدي</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted);">طالبة بالصف الثاني الثانوي</p>
                            </div>
                        </div>
                        <p style="font-size: 0.95rem; color: var(--text-secondary);">"شرح الفيزياء كان رائعاً للغاية! تحولت مادة الفيزياء من كونها مادة معقدة وجافة إلى أكثر المواد إمتاعاً وسلاسة بفضل الفيديوهات المعملية المذهلة ومتابعة التقدم اليومي."</p>
                    </div>
                    <!-- Testimonial 3 -->
                    <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-lg);">
                        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="أحمد" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <h4 style="font-weight: 700;">أ. أحمد البشير</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted);">ولي أمر طالب في المرحلة الثانوية</p>
                            </div>
                        </div>
                        <p style="font-size: 0.95rem; color: var(--text-secondary);">"نظام لوحة تحكم الطالب مكنني كولي أمر من متابعة تقدم ابني الدراسي ومعرفة الدروس التي أكملها ونقاط كويزاته بسهولة تامة. منصة ممتازة وتوفر جودة تعليمية حقيقية للمناهج المدرسية!"</p>
                    </div>
                </div>
            </section>

            <!-- Elegant Footer -->
            <footer class="main-footer">
                <div class="footer-grid">
                    <div class="footer-about">
                        <div class="logo-container" style="font-size: 1.8rem; margin-bottom: 1rem;">
                            <div class="logo-icon-wrap" style="width: 46px; height: 46px;">
                                <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                            </div>
                            <span>منصتي</span>
                        </div>
                        <p>المنصة المدرسية العربية الأولى لتعلم المناهج الدراسية بأساليب تفاعلية مبتكرة وشرح مبسط لضمان العلامة الكاملة.</p>
                    </div>
                    <div class="footer-links-col">
                        <h4>روابط مهمة</h4>
                        <ul>
                            <li><a href="#" data-nav="landing">الرئيسية</a></li>
                            <li><a href="#courses-section" id="footer-courses-link">المواد الدراسية</a></li>
                            <li><a href="#" data-nav="dashboard">بوابة الطالب</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>المواد الأساسية</h4>
                        <ul>
                            <li><a href="#" class="footer-spec-filter" data-filter="math">الرياضيات</a></li>
                            <li><a href="#" class="footer-spec-filter" data-filter="physics">الفيزياء</a></li>
                            <li><a href="#" class="footer-spec-filter" data-filter="arabic">اللغة العربية</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>تواصل معنا</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.95rem;">
                            <li><i class="fa-solid fa-envelope" style="margin-left: 8px;"></i> support@menassaty.com</li>
                            <li><i class="fa-solid fa-phone" style="margin-left: 8px;"></i> +966 500 000 000</li>
                            <li><i class="fa-solid fa-location-dot" style="margin-left: 8px;"></i> الرياض، المملكة العربية السعودية</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>جميع الحقوق محفوظة © منصتي التعليمية 2026</span>
                    <div class="social-links">
                        <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </footer>
        `;

        setupEventListeners();
    }

    function setupEventListeners() {
        // Theme toggle button
        const themeBtn = container.querySelector('#theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                actions.toggleTheme();
            });
        }

        // Navigation Link Routing
        container.querySelectorAll('[data-nav]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const route = element.getAttribute('data-nav');
                actions.navigate(route);
            });
        });

        // CTA Buttons
        const ctaBtn = container.querySelector('#header-cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => actions.navigate('dashboard'));
        }

        const heroPrimaryBtn = container.querySelector('#hero-primary-btn');
        if (heroPrimaryBtn) {
            heroPrimaryBtn.addEventListener('click', () => {
                const sec = container.querySelector('#stages-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        }

        const heroSecBtn = container.querySelector('#hero-secondary-btn');
        if (heroSecBtn) {
            heroSecBtn.addEventListener('click', () => actions.navigate('dashboard'));
        }

        // Scroll to courses link
        const coursesLink = container.querySelector('#nav-to-courses');
        if (coursesLink) {
            coursesLink.addEventListener('click', (e) => {
                e.preventDefault();
                const sec = container.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        const footerCoursesLink = container.querySelector('#footer-courses-link');
        if (footerCoursesLink) {
            footerCoursesLink.addEventListener('click', (e) => {
                e.preventDefault();
                const sec = container.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Stage Tabs Click Handler
        container.querySelectorAll('.stage-tabs-bar .stage-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = btn.getAttribute('data-stage');
                state.selectedStage = stage;
                render();
                
                // Keep the stages-section viewport stable after render
                const sec = container.querySelector('#stages-section');
                if (sec) sec.scrollIntoView({ behavior: 'auto' });
            });
        });

        // Grade Card Click Handler
        container.querySelectorAll('.grades-panel-content .grade-card').forEach(card => {
            card.addEventListener('click', () => {
                const gradeId = card.getAttribute('data-grade-id');
                const stage = card.getAttribute('data-grade-stage');
                const title = card.getAttribute('data-grade-title');
                
                actions.selectGrade(stage, gradeId, title);
                
                // Smooth scroll down to course section immediately
                setTimeout(() => {
                    const sec = container.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            });
        });

        // Blank state demo grade buttons
        const demoSec3 = container.querySelector('#demo-grade-sec3-btn');
        if (demoSec3) {
            demoSec3.addEventListener('click', () => {
                actions.selectGrade('secondary', 'sec3', 'الصف الثالث الثانوي');
                setTimeout(() => {
                    const sec = container.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            });
        }

        const demoPrim6 = container.querySelector('#demo-grade-prim6-btn');
        if (demoPrim6) {
            demoPrim6.addEventListener('click', () => {
                actions.selectGrade('primary', 'prim6', 'الصف السادس الابتدائي');
                setTimeout(() => {
                    const sec = container.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            });
        }

        const demoPrep1 = container.querySelector('#demo-grade-prep1-btn');
        if (demoPrep1) {
            demoPrep1.addEventListener('click', () => {
                actions.selectGrade('preparatory', 'prep1', 'الصف الأول الإعدادي');
                setTimeout(() => {
                    const sec = container.querySelector('#courses-section');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            });
        }

        // Course filter tabs
        container.querySelectorAll('.course-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.getAttribute('data-filter');
                render();
                const sec = container.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Footer specialty filters
        container.querySelectorAll('.footer-spec-filter').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentFilter = link.getAttribute('data-filter');
                render();
                const sec = container.querySelector('#courses-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Enroll buttons
        container.querySelectorAll('.enroll-card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const courseId = btn.getAttribute('data-course-id');
                const isEnrolled = state.enrolledCourses.includes(courseId);
                
                if (isEnrolled) {
                    actions.openCoursePlayer(courseId);
                } else {
                    actions.enrollInCourse(courseId);
                }
            });
        });
    }

    render();
}
