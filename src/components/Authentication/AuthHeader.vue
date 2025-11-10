<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 px-3 sm:px-4 md:px-6 lg:px-8 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-xl"
    role="navigation"
    aria-label="Primary navigation"
    tabindex="0"
  >
    <div class="flex justify-between items-center py-2 sm:py-3 md:py-4 relative">
      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden absolute left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-green-800 bg-green-100 rounded-lg active:bg-green-200 touch-manipulation"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        tabindex="0"
      >
        <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <!-- Branding -->
      <div class="flex items-center gap-2 sm:gap-3 mx-auto md:mx-0">
        <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="w-8 h-8 sm:w-10 sm:h-10 object-contain" loading="lazy" />
        <span class="text-green-800 text-lg sm:text-xl md:text-3xl font-bold">AeroTech</span>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-4 lg:gap-8" role="menubar" aria-label="Main menu">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          @click="handleNavClick(link)"
          class="text-green-800 hover:text-green-600 transition-colors font-medium text-sm lg:text-base relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
          role="menuitem"
          tabindex="0"
        >
          {{ link.label }}
        </a>

        <!-- Install App Button for Desktop -->
        <button
          v-if="showInstallButton"
          @click="installApp"
          :disabled="isInstalling"
          class="group relative bg-white text-green-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border-2 border-green-600 hover:bg-green-50 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg active:scale-95 touch-manipulation font-medium text-sm lg:text-base whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          role="menuitem"
          tabindex="0"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <svg v-if="!isInstalling" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="relative z-10">{{ isInstalling ? 'Installing...' : 'Install App' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Menu -->
    <transition
      name="mobile-menu"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-8 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-8 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="md:hidden absolute top-full left-0 w-full border-t border-green-100 p-4 bg-white/95 backdrop-blur-md shadow-md"
        role="menu"
        aria-label="Mobile menu"
      >
        <div class="flex flex-col space-y-4">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            @click="handleNavClick(link)"
            class="text-green-800 py-2 hover:text-green-600 transition-colors font-medium active:bg-green-50 rounded-lg px-3 touch-manipulation"
            role="menuitem"
            tabindex="0"
          >
            {{ link.label }}
          </a>

          <!-- Install App Button for Mobile -->
          <button
            v-if="showInstallButton"
            @click="installApp"
            :disabled="isInstalling"
            class="group relative bg-white text-green-700 px-4 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 flex items-center justify-center gap-2 active:scale-95 touch-manipulation font-medium disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            role="menuitem"
            tabindex="0"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-500/10 opacity-0 group-active:opacity-100 transition-opacity"></span>
            <svg v-if="!isInstalling" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="relative z-10">{{ isInstalling ? 'Installing...' : 'Install App' }}</span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const mobileMenuOpen = ref(false);
const deferredPrompt = ref(null);
const showInstallButton = ref(true);
const isInstalling = ref(false);

const navLinks = [
  { id: "landing_page", label: "Home", href: "/" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "how-it-works", label: "How It Works", href: "/#how-it-works" },
  { id: "benefits", label: "Benefits", href: "/#benefits" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const handleNavClick = (link) => {
  const isHashLink = link.href.startsWith("/#");
  const isCurrentPage = route.path === "/";

  if (isHashLink && isCurrentPage) {
    // Stay on the current page and scroll
    const id = link.href.split("#")[1];
    scrollToSection(id);
  } else {
    // Navigate to the page
    router.push(link.href);
  }

  closeMobileMenu();
};

const installApp = async () => {
  if (!deferredPrompt.value || isInstalling.value) return;

  try {
    isInstalling.value = true;
    await deferredPrompt.value.prompt();
    
    const choiceResult = await deferredPrompt.value.userChoice;
    
    if (choiceResult.outcome === "accepted") {
      toast.success("🎉 App installed successfully! You can now use AeroTech offline.", {
        timeout: 5000,
      });
      showInstallButton.value = false;
      // Store installation status in localStorage
      localStorage.setItem("pwaInstalled", "true");
    } else {
      toast.info("Installation cancelled. You can install the app anytime from the menu.", {
        timeout: 4000,
      });
    }
    
    deferredPrompt.value = null;
  } catch (error) {
    console.error("Error during installation:", error);
    toast.error("Failed to install the app. Please try again.", {
      timeout: 3000,
    });
  } finally {
    isInstalling.value = false;
  }
};

onMounted(() => {
  // Check if app is already installed
  const isInstalled = localStorage.getItem("pwaInstalled") === "true";
  
  // Check if running as standalone (installed PWA)
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                       window.navigator.standalone === true;
  
  if (isInstalled || isStandalone) {
    showInstallButton.value = false;
    return;
  }

  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
    showInstallButton.value = true;
  };

  const handleAppInstalled = () => {
    showInstallButton.value = false;
    localStorage.setItem("pwaInstalled", "true");
    toast.success("✅ App installed successfully!", {
      timeout: 3000,
    });
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);

  onUnmounted(() => {
    window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.removeEventListener("appinstalled", handleAppInstalled);
  });
});
</script>
