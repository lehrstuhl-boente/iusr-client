import { defineStore } from 'pinia';

interface User {
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  passwordRepeat: string;
}

interface AuthStoreState {
  user: User | null;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStoreState => {
    return {
      user: null
    }
  },
  actions: {
    async login(credentials: LoginData): Promise<boolean> {
      try {
        const data = await $fetch<{ accessToken: string }>('/auth/login', {
          method: 'POST',
          body: {
            email: credentials.email,
            password: credentials.password
          },
          ...useDefaultFetchParams()
        });
        localStorage.setItem('token', data.accessToken);
        this.user = await $fetch<User>('/users/me', useDefaultFetchParams());
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      } catch(e) {
        return false;
      }
    },
    async register() {

    }
  },
  getters: {
    loggedIn: (state): boolean => state.user !== null
  },
  persist: true // save the store so that reinitialization after pageload isn't necessary, by default it's stored in cookies
})