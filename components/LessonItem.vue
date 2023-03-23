<template>
  <div class="flex items-center px-2 border-t first:border-t-0">
    <template v-if="!editable">
      <span class="material-icons-outlined mr-1 text-emerald-400">check_circle</span>
      <span class="material-icons-outlined mr-1 text-primary">lock_open</span>
      <span class="material-icons-outlined mr-1 text-danger">lock</span>
    </template>
    <div v-else class="mr-1 text-primary" style="min-width: 25px;">Lesson 1</div>
    <div class="p-2"><strong>{{ lesson.title }}</strong></div>
    <div v-if="editable" class="ml-auto">
      <span class="material-icons-outlined icon-btn" @click="deleteLesson">delete</span>
      <span class="material-icons-outlined icon-btn ml-1" @click="showLessonModal = true">edit</span>
      <span class="material-icons-outlined icon-btn ml-1">arrow_upward</span>
      <span class="material-icons-outlined icon-btn">arrow_downward</span>
    </div>
    <div v-else class="ml-auto">
      <NuxtLink :to="'/lesson/' + lesson.id" class="inline-flex items-center">
        Open <span class="material-icons-outlined">play_arrow</span>
      </NuxtLink>
    </div>
  </div>
  <ModalsEditLesson :show="showLessonModal" :lesson="lesson" @close="showLessonModal = false">
    asdfasdf
  </ModalsEditLesson>
</template>

<script setup>
import { useCourseStore } from '~~/stores/course.store';

const { lesson, editable } = defineProps({ lesson: { required: true }, editable: { type: Boolean } });

const courseStore = useCourseStore();

const showLessonModal = ref(false);

const deleteLesson = async () => {
  if (confirm('Do you want to delete this lesson? This action cannot be undone.')) {
    try {
      await useApi().delete('/lessons/' + lesson.id);
      await courseStore.update();
      useNotification('success', 'Lesson deleted.');
    } catch (e) {
      console.error(e);
      useNotification('danger', 'Could not delete chapter.');
    }
  }
};
</script>