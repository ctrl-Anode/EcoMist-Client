<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="transform translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-full opacity-0"
  >
    <div
      v-if="show && !isDismissed"
      class="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-4 shadow-2xl"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <!-- Icon & Content -->
        <div class="flex items-center gap-3 flex-1">
          <div class="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
            <img src="/aerotech-rbg-index.png" alt="AeroTech" class="w-9 h-9 object-contain" />
          </div>
          
          <div class="flex-1">
            <h3 class="font-bold text-base sm:text-lg mb-0.5">Install AeroTech App</h3>
            <p class="text-xs sm:text-sm text-green-50">
              Access faster, work offline, and get notifications. No download needed!
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            @click="handleInstall"
            class="bg-white text-green-600 font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-green-50 active:scale-95 transition-all shadow-md text-sm sm:text-base whitespace-nowrap"
          >
            Install
          </button>
          
          <button
            @click="dismiss"
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['install', 'dismiss']);

const isDismissed = ref(false);

onMounted(() => {
  // Check if user has dismissed the banner before
  const dismissed = localStorage.getItem('pwaInstallBannerDismissed');
  if (dismissed === 'true') {
    isDismissed.value = true;
  }
});

const handleInstall = () => {
  emit('install');
};

const dismiss = () => {
  isDismissed.value = true;
  localStorage.setItem('pwaInstallBannerDismissed', 'true');
  emit('dismiss');
};
</script>
