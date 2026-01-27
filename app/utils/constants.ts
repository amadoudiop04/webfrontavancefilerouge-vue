/**
 * Constants and configuration values used throughout the application
 */

export const APP_NAME = 'UFC Stats'
export const APP_VERSION = '1.0.0'

export const STORAGE_KEYS = {
  FAVORITES: 'ufc-favorites',
  AUTH_TOKEN: 'ufc-auth-token',
  USER_PREFERENCES: 'ufc-user-prefs'
} as const

export const WEIGHT_CLASSES = [
  'Poids mouche',
  'Poids coq',
  'Poids plume',
  'Poids léger',
  'Poids welter',
  'Poids moyen',
  'Poids lourd léger',
  'Poids lourd'
] as const

export const ATHLETE_STATUS = {
  ACTIVE: 'Actif',
  INJURED: 'Blessé',
  RETIRED: 'Retraité',
  ON_PAUSE: 'En pause'
} as const

export const MAX_COMPARE_ATHLETES = 2

export const API_CONFIG = {
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
  DEBOUNCE_DELAY: 300
} as const
