<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-center text-white bg-gray-900 sticky top-0 z-10 p-4">
      <NuxtLink :to="'/admin/course/' + $route.params.courseId"
        class="flex justify-center hover:text-white hover:opacity-70 active:opacity-50">
        Quit
      </NuxtLink>
    </header>
    <div class="columns-3 gap-0 h-full">
      <div class="h-full">TipTap Editor</div>
      <div class="p-2 bg-gray-800 h-full">Monaco Editor</div>
      <div class="p-2 bg-black h-full text-white">Output</div>
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

await courseStore.getCourse(parseInt(route.params.courseId as string));
</script>