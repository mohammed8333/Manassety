import{d as V,b as N}from"./index-DiqDKeqa.js";import w from"./storageService-Cz0gsLDv.js";import{e as p}from"./xss-D4V6puIs.js";function J(l,s,M,o){const a=V.getCourseById(o);if(!a){alert("المادة غير موجودة!"),M.navigate("dashboard");return}let r=null,L="overview";for(const e of a.chapters||[]){for(const v of e.lessons||[])if(!(s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(v.id))){r=v;break}if(r)break}!r&&a.chapters&&a.chapters.length>0&&a.chapters[0].lessons&&a.chapters[0].lessons.length>0&&(r=a.chapters[0].lessons[0]);let b=!1,f=0,x=null,$="intro",h=0,z={},S=0;const Q=N.subscribe(e=>{s!==e&&(s=e,m())});function m(){var n,g;let e=0,v=0;(a.chapters||[]).forEach(u=>{(u.lessons||[]).forEach(k=>{e++,s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(k.id)&&v++})});const d=e>0?Math.round(v/e*100):0;l.innerHTML=`
            <div class="player-container">
                <!-- Main Classroom Screen -->
                <div class="player-main-view">
                    <!-- Top Navigation Bar -->
                    <div class="player-header">
                        <button class="back-to-db-btn" id="classroom-back-btn">
                            <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                            <span>العودة لبوابة الطالب</span>
                        </button>
                        <h2 class="player-title">${p(a.title)}</h2>
                        <!-- Theme Toggle inside Classroom -->
                        <button class="btn-icon" id="player-theme-toggle" title="تغيير المظهر">
                            <i class="fa-solid ${s.theme==="dark"?"fa-sun":"fa-moon"}"></i>
                        </button>
                    </div>

                    ${r?`
                        <!-- Video Player Area -->
                        <div class="video-player-wrapper ${b?"":"paused"}" id="video-wrapper">
                            <!-- Custom HTML5 video simulated player -->
                            <video class="custom-video" id="main-video-player" src="${p(r.videoUrl)}" playsinline></video>
                            
                            <!-- Video Simulation Center Overlay Play Button -->
                            ${b?"":`
                                <div class="video-overlay-play" id="central-play-overlay">
                                    <div class="play-central-btn">
                                        <i class="fa-solid fa-play" style="margin-right: 4px;"></i>
                                    </div>
                                </div>
                            `}

                            <!-- Custom Glass Controls Panel -->
                            <div class="custom-video-controls glass-panel">
                                <div class="progress-control-bar" id="video-timeline-bg">
                                    <div class="progress-control-fill" id="video-timeline-fill" style="width: ${f}%;"></div>
                                </div>
                                <div class="controls-row">
                                    <div class="left-controls">
                                        <button class="video-control-btn" id="video-play-toggle">
                                            <i class="fa-solid ${b?"fa-pause":"fa-play"}"></i>
                                        </button>
                                        <span class="video-timer" id="video-time-label">00:00 / ${p(r.duration)}</span>
                                    </div>
                                    <div style="display: flex; gap: 1rem; align-items: center;">
                                        <button class="video-control-btn" id="lesson-complete-action-btn">
                                            <i class="fa-solid fa-circle-check" style="color: ${s.progress&&s.progress.completedLessons&&((n=s.progress.completedLessons[o])!=null&&n.includes(r.id))?"var(--success)":"inherit"};"></i>
                                            <span style="font-size: 0.85rem; font-weight: 700; margin-right: 4px;">
                                                ${s.progress&&s.progress.completedLessons&&((g=s.progress.completedLessons[o])!=null&&g.includes(r.id))?"تمت مذاكرته":"تحديد كمكتمل"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `:`
                        <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                            <i class="fa-solid fa-clapperboard" style="font-size: 3.5rem; color:var(--text-muted); margin-bottom: 1rem;"></i>
                            <h3>لا تتوفر شروحات فيديو لهذه المادة حالياً</h3>
                            <p style="color:var(--text-secondary);">يمكنك إضافة فصول ودروس للمادة من لوحة الإدارة المشتركة.</p>
                        </div>
                    `}

                    <!-- Tabs Selector Bar -->
                    <div class="player-tabs-bar">
                        <button class="player-tab-btn ${L==="overview"?"active":""}" data-tab="overview">شرح المادة</button>
                        <button class="player-tab-btn ${L==="resources"?"active":""}" data-tab="resources">ملخصات ومذكرات</button>
                        <button class="player-tab-btn ${L==="quiz"?"active":""}" data-tab="quiz">امتحان الباب</button>
                    </div>

                    <!-- Tabs Details Container -->
                    <div class="tab-panels-wrap">
                        <!-- Overview Panel -->
                        <div class="tab-panel-content ${L==="overview"?"active":""}">
                            <div style="background: var(--bg-secondary); padding: 2.2rem; border-radius: var(--radius-lg); border: 1px solid var(--card-border); margin-bottom: 2rem;">
                                <h3 style="font-size: 1.3rem; margin-bottom: 1rem; font-weight:800;">تفاصيل المنهج الدراسي</h3>
                                <p style="color: var(--text-secondary); margin-bottom: 1.75rem; line-height: 1.7;">${p(a.description)}</p>
                                
                                <div style="display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--bg-tertiary);">
                                    <img src="${p(a.instructor.avatar)}" alt="${p(a.instructor.name)}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover;">
                                    <div>
                                        <h4 style="font-weight: 700;">المعلم الخبير: ${p(a.instructor.name)}</h4>
                                        <p style="font-size: 0.85rem; color: var(--text-muted);">${p(a.instructor.role)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resources Panel -->
                        <div class="tab-panel-content ${L==="resources"?"active":""}">
                            <ul class="resources-list">
                                ${!a.resources||a.resources.length===0?`
                                    <li style="text-align:center; padding:2rem; color:var(--text-secondary); font-size:0.95rem;">لا تتوفر مذكرات أو ملفات PDF مرفقة للمادة حالياً.</li>
                                `:a.resources.map(u=>`
                                    <li class="resource-item">
                                        <div class="resource-details">
                                            <div class="resource-icon">
                                                <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                            </div>
                                            <div>
                                                <div class="resource-name-text">${p(u.name)}</div>
                                                <span class="resource-size">${p(u.size)}</span>
                                            </div>
                                        </div>
                                        <a href="${p(u.link)}" class="download-res-btn" onclick="event.preventDefault(); alert('محاكاة تحميل المستند بنجاح!');">
                                            <span>تحميل المستند</span>
                                            <i class="fa-solid fa-download"></i>
                                        </a>
                                    </li>
                                `).join("")}
                            </ul>
                        </div>

                        <!-- Interactive Quiz Panel -->
                        <div class="tab-panel-content ${L==="quiz"?"active":""}">
                            <div class="quiz-panel-wrapper">
                                ${F()}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Classroom Navigation Sidebar -->
                <aside class="player-sidebar">
                    <div class="sidebar-curriculum-header">
                        <h3 class="curriculum-title">فصول المنهج الدراسي</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.75rem;">
                            <div class="progress-bar-container" style="max-width: 100%; height: 6px;">
                                <div class="progress-bar-fill" style="width: ${d}%;"></div>
                            </div>
                            <span class="curriculum-progress-text">${d}% تم استذكاره</span>
                        </div>
                    </div>

                    <div class="lessons-list">
                        ${!a.chapters||a.chapters.length===0?`
                            <p style="padding:2rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">لا تتوفر فصول للمادة</p>
                        `:a.chapters.map((u,k)=>`
                            <div>
                                <div class="chapter-header">${p(u.title)}</div>
                                <ul>
                                    ${!u.lessons||u.lessons.length===0?`
                                        <li style="padding:0.75rem; text-align:center; color:var(--text-muted); font-size:0.8rem;">لا توجد دروس</li>
                                    `:u.lessons.map(q=>{const C=s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(q.id),E=r&&r.id===q.id;return`
                                            <li class="lesson-item ${C?"completed":""} ${E?"active":""}">
                                                <button class="lesson-item-btn" data-lesson-id="${q.id}">
                                                    <div class="lesson-checkbox">
                                                        <i class="fa-solid fa-check"></i>
                                                    </div>
                                                    <div class="lesson-item-details">
                                                        <span class="lesson-title-text">${p(q.title)}</span>
                                                        <span class="lesson-dur-text">
                                                            <i class="fa-regular fa-circle-play" style="margin-left: 4px;"></i>حصة: ${p(q.duration)}
                                                        </span>
                                                    </div>
                                                </button>
                                            </li>
                                        `}).join("")}
                                </ul>
                            </div>
                        `).join("")}
                    </div>
                </aside>
            </div>
        `,R()}function F(){const e=a.quiz;if(!e||!e.questions||e.questions.length===0)return`
                <div class="quiz-intro-card glass-panel" style="padding:3.5rem 2rem;">
                    <div class="quiz-intro-icon" style="color:var(--text-muted); background:rgba(255,255,255,0.05);"><i class="fa-solid fa-clipboard-question"></i></div>
                    <h3>الاختبار التقييمي غير متوفر</h3>
                    <p style="max-width: 500px; margin: 0 auto 1.5rem;">
                        المشرف لم يرفع أسئلة الكويز المنهجي لهذه المادة بعد. ترقب التحديثات قريباً!
                    </p>
                </div>
            `;const v=s.progress&&s.progress.passedQuizzes&&s.progress.passedQuizzes.includes(o);if($==="intro")return`
                <div class="quiz-intro-card glass-panel">
                    <div class="quiz-intro-icon">
                        <i class="fa-solid fa-trophy-star"></i>
                    </div>
                    <h3>${p(e.title)}</h3>
                    <p style="max-width: 500px; margin: 0 auto 2rem; line-height:1.7;">
                        هذا الاختبار مصمم لقياس فهمك واستيعابك للمفاهيم الأساسية التي تم شرحها في هذه المادة الدراسية. <br>
                        درجة الاجتياز المطلوبة هي <strong>${e.passingScore}%</strong> أو أعلى للحصول على وسام التفوق.
                    </p>
                    ${v?`
                        <div class="badge badge-success" style="margin-bottom: 2rem; padding: 0.6rem 1.25rem; font-size: 0.95rem; display:inline-flex; gap:0.5rem;">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>لقد اجتزت هذا الامتحان وتفوقت به سابقاً! 🏆</span>
                        </div>
                    `:""}
                    <div>
                        <button class="btn-primary" id="start-quiz-btn" style="padding:0.75rem 2rem;">
                            <span>ابدأ الامتحان الآن</span>
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                </div>
            `;if($==="questions"){const d=e.questions[h],n=z[h];return`
                <div class="quiz-question-container">
                    <div class="quiz-q-header">
                        <span>السؤال ${h+1} من ${e.questions.length}</span>
                        <span>مطلب النجاح ${e.passingScore}%</span>
                    </div>
                    <h3 class="quiz-question-text">${p(d.question)}</h3>
                    <div class="quiz-options-list">
                        ${d.options.map((g,u)=>`
                            <button class="quiz-option-btn ${n===u?"selected":""}" data-option-idx="${u}">
                                <span>${p(g)}</span>
                                <div class="quiz-option-icon">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                            </button>
                        `).join("")}
                    </div>
                    <div class="quiz-footer">
                        <button class="btn-secondary" id="quiz-cancel-btn">إنهاء الامتحان</button>
                        <button class="btn-primary" id="quiz-next-btn" ${n===void 0?"disabled":""}>
                            <span>${h===e.questions.length-1?"تسليم الإجابات":"السؤال التالي"}</span>
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                </div>
            `}if($==="results"){const d=S>=e.passingScore;return`
                <div class="quiz-result-card glass-panel">
                    <div class="result-badge ${d?"passed":"failed"}">
                        <i class="fa-solid ${d?"fa-award":"fa-circle-xmark"}"></i>
                    </div>
                    <div class="score-text">${S}%</div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.75rem; font-weight:800;">
                        ${d?"تهانينا الحارة، لقد تفوّقت!":"أعد المحاولة، لم تجتاز الامتحان اليوم"}
                    </h3>
                    <p class="result-msg">
                        ${d?"لقد تمكنت من حل الأسئلة بنجاح وحصدت الدرجة المطلوبة للتفوق. استمر في طريق التميز الدراسي!":`حصلت على نسبة تقل عن ${e.passingScore}%. نقترح عليك مراجعة شرح الحصص والملاحظات مجدداً والمحاولة مرة أخرى.`}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn-secondary" id="quiz-exit-results-btn">العودة للحصص</button>
                        <button class="btn-primary" id="quiz-retry-btn">
                            <span>${d?"إعادة الامتحان للتحسين":"إعادة المحاولة مجدداً"}</span>
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                </div>
            `}}function R(){var C,E,P,A,B,D,j;(C=l.querySelector("#classroom-back-btn"))==null||C.addEventListener("click",()=>{q(),M.navigate("dashboard")}),(E=l.querySelector("#player-theme-toggle"))==null||E.addEventListener("click",t=>{t.preventDefault();const i=s.theme==="light"?"dark":"light";N.setTheme(i),document.body.className=i==="dark"?"dark-theme":"light-theme"}),l.querySelectorAll("[data-lesson-id]").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-lesson-id");let c=null;for(const y of a.chapters||[])if(c=y.lessons.find(T=>T.id===i),c)break;c&&(q(),r=c,b=!1,f=0,m())})}),l.querySelectorAll(".player-tabs-bar .player-tab-btn").forEach(t=>{t.addEventListener("click",()=>{L=t.getAttribute("data-tab"),m()})});const e=l.querySelector("#main-video-player"),v=l.querySelector("#video-play-toggle"),d=l.querySelector("#central-play-overlay"),n=l.querySelector("#lesson-complete-action-btn");if(e){e.addEventListener("play",()=>{var c,y;b=!0;const i=l.querySelector("#video-play-toggle i");i&&(i.className="fa-solid fa-pause"),(c=l.querySelector("#video-wrapper"))==null||c.classList.remove("paused"),(y=l.querySelector("#central-play-overlay"))==null||y.style.setProperty("display","none"),u()}),e.addEventListener("pause",()=>{var c;b=!1;const i=l.querySelector("#video-play-toggle i");i&&(i.className="fa-solid fa-play"),(c=l.querySelector("#video-wrapper"))==null||c.classList.add("paused"),clearInterval(x)}),e.addEventListener("ended",async()=>{b=!1,f=100,clearInterval(x),m(),s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(r.id)||await w.markLessonComplete(o,r.id,r.title)});const t=()=>{e.paused?e.play().catch(()=>{b=!0,u(),m()}):e.pause()};v&&v.addEventListener("click",t),d&&d.addEventListener("click",t)}const g=l.querySelector("#video-timeline-bg");g&&e&&g.addEventListener("click",t=>{const i=g.getBoundingClientRect(),c=t.clientX-i.left,y=i.width,T=Math.min(Math.max(c/y*100,0),100);f=T,e.duration&&(e.currentTime=T/100*e.duration);const H=l.querySelector("#video-timeline-fill");H&&(H.style.width=`${f}%`)});function u(){clearInterval(x),x=setInterval(async()=>{if(e&&e.duration){f=e.currentTime/e.duration*100;const i=l.querySelector("#video-time-label");if(i){const c=k(e.currentTime),y=k(e.duration);i.textContent=`${c} / ${y}`}}else f+=2.5,f>=100&&(f=100,b=!1,clearInterval(x),s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(r.id)||await w.markLessonComplete(o,r.id,r.title));const t=l.querySelector("#video-timeline-fill");t&&(t.style.width=`${f}%`)},1e3)}function k(t){const i=Math.floor(t/60),c=Math.floor(t%60);return`${i.toString().padStart(2,"0")}:${c.toString().padStart(2,"0")}`}function q(){if(clearInterval(x),e)try{e.pause()}catch{}}n&&n.addEventListener("click",async t=>{t.preventDefault(),s.progress&&s.progress.completedLessons&&s.progress.completedLessons[o]&&s.progress.completedLessons[o].includes(r.id)?await w.unmarkLessonComplete(o,r.id):await w.markLessonComplete(o,r.id,r.title)}),(P=l.querySelector("#start-quiz-btn"))==null||P.addEventListener("click",()=>{$="questions",h=0,z={},m()}),l.querySelectorAll(".quiz-option-btn").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.getAttribute("data-option-idx"),10);z[h]=i,m()})}),(A=l.querySelector("#quiz-next-btn"))==null||A.addEventListener("click",async()=>{const t=a.quiz;if(h===t.questions.length-1){let i=0;t.questions.forEach((c,y)=>{z[y]===c.correctAnswer&&i++}),S=Math.round(i/t.questions.length*100),$="results",S>=t.passingScore&&(await w.passQuiz(o,t.title,S),O()),m()}else h++,m()}),(B=l.querySelector("#quiz-cancel-btn"))==null||B.addEventListener("click",()=>{$="intro",m()}),(D=l.querySelector("#quiz-exit-results-btn"))==null||D.addEventListener("click",()=>{$="intro",m()}),(j=l.querySelector("#quiz-retry-btn"))==null||j.addEventListener("click",()=>{$="questions",h=0,z={},m()})}function O(){const e=document.getElementById("confetti-canvas-container");if(!e)return;e.innerHTML="";const v=["#4f46e5","#06b6d4","#10b981","#f43f5e","#fbbf24","#a855f7"];for(let d=0;d<100;d++){const n=document.createElement("div");n.className="confetti-piece",n.style.backgroundColor=v[Math.floor(Math.random()*v.length)],n.style.left=`${Math.random()*100}vw`,n.style.top="-20px";const g=Math.random()*8+6;n.style.width=`${g}px`,n.style.height=`${g}px`,n.style.animationDuration=`${Math.random()*2.5+2}s`,n.style.animationDelay=`${Math.random()*.5}s`,n.style.borderRadius=Math.random()>.5?"50%":"0%",e.appendChild(n)}setTimeout(()=>{e.innerHTML=""},5e3)}return m(),()=>{clearInterval(x),Q()}}export{J as default,J as initCoursePlayer};
