<template>
  <div>
    <form action="">
      <input type="text" placeholder="Username" v-model="username">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <br>
      <input type="submit" class="btn" @click.prevent="register" value="Register">
    </form>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
  const username = ref();
  const password = ref();

  const register = async () => {
    const { data: token } = await useFetch(config.baseURL + '/auth/register', {
      method: 'POST',
      body: {
        email: username.value,
        password: password.value
      }
    });
  };
</script>

<style lang="postcss" scoped>

</style>