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
    <template v-if="isOpen" >
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
// Define section type
interface Section {
  iconName: string
  text: string
  to: string
}

// Props definition
const props = defineProps<{
  topSections?: Section[]
  bottomSections?: Section[]
  thirdSections?: Section[]
  data?: string
}>()

// Sidebar state
const isOpen = ref<boolean>(true) // Controls whether sidebar is open or closed
const selectedIndex = ref<number>(0) // Currently selected section index

// Router for navigation
const router = useRouter()

// Filtered list of sections with valid icon names
const topSections = computed<Section[]>(() =>
  (props.topSections ?? []).filter((s) => !!s.iconName?.trim())
)
const bottomSections = computed<Section[]>(() =>
  (props.bottomSections ?? []).filter((s) => !!s.iconName?.trim())
)
const thirdSections = computed<Section[]>(() =>
  (props.thirdSections ?? []).filter((s) => !!s.iconName?.trim())
)

// Dynamic icon based on sidebar open state
const toggleIcon = computed<string>(() =>
  isOpen.value ? 'ArrowLeft' : 'ArrowRight'
)

// Toggle sidebar visibility
const toggleSidebar = (): void => {
  isOpen.value = !isOpen.value
}

// Select section and navigate
const selectSection = (index: number): void => {
  selectedIndex.value = index
  let section: Section | undefined
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
  @apply absolute bottom-25 -right-4 w-8 h-8 bg-sidebar-toggle-btn text-gray-shade-800 rounded-full flex items-center justify-center cursor-pointer z-10 transition-colors duration-300;
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
