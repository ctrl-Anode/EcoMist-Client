<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-8">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-2 bg-emerald-600 rounded-lg">
            <Monitor class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Device Management</h1>
        </div>
        <p class="text-gray-600 ml-14">Monitor, manage, and simulate connected devices</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-16">
        <Loader2 class="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p class="text-gray-500 text-lg">Loading devices...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="Object.keys(devices).length === 0" class="text-center py-16">
        <div class="inline-flex p-4 bg-gray-100 rounded-full mb-4">
          <MonitorOff class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No devices found</h3>
        <p class="text-gray-500">Connect a device to get started</p>
      </div>

      <!-- Device Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="(device, id) in devices"
          :key="id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <!-- Status Bar -->
          <div
            class="h-1.5"
            :class="device.status === 'online' ? 'bg-emerald-500' : 'bg-gray-300'"
          />

          <div class="p-6 space-y-4">
            <!-- Device Header -->
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="p-2.5 rounded-lg"
                  :class="device.status === 'online' ? 'bg-emerald-100' : 'bg-gray-100'"
                >
                  <Smartphone
                    class="w-5 h-5"
                    :class="device.status === 'online' ? 'text-emerald-600' : 'text-gray-400'"
                  />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ device.devicename || `Device-${id}` }}
                  </h3>
                  <p class="text-sm text-gray-500 font-mono">{{ id }}</p>
                </div>
              </div>

              <!-- Status Badge -->
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="device.status === 'online'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600'"
              >
                {{ device.status }}
              </span>
            </div>

            <!-- Simulation Mode -->
            <div class="flex items-center gap-2">
              <Monitor
                class="w-4 h-4"
                :class="device.simulation_mode ? 'text-orange-500' : 'text-gray-400'"
              />
              <span class="text-gray-600">Simulation Mode:</span>
              <span
                class="font-medium"
                :class="device.simulation_mode ? 'text-orange-600' : 'text-gray-700'"
              >
                {{ device.simulation_mode ? 'Active' : 'Disabled' }}
              </span>
            </div>

            <!-- Sensor Selection -->
            <div class="pt-2">
              <p class="text-sm font-medium text-gray-700 mb-1">Select Sensors to Simulate:</p>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="sensor in sensorList"
                  :key="sensor.key"
                  class="flex flex-col gap-2 border p-2 rounded"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-gray-600 text-sm">{{ sensor.label }}</span>
                  </div>
                  <!-- Show min/max thresholds -->
                  <div v-if="device.thresholds && device.thresholds[sensor.key]" class="text-xs text-gray-500">
                    Min: {{ device.thresholds[sensor.key].min }} | Max: {{ device.thresholds[sensor.key].max }}
                  </div>
                  <!-- Normal Simulation Toggle -->
                  <button
                    class="px-2 py-1 rounded text-white text-xs transition"
                    :class="device.simulation[sensor.key]?.normal ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'"
                    @click="toggleSensorSimulation(device.id, sensor.key, 'normal')"
                  >
                    {{ device.simulation[sensor.key]?.normal ? 'Disable' : 'Enable' }} Normal Simulation
                  </button>
                  <!-- Breached Simulation Toggle -->
                  <div class="flex items-center gap-2">
                    <select
                      :value="device.simulation[sensor.key]?.breachType || 'max'"
                      class="border border-gray-300 rounded px-2 py-1 text-xs"
                      @change="updateBreachType(device.id, sensor.key, $event.target.value)"
                    >
                      <option value="min">Breach Min</option>
                      <option value="max">Breach Max</option>
                    </select>
                    <button
                      class="px-2 py-1 rounded text-white text-xs transition"
                      :class="device.simulation[sensor.key]?.breached ? 'bg-gray-400 hover:bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'"
                      @click="toggleSensorSimulation(device.id, sensor.key, 'breached')"
                    >
                      {{ device.simulation[sensor.key]?.breached ? 'Disable' : 'Enable' }} Breached Simulation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Simulation Buttons -->
            <div class="flex items-center gap-3 pt-3">
              <button
                class="px-3 py-1 rounded bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition"
                @click="simulateDevice(device.id, 'normal')"
              >
                Normal Simulation
              </button>
              <div class="flex items-center gap-2">
                <select
                  v-model="device.breachType"
                  class="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="min">Breach Min</option>
                  <option value="max">Breach Max</option>
                </select>
                <button
                  class="px-3 py-1 rounded bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
                  @click="simulateDevice(device.id, 'breached')"
                >
                  Breached Simulation
                </button>
              </div>
              <button
                class="px-3 py-1 rounded text-white text-sm transition"
                :class="device.simulation_mode ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'"
                @click="toggleDeviceSimulation(device.id)"
              >
                {{ device.simulation_mode ? 'Disable' : 'Enable' }} Simulation
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, onValue, set } from 'firebase/database'
import { Monitor, Smartphone, Loader2, MonitorOff } from 'lucide-vue-next'

const devices = ref({})
const loading = ref(true)
const db = getDatabase()
const devicesRef = dbRef(db, 'devices')

// List of sensors
const sensorList = [
  { key: 'humidity', label: 'Humidity' },
  { key: 'airTemp', label: 'Air Temperature' },
  { key: 'waterTemp', label: 'Water Temperature' },
  { key: 'ph', label: 'pH' },
  { key: 'tds', label: 'TDS' },
  { key: 'distance', label: 'Water Level' }
]

// Utility: calculate ±20% breach range
const getBreachRange = (min, max, type) => {
  if (type === 'min') return { min: min * 0.8, max };
  if (type === 'max') return { min, max: max * 1.2 };
  return { min, max };
};

// Fetch all devices live
onMounted(() => {
  onValue(devicesRef, (snapshot) => {
    const data = snapshot.val() || {}
    for (const id in data) {
      data[id].selectedSensors = data[id].selectedSensors || []
      data[id].breachType = data[id].breachType || 'max'
      data[id].id = id
      data[id].thresholds = data[id].thresholds || {
        humidity: { min: 50, max: 70 },
        airTemp: { min: 18, max: 25 },
        waterTemp: { min: 18, max: 22 },
        ph: { min: 5.5, max: 6.5 },
        tds: { min: 560, max: 840 },
        distance: { min: 10, max: 25 }
      }
      data[id].simulation = data[id].simulation || {}
    }
    devices.value = data
    loading.value = false
  })
})

// Simulate selected sensors for a device
const simulateDevice = async (deviceId, mode) => {
  try {
    const device = devices.value[deviceId];
    if (!device || !device.selectedSensors.length) {
      alert('Select at least one sensor!');
      return;
    }

    for (const sensor of device.selectedSensors) {
      const thresholds = device.thresholds[sensor];
      if (!thresholds) continue;

      const range =
        mode === 'breached'
          ? getBreachRange(thresholds.min, thresholds.max, device.breachType)
          : thresholds;

      const sensorRef = dbRef(db, `devices/${deviceId}/simulation/${sensor}`);
      await set(sensorRef, {
        normal: mode === 'normal',
        breached: mode === 'breached',
        breached_type: mode === 'breached' ? device.breachType : '',
        minValue: range.min,
        maxValue: range.max,
      });
    }

    // Enable global simulation mode
    const simModeRef = dbRef(db, `devices/${deviceId}/simulation_mode`);
    await set(simModeRef, true);
    device.simulation_mode = true;

    console.log(`✅ ${mode} simulation applied for device ${deviceId}`);
  } catch (error) {
    console.error('❌ Simulation failed:', error);
  }
};

// Toggle simulation for a specific device
const toggleDeviceSimulation = async (deviceId) => {
  try {
    const device = devices.value[deviceId];
    if (!device) return;

    const newMode = !device.simulation_mode;

    // Update simulation mode in Firebase
    const simModeRef = dbRef(db, `devices/${deviceId}/simulation_mode`);
    await set(simModeRef, newMode);
    device.simulation_mode = newMode;

    // If disabling, reset all sensors' simulation data
    if (!newMode) {
      for (const sensor of sensorList) {
        const sensorRef = dbRef(db, `devices/${deviceId}/simulation/${sensor.key}`);
        await set(sensorRef, {
          normal: false,
          breached: false,
          breached_type: '',
          minValue: null,
          maxValue: null,
        });
      }
    }

    console.log(`✅ Simulation ${newMode ? 'enabled' : 'disabled'} for device ${deviceId}`);
  } catch (error) {
    console.error('❌ Failed to toggle simulation for device:', error);
  }
}

// Disable simulation for a device
const disableSimulation = async (deviceId) => {
  try {
    const device = devices.value[deviceId]
    if (!device) return

    for (const sensor of sensorList) {
      const sensorRef = dbRef(db, `devices/${deviceId}/simulation/${sensor.key}`)
      await set(sensorRef, {
        normal: false,
        breached: false,
        breached_type: '',
        minValue: null,
        maxValue: null
      })
    }

    // Disable global simulation mode
    const simModeRef = dbRef(db, `devices/${deviceId}/simulation_mode`)
    await set(simModeRef, false)
    device.simulation_mode = false

    console.log(`❌ Simulation disabled for ${deviceId}`)
  } catch (error) {
    console.error('❌ Failed to disable simulation:', error)
  }
}

// Toggle simulation for a specific sensor
const toggleSensorSimulation = async (deviceId, sensorKey, mode) => {
  try {
    const device = devices.value[deviceId];
    if (!device || !device.thresholds || !device.thresholds[sensorKey]) {
      console.error(`❌ Invalid thresholds for sensor ${sensorKey} on device ${deviceId}`);
      return;
    }

    const thresholds = device.thresholds[sensorKey];
    if (typeof thresholds.min === 'undefined' || typeof thresholds.max === 'undefined') {
      console.error(`❌ Missing min or max thresholds for sensor ${sensorKey} on device ${deviceId}`);
      return;
    }

    const sensorSim = device.simulation[sensorKey] || { normal: false, breached: false, breachType: 'max' };
    const newMode = mode === 'normal' ? !sensorSim.normal : !sensorSim.breached;

    // Ensure breachType is defined
    const breachType = sensorSim.breachType || 'max';

    // Calculate range for breached simulation
    const range = mode === 'breached' && newMode
      ? getBreachRange(thresholds.min, thresholds.max, breachType)
      : thresholds;

    // Update simulation mode for the sensor in Firebase
    const sensorRef = dbRef(db, `devices/${deviceId}/simulation/${sensorKey}`);
    await set(sensorRef, {
      normal: mode === 'normal' ? newMode : sensorSim.normal,
      breached: mode === 'breached' ? newMode : sensorSim.breached,
      breached_type: mode === 'breached' ? breachType : '',
      minValue: newMode ? range.min : null,
      maxValue: newMode ? range.max : null,
    });

    // Update local state
    device.simulation[sensorKey] = {
      ...sensorSim,
      [mode]: newMode,
      minValue: newMode ? range.min : null,
      maxValue: newMode ? range.max : null,
    };

    console.log(`✅ ${mode === 'normal' ? 'Normal' : 'Breached'} simulation ${newMode ? 'enabled' : 'disabled'} for sensor ${sensorKey} on device ${deviceId}`);
  } catch (error) {
    console.error(`❌ Failed to toggle ${mode} simulation for sensor ${sensorKey} on device ${deviceId}:`, error);
  }
};

// Update breach type for a specific sensor
const updateBreachType = async (deviceId, sensorKey, newValue) => {
  try {
    const device = devices.value[deviceId];
    if (!device || !device.simulation[sensorKey]) return;

    // Update the local state
    device.simulation[sensorKey].breachType = newValue;

    // Update Firebase
    const sensorRef = dbRef(db, `devices/${deviceId}/simulation/${sensorKey}/breached_type`);
    await set(sensorRef, newValue);

    console.log(`✅ Breach type updated to ${newValue} for sensor ${sensorKey} on device ${deviceId}`);
  } catch (error) {
    console.error(`❌ Failed to update breach type for sensor ${sensorKey} on device ${deviceId}:`, error);
  }
};
</script>
