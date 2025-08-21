<!--
  DatePickerInput Component Usage Guide:
  
  PARENT COMPONENT USAGE:
  
  <template>
    <UiDatePickerInput
      v-model="selectedDate"
      type="date"
      placeholder="Select date"
      size="md"
    />
    
    <UiDatePickerInput
      v-model="selectedTime"
      type="time"
      suffixIcon="Clock"
      placeholder="Select time"
    />
    
    <UiDatePickerInput
      v-model="selectedDateTime"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      size="lg"
    />

  
-->

<template>
  <div class="ui-date-picker__container" ref="datePickerRef">
    <!-- Custom Input -->
    <UiInput
      :modelValue="displayValue"
      :placeholder="placeholder"
      :suffixIcon="dynamicIcon"
      :size="size"
      :readonly="true"
      @click="toggleDatePicker"
      :suffixCallback="onIconClick"
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
      class="ui-date-picker__popup"
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
      class="ui-date-picker__popup"
    />
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: "Select date/time",
  },
  suffixIcon: {
    type: String,
    default: "CalendarTime",
  },
  size: {
    type: String,
    default: "sm",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  type: {
    type: String,
    default: "datetime",
    validator: (value: string) => ["date", "time", "datetime"].includes(value),
  },
  format: {
    type: String,
    default: "yyyy-MM-dd HH:mm",
  },
});

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "update:modelValue", value: string | Date): void;
}>();

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls the visibility of the date picker popup */
const isOpen = ref<boolean>(false);

/** Reference to the date picker container for click outside detection */
const datePickerRef = ref<HTMLElement | null>(null);

/** Internal date value for the picker component */
const currentDate = ref<Date | null>(null);

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Computed format based on picker type */
const computedFormat = computed<string>(() => {
  if (props.type === "time") return "HH:mm";
  if (props.type === "date") return "yyyy-MM-dd";
  return "yyyy-MM-dd HH:mm";
});

/** Display value for the input field */
const displayValue = computed<string>(() => {
  const val = currentDate.value;
  if (!val) return "";

  try {
    if (props.type === "time") {
      // Handle plain time object (not a Date)
      if (typeof val === "object" && "hours" in val && "minutes" in val) {
        const timeObj = val as { hours: number; minutes: number };
        const hh = String(timeObj.hours).padStart(2, "0");
        const mi = String(timeObj.minutes).padStart(2, "0");
        return `${hh}:${mi}`;
      }

      // Handle Date object
      if (val instanceof Date) {
        const hh = String(val.getHours()).padStart(2, "0");
        const mi = String(val.getMinutes()).padStart(2, "0");
        return `${hh}:${mi}`;
      }

      return "";
    }

    // Must be a Date object for date/datetime
    if (!(val instanceof Date)) return "";

    const yyyy = val.getFullYear();
    const mm = String(val.getMonth() + 1).padStart(2, "0");
    const dd = String(val.getDate()).padStart(2, "0");
    const hh = String(val.getHours()).padStart(2, "0");
    const mi = String(val.getMinutes()).padStart(2, "0");

    return props.type === "date"
      ? `${yyyy}-${mm}-${dd}`
      : `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  } catch (error) {
    console.error("Error formatting date:", error, val);
    return "";
  }
});

const dynamicIcon = computed<string | undefined>(() => {
  return displayValue.value ? "CloseCircle" : props.suffixIcon;
});
const onIconClick = (): void => {
  if (displayValue.value) {
    isOpen.value = false;
    currentDate.value = null;
    emit("update:modelValue", "");
  }
};

// ============================================================================
// 7. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================
onMounted(() => {
  // Initialize date when component mounts
  initializeDate();

  // Add click outside listener to close picker
  document.addEventListener("click", (e) => {
    if (
      datePickerRef.value &&
      !datePickerRef.value.contains(e.target as Node)
    ) {
      isOpen.value = false;
    }
  });
});

// ============================================================================
// 8. WATCHERS (watch, watchEffect)
// ============================================================================
/** Watch for external modelValue changes and reinitialize */
watch(
  () => props.modelValue,
  () => {
    initializeDate();
  }
);

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Initialize the current date from the modelValue prop
 * Handles different input formats and picker types
 */
const initializeDate = (): void => {
  if (!props.modelValue) {
    currentDate.value = null;
    return;
  }

  try {
    if (props.type === "time") {
      const timeString = String(props.modelValue);
      const [hoursStr, minutesStr] = timeString.split(":");
      const hours = Number(hoursStr);
      const minutes = Number(minutesStr);

      if (!isNaN(hours) && !isNaN(minutes)) {
        const today = new Date();
        today.setHours(hours, minutes, 0, 0);
        currentDate.value = today;
      } else {
        currentDate.value = null;
      }
    } else {
      const parsedDate = new Date(props.modelValue as string | number | Date);
      if (isNaN(parsedDate.getTime())) {
        currentDate.value = null;
        console.warn("Invalid date format:", props.modelValue);
      } else {
        currentDate.value = parsedDate;
      }
    }
  } catch (e) {
    console.warn("Failed to parse date:", e);
    currentDate.value = null;
  }
};

/**
 * Toggle the date picker popup visibility
 */
const toggleDatePicker = (): void => {
  isOpen.value = !isOpen.value;
};

/**
 * Handle date selection from the picker
 * Formats the value based on picker type and emits the update
 */
const onDateSelect = (val: Date) => {
  if (props.type === "time") {
    if (val && typeof val === "object") {
      // Check if val is a time object (not a Date instance)
      if ("hours" in val && "minutes" in val) {
        const hours = String(val.hours).padStart(2, "0");
        const minutes = String(val.minutes).padStart(2, "0");
        const timeString = `${hours}:${minutes}`;
        currentDate.value = val;
        emit("update:modelValue", timeString);
        return;
      }

      // If val is a Date instance
      if (val instanceof Date) {
        const hours = String(val.getHours()).padStart(2, "0");
        const minutes = String(val.getMinutes()).padStart(2, "0");
        const timeString = `${hours}:${minutes}`;
        currentDate.value = val;
        emit("update:modelValue", timeString);
        return;
      }
    }
  } else {
    currentDate.value = val;
    emit("update:modelValue", val);
  }

  if (props.type !== "time") {
    isOpen.value = false;
  }
};
</script>

<style scoped>
@reference "~/assets/css/main.css";

.ui-date-picker__container {
  @apply flex flex-col relative;
}

.ui-date-picker__popup {
  @apply border border-gray-shade-200 rounded-lg shadow-lg bg-white absolute top-full left-0;
  z-index: 9999 !important;
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

:deep(.ui-input__suffix__icon) {
  background: transparent !important;
}
</style>
