// Import necessary Firebase services
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage, getToken } from "firebase/messaging"; // Ensure `onMessage` is imported
import axios from "axios"; // For making HTTP requests to an SMS API

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://ecomist-3082f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, 
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-HM2RNQEZRX"
}


// Export firebaseConfig
export { firebaseConfig };

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(firebaseApp); // Authentication
export const provider = new GoogleAuthProvider(); // Google Sign-In Provider
export const db = getFirestore(firebaseApp); // Firestore Database
export const rdb = getDatabase(firebaseApp); // Realtime Database
export const storage = getStorage(firebaseApp); // Ensure Storage is initialized
export const messaging = getMessaging(firebaseApp); // Initialize Firebase Messaging

// Function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

// Function to Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

// Ensure `onMessageListener` is correctly defined
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        resolve(payload);
      });
    } catch (error) {
      console.error("Error in onMessageListener:", error);
      reject(error);
    }
  });

// Function to send SMS notification
export const sendSmsNotification = async (phoneNumber, message) => {
  try {
    const response = await axios.post("https://sms-api.example.com/send", {
      to: phoneNumber,
      message: message
    });
    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
};

export async function requestFcmToken() {
  try {
    if (!('serviceWorker' in navigator)) {
      throw new Error("Service workers are not supported in this browser.");
    }

    // Register SW first
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('✅ Service worker registered:', registration);

    // Wait for service worker to be ready
    const readyRegistration = await navigator.serviceWorker.ready;
    console.log('✅ Service worker ready:', readyRegistration);

    const token = await getToken(messaging, {
      vapidKey: 'BLcoKHiPfFAMCNTzgqzgo3IXUQNpENK9NKaT-pMOv46ejmxujlFNKNnGXujiAMDdq2K4tYkMydNFu8_lfWcjKLw',
      serviceWorkerRegistration: readyRegistration
    });

    if (token) {
      console.log('✅ FCM Token:', token);
      return token;
    } else {
      console.warn('⚠️ No FCM token received');
      return null;
    }

  } catch (err) {
    console.error('❌ Error getting FCM token:', err);
    return null;
  }
};

export const sendSecureNotification = async (fcmToken, title, body) => {
  try {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");

    const idToken = await user.getIdToken();

    const response = await fetch("https://ecomist-flask.onrender.com:10000/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`
      },
      body: JSON.stringify({ token: fcmToken, title, body })
    });

    const result = await response.json();
    console.log("🔔 Notification Result:", result);
    return result;

  } catch (err) {
    console.error("❌ Error sending secure notification:", err);
    return null;
  }
};

//imports
// import { sendSecureNotification } from '@/firebase';

// await sendSecureNotification(token, "Eco-Mist Update", "Pump activated automatically.");



export { ref, onValue, set };