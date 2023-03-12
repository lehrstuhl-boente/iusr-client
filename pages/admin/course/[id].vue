<template>
  <SubHeader>
    <BackLink :to="'/course/' + route.params.id">Back to Course</BackLink>
  </SubHeader>
  <div class="flex">
    <h1>Edit Course</h1>
  </div>
  <div class="flex flex-row lg:flex-nowrap flex-wrap-reverse gap-5">
    <div class="lg:basis-8/12 w-full">
      <a class="btn inline-block" @click="showChapterModal = true">Add Chapter</a>
    </div>
    <div class="lg:basis-4/12 w-full">
      <form action="">
        <label>
          <span>Course Title</span>
          <input type="text" placeholder="e.g. Python Basics" v-model="course.title">
        </label>
        <label>
          <span>Description</span>
          <textarea cols="30" rows="10" v-model="course.description"></textarea>
        </label>
        <div class="flex justify-between">
          <input type="submit" value="Update" class="btn" @click.prevent="submit">
          <a href="#" class="btn btn-alert" @click="deleteCourse">Delete Course</a>
        </div>
      </form>
      <div class="text-alert mt-3">
        <div v-for="msg in errorMessages">{{ msg }}</div>
      </div>
    </div>
  </div>
  <ModalsAddChapter :show="showChapterModal" @close="showChapterModal = false" />
</template>

<script lang="ts" setup>
import { CourseDto } from '~~/types';

definePageMeta({
  middleware: 'admin'
});

const route = useRoute();

const course = ref();
const errorMessages = ref([]);
const showChapterModal = ref(false);

try {
  const { data } = await useApi().get<CourseDto>('/courses/' + route.params.id);
  course.value = data;
} catch (e) {
  console.error(e);
}

const submit = async () => {
  try {
    await useApi().patch('/courses/' + route.params.id, {
      title: course.value?.title,
      description: course.value?.description
    });
    navigateTo('/course/' + route.params.id);
    useNotification('success', 'Course Updated.');
  } catch (e: any) {
    errorMessages.value = e.response.data.message
    console.error(e);
    useNotification('alert', 'Course Update Failed.');
  }
}

const deleteCourse = async () => {
  if (confirm('Do you want to delete this course? This action cannot be undone.')) {
    try {
      const response = await useApi().delete('/courses/' + route.params.id);
      navigateTo('/dashboard');
      useNotification('warning', 'Course Deleted.');
    } catch (e: any) {
      useNotification('alert', 'Deletion Failed.');
    }
  }
}
</script>