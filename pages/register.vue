<template>
  <div>
    <form action="">
      <input type="text" placeholder="Username" v-model="email">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <br>
      <input type="password" placeholder="Repeat Password" v-model="passwordRepeat">
      <br>
      <input type="submit" class="btn" @click.prevent="register" value="Register">
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
  const passwordRepeat = ref('');
  const errorMessages = ref([]);

  const register = async () => {
    try {
      await authStore.register({
        email: email.value,
        password: password.value,
        passwordRepeat: passwordRepeat.value
      });
    } catch(e: any) {
      errorMessages.value = e.data.message
    }
  };
</script>

<style lang="postcss" scoped>

</style>