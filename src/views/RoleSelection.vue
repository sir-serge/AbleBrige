<template>
  <!-- Role Selection Component - User role identification page -->
  <!-- This component helps users identify as donor or recipient before authentication -->
  <div
    class="min-h-screen bg-[#F9F5F0] font-sans flex items-center justify-center p-4 sm:p-6"
  >
    <!-- Main Card -->
    <div
      class="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
    >
      <!-- Header Section -->
      <div class="bg-dark p-8 text-center">
        <div class="font-fraunces text-4xl font-bold text-white mb-4">
          Welcome to Able<span class="text-amber">Bridge</span>
        </div>
        <p class="text-[#AECCC7] text-lg leading-relaxed">
          Connecting people who need assistive equipment with those who can help
        </p>
      </div>

      <!-- Role Selection -->
      <div class="p-8 md:p-12">
        <h2 class="font-fraunces text-2xl font-bold text-dark text-center mb-8">
          How would you like to join AbleBridge?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <!-- Donor Option -->
          <div
            class="role-option-card"
            :class="{ selected: selectedRole === 'donor' }"
            @click="selectRole('donor')"
            role="button"
            tabindex="0"
            @keydown.enter="selectRole('donor')"
            aria-label="Join as a Donor"
          >
            <div class="role-icon-container bg-amber-pale">
              <div class="text-5xl">👨</div>
            </div>
            <div class="role-content">
              <h3 class="font-fraunces text-xl font-bold text-dark mb-3">
                I want to <span class="text-amber">Donate</span> Equipment
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                I have unused assistive equipment that could help someone in
                need. I want to make a difference in my community.
              </p>
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>List equipment for free</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Help people in your community</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Track your impact</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Connect with recipients</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Recipient Option -->
          <div
            class="role-option-card"
            :class="{ selected: selectedRole === 'recipient' }"
            @click="selectRole('recipient')"
            role="button"
            tabindex="0"
            @keydown.enter="selectRole('recipient')"
            aria-label="Join as a Recipient"
          >
            <div class="role-icon-container bg-teal-pale">
              <div class="text-5xl">👩</div>
            </div>
            <div class="role-content">
              <h3 class="font-fraunces text-xl font-bold text-dark mb-3">
                I need <span class="text-teal">Equipment</span> Support
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                I need assistive equipment to improve my quality of life and
                independence. I'm looking for affordable or donated options.
              </p>
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Browse available equipment</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Request items for free</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Connect with donors</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-teal">✓</span>
                  <span>Get verified quickly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Continue Button -->
        <div class="text-center mt-8">
          <button
            @click="continueToAuth"
            :disabled="!selectedRole"
            class="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            :class="
              selectedRole
                ? 'bg-teal text-white hover:bg-teal-mid shadow-lg transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            "
          >
            Continue as {{ selectedRole === "donor" ? "Donor" : "Recipient" }}
          </button>
        </div>

        <!-- Help Text -->
        <div class="text-center mt-6">
          <p class="text-xs text-gray-500">
            Not sure?
            <button
              class="text-teal font-semibold hover:underline"
              @click="showHelp"
            >
              Learn more about AbleBridge
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Role Selection Component - User role identification and navigation to authentication
// This component helps users choose their role before proceeding to login/signup
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// ===== COMPOSABLES =====
const router = useRouter();

// ===== STATE =====
// Selected user role (donor or recipient)
const selectedRole = ref("");

// ===== METHODS =====
// Select user role
const selectRole = (role) => {
  selectedRole.value = role;
};

// Continue to authentication page with selected role
const continueToAuth = () => {
  if (selectedRole.value) {
    // Store selected role in session storage for use in auth page
    sessionStorage.setItem("selectedRole", selectedRole.value);

    // Navigate to auth page with role parameter
    router.push(`/auth?role=${selectedRole.value}`);
  }
};

// Show help information
const showHelp = () => {
  // In a real app, this would open a help modal or navigate to help page
  console.log("Show help information");
};

// Component lifecycle
onMounted(() => {
  // Check if role was previously selected
  const savedRole = sessionStorage.getItem("selectedRole");
  if (savedRole) {
    selectedRole.value = savedRole;
  }
});
</script>

<style scoped>
/* Role Option Card Styles */
.role-option-card {
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option-card:hover {
  border-color: rgba(26, 92, 82, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.role-option-card.selected {
  border-color: #1a5c52;
  background-color: #e8f4f1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.role-icon-container {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
}

/* Button Styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  transform: scale(1.05);
}

/* Focus Styles */
.role-option-card:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(26, 92, 82, 0.2);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .role-option-card {
    transition: none;
  }

  .role-option-card:hover {
    transform: none;
    scale: 1;
  }
}
</style>
