<template>
  <!-- Profile Page Component - User profile with personal info and impact statistics -->
  <div class="p-4 md:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="mb-4 md:mb-7">
      <!-- Main page title using Fraunces serif font -->
      <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
        My Profile
      </h1>
    </div>

    <!-- Main Content Grid - Two columns on large screens -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Left Column: User Profile Information -->
      <div class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8">
        <!-- User Avatar and Name Section -->
        <div class="flex items-center gap-4 mb-4 md:mb-6">
          <!-- User Avatar - Circular with emoji icon -->
          <div
            class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-pale flex items-center justify-center text-2xl md:text-3xl"
          >
            👩
          </div>
          <!-- User Info - Name and role/location -->
          <div class="min-w-0 flex-1">
            <!-- User name with truncate for long names -->
            <h3
              class="font-fraunces text-lg md:text-xl font-bold text-dark truncate"
            >
              Claudine Uwase
            </h3>
            <!-- User role and location -->
            <p class="text-sm text-muted">Recipient · Kigali, Rwanda</p>
          </div>
        </div>

        <!-- Profile Fields Section -->
        <div class="space-y-3">
          <!-- Dynamic profile fields loop -->
          <div
            v-for="field in profileFields"
            :key="field.key"
            class="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-50 gap-1"
          >
            <!-- Field label with uppercase styling -->
            <span
              class="text-xs text-muted font-semibold uppercase tracking-wide"
              >{{ field.label }}</span
            >
            <!-- Field value with word wrap for long content -->
            <span class="text-sm text-dark break-words">{{ field.value }}</span>
          </div>
        </div>

        <!-- Edit Profile Button -->
        <button
          class="mt-5 w-full py-3 border border-teal/20 rounded-xl text-sm font-semibold text-teal hover:bg-teal-pale transition-colors"
        >
          Edit Profile
        </button>
      </div>

      <!-- Right Column: User Impact Statistics -->
      <div class="bg-teal rounded-2xl p-4 md:p-6 text-white">
        <!-- Impact Section Header -->
        <h3 class="font-fraunces text-lg md:text-xl font-bold mb-4 md:mb-5">
          Your Impact
        </h3>

        <!-- Impact Statistics Grid -->
        <div class="space-y-4">
          <!-- Dynamic impact stats loop -->
          <div
            v-for="stat in impactStats"
            :key="stat.id"
            class="bg-white/10 rounded-xl p-3 md:p-4"
          >
            <!-- Stat value with Fraunces font and amber highlight -->
            <div
              class="font-fraunces text-2xl md:text-3xl text-amber font-bold"
            >
              {{ stat.value }}
            </div>
            <!-- Stat label with muted color -->
            <div class="text-xs text-[#AECCC7] mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue Composition API - Reactive data and imports
import { ref } from "vue";

// Reactive profile fields data - User personal information
// Each field has: key (unique identifier), label (display name), value (field content)
const profileFields = ref([
  { key: "email", label: "Email", value: "claudine@email.com" },
  { key: "location", label: "Location", value: "Kigali, Rwanda" },
  { key: "disability", label: "Disability", value: "Mobility — Wheelchair" },
  { key: "memberSince", label: "Member Since", value: "January 2025" },
]);

// Reactive impact statistics data - User's platform activity metrics
// Each stat has: id (unique identifier), value (numeric value), label (description)
const impactStats = ref([
  { id: 1, value: 3, label: "Equipment Requests Made" }, // Number of items user has requested
  { id: 2, value: 1, label: "Items Successfully Received" }, // Number of items user actually received
  { id: 3, value: 6, label: "Items Available Near You" }, // Available items in user's area
]);
</script>

<style scoped>
/* Profile Page Component Styles */
/* Component-specific styles can be added here if needed */
</style>
