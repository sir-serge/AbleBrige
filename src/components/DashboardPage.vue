<template>
  <div class="p-4 md:p-6 lg:p-8">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 md:mb-8 gap-4"    >
      <div>
        <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
          Welcome back, {{ userName }} 👋
        </h1>
        <p class="text-sm text-gray-500 mt-1" v-if="isDonor">
          Here is what is happening with your donations today.
        </p>
        <p class="text-sm text-gray-500 mt-1" v-else>
          Here is what is happening with your requests today.
        </p>
      </div>
      <button
        v-if="isRecipient"
        @click="$emit('page-change', 'browse')"
        class="bg-teal text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-mid transition-colors w-full sm:w-auto"
      >
        + Browse Equipment
      </button>
      <button
        v-else
        @click="$emit('page-change', 'list')"
        class="bg-amber text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-light transition-colors w-full sm:w-auto"
      >
        + List Equipment
      </button>
    </div>

    <!-- Stats row -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8"
    >
      <!-- Donor Stats -->
      <template v-if="isDonor">
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">�</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
            {{ stats.totalDonations }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Total Donations</div>
        </div>
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">📋</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-amber">
            {{ stats.listed }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Listed</div>
        </div>
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">✅</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-teal">
            {{ stats.donated }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Donated</div>
        </div>
        <div class="bg-amber rounded-2xl p-4 md:p-5 relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-10"
            style="
              background: radial-gradient(
                circle at 80% 20%,
                #fff,
                transparent 60%
              );
            "
          ></div>
          <div class="text-xl md:text-2xl mb-2 relative z-10">📬</div>
          <div
            class="font-fraunces text-2xl md:text-3xl font-bold text-white relative z-10"
          >
            {{ stats.pendingRequests }}
          </div>
          <div class="text-xs text-[#AECCC7] mt-1 font-medium relative z-10">
            Pending Requests
          </div>
        </div>
      </template>

      <!-- Recipient Stats -->
      <template v-else>
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">📋</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
            {{ stats.totalRequests }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Total Requests</div>
        </div>
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">⏳</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-amber">
            {{ stats.pending }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Pending</div>
        </div>
        <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
          <div class="text-xl md:text-2xl mb-2">✅</div>
          <div class="font-fraunces text-2xl md:text-3xl font-bold text-teal">
            {{ stats.approved }}
          </div>
          <div class="text-xs text-muted mt-1 font-medium">Approved</div>
        </div>
        <div class="bg-teal rounded-2xl p-4 md:p-5 relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-10"
            style="
              background: radial-gradient(
                circle at 80% 20%,
                #fff,
                transparent 60%
              );
            "
          ></div>
          <div class="text-xl md:text-2xl mb-2 relative z-10">📍</div>
          <div
            class="font-fraunces text-2xl md:text-3xl font-bold text-white relative z-10"
          >
            {{ stats.nearby }}
          </div>
          <div class="text-xs text-[#AECCC7] mt-1 font-medium relative z-10">
            Items Near You
          </div>
        </div>
      </template>
    </div>

    <!-- Two-col: notifications preview + nearby items -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Recent notifications -->
      <div class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8">
        <div class="flex items-center justify-between mb-4 md:mb-5">
          <h3 class="font-fraunces text-lg font-bold text-dark">
            Recent Activity
          </h3>
          <span
            class="text-xs text-teal font-semibold cursor-pointer hover:underline"
            @click="$emit('page-change', 'notifications')"
          >
            See all →
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start gap-3 p-3 rounded-xl"
            :class="activity.bgClass + ' ' + activity.borderClass"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              :class="activity.iconClass"
            >
              {{ activity.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-dark">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ activity.description }}
              </p>
              <p class="text-xs text-muted mt-1">{{ activity.time }}</p>
            </div>
            <span class="pill flex-shrink-0" :class="activity.pillClass">{{
              activity.status
            }}</span>
          </div>
        </div>
      </div>

      <!-- Nearby items quick view -->
      <div class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8">
        <div class="flex items-center justify-between mb-4 md:mb-5">
          <h3 class="font-fraunces text-lg font-bold text-dark">Near You</h3>
          <span
            class="text-xs text-teal font-semibold cursor-pointer hover:underline"
            @click="$emit('page-change', 'browse')"
          >
            Browse all →
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="item in nearbyItems"
            :key="item.id"
            class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/20 hover:bg-teal-pale/30 transition-all cursor-pointer"
            @click="$emit('open-modal', item)"
          >
            <div
              class="w-10 md:w-11 h-10 md:h-11 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0"
              :class="item.iconBg"
            >
              {{ item.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-dark truncate">
                {{ item.name }}
              </p>
              <p class="text-xs text-muted truncate">
                {{ item.distance }} · {{ item.condition }}
              </p>
            </div>
            <button
              class="text-xs bg-teal text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors flex-shrink-0"
              @click.stop="$emit('open-modal', item)"
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth.js";
import { useEquipmentStore } from "../stores/equipment.js";

const authStore = useAuthStore();
const equipmentStore = useEquipmentStore();

// Computed properties based on user role
const isDonor = computed(() => authStore.user?.role === "donor");
const isRecipient = computed(() => authStore.user?.role === "recipient");

// User display name
const userName = computed(() => {
  const user = authStore.user;
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
  return user?.email?.split("@")[0] || "User";
});

// Stats based on role
const stats = computed(() => {
  if (isDonor.value) {
    // Donor stats
    const donations = equipmentStore.donations;
    return {
      totalDonations: donations.length,
      listed: donations.filter((d) => d.status === "Listed").length,
      donated: donations.filter((d) => d.status === "Donated").length,
      pendingRequests: equipmentStore.requests.filter(
        (r) => r.status === "Pending",
      ).length,
    };
  } else {
    // Recipient stats
    const requests = equipmentStore.requests;
    return {
      totalRequests: requests.length,
      pending: requests.filter((r) => r.status === "Pending").length,
      approved: requests.filter((r) => r.status === "Approved").length,
      nearby: equipmentStore.availableItems.length,
    };
  }
});

// Recent activity based on role
const recentActivity = computed(() => {
  if (isDonor.value) {
    // Donor activity
    return equipmentStore.donations.slice(0, 3).map((donation) => ({
      icon: "📦",
      title: `Donation ${donation.status}`,
      description: donation.name || "Equipment item",
      time: donation.time || "Just now",
      type: "donation",
    }));
  } else {
    // Recipient activity
    return equipmentStore.requests.slice(0, 3).map((request) => ({
      icon:
        request.status === "Pending"
          ? "⏳"
          : request.status === "Approved"
            ? "✅"
            : "❌",
      title: `Request ${request.status}`,
      description: request.name || "Equipment item",
      time: request.time || "Just now",
      type: "request",
    }));
  }
});

// Nearby items for recipients
const nearbyItems = computed(() => {
  if (isRecipient.value) {
    return equipmentStore.availableItems.slice(0, 3);
  }
  return [];
});

// Recent donations for donors
const recentDonations = computed(() => {
  if (isDonor.value) {
    return equipmentStore.donations.slice(0, 3);
  }
  return [];
});

// Emit events to parent
const emit = defineEmits(["page-change", "open-modal"]);
</script>

<style scoped>
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}
.pill-approved {
  background: #e8f4f1;
  color: #1a5c52;
}
.pill-pending {
  background: #fff8ee;
  color: #d4820a;
}
.pill-new {
  background: #ede9fe;
  color: #7c3aed;
}
</style>
