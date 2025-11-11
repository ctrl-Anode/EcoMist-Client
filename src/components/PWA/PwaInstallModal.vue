<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      @click.self="closeModal"
    >
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="show"
          class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Header with Gradient -->
          <div class="bg-gradient-to-br from-green-500 to-green-600 px-6 pt-8 pb-6 text-white">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="w-12 h-12 object-contain" />
              </div>
              <div>
                <h2 class="text-2xl font-bold">Install AeroTech</h2>
                <p class="text-green-100 text-sm">Your Smart Aeroponics Assistant</p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Why Install the App?</h3>
            
            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Lightning Fast Access</h4>
                  <p class="text-sm text-gray-600">Launch instantly from your home screen</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Works Offline</h4>
                  <p class="text-sm text-gray-600">Access your data even without internet</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Real-time Notifications</h4>
                  <p class="text-sm text-gray-600">Get instant alerts for your crops</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Native App Feel</h4>
                  <p class="text-sm text-gray-600">Enjoy a full-screen experience</p>
                </div>
              </div>
            </div>

            <!-- Install Button -->
            <button
              @click="installApp"
              :disabled="isInstalling"
              class="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-6 py-4 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
            >
              <svg v-if="!isInstalling" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-lg">{{ isInstalling ? 'Installing...' : 'Install Now' }}</span>
            </button>

            <!-- Skip Button -->
            <button
              @click="closeModal"
              class="w-full mt-3 text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
            >
              Maybe Later
            </button>

            <!-- Info Text -->
            <p class="text-xs text-gray-500 text-center mt-4">
              Free • No Download Required • Takes Less Than 5 Seconds
            </p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  deferredPrompt: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'install']);

const isInstalling = ref(false);

const closeModal = () => {
  emit('close');
};

const installApp = async () => {
  if (!props.deferredPrompt || isInstalling.value) return;
  
  isInstalling.value = true;
  emit('install');
  
  // Reset after a delay
  setTimeout(() => {
    isInstalling.value = false;
  }, 2000);
};
</script>
