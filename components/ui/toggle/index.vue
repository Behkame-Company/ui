<!--
  Toggle Component Usage Guide:
  
  A customizable toggle/switch component that supports:
  - Different sizes (sm, md, lg)
  - Disabled state
  - Custom labels
  - Smooth animations and transitions
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiToggle v-model="isEnabled" />
    
    <UiToggle
      v-model="notifications"
      label="Enable Notifications"
      size="md"
    />
    
    <UiToggle
      v-model="autoSave"
      label="Auto Save"
      size="lg"
      :disabled="true"
    />
  </template>
  
  <script setup>
  const isEnabled = ref(false)
  const notifications = ref(true)
  const autoSave = ref(false)
  </script>
  
  PROPS:
  - label: string (default: "Title")
  - size: 'sm' | 'md' | 'lg' (default: "md")
  - disabled: boolean (default: false)
  
  EVENTS:
  - update:modelValue: Emitted when toggle state changes (boolean)
-->

<template>
  <label class="ui-toggle" :class="classes.disabled">
    <input
      type="checkbox"
      class="sr-only"
      :disabled="disabled"
      v-model="model"
    />
    <span class="ui-toggle-input" :class="[classes.inputBg, classes.sizeInput]">
      <span class="ui-toggle-butoon" :class="[classes.buttonBg, classes.sizeButton]"></span>
    </span>
    <span class="ui-toggle-title" :class="classes.textSize">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
// No external imports needed for this component
const model = defineModel<boolean>({ required: true });
const props = defineProps({
  label: {
     type: String,
      default: "Title" 
    },

    size: {
    type: String,
    default: "dm",
    validator: (value: string) =>
      [ "sm", "md", "lg"].includes(value),
  },
   disabled: {
    type: Boolean,
    default: false, // set this to true to disable the button
  },
  
});

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Computed classes object for all size-based styling */
const classes = computed<{
  inputBg: string
  buttonBg: string
  disabled: { 'ui-toggle-disabled': boolean }
  sizeInput: string
  sizeButton: string
  textSize: string
}>(() => {
  const size = props.size;
  
  return {
    inputBg: model.value
      ? "bg-primary border-primary justify-end"
      : "bg-transparent border border-gray-shade-50 justify-start",
    buttonBg: model.value ? "bg-white" : "bg-gray-shade-50",
    disabled: { 'ui-toggle-disabled': props.disabled },
    sizeInput: `ui-toggle-input-${size}`,
    sizeButton: `ui-toggle-button-${size}`,
    textSize: size === "lg" ? "text-base" : size === "sm" ? "text-xs" : "text-sm"
  };
});


</script>
<style scoped>
@reference "assets/css/main.css";

.ui-toggle {
  @apply inline-flex items-center cursor-pointer  gap-2;
}
.ui-toggle-input {
  @apply inline-flex items-center w-8 h-4.5 p-0.5 rounded-5xl transition-colors duration-300 ease-in-out;
}
.ui-toggle-butoon {
  @apply w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out;
}
.ui-toggle-title {
  @apply text-gray text-nowrap;
}
.ui-toggle-input-lg{
    @apply  w-8 h-4.5 rounded-5xl
}
.ui-toggle-input-md{
    @apply  w-7.25 h-4 rounded-5xl
}
.ui-toggle-input-sm{
    @apply  w-6.5 h-3.5 rounded-5xl
}
.ui-toggle-button-lg{
    @apply w-3.5 h-3.5
}
.ui-toggle-button-md{
    @apply w-3 h-3
}
.ui-toggle-button-sm{
    @apply w-2.5 h-2.5
}
.ui-toggle-title-lg{
    @apply  text-base font-medium
}
.ui-toggle-title-md{
    @apply  text-xs font-medium
}
.ui-toggle-title-sm{
    @apply  text-2xs font-medium
}
.ui-toggle-disabled{
  @apply opacity-50 cursor-not-allowed
}
</style>
