<template>
  <div
    class="min-h-screen bg-linear-to-br from-black via-red-950 to-black text-white flex flex-col overflow-hidden"
  >
    <!-- Background effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"
      />
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"
      />
    </div>

    <!-- Back to home button -->
    <div class="relative z-10 container mx-auto px-4 pt-6">
      <div class="flex justify-between items-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/40 border border-gray-700 rounded-lg hover:bg-gray-800/60 hover:border-gray-600 transition-all text-gray-300 hover:text-white"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-4 h-4"
          />
          <span class="text-sm font-medium">{{ $t('common.backHome') }}</span>
        </NuxtLink>

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Login Form -->
    <div class="relative z-10 flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div
          class="rounded-2xl border border-red-900/50 bg-linear-to-br from-gray-900/40 to-black/40 p-8 shadow-2xl shadow-red-900/40 backdrop-blur-xl"
        >
          <!-- Logo -->
          <div class="flex items-center justify-center mb-8">
            <div
              class="relative flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-red-600/40 via-red-700/30 to-red-900/40 border border-red-500/40 shadow-lg shadow-red-900/40"
            >
              <Icon
                name="lucide:zap"
                class="w-7 h-7 text-red-400"
              />
            </div>
          </div>

          <h1 class="text-3xl font-bold text-center mb-2">
            UFC Stats
          </h1>
          <p class="text-center text-gray-400 mb-8">
            {{ $t('auth.welcome') }}
          </p>

          <Form
            v-slot="{ errors }"
            :validation-schema="validationSchema"
            class="space-y-6"
            @submit="handleSubmit"
          >
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t('auth.email') }}</label>
              <Field
                v-slot="{ field, meta }"
                name="email"
              >
                <input
                  v-bind="field"
                  type="email"
                  :class="[
                    'w-full px-4 py-2 bg-gray-900/50 border rounded-lg focus:outline-none transition-colors',
                    meta.touched && errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-700 focus:border-red-600'
                  ]"
                  placeholder="vous [at] email.com"
                >
              </Field>
              <ErrorMessage
                name="email"
                class="text-red-400 text-sm mt-1 block"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t('auth.password') }}</label>
              <Field
                v-slot="{ field, meta }"
                name="password"
              >
                <div class="relative">
                  <input
                    v-bind="field"
                    :type="showPassword ? 'text' : 'password'"
                    :class="[
                      'w-full px-4 py-2 bg-gray-900/50 border rounded-lg focus:outline-none transition-colors pr-12',
                      meta.touched && errors.password
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-700 focus:border-red-600'
                    ]"
                    placeholder="••••••••"
                  >
                  <button
                    type="button"
                    class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                    :aria-label="
                      showPassword
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    "
                    @click="showPassword = !showPassword"
                  >
                    <Icon
                      :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
              </Field>
              <ErrorMessage
                name="password"
                class="text-red-400 text-sm mt-1 block"
              />
            </div>

            <!-- Name (for signup) -->
            <div v-if="isSignup">
              <label class="block text-sm font-medium mb-2">{{ $t('auth.fullName') }}</label>
              <Field
                v-slot="{ field, meta }"
                name="name"
              >
                <input
                  v-bind="field"
                  type="text"
                  :class="[
                    'w-full px-4 py-2 bg-gray-900/50 border rounded-lg focus:outline-none transition-colors',
                    meta.touched && errors.name
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-700 focus:border-red-600'
                  ]"
                  :placeholder="$t('auth.yourName')"
                >
              </Field>
              <ErrorMessage
                name="name"
                class="text-red-400 text-sm mt-1 block"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-red-700 disabled:to-red-600 text-white font-semibold py-3 rounded-lg transition transform hover:-translate-y-0.5 disabled:translate-y-0"
            >
              {{
                isLoading
                  ? $t('common.loading')
                  : isSignup
                    ? $t('auth.signUp')
                    : $t('auth.signIn')
              }}
            </button>

            <!-- Toggle Form -->
            <button
              type="button"
              class="w-full text-center text-gray-400 hover:text-white transition"
              @click="toggleForm"
            >
              <span v-if="isSignup">{{ $t('auth.alreadyHaveAccount') }}
                <span class="text-red-400">{{ $t('auth.signIn') }}</span></span>
              <span v-else>{{ $t('auth.noAccount') }}
                <span class="text-red-400">{{ $t('auth.signUp') }}</span></span>
            </button>
          </Form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()
const { t: $t } = useI18n()

const isSignup = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

// Schéma de validation dynamique
const validationSchema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .required($t('auth.emailRequired'))
      .email($t('auth.invalidEmail')),
    password: yup
      .string()
      .required($t('auth.passwordRequired'))
      .min(6, $t('auth.passwordMinLength'))
  }

  if (isSignup.value) {
    return yup.object({
      ...baseSchema,
      name: yup
        .string()
        .required($t('auth.nameRequired'))
        .min(2, $t('auth.nameMinLength'))
    })
  }

  return yup.object(baseSchema)
})

const toggleForm = () => {
  isSignup.value = !isSignup.value
}

const handleSubmit = async (values: { email: string, password: string, name?: string }) => {
  isLoading.value = true

  try {
    if (isSignup.value) {
      authStore.signup(values.email.trim(), values.password, values.name.trim())
    } else {
      authStore.login(values.email.trim(), values.password)
    }

    if (authStore.user) {
      router.push('/dashboard')
    }
  } catch (err) {
    console.error('Erreur de connexion:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
