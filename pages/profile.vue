<template>
  <SubHeader>
    <BackLink to="/dashboard">Back to Dashboard</BackLink>
  </SubHeader>
  <h1>My Profile</h1>
  <div v-if="!user">
    {{ error }}
  </div>
  <div v-else>
    <div>
      <strong>Email:</strong> {{ user.email }}
    </div>
    <div>
      <strong>Joined:</strong> {{ user.createdAt }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { UserDto } from '~~/types';

  definePageMeta({
    middleware: 'authenticated'
  });

  const error = ref('');
  const user = ref();

  try {
    const response = await useApi().get<UserDto>('/users/me');
    user.value = response.data;
  } catch(e) {
    console.error(e);
    error.value = 'Could not fetch user.';
  }
</script>

<style scoped>

</style>