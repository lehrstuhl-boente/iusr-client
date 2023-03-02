import { useAuthStore } from '../stores/auth.store';

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore();
  if(!authStore.loggedIn) {
    return navigateTo('/');
  }
});