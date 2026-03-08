<template>
  <section id="home" class="bg-card-bg py-20 px-5 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-6">
          <div
            class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full mb-8"
          >
            FREE COMMUNITY PLATFORM
          </div>
          <h1
            class="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Aid That Reaches <br /><span class="text-amber">Everyone</span>
          </h1>
          <p
            class="text-xl text-light-green-text mb-10 leading-relaxed max-w-lg"
          >
            AbleBridge connects people with unused assistive equipment to people
            with disabilities who cannot afford the tools they need to live
            independently. Completely free — forever.
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              class="bg-amber text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-light transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              Browse Equipment
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
            <button
              class="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-dark-green transition-all transform hover:scale-105"
            >
              Donate an Item
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">1,240+</div>
              <div class="text-light-green-text font-medium">Items Donated</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">830</div>
              <div class="text-light-green-text font-medium">Lives Changed</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-amber mb-2">100%</div>
              <div class="text-light-green-text font-medium">Free Forever</div>
            </div>
          </div>
        </div>

        <!-- Right Content - Equipment Cards Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-2 gap-6">
          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
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
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
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
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
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
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>

          <div
            class="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30 hover:bg-white/20 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div
                  class="text-white font-bold text-base mb-2 flex items-center"
                >
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
            <div class="flex items-center text-amber text-sm font-medium">
              Available Now
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
/* Component-specific styles if needed */
</style>
