<template>
  <div class="language-switcher relative">
    <select
      :value="localeValue"
      class="appearance-none px-4 py-2 pr-10 border border-gray-700/50 rounded-lg bg-gray-900/40 text-sm text-white hover:bg-gray-900/60 hover:border-red-600/50 focus:ring-2 focus:ring-red-600 focus:outline-none transition-all duration-200 cursor-pointer font-medium"
      @change="handleLocaleChange"
    >
      <option value="fr">
        🇫🇷 Français
      </option>
      <option value="en">
        🇺🇸 English
      </option>
    </select>
    <Icon
      name="lucide:chevron-down"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
    />
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
