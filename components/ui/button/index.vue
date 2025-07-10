<template>
  <button
    class="ui-button"
    @click="onTap"
    :disabled="disabled"
    
    :class="{
      [size_class]: true,
      [color_class]: true,
      'ui-button-disabled': disabled,
      'ui-button-loading': loading,
      'ui-button-with-prefix': prefix_icon,
      'ui-button-with-suffix': suffix_icon,
      'ui-button-with-both-icons': prefix_icon && suffix_icon,
    }"
  >
    <UiLoadingSpinner v-if="loading" :size="props.size" class="my-1" />

    <template v-else>
      <Icon
        v-if="prefix_icon"
        :class="`${prefix_icon_class}`"
        :name="prefix_icon"
        :size="props.size"
      />

      <span :class="`${text_size_class}`">
        <slot />
      </span>

      <Icon
        v-if="suffix_icon"
        :class="`${suffix_icon_class}`"
        :name="suffix_icon"
        :size="props.size"
      />
    </template>
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false, // set this to true to disable the button
  },
 
  loading: {
    type: Boolean,
    default: false, // set this to true to show the loading spinner
  },
  size: {
    type: String,
    default: "sm", // set this to the size of the button
    validator: (value: string) => ["xs","sm", "md", "lg", "xl"].includes(value),
  },
  color: {
    type: String,
    default: "primary", // set this to the color of the button
    validator: (value: string) =>
      [
        "primary",
        "outline",
        "secondary",
        "dark",
        "text-bt",
        "error",
        "success",
        "warning",
        "info",
        "low-contrast"
      ].includes(value),
  },
  suffix_icon: {
    type: String,
    default: "", // set this name of the icon to add to the suffix of the button
  },
  prefix_icon: {
    type: String,
    default: "", // set this name of the icon to add to the prefix of the button
  },
});

const emit = defineEmits<{
  (e: "tap"): void;
}>();

const onTap = () => emit("tap");

const color_class = computed<string>(() => {
  switch (props.color) {
    case "primary":
      return "ui-button-primary";
    case "outline":
      return "ui-button-outline";
    case "secondary":
      return "ui-button-secondary";
    case "dark":
      return "ui-button-dark";
    case "text-bt":
      return "ui-button-text-bt";
      case "low-contrast":
      return "ui-button-low-contrast";
    case "error":
      return "ui-button-error";
    case "success":
      return "ui-button-success";
    case "warning":
      return "ui-button-warning";
    case "info":
      return "ui-button-info";
    default:
      return "ui-button-primary";
  }
});

const size_class = computed<string>(() => {
  switch (props.size) {
    case "xl":
      return "ui-button-xl";
    case "lg":
      return "ui-button-lg";
    case "md":
      return "ui-button-md";
    case "sm":
      return "ui-button-sm";
    case "xs":
      return "ui-button-xs";
    default:
      return "ui-button-xl";
  }
});

const text_size_class = computed<string>(() => {
  switch (props.size) {
    case "xl":
      return "ui-button-text-xl";
    case "lg":
      return "ui-button-text-lg";
    case "md":
      return "ui-button-text-md";
    case "sm":
      return "ui-button-text-sm";
       case "xs":
      return "ui-button-text-xs";
    default:
      return "ui-button-text-xl";
  }
});

const prefix_icon_class = computed<string>(() => {
  switch (props.size) {
    case "xl":
      return "ui-button-prefix-icon-xl";
    case "lg":
      return "ui-button-prefix-icon-lg";
    case "md":
      return "ui-button-prefix-icon-md";
    case "sm":
      return "ui-button-prefix-icon-sm";
      case "xs":
      return "ui-button-prefix-icon-xs";
    default:
      return "ui-button-prefix-icon-xl";
  }
});

const suffix_icon_class = computed<string>(() => {
  switch (props.size) {
    case "xl":
      return "ui-button-suffix-icon-xl";
    case "lg":
      return "ui-button-suffix-icon-lg";
    case "md":
      return "ui-button-suffix-icon-md";
    case "sm":
      return "ui-button-suffix-icon-sm";
      case "xs":
      return "ui-button-suffix-icon-xs";
    default:
      return "ui-button-suffix-icon-xl";
  }
});
</script>
<style scoped>
@reference "assets/css/main.css";

.ui-button {
  @apply flex items-center justify-center border-1 rounded-md transition-all cursor-pointer;
}

.ui-button-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* ===== color ===== */

.ui-button-primary {
  @apply text-white bg-primary hover:bg-blue-800 border-primary hover:border-blue-800 focus:bg-blue-999  focus:border-primary;
}

.ui-button-primary:disabled {
  @apply hover:bg-primary hover:border-primary;
}


.ui-button-outline {
  @apply text-primary  bg-transparent border-primary hover:bg-blue-100 focus:bg-blue-200 focus:border-primary;
}


.ui-button-outline:disabled {
  @apply hover:bg-transparent hover:border-primary;
}

.ui-button-secondary {
  @apply text-primary bg-blue-200 hover:bg-blue-300 border-blue-200 hover:border-primary focus:bg-blue-300 focus:border-primary;
}

.ui-button-secondary:disabled {
  @apply hover:bg-blue-200 hover:border-blue-200;
}

.ui-button-dark {
  @apply text-white bg-gray hover:bg-gray-shade-800 border-gray hover:border-gray-shade-800 focus:bg-gray-shade-900 focus:border-gray-shade-900;
}


.ui-button-dark:disabled {
  @apply hover:bg-gray hover:border-gray;
}

.ui-button-low-contrast {
  @apply text-white bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-850 border-cyan-lc-shade-999 hover:border-cyan-lc-shade-850  focus:bg-cyan-lc-shade-600 focus:border-cyan-lc-shade-600;
}
.ui-button-low-contrast:disabled {
  @apply bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-999;
}


.ui-button-text-bt {
  @apply text-gray hover:text-primary  bg-white  hover:bg-blue-200   border-white hover:border-blue-200 focus:text-blue-999  focus:bg-blue-250 focus:border-blue-250;
}

.ui-button-text-bt:disabled {
  @apply text-primary  bg-white;
}

.ui-button-error {
  @apply text-white bg-error hover:bg-red-800 border-error hover:border-red-800 focus:bg-red-900 focus:border-red-900;
}

.ui-button-error:disabled {
  @apply hover:bg-error hover:border-error;
}


.ui-button-success {
  @apply text-white bg-success hover:bg-green-750 border-success hover:border-green-750 focus:bg-green-950 focus:border-green-950;
}

.ui-button-success:disabled {
  @apply hover:bg-success hover:border-success;
}


.ui-button-warning {
  @apply text-white bg-warning hover:bg-orange-600 border-warning hover:border-orange-600 focus:bg-orange-900 focus:border-orange-900;
}

.ui-button-warning:disabled {
  @apply hover:bg-warning hover:border-warning;
}


.ui-button-info {
  @apply text-white bg-info hover:bg-purple-700 border-info hover:border-purple-700 focus:bg-purple-850 focus:border-purple-850;
}

.ui-button-info:disabled {
  @apply hover:bg-info hover:border-info;
}


/* ===== size ===== */

.ui-button-xl {
  @apply py-3.5 px-8;
}

.ui-button-lg {
  @apply py-3 px-6;
}

.ui-button-md {
  @apply py-3 px-4.5;
}

.ui-button-sm {
  @apply py-2 px-3.5;
}
.ui-button-xs {
  @apply py-2 px-2.5;
}

/* ===== text size ===== */

.ui-button-text-xl {
  @apply text-h5;
}

.ui-button-text-lg {
  @apply text-h6;
}

.ui-button-text-md {
  @apply text-base;
}

.ui-button-text-sm {
  @apply text-base;
}
.ui-button-text-xs {
  @apply text-sm;
}

/* ===== loading ===== */

.ui-button-loading {
  @apply cursor-progress;
}

.ui-button-xl.ui-button-loading {
  @apply px-18;
}

.ui-button-lg.ui-button-loading {
  @apply px-14;
}

.ui-button-md.ui-button-loading {
  @apply px-12;
}

.ui-button-sm.ui-button-loading {
  @apply px-10;
}
.ui-button-xs.ui-button-loading {
  @apply px-10;
}

/* ===== icon ===== */

.ui-button-prefix-icon-xl {
  @apply w-6 h-6 me-2;
}

.ui-button-prefix-icon-lg {
  @apply w-5 h-5 me-2;
}

.ui-button-prefix-icon-md {
  @apply w-4 h-4 me-1;
}

.ui-button-prefix-icon-sm {
  @apply w-4 h-4 me-1;
}
.ui-button-prefix-icon-xs {
  @apply w-4 h-4 me-0.5;
}

.ui-button-suffix-icon-xl {
  @apply w-6 h-6 ms-2;
}

.ui-button-suffix-icon-lg {
  @apply w-5 h-5 ms-2;
}

.ui-button-suffix-icon-md {
  @apply w-4 h-4 ms-1;
}

.ui-button-suffix-icon-sm {
  @apply w-4 h-4 ms-1;
}
.ui-button-suffix-icon-xs {
  @apply w-4 h-4 me-0.5;
}
</style>
