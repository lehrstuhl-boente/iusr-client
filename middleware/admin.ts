import { useAuthStore } from '../stores/auth.store';

// used for pages that should only be visible to admins --> non-admins are redirected to dashboard
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if(!authStore.loggedIn) {
    return navigateTo('/');
  }
  if(!authStore.user?.isAdmin) {
    return navigateTo('/dashboard');
  }
})