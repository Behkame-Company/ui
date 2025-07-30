<!--
  Tag Component Usage Guide:
  
  A customizable tag component that supports:
  - Multiple color types (primary, info, success, warning, error, etc.)
  - Optional prefix icons
  - Closeable functionality
  - Dynamic spacing based on content
  - Custom styling and interactions
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic tag --&gt;
    &lt;UiTag text="Basic Tag" /&gt;
    
    &lt;!-- Tag with icon --&gt;
    &lt;UiTag
      text="Success"
      type="success"
      prefixIcon="TickCircle"
    /&gt;
    
    &lt;!-- Closeable tag --&gt;
    &lt;UiTag
      text="Removable"
      type="warning"
      closeable
      @close="handleTagClose"
    /&gt;
    
    &lt;!-- Icon only tag --&gt;
    &lt;UiTag
      prefixIcon="Star"
      type="primary"
      closeable
      @close="handleTagClose"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const handleTagClose = () =&gt; {
    console.log('Tag closed')
  }
  &lt;/script&gt;
  
  PROPS:
  - text: string (optional)
  - type: TagType (default: 'primary')
  - prefixIcon: string (optional)
  - closeable: boolean (default: false)
  
  EVENTS:
  - close: Emitted when the close button is clicked
-->

<template>
  <!-- Only render the tag if it's visible -->
  <div v-if="visible" class="ui-tag" :class="[typeClass, spacingClass]">
    <!-- Optional prefix icon -->
    <VsxIcon v-if="prefixIcon" :iconName="prefixIcon" class="ui-tag-icon" />

    <!-- Optional tag text -->
    <span v-if="text" class="ui-tag-text">{{ text }}</span>

    <!-- Optional close button -->
    <button v-if="closeable" @click="handleClose" class="ui-tag-close">
      <VsxIcon iconName="CloseCircle" class="ui-tag-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  text: {
    type: String,
    default: "", // The text content displayed in the tag
  },
  type: {
    type: String,
    default: "primary", // The visual type/style of the tag
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
  prefixIcon: {
    type: String,
    default: "", // Optional icon displayed before the text
  },
  closeable: {
    type: Boolean,
    default: false, // Determines if the tag should be closeable
  },
})

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "close"): void
}>()

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls tag visibility (used when tag is closed) */
const visible = ref<boolean>(true)

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Determine padding and gap styles based on tag content */
const spacingClass = computed<string>(() => {
  if (props.prefixIcon && !props.closeable) return "py-1.5 pl-4 pr-7 gap-x-1"
  if (!props.prefixIcon && props.closeable && !props.text) return "py-1 px-4"
  if (!props.prefixIcon && props.closeable && props.text) return "py-1 pl-3 pr-2 gap-x-1"
  if (props.prefixIcon && props.closeable && props.text) return "py-1 pr-6 pl-2 gap-x-1"
  return "py-1 px-3"
})

/** Builds class like "ui-tag-color-primary" based on the `type` prop */
const typeClass = computed<string>(() => `ui-tag-color-${props.type}`)

// ============================================================================
// 7. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Hide the tag and emit a close event when the close button is clicked
 */
const handleClose = (): void => {
  visible.value = false
  emit("close")
}
</script>

<style scoped>
@reference "assets/css/main.css";

/* Base tag style */
.ui-tag {
  @apply px-3  inline-flex items-center gap-2 rounded-md font-light text-3xs transition-all duration-300;
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
  @apply ml-1 w-4 h-4 flex items-center justify-center cursor-pointer transition duration-300;
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
