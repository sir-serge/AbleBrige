<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar
      ref="sidebarRef"
      @page-change="setActivePage"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Mobile header -->
      <div
        class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30"
      >
        <button @click="toggleSidebar" class="p-2 -ml-2">
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
        <div class="font-fraunces text-lg font-bold text-dark">
          Able<span class="text-amber">Bridge</span>
        </div>
        <div class="w-10"></div>
        <!-- Spacer for centering -->
      </div>
      <!-- Dashboard Page -->
      <div v-if="activePage === 'dashboard'">
        <DashboardPage @page-change="setActivePage" @open-modal="openModal" />
      </div>

      <!-- Notifications Page -->
      <div v-if="activePage === 'notifications'">
        <NotificationsPage @page-change="setActivePage" />
      </div>

      <!-- Browse Page -->
      <div v-if="activePage === 'browse'">
        <BrowsePage @open-modal="openModal" />
      </div>

      <!-- Requests Page -->
      <div v-if="activePage === 'requests'">
        <RequestsPage @page-change="setActivePage" />
      </div>

      <!-- Profile Page -->
      <div v-if="activePage === 'profile'">
        <ProfilePage />
      </div>
    </main>
  </div>

  <!-- Modal -->
  <ItemModal
    :is-open="modalOpen"
    :item="selectedItem"
    @close="closeModal"
    @send-request="sendRequest"
  />

  <!-- Toast -->
  <Toast :is-visible="toastVisible" :message="toastMessage" :icon="toastIcon" />
</template>

<script setup>
// Dashboard View - Main authenticated user interface with sidebar navigation
// This component manages the dashboard layout and handles page routing within the dashboard
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { useEquipmentStore } from "../stores/equipment.js";
import Sidebar from "../components/Sidebar.vue";
import DashboardPage from "../components/DashboardPage.vue";
import NotificationsPage from "../components/NotificationsPage.vue";
import BrowsePage from "../components/BrowsePage.vue";
import RequestsPage from "../components/RequestsPage.vue";
import ProfilePage from "../components/ProfilePage.vue";
import ItemModal from "../components/ItemModal.vue";
import Toast from "../components/Toast.vue";

// Initialize router and stores
const router = useRouter();
const authStore = useAuthStore();
const equipmentStore = useEquipmentStore();

// ===== STATE =====
// Reference to sidebar component for mobile menu control
const sidebarRef = ref(null);
// Currently active page within dashboard (dashboard, browse, requests, notifications, profile)
const activePage = ref("dashboard");
// Modal state for item details
const modalOpen = ref(false);
// Selected item for modal display
const selectedItem = ref(null);
// Toast notification state
const toastVisible = ref(false);
// Toast message content
const toastMessage = ref("");
// Toast icon (success, error, etc.)
const toastIcon = ref("✅");

// ===== METHODS =====
// Set the active page within dashboard
// Called by sidebar navigation and child components
const setActivePage = (page) => {
  activePage.value = page;
};

// Toggle sidebar on mobile devices
// Opens/closes the mobile navigation menu
const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
};

// Open item modal with selected equipment
// Called when user clicks on equipment item
const openModal = (item) => {
  selectedItem.value = item;
  modalOpen.value = true;
};

// Close the item modal
// Called by modal close button or overlay click
const closeModal = () => {
  modalOpen.value = false;
  selectedItem.value = null;
};

// Send equipment request to donor
// Called when user requests an item from browse page
const sendRequest = (item) => {
  // Create request using equipment store
  equipmentStore.createRequest(item);

  // Show success message to user
  toastMessage.value = "Request sent! The donor has been notified.";
  toastIcon.value = "✅";
  toastVisible.value = true;

  // Close modal after request
  closeModal();

  // Auto-hide toast after 3.5 seconds
  setTimeout(() => {
    toastVisible.value = false;
  }, 3500);
};

// Handle user logout
// Called when user clicks logout in sidebar
const handleLogout = () => {
  // Logout user from auth store (clears user data and auth state)
  authStore.logout();
  // Navigate to authentication page
  router.push("/auth");
};
</script>

<style>
/* Global styles from the original HTML */
* {
  box-sizing: border-box;
}
body {
  font-family: "DM Sans", sans-serif;
}

/* Pulse animation for notifications */
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
.pulse::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #d4820a;
  animation: pulse-ring 1.4s ease-out infinite;
}
</style>
