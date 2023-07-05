<template>
  <div class="flex">
    <div class="bg-white w-full rounded-md mb-3 shadow">
      <h3 class="flex justify-between items-center font-bold text-lg px-4 py-3 hover:text-primary hover:cursor-pointer"
        @click="toggle">
        {{ chapter.title }}
        <span class="material-icons-outlined arrow relative z-0" :class="{ active: showDetails }">expand_more</span>
      </h3>
      <div v-show="showDetails" class="pt-0 pb-3 px-4">
        <div class="muted pre-formatted">{{ chapter.description }}</div>
        <div class="mt-3" v-if="editable">
          <span class="material-icons-outlined icon-btn icon-btn-danger danger" :class="{ active: showDetails }"
            @click="deleteChapter">delete</span>
          <span class="material-icons-outlined icon-btn icon-btn-primary ml-2" :class="{ active: showDetails }"
            @click="showChapterModal = true">edit</span>
          <span class="material-icons-outlined icon-btn icon-btn-primary ml-2" :class="{ active: showDetails }"
            @click="showLessonModal = true">add</span>
        </div>
        <TransitionGroup tag="div" class="relative" name="swap" v-if="chapter.lessons.length != 0">
          <LessonItem v-for="lesson in chapter.lessons" :lesson="lesson" :lessonCount="chapter.lessons.length"
            :key="lesson.id" :editable="editable" />
        </TransitionGroup>
      </div>
    </div>
    <div v-if="editable" class="flex flex-col ml-3">
      <span class="material-icons-outlined icon-btn icon-btn-primary p-0 hover:bg-inherit" @click="moveUp"
        v-if="chapter.position !== 1">arrow_upward</span>
      <span class="material-icons-outlined icon-btn icon-btn-primary p-0 hover:bg-inherit" @click="moveDown"
        v-if="chapter.position !== course?.chapters.length">arrow_downward</span>
    </div>
  </div>
  <ModalsEditChapter :show="showChapterModal" :chapter="chapter" @close="showChapterModal = false" />
  <ModalsCreateLesson :show="showLessonModal" :chapter="chapter" @close="showLessonModal = false" />
</template>

<script lang="ts" setup>
const { chapter, editable } = defineProps({ chapter: { required: true, type: Object }, editable: { type: Boolean, default: false } });

const courseStore = useCourseStore();
const { course } = storeToRefs(courseStore);

const showDetails = ref(false);
const showChapterModal = ref(false);
const showLessonModal = ref(false);

if (editable) {
  showDetails.value = true;
}

const toggle = () => {
  showDetails.value = !showDetails.value;
};

const deleteChapter = async () => {
  if (confirm('Do you want to delete this chapter? This action cannot be undone.')) {
    try {
      await useApi().delete('/chapters/' + chapter.id);
      await courseStore.update();   // re-fetch the course from the api to show the changes
      useNotification('success', 'Chapter deleted.');
    } catch (e) {
      console.error(e);
      useNotification('danger', 'Could not delete chapter.');
    }
  }
};

const moveUp = async () => {
  try {
    await useApi().patch('/chapters/' + chapter.id + '/up');
    courseStore.update();
  } catch (e) {
    useNotification('danger', 'Cannot move chapter up.');
  }
};

const moveDown = async () => {
  try {
    await useApi().patch('/chapters/' + chapter.id + '/down');
    courseStore.update();
  } catch (e) {
    useNotification('danger', 'Cannot move chapter down.');
  }
};
</script>

<style scoped>
.arrow {
  transition: all .3s ease;
}

.arrow.active {
  transform: rotate(180deg);
}

.swap-move {
  transition: all 0.3s ease;
}
</style>