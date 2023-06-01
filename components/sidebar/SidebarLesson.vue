<template>
  <div v-if="lesson && currentLesson">
    <NuxtLink :to="`/course/${$route.params.courseId}/lesson/${lesson.id}`"
      class="flex items-center py-2 px-2 rounded-lg text-black hover:text-primary hover:bg-indigo-50 active:bg-indigo-100 active:text-primary-active"
      :class="{ active: lesson.id == currentLesson.id }">
      <template v-if="lesson.id != currentLesson.id">
        <span class="material-icons-outlined mr-3 text-green-500" v-if="lesson.userData && lesson.userData[0].completed">
          check_circle
        </span>
        <span class="material-icons-outlined mr-3 text-gray-300" v-else>
          radio_button_unchecked
        </span>
      </template>
      <!-- completed state of current lesson can change after code is submitted, therefore use value from lessonStore -->
      <template v-else>
        <span class="material-icons-outlined mr-3 text-green-500" v-if="currentLesson.userData.completed">
          check_circle
        </span>
        <span class="material-icons-outlined mr-3 text-gray-300" v-else>
          radio_button_unchecked
        </span>
      </template>
      {{ lesson.title }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { lesson } = defineProps({ lesson: { required: true, type: Object } });

const lessonStore = useLessonStore();
const { lesson: currentLesson } = storeToRefs(lessonStore);
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply bg-indigo-50 font-bold text-primary;
}
</style>