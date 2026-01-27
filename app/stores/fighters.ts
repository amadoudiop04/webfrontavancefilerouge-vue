import { defineStore } from 'pinia'
import { ref } from 'vue'
import { athletesData } from '../data/athletes.datas'

export interface Fighter {
  id: string
  name: string
  nickname?: string
  weight?: string
  wins?: number
  losses?: number
  draws?: number
  knockouts?: number
  submissions?: number
  image?: string
  ranking?: number
  record?: string
  weightClass?: string
  rank?: string
}

// Charger les 10 premiers athlètes depuis athletes.datas.ts
const initialFighters: Fighter[] = athletesData.slice(0, 10).map(athlete => ({
  id: athlete.id,
  name: athlete.name,
  weight: athlete.weightClass,
  wins: athlete.record.wins,
  losses: athlete.record.losses,
  draws: athlete.record.draws,
  knockouts: athlete.knockouts,
  submissions: athlete.submissions,
  image: athlete.image,
  ranking: athlete.ranking
}))

export const useFightersStore = defineStore('fighters', () => {
  const fighters = ref<Fighter[]>(initialFighters)

  const addFighter = (fighter: Omit<Fighter, 'id'>) => {
    const newFighter: Fighter = {
      ...fighter,
      id: Date.now().toString()
    }
    fighters.value.push(newFighter)
  }

  const removeFighter = (id: string) => {
    fighters.value = fighters.value.filter(f => f.id !== id)
  }

  const updateFighter = (id: string, updatedFighter: Partial<Fighter>) => {
    const fighter = fighters.value.find(f => f.id === id)
    if (fighter) {
      Object.assign(fighter, updatedFighter)
    }
  }

  const getFighter = (id: string) => {
    return fighters.value.find(f => f.id === id)
  }

  return {
    fighters,
    addFighter,
    removeFighter,
    updateFighter,
    getFighter
  }
})
