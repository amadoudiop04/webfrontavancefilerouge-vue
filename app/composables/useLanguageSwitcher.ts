export const useLanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()

  const changeLanguage = async (newLocale: 'fr' | 'en') => {
    if (!['fr', 'en'].includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}`)
      return
    }

    // Save preference immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-locale', newLocale)
    }

    // Update locale
    await setLocale(newLocale)
    locale.value = newLocale
  }

  return {
    locale,
    changeLanguage
  }
}
