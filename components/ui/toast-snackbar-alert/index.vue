<!--
  Toast/Snackbar Alert Component Usage Guide:
  
  A customizable toast notification component that supports:
  - Multiple colors (primary, outline, dark, error, success, warning, info)
  - Multiple sizes (sm, md, lg, xl)
  - Auto-dismiss with countdown timer
  - Manual dismiss with cancel icon
  - Optional prefix and cancel icons
  - Custom title and body text
  - Smooth fade transitions
  - Responsive design
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiToastSnackbarAlert
      title="Success!"
      bodyText="Your action was completed successfully."
      color="success"
      :timer="5"
      :auto_dismiss="true"
    />
    
    <UiToastSnackbarAlert
      title="Error"
      bodyText="Something went wrong. Please try again."
      color="error"
      :auto_dismiss="false"
      cancelIcon="CloseCircle"
    />
    
    <UiToastSnackbarAlert
      title="Warning"
      bodyText="Please review your input before proceeding."
      color="warning"
      prefixIcon="Warning2"
      :timer="8"
      size="md"
    />
    
    <UiToastSnackbarAlert
      title="New message received"
      color="info"
      prefixIcon="Message"
      :auto_dismiss="true"
      :timer="3"
    />
    
    <UiToastSnackbarAlert
      title="Welcome!"
      bodyText="Thank you for joining our platform."
      color="primary"
      size="lg"
      prefixIcon="User"
      :timer="10"
    />
    
    <UiToastSnackbarAlert
      title="System Update"
      bodyText="Your system has been updated to the latest version."
      color="dark"
      size="xl"
      :auto_dismiss="false"
      cancelIcon="CloseCircle"
    />
  </template>
  
  <script setup>
  // No additional setup needed for basic usage
  // The component handles all visibility and timing internally
  </script>
  
  PROPS:
  - title: string (default: 'Title') - Toast title text
  - bodyText: string (default: '') - Optional body message text
  - color: 'primary' | 'outline' | 'dark' | 'error' | 'success' | 'warning' | 'info' (default: 'primary') - Toast color theme
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Toast size (also controls icon size)
  - prefixIcon: string (default: '') - Optional icon name for prefix
  - cancelIcon: string (default: '') - Optional icon name for cancel button
  - timer: number (default: 10) - Countdown time in seconds
  - auto_dismiss: boolean (default: true) - Whether to auto-hide after timer
  
  EVENTS:
  - No custom events (handles visibility internally)
  
  FEATURES:
  - Auto-dismiss with countdown timer
  - Manual dismiss with cancel icon
  - Smooth fade transitions
  - Multiple color themes
  - Responsive sizing
  - Icon support
  - Optional body text
  - Icon size automatically matches toast size
-->

<template>
  <!-- Fade transition wrapper for smooth show/hide -->
  <Transition name="fade">
    <!-- Toast container, shown only when 'visible' is true -->
    <div class="ui-toast" v-if="visible">
      <!-- Header section with dynamic background and optional no-message style -->
      <div
        class="ui-toast-header"
        :class="{
          [color_header_class]: true,
          'ui-toast-no-message': !has_body,
        }"
      >
        <!-- Left: icon and title -->
        <div class="ui-toast-header-left">
          <!-- Optional prefix icon (e.g. lightning bolt) -->
        
          <VsxIcon v-if="prefixIcon" :iconName="prefixIcon" :size="iconSizeClass" />

          <!-- Title text -->
          <div :class="textSizeClass">{{ props.title }}</div>
        </div>

        <!-- Right: countdown timer or cancel icon -->
        <div class="ui-toast-header-right">
          <!-- Timer countdown shown if auto_dismiss is active -->
          <span v-if="showTimer">{{ countdown }}s</span>

          <!-- Cancel icon shown if auto_dismiss is false -->
          <button v-if="showCancelIcon" @click="close()">
            <VsxIcon :iconName="cancelIcon" class="cursor-pointer items-center" />
          </button>
        </div>
      </div>

      <!-- Optional body section (message), only shown if has_body is true -->
      <div
        class="ui-toast-body"
        v-if="has_body"
        :class="{ [colorBodyClass]: true }"
      >
        <div :class="textSizeClass">{{ props.bodyText }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  // Title text displayed in header
  title: {
    type: String,
    default: "Title", // Toast title text
  },

  // Optional body message
  bodyText: {
    type: String,
    default: "", // Optional body message text
  },

  color: {
    type: String,
    default: "primary", // Toast color theme
    validator: (value: string) =>
      [
        "primary",
        "outline",
        "dark",
        "error",
        "success",
        "warning",
        "info",
      ].includes(value),
  },

  // Text and icon sizing
  size: {
    type: String,
    default: "sm", // Toast size
    validator: (value: string) =>
     ["sm", "md", "lg", "xl"].includes(value),
  },

  // Optional icon at the beginning (left)
  prefixIcon: {
    type: String,
    default: "", // Optional icon name for prefix
  },

  // Optional cancel icon (shown when auto_dismiss is false)
  cancelIcon: {
    type: String,
    default: "", // Optional icon name for cancel button
  },


  // Countdown time in seconds
  timer: {
    type: Number,
    default: 10, // Countdown time in seconds
  },

  // Automatically hide after timer runs out
  auto_dismiss: {
    type: Boolean,
    default: true, // Whether to auto-hide after timer
  },
})

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const visible = ref<boolean>(true) // Controls toast visibility
const countdown = ref<number>(props.timer) // Timer countdown value

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
// True if a body message exists
const has_body = computed<boolean>(() => props.bodyText.trim().length > 0)

// Show timer if auto_dismiss is true and countdown is active
const showTimer = computed<boolean>(() => {
  return props.auto_dismiss && countdown.value > 0 && !props.cancelIcon
})

// Show cancel icon if not auto dismissing and cancelIcon is defined
const showCancelIcon = computed<string | null>(() => {
  return !props.auto_dismiss && props.cancelIcon ? props.cancelIcon : null
})

// Helper for icon size classes
const iconSizeClass = computed<string>(() => {
  switch (props.size) {
    case "sm":
      return "14px"
    case "md":
      return "16px"
    case "lg":
      return "18px"
    case "xl":
      return "20px"
  }
  return "0px"
})

// Font size class
const textSizeClass = computed<string>(() => {
  switch (props.size) {
    case "2xs":
      return "9px"
    case "xs":
      return "10px"
    case "sm":
      return "11px"
    case "md":
      return "14px"
    default:
      return "sm"
  }
})

const color_header_class = computed<string>(() => {
  return `ui-toast-${props.color}`
})

const colorBodyClass = computed<string>(() => {
  return `ui-toast-body-${props.color}`
})

// ============================================================================
// 6. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================
onMounted(() => {
  if (props.auto_dismiss && countdown.value > 0) {
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        visible.value = false // Hide toast when countdown ends
      }
    }, 1000)
  }
})

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const close = (): void => {
  visible.value = false
}
</script>

<style scoped>
/* === Base Styles === */

@reference "assets/css/main.css";
.ui-toast {
  @apply flex flex-col justify-around  rounded-lg shadow-xs border-gray-tint-400;
}

.ui-toast-header {
  @apply flex flex-row justify-between items-center border-b-1 rounded-t-lg p-2 text-white;
}
.ui-toast-header-left {
  @apply flex gap-1 items-center;
}
.ui-toast-header-right {
  @apply flex items-center;
}
.ui-toast-no-message {
  @apply rounded-md p-2.5;
}

.ui-toast-body {
  @apply text-nowrap p-3;
}

/* === Color Schemes === */
.ui-toast-primary {
  @apply text-white bg-primary border-primary;
}
.ui-toast-body-primary {
  @apply text-gray-shade-800 bg-blue-50 border-gray-tint-400;
}

.ui-toast-outline {
  @apply text-gray-shade-800 bg-white border-gray-tint-400;
}
.ui-toast-body-outline {
  @apply text-gray-shade-800 bg-white border-gray-tint-400;
}

.ui-toast-dark {
  @apply text-white bg-gray-shade-800 border-gray-tint-400;
}
.ui-toast-body-dark {
  @apply text-gray-shade-800 bg-gray-tint-50 border-gray-tint-400;
}

.ui-toast-error {
  @apply text-white bg-error border-gray-tint-400;
}
.ui-toast-body-error {
  @apply text-gray-shade-800 bg-red-50 border-gray-tint-400;
}

.ui-toast-success {
  @apply text-white bg-success border-gray-tint-400;
}
.ui-toast-body-success {
  @apply text-gray-shade-800 bg-green-50 border-gray-tint-400;
}

.ui-toast-warning {
  @apply text-white bg-warning border-gray-tint-400;
}
.ui-toast-body-warning {
  @apply text-gray-shade-800 bg-yellow-50 border-gray-tint-400;
}

.ui-toast-info {
  @apply text-white bg-info border-gray-tint-400;
}
.ui-toast-body-info {
  @apply text-gray-shade-800 bg-purple-50 ;
}
</style>
