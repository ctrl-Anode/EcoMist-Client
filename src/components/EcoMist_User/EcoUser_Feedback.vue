<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Blurred background -->
    <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-lg" @click="handleCancel"></div>

    <!-- Modal -->
    <div class="bg-white rounded-xl p-8 max-w-lg mx-auto w-full relative z-10 shadow-2xl">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Give Feedback</h3>
      <p class="text-gray-600 mb-6">
        We value your feedback! Please let us know how we can improve your experience.
      </p>

      <div class="space-y-5">
        <div>
          <label for="feedback-type" class="block text-sm font-medium text-gray-700 mb-2">
            Feedback Type
          </label>
          <select
            id="feedback-type"
            v-model="type"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug">Bug Report</option>
            <option value="question">Question</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label for="feedback-message" class="block text-sm font-medium text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
          ref="feedbackTextarea"
            id="feedback-message"
            v-model="message"
            rows="5"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Please describe your feedback in detail..."
          ></textarea>
          <!-- Anonymous Checkbox -->
<div class="flex items-center space-x-2 mt-2">
  <input type="checkbox" id="anonymous" v-model="anonymous" class="rounded text-emerald-600 border-gray-300" />
  <label for="anonymous" class="text-sm text-gray-700">Send anonymously</label>
</div>
        </div>
      </div>

      <!-- Reply Section -->
      <div
        v-if="feedback?.reply" 
        class="mt-2 text-sm bg-green-50 p-2 rounded border border-green-200"
        @mouseenter="() => markFeedbackAsRead(feedback.id, feedback.readByUser)"
      >
        <strong>Reply:</strong> {{ feedback.reply }}
      </div>

      <div class="flex justify-between gap-3 mt-8">
        <button
          @click="handleCancel"
          class="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          @click="submit"
          class="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          :disabled="submitting"
        >
          <span v-if="!submitting">Submit Feedback</span>
          <span v-else class="flex items-center gap-2">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </span>
        </button>
      </div>
      <button
        @click="showFeedbackListModal"
        class="mt-4 px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition w-full"
      >
        View My Feedback
      </button>
    </div>
  </div>

  <!-- Feedback List Modal -->
  <EcoUser_FeedbackList v-if="showFeedbackList" @close="hideFeedbackListModal" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc, query, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db, sendSecureNotification } from '../../firebase'
import EcoUser_FeedbackList from './EcoUser_FeedbackList.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const type = ref('suggestion')
const message = ref('')
const submitting = ref(false)
const showFeedbackList = ref(false)
const anonymous = ref(false)
const feedbackTextarea = ref(null)

const auth = getAuth()

const props = defineProps({
  username: String,
  feedback: Object
})
const emit = defineEmits(['submitted', 'close'])

const feedbackSound = new Audio('/sounds/feedback-submitted.mp3')

const submit = async () => {
  if (!message.value.trim()) {
    toast.warning('✏️ Please enter your feedback message.')
    return
  }

  submitting.value = true
  toast.info('Sending feedback...')

  try {
    const user = auth.currentUser
    if (!user) throw new Error('User not logged in')

    const username = anonymous.value ? 'Anonymous' : (props.username || user.email)

    await addDoc(collection(db, 'feedback'), {
      type: type.value,
      message: message.value,
      userId: user.uid,
      username,
      timestamp: serverTimestamp(),
      status: 'pending',
      reply: null,
      repliedAt: null,
      readByUser: false
    })

    await addDoc(collection(db, 'feedback_notifications'), {
      type: 'new_feedback',
      message: `New ${type.value} submitted by ${username}`,
      seen: false,
      timestamp: serverTimestamp()
    })

    // 🔐 Dynamically fetch any available admin FCM token from Firestore and validate token age
    let adminFcmToken = null
    try {
      const adminQuery = query(collection(db, 'admin_settings'))
      const adminSnap = await getDocs(adminQuery)

      adminSnap.forEach(doc => {
        const data = doc.data()
        const tokenAge = data.updatedAt?.toDate?.() ?? new Date()
        const isStale = (Date.now() - tokenAge.getTime()) > 30 * 24 * 60 * 60 * 1000 // 30 days

        if (data.fcmToken && !isStale) {
          adminFcmToken = data.fcmToken
          return // Exit loop once a valid token is found
        } else if (isStale) {
          console.warn(`⚠️ Token for ${data.email} is older than 30 days.`)
        }
      })
    } catch (fetchErr) {
      console.warn('⚠️ Could not fetch FCM token from Firestore:', fetchErr)
    }

    if (adminFcmToken) {
      const response = await sendSecureNotification(
        adminFcmToken,
        '📬 New Feedback Received',
        `${username} sent a ${type.value}.`
      ) || { success: false }

      if (!response.success) {
        console.error('❌ Notification failed:', response?.error || 'Unknown error')
        return
      }

      console.log('✅ Notification sent successfully.')
    }


    feedbackSound.play().catch(err => console.warn('🔇 Audio playback failed:', err))
    toast.success('✅ Feedback submitted successfully!')
    emit('submitted', { success: true, message: 'Successfully submitted' })
    emit('close')

  } catch (err) {
    console.error('❌ Feedback submission error:', err.message || err)
    toast.error('❌ Something went wrong while submitting your feedback.')
    emit('submitted', { success: false, message: err.message || 'Failed' })
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => emit('close')

const markFeedbackAsRead = async (feedbackId, alreadyRead) => {
  if (alreadyRead) return
  try {
    const fbRef = doc(db, 'feedback', feedbackId)
    await updateDoc(fbRef, { readByUser: true })
    console.log('✅ Marked as read')
  } catch (err) {
    console.error('❌ Failed to mark as read:', err)
  }
}

const showFeedbackListModal = () => {
  showFeedbackList.value = true
}

const hideFeedbackListModal = () => {
  showFeedbackList.value = false
}

onMounted(() => {
  feedbackTextarea.value?.focus()
})
</script>

