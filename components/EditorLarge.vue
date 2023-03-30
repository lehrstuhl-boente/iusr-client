<template>
  <div>
    <div class="p-1 bg-slate-200">
      <button @click="editor.chain().focus().toggleBold().run()">Bold</button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const { modelValue } = defineProps({ modelValue: { type: String, default: '' } });
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  extensions: [StarterKit],
  content: modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  }
});
</script>