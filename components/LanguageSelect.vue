<template>
  <!-- possible values according to dropdown of example editor: https://microsoft.github.io/monaco-editor/ -->
  <select v-model="lesson.lang" v-if="lesson" class="bg-dark text-white m-0 border-opacity-40 text-sm p-[7px]">
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
</script>