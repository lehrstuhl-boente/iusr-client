<template>
  <div v-if="chapter" class="first:mt-0 mt-4">
    <div class="muted mb-3">{{ chapter.title }}</div>
    <SidebarLesson v-for="lesson in chapter.lessons" :lesson="lesson" />
  </div>
</template>

<script lang="ts" setup>
const { chapter } = defineProps({ chapter: { required: true, type: Object } });
</script>