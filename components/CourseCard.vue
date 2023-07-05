<template>
  <NuxtLink :to="`/course/${course.id}`"
    class="bg-white shadow hover:shadow-md rounded-md overflow-hidden hover:cursor-pointer">
    <div class="px-3 py-1 bg-gray-200 flex justify-between items-center">
      <span class="font-bold">{{ progress }}%</span>
      <span class="text-xs">{{ course.lessonsCompleted }}/{{ course.lessonsTotal }} Lessons Completed</span>
    </div>
    <div>
      <div class="bg-primary" style="height: 2px;" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="content p-3">
      <strong>{{ course.title }}</strong>
      <div class="muted mt-1 text-ellipsis leading-5 overflow-hidden whitespace-nowrap">
        {{ course.description }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CourseDto } from '~~/types';

const { course } = defineProps<{ course: CourseDto }>();

const progress = Math.round((course.lessonsCompleted / course.lessonsTotal) * 100);
</script>