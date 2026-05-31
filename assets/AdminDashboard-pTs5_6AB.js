import{b as _,d as v,a as F}from"./index-DiqDKeqa.js";import{v as H}from"./validators-k0nZOdk1.js";import{e as i}from"./xss-D4V6puIs.js";function V(e,x,C){let p="courses",n=null,m="",g="",w={viewsCount:15,enrollmentsCount:3,completionsCount:7,quizzesCount:1},o={title:"",description:"",stage:"secondary",grade:"sec3",category:"math",instructorName:"",instructorRole:"",instructorAvatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100",duration:"10 حصة",image:"assets/images/course_math.jpg"};const D=_.subscribe(c=>{x!==c&&(x=c,s())});async function M(){w=await F.getAnalyticsSummary();const c=e.querySelector("#stats-views"),a=e.querySelector("#stats-enrolls"),l=e.querySelector("#stats-comps"),h=e.querySelector("#stats-quizzes");c&&(c.textContent=w.viewsCount),a&&(a.textContent=w.enrollmentsCount),l&&(l.textContent=w.completionsCount),h&&(h.textContent=w.quizzesCount)}setTimeout(M,50);function s(){e.innerHTML=`
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
                        <li class="sidebar-item ${p==="courses"?"active":""}">
                            <a href="#" id="admin-sb-courses">
                                <i class="fa-solid fa-list-check"></i>
                                <span>إدارة المناهج</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${p==="add_course"?"active":""}">
                            <a href="#" id="admin-sb-add">
                                <i class="fa-solid fa-square-plus"></i>
                                <span>إضافة مادة جديدة</span>
                            </a>
                        </li>
                        <li class="sidebar-item ${p==="analytics"?"active":""}">
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
                            <img src="${i(x.user.avatar)}" alt="${i(x.user.name)}" class="user-avatar" style="border-color:var(--secondary);">
                            <div class="user-details">
                                <h4 class="user-name">${i(x.user.name)}</h4>
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
                            <p>أهلاً بك يا ${i(x.user.name.split(" ")[0])}. تحكم بكافة المناهج الدراسية، أضف فصول ودروس جديدة، وشاهد أداء الطلاب.</p>
                        </div>
                        <div class="dashboard-actions">
                            <button class="btn-icon" id="admin-theme-toggle" title="تغيير المظهر">
                                <i class="fa-solid ${x.theme==="dark"?"fa-sun":"fa-moon"}"></i>
                            </button>
                        </div>
                    </header>

                    ${m?`
                        <div class="badge badge-secondary" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: #ef4444; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span>${i(m)}</span>
                        </div>
                    `:""}

                    ${g?`
                        <div class="badge badge-success" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--success); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>${i(g)}</span>
                        </div>
                    `:""}

                    ${B(p)}
                </main>
            </div>
        `,N()}function B(c){if(c==="courses")return`
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-graduation-cap" style="color:var(--secondary);"></i>
                    <h3>قائمة المناهج الدراسية الحالية</h3>
                </div>

                <div style="display:flex; flex-direction:column; gap:1.25rem;">
                    ${x.courses.map(a=>{var l;return`
                        <div class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-lg); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                            <div style="display:flex; gap:1rem; align-items:center;">
                                <img src="${i(a.image)}" style="width:64px; height:64px; border-radius:8px; object-fit:cover;">
                                <div>
                                    <h4 style="font-weight:700; color:var(--text-primary); font-size:1.1rem; margin-bottom:0.25rem;">${i(a.title)}</h4>
                                    <p style="font-size:0.8rem; color:var(--text-secondary);">
                                        المعلم: ${i(a.instructor.name)} | 
                                        المرحلة: ${i(a.gradeAr)} | 
                                        الفصول: ${((l=a.chapters)==null?void 0:l.length)||0}
                                    </p>
                                </div>
                            </div>
                            <div style="display:flex; gap:0.5rem;">
                                <button class="btn-secondary" data-admin-edit-course="${a.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px;">تعديل تفاصيل</button>
                                <button class="btn-primary" data-admin-manage-content="${a.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; background:var(--secondary); border-color:var(--secondary);">إدارة المحتوى</button>
                                <button class="btn-secondary" data-admin-delete-course="${a.id}" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:6px; color:#ef4444; border-color:rgba(239,68,68,0.2); background:rgba(239,68,68,0.02);">حذف</button>
                            </div>
                        </div>
                    `}).join("")}
                </div>
            `;if(c==="add_course"||c==="edit_course"){const a=c==="edit_course",l=a?"حفظ التعديلات":"إضافة المادة بالمنصة";return`
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-square-plus" style="color:var(--secondary);"></i>
                    <h3>${a?"تعديل تفاصيل المادة التعليمية":"إضافة مادة تعليمية جديدة"}</h3>
                </div>

                <form id="admin-course-form" class="glass-panel" style="padding:2.5rem; border-radius:var(--radius-xl); display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                    <div style="display:flex; flex-direction:column; gap:0.4rem; grid-column:1 / -1;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">عنوان المادة الدراسية</label>
                        <input type="text" id="form-title" value="${i(o.title)}" required placeholder="الرياضيات - الهندسة الفراغية..." style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem; grid-column:1 / -1;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">وصف وشرح المادة بالكامل</label>
                        <textarea id="form-desc" required placeholder="اكتب شرحاً وافياً ومحفزاً للمادة الدراسية..." style="width:100%; height:100px; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; resize:none;">${i(o.description)}</textarea>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">المرحلة الدراسية</label>
                        <select id="form-stage" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="primary" ${o.stage==="primary"?"selected":""}>المرحلة الابتدائية</option>
                            <option value="preparatory" ${o.stage==="preparatory"?"selected":""}>المرحلة الإعدادية</option>
                            <option value="secondary" ${o.stage==="secondary"?"selected":""}>المرحلة الثانوية</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">الصف الدراسي</label>
                        <select id="form-grade" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="sec3" ${o.grade==="sec3"?"selected":""}>الصف الثالث الثانوي</option>
                            <option value="sec2" ${o.grade==="sec2"?"selected":""}>الصف الثاني الثانوي</option>
                            <option value="sec1" ${o.grade==="sec1"?"selected":""}>الصف الأول الثانوي</option>
                            <option value="prep3" ${o.grade==="prep3"?"selected":""}>الصف الثالث الإعدادي</option>
                            <option value="prep1" ${o.grade==="prep1"?"selected":""}>الصف الأول الإعدادي</option>
                            <option value="prim6" ${o.grade==="prim6"?"selected":""}>الصف السادس الابتدائي</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">التصنيف الأساسي</label>
                        <select id="form-category" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none; height:43px;">
                            <option value="math" ${o.category==="math"?"selected":""}>الرياضيات</option>
                            <option value="physics" ${o.category==="physics"?"selected":""}>الفيزياء والعلوم</option>
                            <option value="arabic" ${o.category==="arabic"?"selected":""}>اللغة العربية</option>
                        </select>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">اسم المعلم</label>
                        <input type="text" id="form-instructor-name" value="${i(o.instructorName)}" required placeholder="أ. أحمد رأفت" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">دور ومسمى المعلم</label>
                        <input type="text" id="form-instructor-role" value="${i(o.instructorRole)}" required placeholder="كبير معلمي المادة بوزارة التربية" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.4rem;">
                        <label style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">رابط غلاف المادة (صورة)</label>
                        <input type="text" id="form-image" value="${i(o.image)}" style="width:100%; padding:0.7rem; border-radius:6px; border:1px solid var(--card-border); background:var(--bg-secondary); color:var(--text-primary); outline:none;">
                    </div>

                    <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:1rem; margin-top:1rem;">
                        ${a?'<button type="button" class="btn-secondary" id="admin-cancel-edit-btn">إلغاء التعديل</button>':""}
                        <button type="submit" class="btn-primary" style="background:var(--secondary); border-color:var(--secondary); padding:0.75rem 2rem;">${l}</button>
                    </div>
                </form>
            `}if(c==="analytics")return`
                <div class="dashboard-section-title">
                    <i class="fa-solid fa-chart-line" style="color:var(--secondary);"></i>
                    <h3>تحليلات أداء المنصة التعليمية</h3>
                </div>

                <!-- Stats grid -->
                <div class="stats-grid" style="margin-bottom:2.5rem;">
                    <div class="dashboard-stat-card card-1" style="background:linear-gradient(135deg, #4f46e5, #6366f1);">
                        <div class="db-stat-details">
                            <h4>مشاهدات الطلاب الكلية</h4>
                            <span class="db-stat-num" id="stats-views">${w.viewsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-eye"></i></div>
                    </div>
                    <div class="dashboard-stat-card card-2" style="background:linear-gradient(135deg, #06b6d4, #0891b2);">
                        <div class="db-stat-details">
                            <h4>التحاقات المواد اليوم</h4>
                            <span class="db-stat-num" id="stats-enrolls">${w.enrollmentsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div>
                    </div>
                    <div class="dashboard-stat-card card-3" style="background:linear-gradient(135deg, #10b981, #059669);">
                        <div class="db-stat-details">
                            <h4>حصص مكتملة اليوم</h4>
                            <span class="db-stat-num" id="stats-comps">${w.completionsCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-circle-check"></i></div>
                    </div>
                    <div class="dashboard-stat-card" style="background:linear-gradient(135deg, #fbbf24, #d97706);">
                        <div class="db-stat-details">
                            <h4>كويزات ناجحة</h4>
                            <span class="db-stat-num" id="stats-quizzes">${w.quizzesCount}</span>
                        </div>
                        <div class="db-stat-icon-wrap"><i class="fa-solid fa-trophy"></i></div>
                    </div>
                </div>

                <div class="glass-panel" style="padding:2.5rem; border-radius:var(--radius-xl); text-align:center;">
                    <i class="fa-solid fa-chart-line-up" style="font-size:3.5rem; color:var(--text-muted); margin-bottom:1rem;"></i>
                    <h3 style="font-weight:800; font-size:1.3rem; margin-bottom:0.5rem;">رسم بياني ذكي للتفاعل</h3>
                    <p style="color:var(--text-secondary); max-width:500px; margin:0 auto;">سيتم قريباً دمج الرسوم البيانية التفاعلية لحساب نشاط الطلاب في المناهج بصورة دورية دقيقة وسريعة.</p>
                </div>
            `;if(c==="manage_content"){const a=v.getCourseById(n);return a?`
                <div class="dashboard-section-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div>
                        <i class="fa-solid fa-folder-open" style="color:var(--secondary);"></i>
                        <h3>إدارة المحتوى الدراسي لمادة: ${i(a.title)}</h3>
                    </div>
                    <button class="btn-secondary" id="back-to-courses-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-radius:8px;">العودة لقائمة المواد</button>
                </div>

                <div style="display:grid; grid-template-columns:1fr 400px; gap:2rem; align-items:start; margin-top:1.5rem;">
                    
                    <!-- Chapters & Lessons list -->
                    <div class="glass-panel" style="padding:2rem; border-radius:var(--radius-xl);">
                        <h4 style="font-weight:800; font-size:1.15rem; margin-bottom:1.25rem;">فصول ودروس المنهج الحالية</h4>
                        
                        ${!a.chapters||a.chapters.length===0?`
                            <p style="color:var(--text-secondary); text-align:center; padding:2rem 0;">لا توجد فصول مضافة للمادة بعد. أضف أول فصول المادة الآن!</p>
                        `:a.chapters.map((l,h)=>`
                            <div style="margin-bottom:1.5rem; border:1px solid var(--card-border); border-radius:8px; overflow:hidden;">
                                <div style="background:var(--bg-secondary); padding:0.75rem 1.25rem; font-weight:700; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center;">
                                    <span>${i(l.title)}</span>
                                    <button class="btn-icon" data-admin-delete-chapter="${h}" title="حذف الفصل بالكامل" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                                <ul style="list-style:none;">
                                    ${!l.lessons||l.lessons.length===0?`
                                        <li style="padding:0.75rem 1.25rem; font-size:0.85rem; color:var(--text-muted); text-align:center;">لا توجد دروس مضافة للفصل بعد</li>
                                    `:l.lessons.map((k,S)=>`
                                        <li style="padding:0.75rem 1.25rem; border-top:1px solid var(--card-border); font-size:0.9rem; display:flex; justify-content:space-between; align-items:center;">
                                            <div>
                                                <div style="font-weight:700; color:var(--text-primary);">${i(k.title)}</div>
                                                <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-regular fa-clock" style="margin-left:4px;"></i>مدة الدرس: ${i(k.duration)}</span>
                                            </div>
                                            <button class="btn-icon" data-admin-delete-lesson="${h}-${S}" title="حذف الدرس" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                                        </li>
                                    `).join("")}
                                </ul>
                            </div>
                        `).join("")}
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
                                    ${!a.chapters||a.chapters.length===0?'<option value="">أضف فصلاً أولاً</option>':a.chapters.map((l,h)=>`<option value="${h}">${i(l.title)}</option>`).join("")}
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

                            <button type="submit" class="btn-primary" style="background:var(--secondary); border-color:var(--secondary); justify-content:center;" ${!a.chapters||a.chapters.length===0?"disabled":""}>رفع وإضافة الدرس</button>
                        </form>
                    </div>

                </div>
            `:"<p>المادة غير موجودة</p>"}}function N(){var h,k,S,A,E,L,I,j;(h=e.querySelector("#admin-theme-toggle"))==null||h.addEventListener("click",t=>{t.preventDefault();const d=x.theme==="light"?"dark":"light";_.setTheme(d),document.body.className=d==="dark"?"dark-theme":"light-theme"}),(k=e.querySelector("#admin-logo-btn"))==null||k.addEventListener("click",()=>C.navigate("landing")),(S=e.querySelector("#admin-sb-courses"))==null||S.addEventListener("click",t=>{t.preventDefault(),p="courses",m="",g="",s()}),(A=e.querySelector("#admin-sb-add"))==null||A.addEventListener("click",t=>{t.preventDefault(),p="add_course",n=null,m="",g="",o={title:"",description:"",stage:"secondary",grade:"sec3",gradeAr:"الصف الثالث الثانوي",category:"math",categoryAr:"رياضيات",instructorName:"أ. أحمد رأفت",instructorRole:"كبير معلمي المادة بوزارة التربية والتعليم",instructorAvatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100",duration:"12 حصة",image:"assets/images/course_math.jpg"},s()}),(E=e.querySelector("#admin-sb-analytics"))==null||E.addEventListener("click",t=>{t.preventDefault(),p="analytics",m="",g="",s()}),(L=e.querySelector("#admin-sb-student"))==null||L.addEventListener("click",t=>{t.preventDefault(),C.navigate("dashboard")}),e.querySelectorAll("[data-admin-delete-course]").forEach(t=>{t.addEventListener("click",async()=>{const d=t.getAttribute("data-admin-delete-course");if(confirm("هل أنت متأكد من رغبتك في حذف هذه المادة الدراسية نهائياً وكل محتوياتها من المنصة؟"))try{await v.deleteCourse(d),g="تم حذف المادة بنجاح",s()}catch(r){m=r.message,s()}})}),e.querySelectorAll("[data-admin-edit-course]").forEach(t=>{t.addEventListener("click",()=>{const d=t.getAttribute("data-admin-edit-course"),r=v.getCourseById(d);r&&(n=d,p="edit_course",o={title:r.title,description:r.description,stage:r.stage,grade:r.grade,gradeAr:r.gradeAr,category:r.category,categoryAr:r.categoryAr,instructorName:r.instructor.name,instructorRole:r.instructor.role,instructorAvatar:r.instructor.avatar,duration:r.duration,image:r.image},s())})}),e.querySelectorAll("[data-admin-manage-content]").forEach(t=>{t.addEventListener("click",()=>{n=t.getAttribute("data-admin-manage-content"),p="manage_content",m="",g="",s()})});const c=e.querySelector("#admin-course-form");c&&c.addEventListener("submit",async t=>{t.preventDefault(),m="",g="";const d=e.querySelector("#form-stage"),r=e.querySelector("#form-grade"),y=e.querySelector("#form-category"),u={title:e.querySelector("#form-title").value.trim(),description:e.querySelector("#form-desc").value.trim(),stage:d.value,grade:r.value,gradeAr:r.options[r.selectedIndex].text,category:y.value,categoryAr:y.options[y.selectedIndex].text,instructor:{name:e.querySelector("#form-instructor-name").value.trim(),role:e.querySelector("#form-instructor-role").value.trim(),avatar:o.instructorAvatar},image:e.querySelector("#form-image").value.trim(),duration:o.duration},b=H(u);if(b){m=b,s();return}try{p==="edit_course"?(await v.updateCourse(n,u),g="تم تعديل المادة التعليمية بنجاح",p="courses"):(await v.addCourse(u),g="تم إضافة المادة التعليمية بنجاح",p="courses"),s()}catch(f){m=f.message,s()}}),(I=e.querySelector("#admin-cancel-edit-btn"))==null||I.addEventListener("click",()=>{p="courses",n=null,s()}),(j=e.querySelector("#back-to-courses-btn"))==null||j.addEventListener("click",()=>{p="courses",n=null,s()});const a=e.querySelector("#add-chapter-form");a&&a.addEventListener("submit",async t=>{t.preventDefault();const r=e.querySelector("#chapter-title-input").value.trim();if(r)try{const u=[...v.getCourseById(n).chapters||[]];u.push({id:"ch-"+Math.random().toString(36).substr(2,9),title:r,lessons:[]}),await v.updateCourse(n,{chapters:u}),g="تم إضافة الفصل بنجاح",s()}catch(y){m=y.message,s()}});const l=e.querySelector("#add-lesson-form");l&&l.addEventListener("submit",async t=>{t.preventDefault();const d=parseInt(e.querySelector("#lesson-chapter-select").value,10),r=e.querySelector("#lesson-title-input").value.trim(),y=e.querySelector("#lesson-duration-input").value.trim(),u=e.querySelector("#lesson-video-input").value.trim();if(!(isNaN(d)||!r||!y||!u))try{const f=[...v.getCourseById(n).chapters||[]],$=f[d];if($){const q=[...$.lessons||[]];q.push({id:"l-"+Math.random().toString(36).substr(2,9),title:r,duration:y,videoUrl:u,completed:!1}),$.lessons=q;let z=0;f.forEach(R=>z+=(R.lessons||[]).length);const T=`${z} حصة`;await v.updateCourse(n,{chapters:f,duration:T}),g="تم إضافة الدرس الجديد بنجاح",s()}}catch(b){m=b.message,s()}}),e.querySelectorAll("[data-admin-delete-chapter]").forEach(t=>{t.addEventListener("click",async()=>{const d=parseInt(t.getAttribute("data-admin-delete-chapter"),10);if(confirm("هل أنت متأكد من حذف هذا الباب وكل الدروس المتواجدة داخله نهائياً؟"))try{const y=v.getCourseById(n).chapters.filter((f,$)=>$!==d);let u=0;y.forEach(f=>u+=(f.lessons||[]).length);const b=`${u} حصة`;await v.updateCourse(n,{chapters:y,duration:b}),g="تم إزالة الفصل بالكامل",s()}catch(r){m=r.message,s()}})}),e.querySelectorAll("[data-admin-delete-lesson]").forEach(t=>{t.addEventListener("click",async()=>{const d=t.getAttribute("data-admin-delete-lesson").split("-"),r=parseInt(d[0],10),y=parseInt(d[1],10);if(confirm("هل أنت متأكد من حذف هذا الدرس؟"))try{const b=[...v.getCourseById(n).chapters];b[r].lessons=b[r].lessons.filter((q,z)=>z!==y);let f=0;b.forEach(q=>f+=(q.lessons||[]).length);const $=`${f} حصة`;await v.updateCourse(n,{chapters:b,duration:$}),g="تم إزالة الدرس",s()}catch(u){m=u.message,s()}})})}return s(),()=>{D()}}export{V as default,V as initAdminDashboard};
