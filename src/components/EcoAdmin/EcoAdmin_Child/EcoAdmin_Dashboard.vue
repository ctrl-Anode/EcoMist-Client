<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-3 sm:p-4 md:p-6">
    <div class="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8">
        <div class="mb-3 sm:mb-0">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Admin Dashboard
          </h1>
          <p class="text-sm sm:text-base text-gray-600 mt-1">Welcome back, {{ adminName }}</p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button 
            @click="refreshData" 
            :disabled="loading"
            class="px-3 py-2 sm:px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" :class="['h-4 w-4 sm:h-5 sm:w-5', loading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="hidden sm:inline">Refresh</span>
          </button>
          <span class="text-xs sm:text-sm text-gray-500 text-center sm:text-left">Last updated: {{ lastUpdated }}</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !statsLoaded" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p class="text-gray-600">Loading dashboard data...</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Total Users -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalUsers }}</p>
                <p class="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ stats.activeUsers }} active
                </p>
              </div>
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Contact Messages</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalMessages }}</p>
                <p class="text-sm text-orange-600 mt-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ stats.unreadMessages }} unread
                </p>
              </div>
              <div class="p-3 bg-orange-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Feedback -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">User Feedback</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalFeedback }}</p>
                <p class="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ stats.pendingFeedback }} pending
                </p>
              </div>
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Crop Analysis -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Crop Analysis</p>
                <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalAnalysis }}</p>
                <p class="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {{ stats.analysisThisMonth }} this month
                </p>
              </div>
              <div class="p-3 bg-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Details Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- User Activity Chart -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              User Distribution
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Regular Users</span>
                  <span class="font-medium text-gray-900">{{ stats.regularUsers }} ({{ userPercentage }}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" :style="{ width: userPercentage + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Admin Users</span>
                  <span class="font-medium text-gray-900">{{ stats.adminUsers }} ({{ adminPercentage }}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full transition-all duration-500" :style="{ width: adminPercentage + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Active Users</span>
                  <span class="font-medium text-gray-900">{{ stats.activeUsers }} ({{ activePercentage }}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full transition-all duration-500" :style="{ width: activePercentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h3>
            <div class="space-y-3 max-h-64 overflow-y-auto">
              <div v-if="recentActivity.length === 0" class="text-center py-8 text-gray-500">
                No recent activity
              </div>
              <div v-else v-for="(activity, index) in recentActivity" :key="index" class="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div :class="['p-2 rounded-full', getActivityColor(activity.type)]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ activity.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ activity.description }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ formatRelativeTime(activity.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Types and System Logs -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          <!-- Feedback Types -->
          <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Feedback Breakdown
            </h3>
            <div class="space-y-2 sm:space-y-3">
              <div v-for="(type, key) in feedbackTypes" :key="key" class="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-2 sm:gap-3">
                  <span :class="['px-2 py-1 rounded text-xs font-medium capitalize', getFeedbackTypeColor(key)]">
                    {{ key }}
                  </span>
                </div>
                <span class="text-base sm:text-lg font-bold text-gray-900">{{ type }}</span>
              </div>
            </div>
          </div>

          <!-- System Overview -->
          <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              System Health
            </h3>
            <div class="space-y-2 sm:space-y-3 md:space-y-4">
              <div class="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm font-medium text-gray-700">Database Status</span>
                </div>
                <span class="text-xs sm:text-sm font-bold text-green-600">Operational</span>
              </div>
              <div class="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm font-medium text-gray-700">Authentication</span>
                </div>
                <span class="text-xs sm:text-sm font-bold text-green-600">Active</span>
              </div>
              <div class="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm font-medium text-gray-700">Storage</span>
                </div>
                <span class="text-xs sm:text-sm font-bold text-green-600">{{ stats.storageUsage }}%</span>
              </div>
              <div class="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm font-medium text-gray-700">Total Documents</span>
                </div>
                <span class="text-xs sm:text-sm font-bold text-blue-600">{{ stats.totalDocuments }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Users Table -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="hidden sm:inline">Recently Registered Users</span>
              <span class="sm:hidden">Recent Users</span>
            </h3>
            <router-link to="/admin/user-management" class="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All →
            </router-link>
          </div>
          <div class="overflow-x-auto -mx-4 sm:mx-0">
            <div class="inline-block min-w-full align-middle">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">User</th>
                    <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">Email</th>
                    <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Role</th>
                    <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                    <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="recentUsers.length === 0">
                    <td colspan="5" class="text-center py-6 sm:py-8 text-gray-500 text-sm">No users found</td>
                  </tr>
                  <tr v-else v-for="user in recentUsers" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td class="py-2 sm:py-3 px-2 sm:px-4">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <img v-if="user.profileImageUrl" :src="user.profileImageUrl" :alt="user.username" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0">
                        <div v-else class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium text-xs sm:text-sm flex-shrink-0">
                          {{ getInitials(user.username) }}
                        </div>
                        <div class="min-w-0 flex-1">
                          <span class="text-xs sm:text-sm font-medium text-gray-900 block truncate">{{ user.username }}</span>
                          <span class="text-xs text-gray-500 block truncate md:hidden">{{ user.email }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                      <span class="block truncate max-w-[200px]">{{ user.email }}</span>
                    </td>
                    <td class="py-2 sm:py-3 px-2 sm:px-4">
                      <span :class="['px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap', user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800']">
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="py-2 sm:py-3 px-2 sm:px-4">
                      <span :class="['px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap', user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">{{ formatDate(user.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { formatDistanceToNow } from 'date-fns';

// State
const loading = ref(true);
const statsLoaded = ref(false);
const adminName = ref('Admin');
const lastUpdated = ref('');

// Stats
const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  regularUsers: 0,
  adminUsers: 0,
  totalMessages: 0,
  unreadMessages: 0,
  totalFeedback: 0,
  pendingFeedback: 0,
  totalAnalysis: 0,
  analysisThisMonth: 0,
  storageUsage: 0,
  totalDocuments: 0
});

const feedbackTypes = ref({
  suggestion: 0,
  bug: 0,
  question: 0,
  other: 0
});

const recentUsers = ref([]);
const recentActivity = ref([]);

// Computed
const userPercentage = computed(() => {
  if (stats.value.totalUsers === 0) return 0;
  return Math.round((stats.value.regularUsers / stats.value.totalUsers) * 100);
});

const adminPercentage = computed(() => {
  if (stats.value.totalUsers === 0) return 0;
  return Math.round((stats.value.adminUsers / stats.value.totalUsers) * 100);
});

const activePercentage = computed(() => {
  if (stats.value.totalUsers === 0) return 0;
  return Math.round((stats.value.activeUsers / stats.value.totalUsers) * 100);
});

// Unsubscribe functions
let unsubscribeUsers = null;
let unsubscribeFeedback = null;
let unsubscribeMessages = null;

// Methods
const fetchDashboardData = async () => {
  loading.value = true;
  
  try {
    // Fetch current admin info
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      adminName.value = currentUser.displayName || currentUser.email?.split('@')[0] || 'Admin';
    }

    // Fetch users with real-time updates
    const usersRef = collection(db, 'users');
    unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      stats.value.totalUsers = users.length;
      stats.value.activeUsers = users.filter(u => u.status === 'active').length;
      stats.value.regularUsers = users.filter(u => u.role === 'user').length;
      stats.value.adminUsers = users.filter(u => u.role === 'admin').length;
      
      // Get recent users (last 5)
      recentUsers.value = users
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime - aTime;
        })
        .slice(0, 5);

      statsLoaded.value = true;
    });

    // Fetch feedback with real-time updates
    const feedbackRef = collection(db, 'feedback');
    unsubscribeFeedback = onSnapshot(feedbackRef, (snapshot) => {
      const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      stats.value.totalFeedback = feedbacks.length;
      stats.value.pendingFeedback = feedbacks.filter(f => f.status === 'pending' || !f.status).length;
      
      // Count feedback types
      feedbackTypes.value = {
        suggestion: feedbacks.filter(f => f.type === 'suggestion').length,
        bug: feedbacks.filter(f => f.type === 'bug').length,
        question: feedbacks.filter(f => f.type === 'question').length,
        other: feedbacks.filter(f => f.type === 'other').length
      };

      // Add to recent activity
      const recentFeedbacks = feedbacks
        .sort((a, b) => {
          const aTime = a.timestamp?.toDate?.() || new Date(0);
          const bTime = b.timestamp?.toDate?.() || new Date(0);
          return bTime - aTime;
        })
        .slice(0, 3)
        .map(f => ({
          type: 'feedback',
          title: `New ${f.type} feedback`,
          description: f.message.substring(0, 50) + '...',
          timestamp: f.timestamp
        }));

      updateRecentActivity(recentFeedbacks);
    });

    // Fetch contact messages with real-time updates
    const messagesRef = collection(db, 'contact_messages');
    unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      stats.value.totalMessages = messages.length;
      stats.value.unreadMessages = messages.filter(m => !m.read).length;

      // Add to recent activity
      const recentMessages = messages
        .sort((a, b) => {
          const aTime = a.timestamp?.toDate?.() || new Date(0);
          const bTime = b.timestamp?.toDate?.() || new Date(0);
          return bTime - aTime;
        })
        .slice(0, 2)
        .map(m => ({
          type: 'message',
          title: `New message from ${m.name}`,
          description: m.message.substring(0, 50) + '...',
          timestamp: m.timestamp
        }));

      updateRecentActivity(recentMessages);
    });

    // Fetch analysis history
    const analysisRef = collection(db, 'analysisHistory');
    const analysisSnapshot = await getDocs(analysisRef);
    const analyses = analysisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    stats.value.totalAnalysis = analyses.length;
    
    // Count analysis this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    stats.value.analysisThisMonth = analyses.filter(a => {
      const createdAt = a.createdAt?.toDate?.() || new Date(0);
      return createdAt >= startOfMonth;
    }).length;

    // Calculate total documents (approximation)
    stats.value.totalDocuments = stats.value.totalUsers + stats.value.totalFeedback + stats.value.totalMessages + stats.value.totalAnalysis;
    
    // Mock storage usage (you can implement actual calculation if needed)
    stats.value.storageUsage = Math.min(Math.round((stats.value.totalDocuments / 1000) * 100), 95);

    lastUpdated.value = new Date().toLocaleTimeString();
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    loading.value = false;
  }
};

const updateRecentActivity = (newActivities) => {
  // Merge and sort all activities
  const allActivities = [...recentActivity.value, ...newActivities];
  const uniqueActivities = allActivities.filter((activity, index, self) => 
    index === self.findIndex((a) => a.title === activity.title && a.description === activity.description)
  );
  
  recentActivity.value = uniqueActivities
    .sort((a, b) => {
      const aTime = a.timestamp?.toDate?.() || new Date(0);
      const bTime = b.timestamp?.toDate?.() || new Date(0);
      return bTime - aTime;
    })
    .slice(0, 5);
};

const refreshData = () => {
  fetchDashboardData();
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getActivityColor = (type) => {
  const colors = {
    feedback: 'bg-yellow-100 text-yellow-600',
    message: 'bg-blue-100 text-blue-600',
    user: 'bg-green-100 text-green-600',
    analysis: 'bg-purple-100 text-purple-600'
  };
  return colors[type] || 'bg-gray-100 text-gray-600';
};

const getFeedbackTypeColor = (type) => {
  const colors = {
    suggestion: 'bg-blue-100 text-blue-800',
    bug: 'bg-red-100 text-red-800',
    question: 'bg-yellow-100 text-yellow-800',
    other: 'bg-purple-100 text-purple-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

// Lifecycle
onMounted(() => {
  fetchDashboardData();
});

onBeforeUnmount(() => {
  // Clean up subscriptions
  if (unsubscribeUsers) unsubscribeUsers();
  if (unsubscribeFeedback) unsubscribeFeedback();
  if (unsubscribeMessages) unsubscribeMessages();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>