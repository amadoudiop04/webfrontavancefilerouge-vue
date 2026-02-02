<template>
  <div class="language-switcher relative">
    <select
      :value="localeValue"
      :disabled="isChanging"
      class="appearance-none px-4 py-2 pr-10 border border-gray-700/50 rounded-lg bg-gray-900/40 text-sm text-white hover:bg-gray-900/60 hover:border-red-600/50 focus:ring-2 focus:ring-red-600 focus:outline-none transition-all duration-200 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
      class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200"
      :class="{ 'animate-pulse': isChanging }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const { locale, changeLanguage } = useLanguageSwitcher()

const localeValue = computed(() => locale.value)
const isChanging = ref(false)

const handleLocaleChange = async (event: Event) => {
  const newLocale = (event.target as HTMLSelectElement).value as 'fr' | 'en'
  
  if (isChanging.value || newLocale === locale.value) return
  
  isChanging.value = true
  try {
    await changeLanguage(newLocale)
  } finally {
    // Reset after a short delay to allow navigation to complete
    setTimeout(() => {
      isChanging.value = false
    }, 300)
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
