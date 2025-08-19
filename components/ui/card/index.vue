<!--
  Card Component Usage Guide:
  
  PARENT COMPONENT USAGE:
  
    
    <UiCard size="sm" buttonColor="success" @close="handleClose">
      <template #header>
        <h4>Success Card</h4>
      </template>
      
      <p>This card has a success-colored button.</p>
      
      <template #footer>
        <button :class="buttonClass" @click="saveData">Save</button>
      </template>
    </UiCard>
    
    <UiCard size="xl" buttonColor="warning">
      <template #header>
        <h2>Large Card</h2>
      </template>
      
      <div class="space-y-4">
        <h3>Section 1</h3>
        <p>Content for section 1...</p>
        
        <h3>Section 2</h3>
        <p>Content for section 2...</p>
      </div>
    </UiCard>
  
  
  
  PROPS:
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Card size
  - buttonColor: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray' (default: 'primary') - Button color
  - image: string (default: '') - URL of image to display above body content
  
  
  SLOTS:
  - header: Card header content (optional)
  - default: Card body content (required)
  - footer: Card footer content (optional) - receives buttonClass and buttonColorClass as slot props
  
-->

<template>
  <div v-if="visible" class="ui-card" :class="sizeClass">
    <!-- Header -->
    <div class="ui-card__header" :class="headerClass" v-if="$slots.header">
      <slot name="header" />
      <!-- Icon rendering with guards -->
      <button @click="closeCard" class="ui-card__header__icon">
        <VsxIcon
          v-if="sizeIcon"
          iconName="CloseCircle"
          :size="sizeIcon"
          type="bold"
        />
      </button>
    </div>

    <!-- Body -->
    <div class="ui-card__body" :class="bodyClass">
      <div v-if="image" :class="imageSize">
        <img :src="image" alt="Card image" class="ui-card__image " />
      </div>
      <slot />
    </div>

    <!-- Footer -->
    <div  v-if="$slots.footer">
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
const sizeClass = computed<string>(() => `ui-card__${props.size}`)

const headerClass = computed<string>(() => `ui-card__header__${props.size}`)

const bodyClass = computed<string>(() => `ui-card__body__${props.size}`)

const buttonClass = computed<string>(() => `ui-card__button__${props.size}`)

const buttonColorClass = computed<string>(() => `ui-card__button__${props.buttonColor}`)

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
@reference "~/assets/css/main.css";

.ui-card {
  @apply rounded-lg bg-white transition-all duration-300;
}

.ui-card__header {
  @apply flex flex-row justify-between items-center border-b border-gray-tint-400;
}

.ui-card__header__icon {
  @apply cursor-pointer p-0.5  text-gray-shade-800 ;
}
/* shadow */

.ui-card__xl {
  @apply shadow-xs hover:shadow-lg;
}

.ui-card__lg {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card__md {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card__sm {
  @apply shadow-2xs hover:shadow-sm;
}

/* size header */
.ui-card__xl > .ui-card__header {
  @apply pb-4;
}

.ui-card__lg > .ui-card__header {
  @apply pb-3;
}

.ui-card__md > .ui-card__header {
  @apply pb-3;
}

.ui-card__sm > .ui-card__header {
  @apply pb-2;
}

/* size body */

.ui-card__xl > .ui-card__body {
  @apply py-6;
}

.ui-card__lg > .ui-card__body {
  @apply py-4;
}

.ui-card__md > .ui-card__body {
  @apply py-4;
}

.ui-card__sm > .ui-card__body {
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
.ui-card____header____sm {
  @apply text-sm font-bold;
}
.ui-card____header____md {
  @apply text-base font-bold;
}
.ui-card____header____lg {
  @apply text-h6 font-semibold;
}
.ui-card____header____xl {
  @apply text-h5 font-semibold;
}

/* Body font sizes */
.ui-card__body__sm {
  @apply text-2xs;
}
.ui-card__body__md {
  @apply text-xs;
}
.ui-card__body__lg {
  @apply text-sm;
}
.ui-card__body__xl {
  @apply text-base;
}

.ui-card__sm {
  @apply p-2;
}
.ui-card__md {
  @apply p-3;
}
.ui-card__lg {
  @apply p-4;
}
.ui-card__xl {
  @apply p-4;
}

.ui-card__button__primary {
  @apply bg-primary  text-white;
}
.ui-card__button__success {
  @apply bg-success  text-white;
}
.ui-card__button__warning {
  @apply bg-warning  text-white;
}
.ui-card__button__anger {
  @apply bg-error  text-white;
}
.ui-card__button__info {
  @apply bg-info  text-white;
}
.ui-card__button__gray {
  @apply bg-gray  text-white;
}

.ui-card__image {
  @apply w-full h-auto rounded-t-lg object-cover ;
  max-height: 200px; /* or any value you prefer */
  display: block;
}
</style>
