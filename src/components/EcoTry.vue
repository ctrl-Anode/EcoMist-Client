<template>
  <div>
    <header class="flex items-center justify-between bg-gray-100 p-4 shadow">
      <h1 class="text-xl font-bold">EcoMist</h1>
      <button 
        @click="installPWA" 
        v-if="deferredPrompt && !isAppInstalled" 
        class="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Download App
      </button>
      <p v-if="isIOS" class="text-sm text-gray-600">
        To install on iOS, tap the "Share" button and select "Add to Home Screen."
      </p>
    </header>

    <div 
      v-if="showBanner" 
      class="fixed bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg"
    >
      <h2 class="text-lg font-semibold">Install EcoMist</h2>
      <p class="text-gray-700">Get the full app experience by installing EcoMist on your device.</p>
      <button 
        @click="installPWA" 
        class="mt-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Install Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)
const isAppInstalled = ref(false)
const isIOS = ref(/iPhone|iPad|iPod/i.test(navigator.userAgent))
const showBanner = ref(false)

onMounted(() => {
  // Check if the banner should be shown from localStorage
  const storedPrompt = localStorage.getItem('deferredPrompt')
  if (storedPrompt) {
    deferredPrompt.value = JSON.parse(storedPrompt)
    showBanner.value = true
  }
})

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired'); // Debugging log
  e.preventDefault()
  deferredPrompt.value = e
  localStorage.setItem('deferredPrompt', JSON.stringify(e))
  showBanner.value = true
  console.log('Deferred prompt set and stored:', deferredPrompt.value) // Debugging log
})

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed'); // Debugging log
  isAppInstalled.value = true
  showBanner.value = false
  localStorage.removeItem('deferredPrompt')
  console.log('isAppInstalled set to true and banner hidden') // Debugging log
})

function installPWA() {
  console.log('Install PWA triggered') // Debugging log
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then(choiceResult => {
      console.log('User choice result:', choiceResult) // Debugging log
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt.value = null
      showBanner.value = false
      localStorage.removeItem('deferredPrompt')
    })
  } else {
    console.log('No deferredPrompt available') // Debugging log
  }
}
</script>

<style scoped>
/* Add any styles for the header or banner if needed */
.fixed {
  position: fixed;
}
</style>
