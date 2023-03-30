<template></template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'unauthenticated',
  layout: 'unauthenticated'
});

navigateTo('/login');
</script>

<style scoped></style>