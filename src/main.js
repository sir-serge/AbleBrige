// Main Application Entry Point - Vue app initialization and global setup
// This file creates and configures the main Vue application instance
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Create Vue application instance
const app = createApp(App);

// Create Pinia store instance for state management
const pinia = createPinia();

// Configure and use global plugins
app.use(pinia); // Add Pinia for centralized state management
app.use(router); // Add Vue Router for navigation

// Mount application to DOM element with id="app"
app.mount("#app");
