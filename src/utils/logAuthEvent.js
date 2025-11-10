// src/utils/logAuthEvent.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase'; // Import auth to access currentUser

export const logAuthEvent = async ({
  type,        // "login" | "register"
  status,      // "success" | "failed"
  email,
  reason = null, // e.g., "email-not-verified", "wrong-password"
  uid = null,
}) => {
  try {
    // Don't log if required fields are missing
    if (!type || !status) {
      console.warn('⚠️ Missing required fields for auth log');
      return;
    }

    const logEntry = {
      type,
      status,
      email,
      reason,
      uid,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      ip: null // Will be set by backend if needed
    };

    // Add uid and email only if available
    if (auth.currentUser) {
      logEntry.uid = logEntry.uid || auth.currentUser.uid;
      logEntry.email = logEntry.email || auth.currentUser.email;
    }

    await addDoc(collection(db, "auth_logs"), logEntry);
  } catch (error) {
    // Silently fail - don't block user flow
    console.warn('⚠️ Auth logging failed (non-critical):', error.message);
  }
};
