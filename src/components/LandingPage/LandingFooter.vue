<template>
  <footer class="px-4 sm:px-6 relative z-10">
    <div class="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl overflow-hidden">
      <!-- Main Footer Content -->
      <div class="p-6 sm:p-10">
        <!-- Branding - Always visible -->
        <div class="animate-fade-in mb-8 text-center md:text-left">
          <div class="flex justify-center md:justify-start items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="w-8 h-8" loading="lazy" />
            </div>
            <span class="text-green-800 text-2xl font-bold">AeroTech</span>
          </div>
          <p class="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Revolutionizing aeroponics farming with IoT technology for sustainable agriculture.
          </p>
          
          <!-- Social Icons -->
          <div class="flex justify-center md:justify-start space-x-3">
            <a 
              v-for="(icon, idx) in socialIcons" 
              :key="idx" 
              :href="icon.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
              :aria-label="`Visit our ${icon.name}`"
            >
              <component :is="icon.component" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Mobile: Collapsible Sections -->
        <div class="md:hidden space-y-3">
          <!-- Quick Links Section -->
          <div class="border-b border-green-100">
            <button
              @click="toggleSection('quickLinks')"
              class="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
              :aria-expanded="openSections.quickLinks"
            >
              <h3 class="text-green-800 font-bold text-base flex items-center gap-2">
                <span class="w-1 h-5 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
                Quick Links
              </h3>
              <svg 
                class="w-5 h-5 text-green-600 transition-transform duration-300"
                :class="{ 'rotate-180': openSections.quickLinks }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openSections.quickLinks ? '300px' : '0' }"
            >
              <ul class="pb-4 space-y-2">
                <li v-for="(link, idx) in quickLinks" :key="idx">
                  <a 
                    :href="link.href" 
                    class="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center gap-2 py-1"
                  >
                    <ChevronRightIcon class="w-3 h-3 flex-shrink-0" /> 
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Resources Section -->
          <div class="border-b border-green-100">
            <button
              @click="toggleSection('resources')"
              class="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
              :aria-expanded="openSections.resources"
            >
              <h3 class="text-green-800 font-bold text-base flex items-center gap-2">
                <span class="w-1 h-5 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
                Resources
              </h3>
              <svg 
                class="w-5 h-5 text-green-600 transition-transform duration-300"
                :class="{ 'rotate-180': openSections.resources }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openSections.resources ? '300px' : '0' }"
            >
              <ul class="pb-4 space-y-2">
                <li v-for="(link, idx) in resources" :key="idx">
                  <a 
                    :href="link.href" 
                    class="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center gap-2 py-1"
                  >
                    <ChevronRightIcon class="w-3 h-3 flex-shrink-0" /> 
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact Section -->
          <div class="border-b border-green-100">
            <button
              @click="toggleSection('contact')"
              class="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
              :aria-expanded="openSections.contact"
            >
              <h3 class="text-green-800 font-bold text-base flex items-center gap-2">
                <span class="w-1 h-5 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
                Contact
              </h3>
              <svg 
                class="w-5 h-5 text-green-600 transition-transform duration-300"
                :class="{ 'rotate-180': openSections.contact }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openSections.contact ? '300px' : '0' }"
            >
              <ul class="pb-4 space-y-3">
                <li 
                  v-for="(contact, idx) in contacts" 
                  :key="idx" 
                  class="flex items-center gap-3"
                >
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <component :is="contact.icon" class="text-green-600 w-4 h-4" />
                  </div>
                  <span class="text-gray-600 text-xs">{{ contact.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Desktop: Grid Layout -->
        <div class="hidden md:grid grid-cols-3 gap-10">
          <!-- Quick Links -->
          <div class="animate-fade-in" style="animation-delay: 100ms;">
            <h3 class="text-green-800 font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
              Quick Links
            </h3>
            <ul class="space-y-3">
              <li v-for="(link, idx) in quickLinks" :key="idx">
                <a 
                  :href="link.href" 
                  class="text-gray-600 hover:text-green-600 transition-all duration-200 flex items-center gap-2 group"
                >
                  <ChevronRightIcon class="w-4 h-4 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" /> 
                  <span class="group-hover:underline">{{ link.text }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="animate-fade-in" style="animation-delay: 200ms;">
            <h3 class="text-green-800 font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
              Resources
            </h3>
            <ul class="space-y-3">
              <li v-for="(link, idx) in resources" :key="idx">
                <a 
                  :href="link.href" 
                  class="text-gray-600 hover:text-green-600 transition-all duration-200 flex items-center gap-2 group"
                >
                  <ChevronRightIcon class="w-4 h-4 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" /> 
                  <span class="group-hover:underline">{{ link.text }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="animate-fade-in" style="animation-delay: 300ms;">
            <h3 class="text-green-800 font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></span>
              Contact
            </h3>
            <ul class="space-y-4">
              <li 
                v-for="(contact, idx) in contacts" 
                :key="idx" 
                class="flex items-center gap-3 group"
              >
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <component :is="contact.icon" class="text-green-600 w-5 h-5" />
                </div>
                <span class="text-gray-600 text-sm group-hover:text-green-600 transition-colors">{{ contact.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-green-100 px-6 sm:px-8 py-4 sm:py-6 bg-gray-50/50">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p class="text-gray-600 text-xs sm:text-sm text-center md:text-left">
            © 2025 <span class="font-semibold text-green-700">AeroTech</span>. All rights reserved.
          </p>
          <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button 
              v-for="(policy, idx) in policies" 
              :key="idx" 
              @click="policy.onClick" 
              class="text-gray-600 hover:text-green-600 transition-colors text-xs sm:text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-2 py-1"
            >
              {{ policy.text }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <AuthPrivacy :show="showPrivacy" v-if="showPrivacy" @close="showPrivacy = false" />

    <!-- Terms of Service Modal -->
    <AuthTerms :show="showTerms" v-if="showTerms" @close="showTerms = false" />
  </footer>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import '../../assets/animations.css';
import AuthPrivacy from "../Authentication/AuthPrivacy.vue";
import AuthTerms from "../Authentication/AuthTerms.vue";

// Dynamic icon components
const ChevronRightIcon = defineAsyncComponent(() => import("../icons/ChevronRightIcon.vue"));
const PhoneIcon = defineAsyncComponent(() => import("../icons/PhoneIcon.vue"));
const MailIcon = defineAsyncComponent(() => import("../icons/MailIcon.vue"));
const LocationIcon = defineAsyncComponent(() => import("../icons/LocationIcon.vue"));

const FacebookIcon = defineAsyncComponent(() => import("../icons/FacebookIcon.vue"));
const TwitterIcon = defineAsyncComponent(() => import("../icons/TwitterIcon.vue"));
const InstagramIcon = defineAsyncComponent(() => import("../icons/InstagramIcon.vue"));
const LinkedInIcon = defineAsyncComponent(() => import("../icons/LinkedInIcon.vue"));

const showPrivacy = ref(false);
const showTerms = ref(false);

// Collapsible sections state for mobile
const openSections = ref({
  quickLinks: false,
  resources: false,
  contact: false
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

const socialIcons = [
  { link: "#", component: FacebookIcon, name: "Facebook" },
  { link: "#", component: TwitterIcon, name: "Twitter" },
  { link: "#", component: InstagramIcon, name: "Instagram" },
  { link: "#", component: LinkedInIcon, name: "LinkedIn" },
];

const quickLinks = [
  { text: "Features", href: "#features" },
  { text: "How It Works", href: "#how-it-works" },
  { text: "Benefits", href: "#benefits" },
  { text: "Contact Us", href: "#contact" },
  { text: "Login", href: "/auth" },
];

const resources = [
  { text: "Documentation", href: "#" },
  { text: "Knowledge Base", href: "#" },
  { text: "API Reference", href: "#" },
  { text: "Blog", href: "#" },
  { text: "Support", href: "#" },
];

const contacts = [
  { text: "+63 923 4567 890", icon: PhoneIcon },
  { text: "ecomist111@gmail.com", icon: MailIcon },
  { text: "Masipit, Calapan City, Oriental Mindoro", icon: LocationIcon },
];

const policies = [
  { text: "Privacy Policy", onClick: () => (showPrivacy.value = true) },
  { text: "Terms of Service", onClick: () => (showTerms.value = true) },
];
</script>
