import { useAuthStore } from '../stores/auth.store';

// used for pages that should only be visible when unauthenticated (e.g. login, register) --> authenticated users are redirected to dashboard
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if(authStore.loggedIn) {
    return navigateTo('/dashboard');
  }
});