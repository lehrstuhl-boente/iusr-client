<template>
  <!-- possible values according to dropdown of example editor: https://microsoft.github.io/monaco-editor/ -->
  <select v-model="lesson.lang" v-if="lesson" class="bg-dark text-white m-0">
    <option value="python">Python</option>
    <option value="r">R</option>
    <option value="javascript">JavaScript</option>
    <option value="typescript">TypeScript</option>
  </select>
  <div v-else>Lesson store is empty.</div>
</template>

<script lang="ts" setup>
  const lessonStore = useLessonStore();

  const { lesson } = storeToRefs(lessonStore);

  // python is selected by default if no language specified
  if(lesson.value && !lesson.value.lang) {
    lesson.value.lang = 'python';
  }

  const selected = ref('python');
</script>