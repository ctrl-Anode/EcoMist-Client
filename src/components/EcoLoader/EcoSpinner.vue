<template>
  <div 
    class="loader-container"
    :class="{ centered }"
    role="status" 
    aria-busy="true"
    aria-label="Loading"
  >
    <div 
      class="loader"
      :style="loaderStyle"
    >
      <div 
        v-for="n in 8" 
        :key="n" 
        class="dot"
        :style="dotStyle(n)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: [String, Number],
    default: 32
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  centered: {
    type: Boolean,
    default: true
  },
  speed: {
    type: Number,
    default: 1.2
  }
})

const normalizedSize = computed(() => 
  typeof props.size === 'number' ? `${props.size}px` : props.size
)

const loaderStyle = computed(() => ({
  width: normalizedSize.value,
  height: normalizedSize.value,
  '--speed': `${props.speed}s`
}))

const dotStyle = (n) => ({
  '--delay': `${(n - 1) * 0.15}s`,
  backgroundColor: props.color
})
</script>

<style scoped>
.loader-container {
  display: inline-block;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.loader {
  position: relative;
  display: inline-block;
}

.dot {
  position: absolute;
  width: 12.5%;
  height: 12.5%;
  border-radius: 50%;
  animation: pulse var(--speed) var(--delay) infinite ease-in-out;
}

.dot:nth-child(1) { top: 0; left: 43.75%; }
.dot:nth-child(2) { top: 12.5%; right: 12.5%; }
.dot:nth-child(3) { top: 43.75%; right: 0; }
.dot:nth-child(4) { bottom: 12.5%; right: 12.5%; }
.dot:nth-child(5) { bottom: 0; left: 43.75%; }
.dot:nth-child(6) { bottom: 12.5%; left: 12.5%; }
.dot:nth-child(7) { top: 43.75%; left: 0; }
.dot:nth-child(8) { top: 12.5%; left: 12.5%; }

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0.3);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Alternative spinner style - uncomment to use */
/*
.loader {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: v-bind(color);
  border-radius: 50%;
  animation: spin var(--speed) linear infinite;
}

.dot {
  display: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
*/
</style>