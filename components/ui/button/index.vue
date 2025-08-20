<!-- 
  Button Component Usage Guide:
  
  PARENT COMPONENT USAGE:
    
    <UiButton 
      prefixIcon="User"
      textAlign="left"
      size="sm"
      color="secondary"
      @tap="viewProfile"
    >
      View Profile
    </UiButton>
 
  <!-- PROPS:
  - disabled: boolean (default: false) - Disable the button
  - loading: boolean (default: false) - Show loading spinner
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Button size
  - color: 'primary' | 'outline' | 'secondary' | 'dark' | 'text-bt' | 'error' | 'success' | 'warning' | 'info' | 'low-contrast' (default: 'primary') - Button color
  - suffixIcon: string (default: '') - Icon name for suffix
  - prefixIcon: string (default: '') - Icon name for prefix
  - textAlign: 'left' | 'center' | 'right' (default: 'center') - Text alignment
  - prefixIconType: 'linear' | 'outline' | 'bold' | 'bulk' | 'broken' | 'twotone' (default: 'bold') - Prefix icon type
  - suffixIconType: 'linear' | 'outline' | 'bold' | 'bulk' | 'broken' | 'twotone' (default: 'bold') - Suffix icon type
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
      'ui-button__loading': loading,
      'ui-button-with-prefix': prefixIcon,
      'ui-button-with-suffix': suffixIcon,
      'ui-button-with-both-icons': prefixIcon && suffixIcon,
    }"
  >
    <UiLoadingSpinner v-if="loading" :size="props.size" />

    <template v-else>
      <VsxIcon
        v-if="prefixIcon"
        :class="prefixIconClass"
        :iconName="prefixIcon"
        :size="IconSize"
        :type="iconType"
      />
      <span :class="`${textSizeClass} ui-button-text text-${props.textAlign}`">
        <slot />
      </span>

      <VsxIcon
        v-if="suffixIcon"
        :class="suffixIconClass"
        :iconName="suffixIcon"
        :size="IconSize"
        :type="iconType"
      />
    </template>
  </button>
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
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
    validator: (value: string) => ["xs", "sm", "md", "lg", "xl"].includes(value),
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
        "low-contrast",
        "white"
      ].includes(value),
  },
  suffixIcon: {
    type: String,
    default: "", // set this name of the icon to add to the suffix of the button
  },
  prefixIcon: {
    type: String,
    default: "", // set this name of the icon to add to the prefix of the button
  },
  textAlign: {
    type: String,
    default: "", // "left", "center", "right"
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  iconType: {
    type: String,
    default: "bold",
    validator: (value: string) => ["linear", "outline", "bold", "bulk", "broken", "twotone"].includes(value),
  },
 
})

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "tap"): void
}>()

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================

const colorClass = computed<string>(() => `ui-button__${props.color}`)

const sizeClass = computed<string>(() => `ui-button__${props.size}`)

const textSizeClass = computed<string>(() => `ui-button-text__${props.size}`)

const prefixIconClass = computed<string>(() => `ui-button-prefix-icon__${props.size}`)

const IconSize = computed<number>(() => {
  switch (props.size) {
    case "xl": return 24
    case "lg": return 20
    case "md": return 18
    case "sm": return 16
    case "xs": return 14
    default: return 16
  }
})

const suffixIconClass = computed<string>(() => `ui-button-suffix-icon__${props.size}`)

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const onTap = (): void => emit("tap")
</script>
<style scoped>
@reference "~/assets/css/main.css";

.ui-button {
  @apply flex items-center justify-center border-1 rounded-md transition-all cursor-pointer text-nowrap ;
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
.ui-button__white {
  @apply text-white bg-transparent hover:bg-white/10 border-transparent hover:border-white/10 focus:bg-white/10  focus:border-white/10;
}

.ui-button__info:disabled {
  @apply hover:bg-info hover:border-info;
}

/* ===== size ===== */

.ui-button__xl {
  @apply py-3.5 px-8;
}

.ui-button__lg {
  @apply py-3 px-6;
}

.ui-button__md {
  @apply py-3 px-4.5;
}

.ui-button__sm {
  @apply py-2 px-3.5;
}
.ui-button__xs {
  @apply py-2 px-2.5;
}

/* ===== text size ===== */

.ui-button-text__xl {
  @apply text-h5 font-medium;
}

.ui-button-text__lg {
  @apply text-base font-medium;
}

.ui-button-text__md {
  @apply text-sm font-medium;
}

.ui-button-text__sm {
  @apply text-2xs font-medium;
}
.ui-button-text__xs {
  @apply text-3xs font-medium;
}

/* ===== loading ===== */

.ui-button__loading {
  @apply cursor-progress;
}

.ui-button__xl.ui-button__loading {
  @apply px-18 py-3.5;
}

.ui-button__lg.ui-button__loading {
  @apply px-14 py-3;
}

.ui-button__md.ui-button__loading {
  @apply px-12 py-3;
}

.ui-button__sm.ui-button__loading {
  @apply px-10 py-2;
}
.ui-button__xs.ui-button__loading {
  @apply px-10;
}

/* ===== icon ===== */

.ui-button-prefix-icon__xl ,.ui-button-prefix-icon__lg {
  @apply  me-2;
}

.ui-button-prefix-icon__md ,.ui-button-prefix-icon__sm {
  @apply  me-1;
}

.ui-button-prefix-icon__xs {
  @apply  me-0.5;
}

.ui-button-suffix-icon__xl ,.ui-button-suffix-icon__lg {
  @apply ms-2;
}

.ui-button-suffix-icon__md,.ui-button-suffix-icon__sm  {
  @apply ms-1;
}

.ui-button-suffix-icon__xs {
  @apply me-0.5;
}

.ui-button-text {
  @apply w-full;
}
</style>
