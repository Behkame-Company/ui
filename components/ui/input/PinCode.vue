<!--
  Pin Code Input Component Usage Guide:
  
  A customizable pin code input component that supports:
  - Multiple input lengths (configurable)
  - Multiple sizes (xs, sm, md, lg, xl)
  - Auto-focus navigation between inputs
  - Focus and disabled states
  - Custom default values
  - Submit on completion
  - Responsive design
  - Number-only input validation
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic 4-digit pin code --&gt;
    &lt;UiPinCodeInput
      v-model="pinCode"
      @update="handlePinUpdate"
      @submit="handlePinSubmit"
    /&gt;
    
    &lt;!-- 6-digit pin code with custom size --&gt;
    &lt;UiPinCodeInput
      v-model="sixDigitPin"
      :length="6"
      size="lg"
      @update="handleSixDigitUpdate"
      @submit="handleSixDigitSubmit"
    /&gt;
    
    &lt;!-- Small pin code with default value --&gt;
    &lt;UiPinCodeInput
      v-model="smallPin"
      size="sm"
      default_value="1234"
      @update="handleSmallPinUpdate"
      @submit="handleSmallPinSubmit"
    /&gt;
    
    &lt;!-- Disabled pin code --&gt;
    &lt;UiPinCodeInput
      v-model="disabledPin"
      :disabled="true"
      @update="handleDisabledPinUpdate"
      @submit="handleDisabledPinSubmit"
    /&gt;
    
    &lt;!-- Extra large pin code --&gt;
    &lt;UiPinCodeInput
      v-model="largePin"
      size="xl"
      :length="8"
      @update="handleLargePinUpdate"
      @submit="handleLargePinSubmit"
    /&gt;
  &lt;/template&gt;
  
  &lt;script setup&gt;
  const pinCode = ref('')
  const sixDigitPin = ref('')
  const smallPin = ref('')
  const disabledPin = ref('')
  const largePin = ref('')
  
  const handlePinUpdate = (value: string) =&gt; {
    console.log('Pin updated:', value)
  }
  
  const handlePinSubmit = () =&gt; {
    console.log('Pin submitted:', pinCode.value)
    // Verify pin logic
  }
  
  const handleSixDigitUpdate = (value: string) =&gt; {
    console.log('6-digit pin updated:', value)
  }
  
  const handleSixDigitSubmit = () =&gt; {
    console.log('6-digit pin submitted:', sixDigitPin.value)
  }
  
  const handleSmallPinUpdate = (value: string) =&gt; {
    console.log('Small pin updated:', value)
  }
  
  const handleSmallPinSubmit = () =&gt; {
    console.log('Small pin submitted:', smallPin.value)
  }
  
  const handleDisabledPinUpdate = (value: string) =&gt; {
    console.log('Disabled pin updated:', value)
  }
  
  const handleDisabledPinSubmit = () =&gt; {
    console.log('Disabled pin submitted:', disabledPin.value)
  }
  
  const handleLargePinUpdate = (value: string) =&gt; {
    console.log('Large pin updated:', value)
  }
  
  const handleLargePinSubmit = () =&gt; {
    console.log('Large pin submitted:', largePin.value)
  }
  &lt;/script&gt;
  
  PROPS:
  - default_value: string (default: '') - Default pin code value
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') - Input size
  - length: number (default: 4) - Number of pin code digits
  - disabled: boolean (default: false) - Disable the pin code input
  
  EVENTS:
  - update: Emitted when pin code value changes
  - submit: Emitted when all digits are filled (auto-submit)
  
  FEATURES:
  - Auto-focus navigation between inputs
  - Number-only input validation
  - Auto-submit on completion
  - Responsive sizing
  - Focus and disabled states
  - Customizable length
-->

<template>
  <div
    :class="[
      'ui-input-pin-code-container',
      `ui-input-pin-code-container-${props.size}`,
      gapClass,
      { 'ui-input-pin-code-container-focused': focused, 'ui-input-pin-code-container-disabled': disabled }
    ]"
  >
    <input 
      v-for="i in length" 
      min="0" 
      :key="i"  
      type="number" 
      class="ui-input-pin-code no-spinner" 
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
    data[i] = elemetFocused.value[i] ? 'ui-input-pin-code-element-focused' : ''
  }
  return data
})

const disabledClass = computed<string>(() => props.disabled ? 'ui-input-pin-code-disabled' : '')

const sizeClass = computed<string>(() => `ui-input-pin-code-${props.size}`)

// ============================================================================
// 6. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================
onMounted(() => {
  for (let i = 0; i < props.length; i++) {
    localIds.value[i] = Math.random().toString(36).substring(2, 15) + `ui-input-pin-code-${i}`
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

.ui-input-pin-code-container {
  @apply flex w-[max-content] items-center border border-gray-tint-650 transition-all overflow-hidden rounded-sm;
}
.ui-input-pin-code-container-xs {
  @apply py-2 px-1.5; /* 8px 6px */
}
.ui-input-pin-code-container-sm {
  @apply py-2.5 px-2; /* 10px 8px */
}
.ui-input-pin-code-container-md {
  @apply py-3 px-2.5; /* 12px 10px */
}
.ui-input-pin-code-container-lg {
  @apply py-3 px-3; /* 12px 12px */
}
.ui-input-pin-code-container-xl {
  @apply py-4 px-4; /* 16px 16px */
}
.ui-input-pin-code-container-disabled {
  @apply opacity-50 cursor-not-allowed ;
}

.ui-input-pin-code-container-focused {
  @apply border-1 border-primary;
}

.ui-input-pin-code {
    @apply ring-0 focus:ring-0 text-gray-shade-800 placeholder:text-gray-shade-400  transition-all text-center border-b-1 border-gray-shade-400;    
}

.ui-input-pin-code-focus {
    @apply text-gray-shade-800 ;              
}

.ui-input-pin-code-disabled {
  @apply cursor-not-allowed ;
}

.ui-input-pin-code-element-focused{
  @apply text-gray-shade-800 border-b-1 border-primary;
}

/* ===== size ===== */

.ui-input-pin-code-xs {
  @apply w-4.5 pb-1  text-2xs; 
}

.ui-input-pin-code-sm {
  @apply w-5 pb-1 text-xs ;
}

.ui-input-pin-code-md {
  @apply w-6  pb-1  text-sm; 
}

.ui-input-pin-code-lg {
  @apply w-6  pb-1  text-base; 
}

.ui-input-pin-code-xl {
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