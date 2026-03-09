import { createRouter, createWebHistory } from "vue-router";
import Problem from "../views/Problem.vue";
import Auth from "../views/Auth.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", redirect: "/problem" },
  { path: "/problem", name: "Problem", component: Problem },
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
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

export default router;
