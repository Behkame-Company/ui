import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  compatibilityDate: '2025-05-15',

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  devServer: {
    port: 3003
  },

})
