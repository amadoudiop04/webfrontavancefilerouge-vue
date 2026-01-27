<template>
  <div>
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-6 rounded-lg bg-linear-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium mb-2">
              {{ stat.label }}
            </p>
            <p class="text-3xl font-bold">
              {{ stat.value }}
            </p>
          </div>
          <div :class="[stat.bgColor, 'p-3 rounded-lg']">
            <component
              :is="stat.icon"
              :class="['w-6 h-6', stat.color]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Return to home button -->
    <div
      v-if="onReturnHome"
      class="mb-6 flex justify-end"
    >
      <button
        class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all"
        @click="handleReturnHome"
      >
        <Icon
          name="lucide:home"
          class="w-4 h-4"
        />
        Retour à l&apos;accueil
      </button>
    </div>

    <!-- Fighters List -->
    <div class="bg-linear-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6">
        Combattants
      </h2>
      <div
        v-if="fightersStore.fighters.length > 0"
        class="space-y-4"
      >
        <div
          v-for="fighter in fightersStore.fighters"
          :key="fighter.id"
          class="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-red-600/50 transition-all"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold">
                {{ fighter.name }}
              </h3>
              <p class="text-sm text-gray-400">
                {{ fighter.weight }}
              </p>
              <div class="flex gap-4 mt-2 text-sm">
                <span class="text-green-400">V: {{ fighter.wins }}</span>
                <span class="text-red-400">D: {{ fighter.losses }}</span>
                <span class="text-yellow-400">KO: {{ fighter.knockouts }}</span>
              </div>
            </div>
            <div
              v-if="fighter.ranking"
              class="text-2xl font-bold text-red-600"
            >
              #{{ fighter.ranking }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center py-8 text-gray-400"
      >
        Aucun combattant pour le moment
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFightersStore } from '~/stores/fighters'
import { useAuthStore } from '~/stores/auth'
import { TrendingUp, Zap, Trophy, Target } from 'lucide-vue-next'

defineOptions({
  name: 'AppDashboard'
})

const emit = defineEmits<{
  returnHome: []
}>()

defineProps<{
  onReturnHome?: () => void
}>()

const fightersStore = useFightersStore()
const authStore = useAuthStore()

const totalFighters = computed(() => fightersStore.fighters.length)
const totalWins = computed(() => fightersStore.fighters.reduce((sum, f) => sum + (f.wins ?? 0), 0))
const totalKnockouts = computed(() => fightersStore.fighters.reduce((sum, f) => sum + (f.knockouts ?? 0), 0))
const totalLosses = computed(() => fightersStore.fighters.reduce((sum, f) => sum + (f.losses ?? 0), 0))
const winRate = computed(() => {
  if (totalFighters.value === 0) return 0
  return ((totalWins.value / (totalWins.value + totalLosses.value)) * 100).toFixed(1)
})

const stats = computed(() => [
  {
    label: 'Combattants Totaux',
    value: totalFighters.value,
    icon: Trophy,
    color: 'text-red-600',
    bgColor: 'bg-red-600/10'
  },
  {
    label: 'Victoires Cumulées',
    value: totalWins.value,
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-600/10'
  },
  {
    label: 'KOs Cumulés',
    value: totalKnockouts.value,
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/10'
  },
  {
    label: 'Taux de Victoire',
    value: `${winRate.value}%`,
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10'
  }
])

const handleReturnHome = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}
</script>
