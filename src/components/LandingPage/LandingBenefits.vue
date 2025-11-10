<template>
  <section id="benefits" class="px-4 sm:px-6 relative z-10">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16 animate-fade-in">
        <span class="inline-block px-4 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
          Why AeroTech Works
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
          Benefits of AeroTech
        </h2>
        <p class="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Transforming agriculture with sustainable, efficient, and intelligent solutions
        </p>
        <div class="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full"></div>
      </div>

      <!-- Desktop/Tablet: Grid View (hidden on mobile) -->
      <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Benefit 1 -->
        <div 
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-green-300 transition-all duration-300 p-6 sm:p-8 group cursor-pointer animate-slide-up"
          style="animation-delay: 0ms"
        >
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Droplets class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-green-800 text-xl sm:text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">Resource Efficiency</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                AeroTech's precision control system reduces water usage by up to 95% compared to traditional farming methods.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Smart nutrient delivery ensures plants receive exactly what they need, minimizing waste and maximizing efficiency.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full group-hover:bg-green-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Reduced water consumption</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full group-hover:bg-green-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Optimized nutrient usage</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full group-hover:bg-green-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Lower energy requirements</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-green-100 p-1.5 rounded-full group-hover:bg-green-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Minimal environmental impact</span>
            </li>
          </ul>
        </div>

        <!-- Benefit 2 -->
        <div 
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-green-300 transition-all duration-300 p-6 sm:p-8 group cursor-pointer animate-slide-up"
          style="animation-delay: 100ms"
        >
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Brain class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-emerald-800 text-xl sm:text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Smart Technology</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                AI-powered monitoring and automated adjustments ensure optimal growing conditions 24/7.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Real-time sensors and machine learning algorithms continuously optimize your growing environment for maximum yield.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">AI-powered monitoring</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Automated adjustments</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Real-time analytics</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Predictive maintenance</span>
            </li>
          </ul>
        </div>

        <!-- Benefit 3 -->
        <div 
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-green-300 transition-all duration-300 p-6 sm:p-8 group cursor-pointer animate-slide-up"
          style="animation-delay: 200ms"
        >
          <div class="flex items-start gap-4 mb-6">
            <div class="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Leaf class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 class="text-emerald-800 text-xl sm:text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Sustainable Growth</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Achieve higher yields while maintaining environmental responsibility and sustainability.
              </p>
            </div>
          </div>
          <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Our eco-friendly approach ensures long-term soil health and biodiversity while maximizing crop production.
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Increased crop yields</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Soil health preservation</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Biodiversity support</span>
            </li>
            <li class="flex items-center gap-3 text-gray-700">
              <div class="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Check class="w-4 h-4 text-emerald-600" />
              </div>
              <span class="text-sm sm:text-base">Carbon footprint reduction</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile: Carousel View -->
      <div 
        class="md:hidden relative"
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
              v-for="(benefit, index) in benefits"
              :key="index"
              class="w-full flex-shrink-0 px-2"
            >
              <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-6 sm:p-8"
                :class="{ 'animate-scale-in': currentSlide === index }"
              >
                <div class="flex items-start gap-4 mb-6">
                  <div :class="benefit.iconClass" class="p-3 rounded-xl shadow-lg flex-shrink-0">
                    <component :is="benefit.icon" class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 :class="benefit.titleClass" class="text-xl sm:text-2xl font-bold mb-2">{{ benefit.title }}</h3>
                    <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {{ benefit.subtitle }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                  {{ benefit.description }}
                </p>
                <ul class="space-y-2">
                  <li v-for="(item, idx) in benefit.items" :key="idx" class="flex items-center gap-3 text-gray-700">
                    <div :class="benefit.checkClass" class="p-1.5 rounded-full">
                      <Check class="w-4 h-4 text-emerald-600" />
                    </div>
                    <span class="text-sm sm:text-base">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/95 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10"
          aria-label="Previous benefit"
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
          aria-label="Next benefit"
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
            v-for="(benefit, index) in benefits"
            :key="index"
            @click="goToSlide(index)"
            class="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            :class="currentSlide === index ? 'bg-green-600 w-10' : 'bg-gray-300 hover:bg-gray-400 w-2.5'"
            :aria-label="`Go to benefit ${index + 1}`"
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
import { Droplets, Brain, Leaf, Check } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import '../../assets/animations.css'

const currentSlide = ref(0)
const isPaused = ref(false)
let autoPlayInterval = null
let touchStartX = 0
let touchEndX = 0

const benefits = [
  {
    icon: Droplets,
    iconClass: 'bg-gradient-to-br from-green-500 to-emerald-600',
    titleClass: 'text-green-800',
    checkClass: 'bg-green-100',
    title: 'Resource Efficiency',
    subtitle: "AeroTech's precision control system reduces water usage by up to 95% compared to traditional farming methods.",
    description: 'Smart nutrient delivery ensures plants receive exactly what they need, minimizing waste and maximizing efficiency.',
    items: [
      'Reduced water consumption',
      'Optimized nutrient usage',
      'Lower energy requirements',
      'Minimal environmental impact'
    ]
  },
  {
    icon: Brain,
    iconClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
    titleClass: 'text-emerald-800',
    checkClass: 'bg-emerald-100',
    title: 'Smart Technology',
    subtitle: 'AI-powered monitoring and automated adjustments ensure optimal growing conditions 24/7.',
    description: 'Real-time sensors and machine learning algorithms continuously optimize your growing environment for maximum yield.',
    items: [
      'AI-powered monitoring',
      'Automated adjustments',
      'Real-time analytics',
      'Predictive maintenance'
    ]
  },
  {
    icon: Leaf,
    iconClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
    titleClass: 'text-emerald-800',
    checkClass: 'bg-emerald-100',
    title: 'Sustainable Growth',
    subtitle: 'Achieve higher yields while maintaining environmental responsibility and sustainability.',
    description: 'Our eco-friendly approach ensures long-term soil health and biodiversity while maximizing crop production.',
    items: [
      'Increased crop yields',
      'Soil health preservation',
      'Biodiversity support',
      'Carbon footprint reduction'
    ]
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % benefits.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + benefits.length) % benefits.length
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
