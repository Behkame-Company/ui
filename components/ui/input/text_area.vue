<template>
  <textarea class="ui-input-text-area" :class="size_class" :name="name" :placeholder="placeholder" :disabled="disabled" v-model="local_data" />
</template>
<script setup lang="ts">

const props = defineProps({
  name: {
    type: String,
    default: ''  // input text area name property 
  },
  placeholder: {
    type: String,
    default: '' // place holder to show in input text area 
  },
  size: {
    type: String,
    default: 'sm', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  default_value: {
    type: String,
    default: '', // default value to put in input text area 
  },
  disabled: {
    type: Boolean, 
    default: false, // pass this variable true if you want the input text area to get disabled 
  }, 
})

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const local_data = ref<string>("")

const size_class = computed<string>(() => `ui-input-text-area-${props.size}`)

onMounted(() => local_data.value = props.default_value)


watch(local_data, (val, prev) => {

  if( prev != val ) 
    emit('update', val)
})

</script>
<style>

@reference "assets/css/main.css";

.ui-input-text-area {
  @apply border-1 border-tint-600 text-shade-900 placeholder:text-tint-700 rounded-lg ;
}

.ui-input-text-area:focus {
  @apply border-primary;
}

.ui-input-text-area:disabled {
  @apply opacity-50 cursor-not-allowed ;
}

/* ===== size ===== */

.ui-input-text-area-sm {
  @apply py-2 px-3 text-sm placeholder:text-sm; 
}

.ui-input-text-area-md {
  @apply py-2 px-3 text-base placeholder:text-base; 
  line-height: 18px;
}

.ui-input-text-area-lg {
  @apply py-2 px-3 text-h6 placeholder:text-h6; 
  line-height: 20px;
}

.ui-input-text-area-xl {
  @apply py-3 px-4 text-h6 placeholder:text-h6; 
  line-height: 17px;
}

</style>