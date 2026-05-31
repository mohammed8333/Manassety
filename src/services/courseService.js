import { localDBService as dbService } from './localDBService.js';
import appStore from '../store/appStore.js';
import { courses as initialCourses } from '../data/coursesData.js';
import { notificationService } from './notificationService.js';

export const courseService = {
    // Fetch all courses (syncing with Cloud Firestore if available)
    async loadCourses() {
        try {
            // Load courses from Firestore/Mock db
            const cloudCourses = await dbService.getCollection('courses');
            
            let combinedCourses = [...initialCourses];
            if (cloudCourses && cloudCourses.length > 0) {
                // Merge cloud courses, replacing matching IDs or appending new ones
                cloudCourses.forEach(c => {
                    const idx = combinedCourses.findIndex(x => x.id === c.id);
                    if (idx !== -1) {
                        combinedCourses[idx] = c;
                    } else {
                        combinedCourses.push(c);
                    }
                });
            } else {
                // If cloud db is empty, write initial courses to cloud db for future modifications
                for (const c of initialCourses) {
                    await dbService.setDoc('courses', c.id, c);
                }
            }

            appStore.setCourses(combinedCourses);
            return combinedCourses;
        } catch (error) {
            console.error("Error loading courses:", error);
            // Fallback to local data
            appStore.setCourses(initialCourses);
            return initialCourses;
        }
    },

    // Get a specific course
    getCourseById(courseId) {
        return appStore.getState().courses.find(c => c.id === courseId);
    },

    // Search and filter courses
    searchCourses(query, stage = 'all', category = 'all') {
        let list = appStore.getState().courses;
        
        // 1. Stage filter
        if (stage !== 'all') {
            list = list.filter(c => c.stage === stage);
        }
        
        // 2. Category filter
        if (category !== 'all') {
            list = list.filter(c => c.category === category);
        }

        // 3. Search query filter (checks title, description, instructor, chapter titles, lesson titles)
        if (query && query.trim() !== '') {
            const q = query.toLowerCase().trim();
            list = list.filter(c => {
                const matchTitle = c.title.toLowerCase().includes(q);
                const matchDesc = c.description.toLowerCase().includes(q);
                const matchInstructor = c.instructor.name.toLowerCase().includes(q);
                
                let matchChapters = false;
                if (c.chapters) {
                    matchChapters = c.chapters.some(ch => {
                        const chTitle = ch.title.toLowerCase().includes(q);
                        let lTitle = false;
                        if (ch.lessons) {
                            lTitle = ch.lessons.some(l => l.title.toLowerCase().includes(q));
                        }
                        return chTitle || lTitle;
                    });
                }
                
                return matchTitle || matchDesc || matchInstructor || matchChapters;
            });
        }

        return list;
    },

    // Admin: Add new course
    async addCourse(courseData) {
        try {
            const id = 'course-' + Math.random().toString(36).substr(2, 9);
            const newCourse = {
                id,
                rating: 5.0,
                reviewsCount: 1,
                chapters: [],
                resources: [],
                quiz: {
                    title: `اختبار تقييم مادة ${courseData.title}`,
                    passingScore: 70,
                    questions: []
                },
                ...courseData
            };

            // Save to Firestore
            await dbService.setDoc('courses', id, newCourse);
            
            // Reload courses list
            await this.loadCourses();

            notificationService.addNotification(
                'success',
                'مادة جديدة متوفرة!',
                `تم إضافة المادة التعليمية الجديدة: "${courseData.title}" بنجاح للطلاب 🎉`
            );

            return newCourse;
        } catch (error) {
            console.error("Error adding course:", error);
            throw new Error("فشل في إضافة المادة التعليمية الجديدة");
        }
    },

    // Admin: Update existing course
    async updateCourse(courseId, updatedFields) {
        try {
            const course = this.getCourseById(courseId);
            if (!course) throw new Error("المادة غير موجودة");

            const updatedCourse = { ...course, ...updatedFields };

            // Update in Firestore
            await dbService.setDoc('courses', courseId, updatedCourse);
            
            // Reload list
            await this.loadCourses();

            notificationService.addNotification(
                'info',
                'تحديث المنهج الدراسي',
                `تم تحديث محتويات وتفاصيل مادة "${updatedCourse.title}" بنجاح.`
            );

            return updatedCourse;
        } catch (error) {
            console.error("Error updating course:", error);
            throw new Error("فشل في تحديث المادة التعليمية");
        }
    },

    // Admin: Delete course
    async deleteCourse(courseId) {
        try {
            const course = this.getCourseById(courseId);
            if (!course) throw new Error("المادة غير موجودة");

            // Delete in Firestore
            await dbService.deleteDoc('courses', courseId);
            
            // Reload list
            await this.loadCourses();

            notificationService.addNotification(
                'warning',
                'حذف مادة تعليمية',
                `تم حذف المادة الدراسية "${course.title}" نهائياً من المنصة.`
            );

            return true;
        } catch (error) {
            console.error("Error deleting course:", error);
            throw new Error("فشل في حذف المادة التعليمية");
        }
    }
};

export default courseService;
