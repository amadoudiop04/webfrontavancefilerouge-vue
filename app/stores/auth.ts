import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface AuthUser {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => Boolean(user.value))

  const login = (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email et mot de passe requis')
    }

    user.value = {
      email,
      name: email.split('@')[0] || 'Utilisateur'
    }
  }

  const signup = (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('Email, mot de passe et nom requis')
    }

    user.value = {
      email,
      name
    }
  }

  const logout = () => {
    user.value = null
  }

  const updateProfile = (name: string, email: string) => {
    if (user.value) {
      user.value.name = name
      user.value.email = email
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile
  }
})
