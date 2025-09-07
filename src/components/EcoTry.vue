<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Mobile-first Header -->
    <div class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Device Monitor</h1>
              <p class="text-sm text-gray-600">Live readings & analytics</p>
            </div>
          </div>
          
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select 
              v-model="selectedDeviceId" 
              @change="handleDeviceChange" 
              class="w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:w-64"
            >
              <option disabled value="">Select a device</option>
              <option v-for="d in devices" :key="d.id" :value="d.id">
                {{ d.alias || d.id }}
              </option>
            </select>
            
            <button 
              @click="refreshData" 
              class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-6">
      <!-- Status Cards -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Connection Status -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <svg class="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-gray-900">Connection</h3>
              </div>
              <div class="mt-3">
                <p class="text-lg font-bold text-gray-900">{{ latest.state?.connected_ssid || "Not connected" }}</p>
                <p class="text-sm text-gray-600">{{ latest.state?.ip_address || "No IP address" }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <div :class="latest.status === 'online' ? 'bg-green-500' : 'bg-gray-400'" class="h-2 w-2 rounded-full"></div>
                  <span :class="latest.status === 'online' ? 'text-green-600' : 'text-gray-600'" class="text-xs font-medium uppercase tracking-wide">
                    {{ latest.status || 'unknown' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Last Updated -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-gray-900">Last Updated</h3>
              </div>
              <div class="mt-3">
                <p class="text-lg font-bold text-gray-900">{{ lastUpdatedHuman }}</p>
                <p class="text-sm text-gray-600">Epoch: {{ lastUpdated || '–' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Misting Status -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                  <svg class="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-gray-900">Misting System</h3>
              </div>
              <div class="mt-3">
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold text-gray-900">Auto:</span>
                  <span :class="latest.mist?.auto ? 'text-green-600' : 'text-gray-600'" class="text-lg font-bold">
                    {{ latest.mist?.auto ? 'ON' : 'OFF' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">
                  Schedule: {{ latest.mist?.schedule?.interval || '–' }}s / {{ latest.mist?.schedule?.duration || '–' }}s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <!-- Latest Snapshot Chart -->
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 xl:col-span-1">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-gray-900">Latest Snapshot</h2>
              <p class="text-sm text-gray-600">Current sensor readings</p>
            </div>
            <div class="rounded-lg bg-gray-50 px-3 py-1">
              <span class="text-xs font-medium text-gray-600">{{ latestTimestampHuman }}</span>
            </div>
          </div>
          <div class="relative h-80">
            <canvas ref="barCanvas" class="h-full w-full"></canvas>
          </div>
        </div>

        <!-- History Chart -->
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 xl:col-span-2">
          <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-bold text-gray-900">Historical Trends</h2>
              <p class="text-sm text-gray-600">Last {{ historyPoints.length }} data points</p>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Metric:</label>
              <select 
                v-model="selectedMetric" 
                class="rounded-lg border-0 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="m in metrics" :key="m" :value="m">{{ m }}</option>
              </select>
            </div>
          </div>
          <div class="relative h-80">
            <canvas ref="lineCanvas" class="h-full w-full"></canvas>
          </div>
        </div>
      </div>

      <!-- Data Table & Export -->
      <div class="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div class="border-b border-gray-200 p-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-bold text-gray-900">Historical Data</h2>
              <p class="text-sm text-gray-600">Complete sensor reading history</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button 
                @click="exportCSV" 
                class="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-95"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                CSV
              </button>
              <button 
                @click="exportXLSX" 
                class="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Excel
              </button>
              <button 
                @click="exportPDF" 
                class="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                PDF
              </button>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Timestamp</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Humidity</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Air Temp</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Water Temp</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Distance</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">pH</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">TDS</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="row in historyRows" :key="row._ts" class="transition-colors hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ formatEpoch(row._ts) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.humidity) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.airTemp) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.waterTemp) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.distance) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.ph) }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ fmt(row.tds) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Dependencies to add via npm:
// npm i firebase chart.js jspdf jspdf-autotable xlsx
import { onMounted, onBeforeUnmount, reactive, ref, computed } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as rtdbRef, onValue, off, get } from 'firebase/database'
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore'
import Chart from 'chart.js/auto'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

export default {
  name: 'EcoDeviceMonitor',
  setup() {
    // Firebase
    const auth = getAuth()
    const db = getFirestore()
    const rtdb = getDatabase()

    // State
    const currentUser = ref(null)
    const devices = ref([]) // [{id, alias}]
    const selectedDeviceId = ref('')

    const latest = reactive({
      latest: {},
      state: {},
      status: 'unknown',
      mist: {},
    })
    const lastUpdated = ref(null) // epoch seconds

    const historyMap = ref({}) // { ts: {...metrics} }

    const metrics = [
      'humidity', 'airTemp', 'waterTemp', 'distance', 'ph', 'tds'
    ]
    const selectedMetric = ref('humidity')

    // Charts
    const barCanvas = ref(null)
    const lineCanvas = ref(null)
    let barChart = null
    let lineChart = null

    const listeners = [] // to clean up on unmount

    // Derived
    const historyPoints = computed(() => {
      const entries = Object.entries(historyMap.value || {})
        .map(([ts, v]) => ({ _ts: Number(ts), ...v }))
        .sort((a, b) => a._ts - b._ts)
      return entries
    })

    const historyRows = computed(() => historyPoints.value)

    const latestTimestampHuman = computed(() => {
      return historyPoints.value.length
        ? new Date(historyPoints.value.at(-1)._ts * 1000).toLocaleString()
        : '–'
    })

    const lastUpdatedHuman = computed(() => lastUpdated.value ? new Date(lastUpdated.value * 1000).toLocaleString() : '–')

    // Utils
    const fmt = (v) => (v === null || v === undefined || Number.isNaN(v)) ? '–' : Number(v).toFixed(2)
    const formatEpoch = (ts) => new Date(Number(ts) * 1000).toLocaleString()

    function clearListeners() {
      for (const { ref, cb } of listeners) {
        off(ref, 'value', cb)
      }
      listeners.length = 0
    }

    function addListener(refObj, cb) {
      onValue(refObj, cb)
      listeners.push({ ref: refObj, cb })
    }

    async function loadDevicesForUser(uid) {
      devices.value = []

      // Option A: RTDB mapping at /users/{uid}/devices (boolean map) — recommended by your firmware/DB
      const mapSnap = await get(rtdbRef(rtdb, `users/${uid}/devices`))
      const mapVal = mapSnap.val() || {}
      const idsFromMap = Object.keys(mapVal)

      // Optional aliases from Firestore subcollection users/{uid}/devices OR from Firestore user doc map
      const fsUserDoc = await getDoc(doc(db, 'users', uid))
      let aliasById = {}

      if (fsUserDoc.exists()) {
        const fsData = fsUserDoc.data() || {}
        // If devices stored as a map in the user document
        if (fsData.devices && typeof fsData.devices === 'object') {
          for (const [id, v] of Object.entries(fsData.devices)) {
            aliasById[id] = v?.alias
          }
        }
      }

      // Also check subcollection users/{uid}/devices if it exists
      try {
        const subcol = await getDocs(collection(db, 'users', uid, 'devices'))
        subcol.forEach((d) => {
          aliasById[d.id] = d.data()?.alias || aliasById[d.id]
        })
      } catch (e) {
        // ignore if permissions not set
      }

      devices.value = idsFromMap.map((id) => ({ id, alias: aliasById[id] }))
      if (!selectedDeviceId.value && devices.value.length) {
        selectedDeviceId.value = devices.value[0].id
      }
    }

    function drawBarChart() {
      const l = latest.latest || {}
      const data = [l.humidity, l.airTemp, l.waterTemp, l.distance, l.ph, l.tds]
      const labels = ['Humidity', 'Air Temp', 'Water Temp', 'Distance', 'pH', 'TDS']
      
      if (barChart) barChart.destroy()
      
      barChart = new Chart(barCanvas.value.getContext('2d'), {
        type: 'bar',
        data: { 
          labels, 
          datasets: [{ 
            label: 'Latest Readings',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
          }] 
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }

    function drawLineChart() {
      const pts = historyPoints.value
      const labels = pts.map((p) => new Date(p._ts * 1000).toLocaleTimeString())
      const data = pts.map((p) => p[selectedMetric.value])
      
      if (lineChart) lineChart.destroy()
      
      lineChart = new Chart(lineCanvas.value.getContext('2d'), {
        type: 'line',
        data: { 
          labels, 
          datasets: [{ 
            label: selectedMetric.value,
            data,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 4,
          }] 
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }

    function refreshCharts() {
      // debounce-ish
      setTimeout(() => {
        if (barCanvas.value) drawBarChart()
        if (lineCanvas.value) drawLineChart()
      }, 0)
    }

    function handleDeviceChange() {
      subscribeToDevice(selectedDeviceId.value)
    }

    function subscribeToDevice(deviceId) {
      clearListeners()
      historyMap.value = {}

      if (!deviceId) return

      // Latest block
      addListener(rtdbRef(rtdb, `devices/${deviceId}/sensor_readings/latest`), (snap) => {
        latest.latest = snap.val() || {}
        refreshCharts()
      })

      // History block
      addListener(rtdbRef(rtdb, `devices/${deviceId}/sensor_readings/history`), (snap) => {
        historyMap.value = snap.val() || {}
        refreshCharts()
      })

      // State/status
      addListener(rtdbRef(rtdb, `devices/${deviceId}/state`), (snap) => {
        latest.state = snap.val() || {}
      })

      addListener(rtdbRef(rtdb, `devices/${deviceId}/status`), (snap) => {
        latest.status = snap.val() || 'unknown'
      })

      // last_online
      addListener(rtdbRef(rtdb, `devices/${deviceId}/last_online`), (snap) => {
        lastUpdated.value = snap.val() || null
      })

      // mist
      addListener(rtdbRef(rtdb, `devices/${deviceId}/mist`), (snap) => {
        latest.mist = snap.val() || {}
      })
    }

    function blobDownload(dataStr, filename, mime) {
      const blob = new Blob([dataStr], { type: mime })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }

    function exportCSV() {
      const rows = historyRows.value
      const header = ['timestamp','humidity','airTemp','waterTemp','distance','ph','tds']
      const csv = [header.join(',')]
      for (const r of rows) {
        csv.push([
          formatEpoch(r._ts), r.humidity, r.airTemp, r.waterTemp, r.distance, r.ph, r.tds
        ].join(','))
      }
      blobDownload(csv.join('\n'), `history_${selectedDeviceId.value}.csv`, 'text/csv;charset=utf-8;')
    }

    function exportXLSX() {
      const rows = historyRows.value.map(r => ({
        Timestamp: formatEpoch(r._ts),
        Humidity: r.humidity,
        AirTemp: r.airTemp,
        WaterTemp: r.waterTemp,
        Distance: r.distance,
        pH: r.ph,
        TDS: r.tds,
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'History')
      const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `history_${selectedDeviceId.value}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    }

    function exportPDF() {
      const doc = new jsPDF({ orientation: 'landscape' })
      doc.setFontSize(14)
      doc.text(`Device History — ${selectedDeviceId.value}`, 14, 16)

      // Table
      const body = historyRows.value.map(r => [
        formatEpoch(r._ts),
        fmt(r.humidity),
        fmt(r.airTemp),
        fmt(r.waterTemp),
        fmt(r.distance),
        fmt(r.ph),
        fmt(r.tds),
      ])
      doc.autoTable({
        head: [['Timestamp','Humidity','AirTemp','WaterTemp','Distance','pH','TDS']],
        body,
        startY: 22,
        styles: { fontSize: 8 }
      })

      // Add charts as images if available
      const addChart = (canvasRef, y) => {
        const c = canvasRef?.value
        if (!c) return y
        const img = c.toDataURL('image/png')
        doc.addImage(img, 'PNG', 14, y, 260, 80)
        return y + 88
      }
      let y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 6 : 22
      y = addChart(barCanvas, y)
      y = addChart(lineCanvas, y)

      doc.save(`history_${selectedDeviceId.value}.pdf`)
    }

    function refreshData() {
      if (currentUser.value && selectedDeviceId.value) {
        subscribeToDevice(selectedDeviceId.value)
      }
    }

    // Auth bootstrap
    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        currentUser.value = user
        if (user?.uid) {
          await loadDevicesForUser(user.uid)
          if (selectedDeviceId.value) subscribeToDevice(selectedDeviceId.value)
        }
      })
    })

    onBeforeUnmount(() => {
      clearListeners()
      if (barChart) barChart.destroy()
      if (lineChart) lineChart.destroy()
    })

    return {
      devices,
      selectedDeviceId,
      latest,
      lastUpdated,
      lastUpdatedHuman,
      historyRows,
      historyPoints,
      selectedMetric,
      metrics,
      barCanvas,
      lineCanvas,
      handleDeviceChange,
      exportCSV,
      exportXLSX,
      exportPDF,
      refreshData,
      fmt,
      formatEpoch,
      latestTimestampHuman
    }
  }
}
</script>

<style scoped>
canvas { 
  width: 100% !important; 
  height: 100% !important;
}
</style>