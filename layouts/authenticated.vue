<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/dashboard">IusR</NuxtLink>
        <ul class="flex gap-4">
          <li><a @click.prevent="logout">Logout</a></li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '../stores/auth.store';

  const authStore = useAuthStore();

  const logout = () => {
    authStore.logout();
  }
</script>

<style>
/**/
</style>