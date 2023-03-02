import { defineStore } from 'pinia';
import { UserDto, LoginDto, RegisterDto } from './dto'

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
      this.user = null;
      localStorage.removeItem('token');
      navigateTo('/');
    }
  },
  getters: {
    loggedIn: (state): boolean => state.user !== null
  },
  persist: true // save the store to cookies so that reinitialization after reload isn't necessary
})