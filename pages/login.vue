<template>
  <div class="bg-white p-8 pt-6 max-w-lg shadow rounded-lg mx-auto mt-10">
    <h2 class="mt-0 text-center mb-5">Login</h2>
    <form action="">
      <label>
        <span>Username</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="password">
      </label>
      <input type="submit" class="btn mt-3 w-full" @click.prevent="login" value="Login">
    </form>
    <div class="text-danger text-center">
      <div v-for="msg in errorMessages" class="first:mt-5">{{ msg }}</div>
    </div>
  </div>
  <div class="flex">
    <NuxtLink to="/register" class="mt-6 mx-auto">Go to Register</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'unauthenticated',
  layout: 'unauthenticated'
});

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessages = ref();

const login = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value });
  } catch (e: any) {
    useNotification('danger', 'Login failed.');
  }
};
</script>

<style lang="postcss" scoped></style>