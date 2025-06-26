<template>
  <div class="ui-input-password-container" :class="{ 'ui-input-password-container-focused': focused, 'ui-input-password-container-disabled': disabled }" >
    
    <input :type="input_type" class="ui-input-password" :class="`${size_class} ${ focused ? 'ui-input-password-focus' : ''} ${ disabled ? 'ui-input-password-disabled' : ''}`" :name="name" :placeholder="placeholder" :disabled="disabled" v-model="model" @focus="onFocus" @blur="onBlur" />

    <div class="ui-input-password-suffix-icon" :class="{ 'ui-input-password-suffix-icon-disabled': disabled }" :disabled="disabled" @click="toggleShowPassword">
        <Icon :name="icon_name" :size="icon_size_class" />
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
    default: 'sm', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean, 
    default: false, // pass this variable true if you want the input to get disabled 
  }, 
})

const show_password = ref<boolean>(false)

const focused = ref<boolean>(false)

const size_class = computed<string>(() => `ui-input-${props.size}`)

const input_type = computed<string>(() => show_password.value ? 'text' : 'password')

const icon_name = computed<string>(() => show_password.value ? 'uil:eye' : 'uil:eye-slash')

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

const toggleShowPassword = () => {

  if( props.disabled ) 
    return

  show_password.value = !show_password.value
}

const onFocus = () => focused.value = true

const onBlur = () => focused.value = false

</script>
<style>

@reference "assets/css/main.css";

.ui-input-password-container {
  @apply overflow-hidden flex justify-center items-center border border-tint-600 rounded-sm transition-all ;
}

.ui-input-password-container-disabled {
  @apply opacity-50 cursor-not-allowed ;
}

.ui-input-password-container-focused {
  @apply border-1 border-primary;
}

.ui-input-password {
    @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-shade-600 placeholder:text-tint-700 transition-all ;              
}

.ui-input-password:disabled {
    @apply cursor-not-allowed ;              
}

/* ===== size ===== */

.ui-input-password-sm {
  @apply py-2 px-3 text-sm placeholder:text-sm; 
}

.ui-input-password-md {
  @apply py-2 px-3 text-base placeholder:text-base; 
  line-height: 18px;
}

.ui-input-password-lg {
  @apply py-2 px-3 text-h6 placeholder:text-h6; 
  line-height: 20px;
}

.ui-input-password-xl {
  @apply py-3 px-4 text-h6 placeholder:text-h6; 
  line-height: 17px;
}

/* ===== icon ===== */

.ui-input-password-suffix-icon {
  @apply flex justify-center items-center text-shade-100 hover:text-primary p-2.5 transition-all cursor-pointer ;
}

.ui-input-password-suffix-icon-focused {
  @apply text-primary ;
}

.ui-input-password-suffix-icon-disabled {
  @apply hover:text-shade-100 cursor-not-allowed ;
}

</style>