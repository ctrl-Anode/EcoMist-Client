<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Toast Notification -->
    <div v-if="toast.show" :class="['fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all', toast.type === 'error' ? 'bg-red-600' : 'bg-green-600']">
      {{ toast.message }}
    </div>
    <h2 class="text-2xl font-semibold mb-4">My Registered Devices</h2>

    <div class="mb-4">
      <input v-model="searchQuery" placeholder="Search device name or ID" class="w-full border px-3 py-2 rounded" />
    </div>

    <div v-if="loading" class="text-gray-500">Loading your devices...</div>
    <div v-else-if="filteredDevices.length === 0" class="text-gray-600">No matching devices found.</div>

    <div v-else>
      <div
        v-for="device in paginatedDevices"
        :key="device.id"
        class="border rounded p-4 mb-4 shadow"
      >
        <h3 class="font-semibold text-lg">{{ device.devicename || 'Unnamed Device' }}</h3>
        <p><strong>Device ID:</strong> {{ device.id }}</p>
        <p><strong>IP Address:</strong> {{ device.state?.ip_address || 'N/A' }}</p>
        <p><strong>SSID:</strong> {{ device.state?.connected_ssid || 'N/A' }}</p>
        <p>
          <strong>Status:</strong>
          <span :class="isDeviceOnline(device.last_online) ? 'text-green-600' : 'text-red-600'">
            {{ isDeviceOnline(device.last_online) ? '🟢 Online' : '🔴 Offline' }}
          </span>
        </p>
        <p><strong>Last Online:</strong> {{ formatTime(device.last_online) }}</p>
        <p><strong>Last Action:</strong> {{ device.state?.last_action_result || 'N/A' }}</p>

        <div class="mt-2 flex flex-wrap gap-2">
          <input v-model="device.newName" placeholder="Enter new name" class="border px-2 py-1 rounded" />
          <button @click="renameDevice(device.id, device.newName)" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            ✏️ Rename
          </button>
          <button @click="openWiFiTab(device.id)" class="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
            🌐 WiFi Settings
          </button>
          <button @click="selectDevice(device.id)" class="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700">
            🎯 Select
          </button>
        </div>
      </div>

      <div class="flex justify-between mt-4" v-if="pageCount > 1">
        <button :disabled="currentPage === 1" @click="currentPage--" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span>Page {{ currentPage }} of {{ pageCount }}</span>
        <button :disabled="currentPage === pageCount" @click="currentPage++" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default {
  name: 'UserRegisteredDevices',
  emits: ['select-device', 'open-wifi-tab'],
  data() {
    return {
      devices: [],
      loading: true,
      searchQuery: '',
      currentPage: 1,
      perPage: 3,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  computed: {
    filteredDevices() {
      if (!this.searchQuery) return this.devices;
      const query = this.searchQuery.toLowerCase();
      return this.devices.filter(device =>
        device.id.toLowerCase().includes(query) ||
        (device.devicename && device.devicename.toLowerCase().includes(query))
      );
    },
    pageCount() {
      return Math.ceil(this.filteredDevices.length / this.perPage);
    },
    paginatedDevices() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredDevices.slice(start, start + this.perPage);
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false; }, 2500);
    },
    formatTime(epochSeconds) {
      if (!epochSeconds) return 'N/A';
      const date = new Date(epochSeconds * 1000);
      return date.toLocaleString();
    },
    isDeviceOnline(lastOnline) {
      if (!lastOnline) return false;
      const now = Math.floor(Date.now() / 1000);
      return now - lastOnline <= 60;
    },
    async renameDevice(deviceId, newName) {
      if (!newName || !deviceId) {
        this.showToast('Please enter a new name.', 'error');
        return;
      }
      const db = getDatabase();
      const deviceRef = ref(db, `devices/${deviceId}`);
      try {
        await update(deviceRef, { devicename: newName });
        this.showToast('✅ Device name updated successfully.', 'success');
      } catch (err) {
        console.error('Rename failed:', err);
        this.showToast('❌ Failed to rename device.', 'error');
      }
    },
    openWiFiTab(deviceId) {
      const device = this.devices.find(d => d.id === deviceId);
      if (device) {
        this.$emit('open-wifi-tab', {
          id: deviceId,
          name: device.devicename || ''
        });
      }
    },
    selectDevice(deviceId) {
      const device = this.devices.find(d => d.id === deviceId);
      if (device) {
        this.$emit('select-device', {
          id: deviceId,
          name: device.devicename || ''
        });
      }
    },
    fetchUserDevices() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        this.loading = false;
        return;
      }

      const db = getDatabase();
      const devicesRef = ref(db, 'devices');

      onValue(devicesRef, (snapshot) => {
        const allDevices = snapshot.val() || {};
        // Filter devices that are registered and owned by the current user
        // Firmware structure: devices/{deviceId}/owner and devices/{deviceId}/registered
        this.devices = Object.entries(allDevices)
          .filter(([id, dev]) => dev.registered === true && dev.owner === user.uid)
          .map(([id, dev]) => ({ 
            id, 
            newName: '', 
            ...dev,
            last_online: dev.last_online || 0,
            state: dev.state || {}
          }));
        this.loading = false;
      });
    }
  },
  mounted() {
    this.fetchUserDevices();
  }
};
</script>

<style scoped>
.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}
</style>
