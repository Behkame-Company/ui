<!--
  Pin Code Input Component Usage Guide:

  PARENT COMPONENT USAGE:

    <UiPinCodeInput
      v-model="largePin"
      size="xl"
      :length="8"
      @update="handleLargePinUpdate"
      @submit="handleLargePinSubmit"
    />
  
  
  PROPS:
  - default_value: string (default: '') - Default pin code value
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Input size
  - length: number (default: 4) - Number of pin code digits
  - disabled: boolean (default: false) - Disable the pin code input
  
  EVENTS:
  - update: Emitted when pin code value changes
  - submit: Emitted when all digits are filled (auto-submit)
-->

<template>
  <div
    :class="[
      'ui-pin-code__container',
      `ui-pin-code__container__${props.size}`,
      gapClass,
      { 'ui-pin-code__container__focused': focused, 'ui-pin-code__container__disabled': disabled }
    ]"
  >
    <input 
      v-for="i in length" 
      min="0" 
      :key="i"  
      type="number" 
      class="ui-pin-code no-spinner" 
      :class="`${sizeClass} ${disabledClass} ${elementFocusedClass[i-1]}`" 
      :disabled="disabled" 
      maxlength="1" 
      :id="localIds[i-1]" 
      @input="(e: any) => onUpdate(i-1, e)" 
      @focus="(e: any) => onFocus(i-1)" 
      @blur="(e: any) => onBlur(i-1)" 
    />
  </div>
</template>

<script setup lang="ts">

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  default_value: {
    type: String,
    default: '', // Default pin code value
  },
  size: {
    type: String,
    default: 'sm', // valid values: xs, sm, md, lg, xl
    validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  length: {
    type: Number,
    default: 4, // default length of pin code
  },
  disabled: {
    type: Boolean,
    default: false, // pass this variable true if you want the input to get disabled
  },
})

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'submit'): void
}>()

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const model = ref<string>(props.default_value)
const focused = ref<boolean>(false)
const elemetFocused = ref<Record<number, boolean>>({})
const localIds = ref<Record<number, string>>({})

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const gapClass = computed<string>(() => {
  switch (props.size) {
    case 'lg':
      return 'gap-2'
    case 'xl':
      return 'gap-2.5'
    default:
      return 'gap-1.5'
  }
})

const elementFocusedClass = computed<Record<number, string>>(() => {
  const data: Record<number, string> = {}
  for (let i = 0; i < props.length; i++) {
    data[i] = elemetFocused.value[i] ? 'ui-pin-code-element__focused' : ''
  }
  return data
})

const disabledClass = computed<string>(() => props.disabled ? 'ui-pin-code__disabled' : '')

const sizeClass = computed<string>(() => `ui-pin-code__${props.size}`)

// ============================================================================
// 6. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================
onMounted(() => {
  for (let i = 0; i < props.length; i++) {
    localIds.value[i] = Math.random().toString(36).substring(2, 15) + `ui-pin-code-${i}`
    elemetFocused.value[i] = false
  }
})



// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Handle input value update
 * Updates the model and navigates to next input or submits
 */
const onUpdate = (index: number, e: any): void => {
  model.value = model.value.slice(0, index) + e.target.value + model.value.slice(index + 1)
  emit('update', model.value)

  if (index == props.length - 1) {
    const currentInput = document.getElementById(localIds.value[index]) as HTMLInputElement
    if (currentInput) {
      currentInput.blur()
    }
    emit('submit')
  } else {
    // focus on next input 
    const nextInput = document.getElementById(localIds.value[index + 1]) as HTMLInputElement
    if (nextInput) {
      nextInput.focus()
    }
  }
}

/**
 * Handle input focus event
 * Sets the focused state for the specific input
 */
const onFocus = (index: number): void => {
  elemetFocused.value[index] = true
  focused.value = true
}

/**
 * Handle input blur event
 * Clears the focused state for the specific input
 */
const onBlur = (index: number): void => {
  elemetFocused.value[index] = false
  focused.value = false
}
</script>
<style>

@reference "assets/css/main.css";

.ui-pin-code__container {
  @apply flex w-[max-content] items-center border border-gray-tint-650 transition-all overflow-hidden rounded-sm;
}
.ui-pin-code__container__xs {
  @apply py-2 px-1.5; /* 8px 6px */
}
.ui-pin-code__container__sm {
  @apply py-2.5 px-2; /* 10px 8px */
}
.ui-pin-code__container__md {
  @apply py-3 px-2.5; /* 12px 10px */
}
.ui-pin-code__container__lg {
  @apply py-3 px-3; /* 12px 12px */
}
.ui-pin-code__container__xl {
  @apply py-4 px-4; /* 16px 16px */
}
.ui-pin-code__container__disabled {
  @apply opacity-50 cursor-not-allowed ;
}

.ui-pin-code__container__focused {
  @apply border-1 border-primary;
}

.ui-pin-code {
    @apply ring-0 focus:ring-0 text-gray-shade-800 placeholder:text-gray-shade-400  transition-all text-center border-b-1 border-gray-shade-400;    
}

.ui-pin-code__focused {
    @apply text-gray-shade-800 ;              
}

.ui-pin-code__disabled {
  @apply cursor-not-allowed ;
}

.ui-pin-code-element__focused{
  @apply text-gray-shade-800 border-b-1 border-primary;
}

/* ===== size ===== */

.ui-pin-code__xs {
  @apply w-4.5 pb-1  text-2xs; 
}

.ui-pin-code__sm {
  @apply w-5 pb-1 text-xs ;
}

.ui-pin-code__md {
  @apply w-6  pb-1  text-sm; 
}

.ui-pin-code__lg {
  @apply w-6  pb-1  text-base; 
}

.ui-pin-code__xl {
  @apply w-6 pb-1 text-h6; /* 8px horizontal space */
}

/* Hide spinners/arrows in number input for Chrome, Safari, Edge, Opera */
input[type="number"].no-spinner::-webkit-inner-spin-button,
input[type="number"].no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide spinners/arrows in number input for Firefox */
input[type="number"].no-spinner {
  -moz-appearance: textfield;
}

</style>