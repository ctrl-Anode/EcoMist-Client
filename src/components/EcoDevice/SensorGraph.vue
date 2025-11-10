<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <span class="text-2xl">📈</span>
        Sensor History Graph
      </h2>
      <div class="flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
        <div
          :class="['w-2 h-2 rounded-full animate-pulse', isOnline ? 'bg-green-400' : 'bg-red-400']"
        ></div>
        <span class="text-xs text-green-100 font-medium">{{ isOnline ? 'Live' : 'Offline' }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6">
      <!-- Sensor Selector -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Sensor</label>
        <select
          v-model="selectedSensor"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option v-for="sensor in availableSensors" :key="sensor.key" :value="sensor.key">
            {{ sensor.label }}
          </option>
        </select>
      </div>

      <!-- Chart -->
      <div class="relative">
        <div v-if="loading" class="flex items-center justify-center h-64 text-gray-500">Loading sensor data...</div>
        <div v-else-if="!chartData.labels.length" class="flex items-center justify-center h-64 text-gray-500">
          No historical data available
        </div>
        <div v-else class="h-64">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Latest Reading -->
      <div class="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-600 mb-2">Latest Reading</h3>
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-900">
            {{ latestValue !== null ? `${latestValue} ${getSensorUnit(selectedSensor)}` : 'N/A' }}
          </span>
          <span class="text-sm text-gray-500">{{ latestTimestamp ? formatTime(latestTimestamp) : 'No data' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

const SENSOR_CONFIG = [
  { key: 'humidity', label: 'Humidity', unit: '%', color: '#3B82F6' },
  { key: 'airTemp', label: 'Air Temperature', unit: '°C', color: '#EF4444' },
  { key: 'waterTemp', label: 'Water Temperature', unit: '°C', color: '#10B981' },
  { key: 'distance', label: 'Water Level', unit: 'cm', color: '#8B5CF6' },
  { key: 'ph', label: 'pH Level', unit: '', color: '#F59E0B' },
  { key: 'tds', label: 'TDS', unit: 'ppm', color: '#06B6D4' }
]

export default {
  name: 'SensorGraph',
  components: { Line },
  props: {
    deviceId: String,
    sensorReadings: Object,
    thresholds: Object
  },
  data() {
    return {
      selectedSensor: 'humidity',
      isOnline: navigator.onLine,
      loading: false
    }
  },
  computed: {
    availableSensors() {
      return [{ key: 'all', label: 'All Sensors' }, ...SENSOR_CONFIG]
    },
    chartData() {
      if (this.selectedSensor === 'all') {
        const { labels, datasets } = this.getAllSensorData()
        return { labels, datasets }
      } else {
        const { labels, values } = this.getSensorData()
        const thresholdData = this.getThresholdData(labels.length)
        return {
          labels,
          datasets: [
            {
              label: this.getSensorLabel(this.selectedSensor),
              data: values,
              borderColor: this.getSensorColor(this.selectedSensor),
              backgroundColor: this.getSensorColor(this.selectedSensor) + '20',
              tension: 0.4,
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: false
            },
            ...thresholdData
          ]
        }
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: ctx =>
                `${ctx.dataset.label}: ${
                  ctx.parsed.y !== null ? ctx.parsed.y : 'N/A'
                }`
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: { unit: 'hour', displayFormats: { hour: 'MMM dd HH:mm' } },
            title: { display: true, text: 'Time' }
          },
          y: { beginAtZero: false }
        }
      }
    },
    latestValue() {
      if (this.selectedSensor === 'all') return null
      return this.sensorReadings?.latest?.[this.selectedSensor] ?? null
    },
    latestTimestamp() {
      return Date.now()
    }
  },
  methods: {
    getSensorData() {
      const history = this.sensorReadings?.history || {}
      const timestamps = Object.keys(history).sort()
      const labels = []
      const values = []
      timestamps.forEach(ts => {
        const entry = history[ts]
        if (entry && entry[this.selectedSensor] !== undefined) {
          labels.push(new Date(parseInt(ts)))
          values.push(entry[this.selectedSensor])
        }
      })
      return { labels, values }
    },
    getAllSensorData() {
      const history = this.sensorReadings?.history || {}
      const timestamps = Object.keys(history).sort()
      const labels = timestamps.map(ts => new Date(parseInt(ts)))
      const datasets = SENSOR_CONFIG.map(sensor => ({
        label: sensor.label,
        data: timestamps.map(ts => history[ts]?.[sensor.key] ?? null),
        borderColor: sensor.color,
        backgroundColor: sensor.color + '20',
        tension: 0.4,
        fill: false,
        spanGaps: true
      }))
      return { labels, datasets }
    },
    getThresholdData(len) {
      const ds = []
      const k = this.selectedSensor
      const minKey = `${k}_min`
      const maxKey = `${k}_max`
      if (this.thresholds[minKey] !== undefined)
        ds.push({
          label: 'Min Threshold',
          data: Array(len).fill(this.thresholds[minKey]),
          borderColor: '#EF4444',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0
        })
      if (this.thresholds[maxKey] !== undefined)
        ds.push({
          label: 'Max Threshold',
          data: Array(len).fill(this.thresholds[maxKey]),
          borderColor: '#EF4444',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0
        })
      return ds
    },
    getSensorLabel(k) {
      return SENSOR_CONFIG.find(s => s.key === k)?.label || k
    },
    getSensorUnit(k) {
      return SENSOR_CONFIG.find(s => s.key === k)?.unit || ''
    },
    getSensorColor(k) {
      return SENSOR_CONFIG.find(s => s.key === k)?.color || '#6B7280'
    },
    formatTime(ts) {
      return new Date(ts).toLocaleString()
    }
  }
}
</script>
