export default defineNuxtConfig({
  ssr: false,
  modules: [
   
    '@nuxt/icon',
    'nuxt-time',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
        }
      ],
      bodyAttrs: {
        class: 'bg-[#FCFCFC]'
      }
    }
  },
  devServer: { port: 3003 },
  build: { transpile: ['@vuepic/vue-datepicker'] },
})
