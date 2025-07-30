<!--
  Password Input Component Usage Guide:
  
  A secure password input component that supports:
  - Show/hide password toggle
  - Multiple sizes (sm, md, lg, xl)
  - Focus and disabled states
  - Custom placeholder text
  - v-model support
  - Responsive design
  - Eye icon toggle functionality
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic password input --&gt;
    &lt;UiPasswordInput
      v-model="password"
      placeholder="Enter your password"
    /&gt;
    
    &lt;!-- Password input with custom name --&gt;
    &lt;UiPasswordInput
      v-model="userPassword"
      name="userPassword"
      placeholder="Enter password"
      size="lg"
    /&gt;
    
    &lt;!-- Disabled password input --&gt;
    &lt;UiPasswordInput
      v-model="disabledPassword"
      placeholder="Password (disabled)"
      :disabled="true"
      size="md"
    /&gt;
    
    &lt;!-- Small password input --&gt;
    &lt;UiPasswordInput
      v-model="smallPassword"
      placeholder="Quick password"
      size="sm"
    /&gt;
    
    &lt;!-- Extra large password input --&gt;
    &lt;UiPasswordInput
      v-model="largePassword"
      placeholder="Enter your secure password"
      size="xl"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const password = ref('')
  const userPassword = ref('')
  const disabledPassword = ref('')
  const smallPassword = ref('')
  const largePassword = ref('')
  &lt;/script&gt;
  
  PROPS:
  - name: string (default: '') - Input name property
  - placeholder: string (default: '') - Placeholder text to show in input
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Input size
  - disabled: boolean (default: false) - Disable the input
  
  EVENTS:
  - update:modelValue: Emitted when password value changes (v-model)
  
  FEATURES:
  - Show/hide password toggle with eye icon
  - v-model support
  - Responsive sizing
  - Focus and disabled states
  - Customizable placeholder
-->

<template>
  <div
    class="ui-input-password-container"
    :class="{
      'ui-input-password-container-focused': focused,
      'ui-input-password-container-disabled': disabled,
    }"
  >
    <input
      :type="inputType"
      class="ui-input-password"
      :class="`${sizeClass} ${focused ? 'ui-input-password-focus' : ''} ${
        disabled ? 'ui-input-password-disabled' : ''
      }`"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      class="ui-input-password-suffix-icon"
      :class="{ 'ui-input-password-suffix-icon-disabled': disabled, 'ui-input-password-suffix-icon-focused': focused }"
      :disabled="disabled"
      @click="toggleShowPassword"
    >
      <VsxIcon :iconName="iconName" :size="iconSizeClass" type="linear" />
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  name: {
    type: String,
    default: "", // input name property
  },
  placeholder: {
    type: String,
    default: "", // place holder to show in input
  },
  size: {
    type: String,
    default: "md", // valid values: sm, md, lg, xl
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // pass this variable true if you want the input to get disabled
  },
})

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const model = defineModel<string>({
  required: true,
})

const showPassword = ref<boolean>(false)
const focused = ref<boolean>(false)

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const sizeClass = computed<string>(() => `ui-input-${props.size}`)

const inputType = computed<string>(() =>
  showPassword.value ? "text" : "password"
)

const iconName = computed<string>(() =>
  showPassword.value ? "Eye" : "EyeSlash"
)

const iconSizeClass = computed<string>(() => {
  switch (props.size) {
    case "sm":
      return "14px"
    case "md":
      return "16px"
    case "lg":
      return "18px"
    case "xl":
      return "20px"
  }
  return "0px"
})


// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Toggle password visibility
 * Switches between showing and hiding the password
 */
const toggleShowPassword = (): void => {
  if (props.disabled) return
  showPassword.value = !showPassword.value
}

/**
 * Handle input focus event
 * Sets the focused state to true
 */
const onFocus = (): void => {
  focused.value = true
}

/**
 * Handle input blur event
 * Sets the focused state to false
 */
const onBlur = (): void => {
  focused.value = false
}
</script>
<style>
@reference "assets/css/main.css";

.ui-input-password-container {
  @apply overflow-hidden flex justify-center items-center pl-3 pr-2 border border-gray-tint-650 rounded-sm transition-all;
}

.ui-input-password-container-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-input-password-container-focused {
  @apply border-1 border-primary text-gray-shade-800;
}

.ui-input-password {
  @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-gray-shade-400 placeholder:text-gray-shade-400 transition-all;
}
.ui-input-password-focus {
  @apply text-gray-shade-800 placeholder:text-gray-shade-800;
}
.ui-input-password:disabled {
  @apply cursor-not-allowed;
}

/* ===== size ===== */

.ui-input-password-sm {
  @apply py-3 px-3 text-sm placeholder:text-sm;
}

.ui-input-password-md {
  @apply px-3 py-3.25 text-base placeholder:text-base;
  /* line-height: 18px; */
}

.ui-input-password-lg {
  @apply py-4 px-3 text-h6 placeholder:text-h6;
  /* line-height: 20px; */
}

.ui-input-password-xl {
  @apply py-4.5 px-3 text-h6 placeholder:text-h6;
  /* line-height: 17px; */
}

/* ===== icon ===== */

.ui-input-password-suffix-icon {
  @apply flex justify-center items-center text-gray-shade-400   transition-all cursor-pointer;
}

.ui-input-password-suffix-icon-focused {
  @apply  text-gray-shade-800;
}

.ui-input-password-suffix-icon-disabled {
  @apply hover:text-gray-shade-400 cursor-not-allowed;
}
</style>
