<template>
  <Modal :show="show" @close="closeModal" size="lg">
    ADD CHAPTER MODAL
  </Modal>
</template>

<script setup>
const { show } = defineProps({ show: { required: true } });
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>