<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-center text-white bg-gray-900 sticky top-0 z-10 p-2">
      <button
        class="material-icons-outlined mr-1 p-2 hover:bg-white hover:bg-opacity-10 active:bg-opacity-5 hover:cursor-pointer rounded">menu</button>
      <button class="inline-flex ml-auto py-2 px-3 rounded hover:bg-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">save</span>Save
      </button>
    </header>
    <div class="flex h-full">
      <div class="w-1/3 h-full flex flex-col">
        <RichtextEditor />
      </div>
      <div class="w-1/3 h-full flex flex-col">
        <MonacoEditor lang="python" :options="monacoOptions" class="h-full" />
      </div>
      <div class="p-2 w-1/3 justify-self-end bg-black h-full text-white overflow-auto">Output</div>
    </div>
    <div class="flex justify-end mt-auto p-2 bg-gray-900 w-full text-white">
      <NuxtLink :to="'/admin/course/' + $route.params.courseId"
        class="inline-flex mr-auto py-2  px-3 rounded hover:bg-white hover:text-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">close</span>Close
      </NuxtLink>
      <button class="btn">Previous</button>
      <button class="btn ml-2">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'admin',
  layout: 'lesson'
});

const route = useRoute();
const courseStore = useCourseStore();

const monacoOptions = {
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

await courseStore.getCourse(parseInt(route.params.courseId as string));
</script>

<style></style>