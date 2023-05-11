<template>
  <MonacoEditor :lang="lesson.lang" :options="options" v-model="value" v-if="lesson" />
  <div v-else>Lesson store is empty.</div>
</template>

<script lang="ts" setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const lessonStore = useLessonStore();
const { lesson } = storeToRefs(lessonStore);

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});

const options = {
  theme: 'vs-dark',
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  padding: {
    top: 10,
    bottom: 10,
  },
  fontSize: 14,
  automaticLayout: true
};
</script>