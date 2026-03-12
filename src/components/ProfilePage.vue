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
            {{ userAvatar }}
          </div>
          <!-- User Info - Name and role/location -->
          <div class="min-w-0 flex-1">
            <!-- User name with truncate for long names -->
            <h3
              class="font-fraunces text-lg md:text-xl font-bold text-dark truncate"
            >
              {{ userDisplayName }}
            </h3>
            <!-- User role and location -->
            <p class="text-sm text-muted">{{ userRoleAndLocation }}</p>
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
            <!-- Field value or input -->
            <div
              v-if="isEditing && field.editable"
              class="flex items-center gap-2"
            >
              <input
                v-model="editForm[field.key]"
                :type="field.type || 'text'"
                class="text-sm border border-gray-200 rounded px-2 py-1 flex-1"
                :placeholder="field.value"
              />
              <button
                @click="cancelEdit"
                class="text-xs text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <span v-else class="text-sm text-dark break-words">{{
              field.value
            }}</span>
          </div>
        </div>

        <!-- Edit/Save/Cancel Buttons -->
        <div class="mt-5 flex gap-2">
          <button
            v-if="!isEditing"
            @click="startEdit"
            class="w-full py-3 border border-teal/20 rounded-xl text-sm font-semibold text-teal hover:bg-teal-pale transition-colors"
          >
            Edit Profile
          </button>
          <div v-else class="flex gap-2 w-full">
            <button
              @click="saveProfile"
              class="flex-1 py-3 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal-mid transition-colors"
            >
              Save Changes
            </button>
            <button
              @click="cancelEdit"
              class="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
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
// Profile Page Component - User profile management with editing capabilities
// Displays user profile information and allows editing of personal data
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.js";
import { useEquipmentStore } from "../stores/equipment.js";

// Auth and equipment stores
const authStore = useAuthStore();
const equipmentStore = useEquipmentStore();

// ===== STATE =====
// Controls whether profile is in edit mode
const isEditing = ref(false);
// Holds form data during editing
const editForm = ref({});

// ===== COMPUTED PROPERTIES =====
// Generate user display name from auth store
// Uses firstName + lastName, falls back to email username
const userDisplayName = computed(() => {
  const user = authStore.user;
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
  return user?.email?.split("@")[0] || "User";
});

// Dynamic avatar based on user role
// Shows different emoji for donors vs recipients
const userAvatar = computed(() => {
  const role = authStore.user?.role;
  return role === "donor" ? "👨" : "👩";
});

// User role and location string
// Formats role and location for display
const userRoleAndLocation = computed(() => {
  const user = authStore.user;
  const role = user?.role === "donor" ? "Donor" : "Recipient";
  const location = user?.location || "Location not specified";
  return `${role} · ${location}`;
});

// Dynamic profile fields based on user role
const profileFields = computed(() => {
  const user = authStore.user;
  const fields = [
    {
      key: "email",
      label: "Email",
      value: user?.email || "Not specified",
      editable: false,
      type: "email",
    },
    {
      key: "location",
      label: "Location",
      value: user?.location || "Not specified",
      editable: true,
      type: "text",
    },
  ];

  // Add role-specific fields
  if (user?.role === "recipient") {
    fields.push(
      {
        key: "disabilityType",
        label: "Disability Type",
        value: user?.disabilityType || "Not specified",
        editable: true,
        type: "text",
      },
      {
        key: "disabilityCause",
        label: "Disability Cause",
        value: user?.disabilityCause || "Not specified",
        editable: true,
        type: "text",
      },
    );
  }

  // Add common fields
  fields.push(
    {
      key: "firstName",
      label: "First Name",
      value: user?.firstName || "Not specified",
      editable: true,
      type: "text",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: user?.lastName || "Not specified",
      editable: true,
      type: "text",
    },
  );

  return fields;
});

// Dynamic impact statistics based on user role
const impactStats = computed(() => {
  const user = authStore.user;
  const stats = [];

  if (user?.role === "donor") {
    const donations = equipmentStore.donations;
    stats.push(
      {
        id: 1,
        value: donations.length,
        label: "Items Donated",
      },
      {
        id: 2,
        value: donations.filter((d) => d.status === "Donated").length,
        label: "Items Successfully Delivered",
      },
      {
        id: 3,
        value: equipmentStore.requests.filter((r) => r.status === "Pending")
          .length,
        label: "Pending Requests",
      },
    );
  } else {
    const requests = equipmentStore.requests;
    stats.push(
      {
        id: 1,
        value: requests.length,
        label: "Equipment Requests Made",
      },
      {
        id: 2,
        value: requests.filter((r) => r.status === "Approved").length,
        label: "Items Successfully Received",
      },
      {
        id: 3,
        value: equipmentStore.availableItems.length,
        label: "Items Available Near You",
      },
    );
  }

  return stats;
});

// ===== EDIT FUNCTIONS =====
// Enter edit mode and initialize form
// Enables editing of profile fields and populates form with current values
const startEdit = () => {
  isEditing.value = true;
  // Initialize edit form with current values from profile fields
  editForm.value = {};
  profileFields.value.forEach((field) => {
    if (field.editable) {
      editForm.value[field.key] =
        field.value !== "Not specified" ? field.value : "";
    }
  });
};

// Save profile changes
// Updates user data in auth store and exits edit mode
const saveProfile = () => {
  // Create updated user object by merging changes
  const updatedUserData = { ...authStore.user };

  // Update editable fields with form data
  profileFields.value.forEach((field) => {
    if (field.editable && editForm.value[field.key]) {
      updatedUserData[field.key] = editForm.value[field.key];
    }
  });

  // Update auth store with new user data
  authStore.updateUser(updatedUserData);

  // Exit edit mode
  isEditing.value = false;

  // Log success (could add toast notification here)
  console.log("Profile updated successfully");
};

// Cancel editing
// Exits edit mode without saving changes
const cancelEdit = () => {
  isEditing.value = false;
  editForm.value = {};
};

// Component lifecycle hook
// Runs when component is mounted to the DOM
onMounted(() => {
  // Component initialization if needed
});
</script>

<style scoped>
/* Profile Page Component Styles */
/* Component-specific styles can be added here if needed */
</style>
