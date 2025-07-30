<!--
  Link Component Usage Guide:
  
  A customizable link component that supports:
  - Multiple sizes (xs, sm, md, lg, xl)
  - Multiple colors (primary, secondary, dark, error, success, warning, info, gray)
  - NuxtLink integration
  - Custom text and href
  - Responsive design
  - Underline styling
  - Hover effects
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic link --&gt;
    &lt;UiLink
      text="Learn More"
      href="/about"
    /&gt;
    
    &lt;!-- Link with custom color and size --&gt;
    &lt;UiLink
      text="Contact Us"
      href="/contact"
      color="success"
      size="lg"
    /&gt;
    
    &lt;!-- Small error link --&gt;
    &lt;UiLink
      text="Delete Account"
      href="/delete-account"
      color="error"
      size="sm"
    /&gt;
    
    &lt;!-- Large warning link --&gt;
    &lt;UiLink
      text="Terms of Service"
      href="/terms"
      color="warning"
      size="xl"
    /&gt;
    
    &lt;!-- Secondary link --&gt;
    &lt;UiLink
      text="Privacy Policy"
      href="/privacy"
      color="secondary"
      size="md"
    /&gt;
    
    &lt;!-- Dark themed link --&gt;
    &lt;UiLink
      text="Documentation"
      href="/docs"
      color="dark"
      size="lg"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  // No additional setup needed for basic usage
  // The component handles all routing internally via NuxtLink
  &lt;/script&gt;
  
  PROPS:
  - text: string (default: '') - Link text to display
  - href: string (default: '') - URL or route path
  - color: 'primary' | 'secondary' | 'dark' | 'error' | 'success' | 'warning' | 'info' | 'gray' (default: 'primary') - Link color
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Link size
  
  EVENTS:
  - No custom events (uses NuxtLink navigation)
  
  FEATURES:
  - NuxtLink integration for client-side routing
  - Multiple color themes
  - Responsive sizing
  - Underline styling
  - Hover effects
  - Customizable text and href
-->

<template>
  <NuxtLink
    class="ui-link-text"
    :to="href"
    :class="[sizeClass, colorClass]"
  >
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  text: {
    type: String,
    default: "", // Link text to display
  },
  href: {
    type: String,
    default: "", // URL or route path
  },
  color: {
    type: String,
    default: "primary", // set this to the color of the link
    validator: (value: string) =>
      [
        "primary",
        "secondary",
        "dark",
        "error",
        "success",
        "warning",
        "info",
        "gray",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md", // set this to the size of the link
    validator: (value: string) =>
      ["xs", "sm", "md", "lg", "xl"].includes(value),
  },
})

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================

const colorClass = computed<string>(() => `ui-link-${props.color}`)

const sizeClass = computed<string>(() => `ui-link-text-${props.size}`)
</script>

<style scoped>
@reference "assets/css/main.css";


.ui-link-text {
  @apply flex justify-center items-center px-8 py-4 underline underline-offset-4 cursor-pointer text-nowrap ;
}
.ui-link-primary {
  @apply text-primary decoration-primary;
}
.ui-link-gray {
  @apply text-gray decoration-gray;
}
.ui-link-secondary {
  @apply text-blue-200 decoration-blue-200;
}
.ui-link-dark {
  @apply text-cyan-lc-shade-999 decoration-cyan-lc-shade-999;
}
.ui-link-error {
  @apply text-error decoration-error;
}
.ui-link-success {
  @apply text-success decoration-success;
}
.ui-link-warning {
  @apply text-warning decoration-warning;
}
.ui-link-info {
  @apply text-info decoration-info;
}

.ui-link-text-xl {
  @apply text-h6 font-medium;
}

.ui-link-text-lg {
  @apply text-base font-medium;
}

.ui-link-text-md {
  @apply text-sm font-medium;
}

.ui-link-text-sm {
  @apply text-xs font-medium;
}
.ui-link-text-xs {
  @apply text-2xs font-medium;
}
</style>
