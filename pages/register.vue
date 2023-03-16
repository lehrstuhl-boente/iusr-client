<template>
  <h1>Create a New Account</h1>
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
      <label>
        <span>Confirm Password</span>
        <input type="password" v-model="passwordRepeat">
      </label>
      <input type="submit" class="btn" @click.prevent="register" value="Register">
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
const passwordRepeat = ref('');
const errorMessages = ref([]);

const register = async () => {
  try {
    await authStore.register({
      email: email.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value
    });
  } catch (e: any) {
    errorMessages.value = e.response.data.message
  }
};
</script>

<style lang="postcss" scoped></style>