<template>
  <div>
    <Transition name="fade">
      <div class="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-40 overflow-auto z-20" v-if="show"
        @click.self="closeModal">
      </div>
    </Transition>
    <Transition name="slide">
      <div class="absolute top-0 bg-white h-screen p-5 shadow-xl w-4/5 max-w-lg z-30" v-if="show">
        <div class="flex justify-between items-center mb-4">
          <h2 class="mt-0">Course Structure</h2>
          <span class="material-icons-outlined icon-btn" @click="closeModal">close</span>
        </div>
        <div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const { show } = defineProps({ show: { required: true } });
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
}
</script>

<style>
.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>