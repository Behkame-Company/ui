<template>
  <label class="ui-toggle" :class="disabled_class">
    <input
      type="checkbox"
      class="sr-only"
      :disabled="disabled"
      v-model="model"
    />
    <span class="ui-toggle-input" :class="[input_bg_class , size_input_class]">
      <span class="ui-toggle-butoon" :class="[button_bg_class ,size_button_class]"></span>
    </span>
    <span class="ui-toggle-title" :class="text_size_class">
      {{ label }}
    </span>
  </label>
</template>
<script setup lang="ts">
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

const input_bg_class = computed(() => {
  return model.value
    ? "bg-primary border-primary justify-end"
    : "bg-transparent border border-gray-shade-50 justify-start";
});
const button_bg_class = computed(() => {
  return model.value ? "bg-white" : "bg-gray-shade-50";
});
const disabled_class = computed(() => ({
  'ui-toggle-disabled': props.disabled,
}))
const size_input_class = computed<string>(() => {
  switch (props.size) {
    
    case "lg":
      return "ui-toggle-input-lg";
    case "md":
      return "ui-toggle-input-md";
    case "sm":
      return "ui-toggle-input-sm";
  
    default:
      return "ui-toggle-input-md";
  }
});
const size_button_class = computed<string>(() => {
  switch (props.size) {
    
    case "lg":
      return "ui-toggle-button-lg";
    case "md":
      return "ui-toggle-button-md";
    case "sm":
      return "ui-toggle-button-sm";
  
    default:
      return "ui-toggle-button-md";
  }
});

const text_size_class = computed<string>(() => {
  switch (props.size) {
    
    case "lg":
      return "ui-toggle-title-lg";
    case "md":
      return "ui-toggle-titlet-md";
    case "sm":
      return "ui-toggle-title-sm";
       
    default:
      return "ui-toggle-title-md";
  }
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
