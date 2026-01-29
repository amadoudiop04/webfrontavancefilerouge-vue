<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click.self="close"
  >
    <div class="w-full max-w-2xl bg-linear-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl shadow-2xl shadow-red-900/20 overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-gray-800 bg-gray-900/40">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Icon
                name="lucide:edit"
                class="w-5 h-5 text-blue-400"
              />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">
                Modifier le combattant
              </h2>
              <p class="text-sm text-gray-400">
                Mettez à jour les informations de {{ fighter.name }}
              </p>
            </div>
          </div>
          <button
            class="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            @click="close"
          >
            <Icon
              name="lucide:x"
              class="w-5 h-5 text-gray-400"
            />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 py-6 max-h-[70vh] overflow-y-auto">
        <form
          class="space-y-6"
          @submit.prevent="submit"
        >
          <!-- Photo Upload Section -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-200">
              {{ $t('addFighterModal.fighterPhoto') }}
            </label>
            <div class="flex items-start gap-4">
              <div class="relative">
                <div
                  v-if="previewImage || form.image"
                  class="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-700 group"
                >
                  <img
                    :src="previewImage || form.image"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  >
                  <button
                    type="button"
                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    @click="removeImage"
                  >
                    <Icon
                      name="lucide:trash-2"
                      class="w-5 h-5 text-red-400"
                    />
                  </button>
                </div>
                <div
                  v-else
                  class="w-24 h-24 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center bg-gray-900/50"
                >
                  <Icon
                    name="lucide:user"
                    class="w-10 h-10 text-gray-600"
                  />
                </div>
              </div>
              <div class="flex-1">
                <label class="block">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileUpload"
                  >
                  <button
                    type="button"
                    class="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors inline-flex items-center gap-2"
                    @click="fileInput?.click()"
                  >
                    <Icon
                      name="lucide:upload"
                      class="w-4 h-4"
                    />
                    {{ $t('editFighterModal.changePhoto') }}
                  </button>
                </label>
                <p class="text-xs text-gray-400 mt-2">
                  {{ $t('addFighterModal.fileHint') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Basic Info Section -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Icon
                name="lucide:user"
                class="w-4 h-4 text-blue-400"
              />
              {{ $t('addFighterModal.basicInfo') }}
            </h3>
            <div class="space-y-4">
              <Input
                v-model="form.name"
                :label="$t('athlete.name')"
                :placeholder="$t('addFighterModal.nameExample')"
                required
                :hint="$t('addFighterModal.nameHint')"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-200">
                  {{ $t('athlete.weightClass') }} <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.weightClass"
                  required
                  class="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                >
                  <option value="">
                    {{ $t('addFighterModal.selectOption') }}
                  </option>
                  <option value="Poids mouche">
                    Poids mouche (57 kg)
                  </option>
                  <option value="Poids coq">
                    Poids coq (61 kg)
                  </option>
                  <option value="Poids plume">
                    Poids plume (66 kg)
                  </option>
                  <option value="Poids léger">
                    Poids léger (70 kg)
                  </option>
                  <option value="Poids welter">
                    Poids welter (77 kg)
                  </option>
                  <option value="Poids moyen">
                    Poids moyen (84 kg)
                  </option>
                  <option value="Poids lourd léger">
                    Poids lourd léger (93 kg)
                  </option>
                  <option value="Poids lourd">
                    Poids lourd (120 kg)
                  </option>
                </select>
                <p class="text-xs text-gray-400">
                  {{ $t('addFighterModal.weightHint') }}
                </p>
              </div>
              <Input
                v-model.number="form.ranking"
                :label="$t('athlete.ranking')"
                type="number"
                placeholder="Ex: 1"
                required
                :hint="$t('addFighterModal.rankingHint')"
                min="1"
              />
            </div>
          </div>

          <!-- Record Section -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Icon
                name="lucide:trophy"
                class="w-4 h-4 text-blue-400"
              />
              {{ $t('addFighterModal.record') }}
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <Input
                v-model.number="form.wins"
                :label="$t('athlete.wins')"
                type="number"
                placeholder="0"
                required
                min="0"
              />
              <Input
                v-model.number="form.losses"
                :label="$t('athlete.losses')"
                type="number"
                placeholder="0"
                required
                min="0"
              />
              <Input
                v-model.number="form.draws"
                :label="$t('athlete.draws')"
                type="number"
                placeholder="0"
                required
                min="0"
              />
            </div>
          </div>

          <!-- Stats Section -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Icon
                name="lucide:zap"
                class="w-4 h-4 text-blue-400"
              />
              {{ $t('addFighterModal.stats') }}
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <Input
                v-model.number="form.knockouts"
                :label="$t('addFighterModal.knockoutsLabel')"
                type="number"
                placeholder="0"
                required
                :hint="$t('addFighterModal.knockoutsHint')"
                min="0"
              />
              <Input
                v-model.number="form.submissions"
                :label="$t('addFighterModal.submissionsLabel')"
                type="number"
                placeholder="0"
                required
                :hint="$t('addFighterModal.submissionsHint')"
                min="0"
              />
            </div>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-800 bg-gray-900/40 flex items-center justify-end gap-3">
        <button
          type="button"
          class="px-5 py-2.5 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 font-medium"
          @click="close"
        >
          {{ $t('common.cancel') }}
        </button>
        <button
          type="button"
          class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/40 inline-flex items-center gap-2"
          @click="submit"
        >
          <Icon
            name="lucide:save"
            class="w-4 h-4"
          />
          {{ $t('editFighterModal.saveChanges') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAthletesStore } from '~/stores/athletes'
import type { Athlete } from '~/stores/athletes'

const props = defineProps<{
  fighter: Athlete
}>()

const emit = defineEmits<{
  close: []
}>()

const isOpen = ref(true)
const athletesStore = useAthletesStore()
const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string>('')

const form = ref({ ...props.fighter })

watch(() => props.fighter, (newFighter) => {
  form.value = { ...newFighter }
}, { deep: true })

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
      form.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  previewImage.value = ''
  form.value.image = undefined
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const submit = () => {
  if (!form.value.name || !form.value.weightClass) {
    alert('Veuillez remplir les champs obligatoires')
    return
  }

  const athlete = athletesStore.athletes.find(a => a.id === props.fighter.id)
  if (athlete) {
    Object.assign(athlete, form.value)
  }
  close()
}

const close = () => {
  isOpen.value = false
  emit('close')
}
</script>
