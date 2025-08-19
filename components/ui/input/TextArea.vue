<!-- 
  TextArea Component Usage Guide:
  
  PARENT COMPONENT USAGE:
  
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

  PROPS:
  - name: string (default: '') - Input textarea name property
  - placeholder: string (default: '') - Placeholder text to show in textarea
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Textarea size
  - disabled: boolean (default: false) - Disable the textarea

-->

<template>
  <textarea 
    class="ui-text-area" 
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
const sizeClass = computed<string>(() => `ui-text-area__${props.size}`)

</script>
<style>

@reference "~/assets/css/main.css";

.ui-text-area {
  @apply border-1 border-gray-tint-650 text-gray-shade-800 placeholder:text-gray-shade-400 rounded-lg ;
}

.ui-text-area:focus {
  @apply border-primary;
}

.ui-text-area:disabled {
  @apply opacity-50 cursor-not-allowed ;
}

/* ===== size ===== */

.ui-text-area__sm {
  @apply py-2 px-2 text-3xs placeholder:text-3xs; 
}

.ui-text-area__md {
  @apply py-2 px-2 text-sm placeholder:text-sm; 
  /* line-height: 18px; */
}

.ui-text-area__lg {
  @apply py-2 px-2 text-sm placeholder:text-sm; 
  /* line-height: 20px; */
}

.ui-text-area__xl {
  @apply py-3 px-3 text-base placeholder:text-base; 
  /* line-height: 17px; */
}

</style>