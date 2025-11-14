<template>
  <div class="p-3">
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-100">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-3">
        <div class="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-md flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-slate-800">System Status</h3>
      </div>

      <!-- Status Info -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-[10px] sm:text-xs">
          <span class="text-slate-600 flex items-center gap-1.5">
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last Login
          </span>
          <span class="font-semibold text-slate-800">{{ formatDate(lastLogin) }}</span>
        </div>
        
        <div class="flex items-center justify-between text-[10px] sm:text-xs">
          <span class="text-slate-600 flex items-center gap-1.5">
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </span>
          <span class="font-semibold text-slate-800 capitalize">{{ role }}</span>
        </div>
        
        <div class="flex items-center justify-between text-[10px] sm:text-xs">
          <span class="text-slate-600 flex items-center gap-1.5">
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Status
          </span>
          <span class="flex items-center gap-1.5">
            <span 
              :class="[
                'w-1.5 h-1.5 rounded-full',
                status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
              ]"
            ></span>
            <span 
              :class="[
                'font-semibold capitalize',
                status === 'active' ? 'text-emerald-600' : 'text-red-600'
              ]"
            >
              {{ status }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lastLogin: Date,
  role: String,
  status: String
});

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};
</script>
