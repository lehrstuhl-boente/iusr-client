<template>
  LESSON
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