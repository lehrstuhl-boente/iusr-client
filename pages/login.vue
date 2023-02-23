<template>
  {{ authStore.loggedIn }}
  <div>
    <form action="">
      <input type="text" placeholder="Email" v-model="email">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <br>
      <input type="submit" class="btn" @click.prevent="login" value="Login">
    </form>
    <span v-if="!loginSuccessful">Wrong Credentials.</span>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '../stores/auth.store';

  const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');
  let loginSuccessful = ref(true);

  const login = async () => {
    loginSuccessful.value = await authStore.login({ email: email.value, password: password.value });
  };
</script>

<style lang="postcss" scoped>

</style>