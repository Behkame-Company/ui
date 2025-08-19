<!--
  PopUp Component Usage Guide:

  PARENT COMPONENT USAGE:
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

  
  PROPS:
  - icon: string (default: 'closeCircle')
  - title: string (default: 'Success')
  - body: string (default: 'Body text.\nyou can type anything here')
  - confirmText: string (default: 'Confirm')
  - cancelText: string (default: 'Cancel')

-->

<template>
  <div class="ui-popup__backdrop">
    <div class="ui-popup__modal">
      <div class="ui-popup__container">
        <VsxIcon :iconName="icon" class="ui-popup__icon" :size="48" />
      </div>
      <div class="ui-popup__title">
         {{ title }}
      </div>
      <div class="ui-popup__body">
        {{ body }}
      </div>
      <div class="ui-popup__actions">
        <button @click="onConfirm" class="ui-popup__btn__yes">
         {{ confirmText }}
        </button>
        <button @click="onCancel" class="ui-popup__btn__no">
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
@reference "~/assets/css/main.css";

.ui-popup__backdrop {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black/60;
}
.ui-popup__modal {
  @apply bg-white rounded-lg shadow-sm p-4 w-90 text-center;
}
.ui-popup__container{
  @apply flex justify-center mb-4;
}
.ui-popup__icon {
  @apply w-14 h-14 my-4;
}
.ui-popup__title {
  @apply font-semibold text-sm mb-4 text-gray;
}
.ui-popup__body {
  @apply text-gray-shade-800 mb-4 whitespace-pre-line;
}
.ui-popup__actions {
  @apply flex justify-center gap-2;
}
.ui-popup__btn__yes {
  @apply bg-primary text-white text-center w-1/2 py-2 rounded-md font-medium text-xs;
}
.ui-popup__btn__no {
  @apply bg-error text-white text-center w-1/2  py-2 rounded-md font-medium text-xs;
}
</style>