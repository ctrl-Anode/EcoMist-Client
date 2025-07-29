import { ref } from 'vue';
import { auth, db } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { useToast } from 'vue-toastification';
import Bowser from 'bowser';
import { logAuthEvent } from '../utils/logAuthEvent';

export function useSmartGoogleSignIn(router) {
  const loading = ref(false);
  const toast = useToast();

  const getPlatformInfo = () => {
    const parser = Bowser.getParser(window.navigator.userAgent);
    const platform = parser.getPlatformType();
    const isInApp = /FBAN|FBAV|Instagram|Line|TikTok|Messenger/i.test(navigator.userAgent);
    const shouldUseRedirect = platform === 'mobile' || isInApp;
    return { platform, isInApp, shouldUseRedirect };
  };

  const handleGoogleUser = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    let userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        username: user.displayName || 'Google User',
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified,
        authProvider: 'google',
        loginCount: 1,
      });
      userSnap = await getDoc(userRef);
    } else {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
        loginCount: increment(1),
      });
    }

    const role = userSnap.data().role || 'user';
    localStorage.setItem('userRole', role);

    await logAuthEvent({
      type: 'login',
      status: 'success',
      method: 'google',
      email: user.email,
      uid: user.uid,
      platform: window.navigator.userAgent,
    });

    toast.success('✅ Google Sign-In successful!');
    router.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const signInWithSmartGoogle = async () => {
    if (loading.value) return;
    loading.value = true;

    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    provider.setCustomParameters({ prompt: 'select_account' });

    const { isInApp, shouldUseRedirect } = getPlatformInfo();

    try {
      if (shouldUseRedirect) {
        toast.info('🔁 Redirecting to Google Sign-In...');
        await signInWithRedirect(auth, provider);
      } else {
        const { user } = await signInWithPopup(auth, provider);
        await handleGoogleUser(user);
      }
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('❗ Google Sign-In failed.');
        console.error(error);
        await logAuthEvent({
          type: 'login',
          status: 'failed',
          method: 'google',
          reason: error.code,
          email: '',
        });
      }
    } finally {
      loading.value = false;
    }
  };

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        await handleGoogleUser(result.user);
        return true;
      }
    } catch (err) {
      toast.error('Redirect Sign-In failed.');
      console.error(err);
    }
    return false;
  };

  return {
    loading,
    signInWithSmartGoogle,
    handleRedirectResult,
    getPlatformInfo,
  };
}
