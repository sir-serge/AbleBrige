// Authentication Store - Centralized user authentication state management
// This store handles user login, logout, and profile data across the entire application
import { defineStore } from "pinia";
import { ref } from "vue";

// Create and export the authentication store using Pinia
export const useAuthStore = defineStore("auth", () => {
  // ===== STATE =====
  // Store current user information (null when logged out, object when logged in)
  const user = ref(null);
  // Boolean flag to track if user is authenticated (true when logged in, false when logged out)
  const isAuthenticated = ref(false);

  // ===== ACTIONS =====
  // Login action - Sets user data and marks user as authenticated
  // Called when user successfully logs in or signs up
  const login = (userData) => {
    user.value = userData;
    isAuthenticated.value = true;
  };

  // Logout action - Clears user data and marks user as unauthenticated
  // Called when user logs out or session expires
  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
  };

  // Update user action - Updates existing user data with new information
  // Used for profile editing and user data updates
  // Merges new data with existing user data to preserve unchanged fields
  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData };
    }
  };

  // ===== RETURN =====
  // Expose state and actions for components to use
  return {
    // State variables
    user, // Current user object with all user information
    isAuthenticated, // Boolean authentication status

    // Action functions
    login, // Function to log user in
    logout, // Function to log user out
    updateUser, // Function to update user profile data
  };
});
