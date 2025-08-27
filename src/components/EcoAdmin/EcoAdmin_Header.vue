<template>
  <header class="bg-gradient-to-r from-emerald-700 to-green-600 shadow-lg z-10">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo and Sidebar Toggle -->
      <div class="flex items-center">
        <button @click="$emit('toggle-sidebar')" class="mr-3 md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="h-7 w-7 mr-3 rounded-lg shadow-md" @error="handleLogoError" />
        <div>
          <h1 class="text-xl font-bold text-white">AeroTech</h1>
        </div>
      </div>

      <!-- Right-side Buttons -->
      <div class="flex items-center space-x-3">
        <!-- Feedback
        <button @click="$emit('open-feedback')" class="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </button> -->

        <!-- Notifications -->
<div class="relative">
  <button
    id="feedback-bell"
    class="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-10"
    :class="{ 'animate-bounce': notificationCount > 0 }"
    @click="toggleFeedbackDropdown"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <span v-if="notificationCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{{ notificationCount }}</span>
  </button>

  <!-- Notification Dropdown -->
  <transition name="fade">
    <div
      v-if="feedbackDropdownOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50"
    >
      <div class="px-4 py-2 text-sm text-gray-700 font-semibold flex justify-between items-center">
        Notifications
        <button v-if="notificationCount > 0" @click="markAllAsSeen" class="text-emerald-600 text-xs hover:underline">Mark all as seen</button>
      </div>

      <div v-if="notifications.length === 0" class="px-4 py-2 text-sm text-gray-500">
        No new notifications.
      </div>

      <div v-else class="max-h-64 overflow-y-auto">
        <div
          v-for="notif in notifications"
          :key="notif.id"
          class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer border-b"
          @click="redirectToFeedback"
        >
          <div class="font-medium truncate">{{ notif.message }}</div>
          <div class="text-xs text-gray-500">{{ formatRelativeTime(notif.timestamp) }}</div>
        </div>
      </div>

      <router-link 
  :to="{ path: '/admin/manage-feedback', query: { refresh: 'true' } }" 
  class="block text-center py-2 text-sm text-emerald-700 hover:underline"
>
  View All Feedback
</router-link>
    </div>
  </transition>
</div>


        <!-- User Menu -->
        <div class="relative" ref="userMenuRef">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
            <div class="bg-white text-emerald-700 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shadow overflow-hidden">
              <img
                v-if="profileImageUrl"
                :src="profileImageUrl"
                alt="User profile picture"
                class="h-full w-full object-cover rounded-full"
                @error="handleImageError"
              />
              <template v-else>{{ getInitials(username) }}</template>
            </div>
            <span class="text-white hidden md:block">{{ username }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            v-if="userMenuOpenState"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
            @click.stop
          >
            <router-link to="/admin/profile-display" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeUserMenu">Profile</router-link>
            <router-link to="/admin/settings/profile-display" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeUserMenu">Settings</router-link>
            <a href="#" @click.prevent="confirmLogout" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter
import { db } from '../../firebase'
import { collection, onSnapshot, query, where, orderBy, doc, updateDoc, getDocs, writeBatch } from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'

const router = useRouter() // Initialize router

const notifications = ref([])
const notificationCount = ref(0)
const feedbackDropdownOpen = ref(false)
const audio = new Audio('public/sounds/notification-bell-sound.mp3')

const props = defineProps({
  username: String,
  profileImageUrl: String,
  userMenuOpen: Boolean
})

const emits = defineEmits([
  'toggle-sidebar',
  'toggle-user-menu',
  'open-feedback',
  'confirm-logout'
])

const userMenuRef = ref(null)
const userMenuOpenState = ref(false)

const toggleUserMenu = () => {
  userMenuOpenState.value = !userMenuOpenState.value
  emits('toggle-user-menu', userMenuOpenState.value)
}

const closeUserMenu = () => {
  userMenuOpenState.value = false
  emits('toggle-user-menu', false)
}

const confirmLogout = () => {
  closeUserMenu()
  emits('confirm-logout')
}

const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    closeUserMenu()
  }

  const feedbackBtn = document.getElementById('feedback-bell')
  if (feedbackDropdownOpen.value && feedbackBtn && !feedbackBtn.contains(event.target)) {
    feedbackDropdownOpen.value = false
  }
}

const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
  e.target.parentNode.classList.add('bg-emerald-600')
  e.target.parentNode.textContent = getInitials(props.username)
}

const handleLogoError = (e) => {
  e.target.src =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="%2316a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
}

const preloadSound = () => {
  const audio = new Audio('public/sounds/notification-bell-sound.mp3')
  audio.load()
}

const toggleFeedbackDropdown = () => {
  feedbackDropdownOpen.value = !feedbackDropdownOpen.value
  if (feedbackDropdownOpen.value && notificationCount.value > 0) {
    markAllAsSeen()
  }
}

const markAllAsSeen = async () => {
  try {
    const q = query(
      collection(db, 'feedback_notifications'),
      where('seen', '==', false)
    )
    const snapshot = await getDocs(q)
    const batch = writeBatch(db)
    snapshot.forEach(docSnap => {
      batch.update(docSnap.ref, { seen: true })
    })
    await batch.commit()
    console.log('✅ All feedback marked as seen')
    //toast.success('✅ Reply Sent!')
  } catch (err) {
    console.error('❌ Error marking all as seen:', err)
    //toast.error('✅ Reply Sent!')
  }
}

onMounted(() => {
  preloadSound()
  document.addEventListener('click', handleClickOutside)
  fetchNotifications()

  const q = query(
    collection(db, 'feedback_notifications'),
    where('seen', '==', false),
    orderBy('timestamp', 'desc')
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const newCount = snapshot.size
    if (newCount > notificationCount.value) {
      audio.play().catch((err) => {
        console.error('Audio playback failed:', err)
      })
    }
    notificationCount.value = newCount
  })

  onBeforeUnmount(() => {
    unsubscribe()
    document.removeEventListener('click', handleClickOutside)
  })
})
const fetchNotifications = () => {
  const q = query(
    collection(db, 'feedback_notifications'),
    orderBy('timestamp', 'desc')
  )

  onSnapshot(q, (snapshot) => {
    const items = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      items.push({
        id: doc.id,
        ...data
      })
    })

    // Only keep 10 most recent
    notifications.value = items.slice(0, 10)
    notificationCount.value = items.filter(n => !n.seen).length
  })
}
const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return formatDistanceToNow(date, { addSuffix: true })
}

const redirectToFeedback = () => {
  router.push({ 
    path: '/admin/manage-feedback', 
    query: { refresh: 'true' } 
  })
  feedbackDropdownOpen.value = false
}

</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
