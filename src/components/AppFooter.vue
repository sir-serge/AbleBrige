<!-- Footer Component - Main site footer with navigation, resources, and contact information -->
<template>
  <footer class="bg-dark text-white py-16 px-5">
    <!-- Main Footer Grid - 4 columns on large screens -->
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Column 1: About Section -->
        <div>
          <!-- Logo/Brand -->
          <h3 class="text-2xl font-bold text-amber mb-6">AbleBridge</h3>
          <!-- About description -->
          <p class="text-white/80 leading-relaxed mb-6">
            Connecting unused assistive equipment with people who need it most.
            Free forever, built for everyone.
          </p>
          <!-- Social Media Links -->
          <div class="flex space-x-4">
            <!-- Facebook Link -->
            <a
              href="#"
              class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <!-- Twitter Link -->
            <a
              href="#"
              class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <!-- LinkedIn Link -->
            <a
              href="#"
              class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <!-- Section Title -->
          <h4 class="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <!-- Navigation Links List -->
          <ul class="space-y-3">
            <!-- Home Link -->
            <li>
              <router-link
                to="/"
                class="text-white/80 hover:text-amber transition-colors"
                >Home</router-link
              >
            </li>
            <!-- The Problem Link -->
            <li>
              <router-link
                to="/problem#problem"
                class="text-white/80 hover:text-amber transition-colors"
                >The Problem</router-link
              >
            </li>
            <!-- Our Solution Link -->
            <li>
              <router-link
                to="/problem#solution"
                class="text-white/80 hover:text-amber transition-colors"
                >Our Solution</router-link
              >
            </li>
            <!-- Success Stories Link -->
            <li>
              <router-link
                to="/problem#stories"
                class="text-white/80 hover:text-amber transition-colors"
                >Success Stories</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Column 3: Resources -->
        <div>
          <!-- Section Title -->
          <h4 class="text-lg font-semibold text-white mb-6">Resources</h4>
          <!-- Resources Links List -->
          <ul class="space-y-3">
            <!-- How It Works Link -->
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-amber transition-colors"
                >How It Works</a
              >
            </li>
            <!-- Donor Guidelines Link -->
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-amber transition-colors"
                >Donor Guidelines</a
              >
            </li>
            <!-- Recipient Guide Link -->
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-amber transition-colors"
                >Recipient Guide</a
              >
            </li>
            <!-- FAQ Link -->
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-amber transition-colors"
                >FAQ</a
              >
            </li>
          </ul>
        </div>

        <!-- Column 4: Contact -->
        <div>
          <!-- Section Title -->
          <h4 class="text-lg font-semibold text-white mb-6">Get in Touch</h4>
          <!-- Contact Information -->
          <ul class="space-y-3">
            <!-- Email -->
            <li class="flex items-center text-white/80">
              <svg
                class="w-5 h-5 mr-3 text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@ablebridge.org
            </li>
            <!-- Phone -->
            <li class="flex items-center text-white/80">
              <svg
                class="w-5 h-5 mr-3 text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +1 (555) 123-4567
            </li>
            <!-- Location -->
            <li class="flex items-start text-white/80">
              <svg
                class="w-5 h-5 mr-3 text-amber mt-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.657 16.657l-2.829-2.828-1.415 1.414-1.414h1.172v1.172l1.414 1.414 1.415h1.172l2.829 2.828z"
                />
              </svg>
              Kigali, Rwanda
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar - Copyright and Legal Links -->
      <div class="border-t border-white/20 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Copyright Notice -->
          <p class="text-white/60 text-sm mb-4 md:mb-0">
            <!-- Copyright notice with current year -->
            &copy; {{ new Date().getFullYear() }} AbleBridge. All rights
            reserved.
          </p>
          <!-- Legal Links -->
          <div class="flex space-x-6">
            <!-- Privacy Policy Link -->
            <a
              href="#"
              class="text-white/60 hover:text-amber text-sm transition-colors"
              >Privacy Policy</a
            >
            <!-- Terms of Service Link -->
            <a
              href="#"
              class="text-white/60 hover:text-amber text-sm transition-colors"
              >Terms of Service</a
            >
            <!-- Cookie Policy Link -->
            <a
              href="#"
              class="text-white/60 hover:text-amber text-sm transition-colors"
              >Cookie Policy</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component with static content - no reactive data needed
</script>

<style scoped>
/* Footer Component Styles */
/* Component-specific styles can be added here if needed */
</style>
