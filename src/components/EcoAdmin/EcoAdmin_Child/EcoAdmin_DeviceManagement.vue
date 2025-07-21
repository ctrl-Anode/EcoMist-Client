<template>
  <div class="admin-dashboard px-4 py-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-green-700 mb-6">📟 Device Management</h2>

    <section v-if="loading" class="text-gray-500 text-center">Loading devices...</section>

    <section v-else>
      <div
        v-for="(device, id) in devices"
        :key="id"
        class="border p-4 rounded-lg mb-6 bg-white shadow-sm"
      >
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <!-- 📟 Device Info -->
          <div class="w-full md:w-3/4">
            <h3 class="text-lg font-semibold text-gray-800">{{ device.devicename || `Device-${id}` }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-2">
              <p><strong>ID:</strong> {{ id }}</p>
              <p><strong>Status:</strong> {{ device.status }}</p>
              <p><strong>IP:</strong> {{ device.state?.ip_address || 'N/A' }}</p>
              <p><strong>SSID:</strong> {{ device.state?.connected_ssid || 'N/A' }}</p>
              <p><strong>Registered:</strong> {{ device.registered ? '✅' : '❌' }}</p>
              <p><strong>Owner:</strong> {{ device.owner || 'N/A' }}</p>
              <p><strong>Last Online:</strong> {{ device.last_online || 'N/A' }}</p>
            </div>
          </div>

          <!-- 🔧 Actions -->
          <div class="w-full md:w-1/4 flex flex-wrap justify-start md:justify-end gap-2">
            <button
              @click="triggerReconnect(id)"
              class="bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600 w-full md:w-auto"
            >
              🔄 Reconnect
            </button>
            <button
              @click="clearCredentials(id)"
              class="bg-yellow-500 text-white px-3 py-2 text-sm rounded hover:bg-yellow-600 w-full md:w-auto"
            >
              🧹 Clear Credentials
            </button>
            <button
              @click="deleteDevice(id)"
              class="bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600 w-full md:w-auto"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

export default {
  name: "AdminDeviceManager",
  data() {
    return {
      devices: {},
      loading: true,
    };
  },
  mounted() {
    const db = getDatabase();
    const devicesRef = ref(db, "devices");

    onValue(devicesRef, (snapshot) => {
      this.devices = snapshot.val() || {};
      this.loading = false;
    });
  },
  methods: {
    async triggerReconnect(id) {
      const db = getDatabase();
      await set(ref(db, `devices/${id}/state/reconnect`), true);
      alert(`Reconnect signal sent to device ${id}`);
    },
    async clearCredentials(id) {
      const db = getDatabase();
      await set(ref(db, `devices/${id}/credentials/email`), "");
      await set(ref(db, `devices/${id}/credentials/password`), "");
      alert(`Credentials cleared for ${id}`);
    },
    async deleteDevice(id) {
      const db = getDatabase();
      if (confirm(`Are you sure you want to delete device ${id}?`)) {
        await remove(ref(db, `devices/${id}`));
        alert(`Device ${id} deleted.`);
      }
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}
</style>
