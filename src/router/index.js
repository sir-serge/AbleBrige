import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import Problem from "../views/Problem.vue";
import Auth from "../views/Auth.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? "/dashboard" : "/problem";
    },
  },
  { path: "/problem", name: "Problem", component: Problem },
  { path: "/auth", name: "Auth", component: Auth },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // ensure hash navigation scrolls to the element
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
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to auth page if not authenticated
    next("/auth");
  } else {
    // Otherwise proceed
    next();
  }
});

export default router;
