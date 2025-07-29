<template>
  <div class="date-picker-container" ref="datePickerRef">
    <!-- Custom Input -->
    <UiInput
      :model-value="displayValue"
      :placeholder="placeholder"
      :suffixIcon="suffixIcon"
      :size="size"
      readonly
      @click="toggleDatePicker"
    />

    <!-- Time Picker Only -->
    <VueDatePicker
      v-if="isOpen && type === 'time'"
      v-model="currentDate"
      :format="'HH:mm'"
      :inline="true"
      :enable-time-picker="true"
      :calendar-only="false"
      :time-picker="true"
      :auto-apply="true"
      @update:model-value="onDateSelect"
      class="date-picker-popup"
    />
    
    <!-- Date/DateTime Picker -->
    <VueDatePicker
      v-if="isOpen && type !== 'time'"
      v-model="currentDate"
      :format="computedFormat"
      :inline="true"
      :enable-time-picker="type === 'datetime'"
      :calendar-only="type === 'date'"
      :auto-apply="true"
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
const datePickerRef = ref<HTMLElement | null>(null)
const currentDate = ref<Date | null>(null)

// Initialize currentDate
const initializeDate = () => {
  if (!props.modelValue) {
    currentDate.value = null
    return
  }
  
  try {
    if (props.type === 'time') {
      // For time-only, create a date with today's date and the specified time
      const today = new Date()
      const timeString = String(props.modelValue)
      const [hours, minutes] = timeString.split(':').map(Number)
      
      if (!isNaN(hours) && !isNaN(minutes)) {
        today.setHours(hours, minutes, 0, 0)
        currentDate.value = today
      } else {
        currentDate.value = null
      }
    } else {
      currentDate.value = new Date(props.modelValue)
    }
  } catch (e) {
    console.warn('Invalid date value:', props.modelValue)
    currentDate.value = null
  }
}

// Initialize on mount
initializeDate()

// Computed format based on type
const computedFormat = computed(() => {
  if (props.type === 'time') return 'HH:mm'
  if (props.type === 'date') return 'yyyy-MM-dd'
  return 'yyyy-MM-dd HH:mm'
})

// Display Value
const displayValue = computed(() => {
  console.log('Computing display value:', currentDate.value, 'Type:', props.type)
  
  if (!currentDate.value) return ''
  
  try {
    if (props.type === 'time') {
      // Handle time object format from VueDatePicker
      if (typeof currentDate.value === 'object' && 
          'hours' in currentDate.value && 
          'minutes' in currentDate.value) {
        const timeObj = currentDate.value as any
        const hh = String(timeObj.hours).padStart(2, '0')
        const mi = String(timeObj.minutes).padStart(2, '0')
        return `${hh}:${mi}`
      }
      // Handle Date object format
      if (currentDate.value instanceof Date) {
        const hh = String(currentDate.value.getHours()).padStart(2, '0')
        const mi = String(currentDate.value.getMinutes()).padStart(2, '0')
        return `${hh}:${mi}`
      }
      return ''
    }
    
    // For date and datetime, ensure we have a Date object
    if (!(currentDate.value instanceof Date)) {
      return ''
    }
    
    const yyyy = currentDate.value.getFullYear()
    const mm = String(currentDate.value.getMonth() + 1).padStart(2, '0')
    const dd = String(currentDate.value.getDate()).padStart(2, '0')
    const hh = String(currentDate.value.getHours()).padStart(2, '0')
    const mi = String(currentDate.value.getMinutes()).padStart(2, '0')

    if (props.type === 'date') return `${yyyy}-${mm}-${dd}`
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
  } catch (error) {
    console.error('Error formatting date:', error, currentDate.value)
    return ''
  }
})

// Handlers
const toggleDatePicker = () => {
  isOpen.value = !isOpen.value
}

const onDateSelect = (val: Date | any) => {
  console.log('Date selected:', val, 'Type:', props.type)
  
  if (props.type === 'time') {
    // Handle time object format from VueDatePicker
    if (typeof val === 'object' && 'hours' in val && 'minutes' in val) {
      const hours = String(val.hours).padStart(2, '0')
      const minutes = String(val.minutes).padStart(2, '0')
      const timeString = `${hours}:${minutes}`
      currentDate.value = val
      emit('update:modelValue', timeString)
    } else if (val instanceof Date) {
      // Handle Date object format
      const hours = String(val.getHours()).padStart(2, '0')
      const minutes = String(val.getMinutes()).padStart(2, '0')
      const timeString = `${hours}:${minutes}`
      currentDate.value = val
      emit('update:modelValue', timeString)
    }
  } else {
    currentDate.value = val
    emit('update:modelValue', val)
  }

  // Keep time picker open for time selection, close for date/datetime
  if (props.type !== 'time') {
    isOpen.value = false
  }
}

// Watch for external modelValue changes
watch(() => props.modelValue, () => {
  initializeDate()
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
  @apply flex flex-col space-y-1 relative;
}

.date-picker-popup {
  @apply z-50 border border-gray-shade-200 rounded-lg shadow-lg bg-white absolute top-full left-0;
  width: 100%;
  min-width: 100%;
}

/* Hide default input + icon */
:deep(.dp__input),
:deep(.dp__input_wrap),
:deep(.dp__icon) {
  display: none !important;
}

/* Clean background */
:deep(.dp__main) {
  @apply p-0 m-0 border-0 shadow-none bg-transparent;
}

/* Optional transparent calendar */
:deep(.dp__calendar) {
  background-color: transparent;
}
</style>
