<template>
  <div class="language-switcher">
    <select
      :value="localeValue"
      class="px-3 py-2 border border-gray-700/50 rounded-md bg-gray-900/40 dark:bg-gray-800 text-sm text-white hover:bg-gray-900/60 hover:border-red-600/50 focus:ring-2 focus:ring-red-600 transition-all duration-200"
      @change="handleLocaleChange"
    >
      <option value="fr">
        🇫🇷 Français
      </option>
      <option value="en">
        🇬🇧 English
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const localeValue = computed({
  get: () => locale.value,
  set: (newValue: string) => {
    if (newValue === 'fr' || newValue === 'en') {
      locale.value = newValue
    }
  }
})

const handleLocaleChange = async (event: Event) => {
  const newLocale = (event.target as HTMLSelectElement).value as 'fr' | 'en'
  localeValue.value = newLocale
  if (typeof window !== 'undefined') {
    localStorage.setItem('user-locale', newLocale)
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-switcher select {
  cursor: pointer;
  font-weight: 500;
}

.language-switcher select:active {
  transform: scale(0.98);
}
</style>
