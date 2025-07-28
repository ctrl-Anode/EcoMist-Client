import { createApp } from 'vue'
import router from "./router";
import './style.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { requestFcmToken, onMessageListener } from "./firebase";
import { getMessaging, getToken } from 'firebase/messaging'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const SITE_KEY ='6LfoqIsrAAAAABIyMdLB9QXHbj_7JRXNZAHZl2hw';

import App from './App.vue'

const auth = getAuth();

const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};


async function saveFcmTokenByRole() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  try {
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    const role = docSnap.exists() ? docSnap.data().role : 'user';

    const token = await getToken(getMessaging(), {
      vapidKey: import.meta.env.VITE_VAPID_KEY
    });

    if (!token) {
      throw new Error('FCM token not granted');
    }

    const targetPath = role === 'admin' ? 'admin_settings' : 'user_settings';

    await setDoc(doc(db, targetPath, user.uid), {
      fcmToken: token,
      email: user.email,
      updatedAt: new Date()
    }, { merge: true });

    console.log(`✅ FCM token stored for ${role}`);
  } catch (err) {
    if (err.code === 'messaging/permission-blocked') {
      alert('❌ Notifications are blocked. Please enable them in your browser settings to receive alerts.');
    } else {
      console.warn('❌ Failed to save FCM token:', err);
    }
  }
}

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(Toast, toastOptions)
      .use(VueReCaptcha, {
        siteKey: SITE_KEY,
        loaderOptions: {
          useRecaptchaNet: true,
          autoHideBadge: true,
        },
      })
      .mount("#app");

    router.afterEach((to) => {
      setTimeout(() => {
        const badge = document.querySelector(".grecaptcha-badge");
        if (!badge) return;

        const visibleRoutes = ["/auth"];
        if (visibleRoutes.includes(to.path)) {
          badge.style.display = "block";
        } else {
          badge.style.display = "none";
        }
      }, 1000);
    });

    // ✅ Handle incoming FCM messages
    onMessageListener().then((payload) => {
      const { title, body } = payload.notification;
      app.config.globalProperties.$toast.info(`${title}: ${body}`);
    });

    saveFcmTokenByRole(); // Use the centralized method
  }
});



// ✅ Apply dark mode on load
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// ✅ Request FCM token
if ('serviceWorker' in navigator) {
  requestFcmToken().then((token) => {
    if (token) {
      console.log("FCM Token received: [TOKEN REDACTED]");
      // Optionally send to backend
    }
  });
}

//google authinticator/nodemailer