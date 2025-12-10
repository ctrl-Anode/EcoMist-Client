<template>
  <div class="p-6 max-w-2xl mx-auto bg-white rounded-lg">
    <!-- Toast Notification -->
    <div v-if="toast.show" :class="['fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all', toast.type === 'error' ? 'bg-red-600' : 'bg-green-600']">
      {{ toast.message }}
    </div>

    <h2 class="text-3xl font-bold mb-6 text-gray-800">WiFi Management</h2>

    <!-- Current WiFi Info Card -->
    <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Current Connection</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-gray-600">Connected SSID</p>
          <p class="text-lg font-semibold text-gray-800">{{ currentSSID }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">IP Address</p>
          <p class="text-lg font-semibold text-gray-800">{{ currentIP }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Signal Strength</p>
          <p class="text-lg font-semibold text-gray-800">{{ wifiSignalStrength }} dBm</p>
        </div>
      </div>
    </div>

    <!-- Change WiFi Section -->
    <div class="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span class="text-2xl mr-2">⚙️</span>
        Change WiFi Network
      </h3>
      <p class="text-sm text-gray-700 mb-4">
        Click the button below to reset the WiFi configuration and connect to a new network.
      </p>
      <button
        @click="openResetConfirmation"
        :disabled="isResetting"
        class="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-semibold"
      >
        <span v-if="isResetting" class="inline-block">⏳ Resetting WiFi...</span>
        <span v-else>Change WiFi Network</span>
      </button>
    </div>

    <!-- Status Section -->
    <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span class="text-2xl mr-2">🔍</span>
        Reset Status
      </h3>
      <div class="flex gap-2">
        <button
          @click="clearResetFlag"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition text-sm"
        >
          🔄 Clear Reset Flag
        </button>
        <p class="flex-1 text-sm text-gray-700 py-2">
          If the device keeps resetting, click this button to clear the stuck flag.
        </p>
      </div>
    </div>

    <!-- Instructions Card -->
    <div class="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span class="text-2xl mr-2">📋</span>
        How to Connect to a New WiFi
      </h3>
      <ol class="space-y-3 text-sm text-gray-700">
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">1.</span>
          <span><strong>Click "Change WiFi Network"</strong> button above to start the reset process.</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">2.</span>
          <span><strong>Wait for the device to restart</strong> and clear the saved WiFi credentials from EEPROM.</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">3.</span>
          <span><strong>Device enters WiFi Manager mode</strong> - a configuration portal will be available for 3 minutes (180 seconds).</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">4.</span>
          <span><strong>Connect to the "AeroTech-Setup" network</strong> using your device (phone/laptop).</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">5.</span>
          <span><strong>Open a browser and navigate to 192.168.4.1</strong> to access the WiFi configuration portal.</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">6.</span>
          <span><strong>Select your desired WiFi network</strong> from the list and enter the password.</span>
        </li>
        <li class="flex items-start">
          <span class="font-bold text-blue-600 mr-3">7.</span>
          <span><strong>Click "Save" to connect</strong> - the device will save credentials to EEPROM and connect automatically on future boots.</span>
        </li>
      </ol>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Confirm WiFi Reset</h3>
        <p class="text-gray-700 mb-6">
          This will clear the saved WiFi credentials and restart the device into WiFi Manager mode. Are you sure you want to proceed?
        </p>
        <div class="flex gap-4">
          <button
            @click="closeResetConfirmation"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition"
          >
            Cancel
          </button>
          <button
            @click="resetWiFi"
            :disabled="isResetting"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition"
          >
            <span v-if="isResetting">Resetting...</span>
            <span v-else>Reset WiFi</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, update, onValue } from 'firebase/database';

export default {
  name: 'WiFiManagement',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentSSID: '',
      currentIP: '',
      wifiSignalStrength: 'Unknown',
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      showConfirmation: false,
      isResetting: false
    };
  },
  watch: {
    deviceId: {
      immediate: true,
      handler(newId) {
        if (newId) this.loadDeviceState();
      }
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false; }, 3000);
    },
    openResetConfirmation() {
      this.showConfirmation = true;
    },
    closeResetConfirmation() {
      this.showConfirmation = false;
    },
    async resetWiFi() {
      if (!this.deviceId) {
        this.showToast('Device ID is required.', 'error');
        return;
      }

      this.isResetting = true;
      const db = getDatabase();
      
      try {
        const updates = {};
        updates[`devices/${this.deviceId}/state/reset_wifi`] = true;
        await update(ref(db), updates);
        
        this.showToast('✅ WiFi reset initiated! Device will restart in WiFi Manager mode.', 'success');
        this.showToast('📋 Check the device serial monitor for "AeroTech-Setup" network.', 'success');
        this.closeResetConfirmation();
        
        setTimeout(() => {
          this.isResetting = false;
        }, 3000);
      } catch (err) {
        this.showToast('❌ Failed to reset WiFi: ' + err.message, 'error');
        this.isResetting = false;
      }
    },
    async clearResetFlag() {
      if (!this.deviceId) {
        this.showToast('Device ID is required.', 'error');
        return;
      }
      
      try {
        const db = getDatabase();
        const updates = {};
        updates[`devices/${this.deviceId}/state/reset_wifi`] = false;
        await update(ref(db), updates);
        this.showToast('✅ Reset flag cleared successfully.', 'success');
      } catch (err) {
        this.showToast('❌ Failed to clear flag: ' + err.message, 'error');
      }
    },
    loadDeviceState() {
      const db = getDatabase();
      const stateRef = ref(db, `devices/${this.deviceId}/state`);
      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        this.currentSSID = data?.connected_ssid || 'Unknown';
        this.currentIP = data?.ip_address || 'Unknown';
        this.wifiSignalStrength = data?.wifi_signal_strength || 'Unknown';
      });
    }
  }
};
</script>

<style scoped>
button {
  outline: none;
}
</style>
