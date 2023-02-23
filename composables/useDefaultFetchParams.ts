import { baseURL } from 'nuxt/dist/core/runtime/nitro/paths'

export const useDefaultFetchParams = () => {
  const config = useRuntimeConfig();
  return {
    baseURL: config.public.baseURL,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
}