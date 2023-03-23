<template>
  <div class="flex">
    <div class="bg-white w-full rounded-md mb-3 shadow">
      <h3
        class="flex justify-between items-center font-bold text-lg px-4 py-3 hover:text-primary-hover hover:cursor-pointer"
        @click="toggle">
        {{ chapter.title }}
        <span class="material-icons-outlined arrow relative z-0" :class="{ active: showDetails }">expand_more</span>
      </h3>
      <div v-show="showDetails" class="pt-0 pb-3 px-4">
        <div class="muted">{{ chapter.description }}</div>
        <div class="mt-3" v-if="editable">
          <span class="material-icons-outlined icon-btn" :class="{ active: showDetails }"
            @click="deleteChapter">delete</span>
          <span class="material-icons-outlined icon-btn ml-2" :class="{ active: showDetails }"
            @click="showChapterModal = true">edit</span>
          <span class="material-icons-outlined icon-btn ml-2" :class="{ active: showDetails }"
            @click="showLessonModal = true">add</span>
        </div>
        <div class="flex flex-col" v-if="chapter.lessons.length != 0">
          <LessonItem v-for="lesson in chapter.lessons" :lesson="lesson" :key="lesson.id" :editable="editable" @update="$emit('update')" />
        </div>
      </div>
    </div>
    <div v-if="editable" class="flex flex-col ml-3">
      <span class="material-icons-outlined icon-btn">arrow_upward</span>
      <span class="material-icons-outlined icon-btn">arrow_downward</span>
    </div>
  </div>
  <ModalsEditChapter :show="showChapterModal" :chapter="chapter" @close="showChapterModal = false"
    @submit="$emit('update')" />
  <ModalsCreateLesson :show="showLessonModal" :chapter="chapter" @close="showLessonModal = false" />
</template>

<script setup>
const { chapter, editable } = defineProps({ chapter: { required: true }, editable: { type: Boolean, default: false } });
const emit = defineEmits(['update']);

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
      emit('update');
      useNotification('success', 'Chapter deleted.');
    } catch (e) {
      console.error(e);
      useNotification('danger', 'Could not delete chapter.');
    }
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
</style>