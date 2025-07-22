<template>
  <div
    :class="[
      'ui-input-pin-code-container',
      `ui-input-pin-code-container-${props.size}`,
      gap_class,
      { 'ui-input-pin-code-container-focused': focused, 'ui-input-pin-code-container-disabled': disabled }
    ]"
  >

    <input v-for="i in length" min="0" :key="i"  type="number" class="ui-input-pin-code no-spinner" :class="`${size_class} ${disabled_class} ${element_focused_class[i-1]}`" :disabled="disabled" maxlength="1" :id="local_ids[i-1]" @input="(e: any) => onUpdate(i-1, e)" @focus="(e: any) => onFocus(i-1)" @blur="(e: any) => onBlur(i-1)" />

  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  default_value: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'sm', // valid values: sm, md, lg, xl
    validator: (value: string) => ['xs','sm', 'md', 'lg', 'xl'].includes(value)
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

const gap_class = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'gap-2'
    case 'xl':
      return 'gap-2.5'
    default:
      return 'gap-1.5'
  }
})

const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'submit'): void
}>()

const model = ref<string>(props.default_value)

const focused = ref<boolean>(false)

const elemet_focused = ref<Record<number, boolean>>({})

const local_ids = ref<Record<number, string>>({})

const element_focused_class = computed<Record<number, string>>(() => {

  const data: Record<number, string> = {}

  for( let i = 0; i < props.length; i++ )
    data[i] = elemet_focused.value[i] ? 'ui-input-pin-code-element-focused' : ''

  return data
})

const disabled_class = computed<string>(() => props.disabled ? 'ui-input-pin-code-disabled' : '')

const size_class = computed<string>(() => `ui-input-pin-code-${props.size}`)

onMounted(() => {

  for( let i = 0; i < props.length; i++ ) {

    local_ids.value[i] = Math.random().toString(36).substring(2, 15) + `ui-input-pin-code-${i}`

    elemet_focused.value[i] = false
  }
})

const onUpdate = (index: number, e: any) => {

  model.value = model.value.slice(0, index) + e.target.value + model.value.slice(index + 1)

  emit('update', model.value)

  if( index == props.length - 1 ) {

    const current_input = document.getElementById(local_ids.value[index]) as HTMLInputElement
    if( current_input )
      current_input.blur()

    emit('submit')
  } else {
    
    // focus on next input 
    const next_input = document.getElementById(local_ids.value[index + 1]) as HTMLInputElement
    if( next_input ) {
      next_input.focus()
    }
  }
}

const onFocus = (index: number) => {

  elemet_focused.value[index] = true
  focused.value = true
}

const onBlur = (index: number) => {

  elemet_focused.value[index] = false
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