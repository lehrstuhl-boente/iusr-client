<template>
  <div class="bg-white rounded-md mb-3 shadow">
    <h3
      class="flex justify-between items-center font-bold text-lg px-4 py-3 hover:text-primary-hover hover:cursor-pointer"
      @click="toggle">
      {{ chapter.title }}
      <span class="material-icons-outlined arrow" :class="{ active: showDetails }">expand_more</span>
    </h3>
    <div v-show="showDetails" class="pt-0 pb-3 px-4">
      <div class="muted">{{ chapter.description }}</div>
      <div class="mt-3" v-if="editable">
        <span class="material-icons-outlined icon-btn" :class="{ active: showDetails }"
          @click="deleteChapter">delete</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// ['chapter', 'editable']
const { chapter, editable } = defineProps({ chapter: { required: true }, editable: { type: Boolean, default: false } });
const emit = defineEmits(['delete']);

const showDetails = ref(false);

const toggle = () => {
  showDetails.value = !showDetails.value;
};

const deleteChapter = async () => {
  if (confirm('Do you want to delete this chapter? This action cannot be undone.')) {
    try {
      await useApi().delete('/chapters/' + chapter.id);
      emit('delete');
      useNotification('warning', 'Chapter deleted.');
    } catch (e) {
      console.error(e);
      useNotification('alert', 'Could not delete chapter.');
    }
  }
};
</script>

<style scoped>
.arrow {
  transition: all .3s ease;
}

.arrow.active {
  transform: rotate(180deg);
}
</style>