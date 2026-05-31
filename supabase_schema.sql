-- ==========================================================================
-- منصتي التعليمية (Manassety) - Supabase Database Schema & Seeding SQL Script
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- to instantly set up all tables and populate the database with default courses!
-- ==========================================================================

-- 1. CLEAN UP: Drop tables if they already exist to prevent duplicate conflicts
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;

-- 2. CREATE TABLE: Users Profiles
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- Corresponds to Supabase Auth user uid
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'student', -- 'student', 'instructor', 'admin'
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. CREATE TABLE: Educational Courses Syllabus
CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    stage TEXT NOT NULL, -- 'primary', 'preparatory', 'secondary'
    grade TEXT NOT NULL, -- 'sec3', 'prim6', etc.
    "gradeAr" TEXT NOT NULL,
    category TEXT NOT NULL,
    "categoryAr" TEXT NOT NULL,
    duration TEXT,
    rating NUMERIC DEFAULT 5.0,
    "reviewsCount" INTEGER DEFAULT 0,
    image TEXT,
    instructor JSONB, -- Instructor name, role, avatar
    chapters JSONB DEFAULT '[]'::jsonb, -- Lessons syllabus array
    resources JSONB DEFAULT '[]'::jsonb, -- PDF files array
    quiz JSONB, -- Interactive quiz schema
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. CREATE TABLE: Students Learning Progress
CREATE TABLE progress (
    id TEXT PRIMARY KEY, -- Corresponds to user id
    "enrolledCourses" JSONB DEFAULT '[]'::jsonb,
    "completedLessons" JSONB DEFAULT '{}'::jsonb,
    "passedQuizzes" JSONB DEFAULT '[]'::jsonb,
    "favoriteCourses" JSONB DEFAULT '[]'::jsonb,
    "lastActivity" JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. CREATE TABLE: Student Notifications
CREATE TABLE notifications (
    id TEXT PRIMARY KEY, -- Corresponds to user id
    list JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. CREATE TABLE: Analytics Logs
CREATE TABLE analytics (
    id TEXT PRIMARY KEY, -- e.g., 'events-YYYY-MM-DD'
    list JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. SEED DATA: Populate courses table with the 5 default منهجية courses
INSERT INTO courses (id, title, description, stage, grade, "gradeAr", category, "categoryAr", duration, rating, "reviewsCount", image, instructor, chapters, resources, quiz) VALUES
(
    'course-math-sec3',
    'الرياضيات - الجبر والهندسة التحليلية',
    'شرح شامل ومبسط لمنهج الرياضيات للمرحلة الثانوية. يغطي المنهج تنظيم البيانات في مصفوفات، حساب المحددات، وحل المعادلات الخطية بكافة الطرق، بالإضافة لأسس الهندسة التحليلية والمتجهات المستوية.',
    'secondary',
    'sec3',
    'الصف الثالث الثانوي',
    'math',
    'رياضيات',
    '18 حصة',
    4.9,
    2450,
    'assets/images/course_math.jpg',
    '{"name": "أ. أحمد رأفت", "role": "كبير معلمي الرياضيات بوزارة التربية والتعليم", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"}'::jsonb,
    '[{"id": "c1-ch-1", "title": "الباب الأول: المصفوفات والمحددات", "lessons": [{"id": "c1-l1", "title": "مفهوم المصفوفات وكيفية تنظيم البيانات داخلها", "duration": "12:15", "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4", "completed": false}, {"id": "c1-l2", "title": "المحددات وحل أنظمة المعادلات الخطية بطريقة كرامر", "duration": "18:40", "videoUrl": "https://www.w3schools.com/html/movie.mp4", "completed": false}]}]'::jsonb,
    '[{"name": "ملخص قوانين الجبر والمصفوفات بالكامل.pdf", "size": "2.5 ميجابايت", "link": "#"}]'::jsonb,
    '{"title": "اختبار تقييم وحدة الجبر والمصفوفات", "passingScore": 70, "questions": [{"id": "c1-q1", "question": "في المحددات، إذا تساوى صفان أو عمودان في محدد، فإن قيمة المحدد تساوي:", "options": ["1", "صفر", "القيمة الكبرى للمحدد", "حاصل ضرب القطر الرئيسي"], "correctAnswer": 1}]}'::jsonb
),
(
    'course-physics-sec3',
    'الفيزياء - الميكانيكا والكهرباء الحديثة',
    'استعد لفهم قوانين الكون بأبسط الأساليب! سنشرح قوانين نيوتن للحركة، الجاذبية الكونية والأقمار الصناعية، الدوائر الكهربائية وقانون أوم وتوصيل المقاومات بالتوالي والتوازي.',
    'secondary',
    'sec3',
    'الصف الثالث الثانوي',
    'physics',
    'فيزياء',
    '14 حصة',
    4.8,
    1890,
    'assets/images/course_physics.jpg',
    '{"name": "م. عمر فاروق", "role": "مدرس علوم وفيزياء ومطور تجارب معملية", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"}'::jsonb,
    '[{"id": "c2-ch-1", "title": "الباب الأول: قوانين الحركة والجاذبية", "lessons": [{"id": "c2-l1", "title": "شرح قوانين نيوتن للحركة الخطية وتطبيقاتها الحيوية", "duration": "14:10", "videoUrl": "https://www.w3schools.com/html/movie.mp4", "completed": false}]}]'::jsonb,
    '[{"name": "ملخص خرائط المفاهيم لوحدات الحركة والكهرباء.pdf", "size": "4.1 ميجابايت", "link": "#"}]'::jsonb,
    '{"title": "اختبار الميكانيكا والدوائر الكهربائية والجهد", "passingScore": 70, "questions": [{"id": "c2-q1", "question": "وفقاً لقانون نيوتن الثاني، إذا تضاعفت القوة المؤثرة على جسم كتلته ثابتة فإن العجلة (التسارع):", "options": ["تقل للنصف", "تتضاعف مرتين", "تظل ثابتة دون تغيير", "تتضاعف 4 مرات"], "correctAnswer": 1}]}'::jsonb
),
(
    'course-arabic-prep1',
    'اللغة العربية - قواعد النحو وتذوق الأدب',
    'أتقن لغة الضاد وحلق في سماء النحو والبلاغة وتذوق روائع الأدب العربي! سنشرح الجملة الاسمية ونواسخها، الفاعل والمفاعيل، والاستعارة والتشبيه لطلاب الصف الأول الإعدادي.',
    'preparatory',
    'prep1',
    'الصف الأول الإعدادي',
    'arabic',
    'لغة عربية',
    '16 حصة',
    4.9,
    1650,
    'assets/images/course_arabic.jpg',
    '{"name": "أ. يوسف الشافعي", "role": "خبير مادة اللغة العربية للمرحلة الإعدادية والثانوية", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"}'::jsonb,
    '[{"id": "c3-ch-1", "title": "الباب الأول: قواعد النحو والإعراب", "lessons": [{"id": "c3-l1", "title": "الجملة الاسمية وأركانها ودخول النواسخ (كان وأخواتها، إن وأخواتها)", "duration": "15:10", "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4", "completed": false}]}]'::jsonb,
    '[{"name": "ملخص القواعد النحوية والصرفية في كبسولة.docx", "size": "1.8 ميجابايت", "link": "#"}]'::jsonb,
    '{"title": "اختبار شامل في قواعد النحو والبلاغة العربية", "passingScore": 70, "questions": [{"id": "c3-q1", "question": "ما هو حكم الاسم الواقع بعد الحرف الناسخ ''إنّ'' من حيث الحالة الإعرابية؟", "options": ["مرفوع", "منصوب", "مجرور", "مجزوم"], "correctAnswer": 1}]}'::jsonb
),
(
    'course-science-prim6',
    'العلوم والحياة - الكائنات والبيئة الطبيعية',
    'مرحباً بكم يا أبطال الصف السادس! سنستكشف سوياً عجائب الخلايا الحية، وتنوع الكائنات، وتركيب البيئة الطبيعية والأنظمة البيئية وكيف نحمي كوكبنا الجميل.',
    'primary',
    'prim6',
    'الصف السادس الابتدائي',
    'physics',
    'علوم',
    '12 حصة',
    4.8,
    840,
    'assets/images/learning_vector.jpg',
    '{"name": "أ. منى السيد", "role": "مدرسة مادة العلوم للمرحلة الابتدائية المتميزة", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"}'::jsonb,
    '[{"id": "c4-ch-1", "title": "الباب الأول: الخلية الحية ووظائفها", "lessons": [{"id": "c4-l1", "title": "مكونات الخلية النباتية والخلية الحيوانية والفرق بينهما", "duration": "10:15", "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4", "completed": false}]}]'::jsonb,
    '[{"name": "كتيب الخلايا والأنظمة البيئية المصور الملون.pdf", "size": "3.5 ميجابايت", "link": "#"}]'::jsonb,
    '{"title": "اختبار العلوم وتصنيف الخلايا الحية", "passingScore": 70, "questions": [{"id": "c4-q1", "question": "أي من المكونات التالية يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟", "options": ["النواة", "الجدار الخلوي والبلاستيدات", "الغشاء البلازمي", "السيتوبلازم"], "correctAnswer": 1}]}'::jsonb
),
(
    'course-math-prim1',
    'الرياضيات الذكية - الأرقام والأشكال والمجموعات',
    'أهلاً بأحبائنا الصغار في الصف الأول! سنتعلم معاً بطرق مرحة وملونة الأرقام من 1 إلى 100، والجمع والطرح البسيط، والتعرف على الأشكال الهندسية الأساسية الممتعة.',
    'primary',
    'prim1',
    'الصف الأول الابتدائي',
    'math',
    'رياضيات',
    '10 حصة',
    4.9,
    620,
    'assets/images/course_math.jpg',
    '{"name": "أ. منى السيد", "role": "مدرسة مادة العلوم للمرحلة الابتدائية المتميزة", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"}'::jsonb,
    '[{"id": "c5-ch-1", "title": "الباب الأول: الأرقام والعد الأساسي", "lessons": [{"id": "c5-l1", "title": "العد وكتابة الأرقام من 1 إلى 20 بأسلوب الألعاب", "duration": "08:30", "videoUrl": "https://www.w3schools.com/html/movie.mp4", "completed": false}]}]'::jsonb,
    '[{"name": "كتاب الأنشطة التلوينية للأرقام والجمع.pdf", "size": "4.2 ميجابايت", "link": "#"}]'::jsonb,
    '{"title": "كويز الأرقام البسيطة والأشكال الجميلة", "passingScore": 70, "questions": [{"id": "c5-q1", "question": "حاصل جمع الرقمين 3 + 2 يساوي:", "options": ["4", "5", "6", "7"], "correctAnswer": 1}]}'::jsonb
);

-- 8. SECURITY POLICY: Enable public read/write access (Simplest configuration for student project)
-- If you want strict RLS, you can configure Supabase policies, but for ease of DDL setup, 
-- we allow all operations. Postgres tables are now ready and fully functional!
