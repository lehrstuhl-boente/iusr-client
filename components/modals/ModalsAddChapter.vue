<template>
  <Modal :show="show" @close="closeModal" size="xl" title="Add Chapter">
    <form action="" class="flex flex-col">
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <input type="submit" value="Add" class="btn mt-2 md:self-end" @click.prevent="submit">
    </form>
  </Modal>
</template>

<script setup>
const { show } = defineProps({ show: { required: true } });
const emit = defineEmits(['close']);

const title = ref('');
const description = ref('');

const closeModal = () => {
  emit('close');
};

const submit = () => {
  console.log('asdf');
};
</script>