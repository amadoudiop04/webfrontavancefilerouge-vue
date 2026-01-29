import { ref, watch, onMounted, readonly } from 'vue'

/**
 * Composable to manage favorites with localStorage persistence
 */

export function useFavorites(storageKey: string) {
  const favorites = ref<string[]>([])

  // Load favorites from localStorage on mount
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          favorites.value = JSON.parse(stored)
        } catch (error) {
          console.error('Failed to parse favorites from localStorage:', error)
          favorites.value = []
        }
      }
    }
  })

  // Save to localStorage whenever favorites change
  watch(
    favorites,
    (newFavorites: string[]) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(newFavorites))
      }
    },
    { deep: true }
  )

  /**
   * Toggle an item in favorites
   */
  const toggle = (id: string) => {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(id)
    }
  }

  /**
   * Check if an item is in favorites
   */
  const isFavorite = (id: string) => {
    return favorites.value.includes(id)
  }

  /**
   * Add an item to favorites
   */
  const add = (id: string) => {
    if (!favorites.value.includes(id)) {
      favorites.value.push(id)
    }
  }

  /**
   * Remove an item from favorites
   */
  const remove = (id: string) => {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
    }
  }

  /**
   * Clear all favorites
   */
  const clear = () => {
    favorites.value = []
  }

  return {
    favorites: readonly(favorites),
    toggle,
    isFavorite,
    add,
    remove,
    clear
  }
}
