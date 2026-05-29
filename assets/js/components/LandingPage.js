/* ==========================================================================
   Menassaty School Landing Page Component
   ========================================================================== */

import { courses } from '../coursesData.js';

export function initLandingPage(container, state, actions) {
    let currentFilter = 'all';

    function render() {
        const filteredCourses = currentFilter === 'all' 
            ? courses 
            : courses.filter(c => c.category === currentFilter);

        container.innerHTML = `
            <!-- Top Elegant Header -->
            <header class="main-header glass-panel scrolled">
                <div class="logo-container">
                    <div class="logo-icon-wrap">
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <span>منصتي المدرسية</span>
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
                            <span>استعرض المواد المدرسية</span>
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
                    <span class="stat-num" data-val="50">3 مواد</span>
                    <span class="stat-label">أساسية تفاعلية</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num" data-val="200">+48 درس</span>
                    <span class="stat-label">مشروح بدقة</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num" data-val="98">99.2%</span>
                    <span class="stat-label">نسبة النجاح والتفوق</span>
                </div>
            </section>

            <!-- Featured Courses Section -->
            <section id="courses-section" class="featured-courses">
                <div class="section-header">
                    <div class="section-title">
                        <h2>استكشف موادك المنهجية التفاعلية</h2>
                        <p>اختر المادة الدراسية للبدء في تصفح الفصول والدروس وإجراء الاختبارات التفاعلية</p>
                    </div>
                    <div class="course-filters">
                        <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">الكل</button>
                        <button class="filter-btn ${currentFilter === 'math' ? 'active' : ''}" data-filter="math">الرياضيات</button>
                        <button class="filter-btn ${currentFilter === 'physics' ? 'active' : ''}" data-filter="physics">الفيزياء</button>
                        <button class="filter-btn ${currentFilter === 'arabic' ? 'active' : ''}" data-filter="arabic">اللغة العربية</button>
                    </div>
                </div>

                <div class="courses-grid">
                    ${filteredCourses.map(course => {
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
                                <i class="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span>منصتي المدرسية</span>
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
                    <span>جميع الحقوق محفوظة © منصتي التعليمية المدرسية 2026</span>
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
                const sec = container.querySelector('#courses-section');
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
