<template>
  <Teleport to="#modals">
    <!-- moves this component at the end of the body tag but it can still be used inside other components or pages -->
    <Transition>
      <div class="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-40 overflow-auto z-10" v-if="show"
        @click.self="closeModal">
        <div class="container mx-auto px-4 py-10 h-full" @click.self="closeModal">
          <div
            :class="`flex flex-col bg-white max-w-${size} mx-auto rounded-md px-6 pt-5 pb-6 shadow-xl ${fullHeight ? 'h-full' : ''}`">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">{{ title }}</h3>
              <span class="material-icons-outlined hover:cursor-pointer hover:text-primary"
                @click="closeModal">close</span>
            </div>
            <div class="mt-4 h-full">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const { show, title, size } = defineProps({
  show: { required: true },
  title: { default: '' },
  size: { default: '3xl' },
  fullHeight: { default: false }
});
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
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
  transform: translateY(-20px);
}
</style>