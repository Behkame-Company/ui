import VueDatePicker from '@vuepic/vue-datepicker'

export default defineNuxtPlugin((nuxtApp) => {
  // Import CSS here as well
  if (process.client) {
    import('@vuepic/vue-datepicker/dist/main.css')
  }
  
  nuxtApp.vueApp.component('VueDatePicker', VueDatePicker)
})