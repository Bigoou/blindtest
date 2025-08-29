<template>
  <div class="score-card" :style="{ '--team-color': teamColor }">
    <div class="team-info">
      <h2 class="team-name">{{ teamName }}</h2>
      <div class="score-display">{{ score }}</div>
    </div>
    
    <div class="controls">
      <button
        @click="removePoint"
        class="score-button remove"
        :disabled="score <= 0"
      >
        -1
      </button>
      
      <button
        @click="addPoint"
        class="score-button add"
      >
        +1
      </button>
    </div>
    
    <div v-if="showCatchphrase" class="catchphrase">
      {{ currentCatchphrase }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  teamName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  teamColor: {
    type: String,
    required: true
  },
  teamNumber: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['add-point', 'remove-point'])

const showCatchphrase = ref(false)
const currentCatchphrase = ref('')

const catchphrases = [
  '🎉 Excellent !',
  '⭐ Bravo !',
  '🔥 Parfait !',
  '💫 Génial !',
  '🎯 Dans le mille !',
  '🏆 Champions !',
  '⚡ Incroyable !',
  '🎵 Bonne réponse !'
]

function addPoint() {
  emit('add-point', props.teamNumber)
  showCatchphraseAnimation()
  animateScoreIncrease()
}

function removePoint() {
  if (props.score > 0) {
    emit('remove-point', props.teamNumber)
  }
}

function showCatchphraseAnimation() {
  const randomCatchphrase = catchphrases[Math.floor(Math.random() * catchphrases.length)]
  currentCatchphrase.value = randomCatchphrase
  showCatchphrase.value = true
  
  setTimeout(() => {
    showCatchphrase.value = false
  }, 2000)
}

function animateScoreIncrease() {
  const scoreElement = document.querySelector(`[data-score-${props.teamNumber}]`)
  if (scoreElement) {
    gsap.fromTo(scoreElement, 
      { scale: 1 },
      { 
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      }
    )
  }
}

watch(() => props.score, (newScore, oldScore) => {
  if (newScore > oldScore) {
    const card = document.querySelector(`[data-team-${props.teamNumber}]`)
    if (card) {
      gsap.fromTo(card,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "back.out(1.7)"
        }
      )
    }
  }
})
</script>

<style scoped>
.score-card {
  background: linear-gradient(135deg, var(--team-color), rgba(255, 255, 255, 0.1));
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
  pointer-events: none;
}

.team-info {
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.team-name {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  word-break: break-word;
}

.score-display {
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.score-button {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
}

.score-button.add {
  background: rgba(255, 255, 255, 0.9);
  color: var(--team-color);
}

.score-button.remove {
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.score-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.score-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.catchphrase {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  color: var(--team-color);
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  animation: catchphraseShow 2s ease-in-out forwards;
  z-index: 10;
}

@keyframes catchphraseShow {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
}

@media (max-width: 768px) {
  .score-card {
    padding: 1.5rem;
    min-height: 250px;
  }
  
  .team-name {
    font-size: 1.5rem;
  }
  
  .score-display {
    font-size: 3rem;
  }
  
  .catchphrase {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }
}
</style>