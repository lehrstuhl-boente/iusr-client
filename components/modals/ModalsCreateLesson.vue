<template>
  <Modal :show="show" @close="close" size="xl" title="Create Lesson">
    <form action="" class="flex flex-col">
      <label>
        <span>Chapter</span>
        <select disabled>
          <option>{{ chapter.title }}</option>
        </select>
      </label>
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <input type="submit" value="Create" class="btn mt-2 md:self-end" @click.prevent="createChapter">
    </form>
  </Modal>
</template>

<script setup>
const { show, chapter } = defineProps({
  show: { required: true, type: Boolean },
  chapter: { required: false }
});
const emit = defineEmits(['close']);

const courseStore = useCourseStore();

const title = ref('');

const close = () => {
  title.value = '';
  emit('close');
};

const createChapter = async () => {
  if (!title.value) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    await useApi().post('/lessons', {
      title: title.value,
      chapterId: chapter.id
    });
    courseStore.update();
    useNotification('success', 'Lesson created.');
    close();
  } catch (e) {
    useNotification('danger', 'Could not create lesson.');
    console.error(e);
  }
};
</script>