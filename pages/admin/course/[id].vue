<template>
  <Teleport to="#backbutton">
    <BackLink :to="'/course/' + route.params.id" />
  </Teleport>
  <template v-if="course">
    <div class="flex mt-5 mb-6">
      <h1>Edit Course</h1>
    </div>
    <div class="flex flex-row lg:flex-nowrap flex-wrap-reverse gap-10">
      <div class="lg:basis-8/12 w-full">
        <div class="flex justify-between items-center mb-5">
          <span class="muted">{{ course.chapters.length }} Chapters</span>
          <a class="btn inline-block right" @click="showChapterModal = true">Create Chapter</a>
        </div>
        <Chapter v-for="chapter in course.chapters" :chapter="chapter" :key="chapter.id" :editable="true" />
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
  </template>
  <ModalsCreateChapter :show="showChapterModal" @close="showChapterModal = false" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '~~/stores/course.store';

definePageMeta({
  middleware: 'admin'
});

const route = useRoute();
const courseStore = useCourseStore();

const { course } = storeToRefs(courseStore);
const errorMessages = ref([]);
const showChapterModal = ref(false);

await courseStore.getCourse(parseInt(route.params.id as string));   // populate store on page load

const updateCourse = async () => {
  if (!course.value) {
    useNotification('danger', 'Course store is empty.');
    return;
  }
  try {
    await useApi().patch('/courses/' + route.params.id, {
      title: course.value.title,
      description: course.value.description
    });
    useNotification('success', 'Course updated.');
  } catch (e: any) {
    console.error(e);
    errorMessages.value = e.response.data.message
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
