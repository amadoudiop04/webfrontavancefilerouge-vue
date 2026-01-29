export default defineNuxtPlugin(async () => {
  const { setLocale } = useI18n()

  // Load saved locale from localStorage on app startup
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem('user-locale')
    if (savedLocale && ['fr', 'en'].includes(savedLocale)) {
      await setLocale(savedLocale)
    }
  }
})
