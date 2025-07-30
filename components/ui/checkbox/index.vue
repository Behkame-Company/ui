<!--
  Checkbox Component Usage Guide:
  
  A customizable checkbox component that supports:
  - Multiple sizes (sm, md, lg)
  - Disabled state
  - Custom title/label
  - Two-way data binding with v-model
  - Visual feedback states
  - Icon integration
  - Responsive design
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiCheckbox
      v-model="isChecked"
      title="Accept terms and conditions"
    />
    
    <UiCheckbox
      v-model="newsletter"
      title="Subscribe to newsletter"
      size="lg"
    />
    
    <UiCheckbox
      v-model="disabledOption"
      title="This option is disabled"
      :disabled="true"
    />
    
    <UiCheckbox
      v-model="smallOption"
      title="Small checkbox option"
      size="sm"
    />
    
    <UiCheckbox
      v-model="customOption"
      title="Custom option with longer text"
      size="md"
    />
    
    <div class="space-y-2">
      <UiCheckbox
        v-model="options.option1"
        title="Option 1"
        size="md"
      />
      <UiCheckbox
        v-model="options.option2"
        title="Option 2"
        size="md"
      />
      <UiCheckbox
        v-model="options.option3"
        title="Option 3"
        size="md"
      />
    </div>
  </template>
  
  <script setup>
  const isChecked = ref(false)
  const newsletter = ref(true)
  const disabledOption = ref(false)
  const smallOption = ref(false)
  const customOption = ref(false)
  
  const options = ref({
    option1: false,
    option2: true,
    option3: false
  })
  
  // Watch for changes
  watch(isChecked, (newValue) => {
    console.log('Checkbox changed:', newValue)
  })
  </script>
  
  PROPS:
  - title: string (default: '') - Checkbox label text
  - size: 'sm' | 'md' | 'lg' (default: 'sm') - Checkbox size
  - disabled: boolean (default: false) - Whether checkbox is disabled
  
  EVENTS:
  - No custom events (uses v-model internally)
  
  FEATURES:
  - Two-way data binding with v-model
  - Multiple sizes
  - Disabled state
  - Visual feedback
  - Icon integration
  - Responsive design
-->

<template>
  <div class="ui-checkbox">
    <input
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      class="hidden"
    />
    <label
      :class="[disabledClass]"
      class="ui-checkbox-input"
      @click.prevent="toggleCheckbox"
    >
      <div class="p-0.5">
        <span
          class="checkbox-border"
          :class="[checkboxClass, sizeClass, { 'border-1': !model }]"
        >
          <VsxIcon
            v-if="model"
            iconName="TickSquare"
            class="ui-checkbox-icon-color"
            :size="sizeIconClass"
            type="bold"
          />
        </span>
      </div>

      <span :class="[textSizeClass]" class="ui-checkbox-title">
        {{ title }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  title: {
    type: String,
    default: "", // Checkbox label text
  },
  size: {
    type: String,
    default: "sm", // Checkbox size
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // Whether checkbox is disabled
  },
})

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const model = defineModel<boolean>({ required: true })

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const checkboxClass = computed<string>(() => {
  return model.value
    ? "border-none"
    : "border-1 border-gray-shade-50 bg-transparent"
})

const disabledClass = computed<{ 'ui-checkbox-disabled': boolean }>(() => ({
  "ui-checkbox-disabled": props.disabled,
}))

const sizeClass = computed<string>(() => `ui-checkbox-${props.size}`)

const sizeIconClass = computed<number>(() => {
  switch (props.size) {
    case "lg":
      return 24
    case "md":
      return 20
    case "sm":
      return 18
    default:
      return 20
  }
})

const textSizeClass = computed<string>(() => `ui-checkbox-text-${props.size}`)

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const toggleCheckbox = (): void => {
  if (!props.disabled) {
    model.value = !model.value
  }
}
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-checkbox {
  @apply flex items-center gap-8;
}

.ui-checkbox-input {
  @apply cursor-pointer inline-flex items-center gap-2;
}

.checkbox-border {
  @apply flex items-center justify-center border-1 border-gray-shade-50 rounded-md;
}
.ui-checkbox-lg .checkbox-border {
  @apply w-6 h-6;
}
.ui-checkbox-md .checkbox-border {
  @apply w-5 h-5;
}
.ui-checkbox-sm .checkbox-border {
  @apply w-4.5 h-4.5;
}

.ui-checkbox-title {
  @apply text-gray text-nowrap;
}

.ui-checkbox-lg {
  @apply w-6 h-6;
}
.ui-checkbox-md {
  @apply w-5 h-5;
}
.ui-checkbox-sm {
  @apply w-4.5 h-4.5;
}

.ui-checkbox-text-lg {
  @apply text-base font-medium;
}
.ui-checkbox-text-md {
  @apply text-sm font-medium;
}
.ui-checkbox-text-sm {
  @apply text-2xs font-medium;
}

.ui-checkbox-disabled {
  @apply opacity-50 cursor-not-allowed;
}
.ui-checkbox-icon-color {
  @apply text-primary;
}
</style>
