// used for pages that should only be visible when logged in --> unauthenticated users are redirected to main page
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.loggedIn) {
    return navigateTo('/');
  }
});
