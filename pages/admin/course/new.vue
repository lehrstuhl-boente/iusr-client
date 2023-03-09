<template>
  <SubHeader>
    <BackLink to="/dashboard">Back to Dashboard</BackLink>
  </SubHeader>
  <div class="max-w-xl">
    <h1>New Course</h1>
    <form action="">
      <label>
        <span>Course Title</span>
        <input type="text" placeholder="e.g. Python Basics" v-model="title">
      </label>
      <label>
        <span>Description</span>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </label>
      <input type="submit" value="Create" class="btn" @click.prevent="submit">
    </form>
    <div class="text-error">
      <div v-for="msg in errorMessages">{{ msg }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'admin'
  });

  const title = ref('');
  const description = ref('');
  const errorMessages = ref([]);

  const submit = async () => {
    try {
      const data = await $fetch('/courses', {
        method: 'POST',
        body: {
          title: title.value,
          description: description.value
        },
        ...useDefaultFetchParams()
      });
      navigateTo('/dashboard');
    } catch(e: any) {
      errorMessages.value = e.data.message
      console.error(e);
    }
  }
</script>

<style scoped>

</style>