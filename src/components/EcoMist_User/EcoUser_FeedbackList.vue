<template>
  <!-- Modal Overlay with smooth transitions -->
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="true"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @keydown.esc="emitClose"
      >
        <!-- Backdrop -->
        <Transition name="backdrop" appear>
          <div 
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="emitClose"
            aria-hidden="true"
          ></div>
        </Transition>

        <!-- Modal Content -->
        <Transition name="modal-content" appear>
          <section 
            class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] relative z-10 shadow-2xl overflow-hidden"
            @click.stop
          >
            <!-- Header -->
            <header class="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MessageSquare class="w-5 h-5 text-emerald-600" />
                </div>
                <h2 id="modal-title" class="text-2xl font-bold text-gray-900">
                  My Feedback
                </h2>
              </div>
              <button 
                @click="emitClose"
                class="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Close modal"
              >
                <X class="w-5 h-5 text-gray-500" />
              </button>
            </header>

            <!-- Content -->
            <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
              <!-- Loading State -->
              <div v-if="loading" class="flex flex-col items-center justify-center py-16 px-6">
                <div class="animate-spin w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full mb-4"></div>
                <p class="text-gray-600 font-medium">Loading your feedback...</p>
                <p class="text-sm text-gray-500 mt-1">Please wait a moment</p>
              </div>

              <!-- Empty State -->
              <div v-else-if="feedbackList.length === 0" class="flex flex-col items-center justify-center py-16 px-6">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">No feedback yet</h3>
                <p class="text-gray-500 text-center max-w-sm">
                  You haven't submitted any feedback. Share your thoughts to help us improve!
                </p>
              </div>

              <!-- Feedback List -->
              <div v-else class="p-6 space-y-4">
                <TransitionGroup name="feedback-list" tag="div" class="space-y-4">
                  <article
                    v-for="feedback in feedbackList"
                    :key="feedback.id"
                    class="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                  >
                    <!-- Feedback Header -->
                    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div class="flex items-center gap-3">
                        <span 
                          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium capitalize"
                          :class="getTypeClass(feedback.type)"
                        >
                          <component :is="getTypeIcon(feedback.type)" class="w-4 h-4" />
                          {{ feedback.type }}
                        </span>
                        <span 
                          v-if="feedback.status" 
                          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          :class="getStatusClass(feedback.status)"
                        >
                          <component :is="getStatusIcon(feedback.status)" class="w-3 h-3" />
                          {{ feedback.status }}
                        </span>
                      </div>
                      <time class="text-sm text-gray-500 flex items-center gap-1.5">
                        <Clock class="w-4 h-4" />
                        {{ formatDate(feedback.timestamp) }}
                      </time>
                    </header>

                    <!-- Feedback Message -->
                    <div class="mb-4">
                      <p class="text-gray-800 leading-relaxed">{{ feedback.message }}</p>
                    </div>

                    <!-- Admin Reply -->
                    <Transition name="reply" mode="out-in">
                      <div
                        v-if="feedback.reply"
                        class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 relative overflow-hidden"
                        @mouseenter="() => markAsRead(feedback)"
                      >
                        <!-- Reply decoration -->
                        <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
                        
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Shield class="w-4 h-4 text-emerald-600" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-2">
                              <h4 class="font-semibold text-emerald-800">Admin Reply</h4>
                              <span v-if="feedback.readByUser" class="inline-flex items-center gap-1 text-xs text-emerald-600">
                                <CheckCircle class="w-3 h-3" />
                                Read
                              </span>
                            </div>
                            <p class="text-gray-700 leading-relaxed">{{ feedback.reply }}</p>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </article>
                </TransitionGroup>
              </div>
            </div>

            <!-- Footer -->
            <footer class="border-t border-gray-100 p-6 bg-gray-50">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600">
                  {{ feedbackList.length }} feedback item{{ feedbackList.length !== 1 ? 's' : '' }}
                </p>
                <button
                  @click="emitClose"
                  class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </footer>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  writeBatch,
  onSnapshot
} from 'firebase/firestore'
import { 
  X, 
  MessageSquare, 
  Clock, 
  Shield, 
  CheckCircle, 
  Bug, 
  Lightbulb, 
  Heart, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader
} from 'lucide-vue-next'
import { getAuth } from 'firebase/auth'
import { formatDistanceToNow, format } from 'date-fns'
import { db } from "../../firebase";

const auth = getAuth()

const feedbackList = ref([])
const loading = ref(true)
const showModal = ref(false)
const showBell = ref(false)

const replyBellSound = new Audio('/sounds/notification-bell-sound.mp3')

let unsubscribe = null // to store the listener so we can unsubscribe on unmount

const loadFeedback = async () => {
  loading.value = true
  try {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, 'feedback'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    )

    // Clean up old listener if it exists
    if (unsubscribe) unsubscribe()

    unsubscribe = onSnapshot(q, (snapshot) => {
      feedbackList.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      loading.value = false
    })
  } catch (err) {
    console.error('❌ Failed to load feedback:', err)
    loading.value = false
  }
}


const markAsRead = async (feedback) => {
  if (feedback.readByUser) return
  try {
    const fbRef = doc(db, 'feedback', feedback.id)
    await updateDoc(fbRef, { readByUser: true })
    feedback.readByUser = true
    replyBellSound.play().catch((err) => {
      console.error('Audio playback failed:', err)
    })
  } catch (err) {
    console.error('Error marking reply as read:', err)
  }
}

// const autoDeleteRepliedFeedback = async () => {
//   try {
//     const q = query(
//       collection(db, 'feedback'),
//       where('reply', '!=', null),
//       where('timestamp', '<=', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
//     )
//     const snapshot = await getDocs(q)
//     const batch = writeBatch(db)
//     snapshot.forEach(docSnap => {
//       batch.delete(docSnap.ref)
//     })
//     await batch.commit()
//     console.log('✅ Auto-deleted replied feedback older than 7 days')
//   } catch (err) {
//     console.error('❌ Error auto-deleting feedback:', err)
//   }
// }

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return `${formatDistanceToNow(date, { addSuffix: true })} (${format(date, 'PPpp')})`
}

const getTypeClass = (type) => {
  const classes = {
    bug: 'bg-red-100 text-red-800 border border-red-200',
    feature: 'bg-blue-100 text-blue-800 border border-blue-200',
    improvement: 'bg-purple-100 text-purple-800 border border-purple-200',
    compliment: 'bg-green-100 text-green-800 border border-green-200',
    other: 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return classes[type] || classes.other
}

const getTypeIcon = (type) => {
  const icons = {
    bug: Bug,
    feature: Lightbulb,
    improvement: AlertCircle,
    compliment: Heart,
    other: MessageSquare
  }
  return icons[type] || icons.other
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border border-blue-200',
    addressed: 'bg-green-100 text-green-800 border border-green-200',
    closed: 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return classes[status] || classes.pending
}

const getStatusIcon = (status) => {
  const icons = {
    pending: Loader,
    'in-progress': AlertCircle,
    addressed: CheckCircle2,
    closed: XCircle
  }
  return icons[status] || icons.pending
}

const emit = defineEmits(['close'])

const emitClose = () => {
  showModal.value = false
  markRepliesAsSeen()
  emit('close')
}

const markRepliesAsSeen = async () => {
  const user = auth.currentUser
  if (!user) return

  const q = query(
    collection(db, 'feedback_replies'),
    where('userId', '==', user.uid),
    where('seen', '==', false)
  )

  const snapshot = await getDocs(q)
  const batch = writeBatch(db)
  snapshot.forEach(docSnap => {
    batch.update(docSnap.ref, { seen: true })
  })
  await batch.commit()
}

const listenForReplies = () => {
  const user = auth.currentUser
  if (!user) return

  const userId = user.uid
  const feedbackRef = collection(db, "feedback_notifications")
  const q = query(feedbackRef, where("userId", "==", userId))

 onSnapshot(q, (snapshot) => {
  if (snapshot.size > 0) {
    showBell.value = true
    replyBellSound.play().catch((err) => {
      console.warn('Audio playback failed:', err)
    })
    loadFeedback()
    if (showModal.value) {
      markRepliesAsSeen()
    }
  }
})

}

onMounted(() => {
  loadFeedback()
  listenForReplies()
//   autoDeleteRepliedFeedback()
markRepliesAsSeen()
document.body.style.overflow = 'hidden'
//   if (unsubscribe) unsubscribe()
//   document.body.style.overflow = ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>


<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Feedback list transitions */
.feedback-list-enter-active,
.feedback-list-leave-active {
  transition: all 0.3s ease;
}

.feedback-list-enter-from,
.feedback-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.feedback-list-move {
  transition: transform 0.3s ease;
}

/* Reply transition */
.reply-enter-active,
.reply-leave-active {
  transition: all 0.3s ease;
}

.reply-enter-from,
.reply-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
