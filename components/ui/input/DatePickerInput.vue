<template>
  <div class="date-picker-container " ref="datePickerRef">
    <!-- Custom Input -->
    <UiInput
      :model-value="displayValue"
      :placeholder="placeholder"
      :suffixIcon="suffixIcon"
      :size="size"
      readonly
      @click="toggleDatePicker"
    />

    <!-- Vue3-DatePicker -->
    <VueDatePicker
      v-if="isOpen"
      v-model="date"
      :format="format"
      :time-picker="type === 'time'"
      :enable-time="type === 'datetime'"
      :inline="true"
      :teleport="false"
      @update:model-value="onDateSelect"
      class="date-picker-popup"
    />
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select date/time',
  },
  suffixIcon: {
    type: String,
    default: 'CalendarTime',
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'datetime',
    validator: (val: string) => ['date', 'time', 'datetime'].includes(val),
  },
  format: {
    type: String,
    default: 'yyyy-MM-dd HH:mm',
  },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const isOpen = ref(false)
const date = ref(props.modelValue ? new Date(props.modelValue) : null)
const datePickerRef = ref<HTMLElement | null>(null)

// Display value formatting
const displayValue = computed(() => {
  if (!date.value) return ''

  const yyyy = date.value.getFullYear()
  const mm = String(date.value.getMonth() + 1).padStart(2, '0')
  const dd = String(date.value.getDate()).padStart(2, '0')
  const hh = String(date.value.getHours()).padStart(2, '0')
  const mi = String(date.value.getMinutes()).padStart(2, '0')

  if (props.type === 'date') return `${yyyy}-${mm}-${dd}`
  if (props.type === 'time') return `${hh}:${mi}`
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
})

// Handlers
const toggleDatePicker = () => {
  isOpen.value = !isOpen.value
}

const onDateSelect = (val: Date) => {
  date.value = val
  emit('update:modelValue', val)
  isOpen.value = false
}

// Watch modelValue changes from parent
watch(() => props.modelValue, (newVal) => {
  date.value = newVal ? new Date(newVal) : null
})

// Close on outside click
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (datePickerRef.value && !datePickerRef.value.contains(e.target as Node)) {
      isOpen.value = false
    }
  })
})
</script>

<style scoped>
@reference "assets/css/main.css";


.date-picker-container {
  @apply flex flex-col space-y-1  relative ;
}

.date-picker-popup {
  @apply z-50 border border-gray-shade-200 rounded-lg shadow-lg bg-white absolute top-full left-0;
  width: 100%;
  min-width: 100%;
}
/* Remove default input + icon */
:deep(.dp__input),
:deep(.dp__input_wrap),
:deep(.dp__icon) {
  display: none !important;
}

/* Clean background wrapper */
:deep(.dp__main) {
  @apply p-0 m-0 border-0 shadow-none bg-transparent;
}

/* Optional: transparent calendar if needed */
:deep(.dp__calendar) {
  background-color: transparent;
}
</style>
