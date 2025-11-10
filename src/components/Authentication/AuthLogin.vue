<template>
  <section
    class="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col items-center max-w-md w-full mx-auto relative"
  >
    <!-- Header -->
    <header class="flex flex-col items-center mb-6 text-center">
      <img src="/aerotech-rbg-index.png" alt="AeroTech Logo" class="w-20 h-20 mb-2 rounded-full object-cover shadow-lg" />
      <h1 class="text-2xl font-bold text-white">Welcome Back</h1>
      <p class="text-white/70 text-sm mt-2">
        Log in to access your AeroTech dashboard and monitor your aeroponics system.
      </p>
    </header>

    <!-- Browser Warning -->
    <transition name="slide-down">
      <div v-if="showBrowserWarning" class="relative w-full text-yellow-100 text-sm text-center bg-yellow-700/90 p-4 rounded-lg mb-4 shadow-md">
        <button
          class="absolute top-2 right-2 text-yellow-200 hover:text-white text-lg transition-colors"
          @click="showBrowserWarning = false"
          aria-label="Dismiss"
        >
          ✕
        </button>
        <p class="font-semibold">🚫 Google Sign-In is not supported in this browser.</p>
        <p class="mt-1">
          Please <strong>open this app in Chrome or Safari</strong> to continue.
        </p>
        <a
          href="https://ecomist-rosy.vercel.app/"
          target="_blank"
          class="inline-block mt-2 underline text-yellow-300 hover:text-yellow-200 transition-colors"
        >
          👉 Tap here to open in browser
        </a>
      </div>
    </transition>

    <!-- Tooltip Trigger -->
    <div class="absolute top-4 right-4 z-50">
      <button
        class="text-yellow-300 font-bold text-base w-6 h-6 rounded-full border-2 border-yellow-300 hover:bg-yellow-300 hover:text-gray-900 transition-all cursor-pointer flex items-center justify-center"
        @click="toggleTooltip"
        @mouseenter="showTip = true"
        @mouseleave="hideTooltip"
        aria-label="Browser compatibility info"
      >
        ?
      </button>

      <!-- Tooltip Box -->
      <transition name="fade">
        <div
          v-if="showTip"
          class="absolute mt-2 right-0 w-[260px] sm:w-72 bg-yellow-100 border border-yellow-300 text-yellow-900 text-xs rounded-lg p-3 shadow-xl"
        >
          <strong class="block mb-1">Browser Tip:</strong>
          Use <strong>Chrome, Safari, or Firefox</strong>.<br />
          Avoid in-app browsers like Facebook or Instagram.<br />
          <strong class="block mt-2">Note:</strong> Google Sign-In on mobile may be unreliable. Consider using Email/Password.
        </div>
      </transition>
    </div>

    <!-- Form -->
    <form @submit.prevent="loginUser" class="w-full space-y-5" aria-label="Login Form">
      <div class="space-y-4">
        <!-- Email Field -->
        <div class="relative">
          <label for="login-email" class="text-white text-sm font-medium mb-1 block">Email</label>
          <input
            id="login-email"
            type="email"
            v-model="loginForm.email"
            :class=" [
              'w-full rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2',
              loginErrors.email ? 'border-2 border-red-500 bg-red-100/40 focus:ring-red-500' :
              validationState.emailValid ? 'border-2 border-green-500 bg-green-100/40 focus:ring-green-500' :
              'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:ring-green-500'
            ]"
            required
            placeholder="Enter your email"
            :disabled="loading"
          />
          <transition name="fade">
            <p v-if="loginErrors.email" class="text-red-400 text-xs mt-1">{{ loginErrors.email }}</p>
          </transition>
        </div>

        <!-- Password Field -->
        <div class="relative">
          <label for="login-password" class="text-white text-sm font-medium mb-1 block">Password</label>
          <input
            id="login-password"
            :type="showPassword ? 'text' : 'password'"
            v-model="loginForm.password"
            :class=" [
              'w-full rounded-lg px-4 py-3 pr-12 transition-all focus:outline-none focus:ring-2',
              loginErrors.password ? 'border-2 border-red-500 bg-red-100/40 focus:ring-red-500' :
              validationState.passwordValid ? 'border-2 border-green-500 bg-green-100/40 focus:ring-green-500' :
              'bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:ring-green-500'
            ]"
            required
            placeholder="Enter your password"
            :disabled="loading"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-9 flex items-center justify-center w-9 h-9 bg-white/20 rounded-full hover:bg-white/30 transition-all"
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
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7" />
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
              <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
          <transition name="fade">
            <p v-if="loginErrors.password" class="text-red-400 text-xs mt-1">{{ loginErrors.password }}</p>
          </transition>
        </div>
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between">
        <label class="flex items-center cursor-pointer text-sm text-gray-100 hover:text-white transition-colors">
          <input
            type="checkbox"
            v-model="loginForm.rememberMe"
            class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            :disabled="loading"
          />
          <span class="ml-2">Remember me</span>
        </label>
        <button
          type="button"
          class="text-sm text-green-300 hover:text-green-400 hover:underline transition-colors"
          @click="showResetPasswordModal = true"
        >
          Forgot password?
        </button>
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        :disabled="loading || !validationState.emailValid || !validationState.passwordValid"
      >
        <span v-if="!loading">Login</span>
        <span v-else class="flex items-center justify-center">
          <EcoSpinner size="18px" color="#fff" :centered="false" class="mr-2" />
          Logging in...
        </span>
      </button>

      <!-- Resend Email Verification -->
      <transition name="slide-down">
        <button
          v-if="loginErrors.email === 'Please verify your email.'"
          type="button"
          @click="resendEmailVerification"
          class="w-full mt-4 bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          📧 Resend Verification Email
        </button>
      </transition>

      <!-- Divider -->
      <div class="relative flex items-center justify-center my-6">
        <div class="border-t border-white/30 w-full"></div>
        <span class="absolute bg-white/10 px-3 text-white/70 text-sm">or</span>
      </div>

      <!-- Google Sign-In -->
      <button
        type="button"
        @click="handleGoogleSignIn"
        class="w-full bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 hover:shadow-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        :disabled="loading || googleLoading"
      >
        <img src="/google-icon.png" alt="Google Icon" class="w-5 h-5" />
        <span v-if="!googleLoading">Sign in with Google</span>
        <span v-else class="flex items-center justify-center">
          <EcoSpinner size="18px" color="#444" :centered="false" class="mr-2" />
          Signing in...
        </span>
      </button>

      <!-- Warning for In-App Browsers -->
      <transition name="slide-down">
        <div
          v-if="getPlatformInfo().isInApp"
          class="bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-lg p-3 mt-3 text-center shadow-sm"
        >
          <p class="font-semibold">🚫 Google Sign-In may not work in this browser</p>
          <p class="mt-1">Please open this app in <strong>Chrome</strong> or <strong>Safari</strong>.</p>
          <div class="mt-2">
            <a
              v-if="/Android/i.test(navigator.userAgent)"
              href="intent://ecomist-rosy.vercel.app/#Intent;scheme=https;package=com.android.chrome;end"
              class="text-blue-600 underline hover:text-blue-500 font-medium transition-colors"
            >
              👉 Open in Chrome (Android)
            </a>
            <a
              v-else
              href="https://ecomist-rosy.vercel.app/"
              target="_blank"
              class="text-blue-600 underline hover:text-blue-500 font-medium transition-colors"
            >
              👉 Open in Safari (iOS)
            </a>
          </div>
        </div>
      </transition>

      <!-- Checking Redirect -->
      <transition name="fade">
        <div v-if="checkingRedirect" class="text-white text-sm mt-4 flex items-center justify-center gap-2 bg-white/10 p-3 rounded-lg">
          <EcoSpinner size="18px" color="#fff" />
          <span>Restoring session...</span>
        </div>
      </transition>

      <!-- Toggle View Prompt -->
      <p class="text-sm text-white/80 mt-6 text-center">
        Don't have an account?
        <button type="button" @click="$emit('toggleView')" class="text-green-300 hover:text-green-400 hover:underline font-medium transition-colors">
          Create an Account
        </button>
      </p>
    </form>

    <!-- Reset Password Modal -->
    <ResetPasswordModal
      :show="showResetPasswordModal"
      @close="showResetPasswordModal = false"
    />

    <!-- Notification -->
    <transition name="slide-in">
      <div
        v-if="notification.show"
        :class=" [
          'fixed top-4 right-4 p-4 rounded-lg shadow-2xl z-50 max-w-sm',
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]"
      >
        <div class="flex items-center gap-2">
          <span v-if="notification.type === 'success'">✅</span>
          <span v-else>❌</span>
          <span>{{ notification.message }}</span>
        </div>
      </div>
    </transition>
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
import { useSmartGoogleSignIn } from '../../composables/useSmartGoogleSignIn';
import EcoSpinner from "../EcoLoader/EcoSpinner.vue"; // adjust path as needed
const router = useRouter();
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

const emit = defineEmits(['toggleView']); // Define emit for toggleView

const { signInWithSmartGoogle, handleRedirectResult, getPlatformInfo } = useSmartGoogleSignIn(router);

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
  // 🔁 Handle mobile redirect sign-in
  const redirectHandled = await handleRedirectResult();
  if (!redirectHandled) checkingRedirect.value = false;

  // ✅ Optional logging
  console.log("User Agent:", navigator.userAgent);
  console.log("Mobile:", isMobileDevice(), "Unsupported:", isUnsupportedBrowser());

  // ⚠️ In-app browser warning (e.g., Facebook, Instagram)
  if (isMobileDevice() && isUnsupportedBrowser()) {
    showTip.value = true;
    showBrowserWarning.value = true;

    try {
      await navigator.clipboard.writeText("https://ecomist-rosy.vercel.app/");
      console.log("📋 Link copied to clipboard");
      toast.info("📋 Link copied! Paste it into Chrome or Safari.");
    } catch (err) {
      console.warn("❌ Clipboard copy failed:", err);
    }
  }
});

const email = ref("");
const password = ref("");
const toast = useToast();

const MAX_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 30;

const getLoginAttempts = () => parseInt(localStorage.getItem("loginAttempts") || "0");
const getCooldownTime = () => parseInt(localStorage.getItem("cooldownTime") || "0");

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
const googleLoading = ref(false);
const notification = ref({ show: false, message: "", type: "" }); // Notification state

// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Enhanced validation state
const validationState = reactive({
  emailValid: false,
  passwordValid: false,
  passwordErrors: [],
});

// Watchers for real-time validation
watch(
  () => loginForm.email,
  (newEmail) => {
    validationState.emailValid = emailRegex.test(newEmail);
    loginErrors.email = validationState.emailValid ? "" : "Please enter a valid email address.";
  }
);

watch(
  () => loginForm.password,
  (newPassword) => {
    validationState.passwordValid = newPassword.length > 0; // Only check if the password is not empty
    loginErrors.password = validationState.passwordValid ? "" : "Password is required.";
  }
);

// Enhanced form submission validation
const loginUser = async () => {
  if (!validationState.emailValid) {
    toast.error("Please enter a valid email address.");
    return;
  }
  if (!validationState.passwordValid) {
    toast.error("Password is required.");
    return;
  }

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
  const provider = new GoogleAuthProvider();
  googleLoading.value = true;
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the Gmail address exists in the database
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // User document exists, proceed with login
      if (user.email) {
        await logAuthEvent({
          type: "google-sign-in",
          status: "success",
          email: user.email,
          uid: user.uid,
        });
      }

      toast.success("✅ Google Sign-In successful!");

      const userRole = userSnap.data().role;
      localStorage.setItem("userRole", userRole);
      router.push(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } else {
      // User document does not exist, log out and redirect to registration
      if (user.email) {
        await logAuthEvent({
          type: "google-sign-in",
          status: "failed",
          email: user.email,
          reason: "user-not-registered",
        });
      }

      await signOut(auth);
      toast.error("🚫 This Gmail is not registered. Please sign up.");
      emit('toggleView'); // Use emit to toggle the register page
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);

    await logAuthEvent({
      type: "google-sign-in",
      status: "failed",
      reason: error.code || "unknown-error",
    });

    if (error.code === 'auth/popup-closed-by-user') {
      toast.info("Sign-in cancelled");
    } else if (error.code === 'auth/popup-blocked') {
      toast.error("Popup blocked. Please allow popups for this site.");
    } else {
      toast.error("Google Sign-In failed. Please try again.");
    }
  } finally {
    googleLoading.value = false;
  }
};

const showResetPasswordModal = ref(false);

const resendEmailVerification = async () => {
  if (!loginForm.email) {
    loginErrors.email = "Email is required";
    return;
  }

  loading.value = true;
  try {
    // Check if the user exists in Firestore and their authProvider is email
    const userQuery = doc(db, "users", loginForm.email);
    const userSnap = await getDoc(userQuery);

    if (!userSnap.exists()) {
      loginErrors.email = "No account found with this email.";
      toast.error("🚫 Email not found.");
      return;
    }

    const userData = userSnap.data();
    if (userData.authProvider !== "email") {
      toast.error("🚫 Password reset is not available for this account.");
      return;
    }

    // Proceed with sending the reset password link
    const { user } = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
    if (user.emailVerified) {
      toast.info("📩 Your email is already verified.");
      return;
    }
    await sendEmailVerification(user);
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
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.3s ease;
}
.slide-in-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>