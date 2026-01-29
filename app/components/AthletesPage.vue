<template>
  <div class="space-y-6">
    <!-- Optimized Filter Section -->
    <div class="bg-linear-to-r from-gray-900/40 via-black to-gray-900/40 border border-gray-800 rounded-xl p-4 sm:p-6 shadow-lg backdrop-blur-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Icon
            name="lucide:filter"
            class="w-5 h-5 text-red-600"
          />
          <h3 class="font-semibold text-white text-sm">
            {{ $t('common.filter') }}
          </h3>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="athletesStore.compareList.length === 2"
            class="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition"
            @click="showCompareModal = true"
          >
            <Icon
              name="lucide:git-compare"
              class="w-4 h-4"
            />
            {{ $t('athletesPage.compare', { count: athletesStore.compareList.length }) }}
          </button>
          <button
            v-if="athletesStore.compareList.length > 0"
            class="px-3 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition text-sm"
            title="Réinitialiser la sélection"
            @click="athletesStore.clearCompare()"
          >
            <Icon
              name="lucide:x"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>

      <div class="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <Icon
            name="lucide:search"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('athletesPage.searchPlaceholder')"
            class="w-full pl-10 pr-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
          >
        </div>

        <!-- Weight Class Filter -->
        <div class="flex gap-2 items-center">
          <div class="flex-1 relative">
            <Icon
              name="lucide:layers"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            />
            <select
              v-model="selectedWeightClass"
              class="w-full pl-10 pr-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="">
                {{ $t('athletesPage.allCategories') }}
              </option>
              <option>Poids plume</option>
              <option>Poids léger</option>
              <option>Poids welter</option>
              <option>Poids moyen</option>
              <option>Poids lourd léger</option>
              <option>Poids lourd</option>
            </select>
            <Icon
              name="lucide:chevron-down"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            />
          </div>
          <button
            v-if="searchQuery || selectedWeightClass"
            class="px-3 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition flex items-center gap-2 whitespace-nowrap"
            title="Réinitialiser les filtres"
            @click="clearFilters"
          >
            <Icon
              name="lucide:x"
              class="w-4 h-4"
            />
            <span class="hidden sm:inline text-sm">{{ $t('athletesPage.reset') }}</span>
          </button>
        </div>
      </div>

      <!-- Active Filters Display -->
      <div
        v-if="searchQuery || selectedWeightClass"
        class="mt-3 flex flex-wrap gap-2"
      >
        <span
          v-if="searchQuery"
          class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-red-600/20 text-red-200 border border-red-600/40"
        >
          <Icon
            name="lucide:search"
            class="w-3 h-3"
          />
          "{{ searchQuery }}"
        </span>
        <span
          v-if="selectedWeightClass"
          class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-200 border border-blue-600/40"
        >
          <Icon
            name="lucide:layers"
            class="w-3 h-3"
          />
          {{ selectedWeightClass }}
        </span>
      </div>
    </div>

    <div
      v-if="filteredAthletes.length === 0"
      class="text-center py-12 text-gray-400"
    >
      <Icon
        name="lucide:search-x"
        class="w-12 h-12 mx-auto mb-4 opacity-50"
      />
      <p>{{ $t('athletesPage.noAthletesFound', { search: searchQuery }) }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="athlete in filteredAthletes"
        :key="athlete.id"
        :class="[
          'transition hover:border-red-600 relative',
          athletesStore.selectedAthlete?.id === athlete.id ? 'ring-2 ring-red-600 border-red-600' : ''
        ]"
      >
        <div
          v-if="athlete.image"
          class="overflow-hidden rounded-t-lg h-64 bg-gray-800 relative"
        >
          <img
            :src="athlete.image"
            :alt="athlete.name"
            class="w-full h-full object-cover object-top cursor-pointer"
            @click="selectAthlete(athlete)"
          >
          <button
            class="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-gray-900/80 backdrop-blur-sm border-2 transition hover:scale-110 shadow-lg"
            :class="athletesStore.isFavorite(athlete.id) ? 'border-red-600 text-red-600' : 'border-gray-700 text-gray-400'"
            :title="athletesStore.isFavorite(athlete.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
            @click.stop="athletesStore.toggleFavorite(athlete.id)"
          >
            <Icon
              name="lucide:heart"
              :class="athletesStore.isFavorite(athlete.id) ? 'fill-current' : ''"
              class="w-5 h-5"
            />
          </button>
        </div>
        <CardContent>
          <div
            class="cursor-pointer"
            @click="selectAthlete(athlete)"
          >
            <h3 class="font-bold text-white text-lg">
              {{ athlete.name }}
            </h3>
            <p class="text-sm text-gray-400">
              {{ athlete.nickname }}
            </p>
            <p class="text-xs text-gray-500 mt-2">
              {{ athlete.weightClass }}
            </p>
            <div class="mt-4 space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">{{ $t('athlete.record') }}</span>
                <span class="text-white font-semibold">{{ athlete.record.wins }}-{{ athlete.record.losses }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ $t('athlete.knockouts') }}</span>
                <span class="text-red-600 font-semibold">{{ athlete.knockouts }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-800">
            <label class="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer transition">
              <input
                type="checkbox"
                :checked="athletesStore.isInCompare(athlete.id)"
                :disabled="athletesStore.compareList.length >= 2 && !athletesStore.isInCompare(athlete.id)"
                class="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900 disabled:opacity-50"
                @change="athletesStore.toggleCompare(athlete)"
              >
              <Icon
                name="lucide:git-compare"
                class="w-4 h-4"
              />
              <span>{{ $t('athletesPage.selectToCompare') }}</span>
            </label>
          </div>
          <NuxtLink
            :to="`/athlete/${athlete.id}`"
            class="mt-4 w-full px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            <Icon
              name="lucide:eye"
              class="w-4 h-4"
            />
            {{ $t('athlete.viewProfile') }}
          </NuxtLink>
        </CardContent>
      </Card>
    </div>

    <!-- Detail Panel -->
    <div
      v-if="athletesStore.selectedAthlete"
      ref="detailSection"
      class="mt-8 pt-8 border-t border-gray-700"
    >
      <Card>
        <CardHeader>
          <div class="flex items-center gap-4">
            <img
              v-if="athletesStore.selectedAthlete.image"
              :src="athletesStore.selectedAthlete.image"
              :alt="athletesStore.selectedAthlete.name"
              class="w-20 h-20 rounded-full object-cover"
            >
            <div>
              <h2 class="text-2xl font-bold text-white">
                {{ athletesStore.selectedAthlete.name }}
              </h2>
              <p class="text-gray-400">
                {{ athletesStore.selectedAthlete.nickname }}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.country') }}
              </div>
              <div class="text-white font-semibold">
                {{ athletesStore.selectedAthlete.country }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.weightClass') }}
              </div>
              <div class="text-white font-semibold">
                {{ athletesStore.selectedAthlete.weightClass }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.height') }}
              </div>
              <div class="text-white font-semibold">
                {{ athletesStore.selectedAthlete.height }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.age') }}
              </div>
              <div class="text-white font-semibold">
                {{ athletesStore.selectedAthlete.age }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.wins') }}
              </div>
              <div class="text-green-600 font-semibold">
                {{ athletesStore.selectedAthlete.record.wins }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.losses') }}
              </div>
              <div class="text-red-600 font-semibold">
                {{ athletesStore.selectedAthlete.record.losses }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.knockouts') }}
              </div>
              <div class="text-yellow-600 font-semibold">
                {{ athletesStore.selectedAthlete.knockouts }}
              </div>
            </div>
            <div>
              <div class="text-gray-400 text-sm">
                {{ $t('athlete.submissions') }}
              </div>
              <div class="text-purple-600 font-semibold">
                {{ athletesStore.selectedAthlete.submissions }}
              </div>
            </div>
          </div>
          <button
            class="mt-6 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-semibold transition"
            @click="deselectAthlete"
          >
            {{ $t('athletesPage.closeDetails') }}
          </button>
        </CardContent>
      </Card>
    </div>

    <!-- Comparison Modal -->
    <Teleport to="body">
      <div
        v-if="showCompareModal && athletesStore.compareList.length === 2"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="showCompareModal = false"
      >
        <div class="bg-gray-900 border border-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div class="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <Icon
                name="lucide:git-compare"
                class="w-6 h-6 text-blue-600"
              />
              <h2 class="text-2xl font-bold text-white">
                {{ $t('athletesPage.compareTitle') }}
              </h2>
            </div>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition"
              title="Fermer"
              @click="showCompareModal = false"
            >
              <Icon
                name="lucide:x"
                class="w-5 h-5"
              />
            </button>
          </div>

          <div class="p-6 grid md:grid-cols-2 gap-6">
            <!-- Fighter 1 -->
            <div class="space-y-4">
              <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div class="flex flex-col items-center">
                  <img
                    :src="athletesStore.compareList[0]?.image"
                    :alt="athletesStore.compareList[0]?.name"
                    class="w-32 h-32 rounded-full object-cover border-4 border-red-600 shadow-lg"
                  >
                  <h3 class="mt-4 text-2xl font-bold text-white text-center">
                    {{ athletesStore.compareList[0]?.name }}
                  </h3>
                  <p class="text-gray-400 text-center">
                    {{ athletesStore.compareList[0]?.nickname }}
                  </p>
                  <span class="mt-2 px-3 py-1 bg-red-600/20 text-red-600 rounded-full text-sm font-semibold">
                    {{ athletesStore.compareList[0]?.weightClass }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div class="text-gray-400 text-sm mb-1">
                    Record
                  </div>
                  <div class="text-white text-2xl font-bold">
                    {{ athletesStore.compareList[0]?.record.wins }}-{{ athletesStore.compareList[0]?.record.losses }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Victoires
                    </div>
                    <div class="text-green-600 text-xl font-bold">
                      {{ athletesStore.compareList[0]?.record.wins }}
                    </div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Défaites
                    </div>
                    <div class="text-red-600 text-xl font-bold">
                      {{ athletesStore.compareList[0]?.record.losses }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      KOs
                    </div>
                    <div class="text-yellow-600 text-xl font-bold">
                      {{ athletesStore.compareList[0]?.knockouts }}
                    </div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Soumissions
                    </div>
                    <div class="text-purple-600 text-xl font-bold">
                      {{ athletesStore.compareList[0]?.submissions }}
                    </div>
                  </div>
                </div>

                <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div class="text-gray-400 text-sm mb-1">
                    Taux de victoire
                  </div>
                  <div class="text-blue-600 text-xl font-bold">
                    {{ ((athletesStore.compareList[0]?.record.wins ?? 0) / ((athletesStore.compareList[0]?.record.wins ?? 0) + (athletesStore.compareList[0]?.record.losses ?? 0)) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </div>

            <!-- Fighter 2 -->
            <div class="space-y-4">
              <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div class="flex flex-col items-center">
                  <img
                    :src="athletesStore.compareList[1]?.image"
                    :alt="athletesStore.compareList[1]?.name"
                    class="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                  >
                  <h3 class="mt-4 text-2xl font-bold text-white text-center">
                    {{ athletesStore.compareList[1]?.name }}
                  </h3>
                  <p class="text-gray-400 text-center">
                    {{ athletesStore.compareList[1]?.nickname }}
                  </p>
                  <span class="mt-2 px-3 py-1 bg-blue-600/20 text-blue-600 rounded-full text-sm font-semibold">
                    {{ athletesStore.compareList[1]?.weightClass }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div class="text-gray-400 text-sm mb-1">
                    Record
                  </div>
                  <div class="text-white text-2xl font-bold">
                    {{ athletesStore.compareList[1]?.record.wins }}-{{ athletesStore.compareList[1]?.record.losses }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Victoires
                    </div>
                    <div class="text-green-600 text-xl font-bold">
                      {{ athletesStore.compareList[1]?.record.wins }}
                    </div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Défaites
                    </div>
                    <div class="text-red-600 text-xl font-bold">
                      {{ athletesStore.compareList[1]?.record.losses }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      KOs
                    </div>
                    <div class="text-yellow-600 text-xl font-bold">
                      {{ athletesStore.compareList[1]?.knockouts }}
                    </div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div class="text-gray-400 text-sm mb-1">
                      Soumissions
                    </div>
                    <div class="text-purple-600 text-xl font-bold">
                      {{ athletesStore.compareList[1]?.submissions }}
                    </div>
                  </div>
                </div>

                <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div class="text-gray-400 text-sm mb-1">
                    Taux de victoire
                  </div>
                  <div class="text-blue-600 text-xl font-bold">
                    {{ ((athletesStore.compareList[1]?.record.wins ?? 0) / ((athletesStore.compareList[1]?.record.wins ?? 0) + (athletesStore.compareList[1]?.record.losses ?? 0)) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-6">
            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-semibold transition"
                @click="athletesStore.clearCompare(); showCompareModal = false"
              >
                {{ $t('athletesPage.reset') }}
              </button>
              <button
                class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                @click="showCompareModal = false"
              >
                {{ $t('common.back') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAthletesStore } from '~/stores/athletes'

const athletesStore = useAthletesStore()
const searchQuery = ref('')
const selectedWeightClass = ref('')
const showCompareModal = ref(false)

const filteredAthletes = computed(() => {
  return athletesStore.searchAthletes(searchQuery.value, selectedWeightClass.value || undefined)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedWeightClass.value = ''
}
</script>
