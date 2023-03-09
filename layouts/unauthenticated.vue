<template>
  <div>
    <header class="shadow-lg bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/">IusR</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li><NuxtLink to="/register">Register</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style>
/**/
</style>