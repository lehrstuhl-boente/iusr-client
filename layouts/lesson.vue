<template>
  <div>
    <header class="flex items-center text-white bg-slate-900 sticky top-0 z-10 p-4">
      <NuxtLink to="/dashboard" class="flex justify-center">
        Quit
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>