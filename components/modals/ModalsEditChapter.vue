<template>
  <Modal :show="show" @close="$emit('close')" size="xl" title="Edit Chapter">
    <form action="" class="flex flex-col">
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <div class="flex justify-between items-center mt-2">
        <a href="" @click.prevent="discardChanges">Discard</a>
        <input type="submit" value="Save" class="btn md:self-end" @click.prevent="editChapter">
      </div>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
const { show, chapter } = defineProps({
  show: { required: true, type: Boolean },
  chapter: { required: true, type: Object }
});
const emit = defineEmits(['close', 'submit']);

const title = ref(chapter.title);
const description = ref(chapter.description);

const editChapter = async () => {
  console.log(title.value, description.value);
  if (!title) {
    useNotification('warning', 'Title cannot be empty.');
    return;
  }
  try {
    await useApi().patch('/chapters/' + chapter.id, {
      title: title.value,
      description: description.value
    });
    useNotification('success', 'Chapter updated.');
    emit('submit');
    emit('close');
  } catch (error) {
    useNotification('danger', 'Could not edit chapter.');
  }
};

const discardChanges = async () => {
  title.value = chapter.title;
  description.value = chapter.description;
  emit('close');
};
</script>