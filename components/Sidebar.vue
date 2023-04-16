<template>
  <div v-if="course">
    <Transition name="fade"> <!-- black overlay background fades in/out -->
      <div class="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-40 overflow-auto z-20" v-if="show"
        @click.self="closeModal">
      </div>
    </Transition>
    <Transition name="slide"> <!-- sidebar slides in/out from the side -->
      <div class="absolute top-0 bg-white h-screen shadow-xl w-5/6 max-w-md z-30 overflow-y-auto" v-if="show">
        <div class="flex justify-between items-center sticky top-0 p-4 pb-3 bg-white">
          <h2 class="my-0 mb-2">Course Structure</h2>
          <span class="material-icons-outlined icon-btn icon-btn-primary" @click="closeModal">close</span>
        </div>
        <div class="p-4">
          <SidebarChapter v-for="chapter in course.chapters" :chapter="chapter" />
        </div>
      </div>
    </Transition>
  </div>
  <div v-else>Could not load course.</div>
</template>

<script lang="ts" setup>
import SidebarChapter from './sidebar/SidebarChapter.vue';

const { show } = defineProps({ show: { required: true } });
const emit = defineEmits(['close']);

const courseStore = useCourseStore();

const { course } = storeToRefs(courseStore);


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