<template>
  <div>
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all',
        toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Sensor Dashboard</h1>
          <p class="text-gray-600">
            Monitor and configure your device sensors in real-time
          </p>
        </div>

        <!-- 📈 Sensor Graph Section -->
        <div class="mb-8">
          <SensorGraph
            :device-id="deviceId"
            :sensor-readings="sensorHistory"
            :thresholds="thresholds"
          />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <!-- 📊 Sensor Data Section -->
          <div class="order-1">
            <div
              class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div class="flex items-center justify-between">
                  <h2
                    class="text-xl font-semibold text-white flex items-center gap-2"
                  >
                    <span class="text-2xl">📊</span>
                    Sensor Readings
                  </h2>
                  <div
                    class="flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full"
                  >
                    <div
                      class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    ></div>
                    <span class="text-xs text-green-100 font-medium">Live</span>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <div v-if="loadingSensors" class="text-gray-500">
                  Loading sensor readings...
                </div>
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="(sensor, key) in sensorDisplayList"
                    :key="key"
                    class="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div class="absolute top-3 right-3">
                      <div
                        :class="[
                          sensor.value === null || sensor.value === undefined
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : sensor.isAlert
                              ? 'bg-red-100 text-red-700 border-red-200 animate-pulse'
                              : 'bg-green-100 text-green-700 border-green-200',
                          'text-xs px-2 py-1 rounded-full font-semibold border transition-colors duration-200'
                        ]"
                      >
                        <template
                          v-if="sensor.value === null || sensor.value === undefined"
                        >
                          ⚠️ No Sensor
                        </template>
                        <template v-else-if="sensor.isAlert">
                          ⚠️ ALERT!!
                        </template>
                        <template v-else> ✅ OK </template>
                      </div>
                    </div>

                    <h3 class="text-sm font-medium text-gray-600 mb-1 capitalize">
                      {{ sensor.label }}
                    </h3>
                    <div class="flex items-baseline gap-2">
                      <span
                        :class="[
                          sensor.isAlert ? 'text-red-600' : 'text-gray-900',
                          'text-2xl font-bold transition-colors duration-200'
                        ]"
                      >
                        {{
                          sensor.value !== null && sensor.value !== undefined
                            ? sensor.value
                            : '--'
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ⚙️ Threshold Configuration Section -->
          <div class="order-2">
            <div
              class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h2
                  class="text-xl font-semibold text-white flex items-center gap-2"
                >
                  <span class="text-2xl">⚙️</span>
                  Threshold Configuration
                </h2>
              </div>

              <div class="p-6">
                <form @submit.prevent="updateThresholds" class="space-y-6">
                  <div class="grid grid-cols-4 gap-4">
                    <template
                      v-for="(row, rowIndex) in thresholdGridRows"
                      :key="rowIndex"
                    >
                      <template v-for="(key, colIndex) in row" :key="colIndex">
                        <div v-if="key" class="group">
                          <label
                            :for="key"
                            class="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {{ thresholdLabel(key) }}
                          </label>
                          <div class="relative">
                            <input
                              :id="key"
                              v-model.number="thresholds[key]"
                              type="number"
                              step="any"
                              :class="[
                                isInvalid(thresholds[key])
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
                                'w-full px-4 py-3 bg-gray-50 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                              ]"
                              placeholder="Enter threshold value"
                            />
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                              <span
                                v-if="isInvalid(thresholds[key])"
                                class="text-red-500"
                                >❌</span
                              >
                              <span v-else class="text-green-500">✅</span>
                            </div>
                          </div>
                          <div
                            v-if="isInvalid(thresholds[key])"
                            class="mt-2 flex items-center gap-2 text-sm text-red-600"
                          >
                            <span>⚠️</span>
                            <span>Please enter a number between 0 and 9999</span>
                          </div>
                        </div>
                        <div v-else></div>
                      </template>
                    </template>
                  </div>

                  <div
                    class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200"
                  >
                    <button
                      type="submit"
                      class="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      💾 Save Thresholds
                    </button>

                    <button
                      @click="restoreDefaults"
                      type="button"
                      class="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200"
                    >
                      🔄 Restore Defaults
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import SensorGraph from "./SensorGraph.vue";
import { useToast } from "vue-toastification";

const SENSOR_ORDER = [
  { key: "humidity", label: "Humidity (%)", min: "humidity_min", max: "humidity_max" },
  { key: "airTemp", label: "Air Temp (°C)", min: "air_temp_min", max: "air_temp_max" },
  { key: "waterTemp", label: "Water Temp (°C)", min: "water_temp_min", max: "water_temp_max" },
  { key: "distance", label: "Water Level (cm)", min: "water_level_min", max: null },
  { key: "ph", label: "pH", min: "ph_min", max: "ph_max" },
  { key: "tds", label: "TDS (ppm)", min: "tds_min", max: "tds_max" }
];

const THRESHOLD_PAIRS = [
  ["humidity_min", "humidity_max"],
  ["air_temp_min", "air_temp_max"],
  ["water_temp_min", "water_temp_max"],
  ["ph_min", "ph_max"],
  ["tds_min", "tds_max"]
];

export default {
  props: ["deviceId"],
  components: { SensorGraph },
  data() {
    return {
      thresholds: {},
      sensorHistory: {}, // 🔹 full dataset for graph
      latestReading: {}, // 🔹 latest data for cards
      loadingThresholds: true,
      loadingSensors: true,
      toast: { show: false, message: "", type: "success" },
      alertedSensors: new Set()
    };
  },
  computed: {
    sensorDisplayList() {
      return SENSOR_ORDER.map((s) => {
        const value = this.latestReading?.[s.key];
        let isAlert = false;
        if (value !== null && value !== undefined) {
          if (s.min && this.thresholds[s.min] !== undefined && value < this.thresholds[s.min]) isAlert = true;
          if (s.max && this.thresholds[s.max] !== undefined && value > this.thresholds[s.max]) isAlert = true;
        }
        return { key: s.key, label: s.label, value, isAlert };
      });
    },
    thresholdGridRows() {
      return [
        ["humidity_min", "humidity_max", "air_temp_min", "air_temp_max"],
        ["water_temp_min", "water_temp_max", "ph_min", "ph_max"],
        ["tds_min", "tds_max", "water_level_min", ""],
        ["", "", "", ""]
      ];
    }
  },
  watch: {
    deviceId: {
      immediate: true,
      handler(newId) {
        if (newId) this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      const db = getDatabase();
      if (this.thresholdsUnsub) this.thresholdsUnsub();
      if (this.historyUnsub) this.historyUnsub();
      if (this.latestUnsub) this.latestUnsub();

      this.loadingThresholds = true;
      this.loadingSensors = true;

      // 🔸 Fetch thresholds
      const thresholdsRef = ref(db, `/devices/${this.deviceId}/thresholds`);
      this.thresholdsUnsub = onValue(thresholdsRef, (snapshot) => {
        this.thresholds = snapshot.exists() ? snapshot.val() : {};
        this.loadingThresholds = false;
      });

      // 🔹 Fetch all historical readings for the graph
      const historyRef = ref(db, `/devices/${this.deviceId}/sensor_readings`);
      this.historyUnsub = onValue(historyRef, (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : {};
        this.sensorHistory = Object.keys(data)
          .sort() // Ensure readings are sorted by timestamp
          .reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
          }, {});
      });

      // 🔸 Fetch latest reading for live display
      const latestRef = ref(db, `/devices/${this.deviceId}/sensor_readings/latest`);
      this.latestUnsub = onValue(latestRef, (snapshot) => {
        this.latestReading = snapshot.exists() ? snapshot.val() : {};
        this.checkThresholdBreaches();
        this.loadingSensors = false;
      });
    },

    isInvalid(value) {
      return (
        value === null ||
        isNaN(value) ||
        typeof value !== "number" ||
        value < 0 ||
        value > 9999
      );
    },

    updateThresholds() {
      const filtered = {};
      for (const [key, val] of Object.entries(this.thresholds)) {
        if (this.isInvalid(val)) {
          this.showToast(`❌ Invalid value for "${key}".`, "error");
          return;
        }
        filtered[key] = val;
      }

      for (const [minKey, maxKey] of THRESHOLD_PAIRS) {
        if (
          filtered[minKey] !== undefined &&
          filtered[maxKey] !== undefined &&
          Number(filtered[minKey]) >= Number(filtered[maxKey])
        ) {
          this.showToast(`❌ ${minKey} must be less than ${maxKey}`, "error");
          return;
        }
      }

      const db = getDatabase();
      update(ref(db, `/devices/${this.deviceId}/thresholds`), filtered)
        .then(() => this.showToast("✅ Thresholds updated successfully!"))
        .catch(() => this.showToast("❌ Failed to update thresholds.", "error"));
    },

    restoreDefaults() {
      if (!confirm("Restore default thresholds?")) return;
      const db = getDatabase();
      set(ref(db, `/devices/${this.deviceId}/thresholds/restore_defaults`), true)
        .then(() => {
          this.showToast("✅ Defaults restore requested!");
          setTimeout(() => this.loadData(), 2500);
        })
        .catch(() => this.showToast("❌ Failed to request restore.", "error"));
    },

    checkThresholdBreaches() {
      for (const sensor of SENSOR_ORDER) {
        const key = sensor.key;
        const value = this.latestReading?.[key];
        if (value === null || value === undefined) continue;
        const min = this.thresholds[sensor.min];
        const max = this.thresholds[sensor.max];
        const breached =
          (min !== undefined && value < min) || (max !== undefined && value > max);
        if (breached && !this.alertedSensors.has(key)) {
          this.showToast(`⚠️ ${sensor.label} breached threshold: ${value}`, "error");
          this.alertedSensors.add(key);
        } else if (!breached && this.alertedSensors.has(key)) {
          this.alertedSensors.delete(key);
        }
      }
    },

    thresholdLabel(key) {
      const labels = {
        humidity_min: "Humidity Min (%)",
        humidity_max: "Humidity Max (%)",
        air_temp_min: "Air Temp Min (°C)",
        air_temp_max: "Air Temp Max (°C)",
        water_temp_min: "Water Temp Min (°C)",
        water_temp_max: "Water Temp Max (°C)",
        water_level_min: "Water Level Min (cm)",
        ph_min: "pH Min",
        ph_max: "pH Max",
        tds_min: "TDS Min (ppm)",
        tds_max: "TDS Max (ppm)"
      };
      return labels[key] || key;
    },

    showToast(message, type = "success") {
      const toast = useToast();
      toast(message, { type });
    }
  },

  beforeUnmount() {
    if (this.thresholdsUnsub) this.thresholdsUnsub();
    if (this.historyUnsub) this.historyUnsub();
    if (this.latestUnsub) this.latestUnsub();
  }
};
</script>

<style scoped>
input[type="number"] {
  background-color: #f9fafb;
}
</style>
