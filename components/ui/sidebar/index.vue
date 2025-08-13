<!--
  Sidebar Component Usage Guide:
  PARENT COMPONENT USAGE:
    <UiSidebar
      :top-sections="mainNav"
      :bottom-sections="secondaryNav"
      :third-sections="actionNav"
      :data="userName"
    />
  PROPS:
  - topSections?: Section[] - Top navigation section items
  - bottomSections?: Section[] - Bottom navigation section items
  - thirdSections?: Section[] - Third navigation section items (error-themed)
  - data?: string - User info text to display
  
-->

<template>
  <div
    :class="['ui-sidebar', isOpen ? 'ui-sidebar__open' : 'ui-sidebar__closed']"
    sidebarBg
  >
    <!-- Toggle Sidebar Button -->
    <button
      class="ui-sidebar__toggle__btn"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
    >
      <VsxIcon :iconName="toggleIcon" class="ui-sidebar__icon" />
    </button>

    <!-- Sidebar Navigation -->
    <nav class="ui-sidebar__nav">
      <!-- Optional User Info -->
      <div v-if="isOpen" class="ui-sidebar__user__info">
        <div class="ui-sidebar__user__info">
          {{ data1 }}
        </div>
        <span class="ui-sidebar__user__text">{{ data }}</span>
      </div>

      <!-- Navigation Sections -->
      <div class="ui-sidebar__nav__items">
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
            :color="buttonColor"
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
            :color="buttonColor"
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
            :color="buttonColor"
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
  data1:{
    type :String,
    default : ""
  },
  sidebarBg: {
    type: String,
    default: "bg-white" // default color
  },
  // NEW: Button color
  buttonColor: {
    type: String,
    default: "text-bt" // your existing color variable/class
  },
  navBgColor: {
    type: String,
    default: "bg-white" // Tailwind color class or custom class
  }
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
  @apply sticky top-0 left-0 h-screen z-20 bg-white flex flex-col justify-between transition-all duration-300 ;
}
.ui-sidebar__open {
  @apply w-74.5 rounded-r-3xl;
}
.ui-sidebar__closed {
  @apply w-18 rounded-r-2xl;
}
.ui-sidebar__user__info {
  @apply flex items-center justify-between bg-gray-tint-200 py-2 px-4 rounded-lg gap-2;
}
.ui-sidebar__nav__items {
  @apply flex flex-col gap-4 mt-3;
}
.ui-sidebar__toggle__btn {
  @apply absolute bottom-25 -right-4 w-8 h-8 bg-gray-tint-650 text-gray-shade-800 rounded-full flex items-center hover:bg-gray-tint-800 justify-center cursor-pointer z-10 transition-colors duration-300;
}
.ui-sidebar__nav {
  @apply p-4 flex-1;
}
.ui-sidebar__icon {
  @apply w-5 h-5 text-gray-shade-800 flex items-center justify-center;
}
.ui-sidebar__user__icon {
  @apply bg-white w-10 h-10 rounded-full border border-blue-tint-650 p-1.5 text-gray;
}
.ui-sidebar__user__text {
  @apply text-gray-shade-800 text-sm font-normal;
}
</style>
