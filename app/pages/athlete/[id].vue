<template>
  <div class="min-h-screen bg-linear-to-br from-black via-red-950/40 to-black text-white">
    <NavbarHeader />

    <main class="container mx-auto px-4 py-6">
      <BreadcrumbNav :items="breadcrumbItems" />

      <!-- Loading State -->
      <div
        v-if="!athlete"
        class="flex items-center justify-center py-20"
      >
        <div class="text-center">
          <Icon
            name="lucide:loader-2"
            class="w-12 h-12 text-red-600 animate-spin mx-auto mb-4"
          />
          <p class="text-gray-400">
            Chargement des détails...
          </p>
        </div>
      </div>

      <!-- Athlete Details -->
      <div
        v-else
        class="space-y-6 animate-fade-in"
      >
        <!-- Hero Section with Profile -->
        <div class="relative rounded-3xl border border-red-800/40 bg-linear-to-br from-red-900/30 via-black to-gray-900/50 shadow-2xl shadow-red-900/40 overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
          </div>

          <div class="relative p-6 sm:p-8 lg:p-10">
            <div class="flex flex-col lg:flex-row gap-8 items-start">
              <!-- Profile Image -->
              <div class="relative">
                <div class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden ring-4 ring-red-900/30 shadow-2xl">
                  <img
                    v-if="athlete.image"
                    :src="athlete.image"
                    :alt="athlete.name"
                    class="w-full h-full object-cover"
                  >
                  <div
                    v-else
                    class="w-full h-full bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center"
                  >
                    <Icon
                      name="lucide:user"
                      class="w-20 h-20 text-white opacity-60"
                    />
                  </div>
                </div>
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold shadow-lg whitespace-nowrap">
                  Rang #{{ athlete.ranking }}
                </div>
              </div>

              <!-- Profile Info -->
              <div class="flex-1 space-y-6">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold">
                      {{ athlete.name }}
                    </h1>
                    <button
                      :class="[
                        'p-2 rounded-lg transition-all',
                        athletesStore.isFavorite(athlete.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800/60 text-gray-400 hover:bg-red-600/20 hover:text-red-400'
                      ]"
                      @click="athletesStore.toggleFavorite(athlete.id)"
                    >
                      <Icon
                        :name="athletesStore.isFavorite(athlete.id) ? 'lucide:heart' : 'lucide:heart'"
                        :class="[
                          'w-5 h-5',
                          athletesStore.isFavorite(athlete.id) ? 'fill-current' : ''
                        ]"
                      />
                    </button>
                  </div>
                  <p class="text-xl text-gray-400 mb-4">
                    "{{ athlete.nickname }}"
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-semibold',
                        athlete.status === 'Actif' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                        athlete.status === 'Blessé' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                        'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                      ]"
                    >
                      {{ athlete.status }}
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold bg-blue-600/20 text-blue-400 border border-blue-600/30">
                      {{ athlete.weightClass }}
                    </span>
                    <span
                      v-if="athlete.inCompetition"
                      class="px-3 py-1 rounded-full text-sm font-semibold bg-purple-600/20 text-purple-400 border border-purple-600/30"
                    >
                      En compétition
                    </span>
                  </div>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                    <div class="flex items-center gap-2 mb-1">
                      <Icon
                        name="lucide:flag"
                        class="w-4 h-4 text-gray-400"
                      />
                      <span class="text-xs text-gray-400">Pays</span>
                    </div>
                    <p class="text-lg font-bold text-white">
                      {{ athlete.country }}
                    </p>
                  </div>
                  <div class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                    <div class="flex items-center gap-2 mb-1">
                      <Icon
                        name="lucide:ruler"
                        class="w-4 h-4 text-gray-400"
                      />
                      <span class="text-xs text-gray-400">Taille</span>
                    </div>
                    <p class="text-lg font-bold text-white">
                      {{ athlete.height }}
                    </p>
                  </div>
                  <div class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                    <div class="flex items-center gap-2 mb-1">
                      <Icon
                        name="lucide:cake"
                        class="w-4 h-4 text-gray-400"
                      />
                      <span class="text-xs text-gray-400">Âge</span>
                    </div>
                    <p class="text-lg font-bold text-white">
                      {{ athlete.age }} ans
                    </p>
                  </div>
                  <div class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                    <div class="flex items-center gap-2 mb-1">
                      <Icon
                        name="lucide:target"
                        class="w-4 h-4 text-gray-400"
                      />
                      <span class="text-xs text-gray-400">Classement</span>
                    </div>
                    <p class="text-lg font-bold text-red-400">
                      #{{ athlete.ranking }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Fight Record -->
          <div class="lg:col-span-2 rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div class="flex items-center gap-2 mb-6">
              <Icon
                name="lucide:bar-chart"
                class="w-5 h-5 text-red-400"
              />
              <h2 class="text-xl font-bold">
                Bilan des combats
              </h2>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-green-600/10 border border-green-600/30 rounded-xl p-5 text-center">
                <Icon
                  name="lucide:trophy"
                  class="w-8 h-8 text-green-400 mx-auto mb-2"
                />
                <p class="text-3xl font-bold text-green-400 mb-1">
                  {{ athlete.record.wins }}
                </p>
                <p class="text-sm text-gray-400">
                  Victoires
                </p>
              </div>
              <div class="bg-red-600/10 border border-red-600/30 rounded-xl p-5 text-center">
                <Icon
                  name="lucide:x-circle"
                  class="w-8 h-8 text-red-400 mx-auto mb-2"
                />
                <p class="text-3xl font-bold text-red-400 mb-1">
                  {{ athlete.record.losses }}
                </p>
                <p class="text-sm text-gray-400">
                  Défaites
                </p>
              </div>
              <div class="bg-gray-600/10 border border-gray-600/30 rounded-xl p-5 text-center">
                <Icon
                  name="lucide:equal"
                  class="w-8 h-8 text-gray-400 mx-auto mb-2"
                />
                <p class="text-3xl font-bold text-gray-400 mb-1">
                  {{ athlete.record.draws }}
                </p>
                <p class="text-sm text-gray-400">
                  Nuls
                </p>
              </div>
            </div>

            <!-- Win Rate Progress -->
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">Taux de victoire</span>
                <span class="font-bold text-white">{{ winRate }}%</span>
              </div>
              <div class="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
                  :style="{ width: `${winRate}%` }"
                />
              </div>
            </div>
          </div>

          <!-- Fighting Stats -->
          <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <div class="flex items-center gap-2 mb-6">
              <Icon
                name="lucide:zap"
                class="w-5 h-5 text-yellow-400"
              />
              <h2 class="text-xl font-bold">
                Statistiques
              </h2>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                    <Icon
                      name="lucide:zap"
                      class="w-5 h-5 text-yellow-400"
                    />
                  </div>
                  <span class="text-gray-300">K.O.</span>
                </div>
                <span class="text-2xl font-bold text-yellow-400">{{ athlete.knockouts }}</span>
              </div>

              <div class="flex items-center justify-between p-4 bg-purple-600/10 border border-purple-600/30 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Icon
                      name="lucide:shield"
                      class="w-5 h-5 text-purple-400"
                    />
                  </div>
                  <span class="text-gray-300">Soumissions</span>
                </div>
                <span class="text-2xl font-bold text-purple-400">{{ athlete.submissions }}</span>
              </div>

              <div class="flex items-center justify-between p-4 bg-blue-600/10 border border-blue-600/30 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <Icon
                      name="lucide:percent"
                      class="w-5 h-5 text-blue-400"
                    />
                  </div>
                  <span class="text-gray-300">Finitions</span>
                </div>
                <span class="text-2xl font-bold text-blue-400">{{ finishRate }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <div class="flex items-center gap-2 mb-6">
            <Icon
              name="lucide:info"
              class="w-5 h-5 text-blue-400"
            />
            <h2 class="text-xl font-bold">
              Informations complémentaires
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <p class="text-sm text-gray-400 flex items-center gap-2">
                <Icon
                  name="lucide:weight"
                  class="w-4 h-4"
                />
                Catégorie de poids
              </p>
              <p class="text-lg font-semibold text-white">
                {{ athlete.weightClass }}
              </p>
            </div>

            <div class="space-y-2">
              <p class="text-sm text-gray-400 flex items-center gap-2">
                <Icon
                  name="lucide:activity"
                  class="w-4 h-4"
                />
                Statut
              </p>
              <p
                :class="[
                  'text-lg font-semibold',
                  athlete.status === 'Actif' ? 'text-green-400' :
                  athlete.status === 'Blessé' ? 'text-yellow-400' :
                  'text-gray-400'
                ]"
              >
                {{ athlete.status }}
              </p>
            </div>

            <div class="space-y-2">
              <p class="text-sm text-gray-400 flex items-center gap-2">
                <Icon
                  name="lucide:calendar"
                  class="w-4 h-4"
                />
                Disponibilité
              </p>
              <p class="text-lg font-semibold text-white">
                {{ athlete.inCompetition ? 'En compétition' : 'Disponible' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="flex justify-center pt-6">
          <NuxtLink
            to="/dashboard?tab=athletes"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white font-semibold transition-all"
          >
            <Icon
              name="lucide:arrow-left"
              class="w-5 h-5"
            />
            Retour aux athlètes
          </NuxtLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAthletesStore } from '~/stores/athletes'

const route = useRoute()
const athletesStore = useAthletesStore()

const athleteId = computed(() => route.params.id as string)

const athlete = computed(() => {
  return athletesStore.athletes.find(a => a.id === athleteId.value)
})

const breadcrumbItems = computed(() => [
  { label: 'Tableau de bord', to: '/dashboard?tab=athletes' },
  { label: 'Athlètes UFC' },
  { label: athlete.value?.name || 'Détails' }
])

const winRate = computed(() => {
  if (!athlete.value) return 0
  const total = athlete.value.record.wins + athlete.value.record.losses
  if (total === 0) return 0
  return Math.round((athlete.value.record.wins / total) * 100)
})

const finishRate = computed(() => {
  if (!athlete.value) return 0
  const total = athlete.value.knockouts + athlete.value.submissions
  const fights = athlete.value.record.wins + athlete.value.record.losses
  if (fights === 0) return 0
  return Math.round((total / fights) * 100)
})
</script>
