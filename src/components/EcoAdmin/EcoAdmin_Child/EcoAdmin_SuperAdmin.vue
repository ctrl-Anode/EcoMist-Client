<template>
  <div class="eco-admin-super-admin">
    <div class="header-section">
      <h1>🎮 Sensor Simulation Control</h1>
      <p class="subtitle">Manage individual sensor simulations with precision controls</p>
      <p class="info-text">
        💡 When simulation is OFF: Real sensor data is pushed to Firebase. When ON: Simulated data replaces real data.
      </p>
    </div>

    <div class="control-panel">
      <div class="device-selector">
        <label for="device-select">Select Device:</label>
        <select id="device-select" v-model="selectedDeviceId" @change="onDeviceChange" class="device-input">
          <option value="">-- Choose a device --</option>
          <option v-for="device in devices" :key="device.id" :value="device.id">
            {{ device.name }} ({{ device.id }})
          </option>
        </select>
      </div>
      <button v-if="selectedDeviceId" @click="loadDeviceStatus" class="refresh-btn">🔄 Refresh Status</button>
    </div>

    <div v-if="selectedDeviceId" class="sensors-grid">
      <div v-for="sensor in sensors" :key="sensor.id" :class="['sensor-card', { active: sensor.simulationEnabled }]">
        <div class="sensor-header">
          <div class="sensor-title">
            <span class="sensor-icon">{{ getSensorIcon(sensor.id) }}</span>
            <div class="title-info">
              <h2>{{ sensor.name }}</h2>
              <span class="sensor-type">{{ sensor.type }}</span>
            </div>
          </div>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              v-model="sensor.simulationEnabled" 
              @change="toggleSimulation(sensor)"
            />
            <span class="slider"></span>
          </label>
        </div>

        <transition name="expand">
          <div v-if="sensor.simulationEnabled" class="sensor-controls">
            <!-- Current Value Display -->
            <div class="current-value">
              <span>Current Value:</span>
              <span class="value-display">{{ sensor.currentValue }} {{ sensor.unit }}</span>
            </div>

            <!-- Noise Control -->
            <div class="control-group">
              <label for="noise-{{ sensor.id }}" class="control-label">
                <span class="label-text">Noise Level</span>
                <span class="label-value">{{ sensor.noise.toFixed(2) }}</span>
              </label>
              <input
                :id="`noise-${sensor.id}`"
                type="range"
                :min="sensor.noiseRange.min"
                :max="sensor.noiseRange.max"
                step="0.01"
                v-model="sensor.noise"
                @change="updateNoise(sensor)"
                class="slider-input"
              />
              <div class="range-labels">
                <span>{{ sensor.noiseRange.min }}</span>
                <span>{{ sensor.noiseRange.max }}</span>
              </div>
            </div>

            <!-- Drift Speed Control -->
            <div class="control-group">
              <label for="drift-{{ sensor.id }}" class="control-label">
                <span class="label-text">Drift Speed</span>
                <span class="label-value">{{ sensor.driftSpeed.toFixed(3) }}</span>
              </label>
              <input
                :id="`drift-${sensor.id}`"
                type="range"
                :min="sensor.driftRange.min"
                :max="sensor.driftRange.max"
                step="0.001"
                v-model="sensor.driftSpeed"
                @change="updateDriftSpeed(sensor)"
                class="slider-input"
              />
              <div class="range-labels">
                <span>{{ sensor.driftRange.min }}</span>
                <span>{{ sensor.driftRange.max }}</span>
              </div>
            </div>

            <!-- Simulation Modes -->
            <div class="simulation-modes">
              <p class="modes-title">Simulation Scenarios</p>
              <div class="modes-buttons">
                <button 
                  @click="simulateMode(sensor, 'safe')" 
                  class="mode-button safe"
                  :title="sensor.id === 'distance' ? 'Safe water level: distance ≤ minimum threshold (good water)' : 'Simulate within safe minimum to maximum threshold range'"
                >
                  ✓ Safe Range
                </button>
                <button 
                  @click="simulateMode(sensor, 'above')" 
                  v-if="sensor.hasAboveBelow"
                  class="mode-button above"
                  title="Simulate above maximum threshold"
                >
                  ⬆ Above Threshold
                </button>
                <button 
                  @click="simulateMode(sensor, 'below')" 
                  class="mode-button below"
                  :title="sensor.id === 'distance' ? 'Simulate low water level (distance > threshold)' : 'Simulate below minimum threshold'"
                >
                  {{ sensor.id === 'distance' ? '⬆ Low Water' : '⬇ Below Threshold' }}
                </button>
              </div>
            </div>

            <!-- Status Indicator -->
            <div class="status-indicator">
              <span v-if="sensor.lastUpdated" class="last-updated">
                Last updated: {{ sensor.lastUpdated }}
              </span>
              <span v-if="sensor.isUpdating" class="updating">
                ⏳ Updating...
              </span>
              <span v-if="sensor.updateError" class="error">
                ❌ Error: {{ sensor.updateError }}
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="!selectedDeviceId" class="no-device-selected">
      <p>Please select a device to manage its simulation settings.</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { getDatabase, ref as dbRef, onValue, set, get, child } from 'firebase/database';

export default {
  name: "EcoAdminSuperAdmin",
  setup() {
    const selectedDeviceId = ref('');
    const devices = ref([]);
    const database = getDatabase();
    const unsubscribers = ref([]);

    const sensors = reactive([
      {
        id: 'humidity',
        name: 'DHT22 - Humidity',
        type: 'Humidity Sensor',
        simulationEnabled: false,
        noise: 0.5,
        driftSpeed: 0.02,
        currentValue: '-- ',
        unit: '%',
        hasAboveBelow: true,
        noiseRange: { min: 0, max: 5 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
      {
        id: 'airTemp',
        name: 'DHT22 - Air Temperature',
        type: 'Temperature Sensor',
        simulationEnabled: false,
        noise: 0.5,
        driftSpeed: 0.02,
        currentValue: '-- ',
        unit: '°C',
        hasAboveBelow: true,
        noiseRange: { min: 0, max: 5 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
      {
        id: 'waterTemp',
        name: 'DS18B20 - Water Temperature',
        type: 'Temperature Sensor',
        simulationEnabled: false,
        noise: 0.5,
        driftSpeed: 0.02,
        currentValue: '-- ',
        unit: '°C',
        hasAboveBelow: true,
        noiseRange: { min: 0, max: 5 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
      {
        id: 'distance',
        name: 'Ultrasonic - Water Level',
        type: 'Distance Sensor',
        simulationEnabled: false,
        noise: 0.5,
        driftSpeed: 0.02,
        currentValue: '-- ',
        unit: 'cm',
        hasAboveBelow: false,
        noiseRange: { min: 0, max: 5 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
      {
        id: 'tds',
        name: 'TDS Meter V1.0',
        type: 'Water Quality Sensor',
        simulationEnabled: false,
        noise: 2,
        driftSpeed: 0.01,
        currentValue: '-- ',
        unit: 'ppm',
        hasAboveBelow: true,
        noiseRange: { min: 0, max: 10 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
      {
        id: 'ph',
        name: 'pH Sensor - 4502C',
        type: 'pH Sensor',
        simulationEnabled: false,
        noise: 0.01,
        driftSpeed: 0.02,
        currentValue: '-- ',
        unit: 'pH',
        hasAboveBelow: true,
        noiseRange: { min: 0, max: 0.5 },
        driftRange: { min: 0, max: 0.5 },
        lastUpdated: '',
        isUpdating: false,
        updateError: '',
      },
    ]);

    const getSensorIcon = (sensorId) => {
      const icons = {
        humidity: '💧',
        airTemp: '🌡️',
        waterTemp: '🔥',
        distance: '📏',
        tds: '⚗️',
        ph: '🧪',
      };
      return icons[sensorId] || '🔧';
    };

    const buildFirebasePath = (sensorId, type) => {
      if (!selectedDeviceId.value) return '';
      const basePath = `/devices/${selectedDeviceId.value}`;
      
      switch (type) {
        case 'mode':
          return `${basePath}/sim_modes/${sensorId}`;
        case 'settings':
          return `${basePath}/sim_settings/${sensorId}`;
        case 'controls':
          return `${basePath}/sim_controls/${sensorId}`;
        default:
          return '';
      }
    };

    const toggleSimulation = async (sensor) => {
      sensor.isUpdating = true;
      sensor.updateError = '';
      try {
        const modePath = buildFirebasePath(sensor.id, 'mode');
        await set(dbRef(database, modePath), sensor.simulationEnabled);
        sensor.lastUpdated = new Date().toLocaleTimeString();
        console.log(`✅ Toggled ${sensor.name} simulation to ${sensor.simulationEnabled}`);
      } catch (error) {
        sensor.updateError = error.message;
        sensor.simulationEnabled = !sensor.simulationEnabled; // Revert on error
        console.error(`❌ Error toggling simulation for ${sensor.name}:`, error);
      } finally {
        sensor.isUpdating = false;
      }
    };

    const updateNoise = async (sensor) => {
      sensor.isUpdating = true;
      sensor.updateError = '';
      try {
        const settingsPath = buildFirebasePath(sensor.id, 'settings');
        await set(dbRef(database, `${settingsPath}/noise`), parseFloat(sensor.noise));
        sensor.lastUpdated = new Date().toLocaleTimeString();
        console.log(`✅ Updated ${sensor.name} noise to ${sensor.noise}`);
      } catch (error) {
        sensor.updateError = error.message;
        console.error(`❌ Error updating noise for ${sensor.name}:`, error);
      } finally {
        sensor.isUpdating = false;
      }
    };

    const updateDriftSpeed = async (sensor) => {
      sensor.isUpdating = true;
      sensor.updateError = '';
      try {
        const settingsPath = buildFirebasePath(sensor.id, 'settings');
        await set(dbRef(database, `${settingsPath}/drift_speed`), parseFloat(sensor.driftSpeed));
        sensor.lastUpdated = new Date().toLocaleTimeString();
        console.log(`✅ Updated ${sensor.name} drift speed to ${sensor.driftSpeed}`);
      } catch (error) {
        sensor.updateError = error.message;
        console.error(`❌ Error updating drift speed for ${sensor.name}:`, error);
      } finally {
        sensor.isUpdating = false;
      }
    };

    const simulateMode = async (sensor, mode) => {
      sensor.isUpdating = true;
      sensor.updateError = '';
      try {
        const controlsPath = buildFirebasePath(sensor.id, 'controls');
        const controlKey = `set_${mode}`;
        await set(dbRef(database, `${controlsPath}/${controlKey}`), true);
        sensor.lastUpdated = new Date().toLocaleTimeString();
        console.log(`✅ Triggered ${sensor.name} ${mode} mode`);
      } catch (error) {
        sensor.updateError = error.message;
        console.error(`❌ Error triggering ${mode} mode for ${sensor.name}:`, error);
      } finally {
        sensor.isUpdating = false;
      }
    };

    const subscribeToDeviceStatus = () => {
      if (!selectedDeviceId.value) return;
      const basePath = `/devices/${selectedDeviceId.value}/sensor_readings/latest`;
      const unsubscribe = onValue(
        dbRef(database, basePath),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const sensorMap = {
              humidity: 'humidity',
              airTemp: 'airTemp',
              waterTemp: 'waterTemp',
              distance: 'distance',
              tds: 'tds',
              ph: 'ph',
            };
            for (const [firebaseKey, sensorKey] of Object.entries(sensorMap)) {
              const sensor = sensors.find(s => s.id === sensorKey);
              if (sensor && data[firebaseKey] !== undefined) {
                sensor.currentValue = data[firebaseKey].toFixed(2);
              }
            }
            console.log('✅ Device status synced in real-time');
          }
        },
        (error) => {
          console.error('❌ Error syncing device status:', error);
        }
      );
      unsubscribers.value.push(unsubscribe);
    };

    const loadDeviceStatus = async () => {
      if (!selectedDeviceId.value) return;
      try {
        const basePath = `/devices/${selectedDeviceId.value}/sensor_readings/latest`;
        const snapshot = await get(child(dbRef(database), basePath));
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Update current values
          const sensorMap = {
            humidity: 'humidity',
            airTemp: 'airTemp',
            waterTemp: 'waterTemp',
            distance: 'distance',
            tds: 'tds',
            ph: 'ph',
          };
          for (const [firebaseKey, sensorKey] of Object.entries(sensorMap)) {
            const sensor = sensors.find(s => s.id === sensorKey);
            if (sensor && data[firebaseKey] !== undefined) {
              sensor.currentValue = data[firebaseKey].toFixed(2);
            }
          }
          console.log('✅ Device status loaded');
        }
      } catch (error) {
        console.error('❌ Error loading device status:', error);
      }
    };

    const subscribeToSimulationStates = () => {
      if (!selectedDeviceId.value) return;
      const basePath = `/devices/${selectedDeviceId.value}/sim_modes`;
      const unsubscribe = onValue(
        dbRef(database, basePath),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const stateMap = {
              humidity: 'humidity',
              airTemp: 'airTemp',
              waterTemp: 'waterTemp',
              distance: 'distance',
              tds: 'tds',
              ph: 'ph',
            };
            for (const [firebaseKey, sensorKey] of Object.entries(stateMap)) {
              const sensor = sensors.find(s => s.id === sensorKey);
              if (sensor && data[firebaseKey] !== undefined) {
                sensor.simulationEnabled = data[firebaseKey];
              }
            }
            console.log('✅ Simulation states synced from Firebase (real-time)');
          }
        },
        (error) => {
          console.error('❌ Error syncing simulation states:', error);
        }
      );
      unsubscribers.value.push(unsubscribe);
    };

    const subscribeToSimulationSettings = () => {
      if (!selectedDeviceId.value) return;
      const basePath = `/devices/${selectedDeviceId.value}/sim_settings`;
      const unsubscribe = onValue(
        dbRef(database, basePath),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const settingsMap = {
              humidity: 'humidity',
              airTemp: 'airTemp',
              waterTemp: 'waterTemp',
              distance: 'distance',
              tds: 'tds',
              ph: 'ph',
            };
            for (const [firebaseKey, sensorKey] of Object.entries(settingsMap)) {
              const sensor = sensors.find(s => s.id === sensorKey);
              if (sensor && data[firebaseKey]) {
                const settings = data[firebaseKey];
                if (settings.noise !== undefined) sensor.noise = settings.noise;
                if (settings.drift_speed !== undefined) sensor.driftSpeed = settings.drift_speed;
                if (settings.target_value !== undefined) sensor.targetValue = settings.target_value;
              }
            }
            console.log('✅ Simulation settings synced from Firebase (real-time)');
          }
        },
        (error) => {
          console.error('❌ Error syncing simulation settings:', error);
        }
      );
      unsubscribers.value.push(unsubscribe);
    };

    const cleanupSubscriptions = () => {
      unsubscribers.value.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      unsubscribers.value = [];
      console.log('✅ Cleaned up old Firebase subscriptions');
    };

    const onDeviceChange = async () => {
      // Cleanup old subscriptions
      cleanupSubscriptions();
      
      // Clear sensor states when device changes
      sensors.forEach(sensor => {
        sensor.simulationEnabled = false;
        sensor.currentValue = '-- ';
        sensor.lastUpdated = '';
        sensor.updateError = '';
      });
      
      // Subscribe to real-time updates
      subscribeToSimulationStates();
      subscribeToSimulationSettings();
      subscribeToDeviceStatus();
    };

    const loadDevices = async () => {
      try {
        const devicesRef = dbRef(database, '/devices');
        onValue(devicesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            devices.value = Object.entries(data).map(([id, device]) => ({
              id,
              name: device.devicename || `Device-${id}`,
            }));
            console.log('✅ Devices loaded:', devices.value);
          }
        });
      } catch (error) {
        console.error('❌ Error loading devices:', error);
      }
    };

    onMounted(() => {
      loadDevices();
    });

    onBeforeUnmount(() => {
      cleanupSubscriptions();
    });

    return {
      selectedDeviceId,
      devices,
      sensors,
      getSensorIcon,
      toggleSimulation,
      updateNoise,
      updateDriftSpeed,
      simulateMode,
      loadDeviceStatus,
      onDeviceChange,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.eco-admin-super-admin {
  padding: 30px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  border-radius: 12px;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 40px;
  animation: slideDown 0.6s ease-out;
}

.header-section h1 {
  font-size: 2.5em;
  color: #1a3a52;
  margin: 0 0 10px 0;
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.1em;
  color: #666;
  margin: 0 0 15px 0;
  font-weight: 300;
}

.info-text {
  font-size: 0.95em;
  color: #555;
  background: rgba(102, 126, 234, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin: 0;
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

/* Control Panel */
.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.device-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.device-selector label {
  font-weight: 600;
  color: #333;
}

.device-input {
  padding: 10px 14px;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 1em;
  background: white;
  color: #333;
  cursor: pointer;
  min-width: 250px;
  transition: all 0.3s ease;
}

.device-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.refresh-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

/* Sensors Grid */
.sensors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sensor Card */
.sensor-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 4px solid #e0e0e0;
}

.sensor-card:hover {
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.sensor-card.active {
  border-left-color: #4CAF50;
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.15);
}

/* Sensor Header */
.sensor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.sensor-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.sensor-icon {
  font-size: 2em;
  display: inline-block;
  animation: pulse 2s infinite;
}

.title-info h2 {
  font-size: 1.3em;
  color: #1a3a52;
  margin: 0;
  font-weight: 600;
}

.sensor-type {
  font-size: 0.8em;
  color: #999;
  margin-top: 4px;
  display: block;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: all 0.4s ease;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: all 0.4s ease;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

/* Sensor Controls */
.sensor-controls {
  animation: expandIn 0.3s ease-out;
}

.current-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95em;
}

.value-display {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
}

.control-group {
  margin-bottom: 20px;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.95em;
  font-weight: 600;
  color: #333;
}

.label-text {
  flex: 1;
}

.label-value {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 700;
  min-width: 60px;
  text-align: center;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  color: #999;
  margin-top: 4px;
}

/* Slider Input */
.slider-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #e0e0e0 0%, #e0e0e0 100%);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  margin: 8px 0;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
  transition: all 0.2s ease;
}

.slider-input::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
}

.slider-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
  transition: all 0.2s ease;
}

.slider-input::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
}

/* Number Input */
.number-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1em;
  transition: all 0.3s ease;
  font-weight: 500;
}

.number-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Simulation Modes */
.simulation-modes {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.modes-title {
  font-size: 0.95em;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.modes-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mode-button {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mode-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.mode-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mode-button.safe {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.mode-button.safe:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
}

.mode-button.above {
  background: linear-gradient(135deg, #FF6B6B 0%, #ee5a52 100%);
  color: white;
}

.mode-button.above:hover {
  background: linear-gradient(135deg, #ee5a52 0%, #da4c44 100%);
}

.mode-button.below {
  background: linear-gradient(135deg, #FFA500 0%, #ff9600 100%);
  color: white;
}

.mode-button.below:hover {
  background: linear-gradient(135deg, #ff9600 0%, #e88800 100%);
}

/* Status Indicator */
.status-indicator {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  font-size: 0.85em;
}

.last-updated {
  color: #666;
}

.updating {
  color: #FF9800;
  font-weight: 600;
}

.error {
  color: #F44336;
  font-weight: 600;
}

/* No Device Selected */
.no-device-selected {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  color: #999;
  font-size: 1.1em;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandIn {
  from {
    opacity: 0;
    max-height: 0;
    transform: scaleY(0.95);
  }
  to {
    opacity: 1;
    max-height: 600px;
    transform: scaleY(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 600px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sensors-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .eco-admin-super-admin {
    padding: 20px 15px;
  }

  .header-section h1 {
    font-size: 2em;
  }

  .control-panel {
    flex-direction: column;
  }

  .device-selector {
    flex-direction: column;
    width: 100%;
  }

  .device-input {
    width: 100%;
    min-width: auto;
  }

  .refresh-btn {
    width: 100%;
  }

  .sensors-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .sensor-card {
    padding: 15px;
  }

  .modes-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .mode-button {
    flex: 1;
    min-width: 100px;
    padding: 10px 12px;
  }
}

@media (max-width: 480px) {
  .header-section h1 {
    font-size: 1.6em;
  }

  .subtitle {
    font-size: 0.95em;
  }

  .info-text {
    font-size: 0.85em;
  }

  .sensor-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .toggle-switch {
    align-self: flex-end;
  }

  .modes-buttons {
    flex-direction: column;
  }

  .mode-button {
    width: 100%;
  }
}
</style>
