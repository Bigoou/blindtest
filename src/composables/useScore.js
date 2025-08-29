import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'

export function useScore() {
  const gameStore = useGameStore()
  
  const totalPoints = computed(() => gameStore.team1Score + gameStore.team2Score)
  
  const scoreDifference = computed(() => 
    Math.abs(gameStore.team1Score - gameStore.team2Score)
  )
  
  const isCloseGame = computed(() => scoreDifference.value <= 1)
  
  const winningTeam = computed(() => {
    if (gameStore.team1Score > gameStore.team2Score) {
      return {
        name: gameStore.team1Name,
        color: gameStore.team1Color,
        score: gameStore.team1Score
      }
    } else if (gameStore.team2Score > gameStore.team1Score) {
      return {
        name: gameStore.team2Name,
        color: gameStore.team2Color,
        score: gameStore.team2Score
      }
    }
    return null
  })
  
  const gameStats = computed(() => ({
    totalPoints: totalPoints.value,
    scoreDifference: scoreDifference.value,
    isCloseGame: isCloseGame.value,
    winningTeam: winningTeam.value,
    isStarted: gameStore.isGameStarted
  }))
  
  return {
    totalPoints,
    scoreDifference,
    isCloseGame,
    winningTeam,
    gameStats
  }
}