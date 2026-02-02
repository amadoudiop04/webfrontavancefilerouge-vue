import { watch } from 'vue'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { setLocale, locale } = useI18n()

  // Load saved locale from localStorage on app startup
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem('user-locale')
    if (savedLocale && ['fr', 'en'].includes(savedLocale)) {
      // Only set locale if it's different from current
      if (locale.value !== savedLocale) {
        await setLocale(savedLocale)
      }
    }
  }

  // Watch for locale changes and persist them
  watch(() => locale.value, (newLocale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-locale', newLocale)
      document.documentElement.lang = newLocale
    }
  }, { immediate: true })
})
