import{b as u,d as b,c as S}from"./index-Q_k2hM5E.js";import x from"./storageService-BxdiJ_ts.js";import{e as l}from"./xss-D4V6puIs.js";function M(t,s,o){let c="all",m="";const T=u.subscribe(p=>{(s.theme!==p.theme||s.user!==p.user)&&(s=p,y())});function y(){const p=b.searchCourses(m,"all","all").filter(e=>e.grade===s.selectedGrade),g=c==="all"?p:p.filter(e=>e.category===c),r=!!s.user;S.isAdmin();const v=S.isInstructor();t.innerHTML=`
            <!-- Top Elegant Header -->
            <header class="main-header glass-panel scrolled">
                <div class="logo-container" id="logo-btn" style="cursor: pointer;">
                    <div class="logo-icon-wrap">
                        <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" class="logo-img">
                    </div>
                    <span>منصتي</span>
                </div>
                <nav class="main-nav">
                    <a href="#" class="nav-link active" id="nav-home">الرئيسية</a>
                    <a href="#courses-section" class="nav-link" id="nav-to-courses">المواد الدراسية</a>
                    ${r?`
                        <a href="#" class="nav-link" id="nav-student-db">بوابة الطالب</a>
                        ${v?'<a href="#" class="nav-link" id="nav-admin-db">لوحة الإدارة</a>':""}
                    `:""}
                </nav>
                <div class="header-actions">
                    <!-- Light/Dark Mode Switcher -->
                    <button class="btn-icon" id="theme-toggle-btn" title="تغيير المظهر">
                        <i class="fa-solid ${s.theme==="dark"?"fa-sun":"fa-moon"}"></i>
                    </button>
                    ${r?`
                        <button class="btn-icon" id="profile-btn-nav" title="الملف الشخصي" style="margin-left:8px;">
                            <img src="${l(s.user.avatar)}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                        </button>
                        <button class="btn-secondary" id="logout-btn-nav" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 8px;">
                            <span>تسجيل الخروج</span>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    `:`
                        <button class="btn-primary" id="login-btn-nav">
                            <span>ابدأ المذاكرة الآن</span>
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                    `}
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
                            <span>بوابة الطلاب</span>
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
                            <h4 style="font-weight: 700; font-size: 0.95rem;">+12,000 طالب</h4>
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
                    <span class="stat-num">+12K</span>
                    <span class="stat-label">طلاب متفوقين</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">3 مراحل</span>
                    <span class="stat-label">ابتدائي، إعدادي، ثانوي</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">12 صفاً</span>
                    <span class="stat-label">دراسياً متكاملاً</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">99.2%</span>
                    <span class="stat-label">نسبة النجاح والتفوق</span>
                </div>
            </section>

            <!-- Search Bar Component -->
            <section class="search-section" style="padding: 1.5rem 4rem; max-width: 900px; margin: 0 auto;">
                <div class="glass-panel" style="padding: 0.75rem 1.5rem; border-radius: var(--radius-lg); display: flex; align-items: center; gap: 1rem; border-color: rgba(99,102,241,0.2);">
                    <i class="fa-solid fa-magnifying-glass" style="color: var(--primary); font-size: 1.25rem;"></i>
                    <input type="text" id="course-search-input" value="${l(m)}" placeholder="ابحث عن مادة، درس، أو معلم..." style="flex: 1; border: none; background: transparent; color: var(--text-primary); font-family: inherit; font-size: 1.05rem; outline: none;">
                    ${m?'<button id="search-clear-btn" style="background:none; border:none; color:var(--text-muted); cursor:pointer;"><i class="fa-solid fa-circle-xmark"></i></button>':""}
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
                    <button class="stage-tab-btn ${s.selectedStage==="primary"?"active":""}" data-stage="primary">
                        <i class="fa-solid fa-child" style="margin-left: 8px;"></i>
                        <span>المرحلة الابتدائية</span>
                    </button>
                    <button class="stage-tab-btn ${s.selectedStage==="preparatory"?"active":""}" data-stage="preparatory">
                        <i class="fa-solid fa-user-graduate" style="margin-left: 8px;"></i>
                        <span>المرحلة الإعدادية</span>
                    </button>
                    <button class="stage-tab-btn ${s.selectedStage==="secondary"?"active":""}" data-stage="secondary">
                        <i class="fa-solid fa-award" style="margin-left: 8px;"></i>
                        <span>المرحلة الثانوية</span>
                    </button>
                </div>

                <!-- Grades panels grids -->
                <div class="grades-panels-container">
                    <div class="grades-panel-content ${s.selectedStage==="primary"?"active":""}">
                        <div class="grades-cards-grid">
                            ${[{id:"prim1",name:"الصف الأول الابتدائي"},{id:"prim2",name:"الصف الثاني الابتدائي"},{id:"prim3",name:"الصف الثالث الابتدائي"},{id:"prim4",name:"الصف الرابع الابتدائي"},{id:"prim5",name:"الصف الخامس الابتدائي"},{id:"prim6",name:"الصف السادس الابتدائي"}].map(e=>`
                                <div class="grade-card glass-panel ${s.selectedGrade===e.id?"active":""}" data-grade-id="${e.id}" data-grade-title="${e.name}" data-grade-stage="primary">
                                    <div class="grade-card-icon">🏫</div>
                                    <h3>${l(e.name)}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="grades-panel-content ${s.selectedStage==="preparatory"?"active":""}">
                        <div class="grades-cards-grid">
                            ${[{id:"prep1",name:"الصف الأول الإعدادي"},{id:"prep2",name:"الصف الثاني الإعدادي"},{id:"prep3",name:"الصف الثالث الإعدادي"}].map(e=>`
                                <div class="grade-card glass-panel ${s.selectedGrade===e.id?"active":""}" data-grade-id="${e.id}" data-grade-title="${e.name}" data-grade-stage="preparatory">
                                    <div class="grade-card-icon">🎓</div>
                                    <h3>${l(e.name)}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="grades-panel-content ${s.selectedStage==="secondary"?"active":""}">
                        <div class="grades-cards-grid">
                            ${[{id:"sec1",name:"الصف الأول الثانوي"},{id:"sec2",name:"الصف الثاني الثانوي"},{id:"sec3",name:"الصف الثالث الثانوي"}].map(e=>`
                                <div class="grade-card glass-panel ${s.selectedGrade===e.id?"active":""}" data-grade-id="${e.id}" data-grade-title="${e.name}" data-grade-stage="secondary">
                                    <div class="grade-card-icon">🏆</div>
                                    <h3>${l(e.name)}</h3>
                                    <span class="grade-card-arrow"><i class="fa-solid fa-chevron-left"></i></span>
                                </div>
                            `).join("")}
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
                            <span>تصفح مناهج: ${l(s.selectedGradeAr)}</span>
                        </div>
                        <h2>المواد الدراسية المتاحة</h2>
                        <p>اختر المادة للبدء في تصفح الفصول والدروس وإجراء الاختبارات التفاعلية</p>
                    </div>
                    <div class="course-filters">
                        <button class="filter-btn ${c==="all"?"active":""}" data-filter="all">الكل</button>
                        <button class="filter-btn ${c==="math"?"active":""}" data-filter="math">الرياضيات</button>
                        <button class="filter-btn ${c==="physics"?"active":""}" data-filter="physics">الفيزياء والعلوم</button>
                        <button class="filter-btn ${c==="arabic"?"active":""}" data-filter="arabic">اللغة العربية</button>
                    </div>
                </div>

                <div class="courses-grid">
                    ${g.length===0?`
                        <div class="glass-panel" style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; border-radius: var(--radius-lg); border: 1px solid var(--card-border);">
                            <div style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                                <i class="fa-solid fa-circle-nodes"></i>
                            </div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem;">منهج دراسي قيد التجهيز</h3>
                            <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7;">
                                لم نجد شروحات مطابقة لطلبك في صف <strong>${l(s.selectedGradeAr)}</strong> حالياً. <br>
                                نقترح عليك اختيار أحد الصفوف الدراسية الممتلئة بالدروس والكويزات لمعاينتها فوراً:
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
                    `:g.map(e=>{const f=s.progress&&s.progress.enrolledCourses&&s.progress.enrolledCourses.includes(e.id),h=s.progress&&s.progress.favoriteCourses&&s.progress.favoriteCourses.includes(e.id);return`
                            <div class="course-card">
                                <div class="course-card-img-wrap">
                                    <img src="${l(e.image)}" alt="${l(e.title)}" class="course-card-img">
                                    <span class="course-card-badge badge ${e.category==="math"?"badge-primary":e.category==="physics"?"badge-secondary":"badge-success"}">
                                        ${l(e.categoryAr)}
                                    </span>
                                    <!-- Favorite Button -->
                                    <button class="fav-card-btn glass-panel ${h?"active":""}" data-fav-id="${e.id}" title="إضافة للمفضلة" style="position:absolute; top: 10px; right: 10px; border-radius: 50%; width: 36px; height: 36px; display:flex; align-items:center; justify-content:center; border:1px solid var(--glass-border); cursor:pointer; color: ${h?"var(--secondary)":"var(--text-primary)"}; z-index:10; background: rgba(255,255,255,0.15);">
                                        <i class="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                                <div class="course-card-content">
                                    <div class="course-meta">
                                        <span><i class="fa-regular fa-video" style="margin-left: 4px;"></i>${l(e.duration)}</span>
                                        <span><i class="fa-solid fa-star" style="color: #fbbf24; margin-left: 4px;"></i>${e.rating}</span>
                                    </div>
                                    <h3 class="course-card-title">${l(e.title)}</h3>
                                    <p class="course-card-desc">${l(e.description)}</p>
                                    <div class="course-card-footer">
                                        <div class="instructor-info">
                                            <img src="${l(e.instructor.avatar)}" alt="${l(e.instructor.name)}" class="instructor-avatar">
                                            <span class="instructor-name">${l(e.instructor.name)}</span>
                                        </div>
                                        <button class="enroll-card-btn" data-course-id="${e.id}">
                                            <span>${f?"مواصلة المذاكرة":"ابدأ الدراسة الآن مجاناً"}</span>
                                            <i class="fa-solid fa-chevron-left"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `}).join("")}
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
                            <li><a href="#" id="footer-link-home">الرئيسية</a></li>
                            <li><a href="#courses-section" id="footer-link-courses">المواد الدراسية</a></li>
                            <li><a href="#" id="footer-link-db">بوابة الطالب</a></li>
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
        `,B()}function B(){var f,h,w,E,q,L,C,A,z,G,I,j,D,F;const p=t.querySelector("#theme-toggle-btn");p&&p.addEventListener("click",a=>{a.preventDefault();const i=s.theme==="light"?"dark":"light";u.setTheme(i),document.body.className=i==="dark"?"dark-theme":"light-theme"});const g=t.querySelector("#course-search-input");g&&g.addEventListener("input",a=>{m=a.target.value;const i=b.searchCourses(m,"all","all").filter(n=>n.grade===s.selectedGrade),d=c==="all"?i:i.filter(n=>n.category===c);k(d)});const r=t.querySelector("#search-clear-btn");r&&r.addEventListener("click",()=>{m="",y()}),(f=t.querySelector("#logo-btn"))==null||f.addEventListener("click",()=>o.navigate("landing")),(h=t.querySelector("#nav-home"))==null||h.addEventListener("click",a=>{a.preventDefault(),o.navigate("landing")}),(w=t.querySelector("#nav-student-db"))==null||w.addEventListener("click",a=>{a.preventDefault(),o.navigate("dashboard")}),(E=t.querySelector("#nav-admin-db"))==null||E.addEventListener("click",a=>{a.preventDefault(),o.navigate("admin")}),(q=t.querySelector("#profile-btn-nav"))==null||q.addEventListener("click",()=>o.navigate("profile")),(L=t.querySelector("#logout-btn-nav"))==null||L.addEventListener("click",async()=>{await S.logout(),o.navigate("landing")}),(C=t.querySelector("#login-btn-nav"))==null||C.addEventListener("click",()=>o.navigate("auth")),(A=t.querySelector("#hero-secondary-btn"))==null||A.addEventListener("click",()=>o.navigate("dashboard"));const v=t.querySelector("#nav-to-courses");v&&v.addEventListener("click",a=>{a.preventDefault();const i=t.querySelector("#courses-section");i&&i.scrollIntoView({behavior:"smooth"})});const e=t.querySelector("#hero-primary-btn");e&&e.addEventListener("click",()=>{const a=t.querySelector("#stages-section");a&&a.scrollIntoView({behavior:"smooth"})}),(z=t.querySelector("#footer-link-home"))==null||z.addEventListener("click",a=>{a.preventDefault(),o.navigate("landing")}),(G=t.querySelector("#footer-link-db"))==null||G.addEventListener("click",a=>{a.preventDefault(),o.navigate("dashboard")}),(I=t.querySelector("#footer-link-courses"))==null||I.addEventListener("click",a=>{a.preventDefault();const i=t.querySelector("#courses-section");i&&i.scrollIntoView({behavior:"smooth"})}),t.querySelectorAll(".stage-tabs-bar .stage-tab-btn").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-stage");u.setState({selectedStage:i})})}),t.querySelectorAll(".grades-panel-content .grade-card").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-grade-id"),d=a.getAttribute("data-grade-stage"),n=a.getAttribute("data-grade-title");u.setState({selectedStage:d,selectedGrade:i,selectedGradeAr:n}),setTimeout(()=>{const $=t.querySelector("#courses-section");$&&$.scrollIntoView({behavior:"smooth"})},100)})}),(j=t.querySelector("#demo-grade-sec3-btn"))==null||j.addEventListener("click",()=>{u.setState({selectedStage:"secondary",selectedGrade:"sec3",selectedGradeAr:"الصف الثالث الثانوي"})}),(D=t.querySelector("#demo-grade-prim6-btn"))==null||D.addEventListener("click",()=>{u.setState({selectedStage:"primary",selectedGrade:"prim6",selectedGradeAr:"الصف السادس الابتدائي"})}),(F=t.querySelector("#demo-grade-prep1-btn"))==null||F.addEventListener("click",()=>{u.setState({selectedStage:"preparatory",selectedGrade:"prep1",selectedGradeAr:"الصف الأول الإعدادي"})}),t.querySelectorAll(".course-filters .filter-btn").forEach(a=>{a.addEventListener("click",()=>{c=a.getAttribute("data-filter"),t.querySelectorAll(".course-filters .filter-btn").forEach(n=>n.classList.remove("active")),a.classList.add("active");const i=b.searchCourses(m,"all","all").filter(n=>n.grade===s.selectedGrade),d=c==="all"?i:i.filter(n=>n.category===c);k(d)})}),t.querySelectorAll(".footer-spec-filter").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault(),c=a.getAttribute("data-filter"),y(),setTimeout(()=>{const d=t.querySelector("#courses-section");d&&d.scrollIntoView({behavior:"smooth"})},100)})}),t.querySelectorAll(".enroll-card-btn").forEach(a=>{a.addEventListener("click",async i=>{i.preventDefault();const d=a.getAttribute("data-course-id");s.progress&&s.progress.enrolledCourses&&s.progress.enrolledCourses.includes(d)?o.navigate("classroom",{courseId:d}):await x.enrollInCourse(d)?o.navigate("dashboard"):o.navigate("auth")})}),t.querySelectorAll("[data-fav-id]").forEach(a=>{a.addEventListener("click",async i=>{i.stopPropagation(),i.preventDefault();const d=a.getAttribute("data-fav-id"),n=b.getCourseById(d);n&&await x.toggleFavorite(d,n.title)})})}function k(p){const g=t.querySelector(".courses-grid");if(g){if(p.length===0){g.innerHTML=`
                <div class="glass-panel" style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; border-radius: var(--radius-lg); border: 1px solid var(--card-border); width: 100%;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; color:var(--text-muted); margin-bottom:1rem;"></i>
                    <h3>لا توجد نتائج مطابقة لبحثك</h3>
                    <p style="color:var(--text-secondary);">يرجى التأكد من كتابة الكلمات بشكل صحيح أو تجربة كلمات بحث أخرى.</p>
                </div>
            `;return}g.innerHTML=p.map(r=>{const v=s.progress&&s.progress.enrolledCourses&&s.progress.enrolledCourses.includes(r.id),e=s.progress&&s.progress.favoriteCourses&&s.progress.favoriteCourses.includes(r.id);return`
                <div class="course-card">
                    <div class="course-card-img-wrap">
                        <img src="${l(r.image)}" alt="${l(r.title)}" class="course-card-img">
                        <span class="course-card-badge badge ${r.category==="math"?"badge-primary":r.category==="physics"?"badge-secondary":"badge-success"}">
                            ${l(r.categoryAr)}
                        </span>
                        <button class="fav-card-btn glass-panel ${e?"active":""}" data-fav-id="${r.id}" title="إضافة للمفضلة" style="position:absolute; top: 10px; right: 10px; border-radius: 50%; width: 36px; height: 36px; display:flex; align-items:center; justify-content:center; border:1px solid var(--glass-border); cursor:pointer; color: ${e?"var(--secondary)":"var(--text-primary)"}; z-index:10; background: rgba(255,255,255,0.15);">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                    <div class="course-card-content">
                        <div class="course-meta">
                            <span><i class="fa-regular fa-video" style="margin-left: 4px;"></i>${l(r.duration)}</span>
                            <span><i class="fa-solid fa-star" style="color: #fbbf24; margin-left: 4px;"></i>${r.rating}</span>
                        </div>
                        <h3 class="course-card-title">${l(r.title)}</h3>
                        <p class="course-card-desc">${l(r.description)}</p>
                        <div class="course-card-footer">
                            <div class="instructor-info">
                                <img src="${l(r.instructor.avatar)}" alt="${l(r.instructor.name)}" class="instructor-avatar">
                                <span class="instructor-name">${l(r.instructor.name)}</span>
                            </div>
                            <button class="enroll-card-btn" data-course-id="${r.id}">
                                <span>${v?"مواصلة المذاكرة":"ابدأ الدراسة الآن مجاناً"}</span>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `}).join(""),g.querySelectorAll(".enroll-card-btn").forEach(r=>{r.addEventListener("click",async v=>{v.preventDefault();const e=r.getAttribute("data-course-id");s.progress&&s.progress.enrolledCourses&&s.progress.enrolledCourses.includes(e)?o.navigate("classroom",{courseId:e}):await x.enrollInCourse(e)?o.navigate("dashboard"):o.navigate("auth")})}),g.querySelectorAll("[data-fav-id]").forEach(r=>{r.addEventListener("click",async v=>{v.stopPropagation(),v.preventDefault();const e=r.getAttribute("data-fav-id"),f=b.getCourseById(e);f&&await x.toggleFavorite(e,f.title)})})}}return y(),()=>{T()}}export{M as default,M as initLandingPage};
