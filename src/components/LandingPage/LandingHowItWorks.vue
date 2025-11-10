<template>
  <section id="how-it-works" class="px-4 sm:px-6 py-12 sm:py-16 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 sm:mb-16 animate-fade-in">
        <span class="inline-block px-4 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
          Simple Process
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">How It Works</h2>
        <p class="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Get started with AeroTech in four simple steps
        </p>
        <div class="w-24 h-1.5 bg-gradient-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
      </div>

      <!-- Desktop/Tablet: Vertical Steps -->
      <div class="hidden md:block max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8 sm:p-10">
        <div class="space-y-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="flex flex-row gap-6 items-start group hover:-translate-x-2 transition-all duration-300 animate-slide-up cursor-pointer"
          >
            <div
              class="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-green-600/20 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
            >
              {{ index + 1 }}
            </div>
            <div class="pt-2 flex-1">
              <h3 class="text-green-800 text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                {{ step.description }}
              </p>
            </div>
            <div class="hidden sm:block pt-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="none"
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="text-green-600 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: Carousel View -->
      <div 
        class="md:hidden relative max-w-4xl mx-auto"
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
              v-for="(step, index) in steps"
              :key="index"
              class="w-full flex-shrink-0 px-2"
            >
              <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8"
                :class="{ 'animate-scale-in': currentSlide === index }"
              >
                <div class="flex flex-col items-center text-center">
                  <div
                    class="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-green-600/20 mb-6"
                  >
                    {{ index + 1 }}
                  </div>
                  <h3 class="text-green-800 text-xl font-bold mb-4">
                    {{ step.title }}
                  </h3>
                  <p class="text-gray-600 text-base leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/95 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10"
          aria-label="Previous step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="w-5 h-5">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/95 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10"
          aria-label="Next step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="w-5 h-5">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>

        <!-- Dots Indicator -->
        <div class="flex justify-center items-center gap-2 mt-6">
          <button
            v-for="(step, index) in steps"
            :key="index"
            @click="goToSlide(index)"
            class="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            :class="currentSlide === index ? 'bg-green-600 w-10' : 'bg-gray-300 hover:bg-gray-400 w-2.5'"
            :aria-label="`Go to step ${index + 1}`"
            :aria-current="currentSlide === index"
          >
            <span 
              v-if="currentSlide === index && !isPaused"
              class="absolute inset-0 bg-green-400 rounded-full animate-progress origin-left"
            ></span>
          </button>
        </div>

        <!-- Pause/Play Control -->
        <!-- <div class="flex justify-center mt-4">
          <button
            @click="toggleAutoPlay"
            class="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full p-2"
            :aria-label="isPaused ? 'Resume autoplay' : 'Pause autoplay'"
          >
            <svg v-if="isPaused" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
            </svg>
          </button>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../../assets/animations.css'

// Carousel state (mobile)
const currentSlide = ref(0)
const isPaused = ref(false)
let autoPlayInterval = null
let touchStartX = 0
let touchEndX = 0

const steps = [
  {
    title: "Install Sensors",
    description: "Our plug-and-play sensors are easily installed in your aeroponic system.",
  },
  {
    title: "Connect to WLAN",
    description: "The system automatically connects to your wireless network for seamless data transmission.",
  },
  {
    title: "Monitor & Control",
    description: "Access your dashboard to view real-time data and control your system remotely.",
  },
  {
    title: "Optimize Growth",
    description: "Use AI-driven insights to optimize growing conditions and maximize yield.",
  },
]

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % steps.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + steps.length) % steps.length
}

const goToSlide = (index) => {
  currentSlide.value = index
  if (!isPaused.value) {
    stopAutoPlay()
    startAutoPlay()
  }
}

const startAutoPlay = () => {
  if (autoPlayInterval) return
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const pauseAutoPlay = () => {
  isPaused.value = true
  stopAutoPlay()
}

const resumeAutoPlay = () => {
  isPaused.value = false
  startAutoPlay()
}

const toggleAutoPlay = () => {
  if (isPaused.value) {
    resumeAutoPlay()
  } else {
    pauseAutoPlay()
  }
}

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  pauseAutoPlay()
}

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  resumeAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

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
