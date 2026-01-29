<template>
  <div class="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
    <!-- Navigation Header -->
    <NavbarHeader />

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Breadcrumb / Back Button -->
      <div class="mb-6 flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-red-600/50 hover:bg-red-600/10 text-gray-300 hover:text-red-400 transition-all duration-200"
          @click="handleBack"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-4 h-4"
          />
          <span>Retour</span>
        </button>
      </div>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Icon
            name="lucide:message-square"
            class="w-8 h-8 text-red-500"
          />
          Forum UFC
        </h1>
        <p class="text-gray-400">
          Partagez vos opinions et discutez avec la communauté
        </p>
      </div>

      <!-- Create Post Section -->
      <CreatePost />

      <!-- Posts Feed -->
      <div class="space-y-6 mt-6">
        <PostCard
          v-for="post in forumStore.sortedPosts"
          :key="post.id"
          :post="post"
        />

        <!-- Empty State -->
        <div
          v-if="forumStore.sortedPosts.length === 0"
          class="text-center py-16"
        >
          <Icon
            name="lucide:message-circle"
            class="w-16 h-16 text-gray-700 mx-auto mb-4"
          />
          <p class="text-gray-400 text-lg">
            {{ $t('forum.noPostsYet') }}
          </p>
          <p class="text-gray-500 text-sm">
            {{ $t('forum.firstToShare') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useForumStore } from '~/stores/forum'
import { useRouter } from 'vue-router'

const router = useRouter()
const forumStore = useForumStore()

const handleBack = () => {
  // Si on vient du dashboard, retourner au dashboard
  if (window.history.length > 1) {
    router.back()
  } else {
    // Sinon, aller à l'accueil
    router.push('/')
  }
}
</script>
