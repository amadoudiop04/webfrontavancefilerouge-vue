/**
 * Formatting utilities for displaying data
 */

import type { Athlete } from '~/stores/athletes'

/**
 * Format athlete record as "W-L-D"
 */
export const formatRecord = (record: { wins: number, losses: number, draws: number }): string => {
  return `${record.wins}-${record.losses}-${record.draws}`
}

/**
 * Format athlete name with optional nickname
 */
export const formatAthleteName = (athlete: Athlete): string => {
  return athlete.nickname ? `${athlete.name} "${athlete.nickname}"` : athlete.name
}

/**
 * Calculate win percentage
 */
export const calculateWinPercentage = (record: { wins: number, losses: number, draws: number }): number => {
  const total = record.wins + record.losses + record.draws
  if (total === 0) return 0
  return Math.round((record.wins / total) * 100)
}

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR')
}

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}
