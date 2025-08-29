<template>
  <Teleport to="body">
    <Transition name="round-overlay" appear>
      <div 
        v-if="isVisible"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        @click="hide"
      >
        <!-- Main overlay content -->
        <div 
          class="relative text-center p-12 max-w-4xl mx-6"
          @click.stop
        >
          <!-- Background glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-3xl animate-pulse"></div>
          
          <!-- Main content -->
          <div class="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12">
            <!-- Title -->
            <div class="mb-8">
              <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4 drop-shadow-lg">
                PROCHAINE MANCHE
              </h1>
              <div class="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>
            
            <!-- Round info -->
            <div class="space-y-6">
              <div class="text-8xl mb-6">{{ currentRound.emoji }}</div>
              <h2 class="text-4xl font-bold text-white mb-4">{{ currentRound.name }}</h2>
              <p class="text-xl text-gray-300 font-medium">{{ currentRound.description }}</p>
            </div>
            
            <!-- Controls -->
            <div class="mt-12 space-y-4">
              <button
                @click="hide"
                class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xl rounded-2xl transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-purple-500/25"
              >
                <span>🚀</span>
                C'est parti !
              </button>
              
              <div class="text-gray-400 text-sm mt-4">
                Appuyez sur Espace pour la manche suivante
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  rounds: {
    type: Array,
    default: () => []
  }
})

const isVisible = ref(false)
const currentRoundIndex = ref(0)

const currentRound = computed(() => {
  return props.rounds[currentRoundIndex.value] || { 
    name: 'Manche inconnue', 
    emoji: '🎵', 
    description: 'Préparez-vous !' 
  }
})

function show() {
  isVisible.value = true
}

function hide() {
  isVisible.value = false
}

function nextRound() {
  if (currentRoundIndex.value < props.rounds.length - 1) {
    currentRoundIndex.value++
  } else {
    currentRoundIndex.value = 0
  }
}

function handleKeyPress(event) {
  if (event.code === 'Space') {
    event.preventDefault()
    if (isVisible.value) {
      hide()
      setTimeout(() => {
        nextRound()
      }, 300)
    } else {
      show()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

defineExpose({
  show,
  hide,
  nextRound,
  currentRoundIndex,
  isVisible
})
</script>

<style scoped>
.round-overlay-enter-active,
.round-overlay-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.round-overlay-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.round-overlay-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
}
</style>