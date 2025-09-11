<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <span class="text-2xl">📈</span>
          Sensor History Graph
        </h2>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
            <div
              :class="[
                'w-2 h-2 rounded-full animate-pulse',
                isOnline ? 'bg-green-400' : 'bg-red-400'
              ]"
            ></div>
            <span class="text-xs text-green-100 font-medium">
              {{ isOnline ? 'Live' : 'Offline' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6">
      <!-- Sensor Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Sensor</label>
        <select
          v-model="selectedSensor"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option v-for="sensor in availableSensors" :key="sensor.key" :value="sensor.key">
            {{ sensor.label }}
          </option>
        </select>
      </div>

      <!-- Chart Container -->
      <div class="relative">
        <div v-if="loading" class="flex items-center justify-center h-64">
          <div class="text-gray-500">Loading sensor data...</div>
        </div>
        <div v-else-if="!chartData.labels.length" class="flex items-center justify-center h-64">
          <div class="text-gray-500">No historical data available</div>
        </div>
        <div v-else class="h-64">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Latest Reading Display -->
      <div class="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-600 mb-2">Latest Reading</h3>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold text-gray-900">
            {{ latestValue !== null ? `${latestValue} ${getSensorUnit(selectedSensor)}` : 'N/A' }}
          </span>
          <span class="text-sm text-gray-500">
            {{ latestTimestamp ? formatTime(latestTimestamp) : 'No data' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

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
  components: {
    Line
  },
  props: {
    deviceId: {
      type: String,
      required: true
    },
    sensorReadings: {
      type: Object,
      default: () => ({})
    },
    thresholds: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedSensor: 'humidity',
      isOnline: navigator.onLine,
      loading: true
    }
  },
  computed: {
    availableSensors() {
      return [
        { key: 'all', label: 'All Sensors' },
        ...SENSOR_CONFIG
      ]
    },
    chartData() {
      if (this.selectedSensor === 'all') {
        const allSensorData = this.getAllSensorData()
        return {
          labels: allSensorData.labels,
          datasets: allSensorData.datasets
        }
      } else {
        const sensorData = this.getSensorData()
        const thresholdData = this.getThresholdData(sensorData.labels.length)

        return {
          labels: sensorData.labels,
          datasets: [
            {
              label: `${this.getSensorLabel(this.selectedSensor)} Readings`,
              data: sensorData.values,
              borderColor: this.getSensorColor(this.selectedSensor),
              backgroundColor: this.getSensorColor(this.selectedSensor) + '20',
              tension: 0.4,
              fill: false,
              pointRadius: 3,
              pointHoverRadius: 6
            },
            // Threshold lines
            ...thresholdData
          ]
        }
      }
    },
    chartOptions() {
      if (this.selectedSensor === 'all') {
        return {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.parsed.y !== null ? context.parsed.y : 'N/A'}`
                }
              }
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  minute: 'HH:mm',
                  hour: 'MMM dd, HH:mm',
                  day: 'MMM dd'
                }
              },
              title: {
                display: true,
                text: 'Time'
              },
              ticks: {
                maxTicksLimit: 10
              }
            },
            y: {
              title: {
                display: true,
                text: 'Sensor Values'
              },
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  return value !== null ? value.toFixed(1) : 'N/A'
                }
              }
            }
          }
        }
      } else {
        return {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.parsed.y} ${this.getSensorUnit(this.selectedSensor)}`
                }
              }
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute',
                displayFormats: {
                  minute: 'HH:mm',
                  hour: 'MMM dd, HH:mm'
                }
              },
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              title: {
                display: true,
                text: `${this.getSensorLabel(this.selectedSensor)} (${this.getSensorUnit(this.selectedSensor)})`
              },
              beginAtZero: false
            }
          }
        }
      }
    },
    latestValue() {
      if (this.selectedSensor === 'all') {
        // When all sensors are selected, return an object with latest values for all sensors
        return this.sensorReadings?.latest || null
      }
      return this.sensorReadings?.latest?.[this.selectedSensor] || null
    },
    latestTimestamp() {
      if (!this.sensorReadings?.latest) return null
      // Use current time as latest timestamp if not available
      return Date.now()
    }
  },
  methods: {
    getSensorData() {
      const history = this.sensorReadings?.history || {}
      const labels = []
      const values = []

      // Sort timestamps
      const timestamps = Object.keys(history).sort()

      timestamps.forEach(timestamp => {
        const data = history[timestamp]
        if (data && data[this.selectedSensor] !== undefined) {
          labels.push(new Date(parseInt(timestamp) * 1000))
          values.push(data[this.selectedSensor])
        }
      })

      // Add latest reading if available
      if (this.latestValue !== null) {
        labels.push(new Date())
        values.push(this.latestValue)
      }

      return { labels, values }
    },
    getAllSensorData() {
      const history = this.sensorReadings?.history || {}
      const datasets = []
      const allLabels = new Set()

      // Collect all valid timestamps from all sensors
      SENSOR_CONFIG.forEach(sensor => {
        const sensorHistory = Object.keys(history)
        sensorHistory.forEach(timestamp => {
          const timestampNum = parseInt(timestamp)
          // Validate timestamp (should be reasonable Unix timestamp)
          if (!isNaN(timestampNum) && timestampNum > 1000000000 && timestampNum < 2000000000000) {
            if (history[timestamp] && history[timestamp][sensor.key] !== undefined && history[timestamp][sensor.key] !== null) {
              // Normalize to milliseconds if it's in seconds
              const normalizedTimestamp = timestampNum < 1000000000000 ? timestampNum * 1000 : timestampNum
              allLabels.add(normalizedTimestamp.toString())
            }
          }
        })
      })

      // Add current time for latest readings if available
      const hasLatestData = SENSOR_CONFIG.some(sensor => this.sensorReadings?.latest?.[sensor.key] !== undefined)
      if (hasLatestData) {
        allLabels.add(Date.now().toString())
      }

      // Sort timestamps
      const sortedTimestamps = Array.from(allLabels).sort((a, b) => parseInt(a) - parseInt(b))

      // Filter out timestamps that are too far apart (more than 24 hours)
      const filteredTimestamps = []
      if (sortedTimestamps.length > 1) {
        const maxTimeDiff = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
        filteredTimestamps.push(sortedTimestamps[0])
        for (let i = 1; i < sortedTimestamps.length; i++) {
          const prevTime = parseInt(filteredTimestamps[filteredTimestamps.length - 1])
          const currentTime = parseInt(sortedTimestamps[i])
          if (currentTime - prevTime <= maxTimeDiff) {
            filteredTimestamps.push(sortedTimestamps[i])
          }
        }
      } else {
        filteredTimestamps.push(...sortedTimestamps)
      }

      // Create datasets for each sensor
      SENSOR_CONFIG.forEach(sensor => {
        const values = []
        filteredTimestamps.forEach(timestamp => {
          const timestampNum = parseInt(timestamp)
          if (timestampNum === Math.floor(Date.now() / 1000) * 1000 || timestamp === Date.now().toString()) {
            // Latest reading
            const latestValue = this.sensorReadings?.latest?.[sensor.key]
            values.push(latestValue !== undefined && latestValue !== null ? latestValue : null)
          } else {
            // Historical data - find matching timestamp
            const matchingTimestamp = Object.keys(history).find(ts => {
              const tsNum = parseInt(ts)
              const normalizedTs = tsNum < 1000000000000 ? tsNum * 1000 : tsNum
              return normalizedTs === timestampNum
            })
            if (matchingTimestamp) {
              const data = history[matchingTimestamp]
              values.push(data && data[sensor.key] !== undefined && data[sensor.key] !== null ? data[sensor.key] : null)
            } else {
              values.push(null)
            }
          }
        })

        datasets.push({
          label: `${sensor.label} (${sensor.unit})`,
          data: values,
          borderColor: sensor.color,
          backgroundColor: sensor.color + '20',
          tension: 0.4,
          fill: false,
          pointRadius: values.some(v => v !== null) ? 3 : 0, // Hide points if no data
          pointHoverRadius: values.some(v => v !== null) ? 6 : 0,
          spanGaps: true, // Connect points even with null values
          hitRadius: 10, // Add hit radius for better interaction
          hoverRadius: 6
        })
      })

      // Convert timestamps to Date objects for labels
      const labels = filteredTimestamps.map(timestamp => new Date(parseInt(timestamp)))

      return { labels, datasets }
    },
    getThresholdData(length) {
      const datasets = []
      const sensorKey = this.selectedSensor

      // Min threshold
      const minKey = `${sensorKey}_min`
      if (this.thresholds[minKey] !== undefined) {
        datasets.push({
          label: 'Min Threshold',
          data: Array(length).fill(this.thresholds[minKey]),
          borderColor: '#EF4444',
          backgroundColor: '#EF444420',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0
        })
      }

      // Max threshold
      const maxKey = `${sensorKey}_max`
      if (this.thresholds[maxKey] !== undefined) {
        datasets.push({
          label: 'Max Threshold',
          data: Array(length).fill(this.thresholds[maxKey]),
          borderColor: '#EF4444',
          backgroundColor: '#EF444420',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0
        })
      }

      return datasets
    },
    getSensorLabel(key) {
      const sensor = SENSOR_CONFIG.find(s => s.key === key)
      return sensor ? sensor.label : key
    },
    getSensorUnit(key) {
      const sensor = SENSOR_CONFIG.find(s => s.key === key)
      return sensor ? sensor.unit : ''
    },
    getSensorColor(key) {
      const sensor = SENSOR_CONFIG.find(s => s.key === key)
      return sensor ? sensor.color : '#6B7280'
    },
    formatTime(epochSeconds) {
      if (!epochSeconds) return 'N/A'
      const date = new Date(epochSeconds)
      return date.toLocaleString()
    },
    handleOnline() {
      this.isOnline = true
    },
    handleOffline() {
      this.isOnline = false
    }
  },
  mounted() {
    this.loading = false

    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
  },
  beforeUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
