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
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const deferredPrompt = ref(null)
const isAppInstalled = ref(false)

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired'); // Debugging log
  e.preventDefault()
  deferredPrompt.value = e
  console.log('Deferred prompt set:', deferredPrompt.value) // Debugging log
})

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed'); // Debugging log
  isAppInstalled.value = true
  console.log('isAppInstalled set to true') // Debugging log
  deferredPrompt.value = null
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
    })
  } else {
    console.log('No deferredPrompt available') // Debugging log
  }
}
</script>

<style scoped>
/* Add any styles for the header if needed */
</style>
