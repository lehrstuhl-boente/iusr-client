<template>
  <MonacoEditor lang="python" :options="options" v-model="content" />
</template>

<script lang="ts" setup>
const content = ref('print("Hello World")');

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
}
</script>