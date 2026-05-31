import{c as b,b as j}from"./index-DiqDKeqa.js";import{a as D,b as V}from"./validators-k0nZOdk1.js";import{e as d}from"./xss-D4V6puIs.js";function B(t,I,g){let o="login",i="",p="",m=!1,u="",y="",x="",l="student";function a(){t.innerHTML=`
            <div class="auth-page-wrapper" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative;">
                <!-- Decorative background elements -->
                <div class="glow-orb orb-1" style="top:10%; right:10%;"></div>
                <div class="glow-orb orb-2" style="bottom:10%; left:10%;"></div>

                <div class="auth-card glass-panel" style="width: 100%; max-width: 480px; padding: 2.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); z-index: 5; border: 1px solid var(--glass-border); transition: var(--transition-base);">
                    <!-- Brand Logo -->
                    <div style="text-align: center; margin-bottom: 2rem; cursor:pointer;" id="auth-logo-btn">
                        <img src="assets/images/logo.png?v=1.2" alt="شعار منصتي" style="width: 50px; height: 50px; object-fit: contain; margin-bottom: 0.5rem;">
                        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary);">منصتي التعليمية</h2>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top:0.25rem;">بوابتك المدرسية للتفوق والدرجات النهائية</p>
                    </div>

                    ${i?`
                        <div class="badge badge-secondary" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: #ef4444; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span style="font-weight: 700; text-align:right;">${d(i)}</span>
                        </div>
                    `:""}

                    ${p?`
                        <div class="badge badge-success" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--success); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <i class="fa-solid fa-circle-check"></i>
                            <span style="font-weight: 700; text-align:right;">${d(p)}</span>
                        </div>
                    `:""}

                    ${A(o,m)}
                </div>
            </div>
        `,Y()}function A(s,e){const c=e?'<i class="fa-solid fa-spinner fa-spin" style="margin-left:6px;"></i> جاري المعالجة...':s==="login"?"تسجيل الدخول":s==="register"?"إنشاء حساب جديد":"إرسال رابط الاستعادة";if(s==="login")return`
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${d(u)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label for="password" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">كلمة المرور</label>
                            <a href="#" id="goto-forgot-btn" style="font-size: 0.8rem; color: var(--primary); font-weight: 700; text-decoration: none;">نسيت كلمة المرور؟</a>
                        </div>
                        <div style="position: relative;">
                            <input type="password" id="password" value="${d(y)}" required placeholder="••••••••" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-lock" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${e?"disabled":""}>
                        <span>${c}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        ليس لديك حساب؟ 
                        <a href="#" id="goto-register-btn" style="color: var(--primary); font-weight: 700; text-decoration: none; margin-right: 4px;">أنشئ حساباً الآن</a>
                    </p>
                </form>
            `;if(s==="register")return`
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="name" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">الاسم الكامل</label>
                        <div style="position: relative;">
                            <input type="text" id="name" value="${d(x)}" required placeholder="محمد أحمد" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-user" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${d(u)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="password" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">كلمة المرور (6 أحرف أو أكثر)</label>
                        <div style="position: relative;">
                            <input type="password" id="password" value="${d(y)}" required placeholder="••••••••" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-lock" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">نوع الحساب</label>
                        <div style="display: flex; gap: 1rem;">
                            <label style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.6rem; border-radius:8px; border:1px solid ${l==="student"?"var(--primary)":"var(--card-border)"}; background:${l==="student"?"rgba(99,102,241,0.05)":"var(--bg-secondary)"}; cursor:pointer;">
                                <input type="radio" name="role" value="student" ${l==="student"?"checked":""} style="accent-color:var(--primary);" ${e?"disabled":""}>
                                <span style="font-size:0.85rem; font-weight:700;">طالب</span>
                            </label>
                            <label style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.6rem; border-radius:8px; border:1px solid ${l==="instructor"?"var(--primary)":"var(--card-border)"}; background:${l==="instructor"?"rgba(99,102,241,0.05)":"var(--bg-secondary)"}; cursor:pointer;">
                                <input type="radio" name="role" value="instructor" ${l==="instructor"?"checked":""} style="accent-color:var(--primary);" ${e?"disabled":""}>
                                <span style="font-size:0.85rem; font-weight:700;">مدرس</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${e?"disabled":""}>
                        <span>${c}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        لديك حساب بالفعل؟ 
                        <a href="#" id="goto-login-btn" style="color: var(--primary); font-weight: 700; text-decoration: none; margin-right: 4px;">سجل دخولك الآن</a>
                    </p>
                </form>
            `;if(s==="forgot")return`
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; line-height: 1.6; margin-bottom: 0.5rem;">
                        أدخل بريدك الإلكتروني وسنقوم بإرسال رسالة تحتوي على رابط تفاعلي لإعادة تعيين كلمة المرور الخاصة بك فوراً.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${d(u)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${e?"disabled":""}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${e?"disabled":""}>
                        <span>${c}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        <a href="#" id="goto-login-btn" style="color: var(--primary); font-weight: 700; text-decoration: none;"><i class="fa-solid fa-arrow-right" style="margin-left:6px; font-size:0.8rem;"></i> العودة لتسجيل الدخول</a>
                    </p>
                </form>
            `}function Y(){var w,$,k;(w=t.querySelector("#auth-logo-btn"))==null||w.addEventListener("click",()=>g.navigate("landing")),($=t.querySelector("#goto-register-btn"))==null||$.addEventListener("click",r=>{r.preventDefault(),o="register",i="",p="",a()}),(k=t.querySelector("#goto-forgot-btn"))==null||k.addEventListener("click",r=>{r.preventDefault(),o="forgot",i="",p="",a()}),t.querySelectorAll("#goto-login-btn").forEach(r=>{r.addEventListener("click",n=>{n.preventDefault(),o="login",i="",p="",a()})}),t.querySelectorAll('input[name="role"]').forEach(r=>{r.addEventListener("change",n=>{l=n.target.value,a()})});const s=t.querySelector("#email");s&&s.addEventListener("change",r=>{u=r.target.value});const e=t.querySelector("#password");e&&e.addEventListener("change",r=>{y=r.target.value});const c=t.querySelector("#name");c&&c.addEventListener("change",r=>{x=r.target.value});const h=t.querySelector("#auth-form");h&&h.addEventListener("submit",async r=>{var z,S,L,E;r.preventDefault(),i="",p="",m=!0,a();const n=(z=t.querySelector("#email"))==null?void 0:z.value.trim(),v=(S=t.querySelector("#password"))==null?void 0:S.value,q=(E=(L=t.querySelector("#name"))==null?void 0:L.value)==null?void 0:E.trim();if(!D(n)){i="البريد الإلكتروني المكتوب غير صالح",m=!1,a();return}if(o!=="forgot"&&!V(v)){i="كلمة المرور يجب أن لا تقل عن 6 أحرف",m=!1,a();return}try{if(o==="login"){await b.login(n,v);const f=j.getState().redirectAfterAuth;f?(j.setState({redirectAfterAuth:null}),g.navigate(f.route,f.params)):g.navigate("dashboard")}else if(o==="register"){if(!q){i="يرجى كتابة الاسم بالكامل",m=!1,a();return}await b.register(n,v,q,l),g.navigate("dashboard")}else o==="forgot"&&(await b.resetPassword(n),p="تم إرسال تعليمات استعادة كلمة المرور لبريدك بنجاح!",o="login",m=!1,a())}catch(f){console.error("Auth action failed:",f),i=f.message||"حدث خطأ غير متوقع أثناء معالجة الطلب",m=!1,a()}})}a()}export{B as default,B as initAuth};
