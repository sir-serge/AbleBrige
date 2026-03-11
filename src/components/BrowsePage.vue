<template>
  <!-- Browse Page Component - Equipment browsing with categories, search, and filtering -->
  <div class="p-4 md:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="mb-4 md:mb-6">
      <!-- Breadcrumb/Category indicator -->
      <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">
        Find What You Need
      </p>
      <!-- Main page title using Fraunces serif font -->
      <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">
        Browse Equipment
      </h1>
      <!-- Page description -->
      <p class="text-sm text-gray-500 mt-1">
        Select your disability type to see the most relevant equipment for you.
      </p>
    </div>

    <!-- Disability Category Selector -->
    <div
      class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8 mb-6 md:mb-7"
    >
      <!-- Category selector title -->
      <p
        class="text-xs font-semibold tracking-widest uppercase text-muted mb-4"
      >
        Choose Your Disability Type
      </p>

      <!-- Category buttons grid -->
      <div class="flex gap-2 md:gap-3 flex-wrap">
        <!-- Dynamic category buttons loop -->
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="dis-tab"
          :class="{ active: activeCategory === cat.id }"
          @click="setActiveCategory(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Selected category description -->
      <div
        class="mt-4 bg-teal-pale rounded-xl px-4 md:px-5 py-3 text-sm text-teal font-medium"
      >
        {{ activeCategoryDesc }}
      </div>

      <!-- Sort Dropdown -->
      <select
        v-model="sortBy"
        class="bg-white border border-teal/15 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-teal font-sans w-full sm:w-auto"
      >
        <option value="nearest">Nearest first</option>
        <option value="newest">Newest first</option>
        <option value="condition">Best condition</option>
      </select>
    </div>

    <!-- Equipment Grid - Display available equipment items -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <!-- Dynamic equipment cards loop -->
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="eq-card bg-white rounded-2xl overflow-hidden border border-teal/8"
        @click="$emit('open-modal', item)"
      >
        <!-- Equipment Icon Section -->
        <div
          class="h-32 md:h-40 flex items-center justify-center text-4xl md:text-6xl"
          :class="item.bgClass"
        >
          {{ item.icon }}
        </div>

        <!-- Equipment Details Section -->
        <div class="p-4 md:p-5">
          <!-- Category and Condition Row -->
          <div class="flex items-center gap-2 mb-2">
            <!-- Category Badge -->
            <span
              class="text-xs font-bold tracking-widest uppercase"
              :class="item.categoryColor"
              >{{ item.category }}</span
            >
            <!-- Distance indicator -->
            <span class="ml-auto text-xs text-muted">{{ item.distance }}</span>
          </div>

          <!-- Equipment name using Fraunces serif font -->
          <h4
            class="font-fraunces text-sm md:text-base font-bold text-dark mb-1"
          >
            {{ item.name }}
          </h4>

          <!-- Equipment description with line clamp for long text -->
          <p class="text-xs text-gray-500 mb-3 line-clamp-2">
            {{ item.description }}
          </p>

          <!-- Bottom row: Condition badge and Request button -->
          <div class="flex items-center justify-between">
            <!-- Condition Badge -->
            <span
              class="px-2 md:px-3 py-1 text-xs font-semibold rounded-full"
              :class="item.conditionClass"
              >{{ item.condition }}</span
            >

            <!-- Request Button -->
            <button
              class="bg-teal text-white text-xs px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-teal-mid transition-colors"
              @click.stop="$emit('open-modal', item)"
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue Composition API - Reactive data, computed properties, and imports
import { ref, computed } from "vue";
import { useEquipmentStore } from "../stores/equipment.js";

// Define custom events that this component can emit to parent
defineEmits(["open-modal"]);

// Use Pinia store for centralized state management
const equipmentStore = useEquipmentStore();

// Reactive state for filters and search
const activeCategory = ref("all"); // Currently selected disability category
const searchQuery = ref(""); // Search input value
const sortBy = ref("nearest"); // Sort preference (nearest, newest, condition)

// Disability categories for filtering
const categories = ref([
  { id: "all", label: "🔍 All Equipment" },
  { id: "mobility", label: "♿ Mobility" },
  { id: "hearing", label: "👂 Hearing" },
  { id: "vision", label: "👁️ Vision" },
  { id: "daily", label: "🤝 Daily Living" },
  { id: "cognitive", label: "🧠 Cognitive Support" },
]);

// Category descriptions that change based on selected category
const categoryDescriptions = {
  all: "Showing all available equipment near Kigali, Rwanda.",
  mobility:
    "♿ Mobility aids — wheelchairs, walkers, crutches, and more for movement and independence.",
  hearing:
    "👂 Hearing aids — amplification devices, hearing aids, and communication tools.",
  vision:
    "👁️ Vision aids — canes, magnifiers, and navigation tools for visual impairment.",
  daily:
    "🤝 Daily Living aids — bathroom safety, grip aids, adaptive tools for everyday tasks.",
  cognitive:
    "🧠 Cognitive Support — reminder clocks, calendars, and tools for memory and focus.",
};

// Computed property for active category description
const activeCategoryDesc = computed(
  () => categoryDescriptions[activeCategory.value],
);

// Computed property for filtering and sorting equipment items
const filteredItems = computed(() => {
  // Get items from store
  let filtered = equipmentStore.availableItems;

  // Filter by selected category (if not "all")
  if (activeCategory.value !== "all") {
    filtered = filtered.filter((item) => item.cat === activeCategory.value);
  }

  // Filter by search query (case-insensitive search in name, description, category)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }

  // Sort filtered results based on selected sort preference
  filtered.sort((a, b) => {
    if (sortBy.value === "nearest") {
      // Sort by distance (extract number from distance string)
      return (
        parseInt(a.distance.match(/\d+/)[0]) -
        parseInt(b.distance.match(/\d+/)[0])
      );
    } else if (sortBy.value === "newest") {
      // Random sort for demo purposes (would use actual timestamps in real app)
      return Math.random() - 0.5;
    } else if (sortBy.value === "condition") {
      // Sort by condition quality (Like New = 3, Good = 2, Fair = 1)
      const order = { "Like New": 3, "Good condition": 2, Fair: 1 };
      return order[b.condition] - order[a.condition];
    }
    return 0;
  });

  return filtered;
});

// Function to set active category
const setActiveCategory = (cat) => {
  activeCategory.value = cat;
};
</script>

<style scoped>
/* Category Tab Styles - Base styling for disability category buttons */
.dis-tab {
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  border: 1.5px solid #d0e8e3;
  color: #1a5c52;
  background: #fff;
  transition: all 0.18s;
}

/* Hover state for category tabs */
.dis-tab:hover {
  background: #e8f4f1;
}

/* Active state for selected category tab */
.dis-tab.active {
  background: #1a5c52;
  color: #fff;
  border-color: #1a5c52;
}

/* Equipment Card Styles - Base styling for equipment cards */
.eq-card {
  transition: all 0.22s;
  cursor: pointer;
}

/* Hover state for equipment cards - lift effect with shadow */
.eq-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(26, 92, 82, 0.13);
}
</style>
