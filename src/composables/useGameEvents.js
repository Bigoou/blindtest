import { ref, watch } from 'vue'
import { useGameStore } from '../stores/game.js'
import { useGifLibrary } from './useGifLibrary.js'

export function useGameEvents() {
  const gameStore = useGameStore()
  const { triggerGif } = useGifLibrary()
  
  // État précédent pour détecter les changements
  const previousLeader = ref(null)
  const previousTeam1Score = ref(0)
  const previousTeam2Score = ref(0)

  // Fonction pour détecter si c'est un changement de leader
  function detectLeadChange(currentLeader) {
    const hadLeaderChange = previousLeader.value && 
                           currentLeader && 
                           previousLeader.value.name !== currentLeader.name
    
    const newLeaderFromTie = !previousLeader.value && currentLeader
    
    return hadLeaderChange || newLeaderFromTie
  }

  // Fonction pour détecter si c'est une égalité
  function detectTie(currentLeader) {
    const wasLeading = previousLeader.value !== null
    const nowTie = currentLeader === null
    return wasLeading && nowTie
  }

  // Fonction pour détecter les paliers spéciaux
  function detectMilestone(newScore, oldScore) {
    const milestones = [5, 10, 15, 20, 25, 30]
    
    for (const milestone of milestones) {
      if (newScore >= milestone && oldScore < milestone) {
        return milestone
      }
    }
    return null
  }

  // Surveillance des changements de score de l'équipe 1
  watch(() => gameStore.team1Score, (newScore, oldScore) => {
    console.log('👥 Team 1 score changed:', { newScore, oldScore })
    if (newScore > oldScore) { // Seulement quand le score augmente
      console.log('📈 Team 1 scored! Triggering GIF system...')
      const currentLeader = gameStore.leader
      const isLeadChange = detectLeadChange(currentLeader)
      const milestone = detectMilestone(newScore, oldScore)
      
      // Priorité aux paliers spéciaux
      if (milestone) {
        triggerGif({ 
          score: milestone, 
          isLeadChange: false, 
          isTie: false,
          duration: 4000 // Plus long pour les paliers spéciaux
        })
      }
      // Puis changement de leader
      else if (isLeadChange) {
        triggerGif({ 
          score: newScore, 
          isLeadChange: true, 
          isTie: false,
          duration: 3500
        })
      }
      // Sinon GIF normal selon le score
      else {
        triggerGif({ 
          score: newScore, 
          isLeadChange: false, 
          isTie: false 
        })
      }
    }
    
    previousTeam1Score.value = newScore
  })

  // Surveillance des changements de score de l'équipe 2
  watch(() => gameStore.team2Score, (newScore, oldScore) => {
    if (newScore > oldScore) { // Seulement quand le score augmente
      const currentLeader = gameStore.leader
      const isLeadChange = detectLeadChange(currentLeader)
      const milestone = detectMilestone(newScore, oldScore)
      
      // Priorité aux paliers spéciaux
      if (milestone) {
        triggerGif({ 
          score: milestone, 
          isLeadChange: false, 
          isTie: false,
          duration: 4000 // Plus long pour les paliers spéciaux
        })
      }
      // Puis changement de leader
      else if (isLeadChange) {
        triggerGif({ 
          score: newScore, 
          isLeadChange: true, 
          isTie: false,
          duration: 3500
        })
      }
      // Sinon GIF normal selon le score
      else {
        triggerGif({ 
          score: newScore, 
          isLeadChange: false, 
          isTie: false 
        })
      }
    }
    
    previousTeam2Score.value = newScore
  })

  // Surveillance des changements de leader pour détecter les égalités
  watch(() => gameStore.leader, (currentLeader) => {
    // Détecter quand on passe d'un leader à une égalité
    if (detectTie(currentLeader)) {
      triggerGif({ 
        score: gameStore.team1Score, // Le score importe peu pour les égalités
        isLeadChange: false, 
        isTie: true,
        duration: 3000
      })
    }
    
    // Mettre à jour le leader précédent
    previousLeader.value = currentLeader ? { ...currentLeader } : null
  })

  // Fonction d'initialisation pour éviter les déclenchements au démarrage
  function initializeGameEvents() {
    previousLeader.value = gameStore.leader ? { ...gameStore.leader } : null
    previousTeam1Score.value = gameStore.team1Score
    previousTeam2Score.value = gameStore.team2Score
  }

  // Fonction pour déclencher manuellement un GIF (utile pour des événements spéciaux)
  function triggerCustomGif(type = 'celebration', duration = 3000) {
    switch (type) {
      case 'celebration':
        triggerGif({ score: 10, isLeadChange: false, isTie: false, duration })
        break
      case 'leadChange':
        triggerGif({ score: 5, isLeadChange: true, isTie: false, duration })
        break
      case 'tie':
        triggerGif({ score: 5, isLeadChange: false, isTie: true, duration })
        break
      case 'milestone':
        triggerGif({ score: 10, isLeadChange: false, isTie: false, duration: 4000 })
        break
    }
  }

  return {
    initializeGameEvents,
    triggerCustomGif,
    detectLeadChange,
    detectTie,
    detectMilestone
  }
}