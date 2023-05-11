interface LessonStoreState {
  lesson: Lesson | null;
}

interface Lesson {
  id: number;
  title: string;
  chapterId: number;
  lang: string;
  task: string;
  code: string;
  userData: UserLesson; // data specific to the logged in user
}

interface UserLesson {
  id: number;
  code: string;
  completed: boolean;
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
        const { data } = await useApi().get<any>('/lessons/' + id);
        // userdata comes back as array but always only has one element since every user has only one UserLesson per Lesson
        data.userData = data.userData[0];
        this.lesson = data;
      } catch (e) {
        useNotification('danger', 'Could not fetch lesson.');
      }
    },
    async save() {
      if (!this.lesson) {
        useNotification('danger', 'Cannot save without loaded lesson.');
        return;
      }
      try {
        await useApi().patch('/lessons/' + this.lesson.id, this.lesson);
        useNotification('success', 'Lesson saved.');
      } catch (e) {
        useNotification('danger', 'Could not save lesson.');
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
