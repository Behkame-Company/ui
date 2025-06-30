import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  ssr: false,

  compatibilityDate: '2025-05-15',
  
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      bodyAttrs: {
        class: 'bg-[#FCFCFC]'
      }
    }
  },
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  devServer: {
    port: 3003
  },

  modules: ['@nuxt/icon'],
})