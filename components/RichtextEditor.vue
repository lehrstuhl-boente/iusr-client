<template>
  <div class="editor"></div>
</template>

<script setup>
import hljs from 'highlight.js';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';

const { modelValue, readonly } = defineProps(['modelValue', 'readonly']);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  let toolbar = false;
  if (!readonly) {
    toolbar = [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote'],
      ['code'],
      ['code-block'],
      ['clean']
    ];
  }

  const options = {
    theme: 'snow',
    modules: {
      syntax: {
        highlight: text => hljs.highlightAuto(text).value
      },
      toolbar
    },
    placeholder: 'Lecture content here ...',
    readOnly: readonly,
  };

  const quill = new Quill('.editor', options);

  // set initial text; TODO: currently changes in the content cannot be passed down except on the first load
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