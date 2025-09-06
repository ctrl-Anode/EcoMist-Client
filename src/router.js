import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Added onAuthStateChanged for better auth state handling
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import LandingPage from './views/LandingPage.vue';
import UserAuth from './views/EcoAuth.vue';
import EcoUserParent from './views/EcoUserParent.vue';
import EcoAdminParent from './views/EcoAdminParent.vue';

import EcoTry from "./components/EcoTry.vue"


///User
import EcoUser_ProfilePage from './components/EcoUserChild/EcoUser_ProfilePage.vue';
import EcoUser_Dashboard from './components/EcoUserChild/EcoUser_Dashboard.vue';
import EcoUser_EditProfile from './components/EcoUserChild/EcoUser_EditProfile.vue';
import EcoUser_Communication from './components/EcoUserChild/EcoUser_Communication.vue';
import EcoUser_ResetPassword from './components/EcoUserChild/EcoUser_ResetPassword.vue';
import EcoUser_SettingsParent from './components/EcoUserChild/EcoUser_SettingsParent.vue';
import EcoUser_CropAnalysis from './components/EcoUserChild/EcoUser_CropAnalysis.vue';
import EcoUser_Financial from './components/EcoUserChild/EcoUser_Financial.vue';
import EcoUser_Device from './components/EcoUserChild/EcoUser_Device.vue';
import EcoUser_ChangeEmail from './components/EcoUserChild/EcoUser_ChangeEmail.vue';

///Admin
import EcoAdmin_Dashboard from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_Dashboard.vue';
import EcoAdmin_UserManagement from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_UserManagement.vue';
import EcoAdmin_GuestContacts from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_GuestContacts.vue';
import EcoAdmin_DeviceLogs from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_DeviceLogs.vue';
import EcoAdmin_DeviceManagement from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_DeviceManagement.vue';
import EcoAdmin_SystemLogs from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_SystemLogs.vue';
import EcoAdmin_SMTP from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_SMTP.vue';
import EcoAdmin_Logger from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_Logger.vue';
import EcoAdmin_Export from './components/EcoAdmin/EcoAdmin_Export.vue';  

import EcoUnAuth from './components/EcoUnauthorized.vue';
import EcoAdmin_CropAnalytics from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_CropAnalytics.vue';
import EcoAdmin_ManageFeedback from './components/EcoAdmin/EcoAdmin_Child/EcoAdmin_ManageFeedback.vue';

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/auth', name: 'UserAuth', component: UserAuth },
  { path: '/try', name: 'EcoTry', component: EcoTry },
  { path: '/unauthorized', name: 'EcoUnAuth', component: EcoUnAuth },

  {  // 🔹Tryyyyy EcoUserLayout for User Profile Display
  path: '/user',
    component: EcoUserParent,
    meta: { requiresAuth: true, role: 'user' },
    children: [
      { path: 'profile-display', component: EcoUser_ProfilePage, meta: { requiresAuth: true, role: 'user' }},
      { path: 'dashboard', component: EcoUser_Dashboard, meta: { requiresAuth: true, role: 'user' } },
      { path: 'messenger', component: EcoUser_Communication, meta: { requiresAuth: true, role: 'user' }},
      { path: 'model', component: EcoUser_CropAnalysis, meta: { requiresAuth: true, role: 'user' } },
      { path: 'financial-management', component: EcoUser_Financial, meta: { requiresAuth: true, role: 'user' } },
      { path: 'sensor_data', component: EcoUser_Device, meta: { requiresAuth: true, role: 'user' } },
      { path: 'settings', component: EcoUser_SettingsParent, meta: { requiresAuth: true, role: 'user' },
        children: [
         { path: 'profile-display', component: EcoUser_ProfilePage, meta: { requiresAuth: true, role: 'user' } },
         { path: 'edit-profile', component: EcoUser_EditProfile, meta: { requiresAuth: true, role: 'user' } },
         { path: 'reset-password', component: EcoUser_ResetPassword, meta: { requiresAuth: true, role: 'user' } },
         { path: 'change-email', component: EcoUser_ChangeEmail, meta: { requiresAuth: true, role: 'user' } },
      ]
       },
    ]
  },
  {
  path: '/admin',
    component: EcoAdminParent,
    meta: { requiresAuth: true, role: 'admin' },
     children: [

      { path: 'user-management', component: EcoAdmin_UserManagement, meta: { requiresAuth: true, role: 'admin'} },
      { path: 'dashboard', component: EcoAdmin_Dashboard, meta: { requiresAuth: true, role: 'admin'} },
      { path: 'profile-display', component: EcoUser_ProfilePage, meta: { requiresAuth: true, role: 'admin'} },
      { path: 'messenger', component: EcoUser_Communication, meta: { requiresAuth: true, role: 'admin'} },
      { path: 'settings', component: EcoUser_SettingsParent, meta: { requiresAuth: true, role: 'admin' },
        children: [
         { path: 'profile-display', component: EcoUser_ProfilePage, meta: { requiresAuth: true, role: 'admin' } },
         { path: 'edit-profile', component: EcoUser_EditProfile, meta: { requiresAuth: true, role: 'admin' } },
         { path: 'reset-password', component: EcoUser_ResetPassword, meta: { requiresAuth: true, role: 'admin' } },
         { path: 'change-email', component: EcoUser_ChangeEmail, meta: { requiresAuth: true, role: 'admin' } },
      ]
       },
       { path: 'guest-contacts', component: EcoAdmin_GuestContacts, meta: { requiresAuth: true, role: 'admin'} },
       { path: 'device-logs', component: EcoAdmin_DeviceLogs, meta: { requiresAuth: true, role: 'admin'} },
       { path: 'device-management', component: EcoAdmin_DeviceManagement, meta: { requiresAuth: true, role: 'admin'} },
       { path: 'system-logs', component: EcoAdmin_SystemLogs, meta: { requiresAuth: true, role: 'admin'} },
       { path: 'smtp-settings', component: EcoAdmin_SMTP, meta: { requiresAuth: true, role: 'admin' } },
       { path: 'logger', component: EcoAdmin_Logger, meta: { requiresAuth: true, role: 'admin' } },
       { path: 'crop-analysis-analytics-management', component: EcoAdmin_CropAnalytics, meta: { requiresAuth: true, role: 'admin' } },
       { path: 'manage-feedback', component: EcoAdmin_ManageFeedback, meta: { requiresAuth: true, role: 'admin' } },
       { path: 'exports', component: EcoAdmin_Export, meta: { requiresAuth: true, role: 'admin' } },
       
     ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  }
});
let isAuthChecked = false;

// 🔹 Navigation Guard to Protect Routes

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();

  // ✅ Wait for Firebase to initialize
  if (!isAuthChecked) {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe(); // run only once
        isAuthChecked = true;
        resolve();
      });
    });
  }

  const user = auth.currentUser;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      console.warn("Unauthorized access attempt. Redirecting to auth.");
      next("/auth");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userRole = userSnap.data().role;

        if (to.meta.role && to.meta.role !== userRole) {
          console.warn(`Access denied for role: ${userRole}. Redirecting....`);
          next("/unauthorized");
          return;
        }

        next();
      } else {
        console.error("User document does not exist. Redirecting to /auth.");
        next("/auth");
      }
    } catch (error) {
      console.error("Error checking user role:", error.message);
      next("/auth");
    }
  } else {
    next();
  }
});

// 🔹 Logout Function (Uses signOut)
export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    alert("You have been logged out.");
    router.push("/auth");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

// 🔹 Firebase Auth State Listener (Optional Enhancement)
onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user is signed in.");
  }
});

export default router;
