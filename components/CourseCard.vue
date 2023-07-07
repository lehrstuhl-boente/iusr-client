<template>
  <NuxtLink :to="`/course/${course.id}`"
    class="bg-white shadow hover:shadow-md active:shadow-sm rounded-md overflow-hidden hover:cursor-pointer">
    <div class="px-3 py-1 bg-primary/10 flex justify-between items-center">
      <span class="font-bold text-primary">{{ progress }}%</span>
      <span class="text-xs text-primary/50">
        {{ course.lessonsCompleted }}/{{ course.lessonsTotal }} Lessons Completed
      </span>
    </div>
    <div>
      <div class="bg-primary" style="height: 2px;" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="content p-3">
      <strong>{{ course.title }}</strong>
      <div class="muted leading-5 text-sm line-clamp-2">{{ course.description }}</div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CourseDto } from '~~/types';

const { course } = defineProps<{ course: CourseDto }>();

const progress = Math.round((course.lessonsCompleted / course.lessonsTotal) * 100) || 0;
</script>

<style scoped>
/*property doesn't currently work with tailwind out of the box --> remove this when it works*/
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>