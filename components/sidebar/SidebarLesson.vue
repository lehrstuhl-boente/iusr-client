<template>
  <div v-if="lesson">
    <NuxtLink :to="`/course/${$route.params.courseId}/lesson/${lesson.id}`"
      class="block py-2 px-3 rounded-lg text-black hover:text-primary hover:bg-indigo-50 active:bg-indigo-100 active:text-primary-active"
      :class="{ active: lesson.id == $route.params.lessonId }">
      {{ lesson.title }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { lesson } = defineProps({ lesson: { required: true, type: Object } });

const authStore = useAuthStore();
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply bg-indigo-50 font-bold text-primary;
}
</style>