<!-- 
  TextArea Component Usage Guide:
  
  A customizable textarea component that supports:
  - Multiple sizes (sm, md, lg, xl)
  - Placeholder text
  - Disabled state
  - v-model support
  - Responsive design
  - Focus and disabled states
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiTextArea
      v-model="message"
      placeholder="Enter your message here..."
      size="md"
    />
    
    <UiTextArea
      v-model="description"
      name="description"
      placeholder="Enter detailed description..."
      size="lg"
    />
    
    <UiTextArea
      v-model="notes"
      placeholder="Notes (read-only)"
      size="sm"
      :disabled="true"
    />
    
    <UiTextArea
      v-model="content"
      placeholder="Enter long content..."
      size="xl"
    />
  </template>
  
  <script setup>
  const message = ref('')
  const description = ref('')
  const notes = ref('Some read-only notes')
  const content = ref('')
  </script>
  
  PROPS:
  - name: string (default: '') - Input textarea name property
  - placeholder: string (default: '') - Placeholder text to show in textarea
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Textarea size
  - disabled: boolean (default: false) - Disable the textarea
  
  EVENTS:
  - update:modelValue: Emitted when textarea value changes
  
  FEATURES:
  - v-model support
  - Responsive sizing
  - Focus and disabled states
  - Customizable placeholder -->


<template>
  <textarea 
    class="ui-input-text-area" 
    :class="sizeClass" 
    :name="name" 
    :placeholder="placeholder" 
    :disabled="disabled" 
    v-model="localData" 
  />
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  name: {
    type: String,
    default: '', // input text area name property
  },
  placeholder: {
    type: String,
    default: '', // place holder to show in input text area
  },
  size: {
    type: String,
    default: 'md', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // pass this variable true if you want the input text area to get disabled
  },
})

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const localData = ref<string>('')

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const sizeClass = computed<string>(() => `ui-input-text-area-${props.size}`)

</script>
<style>

@reference "assets/css/main.css";

.ui-input-text-area {
  @apply border-1 border-gray-tint-650 text-gray-shade-800 placeholder:text-gray-shade-400 rounded-lg ;
}

.ui-input-text-area:focus {
  @apply border-primary;
}

.ui-input-text-area:disabled {
  @apply opacity-50 cursor-not-allowed ;
}

/* ===== size ===== */

.ui-input-text-area-sm {
  @apply py-2 px-2 text-3xs placeholder:text-3xs; 
}

.ui-input-text-area-md {
  @apply py-2 px-2 text-sm placeholder:text-sm; 
  /* line-height: 18px; */
}

.ui-input-text-area-lg {
  @apply py-2 px-2 text-sm placeholder:text-sm; 
  /* line-height: 20px; */
}

.ui-input-text-area-xl {
  @apply py-3 px-3 text-base placeholder:text-base; 
  /* line-height: 17px; */
}

</style>