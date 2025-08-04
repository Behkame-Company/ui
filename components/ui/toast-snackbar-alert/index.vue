<!--
  Toast/Snackbar Alert Component Usage Guide:
  
  PARENT COMPONENT USAGE:
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
 
  
  PROPS:
  - title: string (default: 'Title') - Toast title text
  - bodyText: string (default: '') - Optional body message text
  - color: 'primary' | 'outline' | 'dark' | 'error' | 'success' | 'warning' | 'info' (default: 'primary') - Toast color theme
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Toast size (also controls icon size)
  - prefixIcon: string (default: '') - Optional icon name for prefix
  - cancelIcon: string (default: '') - Optional icon name for cancel button
  - timer: number (default: 10) - Countdown time in seconds
  - auto_dismiss: boolean (default: true) - Whether to auto-hide after timer
-->

<template>
  <!-- Fade transition wrapper for smooth show/hide -->
  <Transition name="fade">
    <!-- Toast container, shown only when 'visible' is true -->
    <div class="ui-toast" v-if="visible">
      <!-- Header section with dynamic background and optional no-message style -->
      <div
        class="ui-toast__header"
        :class="{
          [color_header_class]: true,
          'ui-toast__no-message': !has_body,
        }"
      >
        <!-- Left: icon and title -->
        <div class="ui-toast__header__left">
          <!-- Optional prefix icon (e.g. lightning bolt) -->
        
          <VsxIcon v-if="prefixIcon" :iconName="prefixIcon" :size="iconSizeClass" />

          <!-- Title text -->
          <div :class="textSizeClass">{{ props.title }}</div>
        </div>

        <!-- Right: countdown timer or cancel icon -->
        <div class="ui-toast__header__right">
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
        class="ui-toast__body"
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
  return `ui-toast__${props.color}`
})

const colorBodyClass = computed<string>(() => {
  return `ui-toast__body__${props.color}`
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

.ui-toast__header {
  @apply flex flex-row justify-between items-center border-b-1 rounded-t-lg p-2 text-white;
}
.ui-toast__header__left {
  @apply flex gap-1 items-center;
}
.ui-toast__header__right {
  @apply flex items-center;
}
.ui-toast__no-message {
  @apply rounded-md p-2.5;
}

.ui-toast__body {
  @apply text-nowrap p-3;
}

/* === Color Schemes === */
.ui-toast__primary {
  @apply text-white bg-primary border-primary;
}
.ui-toast__body__primary {
  @apply text-gray-shade-800 bg-blue-50 border-gray-tint-400;
}

.ui-toast__outline {
  @apply text-gray-shade-800 bg-white border-gray-tint-400;
}
.ui-toast__body__outline {
  @apply text-gray-shade-800 bg-white border-gray-tint-400;
}

.ui-toast__dark {
  @apply text-white bg-gray-shade-800 border-gray-tint-400;
}
.ui-toast__body__dark {
  @apply text-gray-shade-800 bg-gray-tint-50 border-gray-tint-400;
}

.ui-toast__error {
  @apply text-white bg-error border-gray-tint-400;
}
.ui-toast__body__error {
  @apply text-gray-shade-800 bg-red-50 border-gray-tint-400;
}

.ui-toast__success {
  @apply text-white bg-success border-gray-tint-400;
}
.ui-toast__body__success {
  @apply text-gray-shade-800 bg-green-50 border-gray-tint-400;
}

.ui-toast__warning {
  @apply text-white bg-warning border-gray-tint-400;
}
.ui-toast__body__warning {
  @apply text-gray-shade-800 bg-yellow-50 border-gray-tint-400;
}

.ui-toast__info {
  @apply text-white bg-info border-gray-tint-400;
}
.ui-toast__body__info {
  @apply text-gray-shade-800 bg-purple-50 ;
}
</style>
