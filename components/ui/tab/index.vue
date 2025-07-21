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
          tab_style,            // Dynamic style class based on `type` prop
          size_style,
          selectedIndex === index
            ? `${tab_style}-active`     // Active state class
            : `${tab_style}-inactive`,  // Inactive state class
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
/**
 * Props definition
 */
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

// Emit handler for selected tab index change
const emit = defineEmits<{
  (e: "update:selected", index: number): void;
}>();

// Selected tab index
const selectedIndex = ref<number>(0);

// Emit event and update selected index when a tab is clicked
function select_tab(index: number) {
  selectedIndex.value = index;
  emit("update:selected", index);
}

// Compute tab style class based on the `type` prop
const tab_style = computed(() => {
  switch (props.type) {
    case "filled":
      return "ui-tab-filled";
    case "bordered":
      return "ui-tab-bordered";
    case "text":
      return "ui-tab-text";
    case "rounded":
      return "ui-tab-rounded";
    default:
      return "ui-tab-default";
  }
});

const size_style = computed(() => {
  switch (props.size) {
    case "sm":
      return "ui-tab-text-sm";
    case "lg":
      return "ui-tab-text-lg";
    default:
      return "ui-tab-text-md";
  }
});
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

