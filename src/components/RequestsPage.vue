<template>
  <!-- Requests Page Component - User's equipment requests with status tracking and actions -->
  <div class="p-4 md:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="mb-4 md:mb-7">
      <!-- Breadcrumb/Category indicator -->
      <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">
        Tracking
      </p>
      <!-- Main page title using Fraunces serif font -->
      <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
        My Requests
      </h1>
    </div>

    <!-- Requests List Container -->
    <div class="space-y-3 md:space-y-4">
      <!-- Dynamic request cards loop -->
      <div
        v-for="request in requests"
        :key="request.id"
        class="bg-white rounded-2xl p-4 md:p-5 border flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center"
        :class="
          request.borderClass + ' ' + (request.opacity ? 'opacity-70' : '')
        "
      >
        <!-- Request Content Section -->
        <div class="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
          <!-- Equipment Icon -->
          <div
            class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0"
            :class="request.iconClass"
          >
            {{ request.icon }}
          </div>

          <!-- Request Details -->
          <div class="flex-1 min-w-0">
            <!-- Equipment name with truncate for long names -->
            <p class="font-semibold text-dark text-sm md:text-base truncate">
              {{ request.name }}
            </p>
            <!-- Donor and location info -->
            <p class="text-xs text-muted mt-0.5 truncate">
              {{ request.donor }} · {{ request.location }}
            </p>
            <!-- Time information -->
            <p class="text-xs text-gray-400 mt-0.5">{{ request.time }}</p>
          </div>
        </div>

        <!-- Status and Actions Section -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0"
        >
          <!-- Status Badge -->
          <span class="pill self-start" :class="request.pillClass">{{
            request.status
          }}</span>

          <!-- Action Button (if available) -->
          <button
            v-if="request.action"
            class="bg-teal text-white text-xs px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-teal-mid transition-colors w-full sm:w-auto"
            :class="request.actionClass"
            @click="handleAction(request.action)"
          >
            {{ request.action }}
          </button>

          <!-- Alternative Action Button (if available) -->
          <button
            v-if="request.altAction"
            class="bg-gray-100 text-gray-500 text-xs px-3 md:px-4 py-2 rounded-lg font-semibold cursor-default w-full sm:w-auto"
          >
            {{ request.altAction }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue Composition API - Reactive data and imports
import { ref } from "vue";

// Define custom events that this component can emit to parent
defineEmits(["page-change"]);

// Reactive requests data - User's equipment requests with status and actions
// Each request has: id, name, icon, donor, location, time, status, and styling classes
const requests = ref([
  {
    id: 1,
    name: "Manual Wheelchair",
    icon: "♿",
    iconClass: "bg-teal-pale", // Background color for icon
    donor: "Donor: Jean-Paul M.",
    location: "Kigali",
    time: "Requested 3 days ago",
    status: "Approved",
    pillClass: "pill-approved", // Green status badge
    borderClass: "border-teal/10", // Green border
    action: "Arrange Pickup", // Primary action button
  },
  {
    id: 2,
    name: "Forearm Crutches",
    icon: "🩼",
    iconClass: "bg-[#FFF3E0]", // Amber background for icon
    donor: "Donor: Alice K.",
    location: "Kigali",
    time: "Requested yesterday",
    status: "Pending",
    pillClass: "pill-pending", // Amber status badge
    borderClass: "border-amber/15", // Amber border
    altAction: "Waiting...", // Disabled alternative action
  },
  {
    id: 3,
    name: "Bath Safety Seat",
    icon: "🛁",
    iconClass: "bg-red-50", // Red background for icon
    donor: "Donor: Samuel O.",
    location: "Nairobi",
    time: "Requested 1 week ago",
    status: "Denied",
    pillClass: "pill-denied", // Red status badge
    borderClass: "border-red-100", // Red border
    opacity: true, // Reduced opacity for denied items
    action: "Find Similar", // Alternative action for denied requests
    actionClass: "hover:bg-teal-mid",
  },
]);

// Handle button clicks on request actions
const handleAction = (action) => {
  if (action === "Find Similar") {
    // Emit event to parent to navigate to browse page
    emit("page-change", "browse");
  }
};
</script>

<style scoped>
/* Status Badge Styles - Base styling for all status pills */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

/* Approved Status - Green pill */
.pill-approved {
  background: #e8f4f1;
  color: #1a5c52;
}

/* Pending Status - Amber pill */
.pill-pending {
  background: #fff8ee;
  color: #d4820a;
}

/* Denied Status - Red pill */
.pill-denied {
  background: #fef2f2;
  color: #dc2626;
}
</style>
