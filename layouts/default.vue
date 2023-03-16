<template>
  <div>
    <header class="flex items-center shadow-lg bg-white sticky top-0">
      <div id="backbutton" class="absolute ml-4"></div>
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <ul class="flex gap-4 items-center">
          <li>
            <NuxtLink to="/profile" class="flex">
              <span class="material-icons-outlined mr-1">account_circle</span>
              {{ authStore.user?.email }}
            </NuxtLink>
          </li>
          <li>
            <a @click.prevent="logout" class="flex">
              <span class="material-icons-outlined">logout</span>
            </a>
          </li>
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
};
</script>

<style>
/**/
</style>