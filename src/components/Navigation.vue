<!-- Navigation Component - Main site navigation with responsive mobile menu -->
<template>
  <nav class="bg-teal sticky top-0 z-50 py-3" aria-label="Main navigation">
    <!-- Navigation Container -->
    <div
      class="max-w-6xl mx-auto px-5 grid grid-cols-[auto_1fr_auto] items-center gap-5"
    >
      <!-- Logo/Brand section -->
      <div class="text-2xl font-bold">
        <!-- Logo with "Able" in dark text and "Bridge" highlighted in amber -->
        <span class="text-white">Able</span
        ><span class="text-amber font-normal ml-1.5">Bridge</span>
      </div>

      <!-- Desktop Navigation Menu -->
      <div
        class="hidden lg:flex gap-4 justify-center items-center"
        role="navigation"
        aria-label="Primary"
      >
        <!-- Navigation Links -->
        <router-link
          to="/problem"
          class="text-muted no-underline font-bold py-2 px-1 transition-colors duration-150 ease-in-out transform duration-150 ease-in-out text-sm hover:text-white router-link-active:text-white"
          >Home</router-link
        >
        <router-link
          to="/problem#problem"
          class="text-muted no-underline font-bold py-2 px-1 transition-colors duration-150 ease-in-out transform duration-150 ease-in-out text-sm hover:text-white router-link-active:text-white"
          >The Problem</router-link
        >
        <router-link
          to="/problem#solution"
          class="text-muted no-underline font-bold py-2 px-1 transition-colors duration-150 ease-in-out transform duration-150 ease-in-out text-sm hover:text-white router-link-active:text-white"
          >Our Solution</router-link
        >
        <router-link
          to="/problem#stories"
          class="text-muted no-underline font-bold py-2 px-1 transition-colors duration-150 ease-in-out transform duration-150 ease-in-out text-sm hover:text-white router-link-active:text-white"
          >Success Stories</router-link
        >
      </div>

      <!-- Right side: Mobile menu button and Get Started button -->
      <div class="flex gap-3 items-center justify-end">
        <!-- Mobile hamburger menu button -->
        <button
          class="lg:hidden bg-transparent border border-white/30 text-white p-2 rounded hover:bg-white/10 transition-colors"
          @click="open = !open"
          :aria-expanded="open"
          aria-label="Toggle menu"
          style="min-width: 44px; min-height: 44px"
        >
          <!-- Hamburger icon (3 lines) when menu is closed -->
          <div
            v-if="!open"
            class="flex flex-col justify-center items-center w-6 h-6"
          >
            <span class="block w-5 h-0.5 bg-white mb-1"></span>
            <span class="block w-5 h-0.5 bg-white mb-1"></span>
            <span class="block w-5 h-0.5 bg-white"></span>
          </div>
          <!-- Close icon (X) when menu is open -->
          <div v-else class="flex justify-center items-center w-6 h-6 relative">
            <span
              class="absolute block w-5 h-0.5 bg-white transform rotate-45"
            ></span>
            <span
              class="absolute block w-5 h-0.5 bg-white transform -rotate-45"
            ></span>
          </div>
        </button>

        <!-- Desktop Get Started button -->
        <div class="hidden lg:flex items-center justify-end">
          <router-link
            to="/auth"
            class="bg-amber text-white py-2.5 px-4 rounded-full no-underline font-bold tracking-tight max-w-[130px] whitespace-nowrap text-sm hover:brightness-95"
            >Get Started Free</router-link
          >
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu (slides down from top) -->
    <div
      v-if="open"
      class="absolute left-0 right-0 top-full bg-teal z-[45] border-b border-white/[0.02] lg:hidden"
      @click.self="open = false"
    >
      <div class="py-3 px-5 pb-4.5 flex flex-col gap-2">
        <!-- Mobile Navigation Links -->
        <router-link
          @click="open = false"
          to="/problem"
          class="text-muted no-underline py-2.5 px-1.5 font-bold hover:text-white router-link-active:text-white"
          >Home</router-link
        >
        <router-link
          @click="open = false"
          to="/problem#problem"
          class="text-muted no-underline py-2.5 px-1.5 font-bold hover:text-white router-link-active:text-white"
          >The Problem</router-link
        >
        <router-link
          @click="open = false"
          to="/problem#solution"
          class="text-muted no-underline py-2.5 px-1.5 font-bold hover:text-white router-link-active:text-white"
          >Our Solution</router-link
        >
        <router-link
          @click="open = false"
          to="/problem#stories"
          class="text-muted no-underline py-2.5 px-1.5 font-bold hover:text-white router-link-active:text-white"
          >Success Stories</router-link
        >
        <!-- Mobile Get Started button -->
        <router-link
          @click="open = false"
          to="/auth"
          class="block bg-amber text-white py-2.5 px-3 rounded-full text-center font-bold mt-2"
          >Get Started Free</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
// Reactive state for mobile menu toggle
const open = ref(false);
</script>

<style scoped>
/* Custom CSS variables and any non-Tailwind specific styles can go here */
</style>
