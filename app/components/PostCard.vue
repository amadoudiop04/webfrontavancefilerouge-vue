<template>
  <div class="bg-linear-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl overflow-hidden shadow-xl shadow-red-900/10">
    <!-- Post Header -->
    <div class="p-6 pb-4">
      <div class="flex items-start justify-between">
        <div class="flex items-start gap-3">
          <img
            :src="post.userAvatar"
            :alt="post.userName"
            class="w-12 h-12 rounded-full border-2 border-gray-700"
          >
          <div>
            <h3 class="font-semibold text-white">
              {{ post.userName }}
            </h3>
            <p class="text-sm text-gray-400">
              {{ formatDate(post.createdAt) }}
            </p>
          </div>
        </div>

        <!-- Delete Button (only for own posts or admin) -->
        <button
          v-if="canDelete"
          type="button"
          class="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
          @click="handleDelete"
        >
          <Icon
            name="lucide:trash-2"
            class="w-4 h-4"
          />
        </button>
      </div>
    </div>

    <!-- Post Content -->
    <div class="px-6 pb-4">
      <p class="text-gray-200 whitespace-pre-wrap">
        {{ post.content }}
      </p>
    </div>

    <!-- Post Image -->
    <div
      v-if="post.image"
      class="px-6 pb-4"
    >
      <img
        :src="post.image"
        alt="Post image"
        class="w-full rounded-lg border border-gray-700"
      >
    </div>

    <!-- Post Actions -->
    <div class="px-6 py-4 border-t border-gray-800 flex items-center gap-6">
      <!-- Like Button -->
      <button
        v-if="authStore.isAuthenticated"
        type="button"
        class="flex items-center gap-2 hover:text-red-400 transition-colors"
        :class="isLiked ? 'text-red-500' : 'text-gray-400'"
        @click="handleLike"
      >
        <Icon
          :name="isLiked ? 'lucide:heart' : 'lucide:heart'"
          :class="isLiked ? 'fill-current' : ''"
          class="w-5 h-5"
        />
        <span class="text-sm font-medium">{{ post.likes.length }}</span>
      </button>
      <!-- Like count only for non-authenticated users -->
      <div
        v-else
        class="flex items-center gap-2 text-gray-400"
      >
        <Icon
          name="lucide:heart"
          class="w-5 h-5"
        />
        <span class="text-sm font-medium">{{ post.likes.length }}</span>
      </div>

      <!-- Comment Button -->
      <button
        type="button"
        class="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
        @click="showComments = !showComments"
      >
        <Icon
          name="lucide:message-circle"
          class="w-5 h-5"
        />
        <span class="text-sm font-medium">{{ post.comments.length }}</span>
      </button>

      <!-- Share Button -->
      <button
        type="button"
        class="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ml-auto"
        @click="handleShare"
      >
        <Icon
          name="lucide:share-2"
          class="w-5 h-5"
        />
      </button>
    </div>

    <!-- Comments Section -->
    <div
      v-if="showComments"
      class="border-t border-gray-800 bg-gray-900/50"
    >
      <!-- Comments List -->
      <div
        v-if="post.comments.length > 0"
        class="px-6 py-4 space-y-4 max-h-96 overflow-y-auto"
      >
        <div
          v-for="comment in post.comments"
          :key="comment.id"
          class="flex items-start gap-3"
        >
          <img
            :src="comment.userAvatar"
            :alt="comment.userName"
            class="w-8 h-8 rounded-full border border-gray-700"
          >
          <div class="flex-1 bg-gray-800/60 rounded-lg p-3">
            <div class="flex items-center justify-between mb-1">
              <h4 class="text-sm font-semibold text-white">
                {{ comment.userName }}
              </h4>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">
                  {{ formatDate(comment.createdAt) }}
                </span>
                <button
                  v-if="canDeleteComment(comment.userId)"
                  type="button"
                  class="p-1 hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-red-400"
                  @click="handleDeleteComment(comment.id)"
                >
                  <Icon
                    name="lucide:trash-2"
                    class="w-3 h-3"
                  />
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-300">
              {{ comment.content }}
            </p>
          </div>
        </div>
      </div>

      <!-- Add Comment -->
      <div
        v-if="authStore.isAuthenticated"
        class="px-6 py-4 border-t border-gray-800"
      >
        <!-- Emoji Picker for comments -->
        <div
          v-if="showCommentEmojiPicker"
          class="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-3"
        >
          <div class="grid grid-cols-8 gap-2">
            <button
              v-for="emoji in popularEmojis"
              :key="emoji"
              type="button"
              class="text-xl hover:scale-125 transition-transform"
              @click="addEmojiToComment(emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <img
            :src="userAvatar"
            :alt="userName"
            class="w-8 h-8 rounded-full border border-gray-700"
          >
          <div class="flex-1 space-y-2">
            <div class="flex gap-2">
              <input
                v-model="newComment"
                type="text"
                :placeholder="$t('forum.writeComment')"
                class="flex-1 px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                @keydown.enter="submitComment"
              >
              <button
                type="button"
                class="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                @click="showCommentEmojiPicker = !showCommentEmojiPicker"
              >
                <Icon
                  name="lucide:smile"
                  class="w-4 h-4"
                />
              </button>
              <button
                type="button"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all text-sm"
                @click="submitComment"
              >
                <Icon
                  name="lucide:send"
                  class="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Login prompt for non-authenticated users -->
      <div
        v-else
        class="px-6 py-4 border-t border-gray-800"
      >
        <div class="text-center">
          <p class="text-gray-400 text-sm mb-3">
            Connectez-vous pour commenter ce post
          </p>
          <NuxtLink
            to="/login"
            class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all text-sm"
          >
            <Icon
              name="lucide:log-in"
              class="w-4 h-4"
            />
            {{ $t('forum.login') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForumStore } from '~/stores/forum'
import { useAuthStore } from '~/stores/auth'
import { useI18n } from 'vue-i18n'
import type { Post } from '~/stores/forum'

const props = defineProps<{
  post: Post
}>()

const forumStore = useForumStore()
const authStore = useAuthStore()
const { t: $t, locale: $i18n } = useI18n()

const showComments = ref(false)
const newComment = ref('')
const showCommentEmojiPicker = ref(false)

const popularEmojis = ['😀', '😂', '😍', '🔥', '👍', '❤️', '🥊', '💪', '🏆', '⚡', '🎯', '👏', '🙌', '💯', '✨', '🎉']

const userName = computed(() => authStore.user?.name || 'Utilisateur')
const userAvatar = computed(() => `https://i.pravatar.cc/150?u=${authStore.user?.email || 'default'}`)
const userId = computed(() => authStore.user?.email || 'anonymous')

const isLiked = computed(() => props.post.likes.includes(userId.value))
const canDelete = computed(() =>
  props.post.userId === userId.value || authStore.user?.isAdmin
)

const canDeleteComment = (commentUserId: string) => {
  return commentUserId === userId.value || authStore.user?.isAdmin
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return $t('forum.justNow')
  if (diffInMinutes < 60) return $t('forum.minutesAgo', { count: diffInMinutes })
  if (diffInHours < 24) return $t('forum.hoursAgo', { count: diffInHours })
  if (diffInDays < 7) return $t('forum.daysAgo', { count: diffInDays })

  return date.toLocaleDateString($i18n.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const handleLike = () => {
  forumStore.toggleLike(props.post.id, userId.value)
}

const handleDelete = () => {
  if (confirm($t('forum.confirmDeletePost'))) {
    forumStore.deletePost(props.post.id)
  }
}

const addEmojiToComment = (emoji: string) => {
  newComment.value += emoji
  showCommentEmojiPicker.value = false
}

const submitComment = () => {
  if (!newComment.value.trim()) return

  forumStore.addComment(props.post.id, {
    userId: userId.value,
    userName: userName.value,
    userAvatar: userAvatar.value,
    content: newComment.value
  })

  newComment.value = ''
  showCommentEmojiPicker.value = false
}

const handleDeleteComment = (commentId: string) => {
  if (confirm($t('forum.confirmDeleteComment'))) {
    forumStore.deleteComment(props.post.id, commentId)
  }
}

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: `Post de ${props.post.userName}`,
      text: props.post.content
    }).catch(() => {
      // User cancelled share
    })
  } else {
    alert('Fonction de partage non disponible')
  }
}
</script>
