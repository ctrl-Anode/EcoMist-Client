<template>
  <section id="faq" class="px-4 sm:px-6 py-8 sm:py-12 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 animate-fade-in">
        <span class="inline-block px-4 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
          Got Questions?
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Frequently Asked Questions</h2>
        <p class="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Everything you need to know about AeroTech
        </p>
        <div class="w-24 h-1.5 bg-gradient-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
      </div>

      <!-- Desktop/Tablet: Accordion View -->
      <div class="hidden md:block max-w-4xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl overflow-hidden hover:shadow-2xl hover:border-green-300 transition-all duration-300 animate-slide-up"
        >
          <button
            @click="toggleFAQ(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-inset transition-all group"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
          >
            <h3 class="text-lg sm:text-xl font-semibold text-green-800 pr-4 group-hover:text-green-600 transition-colors">
              {{ faq.question }}
            </h3>
            <div 
              class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-all duration-300"
              :class="{ 'rotate-180': openIndex === index }"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="none"
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="text-green-600 transition-transform duration-300"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </button>
          
          <div
            :id="`faq-answer-${index}`"
            class="overflow-hidden transition-all duration-300 ease-in-out"
            :style="{ 
              maxHeight: openIndex === index ? `${contentHeights[index]}px` : '0px',
              opacity: openIndex === index ? '1' : '0'
            }"
          >
            <div 
              :ref="el => setContentRef(el, index)"
              class="px-6 pb-5"
            >
              <div class="pt-2 border-t border-green-100">
                <p class="text-gray-600 text-base sm:text-lg leading-relaxed">{{ faq.answer }}</p>
              </div>
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
              v-for="(faq, index) in faqs"
              :key="index"
              class="w-full flex-shrink-0 px-2"
            >
              <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-6"
                :class="{ 'animate-scale-in': currentSlide === index }"
              >
                <h3 class="text-xl font-bold text-green-800 mb-4">
                  {{ faq.question }}
                </h3>
                <p class="text-gray-600 text-base leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/95 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10"
          aria-label="Previous FAQ"
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
          aria-label="Next FAQ"
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
            v-for="(faq, index) in faqs"
            :key="index"
            @click="goToSlide(index)"
            class="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            :class="currentSlide === index ? 'bg-green-600 w-10' : 'bg-gray-300 hover:bg-gray-400 w-2.5'"
            :aria-label="`Go to FAQ ${index + 1}`"
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import '../../assets/animations.css'

// Accordion state (desktop)
const openIndex = ref(null)
const contentHeights = ref({})
const contentRefs = ref({})

// Carousel state (mobile)
const currentSlide = ref(0)
const isPaused = ref(false)
let autoPlayInterval = null
let touchStartX = 0
let touchEndX = 0

const faqs = [
  {
    question: "What is AeroTech?",
    answer:
      "AeroTech is an IoT-driven aeroponics farming system designed to optimize growth, reduce resource consumption, and provide real-time insights for sustainable agriculture.",
  },
  {
    question: "How does AeroTech work?",
    answer:
      "AeroTech uses IoT sensors to monitor environmental conditions and automate nutrient delivery and misting cycles for optimal plant growth. The system connects to your wireless network for seamless data transmission and control.",
  },
  {
    question: "Is AeroTech suitable for all crops?",
    answer:
      "AeroTech is ideal for a wide range of crops, particularly those that thrive in aeroponic systems, such as leafy greens, herbs, and many other high-value crops that benefit from precise environmental control.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide comprehensive support including installation guidance, system training, regular software updates, and technical assistance to ensure your AeroTech system operates at peak performance.",
  },
]

// Accordion functions
const setContentRef = (el, index) => {
  if (el) {
    contentRefs.value[index] = el
  }
}

const toggleFAQ = async (index) => {
  if (openIndex.value === index) {
    openIndex.value = null
  } else {
    openIndex.value = index
    await nextTick()
    if (contentRefs.value[index]) {
      contentHeights.value[index] = contentRefs.value[index].scrollHeight
    }
  }
}

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % faqs.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + faqs.length) % faqs.length
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
  // Calculate all content heights for accordion
  Object.keys(contentRefs.value).forEach(index => {
    if (contentRefs.value[index]) {
      contentHeights.value[index] = contentRefs.value[index].scrollHeight
    }
  })
  
  // Start carousel autoplay
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
</style>
