<template>
  <!-- Recipient Dashboard Component - Main recipient interface with sidebar navigation -->
  <!-- This component provides a complete recipient dashboard experience -->
  <div class="flex min-h-screen bg-off font-sans">
    <!-- ════════════════════════════════
         SIDEBAR
    ═══════════════════════════════════ -->
    <aside
      class="bg-dark flex flex-col flex-shrink-0 h-screen transition-all duration-300 ease-in-out z-50 lg:w-60 lg:relative lg:translate-x-0 lg:static w-16 fixed left-0 top-0 -translate-x-full"
      :class="{ 'translate-x-0': mobileMenuOpen }"
    >
      <!-- Mobile Menu Toggle -->
      <div class="flex justify-end p-4 lg:hidden">
        <button
          @click="toggleMobileMenu"
          class="text-white hover:text-gray-300"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Logo Section -->
      <div class="px-3 lg:px-5 pt-7 pb-6 border-b border-white/5">
        <div class="font-fraunces text-xl font-bold text-white lg:block hidden">
          Able<span class="text-amber">Bridge</span>
        </div>
        <div class="lg:hidden flex justify-center">
          <div class="font-fraunces text-lg font-bold text-white">
            <span class="text-amber">A</span>
          </div>
        </div>
        <div class="text-xs text-muted mt-0.5 lg:block hidden">
          Recipient Portal
        </div>
      </div>

      <!-- Recipient Profile Pill -->
      <div
        class="mx-4 mt-5 bg-white/5 border border-white/8 rounded-xl p-4 user-profile-pill lg:block hidden"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-xl flex-shrink-0"
          >
            👩
          </div>
          <div class="overflow-hidden user-profile-text">
            <div class="text-sm font-semibold text-white truncate">
              {{ userDisplayName }}
            </div>
            <div class="text-xs text-muted">{{ userLocation }}</div>
          </div>
          <div
            class="mt-3 flex items-center gap-2 bg-teal/15 rounded-lg px-3 py-1.5 badge"
          >
            <span class="text-xs text-teal font-semibold"
              >♿ Recipient Account</span
            >
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-2 lg:px-3 mt-4 space-y-1">
        <div
          v-for="navItem in navigationItems"
          :key="navItem.id"
          class="nav-item"
          :class="{ active: currentPage === navItem.id }"
          @click="showPage(navItem.id)"
          :title="navItem.label"
        >
          <span class="nav-icon">{{ navItem.icon }}</span>
          <span class="nav-label lg:inline hidden">{{ navItem.label }}</span>
          <span
            v-if="navItem.badge"
            class="lg:inline hidden ml-auto bg-amber/20 text-amber text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ navItem.badge }}
          </span>
          <span class="dot lg:inline hidden"></span>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="px-2 lg:px-4 py-5 border-t border-white/5">
        <div
          class="nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10"
          @click="handleLogout"
          title="Log Out"
        >
          <span class="nav-icon">🚪</span>
          <span class="logout-text lg:inline hidden">Log Out</span>
        </div>
      </div>
    </aside>

    <!-- ════════════════════════════════
         MAIN CONTENT
    ═════════════════════════════════ -->
    <main
      class="flex-1 overflow-y-auto lg:ml-0"
      @click="mobileMenuOpen && toggleMobileMenu()"
    >
      <!-- Mobile Menu Overlay -->
      <div
        v-if="mobileMenuOpen"
        @click.stop="toggleMobileMenu"
        class="lg:hidden fixed inset-0 bg-gray-900/50 z-30"
      ></div>

      <!-- Mobile Menu Toggle Button -->
      <button
        v-if="!mobileMenuOpen"
        @click.stop="toggleMobileMenu"
        class="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md text-dark"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <!-- Dashboard Page -->
      <div v-if="currentPage === 'dashboard'" class="p-4 md:p-6 lg:p-8">
        <div
          class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8"
        >
          <div>
            <p
              class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
            >
              Recipient Dashboard
            </p>
            <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
              Good morning, {{ userDisplayName }} 👋
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              You have
              <span class="text-teal font-semibold"
                >{{ availableItemsCount }} items available</span
              >
              near you.
            </p>
          </div>
          <button
            @click="showPage('browse')"
            class="bg-teal text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-mid transition-colors flex items-center gap-2 w-full sm:w-auto"
          >
            🔍 Browse Equipment
          </button>
        </div>

        <!-- Stats Grid -->
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8"
        >
          <div
            v-for="stat in dashboardStats"
            :key="stat.id"
            class="bg-white rounded-2xl p-5 border border-teal/8"
            :class="stat.bgClass"
          >
            <div class="text-2xl mb-2">{{ stat.icon }}</div>
            <div class="font-fraunces text-3xl font-bold text-dark">
              {{ stat.value }}
            </div>
            <div class="text-xs text-muted mt-1 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Two Column Layout: Recent Requests + Available Items -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <!-- Recent Requests Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">
                My Requests
              </h3>
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
                <div
                  class="w-10 h-10 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0"
                >
                  {{ request.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-dark truncate">
                    {{ request.name }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ request.status }} · {{ request.time }}
                  </p>
                </div>
                <span :class="`pill pill-${request.status.toLowerCase()}`">{{
                  request.status
                }}</span>
              </div>
            </div>
          </div>

          <!-- Available Items Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">
                Available Near You
              </h3>
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
                <div
                  class="w-10 h-10 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0"
                >
                  {{ item.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-dark truncate">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ item.condition }} · {{ item.distance }}
                  </p>
                </div>
                <button
                  class="bg-teal text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Browse Equipment Page -->
      <div v-if="currentPage === 'browse'" class="p-4 md:p-6 lg:p-8">
        <div class="mb-8">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Find Equipment
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">
            Browse Available Equipment
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Find the equipment you need from donors in your area.
          </p>
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
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="listing-card bg-white rounded-2xl border border-teal/8 overflow-hidden flex flex-col"
          >
            <!-- Image Section -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                @error="handleImageError"
              />
              <div class="absolute top-3 right-3">
                <span class="pill pill-approved">Available</span>
              </div>
              <div
                class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg"
              >
                <span class="text-xs font-semibold text-teal">{{
                  item.category
                }}</span>
              </div>
            </div>

            <!-- Details Section -->
            <div class="p-4 flex-1 flex flex-col">
              <div class="mb-3">
                <h4 class="font-fraunces text-lg font-bold text-dark mb-1">
                  {{ item.name }}
                </h4>
                <p class="text-xs text-muted">
                  {{ item.condition }} · {{ item.distance }}
                </p>
              </div>

              <p class="text-sm text-gray-500 mb-4 leading-relaxed flex-1">
                {{ item.description }}
              </p>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-xs text-muted">
                  <span>👁️</span> {{ item.views }} views
                </div>
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

      <!-- My Requests Page -->
      <div v-if="currentPage === 'requests'" class="p-4 md:p-6 lg:p-8">
        <div class="mb-7">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Track
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">
            My Requests
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Track the status of your equipment requests.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="filter in requestFilters"
            :key="filter.id"
            class="px-3 py-2 rounded-xl text-xs font-bold min-w-0 flex-shrink-0"
            :class="
              filter.active
                ? 'bg-dark text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-teal/30'
            "
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
            class="listing-card bg-white rounded-2xl border border-teal/8 overflow-hidden flex flex-col sm:flex-row"
          >
            <!-- Icon Section -->
            <div
              class="w-full sm:w-28 h-24 sm:h-auto flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0"
              :style="`background:linear-gradient(135deg,${request.bgFrom},${request.bgTo})`"
            >
              {{ request.icon }}
            </div>

            <!-- Content Section -->
            <div class="flex-1 p-4 sm:p-5 flex flex-col">
              <!-- Header with title and status -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-fraunces text-lg font-bold text-dark truncate"
                  >
                    {{ request.name }}
                  </h4>
                  <p class="text-xs text-muted mt-1">
                    Requested {{ request.requestedTime }} ·
                    {{ request.distance }}
                  </p>
                </div>
                <span
                  class="pill ml-3 flex-shrink-0"
                  :class="request.pillClass"
                  >{{ request.status }}</span
                >
              </div>

              <!-- Request Details -->
              <div class="flex-1 mb-3">
                <div class="flex items-center gap-4 text-xs text-muted mb-2">
                  <span>👤 {{ request.donor }}</span>
                  <span>📍 {{ request.location }}</span>
                </div>
                <p v-if="request.reason" class="text-sm text-gray-600 italic">
                  "{{ request.reason }}"
                </p>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-2 mt-auto">
                <button
                  v-if="request.status === 'Pending'"
                  @click="cancelRequest(request.id)"
                  class="border border-red-100 text-red-400 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Cancel Request
                </button>
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

      <!-- Profile Page -->
      <div v-if="currentPage === 'profile'" class="p-4 md:p-6 lg:p-8">
        <div class="mb-7">
          <h1 class="font-fraunces text-3xl font-bold text-dark">My Profile</h1>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center text-3xl"
              >
                👩
              </div>
              <div>
                <h3 class="font-fraunces text-xl font-bold text-dark">
                  {{ userDisplayName }}
                </h3>
                <p class="text-sm text-muted">Recipient · {{ userLocation }}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div
                v-for="field in profileFields"
                :key="field.key"
                class="flex justify-between py-2 border-b border-gray-50"
              >
                <span
                  class="text-xs text-muted font-semibold uppercase tracking-wide"
                  >{{ field.label }}</span
                >
                <span class="text-sm text-dark">{{ field.value }}</span>
              </div>
            </div>
            <button
              class="mt-5 w-full py-3 border border-teal/20 rounded-xl text-sm font-semibold text-teal hover:bg-teal-pale transition-colors"
            >
              Edit Profile
            </button>
          </div>
          <div class="bg-teal rounded-2xl p-6">
            <h3 class="font-fraunces text-xl font-bold text-dark mb-5">
              Request Summary
            </h3>
            <div class="space-y-4">
              <div
                v-for="stat in requestSummary"
                :key="stat.id"
                class="bg-white/20 rounded-xl p-4"
              >
                <div class="font-fraunces text-3xl font-bold text-dark">
                  {{ stat.value }}
                </div>
                <div class="text-xs text-dark/70 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications Page -->
      <div v-if="currentPage === 'notifications'" class="p-4 md:p-6 lg:p-8">
        <div class="mb-7">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Updates
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">
            Notifications
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Stay updated on your equipment requests and donations.
          </p>
        </div>

        <!-- Notification Filters -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="filter in notificationFilters"
            :key="filter.id"
            class="px-3 py-2 rounded-xl text-xs font-bold min-w-0 flex-shrink-0"
            :class="
              filter.active
                ? 'bg-dark text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-teal/30'
            "
            @click="setNotificationFilter(filter.id)"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Notifications List -->
        <div class="space-y-4">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="bg-white rounded-2xl border border-teal/8 overflow-hidden"
            :class="{ 'opacity-75': notification.read }"
          >
            <div class="flex flex-col sm:flex-row">
              <!-- Icon Section -->
              <div
                class="w-full sm:w-16 h-16 sm:h-auto flex items-center justify-center text-2xl flex-shrink-0"
                :class="notification.iconBg"
              >
                {{ notification.icon }}
              </div>

              <!-- Content Section -->
              <div class="flex-1 p-4 sm:p-5">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-dark text-sm truncate mb-1">
                      {{ notification.title }}
                    </h4>
                    <p class="text-xs text-muted">
                      {{ notification.time }} · {{ notification.type }}
                    </p>
                  </div>
                  <span
                    v-if="!notification.read"
                    class="w-2 h-2 bg-teal rounded-full flex-shrink-0 ml-2"
                  ></span>
                </div>

                <p class="text-sm text-gray-600 leading-relaxed mb-3">
                  {{ notification.message }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span
                      class="pill text-xs"
                      :class="notification.statusClass"
                    >
                      {{ notification.status }}
                    </span>
                  </div>

                  <button
                    v-if="notification.action"
                    @click="handleNotificationAction(notification)"
                    class="text-xs text-teal font-semibold hover:underline"
                  >
                    {{ notification.action }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Item Request Modal -->
    <div v-if="showRequestModal" class="modal-bg open" @click="closeModal">
      <div
        style="
          background: #fff;
          border-radius: 20px;
          width: 420px;
          overflow: hidden;
        "
      >
        <div class="bg-teal p-6 text-center">
          <div class="text-4xl mb-2">{{ selectedItem?.icon }}</div>
          <h3 class="font-fraunces text-xl font-bold text-white">
            Request Equipment
          </h3>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-600 leading-relaxed mb-4">
            You are requesting <strong>{{ selectedItem?.name }}</strong> from
            {{ selectedItem?.donor }}. This will notify the donor of your
            interest.
          </p>
          <div class="bg-teal-pale rounded-xl p-4 mb-5">
            <p class="text-xs font-bold text-teal mb-1">What happens next</p>
            <p class="text-xs text-gray-500 leading-relaxed">
              1. Your request is sent to the donor<br />
              2. Donor reviews and responds within 48 hours<br />
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
    <div v-if="showToast" class="toast show">
      <span>{{ toastIcon }}</span>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
// Recipient Dashboard Component - Complete recipient interface with navigation and functionality
// This component provides a full recipient dashboard experience with all pages and interactions
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { useEquipmentStore } from "../stores/equipment.js";

// ===== COMPOSABLES =====
const router = useRouter();
const authStore = useAuthStore();
const equipmentStore = useEquipmentStore();

// ===== STATE =====
// Current active page in the dashboard
const currentPage = ref("dashboard");
// Modal visibility states
const showRequestModal = ref(false);
const showToast = ref(false);
// Selected item for request modal
const selectedItem = ref(null);
// Toast notification data
const toastIcon = ref("");
const toastMessage = ref("");
// Search and filter states
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedCondition = ref("");
// Current request filter
const currentRequestFilter = ref("all");
// Mobile menu state
const mobileMenuOpen = ref(false);

// ===== COMPUTED PROPERTIES =====
// User display name from auth store
const userDisplayName = computed(() => {
  const user = authStore.user;
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
  return user?.email?.split("@")[0] || "Claudine";
});

// User location from auth store
const userLocation = computed(() => {
  return authStore.user?.location || "Kigali, Rwanda";
});

// Navigation items for sidebar menu
const navigationItems = computed(() => [
  {
    id: "dashboard",
    icon: "🏠",
    label: "Dashboard",
    badge: null,
  },
  {
    id: "browse",
    icon: "🔍",
    label: "Browse Equipment",
    badge: null,
  },
  {
    id: "requests",
    icon: "📩",
    label: "My Requests",
    badge: equipmentStore.requests.length,
  },
  {
    id: "notifications",
    icon: "🔔",
    label: "Notifications",
    badge: 2,
  },
  {
    id: "profile",
    icon: "👤",
    label: "Profile",
    badge: null,
  },
]);

// Dashboard statistics
const dashboardStats = computed(() => [
  {
    id: 1,
    icon: "📩",
    value: equipmentStore.requests.length,
    label: "Total Requests",
    bgClass: "",
  },
  {
    id: 2,
    icon: "⏳",
    value: equipmentStore.requests.filter((r) => r.status === "Pending").length,
    label: "Pending",
    bgClass: "",
  },
  {
    id: 3,
    icon: "✅",
    value: equipmentStore.requests.filter((r) => r.status === "Approved")
      .length,
    label: "Approved",
    bgClass: "",
  },
  {
    id: 4,
    icon: "🔍",
    value: equipmentStore.availableItems.length,
    label: "Available Items",
    bgClass: "bg-dark",
  },
]);

// Count of available items
const availableItemsCount = computed(() => {
  return equipmentStore.availableItems.length;
});

// Recent requests for dashboard
const recentRequests = computed(() => {
  return equipmentStore.requests.slice(0, 3).map((request, index) => ({
    id: request.id,
    name: request.name || "Manual Wheelchair",
    icon: index === 0 ? "♿" : index === 1 ? "🩼" : "🛁",
    status: request.status || "Pending",
    time: request.time || "Just now",
  }));
});

// Available items for dashboard
const availableItems = computed(() => {
  return equipmentStore.availableItems.slice(0, 3).map((item, index) => ({
    id: item.id,
    name: item.name || "Manual Wheelchair",
    icon: item.icon || "♿",
    condition: item.condition || "Good condition",
    distance: item.distance || "📍 4 km",
  }));
});

// Filtered items based on search and filters
const filteredItems = computed(() => {
  let items = equipmentStore.availableItems;

  // Apply search filter
  if (searchQuery.value) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  // Apply category filter
  if (selectedCategory.value) {
    items = items.filter((item) => item.cat === selectedCategory.value);
  }

  // Apply condition filter
  if (selectedCondition.value) {
    items = items.filter((item) =>
      item.condition
        .toLowerCase()
        .includes(selectedCondition.value.replace("-", " ")),
    );
  }

  return items;
});

// Request filters
const requestFilters = computed(() => [
  { id: "all", label: "All (3)", active: currentRequestFilter.value === "all" },
  {
    id: "pending",
    label: "Pending (1)",
    active: currentRequestFilter.value === "pending",
  },
  {
    id: "approved",
    label: "Approved (1)",
    active: currentRequestFilter.value === "approved",
  },
  {
    id: "denied",
    label: "Denied (1)",
    active: currentRequestFilter.value === "denied",
  },
  {
    id: "cancelled",
    label: "Cancelled (0)",
    active: currentRequestFilter.value === "cancelled",
  },
]);

// Filtered requests based on current filter
const filteredRequests = computed(() => {
  const allRequests = equipmentStore.requests.map((request, index) => ({
    id: request.id,
    name: request.name || "Manual Wheelchair",
    icon: index === 0 ? "♿" : index === 1 ? "🩼" : "🛁",
    status: request.status || "Pending",
    requestedTime: request.time || "Just now",
    distance: request.distance || "📍 4 km",
    donor: request.donor || "Jean-Paul M.",
    description:
      request.description || "Adult-size wheelchair, good condition.",
    bgFrom: index === 0 ? "#E8F4F1" : index === 1 ? "#FFF3E0" : "#F0F8F6",
    bgTo: index === 0 ? "#C5E4DC" : index === 1 ? "#FFE0B2" : "#C5E4DC",
  }));

  switch (currentRequestFilter.value) {
    case "pending":
      return allRequests.filter((r) => r.status === "Pending");
    case "approved":
      return allRequests.filter((r) => r.status === "Approved");
    case "denied":
      return allRequests.filter((r) => r.status === "Denied");
    case "cancelled":
      return allRequests.filter((r) => r.status === "Cancelled");
    default:
      return allRequests;
  }
});

// Profile fields for profile page
const profileFields = computed(() => [
  {
    key: "email",
    label: "Email",
    value: authStore.user?.email || "claudine@email.com",
  },
  {
    key: "location",
    label: "Location",
    value: userLocation.value,
  },
  {
    key: "disabilityType",
    label: "Disability Type",
    value: authStore.user?.disabilityType || "Mobility Impairment",
  },
  {
    key: "disabilityCause",
    label: "Disability Cause",
    value: authStore.user?.disabilityCause || "Road Accident",
  },
  {
    key: "memberSince",
    label: "Member Since",
    value: "January 2025",
  },
]);

// Request summary for profile page
const requestSummary = computed(() => [
  {
    id: 1,
    value: equipmentStore.requests.length,
    label: "Total Requests",
  },
  {
    id: 2,
    value: equipmentStore.requests.filter((r) => r.status === "Approved")
      .length,
    label: "Approved Requests",
  },
  {
    id: 3,
    value: equipmentStore.requests.filter((r) => r.status === "Approved")
      .length,
    label: "Items Received",
  },
]);

// Notification filters
const notificationFilters = computed(() => [
  { id: "all", label: "All Notifications", active: true },
  { id: "unread", label: "Unread (2)", active: false },
  { id: "requests", label: "Requests (1)", active: false },
  { id: "system", label: "System (1)", active: false },
]);

// Current notification filter
const currentNotificationFilter = ref("all");

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: "Request Approved",
    message:
      "Your request for Manual Wheelchair has been approved by John Smith. Please contact them to arrange collection.",
    time: "2 hours ago",
    type: "Request Update",
    status: "Approved",
    read: false,
    icon: "✅",
    iconBg: "bg-green-100",
    statusClass: "pill-approved",
    action: "View Details",
  },
  {
    id: 2,
    title: "New Equipment Available",
    message:
      "A new Rollator Walker matching your preferences is now available near your location.",
    time: "5 hours ago",
    type: "Equipment Alert",
    status: "New",
    read: false,
    icon: "🚶",
    iconBg: "bg-teal-pale",
    statusClass: "pill-pending",
    action: "Browse Equipment",
  },
  {
    id: 3,
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    time: "1 day ago",
    type: "System",
    status: "Completed",
    read: true,
    icon: "👤",
    iconBg: "bg-gray-100",
    statusClass: "pill-approved",
    action: null,
  },
  {
    id: 4,
    title: "Request Reminder",
    message:
      "Don't forget to confirm collection for your approved Forearm Crutches request.",
    time: "2 days ago",
    type: "Reminder",
    status: "Pending",
    read: true,
    icon: "⏰",
    iconBg: "bg-amber-pale",
    statusClass: "pill-pending",
    action: "Confirm Collection",
  },
]);

// Filtered notifications
const filteredNotifications = computed(() => {
  let filtered = notifications.value;

  switch (currentNotificationFilter.value) {
    case "unread":
      filtered = filtered.filter((n) => !n.read);
      break;
    case "requests":
      filtered = filtered.filter(
        (n) => n.type === "Request Update" || n.type === "Reminder",
      );
      break;
    case "system":
      filtered = filtered.filter(
        (n) => n.type === "System" || n.type === "Equipment Alert",
      );
      break;
  }

  return filtered;
});

// ===== METHODS =====
// Navigate to different pages within dashboard
const showPage = (pageId) => {
  currentPage.value = pageId;
  // Close mobile sidebar on navigation
  mobileMenuOpen.value = false;
};

// Handle user logout
const handleLogout = () => {
  authStore.logout();
  router.push("/auth");
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Set request filter
const setRequestFilter = (filterId) => {
  currentRequestFilter.value = filterId;
};

// Request an item
const requestItem = (item) => {
  selectedItem.value = item;
  showRequestModal.value = true;
};

// Confirm item request
const confirmRequest = () => {
  if (selectedItem.value) {
    // Create request using equipment store
    equipmentStore.createRequest(selectedItem.value);

    // Show success toast
    showToastNotification("✅", `Request sent for ${selectedItem.value.name}!`);

    // Close modal
    closeModal();
  }
};

// Confirm collection for approved request
const confirmCollection = (request) => {
  // Update request status to collected
  equipmentStore.updateRequestStatus(request.id, "Collected");

  // Show success toast
  showToastNotification("✅", "Collection confirmed! Thank you for updating.");
};

// Handle image loading errors
const handleImageError = (event) => {
  // Fallback to icon if image fails to load
  const img = event.target;
  const item = img.closest(".listing-card").querySelector("h4")?.textContent;
  img.style.display = "none";

  // Create fallback icon container
  const fallback = document.createElement("div");
  fallback.className =
    "w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-teal-pale to-[#C5E4DC]";
  fallback.innerHTML = item?.includes("Wheelchair")
    ? "♿"
    : item?.includes("Crutch")
      ? "🩼"
      : item?.includes("Hearing")
        ? "👂"
        : item?.includes("Cane")
          ? "🦯"
          : item?.includes("Bath")
            ? "🛁"
            : "📦";

  img.parentElement.appendChild(fallback);
};

// Cancel a pending request
const cancelRequest = (requestId) => {
  if (confirm("Are you sure you want to cancel this request?")) {
    // Cancel request using equipment store method
    equipmentStore.cancelRequest(requestId);

    // Show success toast
    showToastNotification("🚫", "Request cancelled successfully.");
  }
};

// Close modal
const closeModal = () => {
  showRequestModal.value = false;
  selectedItem.value = null;
};

// Show toast notification
const showToastNotification = (icon, message) => {
  toastIcon.value = icon;
  toastMessage.value = message;
  showToast.value = true;

  // Auto-hide after 3.5 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 3500);
};

// Set notification filter
const setNotificationFilter = (filterId) => {
  currentNotificationFilter.value = filterId;
  // Update active state of filters
  notificationFilters.value.forEach((filter) => {
    filter.active = filter.id === filterId;
  });
};

// Handle notification action
const handleNotificationAction = (notification) => {
  // Mark as read
  notification.read = true;

  // Handle different actions
  switch (notification.action) {
    case "View Details":
      showPage("requests");
      break;
    case "Browse Equipment":
      showPage("browse");
      break;
    case "Confirm Collection":
      // Find the related request and confirm collection
      const request = equipmentStore.requests.find(
        (r) => r.name.includes("Forearm Crutches") && r.status === "Approved",
      );
      if (request) {
        confirmCollection(request);
      }
      break;
  }

  // Show feedback
  showToastNotification("✅", `Action completed: ${notification.action}`);
};

// Component lifecycle
onMounted(() => {
  // Initialize component
  console.log("Recipient Dashboard mounted");
});
</script>

<style scoped>
/* CSS Foundation & Resets */
* {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

/* CSS Custom Properties */
:root {
  --fa-style-family-brands: "Font Awesome 6 Brands";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-style-family-classic: "Font Awesome 6 Free";
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --teal: #1a5c52;
  --teal-mid: #2d7a6e;
  --teal-light: #4a9d8f;
  --teal-pale: #e8f4f1;
  --amber: #d4820a;
  --amber-light: #f0a030;
  --dark: #1a2e29;
  --darker: #0f1e1a;
  --cream: #f5ede3;
  --off: #f9f5f0;
  --muted: #7a9e96;
  --text: #2a2a2a;
  --white: #fefefe;
}

/* Base Styles */
body {
  font-family:
    DM Sans,
    sans-serif;
  line-height: inherit;
}

/* Navigation Styles */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #aac5bf;
  transition: all 0.18s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.nav-item.active {
  background: rgba(26, 92, 82, 0.18);
  color: #1a5c52;
}

/* Navigation Icon and Label */
.nav-icon {
  flex-shrink: 0;
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s;
}

/* Responsive Sidebar */
@media (max-width: 1023px) {
  .nav-label,
  .user-profile-text,
  .quick-request-tip,
  .logout-text,
  .badge,
  .dot {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: 12px 4px;
    gap: 0;
  }

  .nav-icon {
    font-size: 16px;
    width: auto;
  }

  /* Ensure sidebar is exactly 4rem (64px) on small screens */
  aside {
    width: 4rem !important;
  }
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
  background: #fff3e0;
  color: #d4820a;
}

.pill-approved {
  background: #e8f4f1;
  color: #1a5c52;
}

.pill-denied {
  background: #fef2f2;
  color: #dc2626;
}

/* Form Input Styles */
.ab-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #d0e8e3;
  border-radius: 8px;
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: #2a2a2a;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  background: #fff;
}

.ab-input:focus {
  border-color: #1a5c52;
  box-shadow: 0 0 0 3px rgba(26, 92, 82, 0.08);
}

.ab-input::placeholder {
  color: #aac5bf;
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
  color: #1a5c52;
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
  background: #1a2e29;
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
  height: 100%;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(26, 92, 82, 0.1);
}

/* Responsive Image Container */
.listing-card .relative.h-48 {
  min-height: 12rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .listing-card .relative.h-48 {
    min-height: 10rem;
  }

  .listing-card h4 {
    font-size: 1rem;
  }

  .listing-card p {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .listing-card .relative.h-48 {
    min-height: 8rem;
  }

  .listing-card .p-4 {
    padding: 1rem;
  }

  .listing-card button {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
