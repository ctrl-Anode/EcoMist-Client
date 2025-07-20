<template>
  <div
    class="spinner"
    :style="spinnerStyle"
    role="status"
    aria-busy="true"
    :class="{ centered }"
  >
    <div v-for="n in 10" :key="n" :style="ringStyle(n)"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '40px'
  },
  color: {
    type: String,
    default: '#000'
  },
  centered: {
    type: Boolean,
    default: true
  }
})

const spinnerStyle = computed(() => ({
  width: props.size,
  height: props.size
}))

const ringStyle = (n) => ({
  '--rotation': `${n * 36}`,
  '--delay': `${n * 0.1}`,
  '--translation': '150',
  background: props.color
})
</script>

<style scoped>
.spinner {
  position: relative;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spinner div {
  position: absolute;
  width: 50%;
  height: 150%;
  transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  animation: spinner-rotate 1s calc(var(--delay) * 1s) infinite ease;
  border-radius: 2px;
}

@keyframes spinner-rotate {
  0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  }

  50% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
  }
}
</style>
