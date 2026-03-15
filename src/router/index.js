// Vue Router Configuration - Application routing and navigation guards
// This file defines all application routes and handles authentication-based navigation
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import Problem from "../views/Problem.vue";
import RoleSelection from "../views/RoleSelection.vue";
import Auth from "../views/Auth.vue";
import DonorDashboard from "../views/DonorDashboard.vue";
import RecipientDashboard from "../views/RecipientDashboard.vue";

// Define all application routes
const routes = [
  {
    path: "/",
    redirect: () => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return "/problem";
      const role = authStore.user?.role;
      if (role === "donor") return "/donor-dashboard";
      if (role === "recipient") return "/recipient-dashboard";
      return "/role-selection";
    },
  },
  { path: "/problem", name: "Problem", component: Problem },
  { path: "/role-selection", name: "RoleSelection", component: RoleSelection },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    props: (route) => ({
      role: route.query.role || "donor", // Default to donor if no role specified
    }),
  },
  {
    path: "/donor-dashboard",
    name: "DonorDashboard",
    component: DonorDashboard,
    meta: { requiresAuth: true, role: "donor" },
  },
  {
    path: "/recipient-dashboard",
    name: "RecipientDashboard",
    component: RecipientDashboard,
    meta: { requiresAuth: true, role: "recipient" },
  },
];

// Create and configure router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scroll behavior for navigation
  // ensure hash navigation scrolls to element
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guard for protected routes
// Runs before each route navigation to check authentication and role
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to role selection if trying to access protected route without authentication
    next("/role-selection");
  } else if (to.meta.role && authStore.user?.role !== to.meta.role) {
    // Redirect to appropriate dashboard based on user role
    const userRole = authStore.user?.role;
    if (userRole === "donor") {
      next("/donor-dashboard");
    } else if (userRole === "recipient") {
      next("/recipient-dashboard");
    } else {
      next("/role-selection");
    }
  } else {
    // Otherwise proceed to requested route
    next();
  }
});

export default router;
