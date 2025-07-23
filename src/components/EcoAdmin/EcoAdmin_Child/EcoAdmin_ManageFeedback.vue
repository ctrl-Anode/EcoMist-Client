<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold text-green-700 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      User Feedback
    </h2>

    <div class="flex justify-between items-center gap-3 flex-wrap">
      <select v-model="feedbackFilter" class="px-3 py-2 border rounded-lg text-sm">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="addressed">Addressed</option>
      </select>
      <button @click="refreshFeedback" class="refresh-button">Refresh</button>
    </div>

    <div v-if="loading" class="text-center text-gray-500">Loading feedback...</div>
    <div v-else-if="filteredFeedback.length === 0" class="text-center text-gray-500">No feedback found.</div>

    <div v-else class="space-y-4">
      <div v-for="feedback in filteredFeedback" :key="feedback.id" class="border rounded p-4 shadow-sm bg-white">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ feedback.username }}</span>
            <span class="text-xs px-2 py-1 rounded-full" :class="getFeedbackTypeClass(feedback.type)">
              {{ feedback.type }}
            </span>
            <span v-if="feedback.status" class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              {{ feedback.status }}
            </span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(feedback.timestamp) }}</span>
        </div>

        <p class="mt-2 text-gray-700">{{ feedback.message }}</p>

        <div v-if="feedback.reply" class="mt-2 text-sm bg-green-50 p-2 rounded border border-green-200">
          <strong>Reply:</strong> {{ feedback.reply }}
        </div>

        <div class="mt-3 space-y-2">
          <textarea v-model="feedback.reply" placeholder="Write a reply..." class="w-full p-2 border rounded"></textarea>
          <div class="flex justify-end gap-2">
            <button @click="sendReply(feedback)" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Send Reply</button>
            <button v-if="feedback.status !== 'addressed'" @click="markAsAddressed(feedback)" class="px-4 py-1 border rounded hover:bg-gray-100">Mark as Addressed</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { getFirestore, collection, query, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore'
import { format } from 'date-fns'

const db = getFirestore()

const feedbackList = ref([])
const loading = ref(false)
const feedbackFilter = ref('all')

const loadFeedback = async () => {
  loading.value = true
  try {
    const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'))
    const snapshot = await getDocs(q)
    feedbackList.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.error('Error loading feedback:', e)
  } finally {
    loading.value = false
  }
}

const refreshFeedback = () => {
  loadFeedback()
}

const sendReply = async (feedback) => {
  try {
    const fbRef = doc(db, 'feedback', feedback.id)
    await updateDoc(fbRef, {
      reply: feedback.reply,
      repliedAt: new Date(),
      status: 'addressed',
      readByUser: false
    })
    alert('Reply sent successfully.')
    loadFeedback()
  } catch (e) {
    console.error('Reply error:', e)
    alert('Failed to send reply.')
  }
}

const markAsAddressed = async (feedback) => {
  try {
    const fbRef = doc(db, 'feedback', feedback.id)
    await updateDoc(fbRef, {
      status: 'addressed'
    })
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

const filteredFeedback = computed(() => {
  if (feedbackFilter.value === 'all') return feedbackList.value
  return feedbackList.value.filter(fb => fb.status === feedbackFilter.value)
})

onMounted(() => {
  loadFeedback()
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
