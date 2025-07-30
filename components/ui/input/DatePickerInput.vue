<!--
  DatePickerInput Component Usage Guide:
  
  This component provides a customizable date/time picker with three modes:
  - date: Select date only (yyyy-MM-dd format)
  - time: Select time only (HH:mm format) 
  - datetime: Select both date and time (yyyy-MM-dd HH:mm format)
  
  PARENT COMPONENT USAGE:
  
  &lt;template&gt;
    &lt;!-- Basic date picker --&gt;
    &lt;UiDatePickerInput
      v-model="selectedDate"
      type="date"
      placeholder="Select date"
      size="md"
    /&gt;
    
    &lt;!-- Time picker with custom icon --&gt;
    &lt;UiDatePickerInput
      v-model="selectedTime"
      type="time"
      suffixIcon="Clock"
      placeholder="Select time"
    /&gt;
    
    &lt;!-- DateTime picker with custom format --&gt;
    &lt;UiDatePickerInput
      v-model="selectedDateTime"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      size="lg"
    /&gt;
  &lt;/template&gt;
  
-->

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
      v-show="isOpen"
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
/**
 * DatePickerInput Component
 * 
 * A customizable date/time picker component that supports:
 * - Date selection (yyyy-MM-dd)
 * - Time selection (HH:mm)
 * - DateTime selection (yyyy-MM-dd HH:mm)
 * - Custom formatting
 * - Different sizes (sm, md, lg)
 * - Custom icons and placeholders
 * 
 * USAGE EXAMPLE:
 * 
 * // Basic date picker
 * <UiDatePickerInput
 *   v-model="selectedDate"
 *   type="date"
 *   placeholder="Select date"
 *   size="md"
 * />
 * 
 * // Time picker with custom icon
 * <UiDatePickerInput
 *   v-model="selectedTime"
 *   type="time"
 *   suffixIcon="Clock"
 *   placeholder="Select time"
 * />
 * 
 * // DateTime picker
 * <UiDatePickerInput
 *   v-model="selectedDateTime"
 *   type="datetime"
 *   format="yyyy-MM-dd HH:mm"
 *   size="lg"
 * />
 * 
 * // Parent component setup
 * const selectedDate = ref('')
 * const selectedTime = ref('')
 * const selectedDateTime = ref('')
 */

// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// ============================================================================
// 2. TYPE DEFINITIONS
// ============================================================================
type DatePickerType = 'date' | 'time' | 'datetime'
type DatePickerSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue?: string | Date
  placeholder?: string
  suffixIcon?: string
  size?: DatePickerSize
  type?: DatePickerType
  format?: string
}

// ============================================================================
// 3. PROPS (Only for components)
// ============================================================================
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: 'Select date/time',
  suffixIcon: 'CalendarTime',
  size: 'sm',
  type: 'datetime',
  format: 'yyyy-MM-dd HH:mm',
})

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | Date): void
}>()

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls the visibility of the date picker popup */
const isOpen = ref(false)

/** Reference to the date picker container for click outside detection */
const datePickerRef = ref<HTMLElement | null>(null)

/** Internal date value for the picker component */
const currentDate = ref<Date | null>(null)

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Computed format based on picker type */
const computedFormat = computed(() => {
  if (props.type === 'time') return 'HH:mm'
  if (props.type === 'date') return 'yyyy-MM-dd'
  return 'yyyy-MM-dd HH:mm'
})

/** Display value for the input field */
const displayValue = computed(() => {
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

// ============================================================================
// 7. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================
onMounted(() => {
  // Initialize date when component mounts
  initializeDate()
  
  // Add click outside listener to close picker
  document.addEventListener('click', (e) => {
    if (datePickerRef.value && !datePickerRef.value.contains(e.target as Node)) {
      isOpen.value = false
    }
  })
})

// ============================================================================
// 8. WATCHERS (watch, watchEffect)
// ============================================================================
/** Watch for external modelValue changes and reinitialize */
watch(() => props.modelValue, () => {
  initializeDate()
})

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Initialize the current date from the modelValue prop
 * Handles different input formats and picker types
 */
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

/**
 * Toggle the date picker popup visibility
 */
const toggleDatePicker = () => {
  isOpen.value = !isOpen.value
}

/**
 * Handle date selection from the picker
 * Formats the value based on picker type and emits the update
 */
const onDateSelect = (val: Date | any) => {
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
</script>

<style scoped>
@reference "assets/css/main.css";

.date-picker-container {
  @apply flex flex-col relative;
}

.date-picker-popup {
  @apply z-50 border border-gray-shade-200 rounded-lg shadow-lg bg-white absolute top-full left-0 ;
 
}
:deep(.dp__outer_menu_wrap) {
  @apply mt-1;
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


</style>
