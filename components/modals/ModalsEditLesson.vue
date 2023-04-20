<template>
  <Modal :show="show" @close="$emit('close')" size="xl" title="Edit Lesson">
    <form action="" class="flex flex-col">
      <label>
        <span>Chapter</span>
        <select v-model="chapterId">
          <option v-if="course" v-for="chapter in course.chapters" :value="chapter.id">
            {{ chapter.title }}
          </option>
        </select>
      </label>
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <div class="flex items-center justify-between mt-2">
        <NuxtLink :to="`/admin/course/${$route.params.id}/lesson/${lesson.id}`"
          class="btn flex h-full items-center relative">
          <span class="material-icons-outlined absolute">code</span>
          <span class="pl-7 pr-1">Lesson Builder</span>
        </NuxtLink>
        <input type="submit" value="Update" class="btn h-full" @click.prevent="editLesson">
      </div>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
const { show, lesson } = defineProps({
  show: { required: true, type: Boolean },
  lesson: { required: true, type: Object }
});
const emit = defineEmits(['close']);

const courseStore = useCourseStore();

const { course } = storeToRefs(courseStore);
const title = ref(lesson.title);
const chapterId = ref(lesson.chapterId);

const editLesson = async () => {
  if (!title.value) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    await useApi().patch('/lessons/' + lesson.id, {
      title: title.value,
      chapterId: chapterId.value
    });
    await courseStore.update();
    useNotification('success', 'Course updated.');
    emit('close');
  } catch (error: any) {
    useNotification('danger', 'Could not update lesson.')
    console.error(error);
  }
}
</script>
