<template>
  <Transition>
    <div class="fixed left-0 right-0  top-0 bottom-0 bg-black bg-opacity-40 overflow-auto" v-if="show" @click.self="closeModal">
      <div class="container mx-auto px-4 py-10" @click.self="closeModal">
        <div class="bg-white max-w-3xl mx-auto rounded-md p-5 shadow-xl">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">Add Chapter</h3>
            <span class="material-icons-outlined hover:cursor-pointer hover:text-primary" @click="closeModal">close</span>
          </div>
          <div class="mt-4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <button class="btn" @click="openModal">Trigger</button>
</template>

<script lang="ts" setup>
const isActive = ref(false);

const { show } = defineProps(['show']);

const closeModal = () => {
  show.value = false;
}
const openModal = () => {
  show.value = true;
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  margin-top: -20px;
}
</style>