interface LessonStoreState {
  lesson: Lesson | null;
}

interface Lesson {
  id: number;
  title: string;
  chapterId: number;
  lang: string;
}

export const useLessonStore = defineStore('lesson-store', {
  state: (): LessonStoreState => {
    return {
      lesson: null,
    };
  },
  actions: {
    // this method is used at the top level to populate the store for the first time
    async getLesson(id: number) {
      try {
        const { data } = await useApi().get<Lesson>('/lessons/' + id);
        this.lesson = data;
      } catch (e) {
        useNotification('danger', 'Could not fetch lesson.');
      }
    },
    // this method is used when the store is already populated but the same course data should be updated
    /* async update() {
      if (!this.lesson) {
        useNotification(
          'danger',
          'Cannot update lesson when no course is loaded.'
        );
        return;
      }
      await this.getCourse(this.lesson.id);
    }, */
  },
});
