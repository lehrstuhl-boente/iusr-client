import axios from 'axios';

export const useApi = () => {
  const config = useRuntimeConfig();
  const api =  axios.create({
    baseURL: config.public.baseURL
  });
  api.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  });
  return api;
}