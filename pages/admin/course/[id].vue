<template>
  <Teleport to="#backbutton">
    <BackLink :to="'/course/' + route.params.id" />
  </Teleport>
  <div class="flex mt-5 mb-6">
    <h1>Edit Course</h1>
  </div>
  <div class="flex flex-row lg:flex-nowrap flex-wrap-reverse gap-10">
    <div class="lg:basis-8/12 w-full">
      <div class="flex justify-between items-center mb-5">
        <span class="muted">{{ course.chapters.length }} Chapters</span>
        <a class="btn inline-block right" @click="showChapterModal = true">Create Chapter</a>
      </div>
      <Chapter v-for="chapter in course.chapters" :chapter="chapter" :key="chapter.id" :editable="true"
        @update="getCourse" />
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
        <div class="flex justify-between items-center">
          <a href="#" class="text-danger hover:text-danger" @click="deleteCourse">Delete Course</a>
          <input type="submit" value="Update" class="btn" @click.prevent="updateCourse">
        </div>
      </form>
      <div class="text-danger mt-3">
        <div v-for="msg in errorMessages">{{ msg }}</div>
      </div>
    </div>
  </div>
  <ModalsCreateChapter :show="showChapterModal" :courseId="course.id" @close="showChapterModal = false"
    @submit="getCourse" />
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

const getCourse = async () => {
  try {
    const { data } = await useApi().get<CourseDto>('/courses/' + route.params.id);
    course.value = data;
  } catch (e) {
    console.error(e);
  }
}
await getCourse();  // data fetching for initial page load

const updateCourse = async () => {
  try {
    await useApi().patch('/courses/' + route.params.id, {
      title: course.value?.title,
      description: course.value?.description
    });
    useNotification('success', 'Course updated.');
  } catch (e: any) {
    errorMessages.value = e.response.data.message
    console.error(e);
    useNotification('danger', 'Course update failed.');
  }
}

const deleteCourse = async () => {
  if (confirm('Do you want to delete this course? This action cannot be undone.')) {
    try {
      const response = await useApi().delete('/courses/' + route.params.id);
      navigateTo('/dashboard');
      useNotification('success', 'Course Deleted.');
    } catch (e: any) {
      useNotification('danger', 'Deletion Failed.');
    }
  }
}
</script>