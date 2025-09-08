<template>
  <div class="p-6 max-w-lg mx-auto">
    <!-- Toast Notification -->
    <div v-if="toast.show" :class="['fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all', toast.type === 'error' ? 'bg-red-600' : 'bg-green-600']">
      {{ toast.message }}
    </div>
    <h2 class="text-2xl font-semibold mb-4">Update WiFi Credentials</h2>

    <!-- Current WiFi Info -->
    <div class="mb-4 p-3 bg-gray-100 rounded border text-sm text-gray-700">
      <p><strong>Connected SSID:</strong> {{ currentSSID }}</p>
      <p><strong>IP Address:</strong> {{ currentIP }}</p>
    </div>

    <form @submit.prevent="updateWiFi" class="space-y-4">
      <!-- Device ID Display -->
      <div>
        <label class="block mb-1 font-medium">Device ID</label>
        <input
          :value="deviceId"
          disabled
          class="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed text-gray-600"
        />
      </div>

      <!-- SSID Input -->
      <div>
        <label class="block mb-1 font-medium">New WiFi SSID</label>
        <input
          v-model="ssid"
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter new SSID"
          required
        />
      </div>

      <!-- Password Input -->
      <div>
        <label class="block mb-1 font-medium">New WiFi Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter new password"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update WiFi
      </button>
    </form>
  </div>
</template>

<script>
import { getDatabase, ref, update, onValue } from 'firebase/database';

export default {
  name: 'WiFiUpdate',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ssid: '',
      password: '',
      currentSSID: '',
      currentIP: '',
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
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
      setTimeout(() => { this.toast.show = false; }, 2500);
    },
    async updateWiFi() {
      if (!this.deviceId || !this.ssid || !this.password) {
        this.showToast('All fields are required.', 'error');
        return;
      }
      try {
        const db = getDatabase();
        const updates = {
          [`devices/${this.deviceId}/state/wifi_ssid`]: this.ssid,
          [`devices/${this.deviceId}/state/wifi_password`]: this.password
        };
        await update(ref(db), updates);
        this.showToast('✅ WiFi credentials sent to device.', 'success');
        this.ssid = '';
        this.password = '';
      } catch (err) {
        this.showToast('❌ Failed to update credentials: ' + err.message, 'error');
      }
    },
    loadDeviceState() {
      const db = getDatabase();
      const stateRef = ref(db, `devices/${this.deviceId}/state`);
      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        this.currentSSID = data?.connected_ssid || 'Unknown';
        this.currentIP = data?.ip_address || 'Unknown';
      });
    }
  }
};
</script>

<style scoped>
input {
  outline: none;
}
</style>
