<template>
  <footer class="relative z-10 bg-linear-to-br from-black via-gray-900 to-black border-t border-gray-800">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-red-600/40 via-red-700/30 to-red-900/40 border border-red-500/40 shadow-lg shadow-red-900/40">
              <Icon
                name="lucide:zap"
                class="w-5 h-5 text-white"
              />
            </div>
            <span class="text-xl font-bold tracking-tight text-white">
              UFC Stats
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ $t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all group"
              aria-label="Facebook"
            >
              <Icon
                name="lucide:facebook"
                class="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors"
              />
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all group"
              aria-label="Twitter"
            >
              <Icon
                name="lucide:twitter"
                class="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors"
              />
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all group"
              aria-label="Instagram"
            >
              <Icon
                name="lucide:instagram"
                class="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors"
              />
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all group"
              aria-label="YouTube"
            >
              <Icon
                name="lucide:youtube"
                class="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">
            {{ $t('footer.navigation') }}
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <Icon
                  name="lucide:home"
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                />
                {{ $t('common.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/dashboard"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <Icon
                  name="lucide:layout-dashboard"
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                />
                {{ $t('nav.dashboard') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/login"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <Icon
                  name="lucide:log-in"
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                />
                {{ $t('nav.login') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-white font-semibold mb-4">
            {{ $t('footer.features') }}
          </h3>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:bar-chart-3"
                  class="w-4 h-4"
                />
                {{ $t('nav.statistics') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:users"
                  class="w-4 h-4"
                />
                {{ $t('athlete.fighters') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:trophy"
                  class="w-4 h-4"
                />
                {{ $t('athlete.ranking') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:heart"
                  class="w-4 h-4"
                />
                {{ $t('nav.favorites') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact & Legal -->
        <div>
          <h3 class="text-white font-semibold mb-4">
            {{ $t('footer.information') }}
          </h3>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:mail"
                  class="w-4 h-4"
                />
                {{ $t('footer.contact') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:shield"
                  class="w-4 h-4"
                />
                {{ $t('footer.privacy') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:file-text"
                  class="w-4 h-4"
                />
                {{ $t('footer.terms') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-red-400 transition-colors text-sm inline-flex items-center gap-2"
              >
                <Icon
                  name="lucide:help-circle"
                  class="w-4 h-4"
                />
                {{ $t('footer.support') }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} {{ $t('footer.copyright') }}
          </p>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <Icon
              name="lucide:code"
              class="w-4 h-4"
            />
            <span>{{ $t('footer.developedWith') }}</span>
            <Icon
              name="lucide:heart"
              class="w-4 h-4 text-red-500 fill-current"
            />
            <span>{{ $t('footer.and') }} Vue.js</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'AppFooter'
})

const currentYear = computed(() => new Date().getFullYear())
</script>
