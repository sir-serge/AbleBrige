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
        class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center"
        :class="
          request.borderClass + ' ' + (request.opacity ? 'opacity-70' : '')
        "
      >
        <!-- Request Content Section -->
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <!-- Equipment Icon -->
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            :class="request.iconClass"
          >
            {{ request.icon }}
          </div>

          <!-- Request Details -->
          <div class="flex-1 min-w-0">
            <!-- Equipment name with truncate for long names -->
            <p
              class="font-semibold text-dark text-sm md:text-base truncate mb-1"
            >
              {{ request.name }}
            </p>
            <!-- Donor and location info -->
            <p class="text-xs text-muted truncate">
              {{ request.donor }} · {{ request.location }}
            </p>
            <!-- Time information -->
            <p class="text-xs text-gray-400 mt-0.5">{{ request.time }}</p>
          </div>
        </div>

        <!-- Status and Actions Section -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0"
        >
          <!-- Status Badge -->
          <span
            class="pill self-start sm:self-auto"
            :class="request.pillClass"
            >{{ request.status }}</span
          >

          <!-- Action Buttons Container -->
          <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <!-- Alternative Action Button (if available) -->
            <button
              v-if="request.altAction"
              class="bg-gray-100 text-gray-500 text-xs px-3 md:px-4 py-2 rounded-lg font-semibold cursor-default w-full sm:w-auto"
            >
              {{ request.altAction }}
            </button>

            <!-- Primary Action Button (if available) -->
            <button
              v-if="request.action"
              class="bg-teal text-white text-xs px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-teal-mid transition-colors w-full sm:w-auto"
              :class="request.actionClass"
              @click="handleAction(request.action)"
            >
              {{ request.action }}
            </button>

            <!-- Cancel Button (for pending and approved requests) - LAST BUTTON -->
            <button
              v-if="
                request.status === 'Pending' || request.status === 'Approved'
              "
              class="bg-gray-100 text-gray-500 text-xs px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto"
              @click="handleCancel(request.id)"
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue Composition API - Reactive data and imports
import { computed } from "vue";
import { useEquipmentStore } from "../stores/equipment.js";

// Define custom events that this component can emit to parent
defineEmits(["page-change"]);

// Use Pinia store for centralized state management
const equipmentStore = useEquipmentStore();

// Computed property to get requests from store
const requests = computed(() => equipmentStore.requests);

// Handle button clicks on request actions
const handleAction = (action) => {
  if (action === "Find Similar") {
    // Emit to change to browse page
    emit("page-change", "browse");
  } else if (action === "Arrange Pickup") {
    // Update request status to approved
    const requestId = requests.value.find((r) => r.action === action)?.id;
    if (requestId) {
      equipmentStore.updateRequestStatus(requestId, "Approved");
    }
  }
};

// Handle request cancellation
const handleCancel = (requestId) => {
  equipmentStore.cancelRequest(requestId);
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

/* Cancelled Status - Gray pill */
.pill-cancelled {
  background: #f8f9fa;
  color: #6b7280;
}
</style>
