<template>
  <div class="ui-list-card">
    <div class="ui-list-title">{{ title }}</div>
    <ul>
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="ui-list-item"
        :class="[
          idx === selected ? 'ui-list-item-selected' : 'ui-list-item-hover',
          idx !== items.length - 1 ? 'ui-list-item-border' : '',
        ]"
        @click="$emit('select', idx)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
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
    ],
  },
  selected: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped>
@reference "assets/css/main.css";
.ui-list-card {
  @apply border border-gray-tint-400 rounded-lg  w-60 bg-transparent box-border;
}
.ui-list-title {
  @apply text-base font-bold  text-gray-shade-800 border-b border-gray-tint-400 px-4 py-3;
}
.ui-list-item {
  @apply px-2 py-2 cursor-pointer transition text-3xs hover:bg-gray-tint-250 hover:text-primary;
}
.ui-list-item-border {
  @apply border-b border-gray-tint-400;
}


</style>
