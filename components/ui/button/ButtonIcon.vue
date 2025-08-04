<!--
  ButtonIcon Component Usage Guide:
  
  PARENT COMPONENT USAGE:
    
    <UiButtonIcon
      icon="Moon"
      color="dark"
      size="xl"
      @tap="toggleTheme"
    />

  
  PROPS:
  - disabled: boolean (default: false) - Whether button is disabled
  - size: 'md' | 'lg' | 'xl' (default: 'sm') - Button size
  - color: 'primary' | 'outline' | 'secondary' | 'dark' | 'text-bt' | 'error' | 'success' | 'warning' | 'info' | 'low-contrast' (default: 'primary') - Button color
  - icon: string (default: '') - Icon name to display
  - iconType: 'linear' | 'outline' | 'bold' | 'bulk' | 'broken' | 'twotone' (default: 'bold') - Icon style type

-->

<template>
  <button
    class="ui-button"
    @click="onTap"
    :disabled="disabled"
    :class="{
      [sizeClass]: true,
      [colorClass]: true,
      'ui-button-disabled': disabled,
    }"
  >
    <VsxIcon v-if="icon" :iconName="icon" :size="iconSize" :type="iconType" />
  </button>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
// No external imports needed for this component

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false, // Whether button is disabled
  },
  size: {
    type: String,
    default: "sm", // Button size
    validator: (value: string) => ["md", "lg", "xl"].includes(value),
  },
  color: {
    type: String,
    default: "primary", // Button color
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
        "low-contrast",
      ].includes(value),
  },
  icon: {
    type: String,
    default: "", // Icon name to display
  },
  iconType: {
    type: String,
    default: "bold", // Icon style type
    validator: (value: string) =>
      ["linear", "outline", "bold", "bulk", "broken", "twotone"].includes(
        value
      ),
  },
});

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "tap"): void;
}>();


// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const colorClass = computed<string>(() => `ui-button__${props.color}`)


const sizeClass = computed<string>(() => `ui-button__${props.size}`)


const iconSize = computed<number>(() => {
  switch (props.size) {
    case "xl":
      return 24;
    case "lg":
      return 20;
    case "md":
      return 16;
    default:
      return 16;
  }
});

const onTap = (): void => emit("tap");
</script>
<style scoped>
@reference "assets/css/main.css";

.ui-button {
  @apply flex items-center justify-center border-1 rounded-md transition-all cursor-pointer text-nowrap;
}

.ui-button-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* ===== color ===== */

.ui-button__primary {
  @apply text-white bg-primary hover:bg-blue-800 border-primary hover:border-blue-800 focus:bg-blue-999  focus:border-primary;
}

.ui-button__primary:disabled {
  @apply hover:bg-primary hover:border-primary;
}

.ui-button__outline {
  @apply text-primary  bg-transparent border-primary hover:bg-blue-100 hover:border-2 hover:border-primary focus:bg-blue-200 focus:border-primary focus:border-2;
}

.ui-button__outline:disabled {
  @apply hover:bg-transparent hover:border-primary;
}

.ui-button__secondary {
  @apply text-primary bg-blue-200 hover:bg-blue-300 border-blue-200 hover:border-blue-300 focus:bg-blue-300 focus:border-primary focus:border-2;
}

.ui-button__secondary:disabled {
  @apply hover:bg-blue-200 hover:border-blue-200;
}

.ui-button__gray {
  @apply text-white bg-gray hover:bg-gray-shade-800 border-gray hover:border-gray-shade-800 focus:bg-gray-shade-900 focus:border-gray-shade-900;
}

.ui-button__gray:disabled {
  @apply hover:bg-gray hover:border-gray;
}

.ui-button__dark {
  @apply text-white bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-850 border-cyan-lc-shade-999 hover:border-cyan-lc-shade-850  focus:bg-cyan-lc-shade-700 focus:border-cyan-lc-shade-700;
}
.ui-button__dark:disabled {
  @apply bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-999;
}

.ui-button__text-bt {
  @apply text-gray hover:text-primary  bg-transparent  hover:bg-blue-200   border-none hover:border-blue-200 focus:text-blue-999  focus:bg-blue-250 focus:border-blue-250;
}

.ui-button__text-bt:disabled {
  @apply text-primary  bg-white;
}

.ui-button__error {
  @apply text-white bg-error hover:bg-red-800 border-error hover:border-red-800 focus:bg-red-900 focus:border-red-900;
}

.ui-button__error:disabled {
  @apply hover:bg-error hover:border-error;
}

.ui-button__success {
  @apply text-white bg-success hover:bg-green-750 border-success hover:border-green-750 focus:bg-green-950 focus:border-green-950;
}

.ui-button__success:disabled {
  @apply hover:bg-success hover:border-success;
}

.ui-button__warning {
  @apply text-white bg-warning hover:bg-orange-600 border-warning hover:border-orange-600 focus:bg-orange-900 focus:border-orange-900;
}

.ui-button__warning:disabled {
  @apply hover:bg-warning hover:border-warning;
}

.ui-button__info {
  @apply text-white bg-info hover:bg-purple-700 border-info hover:border-purple-700 focus:bg-purple-850 focus:border-purple-850;
}

.ui-button__info:disabled {
  @apply hover:bg-info hover:border-info;
}

/* ===== size ===== */

.ui-button__xl {
  @apply p-3;
}

.ui-button__lg {
  @apply p-2.5;
}

.ui-button__md {
  @apply p-1;
}

.ui-button-text {
  @apply w-full;
}
</style>
