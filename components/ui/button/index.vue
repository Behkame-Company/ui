<!-- 
  Button Component Usage Guide:
  
  A versatile button component that supports:
  - Multiple sizes (xs, sm, md, lg, xl)
  - Multiple colors (primary, outline, secondary, dark, text-bt, error, success, warning, info, low-contrast)
  - Prefix and suffix icons
  - Loading state with spinner
  - Disabled state
  - Custom text alignment
  - Icon types (linear, outline, bold, bulk, broken, twotone)
  
  PARENT COMPONENT USAGE:
  
  <template>
    
    <UiButton @tap="handleClick">
      Click Me
    </UiButton>
    
    <UiButton 
      prefixIcon="Save"
      :loading="isSaving"
      @tap="saveData"
      color="success"
      size="lg"
    >
      Save Changes
    </UiButton>
    
    <UiButton 
      suffixIcon="ArrowRight"
      color="outline"
      size="md"
      @tap="navigateNext"
    >
      Next
    </UiButton>
    
    <UiButton 
      :disabled="true"
      color="error"
      @tap="deleteItem"
    >
      Delete
    </UiButton>
    
    <UiButton 
      prefixIcon="User"
      textAlign="left"
      size="sm"
      color="secondary"
      @tap="viewProfile"
    >
      View Profile
    </UiButton>
  </template>
  
  <script setup>
  const isSaving = ref(false)
  
  const handleClick = () =>; {
    console.log('Button clicked!')
  }
  
  const saveData = async () =>; {
    isSaving.value = true
    // Save logic here
    await new Promise(resolve =>; setTimeout(resolve, 2000))
    isSaving.value = false
  }
  
  const navigateNext = () =>; {
    // Navigation logic
  }
  
  const deleteItem = () =>; {
    // Delete logic
  }
  
  const viewProfile = () =>; {
    // Profile view logic
  }
  -->
  
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
  
  EVENTS:
  - tap: Emitted when button is clicked
  
  FEATURES:
  - Multiple sizes and colors
  - Icon support (prefix and suffix)
  - Loading state with spinner
  - Disabled state
  - Custom text alignment
  - Responsive design -->

<template>
  <button
    class="ui-button"
    @click="onTap"
    :disabled="disabled"
    :class="{
      [sizeClass]: true,
      [colorClass]: true,
      'ui-button-disabled': disabled,
      'ui-button-loading': loading,
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
        :type="prefixIconType"
      />
      <span :class="`${textSizeClass} ui-button-text text-${props.textAlign}`">
        <slot />
      </span>

      <VsxIcon
        v-if="suffixIcon"
        :class="suffixIconClass"
        :iconName="suffixIcon"
        :size="IconSize"
        :type="suffixIconType"
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
    default: "center", // "left", "center", "right"
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  prefixIconType: {
    type: String,
    default: "bold",
    validator: (value: string) => ["linear", "outline", "bold", "bulk", "broken", "twotone"].includes(value),
  },
  suffixIconType: {
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

const colorClass = computed<string>(() => `ui-button-${props.color}`)

const sizeClass = computed<string>(() => `ui-button-${props.size}`)

const textSizeClass = computed<string>(() => `ui-button-text-${props.size}`)

const prefixIconClass = computed<string>(() => `ui-button-prefix-icon-${props.size}`)

const IconSize = computed<number>(() => {
  switch (props.size) {
    case "xl": return 24
    case "lg": return 20
    case "md": return 16
    case "sm": return 14
    case "xs": return 12
    default: return 16
  }
})

const suffixIconClass = computed<string>(() => `ui-button-suffix-icon-${props.size}`)

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const onTap = (): void => emit("tap")
</script>
<style scoped>
@reference "assets/css/main.css";

.ui-button {
  @apply flex items-center justify-center border-1 rounded-md transition-all cursor-pointer text-nowrap ;
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
  @apply text-primary  bg-transparent border-primary hover:bg-blue-100 hover:border-2 hover:border-primary focus:bg-blue-200 focus:border-primary focus:border-2;
}

.ui-button-outline:disabled {
  @apply hover:bg-transparent hover:border-primary;
}

.ui-button-secondary {
  @apply text-primary bg-blue-200 hover:bg-blue-300 border-blue-200 hover:border-blue-300 focus:bg-blue-300 focus:border-primary focus:border-2;
}

.ui-button-secondary:disabled {
  @apply hover:bg-blue-200 hover:border-blue-200;
}

.ui-button-gray {
  @apply text-white bg-gray hover:bg-gray-shade-800 border-gray hover:border-gray-shade-800 focus:bg-gray-shade-900 focus:border-gray-shade-900;
}

.ui-button-gray:disabled {
  @apply hover:bg-gray hover:border-gray;
}

.ui-button-dark {
  @apply text-white bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-850 border-cyan-lc-shade-999 hover:border-cyan-lc-shade-850  focus:bg-cyan-lc-shade-700 focus:border-cyan-lc-shade-700;
}
.ui-button-dark:disabled {
  @apply bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-999;
}

.ui-button-text-bt {
  @apply text-gray hover:text-primary  bg-transparent  hover:bg-blue-200   border-none hover:border-blue-200 focus:text-blue-999  focus:bg-blue-250 focus:border-blue-250;
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
  @apply text-h6 font-medium;
}

.ui-button-text-lg {
  @apply text-base font-medium;
}

.ui-button-text-md {
  @apply text-sm font-medium;
}

.ui-button-text-sm {
  @apply text-xs font-medium;
}
.ui-button-text-xs {
  @apply text-2xs font-medium;
}

/* ===== loading ===== */

.ui-button-loading {
  @apply cursor-progress;
}

.ui-button-xl.ui-button-loading {
  @apply px-18 py-3.5;
}

.ui-button-lg.ui-button-loading {
  @apply px-14 py-3;
}

.ui-button-md.ui-button-loading {
  @apply px-12 py-3;
}

.ui-button-sm.ui-button-loading {
  @apply px-10 py-2;
}
.ui-button-xs.ui-button-loading {
  @apply px-10;
}

/* ===== icon ===== */

.ui-button-prefix-icon-xl ,.ui-button-prefix-icon-lg {
  @apply  me-2;
}

.ui-button-prefix-icon-md ,.ui-button-prefix-icon-sm {
  @apply  me-1;
}

.ui-button-prefix-icon-xs {
  @apply  me-0.5;
}

.ui-button-suffix-icon-xl ,.ui-button-suffix-icon-lg {
  @apply ms-2;
}

.ui-button-suffix-icon-md,.ui-button-suffix-icon-sm  {
  @apply ms-1;
}

.ui-button-suffix-icon-xs {
  @apply me-0.5;
}

.ui-button-text {
  @apply w-full;
}
</style>
