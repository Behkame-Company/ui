<!--
  Checkbox Component Usage Guide:
  
  PARENT COMPONENT USAGE:
 
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
  
  PROPS:
  - title: string (default: '') - Checkbox label text
  - size: 'sm' | 'md' | 'lg' (default: 'sm') - Checkbox size
  - disabled: boolean (default: false) - Whether checkbox is disabled
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
      class="ui-checkbox__input"
      @click.prevent="toggleCheckbox"
    >
      <div class="p-0.5">
        <span
          class="ui-checkbox__border"
          :class="[checkboxClass, sizeClass, { 'border-1': !model }]"
        >
          <VsxIcon
            v-if="model"
            iconName="TickSquare"
            class="ui-checkbox__icon__color"
            :size="sizeIconClass"
            type="bold"
          />
        </span>
      </div>

      <span :class="[textSizeClass]" class="ui-checkbox__title">
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

const sizeClass = computed<string>(() => `ui-checkbox__${props.size}`)

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

const textSizeClass = computed<string>(() => `ui-checkbox__text__${props.size}`)

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

.ui-checkbox__input {
  @apply cursor-pointer inline-flex items-center gap-2;
}

.ui-checkbox__border {
  @apply flex items-center justify-center border-1 border-gray-shade-50 rounded-md;
}
.ui-checkbox__lg .ui-checkbox-__border {
  @apply w-6 h-6;
}
.ui-checkbox__md .ui-checkbox__border {
  @apply w-5 h-5;
}
.ui-checkbox__sm .ui-checkbox__border {
  @apply w-4.5 h-4.5;
}

.ui-checkbox__title {
  @apply text-gray text-nowrap;
}

.ui-checkbox__lg {
  @apply w-6 h-6;
}
.ui-checkbox__md {
  @apply w-5 h-5;
}
.ui-checkbox__sm {
  @apply w-4.5 h-4.5;
}

.ui-checkbox__text__lg {
  @apply text-base font-medium;
}
.ui-checkbox__text__md {
  @apply text-sm font-medium;
}
.ui-checkbox__text__sm {
  @apply text-2xs font-medium;
}

.ui-checkbox-disabled {
  @apply opacity-50 cursor-not-allowed;
}
.ui-checkbox__icon__color {
  @apply text-primary;
}
</style>
