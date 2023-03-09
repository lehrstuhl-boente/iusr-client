// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  ssr: false,
  app: {
    head: {
      title: 'Nuxt Test',
      meta: [
        { name: 'descirption', content: 'This is the description.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' }
      ]
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  },
  tailwindcss: {
    config: {
      content: [],
      theme: {
        extend: {
          colors: {
            'primary': '#4338CA',
            'primary-hover': '#3730A3',
            'primary-active': '#312E81',
            'error': '#991B1B'
          }
        },
        container: {
          screens: {
            sm: '600px',
            md: '728px',
            lg: '984px',
            xl: '1240px',
          }
        }
      },
      plugins: [
        require('@tailwindcss/forms')
      ]
    }
  }
})
