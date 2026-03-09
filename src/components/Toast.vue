<template>
  <div class="toast" :class="{ show: isVisible }">
    <span>{{ icon }}</span> <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Request sent!'
  },
  icon: {
    type: String,
    default: '✅'
  }
})
</script>

<style scoped>
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 999;
  background: #1A2E29; color: #fff; padding: 14px 20px; border-radius: 12px;
  font-size: 13px; font-weight: 500; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  transform: translateY(80px); opacity: 0;
  transition: all 0.3s; display: flex; align-items: center; gap: 10px;
}
.toast.show { transform: translateY(0); opacity: 1; }
</style>