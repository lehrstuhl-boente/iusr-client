<template>
  <Modal :show="show" @close="$emit('close')" size="xl" title="Create Chapter">
    <form action="" class="flex flex-col">
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <input type="submit" value="Create" class="btn mt-2 md:self-end" @click.prevent="createChapter">
    </form>
  </Modal>
</template>

<script lang="ts" setup>
const { show } = defineProps({ show: { required: true, type: Boolean } });
const emit = defineEmits(['close']);

const courseStore = useCourseStore();

const { course } = storeToRefs(courseStore);
const title = ref('');
const description = ref('');

const createChapter = async () => {
  if (!title.value) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    await useApi().post('/chapters', {
      title: title.value,
      description: description.value,
      courseId: course.value?.id
    });
    await courseStore.update();
    useNotification('success', 'Chapter created.');
    title.value = '';
    description.value = '';
    emit('close');
  } catch (error: any) {
    console.error(error);
    useNotification('danger', 'Could not create chapter.');
  }
};
</script>