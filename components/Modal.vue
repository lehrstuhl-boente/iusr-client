<template>
  <Teleport to="body">
    <!-- moves this component at the end of the body tag but it can still be used inside other components or pages -->
    <Transition>
      <div class="fixed left-0 right-0  top-0 bottom-0 bg-black bg-opacity-40 overflow-auto" v-if="show"
        @click.self="closeModal">
        <div class="container mx-auto px-4 py-10" @click.self="closeModal">
          <div :class="`bg-white max-w-${size} mx-auto rounded-md p-5 shadow-xl`">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">Add Chapter</h3>
              <span class="material-icons-outlined hover:cursor-pointer hover:text-primary"
                @click="closeModal">close</span>
            </div>
            <div class="mt-4">
              <slot />
            </div>
          </div>
        </div>
        <!-- programmatically generated tailwind classes like above get filtered out -> apply on hidden element to keep them -->
        <div class="hidden max-w-none max-w-xs max-w-sm max-w-md max-w-lg max-w-xl max-w-2xl max-w-3xl"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const { show, size } = defineProps({ show: { required: true }, size: { default: '3xl' } });
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
  margin-top: -20px;
}
</style>