<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-3 sm:p-4 md:p-6">
    <!-- Page Header -->
    <div class="max-w-7xl mx-auto mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div class="w-full sm:w-auto">
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome, {{ username }}!
            </span>
          </h1>
          <p class="text-slate-600 text-sm mt-1">Here's your EcoMist overview</p>
        </div>
        <button 
          @click="refreshDashboard" 
          :disabled="loading"
          class="flex items-center gap-2 px-3 py-2 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-all disabled:opacity-50 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
        >
          <svg :class="['w-4 h-4', loading ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span class="font-medium">{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="initialLoading" class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center justify-center h-64 gap-3">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        <p class="text-slate-500 text-sm">Loading your dashboard...</p>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      <!-- Quick Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Financial Card -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200 hover:shadow-lg transition-all cursor-pointer active:scale-95" @click="navigateTo('/user/financial-management')">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <div class="p-2 bg-emerald-100 rounded-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">Active</span>
          </div>
          <h3 class="text-slate-600 text-xs font-medium mb-0.5">Balance</h3>
          <p class="text-lg sm:text-xl font-bold text-slate-800 truncate">₱{{ formatCurrency(financialStats.balance) }}</p>
          <p class="text-[10px] sm:text-xs text-slate-500 mt-1">{{ financialStats.transactionCount }} trans.</p>
        </div>

        <!-- Crop Analysis Card -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200 hover:shadow-lg transition-all cursor-pointer active:scale-95" @click="navigateTo('/user/model')">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <div class="p-2 bg-teal-100 rounded-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded-full">AI</span>
          </div>
          <h3 class="text-slate-600 text-xs font-medium mb-0.5">Analyses</h3>
          <p class="text-lg sm:text-xl font-bold text-slate-800">{{ cropStats.totalAnalyses }}</p>
          <p class="text-[10px] sm:text-xs text-slate-500 mt-1">{{ cropStats.healthyPercentage }}% healthy</p>
        </div>

        <!-- Sensor Data Card -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200 hover:shadow-lg transition-all cursor-pointer active:scale-95" @click="navigateTo('/user/sensor_data')">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span :class="['text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full', sensorStats.status === 'online' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700']">
              {{ sensorStats.status }}
            </span>
          </div>
          <h3 class="text-slate-600 text-xs font-medium mb-0.5">Devices</h3>
          <p class="text-lg sm:text-xl font-bold text-slate-800">{{ sensorStats.deviceCount }}</p>
          <p class="text-[10px] sm:text-xs text-slate-500 mt-1 truncate">{{ sensorStats.lastUpdate }}</p>
        </div>

        <!-- Feedback Card -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200 hover:shadow-lg transition-all cursor-pointer active:scale-95" @click="openFeedbackList">
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <span v-if="feedbackStats.unreadReplies > 0" class="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 bg-red-50 text-red-700 rounded-full">
              {{ feedbackStats.unreadReplies }}
            </span>
          </div>
          <h3 class="text-slate-600 text-xs font-medium mb-0.5">Feedback</h3>
          <p class="text-lg sm:text-xl font-bold text-slate-800">{{ feedbackStats.totalFeedback }}</p>
          <p class="text-[10px] sm:text-xs text-slate-500 mt-1">{{ feedbackStats.repliedCount }} replied</p>
        </div>
      </div>

      <!-- Recent Activity & Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <!-- Financial Chart -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base sm:text-lg font-bold text-slate-800">Financial Overview</h2>
            <button @click="navigateTo('/user/financial-management')" class="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              View All →
            </button>
          </div>
          <canvas ref="financialChartRef" class="w-full" style="max-height: 200px;"></canvas>
          <div class="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
            <div class="text-center p-2 bg-green-50 rounded-lg">
              <p class="text-[10px] sm:text-xs text-slate-600 font-medium">Income</p>
              <p class="text-sm sm:text-base font-bold text-green-600">₱{{ formatCurrency(financialStats.income) }}</p>
            </div>
            <div class="text-center p-2 bg-red-50 rounded-lg">
              <p class="text-[10px] sm:text-xs text-slate-600 font-medium">Expenses</p>
              <p class="text-sm sm:text-base font-bold text-red-600">₱{{ formatCurrency(financialStats.expenses) }}</p>
            </div>
          </div>
        </div>

        <!-- Crop Health Distribution -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base sm:text-lg font-bold text-slate-800">Crop Health</h2>
            <button @click="navigateTo('/user/model')" class="text-teal-600 hover:text-teal-700 text-xs sm:text-sm font-medium">
              Analyze →
            </button>
          </div>
          <canvas ref="cropChartRef" class="w-full" style="max-height: 200px;"></canvas>
          <div class="mt-3 grid grid-cols-3 gap-2">
            <div class="text-center p-1.5 bg-green-50 rounded-lg">
              <p class="text-[10px] sm:text-xs text-slate-600 font-medium">Healthy</p>
              <p class="text-sm sm:text-base font-bold text-green-600">{{ cropStats.healthy }}</p>
            </div>
            <div class="text-center p-1.5 bg-yellow-50 rounded-lg">
              <p class="text-[10px] sm:text-xs text-slate-600 font-medium">Warning</p>
              <p class="text-sm sm:text-base font-bold text-yellow-600">{{ cropStats.bacterial + cropStats.fungal }}</p>
            </div>
            <div class="text-center p-1.5 bg-red-50 rounded-lg">
              <p class="text-[10px] sm:text-xs text-slate-600 font-medium">Critical</p>
              <p class="text-sm sm:text-base font-bold text-red-600">{{ cropStats.critical }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions & Analysis History -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <!-- Recent Transactions -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200">
          <h2 class="text-base sm:text-lg font-bold text-slate-800 mb-3">Recent Transactions</h2>
          <div v-if="recentTransactions.length === 0" class="text-center py-6 text-slate-500">
            <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-xs sm:text-sm mb-2">No transactions yet</p>
            <button @click="navigateTo('/user/financial-management')" class="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              Add First Transaction →
            </button>
          </div>
          <div v-else class="space-y-2">
            <div v-for="transaction in recentTransactions" :key="transaction.id" 
                 class="flex items-center justify-between p-2 sm:p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <div :class="['p-1.5 rounded-lg flex-shrink-0', transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100']">
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          :d="transaction.type === 'income' ? 'M12 4v16m8-8H4' : 'M20 12H4'" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-slate-800 text-xs sm:text-sm truncate">{{ transaction.category }}</p>
                  <p class="text-[10px] sm:text-xs text-slate-500">{{ formatDate(transaction.date) }}</p>
                </div>
              </div>
              <span :class="['font-bold text-xs sm:text-sm whitespace-nowrap ml-2', transaction.type === 'income' ? 'text-green-600' : 'text-red-600']">
                {{ transaction.type === 'income' ? '+' : '-' }}₱{{ formatCurrency(transaction.amount) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Crop Analyses -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200">
          <h2 class="text-base sm:text-lg font-bold text-slate-800 mb-3">Recent Analyses</h2>
          <div v-if="recentAnalyses.length === 0" class="text-center py-6 text-slate-500">
            <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-xs sm:text-sm mb-2">No analyses yet</p>
            <button @click="navigateTo('/user/model')" class="text-teal-600 hover:text-teal-700 text-xs sm:text-sm font-medium">
              Start Analyzing →
            </button>
          </div>
          <div v-else class="space-y-2">
            <div v-for="analysis in recentAnalyses" :key="analysis.id" 
                 class="flex items-start gap-2 p-2 sm:p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <img :src="analysis.imageUrl" :alt="analysis.prediction" class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-0.5 gap-2">
                  <p class="font-medium text-slate-800 text-xs sm:text-sm truncate">{{ analysis.prediction }}</p>
                  <span :class="[
                    'text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0',
                    getHealthBadgeClass(analysis.prediction)
                  ]">
                    {{ (analysis.confidence * 100).toFixed(0) }}%
                  </span>
                </div>
                <p class="text-[10px] sm:text-xs text-slate-500">{{ formatDate(analysis.createdAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-slate-200">
        <h2 class="text-base sm:text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
        <div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          <button @click="navigateTo('/user/financial-management')" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Transaction</span>
          </button>
          
          <button @click="navigateTo('/user/model')" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Analyze</span>
          </button>
          
          <button @click="navigateTo('/user/sensor_data')" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Sensors</span>
          </button>
          
          <button @click="navigateTo('/user/messenger')" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Messages</span>
          </button>
          
          <button @click="openFeedback" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Feedback</span>
          </button>
          
          <button @click="navigateTo('/user/settings/profile-display')" 
                  class="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-lg transition-all active:scale-95">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-[10px] sm:text-xs font-medium text-slate-700 text-center leading-tight">Settings</span>
          </button>
        </div>
      </div>

      <!-- System Status Banner -->
      <div v-if="showSystemStatus" class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 text-white">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
            <div class="p-2 bg-white/20 rounded-lg flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-sm sm:text-base mb-0.5">All Systems Operational</h3>
              <p class="text-white/90 text-[10px] sm:text-xs">All devices and services running smoothly</p>
            </div>
          </div>
          <button @click="showSystemStatus = false" class="text-white/80 hover:text-white flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { getDatabase, ref as dbRef, onValue, off } from 'firebase/database';
import { db } from '../../firebase';
import Chart from 'chart.js/auto';

const router = useRouter();
const auth = getAuth();

// Refs
const username = ref('User');
const loading = ref(false);
const initialLoading = ref(true);
const showSystemStatus = ref(true);

// Chart refs
const financialChartRef = ref(null);
const cropChartRef = ref(null);
let financialChart = null;
let cropChart = null;

// Stats
const financialStats = ref({
  balance: 0,
  income: 0,
  expenses: 0,
  transactionCount: 0
});

const cropStats = ref({
  totalAnalyses: 0,
  healthy: 0,
  bacterial: 0,
  fungal: 0,
  critical: 0,
  healthyPercentage: 0
});

const sensorStats = ref({
  deviceCount: 0,
  status: 'offline',
  lastUpdate: 'Never'
});

const feedbackStats = ref({
  totalFeedback: 0,
  repliedCount: 0,
  unreadReplies: 0
});

// Recent data
const recentTransactions = ref([]);
const recentAnalyses = ref([]);

// Realtime listeners
let transactionUnsubscribe = null;
let analysisUnsubscribe = null;
let feedbackUnsubscribe = null;
let sensorUnsubscribe = null;

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(value);
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getHealthBadgeClass = (prediction) => {
  const lower = prediction.toLowerCase();
  if (lower.includes('healthy')) return 'bg-green-100 text-green-700';
  if (lower.includes('bacterial') || lower.includes('fungal')) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const navigateTo = (path) => {
  router.push(path);
};

const openFeedback = () => {
  // Emit event to parent to open feedback modal
  window.dispatchEvent(new CustomEvent('open-feedback'));
};

const openFeedbackList = () => {
  // Emit event to parent to open feedback list modal
  window.dispatchEvent(new CustomEvent('open-feedback-list'));
};

// Fetch Financial Data
const fetchFinancialData = async (userId) => {
  // Verify the user is still authenticated and matches the current user
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId) {
    console.error('Unauthorized access attempt to financial data');
    return;
  }

  try {
    // Only access the current user's transactions subcollection
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    const q = query(transactionsRef, orderBy('date', 'desc'));
    
    transactionUnsubscribe = onSnapshot(q, (snapshot) => {
      // Double-check authentication hasn't changed
      const stillCurrentUser = auth.currentUser;
      if (!stillCurrentUser || stillCurrentUser.uid !== userId) {
        console.error('User authentication changed during data fetch');
        if (transactionUnsubscribe) transactionUnsubscribe();
        return;
      }

      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      let income = 0;
      let expenses = 0;
      
      transactions.forEach(t => {
        if (t.type === 'income') income += t.amount;
        if (t.type === 'expense') expenses += t.amount;
      });
      
      financialStats.value = {
        balance: income - expenses,
        income,
        expenses,
        transactionCount: transactions.length
      };
      
      recentTransactions.value = transactions.slice(0, 5);
      updateFinancialChart();
    }, (error) => {
      console.error('Error in financial data snapshot:', error);
      // Handle permission denied or other errors
      if (error.code === 'permission-denied') {
        console.error('Permission denied: User does not have access to this data');
        router.push('/auth');
      }
    });
  } catch (error) {
    console.error('Error fetching financial data:', error);
    if (error.code === 'permission-denied') {
      router.push('/auth');
    }
  }
};

// Fetch Crop Analysis Data
const fetchCropData = async (userId) => {
  // Verify the user is still authenticated and matches the current user
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId) {
    console.error('Unauthorized access attempt to crop analysis data');
    return;
  }

  try {
    const analysisRef = collection(db, 'analysisHistory');
    // Only query documents where userId matches the current user
    const q = query(
      analysisRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    analysisUnsubscribe = onSnapshot(q, (snapshot) => {
      // Double-check authentication hasn't changed
      const stillCurrentUser = auth.currentUser;
      if (!stillCurrentUser || stillCurrentUser.uid !== userId) {
        console.error('User authentication changed during data fetch');
        if (analysisUnsubscribe) analysisUnsubscribe();
        return;
      }

      const analyses = snapshot.docs.map(doc => {
        const data = doc.data();
        // Extra security: verify each document belongs to the current user
        if (data.userId !== userId) {
          console.warn('Document userId mismatch, skipping:', doc.id);
          return null;
        }
        return {
          id: doc.id,
          ...data
        };
      }).filter(a => a !== null); // Remove any null entries
      
      let healthy = 0;
      let bacterial = 0;
      let fungal = 0;
      let critical = 0;
      
      analyses.forEach(a => {
        const pred = a.prediction.toLowerCase();
        if (pred.includes('healthy')) healthy++;
        else if (pred.includes('bacterial')) bacterial++;
        else if (pred.includes('fungal')) fungal++;
        else critical++;
      });
      
      cropStats.value = {
        totalAnalyses: analyses.length,
        healthy,
        bacterial,
        fungal,
        critical,
        healthyPercentage: analyses.length > 0 ? Math.round((healthy / analyses.length) * 100) : 0
      };
      
      recentAnalyses.value = analyses.slice(0, 5);
      updateCropChart();
    }, (error) => {
      console.error('Error in crop data snapshot:', error);
      if (error.code === 'permission-denied') {
        console.error('Permission denied: User does not have access to this data');
        router.push('/auth');
      }
    });
  } catch (error) {
    console.error('Error fetching crop data:', error);
    if (error.code === 'permission-denied') {
      router.push('/auth');
    }
  }
};

// Fetch Sensor Data
const fetchSensorData = (userId) => {
  // Verify the user is still authenticated and matches the current user
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId) {
    console.error('Unauthorized access attempt to sensor data');
    return;
  }

  try {
    const rdb = getDatabase();
    // Access user-specific devices path: /users/{userId}/devices
    // This ensures each user can only access their own devices
    const devicesRef = dbRef(rdb, `users/${userId}/devices`);
    
    sensorUnsubscribe = onValue(devicesRef, (snapshot) => {
      // Double-check authentication hasn't changed
      const stillCurrentUser = auth.currentUser;
      if (!stillCurrentUser || stillCurrentUser.uid !== userId) {
        console.error('User authentication changed during data fetch');
        if (sensorUnsubscribe && typeof sensorUnsubscribe === 'function') {
          const rdb = getDatabase();
          off(devicesRef);
        }
        return;
      }

      const devices = snapshot.val();
      if (devices) {
        // Convert devices object to array
        const deviceArray = Object.entries(devices).map(([key, device]) => ({
          id: key,
          ...device
        }));

        const deviceCount = deviceArray.length;
        const onlineDevices = deviceArray.filter(d => d.status === 'online');
        
        // Get the most recent timestamp from all devices
        let lastUpdateTime = 'Never';
        if (deviceArray.length > 0) {
          const timestamps = deviceArray
            .map(d => d.lastUpdate || d.timestamp)
            .filter(t => t);
          
          if (timestamps.length > 0) {
            const mostRecent = Math.max(...timestamps.map(t => new Date(t).getTime()));
            const diff = Date.now() - mostRecent;
            const minutes = Math.floor(diff / 60000);
            
            if (minutes < 1) lastUpdateTime = 'Just now';
            else if (minutes < 60) lastUpdateTime = `${minutes}m ago`;
            else if (minutes < 1440) lastUpdateTime = `${Math.floor(minutes / 60)}h ago`;
            else lastUpdateTime = `${Math.floor(minutes / 1440)}d ago`;
          } else {
            lastUpdateTime = 'Just now';
          }
        }
        
        sensorStats.value = {
          deviceCount,
          status: onlineDevices.length > 0 ? 'online' : 'offline',
          lastUpdate: lastUpdateTime
        };
      } else {
        // No devices found for this user
        sensorStats.value = {
          deviceCount: 0,
          status: 'offline',
          lastUpdate: 'Never'
        };
      }
    }, (error) => {
      console.error('Error in sensor data listener:', error);
      if (error.code === 'PERMISSION_DENIED') {
        console.error('Permission denied: User does not have access to sensor data');
      }
      // Set default values on error
      sensorStats.value = {
        deviceCount: 0,
        status: 'offline',
        lastUpdate: 'Never'
      };
    });
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    sensorStats.value = {
      deviceCount: 0,
      status: 'offline',
      lastUpdate: 'Never'
    };
  }
};

// Fetch Feedback Data
const fetchFeedbackData = async (userId) => {
  // Verify the user is still authenticated and matches the current user
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId) {
    console.error('Unauthorized access attempt to feedback data');
    return;
  }

  try {
    const feedbackRef = collection(db, 'feedback');
    // Only query feedback documents where userId matches the current user
    const q = query(
      feedbackRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    feedbackUnsubscribe = onSnapshot(q, (snapshot) => {
      // Double-check authentication hasn't changed
      const stillCurrentUser = auth.currentUser;
      if (!stillCurrentUser || stillCurrentUser.uid !== userId) {
        console.error('User authentication changed during data fetch');
        if (feedbackUnsubscribe) feedbackUnsubscribe();
        return;
      }

      const feedbacks = snapshot.docs.map(doc => {
        const data = doc.data();
        // Extra security: verify each document belongs to the current user
        if (data.userId !== userId) {
          console.warn('Feedback userId mismatch, skipping:', doc.id);
          return null;
        }
        return {
          id: doc.id,
          ...data
        };
      }).filter(f => f !== null); // Remove any null entries
      
      const replied = feedbacks.filter(f => f.reply).length;
      const unread = feedbacks.filter(f => f.reply && !f.readByUser).length;
      
      feedbackStats.value = {
        totalFeedback: feedbacks.length,
        repliedCount: replied,
        unreadReplies: unread
      };
    }, (error) => {
      console.error('Error in feedback data snapshot:', error);
      if (error.code === 'permission-denied') {
        console.error('Permission denied: User does not have access to this data');
        router.push('/auth');
      }
    });
  } catch (error) {
    console.error('Error fetching feedback data:', error);
    if (error.code === 'permission-denied') {
      router.push('/auth');
    }
  }
};

// Update Financial Chart
const updateFinancialChart = () => {
  if (!financialChartRef.value) return;
  
  const ctx = financialChartRef.value.getContext('2d');
  
  if (financialChart) {
    financialChart.destroy();
  }
  
  // Get last 7 days of data
  const last7Days = [];
  const incomeData = [];
  const expenseData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayIncome = recentTransactions.value
      .filter(t => {
        const tDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return t.type === 'income' && tDate >= dayStart && tDate <= dayEnd;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayExpense = recentTransactions.value
      .filter(t => {
        const tDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return t.type === 'expense' && tDate >= dayStart && tDate <= dayEnd;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    incomeData.push(dayIncome);
    expenseData.push(dayExpense);
  }
  
  financialChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: last7Days,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '₱' + value.toLocaleString()
          }
        }
      }
    }
  });
};

// Update Crop Chart
const updateCropChart = () => {
  if (!cropChartRef.value) return;
  
  const ctx = cropChartRef.value.getContext('2d');
  
  if (cropChart) {
    cropChart.destroy();
  }
  
  cropChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Healthy', 'Bacterial', 'Fungal', 'Critical'],
      datasets: [{
        data: [
          cropStats.value.healthy,
          cropStats.value.bacterial,
          cropStats.value.fungal,
          cropStats.value.critical
        ],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(249, 115, 22)',
          'rgb(239, 68, 68)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  });
};

// Refresh Dashboard
const refreshDashboard = async () => {
  loading.value = true;
  const user = auth.currentUser;
  
  // Verify user is authenticated before refreshing
  if (!user) {
    console.error('No authenticated user found');
    router.push('/auth');
    loading.value = false;
    return;
  }

  try {
    await Promise.all([
      fetchFinancialData(user.uid),
      fetchCropData(user.uid),
      fetchSensorData(user.uid),
      fetchFeedbackData(user.uid)
    ]);
  } catch (error) {
    console.error('Error refreshing dashboard:', error);
  } finally {
    loading.value = false;
  }
};

// Initialize Dashboard
const initializeDashboard = async () => {
  initialLoading.value = true;
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Get username from Firestore - only access the current user's document
        const userDocRef = collection(db, 'users');
        const userQuery = query(userDocRef, where('__name__', '==', user.uid));
        const userSnapshot = await getDocs(userQuery);
        
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          // Verify the document actually belongs to the current user
          if (userSnapshot.docs[0].id === user.uid) {
            username.value = userData.username || user.displayName || 'User';
          } else {
            console.error('User document ID mismatch');
            router.push('/auth');
            return;
          }
        } else {
          console.warn('User document not found in Firestore');
          username.value = user.displayName || user.email || 'User';
        }
        
        // Fetch all data - each function verifies user authentication
        await Promise.all([
          fetchFinancialData(user.uid),
          fetchCropData(user.uid),
          fetchSensorData(user.uid),
          fetchFeedbackData(user.uid)
        ]);
        
        initialLoading.value = false;
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        if (error.code === 'permission-denied') {
          console.error('Permission denied during initialization');
          router.push('/auth');
        }
        initialLoading.value = false;
      }
    } else {
      // No authenticated user, redirect to auth
      console.log('No authenticated user, redirecting to auth');
      router.push('/auth');
      initialLoading.value = false;
    }
  });
};

onMounted(() => {
  initializeDashboard();
  
  // Listen for feedback events from parent
  window.addEventListener('open-feedback', openFeedback);
  window.addEventListener('open-feedback-list', openFeedbackList);
});

onBeforeUnmount(() => {
  // Clean up all real-time listeners to prevent unauthorized data access
  try {
    if (transactionUnsubscribe) {
      transactionUnsubscribe();
      transactionUnsubscribe = null;
    }
    if (analysisUnsubscribe) {
      analysisUnsubscribe();
      analysisUnsubscribe = null;
    }
    if (feedbackUnsubscribe) {
      feedbackUnsubscribe();
      feedbackUnsubscribe = null;
    }
    if (sensorUnsubscribe) {
      // Clean up the user-specific devices listener
      const user = auth.currentUser;
      if (user) {
        const rdb = getDatabase();
        const devicesRef = dbRef(rdb, `users/${user.uid}/devices`);
        off(devicesRef);
      }
      sensorUnsubscribe = null;
    }
  } catch (error) {
    console.error('Error cleaning up listeners:', error);
  }
  
  // Destroy charts
  try {
    if (financialChart) {
      financialChart.destroy();
      financialChart = null;
    }
    if (cropChart) {
      cropChart.destroy();
      cropChart = null;
    }
  } catch (error) {
    console.error('Error destroying charts:', error);
  }
  
  // Remove event listeners
  window.removeEventListener('open-feedback', openFeedback);
  window.removeEventListener('open-feedback-list', openFeedbackList);
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.15s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Prevent text selection on quick actions */
button {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Improve touch targets for mobile */
@media (max-width: 640px) {
  button {
    min-height: 44px;
  }
}
</style>