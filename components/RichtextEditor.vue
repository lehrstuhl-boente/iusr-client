<template>
  <div class="editor"></div>
</template>

<script setup>
import hljs from 'highlight.js';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';

const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  const options = {
    theme: 'snow',
    modules: {
      syntax: {
        highlight: text => hljs.highlightAuto(text).value
      },
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['blockquote'],
        ['code'],
        ['code-block'],
        ['clean']
      ]
    },
    placeholder: 'Lecture content here ...'
  };

  const quill = new Quill('.editor', options);

  // set initial text; TODO: despite on the first load, changes in the content cannot be passed down
  quill.pasteHTML(modelValue);

  quill.on('text-change', (delta, onDelta, source) => {
    emit('update:modelValue', quill.root.innerHTML);
  });
});
</script>

<style lang="postcss">
  .ql-snow .ql-editor code {
    @apply bg-gray-200;
  }
</style>