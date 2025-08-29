<template>
  <div class="space-y-4">
    <div class="grid grid-cols-6 gap-2">
      <button
        v-for="color in colorPalette"
        :key="color"
        type="button"
        class="w-10 h-10 rounded-xl border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{ 'ring-2 ring-offset-2 ring-gray-800 scale-110': selectedColor === color }"
        :style="{ backgroundColor: color }"
        @click="selectColor(color)"
        :aria-label="`Sélectionner la couleur ${color}`"
      >
        <span v-if="selectedColor === color" class="text-white font-bold text-sm">✓</span>
      </button>
    </div>
    
    <div class="flex items-center gap-3">
      <label class="text-sm font-medium text-gray-700 whitespace-nowrap">
        Couleur personnalisée :
      </label>
      <div class="relative">
        <input
          type="color"
          :value="selectedColor"
          @input="selectColor($event.target.value)"
          class="w-12 h-10 rounded-lg border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  teamNumber: {
    type: Number,
    required: true
  },
  excludeColor: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const colorPalette = [
  '#EF4444', // red-500
  '#F97316', // orange-500
  '#EAB308', // yellow-500
  '#10B981', // emerald-500
  '#06B6D4', // cyan-500
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#84CC16', // lime-500
  '#F59E0B', // amber-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
]

const selectedColor = computed(() => props.modelValue)

function selectColor(color) {
  emit('update:modelValue', color)
}
</script>