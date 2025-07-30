<!--
  Modal Component Usage Guide:
  
  A flexible modal component that supports:
  - Multiple sizes (sm, md, lg, xl)
  - Custom header, body, and footer slots
  - Optional image display
  - Backdrop click to close
  - Close button in header
  - Responsive design
  - v-model support for show/hide
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiModal v-model="showModal" size="md">
      <template #header>
        <h3>Modal Title</h3>
      </template>
      
      <template #body>
        <p>This is the modal content.</p>
        <p>You can put any content here.</p>
      </template>
      
      <template #footer>
        <button @click="showModal = false">Close</button>
        <button @click="saveData">Save</button>
      </template>
    </UiModal>
    
    <UiModal v-model="showImageModal" size="lg" image="/path/to/image.jpg">
      <template #header>
        <h3>Image Preview</h3>
      </template>
      
      <template #body>
        <p>This modal shows an image above the content.</p>
      </template>
    </UiModal>
    
    <UiModal v-model="showSmallModal" size="sm">
      <template #header>
        <h4>Quick Info</h4>
      </template>
      
      <template #body>
        <p>Simple information display.</p>
      </template>
    </UiModal>
    
    <UiModal v-model="showLargeModal" size="xl">
      <template #header>
        <h2>Large Modal</h2>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <h3>Section 1</h3>
          <p>Content for section 1...</p>
          
          <h3>Section 2</h3>
          <p>Content for section 2...</p>
        </div>
      </template>
      
      <template #footer>
        <div class="flex gap-2">
          <button @click="showLargeModal = false">Cancel</button>
          <button @click="processData">Process</button>
        </div>
      </template>
    </UiModal>
  </template>
  
  <script setup>
  const showModal = ref(false)
  const showImageModal = ref(false)
  const showSmallModal = ref(false)
  const showLargeModal = ref(false)
  
  const saveData = () => {
    // Save logic here
    showModal.value = false
  }
  
  const processData = () => {
    // Process logic here
    showLargeModal.value = false
  }
  </script>
  
  PROPS:
  - modelValue: boolean (required) - Controls modal visibility
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Modal size
  - image: string (optional) - URL of image to display above body content
  
  EVENTS:
  - update:modelValue: Emitted when modal should be shown/hidden
  
  SLOTS:
  - header: Modal header content (optional)
  - body: Modal body content (required)
  - footer: Modal footer content (optional)
  
  FEATURES:
  - Click outside to close
  - Close button in header (when header slot is used)
  - Responsive sizing
  - Image support
  - Customizable content via slots
-->

<template>
  <div v-if="modelValue" class="ui-modal-backdrop" @click="onBackdropClick">
    <div :class="['ui-modal', sizeClass]">
      <!-- Header Slot -->
      <div class="ui-modal-header" v-if="$slots.header" :class="headerTitleClass">
        <slot name="header" />
        <button class="ui-modal-close-btn" @click="closeModal" type="button">
          <VsxIcon 
            v-if="sizeIconClass"
            iconName="CloseCircle"
            class="ui-modal-header-icon"
            :size="sizeIconClass"
            type="bold" 
          />
        </button>
      </div>
      <!-- Body Slot -->
      <div class="ui-modal-body" :class="bodyTextClass">
        <div v-if="image" class="mb-4">
          <img :src="image" alt="Modal image" class="w-full h-auto rounded object-cover max-h-60" />
        </div>
        <slot name="body"></slot>
      </div>
      <!-- Footer Slot -->
      <div class="ui-modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true, // Controls modal visibility
  },
  size: {
    type: String,
    default: "md", // valid values: sm, md, lg, xl
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  image: {
    type: String,
    default: "", // URL of image to display above body content
  }
})

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/**
 * Computed icon size based on modal size
 */
const sizeIconClass = computed<number>(() => {
  switch (props.size) {
    case 'xl': return 28
    case 'lg': return 24
    case 'md': return 22
    case 'sm':
    default: return 18
  }
})

/**
 * Computed modal size class
 */
const sizeClass = computed<string>(() => `ui-modal-${props.size}`)

/**
 * Computed header title class based on modal size
 */
const headerTitleClass = computed<string>(() => `modal-header-title-${props.size}`)

/**
 * Computed body text class based on modal size
 */
const bodyTextClass = computed<string>(() => `modal-body-text-${props.size}`)

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Close the modal by emitting update:modelValue event
 */
const closeModal = (): void => {
  emit('update:modelValue', false)
}

/**
 * Handle backdrop click to close modal
 * Only closes if click is on backdrop, not inside modal content
 */
const onBackdropClick = (event: MouseEvent): void => {
  // Only close if the click is on the backdrop, not inside the modal
  if (event.target === event.currentTarget) {
    closeModal()
  }
}
</script>

<style scoped>
@reference "assets/css/main.css";
.ui-modal-backdrop {
  @apply fixed inset-0 bg-black/60  flex items-center justify-center z-50;
}
.ui-modal {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300;
 
}
.ui-modal-header-icon {
  @apply cursor-pointer p-0.5 text-gray-shade-800;
}
.ui-modal-sm { @apply w-80 pb-2 }
.ui-modal-md { @apply w-114 pb-3 }
.ui-modal-lg { @apply w-138 pb-3  }
.ui-modal-xl { @apply w-148 pb-4  }
.ui-modal-header {
  @apply  flex flex-row justify-between items-center bg-gray-tint-200 ;
}
.modal-header-title-sm { @apply p-2  text-sm font-semibold text-gray-shade-800; }
.modal-header-title-md { @apply p-3  text-base font-semibold text-gray-shade-800; }
.modal-header-title-lg { @apply p-3 text-h6 font-semibold text-gray-shade-800; }
.modal-header-title-xl { @apply p-4  text-h5 font-semibold text-gray-shade-800; }


.modal-body-text-sm { @apply text-2xs font-normal text-gray-shade-800 px-2 py-4; }
.modal-body-text-md { @apply text-sm font-normal text-gray-shade-800 px-3 py-4 ; }
.modal-body-text-lg { @apply text-sm font-normal text-gray-shade-800 px-3 py-4; }
.modal-body-text-xl { @apply text-base font-normal text-gray-shade-800 px-4 py-4; }

.ui-modal-footer {
  @apply  px-2 flex justify-end ;
}



</style>