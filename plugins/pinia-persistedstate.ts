import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // Persists Pinia stores to localStorage
  nuxtApp.$pinia.use(piniaPluginPersistedstate)
})
