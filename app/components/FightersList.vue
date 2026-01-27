<template>
  <div class="space-y-6">
    <div
      v-if="fightersStore.fighters.length === 0"
      class="text-center py-12 text-gray-400"
    >
      <Icon
        name="lucide:users"
        class="w-12 h-12 mx-auto mb-4 opacity-50"
      />
      <p>Aucun combattant ajouté pour le moment.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="fighter in fightersStore.fighters"
        :key="fighter.id"
        class="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden hover:border-red-600/50 transition-all group"
      >
        <div
          v-if="fighter.image"
          class="overflow-hidden h-64 bg-gray-800 relative"
        >
          <img
            :src="fighter.image"
            :alt="fighter.name"
            class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          >
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-red-600 text-white shadow-lg">
              #{{ fighter.ranking }}
            </span>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-xl font-bold mb-1 text-white">
            {{ fighter.name }}
          </h3>
          <p v-if="fighter.weight" class="text-sm text-gray-400 mb-4">
            {{ fighter.weight }}
          </p>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-400">Record</span>
              <span class="font-semibold text-white">
                {{ fighter.wins }}-{{ fighter.losses }}-{{ fighter.draws }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-gray-800/50 rounded-lg p-2 text-center">
                <p class="text-xs text-gray-400">K.O.</p>
                <p class="text-lg font-bold text-yellow-400">{{ fighter.knockouts }}</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-2 text-center">
                <p class="text-xs text-gray-400">Soumissions</p>
                <p class="text-lg font-bold text-purple-400">{{ fighter.submissions }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button
              class="flex-1 px-3 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2 text-white"
              @click="handleEdit(fighter)"
            >
              <Icon
                name="lucide:edit"
                class="w-4 h-4"
              />
              Modifier
            </button>
            <button
              class="px-3 py-2.5 bg-red-600/20 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white rounded-lg transition text-sm font-semibold"
              @click="handleDelete(fighter.id)"
            >
              <Icon
                name="lucide:trash-2"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <EditFighterModal
      v-if="showEditModal && selectedFighter"
      :fighter="selectedFighter"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFightersStore } from '~/stores/fighters'
import type { Fighter } from '~/stores/fighters'

const fightersStore = useFightersStore()
const showEditModal = ref(false)
const selectedFighter = ref<Fighter | null>(null)

const handleEdit = (fighter: Fighter) => {
  selectedFighter.value = fighter
  showEditModal.value = true
}

const handleDelete = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce combattant ?')) {
    fightersStore.removeFighter(id)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedFighter.value = null
}
</script>
