import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // State
  const team1Name = ref('')
  const team2Name = ref('')
  const team1Score = ref(0)
  const team2Score = ref(0)
  const isGameStarted = ref(false)
  
  // Team colors
  const team1Color = ref('#FF6B6B')
  const team2Color = ref('#4ECDC4')
  
  // Computed
  const hasTeamNames = computed(() => team1Name.value.trim() && team2Name.value.trim())
  const canStartGame = computed(() => hasTeamNames.value)
  const leader = computed(() => {
    if (team1Score.value > team2Score.value) return { name: team1Name.value, color: team1Color.value }
    if (team2Score.value > team1Score.value) return { name: team2Name.value, color: team2Color.value }
    return null
  })
  
  // Actions
  function setTeamNames(name1, name2) {
    team1Name.value = name1.trim()
    team2Name.value = name2.trim()
  }
  
  function setTeamColors(color1, color2) {
    team1Color.value = color1
    team2Color.value = color2
  }
  
  function startGame() {
    isGameStarted.value = true
    saveToStorage()
  }
  
  function addPointToTeam(teamNumber) {
    if (teamNumber === 1) {
      team1Score.value++
    } else {
      team2Score.value++
    }
    saveToStorage()
  }
  
  function removePointFromTeam(teamNumber) {
    if (teamNumber === 1 && team1Score.value > 0) {
      team1Score.value--
    } else if (teamNumber === 2 && team2Score.value > 0) {
      team2Score.value--
    }
    saveToStorage()
  }
  
  function resetGame() {
    team1Score.value = 0
    team2Score.value = 0
    saveToStorage()
  }
  
  function newGame() {
    team1Name.value = ''
    team2Name.value = ''
    team1Score.value = 0
    team2Score.value = 0
    isGameStarted.value = false
    localStorage.removeItem('blindtest-game')
  }
  
  function saveToStorage() {
    const gameData = {
      team1Name: team1Name.value,
      team2Name: team2Name.value,
      team1Score: team1Score.value,
      team2Score: team2Score.value,
      isGameStarted: isGameStarted.value,
      team1Color: team1Color.value,
      team2Color: team2Color.value
    }
    localStorage.setItem('blindtest-game', JSON.stringify(gameData))
  }
  
  function loadFromStorage() {
    const saved = localStorage.getItem('blindtest-game')
    if (saved) {
      const data = JSON.parse(saved)
      team1Name.value = data.team1Name || ''
      team2Name.value = data.team2Name || ''
      team1Score.value = data.team1Score || 0
      team2Score.value = data.team2Score || 0
      isGameStarted.value = data.isGameStarted || false
      team1Color.value = data.team1Color || '#FF6B6B'
      team2Color.value = data.team2Color || '#4ECDC4'
    }
  }
  
  return {
    // State
    team1Name,
    team2Name,
    team1Score,
    team2Score,
    team1Color,
    team2Color,
    isGameStarted,
    
    // Computed
    hasTeamNames,
    canStartGame,
    leader,
    
    // Actions
    setTeamNames,
    setTeamColors,
    startGame,
    addPointToTeam,
    removePointFromTeam,
    resetGame,
    newGame,
    loadFromStorage
  }
})