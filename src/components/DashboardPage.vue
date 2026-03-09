<template>
  <div class="p-4 md:p-6 lg:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 md:mb-8 gap-4">
      <div>
        <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">Good Morning</p>
        <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">Welcome back, Claudine 👋</h1>
        <p class="text-sm text-gray-500 mt-1">Here is what is happening with your requests today.</p>
      </div>
      <button @click="$emit('page-change', 'browse')" class="bg-teal text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-mid transition-colors w-full sm:w-auto">
        + Browse Equipment
      </button>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
      <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
        <div class="text-xl md:text-2xl mb-2">📋</div>
        <div class="font-fraunces text-2xl md:text-3xl font-bold text-dark">{{ stats.totalRequests }}</div>
        <div class="text-xs text-muted mt-1 font-medium">Total Requests</div>
      </div>
      <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
        <div class="text-xl md:text-2xl mb-2">⏳</div>
        <div class="font-fraunces text-2xl md:text-3xl font-bold text-amber">{{ stats.pending }}</div>
        <div class="text-xs text-muted mt-1 font-medium">Pending</div>
      </div>
      <div class="bg-white rounded-2xl p-4 md:p-5 border border-teal/8">
        <div class="text-xl md:text-2xl mb-2">✅</div>
        <div class="font-fraunces text-2xl md:text-3xl font-bold text-teal">{{ stats.approved }}</div>
        <div class="text-xs text-muted mt-1 font-medium">Approved</div>
      </div>
      <div class="bg-teal rounded-2xl p-4 md:p-5 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10"
             style="background:radial-gradient(circle at 80% 20%, #fff, transparent 60%)"></div>
        <div class="text-xl md:text-2xl mb-2 relative z-10">📍</div>
        <div class="font-fraunces text-2xl md:text-3xl font-bold text-white relative z-10">{{ stats.nearby }}</div>
        <div class="text-xs text-[#AECCC7] mt-1 font-medium relative z-10">Items Near You</div>
      </div>
    </div>

    <!-- Two-col: notifications preview + nearby items -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Recent notifications -->
      <div class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8">
        <div class="flex items-center justify-between mb-4 md:mb-5">
          <h3 class="font-fraunces text-lg font-bold text-dark">Recent Activity</h3>
          <span class="text-xs text-teal font-semibold cursor-pointer hover:underline" @click="$emit('page-change', 'notifications')">
            See all →
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 rounded-xl" :class="activity.bgClass + ' ' + activity.borderClass">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" :class="activity.iconClass">{{ activity.icon }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-dark">{{ activity.title }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ activity.description }}</p>
              <p class="text-xs text-muted mt-1">{{ activity.time }}</p>
            </div>
            <span class="pill flex-shrink-0" :class="activity.pillClass">{{ activity.status }}</span>
          </div>
        </div>
      </div>

      <!-- Nearby items quick view -->
      <div class="bg-white rounded-2xl p-4 md:p-6 border border-teal/8">
        <div class="flex items-center justify-between mb-4 md:mb-5">
          <h3 class="font-fraunces text-lg font-bold text-dark">Near You</h3>
          <span class="text-xs text-teal font-semibold cursor-pointer hover:underline" @click="$emit('page-change', 'browse')">
            Browse all →
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="item in nearbyItems" :key="item.id" class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/20 hover:bg-teal-pale/30 transition-all cursor-pointer" @click="$emit('open-modal', item)">
            <div class="w-10 md:w-11 h-10 md:h-11 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0" :class="item.iconBg">{{ item.icon }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-dark truncate">{{ item.name }}</p>
              <p class="text-xs text-muted truncate">{{ item.distance }} · {{ item.condition }}</p>
            </div>
            <button class="text-xs bg-teal text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors flex-shrink-0" @click.stop="$emit('open-modal', item)">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['page-change', 'open-modal'])

const stats = ref({
  totalRequests: 3,
  pending: 1,
  approved: 1,
  nearby: 6
})

const recentActivities = ref([
  {
    id: 1,
    title: 'Request Approved!',
    description: 'Your request for the Manual Wheelchair has been approved by Jean-Paul M.',
    time: '2 hours ago',
    status: 'Approved',
    icon: '✅',
    iconClass: 'bg-teal',
    bgClass: 'bg-[#E8F4F1]/60',
    borderClass: 'border-teal/10',
    pillClass: 'pill-approved'
  },
  {
    id: 2,
    title: 'Request Pending',
    description: 'Waiting for response on Forearm Crutches from Alice K.',
    time: 'Yesterday',
    status: 'Pending',
    icon: '⏳',
    iconClass: 'bg-amber/20',
    bgClass: 'bg-[#FFF8EE]/80',
    borderClass: 'border-amber/15',
    pillClass: 'pill-pending'
  },
  {
    id: 3,
    title: 'New item near you!',
    description: 'A Rollator Walker was just listed 3km from your location.',
    time: '30 minutes ago',
    status: 'New',
    icon: '📍',
    iconClass: 'bg-purple-100',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-100',
    pillClass: 'pill-new'
  }
])

const nearbyItems = ref([
  {
    id: 1,
    name: 'Rollator Walker',
    icon: '♿',
    iconBg: 'bg-teal-pale',
    distance: '📍 3 km away',
    condition: 'Good condition',
    category: 'Mobility'
  },
  {
    id: 2,
    name: 'Hearing Aid',
    icon: '👂',
    iconBg: 'bg-[#FFF3E0]',
    distance: '📍 5 km away',
    condition: 'Like new',
    category: 'Hearing'
  },
  {
    id: 3,
    name: 'White Cane',
    icon: '🦯',
    iconBg: 'bg-teal-pale',
    distance: '📍 2 km away',
    condition: 'Like new',
    category: 'Vision'
  }
])
</script>

<style scoped>
.pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
}
.pill-approved { background:#E8F4F1; color:#1A5C52; }
.pill-pending  { background:#FFF8EE; color:#D4820A; }
.pill-new      { background:#EDE9FE; color:#7C3AED; }
</style>