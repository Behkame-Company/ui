<template>
  <label class="ui-radio" :class="disabledClass ">
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
// Use 'any' so the radio can be used in a group (v-model will be the selected value)
const model = defineModel<any>({ required: true });

const props = defineProps({
  // The value this radio represents
  value: [String, Number, Boolean],
  label: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // set this to true to disable the button
  },
});

const disabledClass = computed(() => ({
  "ui-radio-disabled": props.disabled,
}));

const sizeClass = computed(() => {
  switch (props.size) {
    case "lg":
      return "ui-radio-lg";
    case "md":
      return "ui-radio-md";
    case "sm":
      return "ui-radio-sm";
    default:
      return "ui-radio-md";
  }
});

const textSizeClass = computed(() => {
  switch (props.size) {
    case "lg":
      return "ui-radio-label-lg";
    case "md":
      return "ui-radio-label-md";
    case "sm":
      return "ui-radio-label-sm";
    default:
      return "ui-radio-label-md";
  }
});
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
