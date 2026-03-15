<!-- Hero Section - Main landing page hero with call-to-action and equipment showcase -->
<template>
  <section id="home" class="bg-card-bg py-20 px-5 relative overflow-hidden">
    <!-- Background overlay for better text visibility -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Two-column layout on large screens -->
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column: Main content -->
        <div class="space-y-6">
          <!-- Badge indicating this is a free community platform -->
          <div
            class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full mb-8"
          >
            FREE COMMUNITY PLATFORM
          </div>

          <!-- Main heading with highlighted text -->
          <h1
            class="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Aid That Reaches <br /><span class="text-amber">Everyone</span>
          </h1>

          <!-- Description paragraph -->
          <p
            class="text-xl text-light-green-text mb-10 leading-relaxed max-w-lg"
          >
            AbleBridge connects people with unused assistive equipment to people
            with disabilities who cannot afford the tools they need to live
            independently. Completely free — forever.
          </p>

          <!-- Action buttons for user engagement -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <!-- Primary CTA - Browse Equipment -->
            <button
              @click="handleBrowseClick"
              class="bg-amber text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-light transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Browse Equipment
              <!-- Arrow icon pointing right -->
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <!-- Secondary CTA - Donate an Item -->
            <button
              @click="handleDonateClick"
              class="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-dark-green transition-all transform hover:scale-105"
            >
              Donate an Item
            </button>
          </div>

          <!-- Statistics showing platform impact -->
          <div class="grid grid-cols-3 gap-8">
            <!-- Items Donated Stat -->
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">1,240+</div>
              <div class="text-light-green-text font-medium">Items Donated</div>
            </div>

            <!-- Lives Changed Stat -->
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">830</div>
              <div class="text-light-green-text font-medium">Lives Changed</div>
            </div>

            <!-- Free Forever Stat -->
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">100%</div>
              <div class="text-light-green-text font-medium">Free Forever</div>
            </div>
          </div>
        </div>

        <!-- Right Column: Equipment Cards Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-2 gap-6">
          <!-- Manual Wheelchair Card -->
          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <!-- Header with icon, title, and badge -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
                  <!-- Wheelchair emoji icon -->
                  <span class="text-3xl mr-3">♿</span>
                  Manual Wheelchair
                </div>
                <div class="text-light-green-text text-sm">
                  San Francisco, CA
                </div>
              </div>
              <div
                class="bg-teal/30 text-teal-light text-xs px-3 py-1.5 rounded-full border border-teal-light/40"
              >
                Just Listed
              </div>
            </div>

            <!-- Availability status -->
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <!-- Hearing Aid (pair) Card -->
          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <!-- Header with icon, title, and badge -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
                  <!-- Hearing aid emoji icon -->
                  <span class="text-3xl mr-3">👂</span>
                  Hearing Aid (pair)
                </div>
                <div class="text-light-green-text text-sm">Oakland, CA</div>
              </div>
              <div
                class="bg-amber/20 text-amber text-xs px-3 py-1 rounded-full"
              >
                High Demand
              </div>
            </div>

            <!-- Availability status -->
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <!-- Forearm Crutches Card -->
          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <!-- Header with icon, title, and badge -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
                  <!-- Crutches emoji icon -->
                  <span class="text-3xl mr-3">🦯</span>
                  Forearm Crutches
                </div>
                <div class="text-light-green-text text-sm">San Jose, CA</div>
              </div>
              <div
                class="bg-teal/30 text-teal-light text-xs px-3 py-1.5 rounded-full border border-teal-light/40"
              >
                Just Listed
              </div>
            </div>

            <!-- Availability status -->
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <!-- White Mobility Cane Card -->
          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <!-- Header with icon, title, and badge -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
                  <!-- Cane emoji icon -->
                  <span class="text-3xl mr-3">🩼</span>
                  White Mobility Cane
                </div>
                <div class="text-light-green-text text-sm">Sacramento, CA</div>
              </div>
              <div
                class="bg-teal/30 text-teal-light text-xs px-3 py-1.5 rounded-full border border-teal-light/40"
              >
                Just Listed
              </div>
            </div>

            <!-- Availability status -->
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const handleBrowseClick = () => {
  if (authStore.isAuthenticated) {
    const role = authStore.user?.role;
    if (role === "donor") router.push("/donor-dashboard");
    else if (role === "recipient") router.push("/recipient-dashboard");
    else router.push("/role-selection");
  } else {
    router.push("/role-selection");
  }
};

const handleDonateClick = () => {
  if (authStore.isAuthenticated) {
    const role = authStore.user?.role;
    if (role === "donor") router.push("/donor-dashboard");
    else if (role === "recipient") router.push("/recipient-dashboard");
    else router.push("/role-selection");
  } else {
    router.push("/role-selection");
  }
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
