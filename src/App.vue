<script setup>
// Vue Composition API - Main app setup and imports
import { useRoute } from "vue-router"; // Router hook for accessing current route
import Navigation from "./components/Navigation.vue"; // Navigation component

// Get current route to conditionally show/hide navigation
const route = useRoute();
</script>

<template>
  <!-- Main App Container - Root element of the entire application -->
  <div id="app">
    <!-- Navigation Component - Only shown on pages other than dashboard -->
    <Navigation v-if="route.path !== '/dashboard'" />

    <!-- Main Content Area - Where router-view renders different pages -->
    <main>
      <!-- Router View - Dynamically renders components based on current route -->
      <router-view />
    </main>
  </div>
</template>

<style>
/* Import Google Fonts - Fraunces (serif) for headings, DM Sans (sans-serif) for body text */
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap");

/* CSS Custom Properties (Variables) - Centralized color palette for the entire app */
:root {
  --teal: #1a5c52; /* Primary brand color - dark teal */
  --teal-mid: #2d7a6e; /* Medium teal for accents */
  --teal-light: #4a9d8f; /* Light teal for highlights */
  --teal-pale: #e8f4f1; /* Very light teal for backgrounds */
  --amber: #d4820a; /* Secondary brand color - amber/gold */
  --amber-light: #f0a030; /* Light amber for hover states */
  --dark: #1a2e29; /* Dark text color */
  --darker: #0f1e1a; /* Darkest color for deep backgrounds */
  --cream: #f5ede3; /* Light cream background */
  --off: #f9f5f0; /* Off-white background */
  --muted: #7a9e96; /* Muted text color */
  --text: #2a2a2a; /* Standard text color */
  --white: #fefefe; /* Pure white */
}

/* Global Layout Styles */
html,
body,
#app {
  height: 100%;
  margin: 0;
}

/* Main content area - Adjust height to account for navigation bar */
main {
  min-height: calc(100vh - 72px);
}

/* Global Box Model Reset */
* {
  box-sizing: border-box;
}

/* Global Typography and Background */
body {
  font-family: "DM Sans", sans-serif; /* Default font family */
  background: #f4f1ec; /* Light background color */
}
</style>
