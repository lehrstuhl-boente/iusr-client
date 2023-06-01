<template>
  <Modal :show="show" @close="$emit('close')" size="xl" :full-height="true" title="Solution Code">
    <CodeEditor v-model="lesson.solution" class="h-full" />
  </Modal>
</template>

<script setup>
const { show } = defineProps({
  show: { required: true, type: Boolean }
});
const emit = defineEmits(['close']);

const lessonStore = useLessonStore();

const { lesson } = storeToRefs(lessonStore);
</script>