<!--
  Radio Component Usage Guide:
  
  PARENT COMPONENT USAGE:
  
    
    <UiRadio
      v-model="selectedOption"
      value="option2"
      label="Option 2"
      size="lg"
    />
    
    <UiRadio
      v-model="selectedOption"
      value="option3"
      label="Disabled option"
      :disabled="true"
    />
  
  PROPS:
  - value: string | number | boolean (required) - The value this radio represents
  - label: string (required) - Radio button label text
  - size: 'sm' | 'md' | 'lg' (default: 'md') - Radio button size
  - disabled: boolean (default: false) - Whether radio is disabled
  
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
    <div class="ui-radio__input" :class="[sizeClass]"></div>
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
const disabledClass = computed<{ 'ui-radio__disabled': boolean }>(() => ({
  "ui-radio__disabled": props.disabled,
}))

const sizeClass = computed<string>(() => `ui-radio__${props.size}`)

const textSizeClass = computed<string>(() => `ui-radio_-label__${props.size}`)

</script>
<style scoped>
@reference "~/assets/css/main.css";

.ui-radio {
  @apply flex items-center gap-2 cursor-pointer ;
}
.ui-radio__input {
  @apply rounded-full bg-transparent border border-gray-shade-50 peer-checked:bg-transparent peer-checked:border-primary peer-checked:border-4 p-0.5  peer-checked:p-0.5 ;
}
.ui-radio__disabled {
  @apply opacity-50 cursor-not-allowed;
}
.ui-radio__sm {
  @apply w-5 h-5 ;
}
.ui-radio__md {
  @apply w-5.5 h-5.5 ;
}
.ui-radio__lg {
  @apply w-6 h-6 ;
}
.ui-radio__label__sm {
  @apply text-2xs font-medium;
}
.ui-radio__label__md {
  @apply text-xs font-medium;
}
.ui-radio__label__lg {
  @apply text-base font-medium;
} 

</style>
