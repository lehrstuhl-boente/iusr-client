import axios from 'axios';
import { useAuthStore } from '~~/stores/auth.store';

export const useApi = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const api = axios.create({
    baseURL: config.public.baseURL,
  });
  api.interceptors.request.use((config) => {
    // append auth token to every request
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  });
  api.interceptors.response.use(
    (response) => {
      // 2xx errors are handeled normally
      return response;
    },
    (error) => {
      // logout if server returns 401 error --> JWT probably expired, need to login again
      if (error.response.status === 401) {
        authStore.logout();
      }
      return Promise.reject(error);
    }
  );
  return api;
};
