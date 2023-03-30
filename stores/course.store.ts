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
    // this method is used at the top level to populate the store for the first time
    async getCourse(id: number) {
      try {
        const { data } = await useApi().get<Course>('/courses/' + id);
        this.course = data;
      } catch (e) {
        useNotification('danger', 'Could not fetch course.');
      }
    },
    // this method is used when the store is already populated but the same course data should be updated
    async update() {
      if (!this.course) {
        useNotification(
          'danger',
          'Cannot update course when no course is loaded.'
        );
        return;
      }
      await this.getCourse(this.course.id);
    },
  },
});
