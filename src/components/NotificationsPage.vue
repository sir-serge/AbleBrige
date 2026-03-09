<template>
  <div class="p-4 md:p-6 lg:p-8">
    <div class="mb-4 md:mb-7">
      <p class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-1">Your Updates</p>
      <h1 class="font-fraunces text-2xl md:text-3xl font-bold text-dark">Notifications</h1>
      <p class="text-sm text-gray-500 mt-1">All updates about your requests and new items near you.</p>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-2 mb-4 md:mb-6 flex-wrap">
      <button
        v-for="filter in filters"
        :key="filter.id"
        class="dis-tab"
        :class="{ active: activeFilter === filter.id }"
        @click="setActiveFilter(filter.id)"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="space-y-3 md:space-y-4">
      <div
        v-for="notif in filteredNotifications"
        :key="notif.id"
        class="notif-item bg-white rounded-2xl p-4 md:p-5 border flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start"
        :class="notif.borderClass"
      >
        <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0" :class="notif.iconClass">{{ notif.icon }}</div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
            <p class="text-sm font-semibold text-dark flex-1 min-w-0">{{ notif.title }}</p>
            <span class="pill self-start sm:self-auto" :class="notif.pillClass">{{ notif.status }}</span>
          </div>
          <p class="text-sm text-gray-500 leading-relaxed">{{ notif.description }}</p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
            <span class="text-xs text-muted">{{ notif.time }} · {{ notif.location }}</span>
            <div class="flex gap-2 flex-shrink-0">
              <button v-if="notif.action" class="text-xs bg-teal text-white px-3 md:px-4 py-1.5 rounded-lg font-semibold hover:bg-teal-mid transition-colors">
                {{ notif.action }}
              </button>
              <button v-if="notif.altAction" class="text-xs bg-gray-100 text-gray-600 px-3 md:px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors" @click="$emit('page-change', 'browse')">
                {{ notif.altAction }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['page-change'])

const activeFilter = ref('all')

const filters = ref([
  { id: 'all', label: 'All (4)' },
  { id: 'approved', label: '✅ Approved' },
  { id: 'pending', label: '⏳ Pending' },
  { id: 'denied', label: '❌ Denied' },
  { id: 'new', label: '📍 New Nearby' }
])

const notifications = ref([
  {
    id: 1,
    type: 'approved',
    title: 'Request Approved — Manual Wheelchair',
    status: 'Approved',
    description: 'Jean-Paul M. has approved your request for the Manual Wheelchair. Contact details have been shared. Please arrange pickup within 7 days.',
    time: '2 hours ago',
    location: 'Kigali',
    icon: '✅',
    iconClass: 'bg-teal',
    borderClass: 'border-teal/10',
    pillClass: 'pill-approved',
    action: 'View Contact Details'
  },
  {
    id: 2,
    type: 'pending',
    title: 'Request Pending — Forearm Crutches',
    status: 'Pending',
    description: 'Your request has been sent to Alice K. She has been notified and usually responds within 24 hours. We will notify you when she replies.',
    time: 'Yesterday',
    location: 'Kigali',
    icon: '⏳',
    iconClass: 'bg-amber/15',
    borderClass: 'border-amber/15',
    pillClass: 'pill-pending'
  },
  {
    id: 3,
    type: 'denied',
    title: 'Request Declined — Bath Safety Seat',
    status: 'Denied',
    description: 'Unfortunately the donor has declined this request — the item may have already been given to someone else. We recommend browsing for similar items nearby.',
    time: '3 days ago',
    location: '',
    icon: '❌',
    iconClass: 'bg-red-50',
    borderClass: 'border-red-100',
    pillClass: 'pill-denied',
    altAction: 'Browse Similar →'
  },
  {
    id: 4,
    type: 'new',
    title: 'New item listed near you!',
    status: 'New Nearby',
    description: 'A Rollator Walker in good condition was just listed 3km from Kigali. Based on your profile (Mobility — Wheelchair), this might be a good match for you.',
    time: '30 minutes ago',
    location: '3km away',
    icon: '📍',
    iconClass: 'bg-purple-50',
    borderClass: 'border-purple-100',
    pillClass: 'pill-new',
    action: 'View Item →'
  }
])

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeFilter.value)
})

const setActiveFilter = (filter) => {
  activeFilter.value = filter
}
</script>

<style scoped>
.dis-tab {
  padding: 10px 18px; border-radius: 10px; cursor: pointer;
  font-size: 13px; font-weight: 500; white-space: nowrap;
  border: 1.5px solid #D0E8E3; color: #1A5C52; background: #fff;
  transition: all 0.18s;
}
.dis-tab:hover { background: #E8F4F1; }
.dis-tab.active { background: #1A5C52; color: #fff; border-color: #1A5C52; }

.notif-item {
  display: flex;
}

.pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
}
.pill-approved { background:#E8F4F1; color:#1A5C52; }
.pill-pending  { background:#FFF8EE; color:#D4820A; }
.pill-denied   { background:#FEF2F2; color:#DC2626; }
.pill-new      { background:#EDE9FE; color:#7C3AED; }
</style>