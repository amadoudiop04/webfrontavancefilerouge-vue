import type { Athlete } from '~/stores/athletes'

export async function loadAthletesFromJson(): Promise<Athlete[]> {
  try {
    const response = await fetch('/data/athletes.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data as Athlete[]
  } catch (error) {
    console.error('Error loading athletes from JSON:', error)
    throw error
  }
}

export function addAthleteToData(athletes: Athlete[], newAthlete: Omit<Athlete, 'id'>): Athlete[] {
  const athlete: Athlete = {
    ...newAthlete,
    id: String(Date.now())
  }
  return [...athletes, athlete]
}

export function updateAthleteInData(athletes: Athlete[], id: string, updates: Partial<Athlete>): Athlete[] {
  return athletes.map(athlete =>
    athlete.id === id ? { ...athlete, ...updates } : athlete
  )
}

export function removeAthleteFromData(athletes: Athlete[], id: string): Athlete[] {
  return athletes.filter(athlete => athlete.id !== id)
}

export function exportAthletesToJson(athletes: Athlete[]): string {
  return JSON.stringify(athletes, null, 2)
}

export function validateAthleteData(data: unknown): data is Athlete {
  if (typeof data !== 'object' || data === null) return false

  const athlete = data as Partial<Athlete>

  return (
    typeof athlete.id === 'string'
    && typeof athlete.name === 'string'
    && typeof athlete.weightClass === 'string'
    && typeof athlete.knockouts === 'number'
    && typeof athlete.submissions === 'number'
    && typeof athlete.inCompetition === 'boolean'
    && typeof athlete.record === 'object'
    && athlete.record !== null
    && typeof athlete.record.wins === 'number'
    && typeof athlete.record.losses === 'number'
    && typeof athlete.record.draws === 'number'
    && ['Actif', 'Blessé', 'Retraité', 'En pause'].includes(athlete.status as string)
  )
}

export function validateAthletesArray(data: unknown): data is Athlete[] {
  if (!Array.isArray(data)) return false
  return data.every(item => validateAthleteData(item))
}
