<template>
  <div
    class="min-h-screen relative bg-cover bg-bottom bg-fixed"
    style="background-image: url('/aeroponics_bg.png');"
  >
    <!-- Overlay layer -->
    <div class="absolute inset-0 bg-black/30 z-0"></div>

    <!-- Main content container -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Fixed Header -->
      <LandingHeader />

      <!-- Main Content -->
      <main class="flex-1">
        <LandingHero />
        <LandingStats />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingBenefits />
        <LandingFAQ />
        <LandingContact />
        <LandingMap />
      </main>

      <!-- Footer -->
      <LandingFooter />

      <!-- Back-to-Top Button -->
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:-translate-y-1 hover:shadow-2xl z-50 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="w-6 h-6">
          <path d="M18 15l-6-6-6 6"></path>
        </svg>
      </button>

      <!-- Cookie Consent Banner -->
      <div
        v-if="showCookieBanner"
        class="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center z-50 shadow-xl animate-slide-up"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <p id="cookie-banner-description" class="text-sm sm:text-base mb-4 sm:mb-0">
          We use cookies to improve your experience. By using our site, you agree to our
          <a href="#" class="underline hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded">cookie policy</a>.
        </p>
        <div class="flex gap-4">
          <button
            @click="acceptCookies"
            class="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium focus:outline-none focus:ring-4 focus:ring-green-300 shadow-md hover:shadow-lg"
          >
            Accept
          </button>
          <button
            @click="showCookieBanner = false"
            class="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 transition-all font-medium focus:outline-none focus:ring-4 focus:ring-gray-500 shadow-md hover:shadow-lg"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LandingHeader from '../components/LandingPage/LandingHeader.vue';
import LandingHero from '../components/LandingPage/LandingHero.vue';
import LandingStats from '../components/LandingPage/LandingStats.vue';
import LandingFeatures from '../components/LandingPage/LandingFeatures.vue';
import LandingHowItWorks from '../components/LandingPage/LandingHowItWorks.vue';
import LandingBenefits from '../components/LandingPage/LandingBenefits.vue';
import LandingContact from '../components/LandingPage/LandingContact.vue';
import LandingFAQ from '../components/LandingPage/LandingFAQ.vue';
import LandingFooter from '../components/LandingPage/LandingFooter.vue';
import LandingMap from '../components/LandingPage/LandingMap.vue';
import '../assets/animations.css';

// Back-to-Top Button Visibility
const showBackToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// Show Cookie Banner based on local storage
const showCookieBanner = ref(!localStorage.getItem('cookiesAccepted'));
const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true');
  showCookieBanner.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
@keyframes slide-up {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}
</style>