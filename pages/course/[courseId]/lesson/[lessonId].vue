<template>
  <Teleport to="body">
    <Sidebar :show="showSidebar" @close="showSidebar = false" />
  </Teleport>
  <div class="h-screen flex flex-col" v-if="course && lesson">
    <header class="flex items-center text-white bg-dark z-10 px-2" style="height: 60px;">
      <div class="w-1/3 flex items-center">
        <button class="material-icons-outlined mr-1 icon-btn icon-btn-light" @click="showSidebar = true">menu</button>
        <div class="flex items-center ml-2">
          <span class="material-icons-outlined mr-3 text-green-500" v-if="lesson.userData.completed">
            check_circle
          </span>
          <span class="material-icons-outlined mr-3 text-gray-300" v-else>
            radio_button_unchecked
          </span>
          <div>
            <div class="opacity-50 text-xs">Chapter {{ lesson.chapter.position }}: {{ lesson.chapter.title }}</div>
            <div class="text-sm">Lesson {{ lesson.position }}: {{ lesson.title }}</div>
          </div>
        </div>
      </div>
      <div class="w-1/3 text-center">
        {{ course.title }}
      </div>
      <div class="w-1/3 text-right">
        <button class="inline-flex ml-auto py-2 px-3 rounded hover:bg-white hover:bg-opacity-10 active:bg-opacity-5"
          @click="saveLesson" v-if="authStore.isAdmin">
          <span class="material-icons-outlined mr-1">save</span>Save
        </button>
      </div>
    </header>
    <div class="flex h-[calc(100%_-_120px)]">
      <div class="w-1/3 flex flex-col">
        <RichtextEditor v-model="lesson.task" :readonly="!authStore.isAdmin" />
      </div>
      <div class="w-1/3 h-full flex flex-col">
        <CodeEditor v-model="lesson.code" class="h-full" v-if="authStore.isAdmin" />
        <CodeEditor v-model="lesson.userData.code" class="h-full" v-if="!authStore.isAdmin" />
        <div class="p-2 mt-auto bg-dark flex items-center justify-end">
          <!-- <span class="material-icons-outlined text-white icon-btn icon-btn-light mr-auto">open_in_full</span> -->
          <button class="btn ml-1 mr-auto" @click="showSolutionModal = true">Solution</button>
          <LanguageSelect class="ml-3" v-if="authStore.isAdmin" />
          <span class="material-icons-outlined ml-2 text-white icon-btn icon-btn-light" @click="resetCode"
            v-if="!authStore.isAdmin">restart_alt</span>
          <button class="btn btn-primary ml-3" style="width: 70px" @click="submitCode">
            <span v-if="!submitButtonIdle">Run</span>
            <LoadingSpinner v-else />
          </button>
        </div>
      </div>
      <div class="p-2 w-1/3 justify-self-end bg-black text-white overflow-auto">
        <div class="mb-3" v-if="correctSolution !== null">
          <div v-if="correctSolution">Your solution is correct ✅</div>
          <div v-else>Your solution is not correct ❌</div>
        </div>
        <pre>Output</pre>
      </div>
    </div>
    <div class="flex justify-end items-center mt-auto p-2 bg-dark w-full text-white" style="height: 60px;">
      <button @click="closeLesson"
        class="inline-flex mr-auto py-2  px-3 rounded hover:bg-white hover:text-white hover:bg-opacity-10 active:bg-opacity-5">
        <span class="material-icons-outlined mr-1">close</span>Close
      </button>
      <button class="btn" @click="gotoPrevious" :disabled="lesson.previous === null">Previous</button>
      <button class="btn ml-2" @click="gotoNext" :disabled="lesson.next === null">Next</button>
    </div>
  </div>
  <div v-else>Could not load course or lesson.</div>
  <ModalsSolutionCode :show="showSolutionModal" @close="showSolutionModal = false" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated',
  layout: 'lesson'
});

const route = useRoute();
const courseStore = useCourseStore();
const lessonStore = useLessonStore();
const authStore = useAuthStore();

const { course } = storeToRefs(courseStore);
const { lesson } = storeToRefs(lessonStore);

const showSidebar = ref(false);
const submitButtonIdle = ref(false);
const showSolutionModal = ref(false);
const correctSolution = ref(null);

await courseStore.getCourse(parseInt(route.params.courseId as string));
await lessonStore.getLesson(parseInt(route.params.lessonId as string));

const closeLesson = () => {
  if (confirm('Do you want to close this lesson? All unsaved changes will be lost.')) {
    navigateTo(`${authStore.isAdmin ? '/admin' : ''}/course/${route.params.courseId}`);
  }
}

const saveLesson = async () => {
  await lessonStore.save();
}

const gotoPrevious = () => {
  if (lesson.value && lesson.value.previous !== null) {
    navigateTo(`/course/${route.params.courseId}/lesson/${lesson.value.previous}`);
  }
}

const gotoNext = () => {
  if (lesson.value && lesson.value.next !== null) {
    navigateTo(`/course/${route.params.courseId}/lesson/${lesson.value.next}`);
  }
}

const resetCode = () => {
  if (confirm("Do you really want to reset your code?")) {
    if (lesson.value) {
      lesson.value.userData.code = lesson.value.code;
    }
  }
}

const submitCode = async () => {
  if (lesson.value) {
    try {
      submitButtonIdle.value = true;
      const response = await useApi().post('/lessons/' + lesson.value.id, {
        code: authStore.isAdmin ? lesson.value.code : lesson.value.userData.code,
        lang: lesson.value.lang
      });
      correctSolution.value = response.data;
      if (response.data === true) {
        if (lesson.value.userData.completed !== true) { // correct solution for the first time
          useNotification('success', 'You have completed this lesson!');
        }
        lesson.value.userData.completed = true;
      }
    } catch (e) {
      useNotification('danger', 'Code Submission Failed');
      console.error(e);
    }
    submitButtonIdle.value = false;
  }
}
</script>

<style>
.ql-container {
  overflow: auto;
}
</style>