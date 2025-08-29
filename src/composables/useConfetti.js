import { ref } from 'vue'

export function useConfetti() {
  const isActive = ref(false)
  
  const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
  
  function triggerConfetti(canvasRef, options = {}) {
    const {
      x = window.innerWidth / 2,
      y = window.innerHeight / 2,
      colors = defaultColors,
      count = 50,
      spread = 8,
      gravity = 0.3
    } = options
    
    if (!canvasRef?.value) return
    
    isActive.value = true
    canvasRef.value.triggerConfetti(x, y, colors, count)
    
    setTimeout(() => {
      isActive.value = false
    }, 3000)
  }
  
  function triggerTeamConfetti(canvasRef, teamColor, teamNumber) {
    const teamColors = [teamColor, '#FFD93D', '#FFF', '#FFEAA7']
    
    const x = teamNumber === 1 
      ? window.innerWidth * 0.25 
      : window.innerWidth * 0.75
    const y = window.innerHeight * 0.4
    
    triggerConfetti(canvasRef, {
      x,
      y,
      colors: teamColors,
      count: 60
    })
  }
  
  function triggerCelebration(canvasRef, colors = defaultColors) {
    const positions = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    ]
    
    positions.forEach((pos, index) => {
      setTimeout(() => {
        triggerConfetti(canvasRef, {
          ...pos,
          colors,
          count: 40
        })
      }, index * 200)
    })
  }
  
  return {
    isActive,
    triggerConfetti,
    triggerTeamConfetti,
    triggerCelebration
  }
}