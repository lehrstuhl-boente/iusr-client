<template>
  <div class="flex items-center justify-between mt-5 mb-6">
    <h1>My Courses</h1>
    <a class="btn inline-block right" @click="showCourseModal = true" v-if="authStore.isAdmin">Create Course</a>
  </div>
  <div v-if="!courses">
    There are no courses.
  </div>
  <div v-else class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
    <CourseCard v-for="course in courses" :course="course"></CourseCard>
  </div>
  <ModalsCreateCourse :show="showCourseModal" @close="showCourseModal = false" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated'
});

const authStore = useAuthStore();

const courses = ref();
const showCourseModal = ref(false);

try {
  const response = await useApi().get('/courses');
  courses.value = response.data;
} catch (e) {
  console.error(e);
}
</script>

<style scoped></style>