<template>
  <div class="controller-modes">
    <div class="controller-header">
      <h3>🎮 Mist Controller</h3>
      <div class="relay-status">
        <span class="status-label">Relay Status:</span>
        <span :class="['status-indicator', relayState ? 'active' : 'inactive']">
          {{ relayState ? '✓ Active' : '○ Inactive' }}
        </span>
      </div>
    </div>

    <div class="mode-tabs">
      <button
        v-for="mode in modes"
        :key="mode.value"
        :class="['mode-tab', { active: selectedMode === mode.value }]"
        @click="selectedMode = mode.value; updateMode()"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span class="mode-name">{{ mode.label }}</span>
      </button>
    </div>

    <div class="mode-content">
      <div v-if="selectedMode === 'manual'" class="manual-mode">
        <div class="manual-header">
          <h4>Manual Control</h4>
          <p class="description">Control the relay on-demand with instant response</p>
        </div>
        
        <div class="button-group">
          <button
            class="btn btn-on"
            @click="toggleRelay(true)"
            :disabled="loading"
          >
            <span class="btn-icon">🔴</span>
            <span class="btn-text">Turn ON</span>
          </button>
          <button
            class="btn btn-off"
            @click="toggleRelay(false)"
            :disabled="loading"
          >
            <span class="btn-icon">⚪</span>
            <span class="btn-text">Turn OFF</span>
          </button>
        </div>
        <p v-if="actionMessage" :class="['action-message', actionMessage.type]">
          {{ actionMessage.text }}
        </p>
      </div>

      <div v-if="selectedMode === 'auto'" class="auto-mode">
        <div class="auto-header">
          <h4>Automatic Control</h4>
          <p class="description">Relay activates when sensor thresholds are breached</p>
        </div>

        <div class="auto-toggle-section">
          <div class="toggle-wrapper">
            <span class="toggle-label">Auto Mode Status:</span>
            <button 
              :class="['toggle-btn', { active: autoActive }]"
              @click="toggleAutoMode()"
              :disabled="loading"
            >
              <span class="toggle-circle"></span>
              <span class="toggle-text">{{ autoActive ? 'ON' : 'OFF' }}</span>
            </button>
          </div>
          <p class="toggle-description">
            {{ autoActive ? '✅ Auto mode is enabled' : '⏸️ Auto mode is disabled' }}
          </p>
        </div>
        
        <div class="auto-info">
          <div class="info-box">
            <span class="info-icon">💧</span>
            <div class="info-content">
              <p class="info-title">Humidity Threshold</p>
              <p class="info-value">{{ humidityMin }}% - {{ humidityThreshold }}%</p>
            </div>
          </div>
          <div class="info-box">
            <span class="info-icon">🌡️</span>
            <div class="info-content">
              <p class="info-title">Temperature Threshold</p>
              <p class="info-value">{{ tempMin }}°C - {{ tempThreshold }}°C</p>
            </div>
          </div>
          <div class="info-box">
            <span class="info-icon">⚙️</span>
            <div class="info-content">
              <p class="info-title">Relay Status</p>
              <p class="info-value">{{ relayState ? 'ON' : 'OFF' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedMode === 'schedule'" class="schedule-mode">
        <div class="schedule-header">
          <h4>Schedule Control</h4>
          <p class="description">Set daily automatic misting schedule</p>
        </div>

        <div class="schedule-toggle-section">
          <div class="toggle-wrapper">
            <span class="toggle-label">Schedule Status:</span>
            <button 
              :class="['toggle-btn', { active: scheduleActive }]"
              @click="toggleScheduleMode()"
              :disabled="loading"
            >
              <span class="toggle-circle"></span>
              <span class="toggle-text">{{ scheduleActive ? 'ON' : 'OFF' }}</span>
            </button>
          </div>
          <p class="toggle-description">
            {{ scheduleActive ? '✅ Schedule is enabled' : '⏸️ Schedule is disabled' }}
          </p>
        </div>
        
        <form @submit.prevent="saveSchedule" class="schedule-form">
          <div class="form-group">
            <label for="schedule-date" class="form-label">
              <span class="label-icon">📅</span> Schedule Date
            </label>
            <input
              id="schedule-date"
              type="date"
              v-model="schedule.date"
              required
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="start-time" class="form-label">
                <span class="label-icon">🕐</span> Start Time
              </label>
              <input
                id="start-time"
                type="time"
                v-model="schedule.start"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="end-time" class="form-label">
                <span class="label-icon">🕑</span> End Time
              </label>
              <input
                id="end-time"
                type="time"
                v-model="schedule.end"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="duration-info" v-if="schedule.start && schedule.end">
            <span class="duration-label">Duration:</span>
            <span class="duration-value">{{ calculateDuration() }}</span>
          </div>

          <button type="submit" class="btn btn-save" :disabled="loading">
            <span class="btn-icon">💾</span>
            <span class="btn-text">Save Schedule</span>
          </button>
        </form>

        <div v-if="scheduleSaved" class="success-message">
          <span class="success-icon">✅</span>
          <span class="success-text">Schedule saved successfully!</span>
        </div>

        <div v-if="schedule.start && schedule.end && schedule.date" class="schedule-preview">
          <h5>Current Schedule</h5>
          <p class="schedule-info">
            📅 {{ formatDate(schedule.date) }}
          </p>
          <p class="schedule-time">
            🕒 {{ schedule.start }} - {{ schedule.end }}
          </p>
          <p class="schedule-duration">
            ⏱️ Duration: {{ calculateDuration() }}
          </p>
          <p :class="['schedule-status', scheduleActive ? 'active' : 'inactive']">
            {{ scheduleActive ? '✅ Active' : '⏸️ Inactive' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
  name: "ControllerModes",
  data() {
    return {
      selectedMode: "manual",
      schedule: {
        date: "",
        start: "",
        end: "",
      },
      scheduleSaved: false,
      scheduleActive: false,
      loading: false,
      relayState: false,
      autoActive: false,
      humidityMin: 50,
      humidityThreshold: 60,
      tempMin: 18,
      tempThreshold: 25,
      actionMessage: null,
      modes: [
        { value: "manual", label: "Manual", icon: "🎮" },
        { value: "auto", label: "Auto", icon: "⚡" },
        { value: "schedule", label: "Schedule", icon: "📅" },
      ],
    };
  },
  methods: {
    updateMode() {
      const db = getDatabase();
      const modePath = `/devices/${this.deviceId}/mist/mode`;
      set(ref(db, modePath), this.selectedMode)
        .then(() => {
          this.$emit("mode-updated", this.selectedMode);
        })
        .catch((error) => {
          console.error("Failed to update mode:", error);
          this.showMessage("Failed to update mode", "error");
        });
    },
    toggleRelay(state) {
      this.loading = true;
      const db = getDatabase();
      const manualPath = `/devices/${this.deviceId}/mist/manual`;
      set(ref(db, manualPath), state)
        .then(() => {
          this.relayState = state;
          this.showMessage(
            `Relay turned ${state ? "ON" : "OFF"}`,
            "success"
          );
          console.log(`🔌 Relay turned ${state ? "ON" : "OFF"}`);
        })
        .catch((error) => {
          console.error("Failed to toggle relay:", error);
          this.showMessage("Failed to toggle relay", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveSchedule() {
      this.loading = true;
      const db = getDatabase();
      const schedulePath = `/devices/${this.deviceId}/mist/schedule`;
      set(ref(db, schedulePath), this.schedule)
        .then(() => {
          this.scheduleSaved = true;
          this.showMessage("Schedule saved successfully!", "success");
          setTimeout(() => (this.scheduleSaved = false), 3000);
        })
        .catch((error) => {
          console.error("Failed to save schedule:", error);
          this.showMessage("Failed to save schedule", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchSchedule() {
      const db = getDatabase();
      const schedulePath = `/devices/${this.deviceId}/mist/schedule`;
      onValue(ref(db, schedulePath), (snapshot) => {
        if (snapshot.exists()) {
          this.schedule = snapshot.val();
        }
      });
    },
    fetchRelayState() {
      const db = getDatabase();
      const manualPath = `/devices/${this.deviceId}/mist/manual`;
      onValue(ref(db, manualPath), (snapshot) => {
        if (snapshot.exists()) {
          this.relayState = snapshot.val();
        }
      });
    },
    toggleAutoMode() {
      this.loading = true;
      const db = getDatabase();
      const autoPath = `/devices/${this.deviceId}/mist/auto`;
      const relayPath = `/devices/${this.deviceId}/mist/manual`;
      this.autoActive = !this.autoActive;
      
      // Set both auto mode and relay state
      set(ref(db, autoPath), this.autoActive)
        .then(() => {
          // When auto is ON, turn relay ON; when auto is OFF, turn relay OFF
          return set(ref(db, relayPath), this.autoActive);
        })
        .then(() => {
          this.relayState = this.autoActive;
          this.showMessage(
            `Auto mode turned ${this.autoActive ? "ON" : "OFF"} - Relay turned ${this.autoActive ? "ON" : "OFF"}`,
            "success"
          );
          console.log(`⚡ Auto mode turned ${this.autoActive ? "ON" : "OFF"}`);
          console.log(`🔌 Relay turned ${this.autoActive ? "ON" : "OFF"}`);
        })
        .catch((error) => {
          console.error("Failed to toggle auto mode:", error);
          this.autoActive = !this.autoActive; // Revert on error
          this.showMessage("Failed to toggle auto mode", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchAutoMode() {
      const db = getDatabase();
      const autoPath = `/devices/${this.deviceId}/mist/auto`;
      onValue(ref(db, autoPath), (snapshot) => {
        if (snapshot.exists()) {
          this.autoActive = snapshot.val();
        }
      });
    },
    fetchThresholds() {
      const db = getDatabase();
      const thresholdsPath = `/devices/${this.deviceId}/thresholds`;
      onValue(ref(db, thresholdsPath), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.humidityMin = data.humidity_min || 50;
          this.humidityThreshold = data.humidity_max || 60;
          this.tempMin = data.air_temp_min || 18;
          this.tempThreshold = data.air_temp_max || 25;
        }
      });
    },
    toggleScheduleMode() {
      this.loading = true;
      const db = getDatabase();
      const schedulePath = `/devices/${this.deviceId}/mist/schedule/active`;
      const relayPath = `/devices/${this.deviceId}/mist/manual`;
      this.scheduleActive = !this.scheduleActive;
      
      // Set both schedule active and relay state
      set(ref(db, schedulePath), this.scheduleActive)
        .then(() => {
          // When schedule is ON, turn relay ON; when schedule is OFF, turn relay OFF
          return set(ref(db, relayPath), this.scheduleActive);
        })
        .then(() => {
          this.relayState = this.scheduleActive;
          this.showMessage(
            `Schedule turned ${this.scheduleActive ? "ON" : "OFF"} - Relay turned ${this.scheduleActive ? "ON" : "OFF"}`,
            "success"
          );
          console.log(`📅 Schedule turned ${this.scheduleActive ? "ON" : "OFF"}`);
          console.log(`🔌 Relay turned ${this.scheduleActive ? "ON" : "OFF"}`);
        })
        .catch((error) => {
          console.error("Failed to toggle schedule:", error);
          this.scheduleActive = !this.scheduleActive;
          this.showMessage("Failed to toggle schedule", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchScheduleMode() {
      const db = getDatabase();
      const schedulePath = `/devices/${this.deviceId}/mist/schedule/active`;
      onValue(ref(db, schedulePath), (snapshot) => {
        if (snapshot.exists()) {
          this.scheduleActive = snapshot.val();
        }
      });
    },
    calculateDuration() {
      if (!this.schedule.start || !this.schedule.end) return "0h 0m";
      
      const [startHour, startMin] = this.schedule.start.split(":").map(Number);
      const [endHour, endMin] = this.schedule.end.split(":").map(Number);
      
      let startTotalMin = startHour * 60 + startMin;
      let endTotalMin = endHour * 60 + endMin;
      
      if (endTotalMin < startTotalMin) {
        endTotalMin += 24 * 60; // Next day
      }
      
      const durationMin = endTotalMin - startTotalMin;
      const hours = Math.floor(durationMin / 60);
      const minutes = durationMin % 60;
      
      return `${hours}h ${minutes}m`;
    },
    formatDate(dateStr) {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", options);
    },
    showMessage(text, type) {
      this.actionMessage = { text, type };
      setTimeout(() => {
        this.actionMessage = null;
      }, 3000);
    },
  },
  props: {
    deviceId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.fetchSchedule();
    this.fetchRelayState();
    this.fetchAutoMode();
    this.fetchThresholds();
    this.fetchScheduleMode();
  },
};
</script>

<style scoped>
.controller-modes {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.controller-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
}

.controller-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.relay-status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.status-label {
  font-size: 12px;
  font-weight: 600;
  color: #7f8c8d;
  text-transform: uppercase;
}

.status-indicator {
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  padding: 4px 12px;
}

.status-indicator.active {
  background: #2ecc71;
  color: white;
}

.status-indicator.inactive {
  background: #e74c3c;
  color: white;
}

.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.mode-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
}

.mode-tab:hover {
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
}

.mode-tab.active {
  background: #3498db;
  border-color: #3498db;
  color: white;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
}

.mode-icon {
  font-size: 20px;
}

.mode-name {
  font-size: 12px;
}

.mode-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.manual-header,
.auto-header,
.schedule-header {
  margin-bottom: 20px;
}

.manual-header h4,
.auto-header h4,
.schedule-header h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.description {
  margin: 0;
  font-size: 13px;
  color: #7f8c8d;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-on {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
}

.btn-on:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
}

.btn-off {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.btn-off:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.btn-save {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  width: 100%;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 13px;
}

.action-message {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
}

.action-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.action-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.auto-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.auto-toggle-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.toggle-label {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
}

.toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 70px;
  height: 36px;
  padding: 2px;
  background: #e0e0e0;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 600;
  color: #7f8c8d;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
}

.toggle-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toggle-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-circle {
  position: absolute;
  left: 2px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-btn.active .toggle-circle {
  left: calc(100% - 30px);
}

.toggle-text {
  position: relative;
  z-index: 2;
  margin-left: 8px;
}

.toggle-description {
  margin: 0;
  font-size: 12px;
  color: #7f8c8d;
}

.info-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.info-icon {
  font-size: 24px;
}

.info-content {
  flex: 1;
}

.info-title {
  margin: 0 0 4px 0;
  font-size: 12px;
  color: #7f8c8d;
  text-transform: uppercase;
  font-weight: 600;
}

.info-value {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
}

.schedule-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.schedule-toggle-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
}

.label-icon {
  font-size: 16px;
}

.form-input {
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.duration-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ecf0f1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.duration-label {
  color: #7f8c8d;
  text-transform: uppercase;
}

.duration-value {
  color: #2980b9;
  font-size: 16px;
  font-weight: 700;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}

.success-icon {
  font-size: 16px;
}

.success-text {
  flex: 1;
}

.schedule-preview {
  padding: 16px;
  background: #f0f8ff;
  border-left: 4px solid #3498db;
  border-radius: 6px;
}

.schedule-preview h5 {
  margin: 0 0 12px 0;
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
}

.schedule-info,
.schedule-time,
.schedule-duration {
  margin: 8px 0;
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.schedule-status {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.schedule-status.active {
  background: #d4edda;
  color: #155724;
}

.schedule-status.inactive {
  background: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .controller-modes {
    padding: 16px;
  }

  .controller-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .mode-tabs {
    flex-wrap: wrap;
  }

  .auto-info {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>