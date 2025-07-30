<!--
  Card Component Usage Guide:
  
  A flexible card component that supports:
  - Multiple sizes (sm, md, lg, xl)
  - Custom header, body, and footer slots
  - Optional image display
  - Close button in header
  - Multiple button colors
  - Responsive design
  - Shadow effects
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic card --&gt;
    &lt;UiCard size="md"&gt;
      &lt;template #header&gt;
        &lt;h3&gt;Card Title&lt;/h3&gt;
      &lt;/template&gt;
      
      &lt;p&gt;This is the card content.&lt;/p&gt;
      &lt;p&gt;You can put any content here.&lt;/p&gt;
      
      &lt;template #footer&gt;
        &lt;button :class="buttonClass" @click="handleAction"&gt;Action&lt;/button&gt;
      &lt;/template&gt;
    &lt;/UiCard&gt;
    
    &lt;!-- Card with image --&gt;
    &lt;UiCard size="lg" image="/path/to/image.jpg" @close="handleClose"&gt;
      &lt;template #header&gt;
        &lt;h3&gt;Image Card&lt;/h3&gt;
      &lt;/template&gt;
      
      &lt;p&gt;This card shows an image above the content.&lt;/p&gt;
    &lt;/UiCard&gt;
    
    &lt;!-- Small card with custom button color --&gt;
    &lt;UiCard size="sm" buttonColor="success" @close="handleClose"&gt;
      &lt;template #header&gt;
        &lt;h4&gt;Success Card&lt;/h4&gt;
      &lt;/template&gt;
      
      &lt;p&gt;This card has a success-colored button.&lt;/p&gt;
      
      &lt;template #footer&gt;
        &lt;button :class="buttonClass" @click="saveData"&gt;Save&lt;/button&gt;
      &lt;/template&gt;
    &lt;/UiCard&gt;
    
    &lt;!-- Large card without footer --&gt;
    &lt;UiCard size="xl" buttonColor="warning"&gt;
      &lt;template #header&gt;
        &lt;h2&gt;Large Card&lt;/h2&gt;
      &lt;/template&gt;
      
      &lt;div class="space-y-4"&gt;
        &lt;h3&gt;Section 1&lt;/h3&gt;
        &lt;p&gt;Content for section 1...&lt;/p&gt;
        
        &lt;h3&gt;Section 2&lt;/h3&gt;
        &lt;p&gt;Content for section 2...&lt;/p&gt;
      &lt;/div&gt;
    &lt;/UiCard&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const handleAction = () =&gt; {
    console.log('Action clicked!')
  }
  
  const handleClose = () =&gt; {
    console.log('Card closed!')
  }
  
  const saveData = () =&gt; {
    console.log('Data saved!')
  }
  &lt;/script&gt;
  
  PROPS:
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Card size
  - buttonColor: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray' (default: 'primary') - Button color
  - image: string (default: '') - URL of image to display above body content
  
  EVENTS:
  - close: Emitted when close button is clicked
  
  SLOTS:
  - header: Card header content (optional)
  - default: Card body content (required)
  - footer: Card footer content (optional) - receives buttonClass and buttonColorClass as slot props
  
  FEATURES:
  - Close button in header (when header slot is used)
  - Responsive sizing
  - Image support
  - Customizable content via slots
  - Shadow effects on hover
-->

<template>
  <div v-if="visible" class="ui-card" :class="sizeClass">
    <!-- Header -->
    <div class="ui-card-header" :class="headerClass" v-if="$slots.header">
      <slot name="header" />
      <!-- Icon rendering with guards -->
      <button @click="closeCard" class="ui-card-header-icon">
        <VsxIcon
          v-if="sizeIcon"
          iconName="CloseCircle"
          :size="sizeIcon"
          type="bold"
        />
      </button>
    </div>

    <!-- Body -->
    <div class="ui-card-body" :class="bodyClass">
      <div v-if="image" :class="imageSize">
        <img :src="image" alt="Card image" class="ui-card-image w-full block" />
      </div>
      <slot />
    </div>

    <!-- Footer -->
    <div class="ui-card-footer" v-if="$slots.footer">
      <slot
        name="footer"
        :button-class="`${buttonClass} ${buttonColorClass}`"
      ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  size: {
    type: String,
    default: "sm", // valid values: sm, md, lg, xl
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  buttonColor: {
    type: String,
    default: "primary", // valid values: primary, success, warning, danger, info, gray
    validator: (value: string) =>
      ["primary", "success", "warning", "danger", "info", "gray"].includes(value),
  },
  image: {
    type: String,
    default: "", // URL of image to display above body content
  },
})

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: 'close'): void
}>()

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const visible = ref<boolean>(true)

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const sizeClass = computed<string>(() => `ui-card-${props.size}`)

const headerClass = computed<string>(() => `ui-card-header-${props.size}`)

const bodyClass = computed<string>(() => `ui-card-body-${props.size}`)

const buttonClass = computed<string>(() => `ui-card-button-${props.size}`)

const buttonColorClass = computed<string>(() => `ui-card-button-${props.buttonColor}`)

const sizeIcon = computed<number>(() => {
  switch (props.size) {
    case "xl": return 28
    case "lg": return 24
    case "md": return 22
    case "sm":
    default: return 18
  }
})

const imageSize = computed<string>(() => {
  switch (props.size) {
    case "xl": return "py-6"
    case "lg": return "py-4"
    case "md": return "py-4"
    case "sm":
    default: return "py-4"
  }
})

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const closeCard = (): void => {
  visible.value = false
  emit('close')
}
</script>
  
<style scoped>
@reference "assets/css/main.css";

.ui-card {
  @apply rounded-lg bg-white transition-all duration-300;
}

.ui-card-header {
  @apply flex flex-row justify-between items-center border-b border-gray-tint-400;
}

.ui-card-header-icon {
  @apply cursor-pointer p-0.5  text-gray-shade-800 ;
}
/* shadow */

.ui-card-xl {
  @apply shadow-xs hover:shadow-lg;
}

.ui-card-lg {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card-md {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card-sm {
  @apply shadow-2xs hover:shadow-sm;
}

/* size header */
.ui-card-xl > .ui-card-header {
  @apply pb-4;
}

.ui-card-lg > .ui-card-header {
  @apply pb-3;
}

.ui-card-md > .ui-card-header {
  @apply pb-3;
}

.ui-card-sm > .ui-card-header {
  @apply pb-2;
}

/* size body */

.ui-card-xl > .ui-card-body {
  @apply py-6;
}

.ui-card-lg > .ui-card-body {
  @apply py-4;
}

.ui-card-md > .ui-card-body {
  @apply py-4;
}

.ui-card-sm > .ui-card-body {
  @apply py-4;
}

/* size footer */

/* .ui-card-xl > .ui-card-footer {
    @apply pb-4 px-4 ;
}

.ui-card-lg > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-md > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-sm > .ui-card-footer {
    @apply pb-2 px-2 ;
}   */

/* Header font sizes */
.ui-card-header-sm {
  @apply text-sm font-bold;
}
.ui-card-header-md {
  @apply text-base font-bold;
}
.ui-card-header-lg {
  @apply text-h6 font-semibold;
}
.ui-card-header-xl {
  @apply text-h5 font-semibold;
}

/* Body font sizes */
.ui-card-body-sm {
  @apply text-2xs;
}
.ui-card-body-md {
  @apply text-xs;
}
.ui-card-body-lg {
  @apply text-sm;
}
.ui-card-body-xl {
  @apply text-base;
}

.ui-card-sm {
  @apply p-2;
}
.ui-card-md {
  @apply p-3;
}
.ui-card-lg {
  @apply p-4;
}
.ui-card-xl {
  @apply p-4;
}

.ui-card-button-primary {
  @apply bg-primary  text-white;
}
.ui-card-button-success {
  @apply bg-success  text-white;
}
.ui-card-button-warning {
  @apply bg-warning  text-white;
}
.ui-card-button-danger {
  @apply bg-error  text-white;
}
.ui-card-button-info {
  @apply bg-info  text-white;
}
.ui-card-button-gray {
  @apply bg-gray  text-white;
}

.ui-card-image {
  @apply w-full h-auto rounded-t-lg object-cover;
  max-height: 200px; /* or any value you prefer */
  display: block;
}
</style>
