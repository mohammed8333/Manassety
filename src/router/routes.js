export const routes = {
    landing: {
        title: 'الرئيسية | منصتي',
        requiresAuth: false
    },
    dashboard: {
        title: 'بوابة الطالب | منصتي',
        requiresAuth: true
    },
    classroom: {
        title: 'الفصل الدراسي | منصتي',
        requiresAuth: true
    },
    admin: {
        title: 'لوحة التحكم للمدير | منصتي',
        requiresAuth: true,
        requiresInstructor: true // Admins or Instructors can enter
    },
    profile: {
        title: 'الملف الشخصي | منصتي',
        requiresAuth: true
    },
    auth: {
        title: 'تسجيل الدخول | منصتي',
        requiresAuth: false,
        requiresGuest: true // Only guest can view login/register
    }
};

export default routes;
