<!--
  Tab Component Usage Guide:
  
  A customizable tab component that supports:
  - Multiple tab types (default, bordered, rounded, text, filled)
  - Different sizes (sm, md, lg)
  - Dynamic tab content
  - Custom styling and interactions
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic tabs --&gt;
    &lt;UiTab
      :tabs="['Home', 'Profile', 'Settings']"
      @update:selected="handleTabChange"
    /&gt;
    
    &lt;!-- Bordered tabs with custom size --&gt;
    &lt;UiTab
      :tabs="['Tab 1', 'Tab 2', 'Tab 3']"
      type="bordered"
      size="lg"
      @update:selected="handleTabChange"
    /&gt;
    
    &lt;!-- Filled tabs with content --&gt;
    &lt;UiTab
      :tabs="['Overview', 'Details', 'History']"
      :Contents="['Content 1', 'Content 2', 'Content 3']"
      type="filled"
      @update:selected="handleTabChange"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const handleTabChange = (index) =&gt; {
    console.log('Selected tab:', index)
  }
  &lt;/script&gt;
  
  PROPS:
  - tabs: string[] (default: ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"])
  - Contents: (string | number | VNode)[] (optional)
  - type: 'default' | 'bordered' | 'rounded' | 'text' | 'filled' (default: 'default')
  - size: 'sm' | 'md' | 'lg' (default: 'md')
  
  EVENTS:
  - update:selected: Emitted when a tab is selected (index: number)
-->

<template>
  <!-- Container for the entire tab component -->
  <div class="ui-tab">

    <!-- Tab buttons rendered dynamically from `tabs` prop -->
    <div class="ui-tab-wrapper">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="select_tab(index)"
        :class="[
          'ui-tab-base',        // Base styles for all tabs
          tabStyle,            // Dynamic style class based on `type` prop
          sizeClass,
          selectedIndex === index
            ? `${tabStyle}-active`     // Active state class
            : `${tabStyle}-inactive`,  // Inactive state class
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Display content for the selected tab -->
    <!-- <div class="ml-4" v-if="Contents[selectedIndex]">
      {{ Contents[selectedIndex] }}
    </div> -->
  </div>
</template>

<script setup lang="ts">

// Props definition

const props = defineProps({
  // Array of tab titles
  tabs: {
    type: Array as PropType<string[]>,
    default: () => ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"],
  },

  // Array of tab contents
  Contents: {
    type: Array as PropType<(string | number | VNode)[]>,
    // default: () => ["Content 1", "Content 2", "Content 3"],
  },

  // Type of tab style (default, bordered, rounded, text, filled)
  type: {
    type: String,
    default: "default",
    validator: (value: string) =>
      ["default", "bordered", "rounded", "text", "filled"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["md", "sm", "lg"].includes(value),
  },
});

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "update:selected", index: number): void
}>()

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Currently selected tab index */
const selectedIndex = ref<number>(0)

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Compute tab style class based on the `type` prop */

const tabStyle = computed<string>(() => `ui-tab-${props.type}`)
/** Compute size class based on the `size` prop */

const sizeClass = computed<string>(() => `ui-tab-text-${props.size}`)


// ============================================================================
// 7. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Handle tab selection and emit the selected index
 * @param index - The index of the selected tab
 */
const select_tab = (index: number) => {
  selectedIndex.value = index
  emit("update:selected", index)
}
</script>

<style scoped>
@reference "assets/css/main.css";

/* Root container styles */
.ui-tab {
  @apply w-full overflow-auto;
}

/* Wrapper for tab buttons */
.ui-tab-wrapper {
  @apply flex gap-1.5 p-2 whitespace-nowrap;
}

/* Base styles shared by all tab buttons */
.ui-tab-base {
  @apply transition-all duration-300 text-gray-shade-400 p-2 cursor-pointer;
}

/* Filled type styles */
.ui-tab-filled {
  @apply rounded-lg 
}
.ui-tab-filled-active {
  @apply text-white bg-primary;
}
.ui-tab-filled-inactive {
  @apply text-gray-shade-400 hover:bg-blue-100  hover:text-primary;
}

/* Default underline type styles */
.ui-tab-default {
  @apply border-b-2 border-transparent;
}
.ui-tab-default-active {
  @apply border-primary text-primary;
}
.ui-tab-default-inactive {
  @apply text-gray-shade-400  hover:text-blue-500 hover:border-none;
}

/* Bordered tab styles */
.ui-tab-bordered {
  @apply rounded-lg  ;
}
.ui-tab-bordered-active {
  @apply bg-transparent text-primary border border-primary;
}
.ui-tab-bordered-inactive {
  @apply text-gray-shade-400 bg-transparent hover:border hover:border-blue-300  hover:text-blue-400;
}

/* Text type (minimal styling) */
.ui-tab-text {
  @apply bg-transparent 
}
.ui-tab-text-active {
  @apply text-primary;
}
.ui-tab-text-inactive {
  @apply text-gray-shade-400 hover:text-blue-500;
}

/* Rounded-top tabs */
.ui-tab-rounded {
  @apply rounded-t-lg 
}
.ui-tab-rounded-active {
  @apply bg-primary text-white;
}
.ui-tab-rounded-inactive {
  @apply text-gray-shade-400 hover:bg-blue-100  hover:text-primary;
}
 /* Size styles */
 .ui-tab-text-sm {
  @apply text-xs font-bold;
 }
 .ui-tab-text-md {
  @apply text-sm font-bold ;
 }
 .ui-tab-text-lg {
  @apply text-base font-bold;
 }
</style>

