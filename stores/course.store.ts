import { defineStore } from 'pinia';

interface CourseStoreState {
  course: Course | null;
}

interface Course {
  id: number;
  title: string;
  description: string;
  chapters: Array<{
    id: number;
    title: string;
    description: string;
    lessons: Array<{
      id: number;
      title: string;
    }>;
  }>;
}

export const useCourseStore = defineStore('course-store', {
  state: (): CourseStoreState => {
    return {
      course: null,
    };
  },
  actions: {
    async getCourse(id: string) {
      try {
        const { data } = await useApi().get<Course>('/courses/' + id);
        this.course = data;
      } catch (e) {
        useNotification('danger', 'Could not fetch course.');
        console.error(e);
      }
    },
  },
});
