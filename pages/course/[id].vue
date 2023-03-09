<template>
  <SubHeader>
    <BackLink to="/dashboard">Back to Dashboard</BackLink>
  </SubHeader>

  <div class="flex items-center justify-between mt-5 mb-6">
    <h1>{{ course?.title }}</h1>
    <NuxtLink :to="'/admin/course/'+route.params.id" v-if="authStore.isAdmin" class="btn">Edit Course</NuxtLink>
  </div>
  
  <div class="flex flex-row lg:flex-nowrap flex-wrap-reverse gap-5">
    <div class="bg-gray-200 lg:basis-8/12 w-full">
      XXXXX
    </div>
    <div class="bg-gray-300 lg:basis-4/12 w-full">
      <div>{{ course?.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CourseDto } from '~~/types';
  import { useAuthStore } from '~~/stores/auth.store';

  definePageMeta({
    middleware: 'authenticated'
  });

  const route = useRoute();
  const authStore = useAuthStore();

  const course = ref<CourseDto>();

  try {
    const { data } = await useApi().get<CourseDto>('/courses/' + route.params.id);
    course.value = data;
  } catch(e) {
    console.error(e);
  }
</script>