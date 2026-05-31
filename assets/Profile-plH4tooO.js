import{b as x,d as v,c as E}from"./index-DiqDKeqa.js";import w from"./storageService-Cz0gsLDv.js";import{e as n}from"./xss-D4V6puIs.js";function S(l,e,g){const $=x.subscribe(a=>{e!==a&&(e=a,b())});function u(a){const d=v.getCourseById(a);if(!d)return{percentage:0,completedCount:0,totalLessons:0};let o=0;if(d.chapters.forEach(p=>o+=p.lessons.length),o===0)return{percentage:0,completedCount:0,totalLessons:0};let c=0;return d.chapters.forEach(p=>{p.lessons.forEach(r=>{e.progress&&e.progress.completedLessons&&e.progress.completedLessons[a]&&e.progress.completedLessons[a].includes(r.id)&&c++})}),{percentage:Math.round(c/o*100),completedCount:c,totalLessons:o}}function b(){var h;const a=e.progress&&e.progress.enrolledCourses||[],d=e.courses.filter(t=>a.includes(t.id)),o=e.progress&&e.progress.favoriteCourses||[],c=e.courses.filter(t=>o.includes(t.id)),p=e.progress&&e.progress.passedQuizzes||[],r=a.length,s=o.length,f=p.length;let y=0;a.forEach(t=>{const m=u(t);y+=m.completedCount});const k=e.user.role==="admin"?"مدير المنصة":e.user.role==="instructor"?"معلم خبير":"طالب متفوق",i=e.progress&&e.progress.lastActivity;l.innerHTML=`
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
                        <i class="fa-solid ${e.theme==="dark"?"fa-sun":"fa-moon"}"></i>
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
                        <img src="${n(e.user.avatar)}" alt="${n(e.user.name)}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary); box-shadow: var(--shadow-md);">
                        <span class="badge ${e.user.role==="admin"?"badge-secondary":e.user.role==="instructor"?"badge-primary":"badge-success"}" style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); font-size:0.75rem; padding: 0.25rem 0.75rem; white-space:nowrap;">
                            ${n(k)}
                        </span>
                    </div>
                    
                    <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.25rem;">${n(e.user.name)}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem;">${n(e.user.email)}</p>
                    
                    <div style="width: 100%; display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid var(--card-border); padding-top: 1.5rem;">
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-graduation-cap" style="margin-left:6px; width:16px;"></i> مواد مسجلة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${r}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-circle-check" style="margin-left:6px; width:16px;"></i> حصص مكتملة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${y}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-trophy-star" style="margin-left:6px; width:16px;"></i> كويزات مجتازة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${f}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                            <span style="color:var(--text-secondary);"><i class="fa-solid fa-heart" style="margin-left:6px; width:16px;"></i> مواد مفضلة</span>
                            <span style="font-weight:700; color:var(--text-primary);">${s}</span>
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
                        
                        ${r===0?`
                            <p style="color:var(--text-secondary); text-align:center; padding: 2rem 0;">لم تلتحق بأي مواد دراسية حتى الآن.</p>
                        `:`
                            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                ${d.map(t=>{const m=u(t.id);return`
                                        <div style="display:flex; flex-direction:column; gap:0.5rem; background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border:1px solid var(--card-border);">
                                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                                <h4 style="font-weight:700; font-size:1rem; color:var(--text-primary);">${n(t.title)}</h4>
                                                <span class="badge badge-primary" style="font-size:0.75rem;">${n(t.gradeAr)}</span>
                                            </div>
                                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">تم إكمال ${m.completedCount} من أصل ${m.totalLessons} حصة مقررة بالمنهج</p>
                                            <div style="display:flex; align-items:center; gap:1rem;">
                                                <div class="progress-bar-container" style="flex:1; max-width:100%; height:8px;">
                                                    <div class="progress-bar-fill" style="width: ${m.percentage}%;"></div>
                                                </div>
                                                <span style="font-size:0.85rem; font-weight:700; color:var(--primary); min-width:35px; text-align:left;">${m.percentage}%</span>
                                            </div>
                                            <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem;">
                                                <button class="btn-secondary" data-profile-play="${t.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px;">
                                                    <span>متابعة الحصص</span>
                                                    <i class="fa-solid fa-play" style="font-size:0.7rem; margin-right:4px;"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `}).join("")}
                            </div>
                        `}
                    </div>

                    <!-- 2. Favorite Courses Panel -->
                    <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fa-solid fa-heart" style="color:var(--secondary);"></i>
                            <span>المواد الدراسية المفضلة</span>
                        </h3>
                        
                        ${s===0?`
                            <p style="color:var(--text-secondary); text-align:center; padding: 2rem 0;">لا توجد مواد في المفضلة حالياً.</p>
                        `:`
                            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.25rem;">
                                ${c.map(t=>{const m=a.includes(t.id);return`
                                        <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border:1px solid var(--card-border); display:flex; flex-direction:column; justify-content:space-between; gap:1rem;">
                                            <div>
                                                <h4 style="font-weight:700; color:var(--text-primary); font-size:0.95rem; margin-bottom:0.25rem;">${n(t.title)}</h4>
                                                <span style="font-size:0.75rem; color:var(--text-muted);">${n(t.instructor.name)}</span>
                                            </div>
                                            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                                                <button class="btn-icon" data-profile-unfav="${t.id}" title="حذف من المفضلة" style="color:var(--secondary); background:rgba(244,63,94,0.1); width:32px; height:32px; border-radius:6px; flex-shrink:0;">
                                                    <i class="fa-solid fa-trash" style="font-size:0.8rem;"></i>
                                                </button>
                                                <button class="btn-primary" data-profile-fav-action="${t.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; flex:1; justify-content:center;">
                                                    <span>${m?"دراسة المادة":"التحاق مجاني"}</span>
                                                </button>
                                            </div>
                                        </div>
                                    `}).join("")}
                            </div>
                        `}
                    </div>

                    <!-- 3. Recent Activity Log Widget -->
                    <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-xl);">
                        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fa-solid fa-clock-rotate-left" style="color:var(--primary);"></i>
                            <span>آخر نشاط دراسي للمستخدم</span>
                        </h3>
                        
                        ${i?`
                            <div style="display:flex; gap:1.25rem; align-items:center; background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border:1px solid var(--card-border);">
                                <div style="font-size:2.5rem; background:rgba(99,102,241,0.1); padding:0.5rem 1rem; border-radius:12px;">
                                    ${i.action==="register"?"🎉":i.action==="enroll"?"🎓":i.action==="lesson_complete"?"🚀":i.action==="quiz_pass"?"🏆":"💖"}
                                </div>
                                <div>
                                    <h4 style="font-weight:700; color:var(--text-primary); font-size:1.1rem; margin-bottom:0.25rem;">
                                        ${i.action==="register"?"إنشاء وتأسيس الحساب الجديد":i.action==="enroll"?"التحاق بمادة دراسية جديدة":i.action==="lesson_complete"?"إكمال مذاكرة درس مقرر":i.action==="quiz_pass"?"اجتياز وتقييم اختبار الوحدة":"تحديث قائمة المفضلة الدراسية"}
                                    </h4>
                                    <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
                                        ${i.courseId?`الدورة: <strong>${n(((h=v.getCourseById(i.courseId))==null?void 0:h.title)||"")}</strong>`:""}
                                        ${i.score?` | درجة التفوق: <strong>${i.score}%</strong>`:""}
                                    </p>
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-top:0.25rem;">
                                        تاريخ النشاط: ${new Date(i.timestamp).toLocaleString("ar-EG")}
                                    </span>
                                </div>
                            </div>
                        `:`
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
        `,z()}function z(){var a,d,o,c,p;(a=l.querySelector("#profile-logo-btn"))==null||a.addEventListener("click",()=>g.navigate("landing")),(d=l.querySelector("#nav-landing-p"))==null||d.addEventListener("click",r=>{r.preventDefault(),g.navigate("landing")}),(o=l.querySelector("#nav-db-p"))==null||o.addEventListener("click",r=>{r.preventDefault(),g.navigate("dashboard")}),(c=l.querySelector("#profile-theme-toggle"))==null||c.addEventListener("click",r=>{r.preventDefault();const s=e.theme==="light"?"dark":"light";x.setTheme(s),document.body.className=s==="dark"?"dark-theme":"light-theme"}),(p=l.querySelector("#profile-logout-btn"))==null||p.addEventListener("click",async()=>{await E.logout(),g.navigate("landing")}),l.querySelectorAll("[data-profile-play]").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-profile-play");g.navigate("classroom",{courseId:s})})}),l.querySelectorAll("[data-profile-fav-action]").forEach(r=>{r.addEventListener("click",async()=>{const s=r.getAttribute("data-profile-fav-action");e.progress&&e.progress.enrolledCourses&&e.progress.enrolledCourses.includes(s)?g.navigate("classroom",{courseId:s}):await w.enrollInCourse(s)&&g.navigate("classroom",{courseId:s})})}),l.querySelectorAll("[data-profile-unfav]").forEach(r=>{r.addEventListener("click",async()=>{const s=r.getAttribute("data-profile-unfav"),f=v.getCourseById(s);f&&await w.toggleFavorite(s,f.title)})})}return b(),()=>{$()}}export{S as default,S as initProfile};
