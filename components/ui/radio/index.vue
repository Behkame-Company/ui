<!--
  Radio Component Usage Guide:
  
  A customizable radio button component that supports:
  - Multiple sizes (sm, md, lg)
  - Disabled state
  - Custom label text
  - Two-way data binding with v-model
  - Radio group functionality
  - Visual feedback states
  - Responsive design
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic radio button --&gt;
    &lt;UiRadio
      v-model="selectedOption"
      value="option1"
      label="Option 1"
    /&gt;
    
    &lt;!-- Radio button with custom size --&gt;
    &lt;UiRadio
      v-model="selectedOption"
      value="option2"
      label="Option 2"
      size="lg"
    /&gt;
    
    &lt;!-- Disabled radio button --&gt;
    &lt;UiRadio
      v-model="selectedOption"
      value="option3"
      label="Disabled option"
      :disabled="true"
    /&gt;
    
    &lt;!-- Small radio button --&gt;
    &lt;UiRadio
      v-model="selectedOption"
      value="option4"
      label="Small option"
      size="sm"
    /&gt;
    
    &lt;!-- Radio group example --&gt;
    &lt;div class="space-y-2"&gt;
      &lt;h3&gt;Select your preference:&lt;/h3&gt;
      &lt;UiRadio
        v-model="preference"
        value="light"
        label="Light theme"
        size="md"
      /&gt;
      &lt;UiRadio
        v-model="preference"
        value="dark"
        label="Dark theme"
        size="md"
      /&gt;
      &lt;UiRadio
        v-model="preference"
        value="auto"
        label="Auto (system default)"
        size="md"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Radio with different value types --&gt;
    &lt;UiRadio
      v-model="numberValue"
      :value="1"
      label="Number value 1"
    /&gt;
    &lt;UiRadio
      v-model="booleanValue"
      :value="true"
      label="Boolean true"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const selectedOption = ref('option1')
  const preference = ref('light')
  const numberValue = ref(1)
  const booleanValue = ref(true)
  
  // Watch for changes
  watch(selectedOption, (newValue) =&gt; {
    console.log('Selected option:', newValue)
  })
  
  watch(preference, (newValue) =&gt; {
    console.log('Theme preference:', newValue)
    // Apply theme logic here
  })
  &lt;/script&gt;
  
  PROPS:
  - value: string | number | boolean (required) - The value this radio represents
  - label: string (required) - Radio button label text
  - size: 'sm' | 'md' | 'lg' (default: 'md') - Radio button size
  - disabled: boolean (default: false) - Whether radio is disabled
  
  EVENTS:
  - No custom events (uses v-model internally)
  
  FEATURES:
  - Two-way data binding with v-model
  - Radio group functionality
  - Multiple sizes
  - Disabled state
  - Visual feedback
  - Responsive design
-->

<template>
  <label class="ui-radio" :class="disabledClass">
    <input
      type="radio"
      :value="value"
      class="peer hidden"
      v-model="model"
      :disabled="disabled"
    />
    <div class="ui-radio-input" :class="[sizeClass]"></div>
    <span :class="textSizeClass">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
//======================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  // The value this radio represents
  value: [String, Number, Boolean], // Radio value
  label: {
    type: String,
    required: true, // Radio button label text
  },

  size: {
    type: String,
    default: "md", // Radio button size
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // Whether radio is disabled
  },
})

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
// Use 'any' so the radio can be used in a group (v-model will be the selected value)
const model = defineModel<any>({ required: true })

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const disabledClass = computed<{ 'ui-radio-disabled': boolean }>(() => ({
  "ui-radio-disabled": props.disabled,
}))

const sizeClass = computed<string>(() => `ui-radio-${props.size}`)

const textSizeClass = computed<string>(() => `ui-radio-label-${props.size}`)

</script>
<style scoped>
@reference "assets/css/main.css";

.ui-radio {
  @apply flex items-center gap-2 cursor-pointer ;
}
.ui-radio-input {
  @apply rounded-full bg-transparent border border-gray-shade-50 peer-checked:bg-transparent peer-checked:border-primary peer-checked:border-4 p-0.5  peer-checked:p-0.5 ;
}
.ui-radio-disabled {
  @apply opacity-50 cursor-not-allowed;
}
.ui-radio-sm {
  @apply w-5 h-5 ;
}
.ui-radio-md {
  @apply w-5.5 h-5.5 ;
}
.ui-radio-lg {
  @apply w-6 h-6 ;
}
.ui-radio-label-sm {
  @apply text-2xs font-medium;
}
.ui-radio-label-md {
  @apply text-xs font-medium;
}
.ui-radio-label-lg {
  @apply text-base font-medium;
} 

</style>
