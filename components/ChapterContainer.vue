<template>
  <div class="flex justify-between items-center mb-5">
    <span class="muted">{{ chapters.length }} Chapters</span>
    <a class="btn inline-block right" @click="showChapterModal = true">Add Chapter</a>
  </div>
  <ChapterItem v-for="chapter in chapters" :chapter="chapter" />
</template>

<script setup>
const { chapters } = defineProps(['chapters']);
</script>