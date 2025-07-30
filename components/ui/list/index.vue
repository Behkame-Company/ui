<!--
  List Component Usage Guide:
  
  A customizable list component that supports:
  - Custom title display
  - Selectable list items
  - Hover and selected states
  - Custom item content
  - Selection events
  - Responsive design
  - Border styling between items
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiList
      title="Menu Items"
      :items="menuItems"
      :selected="selectedIndex"
      @select="handleItemSelect"
    />
    
    <UiList
      title="Navigation"
      :items="navigationItems"
      :selected="currentPage"
      @select="navigateToPage"
    />
    
    <UiList
      title="Settings"
      :items="settingsOptions"
      :selected="2"
      @select="updateSetting"
    />
    
    <UiList
      title="User Actions"
      :items="userActions"
      :selected="selectedAction"
      @select="performAction"
    />
  </template>
  
  <script setup>
  const selectedIndex = ref(0)
  const currentPage = ref(1)
  const selectedAction = ref(-1)
  
  const menuItems = ref([
    'Dashboard',
    'Profile',
    'Settings',
    'Logout'
  ])
  
  const navigationItems = ref([
    'Home',
    'About',
    'Contact',
    'Services'
  ])
  
  const settingsOptions = ref([
    'Account',
    'Privacy',
    'Notifications',
    'Security'
  ])
  
  const userActions = ref([
    'Edit Profile',
    'Change Password',
    'Delete Account'
  ])
  
  const handleItemSelect = (index: number) => {
    selectedIndex.value = index
    console.log('Selected item:', menuItems.value[index])
  }
  
  const navigateToPage = (index: number) => {
    currentPage.value = index
    console.log('Navigating to:', navigationItems.value[index])
  }
  
  const updateSetting = (index: number) => {
    console.log('Updating setting:', settingsOptions.value[index])
  }
  
  const performAction = (index: number) => {
    selectedAction.value = index
    console.log('Performing action:', userActions.value[index])
  }
  </script>
  
  PROPS:
  - title: string (default: 'Title') - List title to display
  - items: string[] (default: example items) - Array of list items
  - selected: number (default: 1) - Index of currently selected item
  
  EVENTS:
  - select: Emitted when an item is clicked, passes the item index
  
  FEATURES:
  - Selectable list items with visual feedback
  - Hover and selected states
  - Custom title and items
  - Border styling between items
  - Responsive design
-->

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
