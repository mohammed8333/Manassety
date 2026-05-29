/* ==========================================================================
   Menassaty School Curriculum Course Database (Mock API Data)
   ========================================================================== */

export const courses = [
    {
        id: "course-1",
        title: "الرياضيات - الجبر والهندسة التحليلية",
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
            },
            {
                id: "c1-ch-2",
                title: "الباب الثاني: الهندسة التحليلية والمتجهات",
                lessons: [
                    {
                        id: "c1-l3",
                        title: "مقدمة في المتجهات في المستوى الإحداثي الثنائي",
                        duration: "15:20",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    },
                    {
                        id: "c1-l4",
                        title: "العمليات على المتجهات (الجمع، الطرح، والضرب في عدد حقيقي)",
                        duration: "20:05",
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
            },
            {
                name: "بنك أسئلة الوزارة ونماذج الإجابة الرسمية - رياضيات.pdf",
                size: "6.8 ميجابايت",
                link: "#"
            }
        ],
        quiz: {
            title: "اختبار تقييم وحدة الجبر والمصفوفات والمتجهات",
            passingScore: 70,
            questions: [
                {
                    id: "c1-q1",
                    question: "في المحددات، إذا تساوى صفان أو عمودان في محدد، فإن قيمة المحدد تساوي:",
                    options: [
                        "1",
                        "صفر",
                        "القيمة الكبرى للمحدد",
                        "حاصل ضرب القطر الرئيسي"
                    ],
                    correctAnswer: 1 // Index of صفر
                },
                {
                    id: "c1-q2",
                    question: "أي من الخيارات يمثل المعكوس الضربي للمصفوفة الصفرية؟",
                    options: [
                        "نفس المصفوفة الصفرية",
                        "مصفوفة الوحدة I",
                        "ليس لها معكوس ضربي",
                        "مقلوب القطر الرئيسي"
                    ],
                    correctAnswer: 2 // ليس لها معكوس
                },
                {
                    id: "c1-q3",
                    question: "إذا كان المتجه أ = (3, 4)، فإن معيار المتجه أ يساوي:",
                    options: [
                        "5 وحدات طول",
                        "7 وحدات طول",
                        "12 وحدة طول",
                        "25 وحدة طول"
                    ],
                    correctAnswer: 0 // معيار = جذر(3^2 + 4^2) = 5
                }
            ]
        }
    },
    {
        id: "course-2",
        title: "الفيزياء - الميكانيكا والكهرباء الحديثة",
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
                    },
                    {
                        id: "c2-l2",
                        title: "قانون الجذب العام وحركة الأقمار الصناعية حول الأرض",
                        duration: "16:25",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    }
                ]
            },
            {
                id: "c2-ch-2",
                title: "الباب الثاني: التيار الكهربائي وقانون أوم",
                lessons: [
                    {
                        id: "c2-l3",
                        title: "مفهوم شدة التيار الكهربائي وفرق الجهد والمقاومة",
                        duration: "18:50",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
                        completed: false
                    },
                    {
                        id: "c2-l4",
                        title: "طرق توصيل المقاومات على التوالي والتوازي وحساب المقاومة المكافئة",
                        duration: "24:15",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
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
            },
            {
                name: "نماذج وتجارب معملية تفاعلية مصورة ومترجمة.pdf",
                size: "5.5 ميجابايت",
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
                    options: [
                        "تقل للنصف",
                        "تتضاعف مرتين",
                        "تظل ثابتة دون تغيير",
                        "تتضاعف 4 مرات"
                    ],
                    correctAnswer: 1 // تتضاعف
                },
                {
                    id: "c2-q2",
                    question: "في الدوائر الكهربائية، عند توصيل المقاومات على التوالي فإن قيمة شدة التيار المار:",
                    options: [
                        "تتوزع على المقاومات بنسب متساوية",
                        "تتوزع بنسب عكسية للمقاومة",
                        "تكون متساوية في جميع المقاومات",
                        "تنخفض تدريجياً حتى تصل للصفر"
                    ],
                    correctAnswer: 2 // متساوية
                },
                {
                    id: "c2-q3",
                    question: "أي من الصيغ الرياضية التالية يعبر بشكل صحيح عن قانون أوم؟",
                    options: [
                        "الجهد (V) = التيار (I) ÷ المقاومة (R)",
                        "الجهد (V) = التيار (I) × المقاومة (R)",
                        "التيار (I) = الجهد (V) × المقاومة (R)",
                        "المقاومة (R) = الجهد (V) × التيار (I)"
                    ],
                    correctAnswer: 1 // V = I * R
                }
            ]
        }
    },
    {
        id: "course-3",
        title: "اللغة العربية - النحو والصرف وتذوق الأدب",
        category: "arabic",
        categoryAr: "لغة عربية",
        instructor: {
            name: "أ. يوسف الشافعي",
            role: "خبير مادة اللغة العربية للمرحلة الثانوية والمعاهد الأزهريّة",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
        },
        duration: "16 حصة",
        rating: 4.9,
        reviewsCount: 1650,
        image: "assets/images/course_arabic.jpg",
        description: "أتقن لغة الضاد وحلق في سماء النحو والبلاغة وتذوق روائع الأدب العربي! سنشرح الجملة الاسمية ونواسخها، الفاعل والمفاعيل، الاستعارة والتشبيه، وتدريبات على نصوص شعرية ونثرية.",
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
                    },
                    {
                        id: "c3-l2",
                        title: "الجملة الفعلية: أحكام الفاعل ونائب الفاعل ومنصوبات المفاعيل",
                        duration: "19:30",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
                        completed: false
                    }
                ]
            },
            {
                id: "c3-ch-2",
                title: "الباب الثاني: البلاغة العربية وروائع الأدب",
                lessons: [
                    {
                        id: "c3-l3",
                        title: "علم البيان: دراسة التشبيه وأقسامه والاستعارة المكنية والتصريحية",
                        duration: "13:40",
                        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                        completed: false
                    },
                    {
                        id: "c3-l4",
                        title: "تحليل أدبي وبلاغي لقصيدة اللغة العربية تنعي حظها لشاعر النيل حافظ إبراهيم",
                        duration: "17:15",
                        videoUrl: "https://www.w3schools.com/html/movie.mp4",
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
            },
            {
                name: "دليل الطالب المساعد في شرح الصور البلاغية والمجازية.pdf",
                size: "3.2 ميجابايت",
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
                    options: [
                        "مرفوع",
                        "منصوب",
                        "مجرور",
                        "مجزوم"
                    ],
                    correctAnswer: 1 // منصوب
                },
                {
                    id: "c3-q2",
                    question: "في جملة 'زارني الأسد في الفصل يلقي درساً'، ما نوع الصورة البيانية في كلمة 'الأسد'؟",
                    options: [
                        "تشبيه بليغ",
                        "استعارة مكنية",
                        "استعارة تصريحية",
                        "مجاز مرسل"
                    ],
                    correctAnswer: 2 // استعارة تصريحية (حيث صرح بالأسد وحذف المعلم)
                },
                {
                    id: "c3-q3",
                    question: "ما نوع الفعل 'كان' في جملة 'ظل الطالب يذاكر حتى أصبح':",
                    options: [
                        "ظل ناقص وأصبح تام",
                        "كلاهما فعل تام",
                        "كلاهما فعل ناقص",
                        "ظل تام وأصبح ناقص"
                    ],
                    correctAnswer: 0 // ظل الطالب يذاكر (ناقص) حتى أصبح (أي طلع عليه الصبح - تام)
                }
            ]
        }
    }
];
