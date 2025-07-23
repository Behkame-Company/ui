<template>
  <div class="popup-backdrop">
    <div class="popup-modal">
      <div class="flex justify-center mb-4">
        <slot name="icon">
          <VsxIcon :iconName="icon" class="popup-icon" :size="48" />
        </slot>
      </div>
      <div class="popup-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="popup-body">
        <slot name="body">{{ body }}</slot>
      </div>
      <div class="popup-actions">
        <button @click="onConfirm" class="popup-btn-yes">
          <slot name="confirm">{{ confirmText }}</slot>
        </button>
        <button @click="onCancel" class="popup-btn-no">
          <slot name="cancel">{{ cancelText }}</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: { type: String, default: 'closeCircle' },
  title: { type: String, default: 'Success' },
  body: { type: String, default: 'Body text.\nyou can type anything here' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' }
});

const emit = defineEmits(['confirm', 'cancel']);

function onConfirm() {
  emit('confirm');
}
function onCancel() {
  emit('cancel');
}
</script>

<style scoped>
@reference "assets/css/main.css";

.popup-backdrop {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black/60;
}
.popup-modal {
  @apply bg-white rounded-lg shadow-sm p-4 w-90 text-center;
}
.popup-icon {
  @apply text-primary w-14 h-14 my-4;
}
.popup-title {
  @apply font-semibold text-sm mb-4 text-gray;
}
.popup-body {
  @apply text-gray-shade-800 mb-4 whitespace-pre-line;
}
.popup-actions {
  @apply flex justify-center gap-2;
}
.popup-btn-yes {
  @apply bg-primary text-white text-center w-1/2 py-2 rounded-md font-medium text-xs;
}
.popup-btn-no {
  @apply bg-error text-white text-center w-1/2  py-2 rounded-md font-medium text-xs;
}
</style>