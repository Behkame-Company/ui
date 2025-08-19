<!--
  List Component Usage Guide:
  
  PARENT COMPONENT USAGE:
    <UiList
      title="User Actions"
      :items="userActions"
      :selected="selectedAction"
      @select="performAction"
    />
 
  
  PROPS:
  - title: string (default: 'Title') - List title to display
  - items: string[] (default: example items) - Array of list items
  - selected: number (default: 1) - Index of currently selected item
  
-->

<template>
  <div class="ui-list__card">
    <div class="ui-list__title">{{ title }}</div>
    <ul>
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="ui-list__item"
        :class="[
          idx === selected ? 'ui-list__item__selected' : 'ui-list__item__hover',
          idx !== items.length - 1 ? 'ui-list__item__border' : '',
        ]"
        @click="$emit('select', idx)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  title: {
    type: String,
    default: 'Title', // List title to display
  },
  items: {
    type: Array as () => string[],
    default: () => [
      'Example 1',
      'Example 2',
      'Example 3',
      'Example 4',
      'Example 5',
      'Example 6',
      'Example 7',
    ], // Array of list items
  },
  selected: {
    type: Number,
    default: 1, // Index of currently selected item
  },
})

</script>

<style scoped>
@reference "~/assets/css/main.css";
.ui-list__card {
  @apply border border-gray-tint-400 rounded-lg  w-60 bg-transparent box-border;
}
.ui-list__title {
  @apply text-base font-bold  text-gray-shade-800 border-b border-gray-tint-400 px-4 py-3;
}
.ui-list__item {
  @apply px-2 py-2 cursor-pointer transition text-3xs hover:bg-gray-tint-250 hover:text-primary;
}
.ui-list__item__border {
  @apply border-b border-gray-tint-400;
}


</style>
