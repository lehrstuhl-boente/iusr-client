<template>
  <MonacoEditor :lang="lesson.lang" :options="options" v-model="content" v-if="lesson" />
  <div v-else>Lesson store is empty.</div>
</template>

<script lang="ts" setup>
const lessonStore = useLessonStore();

const { lesson } = storeToRefs(lessonStore);
const content = ref('print("Hello World")');

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