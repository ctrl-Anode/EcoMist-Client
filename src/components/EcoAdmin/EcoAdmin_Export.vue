<template>
  <div class="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="mb-4 sm:mb-6">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Data Export Center
        </h1>
        <p class="text-sm sm:text-base text-gray-600 mt-1">Export system data in CSV, Excel, or PDF format</p>
      </div>

      <!-- Export Options Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        
        <!-- Data Selection Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Select Data to Export
          </h2>
          
          <div class="space-y-3">
            <!-- Select All -->
            <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <input 
                type="checkbox" 
                v-model="selectAll"
                @change="toggleSelectAll"
                class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
              >
              <span class="ml-3 text-sm sm:text-base font-semibold text-gray-900">Select All Data</span>
            </label>

            <!-- Individual Data Types -->
            <div class="space-y-2">
              <label v-for="dataType in dataTypes" :key="dataType.value" 
                     class="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  v-model="selectedData"
                  :value="dataType.value"
                  class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500 mt-0.5"
                >
                <div class="ml-3 flex-1">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <component :is="dataType.icon" class="h-4 w-4 sm:h-5 sm:w-5" :class="dataType.color" />
                      <span class="text-sm sm:text-base font-medium text-gray-900">{{ dataType.label }}</span>
                    </div>
                    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {{ dataType.count }}
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm text-gray-500 mt-1">{{ dataType.description }}</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Export Format & Options Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Export Format & Options
          </h2>

          <!-- Format Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                v-for="format in exportFormats" 
                :key="format.value"
                @click="selectedFormat = format.value"
                :class="[
                  'p-4 border-2 rounded-lg transition-all text-left',
                  selectedFormat === format.value 
                    ? 'border-emerald-600 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="flex items-center gap-2 mb-2">
                  <component :is="format.icon" :class="['h-5 w-5', selectedFormat === format.value ? 'text-emerald-600' : 'text-gray-600']" />
                  <span :class="['font-medium text-sm sm:text-base', selectedFormat === format.value ? 'text-emerald-900' : 'text-gray-900']">
                    {{ format.label }}
                  </span>
                </div>
                <p class="text-xs text-gray-500">{{ format.description }}</p>
              </button>
            </div>
          </div>

          <!-- Date Range Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Date Range (Optional)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-600 mb-1">From Date</label>
                <input 
                  type="date" 
                  v-model="dateRange.start"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">To Date</label>
                <input 
                  type="date" 
                  v-model="dateRange.end"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
              </div>
            </div>
          </div>

          <!-- Additional Options -->
          <div class="space-y-3 mb-6">
            <label class="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="options.includeMetadata"
                class="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
              >
              <span class="text-sm text-gray-700">Include metadata (timestamps, IDs)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="options.includeStatistics"
                class="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
              >
              <span class="text-sm text-gray-700">Include summary statistics</span>
            </label>
            <label v-if="selectedFormat === 'pdf'" class="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="options.includeLogo"
                class="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
              >
              <span class="text-sm text-gray-700">Include company logo</span>
            </label>
          </div>

          <!-- Export Button -->
          <button 
            @click="handleExport"
            :disabled="!canExport || exporting"
            :class="[
              'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2',
              canExport && !exporting
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            ]"
          >
            <svg v-if="!exporting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ exporting ? 'Exporting...' : `Export as ${selectedFormat.toUpperCase()}` }}
          </button>
          
          <p v-if="!canExport" class="text-xs text-red-600 mt-2 text-center">
            Please select at least one data type to export
          </p>
        </div>
      </div>

      <!-- Data Preview & Export History -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        
        <!-- Data Preview Section -->
        <div v-if="selectedData.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Data Preview
            </h2>
            <button 
              @click="loadPreviewData"
              :disabled="loadingPreview"
              class="text-sm px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <svg v-if="!loadingPreview" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <svg v-else class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loadingPreview ? 'Loading...' : 'Load Preview' }}
            </button>
          </div>

          <!-- Preview Tabs -->
          <div v-if="previewData && Object.keys(previewData).length > 0" class="space-y-4">
            <div class="flex gap-2 overflow-x-auto pb-2">
              <button 
                v-for="dataType in selectedData" 
                :key="dataType"
                @click="activePreviewTab = dataType"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activePreviewTab === dataType
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ dataTypes.find(dt => dt.value === dataType)?.label }}
                <span class="ml-1 text-xs opacity-75">({{ previewData[dataType]?.length || 0 }})</span>
              </button>
            </div>

            <!-- Preview Table -->
            <div v-if="previewData[activePreviewTab]?.length > 0" class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="overflow-x-auto max-h-96">
                <table class="w-full text-xs sm:text-sm">
                  <thead class="bg-gray-50 sticky top-0">
                    <tr>
                      <th 
                        v-for="(value, key) in previewData[activePreviewTab][0]" 
                        :key="key"
                        class="text-left py-2 px-3 font-medium text-gray-700 border-b border-gray-200"
                      >
                        {{ key }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(row, index) in previewData[activePreviewTab].slice(0, 10)" 
                      :key="index"
                      class="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td 
                        v-for="(value, key) in row" 
                        :key="key"
                        class="py-2 px-3 text-gray-900 max-w-xs truncate"
                        :title="String(value)"
                      >
                        {{ value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bg-gray-50 px-4 py-2 text-xs text-gray-600 border-t border-gray-200">
                Showing {{ Math.min(10, previewData[activePreviewTab].length) }} of {{ previewData[activePreviewTab].length }} records
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
              <p class="text-sm">No data available for this type</p>
            </div>
          </div>
          
          <div v-else class="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm">Click "Load Preview" to see your data</p>
          </div>
        </div>

        <!-- Export History -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Export History
          </h2>
          
          <div v-if="exportHistory.length" class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-2 sm:px-4 font-medium text-gray-700">Date & Time</th>
                  <th class="text-left py-3 px-2 sm:px-4 font-medium text-gray-700">Format</th>
                  <th class="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 hidden sm:table-cell">Data Types</th>
                  <th class="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 hidden md:table-cell">Records</th>
                  <th class="text-right py-3 px-2 sm:px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in exportHistory" :key="index" class="border-b border-gray-100 hover:bg-gray-50">
                  <td class="py-3 px-2 sm:px-4 text-gray-900">{{ formatDateTime(item.timestamp) }}</td>
                  <td class="py-3 px-2 sm:px-4">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ item.format.toUpperCase() }}
                    </span>
                  </td>
                  <td class="py-3 px-2 sm:px-4 text-gray-600 hidden sm:table-cell">{{ item.dataTypes.join(', ') }}</td>
                  <td class="py-3 px-2 sm:px-4 text-gray-600 hidden md:table-cell">{{ item.recordCount }}</td>
                  <td class="py-3 px-2 sm:px-4 text-right">
                    <span :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      item.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
          <div v-else class="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm">No export history yet</p>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div v-if="toast.show" 
           :class="[
             'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 max-w-md',
             toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
           ]">
        <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm">{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import { format } from 'date-fns';

// Icons as inline components
const UserIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
};

const MessageIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
};

const FeedbackIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>`
};

const DeviceIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
};

const AnalysisIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
};

const ActivityIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
};

const FileIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
};

const TableIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`
};

const PdfIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
};

// State
const selectedData = ref([]);
const selectAll = ref(false);
const selectedFormat = ref('csv');
const exporting = ref(false);
const dateRange = ref({ start: '', end: '' });
const options = ref({
  includeMetadata: true,
  includeStatistics: true,
  includeLogo: true
});
const exportHistory = ref([]);
const toast = ref({ show: false, message: '', type: 'success' });
const previewData = ref({});
const activePreviewTab = ref('');
const loadingPreview = ref(false);

// Data counts
const dataCounts = ref({
  users: 0,
  messages: 0,
  feedback: 0,
  devices: 0,
  cropAnalysis: 0,
  activityLogs: 0
});

// Data Types Configuration
const dataTypes = computed(() => [
  {
    value: 'users',
    label: 'User Accounts',
    description: 'Complete user profiles, roles, and registration data',
    icon: UserIcon,
    color: 'text-blue-600',
    count: dataCounts.value.users
  },
  {
    value: 'messages',
    label: 'Contact Messages',
    description: 'All contact form submissions and inquiries',
    icon: MessageIcon,
    color: 'text-orange-600',
    count: dataCounts.value.messages
  },
  {
    value: 'feedback',
    label: 'User Feedback',
    description: 'Feedback submissions, ratings, and comments',
    icon: FeedbackIcon,
    color: 'text-yellow-600',
    count: dataCounts.value.feedback
  },
  {
    value: 'devices',
    label: 'Device Data',
    description: 'IoT device information and configurations',
    icon: DeviceIcon,
    color: 'text-purple-600',
    count: dataCounts.value.devices
  },
  {
    value: 'cropAnalysis',
    label: 'Crop Analysis',
    description: 'Crop health analysis and recommendations',
    icon: AnalysisIcon,
    color: 'text-green-600',
    count: dataCounts.value.cropAnalysis
  },
  {
    value: 'activityLogs',
    label: 'Activity Logs',
    description: 'System activity and user action logs',
    icon: ActivityIcon,
    color: 'text-indigo-600',
    count: dataCounts.value.activityLogs
  }
]);

// Export Formats
const exportFormats = [
  {
    value: 'csv',
    label: 'CSV',
    description: 'Comma-separated values',
    icon: FileIcon
  },
  {
    value: 'excel',
    label: 'Excel',
    description: 'Microsoft Excel format',
    icon: TableIcon
  },
  {
    value: 'pdf',
    label: 'PDF',
    description: 'Portable document format',
    icon: PdfIcon
  }
];

// Computed
const canExport = computed(() => selectedData.value.length > 0);

// Methods
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedData.value = dataTypes.value.map(dt => dt.value);
  } else {
    selectedData.value = [];
  }
};

const fetchDataCounts = async () => {
  try {
    const collections = ['users', 'contactMessages', 'feedback', 'devices', 'cropAnalysis', 'activityLogs'];
    
    for (const collectionName of collections) {
      try {
        const snapshot = await getDocs(collection(db, collectionName));
        const key = collectionName === 'contactMessages' ? 'messages' : collectionName;
        dataCounts.value[key] = snapshot.size;
      } catch (error) {
        console.warn(`Could not fetch ${collectionName}:`, error);
        const key = collectionName === 'contactMessages' ? 'messages' : collectionName;
        dataCounts.value[key] = 0;
      }
    }
  } catch (error) {
    console.error('Error fetching data counts:', error);
  }
};

const fetchCollectionData = async (collectionName) => {
  try {
    let q = collection(db, collectionName);
    
    // Apply date range filter if specified
    if (dateRange.value.start && dateRange.value.end) {
      q = query(
        collection(db, collectionName),
        where('createdAt', '>=', new Date(dateRange.value.start)),
        where('createdAt', '<=', new Date(dateRange.value.end))
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
};

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  try {
    if (timestamp.toDate) {
      return format(timestamp.toDate(), 'yyyy-MM-dd HH:mm:ss');
    }
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
  } catch (error) {
    return 'Invalid Date';
  }
};

const formatDateTime = (date) => {
  try {
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  } catch (error) {
    return 'Invalid Date';
  }
};

const prepareUsersData = (data) => {
  return data.map(user => ({
    'User ID': user.id,
    'Username': user.username || 'N/A',
    'Email': user.email || 'N/A',
    'Full Name': user.fullName || 'N/A',
    'Role': user.role || 'user',
    'Status': user.status || 'active',
    'Phone': user.phone || 'N/A',
    'Address': user.address || 'N/A',
    'Registration Date': formatTimestamp(user.createdAt),
    'Last Active': formatTimestamp(user.lastActive),
    'Email Verified': user.emailVerified ? 'Yes' : 'No'
  }));
};

const prepareMessagesData = (data) => {
  return data.map(msg => ({
    'Message ID': msg.id,
    'Name': msg.name || 'N/A',
    'Email': msg.email || 'N/A',
    'Phone': msg.phone || 'N/A',
    'Subject': msg.subject || 'N/A',
    'Message': msg.message || 'N/A',
    'Status': msg.status || 'unread',
    'Timestamp': formatTimestamp(msg.createdAt)
  }));
};

const prepareFeedbackData = (data) => {
  return data.map(fb => ({
    'Feedback ID': fb.id,
    'User ID': fb.userId || 'N/A',
    'User Name': fb.userName || 'N/A',
    'Rating': fb.rating || 'N/A',
    'Category': fb.category || 'general',
    'Title': fb.title || 'N/A',
    'Description': fb.description || 'N/A',
    'Status': fb.status || 'pending',
    'Priority': fb.priority || 'normal',
    'Timestamp': formatTimestamp(fb.createdAt)
  }));
};

const prepareDevicesData = (data) => {
  return data.map(device => ({
    'Device ID': device.id,
    'Device Name': device.deviceName || 'N/A',
    'User ID': device.userId || 'N/A',
    'Device Type': device.deviceType || 'N/A',
    'Status': device.status || 'offline',
    'Last Online': formatTimestamp(device.lastOnline),
    'Firmware Version': device.firmwareVersion || 'N/A',
    'IP Address': device.ipAddress || 'N/A',
    'MAC Address': device.macAddress || 'N/A',
    'Location': device.location || 'N/A',
    'Added Date': formatTimestamp(device.createdAt)
  }));
};

const prepareCropAnalysisData = (data) => {
  return data.map(analysis => ({
    'Analysis ID': analysis.id,
    'User ID': analysis.userId || 'N/A',
    'Crop Type': analysis.cropType || 'N/A',
    'Health Status': analysis.healthStatus || 'N/A',
    'Disease Detected': analysis.diseaseDetected || 'None',
    'Confidence Score': analysis.confidenceScore || 'N/A',
    'Recommendations': analysis.recommendations || 'N/A',
    'Image URL': analysis.imageUrl || 'N/A',
    'Analysis Date': formatTimestamp(analysis.createdAt)
  }));
};

const prepareActivityLogsData = (data) => {
  return data.map(log => ({
    'Log ID': log.id,
    'User ID': log.userId || 'N/A',
    'User Name': log.userName || 'N/A',
    'Action Type': log.actionType || 'N/A',
    'Action': log.action || 'N/A',
    'Resource': log.resource || 'N/A',
    'IP Address': log.ipAddress || 'N/A',
    'User Agent': log.userAgent || 'N/A',
    'Status': log.status || 'success',
    'Timestamp': formatTimestamp(log.timestamp)
  }));
};

const getCollectionName = (dataType) => {
  const mapping = {
    users: 'users',
    messages: 'contactMessages',
    feedback: 'feedback',
    devices: 'devices',
    cropAnalysis: 'cropAnalysis',
    activityLogs: 'activityLogs'
  };
  return mapping[dataType];
};

const prepareDataForExport = (dataType, rawData) => {
  const preparers = {
    users: prepareUsersData,
    messages: prepareMessagesData,
    feedback: prepareFeedbackData,
    devices: prepareDevicesData,
    cropAnalysis: prepareCropAnalysisData,
    activityLogs: prepareActivityLogsData
  };
  
  return preparers[dataType] ? preparers[dataType](rawData) : rawData;
};

const exportAsCSV = async (data, filename) => {
  try {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
    return true;
  } catch (error) {
    console.error('CSV Export Error:', error);
    throw error;
  }
};

const exportAsExcel = async (dataMap, filename) => {
  try {
    const wb = XLSX.utils.book_new();
    
    // Add summary sheet if statistics are enabled
    if (options.value.includeStatistics) {
      const summaryData = [
        ['EcoMist Data Export Summary'],
        ['Generated:', format(new Date(), 'yyyy-MM-dd HH:mm:ss')],
        [''],
        ['Data Type', 'Record Count']
      ];
      
      Object.entries(dataMap).forEach(([key, data]) => {
        summaryData.push([key.toUpperCase(), data.length]);
      });
      
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
    }
    
    // Add data sheets
    Object.entries(dataMap).forEach(([key, data]) => {
      if (data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, key.substring(0, 31)); // Excel sheet name limit
      }
    });
    
    XLSX.writeFile(wb, `${filename}.xlsx`);
    return true;
  } catch (error) {
    console.error('Excel Export Error:', error);
    throw error;
  }
};

const exportAsPDF = async (dataMap, filename) => {
  try {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Add logo if enabled
    if (options.value.includeLogo) {
      doc.setFontSize(24);
      doc.setTextColor(16, 185, 129);
      doc.text('EcoMist', 20, yPosition);
      yPosition += 10;
    }
    
    // Add header
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Data Export Report', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm:ss')}`, 20, yPosition);
    yPosition += 5;
    
    if (dateRange.value.start && dateRange.value.end) {
      doc.text(`Date Range: ${dateRange.value.start} to ${dateRange.value.end}`, 20, yPosition);
      yPosition += 5;
    }
    
    yPosition += 10;
    
    // Add summary statistics
    if (options.value.includeStatistics) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Summary Statistics', 20, yPosition);
      yPosition += 5;
      
      const summaryData = Object.entries(dataMap).map(([key, data]) => [
        key.toUpperCase(),
        data.length.toString()
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Data Type', 'Record Count']],
        body: summaryData,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] },
        margin: { left: 20 }
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // Add data tables for each selected type
    Object.entries(dataMap).forEach(([key, data], index) => {
      if (data.length > 0) {
        // Add new page if needed
        if (yPosition > 250 || index > 0) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(key.toUpperCase(), 20, yPosition);
        yPosition += 5;
        
        // Prepare table data
        const headers = Object.keys(data[0]);
        const rows = data.slice(0, 50).map(item => headers.map(h => String(item[h] || '')));
        
        doc.autoTable({
          startY: yPosition,
          head: [headers],
          body: rows,
          theme: 'striped',
          headStyles: { fillColor: [16, 185, 129] },
          margin: { left: 20 },
          styles: { fontSize: 8, cellPadding: 2 },
          columnStyles: headers.reduce((acc, header, idx) => {
            acc[idx] = { cellWidth: 'auto' };
            return acc;
          }, {})
        });
        
        if (data.length > 50) {
          yPosition = doc.lastAutoTable.finalY + 5;
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(`Showing first 50 of ${data.length} records`, 20, yPosition);
        }
        
        yPosition = doc.lastAutoTable.finalY + 15;
      }
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF Export Error:', error);
    throw error;
  }
};

const handleExport = async () => {
  if (!canExport.value) return;
  
  exporting.value = true;
  
  try {
    // Fetch all selected data
    const dataMap = {};
    let totalRecords = 0;
    
    for (const dataType of selectedData.value) {
      const collectionName = getCollectionName(dataType);
      const rawData = await fetchCollectionData(collectionName);
      const formattedData = prepareDataForExport(dataType, rawData);
      dataMap[dataType] = formattedData;
      totalRecords += formattedData.length;
    }
    
    // Generate filename
    const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
    const filename = `ecomist_export_${timestamp}`;
    
    // Export based on selected format
    let success = false;
    
    switch (selectedFormat.value) {
      case 'csv':
        // For CSV, export each data type as a separate file
        for (const [dataType, data] of Object.entries(dataMap)) {
          await exportAsCSV(data, `${filename}_${dataType}`);
        }
        success = true;
        break;
        
      case 'excel':
        success = await exportAsExcel(dataMap, filename);
        break;
        
      case 'pdf':
        success = await exportAsPDF(dataMap, filename);
        break;
    }
    
    if (success) {
      // Add to export history
      exportHistory.value.unshift({
        timestamp: new Date(),
        format: selectedFormat.value,
        dataTypes: selectedData.value,
        recordCount: totalRecords,
        status: 'success'
      });
      
      // Keep only last 10 exports
      if (exportHistory.value.length > 10) {
        exportHistory.value = exportHistory.value.slice(0, 10);
      }
      
      showToast('Export completed successfully!', 'success');
    }
  } catch (error) {
    console.error('Export Error:', error);
    showToast('Export failed. Please try again.', 'error');
    
    // Add failed export to history
    exportHistory.value.unshift({
      timestamp: new Date(),
      format: selectedFormat.value,
      dataTypes: selectedData.value,
      recordCount: 0,
      status: 'failed'
    });
  } finally {
    exporting.value = false;
  }
};

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const loadPreviewData = async () => {
  if (selectedData.value.length === 0) return;
  
  loadingPreview.value = true;
  previewData.value = {};
  
  try {
    for (const dataType of selectedData.value) {
      const collectionName = getCollectionName(dataType);
      const rawData = await fetchCollectionData(collectionName);
      const formattedData = prepareDataForExport(dataType, rawData);
      previewData.value[dataType] = formattedData;
    }
    
    // Set active tab to first data type
    if (selectedData.value.length > 0) {
      activePreviewTab.value = selectedData.value[0];
    }
    
    showToast('Preview data loaded successfully!', 'success');
  } catch (error) {
    console.error('Error loading preview:', error);
    showToast('Failed to load preview data', 'error');
  } finally {
    loadingPreview.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchDataCounts();
});
</script>

<style scoped>
/* Custom scrollbar for tables */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>
