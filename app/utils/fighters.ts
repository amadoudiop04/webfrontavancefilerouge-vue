import type { Fighter } from '~/stores/fighters'

/**
 * Helper functions for working with fighters
 */

/**
 * Sort fighters by ranking
 */
export const sortFightersByRanking = (fighters: Fighter[]): Fighter[] => {
  return [...fighters].sort((a, b) => {
    if (!a.ranking) return 1
    if (!b.ranking) return -1
    return a.ranking - b.ranking
  })
}

/**
 * Sort fighters by wins
 */
export const sortFightersByWins = (fighters: Fighter[]): Fighter[] => {
  return [...fighters].sort((a, b) => {
    const aWins = a.wins || 0
    const bWins = b.wins || 0
    return bWins - aWins
  })
}

/**
 * Calculate fighter win rate
 */
export const calculateWinRate = (fighter: Fighter): number => {
  const wins = fighter.wins || 0
  const losses = fighter.losses || 0
  const draws = fighter.draws || 0
  const total = wins + losses + draws

  if (total === 0) return 0
  return Math.round((wins / total) * 100)
}

/**
 * Format fighter record string
 */
export const formatFighterRecord = (fighter: Fighter): string => {
  const wins = fighter.wins || 0
  const losses = fighter.losses || 0
  const draws = fighter.draws || 0
  return `${wins}-${losses}-${draws}`
}

/**
 * Check if fighter is undefeated
 */
export const isUndefeated = (fighter: Fighter): boolean => {
  return (fighter.losses || 0) === 0 && (fighter.wins || 0) > 0
}

/**
 * Get fighter by weight class
 */
export const filterFightersByWeight = (fighters: Fighter[], weight: string): Fighter[] => {
  return fighters.filter(fighter => fighter.weight === weight)
}

/**
 * Get unique weight classes from fighters
 */
export const getUniqueWeights = (fighters: Fighter[]): string[] => {
  return [...new Set(fighters.map(fighter => fighter.weight).filter(Boolean))].sort() as string[]
}
