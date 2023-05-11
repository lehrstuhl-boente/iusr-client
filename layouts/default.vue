<template>
  <div>
    <header class="flex items-center shadow-lg bg-white sticky top-0 z-10">
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

<script lang="ts" setup>
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>