<template>
  <nav class="sticky top-0 z-50 bg-linear-to-r from-black via-red-950/70 to-black border-b border-red-900/50 shadow-xl backdrop-blur-lg">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Logo + brand -->
        <button
          type="button"
          class="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded-lg px-2 py-1 -ml-2 transition-all"
          :aria-label="$t('common.backHome')"
          @click="handleLogoClick"
        >
          <div class="relative flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-red-700/30 to-red-900/20 border border-red-600/50 shadow-lg shadow-red-900/30 group-hover:shadow-red-600/50 group-hover:border-red-500 transition-all duration-300 group-hover:scale-110">
            <Icon
              name="lucide:zap"
              class="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors duration-300"
            />
            <div class="absolute inset-0 rounded-xl bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-300" />
          </div>
          <div class="flex flex-col items-start">
            <span class="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-red-400 transition-colors duration-300">
              UFC Stats
            </span>
            <span class="text-[10px] sm:text-xs text-gray-400/80 hidden sm:inline group-hover:text-gray-300 transition-colors">
              {{ $t('nav.statsManager') }}
            </span>
          </div>
        </button>

        <!-- Right side: user + logout -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Dashboard Link -->
          <NuxtLink
            v-if="authStore.user"
            to="/dashboard"
            class="flex items-center gap-2 px-3 py-2 sm:px-4 hover:bg-red-600/10 hover:border-red-600/50 hover:text-red-400 transition-all duration-200 border border-gray-700/50 rounded-lg"
          >
            <Icon
              name="lucide:layout-dashboard"
              class="w-4 h-4 shrink-0"
            />
            <span class="hidden sm:inline text-sm font-medium">{{ $t('nav.dashboard') }}</span>
          </NuxtLink>

          <div
            v-if="authStore.user"
            class="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-900/40 border border-gray-800/50 hover:bg-gray-900/60 hover:border-gray-700/50 transition-all duration-200"
          >
            <div class="relative w-9 h-9 rounded-full bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-red-900/40 ring-2 ring-red-900/30">
              {{ initials }}
            </div>
            <div class="flex flex-col text-right min-w-0 max-w-40">
              <span class="text-xs font-semibold text-white truncate leading-tight">
                {{ authStore.user.name }}
              </span>
              <span class="text-[10px] text-gray-400 truncate leading-tight">
                {{ authStore.user.email }}
              </span>
            </div>
          </div>

          <!-- Mobile user avatar -->
          <div
            v-if="authStore.user"
            class="md:hidden w-8 h-8 rounded-full bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-red-900/40 ring-2 ring-red-900/30"
          >
            {{ initials }}
          </div>

          <!-- Language Switcher - Always visible -->
          <LanguageSwitcher />

          <button
            v-if="authStore.user"
            class="flex items-center gap-2 px-3 py-2 sm:px-4 hover:bg-red-600/10 hover:border-red-600/50 hover:text-red-400 transition-all duration-200 border border-gray-700/50"
            aria-label="Se déconnecter"
            @click="handleLogout"
          >
            <Icon
              name="lucide:log-out"
              class="w-4 h-4 shrink-0"
            />
            <span class="hidden sm:inline text-sm font-medium">{{ $t('nav.logout') }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

defineProps<{
  onLogout?: () => void
}>()

const authStore = useAuthStore()

const initials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleLogoClick = () => {
  if (authStore.isAuthenticated) {
    // Si connecté, rediriger vers la landing page
    router.push('/')
  } else {
    // Si non connecté, rester sur la landing page
    router.push('/')
  }
}
</script>
