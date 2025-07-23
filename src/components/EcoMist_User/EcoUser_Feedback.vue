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
            id="feedback-message"
            v-model="message"
            rows="5"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Please describe your feedback in detail..."
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-8">
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const props = defineProps({
  username: String
})
const emit = defineEmits(['submitted', 'close'])

const db = getFirestore()
const auth = getAuth()

const type = ref('suggestion')
const message = ref('')
const submitting = ref(false)

const submit = async () => {
  if (!message.value.trim()) {
    alert('Please enter your feedback message.')
    return
  }

  submitting.value = true
  try {
    const user = auth.currentUser
    if (!user) throw new Error('User not logged in')

    // Save feedback to Firestore
    await addDoc(collection(db, 'feedback'), {
      type: type.value,
      message: message.value,
      userId: user.uid,
      username: props.username || user.email,
      timestamp: serverTimestamp(),
      status: 'pending',
      reply: null,
      repliedAt: null,
      readByUser: false
    })

    // Optional: trigger admin notification (can be watched by admin)
    await addDoc(collection(db, 'feedback_notifications'), {
      type: 'new_feedback',
      message: `New ${type.value} submitted by ${props.username}`,
      seen: false,
      timestamp: serverTimestamp()
    })

    emit('submitted')
    emit('close')
  } catch (err) {
    console.error('Feedback submission error:', err)
    alert('Failed to submit feedback. Please try again.')
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => emit('close')
</script>
