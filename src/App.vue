<template>
  <div id="app">
    <Transition name="fade" mode="out-in">
      <TeamSetup v-if="!gameStore.isGameStarted" key="setup" />
      <GameBoard v-else key="game" />
    </Transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from './stores/game.js'
import TeamSetup from './components/TeamSetup.vue'
import GameBoard from './components/GameBoard.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.loadFromStorage()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>