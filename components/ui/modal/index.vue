<!--
  Modal Component Usage Guide:

  PARENT COMPONENT USAGE:
  
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


  
  PROPS:
  - modelValue: boolean (required) - Controls modal visibility
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Modal size
  - image: string (optional) - URL of image to display above body content
  
  SLOTS:
  - header: Modal header content (optional)
  - body: Modal body content (required)
  - footer: Modal footer content (optional)
 
-->

<template>
  <div v-if="modelValue" class="ui-modal__backdrop" @click="onBackdropClick">
    <div :class="['ui-modal', sizeClass]">
      <!-- Header Slot -->
      <div class="ui-modal__header" v-if="$slots.header" :class="headerTitleClass">
        <slot name="header" />
        <button class="ui-modal__close__btn" @click="closeModal" type="button">
          <VsxIcon 
            v-if="sizeIconClass"
            iconName="CloseCircle"
            class="ui-modal__header__icon"
            :size="sizeIconClass"
            type="bold" 
          />
        </button>
      </div>
      <!-- Body Slot -->
      <div class="ui-modal__body" :class="bodyTextClass">
        <div v-if="image" class="mb-4">
          <img :src="image" alt="Modal image" class="ui-modal__img" />
        </div>
        <slot name="body"></slot>
      </div>
      <!-- Footer Slot -->
      <div class="ui-modal__footer" v-if="$slots.footer">
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
const model = defineModel<string>({
  required: true,
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
const sizeClass = computed<string>(() => `ui-modal__${props.size}`)

/**
 * Computed header title class based on modal size
 */
const headerTitleClass = computed<string>(() => `ui-modal__header__title__${props.size}`)

/**
 * Computed body text class based on modal size
 */
const bodyTextClass = computed<string>(() => `ui-modal__body__text__${props.size}`)

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
.ui-modal__backdrop {
  @apply fixed inset-0 bg-black/60  flex items-center justify-center z-50;
}
.ui-modal {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300;
 
}
.ui-modal__header__icon {
  @apply cursor-pointer p-0.5 text-gray-shade-800;
}
.ui-modal__sm { @apply w-80 pb-2 }
.ui-modal__md { @apply w-114 pb-3 }
.ui-modal__lg { @apply w-138 pb-3  }
.ui-modal__xl { @apply w-148 pb-4  }
.ui-modal__header {
  @apply  flex flex-row justify-between items-center bg-gray-tint-200 ;
}
.ui-modal__header__title__sm { @apply p-2  text-sm font-semibold text-gray-shade-800; }
.ui-modal__header__title__md { @apply p-3  text-base font-semibold text-gray-shade-800; }
.ui-modal__header__title__lg { @apply p-3 text-h6 font-semibold text-gray-shade-800; }
.ui-modal__header__title__xl { @apply p-4  text-h5 font-semibold text-gray-shade-800; }


.ui-modal__body__text__sm { @apply text-2xs font-normal text-gray-shade-800 px-2 py-4; }
.ui-modal__body__text__md { @apply text-sm font-normal text-gray-shade-800 px-3 py-4 ; }
.ui-modal__body__text__lg { @apply text-sm font-normal text-gray-shade-800 px-3 py-4; }
.ui-modal__body__text__xl { @apply text-base font-normal text-gray-shade-800 px-4 py-4; }

.ui-modal__footer {
  @apply  px-2 flex justify-end ;
}

.ui-modal__img{
  @apply w-full h-auto rounded-md object-cover max-h-60
}

</style>