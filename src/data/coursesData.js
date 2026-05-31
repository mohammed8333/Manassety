/* ==========================================================================
   Menassaty School Stages & Grades Database (Mock API Data)
   ========================================================================== */

export const courses = [
    {
        id: "course-math-sec3",
        title: "الرياضيات - الجبر والهندسة التحليلية",
        stage: "secondary",
        grade: "sec3",
        gradeAr: "الصف الثالث الثانوي",
        category: "math",
        categoryAr: "رياضيات",
        instructor: {
            name: "أ. أحمد رأفت",
            role: "كبير معلمي الرياضيات بوزارة التربية والتعليم",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "18 حصة",
        rating: 4.9,
        reviewsCount: 2450,
        image: "assets/images/course_math.jpg",
        description: "شرح شامل ومبسط لمنهج الرياضيات للمرحلة الثانوية. يغطي المنهج تنظيم البيانات في مصفوفات، حساب المحددات، وحل المعادلات الخطية بكافة الطرق، بالإضافة لأسس الهندسة التحليلية والمتجهات المستوية.",
        chapters: [
            {
                id: "c1-ch-1",
                title: "الباب الأول: المصفوفات والمحددات",
                lessons: [
                    {
                        id: "c1-l1",
                        title: "مفهوم المصفوفات وكيفية تنظيم البيانات داخلها",
                        duration: "12:15",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    },
                    {
                        id: "c1-l2",
                        title: "المحددات وحل أنظمة المعادلات الخطية بطريقة كرامر",
                        duration: "18:40",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
                        completed: false
                    }
                ]
            }
        ],
        resources: [
            {
                name: "ملخص قوانين الجبر والمصفوفات بالكامل.pdf",
                size: "2.5 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "اختبار تقييم وحدة الجبر والمصفوفات",
            passingScore: 70,
            questions: [
                {
                    id: "c1-q1",
                    question: "في المحددات، إذا تساوى صفان أو عمودان في محدد، فإن قيمة المحدد تساوي:",
                    options: ["1", "صفر", "القيمة الكبرى للمحدد", "حاصل ضرب القطر الرئيسي"],
                    correctAnswer: 1
                }
            ]
        }
    },
    {
        id: "course-physics-sec3",
        title: "الفيزياء - الميكانيكا والكهرباء الحديثة",
        stage: "secondary",
        grade: "sec3",
        gradeAr: "الصف الثالث الثانوي",
        category: "physics",
        categoryAr: "فيزياء",
        instructor: {
            name: "م. عمر فاروق",
            role: "مدرس علوم وفيزياء ومطور تجارب معملية",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "14 حصة",
        rating: 4.8,
        reviewsCount: 1890,
        image: "assets/images/course_physics.jpg",
        description: "استعد لفهم قوانين الكون بأبسط الأساليب! سنشرح قوانين نيوتن للحركة، الجاذبية الكونية والأقمار الصناعية، الدوائر الكهربائية وقانون أوم وتوصيل المقاومات بالتوالي والتوازي.",
        chapters: [
            {
                id: "c2-ch-1",
                title: "الباب الأول: قوانين الحركة والجاذبية",
                lessons: [
                    {
                        id: "c2-l1",
                        title: "شرح قوانين نيوتن للحركة الخطية وتطبيقاتها الحيوية",
                        duration: "14:10",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
                        completed: false
                    }
                ]
            }
        ],
        resources: [
            {
                name: "ملخص خرائط المفاهيم لوحدات الحركة والكهرباء.pdf",
                size: "4.1 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "اختبار الميكانيكا والدوائر الكهربائية والجهد",
            passingScore: 70,
            questions: [
                {
                    id: "c2-q1",
                    question: "وفقاً لقانون نيوتن الثاني، إذا تضاعفت القوة المؤثرة على جسم كتلته ثابتة فإن العجلة (التسارع):",
                    options: ["تقل للنصف", "تتضاعف مرتين", "تظل ثابتة دون تغيير", "تتضاعف 4 مرات"],
                    correctAnswer: 1
                }
            ]
        }
    },
    {
        id: "course-arabic-prep1",
        title: "اللغة العربية - قواعد النحو وتذوق الأدب",
        stage: "preparatory",
        grade: "prep1",
        gradeAr: "الصف الأول الإعدادي",
        category: "arabic",
        categoryAr: "لغة عربية",
        instructor: {
            name: "أ. يوسف الشافعي",
            role: "خبير مادة اللغة العربية للمرحلة الإعدادية والثانوية",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "16 حصة",
        rating: 4.9,
        reviewsCount: 1650,
        image: "assets/images/course_arabic.jpg",
        description: "أتقن لغة الضاد وحلق في سماء النحو والبلاغة وتذوق روائع الأدب العربي! سنشرح الجملة الاسمية ونواسخها، الفاعل والمفاعيل، والاستعارة والتشبيه لطلاب الصف الأول الإعدادي.",
        chapters: [
            {
                id: "c3-ch-1",
                title: "الباب الأول: قواعد النحو والإعراب",
                lessons: [
                    {
                        id: "c3-l1",
                        title: "الجملة الاسمية وأركانها ودخول النواسخ (كان وأخواتها، إن وأخواتها)",
                        duration: "15:10",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    }
                ]
            }
        ],
        resources: [
            {
                name: "ملخص القواعد النحوية والصرفية في كبسولة.docx",
                size: "1.8 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "اختبار شامل في قواعد النحو والبلاغة العربية",
            passingScore: 70,
            questions: [
                {
                    id: "c3-q1",
                    question: "ما هو حكم الاسم الواقع بعد الحرف الناسخ 'إنّ' من حيث الحالة الإعرابية؟",
                    options: ["مرفوع", "منصوب", "مجرور", "مجزوم"],
                    correctAnswer: 1
                }
            ]
        }
    },
    {
        id: "course-science-prim6",
        title: "العلوم والحياة - الكائنات والبيئة الطبيعية",
        stage: "primary",
        grade: "prim6",
        gradeAr: "الصف السادس الابتدائي",
        category: "physics",
        categoryAr: "علوم",
        instructor: {
            name: "أ. منى السيد",
            role: "مدرسة مادة العلوم للمرحلة الابتدائية المتميزة",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "12 حصة",
        rating: 4.8,
        reviewsCount: 840,
        image: "assets/images/learning_vector.jpg",
        description: "مرحباً بكم يا أبطال الصف السادس! سنستكشف سوياً عجائب الخلايا الحية، وتنوع الكائنات، وتركيب البيئة الطبيعية والأنظمة البيئية وكيف نحمي كوكبنا الجميل.",
        chapters: [
            {
                id: "c4-ch-1",
                title: "الباب الأول: الخلية الحية ووظائفها",
                lessons: [
                    {
                        id: "c4-l1",
                        title: "مكونات الخلية النباتية والخلية الحيوانية والفرق بينهما",
                        duration: "10:15",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    }
                ]
            }
        ],
        resources: [
            {
                name: "كتيب الخلايا والأنظمة البيئية المصور الملون.pdf",
                size: "3.5 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "اختبار العلوم وتصنيف الخلايا الحية",
            passingScore: 70,
            questions: [
                {
                    id: "c4-q1",
                    question: "أي من المكونات التالية يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟",
                    options: ["النواة", "الجدار الخلوي والبلاستيدات", "الغشاء البلازمي", "السيتوبلازم"],
                    correctAnswer: 1
                }
            ]
        }
    },
    {
        id: "course-math-prim1",
        title: "الرياضيات الذكية - الأرقام والأشكال والمجموعات",
        stage: "primary",
        grade: "prim1",
        gradeAr: "الصف الأول الابتدائي",
        category: "math",
        categoryAr: "رياضيات",
        instructor: {
            name: "أ. منى السيد",
            role: "مدرسة مادة العلوم للمرحلة الابتدائية المتميزة",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "10 حصة",
        rating: 4.9,
        reviewsCount: 620,
        image: "assets/images/course_math.jpg",
        description: "أهلاً بأحبائنا الصغار في الصف الأول! سنتعلم معاً بطرق مرحة وملونة الأرقام من 1 إلى 100، والجمع والطرح البسيط، والتعرف على الأشكال الهندسية الأساسية الممتعة.",
        chapters: [
            {
                id: "c5-ch-1",
                title: "الباب الأول: الأرقام والعد الأساسي",
                lessons: [
                    {
                        id: "c5-l1",
                        title: "العد وكتابة الأرقام من 1 إلى 20 بأسلوب الألعاب",
                        duration: "08:30",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
                        completed: false
                    }
                ]
            }
        ],
        resources: [
            {
                name: "كتاب الأنشطة التلوينية للأرقام والجمع.pdf",
                size: "4.2 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "كويز الأرقام البسيطة والأشكال الجميلة",
            passingScore: 70,
            questions: [
                {
                    id: "c5-q1",
                    question: "حاصل جمع الرقمين 3 + 2 يساوي:",
                    options: ["4", "5", "6", "7"],
                    correctAnswer: 1
                }
            ]
        }
    }
];
