<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Device Visualization Dashboard</h1>
        <p class="text-gray-600">Comprehensive view of device metadata, sensors, and operational status</p>
      </div>

      <!-- Device Selection -->
      <div class="mb-6">
        <EcoMyDevice @select-device="onDeviceSelected" />
      </div>

      <div v-if="!selectedDevice" class="text-center text-gray-500">
        Please select a device to view its visualization.
      </div>

      <div v-else class="space-y-8">
        <!-- User Information Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <span class="text-2xl">👤</span>
              User Information
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">User Email</h3>
                <p class="text-lg font-semibold text-gray-900">{{ userEmail }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Registered Devices</h3>
                <p class="text-lg font-semibold text-gray-900">{{ userDevicesCount }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Operational Events Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <span class="text-2xl">📋</span>
              Operational Events
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-2">Recent Events</h3>
                <ul class="space-y-2">
                  <li v-for="event in operationalEvents" :key="event.id" class="text-sm">
                    <span class="font-semibold">{{ event.type }}</span> - {{ formatTime(event.timestamp) }}
                  </li>
                </ul>
                <p v-if="operationalEvents.length === 0" class="text-gray-500">No recent events</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Device Metadata Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <span class="text-2xl">📊</span>
              Device Metadata
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Device ID</h3>
                <p class="text-lg font-semibold text-gray-900">{{ selectedDevice.id }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Device Name</h3>
                <p class="text-lg font-semibold text-gray-900">{{ deviceData.devicename || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Owner</h3>
                <p class="text-lg font-semibold text-gray-900">{{ ownerUsername || 'Loading...' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Registration Status</h3>
                <p class="text-lg font-semibold" :class="deviceData.registered ? 'text-green-600' : 'text-red-600'">
                  {{ deviceData.registered ? 'Registered' : 'Unregistered' }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Last Online</h3>
                <p class="text-lg font-semibold text-gray-900">{{ formatTime(deviceData.last_online) }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">IP Address</h3>
                <p class="text-lg font-semibold text-gray-900">{{ deviceData.state?.ip_address || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Connected SSID</h3>
                <p class="text-lg font-semibold text-gray-900">{{ deviceData.state?.connected_ssid || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Firmware Initialized</h3>
                <p class="text-lg font-semibold" :class="deviceData.state?.initialized ? 'text-green-600' : 'text-red-600'">
                  {{ deviceData.state?.initialized ? 'Yes' : 'No' }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Admin Name</h3>
                <p class="text-lg font-semibold text-gray-900">{{ deviceData.admin?.adminname || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 mb-1">Admin Email</h3>
                <p class="text-lg font-semibold text-gray-900">{{ deviceData.admin?.adminemail || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>

        

        <!-- Export Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
              <span class="text-2xl">📤</span>
              Export Data & Reports
            </h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="exportScope" class="block text-sm font-medium text-gray-700 mb-2">Export Scope</label>
              <select id="exportScope" v-model="exportScope" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option value="current">Current Device</option>
                <option value="all">All My Devices</option>
              </select>
            </div>
            <div>
              <label for="exportFormat" class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <select id="exportFormat" v-model="exportFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>
            <div>
              <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select id="dateRange" v-model="dateRange" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option value="all">All Data</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Include in Export</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="includeMetadata" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-700">Device Metadata</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="includeSensorData" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-700">Sensor Data</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="includeThresholds" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-700">Thresholds & Configuration</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="includeAlerts" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-700">Alerts & Events</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="includeCharts" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-700">Chart Snapshots</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="exportData" :disabled="isExporting" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isExporting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </span>
              <span v-else>Export Data</span>
            </button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import EcoMyDevice from './EcoMyDevice.vue';
//import EcoDeviceData from './EcoDeviceData.vue';
//import EcoDeviceWifi from './EcoDeviceWifi.vue';
import { getPDFLibs, getXLSX } from '../../utils/lazyLibs';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default {
  name: 'DeviceVisuals',
  components: {
    EcoMyDevice,
    //EcoDeviceData,
    //EcoDeviceWifi
  },
  data() {
    return {
      selectedDevice: null,
      deviceData: {},
      userEmail: '',
      userDevicesCount: 0,
      operationalEvents: [],
      ownerUsername: '',
      exportFormat: 'csv',
      dateRange: 'all',
      exportScope: 'current', // 'current' or 'all'
      includeMetadata: true,
      includeSensorData: true,
      includeThresholds: true,
      includeAlerts: true,
      includeCharts: true,
      isExporting: false
    };
  },
  methods: {
    async onDeviceSelected(device) {
      this.selectedDevice = device;
      await this.loadDeviceData();
      await this.loadOwnerUsername();
    },
    async loadDeviceData() {
      if (!this.selectedDevice) return;

      const db = getDatabase();
      const deviceRef = ref(db, `devices/${this.selectedDevice.id}`);

      return new Promise((resolve) => {
        onValue(deviceRef, (snapshot) => {
          if (snapshot.exists()) {
            this.deviceData = snapshot.val();
          } else {
            this.deviceData = {};
          }
          resolve();
        });
      });
    },
    formatTime(epochSeconds) {
      if (!epochSeconds) return 'N/A';
      const date = new Date(epochSeconds * 1000);
      return date.toLocaleString();
    },
    formatThresholdKey(key) {
      return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    async fetchAllUserDevices() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return [];
      const db = getDatabase();
      const devicesRef = ref(db, 'devices');
      return new Promise((resolve) => {
        onValue(devicesRef, (snapshot) => {
          const allDevices = snapshot.val() || {};
          const userDevices = Object.values(allDevices).filter(dev => dev.owner === user.uid && dev.registered);
          resolve(userDevices);
        }, { onlyOnce: true });
      });
    },
    loadUserInfo() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.userEmail = user.email;
        // Load user devices count
        const db = getDatabase();
        const devicesRef = ref(db, 'devices');
        onValue(devicesRef, (snapshot) => {
          const allDevices = snapshot.val() || {};
          this.userDevicesCount = Object.values(allDevices).filter(dev => dev.owner === user.uid && dev.registered).length;
        });
      }
    },
    loadOwnerUsername() {
      // The owner field contains the username or email directly, so assign it directly
      this.ownerUsername = this.deviceData.owner || 'N/A';
    },
    loadOperationalEvents() {
      // This would typically fetch from a logs collection
      // For now, simulate with some events based on device data
      this.operationalEvents = [
        { id: 1, type: 'Device Online', timestamp: this.deviceData.last_online },
        { id: 2, type: 'Registration', timestamp: this.deviceData.registered ? Date.now() / 1000 - 86400 : null }
      ].filter(event => event.timestamp);
    },
    async exportData() {
      if (!this.selectedDevice) return;

      this.isExporting = true;
      try {
        const exportData = await this.prepareExportData();

        switch (this.exportFormat) {
          case 'csv':
            this.exportToCSV(exportData);
            break;
          case 'pdf':
            await this.exportToPDF(exportData);
            break;
          case 'excel':
            this.exportToExcel(exportData);
            break;
        }
      } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
      } finally {
        this.isExporting = false;
      }
    },
    async prepareExportData() {
      const data = {};
      const auth = getAuth();
      const user = auth.currentUser;
      const isAdmin = user && user.email && user.email.endsWith('@admin.com'); // Example admin check

      if (this.exportScope === 'all') {
        // Fetch all user devices
        const allDevices = await this.fetchAllUserDevices();
        data.devices = allDevices;

        // Prepare combined metadata array
        if (this.includeMetadata) {
          data.metadata = allDevices.map(device => ({
            deviceId: device.id,
            deviceName: device.devicename || 'N/A',
            owner: device.owner || 'N/A',
            registrationStatus: device.registered ? 'Registered' : 'Unregistered',
            lastOnline: this.formatTime(device.last_online),
            ipAddress: device.state?.ip_address || 'N/A',
            connectedSSID: device.state?.connected_ssid || 'N/A',
            firmwareInitialized: device.state?.initialized ? 'Yes' : 'No',
            adminName: isAdmin ? (device.admin?.adminname || 'N/A') : 'Hidden',
            adminEmail: isAdmin ? (device.admin?.adminemail || 'N/A') : 'Hidden',
            firmwareVersion: device.firmware_version || 'N/A',
            configHistory: device.config_history || []
          }));
        }

        // Prepare combined sensor data array with deviceId
        if (this.includeSensorData) {
          let combinedSensorData = [];
          for (const device of allDevices) {
            const sensorData = await this.fetchSensorDataByDateRange(device.id);
            // Add deviceId to each sensor data row
            const sensorDataWithId = sensorData.map(row => ({ deviceId: device.id, ...row }));
            combinedSensorData = combinedSensorData.concat(sensorDataWithId);
          }
          data.sensorData = combinedSensorData;
          data.sensorStats = this.calculateSensorStats(combinedSensorData);
        }

        // Thresholds & Mist Config combined
        if (this.includeThresholds) {
          data.thresholds = allDevices.map(device => device.thresholds || {});
          data.mistConfig = allDevices.map(device => ({
            auto: device.mist?.auto ? 'Enabled' : 'Disabled',
            schedule: device.mist?.schedule || 'N/A',
            lastChange: device.mist?.last_change ? this.formatTime(device.mist.last_change) : 'N/A'
          }));
        }

        // Alerts & Events combined (simulate or fetch for all devices)
        if (this.includeAlerts) {
          // For simplicity, combine operationalEvents from all devices if available
          data.alerts = [];
          for (const device of allDevices) {
            // Simulate fetching alerts per device or use existing operationalEvents if applicable
            // Here we just add deviceId to existing operationalEvents for demo
            const deviceAlerts = this.operationalEvents.map(ev => ({ deviceId: device.id, ...ev }));
            data.alerts = data.alerts.concat(deviceAlerts);
          }
        }

        // Chart snapshots - not supported for all devices, keep empty or handle differently
        if (this.includeCharts) {
          data.chartSnapshots = [];
        }

        // Export summary
        data.exportSummary = {
          exportDate: new Date().toLocaleString(),
          exportFormat: this.exportFormat,
          dateRange: this.dateRange,
          includedSections: {
            metadata: this.includeMetadata,
            sensorData: this.includeSensorData,
            thresholds: this.includeThresholds,
            alerts: this.includeAlerts,
            charts: this.includeCharts
          },
          devicesIncluded: allDevices.map(d => d.id)
        };

      } else {
        // Current device export (existing logic)
        if (this.includeMetadata) {
          data.metadata = {
            deviceId: this.selectedDevice.id,
            deviceName: this.deviceData.devicename || 'N/A',
            owner: this.ownerUsername,
            registrationStatus: this.deviceData.registered ? 'Registered' : 'Unregistered',
            lastOnline: this.formatTime(this.deviceData.last_online),
            ipAddress: this.deviceData.state?.ip_address || 'N/A',
            connectedSSID: this.deviceData.state?.connected_ssid || 'N/A',
            firmwareInitialized: this.deviceData.state?.initialized ? 'Yes' : 'No',
            adminName: isAdmin ? (this.deviceData.admin?.adminname || 'N/A') : 'Hidden',
            adminEmail: isAdmin ? (this.deviceData.admin?.adminemail || 'N/A') : 'Hidden',
            firmwareVersion: this.deviceData.firmware_version || 'N/A',
            configHistory: this.deviceData.config_history || []
          };
        }

        if (this.includeSensorData) {
          data.sensorData = await this.fetchSensorDataByDateRange();
          data.sensorStats = this.calculateSensorStats(data.sensorData);
        }

        if (this.includeThresholds) {
          data.thresholds = this.deviceData.thresholds || {};
          data.mistConfig = {
            auto: this.deviceData.mist?.auto ? 'Enabled' : 'Disabled',
            schedule: this.deviceData.mist?.schedule || 'N/A',
            lastChange: this.deviceData.mist?.last_change ? this.formatTime(this.deviceData.mist.last_change) : 'N/A'
          };
        }

        if (this.includeAlerts) {
          data.alerts = await this.fetchOperationalEvents();
        }

        if (this.includeCharts) {
          data.chartSnapshots = await this.captureChartSnapshots();
        }

        data.exportSummary = {
          exportDate: new Date().toLocaleString(),
          exportFormat: this.exportFormat,
          dateRange: this.dateRange,
          includedSections: {
            metadata: this.includeMetadata,
            sensorData: this.includeSensorData,
            thresholds: this.includeThresholds,
            alerts: this.includeAlerts,
            charts: this.includeCharts
          },
          devicesIncluded: [this.selectedDevice.id]
        };
      }

      this.logExportAction(data.exportSummary);

      return data;
    },
    // Fetch sensor data from Firebase for the selected device and date range
    async fetchSensorDataByDateRange(deviceId) {
      const id = deviceId || (this.selectedDevice && this.selectedDevice.id);
      if (!id) return [];
      const db = getDatabase();
      const sensorRef = ref(db, `sensors/${id}`);
      return new Promise((resolve) => {
        onValue(sensorRef, (snapshot) => {
          const allData = snapshot.val() || {};
          // Convert object to array if needed
          let dataArr = Array.isArray(allData) ? allData : Object.values(allData);
          const now = Date.now() / 1000;
          let fromEpoch = 0;
          if (this.dateRange === 'last7days') fromEpoch = now - 7 * 86400;
          else if (this.dateRange === 'last30days') fromEpoch = now - 30 * 86400;
          else if (this.dateRange === 'last90days') fromEpoch = now - 90 * 86400;
          // Filter data by timestamp if timestamp exists
          dataArr = dataArr.filter(row => !row.timestamp || row.timestamp >= fromEpoch);
          resolve(dataArr);
        }, { onlyOnce: true });
      });
    },

    // Calculate summary statistics for sensor data
    calculateSensorStats(sensorData) {
      if (!sensorData || sensorData.length === 0) return {};
      const stats = {};
      const keys = Object.keys(sensorData[0]).filter(k => k !== 'timestamp');
      keys.forEach(key => {
        const values = sensorData.map(row => Number(row[key])).filter(v => !isNaN(v));
        if (values.length) {
          stats[key] = {
            min: Math.min(...values),
            max: Math.max(...values),
            avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
          };
        }
      });
      return stats;
    },

    // Fetch operational events/logs (simulate or fetch from Firebase)
    async fetchOperationalEvents() {
      // Replace with actual log fetch if available
      return this.operationalEvents;
    },

    // Log export action (for audit/history)
    logExportAction(summary) {
      // For demo: just print to console. Replace with Firebase log if needed.
      console.log('Export action logged:', summary);
    },
    exportToCSV(data) {
      const csvData = this.convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const filename = `device_${this.selectedDevice.id}_export_${new Date().toISOString().split('T')[0]}.csv`;
      saveAs(blob, filename);
      this.showExportSummary('CSV', filename, data.exportSummary);
    },
    async exportToPDF(data) {
      const { jsPDF } = await getPDFLibs();
      const doc = new jsPDF();
      const filename = `device_${this.selectedDevice.id}_export_${new Date().toISOString().split('T')[0]}.pdf`;

      // Cover page
      doc.setFontSize(22);
      doc.text('Device Export Report', 20, 30);
      doc.setFontSize(12);
      doc.text(`Device ID: ${this.selectedDevice.id}`, 20, 50);
      doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 20, 60);
      doc.text(`Date Range: ${data.exportSummary?.dateRange || 'N/A'}`, 20, 70);
      doc.text('Sections Included:', 20, 80);
      let y = 90;
      Object.entries(data.exportSummary?.includedSections || {}).forEach(([k, v]) => {
        doc.text(`- ${k}: ${v ? 'Yes' : 'No'}`, 25, y);
        y += 8;
      });
      doc.addPage();

      // Metadata
      if (data.metadata) {
        doc.setFontSize(16);
        doc.text('Device Metadata', 20, 30);
        doc.setFontSize(10);
        let y2 = 40;
        Object.entries(data.metadata).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            doc.text(`${key}:`, 20, y2);
            y2 += 8;
            value.forEach((item, idx) => {
              doc.text(`  - ${JSON.stringify(item)}`, 25, y2);
              y2 += 8;
            });
          } else {
            doc.text(`${key}: ${value}`, 20, y2);
            y2 += 8;
          }
        });
        doc.addPage();
      }

      // Sensor Data Table
      if (data.sensorData && data.sensorData.length > 0) {
        doc.setFontSize(16);
        doc.text('Sensor Data', 20, 30);
        doc.setFontSize(8);
        let y3 = 40;
        const keys = Object.keys(data.sensorData[0]);
        doc.text(keys.join(' | '), 20, y3);
        y3 += 8;
        data.sensorData.forEach(row => {
          doc.text(keys.map(k => String(row[k])).join(' | '), 20, y3);
          y3 += 6;
          if (y3 > 270) { doc.addPage(); y3 = 30; }
        });
        doc.addPage();
      }

      // Sensor Stats
      if (data.sensorStats && Object.keys(data.sensorStats).length > 0) {
        doc.setFontSize(16);
        doc.text('Sensor Summary Statistics', 20, 30);
        doc.setFontSize(10);
        let y4 = 40;
        Object.entries(data.sensorStats).forEach(([k, v]) => {
          doc.text(`${k}: min=${v.min}, max=${v.max}, avg=${v.avg}`, 20, y4);
          y4 += 8;
        });
        doc.addPage();
      }

      // Thresholds
      if (data.thresholds && Object.keys(data.thresholds).length > 0) {
        doc.setFontSize(16);
        doc.text('Thresholds', 20, 30);
        doc.setFontSize(10);
        let y5 = 40;
        Object.entries(data.thresholds).forEach(([k, v]) => {
          doc.text(`${k}: ${v}`, 20, y5);
          y5 += 8;
        });
        doc.addPage();
      }

      // Mist Config
      if (data.mistConfig) {
        doc.setFontSize(16);
        doc.text('Mist Automation Config', 20, 30);
        doc.setFontSize(10);
        let y6 = 40;
        Object.entries(data.mistConfig).forEach(([k, v]) => {
          doc.text(`${k}: ${v}`, 20, y6);
          y6 += 8;
        });
        doc.addPage();
      }

      // Alerts/Events
      if (data.alerts && data.alerts.length > 0) {
        doc.setFontSize(16);
        doc.text('Operational Events', 20, 30);
        doc.setFontSize(10);
        let y7 = 40;
        data.alerts.forEach(ev => {
          doc.text(`${ev.type} - ${this.formatTime(ev.timestamp)}`, 20, y7);
          y7 += 8;
          if (y7 > 270) { doc.addPage(); y7 = 30; }
        });
        doc.addPage();
      }

      // Chart Snapshots
      if (data.chartSnapshots && data.chartSnapshots.length > 0) {
        doc.setFontSize(16);
        doc.text('Chart Snapshots', 20, 30);
        let y8 = 40;
        for (const snapshot of data.chartSnapshots) {
          if (y8 > 250) {
            doc.addPage();
            y8 = 30;
          }
          doc.addImage(snapshot, 'PNG', 20, y8, 170, 100);
          y8 += 120;
        }
      }

      doc.save(filename);
      this.showExportSummary('PDF', filename, data.exportSummary);
    },
    async exportToExcel(data) {
      const XLSX = await getXLSX();
      const workbook = XLSX.utils.book_new();
      const filename = `device_${this.selectedDevice.id}_export_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Metadata sheet
      if (data.metadata) {
        const metadataSheet = XLSX.utils.json_to_sheet([data.metadata]);
        XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');
      }

      // Sensor data sheet
      if (data.sensorData) {
        const sensorSheet = XLSX.utils.json_to_sheet(data.sensorData);
        XLSX.utils.book_append_sheet(workbook, sensorSheet, 'Sensor Data');
      }

      // Sensor stats sheet
      if (data.sensorStats) {
        const statsArr = Object.entries(data.sensorStats).map(([k, v]) => ({ sensor: k, ...v }));
        const statsSheet = XLSX.utils.json_to_sheet(statsArr);
        XLSX.utils.book_append_sheet(workbook, statsSheet, 'Sensor Stats');
      }

      // Thresholds sheet
      if (data.thresholds) {
        const thresholdsSheet = XLSX.utils.json_to_sheet([data.thresholds]);
        XLSX.utils.book_append_sheet(workbook, thresholdsSheet, 'Thresholds');
      }

      // Mist config sheet
      if (data.mistConfig) {
        const mistSheet = XLSX.utils.json_to_sheet([data.mistConfig]);
        XLSX.utils.book_append_sheet(workbook, mistSheet, 'Mist Config');
      }

      // Alerts/events sheet
      if (data.alerts) {
        const alertsSheet = XLSX.utils.json_to_sheet(data.alerts);
        XLSX.utils.book_append_sheet(workbook, alertsSheet, 'Events');
      }

      XLSX.writeFile(workbook, filename);
      this.showExportSummary('Excel', filename, data.exportSummary);
    },
    convertToCSV(data) {
      const rows = [];
      // Export summary
      if (data.exportSummary) {
        rows.push(['Export Summary']);
        Object.entries(data.exportSummary).forEach(([k, v]) => {
          if (typeof v === 'object') {
            rows.push([k, JSON.stringify(v)]);
          } else {
            rows.push([k, v]);
          }
        });
        rows.push([]);
      }
      // Metadata
      if (data.metadata) {
        rows.push(['Section', 'Field', 'Value']);
        Object.entries(data.metadata).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            rows.push(['Metadata', key, JSON.stringify(value)]);
          } else {
            rows.push(['Metadata', key, value]);
          }
        });
        rows.push([]);
      }
      // Sensor data
      if (data.sensorData && data.sensorData.length > 0) {
        rows.push(['Sensor Data']);
        rows.push(Object.keys(data.sensorData[0]));
        data.sensorData.forEach(row => rows.push(Object.values(row)));
        rows.push([]);
      }
      // Sensor stats
      if (data.sensorStats && Object.keys(data.sensorStats).length > 0) {
        rows.push(['Sensor Stats']);
        rows.push(['Sensor', 'Min', 'Max', 'Avg']);
        Object.entries(data.sensorStats).forEach(([k, v]) => {
          rows.push([k, v.min, v.max, v.avg]);
        });
        rows.push([]);
      }
      // Thresholds
      if (data.thresholds && Object.keys(data.thresholds).length > 0) {
        rows.push(['Thresholds']);
        Object.entries(data.thresholds).forEach(([k, v]) => {
          rows.push([k, v]);
        });
        rows.push([]);
      }
      // Mist config
      if (data.mistConfig) {
        rows.push(['Mist Config']);
        Object.entries(data.mistConfig).forEach(([k, v]) => {
          rows.push([k, v]);
        });
        rows.push([]);
      }
      // Alerts/events
      if (data.alerts && data.alerts.length > 0) {
        rows.push(['Events']);
        rows.push(['Type', 'Timestamp']);
        data.alerts.forEach(ev => {
          rows.push([ev.type, this.formatTime(ev.timestamp)]);
        });
        rows.push([]);
      }
      return Papa.unparse(rows);
    },
    // Show export summary dialog/alert
    showExportSummary(format, filename, summary) {
      let msg = `Exported as ${format} file: ${filename}\n`;
      msg += `Date: ${summary.exportDate}\n`;
      msg += `Date Range: ${summary.dateRange}\n`;
      msg += 'Sections Included:\n';
      Object.entries(summary.includedSections).forEach(([k, v]) => {
        msg += `- ${k}: ${v ? 'Yes' : 'No'}\n`;
      });
      if (summary.devicesIncluded && summary.devicesIncluded.length > 1) {
        msg += 'Devices Included:\n';
        summary.devicesIncluded.forEach(deviceId => {
          msg += `- ${deviceId}\n`;
        });
      }
      alert(msg);
    },
    async captureChartSnapshots() {
      const snapshots = [];
      // Find chart elements in the DOM
      const chartElements = document.querySelectorAll('.chart-container canvas');

      for (const canvas of chartElements) {
        try {
          const canvasImage = await html2canvas(canvas);
          snapshots.push(canvasImage.toDataURL('image/png'));
        } catch (error) {
          console.error('Failed to capture chart snapshot:', error);
        }
      }

      return snapshots;
    }
  },
  mounted() {
    this.loadUserInfo();
  },
  watch: {
    selectedDevice() {
      this.loadOperationalEvents();
    }
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
