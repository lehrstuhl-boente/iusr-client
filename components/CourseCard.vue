<template>
  <NuxtLink :to="`/course/${course.id}`"
    class="bg-white shadow hover:shadow-md active:shadow-sm rounded-md overflow-hidden hover:cursor-pointer">
    <div class="px-3 py-1 bg-primary/10 flex justify-between items-center">
      <span class="font-bold text-primary">{{ progress }}%</span>
      <span class="text-xs muted">{{ course.lessonsCompleted }}/{{ course.lessonsTotal }} Lessons
        Completed</span>
    </div>
    <div>
      <div class="bg-primary" style="height: 2px;" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="content p-3">
      <strong>{{ course.title }}</strong>
      <p class="muted leading-5 line-clamp-2">
        {{ course.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CourseDto } from '~~/types';

const { course } = defineProps<{ course: CourseDto }>();

const progress = Math.round((course.lessonsCompleted / course.lessonsTotal) * 100);
</script>