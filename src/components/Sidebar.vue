<template>
  <!-- Mobile overlay -->
  <div v-if="isMobile && isOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeSidebar"></div>

  <aside class="bg-dark flex flex-col flex-shrink-0 h-screen transition-all duration-300 ease-in-out z-50 lg:w-60 lg:relative lg:translate-x-0 lg:static w-16 fixed left-0 top-0 -translate-x-full" :class="{ 'translate-x-0': isOpen }">
    <!-- Mobile close button -->
    <div class="flex justify-end p-4 lg:hidden">
      <button @click="closeSidebar" class="text-white hover:text-gray-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <!-- Logo -->
    <div class="px-3 lg:px-5 pt-7 pb-6 border-b border-white/5">
      <div class="font-fraunces text-xl font-bold text-white lg:block hidden">
        Able<span class="text-amber">Bridge</span>
      </div>
      <div class="text-xs text-muted mt-0.5 lg:block hidden">Recipient Portal</div>
      <!-- Mobile logo - just icon -->
      <div class="lg:hidden flex justify-center">
        <div class="font-fraunces text-lg font-bold text-white">
          <span class="text-amber">A</span>
        </div>
      </div>
    </div>

    <!-- User card - hidden on mobile -->
    <div class="mx-4 mt-5 bg-white/5 border border-white/8 rounded-xl p-4 lg:block hidden">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-teal-pale flex items-center justify-center text-xl flex-shrink-0">👩</div>
        <div class="overflow-hidden">
          <div class="text-sm font-semibold text-white truncate">Claudine Uwase</div>
          <div class="text-xs text-muted">Kigali, Rwanda</div>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2 bg-teal/20 rounded-lg px-3 py-1.5">
        <span class="text-xs text-teal-lt font-medium">♿ Mobility — Wheelchair</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-2 lg:px-3 mt-4 space-y-1">
      <div
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activePage === item.id }"
        @click="setActivePage(item.id)"
        :title="item.label"
      >
        <span>{{ item.icon }}</span>
        <span class="lg:inline hidden">{{ item.label }}</span>
        <span v-if="item.badge" class="dot"></span>
        <span v-if="item.count" class="ml-auto bg-amber/20 text-amber text-xs font-bold px-2 py-0.5 rounded-full">{{ item.count }}</span>
      </div>
    </nav>

    <!-- Bottom -->
    <div class="px-2 lg:px-4 py-5 border-t border-white/5">
      <div class="nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10" @click="logout" title="Log Out">
        <span>🚪</span>
        <span class="lg:inline hidden">Log Out</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['page-change', 'logout'])

const activePage = ref('dashboard')
const isMobile = ref(false)
const isOpen = ref(false)

const navItems = ref([
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', badge: true },
  { id: 'notifications', label: 'Notifications', icon: '🔔', count: 4 },
  { id: 'browse', label: 'Browse Equipment', icon: '🔍' },
  { id: 'requests', label: 'My Requests', icon: '📋', count: 2 },
  { id: 'profile', label: 'Profile', icon: '👤' }
])

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024 // lg breakpoint
  if (!isMobile.value) {
    isOpen.value = true // Always open on desktop
  } else {
    isOpen.value = false // Closed by default on mobile
  }
}

const setActivePage = (page) => {
  activePage.value = page
  emit('page-change', page)
  if (isMobile.value) {
    closeSidebar()
  }
}

const closeSidebar = () => {
  if (isMobile.value) {
    isOpen.value = false
  }
}

const logout = () => {
  emit('logout')
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// Expose methods for parent component
defineExpose({
  openSidebar: () => { isOpen.value = true },
  closeSidebar,
  toggleSidebar: () => { isOpen.value = !isOpen.value }
})
</script>

<style scoped>
.nav-item {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 12px; border-radius: 10px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  color: #7A9E96; transition: all 0.18s;
  justify-content: center;
}
.nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
.nav-item.active { background: rgba(212,130,10,0.15); color: #D4820A; }
.nav-item .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #D4820A; margin-left: auto; flex-shrink: 0;
}

/* Desktop styles */
@media (min-width: 1024px) {
  .nav-item {
    gap: 12px;
    padding: 11px 16px;
    justify-content: flex-start;
  }
}
</style>