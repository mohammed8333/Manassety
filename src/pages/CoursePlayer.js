import { courseService } from '../services/courseService.js';
import { storageService } from '../services/storageService.js';
import appStore from '../store/appStore.js';
import { escapeHTML } from '../utils/xss.js';

export function initCoursePlayer(container, state, router, courseId) {
    const course = courseService.getCourseById(courseId);
    if (!course) {
        // Safe alert fallback
        alert("المادة غير موجودة!");
        router.navigate('dashboard');
        return;
    }

    // Component State
    let activeLesson = null;
    let activeTab = 'overview'; // 'overview', 'resources', 'quiz'
    
    // Find the first uncompleted lesson, or default to the very first lesson
    for (const chapter of course.chapters || []) {
        for (const lesson of chapter.lessons || []) {
            const isCompleted = state.progress && state.progress.completedLessons && 
                state.progress.completedLessons[courseId] && 
                state.progress.completedLessons[courseId].includes(lesson.id);
            if (!isCompleted) {
                activeLesson = lesson;
                break;
            }
        }
        if (activeLesson) break;
    }
    if (!activeLesson && course.chapters && course.chapters.length > 0 && course.chapters[0].lessons && course.chapters[0].lessons.length > 0) {
        activeLesson = course.chapters[0].lessons[0];
    }

    // Video Playback simulated properties
    let isPlaying = false;
    let videoProgress = 0; // percentage
    let simulatedInterval = null;

    // Quiz State
    let quizState = 'intro'; // 'intro', 'questions', 'results'
    let currentQuestionIndex = 0;
    let selectedAnswers = {}; // questionIndex: optionIndex
    let quizScore = 0;

    const unsubscribe = appStore.subscribe((newState) => {
        if (state !== newState) {
            state = newState;
            // Draw again, preserving video simulation state if it's currently playing
            render();
        }
    });

    function render() {
        // Calculate dynamic completion stats
        let totalLessons = 0;
        let completedCount = 0;
        (course.chapters || []).forEach(ch => {
            (ch.lessons || []).forEach(l => {
                totalLessons++;
                const isCompleted = state.progress && state.progress.completedLessons && 
                    state.progress.completedLessons[courseId] && 
                    state.progress.completedLessons[courseId].includes(l.id);
                if (isCompleted) completedCount++;
            });
        });
        const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        container.innerHTML = `
            <div class="player-container">
                <!-- Main Classroom Screen -->
                <div class="player-main-view">
                    <!-- Top Navigation Bar -->
                    <div class="player-header">
                        <button class="back-to-db-btn" id="classroom-back-btn">
                            <i class="fa-solid fa-arrow-right" style="margin-left: 6px;"></i>
                            <span>العودة لبوابة الطالب</span>
                        </button>
                        <h2 class="player-title">${escapeHTML(course.title)}</h2>
                        <!-- Theme Toggle inside Classroom -->
                        <button class="btn-icon" id="player-theme-toggle" title="تغيير المظهر">
                            <i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                        </button>
                    </div>

                    ${activeLesson ? `
                        <!-- Video Player Area -->
                        <div class="video-player-wrapper ${isPlaying ? '' : 'paused'}" id="video-wrapper">
                            <!-- Custom HTML5 video simulated player -->
                            <video class="custom-video" id="main-video-player" src="${escapeHTML(activeLesson.videoUrl)}" playsinline></video>
                            
                            <!-- Video Simulation Center Overlay Play Button -->
                            ${isPlaying ? '' : `
                                <div class="video-overlay-play" id="central-play-overlay">
                                    <div class="play-central-btn">
                                        <i class="fa-solid fa-play" style="margin-right: 4px;"></i>
                                    </div>
                                </div>
                            `}

                            <!-- Custom Glass Controls Panel -->
                            <div class="custom-video-controls glass-panel">
                                <div class="progress-control-bar" id="video-timeline-bg">
                                    <div class="progress-control-fill" id="video-timeline-fill" style="width: ${videoProgress}%;"></div>
                                </div>
                                <div class="controls-row">
                                    <div class="left-controls">
                                        <button class="video-control-btn" id="video-play-toggle">
                                            <i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                                        </button>
                                        <span class="video-timer" id="video-time-label">00:00 / ${escapeHTML(activeLesson.duration)}</span>
                                    </div>
                                    <div style="display: flex; gap: 1rem; align-items: center;">
                                        <button class="video-control-btn" id="lesson-complete-action-btn">
                                            <i class="fa-solid fa-circle-check" style="color: ${state.progress && state.progress.completedLessons && state.progress.completedLessons[courseId]?.includes(activeLesson.id) ? 'var(--success)' : 'inherit'};"></i>
                                            <span style="font-size: 0.85rem; font-weight: 700; margin-right: 4px;">
                                                ${state.progress && state.progress.completedLessons && state.progress.completedLessons[courseId]?.includes(activeLesson.id) ? 'تمت مذاكرته' : 'تحديد كمكتمل'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div class="glass-panel" style="padding: 4rem; text-align: center; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                            <i class="fa-solid fa-clapperboard" style="font-size: 3.5rem; color:var(--text-muted); margin-bottom: 1rem;"></i>
                            <h3>لا تتوفر شروحات فيديو لهذه المادة حالياً</h3>
                            <p style="color:var(--text-secondary);">يمكنك إضافة فصول ودروس للمادة من لوحة الإدارة المشتركة.</p>
                        </div>
                    `}

                    <!-- Tabs Selector Bar -->
                    <div class="player-tabs-bar">
                        <button class="player-tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">شرح المادة</button>
                        <button class="player-tab-btn ${activeTab === 'resources' ? 'active' : ''}" data-tab="resources">ملخصات ومذكرات</button>
                        <button class="player-tab-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">امتحان الباب</button>
                    </div>

                    <!-- Tabs Details Container -->
                    <div class="tab-panels-wrap">
                        <!-- Overview Panel -->
                        <div class="tab-panel-content ${activeTab === 'overview' ? 'active' : ''}">
                            <div style="background: var(--bg-secondary); padding: 2.2rem; border-radius: var(--radius-lg); border: 1px solid var(--card-border); margin-bottom: 2rem;">
                                <h3 style="font-size: 1.3rem; margin-bottom: 1rem; font-weight:800;">تفاصيل المنهج الدراسي</h3>
                                <p style="color: var(--text-secondary); margin-bottom: 1.75rem; line-height: 1.7;">${escapeHTML(course.description)}</p>
                                
                                <div style="display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--bg-tertiary);">
                                    <img src="${escapeHTML(course.instructor.avatar)}" alt="${escapeHTML(course.instructor.name)}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover;">
                                    <div>
                                        <h4 style="font-weight: 700;">المعلم الخبير: ${escapeHTML(course.instructor.name)}</h4>
                                        <p style="font-size: 0.85rem; color: var(--text-muted);">${escapeHTML(course.instructor.role)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resources Panel -->
                        <div class="tab-panel-content ${activeTab === 'resources' ? 'active' : ''}">
                            <ul class="resources-list">
                                ${!course.resources || course.resources.length === 0 ? `
                                    <li style="text-align:center; padding:2rem; color:var(--text-secondary); font-size:0.95rem;">لا تتوفر مذكرات أو ملفات PDF مرفقة للمادة حالياً.</li>
                                ` : course.resources.map(res => `
                                    <li class="resource-item">
                                        <div class="resource-details">
                                            <div class="resource-icon">
                                                <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                            </div>
                                            <div>
                                                <div class="resource-name-text">${escapeHTML(res.name)}</div>
                                                <span class="resource-size">${escapeHTML(res.size)}</span>
                                            </div>
                                        </div>
                                        <a href="${escapeHTML(res.link)}" class="download-res-btn" onclick="event.preventDefault(); alert('محاكاة تحميل المستند بنجاح!');">
                                            <span>تحميل المستند</span>
                                            <i class="fa-solid fa-download"></i>
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <!-- Interactive Quiz Panel -->
                        <div class="tab-panel-content ${activeTab === 'quiz' ? 'active' : ''}">
                            <div class="quiz-panel-wrapper">
                                ${renderQuiz()}
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
                                <div class="progress-bar-fill" style="width: ${completionPercentage}%;"></div>
                            </div>
                            <span class="curriculum-progress-text">${completionPercentage}% تم استذكاره</span>
                        </div>
                    </div>

                    <div class="lessons-list">
                        ${!course.chapters || course.chapters.length === 0 ? `
                            <p style="padding:2rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">لا تتوفر فصول للمادة</p>
                        ` : course.chapters.map((chapter, chIdx) => `
                            <div>
                                <div class="chapter-header">${escapeHTML(chapter.title)}</div>
                                <ul>
                                    ${!chapter.lessons || chapter.lessons.length === 0 ? `
                                        <li style="padding:0.75rem; text-align:center; color:var(--text-muted); font-size:0.8rem;">لا توجد دروس</li>
                                    ` : chapter.lessons.map(lesson => {
                                        const isCompleted = state.progress && state.progress.completedLessons && 
                                            state.progress.completedLessons[courseId] && 
                                            state.progress.completedLessons[courseId].includes(lesson.id);
                                        const isActive = activeLesson && activeLesson.id === lesson.id;
                                        return `
                                            <li class="lesson-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                                                <button class="lesson-item-btn" data-lesson-id="${lesson.id}">
                                                    <div class="lesson-checkbox">
                                                        <i class="fa-solid fa-check"></i>
                                                    </div>
                                                    <div class="lesson-item-details">
                                                        <span class="lesson-title-text">${escapeHTML(lesson.title)}</span>
                                                        <span class="lesson-dur-text">
                                                            <i class="fa-regular fa-circle-play" style="margin-left: 4px;"></i>حصة: ${escapeHTML(lesson.duration)}
                                                        </span>
                                                    </div>
                                                </button>
                                            </li>
                                        `;
                                    }).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </aside>
            </div>
        `;

        setupEventListeners();
    }

    function renderQuiz() {
        const quiz = course.quiz;
        if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            return `
                <div class="quiz-intro-card glass-panel" style="padding:3.5rem 2rem;">
                    <div class="quiz-intro-icon" style="color:var(--text-muted); background:rgba(255,255,255,0.05);"><i class="fa-solid fa-clipboard-question"></i></div>
                    <h3>الاختبار التقييمي غير متوفر</h3>
                    <p style="max-width: 500px; margin: 0 auto 1.5rem;">
                        المشرف لم يرفع أسئلة الكويز المنهجي لهذه المادة بعد. ترقب التحديثات قريباً!
                    </p>
                </div>
            `;
        }

        const isPassed = state.progress && state.progress.passedQuizzes && state.progress.passedQuizzes.includes(courseId);

        if (quizState === 'intro') {
            return `
                <div class="quiz-intro-card glass-panel">
                    <div class="quiz-intro-icon">
                        <i class="fa-solid fa-trophy-star"></i>
                    </div>
                    <h3>${escapeHTML(quiz.title)}</h3>
                    <p style="max-width: 500px; margin: 0 auto 2rem; line-height:1.7;">
                        هذا الاختبار مصمم لقياس فهمك واستيعابك للمفاهيم الأساسية التي تم شرحها في هذه المادة الدراسية. <br>
                        درجة الاجتياز المطلوبة هي <strong>${quiz.passingScore}%</strong> أو أعلى للحصول على وسام التفوق.
                    </p>
                    ${isPassed ? `
                        <div class="badge badge-success" style="margin-bottom: 2rem; padding: 0.6rem 1.25rem; font-size: 0.95rem; display:inline-flex; gap:0.5rem;">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>لقد اجتزت هذا الامتحان وتفوقت به سابقاً! 🏆</span>
                        </div>
                    ` : ''}
                    <div>
                        <button class="btn-primary" id="start-quiz-btn" style="padding:0.75rem 2rem;">
                            <span>ابدأ الامتحان الآن</span>
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        if (quizState === 'questions') {
            const question = quiz.questions[currentQuestionIndex];
            const selectedOption = selectedAnswers[currentQuestionIndex];
            
            return `
                <div class="quiz-question-container">
                    <div class="quiz-q-header">
                        <span>السؤال ${currentQuestionIndex + 1} من ${quiz.questions.length}</span>
                        <span>مطلب النجاح ${quiz.passingScore}%</span>
                    </div>
                    <h3 class="quiz-question-text">${escapeHTML(question.question)}</h3>
                    <div class="quiz-options-list">
                        ${question.options.map((option, idx) => `
                            <button class="quiz-option-btn ${selectedOption === idx ? 'selected' : ''}" data-option-idx="${idx}">
                                <span>${escapeHTML(option)}</span>
                                <div class="quiz-option-icon">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-footer">
                        <button class="btn-secondary" id="quiz-cancel-btn">إنهاء الامتحان</button>
                        <button class="btn-primary" id="quiz-next-btn" ${selectedOption === undefined ? 'disabled' : ''}>
                            <span>${currentQuestionIndex === quiz.questions.length - 1 ? 'تسليم الإجابات' : 'السؤال التالي'}</span>
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        if (quizState === 'results') {
            const passed = quizScore >= quiz.passingScore;
            return `
                <div class="quiz-result-card glass-panel">
                    <div class="result-badge ${passed ? 'passed' : 'failed'}">
                        <i class="fa-solid ${passed ? 'fa-award' : 'fa-circle-xmark'}"></i>
                    </div>
                    <div class="score-text">${quizScore}%</div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.75rem; font-weight:800;">
                        ${passed ? 'تهانينا الحارة، لقد تفوّقت!' : 'أعد المحاولة، لم تجتاز الامتحان اليوم'}
                    </h3>
                    <p class="result-msg">
                        ${passed 
                            ? 'لقد تمكنت من حل الأسئلة بنجاح وحصدت الدرجة المطلوبة للتفوق. استمر في طريق التميز الدراسي!' 
                            : `حصلت على نسبة تقل عن ${quiz.passingScore}%. نقترح عليك مراجعة شرح الحصص والملاحظات مجدداً والمحاولة مرة أخرى.`
                        }
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn-secondary" id="quiz-exit-results-btn">العودة للحصص</button>
                        <button class="btn-primary" id="quiz-retry-btn">
                            <span>${passed ? 'إعادة الامتحان للتحسين' : 'إعادة المحاولة مجدداً'}</span>
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Back to student dashboard
        container.querySelector('#classroom-back-btn')?.addEventListener('click', () => {
            cleanupSimulatedVideo();
            router.navigate('dashboard');
        });

        // Theme switch
        container.querySelector('#player-theme-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            appStore.setTheme(nextTheme);
            document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
        });

        // Click on Lesson item
        container.querySelectorAll('[data-lesson-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lessonId = btn.getAttribute('data-lesson-id');
                let foundLesson = null;
                for (const chapter of course.chapters || []) {
                    foundLesson = chapter.lessons.find(l => l.id === lessonId);
                    if (foundLesson) break;
                }
                if (foundLesson) {
                    cleanupSimulatedVideo();
                    activeLesson = foundLesson;
                    isPlaying = false;
                    videoProgress = 0;
                    render();
                }
            });
        });

        // Tab changes
        container.querySelectorAll('.player-tabs-bar .player-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.getAttribute('data-tab');
                render();
            });
        });

        // HTML5 Video simulated playback and listeners
        const videoElement = container.querySelector('#main-video-player');
        const playBtn = container.querySelector('#video-play-toggle');
        const centralPlay = container.querySelector('#central-play-overlay');
        const completeBtn = container.querySelector('#lesson-complete-action-btn');
        
        if (videoElement) {
            videoElement.addEventListener('play', () => {
                isPlaying = true;
                const toggle = container.querySelector('#video-play-toggle i');
                if (toggle) toggle.className = 'fa-solid fa-pause';
                container.querySelector('#video-wrapper')?.classList.remove('paused');
                container.querySelector('#central-play-overlay')?.style.setProperty('display', 'none');
                startSimulatedTimeline();
            });

            videoElement.addEventListener('pause', () => {
                isPlaying = false;
                const toggle = container.querySelector('#video-play-toggle i');
                if (toggle) toggle.className = 'fa-solid fa-play';
                container.querySelector('#video-wrapper')?.classList.add('paused');
                clearInterval(simulatedInterval);
            });

            videoElement.addEventListener('ended', async () => {
                isPlaying = false;
                videoProgress = 100;
                clearInterval(simulatedInterval);
                render();
                
                const isCompleted = state.progress && state.progress.completedLessons && 
                    state.progress.completedLessons[courseId] && 
                    state.progress.completedLessons[courseId].includes(activeLesson.id);

                if (!isCompleted) {
                    await storageService.markLessonComplete(courseId, activeLesson.id, activeLesson.title);
                }
            });

            const togglePlayHandler = () => {
                if (videoElement.paused) {
                    videoElement.play().catch(() => {
                        isPlaying = true;
                        startSimulatedTimeline();
                        render();
                    });
                } else {
                    videoElement.pause();
                }
            };

            if (playBtn) playBtn.addEventListener('click', togglePlayHandler);
            if (centralPlay) centralPlay.addEventListener('click', togglePlayHandler);
        }

        const timelineBg = container.querySelector('#video-timeline-bg');
        if (timelineBg && videoElement) {
            timelineBg.addEventListener('click', (e) => {
                const rect = timelineBg.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const clickPercentage = Math.min(Math.max((clickX / width) * 100, 0), 100);
                
                videoProgress = clickPercentage;
                if (videoElement.duration) {
                    videoElement.currentTime = (clickPercentage / 100) * videoElement.duration;
                }
                const timelineFill = container.querySelector('#video-timeline-fill');
                if (timelineFill) timelineFill.style.width = `${videoProgress}%`;
            });
        }

        function startSimulatedTimeline() {
            clearInterval(simulatedInterval);
            simulatedInterval = setInterval(async () => {
                if (videoElement && videoElement.duration) {
                    videoProgress = (videoElement.currentTime / videoElement.duration) * 100;
                    
                    const timeLabel = container.querySelector('#video-time-label');
                    if (timeLabel) {
                        const curTime = formatTime(videoElement.currentTime);
                        const durTime = formatTime(videoElement.duration);
                        timeLabel.textContent = `${curTime} / ${durTime}`;
                    }
                } else {
                    videoProgress += 2.5; // Simulate quick loading if video element failed or has zero duration
                    if (videoProgress >= 100) {
                        videoProgress = 100;
                        isPlaying = false;
                        clearInterval(simulatedInterval);
                        
                        const isCompleted = state.progress && state.progress.completedLessons && 
                            state.progress.completedLessons[courseId] && 
                            state.progress.completedLessons[courseId].includes(activeLesson.id);
                        
                        if (!isCompleted) {
                            await storageService.markLessonComplete(courseId, activeLesson.id, activeLesson.title);
                        }
                    }
                }
                
                const timelineFill = container.querySelector('#video-timeline-fill');
                if (timelineFill) timelineFill.style.width = `${videoProgress}%`;
            }, 1000);
        }

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        function cleanupSimulatedVideo() {
            clearInterval(simulatedInterval);
            if (videoElement) {
                try { videoElement.pause(); } catch (e) {}
            }
        }

        if (completeBtn) {
            completeBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                const isCompleted = state.progress && state.progress.completedLessons && 
                    state.progress.completedLessons[courseId] && 
                    state.progress.completedLessons[courseId].includes(activeLesson.id);
                if (isCompleted) {
                    await storageService.unmarkLessonComplete(courseId, activeLesson.id);
                } else {
                    await storageService.markLessonComplete(courseId, activeLesson.id, activeLesson.title);
                }
            });
        }

        // Quiz - Start Quiz
        container.querySelector('#start-quiz-btn')?.addEventListener('click', () => {
            quizState = 'questions';
            currentQuestionIndex = 0;
            selectedAnswers = {};
            render();
        });

        // Quiz - Option choices selection
        container.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const optIdx = parseInt(btn.getAttribute('data-option-idx'), 10);
                selectedAnswers[currentQuestionIndex] = optIdx;
                render();
            });
        });

        // Quiz - Next / Submit Answers
        container.querySelector('#quiz-next-btn')?.addEventListener('click', async () => {
            const quiz = course.quiz;
            if (currentQuestionIndex === quiz.questions.length - 1) {
                let correctCount = 0;
                quiz.questions.forEach((q, idx) => {
                    if (selectedAnswers[idx] === q.correctAnswer) {
                        correctCount++;
                    }
                });
                
                quizScore = Math.round((correctCount / quiz.questions.length) * 100);
                quizState = 'results';
                
                if (quizScore >= quiz.passingScore) {
                    await storageService.passQuiz(courseId, quiz.title, quizScore);
                    triggerConfettiFireworks();
                }
                render();
            } else {
                currentQuestionIndex++;
                render();
            }
        });

        // Quiz - Cancel Quiz
        container.querySelector('#quiz-cancel-btn')?.addEventListener('click', () => {
            quizState = 'intro';
            render();
        });

        // Quiz - Exit results tab
        container.querySelector('#quiz-exit-results-btn')?.addEventListener('click', () => {
            quizState = 'intro';
            render();
        });

        // Quiz - Retry Quiz
        container.querySelector('#quiz-retry-btn')?.addEventListener('click', () => {
            quizState = 'questions';
            currentQuestionIndex = 0;
            selectedAnswers = {};
            render();
        });
    }

    function triggerConfettiFireworks() {
        const confettiContainer = document.getElementById('confetti-canvas-container');
        if (!confettiContainer) return;

        confettiContainer.innerHTML = '';
        const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f43f5e', '#fbbf24', '#a855f7'];

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = `-20px`;
            
            const randomSize = Math.random() * 8 + 6;
            piece.style.width = `${randomSize}px`;
            piece.style.height = `${randomSize}px`;
            
            piece.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
            piece.style.animationDelay = `${Math.random() * 0.5}s`;
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            
            confettiContainer.appendChild(piece);
        }

        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }

    render();

    return () => {
        clearInterval(simulatedInterval);
        unsubscribe();
    };
}
export default initCoursePlayer;
