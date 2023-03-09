import { defineStore } from 'pinia';
import { UserDto, LoginDto, RegisterDto } from '../dto'

interface AuthStoreState {
  user: UserDto | null;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStoreState => {
    return {
      user: null
    }
  },
  actions: {
    async login(credentials: LoginDto) {
      const data = await $fetch<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password
        },
        ...useDefaultFetchParams()
      });
      localStorage.setItem('token', data.accessToken);
      this.user = await $fetch<UserDto>('/users/me', useDefaultFetchParams());
      navigateTo('/dashboard');
    },
    async register(credentials: RegisterDto) {
      const data = await $fetch<{ accessToken: string }>('/auth/register', {
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
          passwordRepeat: credentials.passwordRepeat
        },
        ...useDefaultFetchParams()
      });
      localStorage.setItem('token', data.accessToken);
      this.user = await $fetch<UserDto>('/users/me', useDefaultFetchParams());
      navigateTo('/dashboard');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('auth-store');  // remove the persisted store from localStorage
      this.user = null;
      navigateTo('/');
    }
  },
  getters: {
    loggedIn: (state): boolean => state.user !== null
  },
  persist: {  // save the store in localStorage so that user doesn't need to login again after page reload
    storage: persistedState.localStorage
  }
})