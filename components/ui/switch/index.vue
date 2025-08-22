<!--
  Toggle Component Usage Guide:
  
  PARENT COMPONENT USAGE:
    
    <UiToggle
      v-model="autoSave"
      label="Auto Save"
      size="lg"
      :disabled="true"
    />
  PROPS:
  - label: string (default: "Title")
  - size: 'sm' | 'md' | 'lg' (default: "md")
  - disabled: boolean (default: false)

-->

<template>
  <label class="ui-toggle" :class="classes.disabled">
    <input
      type="checkbox"
      class="sr-only"
      :disabled="disabled"
      v-model="model"
    />
    <span class="ui-toggle__input" :class="[classes.inputBg, classes.sizeInput]">
      <span class="ui-toggle__butoon" :class="[classes.buttonBg, classes.sizeButton]"></span>
    </span>
    <span class="ui-toggle__title" :class="classes.textSize">
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
      default: " " 
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
  disabled: { 'ui-toggle__disabled': boolean }
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
    disabled: { 'ui-toggle__disabled': props.disabled },
    sizeInput: `ui-toggle__input__${size}`,
    sizeButton: `ui-toggle__button__${size}`,
    textSize: size === "lg" ? "text-base" : size === "sm" ? "text-xs" : "text-sm"
  };
});


</script>
<style >
@reference "~/assets/css/main.css";

.ui-toggle {
  @apply inline-flex items-center cursor-pointer  gap-2;
}
.ui-toggle__input {
  @apply inline-flex items-center w-8 h-4.5 p-0.5 rounded-5xl transition-colors duration-300 ease-in-out;
}
.ui-toggle__butoon {
  @apply w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out;
}
.ui-toggle__title {
  @apply text-gray text-nowrap;
}
.ui-toggle__input__lg{
    @apply  w-8 h-4.5 rounded-5xl
}
.ui-toggle__input__md{
    @apply  w-7.25 h-4 rounded-5xl
}
.ui-toggle__input__sm{
    @apply  w-6.5 h-3.5 rounded-5xl
}
.ui-toggle__button__lg{
    @apply w-3.5 h-3.5
}
.ui-toggle__button__md{
    @apply w-3 h-3
}
.ui-toggle__button__sm{
    @apply w-2.5 h-2.5
}
.ui-toggle__title__lg{
    @apply  text-base font-medium
}
.ui-toggle__title__md{
    @apply  text-xs font-medium
}
.ui-toggle__title__sm{
    @apply  text-2xs font-medium
}
.ui-toggle__disabled{
  @apply opacity-50 cursor-not-allowed
}
</style>
