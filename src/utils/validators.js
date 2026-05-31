/**
 * Validates an email address.
 * @param {string} email 
 * @returns {boolean}
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}

/**
 * Validates a password (minimum 6 characters for Firebase standard).
 * @param {string} password 
 * @returns {boolean}
 */
export function validatePassword(password) {
    if (!password || typeof password !== 'string') return false;
    return password.length >= 6;
}

/**
 * Validates course structure before saving (Admin panel).
 * @param {object} course 
 * @returns {string|null} returns error message or null if valid
 */
export function validateCourse(course) {
    if (!course || typeof course !== 'object') return 'بيانات الدورة غير صالحة';
    if (!course.title || course.title.trim() === '') return 'عنوان الدورة مطلوب';
    if (!course.description || course.description.trim() === '') return 'وصف الدورة مطلوب';
    if (!course.category || course.category.trim() === '') return 'تصنيف الدورة مطلوب';
    if (!course.grade || course.grade.trim() === '') return 'الصف الدراسي مطلوب';
    if (!course.instructor || !course.instructor.name || course.instructor.name.trim() === '') return 'اسم المعلم مطلوب';
    return null;
}

/**
 * Validates quiz structure before saving (Admin panel).
 * @param {object} quiz 
 * @returns {string|null} returns error message or null if valid
 */
export function validateQuiz(quiz) {
    if (!quiz || typeof quiz !== 'object') return 'بيانات الاختبار غير صالحة';
    if (!quiz.title || quiz.title.trim() === '') return 'عنوان الاختبار مطلوب';
    if (typeof quiz.passingScore !== 'number' || quiz.passingScore < 0 || quiz.passingScore > 100) return 'درجة الاجتياز يجب أن تكون بين 0 و 100';
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) return 'يجب إضافة سؤال واحد على الأقل للاختبار';
    
    for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        if (!q.question || q.question.trim() === '') return `السؤال رقم ${i + 1} لا يحتوي على نص`;
        if (!Array.isArray(q.options) || q.options.length < 2) return `السؤال رقم ${i + 1} يجب أن يحتوي على خيارين على الأقل`;
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
            return `الإجابة الصحيحة للسؤال رقم ${i + 1} غير صالحة`;
        }
    }
    return null;
}
