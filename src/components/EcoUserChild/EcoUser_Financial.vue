<template>
<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
<!-- Main Content Area -->
<div class="flex flex-1 overflow-hidden">
  <!-- Main Content -->
  <main class="flex-1 overflow-y-auto bg-transparent p-2 sm:p-4 md:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="mb-3 sm:mb-4 md:mb-6">
      <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Financial Management</h1>
      <p class="text-xs sm:text-sm md:text-base text-gray-600">Track income, expenses, and financial performance</p>
    </div>

    <!-- Financial Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
      <!-- Income Card -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-2.5 sm:p-3 md:p-4 border-l-4 border-green-500">
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide truncate">Total Income</p>
            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 truncate">₱{{ safeToLocaleString(totalIncome) }}</h3>
            <div class="flex items-center mt-0.5 sm:mt-1">
              <span :class="[
                incomeGrowth >= 0 ? 'text-green-600' : 'text-red-600',
                'text-[9px] sm:text-xs md:text-sm font-medium flex items-center'
              ]">
                <svg v-if="incomeGrowth >= 0" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                </svg>
                <span class="truncate">{{ Math.abs(incomeGrowth).toFixed(1) }}%</span>
              </span>
              <span class="text-gray-500 text-[8px] sm:text-[9px] md:text-xs ml-0.5 sm:ml-1 truncate hidden sm:inline">vs last month</span>
            </div>
          </div>
          <div class="p-1.5 sm:p-2 md:p-2.5 bg-green-100 rounded-lg flex-shrink-0 ml-1 sm:ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Expenses Card -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-2.5 sm:p-3 md:p-4 border-l-4 border-red-500">
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide truncate">Total Expenses</p>
            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 truncate">₱{{ safeToLocaleString(totalExpenses) }}</h3>
            <div class="flex items-center mt-0.5 sm:mt-1">
              <span :class="[
                expenseGrowth <= 0 ? 'text-green-600' : 'text-red-600',
                'text-[9px] sm:text-xs md:text-sm font-medium flex items-center'
              ]">
                <svg v-if="expenseGrowth <= 0" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                <span class="truncate">{{ Math.abs(expenseGrowth).toFixed(1) }}%</span>
              </span>
              <span class="text-gray-500 text-[8px] sm:text-[9px] md:text-xs ml-0.5 sm:ml-1 truncate hidden sm:inline">vs last month</span>
            </div>
          </div>
          <div class="p-1.5 sm:p-2 md:p-2.5 bg-red-100 rounded-lg flex-shrink-0 ml-1 sm:ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Net Profit Card -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-2.5 sm:p-3 md:p-4 border-l-4 border-blue-500">
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide truncate">Net Profit</p>
            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 truncate">₱{{ safeToLocaleString(netProfit) }}</h3>
            <div class="flex items-center mt-0.5 sm:mt-1">
              <span :class="[
                profitGrowth >= 0 ? 'text-green-600' : 'text-red-600',
                'text-[9px] sm:text-xs md:text-sm font-medium flex items-center'
              ]">
                <svg v-if="profitGrowth >= 0" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                </svg>
                <span class="truncate">{{ Math.abs(profitGrowth).toFixed(1) }}%</span>
              </span>
              <span class="text-gray-500 text-[8px] sm:text-[9px] md:text-xs ml-0.5 sm:ml-1 truncate hidden sm:inline">vs last month</span>
            </div>
          </div>
          <div class="p-1.5 sm:p-2 md:p-2.5 bg-blue-100 rounded-lg flex-shrink-0 ml-1 sm:ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Savings Rate Card -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-2.5 sm:p-3 md:p-4 border-l-4 border-purple-500">
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide truncate">Savings Rate</p>
            <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 truncate">{{ savingsRate.toFixed(1) }}%</h3>
            <div class="flex items-center mt-0.5 sm:mt-1">
              <span :class="[
                savingsRateGrowth >= 0 ? 'text-green-600' : 'text-red-600',
                'text-[9px] sm:text-xs md:text-sm font-medium flex items-center'
              ]">
                <svg v-if="savingsRateGrowth >= 0" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                </svg>
                <span class="truncate">{{ Math.abs(savingsRateGrowth).toFixed(1) }}%</span>
              </span>
              <span class="text-gray-500 text-[8px] sm:text-[9px] md:text-xs ml-0.5 sm:ml-1 truncate hidden sm:inline">vs last month</span>
            </div>
          </div>
          <div class="p-1.5 sm:p-2 md:p-2.5 bg-purple-100 rounded-lg flex-shrink-0 ml-1 sm:ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <div class="bg-white rounded-lg shadow-md mb-3 sm:mb-4 md:mb-6 overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <button 
            @click="currentAnalyticsTab = 'overview'" 
            :class="[
              'py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 font-medium text-[10px] sm:text-xs md:text-sm border-b-2 focus:outline-none whitespace-nowrap transition-colors duration-200',
              currentAnalyticsTab === 'overview' 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-1 sm:gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Overview
            </span>
          </button>
          <button 
            @click="currentAnalyticsTab = 'budget'" 
            :class="[
              'py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 font-medium text-[10px] sm:text-xs md:text-sm border-b-2 focus:outline-none whitespace-nowrap transition-colors duration-200',
              currentAnalyticsTab === 'budget' 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-1 sm:gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Budget
            </span>
          </button>
          <button 
            @click="currentAnalyticsTab = 'forecast'" 
            :class="[
              'py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 font-medium text-[10px] sm:text-xs md:text-sm border-b-2 focus:outline-none whitespace-nowrap transition-colors duration-200',
              currentAnalyticsTab === 'forecast' 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-1 sm:gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Forecast
            </span>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-2.5 sm:p-4 md:p-6">
        <!-- Overview Tab -->
        <div v-if="currentAnalyticsTab === 'overview'">
          <!-- Date Range Selector -->
          <div class="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button 
                v-for="range in dateRanges" 
                :key="range.id"
                @click="setDateRange(range.id)"
                :class="[
                  'px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm rounded-md whitespace-nowrap font-medium transition-all duration-200',
                  selectedDateRange === range.id 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ range.name }}
              </button>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
              <div v-if="selectedDateRange === 'custom'" class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <input 
                  type="date" 
                  v-model="customStartDate" 
                  @change="fetchFilteredTransactions"
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm border border-gray-300 rounded-md w-full sm:w-auto focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                <span class="text-gray-500 text-[10px] sm:text-xs md:text-sm hidden sm:inline">to</span>
                <input 
                  type="date" 
                  v-model="customEndDate" 
                  @change="fetchFilteredTransactions"
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm border border-gray-300 rounded-md w-full sm:w-auto focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                <button 
                  @click="applyCustomDateRange" 
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 w-full sm:w-auto font-medium transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2 ml-auto">
                <button 
                  @click="toggleChartType" 
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="chartType === 'line'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span class="hidden sm:inline">{{ chartType === 'line' ? 'Bar' : 'Line' }}</span>
                  </span>
                </button>
                <button 
                  @click="toggleCumulativeMode" 
                  :class="[
                    'px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm rounded-md transition-colors duration-200',
                    cumulativeMode 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                    <span class="hidden sm:inline">Cumulative</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Main Chart -->
          <div class="bg-white rounded-lg border border-gray-200 p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6 shadow-sm">
            <h3 class="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">Financial Overview</h3>
            <div class="h-48 sm:h-64 md:h-72 lg:h-80 relative">
              <div v-if="chartLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 rounded-lg">
                <svg class="animate-spin h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <canvas ref="trendChartCanvas" class="w-full h-full"></canvas>
            </div>
          </div>

          <!-- Distribution Charts -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
            <!-- Income Distribution -->
            <div class="bg-white rounded-lg border border-gray-200 p-2.5 sm:p-3 md:p-4 shadow-sm">
              <div class="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
                <h3 class="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Income Distribution</h3>
                <button 
                  @click="toggleIncomeChartType" 
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="incomeChartType === 'pie'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    </svg>
                    <span class="hidden sm:inline">{{ incomeChartType === 'pie' ? 'Bar' : 'Pie' }}</span>
                  </span>
                </button>
              </div>
              <div class="h-40 sm:h-48 md:h-56 lg:h-64 relative">
                <div v-if="incomeChartLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 rounded-lg">
                  <svg class="animate-spin h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <canvas ref="incomeDistributionCanvas" class="w-full h-full"></canvas>
              </div>
            </div>

            <!-- Expense Distribution -->
            <div class="bg-white rounded-lg border border-gray-200 p-2.5 sm:p-3 md:p-4 shadow-sm">
              <div class="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
                <h3 class="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Expense Distribution</h3>
                <button 
                  @click="toggleExpenseChartType" 
                  class="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="expenseChartType === 'pie'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    </svg>
                    <span class="hidden sm:inline">{{ expenseChartType === 'pie' ? 'Bar' : 'Pie' }}</span>
                  </span>
                </button>
              </div>
              <div class="h-40 sm:h-48 md:h-56 lg:h-64 relative">
                <div v-if="expenseChartLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 rounded-lg">
                  <svg class="animate-spin h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <canvas ref="expenseDistributionCanvas" class="w-full h-full"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Tab -->
        <div v-if="currentAnalyticsTab === 'budget'">
          <!-- Budget Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Total Budget</h3>
              <p class="text-2xl font-bold text-gray-900">₱{{ safeToLocaleString(totalBudgetLimit) }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
              <p class="text-2xl font-bold text-gray-900">₱{{ safeToLocaleString(getTotalExpensesInBudgetPeriod) }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Balance</h3>
              <p :class="[
                'text-2xl font-bold',
                getBudgetBalanceAmount >= 0 ? 'text-green-600' : 'text-red-600'
              ]">
                ₱{{ safeToLocaleString(Math.abs(getBudgetBalanceAmount)) }}
                <span class="text-sm">{{ getBudgetBalanceAmount >= 0 ? 'remaining' : 'exceeded' }}</span>
              </p>
            </div>
          </div>
          <!-- Budget Controls -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="w-full sm:w-auto">
                <label for="budget-start-date" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Budget Period</label>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input 
                    type="date" 
                    id="budget-start-date"
                    v-model="budgetStartDate" 
                    @change="loadBudgetLimits"
                    class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md w-full sm:w-auto"
                  >
                  <span class="text-gray-500 text-xs sm:text-sm">to</span>
                  <input 
                    type="date" 
                    id="budget-end-date"
                    v-model="budgetEndDate" 
                    @change="loadBudgetLimits"
                    class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md w-full sm:w-auto"
                  >
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4 sm:mt-0">
                <button 
                  @click="saveBudgetPlan" 
                  class="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-xs sm:text-sm"
                >
                  Add New Plan
                </button>
                <button 
                  v-if="currentEditingPlanId"
                  @click="updateCurrentPlan" 
                  class="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  Update Plan
                </button>
                <button 
                  @click="showBudgetExportModal = true" 
                  class="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-xs sm:text-sm"
                >
                  Export Budget Data
                </button>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button 
                @click="showCategoryModal = true" 
                class="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-xs sm:text-sm"
              >
                Manage Categories
              </button>
              <button 
                @click="showBudgetHistoryModal = true" 
                class="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-xs sm:text-sm"
              >
                Budget History
              </button>
            </div>
          </div>

          <!-- Budget Progress Display (Collapsible) -->
          <div class="bg-white rounded-lg border p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
            <div class="flex justify-between items-center mb-3 sm:mb-4 cursor-pointer" @click="budgetCollapsed = !budgetCollapsed">
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-800">Budget Progress</h3>
                <div class="text-xs sm:text-sm text-gray-600">
                  Total Budget: <span class="font-semibold text-gray-800">₱{{ safeToLocaleString(totalBudgetLimit) }}</span>
                  Total Expenses: <span class="font-semibold text-gray-800">₱{{ safeToLocaleString(getTotalExpensesInBudgetPeriod) }}</span>
                  Balance: <span :class="[
                    getBudgetBalanceAmount >= 0 ? 'text-green-600' : 'text-red-600',
                    'font-semibold'
                  ]">₱{{ safeToLocaleString(Math.abs(getBudgetBalanceAmount)) }}</span>
                </div>
              </div>
              <button class="p-1 hover:bg-gray-100 rounded">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-500 transition-transform duration-200" 
                  :class="{ 'rotate-180': !budgetCollapsed }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div v-show="!budgetCollapsed" class="transition-all duration-300">
              <div v-if="loadingBudget" class="text-gray-500 text-xs sm:text-sm">Loading budget limits...</div>
              
              <div v-else>
                <!-- Budget Summary Table -->
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(category, index) in categories" :key="index">
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ category }}
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          ₱{{ safeToLocaleString(budgetData[category]?.actual || 0) }}
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            v-model.number="budgetLimits[category]"
                            @input="saveBudgetLimit(category)"
                            class="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md"
                            min="0"
                          />
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium" 
                            :class="getBudgetStatusClass(budgetData[category]?.actual, budgetData[category]?.limit)">
                          {{ getBudgetBalance(budgetData[category]?.actual, budgetData[category]?.limit) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Forecasting Tab -->
        <div v-if="currentAnalyticsTab === 'forecast'">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="w-full sm:w-auto">
                <label for="forecast-start-date" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Forecast Period</label>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input 
                    type="date" 
                    id="forecast-start-date"
                    v-model="forecastStartDate" 
                    @change="updateForecastChart"
                    class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md w-full sm:w-auto"
                  >
                  <span class="text-gray-500 text-xs sm:text-sm">to</span>
                  <input 
                    type="date" 
                    id="forecast-end-date"
                    v-model="forecastEndDate" 
                    @change="updateForecastChart"
                    class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md w-full sm:w-auto"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="bg-white rounded-lg border p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Financial Forecast</h3>
            <div class="h-64 sm:h-80 relative overflow-x-auto">
              <div v-if="forecastChartLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <svg class="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <canvas ref="forecastChartCanvas" class="min-w-full"></canvas>
            </div>
          </div>

          <!-- Forecast Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div class="bg-white rounded-lg border p-3 sm:p-4">
              <h4 class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Forecasted Income</h4>
              <div class="text-lg sm:text-2xl font-bold text-gray-800">₱{{ safeToLocaleString(forecastedIncome) }}</div>
              <div class="flex items-center mt-1">
                <span :class="[
                  forecastedIncomeGrowth >= 0 ? 'text-green-600' : 'text-red-600',
                  'text-xs sm:text-sm font-medium flex items-center'
                ]">
                  <svg v-if="forecastedIncomeGrowth >= 0" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                  </svg>
                  {{ Math.abs(forecastedIncomeGrowth).toFixed(1) }}%
                </span>
                <span class="text-gray-500 text-xs ml-1">vs current</span>
              </div>
            </div>
            <div class="bg-white rounded-lg border p-3 sm:p-4">
              <h4 class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Forecasted Expenses</h4>
              <div class="text-lg sm:text-2xl font-bold text-gray-800">₱{{ safeToLocaleString(forecastedExpenses) }}</div>
              <div class="flex items-center mt-1">
                <span :class="[
                  forecastedExpenseGrowth <= 0 ? 'text-green-600' : 'text-red-600',
                  'text-xs sm:text-sm font-medium flex items-center'
                ]">
                  <svg v-if="forecastedExpenseGrowth <= 0" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  {{ Math.abs(forecastedExpenseGrowth).toFixed(1) }}%
                </span>
                <span class="text-gray-500 text-xs ml-1">vs current</span>
              </div>
            </div>
            <div class="bg-white rounded-lg border p-3 sm:p-4">
              <h4 class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Forecasted Profit</h4>
              <div class="text-lg sm:text-2xl font-bold text-gray-800">₱{{ safeToLocaleString(forecastedProfit) }}</div>
              <div class="flex items-center mt-1">
                <span :class="[
                  forecastedProfitGrowth >= 0 ? 'text-green-600' : 'text-red-600',
                  'text-xs sm:text-sm font-medium flex items-center'
                ]">
                  <svg v-if="forecastedProfitGrowth >= 0" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.586 14.586 14H12z" clip-rule="evenodd" />
                  </svg>
                  {{ Math.abs(forecastedProfitGrowth).toFixed(1) }}%
                </span>
                <span class="text-gray-500 text-xs ml-1">vs current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Form -->
    <div class="bg-white rounded-lg shadow-md p-2.5 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
      <h2 class="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">Add New Transaction</h2>
      <form @submit.prevent="addTransaction()">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
          <div>
            <label for="amount" class="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
            <input 
              type="number" 
              id="amount" 
              v-model="amount" 
              class="block w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            >
            <p v-if="formErrors.amount" class="mt-0.5 sm:mt-1 text-[9px] sm:text-xs text-red-600">{{ formErrors.amount }}</p>
          </div>
          <div>
            <label for="type" class="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              id="type" 
              v-model="type"
              class="block w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label for="category" class="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              id="category" 
              v-model="category"
              class="block w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm"
            >
              <option v-for="(cat, index) in categories" :key="index" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div>
            <label for="date" class="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="transactionDate" 
              class="block w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm"
              required
            >
          </div>
        </div>
        <div class="mb-2 sm:mb-3 md:mb-4">
          <label for="notes" class="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <textarea 
            id="notes" 
            v-model="notes" 
            rows="2"
            class="block w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm resize-none"
            placeholder="Add any additional details here..."
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button 
            type="submit"
            class="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 border border-transparent rounded-md shadow-sm text-[11px] sm:text-xs md:text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center gap-1 sm:gap-2">
              <svg class="animate-spin h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
            <span v-else>Add Transaction</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Transaction List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2.5 sm:p-3 md:p-4 border-b gap-2 sm:gap-3">
        <h2 class="text-base sm:text-lg md:text-xl font-bold text-gray-800">Transaction History</h2>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div class="relative flex-1 sm:flex-initial">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search..." 
              class="pl-7 sm:pl-8 md:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[11px] sm:text-xs md:text-sm w-full"
            >
            <div class="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 md:pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button 
            @click="showTransactionExportModal = true" 
            class="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md shadow-sm text-[11px] sm:text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
          >
            <span class="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span class="hidden sm:inline">Export</span>
            </span>
          </button>
        </div>
      </div>
      
      <!-- Transaction Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="sortBy('date')"
              >
                <div class="flex items-center gap-0.5 sm:gap-1">
                  Date
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" :class="getSortIcon('date')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th 
                scope="col" 
                class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="sortBy('type')"
              >
                <div class="flex items-center gap-0.5 sm:gap-1">
                  Type
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" :class="getSortIcon('type')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th 
                scope="col" 
                class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="sortBy('category')"
              >
                <div class="flex items-center gap-0.5 sm:gap-1">
                  Category
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" :class="getSortIcon('category')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th 
                scope="col" 
                class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="sortBy('amount')"
              >
                <div class="flex items-center gap-0.5 sm:gap-1">
                  Amount
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" :class="getSortIcon('amount')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-left text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Notes
              </th>
              <th scope="col" class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 text-right text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="paginatedTransactions.length === 0">
              <td colspan="6" class="px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 text-center text-[10px] sm:text-xs md:text-sm text-gray-500">
                No transactions found. Add your first transaction above.
              </td>
            </tr>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-500">
                <span class="hidden sm:inline">{{ formatDate(transaction.date) }}</span>
                <span class="sm:hidden">{{ new Date(transaction.date.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                <span :class="[
                  'px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full',
                  transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ transaction.type === 'income' ? 'Income' : 'Expense' }}
                </span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-500">
                <div class="flex items-center gap-1 sm:gap-2">
                  <i :class="getCategoryIcon(transaction.category)" class="text-[10px] sm:text-xs hidden sm:inline"></i>
                  <span class="truncate max-w-[80px] sm:max-w-none">{{ transaction.category }}</span>
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm font-semibold" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.type === 'income' ? '+' : '-' }}₱{{ safeToLocaleString(transaction.amount) }}
              </td>
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-500 max-w-xs truncate hidden md:table-cell">
                {{ transaction.notes || '-' }}
              </td>
              <td class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-right text-[10px] sm:text-xs md:text-sm font-medium">
                <div class="flex justify-end gap-1 sm:gap-2">
                  <button 
                    @click="openEditModal(transaction)" 
                    class="text-emerald-600 hover:text-emerald-900 p-1 hover:bg-emerald-50 rounded transition-colors duration-150"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="confirmDelete(transaction)" 
                    class="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors duration-150"
                    :disabled="transaction.deleting"
                    title="Delete"
                  >
                    <svg v-if="!transaction.deleting" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <svg v-else class="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-300 text-[10px] sm:text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white transition-colors duration-200',
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 active:bg-gray-100'
            ]"
          >
            Previous
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            :class="[
              'ml-2 relative inline-flex items-center px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-300 text-[10px] sm:text-xs md:text-sm font-medium rounded-md text-gray-700 bg-white transition-colors duration-200',
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 active:bg-gray-100'
            ]"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-[10px] sm:text-xs md:text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredTransactions.length) }}</span>
              of
              <span class="font-medium">{{ filteredTransactions.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-l-md border border-gray-300 bg-white text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 transition-colors duration-200',
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200',
                  currentPage === page 
                    ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                :class="[
                  'relative inline-flex items-center px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-r-md border border-gray-300 bg-white text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 transition-colors duration-200',
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Next</span>
                <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- Edit Transaction Modal -->
<div
  v-if="showEditModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeEditModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ease-out"
    :class="showEditModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Edit Transaction</h3>
      <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <form @submit.prevent="updateTransaction">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
          <input 
            type="number" 
            v-model="editForm.amount" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            step="0.01"
            min="0"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select 
            v-model="editForm.type"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            v-model="editForm.category"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option v-for="(cat, index) in categories" :key="index" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input 
            type="date" 
            v-model="editForm.date" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea 
            v-model="editForm.notes" 
            rows="2"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            placeholder="Add any additional details here..."
          ></textarea>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 mt-6">
        <button 
          type="button"
          @click="closeEditModal"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
          </span>
          <span v-else>Update Transaction</span>
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Category Management Modal -->
<div
  v-if="showCategoryModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeCategoryModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ease-out"
    :class="showCategoryModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Manage Categories</h3>
      <button @click="closeCategoryModal" class="text-gray-400 hover:text-gray-600">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Add New Category -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Add New Category</h4>
      <div class="flex gap-2">
        <input 
          type="text" 
          v-model="newCategoryName" 
          placeholder="Category name"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          @keyup.enter="addCategory"
        >
        <button 
          @click="addCategory"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-sm"
          :disabled="!newCategoryName.trim()"
        >
          Add
        </button>
      </div>
    </div>
    
    <!-- Existing Categories -->
    <div>
      <h4 class="text-sm font-medium text-gray-700 mb-2">Existing Categories</h4>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="flex items-center justify-between p-2 bg-gray-50 rounded-md"
        >
          <span class="text-sm text-gray-700">{{ category }}</span>
          <button 
            @click="confirmDeleteCategory(category)"
            class="text-red-600 hover:text-red-800 p-1"
            title="Delete category"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Budget History Modal -->
<div
  v-if="showBudgetHistoryModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeBudgetHistoryModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full mx-auto shadow-xl transform transition-all duration-300 ease-out max-h-[80vh] overflow-y-auto"
    :class="showBudgetHistoryModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Budget Plan History</h3>
      <button @click="closeBudgetHistoryModal" class="text-gray-400 hover:text-gray-600">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div v-if="loadingBudgetHistory" class="text-center py-8">
      <svg class="animate-spin h-8 w-8 text-emerald-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-500 mt-2">Loading budget history...</p>
    </div>
    
    <div v-else-if="budgetHistory.length === 0" class="text-center py-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="text-gray-500">No budget history found</p>
    </div>
    
    <div v-else class="space-y-4">
      <div 
        v-for="budget in budgetHistory" 
        :key="budget.id"
        class="border rounded-lg p-4 hover:bg-gray-50"
        :class="{ 'ring-2 ring-blue-500': selectedBudgetPlan && selectedBudgetPlan.id === budget.id }"
        @click="selectBudgetPlan(budget)"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <h4 class="font-medium text-gray-900">{{ budget.name || 'Budget Plan' }}</h4>
            <p class="text-sm text-gray-500">
              {{ formatDate(budget.startDate) }} - {{ formatDate(budget.endDate) }}
            </p>
          </div>
          <div class="flex gap-2">
            <button 
              @click.stop="loadBudgetPlan(budget)"
              class="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"
            >
              Load
            </button>
            <!-- <button 
              @click.stop="updateBudgetPlan(budget.id)"
              class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Update
            </button> -->
            <button 
              @click.stop="deleteBudgetPlan(budget.id)"
              class="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
        
        <div class="text-sm text-gray-600">
          <p>Total Budget: ₱{{ safeToLocaleString(budget.totalBudget || 0) }}</p>
          <p>Categories: {{ Object.keys(budget.limits || {}).length }}</p>
          <p>Created: {{ formatDate(budget.createdAt) }}</p>
        </div>
        
        <!-- Detailed view for selected budget plan -->
        <div v-if="selectedBudgetPlan && selectedBudgetPlan.id === budget.id" class="mt-4 pt-4 border-t border-gray-200">
          <h5 class="font-medium text-gray-800 mb-2">Budget Details</h5>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                  <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                  <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(limit, category) in budget.limits" :key="category">
                  <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ category }}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    ₱{{ safeToLocaleString(limit) }}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    ₱{{ safeToLocaleString(getActualForCategory(category, budget.startDate, budget.endDate)) }}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm font-medium" 
                      :class="getBudgetStatusClass(getActualForCategory(category, budget.startDate, budget.endDate), limit)">
                    {{ getBudgetBalanceForCategory(getActualForCategory(category, budget.startDate, budget.endDate), limit) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Budget Export Modal -->
<div
  v-if="showBudgetExportModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeBudgetExportModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ease-out"
    :class="showBudgetExportModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Export Budget Data</h3>
      <button @click="closeBudgetExportModal" class="text-gray-400 hover:text-gray-600">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="space-y-4">
      <!-- Export Options -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Export Data</label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.currentPeriod"
              class="mr-2"
            >
            <span class="text-sm">Current Budget Period</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.budgetLimits"
              class="mr-2"
            >
            <span class="text-sm">Budget Limits</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.actualSpending"
              class="mr-2"
            >
            <span class="text-sm">Actual Spending</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.budgetProgress"
              class="mr-2"
            >
            <span class="text-sm">Budget Progress</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.budgetHistory"
              class="mr-2"
            >
            <span class="text-sm">Budget History</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="budgetExportOptions.actualSpending"
              class="mr-2"
            >
            <span class="text-sm">Transaction Details</span>
          </label>
        </div>
      </div>
      
      <!-- Export Button -->
      <div class="flex gap-3 pt-4">
        <button 
          @click="exportBudgetToCSV"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
        >
          Export CSV
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Transaction Export Modal -->
<div
  v-if="showTransactionExportModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeTransactionExportModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ease-out"
    :class="showTransactionExportModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Export Transaction Data</h3>
      <button @click="closeTransactionExportModal" class="text-gray-400 hover:text-gray-600">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="space-y-4">
      <!-- Date Range Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Export Range</label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="exportRange" 
              value="all"
              class="mr-2"
            >
            <span class="text-sm">All Data</span>
          </label>
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="exportRange" 
              value="custom"
              class="mr-2"
            >
            <span class="text-sm">Custom Date Range</span>
          </label>
        </div>
      </div>
      
      <!-- Custom Date Range -->
      <div v-if="exportRange === 'custom'" class="space-y-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input 
            type="date" 
            v-model="exportStartDate" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input 
            type="date" 
            v-model="exportEndDate" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
        </div>
      </div>
      
      <!-- Export Buttons -->
      <div class="flex gap-3 pt-4">
        <button 
          @click="exportTransactionsToCSV"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
        >
          Export CSV
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  @click.self="closeModal"
>
  <div 
    class="bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full mx-auto shadow-xl transform transition-all duration-300 ease-out"
    :class="showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ modalTitle }}</h3>
    <p class="text-gray-500 mb-4">{{ modalMessage }}</p>
    <div class="flex justify-end gap-2">
      <button 
        @click="closeModal" 
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
      >
        Cancel
      </button>
      <button 
        @click="handleModalConfirm" 
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
      >
        {{ modalConfirmText }}
      </button>
    </div>
  </div>
</div>

<!-- Toast Notification -->
<div 
  v-if="toast.show" 
  class="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center max-w-sm"
  :class="{
    'bg-green-100 text-green-800 border-l-4 border-green-500': toast.type === 'success',
    'bg-red-100 text-red-800 border-l-4 border-red-500': toast.type === 'error'
  }"
>
  <svg 
    v-if="toast.type === 'success'" 
    class="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  <svg 
    v-if="toast.type === 'error'" 
    class="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
  </svg>
  <span class="text-xs sm:text-sm">{{ toast.message }}</span>
</div>
</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
collection, 
addDoc, 
updateDoc, 
deleteDoc, 
doc,
getDoc,
setDoc, 
onSnapshot, 
query, 
orderBy,
where,
Timestamp ,
getDocs
} from "firebase/firestore";
import { db } from "../../firebase";
import Chart from 'chart.js/auto';

// State
const auth = getAuth();
const transactions = ref([]);
const categories = ref([
"Consulting",
"Utilities",
"Nutrients",
"Equipment",
"Maintenance",
"Labor",
"Marketing",
"Other"
]);
const amount = ref("");
const type = ref("income");
const category = ref(categories.value[0]);
const notes = ref("");
const transactionDate = ref(new Date().toISOString().split('T')[0]);
const chartCanvas = ref(null);
const trendChartCanvas = ref(null);
const incomeDistributionCanvas = ref(null);
const expenseDistributionCanvas = ref(null);
const forecastChartCanvas = ref(null);
const loading = ref(false);
const chartLoading = ref(false);
const incomeChartLoading = ref(false);
const expenseChartLoading = ref(false);
const forecastChartLoading = ref(false);
const loadingBudget = ref(false);
const loadingBudgetHistory = ref(false);
const showModal = ref(false);
const showEditModal = ref(false);
const showCategoryModal = ref(false);
const showBudgetExportModal = ref(false);
const showTransactionExportModal = ref(false);
const showBudgetHistoryModal = ref(false);
const modalType = ref("");
const selectedTransaction = ref(null);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const sortColumn = ref("date");
const sortDirection = ref("desc");
const chartType = ref("line");
const incomeChartType = ref("pie");
const expenseChartType = ref("pie");
const cumulativeMode = ref(false);
const formErrors = ref({});
const toast = ref({ show: false, message: '', type: '' });
const username = ref("");
const currentAnalyticsTab = ref('overview');
const selectedDateRange = ref('month');
const customStartDate = ref(new Date().toISOString().split('T')[0]);
const customEndDate = ref(new Date().toISOString().split('T')[0]);
const startDate = ref(new Date());
const endDate = ref(new Date());
const budgetStartDate = ref(new Date().toISOString().split('T')[0]);
const budgetEndDate = ref(new Date().toISOString().split('T')[0]);
const budgetLimits = ref({});
const budgetCollapsed = ref(false);
const forecastStartDate = ref(new Date().toISOString().split('T')[0]);
const forecastEndDate = ref(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const newCategoryName = ref('');
const exportRange = ref('all');
const exportStartDate = ref(new Date().toISOString().split('T')[0]);
const exportEndDate = ref(new Date().toISOString().split('T')[0]);
const budgetHistory = ref([]);
const budgetExportOptions = ref({
  currentPeriod: true,
  budgetLimits: true,
  actualSpending: true,
  budgetProgress: true,
  budgetHistory: false
});

// Edit form
const editForm = ref({
id: null,
amount: '',
type: 'income',
category: '',
date: '',
notes: ''
});

let chartInstance = null;
let trendChartInstance = null;
let incomeChartInstance = null;
let expenseChartInstance = null;
let forecastChartInstance = null;

// Router
const router = useRouter();
const route = useRoute();

// Date Ranges
const dateRanges = [
{ id: 'week', name: 'This Week' },
{ id: 'month', name: 'This Month' },
{ id: 'year', name: 'This Year' },
{ id: 'custom', name: 'Custom Range' }
];

// Computed Properties
const filteredTransactions = computed(() => {
let filtered = [...transactions.value];

if (searchQuery.value) {
  const query = searchQuery.value.toLowerCase();
  filtered = filtered.filter(t => 
    t.category.toLowerCase().includes(query) ||
    t.notes?.toLowerCase().includes(query) ||
    t.amount.toString().includes(query)
  );
}

// Apply sorting
filtered.sort((a, b) => {
  let aVal = a[sortColumn.value];
  let bVal = b[sortColumn.value];

  if (sortColumn.value === 'date') {
    aVal = a.date.seconds;
    bVal = b.date.seconds;
  }

  if (sortDirection.value === 'asc') {
    return aVal > bVal ? 1 : -1;
  }
  return aVal < bVal ? 1 : -1;
});

return filtered;
});

const paginatedTransactions = computed(() => {
const start = (currentPage.value - 1) * itemsPerPage;
const end = start + itemsPerPage;
const totalItems = filteredTransactions.value.length;

// Ensure currentPage does not exceed totalPages
if (start >= totalItems && totalItems > 0) {
  currentPage.value = Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() => 
Math.ceil(filteredTransactions.value.length / itemsPerPage)
);

const totalIncome = computed(() => {
return transactions.value
  .filter(t => {
    const date = new Date(t.date.seconds * 1000);
    return t.type === 'income' && date >= startDate.value && date <= endDate.value;
  })
  .reduce((sum, t) => sum + t.amount, 0);
});

const totalExpenses = computed(() => {
return transactions.value
  .filter(t => {
    const date = new Date(t.date.seconds * 1000);
    return t.type === 'expense' && date >= startDate.value && date <= endDate.value;
  })
  .reduce((sum, t) => sum + t.amount, 0);
});

const netProfit = computed(() => totalIncome.value - totalExpenses.value);

const savingsRate = computed(() => {
if (totalIncome.value === 0) return 0;
return (netProfit.value / totalIncome.value) * 100;
});

// Growth rates
const incomeGrowth = computed(() => {
const currentMonthIncome = getMonthlyTotal('income', new Date().getMonth());
const lastMonthIncome = getMonthlyTotal('income', new Date().getMonth() - 1);

if (lastMonthIncome === 0) return 100;
return ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
});

const expenseGrowth = computed(() => {
const currentMonthExpense = getMonthlyTotal('expense', new Date().getMonth());
const lastMonthExpense = getMonthlyTotal('expense', new Date().getMonth() - 1);

if (lastMonthExpense === 0) return 100;
return ((currentMonthExpense - lastMonthExpense) / lastMonthExpense) * 100;
});

const profitGrowth = computed(() => {
const currentMonthProfit = getMonthlyTotal('income', new Date().getMonth()) - getMonthlyTotal('expense', new Date().getMonth());
const lastMonthProfit = getMonthlyTotal('income', new Date().getMonth() - 1) - getMonthlyTotal('expense', new Date().getMonth() - 1);

if (lastMonthProfit === 0) return 100;
return ((currentMonthProfit - lastMonthProfit) / Math.abs(lastMonthProfit)) * 100;
});

const savingsRateGrowth = computed(() => {
const currentMonthIncome = getMonthlyTotal('income', new Date().getMonth());
const lastMonthIncome = getMonthlyTotal('income', new Date().getMonth() - 1);
const currentMonthExpense = getMonthlyTotal('expense', new Date().getMonth());
const lastMonthExpense = getMonthlyTotal('expense', new Date().getMonth() - 1);

const currentSavingsRate = currentMonthIncome === 0 ? 0 : ((currentMonthIncome - currentMonthExpense) / currentMonthIncome) * 100;
const lastSavingsRate = lastMonthIncome === 0 ? 0 : ((lastMonthIncome - lastMonthExpense) / lastMonthIncome) * 100;

if (lastSavingsRate === 0) return 100;
return currentSavingsRate - lastSavingsRate;
});

// Budget data
const budgetData = computed(() => {
const data = {};
const budgetStart = new Date(budgetStartDate.value);
const budgetEnd = new Date(budgetEndDate.value);
budgetEnd.setHours(23, 59, 59, 999);

categories.value.forEach(cat => {
  const actual = transactions.value
    .filter(t => {
      const transactionDate = new Date(t.date.seconds * 1000);
      return t.type === 'expense' && 
             t.category === cat && 
             transactionDate >= budgetStart && 
             transactionDate <= budgetEnd;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  data[cat] = {
    actual,
    limit: budgetLimits.value[cat] || 0
  };
});

return data;
});

// Track selected budget plan in budget history modal
const selectedBudgetPlan = ref(null);

const selectBudgetPlan = (budgetPlan) => {
  selectedBudgetPlan.value = budgetPlan;
};

// Get actual expenses for a category within a date range
const getActualForCategory = (category, startDate, endDate) => {
  const start = new Date(startDate.seconds * 1000);
  const end = new Date(endDate.seconds * 1000);
  end.setHours(23, 59, 59, 999);

  return transactions.value
    .filter(t => {
      const transactionDate = new Date(t.date.seconds * 1000);
      return t.type === 'expense' && 
             t.category === category && 
             transactionDate >= start && 
             transactionDate <= end;
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

// Get budget balance for a category (limit - actual)
const getBudgetBalanceForCategory = (actual, limit) => {
  if (!limit || limit === 0) return '₱0';
  const balance = limit - actual;
  return `₱${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const totalBudgetLimit = computed(() => {
return Object.values(budgetLimits.value).reduce((sum, val) => sum + (Number(val) || 0), 0);
});

const getTotalExpensesInBudgetPeriod = computed(() => {
  // Calculate total expenses within the current budget period
  const budgetStart = new Date(budgetStartDate.value);
  const budgetEnd = new Date(budgetEndDate.value);
  budgetEnd.setHours(23, 59, 59, 999);

  return transactions.value
    .filter(t => {
      const transactionDate = new Date(t.date.seconds * 1000);
      return t.type === 'expense' && 
             transactionDate >= budgetStart && 
             transactionDate <= budgetEnd;
    })
    .reduce((sum, t) => sum + t.amount, 0);
});

const getBudgetBalanceAmount = computed(() => {
  return totalBudgetLimit.value - getTotalExpensesInBudgetPeriod.value;
});

// Forecast data
const forecastedIncome = computed(() => {
const days = Math.ceil((new Date(forecastEndDate.value) - new Date(forecastStartDate.value)) / (1000 * 60 * 60 * 24));
const dailyAverage = getDailyAverage('income');
return dailyAverage * days;
});

const forecastedExpenses = computed(() => {
const days = Math.ceil((new Date(forecastEndDate.value) - new Date(forecastStartDate.value)) / (1000 * 60 * 60 * 24));
const dailyAverage = getDailyAverage('expense');
return dailyAverage * days;
});

const forecastedProfit = computed(() => forecastedIncome.value - forecastedExpenses.value);

const forecastedIncomeGrowth = computed(() => {
if (totalIncome.value === 0) return 100;
return ((forecastedIncome.value - totalIncome.value) / totalIncome.value) * 100;
});

const forecastedExpenseGrowth = computed(() => {
if (totalExpenses.value === 0) return 100;
return ((forecastedExpenses.value - totalExpenses.value) / totalExpenses.value) * 100;
});

const forecastedProfitGrowth = computed(() => {
if (netProfit.value === 0) return 100;
return ((forecastedProfit.value - netProfit.value) / Math.abs(netProfit.value)) * 100;
});

// Modal computed properties
const modalTitle = computed(() => {
switch (modalType.value) {
  case 'delete': return 'Delete Transaction';
  case 'deleteCategory': return 'Delete Category';
  case 'deleteBudgetPlan': return 'Delete Budget Plan';
  default: return '';
}
});

const modalMessage = computed(() => {
if (!selectedTransaction.value && modalType.value !== 'deleteCategory' && modalType.value !== 'deleteBudgetPlan') return '';

switch (modalType.value) {
  case 'delete':
    return `Are you sure you want to delete this ${selectedTransaction.value.type} transaction of ₱${selectedTransaction.value.amount.toLocaleString()}?`;
  case 'deleteCategory':
    return `Are you sure you want to delete the category "${selectedTransaction.value}"? This action cannot be undone.`;
  case 'deleteBudgetPlan':
    return `Are you sure you want to delete this budget plan? This action cannot be undone.`;
  default:
    return '';
}
});

const modalConfirmText = computed(() => {
switch (modalType.value) {
  case 'delete': return 'Delete';
  case 'deleteCategory': return 'Delete';
  case 'deleteBudgetPlan': return 'Delete';
  default: return 'Confirm';
}
});

// Methods
const validateForm = () => {
formErrors.value = {};

if (!amount.value || isNaN(amount.value) || amount.value <= 0) {
  formErrors.value.amount = 'Please enter a valid amount';
  return false;
}

return true;
};

const showSuccess = (message) => {
toast.value = { show: true, message, type: 'success' };
setTimeout(() => {
  toast.value.show = false;
}, 3000);
};

const showError = (message) => {
toast.value = { show: true, message, type: 'error' };
setTimeout(() => {
  toast.value.show = false;
}, 3000);
};

const fetchFilteredTransactions = async () => {
updateAllCharts();
};

const fetchTransactions = async () => {
try {
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to manage your transactions');
    return;
  }

  const transactionsRef = collection(db, 'users', user.uid, 'transactions');
  const q = query(transactionsRef, orderBy('date', 'desc'));

  onSnapshot(q, (snapshot) => {
    transactions.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      deleting: false
    }));
    updateAllCharts();
  }, (error) => {
    console.error("Error fetching transactions:", error);
    showError('Error loading transactions. Please try again.');
  });
} catch (error) {
  console.error("Error in fetchTransactions:", error);
  showError('Error connecting to database. Please try again.');
}
};

const addTransaction = async () => {
if (!validateForm()) return;

loading.value = true;
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to add transactions');
  loading.value = false;
  return;
}

try {
  await addDoc(collection(db, 'users', user.uid, 'transactions'), {
    amount: parseFloat(amount.value),
    type: type.value,
    category: category.value,
    date: Timestamp.fromDate(new Date(transactionDate.value)),
    notes: notes.value || '',
  });

  resetForm();
  showSuccess('Transaction added successfully');
} catch (error) {
  showError('Error adding transaction. Please try again.');
} finally {
  loading.value = false;
}
};

const updateTransaction = async () => {
if (!editForm.value.amount || editForm.value.amount <= 0) {
  showError('Please enter a valid amount');
  return;
}

loading.value = true;
const user = auth.currentUser;
if (!user || !editForm.value.id) {
  showError('Please sign in to update transactions');
  loading.value = false;
  return;
}

try {
  await updateDoc(
    doc(db, 'users', user.uid, 'transactions', editForm.value.id),
    {
      amount: parseFloat(editForm.value.amount),
      type: editForm.value.type,
      category: editForm.value.category,
      date: Timestamp.fromDate(new Date(editForm.value.date)),
      notes: editForm.value.notes || '',
      updatedAt: Timestamp.now()
    }
  );

  closeEditModal();
  showSuccess('Transaction updated successfully');
} catch (error) {
  showError('Error updating transaction. Please try again.');
} finally {
  loading.value = false;
}
};

const deleteTransaction = async (transaction) => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to delete transactions');
  return;
}

const index = transactions.value.findIndex(t => t.id === transaction.id);
if (index !== -1) {
  transactions.value[index].deleting = true;
}

try {
  await deleteDoc(
    doc(db, 'users', user.uid, 'transactions', transaction.id)
  );
  showSuccess('Transaction deleted successfully');
} catch (error) {
  showError('Error deleting transaction. Please try again.');
  if (index !== -1) {
    transactions.value[index].deleting = false;
  }
}
};

// Budget Methods
const saveBudgetLimit = async (category) => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to save budget limits');
  return;
}

try {
  const budgetKey = `${budgetStartDate.value}_${budgetEndDate.value}`;
  const docRef = doc(db, 'users', user.uid, 'budgets', budgetKey);
  
  // Save individual category limit
  await setDoc(docRef, { 
    [category]: budgetLimits.value[category] || 0,
    startDate: Timestamp.fromDate(new Date(budgetStartDate.value)),
    endDate: Timestamp.fromDate(new Date(budgetEndDate.value)),
    updatedAt: Timestamp.now()
  }, { merge: true });
  
  showSuccess(`Budget limit for ${category} saved`);
} catch (error) {
  console.error("Error saving budget limit:", error);
  showError('Failed to save budget limit. Please try again.');
}
};

const loadBudgetLimits = async () => {
const user = auth.currentUser;
if (!user) return;

try {
  loadingBudget.value = true;
  const budgetKey = `${budgetStartDate.value}_${budgetEndDate.value}`;
  const docRef = doc(db, 'users', user.uid, 'budgets', budgetKey);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const savedLimits = docSnap.data();
    categories.value.forEach(cat => {
      budgetLimits.value[cat] = savedLimits[cat] || 0;
    });
  } else {
    categories.value.forEach(cat => {
      budgetLimits.value[cat] = 0;
    });
  }
} catch (error) {
  console.error("Error loading budget limits:", error);
  showError('Failed to load budget limits');
} finally {
  loadingBudget.value = false;
}
};

const saveBudgetPlan = async () => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to save budget plans');
  return;
}

try {
  const budgetPlan = {
    name: `Budget Plan - ${budgetStartDate.value} to ${budgetEndDate.value}`,
    startDate: Timestamp.fromDate(new Date(budgetStartDate.value)),
    endDate: Timestamp.fromDate(new Date(budgetEndDate.value)),
    limits: { ...budgetLimits.value },
    totalBudget: totalBudgetLimit.value,
    createdAt: Timestamp.now(),
    userId: user.uid
  };

  await addDoc(collection(db, 'users', user.uid, 'budget_plans'), budgetPlan);
  showSuccess('Budget plan saved successfully');
  resetBudgetLimitsModified(); // Reset modification tracker
  loadBudgetHistory();
} catch (error) {
  console.error("Error saving budget plan:", error);
  showError('Failed to save budget plan. Please try again.');
}
};

// Add function to update an existing budget plan
const updateBudgetPlan = async (planId) => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to update budget plans');
  return;
}

try {
  const budgetPlanRef = doc(db, 'users', user.uid, 'budget_plans', planId);
  
  const updatedPlan = {
    name: `Budget Plan - ${budgetStartDate.value} to ${budgetEndDate.value}`,
    startDate: Timestamp.fromDate(new Date(budgetStartDate.value)),
    endDate: Timestamp.fromDate(new Date(budgetEndDate.value)),
    limits: { ...budgetLimits.value },
    totalBudget: totalBudgetLimit.value,
    updatedAt: Timestamp.now()
  };

  await setDoc(budgetPlanRef, updatedPlan, { merge: true });
  showSuccess('Budget plan updated successfully');
  resetBudgetLimitsModified(); // Reset modification tracker
  loadBudgetHistory();
} catch (error) {
  console.error("Error updating budget plan:", error);
  showError('Failed to update budget plan. Please try again.');
}
};

const loadBudgetHistory = async () => {
const user = auth.currentUser;
if (!user) return;

try {
  loadingBudgetHistory.value = true;
  const budgetPlansRef = collection(db, 'users', user.uid, 'budget_plans');
  const q = query(budgetPlansRef, orderBy('createdAt', 'desc'));
  
  const snapshot = await getDocs(q);
  budgetHistory.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
} catch (error) {
  console.error("Error loading budget history:", error);
  showError('Failed to load budget history');
} finally {
  loadingBudgetHistory.value = false;
}
};

let ignoreBudgetLimitsWatch = false;

// Track if budget limits have been modified since last load/save
const budgetLimitsModified = ref(false);

// Track if we're currently editing an existing budget plan
const currentEditingPlanId = ref(null);

// Watch for changes to budget limits to track modifications
watch(budgetLimits, () => {
  if (ignoreBudgetLimitsWatch) return;
  budgetLimitsModified.value = true;
}, { deep: true });

const loadBudgetPlan = (budgetPlan) => {
  // Check if current budget limits have been modified
  if (budgetLimitsModified.value) {
    showSuccess('You have unsaved changes. Please save your current budget plan before loading another one.');
    return;
  }
  
  budgetStartDate.value = new Date(budgetPlan.startDate.seconds * 1000).toISOString().split('T')[0];
  budgetEndDate.value = new Date(budgetPlan.endDate.seconds * 1000).toISOString().split('T')[0];
  
  // Only load categories that existed when the plan was saved
  ignoreBudgetLimitsWatch = true;
  budgetLimits.value = { ...budgetPlan.limits };
  ignoreBudgetLimitsWatch = false;
  
  // Reset modification tracker
  budgetLimitsModified.value = false;
  currentEditingPlanId.value = budgetPlan.id; // Track which plan we're editing
  
  closeBudgetHistoryModal();
  showSuccess('Budget plan loaded successfully');
};

// Add a function to reset the modification tracker when saving
const resetBudgetLimitsModified = () => {
  budgetLimitsModified.value = false;
  currentEditingPlanId.value = null;
};

// Update the currently loaded plan
const updateCurrentPlan = async () => {
  if (currentEditingPlanId.value) {
    await updateBudgetPlan(currentEditingPlanId.value);
  } else {
    showError('No plan is currently loaded to update.');
  }
};

// Handle saving budget plan - either create new or update existing
const handleSaveBudgetPlan = async () => {
  if (currentEditingPlanId.value) {
    // Update existing plan
    await updateBudgetPlan(currentEditingPlanId.value);
  } else {
    // Create new plan
    await saveBudgetPlan();
  }
};

const deleteBudgetPlan = async (planId) => {
modalType.value = 'deleteBudgetPlan';
selectedTransaction.value = planId;
showModal.value = true;
};

const confirmDeleteBudgetPlan = async (planId) => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to delete budget plans');
  return;
}

try {
  await deleteDoc(doc(db, 'users', user.uid, 'budget_plans', planId));
  showSuccess('Budget plan deleted successfully');
  loadBudgetHistory();
} catch (error) {
  console.error("Error deleting budget plan:", error);
  showError('Failed to delete budget plan. Please try again.');
}
};

// Chart Methods
const updateAllCharts = async () => {
updateTrendChart();
updateIncomeDistributionChart();
updateExpenseDistributionChart();
updateForecastChart();
};

const updateTrendChart = async () => {
chartLoading.value = true;
await nextTick();

if (!trendChartCanvas.value) {
  chartLoading.value = false;
  return;
}

const ctx = trendChartCanvas.value.getContext('2d');
const trendData = getTrendData();

if (trendChartInstance) {
  trendChartInstance.destroy();
}

const config = {
  type: chartType.value,
  data: {
    labels: trendData.labels,
    datasets: [
      {
        label: 'Income',
        data: trendData.income,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(16, 185, 129)'
      },
      {
        label: 'Expenses',
        data: trendData.expenses,
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(244, 63, 94)'
      },
      {
        label: 'Net Profit',
        data: trendData.profit,
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(14, 165, 233)'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: value => `₱${value.toLocaleString()}`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `₱${context.parsed.y.toLocaleString()}`;
            }
            return label;
          }
        }
      }
    }
  }
};

trendChartInstance = new Chart(ctx, config);
chartLoading.value = false;
};

const updateIncomeDistributionChart = async () => {
incomeChartLoading.value = true;
await nextTick();

if (!incomeDistributionCanvas.value) {
  incomeChartLoading.value = false;
  return;
}

const ctx = incomeDistributionCanvas.value.getContext('2d');
const distributionData = getCategoryDistribution('income');

if (incomeChartInstance) {
  incomeChartInstance.destroy();
}

const config = {
  type: incomeChartType.value,
  data: {
    labels: distributionData.labels,
    datasets: [
      {
        label: 'Income',
        data: distributionData.values,
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(217, 70, 239, 0.7)',
          'rgba(79, 70, 229, 0.7)'
        ],
        borderColor: 'white',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              const value = incomeChartType.value === 'pie' ? context.parsed : context.parsed.y;
              label += `₱${value.toLocaleString()}`;
            }
            return label;
          }
        }
      }
    }
  }
};

incomeChartInstance = new Chart(ctx, config);
incomeChartLoading.value = false;
};

const updateExpenseDistributionChart = async () => {
expenseChartLoading.value = true;
await nextTick();

if (!expenseDistributionCanvas.value) {
  expenseChartLoading.value = false;
  return;
}

const ctx = expenseDistributionCanvas.value.getContext('2d');
const distributionData = getCategoryDistribution('expense');

if (expenseChartInstance) {
  expenseChartInstance.destroy();
}

const config = {
  type: expenseChartType.value,
  data: {
    labels: distributionData.labels,
    datasets: [
      {
        label: 'Expenses',
        data: distributionData.values,
        backgroundColor: [
          'rgba(244, 63, 94, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(217, 70, 239, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(79, 70, 229, 0.7)'
        ],
        borderColor: 'white',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              const value = expenseChartType.value === 'pie' ? context.parsed : context.parsed.y;
              label += `₱${value.toLocaleString()}`;
            }
            return label;
          }
        }
      }
    }
  }
};

expenseChartInstance = new Chart(ctx, config);
expenseChartLoading.value = false;
};

const updateForecastChart = async () => {
forecastChartLoading.value = true;
await nextTick();

if (!forecastChartCanvas.value) {
  forecastChartLoading.value = false;
  return;
}

const ctx = forecastChartCanvas.value.getContext('2d');
const forecastData = getForecastData();

if (forecastChartInstance) {
  forecastChartInstance.destroy();
}

const config = {
  type: 'line',
  data: {
    labels: forecastData.labels,
    datasets: [
      {
        label: 'Income',
        data: forecastData.income,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: forecastData.expenses,
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Net Profit',
        data: forecastData.profit,
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: value => `₱${value.toLocaleString()}`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `₱${context.parsed.y.toLocaleString()}`;
            }
            return label;
          }
        }
      }
    }
  }
};

forecastChartInstance = new Chart(ctx, config);
forecastChartLoading.value = false;
};

const toggleChartType = () => {
chartType.value = chartType.value === 'line' ? 'bar' : 'line';
updateTrendChart();
};

const toggleIncomeChartType = () => {
incomeChartType.value = incomeChartType.value === 'pie' ? 'bar' : 'pie';
updateIncomeDistributionChart();
};

const toggleExpenseChartType = () => {
expenseChartType.value = expenseChartType.value === 'pie' ? 'bar' : 'pie';
updateExpenseDistributionChart();
};

const toggleCumulativeMode = () => {
cumulativeMode.value = !cumulativeMode.value;
updateTrendChart();
};

// Date Range Methods
const setDateRange = (rangeId) => {
selectedDateRange.value = rangeId;

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
let start;

switch (rangeId) {
  case 'week': {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    startDate.value = start;
    endDate.value = today;
    break;
  }
  case 'month': {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    startDate.value = start;
    endDate.value = today;
    break;
  }
  case 'quarter': {
    const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
    start = new Date(now.getFullYear(), quarterStartMonth, 1);
    start.setHours(0, 0, 0, 0);
    startDate.value = start;
    endDate.value = today;
    break;
  }
  case 'year': {
    start = new Date(now.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    startDate.value = start;
    endDate.value = today;
    break;
  }
  case 'custom':
    break;
}

fetchFilteredTransactions();
};

const applyCustomDateRange = () => {
if (customStartDate.value && customEndDate.value) {
  const start = new Date(customStartDate.value);
  start.setHours(0, 0, 0, 0);
  const end = new Date(customEndDate.value);
  end.setHours(23, 59, 59, 999);
  if (start > end) {
    showError('Start date cannot be later than end date');
    return;
  }
  startDate.value = start;
  endDate.value = end;
  fetchFilteredTransactions();
}
};

const addCategory = async () => {
if (!newCategoryName.value.trim()) return;

if (categories.value.includes(newCategoryName.value.trim())) {
  showError('Category already exists');
  return;
}

const user = auth.currentUser;
if (!user) {
  showError('Please sign in to add categories');
  return;
}

try {
  const newCategory = newCategoryName.value.trim();
  categories.value.push(newCategory);
  budgetLimits.value[newCategory] = 0;
  
  const docRef = doc(db, 'users', user.uid, 'settings', 'categories');
  await setDoc(docRef, { categories: categories.value }, { merge: true });
  
  // Add this category to all existing budget plans with a default limit of 0
  await addCategoryToAllBudgetPlans(newCategory, user.uid);
  
  newCategoryName.value = '';
  showSuccess('Category added successfully');
} catch (error) {
  console.error("Error adding category:", error);
  showError('Failed to add category. Please try again.');
}
};

// Add a new category to all existing budget plans
const addCategoryToAllBudgetPlans = async (categoryName, userId) => {
try {
  const budgetPlansRef = collection(db, 'users', userId, 'budget_plans');
  const snapshot = await getDocs(budgetPlansRef);
  
  const updatePromises = snapshot.docs.map(async (docSnap) => {
    const planRef = doc(db, 'users', userId, 'budget_plans', docSnap.id);
    const planData = docSnap.data();
    
    // Add the new category to this plan's limits if it doesn't already exist
    if (!planData.limits.hasOwnProperty(categoryName)) {
      planData.limits[categoryName] = 0;
      return setDoc(planRef, planData, { merge: true });
    }
    return Promise.resolve();
  });
  
  await Promise.all(updatePromises);
} catch (error) {
  console.error("Error adding category to budget plans:", error);
  // We don't show an error to the user here as the main category addition was successful
}
};

const confirmDeleteCategory = (categoryName) => {
modalType.value = 'deleteCategory';
selectedTransaction.value = categoryName;
showModal.value = true;
};

const deleteCategory = async (categoryName) => {
const user = auth.currentUser;
if (!user) {
  showError('Please sign in to delete categories');
  return;
}

// Check if this category is used in any budget plans
const isCategoryUsed = await isCategoryUsedInBudgetPlans(categoryName, user.uid);

if (isCategoryUsed) {
  // Show warning that category is used in budget plans
  showError(`This category is used in existing budget plans. Deleting it will remove it from all plans. Are you sure you want to continue?`);
  // For now, we'll proceed with deletion but in a real implementation, 
  // we might want to show a confirmation modal
}

try {
  const index = categories.value.indexOf(categoryName);
  if (index > -1) {
    categories.value.splice(index, 1);
    delete budgetLimits.value[categoryName];
    
    const docRef = doc(db, 'users', user.uid, 'settings', 'categories');
    await setDoc(docRef, { categories: categories.value }, { merge: true });
    
    // Remove this category from all budget plans
    await removeCategoryFromAllBudgetPlans(categoryName, user.uid);
    
    showSuccess('Category deleted successfully');
  }
} catch (error) {
  console.error("Error deleting category:", error);
  showError('Failed to delete category. Please try again.');
}
};

// Check if a category is used in any budget plans
const isCategoryUsedInBudgetPlans = async (categoryName, userId) => {
try {
  const budgetPlansRef = collection(db, 'users', userId, 'budget_plans');
  const snapshot = await getDocs(budgetPlansRef);
  
  for (const docSnap of snapshot.docs) {
    const planData = docSnap.data();
    if (planData.limits && planData.limits.hasOwnProperty(categoryName)) {
      return true;
    }
  }
  return false;
} catch (error) {
  console.error("Error checking category usage in budget plans:", error);
  return false;
}
};

// Remove a category from all budget plans
const removeCategoryFromAllBudgetPlans = async (categoryName, userId) => {
try {
  const budgetPlansRef = collection(db, 'users', userId, 'budget_plans');
  const snapshot = await getDocs(budgetPlansRef);
  
  const updatePromises = snapshot.docs.map(async (docSnap) => {
    const planRef = doc(db, 'users', userId, 'budget_plans', docSnap.id);
    const planData = docSnap.data();
    
    // Remove the category from this plan's limits if it exists
    if (planData.limits && planData.limits.hasOwnProperty(categoryName)) {
      delete planData.limits[categoryName];
      return setDoc(planRef, planData, { merge: true });
    }
    return Promise.resolve();
  });
  
  await Promise.all(updatePromises);
} catch (error) {
  console.error("Error removing category from budget plans:", error);
  // We don't show an error to the user here as the main category deletion was successful
}
};

// Export Functions
const exportBudgetToCSV = () => {
let csv = 'Budget Data Export\n\n';

// Add date range information if exporting a specific range
if (exportRange.value === 'custom') {
  csv += `Export Date Range,${exportStartDate.value} to ${exportEndDate.value}\n`;
} else {
  csv += 'Export Date Range,All Data\n';
}
csv += '\n';

if (budgetExportOptions.value.currentPeriod) {
  csv += 'Current Budget Period\n';
  csv += `Period,${budgetStartDate.value} to ${budgetEndDate.value}\n`;
  csv += `Total Budget,₱${safeToLocaleString(totalBudgetLimit.value)}\n\n`;
}

if (budgetExportOptions.value.budgetLimits || budgetExportOptions.value.actualSpending || budgetExportOptions.value.budgetProgress) {
  csv += 'Budget Details\n';
  csv += 'Category,Budget Limit,Actual Spending,Remaining,Progress %\n';
  
  categories.value.forEach(cat => {
    const actual = budgetData.value[cat]?.actual || 0;
    const limit = budgetData.value[cat]?.limit || 0;
    const remaining = limit - actual;
    const progress = limit > 0 ? ((actual / limit) * 100).toFixed(1) : '0';
    
    csv += `${cat},${limit},${actual},${remaining},${progress}%\n`;
  });
  csv += '\n';
}

if (budgetExportOptions.value.budgetHistory && budgetHistory.value.length > 0) {
  csv += 'Budget History\n';
  csv += 'Plan Name,Start Date,End Date,Total Budget,Created Date\n';
  
  budgetHistory.value.forEach(plan => {
    const startDate = formatDate(plan.startDate);
    const endDate = formatDate(plan.endDate);
    const createdDate = formatDate(plan.createdAt);
    csv += `${plan.name},${startDate},${endDate},${plan.totalBudget || 0},${createdDate}\n`;
  });
  csv += '\n';
}

// Add transaction details if requested
if (budgetExportOptions.value.actualSpending) {
  csv += 'Transaction Details\n';
  csv += 'Date,Category,Amount,Notes\n';
  
  // Filter transactions based on export range
  let filteredTransactions = transactions.value;
  if (exportRange.value === 'custom') {
    const start = new Date(exportStartDate.value);
    const end = new Date(exportEndDate.value);
    end.setHours(23, 59, 59, 999);
    
    filteredTransactions = transactions.value.filter(t => {
      const transactionDate = new Date(t.date.seconds * 1000);
      return transactionDate >= start && transactionDate <= end;
    });
  }
  
  // Only include expense transactions for budget analysis
  const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
  
  expenseTransactions.forEach(t => {
    const date = formatDate(t.date);
    const notes = (t.notes || '').replace(/,/g, ';').replace(/"/g, '""');
    csv += `${date},${t.category},${t.amount},"${notes}"\n`;
  });
  csv += '\n';
}

// Create and download CSV file
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `Budget-Data-${new Date().toISOString().split('T')[0]}.csv`;
a.click();
URL.revokeObjectURL(url);

showSuccess('Budget data exported to CSV successfully');
closeBudgetExportModal();
};

const exportTransactionsToCSV = () => {
let dataToExport = transactions.value;

if (exportRange.value === 'custom') {
  const start = new Date(exportStartDate.value);
  const end = new Date(exportEndDate.value);
  end.setHours(23, 59, 59, 999);
  
  dataToExport = transactions.value.filter(t => {
    const transactionDate = new Date(t.date.seconds * 1000);
    return transactionDate >= start && transactionDate <= end;
  });
}

// Transaction Data Section
let csv = 'Transaction Data\n';
csv += 'Date,Type,Category,Amount,Notes\n';
dataToExport.forEach(t => {
  const date = formatDate(t.date);
  const notes = (t.notes || '').replace(/,/g, ';').replace(/"/g, '""');
  csv += `${date},${t.type},${t.category},${t.amount},"${notes}"\n`;
});

// Category Summary Section
csv += '\nCategory Summary\n';
csv += 'Category,Income,Expenses,Net\n';

const categorySummary = {};
categories.value.forEach(cat => {
  categorySummary[cat] = { income: 0, expense: 0 };
});

dataToExport.forEach(t => {
  if (categorySummary[t.category]) {
    categorySummary[t.category][t.type] += t.amount;
  }
});

Object.entries(categorySummary).forEach(([cat, totals]) => {
  const net = totals.income - totals.expense;
  csv += `${cat},${totals.income},${totals.expense},${net}\n`;
});

// Financial Summary Section
const totalIncomeSum = dataToExport.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpenseSum = dataToExport.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

csv += '\nFinancial Summary\n';
csv += 'Metric,Amount\n';
csv += `Total Income,${totalIncomeSum}\n`;
csv += `Total Expenses,${totalExpenseSum}\n`;
csv += `Net Profit,${totalIncomeSum - totalExpenseSum}\n`;

// Create and download CSV file
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `Transaction-Data-${new Date().toISOString().split('T')[0]}.csv`;
a.click();
URL.revokeObjectURL(url);

showSuccess('Transaction data exported to CSV successfully');
closeTransactionExportModal();
};

// Utility Methods
const getTrendData = () => {
const filteredTransactions = transactions.value.filter(t => {
  const date = new Date(t.date.seconds * 1000);
  return date >= startDate.value && date <= endDate.value;
});

const diffDays = Math.ceil((endDate.value - startDate.value) / (1000 * 60 * 60 * 24));
let groupBy = 'day';

if (diffDays > 90) {
  groupBy = 'month';
} else if (diffDays > 14) {
  groupBy = 'week';
}

const groups = {};
let labels = [];

if (groupBy === 'day') {
  for (let d = new Date(startDate.value); d <= endDate.value; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split('T')[0];
    groups[key] = { income: 0, expenses: 0 };
    labels.push(d.toLocaleDateString('default', { month: 'short', day: 'numeric' }));
  }
} else if (groupBy === 'week') {
  const startWeek = new Date(startDate.value);
  startWeek.setDate(startWeek.getDate() - startWeek.getDay());
  
  for (let d = new Date(startWeek); d <= endDate.value; d.setDate(d.getDate() + 7)) {
    const endOfWeek = new Date(d);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    const key = `${d.toISOString().split('T')[0]}_${endOfWeek.toISOString().split('T')[0]}`;
    groups[key] = { income: 0, expenses: 0 };
    labels.push(`${d.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`);
  }
} else if (groupBy === 'month') {
  const startMonth = new Date(startDate.value.getFullYear(), startDate.value.getMonth(), 1);
  
  for (let d = new Date(startMonth); d <= endDate.value; d.setMonth(d.getMonth() + 1)) {
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    groups[key] = { income: 0, expenses: 0 };
    labels.push(d.toLocaleDateString('default', { month: 'short', year: 'numeric' }));
  }
}

filteredTransactions.forEach(t => {
  const date = new Date(t.date.seconds * 1000);
  let key;
  
  if (groupBy === 'day') {
    key = date.toISOString().split('T')[0];
  } else if (groupBy === 'week') {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    key = `${startOfWeek.toISOString().split('T')[0]}_${endOfWeek.toISOString().split('T')[0]}`;
  } else if (groupBy === 'month') {
    key = `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  
  if (groups[key]) {
    if (t.type === 'income') {
      groups[key].income += t.amount;
    } else {
      groups[key].expenses += t.amount;
    }
  }
});

const keys = Object.keys(groups);
let income = keys.map(key => groups[key].income);
let expenses = keys.map(key => groups[key].expenses);

if (cumulativeMode.value) {
  income = income.reduce((acc, val, i) => {
    acc.push((acc[i-1] || 0) + val);
    return acc;
  }, []);
  
  expenses = expenses.reduce((acc, val, i) => {
    acc.push((acc[i-1] || 0) + val);
    return acc;
  }, []);
}

const profit = income.map((val, i) => val - expenses[i]);

return { labels, income, expenses, profit };
};

const getCategoryDistribution = (type) => {
const filteredTransactions = transactions.value.filter(t => {
  const date = new Date(t.date.seconds * 1000);
  return date >= startDate.value && date <= endDate.value && t.type === type;
});

const categoryTotals = {};

filteredTransactions.forEach(t => {
  if (!categoryTotals[t.category]) {
    categoryTotals[t.category] = 0;
  }
  categoryTotals[t.category] += t.amount;
});

const sortedCategories = Object.entries(categoryTotals)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

const labels = sortedCategories.map(([category]) => category);
const values = sortedCategories.map(([, amount]) => amount);

return { labels, values };
};

const getForecastData = () => {
const start = new Date(forecastStartDate.value);
const end = new Date(forecastEndDate.value);
const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
const labels = [];
const income = [];
const expenses = [];
const profit = [];

const dailyIncomeAvg = getDailyAverage('income');
const dailyExpenseAvg = getDailyAverage('expense');

// Generate data points for each week in the forecast period
const weeksInPeriod = Math.ceil(days / 7);
for (let i = 0; i < weeksInPeriod; i++) {
  const forecastDate = new Date(start);
  forecastDate.setDate(forecastDate.getDate() + (i * 7));
  labels.push(forecastDate.toLocaleDateString('default', { month: 'short', day: 'numeric' }));

  const incomeVariation = 1 + (Math.random() * 0.2 - 0.1);
  const expenseVariation = 1 + (Math.random() * 0.2 - 0.1);

  const weekIncome = dailyIncomeAvg * 7 * incomeVariation;
  const weekExpense = dailyExpenseAvg * 7 * expenseVariation;

  income.push(weekIncome);
  expenses.push(weekExpense);
  profit.push(weekIncome - weekExpense);
}

return { labels, income, expenses, profit };
};

const getDailyAverage = (type) => {
const now = new Date();
const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

const recentTransactions = transactions.value.filter(t => {
  if (t.type !== type) return false;
  const date = new Date(t.date.seconds * 1000);
  return date >= thirtyDaysAgo && date <= now;
});

if (recentTransactions.length === 0) return 0;

const total = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
return total / 30; // Average per day over last 30 days
};

const getMonthlyTotal = (type, month) => {
const now = new Date();
const year = now.getFullYear();
const startOfMonth = new Date(year, month, 1);
const endOfMonth = new Date(year, month + 1, 0);

return transactions.value
  .filter(t => {
    const date = new Date(t.date.seconds * 1000);
    return t.type === type && date >= startOfMonth && date <= endOfMonth;
  })
  .reduce((sum, t) => sum + t.amount, 0);
};

const formatDate = (date) => {
if (typeof date === 'string') return date;

return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
};

const getBudgetStatusClass = (actual, limit) => {
  if (!limit || limit === 0) return 'text-gray-500';
  if (actual <= limit * 0.8) return 'text-green-600';
  if (actual <= limit) return 'text-yellow-600';
  return 'text-red-600';
};

const getBudgetBalance = (actual, limit) => {
  if (!limit || limit === 0) return '₱0';
  const balance = limit - actual;
  return `₱${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const resetForm = () => {
amount.value = '';
notes.value = '';
type.value = 'income';
category.value = categories.value[0];
transactionDate.value = new Date().toISOString().split('T')[0];
formErrors.value = {};
};

const openEditModal = (transaction) => {
editForm.value = {
  id: transaction.id,
  amount: transaction.amount,
  type: transaction.type,
  category: transaction.category,
  date: new Date(transaction.date.seconds * 1000).toISOString().split('T')[0],
  notes: transaction.notes || ''
};
showEditModal.value = true;
};

const closeEditModal = () => {
showEditModal.value = false;
editForm.value = {
  id: null,
  amount: '',
  type: 'income',
  category: '',
  date: '',
  notes: ''
};
};

const closeCategoryModal = () => {
showCategoryModal.value = false;
newCategoryName.value = '';
};

const closeBudgetExportModal = () => {
showBudgetExportModal.value = false;
budgetExportOptions.value = {
  currentPeriod: true,
  budgetLimits: true,
  actualSpending: true,
  budgetProgress: true,
  budgetHistory: false
};
};

const closeTransactionExportModal = () => {
showTransactionExportModal.value = false;
exportRange.value = 'all';
exportStartDate.value = new Date().toISOString().split('T')[0];
exportEndDate.value = new Date().toISOString().split('T')[0];
};

const closeBudgetHistoryModal = () => {
showBudgetHistoryModal.value = false;
};

const confirmDelete = (transaction) => {
modalType.value = 'delete';
selectedTransaction.value = transaction;
showModal.value = true;
};

const handleModalConfirm = async () => {
if (!selectedTransaction.value) return;

switch (modalType.value) {
  case 'delete':
    await deleteTransaction(selectedTransaction.value);
    break;
  case 'deleteCategory':
    await deleteCategory(selectedTransaction.value);
    break;
  case 'deleteBudgetPlan':
    await confirmDeleteBudgetPlan(selectedTransaction.value);
    break;
}

closeModal();
};

const closeModal = () => {
showModal.value = false;
modalType.value = '';
selectedTransaction.value = null;
};

const getCategoryIcon = (category) => {
const icons = {
  'Crop Sales': 'fas fa-seedling text-green-600',
  'Equipment Sales': 'fas fa-tools text-blue-600',
  'Consulting': 'fas fa-comments text-purple-600',
  'Utilities': 'fas fa-bolt text-yellow-600',
  'Nutrients': 'fas fa-flask text-pink-600',
  'Equipment': 'fas fa-cogs text-gray-600',
  'Maintenance': 'fas fa-wrench text-orange-600',
  'Labor': 'fas fa-users text-indigo-600',
  'Marketing': 'fas fa-bullhorn text-red-600',
  'Other': 'fas fa-ellipsis-h text-gray-500'
};
return icons[category] || 'fas fa-tag text-gray-500';
};

const getSortIcon = (column) => {
if (sortColumn.value !== column) return 'text-gray-400';
return sortDirection.value === 'asc' ? 'text-green-600' : 'text-green-600';
};

const sortBy = (column) => {
if (sortColumn.value !== column) {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
} else {
  sortColumn.value = column;
  sortDirection.value = 'asc';
}
};

const prevPage = () => {
if (currentPage.value > 1) {
  currentPage.value--;
}
};

const nextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value++;
}
};

const safeToLocaleString = (value) => {
return value != null ? value.toLocaleString() : '0';
};

const loadCategories = async () => {
const user = auth.currentUser;
if (!user) return;

try {
  const docRef = doc(db, 'users', user.uid, 'settings', 'categories');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.categories && Array.isArray(data.categories)) {
      categories.value = data.categories;
    }
  }
} catch (error) {
  console.error("Error loading categories:", error);
}
};

// Initialize
onMounted(() => {
categories.value.forEach(cat => {
  budgetLimits.value[cat] = 0;
});

setDateRange('month');

fetchTransactions();
loadCategories();
loadBudgetLimits();
loadBudgetHistory();

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
  if (trendChartInstance) trendChartInstance.destroy();
  if (incomeChartInstance) incomeChartInstance.destroy();
  if (expenseChartInstance) expenseChartInstance.destroy();
  if (forecastChartInstance) forecastChartInstance.destroy();
});
});

watch([transactions], () => {
updateAllCharts();
});

watch(currentAnalyticsTab, () => {
nextTick(() => {
  updateAllCharts();
});
});

watch([budgetStartDate, budgetEndDate], () => {
loadBudgetLimits();
});

watch([startDate, endDate], () => {
updateAllCharts();
});

watch([forecastStartDate, forecastEndDate], () => {
updateForecastChart();
});

onAuthStateChanged(auth, (user) => {
if (user) {
  username.value = user.displayName || "User";
  loadCategories();
  loadBudgetHistory();
} else {
  username.value = "Guest";
}
});
</script>

<style>
@import "tailwindcss";

/* Custom Scrollbar Styles */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background: #d1d5db;
}

.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background: #f3f4f6;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  /* Ensure proper scrolling on mobile */
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }

  .overflow-x-auto::-webkit-scrollbar {
    height: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }

  /* Compact table cells on mobile */
  table {
    font-size: 10px;
  }

  /* Remove canvas minimum width for better mobile responsiveness */
  canvas {
    min-width: auto !important;
    max-width: 100% !important;
  }

  /* Tighter spacing for cards on mobile */
  .grid-cols-1 {
    gap: 0.5rem;
  }

  /* Smaller buttons on mobile */
  button {
    font-size: 10px;
    padding: 0.375rem 0.5rem;
  }

  /* Compact inputs on mobile */
  input, select, textarea {
    font-size: 11px;
    padding: 0.375rem 0.5rem;
  }

  /* Reduce padding in cards */
  .p-2\.5 {
    padding: 0.5rem;
  }

  /* Smaller text globally on mobile */
  body {
    font-size: 13px;
  }
}

/* Tablet optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Adjust spacing for tablets */
  .sm\:gap-3 {
    gap: 0.625rem;
  }

  .sm\:p-3 {
    padding: 0.75rem;
  }

  /* Better button sizing on tablets */
  button {
    font-size: 12px;
  }
}

/* Enhanced animations and transitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Smooth hover effects */
.hover\:shadow-lg {
  transition: box-shadow 0.3s ease;
}

.hover\:bg-gray-50 {
  transition: background-color 0.2s ease;
}

/* Focus visible states for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Pattern overlay for visual interest */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-spin {
    animation: none !important;
  }
}

/* Print styles */
@media print {
  .no-print,
  button,
  nav {
    display: none !important;
  }
  
  table {
    page-break-inside: avoid;
  }
}

/* Dark text for better readability */
.text-gray-800 {
  color: #1f2937;
}

.text-gray-700 {
  color: #374151;
}

/* Enhanced shadow utilities */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Touch-friendly tap targets on mobile */
@media (max-width: 640px) {
  button,
  a,
  input[type="checkbox"],
  input[type="radio"] {
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Adjust for inline elements */
  span button,
  div button {
    min-height: 36px;
    min-width: 36px;
  }
}

/* Better visual hierarchy */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Improve touch interaction feedback */
@media (hover: none) {
  button:active,
  a:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
</style>
