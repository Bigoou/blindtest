<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-6xl font-bold text-white mb-4">
          💃 BLIND TEST SUMMERCREDI🕺
        </h1>
        <p class="text-xl text-white/80 font-medium">Prêt à détruire les autres bolosses ?</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-12">
        <!-- Teams Grid -->
        <div class="grid lg:grid-cols-3 gap-8 items-center">
          <!-- Team 1 -->
          <div class="space-y-6">
            <div class="glass-white rounded-3xl p-8 shadow-2xl">
              <div class="flex items-center justify-center mb-6">
                <div 
                  class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  :style="{ backgroundColor: selectedColor1 }"
                >
                  1
                </div>
              </div>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Nom de l'équipe
                  </label>
                  <input
                    v-model="team1Input"
                    type="text"
                    placeholder="Équipe 1"
                    required
                    maxlength="20"
                    class="w-full px-4 py-3 text-lg text-center bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Couleur de l'équipe
                  </label>
                  <ColorPicker 
                    v-model="selectedColor1" 
                    :team-number="1"
                    :exclude-color="selectedColor2"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- VS Divider -->
          <div class="flex flex-col items-center space-y-4">
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
                <span class="text-white font-black text-2xl">VS</span>
              </div>
              <div class="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-30 animate-pulse-slow"></div>
            </div>
            <div class="hidden lg:block h-32 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          </div>

          <!-- Team 2 -->
          <div class="space-y-6">
            <div class="glass-white rounded-3xl p-8 shadow-2xl">
              <div class="flex items-center justify-center mb-6">
                <div 
                  class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  :style="{ backgroundColor: selectedColor2 }"
                >
                  2
                </div>
              </div>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Nom de l'équipe
                  </label>
                  <input
                    v-model="team2Input"
                    type="text"
                    placeholder="Équipe 2"
                    required
                    maxlength="20"
                    class="w-full px-4 py-3 text-lg text-center bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Couleur de l'équipe
                  </label>
                  <ColorPicker 
                    v-model="selectedColor2" 
                    :team-number="2"
                    :exclude-color="selectedColor1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Start Button -->
        <div class="text-center">
          <button
            type="submit"
            :disabled="!canStart"
            class="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-12 rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span class="text-2xl">🚀</span>
            <span>COMMENCER LE DUEL</span>
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
          
          <p v-if="!canStart" class="mt-4 text-white/70 text-sm">
            Remplissez les noms des deux équipes pour commencer
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useGameStore } from '../stores/game.js'
import ColorPicker from './ColorPicker.vue'

const gameStore = useGameStore()

const team1Input = ref('')
const team2Input = ref('')
const selectedColor1 = ref('#EF4444') // red-500
const selectedColor2 = ref('#10B981') // emerald-500

const canStart = computed(() => {
  return team1Input.value.trim() && team2Input.value.trim()
})

watch([selectedColor1, selectedColor2], ([color1, color2]) => {
  gameStore.setTeamColors(color1, color2)
})

function handleSubmit() {
  if (canStart.value) {
    gameStore.setTeamNames(team1Input.value, team2Input.value)
    gameStore.setTeamColors(selectedColor1.value, selectedColor2.value)
    gameStore.startGame()
  }
}

onMounted(() => {
  gameStore.loadFromStorage()
  if (gameStore.team1Name) {
    team1Input.value = gameStore.team1Name
  }
  if (gameStore.team2Name) {
    team2Input.value = gameStore.team2Name
  }
  if (gameStore.team1Color) {
    selectedColor1.value = gameStore.team1Color
  }
  if (gameStore.team2Color) {
    selectedColor2.value = gameStore.team2Color
  }
})
</script>