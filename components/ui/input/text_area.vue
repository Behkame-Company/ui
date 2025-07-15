<template>
  <textarea class="ui-input-text-area" :class="size_class" :name="name" :placeholder="placeholder" :disabled="disabled" v-model="local_data" />
</template>
<script setup lang="ts">

const model = defineModel<string>({
  required: true
})

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
    default: 'md', // valid values: sm, md, lg, xl
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean, 
    default: false, // pass this variable true if you want the input text area to get disabled 
  }, 
}) 
const local_data = ref<string>("")

const size_class = computed<string>(() => `ui-input-text-area-${props.size}`)

</script>
<style>

@reference "assets/css/main.css";

.ui-input-text-area {
  @apply border-1 border-gray-tint-650 text-gray-shade-800 placeholder:text-gray-shade-400 rounded-lg ;
}

.ui-input-text-area:focus {
  @apply border-primary;
}

.ui-input-text-area:disabled {
  @apply opacity-50 cursor-not-allowed ;
}

/* ===== size ===== */

.ui-input-text-area-sm {
  @apply py-2 px-2 text-xs placeholder:text-xs; 
}

.ui-input-text-area-md {
  @apply py-2 px-2 text-base placeholder:text-base; 
  /* line-height: 18px; */
}

.ui-input-text-area-lg {
  @apply py-2 px-2 text-sm placeholder:text-sm; 
  /* line-height: 20px; */
}

.ui-input-text-area-xl {
  @apply py-3 px-3 text-base placeholder:text-base; 
  /* line-height: 17px; */
}

</style>