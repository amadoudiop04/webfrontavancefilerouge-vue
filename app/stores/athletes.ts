import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { athletesData } from '~/data/athletes.datas'

export interface Athlete {
  id: string
  name: string
  nickname?: string
  image?: string
  record: {
    wins: number
    losses: number
    draws: number
  }
  knockouts: number
  submissions: number
  weightClass: string
  country?: string
  height?: string
  age?: number
  ranking?: number
  status: 'Actif' | 'Blessé' | 'Retraité' | 'En pause'
  inCompetition: boolean
}

export const useAthletesStore = defineStore('athletes', () => {
  const athletes = ref<Athlete[]>(athletesData as Athlete[])
  const selectedAthlete = ref<Athlete | null>(null)
  const compareList = ref<Athlete[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Favorites management with localStorage
  const favorites = ref<string[]>([])

  // Initialize favorites from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('ufc-favorites')
    if (stored) {
      try {
        favorites.value = JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error)
        favorites.value = []
      }
    }
  }

  const setSelectedAthlete = (athlete: Athlete | null) => {
    selectedAthlete.value = athlete
  }

  const toggleFavorite = (athleteId: string) => {
    const index = favorites.value.indexOf(athleteId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(athleteId)
    }
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ufc-favorites', JSON.stringify(favorites.value))
    }
  }

  const isFavorite = (athleteId: string) => {
    return favorites.value.includes(athleteId)
  }

  const favoriteAthletes = computed(() => {
    return athletes.value.filter(athlete => favorites.value.includes(athlete.id))
  })

  const toggleCompare = (athlete: Athlete) => {
    const index = compareList.value.findIndex(a => a.id === athlete.id)
    if (index > -1) {
      compareList.value.splice(index, 1)
    } else if (compareList.value.length < 2) {
      compareList.value.push(athlete)
    }
  }

  const clearCompare = () => {
    compareList.value = []
  }

  const isInCompare = (athleteId: string) => {
    return compareList.value.some(a => a.id === athleteId)
  }

  const fetchAthletes = async () => {
    isLoading.value = true
    try {
      // Charger les données depuis le fichier JSON
      const response = await fetch('/data/athletes.json')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des athlètes')
      }
      const data = await response.json()
      athletes.value = data as Athlete[]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
      // En cas d'erreur, garder les données déjà chargées
      console.error('Erreur lors du chargement des athlètes:', err)
    } finally {
      isLoading.value = false
    }
  }

  const searchAthletes = (name: string, weightClass?: string): Athlete[] => {
    return athletes.value.filter((athlete) => {
      const matchName = athlete.name.toLowerCase().includes(name.toLowerCase())
      const matchWeight = !weightClass || athlete.weightClass === weightClass
      return matchName && matchWeight
    })
  }

  return {
    athletes,
    selectedAthlete,
    favorites,
    favoriteAthletes,
    compareList,
    isLoading,
    error,
    setSelectedAthlete,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    clearCompare,
    isInCompare,
    fetchAthletes,
    searchAthletes
  }
})
