// object that needs to be passed with every request made, such that user can be authenticated on the server
export const useDefaultFetchParams = () => {
  const config = useRuntimeConfig();
  if(localStorage) {
    return {
      baseURL: config.public.baseURL,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  }
}