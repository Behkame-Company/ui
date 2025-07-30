<!--
  File Input Component Usage Guide:
  
  A customizable file input component that supports:
  - Custom text or icon display
  - File type restrictions
  - Custom placeholder text
  - File selection feedback
  - Responsive design
  - Click to select functionality
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic file input --&gt;
    &lt;UiFileInput
      @change="handleFileChange"
      placeholder="Select a file..."
    /&gt;
    
    &lt;!-- File input with custom text --&gt;
    &lt;UiFileInput
      text="Upload Document"
      placeholder="No document selected"
      accept=".pdf,.doc,.docx"
      @change="handleDocumentUpload"
    /&gt;
    
    &lt;!-- File input with icon --&gt;
    &lt;UiFileInput
      icon="Upload"
      size="24"
      placeholder="Choose image file"
      accept="image/*"
      @change="handleImageUpload"
    /&gt;
    
    &lt;!-- File input for specific file types --&gt;
    &lt;UiFileInput
      text="Select CSV"
      placeholder="No CSV file chosen"
      accept=".csv"
      @change="handleCSVUpload"
    /&gt;
    
    &lt;!-- File input with custom styling --&gt;
    &lt;UiFileInput
      icon="Folder"
      size="20"
      text="Browse Files"
      placeholder="Select your files..."
      accept="*"
      @change="handleMultipleFiles"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const handleFileChange = (file: File | null) =&gt; {
    if (file) {
      console.log('File selected:', file.name)
      // Process the file
    }
  }
  
  const handleDocumentUpload = (file: File | null) =&gt; {
    if (file) {
      console.log('Document uploaded:', file.name)
      // Upload document logic
    }
  }
  
  const handleImageUpload = (file: File | null) =&gt; {
    if (file) {
      console.log('Image uploaded:', file.name)
      // Process image
    }
  }
  
  const handleCSVUpload = (file: File | null) =&gt; {
    if (file) {
      console.log('CSV file:', file.name)
      // Parse CSV logic
    }
  }
  
  const handleMultipleFiles = (file: File | null) =&gt; {
    if (file) {
      console.log('File selected:', file.name)
      // Handle file selection
    }
  }
  &lt;/script&gt;
  
  PROPS:
  - text: string (default: 'Choose File') - Text to display when no icon is provided
  - icon: string (default: '') - Icon name to display (overrides text)
  - size: number (default: 20) - Icon size in pixels
  - placeholder: string (default: 'No file chosen') - Placeholder text when no file is selected
  - accept: string (default: '*') - File type restrictions (e.g., 'image/*', '.pdf,.doc')
  
  EVENTS:
  - change: Emitted when a file is selected, passes File object or null
  
  FEATURES:
  - Custom text or icon display
  - File type filtering
  - Click to select functionality
  - File name display
  - Responsive design
-->

<template>
  <div class="ui-file-input-container">
    <label class="ui-file-label" :class="{ 'has-icon': icon }">
      <span class="ui-file-choose" @click="fileInput?.click()">
        <template v-if="icon">
          <VsxIcon :iconName="icon" :size="size" type="bold" />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
      <span class="ui-file-name">
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
@reference "assets/css/main.css";

.ui-file-input-container {
  @apply w-1/4  h-11 flex items-center gap-2;
}
.ui-file-label {
  @apply flex text-center w-full h-full border border-primary rounded-sm  transition-all cursor-pointer;
}
.ui-file-label.has-icon {
  @apply pl-0;
}
.ui-file-icon {
  @apply flex items-center justify-center  py-3 px-3.25 bg-blue-tint-250  text-primary rounded-sm;
}
.ui-file-choose {
  @apply text-primary  bg-blue-tint-250 text-base font-medium truncate cursor-pointer whitespace-nowrap px-3.25 py-2.75;
}
.ui-file-name {
  @apply text-gray-shade-400 text-base placeholder:text-base whitespace-nowrap text-center  px-2 py-2.75;
}

</style>
