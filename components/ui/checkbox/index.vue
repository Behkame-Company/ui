
<template>
  <div >
    <input
      type="checkbox"
      id="checkbox"
      :checked="modelValue"
      @change="toggle"
      :disabled="disabled"
      class=" hidden"
    />
    <label
      for="checkbox"
      :class="[disabled_class ]"
      class="ui-checkbox-input"
     
    >
      <span
        class="checkbox-border "
        :class="[checkbox_class ,size_class ]"
      >
  
        <svg 
        v-if="modelValue"
          class="text-white "
          :class="size_svg_class"
        xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20">
		<path fill="#fff" fill-rule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0" clip-rule="evenodd" />
        </svg> 
      </span>
      <span :class="text_size_class" class="ui-checkbox-title">{{ title }}</span>
    </label>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
 
  size: {
    type: String,
    default: 'sm',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle(): void {
  emit('update:modelValue', !props.modelValue)
}

const checkbox_class = computed(() => {
  return props.modelValue
    ? 'bg-primary border-primary' 
    : 'border-gray-shade-50 bg-transparent';
});
const disabled_class = computed(() => ({
  'opacity-50 cursor-not-allowed': props.disabled,
}))
const size_class = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'ui-checkbox-lg'
    case 'md':
      return 'ui-checkbox-md'
    case 'sm':
      return 'ui-checkbox-sm'
    default:
      return 'ui-checkbox-sm'
  }
})

const size_svg_class = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'ui-checkbox-svg-lg'
    case 'md':
      return 'ui-checkbox-svg-md'
    case 'sm':
      return 'ui-checkbox-svg-sm'
    default:
      return 'ui-checkbox-svg-sm'
  }
})

const text_size_class = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'ui-checkbox-text-lg'
    case 'md':
      return 'ui-checkbox-text-md'
    case 'sm':
      return 'ui-checkbox-text-sm'
    default:
      return 'ui-checkbox-text-sm'
  }
})
</script>
<style scoped>
@reference "assets/css/main.css";

.ui-checkbox {
  @apply flex items-center gap-8; /* Aligning checkbox and title inline with gap */
}

.ui-checkbox-input {
  @apply cursor-pointer inline-flex  items-center gap-2;
}

.checkbox-border {
  @apply inline-flex items-center justify-center rounded-sm gap-2 border-1 p-1;
}
.ui-checkbox-title{
   @apply text-gray text-nowrap
}

.ui-checkbox-lg {
  @apply w-6 h-6;
}
.ui-checkbox-md {
  @apply w-5 h-5;
}
.ui-checkbox-sm {
  @apply w-4.5 h-4.5;
}



.ui-checkbox-svg-lg {
  @apply w-4.5 h-4.5;
}
.ui-checkbox-svg-md {
  @apply w-3.5 h-3.5;
}
.ui-checkbox-svg-sm {
  @apply w-3 h-3;
}

.ui-checkbox-text-lg {
  @apply text-h6;
}
.ui-checkbox-text-md {
  @apply text-base;
}
.ui-checkbox-text-sm {
  @apply text-sm;
}

.hidden {
  display: none;
}
</style>
