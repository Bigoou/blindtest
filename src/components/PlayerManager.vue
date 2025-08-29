<template>
  <div class="player-manager">
    <h4 class="section-title">Joueurs</h4>
    
    <div class="players-list">
      <TransitionGroup name="player-list" tag="div" class="players-grid">
        <div 
          v-for="(player, index) in players" 
          :key="`${teamNumber}-${index}`"
          class="player-tag"
        >
          <span class="player-name">{{ player }}</span>
          <button 
            @click="removePlayer(index)"
            class="remove-player"
            type="button"
            :aria-label="`Retirer ${player}`"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
    
    <div class="add-player-form" v-if="players.length < 4">
      <input
        v-model="newPlayerName"
        type="text"
        placeholder="Nom du joueur"
        maxlength="15"
        class="player-input"
        @keyup.enter="addPlayer"
        @input="newPlayerName = $event.target.value.slice(0, 15)"
      />
      <button 
        @click="addPlayer"
        type="button"
        class="add-player-btn"
        :disabled="!newPlayerName.trim()"
      >
        +
      </button>
    </div>
    
    <div class="player-limit" v-if="players.length >= 4">
      <small>Maximum 4 joueurs par équipe</small>
    </div>
    
    <div class="player-count">
      <small>{{ players.length }}/4 joueurs</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  players: {
    type: Array,
    required: true
  },
  teamNumber: {
    type: Number,
    required: true
  },
  teamColor: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['add-player', 'remove-player'])

const newPlayerName = ref('')

function addPlayer() {
  const name = newPlayerName.value.trim()
  if (name && props.players.length < 4) {
    emit('add-player', props.teamNumber, name)
    newPlayerName.value = ''
  }
}

function removePlayer(index) {
  emit('remove-player', props.teamNumber, index)
}
</script>

<style scoped>
.player-manager {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: center;
}

.players-list {
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-y: auto;
  padding-right: 0.2rem;
}

.players-grid {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.player-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid v-bind(teamColor);
  border-radius: 15px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  min-height: 32px;
}

.player-tag:hover {
  transform: translateX(3px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.player-name {
  font-weight: 500;
  color: #2d3748;
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.remove-player {
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: bold;
  transition: all 0.2s ease;
  line-height: 1;
  flex-shrink: 0;
}

.remove-player:hover {
  background: #c53030;
  transform: scale(1.1);
}

.add-player-form {
  display: flex;
  gap: 0.5rem;
}

.player-input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.85rem;
  transition: border-color 0.3s ease;
}

.player-input:focus {
  outline: none;
  border-color: v-bind(teamColor);
}

.add-player-btn {
  background: v-bind(teamColor);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.add-player-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.add-player-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.player-limit,
.player-count {
  text-align: center;
}

.player-limit small {
  color: #e53e3e;
  font-weight: 500;
}

.player-count small {
  color: #718096;
  font-weight: 500;
}

/* Transitions */
.player-list-enter-active,
.player-list-leave-active {
  transition: all 0.3s ease;
}

.player-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.player-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.player-list-move {
  transition: transform 0.3s ease;
}

/* Scrollbar styling for players list */
.players-list::-webkit-scrollbar {
  width: 4px;
}

.players-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.players-list::-webkit-scrollbar-thumb {
  background: v-bind(teamColor);
  border-radius: 2px;
  opacity: 0.7;
}

.players-list::-webkit-scrollbar-thumb:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .player-tag {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    min-height: 28px;
  }
  
  .player-name {
    max-width: 100px;
  }
  
  .remove-player {
    width: 16px;
    height: 16px;
    font-size: 0.65rem;
  }
  
  .add-player-btn {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
  
  .player-input {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .players-list {
    height: 120px;
  }
}
</style>