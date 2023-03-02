<template>
  <h1>Dashboard</h1>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'authenticated',
    layout: 'authenticated'
  });
</script>

<style scoped>

</style>