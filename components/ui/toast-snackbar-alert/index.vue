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

          <Icon
            v-if="prefix_icon"
            :name="prefix_icon"
            :size="icon_size_class"
          />

          <!-- Title text -->
          <div :class="text_size_class">{{ props.title }}</div>
        </div>

        <!-- Right: countdown timer or cancel icon -->
        <div class="ui-toast-header-right">
          <!-- Timer countdown shown if auto_dismiss is active -->

          <span v-if="showTimer">{{ countdown }}s</span>

          <!-- Cancel icon shown if auto_dismiss is false -->
          <Icon
            v-else-if="showCancelIcon"
            :name="cancel_icon"
            :size="icon_size_class"
            class="cursor-pointer items-center"
            @click="close()"
          />
        </div>
      </div>

      <!-- Optional body section (message), only shown if has_body is true -->
      <div
        class="ui-toast-body"
        v-if="has_body"
        :class="{ [color_body_class]: true }"
      >
        <div :class="text_size_class">{{ props.body_text }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// --- Props Configuration ---
const props = defineProps({
  // Title text displayed in header
  title: {
    type: String,
    default: "Title",
  },

  // Optional body message
  body_text: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "primary",
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
    default: "sm",
    validator: (value: string) =>
     ["sm", "md", "lg", "xl"].includes(value),
  },

  // Optional icon at the beginning (left)
  prefix_icon: {
    type: String,
    default: "",
  },

  // Optional cancel icon (shown when auto_dismiss is false)
  cancel_icon: {
    type: String,
    default: "",
  },

  // Icon sizes
  icon_size: {
    default: "sm",
    validator: (value: string) => 
    ["sm", "md", "lg", "xl"].includes(value),
  },

  // Countdown time in seconds
  timer: {
    type: Number,
    default: 10,
  },

  // Automatically hide after timer runs out
  auto_dismiss: {
    type: Boolean,
    default: true,
  },
});

// --- Reactive State ---
const visible = ref<boolean>(true); // Controls toast visibility
const countdown = ref<number>(props.timer); // Timer countdown value

// --- Computed States ---

// True if a body message exists
const has_body = computed<boolean>(() => props.body_text.trim().length > 0);

// Show timer if auto_dismiss is true and countdown is active
const showTimer = computed<boolean>(() => {
  return props.auto_dismiss && countdown.value > 0 && !props.cancel_icon;
});

// Show cancel icon if not auto dismissing and cancel_icon is defined
const showCancelIcon = computed<string | null>(() => {
  return !props.auto_dismiss && props.cancel_icon ? props.cancel_icon : null;
});

// --- Timer Countdown Logic ---
onMounted(() => {
  if (props.auto_dismiss && countdown.value > 0) {
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        visible.value = false; // Hide toast when countdown ends
      }
    }, 1000);
  }
});

// --- Helper for icon size classes ---
const icon_size_class = computed<string>(() => {
  switch (props.icon_size) {
    case "sm":
      return "14px";
    case "md":
      return "16px";
    case "lg":
      return "18px";
    case "xl":
      return "20px";
  }
  return "0px";
});
// --- Font size class ---
const text_size_class = computed<string>(() => {
  switch (props.size) {
    case "2xs":
      return "9px";
    case "xs":
      return "10px";
    case "sm":
      return "11px";
    case "md":
      return "14px";
    default:
      return "sm";
  }
});
const color_header_class = computed<string>(() => {
  return `ui-toast-${props.color}`;
});

const color_body_class = computed<string>(() => {
  return `ui-toast-body-${props.color}`;
});

const close = (): void => {
  visible.value = false;
};
</script>

<style scoped>
/* === Base Styles === */

@reference "assets/css/main.css";
.ui-toast {
  @apply flex flex-col justify-around border border-tint-400 rounded-lg shadow-xs;
}

.ui-toast-header {
  @apply flex flex-row justify-between items-center border-b-1 rounded-t-lg p-2 text-white;
}
.ui-toast-header-left {
  @apply flex gap-1 items-center;
}
.ui-toast-header-right {
  @apply flex  items-center;
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
  @apply text-shade-800 bg-blue-50 border-tint-400;
}

.ui-toast-outline {
  @apply text-shade-600 bg-white border-tint-400;
}
.ui-toast-body-outline {
  @apply text-shade-800 bg-white border-tint-400;
}

.ui-toast-dark {
  @apply text-white bg-shade-600 border-tint-400;
}
.ui-toast-body-dark {
  @apply text-shade-800 bg-tint-50 border-tint-400;
}

.ui-toast-error {
  @apply text-white bg-error border-tint-400;
}
.ui-toast-body-error {
  @apply text-shade-800 bg-red-50 border-tint-400;
}

.ui-toast-success {
  @apply text-white bg-success border-tint-400;
}
.ui-toast-body-success {
  @apply text-shade-800 bg-green-50 border-tint-400;
}

.ui-toast-warning {
  @apply text-white bg-warning border-tint-400;
}
.ui-toast-body-warning {
  @apply text-shade-800 bg-yellow-50 border-tint-400;
}

.ui-toast-info {
  @apply text-white bg-info border-tint-400;
}
.ui-toast-body-info {
  @apply text-shade-800 bg-purple-50 border-tint-400;
}
</style>
