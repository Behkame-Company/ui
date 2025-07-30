<!--
  PopUp Component Usage Guide:
  
  A customizable popup/modal component that supports:
  - Custom icons with different sizes
  - Customizable title and body text
  - Confirm and cancel actions
  - Custom button text
  - Backdrop overlay
  - Responsive design
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiPopUp
      v-if="showPopup"
      title="Success!"
      body="Your action was completed successfully."
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    
    <UiPopUp
      v-if="showDeletePopup"
      icon="Trash"
      title="Delete Confirmation"
      body="Are you sure you want to delete this item?\nThis action cannot be undone."
      confirmText="Delete"
      cancelText="Keep"
      @confirm="deleteItem"
      @cancel="closeDeletePopup"
    />
    
    <UiPopUp
      v-if="showWarning"
      icon="Warning2"
      title="Warning"
      body="You have unsaved changes.\nDo you want to continue?"
      confirmText="Continue"
      cancelText="Go Back"
      @confirm="continueAction"
      @cancel="saveChanges"
    />
  </template>
  
  <script setup>
  const showPopup = ref(false)
  const showDeletePopup = ref(false)
  const showWarning = ref(false)
  
  const handleConfirm = () => {
    console.log('Confirmed!')
    showPopup.value = false
  }
  
  const handleCancel = () => {
    console.log('Cancelled!')
    showPopup.value = false
  }
  
  const deleteItem = () => {
    // Delete logic here
    showDeletePopup.value = false
  }
  
  const closeDeletePopup = () => {
    showDeletePopup.value = false
  }
  </script>
  
  PROPS:
  - icon: string (default: 'closeCircle')
  - title: string (default: 'Success')
  - body: string (default: 'Body text.\nyou can type anything here')
  - confirmText: string (default: 'Confirm')
  - cancelText: string (default: 'Cancel')
  
  EVENTS:
  - confirm: Emitted when confirm button is clicked
  - cancel: Emitted when cancel button is clicked
-->

<template>
  <div class="popup-backdrop">
    <div class="popup-modal">
      <div class="flex justify-center mb-4">
        <VsxIcon :iconName="icon" class="popup-icon" :size="48" />
      </div>
      <div class="popup-title">
         {{ title }}
      </div>
      <div class="popup-body">
        {{ body }}
      </div>
      <div class="popup-actions">
        <button @click="onConfirm" class="popup-btn-yes">
         {{ confirmText }}
        </button>
        <button @click="onCancel" class="popup-btn-no">
         {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 3. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  icon: { type: String, default: 'closeCircle' },
  title: { type: String, default: 'Success' },
  body: { type: String, default: 'Body you can type anything here' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' }
});

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>();

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Handle confirm button click
 * Emits the confirm event to parent component
 */
const onConfirm = (): void => {
  emit('confirm')
}

/**
 * Handle cancel button click
 * Emits the cancel event to parent component
 */
const onCancel = (): void => {
  emit('cancel')
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
  @apply w-14 h-14 my-4;
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