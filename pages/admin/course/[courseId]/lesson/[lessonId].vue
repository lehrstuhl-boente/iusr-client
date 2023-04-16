<template>
  <Teleport to="body">
    <Sidebar :show="showSidebar" @close="showSidebar = false" />
  </Teleport>
  <div class="h-screen flex flex-col" v-if="course && lesson">
    <header class="flex items-center text-white bg-dark sticky top-0 z-10 p-2">
      <button class="material-icons-outlined mr-1 icon-btn icon-btn-light" @click="showSidebar = true">menu</button>
      <div class="ml-2">
        <div class="opacity-50 text-xs">{{ course.title }}</div>
        <div class="text-sm">{{ lesson.title }}</div>
      </div>
      <button class="inline-flex ml-auto py-2 px-3 rounded hover:bg-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">save</span>Save
      </button>
    </header>
    <div class="flex h-full">
      <div class="w-1/3 h-full flex flex-col">
        <RichtextEditor />
      </div>
      <div class="w-1/3 h-full flex flex-col">
        <CodeEditor class="h-full" />
        <div class="p-2 mt-auto bg-dark flex items-center justify-end">
          <span class="material-icons-outlined text-white icon-btn icon-btn-light mr-auto">open_in_full</span>
          <LanguageSelect class="ml-3" />
          <span class="material-icons-outlined ml-2 text-white mr-3 icon-btn icon-btn-light">restart_alt</span>
          <button class="btn btn-primary">Run</button>
        </div>
      </div>
      <div class="p-2 w-1/3 justify-self-end bg-black h-full text-white overflow-auto">Output</div>
    </div>
    <div class="flex justify-end mt-auto p-2 bg-dark w-full text-white">
      <NuxtLink :to="'/admin/course/' + $route.params.courseId"
        class="inline-flex mr-auto py-2  px-3 rounded hover:bg-white hover:text-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">close</span>Close
      </NuxtLink>
      <button class="btn">Previous</button>
      <button class="btn ml-2">Next</button>
    </div>
  </div>
  <div v-else>Could not load course or lesson.</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'admin',
  layout: 'lesson'
});

const route = useRoute();
const courseStore = useCourseStore();
const lessonStore = useLessonStore();

const { course } = storeToRefs(courseStore);
const { lesson } = storeToRefs(lessonStore);

const showSidebar = ref(false);

await courseStore.getCourse(parseInt(route.params.courseId as string));
await lessonStore.getLesson(parseInt(route.params.lessonId as string));
</script>

<style></style>