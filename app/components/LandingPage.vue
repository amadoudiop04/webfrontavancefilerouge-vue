<template>
  <div class="min-h-screen bg-linear-to-br from-black via-red-950 to-black text-white overflow-hidden">
    <!-- Background effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 z-40 border-b border-red-900/40 backdrop-blur-xl bg-black/70 shadow-[0_10px_60px_-40px_rgba(248,113,113,0.5)]">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div class="relative flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-red-600/40 via-red-700/30 to-red-900/40 border border-red-500/40 shadow-lg shadow-red-900/40">
              <Icon
                name="lucide:zap"
                class="w-6 h-6 text-white"
              />
            </div>
            <span class="text-2xl font-bold tracking-tight">
              UFC Stats
            </span>
          </div>

          <!-- CTA Buttons & Menu -->
          <div class="flex items-center gap-3">
            <button
              class="p-2.5 rounded-lg bg-red-900/20 border border-red-500/40 hover:bg-red-900/40 hover:border-red-500/60 transition-all duration-200 group"
              aria-label="Ouvrir le menu"
              @click="isSidebarOpen = true"
            >
              <Icon
                name="lucide:menu"
                class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 container mx-auto px-4 py-20 md:py-28">
      <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div class="max-w-3xl space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-600/10 text-sm text-red-200">
            <span class="block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Nouveau tableau de bord 2026
          </div>
          <h1 class="text-5xl md:text-6xl font-bold leading-tight">
            Maîtrisez vos statistiques de
            <span class="text-red-500"> combat</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Une plateforme complète pour gérer, suivre et analyser les
            performances de vos combattants UFC avec des visualisations
            modernes et des alertes en temps réel.
          </p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              class="inline-flex items-center justify-center bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-3 px-7 rounded-lg text-lg transition transform hover:-translate-y-0.5 shadow-lg shadow-red-900/40"
              @click="emit('onGetStarted')"
            >
              Commencer Maintenant
            </button>
            <button
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-700 text-gray-200 hover:border-red-500 hover:text-white transition"
              @click="emit('onGetStarted')"
            >
              Découvrir la plateforme
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-3 shadow-lg shadow-black/30"
            >
              <p class="text-2xl font-bold text-white">
                {{ item.value }}
              </p>
              <p class="text-xs text-gray-400 uppercase tracking-wide">
                {{ item.label }}
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-0 bg-red-600/20 blur-3xl rounded-full" />
          <div class="relative overflow-hidden rounded-2xl border border-red-900/50 bg-linear-to-br from-gray-900/70 via-black to-gray-900/40 shadow-2xl shadow-red-900/40">
            <div class="p-6 border-b border-red-900/30 flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-400">
                  Vue manager
                </p>
                <p class="text-2xl font-bold">
                  Performance live
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span class="text-xs text-green-400 font-semibold">En direct</span>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <p class="text-gray-400 text-sm mb-1">Combattants actifs</p>
                  <p class="text-3xl font-bold text-white">{{ liveStats.activeFighters }}</p>
                  <div class="flex items-center gap-1 text-green-400 text-xs mt-1">
                    <Icon name="lucide:trending-up" class="w-3 h-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <p class="text-gray-400 text-sm mb-1">Événements</p>
                  <p class="text-3xl font-bold text-white">{{ liveStats.events }}</p>
                  <div class="flex items-center gap-1 text-blue-400 text-xs mt-1">
                    <Icon name="lucide:calendar" class="w-3 h-3" />
                    <span>Ce mois</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-gray-400 text-sm">Taux de victoire</p>
                  <p class="text-white font-bold">{{ liveStats.winRate }}%</p>
                </div>
                <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    class="bg-linear-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-1000"
                    :style="{ width: `${liveStats.winRate}%` }"
                  />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <p class="text-xl font-bold text-green-400">{{ liveStats.wins }}</p>
                  <p class="text-xs text-gray-400">Victoires</p>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <p class="text-xl font-bold text-yellow-400">{{ liveStats.kos }}</p>
                  <p class="text-xs text-gray-400">K.O.</p>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <p class="text-xl font-bold text-red-400">{{ liveStats.losses }}</p>
                  <p class="text-xs text-gray-400">Défaites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features-section" class="relative z-10 container mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Fonctionnalités Puissantes
        </h2>
        <p class="text-xl text-gray-400">
          Tout ce dont vous avez besoin pour gérer vos combattants
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:bar-chart-3" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Statistiques en temps réel</h3>
          <p class="text-gray-400">Suivez les performances de vos combattants avec des analyses détaillées et des graphiques interactifs.</p>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:users" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Gestion d'équipe</h3>
          <p class="text-gray-400">Gérez facilement plusieurs combattants, ajoutez, modifiez et suivez leur progression.</p>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:trophy" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Classements UFC</h3>
          <p class="text-gray-400">Consultez les classements officiels et comparez vos combattants avec les meilleurs.</p>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:heart" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Favoris</h3>
          <p class="text-gray-400">Marquez vos combattants préférés et accédez rapidement à leurs profils.</p>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:git-compare" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Comparaison</h3>
          <p class="text-gray-400">Comparez deux combattants côte à côte pour analyser leurs statistiques.</p>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 hover:border-red-600/50 transition-all">
          <div class="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
            <Icon name="lucide:bell" class="w-6 h-6 text-red-400" />
          </div>
          <h3 class="text-xl font-bold mb-2">Notifications</h3>
          <p class="text-gray-400">Recevez des alertes sur les combats à venir et les performances de vos combattants.</p>
        </div>
      </div>
    </section>

    <!-- Fighters Section -->
    <section id="fighters-section" class="relative z-10 container mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Combattants en Vedette
        </h2>
        <p class="text-xl text-gray-400">
          Les meilleurs profils de votre plateforme
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="flex gap-3 mb-8 overflow-x-auto pb-2">
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all',
            selectedCategory === category
              ? 'bg-red-600 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Fighters Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="fighter in filteredFighters"
          :key="fighter.id"
          class="group rounded-xl border border-gray-800 bg-linear-to-br from-gray-900/50 to-black/50 overflow-hidden hover:border-red-600/50 transition-all duration-300"
        >
          <div
            v-if="fighter.image"
            class="overflow-hidden h-80 bg-gray-800"
          >
            <img
              :src="fighter.image"
              :alt="fighter.name"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            >
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-1">
              {{ fighter.name }}
            </h3>
            <p class="text-sm text-gray-400 mb-4">
              {{ fighter.category }}
            </p>
            <p class="text-lg font-semibold text-red-500">
              {{ fighter.record }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Form Section -->
    <section id="support-section" class="relative z-10 container mx-auto px-4 py-20">
      <div class="max-w-2xl mx-auto">
        <div class="rounded-2xl border border-red-900/50 bg-linear-to-br from-gray-900/40 to-black/40 p-8 md:p-12">
          <h2 class="text-3xl font-bold mb-2">
            Besoin d'aide ?
          </h2>
          <p class="text-gray-400 mb-8">
            Contactez notre équipe de support
          </p>

          <form
            class="space-y-6"
            @submit.prevent="handleSupportSubmit"
          >
            <div>
              <label class="block text-sm font-medium mb-2">Nom</label>
              <input
                v-model="supportName"
                type="text"
                class="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600"
                placeholder="Votre nom"
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input
                v-model="supportEmail"
                type="email"
                class="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600"
                placeholder="votre@email.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Message</label>
              <textarea
                v-model="supportMessage"
                class="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 resize-none h-32"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              class="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-3 rounded-lg transition transform hover:-translate-y-0.5"
            >
              Envoyer
            </button>

            <div
              v-if="supportStatus"
              class="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-200"
            >
              {{ supportStatus }}
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />

    <!-- Right Sidebar -->
    <RightSidebar
      :is-open="isSidebarOpen"
      @open="isSidebarOpen = true"
      @close="isSidebarOpen = false"
      @get-started="handleGetStarted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { athletesData } from '~/data/athletes.datas'

interface Fighter {
  id: number
  name: string
  image: string
  category: string
  record: string
}

interface Highlight {
  label: string
  value: string
}

const initializedfighters: Fighter[] = athletesData.slice(0, 6).map(athlete => ({
  id: Number(athlete.id),
  name: athlete.name,
  image: athlete.image,
  category: athlete.weightClass,
  record: `${athlete.record.wins}-${athlete.record.losses}-${athlete.record.draws}`
}))

const fighters: Fighter[] = initializedfighters

const highlights: Highlight[] = [
  { label: 'Athlètes suivis', value: '+250' },
  { label: 'Rapports mensuels', value: '98%' },
  { label: 'Clubs actifs', value: '120' }
]

const liveStats = ref({
  activeFighters: 47,
  events: 12,
  winRate: 68,
  wins: 124,
  kos: 45,
  losses: 58
})

const categories = computed(() => ['Tous', ...new Set(fighters.map(f => f.category))])

const selectedCategory = ref('Tous')
const isSidebarOpen = ref(false)
const supportName = ref('')
const supportEmail = ref('')
const supportMessage = ref('')
const supportStatus = ref('')

const filteredFighters = computed(() => {
  return selectedCategory.value === 'Tous'
    ? fighters
    : fighters.filter(f => f.category === selectedCategory.value)
})

const emit = defineEmits<{
  onGetStarted: []
}>()

const handleSupportSubmit = () => {
  supportStatus.value = 'Message envoyé ! Notre support revient vers vous rapidement.'
  supportName.value = ''
  supportEmail.value = ''
  supportMessage.value = ''
  setTimeout(() => {
    supportStatus.value = ''
  }, 3500)
}

const handleGetStarted = () => {
  emit('onGetStarted')
}
</script>
