<template>
  <Teleport to="body">
    <div
      v-if="isGifVisible && currentGif"
      class="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      @click="closeGif"
    >
      <!-- GIF simple -->
      <div class="max-w-lg w-full mx-4 text-center">
        <img
          :src="currentGif"
          :alt="gifAltText"
          class="w-full h-auto max-h-96 object-contain rounded-lg shadow-2xl mx-auto"
          @error="handleGifError"
        />
        
        <!-- Catchphrase en dessous -->
        <div class="mt-6 px-4">
          <h3 class="text-white font-bold text-xl leading-relaxed">
            {{ currentCatchphrase || celebrationText }}
          </h3>
        </div>
      </div>

      <!-- Instructions de fermeture -->
      <div class="absolute top-4 right-4 text-white/60 text-sm">
        Cliquez pour fermer
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useGifLibrary } from '../composables/useGifLibrary.js'
import { useGameStore } from '../stores/game.js'

const { currentGif, currentCatchphrase, isGifVisible, stopSound } = useGifLibrary()
const gameStore = useGameStore()

// Textes de célébration selon le contexte
const celebrationText = computed(() => {
  const leader = gameStore.leader
  const score1 = gameStore.team1Score
  const score2 = gameStore.team2Score
  
  if (leader) {
    if (score1 >= 20 || score2 >= 20) {
      return '🏆 CHAMPION LÉGENDAIRE !'
    } else if (score1 >= 15 || score2 >= 15) {
      return '🔥 MAÎTRE DU JEU !'
    } else if (score1 >= 10 || score2 >= 10) {
      return '⚡ INCROYABLE !'
    } else if (score1 >= 5 || score2 >= 5) {
      return '🎵 EXCELLENT !'
    } else {
      return '🎉 BRAVO !'
    }
  } else {
    return '🤝 ÉGALITÉ PARFAITE !'
  }
})

const subText = computed(() => {
  const leader = gameStore.leader
  const score1 = gameStore.team1Score
  const score2 = gameStore.team2Score
  
  if (leader) {
    return `${leader.name} mène avec ${Math.max(score1, score2)} points !`
  } else {
    return `${score1} - ${score2} : Match serré !`
  }
})

const gifAltText = computed(() => {
  return `Célébration - ${celebrationText.value}`
})

function closeGif() {
  isGifVisible.value = false
  currentGif.value = null
  currentCatchphrase.value = null
  stopSound() // Arrêter le son quand on ferme manuellement
}

function handleGifError() {
  console.warn('Failed to load GIF:', currentGif.value)
  // Optionally, you could set a fallback GIF here
}
</script>

<style scoped>
/* Pas d'animations - design statique uniquement */
</style>