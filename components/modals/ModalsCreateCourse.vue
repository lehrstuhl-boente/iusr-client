<template>
  <Modal :show="show" @close="$emit('close')" size="xl" title="Create Course">
    <form action="" class="flex flex-col">
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <input type="submit" value="Create" class="btn mt-2 md:self-end" @click.prevent="createCourse">
    </form>
  </Modal>
</template>

<script lang="ts" setup>
const { show } = defineProps({ show: { required: true, type: Boolean } });
const emit = defineEmits(['close', 'submit']);

const title = ref('');
const description = ref('');

const createCourse = async () => {
  if (!title.value) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    const response = await useApi().post('/courses', {
      title: title.value,
      description: description.value
    });
    useNotification('success', 'Course Created.');
    navigateTo('/admin/course/' + response.data.id);
  } catch (error: any) {
    useNotification('danger', 'Could not create course.');
  }
}
</script>