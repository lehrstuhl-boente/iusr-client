<template>
  <MonacoEditor :lang="lesson.lang" :options="options" v-model="content" v-if="lesson" />
  <div v-else>Lesson store is empty.</div>
</template>

<script lang="ts" setup>
const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const lessonStore = useLessonStore();

const { lesson } = storeToRefs(lessonStore);
const content = ref(modelValue);

watch(content, () => {
  emit('update:modelValue', content);
});

const options = {
  theme: 'vs-dark',
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  padding: {
    top: 10,
    bottom: 10,
  },
  fontSize: 14,
  automaticLayout: true
}
</script>