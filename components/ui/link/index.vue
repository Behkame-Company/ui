<!--
  Link Component Usage Guide:
 
  
  PARENT COMPONENT USAGE:
    
    <UiLink
      text="Documentation"
      href="/docs"
      color="dark"
      size="lg"
    />
  
  PROPS:
  - text: string (default: '') - Link text to display
  - href: string (default: '') - URL or route path
  - color: 'primary' | 'secondary' | 'dark' | 'error' | 'success' | 'warning' | 'info' | 'gray' (default: 'primary') - Link color
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Link size
  
-->

<template>
  <NuxtLink
    class="ui-link__text"
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

const colorClass = computed<string>(() => `ui-link__${props.color}`)

const sizeClass = computed<string>(() => `ui-link__text__${props.size}`)
</script>

<style scoped>
@reference "assets/css/main.css";


.ui-link__text {
  @apply flex justify-center items-center px-8 py-4 underline underline-offset-4 cursor-pointer text-nowrap ;
}
.ui-link__primary {
  @apply text-primary decoration-primary;
}
.ui-link__gray {
  @apply text-gray decoration-gray;
}
.ui-link__secondary {
  @apply text-blue-200 decoration-blue-200;
}
.ui-link__dark {
  @apply text-cyan-lc-shade-999 decoration-cyan-lc-shade-999;
}
.ui-link__error {
  @apply text-error decoration-error;
}
.ui-link__success {
  @apply text-success decoration-success;
}
.ui-link__warning {
  @apply text-warning decoration-warning;
}
.ui-link__info {
  @apply text-info decoration-info;
}

.ui-link__text__xl {
  @apply text-h6 font-medium;
}

.ui-link__text__lg {
  @apply text-base font-medium;
}

.ui-link__text__md {
  @apply text-sm font-medium;
}

.ui-link__text__sm {
  @apply text-xs font-medium;
}
.ui-link__text__xs {
  @apply text-2xs font-medium;
}
</style>
