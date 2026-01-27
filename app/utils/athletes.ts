import type { Athlete } from '~/stores/athletes'

/**
 * Helper functions for working with athletes
 */

/**
 * Sort athletes by ranking (ascending)
 */
export const sortByRanking = (athletes: Athlete[]): Athlete[] => {
  return [...athletes].sort((a, b) => {
    if (!a.ranking) return 1
    if (!b.ranking) return -1
    return a.ranking - b.ranking
  })
}

/**
 * Sort athletes by wins (descending)
 */
export const sortByWins = (athletes: Athlete[]): Athlete[] => {
  return [...athletes].sort((a, b) => b.record.wins - a.record.wins)
}

/**
 * Sort athletes by name (alphabetically)
 */
export const sortByName = (athletes: Athlete[]): Athlete[] => {
  return [...athletes].sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Filter athletes by weight class
 */
export const filterByWeightClass = (athletes: Athlete[], weightClass: string): Athlete[] => {
  return athletes.filter(athlete => athlete.weightClass === weightClass)
}

/**
 * Filter athletes by status
 */
export const filterByStatus = (athletes: Athlete[], status: Athlete['status']): Athlete[] => {
  return athletes.filter(athlete => athlete.status === status)
}

/**
 * Filter active competitors
 */
export const getActiveCompetitors = (athletes: Athlete[]): Athlete[] => {
  return athletes.filter(athlete => athlete.inCompetition)
}

/**
 * Get athletes by country
 */
export const filterByCountry = (athletes: Athlete[], country: string): Athlete[] => {
  return athletes.filter(athlete => athlete.country?.toLowerCase().includes(country.toLowerCase()))
}

/**
 * Get unique weight classes from athletes list
 */
export const getUniqueWeightClasses = (athletes: Athlete[]): string[] => {
  return [...new Set(athletes.map(athlete => athlete.weightClass))].sort()
}

/**
 * Get unique countries from athletes list
 */
export const getUniqueCountries = (athletes: Athlete[]): string[] => {
  return [...new Set(athletes.map(athlete => athlete.country).filter(Boolean))].sort() as string[]
}
