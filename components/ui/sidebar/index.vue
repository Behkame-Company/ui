<!--
  Sidebar Component Usage Guide:
  
  A customizable sidebar navigation component that supports:
  - Collapsible sidebar with toggle functionality
  - Multiple navigation sections (top, bottom, third)
  - User info display
  - Icon-based navigation
  - Text-based navigation when expanded
  - Router integration
  - Responsive design
  - Smooth transitions
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiSidebar
      :top-sections="topNavItems"
      :bottom-sections="bottomNavItems"
      :data="userInfo"
    />
    
    <UiSidebar
      :top-sections="mainNav"
      :bottom-sections="secondaryNav"
      :third-sections="actionNav"
      :data="userName"
    />
    
    <UiSidebar
      :top-sections="dashboardNav"
      :bottom-sections="settingsNav"
      :data="currentUser"
    />
  </template>
  
  <script setup>
  const userInfo = ref('John Doe')
  const userName = ref('Jane Smith')
  const currentUser = ref('Admin User')
  
  const topNavItems = ref([
    { iconName: 'Home', text: 'Dashboard', to: '/dashboard' },
    { iconName: 'User', text: 'Profile', to: '/profile' },
    { iconName: 'Document', text: 'Documents', to: '/documents' }
  ])
  
  const bottomNavItems = ref([
    { iconName: 'Setting', text: 'Settings', to: '/settings' },
    { iconName: 'Help', text: 'Help', to: '/help' }
  ])
  
  const mainNav = ref([
    { iconName: 'Home', text: 'Home', to: '/home' },
    { iconName: 'Search', text: 'Search', to: '/search' },
    { iconName: 'Notification', text: 'Notifications', to: '/notifications' }
  ])
  
  const secondaryNav = ref([
    { iconName: 'Setting', text: 'Settings', to: '/settings' },
    { iconName: 'User', text: 'Account', to: '/account' }
  ])
  
  const actionNav = ref([
    { iconName: 'Logout', text: 'Logout', to: '/logout' },
    { iconName: 'Trash', text: 'Delete Account', to: '/delete-account' }
  ])
  
  const dashboardNav = ref([
    { iconName: 'Chart', text: 'Analytics', to: '/analytics' },
    { iconName: 'Users', text: 'Users', to: '/users' },
    { iconName: 'Document', text: 'Reports', to: '/reports' }
  ])
  
  const settingsNav = ref([
    { iconName: 'Setting', text: 'General', to: '/settings/general' },
    { iconName: 'Security', text: 'Security', to: '/settings/security' },
    { iconName: 'Notification', text: 'Notifications', to: '/settings/notifications' }
  ])
  </script>
  
  PROPS:
  - topSections?: Section[] - Top navigation section items
  - bottomSections?: Section[] - Bottom navigation section items
  - thirdSections?: Section[] - Third navigation section items (error-themed)
  - data?: string - User info text to display
  
  EVENTS:
  - No custom events (handles navigation internally via router)
  
  FEATURES:
  - Collapsible sidebar
  - Multiple navigation sections
  - User info display
  - Router integration
  - Icon and text navigation
  - Smooth transitions
  - Responsive design
-->

<template>
  <div
    :class="['ui-sidebar', isOpen ? 'ui-sidebar-open' : 'ui-sidebar-closed']"
  >
    <!-- Toggle Sidebar Button -->
    <button
      class="ui-sidebar__toggle-btn"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
    >
      <VsxIcon :iconName="toggleIcon" class="ui-sidebar__icon" />
    </button>

    <!-- Sidebar Navigation -->
    <nav class="ui-sidebar__nav">
      <!-- Optional User Info -->
      <div v-if="isOpen" class="ui-sidebar__user-info">
        <div class="ui-sidebar__user-icon">
          <VsxIcon iconName="User" :size="24" class="text-gray" type="linear" />
        </div>
        <span class="ui-sidebar__user-text">{{ data }}</span>
      </div>

      <!-- Navigation Sections -->
      <div class="ui-sidebar__nav-items">
        <!-- Top group -->
        <template v-if="isOpen">
          <UiButton
            v-for="(section, idx) in topSections"
            :key="'top-' + idx"
            :prefixIcon="section.iconName"
            :class="[
              'ui-sidebar__button',
              selectedIndex === idx && 'text-primary',
            ]"
            color="text-bt"
            text-align="left"
            size="lg"
            @click="selectSection(idx)"
          >
            {{ section.text }}
          </UiButton>
        </template>
        <template v-else>
          <UiButtonIcon
            v-for="(section, idx) in topSections"
            :key="'top-' + idx"
            :icon="section.iconName || 'User'"
            size="lg"
            color="text-bt"
            @click="() => section.to && router.push(section.to)"
          />
        </template>
        <hr class="text-gray-tint-650">
        
        <!-- Bottom group -->
        <template v-if="isOpen">
          <UiButton
            v-for="(section, idx) in bottomSections"
            :key="'bottom-' + idx"
            :prefixIcon="section.iconName"
            :class="[
              'ui-sidebar__button',
              selectedIndex === (topSections.length + idx) && 'text-primary',
            ]"
            color="text-bt"
            text-align="left"
            size="lg"
            @click="selectSection(topSections.length + idx)"
          >
            {{ section.text }}
          </UiButton>
        </template>
        <template v-else>
          <UiButtonIcon
            v-for="(section, idx) in bottomSections"
            :key="'bottom-' + idx"
            :icon="section.iconName || 'User'"
            size="lg"
            color="text-bt"
            @click="() => section.to && router.push(section.to)"
          />
        </template>
      </div>
    </nav>
    <!-- Third group -->
    <template v-if="isOpen">
      <UiButton
        v-for="(section, idx) in thirdSections"
        :key="'top-' + idx"
        :prefixIcon="section.iconName"
        :class="[
          'ui-sidebar__button',
          selectedIndex === idx && 'text-primary',
        ]"
        class="m-4"
        color="error"
        text-align="left"
        size="lg"
        @click="selectSection(idx)"
      >
        {{ section.text }}
      </UiButton>
    </template>
    <template v-else>
      <UiButtonIcon
        v-for="(section, idx) in thirdSections"
        :key="'top-' + idx"
        :icon="section.iconName || 'User'"
        size="lg"
        color="error"
        class="m-4"
        @click="() => section.to && router.push(section.to)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  topSections: {
    type: Array as () => { iconName: string; text: string; to: string }[],
    default: () => [], // Top navigation section items
  },
  bottomSections: {
    type: Array as () => { iconName: string; text: string; to: string }[],
    default: () => [], // Bottom navigation section items
  },
  thirdSections: {
    type: Array as () => { iconName: string; text: string; to: string }[],
    default: () => [], // Third navigation section items (error-themed)
  },
  data: {
    type: String,
    default: "", // User info text to display
  },
})


// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const isOpen = ref<boolean>(true) // Controls whether sidebar is open or closed
const selectedIndex = ref<number>(0) // Currently selected section index

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
// Router for navigation
const router = useRouter()

// Filtered list of sections with valid icon names
const topSections = computed<{ iconName: string; text: string; to: string }[]>(() =>
  (props.topSections ?? []).filter((s) => !!s.iconName?.trim())
)
const bottomSections = computed<{ iconName: string; text: string; to: string }[]>(() =>
  (props.bottomSections ?? []).filter((s) => !!s.iconName?.trim())
)
const thirdSections = computed<{ iconName: string; text: string; to: string }[]>(() =>
  (props.thirdSections ?? []).filter((s) => !!s.iconName?.trim())
)

// Dynamic icon based on sidebar open state
const toggleIcon = computed<string>(() =>
  isOpen.value ? 'ArrowLeft' : 'ArrowRight'
)

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
// Toggle sidebar visibility
const toggleSidebar = (): void => {
  isOpen.value = !isOpen.value
}

// Select section and navigate
const selectSection = (index: number): void => {
  selectedIndex.value = index
  let section: { iconName: string; text: string; to: string } | undefined
  if (index < topSections.value.length) {
    section = topSections.value[index]
  } else if (index < topSections.value.length + bottomSections.value.length) {
    section = bottomSections.value[index - topSections.value.length]
  } else {
    section = thirdSections.value[index - topSections.value.length - bottomSections.value.length]
  }
  if (section?.to) {
    router.push(section.to)
  }
}
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-sidebar {
  @apply fixed top-0 left-0 h-screen z-20 bg-white flex flex-col justify-between transition-all duration-300 ;
}
.ui-sidebar-open {
  @apply w-74.5 rounded-r-3xl;
}
.ui-sidebar-closed {
  @apply w-18 rounded-r-2xl;
}
.ui-sidebar__user-info {
  @apply flex items-center justify-between bg-gray-tint-200 py-2 px-4 rounded-lg gap-2;
}
.ui-sidebar__nav-items {
  @apply flex flex-col gap-4 mt-3;
}
.ui-sidebar__toggle-btn {
  @apply absolute bottom-25 -right-4 w-8 h-8 bg-gray-tint-650 text-gray-shade-800 rounded-full flex items-center hover:bg-gray-tint-800 justify-center cursor-pointer z-10 transition-colors duration-300;
}
.ui-sidebar__nav {
  @apply p-4 flex-1;
}
.ui-sidebar__icon {
  @apply w-5 h-5 text-gray-shade-800 flex items-center justify-center;
}
.ui-sidebar__user-icon {
  @apply bg-white w-10 h-10 rounded-full border border-blue-tint-650 p-1.5;
}
.ui-sidebar__user-text {
  @apply text-gray-shade-800 text-sm font-normal;
}
</style>
