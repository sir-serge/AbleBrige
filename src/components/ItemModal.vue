<template>
  <div v-if="isOpen" class="modal-bg" @click="closeModal">
    <div class="modal-box max-w-sm mx-4 sm:max-w-md md:max-w-lg">
      <div class="h-32 md:h-44 flex items-center justify-center text-5xl md:text-7xl" :class="item?.bgClass || 'bg-gradient-to-br from-teal-pale to-[#C5E4DC]'">
        {{ item?.icon || '♿' }}
      </div>
      <div class="p-4 md:p-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-2">
          <h3 class="font-fraunces text-lg md:text-xl font-bold text-dark">{{ item?.name || 'Item Name' }}</h3>
          <span class="pill pill-new self-start sm:self-auto">{{ item?.category || 'Category' }}</span>
        </div>
        <p class="text-sm text-muted mb-4">{{ item?.distance || 'Distance' }} · {{ item?.condition || 'Condition' }}</p>
        <p class="text-sm text-gray-500 leading-relaxed mb-5">
          This item has been listed by a verified AbleBridge donor. Once you send a request the donor will be notified and will confirm or decline within 24 hours.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button class="flex-1 py-3 bg-teal text-white rounded-xl font-semibold text-sm hover:bg-teal-mid transition-colors" @click="sendRequest">
            Send Request
          </button>
          <button class="px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'send-request'])

const closeModal = () => {
  emit('close')
}

const sendRequest = () => {
  emit('send-request', props.item)
  closeModal()
}
</script>

<style scoped>
.modal-bg {
  position: fixed; inset: 0; background: rgba(26,46,41,0.7);
  z-index: 200; display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
  padding: 1rem;
}
.modal-bg.open { opacity: 1; pointer-events: all; }
.modal-box {
  background: #fff; border-radius: 20px; width: 100%; overflow: hidden;
  max-height: 90vh; overflow-y: auto;
}

.pill {
  display: inline-flex;
  align-items: center; 
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px; 
  font-weight: 600;
  background:#EDE9FE; 
  color:#7C3AED;
}
</style>