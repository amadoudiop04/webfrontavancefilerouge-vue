<template>
  <!-- Only show if user is authenticated -->
  <div
    v-if="authStore.isAuthenticated"
    class="bg-linear-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl p-6 shadow-xl shadow-red-900/10"
  >
    <div class="flex items-start gap-4">
      <!-- User Avatar -->
      <div class="shrink-0">
        <img
          :src="userAvatar"
          :alt="userName"
          class="w-12 h-12 rounded-full border-2 border-gray-700"
        >
      </div>

      <!-- Post Form -->
      <div class="flex-1 space-y-4">
        <textarea
          v-model="postContent"
          :placeholder="$t('forum.writeThoughts')"
          rows="3"
          class="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
        />

        <!-- Image Preview -->
        <div
          v-if="previewImage"
          class="relative"
        >
          <img
            :src="previewImage"
            alt="Preview"
            class="max-h-64 rounded-lg border border-gray-700"
          >
          <button
            type="button"
            class="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black rounded-lg transition-colors"
            @click="removeImage"
          >
            <Icon
              name="lucide:x"
              class="w-4 h-4 text-white"
            />
          </button>
        </div>

        <!-- Emoji Picker -->
        <div
          v-if="showEmojiPicker"
          class="bg-gray-800 border border-gray-700 rounded-lg p-3"
        >
          <div class="grid grid-cols-8 gap-2">
            <button
              v-for="emoji in popularEmojis"
              :key="emoji"
              type="button"
              class="text-2xl hover:scale-125 transition-transform"
              @click="addEmoji(emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- Upload Image -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            >
            <button
              type="button"
              class="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
              @click="fileInput?.click()"
            >
              <Icon
                name="lucide:image"
                class="w-5 h-5"
              />
            </button>

            <!-- Emoji Picker Toggle -->
            <button
              type="button"
              class="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
              @click="showEmojiPicker = !showEmojiPicker"
            >
              <Icon
                name="lucide:smile"
                class="w-5 h-5"
              />
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            :disabled="!canPost"
            class="px-6 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg shadow-red-900/40 inline-flex items-center gap-2"
            @click="submitPost"
          >
            <Icon
              name="lucide:send"
              class="w-4 h-4"
            />
            Publier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForumStore } from '~/stores/forum'
import { useAuthStore } from '~/stores/auth'

const forumStore = useForumStore()
const authStore = useAuthStore()

const postContent = ref('')
const previewImage = ref('')
const showEmojiPicker = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const popularEmojis = ['😀', '😂', '😍', '🔥', '👍', '❤️', '🥊', '💪', '🏆', '⚡', '🎯', '👏', '🙌', '💯', '✨', '🎉']

const userName = computed(() => authStore.user?.name || 'Utilisateur')
const userAvatar = computed(() => `https://i.pravatar.cc/150?u=${authStore.user?.email || 'default'}`)

const canPost = computed(() => postContent.value.trim().length > 0)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 5MB)')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  previewImage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const addEmoji = (emoji: string) => {
  postContent.value += emoji
  showEmojiPicker.value = false
}

const submitPost = () => {
  if (!canPost.value) return

  forumStore.addPost({
    userId: authStore.user?.email || 'anonymous',
    userName: userName.value,
    userAvatar: userAvatar.value,
    content: postContent.value,
    image: previewImage.value || undefined
  })

  // Reset form
  postContent.value = ''
  previewImage.value = ''
  showEmojiPicker.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
