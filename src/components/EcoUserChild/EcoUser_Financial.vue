<template>
<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
<!-- Main Content Area -->
<div class="flex flex-1 overflow-hidden">
  <!-- Main Content -->
  <main class="flex-1 overflow-y-auto bg-transparent p-2 sm:p-4 md:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="mb-4 sm:mb-6 md:mb-8">
      <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Financial Management</h1>
      <p class="text-sm sm:text-base md:text-lg text-gray-600">Track income, expenses, and financial performance</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
      <!-- Total Income Card -->
      <div 
        class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 border border-green-100 cursor-pointer group overflow-hidden"
        role="article"
        aria-label="Total Income Summary"
        tabindex="0"
        :title="`Total Income: ₱${formatNumber(totalIncome)}`"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-green-100 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
            <svg class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+100%</span>
            <svg class="h-3 w-3 sm:h-4 sm:w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Total Income</p>
        <div class="flex items-baseline gap-1 overflow-hidden">
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 transition-all duration-300 truncate" style="word-break: break-all;">₱{{ formatNumber(totalIncome) }}</p>
        </div>
      </div>

      <!-- Total Expenses Card -->
      <div 
        class="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 border border-red-100 cursor-pointer group overflow-hidden"
        role="article"
        aria-label="Total Expenses Summary"
        tabindex="0"
        :title="`Total Expenses: ₱${formatNumber(totalExpenses)}`"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-red-100 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
            <svg class="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="h-3 w-3 sm:h-4 sm:w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Total Expenses</p>
        <div class="flex items-baseline gap-1 overflow-hidden">
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600 transition-all duration-300 truncate" style="word-break: break-all;">₱{{ formatNumber(totalExpenses) }}</p>
        </div>
      </div>

      <!-- Net Profit Card -->
      <div 
        class="rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 border cursor-pointer group overflow-hidden"
        :class="netProfit >= 0 ? 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100' : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100'"
        role="article"
        aria-label="Net Profit Summary"
        tabindex="0"
        :title="`Net Profit: ₱${formatNumber(netProfit)}`"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" :class="netProfit >= 0 ? 'bg-blue-100' : 'bg-orange-100'" aria-hidden="true">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" :class="netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span v-if="netProfit >= 0" class="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <svg class="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Profit
            </span>
            <span v-else class="text-[10px] sm:text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <svg class="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Loss
            </span>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Net Profit</p>
        <div class="flex items-baseline gap-1 overflow-hidden">
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 truncate" :class="netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'" style="word-break: break-all;">₱{{ formatNumber(netProfit) }}</p>
        </div>
        <div class="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500"
            :class="netProfit >= 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'"
            :style="{ width: totalIncome > 0 ? `${Math.min(Math.abs((netProfit / totalIncome) * 100), 100)}%` : '0%' }"
          ></div>
        </div>
      </div>

      <!-- Transaction Count Card -->
      <div 
        class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 border border-purple-100 cursor-pointer group overflow-hidden"
        role="article"
        aria-label="Transaction Count Summary"
        tabindex="0"
        :title="`${dateFilteredTransactions.length} Transactions`"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="p-2.5 bg-purple-100 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" aria-hidden="true">
            <svg class="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="text-[10px] sm:text-xs font-semibold px-2 py-0.5 bg-purple-200 text-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Active
          </span>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Transactions</p>
        <div class="flex items-baseline gap-2 overflow-hidden">
          <p class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 transition-all duration-300">{{ dateFilteredTransactions.length }}</p>
        </div>
        <p v-if="dateFilter !== 'all'" class="text-[10px] sm:text-xs text-gray-500 mt-2 font-medium">of <span class="font-bold text-purple-600">{{ transactions.length }}</span> total</p>
        <p v-else class="text-[10px] sm:text-xs text-gray-500 mt-2 font-medium">All time records</p>
      </div>
    </div>

    <!-- Transaction Form -->
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 border border-gray-100">
      <div class="flex items-center gap-3 mb-4 sm:mb-6">
        <div class="p-2 bg-emerald-100 rounded-lg">
          <svg class="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Add New Transaction</h2>
      </div>
      <form @submit.prevent="addTransaction()">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
          <div>
            <label for="amount" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Amount (₱)</label>
            <input 
              type="number" 
              id="amount" 
              v-model="amount" 
              class="block w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors text-sm sm:text-base"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            >
            <p v-if="formErrors.amount" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ formErrors.amount }}
            </p>
          </div>
          <div>
            <label for="type" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select 
              id="type" 
              v-model="type"
              class="block w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors text-sm sm:text-base"
            >
              <option value="income">💰 Income</option>
              <option value="expense">💳 Expense</option>
            </select>
          </div>
          <div>
            <label for="category" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
              <span>Category</span>
              <button
                type="button"
                @click="openCategoryModal"
                class="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New
              </button>
            </label>
            <select 
              id="category" 
              v-model="category"
              class="block w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors text-sm sm:text-base"
              :class="{ 'border-red-500': formErrors.category }"
            >
              <option v-for="(cat, index) in allCategories" :key="index" :value="cat">
                {{ getCategoryConfig(cat).icon }} {{ cat }}
              </option>
            </select>
            <p v-if="formErrors.category" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ formErrors.category }}
            </p>
          </div>
          <div>
            <label for="date" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="transactionDate" 
              class="block w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors text-sm sm:text-base"
              :class="{ 'border-red-500': formErrors.date }"
              :max="new Date().toISOString().split('T')[0]"
              required
            >
            <p v-if="formErrors.date" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ formErrors.date }}
            </p>
          </div>
        </div>
        <div class="mb-5 sm:mb-6">
          <label for="notes" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
            <span>Notes (Optional)</span>
            <span class="text-xs text-gray-500">{{ notes.length }}/500</span>
          </label>
          <textarea 
            id="notes" 
            v-model="notes" 
            rows="3"
            maxlength="500"
            class="block w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-colors text-sm sm:text-base resize-none"
            :class="{ 'border-red-500': formErrors.notes }"
            placeholder="Add any additional details here..."
          ></textarea>
          <p v-if="formErrors.notes" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ formErrors.notes }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row justify-end gap-3">
          <button 
            type="button"
            @click="resetForm"
            class="px-5 sm:px-6 py-3 border-2 border-gray-300 rounded-lg shadow-sm text-sm sm:text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:shadow-md"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </span>
          </button>
          <button 
            type="submit"
            class="px-6 sm:px-8 py-3 border border-transparent rounded-lg shadow-md text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Transaction
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Budget Alerts -->
    <div v-if="budgetAlerts.length > 0" class="mb-4 sm:mb-6 space-y-2">
      <div
        v-for="alert in budgetAlerts"
        :key="alert.id"
        :class="[
          'p-4 rounded-lg border-l-4 flex items-start gap-3',
          alert.status === 'exceeded'
            ? 'bg-red-50 border-red-500'
            : 'bg-yellow-50 border-yellow-500'
        ]"
      >
        <svg
          class="h-5 w-5 flex-shrink-0 mt-0.5"
          :class="alert.status === 'exceeded' ? 'text-red-600' : 'text-yellow-600'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div class="flex-1">
          <p
            class="text-sm font-bold"
            :class="alert.status === 'exceeded' ? 'text-red-900' : 'text-yellow-900'"
          >
            {{ alert.status === 'exceeded' ? '🚨 Budget Exceeded!' : '⚠️ Budget Alert!' }}
          </p>
          <p
            class="text-sm mt-1"
            :class="alert.status === 'exceeded' ? 'text-red-800' : 'text-yellow-800'"
          >
            <strong>{{ alert.category }}</strong> ({{ alert.period }}): 
            Spent <strong>₱{{ formatNumber(alert.spent) }}</strong> of ₱{{ formatNumber(alert.limit) }} 
            ({{ alert.percentage.toFixed(1) }}%)
            <span v-if="alert.status === 'exceeded'" class="font-semibold">
              - Over by ₱{{ formatNumber(Math.abs(alert.remaining)) }}
            </span>
            <span v-else class="font-semibold">
              - ₱{{ formatNumber(alert.remaining) }} remaining
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Filters and Actions Toolbar -->
    <div class="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6 mb-4 sm:mb-6 border border-gray-100">
      <div class="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between">
        <!-- Date Filters -->
        <div class="flex flex-wrap gap-1.5 sm:gap-2 w-full lg:w-auto">
          <span class="text-xs sm:text-sm font-semibold text-gray-700 self-center mr-1 sm:mr-2 w-full sm:w-auto mb-1 sm:mb-0">Period:</span>
          <button
            v-for="filter in [{ value: 'all', label: 'All Time' }, { value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }, { value: 'month', label: 'This Month' }, { value: 'year', label: 'This Year' }]"
            :key="filter.value"
            @click="setDateFilter(filter.value)"
            :class="[
              'px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-lg transition-all duration-200 min-h-[44px] sm:min-h-0 flex items-center justify-center',
              dateFilter === filter.value
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            ]"
          >
            {{ filter.label }}
          </button>
          <button
            @click="showDatePicker = !showDatePicker"
            :class="[
              'px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1 min-h-[44px] sm:min-h-0',
              dateFilter === 'custom'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            ]"
          >
            <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Custom
          </button>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            @click="toggleAdvancedFilters"
            :class="[
              'px-4 py-2 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2',
              showAdvancedFilters || activeFiltersCount > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-500 hover:bg-gray-600'
            ]"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Filters
            <span v-if="activeFiltersCount > 0" class="ml-1 px-1.5 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
              {{ activeFiltersCount }}
            </span>
          </button>
          <button
            @click="openCategoryModal()"
            class="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Categories
          </button>
          <button
            @click="openBudgetModal()"
            class="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Budgets {{ budgets.length > 0 ? `(${budgets.length})` : '' }}
          </button>
          <button
            @click="showCharts = !showCharts"
            class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {{ showCharts ? 'Hide' : 'Show' }} Analytics
          </button>
          <!-- Export Dropdown -->
          <div class="relative" ref="exportDropdown">
            <button
              @click="showExportMenu = !showExportMenu"
              class="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              :disabled="filteredTransactions.length === 0"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
              <svg class="h-3 w-3" :class="{ 'rotate-180': showExportMenu }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Export Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showExportMenu"
                class="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
              >
                <div class="py-1">
                  <button
                    @click="exportToCSV(); showExportMenu = false"
                    class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-900 flex items-center gap-3 transition-colors"
                  >
                    <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p class="font-semibold">Export to CSV</p>
                      <p class="text-xs text-gray-500">Simple data table</p>
                    </div>
                  </button>
                  <button
                    @click="exportToExcel(); showExportMenu = false"
                    class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-3 transition-colors"
                  >
                    <svg class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="font-semibold">Export to Excel</p>
                      <p class="text-xs text-gray-500">Formatted spreadsheet</p>
                    </div>
                  </button>
                  <button
                    @click="exportToPDF(); showExportMenu = false"
                    class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 flex items-center gap-3 transition-colors"
                  >
                    <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="font-semibold">Export to PDF</p>
                      <p class="text-xs text-gray-500">Full report with charts</p>
                    </div>
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <button
            @click="toggleBulkMode"
            :class="[
              'px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2',
              bulkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-purple-600 text-white hover:bg-purple-700'
            ]"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            {{ bulkMode ? 'Cancel' : 'Bulk Select' }}
          </button>
        </div>
      </div>
      
      <!-- Custom Date Picker -->
      <div v-if="showDatePicker" class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              v-model="customStartDate"
              class="block w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              v-model="customEndDate"
              class="block w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
          </div>
        </div>
        <button
          @click="applyCustomDateRange"
          class="mt-3 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          :disabled="!customStartDate || !customEndDate"
        >
          Apply Range
        </button>
      </div>
      
      <!-- Bulk Actions Bar -->
      <div v-if="bulkMode && selectedTransactions.size > 0" class="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-between">
        <span class="text-sm font-semibold text-purple-900">
          {{ selectedTransactions.size }} transaction(s) selected
        </span>
        <button
          @click="bulkDelete"
          class="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Selected
        </button>
      </div>
    </div>

    <!-- Advanced Filters Panel -->
    <div v-if="showAdvancedFilters" class="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
      <h3 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Advanced Filters
        <span v-if="activeFiltersCount > 0" class="ml-auto text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
          {{ activeFiltersCount }} active
        </span>
      </h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <!-- Text Search -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search in Notes, Category, or Amount
          </label>
          <input
            type="text"
            v-model="searchText"
            placeholder="Type to search..."
            class="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>

        <!-- Transaction Type -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Transaction Type
          </label>
          <div class="flex gap-2 sm:gap-3">
            <button
              @click="toggleType('income')"
              :class="[
                'flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 min-h-[44px] sm:min-h-0 flex items-center justify-center',
                selectedTypes.includes('income')
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
              ]"
            >
              Income
            </button>
            <button
              @click="toggleType('expense')"
              :class="[
                'flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 min-h-[44px] sm:min-h-0 flex items-center justify-center',
                selectedTypes.includes('expense')
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
              ]"
            >
              Expense
            </button>
          </div>
        </div>

        <!-- Categories Filter -->
        <div class="lg:col-span-2">
          <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Filter by Categories
            <span v-if="selectedCategories.length > 0" class="text-[10px] sm:text-xs text-blue-600 ml-2">
              ({{ selectedCategories.length }} selected)
            </span>
          </label>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              v-for="cat in allCategories"
              :key="cat"
              @click="toggleCategory(cat)"
              :class="[
                'px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-200 min-h-[44px] sm:min-h-0 flex items-center justify-center',
                selectedCategories.includes(cat)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Amount Range -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Amount Range: ₱{{ formatNumber(amountRange.min) }} - ₱{{ formatNumber(amountRange.max) }}
          </label>
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row gap-4 items-stretch">
              <div class="flex-1">
                <label class="text-xs text-gray-600 mb-1 block">Min: ₱{{ formatNumber(amountRange.min) }}</label>
                <input
                  type="range"
                  v-model.number="amountRange.min"
                  :min="0"
                  :max="transactionAmountRange.max"
                  step="100"
                  class="w-full h-3 sm:h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600 touch-manipulation"
                  style="appearance: none; -webkit-appearance: none;"
                >
              </div>
              <div class="flex-1">
                <label class="text-xs text-gray-600 mb-1 block">Max: ₱{{ formatNumber(amountRange.max) }}</label>
                <input
                  type="range"
                  v-model.number="amountRange.max"
                  :min="amountRange.min"
                  :max="100000"
                  step="100"
                  class="w-full h-3 sm:h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600 touch-manipulation"
                  style="appearance: none; -webkit-appearance: none;"
                >
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="applyAmountRange"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Range
              </button>
              <button
                @click="resetAmountRange"
                class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Clear All Button -->
      <div class="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <p class="text-sm text-gray-600">
          Showing <strong>{{ filteredTransactions.length }}</strong> of <strong>{{ transactions.length }}</strong> transactions
        </p>
        <button
          @click="clearAllFilters"
          class="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All Filters
        </button>
      </div>
    </div>

    <!-- Budget Overview -->
    <div v-if="budgets.length > 0" class="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Budget Overview
        </h3>
        <span class="text-xs font-medium text-gray-500">{{ budgets.length }} active budget(s)</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          v-for="budget in budgetAnalysis"
          :key="budget.id"
          :class="[
            'p-4 rounded-lg border-2 transition-all duration-200',
            budget.status === 'exceeded'
              ? 'border-red-300 bg-red-50'
              : budget.status === 'warning'
              ? 'border-yellow-300 bg-yellow-50'
              : 'border-green-300 bg-green-50'
          ]"
        >
          <div class="flex items-start justify-between mb-3">
            <div>
              <h4 class="text-sm font-bold text-gray-900">{{ budget.category }}</h4>
              <p class="text-xs text-gray-600 capitalize">{{ budget.period }}</p>
            </div>
            <div class="flex gap-1">
              <button
                @click="openBudgetModal(budget)"
                class="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors"
                title="Edit budget"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="deleteBudget(budget.id)"
                class="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
                title="Delete budget"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-600">Spent</span>
              <span class="font-bold text-gray-900">₱{{ formatNumber(budget.spent) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                :class="[
                  'h-3 rounded-full transition-all duration-500',
                  budget.status === 'exceeded'
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : budget.status === 'warning'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600'
                ]"
                :style="{ width: `${budget.percentage}%` }"
              ></div>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-600">Limit</span>
              <span class="font-bold text-gray-900">₱{{ formatNumber(budget.limit) }}</span>
            </div>
            <div
              :class="[
                'text-xs font-bold text-center py-1 rounded',
                budget.status === 'exceeded'
                  ? 'text-red-700 bg-red-100'
                  : budget.status === 'warning'
                  ? 'text-yellow-700 bg-yellow-100'
                  : 'text-green-700 bg-green-100'
              ]"
            >
              {{ budget.percentage.toFixed(1) }}% used • 
              <span v-if="budget.status === 'exceeded'">Over by ₱{{ formatNumber(Math.abs(budget.remaining)) }}</span>
              <span v-else>₱{{ formatNumber(budget.remaining) }} left</span>
            </div>
          </div>
        </div>
        
        <!-- Add Budget Card -->
        <button
          @click="openBudgetModal()"
          class="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[180px]"
        >
          <svg class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-sm font-semibold text-gray-600">Add New Budget</span>
        </button>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div v-if="showCharts" class="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
      <!-- Primary Charts Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <!-- Line Chart: Income vs Expenses Trend -->
        <div class="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <span class="text-sm sm:text-base md:text-lg">Trend Analysis</span>
            </h3>
            <span class="text-[10px] sm:text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">Last 30 Days</span>
          </div>
          <div class="h-48 sm:h-56 md:h-64 lg:h-72">
            <Line v-if="lineChartData" :data="lineChartData" :options="lineChartOptions" />
            <div v-else class="h-full flex items-center justify-center text-gray-400">
              <div class="text-center">
                <svg class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p class="text-xs sm:text-sm">No data available</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Doughnut Chart: Category Distribution -->
        <div class="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <span class="text-sm sm:text-base md:text-lg">Expense Breakdown</span>
            </h3>
            <span class="text-[10px] sm:text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">By Category</span>
          </div>
          <div class="h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center">
            <Doughnut v-if="doughnutChartData" :data="doughnutChartData" :options="doughnutChartOptions" />
            <div v-else class="text-center text-gray-400">
              <svg class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              </svg>
              <p class="text-xs sm:text-sm">No expense data</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bar Chart: Monthly Comparison -->
      <div class="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-shadow">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
          <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="text-sm sm:text-base md:text-lg">Monthly Performance</span>
          </h3>
          <span class="text-[10px] sm:text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">Last 6 Months</span>
        </div>
        <div class="h-56 sm:h-64 md:h-72 lg:h-80">
          <Bar v-if="barChartData" :data="barChartData" :options="barChartOptions" />
          <div v-else class="h-full flex items-center justify-center text-gray-400">
            <div class="text-center">
              <svg class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-xs sm:text-sm">No data available</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Category Statistics -->
      <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Top Categories
        </h3>
        <div class="space-y-3">
          <div v-for="stat in categoryStats.slice(0, 5)" :key="stat.category" class="border-b border-gray-100 pb-3 last:border-0">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-900">{{ stat.category }}</span>
              <span class="text-xs font-medium text-gray-500">{{ stat.count }} transactions</span>
            </div>
            <div class="flex gap-2 text-xs">
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Income</span>
                  <span class="font-semibold text-green-600">₱{{ formatNumber(stat.income) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full transition-all duration-300" :style="{ width: `${(stat.income / (totalIncome || 1)) * 100}%` }"></div>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Expenses</span>
                  <span class="font-semibold text-red-600">₱{{ formatNumber(stat.expense) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-red-500 h-2 rounded-full transition-all duration-300" :style="{ width: `${(stat.expense / (totalExpenses || 1)) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="categoryStats.length === 0" class="text-center py-8 text-gray-500">
            <svg class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-sm">No data for this period</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction List -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div class="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-emerald-50 via-white to-blue-50 border-b-2 border-gray-100">
        <div class="flex flex-col gap-4">
          <!-- Header Row -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <svg class="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Transaction History</h2>
                <p class="text-xs sm:text-sm text-gray-500 mt-0.5">{{ filteredTransactions.length }} records found</p>
              </div>
            </div>
            
            <!-- View Toggle (Desktop) -->
            <div class="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                @click="viewMode = 'table'"
                :class="[
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                  viewMode === 'table' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
                title="Table View"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                @click="viewMode = 'card'"
                :class="[
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                  viewMode === 'card' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                ]"
                title="Card View"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Search and Filter Row -->
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Enhanced Search -->
            <div class="relative flex-1">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search by description, category, or amount..." 
                class="w-full pl-11 pr-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-300 transition-all text-sm bg-white"
                aria-label="Search transactions"
                @input="debouncedSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Quick Filters -->
            <div class="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                @click="quickFilterType = quickFilterType === 'all' ? 'all' : 'all'"
                :class="[
                  'px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5',
                  quickFilterType === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All
              </button>
              <button
                @click="toggleQuickFilter('income')"
                :class="[
                  'px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5',
                  quickFilterType === 'income' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                Income
              </button>
              <button
                @click="toggleQuickFilter('expense')"
                :class="[
                  'px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5',
                  quickFilterType === 'expense' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
                Expenses
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card View (Mobile-Friendly) -->
      <div v-if="viewMode === 'card'" class="p-3 sm:p-4 md:p-6">
        <div v-if="paginatedTransactions.length === 0" class="text-center py-12">
          <div class="flex flex-col items-center justify-center">
            <div class="p-4 bg-gray-100 rounded-full mb-4">
              <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p class="text-base sm:text-lg font-semibold text-gray-900 mb-2">No transactions found</p>
            <p class="text-sm text-gray-500">Try adjusting your filters or add a new transaction</p>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            class="bg-white border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            :class="transaction.type === 'income' ? 'border-green-200 hover:border-green-300' : 'border-red-200 hover:border-red-300'"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <div :class="[
                  'p-2 rounded-lg',
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                ]">
                  <svg class="h-5 w-5" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="transaction.type === 'income'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </div>
                <div>
                  <span :class="[
                    'px-2.5 py-0.5 text-xs font-semibold rounded-full',
                    transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]">
                    {{ transaction.type === 'income' ? 'Income' : 'Expense' }}
                  </span>
                </div>
              </div>
              <div class="flex gap-1">
                <button 
                  @click="openEditModal(transaction)" 
                  class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="confirmDelete(transaction)" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  :disabled="transaction.deleting"
                  title="Delete"
                >
                  <svg v-if="!transaction.deleting" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <p class="text-2xl font-bold" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                  {{ transaction.type === 'income' ? '+' : '-' }}₱{{ safeToLocaleString(transaction.amount) }}
                </p>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span class="font-medium">{{ transaction.category }}</span>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(transaction.date) }}</span>
              </div>
              
              <div v-if="transaction.notes" class="pt-2 border-t border-gray-100">
                <p class="text-xs text-gray-600 line-clamp-2">{{ transaction.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View (Desktop) -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-if="bulkMode" scope="col" class="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left">
                <input
                  type="checkbox"
                  @change="selectAllTransactions"
                  :checked="selectedTransactions.size === paginatedTransactions.length && paginatedTransactions.length > 0"
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
                >
              </th>
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
              <td colspan="6" class="px-4 sm:px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="p-4 bg-gray-100 rounded-full mb-4">
                    <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p class="text-base sm:text-lg font-semibold text-gray-900 mb-2">No transactions yet</p>
                  <p class="text-sm text-gray-500">Add your first transaction using the form above</p>
                </div>
              </td>
            </tr>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td v-if="bulkMode" class="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="selectedTransactions.has(transaction.id)"
                  @change="toggleSelectTransaction(transaction.id)"
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
                >
              </td>
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
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
  @click.self="closeEditModal"
>
  <div 
    class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ease-out max-h-[95vh] overflow-y-auto"
    :class="showEditModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
  >
    <div class="flex justify-between items-center mb-4 sm:mb-6">
      <h3 class="text-lg sm:text-xl font-medium text-gray-900">Edit Transaction</h3>
      <button 
        @click="closeEditModal" 
        class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Close modal"
      >
        <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <option v-for="(cat, index) in allCategories" :key="index" :value="cat">{{ cat }}</option>
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


<!-- Toast Notification -->
<div 
  v-if="toast.show" 
  class="fixed top-4 right-4 sm:top-6 sm:right-6 px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl z-50 flex items-center gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-md animate-slide-in backdrop-blur-sm text-sm sm:text-base"
  :class="{
    'bg-green-50 text-green-900 border-l-4 border-green-500 ring-2 ring-green-200': toast.type === 'success',
    'bg-red-50 text-red-900 border-l-4 border-red-500 ring-2 ring-red-200': toast.type === 'error',
    'bg-blue-50 text-blue-900 border-l-4 border-blue-500 ring-2 ring-blue-200': toast.type === 'info',
    'bg-yellow-50 text-yellow-900 border-l-4 border-yellow-500 ring-2 ring-yellow-200': toast.type === 'warning'
  }"
  role="alert"
  aria-live="polite"
>
  <svg 
    v-if="toast.type === 'success'" 
    class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  <svg 
    v-if="toast.type === 'error'" 
    class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
  </svg>
  <svg 
    v-if="toast.type === 'info'" 
    class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
  </svg>
  <svg 
    v-if="toast.type === 'warning'" 
    class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg>
  <span class="text-xs sm:text-sm font-medium flex-1">{{ toast.message }}</span>
  <button
    @click="toast.show = false"
    class="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
    aria-label="Close notification"
    type="button"
  >
    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>
</div>

<!-- Confirmation Dialog -->
<div
  v-if="confirmDialog.show"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
  @click.self="confirmDialog.show = false"
  role="dialog"
  aria-modal="true"
  aria-labelledby="confirm-dialog-title"
>
  <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-5 sm:p-6 md:p-8 animate-scale-up">
    <div class="flex items-start gap-3 sm:gap-4">
      <div 
        class="flex-shrink-0 p-2 sm:p-3 rounded-full"
        :class="{
          'bg-red-100': confirmDialog.type === 'danger',
          'bg-yellow-100': confirmDialog.type === 'warning'
        }"
      >
        <svg 
          v-if="confirmDialog.type === 'danger'"
          class="h-6 w-6 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <svg 
          v-if="confirmDialog.type === 'warning'"
          class="h-6 w-6 text-yellow-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 id="confirm-dialog-title" class="text-lg font-bold text-gray-900 mb-2">
          {{ confirmDialog.title }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ confirmDialog.message }}
        </p>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button
        @click="confirmDialog.show = false"
        class="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
      >
        {{ confirmDialog.cancelText }}
      </button>
      <button
        @click="() => { confirmDialog.onConfirm(); confirmDialog.show = false; }"
        class="flex-1 px-4 py-2.5 font-semibold rounded-lg transition-colors"
        :class="{
          'bg-red-600 text-white hover:bg-red-700': confirmDialog.type === 'danger',
          'bg-yellow-600 text-white hover:bg-yellow-700': confirmDialog.type === 'warning'
        }"
      >
        {{ confirmDialog.confirmText }}
      </button>
    </div>
  </div>
</div>

<!-- Network Status Indicator -->
<div
  v-if="!isOnline"
  class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg flex items-center gap-2 animate-slide-in"
  role="alert"
  aria-live="assertive"
>
  <svg class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
  </svg>
  <span class="text-sm font-semibold">You are offline</span>
</div>

<!-- Category Management Modal -->
<div
  v-if="showCategoryModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
  @click.self="closeCategoryModal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="category-modal-title"
  @keydown.esc="closeCategoryModal"
>
  <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 animate-scale-up max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" ref="categoryModalContent">
    <div class="flex items-center justify-between mb-6">
      <h3 id="category-modal-title" class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
        <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Manage Categories
      </h3>
      <button
        @click="closeCategoryModal"
        class="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close category management modal"
        type="button"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Add New Category -->
    <form @submit.prevent="addCustomCategory" class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Add New Category
      </label>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="newCategoryName"
          placeholder="Enter category name"
          class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
        <button
          type="submit"
          :disabled="loading || !newCategoryName.trim()"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
    </form>

    <!-- Categories List -->
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-gray-200">
        <h4 class="text-sm font-bold text-gray-700">Default Categories</h4>
        <span class="text-xs text-gray-500">{{ defaultCategories.length }}</span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="cat in defaultCategories"
          :key="cat"
          class="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium flex items-center gap-2"
        >
          <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ cat }}
        </div>
      </div>

      <div v-if="customCategories.length > 0" class="pt-4">
        <div class="flex items-center justify-between pb-2 border-b border-gray-200">
          <h4 class="text-sm font-bold text-gray-700">Custom Categories</h4>
          <span class="text-xs text-gray-500">{{ customCategories.length }}</span>
        </div>
        <div class="grid grid-cols-1 gap-2 mt-3">
          <div
            v-for="cat in customCategories"
            :key="cat.id"
            class="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm text-gray-700 font-medium flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ cat.name }}
            </div>
            <button
              @click="deleteCustomCategory(cat.id, cat.name)"
              class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="Delete category"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="pt-4 text-center py-8 text-gray-500">
        <svg class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <p class="text-sm">No custom categories yet</p>
        <p class="text-xs mt-1">Add your first category above</p>
      </div>
    </div>

    <div class="flex justify-end pt-4 mt-6 border-t border-gray-200">
      <button
        @click="closeCategoryModal"
        class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
      >
        Done
      </button>
    </div>
  </div>
</div>

<!-- Budget Modal -->
<div
  v-if="showBudgetModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
  @click.self="closeBudgetModal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="budget-modal-title"
  @keydown.esc="closeBudgetModal"
>
  <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 md:p-8 animate-scale-up max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" ref="budgetModalContent">
    <div class="flex items-center justify-between mb-6">
      <h3 id="budget-modal-title" class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
        <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ editingBudget ? 'Edit Budget' : 'Create Budget' }}
      </h3>
      <button
        @click="closeBudgetModal"
        class="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close budget modal"
        type="button"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="saveBudget" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <span>Category <span class="text-red-500">*</span></span>
          <button
            type="button"
            @click="openCategoryModal"
            class="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </button>
        </label>
        <select
          v-model="budgetForm.category"
          required
          class="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="" disabled>Select category</option>
          <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Budget Limit <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute left-4 top-3 text-gray-500 font-semibold">₱</span>
          <input
            type="number"
            v-model="budgetForm.limit"
            required
            min="1"
            step="0.01"
            placeholder="0.00"
            class="block w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Period <span class="text-red-500">*</span>
        </label>
        <select
          v-model="budgetForm.period"
          required
          class="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Alert Threshold ({{ budgetForm.alertThreshold }}%)
        </label>
        <input
          type="range"
          v-model="budgetForm.alertThreshold"
          min="50"
          max="95"
          step="5"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        >
        <p class="text-xs text-gray-500 mt-1">
          Get notified when spending reaches {{ budgetForm.alertThreshold }}% of limit
        </p>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="button"
          @click="closeBudgetModal"
          class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {{ editingBudget ? 'Update' : 'Create' }} Budget
        </button>
      </div>
    </form>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDoc,
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  getDocs
} from "firebase/firestore";
import { db } from "../../firebase";
import { Line, Doughnut, Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// State
const auth = getAuth();
const transactions = ref([]);
// Default categories
const defaultCategories = [
  "Consulting",
  "Utilities",
  "Nutrients",
  "Equipment",
  "Maintenance",
  "Labor",
  "Marketing",
  "Other"
];

const categories = ref([...defaultCategories]);
const customCategories = ref([]);
const showCategoryModal = ref(false);
const newCategoryName = ref('');

// Modal refs for focus management and accessibility
const budgetModalContent = ref(null);
const categoryModalContent = ref(null);
let previousActiveElement = null;

// Error handling
const isOnline = ref(navigator.onLine);
const errorLog = ref([]);
const maxRetries = 3;

// Error handling utility functions
const getFirebaseErrorMessage = (error) => {
  const errorCode = error.code;
  const errorMessages = {
    'permission-denied': 'You do not have permission to perform this action.',
    'not-found': 'The requested resource was not found.',
    'already-exists': 'This item already exists.',
    'resource-exhausted': 'Too many requests. Please try again later.',
    'unauthenticated': 'Please sign in to continue.',
    'unavailable': 'Service is temporarily unavailable. Please try again.',
    'deadline-exceeded': 'Request timed out. Please check your connection.',
    'network-request-failed': 'Network error. Please check your internet connection.'
  };
  
  return errorMessages[errorCode] || error.message || 'An unexpected error occurred.';
};

const logError = (context, error) => {
  const errorEntry = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    code: error.code || 'unknown',
    stack: error.stack
  };
  
  errorLog.value.unshift(errorEntry);
  if (errorLog.value.length > 50) {
    errorLog.value.pop();
  }
  
  console.error(`[${context}]`, error);
};

const retryOperation = async (operation, operationName, retries = maxRetries) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      logError(operationName, error);
      
      if (attempt === retries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      showError(`Retrying... (Attempt ${attempt + 1}/${retries})`);
    }
  }
};

// Category icon and color mappings
const categoryConfig = {
  'Consulting': { icon: '💼', color: 'blue', bgClass: 'bg-blue-100', textClass: 'text-blue-700', borderClass: 'border-blue-300' },
  'Utilities': { icon: '⚡', color: 'yellow', bgClass: 'bg-yellow-100', textClass: 'text-yellow-700', borderClass: 'border-yellow-300' },
  'Nutrients': { icon: '🌱', color: 'green', bgClass: 'bg-green-100', textClass: 'text-green-700', borderClass: 'border-green-300' },
  'Equipment': { icon: '🔧', color: 'gray', bgClass: 'bg-gray-100', textClass: 'text-gray-700', borderClass: 'border-gray-300' },
  'Maintenance': { icon: '🛠️', color: 'orange', bgClass: 'bg-orange-100', textClass: 'text-orange-700', borderClass: 'border-orange-300' },
  'Labor': { icon: '👷', color: 'purple', bgClass: 'bg-purple-100', textClass: 'text-purple-700', borderClass: 'border-purple-300' },
  'Marketing': { icon: '📢', color: 'pink', bgClass: 'bg-pink-100', textClass: 'text-pink-700', borderClass: 'border-pink-300' },
  'Other': { icon: '📦', color: 'slate', bgClass: 'bg-slate-100', textClass: 'text-slate-700', borderClass: 'border-slate-300' }
};

const defaultCategoryIcon = { icon: '🏷️', color: 'indigo', bgClass: 'bg-indigo-100', textClass: 'text-indigo-700', borderClass: 'border-indigo-300' };

const amount = ref("");
const type = ref("income");
const category = ref(categories.value[0]);
const notes = ref("");
const transactionDate = ref(new Date().toISOString().split('T')[0]);
const loading = ref(false);
const showEditModal = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const sortColumn = ref("date");
const sortDirection = ref("desc");
const formErrors = ref({});
const toast = ref({ show: false, message: '', type: '' });

// View mode
const viewMode = ref('table'); // 'table' or 'card'
const quickFilterType = ref('all'); // 'all', 'income', or 'expense'

// Confirmation dialog
const confirmDialog = ref({
  show: false,
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: null,
  type: 'danger' // 'danger' or 'warning'
});

// Date filtering
const dateFilter = ref('all');
const customStartDate = ref('');
const customEndDate = ref('');
const showDatePicker = ref(false);

// Advanced filters
const showAdvancedFilters = ref(false);
const searchText = ref('');
const selectedCategories = ref([]);
const selectedTypes = ref(['income', 'expense']);
const amountRange = ref({ min: 0, max: 100000 });
const activeAmountRange = ref({ min: 0, max: 100000 });

// Bulk operations
const selectedTransactions = ref(new Set());
const bulkMode = ref(false);

// Charts and analytics
const showCharts = ref(false);

// Export menu
const showExportMenu = ref(false);
const exportDropdown = ref(null);

// Budget management
const budgets = ref([]);
const showBudgetModal = ref(false);
const budgetForm = ref({
  category: '',
  limit: 0,
  period: 'monthly', // monthly, weekly, yearly
  alertThreshold: 80 // Alert at 80% usage
});
const editingBudget = ref(null);

// Edit form
const editForm = ref({
  id: null,
  amount: '',
  type: 'income',
  category: '',
  date: '',
  notes: ''
});


// Computed Properties
const filteredTransactions = computed(() => {
  let filtered = [...dateFilteredTransactions.value];

  // Search filter (searches in notes and category)
  if (searchText.value.trim()) {
    const search = searchText.value.toLowerCase();
    filtered = filtered.filter(t => {
      const notes = (t.notes || '').toLowerCase();
      const category = (t.category || '').toLowerCase();
      const amount = t.amount.toString();
      return notes.includes(search) || category.includes(search) || amount.includes(search);
    });
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(t => selectedCategories.value.includes(t.category));
  }

  // Type filter
  if (selectedTypes.value.length > 0 && selectedTypes.value.length < 2) {
    filtered = filtered.filter(t => selectedTypes.value.includes(t.type));
  }

  // Amount range filter
  if (activeAmountRange.value.min > 0 || activeAmountRange.value.max < 100000) {
    filtered = filtered.filter(t => 
      t.amount >= activeAmountRange.value.min && 
      t.amount <= activeAmountRange.value.max
    );
  }

  // Search query (legacy - for table search)
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
  return dateFilteredTransactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
});

const totalExpenses = computed(() => {
  return dateFilteredTransactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
});

const netProfit = computed(() => {
  return totalIncome.value - totalExpenses.value;
});

const dateFilteredTransactions = computed(() => {
  let filtered = [...transactions.value];
  const now = new Date();
  
  switch (dateFilter.value) {
    case 'today':
      filtered = filtered.filter(t => {
        const date = new Date(t.date.seconds * 1000);
        return date.toDateString() === now.toDateString();
      });
      break;
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(t => new Date(t.date.seconds * 1000) >= weekAgo);
      break;
    case 'month':
      filtered = filtered.filter(t => {
        const date = new Date(t.date.seconds * 1000);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });
      break;
    case 'year':
      filtered = filtered.filter(t => {
        const date = new Date(t.date.seconds * 1000);
        return date.getFullYear() === now.getFullYear();
      });
      break;
    case 'custom':
      if (customStartDate.value && customEndDate.value) {
        const start = new Date(customStartDate.value);
        const end = new Date(customEndDate.value);
        end.setHours(23, 59, 59, 999);
        filtered = filtered.filter(t => {
          const date = new Date(t.date.seconds * 1000);
          return date >= start && date <= end;
        });
      }
      break;
  }
  
  return filtered;
});

const categoryStats = computed(() => {
  const stats = {};
  dateFilteredTransactions.value.forEach(t => {
    if (!stats[t.category]) {
      stats[t.category] = { income: 0, expense: 0, count: 0 };
    }
    if (t.type === 'income') {
      stats[t.category].income += t.amount;
    } else {
      stats[t.category].expense += t.amount;
    }
    stats[t.category].count++;
  });
  return Object.entries(stats)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => (b.income + b.expense) - (a.income + a.expense));
});

const chartData = computed(() => {
  const data = {};
  dateFilteredTransactions.value.forEach(t => {
    const date = new Date(t.date.seconds * 1000);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!data[key]) {
      data[key] = { income: 0, expense: 0, label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) };
    }
    
    if (t.type === 'income') {
      data[key].income += t.amount;
    } else {
      data[key].expense += t.amount;
    }
  });
  
  return Object.values(data).slice(-12);
});

const budgetAnalysis = computed(() => {
  const now = new Date();
  return budgets.value.map(budget => {
    // Get transactions for the budget period
    let periodTransactions = (transactions.value || []).filter(t => {
      if (t.type !== 'expense' || t.category !== budget.category) return false;
      
      const date = new Date(t.date.seconds * 1000);
      
      switch (budget.period) {
        case 'weekly':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return date >= weekAgo;
        case 'monthly':
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case 'yearly':
          return date.getFullYear() === now.getFullYear();
        default:
          return false;
      }
    });
    
    const spent = periodTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const limit = Number(budget.limit) || 0;
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    const remaining = limit - spent;
    const threshold = Number(budget.alertThreshold) || 80;
    const status = percentage >= 100 ? 'exceeded' : percentage >= threshold ? 'warning' : 'safe';
    
    return {
      ...budget,
      spent: spent || 0,
      percentage: Math.min(percentage || 0, 100),
      remaining: remaining || 0,
      status,
      limit: limit || 0,
      transactionCount: periodTransactions.length || 0
    };
  });
});

const budgetAlerts = computed(() => {
  if (!budgetAnalysis.value || !Array.isArray(budgetAnalysis.value)) return [];
  return budgetAnalysis.value
    .filter(b => b && (b.status === 'warning' || b.status === 'exceeded'))
    .sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
});

const allCategories = computed(() => {
  const defaults = [...defaultCategories];
  const custom = customCategories.value.map(c => c.name);
  return [...new Set([...defaults, ...custom])].sort();
});

const transactionAmountRange = computed(() => {
  if (transactions.value.length === 0) return { min: 0, max: 100000 };
  const amounts = transactions.value.map(t => t.amount);
  return {
    min: Math.floor(Math.min(...amounts)),
    max: Math.ceil(Math.max(...amounts))
  };
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchText.value.trim()) count++;
  if (selectedCategories.value.length > 0) count++;
  if (selectedTypes.value.length > 0 && selectedTypes.value.length < 2) count++;
  if (activeAmountRange.value.min > 0 || activeAmountRange.value.max < 100000) count++;
  return count;
});

// Chart Data Computed Properties
const lineChartData = computed(() => {
  if (!filteredTransactions.value.length) return null;
  
  // Get last 30 days of data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });
  
  const dailyData = last30Days.map(dateStr => {
    const dayTransactions = filteredTransactions.value.filter(t => {
      const tDate = new Date(t.date.seconds * 1000).toISOString().split('T')[0];
      return tDate === dateStr;
    });
    
    return {
      date: dateStr,
      income: dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
      expense: dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    };
  });
  
  return {
    labels: dailyData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Income',
        data: dailyData.map(d => d.income),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: dailyData.map(d => d.expense),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };
});

const lineChartOptions = computed(() => {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          usePointStyle: true,
          padding: isMobile ? 10 : 15,
          font: {
            size: isMobile ? 10 : isTablet ? 11 : 12,
            weight: 'bold'
          },
          boxWidth: isMobile ? 10 : 12
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        titleFont: {
          size: isMobile ? 11 : 12
        },
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        padding: isMobile ? 8 : 12,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ₱${formatNumber(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 9 : isTablet ? 10 : 11
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: isMobile ? 9 : isTablet ? 10 : 11
          },
          callback: (value) => {
            const val = formatNumber(value);
            return isMobile && val.length > 8 ? `₱${val.slice(0, 6)}...` : `₱${val}`;
          }
        }
      }
    }
  };
});

const doughnutChartData = computed(() => {
  const expensesByCategory = {};
  
  filteredTransactions.value
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
  
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);
  
  if (sortedCategories.length === 0) return null;
  
  const colors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#ef4444', '#6366f1', '#14b8a6'
  ];
  
  return {
    labels: sortedCategories.map(([cat]) => cat),
    datasets: [
      {
        data: sortedCategories.map(([, amount]) => amount),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };
});

const doughnutChartOptions = computed(() => {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          padding: isMobile ? 8 : isTablet ? 12 : 15,
          font: {
            size: isMobile ? 9 : isTablet ? 10 : 11
          },
          boxWidth: isMobile ? 10 : 12,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                const shortLabel = isMobile && label.length > 12 ? label.slice(0, 10) + '...' : label;
                return {
                  text: `${shortLabel} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 11 : 12
        },
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        padding: isMobile ? 8 : 12,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `₱${formatNumber(context.parsed)} (${percentage}%)`;
          }
        }
      }
    }
  };
});

const barChartData = computed(() => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      monthIndex: date.getMonth(),
      year: date.getFullYear()
    };
  });
  
  const monthlyData = last6Months.map(({ month, monthIndex, year }) => {
    // Apply all filters (search, category, type, amount) but use 6-month date range for display
    const monthTransactions = transactions.value.filter(t => {
      const tDate = new Date(t.date.seconds * 1000);
      const isInMonth = tDate.getMonth() === monthIndex && tDate.getFullYear() === year;
      
      if (!isInMonth) return false;
      
      // Apply search filter
      if (searchText.value) {
        const search = searchText.value.toLowerCase();
        const matchesDescription = t.description?.toLowerCase().includes(search);
        const matchesCategory = t.categoryName?.toLowerCase().includes(search);
        const matchesAmount = t.amount.toString().includes(search);
        if (!matchesDescription && !matchesCategory && !matchesAmount) return false;
      }
      
      // Apply category filter
      if (selectedCategories.value.length > 0 && !selectedCategories.value.includes(t.categoryId)) {
        return false;
      }
      
      // Apply type filter
      if (selectedTypes.value.length > 0 && !selectedTypes.value.includes(t.type)) {
        return false;
      }
      
      // Apply amount range filter
      if (activeAmountRange.value) {
        const { min, max } = activeAmountRange.value;
        if (t.amount < min || t.amount > max) return false;
      }
      
      return true;
    });
    
    return {
      month,
      income: monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
      expense: monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    };
  });
  
  return {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        backgroundColor: '#10b981',
        borderRadius: 6
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expense),
        backgroundColor: '#ef4444',
        borderRadius: 6
      },
      {
        label: 'Net Profit',
        data: monthlyData.map(d => d.income - d.expense),
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }
    ]
  };
});

const barChartOptions = computed(() => {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: isMobile ? 10 : 15,
          font: {
            size: isMobile ? 10 : isTablet ? 11 : 12,
            weight: 'bold'
          },
          boxWidth: isMobile ? 10 : 12
        }
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 11 : 12
        },
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        padding: isMobile ? 8 : 12,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ₱${formatNumber(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 9 : isTablet ? 10 : 11
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: isMobile ? 9 : isTablet ? 10 : 11
          },
          callback: (value) => {
            const val = formatNumber(value);
            return isMobile && val.length > 8 ? `₱${val.slice(0, 6)}...` : `₱${val}`;
          }
        }
      }
    }
  };
});

// Methods
const getCategoryConfig = (category) => {
  return categoryConfig[category] || defaultCategoryIcon;
};

const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0.00';
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Helpers to ensure PDF-safe ASCII output (avoid unsupported glyphs like ₱)
const pdfSanitize = (s) => {
  try {
    return String(s)
      .normalize('NFKD')
      .replace(/₱/g, 'PHP ')
      .replace(/[\u00A0\u2000-\u200D\u202F\u2060]/g, ' ') // non-breaking/thin spaces
      .replace(/[^\x20-\x7E]/g, ''); // strip non-ASCII to prevent odd renderings
  } catch {
    return String(s).replace(/₱/g, 'PHP ').replace(/[^\x20-\x7E]/g, '');
  }
};

const pdfCurrency = (value) => pdfSanitize(`PHP ${formatNumber(value)}`);

// Enhanced CSV Export with filtered data
const exportToCSV = () => {
  try {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Notes', 'ID'];
    const rows = filteredTransactions.value.map(t => [
      formatDate(t.date),
      t.type === 'income' ? 'Income' : 'Expense',
      t.category,
      t.amount.toFixed(2),
      t.notes || '',
      t.id
    ]);
    
    // Add summary at the end
    const summaryRows = [
      [''],
      ['Summary'],
      ['Total Income', '', '', totalIncome.value.toFixed(2)],
      ['Total Expenses', '', '', totalExpenses.value.toFixed(2)],
      ['Net Profit', '', '', netProfit.value.toFixed(2)],
      [''],
      ['Filter Applied', dateFilter.value],
      ['Export Date', new Date().toLocaleString()],
      ['Total Records', filteredTransactions.value.length]
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
      ...summaryRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `financial_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccess(`${filteredTransactions.value.length} transactions exported to CSV`);
  } catch (error) {
    console.error('CSV Export Error:', error);
    showError('Failed to export CSV. Please try again.');
  }
};

// Excel Export with formatting and design
const exportToExcel = async () => {
  try {
    // Dynamic import to reduce bundle size
    const XLSX = await import('xlsx');
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Transactions sheet
    const transactionsData = [
      ['Financial Report - Transactions'],
      ['Generated:', new Date().toLocaleString()],
      ['Filter:', dateFilter.value],
      ['Total Records:', filteredTransactions.value.length],
      [],
      ['Date', 'Type', 'Category', 'Amount (₱)', 'Notes']
    ];
    
    filteredTransactions.value.forEach(t => {
      transactionsData.push([
        formatDate(t.date),
        t.type === 'income' ? 'Income' : 'Expense',
        t.category,
        t.amount,
        t.notes || ''
      ]);
    });
    
    // Add summary
    transactionsData.push(
      [],
      ['Summary'],
      ['Total Income', '', '', totalIncome.value],
      ['Total Expenses', '', '', totalExpenses.value],
      ['Net Profit/Loss', '', '', netProfit.value]
    );
    
    const ws = XLSX.utils.aoa_to_sheet(transactionsData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 15 }, // Date
      { wch: 12 }, // Type
      { wch: 20 }, // Category
      { wch: 15 }, // Amount
      { wch: 40 }  // Notes
    ];
    
    // Style headers (row 6)
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "10B981" } },
      alignment: { horizontal: "center", vertical: "center" }
    };
    
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    
    // Category Summary sheet
    const categoryData = [
      ['Category Analysis'],
      ['Generated:', new Date().toLocaleString()],
      [],
      ['Category', 'Income', 'Expenses', 'Net', 'Transaction Count']
    ];
    
    categoryStats.value.forEach(stat => {
      categoryData.push([
        stat.category,
        stat.income,
        stat.expense,
        stat.income - stat.expense,
        stat.count
      ]);
    });
    
    const wsCategory = XLSX.utils.aoa_to_sheet(categoryData);
    wsCategory['!cols'] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
    ];
    XLSX.utils.book_append_sheet(wb, wsCategory, 'Category Summary');
    
    // Budget sheet if budgets exist
    if (budgetAnalysis.value.length > 0) {
      const budgetData = [
        ['Budget Overview'],
        ['Generated:', new Date().toLocaleString()],
        [],
        ['Category', 'Budget Limit', 'Spent', 'Remaining', 'Usage %', 'Period']
      ];
      
      budgetAnalysis.value.forEach(budget => {
        budgetData.push([
          budget.category,
          budget.limit,
          budget.spent,
          budget.remaining,
          budget.percentage.toFixed(1) + '%',
          budget.period
        ]);
      });
      
      const wsBudget = XLSX.utils.aoa_to_sheet(budgetData);
      wsBudget['!cols'] = [
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 12 }
      ];
      XLSX.utils.book_append_sheet(wb, wsBudget, 'Budgets');
    }
    
    // Write file
    XLSX.writeFile(wb, `financial_report_${new Date().toISOString().split('T')[0]}.xlsx`);
    showSuccess('Financial report exported to Excel successfully');
  } catch (error) {
    console.error('Excel Export Error:', error);
    showError('Failed to export Excel. Please try again.');
  }
};

// PDF Export with charts and comprehensive layout
const exportToPDF = async () => {
  try {
    // Dynamic imports
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    const html2canvas = (await import('html2canvas')).default;
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 15;
    
    // Helper function to check page overflow
    const checkPageOverflow = (additionalHeight = 0) => {
      if (yPosition + additionalHeight > pageHeight - 25) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };
    
    // Add decorative header bar
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    // Company Logo/Brand Area
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(14, 12, pageWidth - 28, 35, 2, 2, 'F');
    
    // Title with modern styling
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text('AeroTech Financial Management', pageWidth / 2, 24, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Comprehensive Financial Report', pageWidth / 2, 32, { align: 'center' });
    
    // Report metadata box
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    const reportDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const reportTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    doc.text(`Report Generated: ${reportDate} at ${reportTime}`, pageWidth / 2, 40, { align: 'center' });
    doc.text(`Period Filter: ${dateFilter.value.toUpperCase()} - Records: ${filteredTransactions.value.length}`, pageWidth / 2, 44, { align: 'center' });
    
    yPosition = 52;
    
    // Financial Overview Section with enhanced cards
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Financial Overview', 14, yPosition);
    
    // Add section underline
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.line(14, yPosition + 2, 60, yPosition + 2);
    yPosition += 10;
    
    const cardWidth = (pageWidth - 38) / 3;
    const cardHeight = 32;
    
    // Income Card with gradient effect
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(14, yPosition, cardWidth, cardHeight, 3, 3, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, yPosition, cardWidth, cardHeight, 3, 3, 'S');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('TOTAL INCOME', 17, yPosition + 7);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(pdfCurrency(totalIncome.value), 17, yPosition + 18);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    const incomeCount = filteredTransactions.value.filter(t => t.type === 'income').length;
    doc.text(`${incomeCount} transaction${incomeCount !== 1 ? 's' : ''}`, 17, yPosition + 26);
    
    // Expenses Card
    const expenseX = 14 + cardWidth + 5;
    doc.setFillColor(254, 226, 226);
    doc.roundedRect(expenseX, yPosition, cardWidth, cardHeight, 3, 3, 'F');
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(0.3);
    doc.roundedRect(expenseX, yPosition, cardWidth, cardHeight, 3, 3, 'S');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('TOTAL EXPENSES', expenseX + 3, yPosition + 7);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 68, 68);
    doc.text(pdfCurrency(totalExpenses.value), expenseX + 3, yPosition + 18);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    const expenseCount = filteredTransactions.value.filter(t => t.type === 'expense').length;
    doc.text(`${expenseCount} transaction${expenseCount !== 1 ? 's' : ''}`, expenseX + 3, yPosition + 26);
    
    // Net Profit/Loss Card
    const netX = 14 + (cardWidth + 5) * 2;
    const isProfit = netProfit.value >= 0;
    const netColor = isProfit ? [16, 185, 129] : [239, 68, 68];
    const netBgColor = isProfit ? [220, 252, 231] : [254, 226, 226];
    doc.setFillColor(...netBgColor);
    doc.roundedRect(netX, yPosition, cardWidth, cardHeight, 3, 3, 'F');
    doc.setDrawColor(...netColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(netX, yPosition, cardWidth, cardHeight, 3, 3, 'S');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(isProfit ? 'NET PROFIT' : 'NET LOSS', netX + 3, yPosition + 7);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...netColor);
    doc.text(pdfCurrency(Math.abs(netProfit.value)), netX + 3, yPosition + 18);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    const profitMargin = totalIncome.value > 0 ? ((netProfit.value / totalIncome.value) * 100).toFixed(1) : '0.0';
    doc.text(`${profitMargin}% margin`, netX + 3, yPosition + 26);
    
    yPosition += cardHeight + 15;
    
    // Key Financial Metrics Section
    checkPageOverflow(40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Key Metrics', 14, yPosition);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.line(14, yPosition + 2, 42, yPosition + 2);
    yPosition += 8;
    
    // Metrics grid
    const metricsData = [
      ['Average Income', pdfCurrency(incomeCount > 0 ? totalIncome.value / incomeCount : 0)],
      ['Average Expense', pdfCurrency(expenseCount > 0 ? totalExpenses.value / expenseCount : 0)],
      ['Expense Ratio', `${totalIncome.value > 0 ? ((totalExpenses.value / totalIncome.value) * 100).toFixed(1) : '0'}%`],
      ['Savings Rate', `${totalIncome.value > 0 ? ((netProfit.value / totalIncome.value) * 100).toFixed(1) : '0'}%`]
    ];
    
    doc.autoTable({
      startY: yPosition,
      body: metricsData,
      theme: 'plain',
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { 
          cellWidth: 50, 
          fontStyle: 'bold',
          textColor: [75, 85, 99]
        },
        1: { 
          cellWidth: 'auto',
          textColor: [16, 185, 129],
          fontStyle: 'bold',
          halign: 'right'
        }
      },
      margin: { left: 14, right: 14 }
    });
    
    yPosition = doc.lastAutoTable.finalY + 12;
    
    // Transaction Details Section
    checkPageOverflow(60);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Transaction History', 14, yPosition);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.line(14, yPosition + 2, 60, yPosition + 2);
    yPosition += 8;
    
    const tableData = filteredTransactions.value.slice(0, 100).map(t => [
      formatDate(t.date),
      t.type === 'income' ? 'Income' : 'Expense',
      t.category,
      pdfCurrency(t.amount),
      (t.notes || 'N/A').substring(0, 35) + ((t.notes || '').length > 35 ? '...' : '')
    ]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['Date', 'Type', 'Category', 'Amount', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [55, 65, 81]
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      },
      columnStyles: {
        0: { cellWidth: 22, halign: 'center' },
        1: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 28 },
        3: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
        4: { cellWidth: 'auto', textColor: [107, 114, 128] }
      },
      margin: { left: 14, right: 14 },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          if (data.cell.raw === 'Income') {
            data.cell.styles.textColor = [16, 185, 129];
          } else {
            data.cell.styles.textColor = [239, 68, 68];
          }
        }
      }
    });
    
    yPosition = doc.lastAutoTable.finalY + 12;
    
    // Category Analysis Section
    if (categoryStats.value.length > 0) {
      checkPageOverflow(60);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('Category Breakdown', 14, yPosition);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(14, yPosition + 2, 55, yPosition + 2);
      yPosition += 8;
      
      const categoryTableData = categoryStats.value.slice(0, 15).map(stat => [
        stat.category,
        pdfCurrency(stat.income),
        pdfCurrency(stat.expense),
        pdfCurrency(stat.income - stat.expense),
        stat.count.toString()
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Category', 'Income', 'Expenses', 'Net', 'Transactions']],
        body: categoryTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [139, 92, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8,
          textColor: [55, 65, 81]
        },
        columnStyles: {
          0: { cellWidth: 'auto', fontStyle: 'bold' },
          1: { cellWidth: 32, halign: 'right', textColor: [16, 185, 129] },
          2: { cellWidth: 32, halign: 'right', textColor: [239, 68, 68] },
          3: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
          4: { cellWidth: 25, halign: 'center' }
        },
        margin: { left: 14, right: 14 }
      });
      
      yPosition = doc.lastAutoTable.finalY + 12;
    }
    
    // Budget Overview Section
    if (budgetAnalysis.value.length > 0) {
      checkPageOverflow(60);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('Budget Performance', 14, yPosition);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(14, yPosition + 2, 54, yPosition + 2);
      yPosition += 8;
      
      const budgetTableData = budgetAnalysis.value.map(budget => [
        budget.category,
        pdfCurrency(budget.limit),
        pdfCurrency(budget.spent),
        pdfCurrency(budget.remaining),
        `${budget.percentage.toFixed(1)}%`,
        budget.status === 'exceeded' ? 'Over' : budget.status === 'warning' ? 'Warning' : 'Safe'
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Category', 'Budget', 'Spent', 'Remaining', 'Usage', 'Status']],
        body: budgetTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8,
          textColor: [55, 65, 81]
        },
        columnStyles: {
          0: { cellWidth: 'auto', fontStyle: 'bold' },
          1: { cellWidth: 28, halign: 'right' },
          2: { cellWidth: 28, halign: 'right', textColor: [239, 68, 68] },
          3: { cellWidth: 28, halign: 'right' },
          4: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
          5: { cellWidth: 20, halign: 'center', fontStyle: 'bold' }
        },
        margin: { left: 14, right: 14 },
        didParseCell: (data) => {
          if (data.section === 'body' && data.column.index === 5) {
            if (data.cell.raw === 'Over') {
              data.cell.styles.textColor = [239, 68, 68];
            } else if (data.cell.raw === 'Warning') {
              data.cell.styles.textColor = [249, 115, 22];
            } else {
              data.cell.styles.textColor = [16, 185, 129];
            }
          }
        }
      });
      
      yPosition = doc.lastAutoTable.finalY + 12;
    }
    
    // Visual Analytics Section
    if (showCharts.value) {
      doc.addPage();
      yPosition = 20;
      
      // Section header
      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, pageWidth, 8, 'F');
      
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text('Visual Analytics & Trends', 14, 20);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(14, 22, 80, 22);
      yPosition = 30;
      
      // Capture and add charts
      const chartElements = document.querySelectorAll('canvas');
      const chartTitles = ['30-Day Trend Analysis', 'Category Distribution', 'Monthly Performance'];
      
      for (let i = 0; i < Math.min(chartElements.length, 3); i++) {
        try {
          // Add chart title
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(75, 85, 99);
          doc.text(chartTitles[i] || `Chart ${i + 1}`, 14, yPosition);
          yPosition += 8;
          
          const canvas = await html2canvas(chartElements[i].parentElement, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 28;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const finalHeight = Math.min(imgHeight, 85);
          
          if (checkPageOverflow(finalHeight + 15)) {
            yPosition = 25;
          }
          
          // Add border around chart
          doc.setDrawColor(229, 231, 235);
          doc.setLineWidth(0.5);
          doc.rect(14, yPosition, imgWidth, finalHeight);
          
          doc.addImage(imgData, 'PNG', 14, yPosition, imgWidth, finalHeight);
          yPosition += finalHeight + 15;
        } catch (err) {
          console.warn('Chart capture failed:', err);
        }
      }
    }
    
    // Add professional footer to all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer bar
      doc.setFillColor(243, 244, 246);
      doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
      
      // Footer text
      doc.setFontSize(7);
      doc.setTextColor(107, 114, 128);
      doc.text(
        'AeroTech Financial Management System',
        14,
        pageHeight - 8
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - 14,
        pageHeight - 8,
        { align: 'right' }
      );
      
      // Confidential notice
      doc.setFontSize(6);
      doc.setTextColor(156, 163, 175);
      doc.text(
        'CONFIDENTIAL - This report contains sensitive financial information',
        pageWidth / 2,
        pageHeight - 4,
        { align: 'center' }
      );
    }
    
    // Save with descriptive filename
    const fileName = `AeroTech_Financial_Report_${new Date().toISOString().split('T')[0]}_${Date.now()}.pdf`;
    doc.save(fileName);
    showSuccess('Professional financial report exported successfully');
  } catch (error) {
    console.error('PDF Export Error:', error);
    showError('Failed to export PDF. Please try again.');
  }
};

const toggleBulkMode = () => {
  bulkMode.value = !bulkMode.value;
  if (!bulkMode.value) {
    selectedTransactions.value.clear();
  }
};

const toggleSelectTransaction = (id) => {
  if (selectedTransactions.value.has(id)) {
    selectedTransactions.value.delete(id);
  } else {
    selectedTransactions.value.add(id);
  }
};

const selectAllTransactions = () => {
  if (selectedTransactions.value.size === paginatedTransactions.value.length) {
    selectedTransactions.value.clear();
  } else {
    paginatedTransactions.value.forEach(t => selectedTransactions.value.add(t.id));
  }
};

const bulkDelete = async () => {
  if (selectedTransactions.value.size === 0) return;
  
  showConfirm(
    'Delete Multiple Transactions',
    `Are you sure you want to delete ${selectedTransactions.value.size} transaction(s)? This action cannot be undone.`,
    async () => {
      const user = auth.currentUser;
      if (!user) {
        showError('Please sign in to delete transactions');
        return;
      }
      
      loading.value = true;
      try {
        const deletePromises = Array.from(selectedTransactions.value).map(id => 
          deleteDoc(doc(db, 'users', user.uid, 'transactions', id))
        );
        
        await Promise.all(deletePromises);
        selectedTransactions.value.clear();
        bulkMode.value = false;
        showSuccess(`${deletePromises.length} transaction(s) deleted successfully`);
      } catch (error) {
        logError('bulkDelete', error);
        showError('Error deleting transactions. Please try again.');
      } finally {
        loading.value = false;
      }
    },
    { confirmText: 'Delete All', type: 'danger' }
  );
};

const setDateFilter = (filter) => {
  dateFilter.value = filter;
  if (filter !== 'custom') {
    showDatePicker.value = false;
  }
};

const applyCustomDateRange = () => {
  if (customStartDate.value && customEndDate.value) {
    dateFilter.value = 'custom';
    showDatePicker.value = false;
  }
};

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value;
};

const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
};

const toggleType = (type) => {
  const index = selectedTypes.value.indexOf(type);
  if (index > -1) {
    selectedTypes.value.splice(index, 1);
  } else {
    selectedTypes.value.push(type);
  }
};

const applyAmountRange = () => {
  activeAmountRange.value = { ...amountRange.value };
};

const resetAmountRange = () => {
  amountRange.value = { min: 0, max: 100000 };
  activeAmountRange.value = { min: 0, max: 100000 };
};

const clearAllFilters = () => {
  searchText.value = '';
  selectedCategories.value = [];
  selectedTypes.value = ['income', 'expense'];
  resetAmountRange();
  searchQuery.value = '';
  showSuccess('All filters cleared');
};

const openBudgetModal = (budget = null) => {
  // Store current focus for restoration later
  previousActiveElement = document.activeElement;
  
  if (budget) {
    editingBudget.value = budget;
    budgetForm.value = { ...budget };
  } else {
    editingBudget.value = null;
    budgetForm.value = {
      category: '',
      limit: 0,
      period: 'monthly',
      alertThreshold: 80
    };
  }
  showBudgetModal.value = true;
  
  // Focus first input when modal opens
  nextTick(() => {
    if (budgetModalContent.value) {
      const firstInput = budgetModalContent.value.querySelector('select, input');
      if (firstInput) firstInput.focus();
    }
  });
};

const closeBudgetModal = () => {
  showBudgetModal.value = false;
  editingBudget.value = null;
  budgetForm.value = {
    category: '',
    limit: 0,
    period: 'monthly',
    alertThreshold: 80
  };
  
  // Restore focus to element that opened the modal
  if (previousActiveElement && previousActiveElement.focus) {
    previousActiveElement.focus();
    previousActiveElement = null;
  }
};

const validateBudgetForm = () => {
  if (!budgetForm.value.category || budgetForm.value.category.trim() === '') {
    showError('Please select a category for the budget');
    return false;
  }
  
  if (!budgetForm.value.limit || isNaN(budgetForm.value.limit) || budgetForm.value.limit <= 0) {
    showError('Budget limit must be a positive number');
    return false;
  }
  
  if (budgetForm.value.limit > 100000000) {
    showError('Budget limit cannot exceed ₱100,000,000');
    return false;
  }
  
  if (!budgetForm.value.period || !['weekly', 'monthly', 'yearly'].includes(budgetForm.value.period)) {
    showError('Please select a valid budget period');
    return false;
  }
  
  if (budgetForm.value.alertThreshold < 0 || budgetForm.value.alertThreshold > 100) {
    showError('Alert threshold must be between 0 and 100');
    return false;
  }
  
  return true;
};

const saveBudget = async () => {
  if (!validateBudgetForm()) return;
  
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to manage budgets');
    return;
  }
  
  loading.value = true;
  try {
    if (editingBudget.value) {
      // Update existing budget
      const budgetRef = doc(db, 'users', user.uid, 'budgets', editingBudget.value.id);
      await updateDoc(budgetRef, {
        category: budgetForm.value.category,
        limit: Number(budgetForm.value.limit),
        period: budgetForm.value.period,
        alertThreshold: Number(budgetForm.value.alertThreshold),
        updatedAt: new Date()
      });
      showSuccess('Budget updated successfully');
    } else {
      // Create new budget
      await addDoc(collection(db, 'users', user.uid, 'budgets'), {
        category: budgetForm.value.category,
        limit: Number(budgetForm.value.limit),
        period: budgetForm.value.period,
        alertThreshold: Number(budgetForm.value.alertThreshold),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      showSuccess('Budget created successfully');
    }
    closeBudgetModal();
  } catch (error) {
    console.error('Error saving budget:', error);
    showError('Error saving budget. Please try again.');
  } finally {
    loading.value = false;
  }
};

const deleteBudget = async (budgetId) => {
  if (!confirm('Are you sure you want to delete this budget?')) return;
  
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to delete budgets');
    return;
  }
  
  loading.value = true;
  try {
    await deleteDoc(doc(db, 'users', user.uid, 'budgets', budgetId));
    showSuccess('Budget deleted successfully');
  } catch (error) {
    console.error('Error deleting budget:', error);
    showError('Error deleting budget. Please try again.');
  } finally {
    loading.value = false;
  }
};

const openCategoryModal = () => {
  // Store current focus for restoration later
  previousActiveElement = document.activeElement;
  
  newCategoryName.value = '';
  showCategoryModal.value = true;
  
  // Focus first input when modal opens
  nextTick(() => {
    if (categoryModalContent.value) {
      const firstInput = categoryModalContent.value.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  });
};

const closeCategoryModal = () => {
  showCategoryModal.value = false;
  newCategoryName.value = '';
  
  // Restore focus to element that opened the modal
  if (previousActiveElement && previousActiveElement.focus) {
    previousActiveElement.focus();
    previousActiveElement = null;
  }
};

const validateCategoryName = (name) => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { valid: false, error: 'Category name cannot be empty' };
  }
  
  if (trimmedName.length < 2) {
    return { valid: false, error: 'Category name must be at least 2 characters' };
  }
  
  if (trimmedName.length > 50) {
    return { valid: false, error: 'Category name cannot exceed 50 characters' };
  }
  
  // Only allow letters, numbers, spaces, and basic symbols
  if (!/^[a-zA-Z0-9\s\-&]+$/.test(trimmedName)) {
    return { valid: false, error: 'Category name contains invalid characters' };
  }
  
  // Check for duplicates (case-insensitive)
  const lowerCaseName = trimmedName.toLowerCase();
  const existingCategories = allCategories.value.map(c => c.toLowerCase());
  if (existingCategories.includes(lowerCaseName)) {
    return { valid: false, error: 'This category already exists' };
  }
  
  return { valid: true, error: null };
};

const addCustomCategory = async () => {
  const validation = validateCategoryName(newCategoryName.value);
  
  if (!validation.valid) {
    showError(validation.error);
    return;
  }
  
  const trimmedName = newCategoryName.value.trim();
  
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to add categories');
    return;
  }
  
  loading.value = true;
  try {
    await addDoc(collection(db, 'users', user.uid, 'categories'), {
      name: trimmedName,
      createdAt: new Date()
    });
    showSuccess(`Category "${trimmedName}" added successfully`);
    closeCategoryModal();
  } catch (error) {
    console.error('Error adding category:', error);
    showError('Error adding category. Please try again.');
  } finally {
    loading.value = false;
  }
};

const deleteCustomCategory = async (categoryId, categoryName) => {
  if (!confirm(`Are you sure you want to delete "${categoryName}"? This won't affect existing transactions.`)) return;
  
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to delete categories');
    return;
  }
  
  loading.value = true;
  try {
    await deleteDoc(doc(db, 'users', user.uid, 'categories', categoryId));
    showSuccess(`Category "${categoryName}" deleted successfully`);
  } catch (error) {
    console.error('Error deleting category:', error);
    showError('Error deleting category. Please try again.');
  } finally {
    loading.value = false;
  }
};

const validateForm = () => {
  formErrors.value = {};
  let isValid = true;

  // Amount validation
  if (!amount.value || isNaN(amount.value)) {
    formErrors.value.amount = 'Please enter a valid amount';
    isValid = false;
  } else if (amount.value <= 0) {
    formErrors.value.amount = 'Amount must be greater than zero';
    isValid = false;
  } else if (amount.value > 10000000) {
    formErrors.value.amount = 'Amount cannot exceed ₱10,000,000';
    isValid = false;
  } else if (!/^\d+(\.\d{1,2})?$/.test(amount.value)) {
    formErrors.value.amount = 'Amount can have at most 2 decimal places';
    isValid = false;
  }
  
  // Category validation
  if (!category.value || category.value.trim() === '') {
    formErrors.value.category = 'Please select a category';
    isValid = false;
  } else if (category.value.length > 50) {
    formErrors.value.category = 'Category name is too long (max 50 characters)';
    isValid = false;
  }
  
  // Date validation
  if (!transactionDate.value) {
    formErrors.value.date = 'Please select a date';
    isValid = false;
  } else {
    const selectedDate = new Date(transactionDate.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (selectedDate > today) {
      formErrors.value.date = 'Transaction date cannot be in the future';
      isValid = false;
    }
    
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 10);
    if (selectedDate < minDate) {
      formErrors.value.date = 'Transaction date cannot be more than 10 years ago';
      isValid = false;
    }
  }
  
  // Notes validation (optional but limited)
  if (notes.value && notes.value.length > 500) {
    formErrors.value.notes = 'Notes cannot exceed 500 characters';
    isValid = false;
  }

  return isValid;
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

const showInfo = (message) => {
  toast.value = { show: true, message, type: 'info' };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const showWarning = (message) => {
  toast.value = { show: true, message, type: 'warning' };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const showConfirm = (title, message, onConfirm, options = {}) => {
  confirmDialog.value = {
    show: true,
    title,
    message,
    confirmText: options.confirmText || 'Confirm',
    cancelText: options.cancelText || 'Cancel',
    type: options.type || 'danger',
    onConfirm
  };
};

const animateNewTransaction = async () => {
  await nextTick();
  const firstRow = document.querySelector('tbody tr:first-child');
  if (firstRow) {
    firstRow.classList.add('animate-slide-in', 'bg-green-50');
    setTimeout(() => {
      firstRow.classList.remove('bg-green-50');
    }, 2000);
  }
};

const fetchTransactions = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      showError('Please sign in to manage your transactions');
      return;
    }
    
    if (!isOnline.value) {
      showError('No internet connection. Showing cached data.');
    }

    const transactionsRef = collection(db, 'users', user.uid, 'transactions');
    const q = query(transactionsRef, orderBy('date', 'desc'));

    onSnapshot(q, (snapshot) => {
      transactions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        deleting: false
      }));
    }, (error) => {
      logError('fetchTransactions', error);
      showError(getFirebaseErrorMessage(error));
    });
    
    // Listen to budgets
    const budgetsRef = collection(db, 'users', user.uid, 'budgets');
    onSnapshot(budgetsRef, (snapshot) => {
      budgets.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }, (error) => {
      logError('fetchBudgets', error);
      console.error("Error fetching budgets:", error);
    });
    
    // Listen to custom categories
    const categoriesRef = collection(db, 'users', user.uid, 'categories');
    onSnapshot(categoriesRef, (snapshot) => {
      customCategories.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }, (error) => {
      logError('fetchCategories', error);
      console.error("Error fetching categories:", error);
    });
  } catch (error) {
    logError('fetchTransactions', error);
    showError(getFirebaseErrorMessage(error));
  }
};

const addTransaction = async () => {
  if (!validateForm()) return;
  
  if (!isOnline.value) {
    showError('No internet connection. Please check your network.');
    return;
  }

  loading.value = true;
  const user = auth.currentUser;
  if (!user) {
    showError('Please sign in to add transactions');
    loading.value = false;
    return;
  }

  try {
    await retryOperation(async () => {
      await addDoc(collection(db, 'users', user.uid, 'transactions'), {
        amount: parseFloat(amount.value),
        type: type.value,
        category: category.value,
        date: Timestamp.fromDate(new Date(transactionDate.value)),
        notes: notes.value || '',
        createdAt: Timestamp.now()
      });
    }, 'addTransaction');

    resetForm();
    showSuccess('Transaction added successfully');
    animateNewTransaction();
  } catch (error) {
    logError('addTransaction', error);
    showError(getFirebaseErrorMessage(error));
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
  if (!isOnline.value) {
    showError('No internet connection. Please check your network.');
    return;
  }
  
  showConfirm(
    'Delete Transaction',
    `Are you sure you want to delete this ${transaction.type} of ₱${formatNumber(transaction.amount)}? This action cannot be undone.`,
    async () => {
      const user = auth.currentUser;
      if (!user) {
        showError('Please sign in to delete transactions');
        return;
      }

      // Set deleting state
      transaction.deleting = true;

      try {
        await retryOperation(async () => {
          await deleteDoc(doc(db, 'users', user.uid, 'transactions', transaction.id));
        }, 'deleteTransaction');
        
        showSuccess('Transaction deleted successfully');
      } catch (error) {
        logError('deleteTransaction', error);
        showError(getFirebaseErrorMessage(error));
        transaction.deleting = false;
      }
    },
    { confirmText: 'Delete', type: 'danger' }
  );
};

const formatDate = (date) => {
if (typeof date === 'string') return date;

return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
};

const resetForm = () => {
amount.value = '';
notes.value = '';
type.value = 'income';
category.value = categories.value[0];
transactionDate.value = new Date().toISOString().split('T')[0];
formErrors.value = {};
};

// Quick filter toggle function
const toggleQuickFilter = (filterType) => {
  if (quickFilterType.value === filterType) {
    quickFilterType.value = 'all';
    selectedTypes.value = ['income', 'expense'];
  } else {
    quickFilterType.value = filterType;
    selectedTypes.value = [filterType];
  }
  currentPage.value = 1;
};

// Debounced search for better performance
let searchTimeout = null;
const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
  }, 300);
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

const confirmDelete = (transaction) => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    deleteTransaction(transaction);
  }
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
  if (sortColumn.value === column) {
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
        // Ensure current category is still valid
        if (!categories.value.includes(category.value)) {
          category.value = categories.value[0];
        }
      }
    }
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

// Initialize
onMounted(() => {
  fetchTransactions();
  loadCategories();
  
  // Auto-switch to card view on mobile
  const setViewMode = () => {
    if (window.innerWidth < 768) {
      viewMode.value = 'card';
    } else {
      viewMode.value = 'table';
    }
  };
  
  setViewMode();
  window.addEventListener('resize', setViewMode);
  
  // Close export menu when clicking outside
  const handleClickOutside = (event) => {
    if (exportDropdown.value && !exportDropdown.value.contains(event.target)) {
      showExportMenu.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);
  
  // Network status monitoring
  const handleOnline = () => {
    isOnline.value = true;
    showSuccess('Connection restored');
  };
  
  const handleOffline = () => {
    isOnline.value = false;
    showError('You are offline. Some features may not work.');
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Cleanup listeners
  onBeforeUnmount(() => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    window.removeEventListener('resize', setViewMode);
    document.removeEventListener('click', handleClickOutside);
  });
});

onBeforeUnmount(() => {
  // Cleanup if needed
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadCategories();
  }
});
</script>

<style scoped>
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out;
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

/* Custom animations */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-in {
  animation: slide-in 0.4s ease-out;
}

.animate-scale-up {
  animation: scale-up 0.3s ease-out;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Improved scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  /* Prevent modal overflow on very small screens */
  .animate-scale-up {
    max-width: calc(100vw - 24px);
  }
  
  /* Larger touch targets for mobile */
  button, a, input[type="checkbox"], input[type="radio"] {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Better button spacing on mobile */
  .flex.gap-2 button {
    padding: 0.625rem 0.875rem;
  }
}

/* Improve range slider thumb for touch devices */
input[type="range"] {
  -webkit-tap-highlight-color: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #2563eb;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:active {
  transform: scale(1.2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #2563eb;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb:active {
  transform: scale(1.2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* Prevent horizontal overflow on mobile */
@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
  
  table {
    min-width: 600px;
  }
}

/* Better tap highlight for iOS */
* {
  -webkit-tap-highlight-color: rgba(37, 99, 235, 0.1);
}

</style>