<template>
  <div class="ui-input-pin-code-container" :class="{ 'ui-input-pin-code-container-focused': focused, 'ui-input-pin-code-container-disabled': disabled }" >

    <input v-for="i in length" :key="i" type="text" class="ui-input-pin-code" :class="`${size_class} ${disabled_class} ${element_focused_class[i-1]}`" :disabled="disabled" maxlength="1" :id="local_ids[i-1]" v-model="local_data[i-1]" @input="(e: any) => onUpdate(i-1, e)" @focus="(e: any) => onFocus(i-1)" @blur="(e: any) => onBlur(i-1)" />

  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  size: {
    type: String,
    default: 'sm', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  length: {
    type: Number,
    default: 4, // default length of pin code
  },
  default_value: {
    type: String,
    default: '', // default value to put in input 
  },
  disabled: {
    type: Boolean, 
    default: false, // pass this variable true if you want the input to get disabled 
  }, 
})

const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'submit'): void
}>()

const local_data = ref< Record<number, string> >({})

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

    local_data.value[i] = ''

    local_ids.value[i] = Math.random().toString(36).substring(2, 15) + `ui-input-pin-code-${i}`

    elemet_focused.value[i] = false
  }
})

const onUpdate = (index: number, e: any) => {

  local_data.value[index] = e.target.value

  emit('update', Object.values(local_data.value).join(''))

  if( index == props.length - 1 ) {

    const current_input = document.getElementById(local_ids.value[index]) as HTMLInputElement
    if( current_input )
      current_input.blur()

    emit('submit')
  } else {
    
    // focus on next input 
    const next_input = document.getElementById(local_ids.value[index + 1]) as HTMLInputElement
    if( next_input ) {
      local_data.value[index + 1] = ''
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
  @apply overflow-hidden flex justify-center items-center border border-tint-600 rounded-sm transition-all ;
}

.ui-input-pin-code-container-disabled {
  @apply opacity-50 cursor-not-allowed ;
}

.ui-input-pin-code-container-focused {
  @apply border-1 border-primary;
}

.ui-input-pin-code {
    @apply ring-0 focus:ring-0 text-shade-600 placeholder:text-tint-700 transition-all text-center border-b-1 border-tint-600;    
}

.ui-input-pin-code-focus {
    @apply text-shade-900 ;              
}

.ui-input-pin-code-disabled {
  @apply cursor-not-allowed ;
}

.ui-input-pin-code-element-focused{
  @apply text-shade-900 border-b-1 border-primary;
}

/* ===== size ===== */

.ui-input-pin-code-sm {
  @apply w-8 mx-2 pb-1 mb-2 mt-1.5 text-sm; 
}

.ui-input-pin-code-md {
  @apply w-10 mx-2 pb-1 mb-2 mt-1.5 text-base; 
}

.ui-input-pin-code-lg {
  @apply w-12 mx-2.5 pb-1.5 mb-2.5 mt-2 text-h6; 
}

.ui-input-pin-code-xl {
  @apply w-12 mx-2.5 pb-2 mb-3 mt-2.5 text-h6; 
}

</style>