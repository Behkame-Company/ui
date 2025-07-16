<template>
  <!-- Only render the tag if it's visible -->
  <div v-if="visible" class="ui-tag" :class="[type_class, spacing_class]">
    <!-- Optional prefix icon -->
    <Icon v-if="prefixIcon" :name="prefixIcon" class="ui-tag-icon" />

    <!-- Optional tag text -->
    <span v-if="text" class="ui-tag-text">{{ text }}</span>

    <!-- Optional close button -->
    <button v-if="closeable" @click="handleClose" class="ui-tag-close">
      <Icon name="mdi:close" class="ui-tag-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
// ------------------------------
//  Define Props with Defaults
// ------------------------------
const props = defineProps({
  // The text content displayed in the tag
  text: {
    type: String,
    default: "",
  },
  // The visual type/style of the tag; validates allowed values
  type: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      [
        "primary",
        "info",
        "success",
        "warning",
        "error",
        "gray",
        "blue",
        "light-blue",
        "dark-gray",
        "light-red",
        "light-green",
        "light-orange",
        "light-purple",
        "white",
        "black",
      ].includes(value),
  },
  // Optional icon displayed before the text
  prefixIcon: {
    type: String,
    default: "",
  },
  // Determines if the tag should be closeable (show close icon)
  closeable: {
    type: Boolean,
    default: false,
  },
});

// ------------------------------
//  Emit Definition
// ------------------------------
const emit = defineEmits<{
  (e: "close"): void;
}>();

// ------------------------------
//  Internal State
// ------------------------------
// Used to conditionally show/hide the tag (after closing)
const visible = ref<boolean>(true);



// ------------------------------
// Dynamic Spacing Class Logic
// ------------------------------
// Determine padding and gap styles based on tag content
const spacing_class = computed<string>(() => {
  if (props.prefixIcon && !props.closeable) return "py-1.5 pl-4 pr-7 gap-x-1";
  if (!props.prefixIcon && props.closeable && !props.text) return "py-1 px-4";
  if (!props.prefixIcon && props.closeable && props.text) return "py-1 pl-3 pr-2 gap-x-1";
  if (props.prefixIcon && props.closeable && props.text) return "py-1 pr-6 pl-2 gap-x-1";
  return "py-1 px-3";
});

// ------------------------------
// Type-based Class
// ------------------------------
// Builds class like "ui-tag-color-primary" based on the `type` prop
const type_class = computed<string>(() => `ui-tag-color-${props.type}`);

// ------------------------------
// Close Button Handler
// ------------------------------
// Hides the tag and emits a close event when the close button is clicked
function handleClose(): void {
  visible.value = false;
  emit("close");
}
</script>

<style scoped>
@reference "assets/css/main.css";

/* Base tag style */
.ui-tag {
  @apply px-3 pr- inline-flex items-center gap-2 rounded-md font-light text-3xs transition-all;
}

/* Icon style */
.ui-tag-icon {
  @apply w-4 h-4;
}

/* Text style */
.ui-tag-text {
  @apply leading-none;
}

/* Close button style */
.ui-tag-close {
  @apply ml-1 w-4 h-4 flex items-center justify-center transition duration-300;
}

/* Type color classes */
.ui-tag-color-primary {
  @apply bg-primary text-white;
}
.ui-tag-color-info {
  @apply bg-info text-white;
}
.ui-tag-color-success {
  @apply bg-success text-white;
}
.ui-tag-color-warning {
  @apply bg-warning text-white;
}
.ui-tag-color-error {
  @apply bg-error text-white;
}
.ui-tag-color-gray {
  @apply text-white bg-gray-shade-400;
}
.ui-tag-color-black {
  @apply text-white bg-black;
}
.ui-tag-color-white {
  @apply text-gray-shade-800 bg-gray-tint-200 border border-gray-tint-200;
}
.ui-tag-color-blue {
  @apply text-primary bg-blue-100 border border-blue-200;
}
.ui-tag-color-light-blue {
  @apply text-primary bg-blue-250 border border-blue-300;
}
.ui-tag-color-dark-gray {
  @apply text-white bg-gray-shade-800;
}
.ui-tag-color-light-red {
  @apply text-error bg-red-50 border border-red-200;
}
.ui-tag-color-light-green {
  @apply text-success bg-green-50 border border-green-250;
}
.ui-tag-color-light-orange {
  @apply text-warning bg-orange-tint-50 border border-yellow-250;
}
.ui-tag-color-light-purple {
  @apply text-info bg-violet-50 border border-violet-200;
}
</style>
