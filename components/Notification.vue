<template>
  <div :key="notificationStore.notification?.id"
    :class="`bg-${color}-100 border-${color}-300 text-${color}-800 notification`"
    class="notification border border-solid fixed left-1/2 -translate-x-1/2 py-2 px-4 top-3 rounded shadow-lg pointer-events-none max-lg z-30"
    v-if="notificationStore.notification">
    {{ notificationStore.notification?.content }}
  </div>
</template>

<script lang="ts" setup>
// Possible Types: danger, warning, success; if another string is set, it defaults to success

const notificationStore = useNotificationStore();

const color = ref('');

const updateNotificationColor = (state: any) => {
  switch (state.notification?.type) {
    case 'danger':
      color.value = 'red';
      break;
    case 'warning':
      color.value = 'amber';  // yellow
      break;
    default:
    case 'success':
      color.value = 'emerald';  // green
      break;
  }
}

// set notification color the first time the component is mounted
updateNotificationColor(notificationStore);
// subscribe to changes in the store such that the colors can always be adjusted
notificationStore.$subscribe((mutations, state) => {
  updateNotificationColor(state);
})
</script>

<style scoped>
@keyframes fadeInOut {
  0% {
    margin-top: -10px;
    opacity: 0;
  }

  7% {
    margin-top: 0;
    opacity: 1;
  }
}

.notification {
  animation-name: fadeInOut;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-iteration-count: 2;
  /* keep final state */
  animation-fill-mode: forwards;
}
</style>