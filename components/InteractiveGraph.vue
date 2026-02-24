<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bars = ref([
  { label: 'Vue', value: 10, color: 'bg-green-500' },
  { label: 'React', value: 30, color: 'bg-blue-500' },
  { label: 'Angular', value: 20, color: 'bg-red-500' },
  { label: 'Svelte', value: 15, color: 'bg-orange-500' },
  { label: 'Slidev', value: 5, color: 'bg-teal-500' },
])

let intervalId: any = null
const isLive = ref(true)

const randomize = () => {
  bars.value = bars.value.map(bar => ({
    ...bar,
    value: Math.floor(Math.random() * 80) + 10
  }))
}

const toggleLive = () => {
  isLive.value = !isLive.value
  if (isLive.value) {
    randomize()
    intervalId = setInterval(randomize, 2000)
  } else {
    clearInterval(intervalId)
  }
}

onMounted(() => {
  randomize()
  intervalId = setInterval(randomize, 2000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-3">
        <h3 class="text-xl font-bold">Framework Popularity</h3>
        <span v-if="isLive" class="flex h-3 w-3 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      <button 
        @click="toggleLive"
        class="px-4 py-1.5 text-sm rounded transition font-mono border"
        :class="isLive ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-200' : 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-200'"
      >
        {{ isLive ? 'Stop Live' : 'Start Live' }}
      </button>
    </div>
    
    <div class="space-y-4">
      <div v-for="bar in bars" :key="bar.label" class="flex items-center gap-4">
        <div class="w-20 text-right text-sm font-bold opacity-80">{{ bar.label }}</div>
        <div class="flex-1 h-8 bg-gray-700/50 rounded-full overflow-hidden relative shadow-inner">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-in-out flex items-center justify-end pr-3 text-xs font-mono font-bold shadow-lg"
            :class="bar.color"
            :style="{ width: `${bar.value}%` }"
          >
            {{ bar.value }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
