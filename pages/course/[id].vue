<template>
  <Teleport to="#backbutton">
    <BackLink to="/dashboard" />
  </Teleport>
  <template v-if="course">
    <div class="flex items-center justify-between mt-5 mb-6">
      <h1>{{ course.title }}</h1>
      <NuxtLink :to="'/admin/course/' + route.params.id" v-if="authStore.isAdmin" class="btn">Edit Course</NuxtLink>
    </div>
    <div class="flex flex-row lg:flex-nowrap flex-wrap-reverse gap-10">
      <div class="lg:basis-8/12 w-full">
        <div v-if="course.chapters.length === 0">There are no chapters in this course.</div>
        <Chapter v-else v-for="chapter in course.chapters" :chapter="chapter" :key="chapter.id" />
      </div>
      <div class="lg:basis-4/12 w-full">
        <span class="muted">Description</span>
        <div v-if="course.description">{{ course.description }}</div>
        <div v-else>No description.</div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated'
});

const route = useRoute();
const authStore = useAuthStore();
const courseStore = useCourseStore();

const { course } = storeToRefs(courseStore);
await courseStore.getCourse(parseInt(route.params.id as string));   // populate store on page load
</script>