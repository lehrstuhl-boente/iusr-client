<template>
  <h1>Login to Your Account</h1>
  <div class="max-w-lg">
    <form action="">
      <label>
        <span>Email</span>
        <input type="text" placeholder="john.doe@uzh.ch" v-model="email">
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="password">
      </label>
      <input type="submit" class="btn" @click.prevent="login" value="Login">
    </form>
    <div class="text-danger">
      <div v-for="msg in errorMessages">{{ msg }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth.store';

definePageMeta({
  middleware: 'unauthenticated',
  layout: 'unauthenticated'
});

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const errorMessages = ref([]);

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (e: any) {
    errorMessages.value = e.response.data.message;
  }
};
</script>

<style lang="postcss" scoped></style>