<template>
  <section id="features" class="px-4 sm:px-6 py-12 sm:py-16 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 animate-fade-in">
        <span class="inline-block px-4 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
          Why Choose AeroTech?
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Advanced Features</h2>
        <p class="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Experience the future of agriculture with cutting-edge technology
        </p>
        <div class="w-24 h-1.5 bg-gradient-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
      </div>

      <!-- Desktop/Tablet: Grid View (hidden on mobile) -->
      <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-green-300 duration-300 group cursor-pointer animate-slide-up"
        >
          <div class="text-green-600 mb-6 flex justify-center items-center">
            <div
              class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300"
            >
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
          </div>
          <h3 class="text-green-800 text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">{{ feature.title }}</h3>
          <p class="text-gray-600 group-hover:text-gray-700 transition-colors">{{ feature.description }}</p>
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
              v-for="(feature, index) in features"
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
                    <component :is="feature.icon" class="w-10 h-10" />
                  </div>
                </div>
                <h3 class="text-green-800 text-xl font-bold mb-3">{{ feature.title }}</h3>
                <p class="text-gray-600 px-2">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/95 backdrop-blur-sm text-green-600 p-2 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 z-10"
          aria-label="Previous feature"
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
          aria-label="Next feature"
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
            v-for="(feature, index) in features"
            :key="index"
            @click="goToSlide(index)"
            class="relative h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            :class="currentSlide === index ? 'bg-green-600 w-10' : 'bg-gray-300 hover:bg-gray-400 w-2.5'"
            :aria-label="`Go to feature ${index + 1}`"
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
import { defineAsyncComponent, ref, onMounted, onUnmounted } from "vue";
import '../../assets/animations.css';

const WifiIcon = defineAsyncComponent(() => import("../icons/WifiIcon.vue"));
const SensorsIcon = defineAsyncComponent(() => import("../icons/SensorsIcon.vue"));
const AnalyticsIcon = defineAsyncComponent(() => import("../icons/AnalyticsIcon.vue"));
const AutomationIcon = defineAsyncComponent(() => import("../icons/AutomationIcon.vue"));
const AlertsIcon = defineAsyncComponent(() => import("../icons/AlertsIcon.vue"));
const ResponsiveIcon = defineAsyncComponent(() => import("../icons/ResponsiveIcon.vue"));

const currentSlide = ref(0);
const isPaused = ref(false);
let autoPlayInterval = null;
let touchStartX = 0;
let touchEndX = 0;

const features = [
  {
    title: "WLAN Connectivity",
    description: "Seamless wireless connectivity for all sensors and control systems with robust signal strength.",
    icon: WifiIcon,
  },
  {
    title: "IoT Sensors",
    description: "High-precision sensors for temperature, humidity, pH, nutrient levels, and water flow monitoring.",
    icon: SensorsIcon,
  },
  {
    title: "Real-time Analytics",
    description: "Advanced analytics dashboard with real-time data visualization and historical trends.",
    icon: AnalyticsIcon,
  },
  {
    title: "Automated Control",
    description: "Smart automation for nutrient delivery, misting cycles, and environmental conditions.",
    icon: AutomationIcon,
  },
  {
    title: "Alert System",
    description: "Instant notifications for critical events, system anomalies, and maintenance requirements.",
    icon: AlertsIcon,
  },
  {
    title: "Responsive",
    description: "Control your farm from anywhere with our intuitive responsive web application for desktop or mobile view.",
    icon: ResponsiveIcon,
  },
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % features.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + features.length) % features.length;
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
