<template>
  <div class="bg-white rounded-md mb-3 shadow">
    <h3
      class="flex justify-between items-center font-bold text-lg px-4 py-3 hover:text-primary-hover hover:cursor-pointer"
      @click="toggle">
      {{ chapter.title }}
      <span class="material-icons-outlined" :class="{ active: showDetails }">expand_more</span>
    </h3>
    <div v-show="showDetails" class="pt-0 pb-3 px-4">
      <div class="muted">{{ chapter.description }}</div>
      <div>

      </div>
    </div>
  </div>
</template>

<script setup>
const { chapter } = defineProps(['chapter']);

const showDetails = ref(false);

const toggle = () => {
  showDetails.value = !showDetails.value;
};
</script>

<style scoped>
span {
  transition: all .3s ease;
}

span.active {
  transform: rotate(180deg);
}
</style>