<template>
  <!-- Zone de détection sur le bord droit -->
  <div
    class="fixed top-0 right-0 w-2 h-full z-30"
    @mouseenter="$emit('open')"
  />

  <!-- Overlay -->
  <div
    :class="[
      'fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300',
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]"
    @click="$emit('close')"
  />

  <!-- Sidebar avec design oblique -->
  <aside
    :class="[
      'fixed top-0 right-0 h-full w-96 z-50 transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
    style="clip-path: polygon(0% 0, 100% 0, 100% 100%, 20% 100%)"
    @mouseleave="$emit('close')"
  >
    <div
      class="h-full w-full bg-linear-to-b from-black via-red-950/90 to-black shadow-2xl"
      style="border-left: 1px solid rgba(127, 29, 29, 0.4)"
    >
      <div class="h-full flex flex-col pl-16">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-red-900/40">
          <div class="flex items-center gap-3">
            <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-red-600/40 via-red-700/30 to-red-900/40 border border-red-500/40 shadow-lg shadow-red-900/40">
              <Icon
                name="lucide:zap"
                class="w-5 h-5 text-white"
              />
            </div>
            <span class="text-xl font-bold text-white">Menu</span>
          </div>
          <button
            class="p-2 rounded-lg hover:bg-red-900/20 transition-colors group"
            aria-label="Fermer le menu"
            @click="$emit('close')"
          >
            <Icon
              name="lucide:x"
              class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
            />
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 p-6">
          <div class="space-y-2">
            <NuxtLink
              v-if="authStore.isAuthenticated"
              to="/dashboard"
              class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium group"
              @click="$emit('close')"
            >
              <span class="flex items-center gap-3">
                <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
                <span class="w-1 h-6 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Dashboard
              </span>
            </NuxtLink>
            <a
              href="#fighters-section"
              class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium group"
              @click="handleSmoothScroll($event, '#fighters-section')"
            >
              <span class="flex items-center gap-3">
                <Icon name="lucide:users" class="w-5 h-5" />
                <span class="w-1 h-6 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Combattants
              </span>
            </a>
            <a
              href="#features-section"
              class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium group"
              @click="handleSmoothScroll($event, '#features-section')"
            >
              <span class="flex items-center gap-3">
                <Icon name="lucide:zap" class="w-5 h-5" />
                <span class="w-1 h-6 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Fonctionnalités
              </span>
            </a>
            <a
              href="#support-section"
              class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-900/20 transition-all duration-200 font-medium group"
              @click="handleSmoothScroll($event, '#support-section')"
            >
              <span class="flex items-center gap-3">
                <Icon name="lucide:headphones" class="w-5 h-5" />
                <span class="w-1 h-6 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Support
              </span>
            </a>
          </div>
        </nav>

        <!-- Footer with CTA Buttons -->
        <div class="p-6 space-y-3 border-t border-red-900/40">
          <template v-if="authStore.isAuthenticated">
            <NuxtLink
              to="/dashboard"
              class="block w-full py-3 px-4 rounded-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold transition transform hover:-translate-y-px shadow-lg shadow-red-900/40 text-center"
              @click="$emit('close')"
            >
              Accéder au Dashboard
            </NuxtLink>
            <button
              class="w-full py-3 px-4 rounded-lg bg-transparent border border-gray-700 text-gray-300 font-semibold transition hover:border-red-500 hover:bg-red-900/20 hover:text-white"
              @click="handleLogout"
            >
              Se déconnecter
            </button>
          </template>
          <template v-else>
            <button
              class="w-full py-3 px-4 rounded-lg bg-transparent border border-red-500/60 text-white font-semibold transition hover:border-red-400 hover:bg-red-900/20 hover:text-red-200"
              @click="handleGetStarted"
            >
              Démo guidée
            </button>
            <button
              class="w-full py-3 px-4 rounded-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold transition transform hover:-translate-y-px shadow-lg shadow-red-900/40"
              @click="handleGetStarted"
            >
              Se Connecter
            </button>
          </template>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  open: []
  close: []
  getStarted: []
}>()

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
})

const handleSmoothScroll = (e: Event, href: string) => {
  e.preventDefault()
  emit('close')
  setTimeout(() => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 300)
}

const handleGetStarted = () => {
  emit('close')
  emit('getStarted')
}

const handleLogout = () => {
  emit('close')
  authStore.logout()
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}
</script>
