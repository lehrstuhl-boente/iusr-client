<template>
  <div class="bg-white p-8 pt-6 max-w-lg shadow rounded-lg mx-auto mt-10">
    <h2 class="mt-0 text-center mb-5">Register</h2>
    <form action="">
      <label>
        <span>Username</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="password">
      </label>
      <label>
        <span>Confirm Password</span>
        <input type="password" v-model="confirmPassword">
      </label>
      <input type="submit" class="btn mt-3 w-full" @click.prevent="register" value="Register">
    </form>
    <div class="text-danger text-center">
      <div v-for="msg in errorMessages" class="first:mt-5">{{ msg }}</div>
    </div>
  </div>
  <div class="flex">
    <NuxtLink to="/login" class="mt-6 mx-auto">Go to Login</NuxtLink>
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
const confirmPassword = ref('');
const errorMessages = ref();

const register = async () => {
  try {
    await authStore.register({
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });
  } catch (e: any) {
    errorMessages.value = Object.values(e.response.data).flat(1);
  }
};
</script>

<style lang="postcss" scoped></style>