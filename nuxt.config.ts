// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-monaco-editor',
  ],
  ssr: false,
  app: {
    head: {
      title: 'IusR – Code Learning Platform',
      meta: [{ name: 'descirption', content: 'This is the description.' }],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  imports: {
    dirs: ['stores'],
  },
  css: [],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
  tailwindcss: {
    config: {
      content: [],
      theme: {
        extend: {
          colors: {
            primary: '#4338CA',
            'primary-hover': '#3730A3',
            'primary-active': '#312E81',
            danger: '#991B1B',
          },
        },
        container: {
          screens: {
            sm: '600px',
            md: '728px',
            lg: '984px',
            xl: '1240px',
          },
        },
      },
      // safelisted classes are never excluded from the bundle because they may be programmatically created or changed at runtime
      safelist: [
        // modals
        'max-w-none',
        'max-w-xs',
        'max-w-sm',
        'max-w-md',
        'max-w-lg',
        'max-w-xl',
        'max-w-2xl',
        'max-w-3xl',
        // notifications
        'bg-emerald-100',
        'border-emerald-300',
        'text-emerald-800',
        'bg-amber-100',
        'border-amber-300',
        'text-amber-800',
        'bg-red-100',
        'border-red-300',
        'text-red-800',
      ],
      plugins: [require('@tailwindcss/forms')],
    },
  },
});
