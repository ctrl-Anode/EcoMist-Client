<template>
  <div class="relative">
    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <aside :class="[
      'bg-white shadow-lg z-20 transition-all duration-300 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 border-r border-gray-200',
      'overflow-y-auto md:overflow-y-auto',
      'md:h-screen'
    ]">
      <!-- Header -->
      <div class="p-4 border-b flex justify-between items-center bg-emerald-50">
        <h2 class="text-lg font-semibold text-emerald-700">Administrator</h2>
        <button @click="$emit('toggle-sidebar')" class="md:hidden text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4">
        <div v-for="(section, index) in navigationSections" :key="index" class="mb-6">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ section.title }}</h3>
          <ul class="space-y-1">
            <li v-for="(route, idx) in getFilteredRoutes(section)" :key="idx">
              <router-link
                :to="route.path"
                :class=" [
                  'flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150',
                  currentRoute === route.path
                    ? 'bg-emerald-100 text-emerald-700 font-semibold shadow'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                ]"
                @click="closeSidebar"
                :title="route.name"
              >
                <span class="inline-flex items-center justify-center mr-3 w-7 h-7">
                  <!-- Dashboard -->
                  <svg v-if="getIconForRoute(route) === 'dashboard'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zm0-8h8V3h-8v10zm-10 8h8v-6H3v6z"/>
                  </svg>
                  <!-- Messenger -->
                  <svg v-else-if="getIconForRoute(route) === 'chat'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10h8m-8 4h6M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <!-- User Management -->
                  <svg v-else-if="getIconForRoute(route) === 'users'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m9-10a4 4 0 100-8 4 4 0 000 8z"/>
                  </svg>
                  <!-- Crop Analytics -->
                  <svg v-else-if="getIconForRoute(route) === 'analytics'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 17v-6a1 1 0 011-1h2a1 1 0 011 1v6m4 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m4 0v-2a1 1 0 011-1h2a1 1 0 011 1v2"/>
                  </svg>
                  <!-- Settings -->
                  <svg v-else-if="getIconForRoute(route) === 'settings'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7zm7.4-2.9a1 1 0 00.2-1.1l-1.1-1.9a1 1 0 00-.9-.5h-2.2a1 1 0 00-.9.5l-1.1 1.9a1 1 0 00.2 1.1l1.1 1.9a1 1 0 00.9.5h2.2a1 1 0 00.9-.5l1.1-1.9z"/>
                  </svg>
                  <!-- SMTP -->
                  <svg v-else-if="getIconForRoute(route) === 'smtp'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/>
                  </svg>
                  <!-- Logger -->
                  <svg v-else-if="getIconForRoute(route) === 'logger'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 7h18M3 12h18M3 17h18"/>
                  </svg>
                  <!-- System Logs -->
                  <svg v-else-if="getIconForRoute(route) === 'logs'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8v8H8z"/>
                  </svg>
                  <!-- Device Management -->
                  <svg v-else-if="getIconForRoute(route) === 'tools'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"/>
                  </svg>
                  <!-- Guest Contacts -->
                  <svg v-else-if="getIconForRoute(route) === 'contacts'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-8 0c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zm8 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm-8 0c-2.33 0-7 1.17-7 3.5V19h7v-2.5c0-2.33 4.67-3.5 7-3.5z"/>
                  </svg>
                  <!-- Manage Feedback -->
                  <svg v-else-if="getIconForRoute(route) === 'feedback'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  <!-- Notifications -->
                  <svg v-else-if="getIconForRoute(route) === 'bell'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"/>
                  </svg>
                  <!-- Reports -->
                  <svg v-else-if="getIconForRoute(route) === 'reports'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 17v-6h6v6H9z" /><path d="M4 4h16v16H4z" />
                  </svg>
                  <!-- Help -->
                  <svg v-else-if="getIconForRoute(route) === 'help'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10a4 4 0 118 0c0 1.5-2 2.5-2 4H10c0-2 2-3 2-4" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                  <!-- Profile -->
                  <svg v-else-if="getIconForRoute(route) === 'user-circle'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20c0-3.313 2.687-6 6-6s6 2.687 6 6" />
                  </svg>
                  <!-- Default (Link) -->
                  <svg v-else class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.5 1.5" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.5-1.5" />
                  </svg>
                </span>
                <span class="truncate">{{ route.name }}</span>
              </router-link>
            </li>
          </ul>
          <div v-if="index < navigationSections.length - 1" class="my-4 border-b border-gray-200"></div>
        </div>

        <!-- System Status -->
        <EcoAdmin_SystemStatus :lastLogin="lastLogin" :role="role" :status="status" />
      </nav>
    </aside>
  </div>
</template>

<script setup>
import EcoAdmin_SystemStatus from './EcoAdmin_SystemStatus.vue';

const props = defineProps({
  sidebarOpen: Boolean,
  navigationSections: Array,
  currentRoute: String,
  role: String,
  lastLogin: Date,
  status: String
});

const emits = defineEmits(['toggle-sidebar']);

const getFilteredRoutes = (section) => {
  return section.routes.filter(route => {
    if (route.meta?.requiresAuth && route.meta.role && route.meta.role !== props.role.toLowerCase()) {
      return false;
    }
    return true;
  });
};

// Expanded icon mapping
const getIconForRoute = (route) => {
  const iconMap = {
    '/admin/dashboard': 'dashboard',
    '/admin/messenger': 'chat',
    '/admin/user-management': 'users',
    '/admin/crop-analysis-analytics-management': 'analytics',
    '/admin/settings/profile-display': 'settings',
    '/admin/smtp-settings': 'smtp',
    '/admin/logger': 'logger',
    '/admin/system-logs': 'logs',
    '/admin/device-management': 'tools',
    '/admin/device-logs': 'logs',
    '/admin/guest-contacts': 'contacts',
    '/admin/manage-feedback': 'feedback',
    '/admin/notifications': 'bell',
    '/admin/reports': 'reports',
    '/admin/help': 'help',
    '/admin/profile': 'user-circle'
  };
  return iconMap[route.path] || 'link';
};

const closeSidebar = () => {
  emits('toggle-sidebar');
};
</script>

<style scoped>
@media (max-width: 768px) {
  aside {
    width: 100%;
    max-width: 256px;
  }
}
aside::-webkit-scrollbar {
  width: 8px;
}
aside::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}
aside::-webkit-scrollbar-track {
  background: transparent;
}
span.inline-flex svg {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  margin: auto;
}
</style>
