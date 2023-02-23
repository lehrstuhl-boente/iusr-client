// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  app: {
    head: {
      title: 'Nuxt Test',
      meta: [
        { name: 'descirption', content: 'This is the description.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  }
})
