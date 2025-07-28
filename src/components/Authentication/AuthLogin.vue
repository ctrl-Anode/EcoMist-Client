<template>
  <section
    class="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col items-center max-w-md w-full mx-auto"
  >
    <!-- Header -->
    <header class="flex flex-col items-center mb-6 text-center">
      <img src="/eco-mist-logo.png" alt="Eco-Mist Logo" class="w-20 h-20 mb-2 rounded-full object-cover" />
      <h1 class="text-xl font-bold text-white">Login</h1>
      <p class="text-white/80 text-sm mt-2">
        Log in to access your Eco-Mist dashboard and monitor your aeroponics system.
      </p>
    </header>
    <div v-if="showBrowserWarning" class="mt-4 text-yellow-100 text-sm text-center bg-yellow-700/80 p-4 rounded-lg">
  <p>🚫 Google Sign-In is not supported in this browser.</p>
  <p class="mt-1">
    Please <strong>open this app in Chrome or Safari</strong> to continue.
  </p>
  <a
    href="https://ecomist-rosy.vercel.app/"
    target="_blank"
    class="underline text-yellow-300 hover:text-yellow-200"
  >
    Tap here to open in browser
  </a>
</div>
<!-- Tooltip Trigger Positioned in Top Right -->
<div class="absolute top-4 right-4 z-50">
  <span
    class="text-yellow-300 font-bold text-xs cursor-pointer"
    @click="toggleTooltip"
    @mouseenter="showTip = true"
    @mouseleave="hideTooltip"
  >
    ?
  </span>

  <!-- Tooltip Box -->
  <transition name="fade">
    <div
      v-if="showTip"
      class="absolute mt-2 right-0 w-[260px] sm:w-72 bg-yellow-100 border border-yellow-300 text-yellow-900 text-xs rounded-md p-3 shadow-lg"
    >
      <strong>Browser Tip:</strong><br />
      Use <strong>Chrome, Safari, or Firefox</strong>.<br />
      Avoid in-app browsers like Facebook or Instagram.
    </div>
  </transition>
</div>


    <!-- Form -->
    <form @submit.prevent="loginUser" class="w-full space-y-6" aria-label="Login Form">
      <div class="space-y-4">
        <!-- Email Field -->
        <div class="relative">
          <input
            id="login-email"
            type="email"
            v-model="loginForm.email"
            :class="[
              'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-1',
              loginErrors.email ? 'border-red-500 bg-red-100/40' :
              loginForm.email && loginForm.email.includes('@') ? 'border-green-500 bg-green-100/40' :
              'bg-white/20 border-white/30 text-white placeholder-white/50'
            ]"
            required
            placeholder="Email"
            :disabled="loading"
          />
          <div
            v-if="loginForm.email && !loginErrors.email && loginForm.email.includes('@')"
            class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-green-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-5 h-5 text-green-600"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round">
              <path d="M22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <p v-if="loginErrors.email" class="text-red-400 text-xs mt-1 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>{{ loginErrors.email }}</span>
          </p>
        </div>

        <!-- Password Field -->
        <div class="relative">
  <input
    :type="showPassword ? 'text' : 'password'"
    v-model="loginForm.password"
    class="w-full rounded-lg px-4 py-3 pr-12 transition-all focus:outline-none focus:ring-1 bg-white/20 border-white/30 text-white placeholder-white/50"
    required
    placeholder="Password"
    :disabled="loading"
  />
  <!-- Password Visibility Toggle Button -->
  <button
    type="button"
    @click="togglePassword"
    class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition-all"
    :aria-label="showPassword ? 'Hide password' : 'Show password'"
  >
    <svg
      v-if="!showPassword"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.682 1.664-1.198 2.389M15.536 15.536a9.004 9.004 0 01-3.536.964c-4.477 0-8.268-2.943-9.542-7 .274-.857.682-1.664 1.198-2.389M9.464 9.464a9.004 9.004 0 013.536-.964" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M13.875 18.825a9.004 9.004 0 01-3.536-.964c-4.477 0-8.268-2.943-9.542-7 .274-.857.682-1.664 1.198-2.389M9.464 9.464a9.004 9.004 0 013.536-.964M15.536 15.536a9.004 9.004 0 01-3.536.964M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.682 1.664-1.198 2.389" />
      <path d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </button>
</div>

      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between">
        <label class="flex items-center cursor-pointer text-sm text-gray-100">
          <input
            type="checkbox"
            v-model="loginForm.rememberMe"
            class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            :disabled="loading"
          />
          <span class="ml-2">Remember me</span>
        </label>
        <button
          type="button"
          class="text-sm text-green-300 hover:text-green-400 hover:underline"
          @click="showResetPasswordModal = true"
        >
          Forgot password?
        </button>
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:-translate-y-1 transition-transform shadow-green-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="loading || !loginForm.email || !loginForm.password"
      >
        <span v-if="!loading">Login</span>
  <span v-else class="flex items-center justify-center">
    <EcoSpinner size="16px" color="#fff" :centered="false" class="mr-2" />
    Logging in...
  </span>
      </button>

      <!-- Resend Email Verification -->
      <button
        v-if="loginErrors.email === 'Please verify your email.'"
        type="button"
        @click="resendEmailVerification"
        class="w-full mt-4 bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        Resend Verification Email
      </button>

      <!-- Google Sign-In -->
      <button
        type="button"
        @click="handleGoogleSignIn"
        class="w-full bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        :disabled="loading"
      >
        <img src="/google-icon.png" alt="Google Icon" class="w-5 h-5" />
        <span v-if="!loading">Sign in with Google</span>
  <span v-else class="flex items-center justify-center">
    <EcoSpinner size="16px" color="#444" :centered="false" class="mr-2" />
    Signing in...
  </span>
      </button>
      <div v-if="checkingRedirect" class="text-white text-sm mt-4 flex items-center gap-2">
  <EcoSpinner size="16px" color="#fff" />
  Restoring session...
</div>


      <!-- Toggle View Prompt -->
      <p class="text-xs text-white/80 mt-4 text-center">
        Don't have an account?
        <button type= "button" @click="$emit('toggleView')" class="text-green-300 hover:text-green-400 hover:underline">
          Register
        </button>
      </p>
    </form>

    <!-- Reset Password Modal -->
    <ResetPasswordModal
      :show="showResetPasswordModal"
      @close="showResetPasswordModal = false"
    />


    <!-- Notification -->
    <div
      v-if="notification.show"
      :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50',
        notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      {{ notification.message }}
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword, sendEmailVerification, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore"; // Added updateDoc and increment
import { db } from "../../firebase";
import ResetPasswordModal from "./AuthResetPassword.vue";
import { useToast } from "vue-toastification";
import { useReCaptcha } from 'vue-recaptcha-v3';
import { logAuthEvent } from "../../utils/logAuthEvent";

import EcoSpinner from "../EcoLoader/EcoSpinner.vue"; // adjust path as needed

import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
function isUnsupportedBrowser() {
  const ua = navigator.userAgent;
  return /FBAN|FBAV|Instagram|Line|TikTok/i.test(ua) && !/Chrome|Edg/i.test(ua);
}

const checkingRedirect = ref(true);
const { executeRecaptcha } = useReCaptcha();
onMounted(async () => {
  try {
    const result = await getRedirectResult(auth);

    if (result?.user) {
      console.log("✅ Google Sign-In redirect detected:", result.user.email);
      await handleGoogleUser(result.user); // ✅ handle routing directly
      return; // Stop further execution
    }
  } catch (error) {
    console.error("Redirect error:", error);
    toast.error("Google Sign-In failed via redirect.");
  } finally {
    checkingRedirect.value = false;
  }

  // Optional: log user agent
  console.log("User Agent:", navigator.userAgent);
  console.log("Mobile:", isMobileDevice(), "Unsupported:", isUnsupportedBrowser());

  // In-app browser detection
  if (isMobileDevice() && isUnsupportedBrowser()) {
    showTip.value = true;
    showBrowserWarning.value = true;

    navigator.clipboard.writeText("https://ecomist-rosy.vercel.app/")
      .then(() => {
        console.log("📋 Link copied to clipboard");
        toast.info("📋 Link copied! Paste it into Chrome or Safari.");
      })
      .catch((err) => {
        console.warn("❌ Clipboard copy failed:", err);
      });
  }
});



const email = ref("");
const password = ref("");
const toast = useToast();

const MAX_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 30;

const getLoginAttempts = () => parseInt(localStorage.getItem("loginAttempts") || "0");
const getCooldownTime = () => parseInt(localStorage.getItem("cooldownTime") || "0");

const router = useRouter();

// Define reactive state for login errors
const loginErrors = reactive({
  email: "",
  password: "",
});

const loginForm = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false); 
function togglePassword() {
  showPassword.value = !showPassword.value;
}


const loading = ref(false);
const notification = ref({ show: false, message: "", type: "" }); // Notification state

const loginUser = async () => {
  loginErrors.email = "";
  loginErrors.password = "";

  if (!loginForm.email) {
    loginErrors.email = "Email is required";
    return;
  }
  if (!loginForm.password) {
    loginErrors.password = "Password is required";
    return;
  }

  // 🔐 Execute reCAPTCHA
  const token = await executeRecaptcha('login');
  try {
    const recaptchaRes = await fetch("https://ecomist-flask.onrender.com/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const result = await recaptchaRes.json();

    if (!result.success || result.score < 0.5) {
      toast.error("reCAPTCHA failed. Please try again later.");
      return;
    }
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    toast.error("reCAPTCHA verification failed. Please try again.");
    return;
  }

  if (isCooldown()) {
    const secondsLeft = Math.ceil((getCooldownTime() - Date.now()) / 1000);
    notification.value = {
      show: true,
      message: `Too many failed attempts. Try again in ${secondsLeft}s.`,
      type: "error",
    };
    return;
  }

  loading.value = true;
  toast.info("🔐 Logging in...", { timeout: 2000 });
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      notification.value = {
        show: true,
        message: "Verification email resent. Please check your inbox.",
        type: "success",
      };
      await logAuthEvent({
  type: "login",
  status: "failed",
  email: loginForm.email,
  reason: "email-not-verified",
  uid: user.uid,
});

      await signOut(auth);
      loginErrors.email = "Please verify your email.";
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userRole = userSnap.data().role;
      localStorage.setItem("userRole", userRole);
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("cooldownTime");

      await logAuthEvent({
  type: "login",
  status: "success",
  email: loginForm.email,
  uid: user.uid,
});

toast.success("✅ Login successful!");

      router.push(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } else {
      notification.value = {
        show: true,
        message: "User data not found. Please contact support.",
        type: "error",
      };
    }
  } catch (error) {
    await logAuthEvent({
  type: "login",
  status: "failed",
  email: loginForm.email,
  reason: error.code || "unknown-error",
});

    console.error(error);
    let attempts = getLoginAttempts() + 1;
    localStorage.setItem("loginAttempts", attempts);

    if (attempts >= MAX_ATTEMPTS) {
      const cooldownUntil = Date.now() + COOLDOWN_SECONDS * 1000;
      localStorage.setItem("cooldownTime", cooldownUntil);
      notification.value = {
        show: true,
        message: `Too many failed login attempts. Login disabled for ${COOLDOWN_SECONDS}s.`,
        type: "error",
      };
    } else {
      if (error.code === "auth/user-not-found") {
        loginErrors.email = "No account found with this email.";
        toast.error("🚫 Email not found.");

      } else if (error.code === "auth/wrong-password") {
        loginErrors.password = "Incorrect password.";
        toast.error("🔐 Incorrect password.");

      } else {
        notification.value = {
          show: true,
          message: "Login failed. Please try again.",
          type: "error",
        };
        toast.error("❗ Login failed. Please try again.");

      }
    }
  } finally {
    loading.value = false;
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
  }
};
const showBrowserWarning = ref(false);

const handleGoogleSignIn = async () => {
  if (loading.value) return;
  loading.value = true;

  const provider = new GoogleAuthProvider();
  toast.info("🔓 Signing in with Google...", { timeout: 2000 });

  try {
    // ✅ Always use redirect on mobile browsers (iOS/Android)
    if (isMobileDevice()) {
      toast.info("🔁 Redirecting to Google Sign-In...");
      await signInWithRedirect(auth, provider);
      return; // Stop here — redirection will handle the rest
    }

    // ✅ Use popup on desktop
    const { user } = await signInWithPopup(auth, provider);
    await handleGoogleUser(user);

  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") return;

    await logAuthEvent({
      type: "login",
      status: "failed",
      email: loginForm.email,
      reason: error.code || "unknown-error",
    });

    console.error("Google Sign-In Error:", error);
    toast.error("❗ Google Sign-In failed. " + (error.message || ""));
  } finally {
    loading.value = false;
  }
};


const handleGoogleUser = async (user) => {
  console.log("👤 Handling Google user:", user.email); 
  if (!user.email) {
    toast.error("Google Sign-In failed: no email found in Google account.");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  let userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      username: user.displayName || "Google User",
      email: user.email,
      photoURL: user.photoURL,
      role: "user", // default role
      status: "active",
      createdAt: new Date().toISOString(),
      emailVerified: user.emailVerified,
      authProvider: "google",
      loginCount: 1,
    });

    // ❗ Re-fetch userSnap after creating doc
    userSnap = await getDoc(userRef);
  } else {
    await updateDoc(userRef, {
      lastLogin: new Date().toISOString(),
      loginCount: increment(1),
    });
  }

  const role = userSnap.exists() ? userSnap.data().role : "user";
  console.log("🔀 Redirecting to:", role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  localStorage.setItem("userRole", role);

  await logAuthEvent({
    type: "login",
    status: "success",
    email: user.email,
    uid: user.uid,
  });

  toast.success("✅ Google Sign-In successful!");
  router.push(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
};

const showResetPasswordModal = ref(false);

const resendEmailVerification = async () => {
  if (!loginForm.email) {
    loginErrors.email = "Email is required";
    return;
  }

  loading.value = true;
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
    if (user.emailVerified) {
      //showAlert("info", "Already Verified", "Your email is already verified.");
      toast.info("📩 Your email is already verified.");
      return;
    }
    await sendEmailVerification(user);
    //showAlert("success", "Verification Email Sent", "Please check your inbox.");
    toast.success("✅ Verification email sent.");
    await signOut(auth);
  } catch (error) {
    await logAuthEvent({
  type: "login",
  status: "failed",
  email: loginForm.email,
  reason: error.code || "unknown-error",
});

    console.error(error);
    if (error.code === "auth/user-not-found") {
      loginErrors.email = "No account found with this email.";
      toast.error("🚫 Email not found.");

    } else if (error.code === "auth/wrong-password") {
      loginErrors.password = "Incorrect password.";
      toast.error("🔐 Incorrect password.");

    } else {
      //showAlert("error", "Error", "Failed to resend verification email.");
      toast.error("❌ Failed to resend verification email.");

    }
  } finally {
    loading.value = false;
  }
};

const isCooldown = () => {
  const now = Date.now();
  const cooldownUntil = getCooldownTime();
  return now < cooldownUntil;
};

const showTip = ref(false)

const toggleTooltip = () => {
  showTip.value = !showTip.value
}

const hideTooltip = () => {
  if (window.innerWidth >= 768) {
    showTip.value = false
  }
}


watch(() => notification.value.show, (newVal) => {
  if (newVal) {
    setTimeout(() => (notification.value.show = false), 3000);
  }
});

</script>

<style>

.grecaptcha-badge {
  transform: scale(0.5);
  transform-origin: bottom right;
  bottom: 8px !important;
  right: 8px !important;
  z-index: 1000;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>