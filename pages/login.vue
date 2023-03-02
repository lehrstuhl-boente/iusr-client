<template>
  <div>
    <form action="">
      <input type="text" placeholder="Email" v-model="email">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <br>
      <input type="submit" class="btn" @click.prevent="login" value="Login">
    </form>
    <div class="text-error">
      <div v-for="msg in errorMessages">{{ msg }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '../stores/auth.store';

  const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');
  const errorMessages = ref([]);

  const login = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value });
    } catch(e: any) {
      errorMessages.value = e.data.message;
    }
  };
</script>

<style lang="postcss" scoped>

</style>