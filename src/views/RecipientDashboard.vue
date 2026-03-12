<template>
  <!-- Recipient Dashboard Component - Main recipient interface with sidebar navigation -->
  <!-- This component provides a complete recipient dashboard experience -->
  <div class="flex min-h-screen bg-off font-sans">
    
    <!-- ════════════════════════════════
         SIDEBAR
    ═══════════════════════════════════ -->
    <aside class="w-60 bg-dark flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
      
      <!-- Logo Section -->
      <div class="px-5 pt-7 pb-5 border-b border-white/5">
        <div class="font-fraunces text-xl font-bold text-white">Able<span class="text-amber">Bridge</span></div>
        <div class="text-xs text-muted mt-0.5">Recipient Portal</div>
      </div>

      <!-- Recipient Profile Pill -->
      <div class="mx-4 mt-5 bg-white/5 border border-white/8 rounded-xl p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-xl flex-shrink-0">👩</div>
          <div class="overflow-hidden">
            <div class="text-sm font-semibold text-white truncate">{{ userDisplayName }}</div>
            <div class="text-xs text-muted">{{ userLocation }}</div>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2 bg-teal/15 rounded-lg px-3 py-1.5">
          <span class="text-xs text-teal font-semibold">♿ Recipient Account</span>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-3 mt-4 space-y-1">
        <div 
          v-for="navItem in navigationItems" 
          :key="navItem.id"
          class="nav-item"
          :class="{ active: currentPage === navItem.id }"
          @click="showPage(navItem.id)"
        >
          <span>{{ navItem.icon }}</span> {{ navItem.label }}
          <span 
            v-if="navItem.badge" 
            class="ml-auto bg-amber/20 text-amber text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ navItem.badge }}
          </span>
        </div>
      </nav>

      <!-- Quick Request Tip -->
      <div class="mx-4 mb-4 bg-teal/10 border border-teal/20 rounded-xl p-4">
        <p class="text-xs text-teal font-semibold mb-1">💡 Did you know?</p>
        <p class="text-xs text-muted leading-relaxed">Most requests are matched within <span class="text-white font-semibold">24 hours</span> of submission.</p>
      </div>

      <!-- Logout Button -->
      <div class="px-3 pb-5 border-t border-white/5 pt-3">
        <div class="nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10" @click="handleLogout">
          <span>🚪</span> Log Out
        </div>
      </div>
    </aside>

    <!-- ════════════════════════════════
         MAIN CONTENT
    ═════════════════════════════════ -->
    <main class="flex-1 overflow-y-auto">
      
      <!-- Dashboard Page -->
      <div v-if="currentPage === 'dashboard'" class="p-8">
        <div class="flex items-start justify-between mb-8">
          <div>
            <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">Recipient Dashboard</p>
            <h1 class="font-fraunces text-3xl font-bold text-dark">Good morning, {{ userDisplayName }} 👋</h1>
            <p class="text-sm text-gray-500 mt-1">You have <span class="text-teal font-semibold">{{ availableItemsCount }} items available</span> near you.</p>
          </div>
          <button 
            @click="showPage('browse')"
            class="bg-teal text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-mid transition-colors flex items-center gap-2"
          >
            🔍 Browse Equipment
          </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-5 mb-8">
          <div 
            v-for="stat in dashboardStats" 
            :key="stat.id"
            class="bg-white rounded-2xl p-5 border border-teal/8"
            :class="stat.bgClass"
          >
            <div class="text-2xl mb-2">{{ stat.icon }}</div>
            <div class="font-fraunces text-3xl font-bold text-dark">{{ stat.value }}</div>
            <div class="text-xs text-muted mt-1 font-medium">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Two Column Layout: Recent Requests + Available Items -->
        <div class="grid grid-cols-2 gap-6">
          
          <!-- Recent Requests Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">My Requests</h3>
              <span 
                class="text-xs text-teal font-semibold cursor-pointer hover:underline"
                @click="showPage('requests')"
              >
                See all →
              </span>
            </div>
            <div class="space-y-3">
              <div 
                v-for="request in recentRequests" 
                :key="request.id"
                class="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/20 transition-colors"
              >
                <div class="w-10 h-10 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0">
                  {{ request.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-dark truncate">{{ request.name }}</p>
                  <p class="text-xs text-muted">{{ request.status }} · {{ request.time }}</p>
                </div>
                <span :class="`pill pill-${request.status.toLowerCase()}`">{{ request.status }}</span>
              </div>
            </div>
          </div>

          <!-- Available Items Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">Available Near You</h3>
              <span 
                class="text-xs text-teal font-semibold cursor-pointer hover:underline"
                @click="showPage('browse')"
              >
                Browse all →
              </span>
            </div>
            <div class="space-y-3">
              <div 
                v-for="item in availableItems" 
                :key="item.id"
                class="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/20 transition-colors cursor-pointer"
                @click="requestItem(item)"
              >
                <div class="w-10 h-10 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0">
                  {{ item.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-dark truncate">{{ item.name }}</p>
                  <p class="text-xs text-muted">{{ item.condition }} · {{ item.distance }}</p>
                </div>
                <button class="bg-teal text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors">
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Help Resources -->
        <div class="mt-6 bg-teal rounded-2xl p-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10" style="background:radial-gradient(circle at 10% 50%,#4A9D8F,transparent 50%),radial-gradient(circle at 90% 20%,#D4820A,transparent 45%)"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold tracking-widest uppercase text-muted mb-2">Help & Resources</p>
              <h3 class="font-fraunces text-2xl font-bold text-white mb-1">Get the support you need</h3>
              <p class="text-sm text-muted">Access guides, tutorials, and community support for your equipment needs.</p>
            </div>
            <button 
              @click="showPage('help')"
              class="bg-white text-teal px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-pale transition-colors flex-shrink-0 ml-6"
            >
              View Resources →
            </button>
          </div>
        </div>
      </div>

      <!-- Browse Equipment Page -->
      <div v-if="currentPage === 'browse'" class="p-8">
        <div class="mb-8">
          <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">Find Equipment</p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">Browse Available Equipment</h1>
          <p class="text-sm text-gray-500 mt-1">Find the equipment you need from donors in your area.</p>
        </div>

        <!-- Search and Filters -->
        <div class="bg-white rounded-2xl p-6 border border-teal/8 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="ab-label">Search Equipment</label>
              <input 
                v-model="searchQuery"
                class="ab-input" 
                type="text" 
                placeholder="Search for equipment..."
              />
            </div>
            <div>
              <label class="ab-label">Category</label>
              <select v-model="selectedCategory" class="ab-input ab-select">
                <option value="">All Categories</option>
                <option value="mobility">Mobility Aids</option>
                <option value="hearing">Hearing Assistance</option>
                <option value="vision">Vision Aids</option>
                <option value="daily">Daily Living</option>
                <option value="cognitive">Cognitive Support</option>
              </select>
            </div>
            <div>
              <label class="ab-label">Condition</label>
              <select v-model="selectedCondition" class="ab-input ab-select">
                <option value="">Any Condition</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Equipment Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in filteredItems" 
            :key="item.id"
            class="listing-card bg-white rounded-2xl border border-teal/8 overflow-hidden"
          >
            <div class="flex">
              <div 
                class="w-28 flex items-center justify-center text-5xl flex-shrink-0"
                :style="`background:linear-gradient(135deg,${item.bgFrom},${item.bgTo})`"
              >
                {{ item.icon }}
              </div>
              <div class="flex-1 p-5">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4 class="font-fraunces text-lg font-bold text-dark">{{ item.name }}</h4>
                    <p class="text-xs text-muted">{{ item.category }} · {{ item.condition }} · {{ item.distance }}</p>
                  </div>
                  <span class="pill pill-approved">Available</span>
                </div>
                <p class="text-sm text-gray-500 mb-4 leading-relaxed">{{ item.description }}</p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1.5 text-xs text-muted">
                    <span>👁️</span> {{ item.views }} views
                  </div>
                  <div class="ml-auto">
                    <button 
                      @click="requestItem(item)"
                      class="bg-teal text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-teal-mid transition-colors"
                    >
                      Request Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Requests Page -->
      <div v-if="currentPage === 'requests'" class="p-8">
        <div class="mb-7">
          <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">Track</p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">My Requests</h1>
          <p class="text-sm text-gray-500 mt-1">Track the status of your equipment requests.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-2 mb-6">
          <button 
            v-for="filter in requestFilters" 
            :key="filter.id"
            class="px-4 py-2 rounded-xl text-xs font-bold"
            :class="filter.active ? 'bg-dark text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-teal/30'"
            @click="setRequestFilter(filter.id)"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Requests List -->
        <div class="space-y-4">
          <div 
            v-for="request in filteredRequests" 
            :key="request.id"
            class="listing-card bg-white rounded-2xl border border-teal/8 overflow-hidden"
          >
            <div class="flex">
              <div 
                class="w-28 flex items-center justify-center text-5xl flex-shrink-0"
                :style="`background:linear-gradient(135deg,${request.bgFrom},${request.bgTo})`"
              >
                {{ request.icon }}
              </div>
              <div class="flex-1 p-5">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4 class="font-fraunces text-lg font-bold text-dark">{{ request.name }}</h4>
                    <p class="text-xs text-muted">Requested {{ request.requestedTime }} · {{ request.distance }}</p>
                  </div>
                  <span :class="`pill pill-${request.status.toLowerCase()}`">{{ request.status }}</span>
                </div>
                <p class="text-sm text-gray-500 mb-4 leading-relaxed">{{ request.description }}</p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1.5 text-xs text-muted">
                    <span>👤</span> {{ request.donor }}
                  </div>
                  <div class="ml-auto">
                    <button 
                      v-if="request.status === 'Approved'"
                      @click="confirmCollection(request)"
                      class="bg-amber text-dark text-xs px-4 py-2 rounded-lg font-bold hover:bg-amber-lt transition-colors"
                    >
                      Confirm Collection
                    </button>
                    <button 
                      v-else-if="request.status === 'Pending'"
                      class="bg-gray-100 text-gray-400 text-xs px-4 py-2 rounded-lg font-bold cursor-default"
                      disabled
                    >
                      Awaiting Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Page -->
      <div v-if="currentPage === 'profile'" class="p-8">
        <div class="mb-7">
          <h1 class="font-fraunces text-3xl font-bold text-dark">My Profile</h1>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center text-3xl">👩</div>
              <div>
                <h3 class="font-fraunces text-xl font-bold text-dark">{{ userDisplayName }}</h3>
                <p class="text-sm text-muted">Recipient · {{ userLocation }}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div 
                v-for="field in profileFields" 
                :key="field.key"
                class="flex justify-between py-2 border-b border-gray-50"
              >
                <span class="text-xs text-muted font-semibold uppercase tracking-wide">{{ field.label }}</span>
                <span class="text-sm text-dark">{{ field.value }}</span>
              </div>
            </div>
            <button class="mt-5 w-full py-3 border border-teal/20 rounded-xl text-sm font-semibold text-teal hover:bg-teal-pale transition-colors">
              Edit Profile
            </button>
          </div>
          <div class="bg-teal rounded-2xl p-6">
            <h3 class="font-fraunces text-xl font-bold text-dark mb-5">Request Summary</h3>
            <div class="space-y-4">
              <div 
                v-for="stat in requestSummary" 
                :key="stat.id"
                class="bg-white/20 rounded-xl p-4"
              >
                <div class="font-fraunces text-3xl font-bold text-dark">{{ stat.value }}</div>
                <div class="text-xs text-dark/70 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Item Request Modal -->
    <div 
      v-if="showRequestModal" 
      class="modal-bg open" 
      @click="closeModal"
    >
      <div style="background:#fff;border-radius:20px;width:420px;overflow:hidden">
        <div class="bg-teal p-6 text-center">
          <div class="text-4xl mb-2">{{ selectedItem?.icon }}</div>
          <h3 class="font-fraunces text-xl font-bold text-white">Request Equipment</h3>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-600 leading-relaxed mb-4">
            You are requesting <strong>{{ selectedItem?.name }}</strong> from {{ selectedItem?.donor }}.
            This will notify the donor of your interest.
          </p>
          <div class="bg-teal-pale rounded-xl p-4 mb-5">
            <p class="text-xs font-bold text-teal mb-1">What happens next</p>
            <p class="text-xs text-gray-500 leading-relaxed">
              1. Your request is sent to the donor<br>
              2. Donor reviews and responds within 48 hours<br>
              3. If approved, you'll receive contact details
            </p>
          </div>
          <div class="flex gap-3">
            <button 
              @click="confirmRequest"
              class="flex-1 bg-teal text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-mid transition-colors"
            >
              ✓ Send Request
            </button>
            <button 
              @click="closeModal"
              class="px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="showToast" 
      class="toast show"
    >
      <span>{{ toastIcon }}</span>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
// Recipient Dashboard Component - Complete recipient interface with navigation and functionality
// This component provides a full recipient dashboard experience with all pages and interactions
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useEquipmentStore } from '../stores/equipment.js'

// ===== COMPOSABLES =====
const router = useRouter()
const authStore = useAuthStore()
const equipmentStore = useEquipmentStore()

// ===== STATE =====
// Current active page in the dashboard
const currentPage = ref('dashboard')
// Modal visibility states
const showRequestModal = ref(false)
const showToast = ref(false)
// Selected item for request modal
const selectedItem = ref(null)
// Toast notification data
const toastIcon = ref('')
const toastMessage = ref('')
// Search and filter states
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedCondition = ref('')
// Current request filter
const currentRequestFilter = ref('all')

// ===== COMPUTED PROPERTIES =====
// User display name from auth store
const userDisplayName = computed(() => {
  const user = authStore.user
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim()
  }
  return user?.email?.split('@')[0] || 'Claudine'
})

// User location from auth store
const userLocation = computed(() => {
  return authStore.user?.location || 'Kigali, Rwanda'
})

// Navigation items for sidebar menu
const navigationItems = computed(() => [
  {
    id: 'dashboard',
    icon: '🏠',
    label: 'Dashboard',
    badge: null
  },
  {
    id: 'browse',
    icon: '🔍',
    label: 'Browse Equipment',
    badge: null
  },
  {
    id: 'requests',
    icon: '📩',
    label: 'My Requests',
    badge: equipmentStore.requests.length
  },
  {
    id: 'notifications',
    icon: '🔔',
    label: 'Notifications',
    badge: 2
  },
  {
    id: 'help',
    icon: '📚',
    label: 'Help & Resources',
    badge: null
  },
  {
    id: 'profile',
    icon: '👤',
    label: 'Profile',
    badge: null
  }
])

// Dashboard statistics
const dashboardStats = computed(() => [
  {
    id: 1,
    icon: '📩',
    value: equipmentStore.requests.length,
    label: 'Total Requests',
    bgClass: ''
  },
  {
    id: 2,
    icon: '⏳',
    value: equipmentStore.requests.filter(r => r.status === 'Pending').length,
    label: 'Pending',
    bgClass: ''
  },
  {
    id: 3,
    icon: '✅',
    value: equipmentStore.requests.filter(r => r.status === 'Approved').length,
    label: 'Approved',
    bgClass: ''
  },
  {
    id: 4,
    icon: '🔍',
    value: equipmentStore.availableItems.length,
    label: 'Available Items',
    bgClass: 'bg-dark'
  }
])

// Count of available items
const availableItemsCount = computed(() => {
  return equipmentStore.availableItems.length
})

// Recent requests for dashboard
const recentRequests = computed(() => {
  return equipmentStore.requests
    .slice(0, 3)
    .map((request, index) => ({
      id: request.id,
      name: request.name || 'Manual Wheelchair',
      icon: index === 0 ? '♿' : index === 1 ? '🩼' : '🛁',
      status: request.status || 'Pending',
      time: request.time || 'Just now'
    }))
})

// Available items for dashboard
const availableItems = computed(() => {
  return equipmentStore.availableItems
    .slice(0, 3)
    .map((item, index) => ({
      id: item.id,
      name: item.name || 'Manual Wheelchair',
      icon: item.icon || '♿',
      condition: item.condition || 'Good condition',
      distance: item.distance || '📍 4 km'
    }))
})

// Filtered items based on search and filters
const filteredItems = computed(() => {
  let items = equipmentStore.availableItems

  // Apply search filter
  if (searchQuery.value) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Apply category filter
  if (selectedCategory.value) {
    items = items.filter(item => 
      item.cat === selectedCategory.value
    )
  }

  // Apply condition filter
  if (selectedCondition.value) {
    items = items.filter(item => 
      item.condition.toLowerCase().includes(selectedCondition.value.replace('-', ' '))
    )
  }

  return items
})

// Request filters
const requestFilters = computed(() => [
  { id: 'all', label: 'All (3)', active: currentRequestFilter.value === 'all' },
  { id: 'pending', label: 'Pending (1)', active: currentRequestFilter.value === 'pending' },
  { id: 'approved', label: 'Approved (1)', active: currentRequestFilter.value === 'approved' },
  { id: 'denied', label: 'Denied (1)', active: currentRequestFilter.value === 'denied' }
])

// Filtered requests based on current filter
const filteredRequests = computed(() => {
  const allRequests = equipmentStore.requests.map((request, index) => ({
    id: request.id,
    name: request.name || 'Manual Wheelchair',
    icon: index === 0 ? '♿' : index === 1 ? '🩼' : '🛁',
    status: request.status || 'Pending',
    requestedTime: request.time || 'Just now',
    distance: request.distance || '📍 4 km',
    donor: request.donor || 'Jean-Paul M.',
    description: request.description || 'Adult-size wheelchair, good condition.',
    bgFrom: index === 0 ? '#E8F4F1' : index === 1 ? '#FFF3E0' : '#F0F8F6',
    bgTo: index === 0 ? '#C5E4DC' : index === 1 ? '#FFE0B2' : '#C5E4DC'
  }))

  switch (currentRequestFilter.value) {
    case 'pending':
      return allRequests.filter(r => r.status === 'Pending')
    case 'approved':
      return allRequests.filter(r => r.status === 'Approved')
    case 'denied':
      return allRequests.filter(r => r.status === 'Denied')
    default:
      return allRequests
  }
})

// Profile fields for profile page
const profileFields = computed(() => [
  {
    key: 'email',
    label: 'Email',
    value: authStore.user?.email || 'claudine@email.com'
  },
  {
    key: 'location',
    label: 'Location',
    value: userLocation.value
  },
  {
    key: 'disabilityType',
    label: 'Disability Type',
    value: authStore.user?.disabilityType || 'Mobility Impairment'
  },
  {
    key: 'disabilityCause',
    label: 'Disability Cause',
    value: authStore.user?.disabilityCause || 'Road Accident'
  },
  {
    key: 'memberSince',
    label: 'Member Since',
    value: 'January 2025'
  }
])

// Request summary for profile page
const requestSummary = computed(() => [
  {
    id: 1,
    value: equipmentStore.requests.length,
    label: 'Total Requests'
  },
  {
    id: 2,
    value: equipmentStore.requests.filter(r => r.status === 'Approved').length,
    label: 'Approved Requests'
  },
  {
    id: 3,
    value: equipmentStore.requests.filter(r => r.status === 'Approved').length,
    label: 'Items Received'
  }
])

// ===== METHODS =====
// Navigate to different pages within dashboard
const showPage = (pageId) => {
  currentPage.value = pageId
}

// Handle user logout
const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}

// Set request filter
const setRequestFilter = (filterId) => {
  currentRequestFilter.value = filterId
}

// Request an item
const requestItem = (item) => {
  selectedItem.value = item
  showRequestModal.value = true
}

// Confirm item request
const confirmRequest = () => {
  if (selectedItem.value) {
    // Create request using equipment store
    equipmentStore.createRequest(selectedItem.value)
    
    // Show success toast
    showToastNotification('✅', `Request sent for ${selectedItem.value.name}!`)
    
    // Close modal
    closeModal()
  }
}

// Confirm collection for approved request
const confirmCollection = (request) => {
  // Update request status to collected
  equipmentStore.updateRequestStatus(request.id, 'Collected')
  
  // Show success toast
  showToastNotification('✅', 'Collection confirmed! Thank you for updating.')
}

// Close modal
const closeModal = () => {
  showRequestModal.value = false
  selectedItem.value = null
}

// Show toast notification
const showToastNotification = (icon, message) => {
  toastIcon.value = icon
  toastMessage.value = message
  showToast.value = true
  
  // Auto-hide after 3.5 seconds
  setTimeout(() => {
    showToast.value = false
  }, 3500)
}

// Component lifecycle
onMounted(() => {
  // Initialize component
  console.log('Recipient Dashboard mounted')
})
</script>

<style scoped>
/* Navigation Styles */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #7A9E96;
  transition: all 0.18s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.nav-item.active {
  background: rgba(26, 92, 82, 0.18);
  color: #1A5C52;
}

/* Status Pills */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.pill-pending {
  background: #FFF3E0;
  color: #D4820A;
}

.pill-approved {
  background: #E8F4F1;
  color: #1A5C52;
}

.pill-denied {
  background: #FEF2F2;
  color: #DC2626;
}

/* Form Input Styles */
.ab-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #D0E8E3;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #2A2A2A;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;
}

.ab-input:focus {
  border-color: #1A5C52;
  box-shadow: 0 0 0 3px rgba(26, 92, 82, 0.08);
}

.ab-input::placeholder {
  color: #AAC5BF;
}

.ab-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A9E96' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.ab-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #1A5C52;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

/* Modal Styles */
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(26, 46, 41, 0.72);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}

.modal-bg.open {
  opacity: 1;
  pointer-events: all;
}

/* Toast Styles */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  background: #1A2E29;
  color: #fff;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform: translateY(80px);
  opacity: 0;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

/* Card Hover Effects */
.listing-card {
  transition: all 0.22s;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(26, 92, 82, 0.10);
}
</style>
