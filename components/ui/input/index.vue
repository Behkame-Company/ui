<template>
  <div class="ui-input-container" :class="{ 'ui-input-container-focused': focused, 'ui-input-container-disabled': disabled }" >

    <div class="ui-input-prefix-icon" v-if="prefix_icon" :class="{ 'ui-input-prefix-icon-pointer': prefix_callback != null, 'ui-input-prefix-icon-disabled': disabled, 'ui-input-prefix-icon-focused': focused }" :disabled="disabled">
      <Icon :name="prefix_icon" :size="icon_size_class" />
    </div>
    
    <input type="text" class="ui-input" :class="`${size_class} ${ focused ? 'ui-input-focus' : ''} ${ disabled ? 'ui-input-disabled' : ''}`" :name="name" :placeholder="placeholder" :disabled="disabled" v-model="local_data" @focus="onFocus" @blur="onBlur" />

    <div class="ui-input-suffix-icon" v-if="suffix_icon" :class="{ 'ui-input-suffix-icon-pointer': suffix_callback != null, 'ui-input-suffix-icon-disabled': disabled, 'ui-input-suffix-icon-focused': focused }" :disabled="disabled">
        <Icon :name="suffix_icon" :size="icon_size_class" />
    </div>

  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  name: {
    type: String,
    default: ''  // input name property 
  },
  placeholder: {
    type: String,
    default: '' // place holder to show in input 
  },
  size: {
    type: String,
    default: 'sm', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  prefix_icon: {
    type: String,
    default: '', // choose icon name form iconify, example: `uil:bolt-alt`
  },
  prefix_callback: {
    type: Function || null,
    default: null,  // if you put some callback value it will get new style for prefix icon
  },
  suffix_icon: {
    type: String,
    default: '', // choose icon name form iconify, example: `uil:bolt-alt`
  },
  suffix_callback: {
    type: Function || null,
    default: null,  // if you put some callback value it will get new style for suffix icon
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
}>()

const local_data = ref<string>("")

const focused = ref<boolean>(false)

const size_class = computed<string>(() => `ui-input-${props.size}`)

const icon_size_class = computed<string>(() => {

  switch (props.size) {
    case 'sm':
      return "14px"
    case 'md':
      return "16px"
    case 'lg':
      return "18px"
    case 'xl':
      return "20px"
  }

  return "0px"
})

onMounted(() => local_data.value = props.default_value)

watch(local_data, (val, prev) => {

  if( prev != val ) 
    emit('update', val)
})

const onFocus = () => focused.value = true

const onBlur = () => focused.value = false

</script>
<style>

@reference "assets/css/main.css";

.ui-input-container {
  @apply overflow-hidden flex justify-center items-center border border-tint-600 rounded-sm transition-all ;
}

.ui-input-container-disabled {
  @apply opacity-50 ;
}

.ui-input-container-focused {
  @apply border-1 border-primary;
}

.ui-input-prefix-icon {
  @apply flex justify-center items-center text-shade-100 p-2.5 transition-all ;
}

.ui-input-prefix-icon-focused {
  @apply text-primary ;
}

.ui-input-prefix-icon-pointer {
  @apply bg-tint-600 hover:bg-primary hover:text-white cursor-pointer ;
}

.ui-input-prefix-icon-pointer.ui-input-prefix-icon-disabled {
  @apply hover:bg-tint-600 hover:text-shade-100 cursor-not-allowed ;
}

.ui-input-suffix-icon {
  @apply flex justify-center items-center text-shade-100 p-2.5 transition-all ;
}

.ui-input-suffix-icon-focused {
  @apply text-primary ;
}

.ui-input-suffix-icon-pointer {
  @apply bg-tint-600 hover:bg-primary hover:text-white cursor-pointer ;
}

.ui-input-suffix-icon-pointer.ui-input-suffix-icon-disabled {
  @apply hover:bg-tint-600 hover:text-shade-100 cursor-not-allowed ;
}

.ui-input {
    @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-shade-600 placeholder:text-tint-700 transition-all ;              
}

.ui-input-focus {
    @apply text-shade-900 ;              
}

.ui-input-disabled {
  @apply cursor-not-allowed ;
}

/* ===== size ===== */

.ui-input-sm {
  @apply py-2 px-3 text-sm placeholder:text-sm; 
}

.ui-input-md {
  @apply py-2 px-3 text-base placeholder:text-base; 
  line-height: 18px;
}

.ui-input-lg {
  @apply py-2 px-3 text-h6 placeholder:text-h6; 
  line-height: 20px;
}

.ui-input-xl {
  @apply py-3 px-4 text-h6 placeholder:text-h6; 
  line-height: 17px;
}

/* TODO : input foces prefix/suffix icon fill bg blue-100  */

</style>