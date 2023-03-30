<template>
  <NuxtLink :to="`/course/${course.id}`"
    class="bg-white shadow hover:shadow-md rounded-md overflow-hidden hover:cursor-pointer">
    <div class="bg-gray-200" style="height: 100px;"></div>
    <div class="content p-3">
      <strong>{{ course.title }}</strong>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CourseDto } from '~~/types';

const { course } = defineProps<{ course: CourseDto }>();
</script>