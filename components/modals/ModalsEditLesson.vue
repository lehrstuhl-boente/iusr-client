<template>
  <Modal :show="show" @close="$emit('close')" size="xl" title="Edit Lesson">
    <form action="" class="flex flex-col">
      <label>
        <span>Chapter</span>
        <select disabled>
          <option>{{ lesson.title }}</option>
        </select>
      </label>
      <label>
        <span>Title</span>
        <input type="text" placeholder="e.g. Introduction" v-model="title" v-focus>
      </label>
      <div class="flex items-center justify-between mt-2">
        <NuxtLink :to="'/admin/lesson/' + lesson.id" class="btn flex h-full items-center relative">
          <span class="material-icons-outlined absolute">code</span>
          <span class="pl-7 pr-1">Lesson Builder</span>
        </NuxtLink>
        <input type="submit" value="Update" class="btn h-full" @click.prevent="editLesson">
      </div>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
const { show, lesson } = defineProps({
  show: { required: true, type: Boolean },
  lesson: { required: true, type: Object }
});
const emit = defineEmits(['close', 'submit']);

const title = ref(lesson.title);

//const chapters = await useApi().get('/courses/' +  + '/chapters')

const editLesson = () => {
  console.log('asdf');
}
</script>
