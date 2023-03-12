import { defineStore } from 'pinia';
import { useNotificationStore } from './notification.store';

interface AuthStoreState {
  user: User | null;
}

export interface User {
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface LoginUserDto {
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStoreState => {
    return {
      user: null,
    };
  },
  actions: {
    async login(credentials: Login) {
      const { data } = await useApi().post<LoginUserDto>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      localStorage.setItem('token', data.accessToken);
      this.user = data;
      navigateTo('/dashboard');
    },
    async register(credentials: Register) {
      const { data } = await useApi().post<LoginUserDto>('/auth/register', {
        email: credentials.email,
        password: credentials.password,
        passwordRepeat: credentials.passwordRepeat,
      });
      localStorage.setItem('token', data.accessToken);
      this.user = data;
      navigateTo('/dashboard');
    },
    logout() {
      const notificationStore = useNotificationStore();
      notificationStore.notification = null; // remove the notification from the store such that they don't reappear when logging in again
      localStorage.removeItem('token');
      localStorage.removeItem('auth-store'); // remove the persisted store from localStorage
      this.user = null;
      navigateTo('/');
    },
  },
  getters: {
    loggedIn: (state): boolean => state.user !== null,
    isAdmin: (state): boolean => {
      if (state.user) {
        return state.user.isAdmin;
      }
      return false;
    },
  },
  persist: {
    // save the store in localStorage so that user doesn't need to login again after page reload
    storage: persistedState.localStorage,
  },
});
