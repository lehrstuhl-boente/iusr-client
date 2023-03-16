<template>
  <Modal :show="show" @close="closeModal" size="xl" title="Create Chapter">
    <form action="" class="flex flex-col">
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <input type="submit" value="Add" class="btn mt-2 md:self-end" @click.prevent="createChapter">
    </form>
  </Modal>
</template>

<script setup>
const { show, courseId } = defineProps({ show: { required: true, type: Boolean }, courseId: { required: true, type: Number } });
const emit = defineEmits(['close', 'submit']);

const title = ref('');
const description = ref('');

const closeModal = () => {
  emit('close');
};

const createChapter = async () => {
  if (!title) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    await useApi().post('/chapters', {
      title: title.value,
      description: description.value,
      courseId
    });
    useNotification('success', 'Chapter created.');
    title.value = '';
    description.value = '';
    emit('submit');
    emit('close');
  } catch (error) {
    useNotification('alert', 'Could not create chapter.');
  }
};
</script>