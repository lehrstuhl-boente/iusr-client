<template>
  <div>
    <header class="flex items-center text-white bg-slate-900 sticky top-0 z-10 p-4">
      <NuxtLink :to="'/admin/course/' + $route.params.courseId"
        class="flex justify-center hover:text-white hover:opacity-70 active:opacity-60">
        Quit
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>