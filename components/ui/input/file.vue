<!--
  File Input Component Usage Guide:

  PARENT COMPONENT USAGE:
    <UiFileInput
      icon="Folder"
      size="20"
      text="Browse Files"
      placeholder="Select your files..."
      accept="*"
      @change="handleMultipleFiles"
    />
  
  
  PROPS:
  - text: string (default: 'Choose File') - Text to display when no icon is provided
  - icon: string (default: '') - Icon name to display (overrides text)
  - size: number (default: 20) - Icon size in pixels
  - placeholder: string (default: 'No file chosen') - Placeholder text when no file is selected
  - accept: string (default: '*') - File type restrictions (e.g., 'image/*', '.pdf,.doc')
-->

<template>
  <div class="ui-file__container">
    <label class="ui-file__label" :class="{ 'has-icon': icon }">
      <span class="ui-file__choose" @click="fileInput?.click()">
        <template v-if="icon">
          <VsxIcon :iconName="icon" :size="size" type="bold" />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
      <span class="ui-file__name">
        {{ fileName || placeholder }}
      </span>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onFileChange"
        :accept="accept"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  text: {
    type: String,
    default: "Choose File", // Text to display when no icon is provided
  },
  icon: {
    type: String,
    default: "", // Icon name to display (overrides text)
  },
  size: {
    type: Number,
    default: 20, // Icon size in pixels
  },
  placeholder: {
    type: String,
    default: "No file chosen", // Placeholder text when no file is selected
  },
  accept: {
    type: String,
    default: "*", // File type restrictions (e.g., 'image/*', '.pdf,.doc')
  },
})

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "change", file: File | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string>("")
// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Handle file selection change
 * Updates the file name and emits the selected file
 */
const onFileChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  const file: File | null = target.files?.[0] || null
  fileName.value = file?.name || ""
  emit("change", file)
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.ui-file__container {
  @apply w-1/4  h-11 flex items-center gap-2;
}
.ui-file__label {
  @apply flex text-center w-full h-full border border-primary rounded-sm  transition-all cursor-pointer;
}
.ui-file__label.has-icon {
  @apply pl-0;
}
.ui-file__icon {
  @apply flex items-center justify-center  py-3 px-3.25 bg-blue-tint-250  text-primary rounded-sm;
}
.ui-file__choose {
  @apply text-primary  bg-blue-tint-250 text-base font-medium truncate cursor-pointer whitespace-nowrap px-3.25 py-2.75;
}
.ui-file__name {
  @apply text-gray-shade-400 text-base placeholder:text-base whitespace-nowrap text-center  px-2 py-2.75;
}

</style>
