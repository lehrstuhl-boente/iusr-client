<template>
  <h1>My Profile</h1>
  <div v-if="!user">
    {{ error }}
  </div>
  <div v-else>
    <div>
      <strong>Username:</strong> {{ user.username }}
    </div>
    <div>
      <strong>Joined:</strong> {{ user.createdAt }}
    </div>
    <div class="card p-5 max-w-lg mt-4">
      <h2 class="m-0 mb-2">Change Password</h2>
      <form action="">
        <label>
          <span>Old Password</span>
          <input type="password" v-model="oldPassword">
        </label>
        <label>
          <span>New Password</span>
          <input type="password" v-model="newPassword">
        </label>
        <label>
          <span>Confirm New Password</span>
          <input type="password" v-model="confirmNewPassword">
        </label>
        <input type="submit" class="btn mt-3" @click.prevent="changePassword" value="Save Changes">
      </form>
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

const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

try {
  const response = await useApi().get<UserDto>('/users/me');
  user.value = response.data;
  user.value.createdAt = new Date(user.value.createdAt).toLocaleDateString();
} catch (e) {
  console.error(e);
  error.value = 'Could not fetch user.';
}

const changePassword = async () => {
  try {
    const response = await useApi().put('/users/password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value
    });
    useNotification('success', 'Password changed.');
    oldPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
  } catch (e: any) {
    if (e.response.data.statusCode === 400) { // error was thrown manually
      useNotification('danger', e.response.data.message[0]);
    } else {  // error was thrown by class-validator
      useNotification('danger', 'Could not change password.');
    }
  }
}
</script>

<style scoped></style>