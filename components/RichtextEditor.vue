<template>
  <div class="editor">{{ content }}</div>
</template>

<script setup>
import hljs from 'highlight.js';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';

const content = ref('Test');

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
        ['code-block'],
        ['clean']
      ]
    },
    placeholder: 'Lecture content here ...'
  };

  var quill = new Quill('.editor', options);

  quill.on('text-change', (delta, onDelta, source) => {
    console.log(quill.getText());
  });
});
</script>