import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export const useLocalStorage = <T>(key: string, initialValue: T): Ref<T> => {
  const storedValue = ref<T>(initialValue) as Ref<T>

  // Charger depuis localStorage au montage
  onMounted(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        if (item) {
          storedValue.value = JSON.parse(item)
        }
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error)
      }
    }
  })

  // Sauvegarder dans localStorage à chaque changement
  watch(
    storedValue,
    (newValue) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
          console.error(`Error saving ${key} to localStorage:`, error)
        }
      }
    },
    { deep: true }
  )

  return storedValue
}
