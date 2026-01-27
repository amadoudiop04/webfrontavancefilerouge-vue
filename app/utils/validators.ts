/**
 * Validation utilities for forms and data
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}

export const validateNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  return !Number.isNaN(num) && Number.isFinite(num)
}

export const validatePositiveNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  return validateNumber(num) && num >= 0
}
