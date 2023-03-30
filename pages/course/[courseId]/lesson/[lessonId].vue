<template>
  LESSON
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated'
});

const route = useRoute();

console.log(route.params);
</script>