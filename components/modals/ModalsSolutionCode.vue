<template>
  <Modal :show="show" @close="$emit('close')" size="xl" :full-height="true" title="Solution Code">
    <CodeEditor v-model="lesson.solution" class="h-full" :read-only="!authStore.isAdmin" />
  </Modal>
</template>

<script setup>
const { show } = defineProps({
  show: { required: true, type: Boolean }
});
const emit = defineEmits(['close']);

const authStore = useAuthStore();
const lessonStore = useLessonStore();

const { lesson } = storeToRefs(lessonStore);
</script>