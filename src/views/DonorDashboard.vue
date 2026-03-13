<template>
  <!-- Donor Dashboard Component - Main donor interface with sidebar navigation -->
  <!-- This component provides the complete donor dashboard experience -->
  <div class="flex min-h-screen bg-off font-sans">
    <!-- ══════════════════════════════════
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
        <div class="text-xs text-muted mt-0.5 lg:block hidden">
          Donor Portal
        </div>
        <!-- Mobile logo - just icon -->
        <div class="lg:hidden flex justify-center">
          <div class="font-fraunces text-lg font-bold text-white">
            <span class="text-amber">A</span>
          </div>
        </div>
      </div>

      <!-- Donor Profile Pill -->
      <div
        class="mx-4 mt-5 bg-white/5 border border-white/8 rounded-xl p-4 user-profile-pill lg:block hidden"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center text-xl flex-shrink-0"
          >
            👨
          </div>
          <div class="overflow-hidden user-profile-text">
            <div class="text-sm font-semibold text-white truncate">
              {{ userDisplayName }}
            </div>
            <div class="text-xs text-muted">{{ userLocation }}</div>
          </div>
        </div>
        <div
          class="mt-3 flex items-center gap-2 bg-amber/15 rounded-lg px-3 py-1.5 badge"
        >
          <span class="text-xs text-amber font-semibold">📦 Donor Account</span>
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
          <span class="dot lg:inline hidden"></span>
          <span
            v-if="navItem.badge"
            class="lg:inline hidden ml-auto bg-amber/20 text-amber text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ navItem.badge }}
          </span>
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

    <!-- ══════════════════════════════════
         MAIN CONTENT
    ═══════════════════════════════════ -->
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
              Donor Dashboard
            </p>
            <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
              Good morning, {{ userDisplayName }} 👋
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              You have
              <span class="text-amber font-semibold">0 new requests</span>
              waiting for your response.
            </p>
          </div>
          <button
            class="bg-amber text-dark px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-lt transition-colors flex items-center gap-2 w-full sm:w-auto"
          >
            ➕ List New Item
          </button>
        </div>

        <!-- Stats Grid -->
        <div
          class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8"
        >
          <div
            v-for="stat in dashboardStats"
            :key="stat.id"
            class="bg-white rounded-2xl p-5 border border-teal/8"
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

        <!-- Two Column Layout: Pending Requests + My Listings -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <!-- Pending Requests Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">
                New Requests
              </h3>
              <span
                class="text-xs text-amber font-semibold cursor-pointer hover:underline"
                >See all →</span
              >
              <div class="space-y-3">
                <div
                  v-for="request in pendingRequests"
                  :key="request.id"
                  class="flex items-start gap-3 p-3 rounded-xl bg-amber-pale border border-amber/15"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-amber/20 flex items-center justify-center text-xl flex-shrink-0"
                  >
                    {{ request.icon }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-dark">
                      {{ request.name }}
                    </p>
                    <p class="text-xs text-gray-500 mt-0.5 truncate">
                      Requesting: {{ request.item }}
                    </p>
                    <p class="text-xs text-muted mt-0.5">
                      📍 {{ request.distance }} · {{ request.time }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      @click="approveRequest(request)"
                      class="bg-teal text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      @click="declineRequest(request)"
                      class="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- My Active Listings Section -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-fraunces text-lg font-bold text-dark">
                My Listings
              </h3>
              <span
                class="text-xs text-teal font-semibold cursor-pointer hover:underline"
                @click="showPage('my-listings')"
              >
                Manage all →
              </span>
            </div>
            <div class="space-y-3">
              <div
                v-for="listing in myListings"
                :key="listing.id"
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/20 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0"
                >
                  {{ listing.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-dark truncate">
                    {{ listing.name }}
                  </p>
                  <p class="text-xs text-muted">
                    Listed {{ listing.listedTime }} ·
                    {{ listing.requests }} requests
                  </p>
                </div>
                <span class="pill pill-active">Active</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Impact Snapshot -->
        <div class="mt-6 bg-dark rounded-2xl p-6 relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-10"
            style="
              background:
                radial-gradient(circle at 10% 50%, #4a9d8f, transparent 50%),
                radial-gradient(circle at 90% 20%, #d4820a, transparent 45%);
            "
          ></div>
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p
                class="text-xs font-semibold tracking-widest uppercase text-muted mb-2"
              >
                Your Impact So Far
              </p>
              <h3 class="font-fraunces text-2xl font-bold text-white mb-1">
                {{ impactStats.livesChanged }} lives changed through your
                generosity
              </h3>
              <p class="text-sm text-muted">
                Every item you donate gives someone independence, dignity, and
                freedom.
              </p>
            </div>
            <button
              @click="showPage('impact')"
              class="bg-amber text-dark px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-lt transition-colors flex-shrink-0 sm:ml-6"
            >
              View Full Impact →
            </button>
          </div>
        </div>
      </div>

      <!-- List Equipment Page -->
      <div v-if="currentPage === 'list'" class="p-4 sm:p-6 lg:p-8">
        <div class="mb-8">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Donate Equipment
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">
            List a New Item
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Takes under 3 minutes. Your listing will be reviewed and published
            within a few hours.
          </p>
        </div>

        <!-- Progress Indicator -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-8">
          <div
            v-for="(step, index) in formSteps"
            :key="index"
            class="step-dot"
            :class="getStepClass(index + 1)"
          >
            {{ getStepIcon(index + 1) }}
          </div>
          <div
            v-for="(line, index) in formSteps.slice(0, -1)"
            :key="`line-${index}`"
            class="step-line hidden sm:block"
            :class="getLineClass(index + 1)"
          ></div>
          <div
            class="sm:ml-auto flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold"
          >
            <span
              v-for="(step, index) in formSteps"
              :key="index"
              :class="getLabelClass(index + 1)"
            >
              {{ step.label }}
            </span>
          </div>
        </div>

        <!-- Step 1: Item Details -->
        <div
          v-if="currentFormStep === 1"
          class="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <!-- Item Information Card -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <h3 class="font-fraunces text-lg font-bold text-dark mb-5">
              Item Information
            </h3>
            <div class="space-y-4">
              <div>
                <label class="ab-label">Equipment Name</label>
                <input
                  v-model="newItem.name"
                  class="ab-input"
                  type="text"
                  placeholder="e.g. Manual Wheelchair"
                />
              </div>
              <div>
                <label class="ab-label">Category / Disability Type</label>
                <select v-model="newItem.category" class="ab-input ab-select">
                  <option value="">Select category...</option>
                  <option>Mobility — Wheelchair / Scooter</option>
                  <option>Mobility — Walker / Crutches</option>
                  <option>Hearing — Hearing Aids</option>
                  <option>Hearing — Amplification Devices</option>
                  <option>Vision — White Cane / Guides</option>
                  <option>Vision — Magnification</option>
                  <option>Daily Living — Bathroom Safety</option>
                  <option>Daily Living — Adaptive Tools</option>
                  <option>Cognitive Support</option>
                </select>
              </div>
              <div>
                <label class="ab-label">Condition</label>
                <select v-model="newItem.condition" class="ab-input ab-select">
                  <option value="">Select condition...</option>
                  <option>Like New — barely used, no visible wear</option>
                  <option>Good — minor signs of use, fully functional</option>
                  <option>Fair — works fine, visible wear</option>
                </select>
              </div>
              <div>
                <label class="ab-label">Description</label>
                <textarea
                  v-model="newItem.description"
                  class="ab-input ab-textarea"
                  placeholder="Describe item — brand, size, age, any relevant details..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Availability & Location Card -->
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <h3 class="font-fraunces text-lg font-bold text-dark mb-5">
              Availability & Location
            </h3>
            <div class="space-y-4">
              <div>
                <label class="ab-label">Your City / Area</label>
                <input
                  v-model="newItem.location"
                  class="ab-input"
                  type="text"
                  placeholder="e.g. Kigali, Rwanda"
                />
              </div>
              <div>
                <label class="ab-label">Pickup or Delivery</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    class="flex items-center gap-2 p-3 rounded-xl border-2 border-teal bg-teal-pale cursor-pointer"
                  >
                    <input
                      v-model="newItem.handover"
                      type="radio"
                      value="pickup"
                      class="accent-teal"
                    />
                    <span class="text-sm font-semibold text-teal"
                      >📍 Pickup only</span
                    >
                  </label>
                  <label
                    class="flex items-center gap-2 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-teal/30 transition-colors"
                  >
                    <input
                      v-model="newItem.handover"
                      type="radio"
                      value="both"
                      class="accent-teal"
                    />
                    <span class="text-sm font-medium text-gray-600"
                      >🚚 Pickup or Delivery</span
                    >
                  </label>
                </div>
              </div>
              <div>
                <label class="ab-label">Availability</label>
                <select
                  v-model="newItem.availability"
                  class="ab-input ab-select"
                >
                  <option>Available immediately</option>
                  <option>Available from next week</option>
                  <option>Available this month</option>
                </select>
              </div>
              <div>
                <label class="ab-label">Additional Notes</label>
                <textarea
                  v-model="newItem.notes"
                  class="ab-input ab-textarea"
                  style="min-height: 60px"
                  placeholder="Any special instructions for collection, assembly notes, accessories included..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Tip Box -->
        <div
          class="mt-5 bg-teal-pale border border-teal/15 rounded-xl px-5 py-4 flex gap-3 items-start"
        >
          <span class="text-xl flex-shrink-0">💡</span>
          <div>
            <p class="text-sm font-semibold text-teal mb-0.5">
              Tips for a good listing
            </p>
            <p class="text-xs text-gray-500 leading-relaxed">
              Be specific about condition and any limitations. Mention the
              brand, size, and age if known. A clear, honest description leads
              to faster, more successful matches.
            </p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-end mt-6">
          <button
            @click="goToFormStep(2)"
            class="bg-amber text-dark px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-lt transition-colors w-full sm:w-auto"
          >
            Next: Add Photos →
          </button>
        </div>
      </div>

      <!-- Step 2: Add Photos -->
      <div
        v-if="currentFormStep === 2"
        class="bg-white rounded-2xl p-8 border border-teal/8"
      >
        <h3 class="font-fraunces text-lg font-bold text-dark mb-2">
          Add Photos
        </h3>
        <p class="text-sm text-gray-500 mb-6">
          Good photos increase your chances of a quick match. Add at least one
          clear photo of the item.
        </p>

        <!-- Photo Upload Zone -->
        <div
          class="upload-zone mb-5"
          @click="triggerFileUpload"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
        >
          <div class="text-4xl mb-3">📷</div>
          <p class="text-sm font-semibold text-teal">Click to upload photos</p>
          <p class="text-xs text-muted mt-1">
            JPG, PNG up to 10MB each · Up to 5 photos
          </p>
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileSelect"
            style="display: none"
          />
        </div>

        <!-- Uploaded Photos Grid -->
        <div
          v-if="uploadedPhotos.length > 0"
          class="grid grid-cols-3 gap-3"
          id="photo-grid"
        >
          <div
            v-for="(photo, index) in uploadedPhotos"
            :key="index"
            class="aspect-square rounded-xl overflow-hidden relative group"
          >
            <img
              :src="photo.url"
              :alt="`Photo ${index + 1}`"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <button
                @click="removePhoto(index)"
                class="text-white text-xs font-semibold bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
            <div
              v-if="index === 0"
              class="absolute top-2 left-2 bg-teal text-white text-xs font-bold px-2 py-0.5 rounded-full"
            >
              Main
            </div>
          </div>
          <!-- Add More Photos Button -->
          <div
            v-if="uploadedPhotos.length < 5"
            class="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-3xl text-gray-300 cursor-pointer hover:border-teal/30 hover:bg-teal-pale/30 transition-all"
            @click="triggerFileUpload"
          >
            ＋
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6">
          <button
            @click="goToFormStep(1)"
            class="border border-gray-200 text-gray-500 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            @click="goToFormStep(3)"
            :disabled="uploadedPhotos.length === 0"
            class="bg-amber text-dark px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-lt transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next: Review →
          </button>
        </div>
      </div>

      <!-- Step 3: Review & Submit -->
      <div
        v-if="currentFormStep === 3"
        class="bg-white rounded-2xl p-6 border border-teal/8 mb-5"
      >
        <h3 class="font-fraunces text-lg font-bold text-dark mb-5">
          Review Your Listing
        </h3>
        <div class="flex gap-6">
          <!-- Main Photo -->
          <div class="w-32 h-32 rounded-2xl flex-shrink-0 overflow-hidden">
            <img
              v-if="uploadedPhotos.length > 0"
              :src="uploadedPhotos[0].url"
              :alt="newItem.name || 'Equipment'"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-5xl"
              style="background: linear-gradient(135deg, #e8f4f1, #c5e4dc)"
            >
              ♿
            </div>
          </div>
          <!-- Item Details -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-fraunces text-xl font-bold text-dark">
                  {{ newItem.name || "Manual Wheelchair" }}
                </h4>
                <p class="text-sm text-muted">
                  {{ newItem.category || "Mobility — Wheelchair" }}
                </p>
              </div>
              <span class="pill pill-approved">Ready to publish</span>
            </div>
            <!-- Item Info Grid -->
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="bg-teal-pale rounded-xl p-3">
                <p class="text-xs text-muted mb-1">Condition</p>
                <p class="text-sm font-semibold text-teal">
                  {{ newItem.condition || "Good condition" }}
                </p>
              </div>
              <div class="bg-teal-pale rounded-xl p-3">
                <p class="text-xs text-muted mb-1">Location</p>
                <p class="text-sm font-semibold text-teal">
                  📍 {{ newItem.location || "Kigali" }}
                </p>
              </div>
              <div class="bg-teal-pale rounded-xl p-3">
                <p class="text-xs text-muted mb-1">Handover</p>
                <p class="text-sm font-semibold text-teal">
                  {{
                    newItem.handover === "pickup"
                      ? "Pickup only"
                      : "Pickup or Delivery"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Privacy Notice -->
      <div
        v-if="currentFormStep === 3"
        class="bg-teal-pale border border-teal/15 rounded-xl p-4 flex gap-3 mb-6"
      >
        <span class="text-xl">🔒</span>
        <p class="text-sm text-teal leading-relaxed">
          <strong>Privacy protected:</strong> Your contact details will only be
          shared after you approve a request. AbleBridge reviews all listings
          before they go live.
        </p>
      </div>

      <!-- Submit Buttons -->
      <div v-if="currentFormStep === 3" class="flex justify-between">
        <button
          @click="goToFormStep(2)"
          class="border border-gray-200 text-gray-500 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          @click="submitListing"
          class="bg-teal text-white px-10 py-3 rounded-xl font-bold text-sm hover:bg-teal-mid transition-colors"
        >
          🎉 Publish Listing
        </button>
      </div>

      <!-- My Listings Page -->
      <div v-if="currentPage === 'my-listings'" class="p-4 sm:p-6 lg:p-8">
        <div class="flex items-center justify-between mb-7">
          <div>
            <p
              class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
            >
              Manage
            </p>
            <h1 class="font-fraunces text-3xl font-bold text-dark">
              My Listings
            </h1>
          </div>
          <button
            @click="showPage('list')"
            class="bg-amber text-dark px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-lt transition-colors"
          >
            ➕ Add New
          </button>
        </div>

        <!-- Filter Tabs -->
        <div
          class="flex gap-2 mb-6 flex-wrap sm:flex-nowrap overflow-x-auto sm:overflow-visible -mx-1 px-1"
        >
          <button
            v-for="filter in listingFilters"
            :key="filter.id"
            class="px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0"
            :class="
              filter.active
                ? 'bg-dark text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-teal/30'
            "
            @click="setListingFilter(filter.id)"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Listings Grid -->
        <div class="space-y-4">
          <div
            v-for="listing in filteredListings"
            :key="listing.id"
            class="listing-card bg-white rounded-2xl border border-teal/8 overflow-hidden flex flex-col sm:flex-row"
          >
            <!-- Icon Section -->
            <div
              class="w-full sm:w-28 h-32 sm:h-auto flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0"
              :style="`background:linear-gradient(135deg,${listing.bgFrom},${listing.bgTo})`"
            >
              {{ listing.icon }}
            </div>

            <!-- Content Section -->
            <div class="flex-1 p-5 flex flex-col">
              <!-- Header with title and status -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-fraunces text-lg font-bold text-dark truncate"
                  >
                    {{ listing.name }}
                  </h4>
                  <p class="text-xs text-muted mt-1">
                    {{ listing.category }} · {{ listing.condition }} ·
                    {{ listing.location }} · Listed {{ listing.listedTime }}
                  </p>
                </div>
                <span class="pill pill-active ml-3 flex-shrink-0">Active</span>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-500 mb-4 leading-relaxed flex-1">
                {{ listing.description }}
              </p>

              <!-- Footer with stats and actions -->
              <div
                class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-auto"
              >
                <!-- Stats -->
                <div class="flex items-center gap-4 flex-wrap">
                  <div
                    class="flex items-center gap-1.5 text-xs text-amber font-semibold"
                  >
                    <span>📩</span> {{ listing.requests }} requests
                  </div>
                  <div class="flex items-center gap-1.5 text-xs text-muted">
                    <span>👁️</span> {{ listing.views }} views
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2 ml-auto sm:ml-0">
                  <button
                    @click="editListing(listing)"
                    class="border border-gray-200 text-gray-500 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="removeListing(listing)"
                    class="border border-red-100 text-red-400 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Incoming Requests Page -->
      <div v-if="currentPage === 'requests'" class="p-4 sm:p-6 lg:p-8">
        <div class="mb-7">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Review
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">
            Incoming Requests
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Review each recipient's request and decide whether to approve or
            decline.
          </p>
        </div>

        <!-- Active Requests -->
        <div class="mb-2">
          <p
            class="text-xs font-bold tracking-widest uppercase text-amber mb-4"
          >
            Awaiting Your Response ({{ pendingRequests.length }})
          </p>
        </div>
        <div class="space-y-5 mb-8">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="bg-white rounded-2xl border-2 border-amber/20 overflow-hidden"
          >
            <div
              class="bg-amber/5 px-6 py-3 border-b border-amber/15 flex items-center justify-between"
            >
              <span
                class="text-xs font-bold text-amber uppercase tracking-widest"
              >
                New Request · {{ request.requestedTime }}
              </span>
              <span class="pill pill-pending">Awaiting Response</span>
            </div>
            <div class="p-6 flex flex-col sm:flex-row gap-5">
              <div
                class="w-16 h-16 rounded-2xl bg-teal-pale flex items-center justify-center text-3xl flex-shrink-0"
              >
                {{ request.userIcon }}
              </div>
              <div class="flex-1 min-w-0">
                <div
                  class="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3"
                >
                  <div class="flex-1 min-w-0">
                    <h4
                      class="font-fraunces text-lg font-bold text-dark truncate"
                    >
                      {{ request.userName }}
                    </h4>
                    <p class="text-xs text-muted">
                      📍 {{ request.distance }} from you ·
                      {{ request.location }}
                    </p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="text-xs text-muted">Requesting</p>
                    <p class="text-sm font-bold text-dark">
                      {{ request.icon }} {{ request.itemName }}
                    </p>
                  </div>
                </div>
                <div class="bg-teal-pale rounded-xl p-4 mb-4">
                  <p
                    class="text-xs font-bold text-teal uppercase tracking-wide mb-1"
                  >
                    Reason for request
                  </p>
                  <p class="text-sm text-gray-600 leading-relaxed italic">
                    "{{ request.reason }}"
                  </p>
                </div>
                <div
                  class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div class="flex flex-wrap gap-4 text-xs text-muted">
                    <span>👤 Verified account</span>
                    <span
                      >📋 {{ request.requestCount
                      }}{{
                        request.requestCount === 1
                          ? "st"
                          : request.requestCount === 2
                            ? "nd"
                            : "rd"
                      }}
                      request</span
                    >
                    <span>🏠 {{ request.distance }} from you</span>
                  </div>
                  <div class="flex gap-3 ml-auto sm:ml-0">
                    <button
                      @click="declineRequest(request)"
                      class="border border-gray-200 text-gray-500 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      @click="approveRequest(request)"
                      class="bg-teal text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-mid transition-colors"
                    >
                      ✓ Approve Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Past Requests -->
        <p class="text-xs font-bold tracking-widest uppercase text-muted mb-4">
          Past Requests
        </p>
        <div class="space-y-3">
          <div
            v-for="request in pastRequests"
            :key="request.id"
            class="bg-white rounded-2xl p-5 border border-teal/8 flex items-center gap-4"
          >
            <div
              class="w-12 h-12 rounded-xl bg-teal-pale flex items-center justify-center text-xl flex-shrink-0"
            >
              {{ request.icon }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-dark">
                {{ request.userName }} — {{ request.itemName }}
              </p>
              <p class="text-xs text-muted">
                {{ request.status }} · {{ request.completedTime }} ·
                {{ request.location }}
              </p>
            </div>
            <span class="pill pill-approved">Donated ✓</span>
          </div>
        </div>
      </div>

      <!-- Impact Page -->
      <div v-if="currentPage === 'impact'" class="p-4 sm:p-6 lg:p-8">
        <div class="mb-8">
          <p
            class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1"
          >
            Your Contribution
          </p>
          <h1 class="font-fraunces text-3xl font-bold text-dark">My Impact</h1>
          <p class="text-sm text-gray-500 mt-1">
            Every item you donate changes a real life. Here is yours.
          </p>
        </div>

        <!-- Big Stats Row -->
        <div class="grid grid-cols-3 gap-5 mb-8">
          <div
            v-for="stat in impactStats.stats"
            :key="stat.id"
            class="rounded-2xl p-6 relative overflow-hidden"
            :class="stat.bgClass"
          >
            <div
              v-if="stat.gradient"
              class="absolute inset-0 opacity-10"
              :style="stat.gradient"
            ></div>
            <div class="relative z-10 text-3xl mb-3">{{ stat.icon }}</div>
            <div
              class="relative z-10 font-fraunces text-5xl font-bold text-dark mb-1"
            >
              {{ stat.value }}
            </div>
            <div class="relative z-10 text-sm text-muted">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Community Rank -->
        <div class="bg-dark rounded-2xl p-6 flex items-center gap-6">
          <div class="text-5xl">🏆</div>
          <div class="flex-1">
            <p
              class="text-xs font-bold tracking-widest uppercase text-muted mb-1"
            >
              Community Standing
            </p>
            <h3 class="font-fraunces text-2xl text-white font-bold">
              {{ impactStats.communityRank.title }}
            </h3>
            <p class="text-sm text-muted mt-1">
              {{ impactStats.communityRank.description }}
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="font-fraunces text-3xl font-bold text-amber">
              {{ impactStats.communityRank.stats }}
            </div>
            <div class="text-xs text-muted mt-1">
              {{ impactStats.communityRank.comparison }}
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Page -->
      <div v-if="currentPage === 'profile'" class="p-4 sm:p-6 lg:p-8">
        <div class="mb-7">
          <h1 class="font-fraunces text-3xl font-bold text-dark">My Profile</h1>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-teal/8">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center text-3xl"
              >
                👨
              </div>
              <div>
                <h3 class="font-fraunces text-xl font-bold text-dark">
                  {{ userDisplayName }}
                </h3>
                <p class="text-sm text-muted">Donor · {{ userLocation }}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div
                v-for="field in profileFields"
                :key="field.key"
                class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-50"
              >
                <span
                  class="text-xs text-muted font-semibold uppercase tracking-wide"
                  >{{ field.label }}</span
                >
                <span class="text-sm text-dark sm:text-right break-words">{{
                  field.value
                }}</span>
              </div>
            </div>
            <button
              class="mt-5 w-full py-3 border border-teal/20 rounded-xl text-sm font-semibold text-teal hover:bg-teal-pale transition-colors"
            >
              Edit Profile
            </button>
          </div>
          <div class="bg-amber rounded-2xl p-6">
            <h3 class="font-fraunces text-xl font-bold text-dark mb-5">
              Your Impact Summary
            </h3>
            <div class="space-y-4">
              <div
                v-for="stat in impactSummary"
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
    </main>

    <!-- Approval Modal -->
    <div v-if="showApprovalModal" class="modal-bg open" @click="closeModal">
      <div
        style="
          background: #fff;
          border-radius: 20px;
          width: 420px;
          overflow: hidden;
        "
      >
        <div class="bg-teal p-6 text-center">
          <div class="text-4xl mb-2">🤝</div>
          <h3 class="font-fraunces text-xl font-bold text-white">
            Confirm Approval
          </h3>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-600 leading-relaxed mb-4">
            You are about to approve
            <strong>{{ selectedRequest.userName }}'s</strong> request for
            <strong>{{ selectedRequest.itemName }}</strong
            >. Their contact details will be shared with you so you can arrange
            pickup.
          </p>
          <div class="bg-teal-pale rounded-xl p-4 mb-5">
            <p class="text-xs font-bold text-teal mb-1">What happens next</p>
            <p class="text-xs text-gray-500 leading-relaxed">
              1. Both you and {{ selectedRequest.userName }} receive each
              other's contact details<br />
              2. Arrange a convenient pickup time<br />
              3. Confirm handover in app — done!
            </p>
          </div>
          <div class="flex gap-3">
            <button
              @click="confirmApproval"
              class="flex-1 bg-teal text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-mid transition-colors"
            >
              ✓ Confirm Approval
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

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-bg open" @click="closeModal">
      <div
        style="
          background: #fff;
          border-radius: 20px;
          width: 400px;
          overflow: hidden;
          text-align: center;
        "
      >
        <div class="bg-dark p-8">
          <div class="text-5xl mb-3">{{ successModal.icon }}</div>
          <h3 class="font-fraunces text-2xl font-bold text-white">
            {{ successModal.title }}
          </h3>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-600 mb-6">{{ successModal.message }}</p>
          <button
            @click="closeModal"
            class="bg-amber text-dark w-full py-3 rounded-xl font-bold text-sm hover:bg-amber-lt transition-colors"
          >
            {{ successModal.buttonText }}
          </button>
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
// Donor Dashboard Component - Complete donor interface with navigation and functionality
// This component provides the full donor dashboard experience with all pages and interactions
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
// Current step in the multi-step form
const currentFormStep = ref(1);
// Modal visibility states
const showApprovalModal = ref(false);
const showSuccessModal = ref(false);
const showToast = ref(false);
// Selected request for approval modal
const selectedRequest = ref(null);
// Toast notification data
const toastIcon = ref("");
const toastMessage = ref("");
// Success modal data
const successModal = ref({
  icon: "🎉",
  title: "Success!",
  message: "Action completed successfully.",
  buttonText: "Close",
});
// Mobile menu state
const mobileMenuOpen = ref(false);
// New item form data
const newItem = ref({
  name: "",
  category: "",
  condition: "",
  description: "",
  location: "",
  handover: "pickup",
  availability: "",
  notes: "",
});
// Current listing filter
const currentListingFilter = ref("all");
// File input reference for photo upload
const fileInput = ref(null);
// Uploaded photos array
const uploadedPhotos = ref([]);

// ===== COMPUTED PROPERTIES =====
// User display name from auth store
const userDisplayName = computed(() => {
  const user = authStore.user;
  if (user?.firstName || user?.lastName) {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
  return user?.email?.split("@")[0] || "Jean-Paul";
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
    id: "list",
    icon: "➕",
    label: "List Equipment",
    badge: null,
  },
  {
    id: "my-listings",
    icon: "📦",
    label: "My Listings",
    badge: equipmentStore.donations.filter((d) => d.status === "Listed").length,
  },
  {
    id: "requests",
    icon: "📩",
    label: "Incoming Requests",
    badge: equipmentStore.requests.filter((r) => r.status === "Pending").length,
  },
  {
    id: "impact",
    icon: "🌍",
    label: "My Impact",
    badge: null,
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
    icon: "📦",
    value: equipmentStore.donations.filter((d) => d.status === "Listed").length,
    label: "Active Listings",
    bgClass: "",
  },
  {
    id: 2,
    icon: "📩",
    value: equipmentStore.requests.filter((r) => r.status === "Pending").length,
    label: "New Requests",
    bgClass: "",
  },
  {
    id: 3,
    icon: "✅",
    value: equipmentStore.donations.filter((d) => d.status === "Donated")
      .length,
    label: "Items Donated",
    bgClass: "",
  },
  {
    id: 4,
    icon: "🌍",
    value: equipmentStore.donations.filter((d) => d.status === "Donated")
      .length,
    label: "Lives Changed",
    bgClass: "bg-dark",
  },
]);

// Count of new requests
const newRequestsCount = computed(() => {
  return equipmentStore.requests.filter((r) => r.status === "Pending").length;
});

// Pending requests for dashboard and requests page
const pendingRequests = computed(() => {
  return equipmentStore.requests
    .filter((r) => r.status === "Pending")
    .map((request, index) => ({
      id: request.id,
      userName: index === 0 ? "Claudine Uwase" : "Moses Byaruhanga",
      userIcon: index === 0 ? "👩" : "👴",
      itemName: request.name || "Manual Wheelchair",
      icon: index === 0 ? "♿" : "🩼",
      distance: index === 0 ? "4.2 km" : "8.1 km",
      location: "Kigali, Rwanda",
      requestedTime: index === 0 ? "20 minutes ago" : "2 hours ago",
      requestCount: index === 0 ? 1 : 2,
      reason:
        index === 0
          ? "I was injured in a road accident 6 months ago. I cannot afford a new wheelchair and it is preventing me from returning to work as a teacher. A neighbour told me about AbleBridge and I am hoping you can help."
          : "I had knee surgery 3 weeks ago and am still recovering. The hospital provided temporary crutches but I need to return them. I cannot afford to buy my own and still have 4 weeks of rehabilitation ahead.",
    }));
});

// Past requests for requests page
const pastRequests = computed(() => {
  return equipmentStore.requests
    .filter((r) => r.status === "Approved" || r.status === "Denied")
    .slice(0, 2)
    .map((request, index) => ({
      id: request.id,
      userName: index === 0 ? "Grace Mutoni" : "Eric Kagabo",
      itemName: request.name || "Manual Wheelchair",
      icon: index === 0 ? "♿" : "🩼",
      status: "Approved",
      completedTime:
        index === 0 ? "Collected 2 weeks ago" : "Collected 1 month ago",
      location: "Kigali",
    }));
});

// My listings for dashboard
const myListings = computed(() => {
  return equipmentStore.donations
    .filter((d) => d.status === "Listed")
    .slice(0, 3)
    .map((donation, index) => ({
      id: donation.id,
      name:
        index === 0
          ? "Manual Wheelchair"
          : index === 1
            ? "Forearm Crutches (pair)"
            : "Bath Safety Seat",
      icon: index === 0 ? "♿" : index === 1 ? "🩼" : "🛁",
      listedTime:
        index === 0 ? "3 days ago" : index === 1 ? "5 days ago" : "1 week ago",
      requests: index === 0 ? 2 : index === 1 ? 1 : 0,
    }));
});

// Form steps for multi-step form
const formSteps = [
  { id: 1, label: "Item Details" },
  { id: 2, label: "Photos" },
  { id: 3, label: "Review" },
];

// Impact statistics
const impactStats = computed(() => ({
  livesChanged: equipmentStore.donations.filter((d) => d.status === "Donated")
    .length,
  stats: [
    {
      id: 1,
      icon: "🎁",
      value: equipmentStore.donations.filter((d) => d.status === "Donated")
        .length,
      label: "Items Donated",
      bgClass: "bg-dark",
      gradient:
        "background:radial-gradient(circle at 80% 20%,#D4820A,transparent 60%)",
    },
    {
      id: 2,
      icon: "👥",
      value: equipmentStore.donations.filter((d) => d.status === "Donated")
        .length,
      label: "Lives Changed",
      bgClass: "bg-teal",
      gradient:
        "background:radial-gradient(circle at 20% 80%,#fff,transparent 60%)",
    },
    {
      id: 3,
      icon: "⏱️",
      value: "31h",
      label: "Avg. Match Time",
      bgClass: "bg-white border border-teal/8",
      gradient: null,
    },
  ],
  communityRank: {
    title: "Top 15% Donor in Kigali",
    description:
      "You are among the most impactful donors on AbleBridge in your city.",
    stats: "4 / 26",
    comparison: "donations · city avg",
  },
}));

// Listing filters
const listingFilters = computed(() => [
  { id: "all", label: "All (3)", active: currentListingFilter.value === "all" },
  {
    id: "active",
    label: "Active (3)",
    active: currentListingFilter.value === "active",
  },
  {
    id: "matched",
    label: "Matched (0)",
    active: currentListingFilter.value === "matched",
  },
  {
    id: "donated",
    label: "Donated (4)",
    active: currentListingFilter.value === "donated",
  },
]);

// Filtered listings based on current filter
const filteredListings = computed(() => {
  const allListings = [
    {
      id: 1,
      name: "Manual Wheelchair",
      category: "Mobility",
      condition: "Good condition",
      location: "Kigali",
      listedTime: "3 days ago",
      description:
        "Adult-size foldable wheelchair, used for 8 months after recovery. All parts intact and functional.",
      icon: "♿",
      bgFrom: "#E8F4F1",
      bgTo: "#C5E4DC",
      requests: 2,
      views: 14,
    },
    {
      id: 2,
      name: "Forearm Crutches (pair)",
      category: "Mobility",
      condition: "Like New",
      location: "Kigali",
      listedTime: "5 days ago",
      description:
        "Aluminium forearm crutches, barely used. Adjustable for height 150–185cm. Includes non-slip tips.",
      icon: "🩼",
      bgFrom: "#FFF3E0",
      bgTo: "#FFE0B2",
      requests: 1,
      views: 9,
    },
    {
      id: 3,
      name: "Bath Safety Seat",
      category: "Daily Living",
      condition: "Good condition",
      location: "Kigali",
      listedTime: "1 week ago",
      description:
        "Adjustable bath bench with non-slip feet and back support. Supports up to 135kg.",
      icon: "🛁",
      bgFrom: "#F0F8F6",
      bgTo: "#C5E4DC",
      requests: 0,
      views: 5,
    },
  ];

  switch (currentListingFilter.value) {
    case "active":
      return allListings.filter((l) => l.requests >= 0);
    case "matched":
      return allListings.filter((l) => l.requests > 0);
    case "donated":
      return []; // Would show donated items
    default:
      return allListings;
  }
});

// Profile fields for profile page
const profileFields = computed(() => [
  {
    key: "email",
    label: "Email",
    value: authStore.user?.email || "jeanpaul@email.com",
  },
  {
    key: "location",
    label: "Location",
    value: userLocation.value,
  },
  {
    key: "occupation",
    label: "Occupation",
    value: "Healthcare Worker",
  },
  {
    key: "memberSince",
    label: "Member Since",
    value: "September 2024",
  },
]);

// Impact summary for profile page
const impactSummary = computed(() => [
  {
    id: 1,
    value: equipmentStore.donations.filter((d) => d.status === "Donated")
      .length,
    label: "Total Items Donated",
  },
  {
    id: 2,
    value: equipmentStore.donations.filter((d) => d.status === "Listed").length,
    label: "Active Listings",
  },
  {
    id: 3,
    value: "Top 15%",
    label: "Donor in Kigali",
  },
]);

// ===== METHODS =====
// Navigate to different pages within dashboard
const showPage = (pageId) => {
  currentPage.value = pageId;
  // Reset form step when navigating away from list page
  if (pageId !== "list") {
    currentFormStep.value = 1;
  }
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

// Navigate to specific form step
const goToFormStep = (step) => {
  currentFormStep.value = step;
};

// Get step indicator class
const getStepClass = (step) => {
  if (step < currentFormStep.value) {
    return "bg-teal text-white";
  } else if (step === currentFormStep.value) {
    return "bg-amber text-dark";
  } else {
    return "bg-gray-200 text-gray-400";
  }
};

// Get step icon
const getStepIcon = (step) => {
  if (step < currentFormStep.value) {
    return "✓";
  } else {
    return step;
  }
};

// Get line class for step indicators
const getLineClass = (lineNumber) => {
  if (lineNumber < currentFormStep.value) {
    return "bg-teal";
  } else {
    return "bg-gray-200";
  }
};

// Get label class for step indicators
const getLabelClass = (step) => {
  if (step < currentFormStep.value) {
    return "text-teal";
  } else if (step === currentFormStep.value) {
    return "text-amber";
  } else {
    return "text-gray-400";
  }
};

// Set listing filter
const setListingFilter = (filterId) => {
  currentListingFilter.value = filterId;
};

// Approve a request
const approveRequest = (request) => {
  selectedRequest.value = request;
  showApprovalModal.value = true;
};

// Confirm approval
const confirmApproval = () => {
  if (selectedRequest.value) {
    // Update request status in store
    equipmentStore.updateRequestStatus(selectedRequest.value.id, "Approved");

    // Show success toast
    showToastNotification(
      "✅",
      `${selectedRequest.value.userName}'s request approved! Contact details have been shared.`,
    );

    // Close modal
    closeModal();
  }
};

// Decline a request
const declineRequest = (request) => {
  if (request) {
    // Update request status in store
    equipmentStore.updateRequestStatus(request.id, "Denied");

    // Show toast
    showToastNotification(
      "❌",
      "Request declined. The recipient has been notified.",
    );
  }
};

// Edit a listing
const editListing = (listing) => {
  // Navigate to list page with pre-filled data
  showPage("list");
  // In a real app, this would load the listing data into the form
  console.log("Editing listing:", listing.name);
  showToastNotification("✏️", `Editing "${listing.name}"`);
};

// Remove a listing
const removeListing = (listing) => {
  if (confirm(`Are you sure you want to remove "${listing.name}"?`)) {
    // Remove from store (this would be an API call in real app)
    console.log("Removing listing:", listing.name);

    // Show toast
    showToastNotification("🗑️", "Listing removed successfully.");
  }
};

// Close modal
const closeModal = () => {
  showApprovalModal.value = false;
  showSuccessModal.value = false;
  selectedRequest.value = null;
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

// ===== PHOTO UPLOAD METHODS =====
// Trigger file input click
const triggerFileUpload = () => {
  fileInput.value?.click();
};

// Handle file selection from input
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
};

// Handle drag and drop files
const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
};

// Process uploaded files
const processFiles = (files) => {
  const imageFiles = files.filter((file) => file.type.startsWith("image/"));

  imageFiles.forEach((file) => {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      showToastNotification(
        "⚠️",
        `File "${file.name}" is too large. Max size is 10MB.`,
      );
      return;
    }

    // Check if we already have 5 photos
    if (uploadedPhotos.value.length >= 5) {
      showToastNotification("⚠️", "Maximum 5 photos allowed.");
      return;
    }

    // Create file reader to preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedPhotos.value.push({
        file: file,
        url: e.target.result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  });

  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Remove uploaded photo
const removePhoto = (index) => {
  uploadedPhotos.value.splice(index, 1);
  showToastNotification("🗑️", "Photo removed.");
};

// Submit listing with photos
const submitListing = () => {
  // Validate required fields
  if (
    !newItem.value.name ||
    !newItem.value.category ||
    !newItem.value.condition
  ) {
    showToastNotification("⚠️", "Please fill in all required fields.");
    goToFormStep(1);
    return;
  }

  if (uploadedPhotos.value.length === 0) {
    showToastNotification("⚠️", "Please add at least one photo.");
    goToFormStep(2);
    return;
  }

  // Create donation object with photos
  const donation = {
    ...newItem.value,
    photos: uploadedPhotos.value.map((p) => p.url),
    status: "Listed",
    time: "Listed just now",
  };

  // Add to equipment store
  equipmentStore.addDonation(donation);

  // Show success modal
  successModal.value = {
    icon: "🎉",
    title: "Listing Published!",
    message:
      "Your item is now live. We will notify you when someone sends a request.",
  };
  showSuccessModal.value = true;

  // Reset form
  resetListingForm();

  // Navigate to My Listings after success
  setTimeout(() => {
    showSuccessModal.value = false;
    showPage("my-listings");
  }, 3000);
};

// Reset listing form
const resetListingForm = () => {
  newItem.value = {
    name: "",
    category: "",
    condition: "",
    description: "",
    location: "",
    handover: "pickup",
    availability: "",
    notes: "",
  };
  uploadedPhotos.value = [];
  currentFormStep.value = 1;
};

// Component lifecycle
onMounted(() => {
  // Initialize component
  console.log("Donor Dashboard mounted");
});
</script>

<style scoped>
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
  background: rgba(212, 130, 10, 0.18);
  color: #d4820a;
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

.dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #7a9e96;
  border-radius: 50%;
  margin: 0 8px;
}

/* Responsive Sidebar */
@media (max-width: 1023px) {
  .nav-label,
  .user-profile-text,
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

.pill-active {
  background: #e8f4f1;
  color: #1a5c52;
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

.ab-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Upload Zone Styles */
.upload-zone {
  border: 2px dashed #b2d8d2;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background: #f9fafa;
}

.upload-zone:hover {
  border-color: #1a5c52;
  background: #e8f4f1;
}

/* Step Indicator Styles */
.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-line {
  flex: 1;
  height: 2px;
  margin: 0 4px;
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

/* Step Indicator Styles */
.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-line {
  flex: 1;
  height: 2px;
  margin: 0 4px;
}

/* Card Hover Effects */
.listing-card {
  transition: all 0.22s;
  display: flex;
  flex-direction: column;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(26, 92, 82, 0.1);
}

/* Ensure consistent card heights */
.listing-card > div:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
