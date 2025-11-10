<template>
  <section class="px-4 sm:px-6 py-4 sm:py-8 relative z-10">
    <div class="max-w-7xl mx-auto">
      <!-- Desktop: Grid View (hidden on mobile) -->
      <div class="hidden lg:grid grid-cols-4 gap-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 group cursor-pointer"
        >
          <div class="text-green-600 mb-6 flex justify-center items-center">
            <div
              class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300"
            >
              <component :is="stat.icon" class="w-8 h-8" />
            </div>
          </div>
          <div class="text-green-800 text-4xl sm:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
            {{ stat.value }}
          </div>
          <div class="text-gray-600 font-medium">{{ stat.label }}</div>
          <p class="text-sm text-gray-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {{ stat.description }}
          </p>
        </div>
      </div>

      <!-- Mobile/Tablet: Carousel View -->
      <div
        class="lg:hidden relative"
        @mouseenter="pauseAutoPlay"
        @mouseleave="resumeAutoPlay"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="overflow-hidden rounded-2xl">
          <div
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="w-full flex-shrink-0 px-2"
            >
              <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8 text-center"
                :class="{ 'animate-scale-in': currentSlide === index }"
              >
                <div class="text-green-600 mb-6 flex justify-center items-center">
                  <div
                    class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300"
                  >
                    <component :is="stat.icon" class="w-10 h-10" />
                  </div>
                </div>
                <div class="text-green-800 text-5xl font-bold mb-2">{{ stat.value }}</div>
                <div class="text-gray-700 font-semibold text-lg mb-3">{{ stat.label }}</div>
                <p class="text-sm text-gray-600 px-4">{{ stat.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 bg-white/95 backdrop-blur-sm text-green-600 p-2 sm:p-3 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous stat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 bg-white/95 backdrop-blur-sm text-green-600 p-2 sm:p-3 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next stat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>

        <!-- Dots Indicator with Progress Bar -->
        <div class="flex justify-center items-center gap-2 mt-6">
          <button
            v-for="(stat, index) in stats"
            :key="index"
            @click="goToSlide(index)"
            class="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            :class="currentSlide === index ? 'bg-green-600 w-10' : 'bg-gray-300 hover:bg-gray-400 w-2.5'"
            :aria-label="`Go to stat ${index + 1}`"
            :aria-current="currentSlide === index"
          >
            <span
              v-if="currentSlide === index && !isPaused"
              class="absolute inset-0 bg-green-400 rounded-full animate-progress origin-left"
            ></span>
          </button>
        </div>

        <!-- Pause/Play Indicator -->
        <!-- <div class="flex justify-center mt-4">
          <button
            @click="toggleAutoPlay"
            class="text-gray-500 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full p-2"
            :aria-label="isPaused ? 'Resume autoplay' : 'Pause autoplay'"
          >
            <svg v-if="isPaused" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          </button>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, ref, onMounted, onUnmounted } from 'vue';

const currentSlide = ref(0);
const isPaused = ref(false);
let autoPlayInterval = null;
let touchStartX = 0;
let touchEndX = 0;

const stats = [
  {
    icon: () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        viewBox: '0 0 24 24',
      }, [
        h('path', { d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8' }),
        h('path', { d: 'm22 20-3-3-3 3' }),
        h('path', { d: 'M19 17v9' }),
        h('path', { d: 'M9 10l1 1 3-3' }),
      ]),
    value: '95%',
    label: 'Water Savings',
    description: 'Reduce water consumption significantly compared to traditional farming'
  },
  {
    icon: () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        viewBox: '0 0 24 24',
      }, [
        h('path', { d: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z' }),
      ]),
    value: '40%',
    label: 'Energy Efficient',
    description: 'Lower energy costs with optimized LED lighting and smart automation'
  },
  {
    icon: () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        viewBox: '0 0 24 24',
      }, [
        h('path', { d: 'M12 10V5a3 3 0 1 1 3 3H5a3 3 0 0 1 3-3v5' }),
        h('path', { d: 'M12 14a3 3 0 1 0 3 3' }),
        h('path', { d: 'M12 14a3 3 0 1 1-3 3' }),
        h('path', { d: 'M7 21h10' }),
      ]),
    value: '3x',
    label: 'Faster Growth',
    description: 'Accelerated plant growth with optimal nutrient delivery and conditions'
  },
  {
    icon: () =>
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        viewBox: '0 0 24 24',
      }, [
        h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
        h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
        h('line', { x1: '6', y1: '20', x2: '6', y2: '14' }),
      ]),
    value: '24/7',
    label: 'Monitoring',
    description: 'Real-time system monitoring and alerts for complete peace of mind'
  },
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % stats.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + stats.length) % stats.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  if (!isPaused.value) {
    stopAutoPlay();
    startAutoPlay();
  }
};

const startAutoPlay = () => {
  if (autoPlayInterval) return;
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const pauseAutoPlay = () => {
  isPaused.value = true;
  stopAutoPlay();
};

const resumeAutoPlay = () => {
  isPaused.value = false;
  startAutoPlay();
};

const toggleAutoPlay = () => {
  if (isPaused.value) {
    resumeAutoPlay();
  } else {
    pauseAutoPlay();
  }
};

// Touch gesture handlers
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
  pauseAutoPlay();
};

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  resumeAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
@keyframes progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-progress {
  animation: progress 5s linear;
}
</style>
