<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-green-700 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      User Feedback
    </h2>

    <!-- Filter and Refresh -->
    <div class="flex justify-between items-center gap-3 flex-wrap">
      <select v-model="feedbackFilter" class="px-3 py-2 border rounded-lg text-sm">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="addressed">Addressed</option>
        <option value="unread">Unread by User</option>
      </select>
      <button @click="refreshFeedback" class="refresh-button">Refresh</button>
    </div>

    <!-- Loader / No Data -->
    <div v-if="loading" class="text-center text-gray-500">Loading feedback...</div>
    <div v-else-if="filteredFeedback.length === 0" class="text-center text-gray-500">No feedback found.</div>

    <!-- Feedback List -->
    <div v-else class="space-y-4">
      <div
        v-for="feedback in filteredFeedback"
        :key="feedback.id"
        class="border rounded p-4 shadow-sm bg-white space-y-2"
      >
        <!-- Header -->
        <div class="flex justify-between items-center">
          <div class="flex flex-wrap items-center gap-2 text-sm">
            <span class="font-medium">{{ feedback.username }}</span>
            <span :class="getFeedbackTypeClass(feedback.type)" class="px-2 py-1 rounded-full text-xs capitalize">
              {{ feedback.type }}
            </span>
            <span :class="getStatusClass(feedback.status)" class="px-2 py-1 rounded-full text-xs capitalize">
              {{ feedback.status || 'unread' }}
            </span>
            <span
              v-if="feedback.reply && feedback.readByUser"
              class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              ✓ Seen by User
            </span>
          </div>
          <span class="text-xs text-gray-500 italic">{{ formatDate(feedback.timestamp) }}</span>
        </div>

        <!-- Message -->
        <p class="text-gray-800 text-sm">{{ feedback.message }}</p>

        <!-- Existing Reply -->
        <div
          v-if="feedback.reply && !feedback.replyEditing"
          class="bg-green-50 border border-green-200 p-3 rounded text-sm text-gray-800"
        >
          <strong>Reply:</strong> {{ feedback.reply }}
        </div>

        <!-- Reply Input -->
        <div class="space-y-2">
          <textarea
            v-model="feedback.reply"
            class="w-full p-2 border rounded text-sm"
            placeholder="Write a reply..."
          ></textarea>
          <div class="flex justify-end gap-2">
            <button
              @click="sendReply(feedback)"
              class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Send Reply
            </button>
            <button
              v-if="feedback.status !== 'addressed'"
              @click="markAsAddressed(feedback)"
              class="px-4 py-1 border rounded hover:bg-gray-100"
            >
              Mark as Addressed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  onSnapshot,
  getDoc,
  addDoc,
} from 'firebase/firestore'
import { format } from 'date-fns'
import { useRoute,useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { sendSecureNotification } from '../../../firebase'

const db = getFirestore()
const router = useRouter()
const route = useRoute()
const feedbackList = ref([])
const loading = ref(false)
const feedbackFilter = ref('all')
const newFeedbackSound = new Audio('/sounds/notification-bell-sound.mp3')
const toast = useToast()

let unsubscribe = null
const previousIds = ref(new Set())
const loadFeedback = () => {
  loading.value = true
  const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'))

  if (unsubscribe) unsubscribe()

  unsubscribe = onSnapshot(q, (snapshot) => {
    const newItems = []
    const currentIds = new Set()

    snapshot.forEach(doc => {
      currentIds.add(doc.id)

      if (!previousIds.value.has(doc.id)) {
        newItems.push(doc.data())
      }
    })

    feedbackList.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Check for new feedback
    if (previousIds.value.size > 0 && newItems.length > 0) {
      if (document.hasFocus()) {
  newFeedbackSound.play().catch(err => console.warn('🔇 Sound failed:', err))
}
      toast.success(`📬 ${newItems.length} new feedback received`)
    }

    previousIds.value = currentIds
    loading.value = false
  }, (error) => {
    console.error('📛 Feedback snapshot error:', error)
    toast.error('Feedback loading failed')
    loading.value = false
  })
}


const refreshFeedback = () => {
  loadFeedback()
}

const sendReply = async (feedback) => {
  try {
    const now = new Date()
    const deleteAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // auto-delete in 7 days

    // Update main feedback document
    const fbRef = doc(db, 'feedback', feedback.id)
    await updateDoc(fbRef, {
      reply: feedback.reply,
      repliedAt: now,
      status: 'addressed',
      readByUser: false,
      deleteAt
    })

    // Add to feedback_replies for bell tracking
    await addDoc(collection(db, 'feedback_replies'), {
      userId: feedback.userId,
      feedbackId: feedback.id,
      reply: feedback.reply,
      seen: false,
      timestamp: now
    })

    // 🔔 Send FCM notification to user
    const userSettingsRef = doc(db, 'user_settings', feedback.userId)
    const userSnap = await getDoc(userSettingsRef)

    if (userSnap.exists()) {
      const { fcmToken, email } = userSnap.data()

      if (fcmToken) {
        const result = await sendSecureNotification(
          fcmToken,
          '📩 Admin Reply',
          'You have a new reply from Eco-Mist Admin.'
        )
        if (!result.success) {
          console.warn('⚠️ Failed to send user FCM:', result.error)
        }
      }
    }

    // Sound & toast
    const replySound = new Audio('/sounds/feedback-submitted.mp3')
setTimeout(() => {
  replySound.play().catch(err => {
    console.warn('🔇 Sound failed:', err)
  })
}, 100)

    toast.success('✅ Reply sent successfully!')
    loadFeedback()

  } catch (e) {
    console.error('❌ Reply error:', e)
    toast.error('❌ Failed to send reply.')
  }
}

const markAsAddressed = async (feedback) => {
  try {
    const fbRef = doc(db, 'feedback', feedback.id)
    await updateDoc(fbRef, {
      status: 'addressed'
    })

    // Play sound effect
    const markAsReadSound = new Audio('/sounds/markasread.mp3')
    markAsReadSound.play().catch(err => console.error('🔇 Sound playback failed:', err))

    loadFeedback()
  } catch (e) {
    console.error('Status update error:', e)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return format(timestamp.toDate ? timestamp.toDate() : new Date(timestamp), 'PPpp')
}

const getFeedbackTypeClass = (type) => {
  const map = {
    suggestion: 'bg-blue-100 text-blue-800',
    bug: 'bg-red-100 text-red-800',
    question: 'bg-yellow-100 text-yellow-800',
    other: 'bg-purple-100 text-purple-800'
  }
  return map[type] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800',
    addressed: 'bg-green-100 text-green-800',
    unread: 'bg-gray-200 text-gray-800'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

const filteredFeedback = computed(() => {
  if (feedbackFilter.value === 'all') return feedbackList.value
  if (feedbackFilter.value === 'unread') return feedbackList.value.filter(f => !f.readByUser && f.reply)
  return feedbackList.value.filter(fb => fb.status === feedbackFilter.value)
})

onMounted(() => {
  if (route.query.refresh === 'true') {
    console.log('🔄 Triggered by redirect with refresh')
    loadFeedback()

    // Clear query param without reloading
    router.replace({ 
      path: route.path, 
      query: {} 
    })
  } else {
    loadFeedback()
  }
})
onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>

<style scoped>
.refresh-button {
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.refresh-button:hover {
  background-color: #f3f4f6;
}
</style>
