import { authService } from '../services/authService.js';
import { validateEmail, validatePassword } from '../utils/validators.js';
import appStore from '../store/appStore.js';
import { escapeHTML } from '../utils/xss.js';

export function initAuth(container, state, router) {
    let mode = 'login'; // 'login', 'register', 'forgot'
    let errorMsg = '';
    let successMsg = '';
    let isLoading = false;

    // Local form values
    let emailVal = '';
    let passwordVal = '';
    let nameVal = '';
    let roleVal = 'student'; // default role

    function render() {
        container.innerHTML = `
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

                    ${errorMsg ? `
                        <div class="badge badge-secondary" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: #ef4444; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span style="font-weight: 700; text-align:right;">${escapeHTML(errorMsg)}</span>
                        </div>
                    ` : ''}

                    ${successMsg ? `
                        <div class="badge badge-success" style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--success); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                            <i class="fa-solid fa-circle-check"></i>
                            <span style="font-weight: 700; text-align:right;">${escapeHTML(successMsg)}</span>
                        </div>
                    ` : ''}

                    ${renderForm(mode, isLoading)}
                </div>
            </div>
        `;

        setupEventListeners();
    }

    function renderForm(currentMode, loading) {
        const btnText = loading ? '<i class="fa-solid fa-spinner fa-spin" style="margin-left:6px;"></i> جاري المعالجة...' : 
            currentMode === 'login' ? 'تسجيل الدخول' : 
            currentMode === 'register' ? 'إنشاء حساب جديد' : 'إرسال رابط الاستعادة';

        if (currentMode === 'login') {
            return `
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${escapeHTML(emailVal)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label for="password" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">كلمة المرور</label>
                            <a href="#" id="goto-forgot-btn" style="font-size: 0.8rem; color: var(--primary); font-weight: 700; text-decoration: none;">نسيت كلمة المرور؟</a>
                        </div>
                        <div style="position: relative;">
                            <input type="password" id="password" value="${escapeHTML(passwordVal)}" required placeholder="••••••••" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-lock" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${loading ? 'disabled' : ''}>
                        <span>${btnText}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        ليس لديك حساب؟ 
                        <a href="#" id="goto-register-btn" style="color: var(--primary); font-weight: 700; text-decoration: none; margin-right: 4px;">أنشئ حساباً الآن</a>
                    </p>
                </form>
            `;
        }

        if (currentMode === 'register') {
            return `
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="name" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">الاسم الكامل</label>
                        <div style="position: relative;">
                            <input type="text" id="name" value="${escapeHTML(nameVal)}" required placeholder="محمد أحمد" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-user" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${escapeHTML(emailVal)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="password" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">كلمة المرور (6 أحرف أو أكثر)</label>
                        <div style="position: relative;">
                            <input type="password" id="password" value="${escapeHTML(passwordVal)}" required placeholder="••••••••" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-lock" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">نوع الحساب</label>
                        <div style="display: flex; gap: 1rem;">
                            <label style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.6rem; border-radius:8px; border:1px solid ${roleVal === 'student' ? 'var(--primary)' : 'var(--card-border)'}; background:${roleVal === 'student' ? 'rgba(99,102,241,0.05)' : 'var(--bg-secondary)'}; cursor:pointer;">
                                <input type="radio" name="role" value="student" ${roleVal === 'student' ? 'checked' : ''} style="accent-color:var(--primary);" ${loading ? 'disabled' : ''}>
                                <span style="font-size:0.85rem; font-weight:700;">طالب</span>
                            </label>
                            <label style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.6rem; border-radius:8px; border:1px solid ${roleVal === 'instructor' ? 'var(--primary)' : 'var(--card-border)'}; background:${roleVal === 'instructor' ? 'rgba(99,102,241,0.05)' : 'var(--bg-secondary)'}; cursor:pointer;">
                                <input type="radio" name="role" value="instructor" ${roleVal === 'instructor' ? 'checked' : ''} style="accent-color:var(--primary);" ${loading ? 'disabled' : ''}>
                                <span style="font-size:0.85rem; font-weight:700;">مدرس</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${loading ? 'disabled' : ''}>
                        <span>${btnText}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        لديك حساب بالفعل؟ 
                        <a href="#" id="goto-login-btn" style="color: var(--primary); font-weight: 700; text-decoration: none; margin-right: 4px;">سجل دخولك الآن</a>
                    </p>
                </form>
            `;
        }

        if (currentMode === 'forgot') {
            return `
                <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; line-height: 1.6; margin-bottom: 0.5rem;">
                        أدخل بريدك الإلكتروني وسنقوم بإرسال رسالة تحتوي على رابط تفاعلي لإعادة تعيين كلمة المرور الخاصة بك فوراً.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">البريد الإلكتروني</label>
                        <div style="position: relative;">
                            <input type="email" id="email" value="${escapeHTML(emailVal)}" required placeholder="name@example.com" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--bg-secondary); color: var(--text-primary); outline: none;" ${loading ? 'disabled' : ''}>
                            <i class="fa-solid fa-envelope" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; border-radius: 8px; margin-top: 0.5rem; justify-content: center;" ${loading ? 'disabled' : ''}>
                        <span>${btnText}</span>
                    </button>

                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                        <a href="#" id="goto-login-btn" style="color: var(--primary); font-weight: 700; text-decoration: none;"><i class="fa-solid fa-arrow-right" style="margin-left:6px; font-size:0.8rem;"></i> العودة لتسجيل الدخول</a>
                    </p>
                </form>
            `;
        }
    }

    function setupEventListeners() {
        // Logo redirection
        container.querySelector('#auth-logo-btn')?.addEventListener('click', () => router.navigate('landing'));

        // Toggle modes
        container.querySelector('#goto-register-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            mode = 'register';
            errorMsg = '';
            successMsg = '';
            render();
        });

        container.querySelector('#goto-forgot-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            mode = 'forgot';
            errorMsg = '';
            successMsg = '';
            render();
        });

        container.querySelectorAll('#goto-login-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                mode = 'login';
                errorMsg = '';
                successMsg = '';
                render();
            });
        });

        // Save radio role toggles immediately on selection for visual boundary
        container.querySelectorAll('input[name="role"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                roleVal = e.target.value;
                render();
            });
        });

        // Live input capture to preserve state across toggle updates
        const emailInput = container.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('change', (e) => {
                emailVal = e.target.value;
            });
        }
        
        const pwdInput = container.querySelector('#password');
        if (pwdInput) {
            pwdInput.addEventListener('change', (e) => {
                passwordVal = e.target.value;
            });
        }
        
        const nameInput = container.querySelector('#name');
        if (nameInput) {
            nameInput.addEventListener('change', (e) => {
                nameVal = e.target.value;
            });
        }

        // Form Submit
        const form = container.querySelector('#auth-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                errorMsg = '';
                successMsg = '';
                isLoading = true;
                render();

                // Re-fetch inputs
                const email = container.querySelector('#email')?.value.trim();
                const password = container.querySelector('#password')?.value;
                const name = container.querySelector('#name')?.value?.trim();

                // 1. Validation
                if (!validateEmail(email)) {
                    errorMsg = 'البريد الإلكتروني المكتوب غير صالح';
                    isLoading = false;
                    render();
                    return;
                }

                if (mode !== 'forgot' && !validatePassword(password)) {
                    errorMsg = 'كلمة المرور يجب أن لا تقل عن 6 أحرف';
                    isLoading = false;
                    render();
                    return;
                }

                try {
                    if (mode === 'login') {
                        await authService.login(email, password);
                        
                        // Check if redirect pending
                        const redirect = appStore.getState().redirectAfterAuth;
                        if (redirect) {
                            appStore.setState({ redirectAfterAuth: null });
                            router.navigate(redirect.route, redirect.params);
                        } else {
                            router.navigate('dashboard');
                        }
                    } else if (mode === 'register') {
                        if (!name) {
                            errorMsg = 'يرجى كتابة الاسم بالكامل';
                            isLoading = false;
                            render();
                            return;
                        }
                        await authService.register(email, password, name, roleVal);
                        router.navigate('dashboard');
                    } else if (mode === 'forgot') {
                        await authService.resetPassword(email);
                        successMsg = 'تم إرسال تعليمات استعادة كلمة المرور لبريدك بنجاح!';
                        mode = 'login';
                        isLoading = false;
                        render();
                    }
                } catch (error) {
                    console.error("Auth action failed:", error);
                    errorMsg = error.message || 'حدث خطأ غير متوقع أثناء معالجة الطلب';
                    isLoading = false;
                    render();
                }
            });
        }
    }

    render();
}
export default initAuth;
