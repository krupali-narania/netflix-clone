// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbBaseUrl: process.env.TMDB_BASE_URL,
      tmdbImageUrl: process.env.TMDB_IMAGE_URL
    }
  },
  devtools: { enabled: true }
})
