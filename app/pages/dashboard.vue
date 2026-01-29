<template>
  <div class="min-h-screen bg-linear-to-br from-black via-red-950/40 to-black text-white">
    <NavbarHeader />

    <main class="container mx-auto px-4 py-6">
      <BreadcrumbNav :items="breadcrumbItems" />

      <!-- Header avec info utilisateur -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">
            {{ $t('dashboard.welcome', { name: authStore.user?.name || $t('dashboard.manager') }) }} 👋
          </h1>
          <p class="text-gray-400">
            {{ $t('dashboard.subtitle') }}
          </p>
        </div>

        <!-- Profile chip -->
        <div
          v-if="authStore.user"
          class="flex items-center gap-3 bg-gray-900/70 border border-gray-800 rounded-full px-4 py-2 shadow-lg"
        >
          <div class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
            {{ initials }}
          </div>
          <div class="text-sm leading-tight">
            <p class="font-semibold">
              {{ authStore.user.name }}
            </p>
            <p class="text-gray-400 text-xs">
              {{ authStore.user.email }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex gap-4 mb-8 border-b border-gray-700 overflow-x-auto">
        <button
          v-for="item in navigationItems"
          :key="item.id"
          :class="[
            'pb-4 px-4 font-semibold transition flex items-center gap-2 whitespace-nowrap',
            activeTab === item.id
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-gray-400 hover:text-white'
          ]"
          @click="activeTab = item.id"
        >
          <Icon
            :name="`lucide:${item.icon}`"
            class="w-5 h-5"
          />
          {{ $t(item.i18nKey) }}
        </button>
      </div>

      <!-- Content with transitions -->
      <div class="animate-fade-in">
        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'">
          <Dashboard />
        </div>

        <!-- Fighters Tab -->
        <div v-if="activeTab === 'fighters'">
          <div class="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold mb-1">
                {{ $t('dashboard.fightersListTitle') }}
              </h2>
              <p class="text-gray-400 text-sm">
                {{ $t('dashboard.fightersListSubtitle') }}
              </p>
            </div>
            <button
              class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-semibold transition"
              @click="showAddModal = true"
            >
              + {{ $t('athlete.addFighter') }}
            </button>
          </div>
          <FightersList />
        </div>

        <!-- Athletes Tab -->
        <div v-if="activeTab === 'athletes'">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-1">
              {{ $t('dashboard.athletesTitle') }}
            </h2>
            <p class="text-gray-400 text-sm">
              {{ $t('dashboard.athletesSubtitle') }}
            </p>
          </div>
          <AthletesPage />
        </div>

        <!-- Profile Tab -->
        <div
          v-if="activeTab === 'profile' && authStore.user"
          class="max-w-6xl space-y-6"
        >
          <!-- Hero profile card -->
          <div class="rounded-3xl border border-red-800/40 bg-linear-to-br from-red-900/30 via-black to-gray-900/50 shadow-2xl shadow-red-900/40 overflow-hidden">
            <div class="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div class="relative">
                <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-red-600 to-red-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-red-900/40 ring-4 ring-red-900/30">
                  {{ initials }}
                </div>
                <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-green-600/90 text-white shadow">
                  Session active
                </span>
              </div>
              <div class="flex-1 space-y-3">
                <div class="flex items-center gap-3 flex-wrap">
                  <h2 class="text-3xl font-bold">
                    {{ authStore.user.name }}
                  </h2>
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-100 border border-red-600/50">
                    Manager UFC
                  </span>
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-600/15 text-emerald-200 border border-emerald-500/40 flex items-center gap-2">
                    <Icon
                      name="lucide:shield-check"
                      class="w-4 h-4"
                    />
                    Accès validé
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-3 text-gray-300 text-sm">
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/60 border border-gray-800">
                    <Icon
                      name="lucide:mail"
                      class="w-4 h-4"
                    />
                    {{ authStore.user.email }}
                  </span>
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/60 border border-gray-800">
                    <Icon
                      name="lucide:calendar"
                      class="w-4 h-4"
                    />
                    Session actuelle
                  </span>
                </div>
              </div>
              <div class="flex gap-3 w-full lg:w-auto justify-end">
                <button
                  v-if="!isEditingProfile"
                  class="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg hover:bg-gray-800 transition font-semibold"
                  @click="handleEditProfile"
                >
                  <Icon
                    name="lucide:edit"
                    class="w-4 h-4"
                  />
                  Modifier
                </button>
              </div>
            </div>
          </div>

          <!-- Quick stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 flex items-center justify-between shadow-lg shadow-black/30">
              <div>
                <p class="text-gray-400 text-sm">
                  {{ $t('dashboard.trackedFighters') }}
                </p>
                <p class="text-2xl font-bold">
                  {{ fightersCount }}
                </p>
              </div>
              <div class="p-3 rounded-xl bg-red-600/15 text-red-400">
                <Icon
                  name="lucide:users"
                  class="w-6 h-6"
                />
              </div>
            </div>
            <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 flex items-center justify-between shadow-lg shadow-black/30">
              <div>
                <p class="text-gray-400 text-sm">
                  Athlètes UFC
                </p>
                <p class="text-2xl font-bold">
                  {{ athletesCount }}
                </p>
              </div>
              <div class="p-3 rounded-xl bg-amber-600/15 text-amber-400">
                <Icon
                  name="lucide:trophy"
                  class="w-6 h-6"
                />
              </div>
            </div>
            <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 flex items-center justify-between shadow-lg shadow-black/30">
              <div>
                <p class="text-gray-400 text-sm">
                  {{ $t('athlete.removeFromFavorites') }}
                </p>
                <p class="text-2xl font-bold text-red-400">
                  {{ favoritesCount }}
                </p>
              </div>
              <div class="p-3 rounded-xl bg-red-600/15 text-red-400">
                <Icon
                  name="lucide:heart"
                  class="w-6 h-6"
                />
              </div>
            </div>
            <div class="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 flex items-center justify-between shadow-lg shadow-black/30">
              <div>
                <p class="text-gray-400 text-sm">
                  Statut
                </p>
                <p class="text-2xl font-bold text-emerald-400">
                  Actif
                </p>
              </div>
              <div class="p-3 rounded-xl bg-emerald-600/15 text-emerald-400">
                <Icon
                  name="lucide:activity"
                  class="w-6 h-6"
                />
              </div>
            </div>
          </div>

          <!-- Editable card with improved design -->
          <div class="rounded-2xl border border-gray-800/50 bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black/50 shadow-2xl shadow-black/30 overflow-hidden backdrop-blur-sm">
            <!-- Header with gradient -->
            <div class="relative px-6 py-5 border-b border-gray-800/50 bg-linear-to-r from-gray-900/60 to-gray-900/40">
              <div class="absolute inset-0 bg-linear-to-r from-red-600/5 to-transparent" />
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-linear-to-br from-red-600/20 to-red-900/20 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-900/20">
                    <Icon
                      name="lucide:user-circle"
                      class="w-6 h-6 text-red-400"
                    />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white flex items-center gap-2">
                      {{ $t('dashboard.personalInfo') }}
                      <span
                        v-if="!isEditingProfile"
                        class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-600/20 text-green-400 border border-green-500/30"
                      >
                        {{ $t('dashboard.verified') }}
                      </span>
                    </h3>
                    <p class="text-sm text-gray-400 mt-0.5">
                      {{ $t('dashboard.personalInfoDesc') }}
                    </p>
                  </div>
                </div>
                <button
                  v-if="!isEditingProfile"
                  class="flex items-center gap-2 px-4 py-2.5 border border-gray-700 hover:border-red-600/50 rounded-lg hover:bg-red-600/10 transition-all text-sm font-semibold text-gray-300 hover:text-white group"
                  @click="handleEditProfile"
                >
                  <Icon
                    name="lucide:edit-3"
                    class="w-4 h-4 group-hover:text-red-400 transition-colors"
                  />
                  {{ $t('common.edit') }}
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <!-- Edit Mode -->
              <form
                v-if="isEditingProfile"
                class="space-y-6"
                @submit.prevent="handleSaveProfile"
              >
                <!-- Info Banner -->
                <div class="rounded-xl border border-blue-900/30 bg-blue-950/20 p-4">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="lucide:info"
                        class="w-4 h-4 text-blue-400"
                      />
                    </div>
                    <div class="flex-1 space-y-1">
                      <p class="text-sm font-semibold text-blue-300">
                        Modification en cours
                      </p>
                      <p class="text-xs text-blue-400/80">
                        Les champs marqués d'un astérisque (*) sont obligatoires. Vos modifications seront enregistrées dans votre profil.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Form Fields with cards -->
                <div class="space-y-4">
                  <div class="rounded-xl border border-gray-800/50 bg-gray-900/30 p-5 hover:border-gray-700/50 transition-colors">
                    <Input
                      v-model="profileFormData.name"
                      :label="$t('dashboard.fullNameLabel')"
                      type="text"
                      :placeholder="$t('dashboard.fullNamePlaceholder')"
                      required
                      :error="profileErrors.name"
                      :success="profileFormData.name.length > 2 && !profileErrors.name"
                      :hint="$t('dashboard.fullNameHint')"
                    />
                  </div>

                  <div class="rounded-xl border border-gray-800/50 bg-gray-900/30 p-5 hover:border-gray-700/50 transition-colors">
                    <Input
                      v-model="profileFormData.email"
                      :label="$t('dashboard.emailLabel')"
                      type="email"
                      :placeholder="$t('dashboard.emailPlaceholder')"
                      required
                      :error="profileErrors.email"
                      :success="isValidEmail(profileFormData.email) && !profileErrors.email"
                      :hint="$t('dashboard.emailHint')"
                    />
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-800/50">
                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-700 hover:border-gray-600 rounded-lg hover:bg-gray-800 transition-all text-gray-300 hover:text-white font-medium order-2 sm:order-1"
                    @click="handleCancelEdit"
                  >
                    <Icon
                      name="lucide:x"
                      class="w-4 h-4"
                    />
                    {{ $t('common.cancel') }}
                  </button>
                  <button
                    type="submit"
                    :disabled="!isProfileFormValid"
                    class="flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-red-900/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-700 disabled:shadow-none order-1 sm:order-2"
                  >
                    <Icon
                      name="lucide:save"
                      class="w-4 h-4"
                    />
                    {{ $t('dashboard.saveChanges') }}
                  </button>
                </div>
              </form>

              <!-- View Mode -->
              <div
                v-else
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div class="rounded-xl border border-gray-800/50 bg-gray-900/30 p-5 hover:border-gray-700/50 transition-all group">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-lg bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 flex items-center justify-center group-hover:border-red-600/30 transition-colors">
                      <Icon
                        name="lucide:user"
                        class="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors"
                      />
                    </div>
                    <div class="flex-1">
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {{ $t('dashboard.fullNameLabel') }}
                      </p>
                      <p class="text-lg font-bold text-white mt-0.5">
                        {{ authStore.user.name }}
                      </p>
                    </div>
                  </div>
                  <div class="h-px bg-linear-to-r from-gray-800 via-gray-700 to-transparent" />
                </div>

                <div class="rounded-xl border border-gray-800/50 bg-gray-900/30 p-5 hover:border-gray-700/50 transition-all group">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-lg bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 flex items-center justify-center group-hover:border-red-600/30 transition-colors">
                      <Icon
                        name="lucide:mail"
                        class="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors"
                      />
                    </div>
                    <div class="flex-1">
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {{ $t('dashboard.emailLabel') }}
                      </p>
                      <p class="text-lg font-bold text-white mt-0.5 truncate">
                        {{ authStore.user.email }}
                      </p>
                    </div>
                  </div>
                  <div class="h-px bg-linear-to-r from-gray-800 via-gray-700 to-transparent" />
                </div>
              </div>

              <!-- Info Footer in view mode -->
              <div
                v-if="!isEditingProfile"
                class="mt-6 pt-6 border-t border-gray-800/50"
              >
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <div class="flex items-center gap-2">
                    <Icon
                      name="lucide:shield-check"
                      class="w-4 h-4 text-green-500"
                    />
                    <span>{{ $t('dashboard.profileSecured') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon
                      name="lucide:clock"
                      class="w-4 h-4"
                    />
                    <span>{{ $t('dashboard.lastModified') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Favorites Section -->
          <Card v-if="athletesStore.favoriteAthletes.length > 0">
            <CardHeader class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Icon
                  name="lucide:heart"
                  class="w-5 h-5 text-red-400"
                />
                <div>
                  <h3 class="text-xl font-semibold">
                    {{ $t('dashboard.myFavorites') }}
                  </h3>
                  <p class="text-gray-400 text-sm">
                    {{ $t('dashboard.myFavoritesSubtitle', { count: athletesStore.favoriteAthletes.length }) }}
                  </p>
                </div>
              </div>
              <button
                class="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition text-sm font-semibold"
                @click="activeTab = 'athletes'"
              >
                <Icon
                  name="lucide:plus"
                  class="w-4 h-4"
                />
                {{ $t('common.add') }}
              </button>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="athlete in athletesStore.favoriteAthletes"
                  :key="athlete.id"
                  class="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-red-600 transition cursor-pointer"
                  @click="activeTab = 'athletes'; athletesStore.setSelectedAthlete(athlete)"
                >
                  <div class="flex items-center gap-3 mb-3">
                    <div class="relative">
                      <img
                        :src="athlete.image"
                        :alt="athlete.name"
                        class="w-14 h-14 rounded-full object-cover border-2 border-red-600"
                      >
                      <button
                        class="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-gray-900 border-2 border-red-600 text-red-600 hover:scale-110 transition"
                        @click.stop="athletesStore.toggleFavorite(athlete.id)"
                      >
                        <Icon
                          name="lucide:heart"
                          class="fill-current w-3 h-3"
                        />
                      </button>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="font-bold text-white truncate">
                        {{ athlete.name }}
                      </h4>
                      <p class="text-sm text-gray-400 truncate">
                        {{ athlete.nickname }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-400">{{ $t('athlete.record') }}</span>
                    <span class="text-white font-semibold">
                      {{ athlete.record.wins }}-{{ athlete.record.losses }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-sm mt-1">
                    <span class="text-gray-400">{{ $t('athlete.knockouts') }}</span>
                    <span class="text-red-600 font-semibold">
                      {{ athlete.knockouts }}
                    </span>
                  </div>
                  <span class="mt-3 inline-block px-2 py-1 bg-red-600/20 text-red-600 rounded-full text-xs font-semibold">
                    {{ athlete.weightClass }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>

    <!-- Add Fighter Modal -->
    <AddFighterModal
      v-if="showAddModal"
      @close="showAddModal = false"
    />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { useFightersStore } from '~/stores/fighters'
import { useAthletesStore } from '~/stores/athletes'

const router = useRouter()
const route = useRoute()
const { t: $t } = useI18n()
const authStore = useAuthStore()
const fightersStore = useFightersStore()
const athletesStore = useAthletesStore()

const activeTab = ref('dashboard')

// Restaurer l'onglet depuis l'URL au montage
onMounted(() => {
  const tabFromQuery = route.query.tab as string
  if (tabFromQuery && ['dashboard', 'fighters', 'athletes', 'profile'].includes(tabFromQuery)) {
    activeTab.value = tabFromQuery
  }
})
const showAddModal = ref(false)
const isEditingProfile = ref(false)
const profileFormData = ref({ name: '', email: '' })
const profileErrors = ref({ name: '', email: '' })

const fightersCount = computed(() => fightersStore.fighters.length)
const athletesCount = computed(() => athletesStore.athletes.length)
const favoritesCount = computed(() => athletesStore.favoriteAthletes.length)

const navigationItems = [
  { id: 'dashboard', i18nKey: 'nav.dashboard', icon: 'bar-chart-3' },
  { id: 'fighters', i18nKey: 'athlete.fighters', icon: 'users' },
  { id: 'athletes', i18nKey: 'athlete.athletes', icon: 'trophy' },
  { id: 'profile', i18nKey: 'dashboard.profile', icon: 'user' }
]

const breadcrumbItems = computed(() => [
  { label: $t('nav.dashboard') }
])

const initials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateProfileForm = () => {
  profileErrors.value = { name: '', email: '' }
  let isValid = true

  if (!profileFormData.value.name || profileFormData.value.name.trim().length < 2) {
    profileErrors.value.name = $t('dashboard.nameError')
    isValid = false
  }

  if (!profileFormData.value.email || !isValidEmail(profileFormData.value.email)) {
    profileErrors.value.email = $t('dashboard.emailError')
    isValid = false
  }

  return isValid
}

const isProfileFormValid = computed(() => {
  return profileFormData.value.name.trim().length >= 2 && isValidEmail(profileFormData.value.email)
})

const handleEditProfile = () => {
  if (authStore.user) {
    profileFormData.value = {
      name: authStore.user.name,
      email: authStore.user.email
    }
    profileErrors.value = { name: '', email: '' }
    isEditingProfile.value = true
  }
}

const handleCancelEdit = () => {
  isEditingProfile.value = false
  profileFormData.value = { name: '', email: '' }
  profileErrors.value = { name: '', email: '' }
}

const handleSaveProfile = () => {
  if (validateProfileForm()) {
    // Update profile in store
    if (authStore.user) {
      authStore.user.name = profileFormData.value.name.trim()
      authStore.user.email = profileFormData.value.email.trim()
    }
    isEditingProfile.value = false
    profileErrors.value = { name: '', email: '' }
  }
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>
