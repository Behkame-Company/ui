<!--
  Tab Component Usage Guide:
  
  PARENT COMPONENT USAGE:
  
    <UiTab
      :tabs="['Overview', 'Details', 'History']"
      :Contents="['Content 1', 'Content 2', 'Content 3']"
      type="filled"
      @update:selected="handleTabChange"
    />

  
  PROPS:
  - tabs: string[] (default: ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"])
  - Contents: (string | number | VNode)[] (optional)
  - type: 'default' | 'bordered' | 'rounded' | 'text' | 'filled' (default: 'default')
  - size: 'sm' | 'md' | 'lg' (default: 'md')
  
  EVENTS:
  - update:selected: Emitted when a tab is selected (index: number) -->


<template>
  <!-- Container for the entire tab component -->
  <div class="ui-tab">

    <!-- Tab buttons rendered dynamically from `tabs` prop -->
    <div class="ui-tab__wrapper">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="select_tab(index)"
        :class="[
          'ui-tab__base',        // Base styles for all tabs
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

const tabStyle = computed<string>(() => `ui-tab__${props.type}`)
/** Compute size class based on the `size` prop */

const sizeClass = computed<string>(() => `ui-tab__size__${props.size}`)


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
.ui-tab__wrapper {
  @apply flex gap-1.5  whitespace-nowrap;
}

/* Base styles shared by all tab buttons */
.ui-tab__base {
  @apply transition-all duration-300 text-gray-shade-400 p-2 cursor-pointer;
}

/* Filled type styles */
.ui-tab__filled {
  @apply rounded-lg 
}
.ui-tab__filled-active {
  @apply text-white bg-primary;
}__
.ui-tab__filled-inactive {
  @apply text-gray-shade-400 hover:bg-blue-100  hover:text-primary;
}

/* Default underline type styles */
.ui-tab__default {
  @apply border-b-2 border-transparent;
}
.ui-tab__default-active {
  @apply border-primary text-primary;
}
.ui-tab__default-inactive {
  @apply text-gray-shade-400  hover:text-blue-500 hover:border-none;
}

/* Bordered tab styles */
.ui-tab__bordered {
  @apply rounded-lg  ;
}
.ui-tab__bordered-active {
  @apply bg-transparent text-primary border border-primary;
}
.ui-tab__bordered-inactive {
  @apply text-gray-shade-400 bg-transparent hover:border hover:border-blue-300  hover:text-blue-400;
}

/* Text type (minimal styling) */
.ui-tab__text {
  @apply bg-transparent 
}
.ui-tab__text-active {
  @apply text-primary;
}
.ui-tab__text-inactive {
  @apply text-gray-shade-400 hover:text-blue-500;
}

/* Rounded-top tabs */
.ui-tab__rounded {
  @apply rounded-t-lg 
}
.ui-tab__rounded-active {
  @apply bg-primary text-white;
}
.ui-tab__rounded-inactive {
  @apply text-gray-shade-400 hover:bg-blue-100  hover:text-primary;
}
 /* Size styles */
 .ui-tab__size__sm {
  @apply text-xs font-bold;
 }__
 .ui-tab__size__md {
  @apply text-sm font-bold ;
 }
 .ui-tab__size__lg {
  @apply text-base font-bold;
 }
</style>

