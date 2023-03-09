<template>
  <div class="flex items-center justify-between mt-5 mb-6">
    <h1>My Courses</h1>
    <NuxtLink to="/admin/course/new" class="btn" v-if="authStore.isAdmin">New Course</NuxtLink>
  </div>
  <div v-if="!courses">
    There are no courses.
  </div>
  <div v-else class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
    <CourseCard v-for="course in courses" :course="course"></CourseCard>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '~~/stores/auth.store';

  definePageMeta({
    middleware: 'authenticated'
  });

  const authStore = useAuthStore();

  const courses = ref();

  try {
    const response = await useApi().get('/courses');
    courses.value = response.data;
  } catch(e) {
    console.error(e);
  }
</script>

<style scoped>

</style>