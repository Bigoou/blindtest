<template>
  <div 
    class="min-h-screen relative overflow-hidden"
    :style="{
      background: `linear-gradient(to bottom right, ${gameStore.team1Color}88 0%, ${gameStore.team2Color}88 100%)`
    }"
  >
    <!-- Animated background elements -->
    <div 
      class="absolute inset-0 animate-pulse-slow rounded-full blur-2xl"
      :style="{
        background: `linear-gradient(45deg, ${gameStore.team1Color}20 0%, ${gameStore.team2Color}20 100%)`
      }"
    ></div>
    <div 
      class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-float"
      :style="{
        background: `linear-gradient(to right, ${gameStore.team1Color}40, ${gameStore.team1Color}20)`
      }"
    ></div>
    <div 
      class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float" 
      style="animation-delay: -3s;"
      :style="{
        background: `linear-gradient(to right, ${gameStore.team2Color}40, ${gameStore.team2Color}20)`
      }"
    ></div>
    <!-- Header -->
    <header class="relative z-50 bg-white/20 backdrop-blur-xl border-b border-white/20 sticky top-0 shadow-xl">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-3xl font-bold text-white drop-shadow-lg">💃 BLIND TEST SUMMERCREDI</h1>
        </div>
        
        <div class="flex items-center space-x-3">
          <!-- <button
            @click="testGif"
            class="inline-flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-purple-500/25"
          >
            <span>🎬</span>
            <span class="hidden sm:inline">Test GIF</span>
          </button> -->
          
          <button
            @click="resetScores"
            class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-amber-500/25"
          >
            <span>🔄</span>
            <span class="hidden sm:inline">Reset</span>
          </button>
          
          <button
            @click="newGame"
            class="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-red-500/25"
          >
            <span>🏠</span>
            <span class="hidden sm:inline">Nouveau</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center min-h-[calc(100vh-200px)]">
      <div class="grid lg:grid-cols-3 gap-8 items-center w-full">
        <!-- Team 1 -->
        <div class="space-y-6">
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
            <!-- Team Header -->
            <div class="flex items-center space-x-4 mb-8">
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                :style="{ backgroundColor: gameStore.team1Color }"
              >
                1
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ gameStore.team1Name }}</h2>
                <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Équipe</p>
              </div>
            </div>

            <!-- Score Display -->
            <div class="text-center space-y-6">
              <div 
                class="text-8xl font-black leading-none"
                :style="{ color: gameStore.team1Color }"
              >
                {{ gameStore.team1Score }}
              </div>
              
              <!-- Controls -->
              <div class="flex items-center justify-center space-x-4">
                <button
                  @click="handleRemovePoint(1)"
                  :disabled="gameStore.team1Score <= 0"
                  class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-200 hover:scale-110 disabled:hover:scale-100 border-2 border-white/20"
                >
                  −
                </button>
                
                <button
                  @click="handleAddPoint(1)"
                  class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-green-500/50 transition-all duration-200 hover:scale-110 border-2 border-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- VS Section -->
        <div class="flex flex-col items-center space-y-8">
          <!-- VS Circle -->
          <div class="relative">
            <div class="w-36 h-36 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 hover:scale-110 transition-transform duration-300">
              <div class="text-white font-black text-4xl drop-shadow-lg">VS</div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-full blur-md animate-pulse-slow opacity-50"></div>
          </div>

          <!-- Match Status -->
          <div class="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 min-w-[280px] hover:shadow-2xl">
            <div v-if="gameStore.leader" class="text-center space-y-3">
              <div class="text-3xl">👑</div>
              <div class="font-bold text-gray-900">{{ gameStore.leader.name }} mène</div>
              <div class="text-2xl font-bold text-yellow-500">
                +{{ Math.abs(gameStore.team1Score - gameStore.team2Score) }}
              </div>
            </div>
            
            <div v-else class="text-center space-y-3">
              <div class="text-3xl">🤝</div>
              <div class="font-bold text-gray-900">Égalité parfaite</div>
              <div class="text-2xl font-bold text-cyan-500">
                {{ gameStore.team1Score }} - {{ gameStore.team2Score }}
              </div>
            </div>
          </div>
        </div>

        <!-- Team 2 -->
        <div class="space-y-6">
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
            <!-- Team Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="text-right flex-1 mr-4">
                <h2 class="text-2xl font-bold text-gray-900">{{ gameStore.team2Name }}</h2>
                <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Équipe</p>
              </div>
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0"
                :style="{ backgroundColor: gameStore.team2Color }"
              >
                2
              </div>
            </div>

            <!-- Score Display -->
            <div class="text-center space-y-6">
              <div 
                class="text-8xl font-black leading-none"
                :style="{ color: gameStore.team2Color }"
              >
                {{ gameStore.team2Score }}
              </div>
              
              <!-- Controls -->
              <div class="flex items-center justify-center space-x-4">
                <button
                  @click="handleRemovePoint(2)"
                  :disabled="gameStore.team2Score <= 0"
                  class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-200 hover:scale-110 disabled:hover:scale-100 border-2 border-white/20"
                >
                  −
                </button>
                
                <button
                  @click="handleAddPoint(2)"
                  class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-2xl rounded-full shadow-xl hover:shadow-green-500/50 transition-all duration-200 hover:scale-110 border-2 border-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <ConfettiCanvas ref="confettiCanvas" />
    <GifOverlay />
    <RoundOverlay :rounds="rounds" />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useGameStore } from '../stores/game.js'
import ConfettiCanvas from './ConfettiCanvas.vue'
import GifOverlay from './GifOverlay.vue'
import RoundOverlay from './RoundOverlay.vue'
import { useConfetti } from '../composables/useConfetti.js'
import { useGameEvents } from '../composables/useGameEvents.js'
import { useGifLibrary } from '../composables/useGifLibrary.js'

const gameStore = useGameStore()
const confettiCanvas = ref(null)
const { triggerTeamConfetti } = useConfetti()
const { initializeGameEvents } = useGameEvents()
const { triggerGif } = useGifLibrary()

// Données pour les manches du blind test
const rounds = ref([

  {
    name: "Générique de dessin animé",
    emoji: "🎬",
    description: "Pour la génération 2000"
  },
  {
    name: "Hip hop / rap fr",
    emoji: "🎤",
    description: "Bonne chance mes gâtés"
  },
  {
    name: "Variété française",
    emoji: "🇫🇷",
    description: "Les chansons dans la voiture de papa"
  },
  {
    name: "Bruits aléatoires de la vie",
    emoji: "🔊",
    description: "ça va être très aléatoire"
  },
  {
    name: "Les jeux vidéos",
    emoji: "🎮",
    description: "Les thèmes hyper connus là"
  },  
  {
    name: "Fredonne la chanson",
    emoji: "🎤",
    description: "Élisez trois personnes qui devront fredonner un hit pour vous le faire deviner !"
  },
  {
    name: "Décris sans dire",
    emoji: "🤔",
    description: "Tu peux pas dire le titre, l'artiste, les paroles exactes. Tu peux dire le style, l'époque, l'ambiance, à quoi reseemble l'interprète... !"
  },
  {
    name: "Mime le clip",
    emoji: "🎥",
    description: "Tu dois mimer le clip d'une chanson / de l'artiste / le titre pour que votre équipe le devine !"
  },
])

async function handleAddPoint(teamNumber) {
  gameStore.addPointToTeam(teamNumber)
  
  await nextTick()
  
  if (confettiCanvas.value) {
    const teamColor = teamNumber === 1 ? gameStore.team1Color : gameStore.team2Color
    triggerTeamConfetti(confettiCanvas, teamColor, teamNumber)
  }
}

function handleRemovePoint(teamNumber) {
  gameStore.removePointFromTeam(teamNumber)
}

function resetScores() {
  if (confirm('Remettre les scores à zéro ?')) {
    gameStore.resetGame()
  }
}

function newGame() {
  if (confirm('Commencer une nouvelle partie ?')) {
    gameStore.newGame()
  }
}

// Fonction de test pour les GIFs
function testGif() {
  console.log('🧪 Testing GIF system...')
  triggerGif({ score: 1, isLeadChange: false, isTie: false })
}

// Initialiser le système d'événements au montage du composant
onMounted(() => {
  initializeGameEvents()
})
</script>