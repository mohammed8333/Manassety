import{b as S,c as z,d as q,n as C}from"./index-DiqDKeqa.js";import A from"./storageService-Cz0gsLDv.js";import{e as r}from"./xss-D4V6puIs.js";function V(t,s,p){let u="home";const I=S.subscribe(d=>{s!==d&&(s=d,y())});function x(d){const c=q.getCourseById(d);if(!c)return{percentage:0,completedCount:0,totalLessons:0};let m=0;if(c.chapters.forEach(n=>m+=n.lessons.length),m===0)return{percentage:0,completedCount:0,totalLessons:0};let f=0;return c.chapters.forEach(n=>{n.lessons.forEach(v=>{s.progress&&s.progress.completedLessons&&s.progress.completedLessons[d]&&s.progress.completedLessons[d].includes(v.id)&&f++})}),{percentage:Math.round(f/m*100),completedCount:f,totalLessons:m}}function y(){const d=s.progress&&s.progress.enrolledCourses||[],c=s.courses.filter(l=>d.includes(l.id)),m=s.progress&&s.progress.favoriteCourses||[],f=s.courses.filter(l=>m.includes(l.id)),n=d.length,v=s.progress&&s.progress.passedQuizzes&&s.progress.passedQuizzes.length||0;let b=0;if(n>0){let l=0;d.forEach(h=>{l+=x(h).percentage||0}),b=Math.round(l/n)}let g=null,a=null;if(n>0){for(let l=c.length-1;l>=0;l--){const h=x(c[l].id);if(h.percentage<100){g=c[l],a=h;break}}g||(g=c[c.length-1],a=x(g.id))}z.isAdmin();const i=z.isInstructor();t.innerHTML=`
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
                        <li class="sidebar-item ${u==="home"?"active":""}">
                            <a href="#" id="sb-home-link">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span>لوحة التحكم</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${u==="favorites"?"active":""}">
                            <a href="#" id="sb-favorites-link">
                                <i class="fa-solid fa-heart"></i>
                                <span>المفضلة</span>
                                ${m.length>0?`<span class="badge badge-primary" style="margin-right:auto; padding: 0.15rem 0.4rem; font-size:0.7rem;">${m.length}</span>`:""}
                            </a>
                        </li>
                        <li class="sidebar-item ${u==="notifications"?"active":""}">
                            <a href="#" id="sb-notifications-link">
                                <i class="fa-solid fa-bell"></i>
                                <span>الإشعارات</span>
                                ${s.notifications&&s.notifications.filter(l=>!l.read).length>0?`
                                    <span class="badge badge-secondary" style="margin-right:auto; padding: 0.15rem 0.4rem; font-size:0.7rem;">
                                        ${s.notifications.filter(l=>!l.read).length}
                                    </span>
                                `:""}
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" id="sb-explore-link">
                                <i class="fa-solid fa-book-open"></i>
                                <span>تصفح المناهج</span>
                            </a>
                        </li>
                        ${i?`
                            <li class="sidebar-item">
                                <a href="#" id="sb-admin-link">
                                    <i class="fa-solid fa-toolbox"></i>
                                    <span style="color:var(--primary); font-weight:700;">لوحة الإدارة</span>
                                </a>
                            </li>
                        `:""}
                        <li class="sidebar-item">
                            <a href="#" id="sb-profile-link">
                                <i class="fa-solid fa-user-gear"></i>
                                <span>الملف الشخصي</span>
                            </a>
                        </li>
                    </ul>
                    
                    <div class="sidebar-footer">
                        <div class="user-profile-badge" id="sidebar-profile-card" style="cursor:pointer;" title="عرض الملف الشخصي">
                            <img src="${r(s.user.avatar)}" alt="${r(s.user.name)}" class="user-avatar">
                            <div class="user-details">
                                <h4 class="user-name">${r(s.user.name)}</h4>
                                <span class="user-role" style="font-size:0.75rem;">${r(s.user.email)}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Dashboard Main Content -->
                <main class="dashboard-content">
                    <header class="dashboard-header">
                        <div class="welcome-msg">
                            <h2>أهلاً بك مجدداً يا ${r(s.user.name.split(" ")[0])}! 👋</h2>
                            <p>سعداء برؤيتك اليوم. إليك ملخص تقدمك ومذاكرتك المدرسية الحالية.</p>
                        </div>
                        <div class="dashboard-actions">
                            <button class="btn-icon" id="dashboard-theme-toggle" title="تغيير المظهر">
                                <i class="fa-solid ${s.theme==="dark"?"fa-sun":"fa-moon"}"></i>
                            </button>
                            <button class="btn-primary" id="explore-more-btn">
                                <i class="fa-solid fa-plus" style="margin-left: 6px;"></i>
                                <span>دراسة مادة جديدة</span>
                            </button>
                        </div>
                    </header>

                    ${D(u,n,b,v,g,a,c,f)}
                </main>
            </div>
        `,T()}function D(d,c,m,f,n,v,b,g){if(d==="home")return`
                <!-- Active Grade Level Card Widget -->
                <div class="glass-panel" style="padding: 1.25rem 2rem; border-radius: var(--radius-lg); margin-bottom: 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-color: rgba(99,102,241,0.25);">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="badge badge-primary" style="width: 46px; height: 46px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                            🏫
                        </div>
                        <div>
                            <h4 style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">صفك الدراسي الحالي</h4>
                            <p style="font-size: 0.85rem; color: var(--text-secondary);">${r(s.selectedGradeAr)}</p>
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
                            <span class="db-stat-num">${c}</span>
                        </div>
                        <div class="db-stat-icon-wrap">
                            <i class="fa-solid fa-book-bookmark"></i>
                        </div>
                    </div>
                    <div class="dashboard-stat-card card-2">
                        <div class="db-stat-details">
                            <h4>معدل المذاكرة والإكمال</h4>
                            <span class="db-stat-num">${m}%</span>
                        </div>
                        <div class="db-stat-icon-wrap">
                            <i class="fa-solid fa-chart-line-up"></i>
                        </div>
                    </div>
                    <div class="dashboard-stat-card card-3">
                        <div class="db-stat-details">
                            <h4>اختبارات تم اجتيازها</h4>
                            <span class="db-stat-num">${f}</span>
                        </div>
                        <div class="db-stat-icon-wrap">
                            <i class="fa-solid fa-trophy-star"></i>
                        </div>
                    </div>
                </div>

                <!-- Continue Learning Widget -->
                ${n?`
                    <div class="dashboard-section-title">
                        <i class="fa-solid fa-circle-play" style="color: var(--primary);"></i>
                        <h3>مواصلة المذاكرة</h3>
                    </div>
                    <div class="resume-course-widget glass-panel">
                        <div class="resume-details">
                            <span class="badge badge-primary" style="margin-bottom: 0.75rem;">
                                ${r(n.categoryAr)}
                            </span>
                            <h3>${r(n.title)}</h3>
                            <p>المعلم: ${r(n.instructor.name)} | تبقت لك ${v.totalLessons-v.completedCount} حصص لإكمال المنهج بالكامل</p>
                            
                            <div style="display: flex; align-items: center; width: 100%;">
                                <div class="progress-bar-container">
                                    <div class="progress-bar-fill" style="width: ${v.percentage}%;"></div>
                                </div>
                                <span class="progress-pct">${v.percentage}% مكتمل</span>
                            </div>
                        </div>
                        <button class="btn-primary" id="resume-course-action-btn" data-course-id="${n.id}">
                            <span>متابعة المذاكرة</span>
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                `:""}

                <!-- Enrolled Courses Grid -->
                <div class="dashboard-section-title" style="margin-top: 2rem;">
                    <i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i>
                    <h3>موادي الدراسية الحالية</h3>
                </div>

                ${c===0?`
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
                `:`
                    <div class="my-courses-grid">
                        ${b.map(a=>{const i=x(a.id);return`
                                <div class="db-course-card glass-panel">
                                    <img src="${r(a.image)}" alt="${r(a.title)}" class="db-card-img">
                                    <div class="db-card-info">
                                        <div>
                                            <h4 class="db-card-title">${r(a.title)}</h4>
                                            <div class="db-card-lessons" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom: 0.5rem;">
                                                <span>${i.completedCount} / ${i.totalLessons} حصص مكتملة</span>
                                                <span class="badge badge-secondary" style="font-size:0.75rem;">${r(a.gradeAr)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="db-card-progress-wrap" style="margin-bottom: 0.75rem;">
                                                <div class="progress-bar-container" style="max-width: 100%; height: 6px;">
                                                    <div class="progress-bar-fill db-card-progress-fill" style="width: ${i.percentage}%;"></div>
                                                </div>
                                                <span class="progress-pct" style="font-size: 0.8rem;">${i.percentage}%</span>
                                            </div>
                                            <button class="db-card-btn" data-open-course="${a.id}">
                                                <span>دخول الفصل الدراسي</span>
                                                <i class="fa-solid fa-chevron-left"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                `}
            `;if(d==="favorites")return`
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-heart" style="color: var(--secondary);"></i>
                    <h3>مفصلتي الدراسية (المواد المفضلة)</h3>
                </div>

                ${g.length===0?`
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
                `:`
                    <div class="my-courses-grid">
                        ${g.map(a=>{const i=enrolledIds.includes(a.id);return`
                                <div class="db-course-card glass-panel">
                                    <img src="${r(a.image)}" alt="${r(a.title)}" class="db-card-img">
                                    <div class="db-card-info">
                                        <div>
                                            <h4 class="db-card-title">${r(a.title)}</h4>
                                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">الأستاذ: ${r(a.instructor.name)}</p>
                                        </div>
                                        <div>
                                            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                                                <button class="btn-icon" data-remove-fav="${a.id}" title="إزالة من المفضلة" style="color:var(--secondary); background:rgba(244,63,94,0.1); width:36px; height:36px; border-radius:8px;">
                                                    <i class="fa-solid fa-heart"></i>
                                                </button>
                                                <button class="db-card-btn" data-fav-action="${a.id}" style="flex:1;">
                                                    <span>${i?"مواصلة المذاكرة":"ابدأ الدراسة الآن"}</span>
                                                    <i class="fa-solid fa-chevron-left"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                `}
            `;if(d==="notifications"){const a=s.notifications||[];return`
                <div class="dashboard-section-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div>
                        <i class="fa-solid fa-bell" style="color: var(--primary);"></i>
                        <h3>إشعارات منصتي التعليمية</h3>
                    </div>
                    ${a.length>0?'<button class="btn-secondary" id="clear-all-notifs-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:8px;">حذف كافة التنبيهات</button>':""}
                </div>

                ${a.length===0?`
                    <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-xl); margin-top: 1rem;">
                        <div style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                            <i class="fa-solid fa-bell-slash"></i>
                        </div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">صندوق الإشعارات فارغ</h3>
                        <p style="color: var(--text-secondary); max-width: 480px; margin-left: auto; margin-right: auto;">
                            أنت على اطلاع تام بكافة التحديثات! ستظهر هنا إشعارات إكمال الحصص، اجتياز الكويزات، والتنبيهات المنهجية الجديدة من الإدارة.
                        </p>
                    </div>
                `:`
                    <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem;">
                        ${a.map(i=>`
                            <div class="glass-panel notif-item-card ${i.read?"read":"unread"}" data-notif-id="${i.id}" style="padding:1.25rem 1.75rem; border-radius:var(--radius-lg); display:flex; gap:1.25rem; align-items:center; position:relative; transition:var(--transition-base); border-right:4px solid ${i.type==="success"?"var(--success)":i.type==="warning"?"var(--secondary)":"var(--primary)"}; background: ${i.read?"var(--bg-secondary)":"rgba(99,102,241,0.03)"}; cursor:pointer;">
                                <div style="font-size:1.5rem;">
                                    ${i.type==="success"?"🏆":i.type==="warning"?"⚠️":"🔔"}
                                </div>
                                <div style="flex:1;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                                        <h4 style="font-weight:700; color: var(--text-primary); font-size:1.05rem;">${r(i.title)}</h4>
                                        <span style="font-size:0.75rem; color:var(--text-muted);">${new Date(i.date).toLocaleDateString("ar-EG",{hour:"2-digit",minute:"2-digit"})}</span>
                                    </div>
                                    <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6;">${r(i.message)}</p>
                                </div>
                                ${i.read?"":'<div style="width:10px; height:10px; border-radius:50%; background:var(--primary); position:absolute; left:20px; top:20px;"></div>'}
                            </div>
                        `).join("")}
                    </div>
                `}
            `}}function T(){var d,c,m,f,n,v,b,g,a,i,l,h,w,E,L;(d=t.querySelector("#dashboard-theme-toggle"))==null||d.addEventListener("click",e=>{e.preventDefault();const o=s.theme==="light"?"dark":"light";S.setTheme(o),document.body.className=o==="dark"?"dark-theme":"light-theme"}),(c=t.querySelector("#db-logo-btn"))==null||c.addEventListener("click",()=>p.navigate("landing")),(m=t.querySelector("#change-grade-dashboard-btn"))==null||m.addEventListener("click",()=>{p.navigate("landing"),setTimeout(()=>{const e=document.querySelector("#stages-section");e&&e.scrollIntoView({behavior:"smooth"})},100)}),(f=t.querySelector("#sb-home-link"))==null||f.addEventListener("click",e=>{e.preventDefault(),u="home",y()}),(n=t.querySelector("#sb-favorites-link"))==null||n.addEventListener("click",e=>{e.preventDefault(),u="favorites",y()}),(v=t.querySelector("#sb-notifications-link"))==null||v.addEventListener("click",e=>{e.preventDefault(),u="notifications",y()}),(b=t.querySelector("#sb-explore-link"))==null||b.addEventListener("click",e=>{e.preventDefault(),p.navigate("landing"),setTimeout(()=>{const o=document.querySelector("#courses-section");o&&o.scrollIntoView({behavior:"smooth"})},100)}),(g=t.querySelector("#sb-admin-link"))==null||g.addEventListener("click",e=>{e.preventDefault(),p.navigate("admin")}),(a=t.querySelector("#sb-profile-link"))==null||a.addEventListener("click",e=>{e.preventDefault(),p.navigate("profile")}),(i=t.querySelector("#sidebar-profile-card"))==null||i.addEventListener("click",()=>p.navigate("profile")),(l=t.querySelector("#explore-more-btn"))==null||l.addEventListener("click",()=>{p.navigate("landing"),setTimeout(()=>{const e=document.querySelector("#courses-section");e&&e.scrollIntoView({behavior:"smooth"})},100)}),(h=t.querySelector("#dashboard-empty-cta"))==null||h.addEventListener("click",()=>{p.navigate("landing"),setTimeout(()=>{const e=document.querySelector("#courses-section");e&&e.scrollIntoView({behavior:"smooth"})},100)}),(w=t.querySelector("#db-fav-empty-cta"))==null||w.addEventListener("click",()=>{p.navigate("landing")}),(E=t.querySelector("#resume-course-action-btn"))==null||E.addEventListener("click",e=>{const o=e.currentTarget.getAttribute("data-course-id");p.navigate("classroom",{courseId:o})}),t.querySelectorAll("[data-open-course]").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-open-course");p.navigate("classroom",{courseId:o})})}),t.querySelectorAll("[data-fav-action]").forEach(e=>{e.addEventListener("click",async()=>{const o=e.getAttribute("data-fav-action");s.progress&&s.progress.enrolledCourses&&s.progress.enrolledCourses.includes(o)?p.navigate("classroom",{courseId:o}):await A.enrollInCourse(o)&&p.navigate("classroom",{courseId:o})})}),t.querySelectorAll("[data-remove-fav]").forEach(e=>{e.addEventListener("click",async o=>{o.stopPropagation();const $=e.getAttribute("data-remove-fav"),k=q.getCourseById($);k&&await A.toggleFavorite($,k.title)})}),t.querySelectorAll(".notif-item-card").forEach(e=>{e.addEventListener("click",async()=>{const o=e.getAttribute("data-notif-id");await C.markAsRead(o)})}),(L=t.querySelector("#clear-all-notifs-btn"))==null||L.addEventListener("click",async()=>{confirm("هل أنت متأكد من حذف كافة الإشعارات والتنبيهات؟")&&await C.clearAll()})}return y(),()=>{I()}}export{V as default,V as initDashboard};
