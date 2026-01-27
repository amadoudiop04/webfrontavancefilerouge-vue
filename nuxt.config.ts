// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  components: {
    dirs: [
      // Only use app/components for Nuxt 4
      '~/components'
    ]
  },

  imports: {
    dirs: ['composables/**']
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-15',

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {}
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
