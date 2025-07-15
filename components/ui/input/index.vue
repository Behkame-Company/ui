<template>
  <div class="ui-input-container" :class="{ 'ui-input-container-focused': focused, 'ui-input-container-disabled': disabled }" >

    <div
  class="ui-input-prefix-icon"
  v-if="prefix_icon"
  :class="[
    prefix_callback ? 'ui-input-prefix-icon-pointer' : '',
    disabled ? 'ui-input-prefix-icon-disabled' : '',
    focused ? (prefix_callback ? 'ui-input-prefix-icon-pointer-focused' : 'ui-input-prefix-icon-focused') : ''
  ]"
  :disabled="disabled"
>
  <Icon :name="prefix_icon" :size="icon_size_class" />
</div>
    
    <input
  type="text"
  class="ui-input"
  :class="[
    size_class,
    !prefix_icon ? 'pl-2' : 'pl-0',
    focused ? 'ui-input-focus' : '',
    disabled ? 'ui-input-disabled' : ''
  ]"
  :name="name"
  :placeholder="placeholder"
  :disabled="disabled"
  v-model="model"
  @focus="onFocus"
  @blur="onBlur"
/>

    <div
  class="ui-input-suffix-icon"
  v-if="suffix_icon"
  :class="[
    suffix_callback ? 'ui-input-suffix-icon-pointer' : '',
    disabled ? 'ui-input-suffix-icon-disabled' : '',
    focused ? (suffix_callback ? 'ui-input-suffix-icon-pointer-focused' : 'ui-input-suffix-icon-focused') : ''
  ]"
  :disabled="disabled"
>
  <Icon :name="suffix_icon" :size="icon_size_class" />
</div>

  </div>
</template>
<script setup lang="ts">

const model = defineModel<string>({
  required: true
})

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
    default: 'md', // valid values: sm, md, lg, xl
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
  disabled: {
    type: Boolean, 
    default: false, // pass this variable true if you want the input to get disabled 
  }, 
})

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

const onFocus = () => focused.value = true

const onBlur = () => focused.value = false

</script>
<style>

@reference "assets/css/main.css";

.ui-input-container {
  @apply overflow-hidden gap-1  flex justify-center  border border-gray-tint-600 rounded-sm transition-all ;
}

.ui-input-container-disabled {
  @apply opacity-50 ;
}

.ui-input-container-focused {
  @apply border-1 border-primary;
}

.ui-input-prefix-icon {
  @apply flex justify-center items-center text-gray-shade-400 py-2 pr-1 pl-1.5 transition-all ;
}

.ui-input-prefix-icon-focused {
  @apply text-gray-shade-800;
}

.ui-input-prefix-icon-pointer {
  @apply   flex justify-center p-2 max-h-full  bg-gray-tint-650 hover:bg-blue-250 hover:text-primary cursor-pointer;
}
.ui-input-prefix-icon-pointer-focused {
  @apply  bg-blue-250 text-primary cursor-pointer ;
}

.ui-input-prefix-icon-pointer.ui-input-prefix-icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed ;
}

.ui-input-suffix-icon {
  @apply flex justify-center items-center text-gray-shade-400 py-2 pl-2 pr-1.5 transition-all ;
}

.ui-input-suffix-icon-focused {
  @apply text-gray-shade-800;
}

.ui-input-suffix-icon-pointer {
  @apply bg-gray-tint-650 hover:bg-blue-250 hover:text-primary cursor-pointer ;
}
.ui-input-suffix-icon-pointer-focused {
  @apply  bg-blue-250 text-primary cursor-pointer ;
}

.ui-input-suffix-icon-pointer.ui-input-suffix-icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed ;
}

.ui-input {
    @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-gray-shade-800 placeholder:text-gray-shade-400 transition-all ;              
}

.ui-input-focus {
    @apply text-gray-shade-800 ;              
}

.ui-input-disabled {
  @apply cursor-not-allowed ;
}

/* ===== size ===== */

.ui-input-sm {
  @apply py-2 pr-2  text-xs placeholder:text-xs; 
}

.ui-input-md {
  @apply py-2 pr-2 text-sm placeholder:text-sm; 
}

.ui-input-lg {
  @apply py-2.25 pr-2  text-base placeholder:text-base; 
}

.ui-input-xl {
  @apply py-2 pr-3  text-h6 placeholder:text-h6; 
}



</style>