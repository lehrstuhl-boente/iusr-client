<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-center text-white bg-gray-900 sticky top-0 z-10 p-2">
      <NuxtLink :to="'/admin/course/' + $route.params.courseId"
        class="ml-auto inline-flex py-2 px-3 rounded hover:bg-white hover:text-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">close</span>Close
      </NuxtLink>
      <button class="inline-flex py-2 px-3 rounded hover:bg-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">save</span>Save
      </button>
    </header>
    <div class="flex h-full">
      <div class="w-1/3 h-full">
        <EditorLarge v-model="editorContent" />
      </div>
      <div class="w-1/3 p-2 bg-gray-800 h-full">Monaco Editor</div>
      <div class="w-1/3 p-2 bg-black h-full text-white">Output</div>
    </div>
    <div class="mt-auto bg-gray-900 w-full p-4 text-white">
      Footer
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

const editorContent = ref('');

await courseStore.getCourse(parseInt(route.params.courseId as string));
</script>