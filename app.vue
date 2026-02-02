<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'

// Set HTML lang attribute on mount and when locale changes
const { locale } = useI18n()

watch(() => locale.value, (newLocale) => {
  if (typeof window !== 'undefined') {
    document.documentElement.lang = newLocale
  }
}, { immediate: true })

onMounted(() => {
  if (typeof window !== 'undefined') {
    document.documentElement.lang = locale.value
  }
})
</script>
