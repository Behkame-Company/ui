<!--
  DropDown Component Usage Guide:
  
  PARENT COMPONENT USAGE:
    <UiDropDown
      v-model="selectedCategory"
      :options="categoryOptions"
      placeholder="Select category"
      size="lg"
    />
  
  PROPS:
  - name: string (default: "")
  - placeholder: string (default: "")
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm')
  - disabled: boolean (default: false)
  - options: Array&lt;{label: string, value: string}&gt; (required)
-->

<template>
  <div
    class="ui-dropdown__container"
    :class="{
      'ui-dropdown__container__openned': dropdownOpenned,
      'ui-dropdown__container__disabled': disabled,
    }"
  >
    <!-- Main input display -->
    <div
      class="ui-dropdown"
      :class="[
        classes.dropdown,
        {
          'ui-dropdown__disabled': disabled,
          'ui-dropdown__filled': model,
        },
      ]"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      {{ selectedOptionLabel || placeholder }}
    </div>

    <!-- Suffix icon -->
    <div
      class="ui-dropdown__icon"
      :class="{
        'ui-dropdown__icon__disabled': disabled,
        'ui-dropdown__icon__openned': dropdownOpenned,
      }"
      :disabled="disabled"
      @click="onSuffixIconClick"
    >
      <VsxIcon
        :iconName="toggleIcon"
        :size="classes.iconSize"
        :type="iconType"
      />
    </div>

    <!-- Dropdown -->
    <OnClickOutside
      v-if="dropdownOpenned"
      class="ui-dropdown__options"
      :class="classes.options"
      :options="{ ignore: ['.ui-dropdown__container'] }"
      @trigger="closeDropdown"
      style="width: 100%; min-width: 100%"
    >
      <!-- Search -->
      <UiInput
        class="ui-dropdown__search"
        :size="size"
        :class="classes.search"
        v-model="search"
        placeholder="Search"
        suffixIcon="SearchNormal1"
        suffixIconType="linear"
      />

      <!-- Options -->
      <div
        class="ui-dropdown__option"
        :class="classes.option"
        v-for="option in filtered_options"
        :key="option.value"
        @click="() => selectOption(option)"
      >
        {{ option.label }}
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
import { OnClickOutside } from "@vueuse/components";

// ============================================================================
// 2. TYPE DEFINITIONS
// ============================================================================
type DropdownSize = "sm" | "md" | "lg" | "xl";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name?: string;
  placeholder?: string;
  size?: DropdownSize;
  disabled?: boolean;
  options: Option[];
}

// ============================================================================
// 3. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  name: {
     type: String,
      default: "" 
    },
  placeholder: { 
    type: String,
     default: "" 
    },
  size: {
    type: String,
    default: "sm",
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  disabled: {
     type: Boolean,
      default: false 
    },
  options: {
    type: Array as () => { label: string; value: string }[],
    default: () => [],
    required: true,
  },
});

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
// Using defineModel for v-model binding
const model = defineModel<string>({ required: true });

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls the visibility of the dropdown options */
const dropdownOpenned = ref<boolean>(false);

/** Search term for filtering options */
const search = ref<string>("");

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Computed classes object for all size-based styling */
const classes = computed<{
  dropdown: string;
  options: string;
  search: string;
  option: string;
  iconSize: number;
}>(() => {
  const size = props.size;
  const iconSize = { sm: 14, md: 16, lg: 18, xl: 20 }[size] ?? 0;

  return {
    dropdown: `ui-dropdown__${size}`,
    options: `ui-dropdown__options__${size}`,
    search: `ui-dropdown__search__${size}`,
    option: `ui-dropdown__option__${size}`,
    iconSize,
  };
});

/** Filtered options based on search term */
const filtered_options = computed<Option[]>(() =>
  props.options.filter((option) =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
);

/** Toggle icon based on dropdown state */
const toggleIcon = computed<string>(() => {
  if (model.value) {
    return "CloseCircle";
  }
  return dropdownOpenned.value ? "ArrowUp2" : "ArrowDown2";
});

const iconType = computed<string>(() => {
  return model.value ? "bold" : "linear";
});

/** Selected option label for display */
const selectedOptionLabel = computed<string>(() => {
  if (!model.value) return "";
  const selectedOption = props.options.find(
    (option) => option.value === model.value
  );
  return selectedOption ? selectedOption.label : "";
});

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Toggle dropdown visibility
 * Prevents toggle if component is disabled
 */
const toggleDropdown = (): void => {
  if (!props.disabled) dropdownOpenned.value = !dropdownOpenned.value;
};

/**
 * Close dropdown
 * Prevents close if component is disabled
 */
const closeDropdown = (): void => {
  if (!props.disabled) dropdownOpenned.value = false;
};

/**
 * Select an option from the dropdown
 * Toggles selection if the same option is clicked again
 * @param option - The option to select
 */
const selectOption = (option: Option): void => {
  model.value = option.value === model.value ? "" : option.value;
  closeDropdown();
};
const onSuffixIconClick = ():void => {
  if (model.value) {
    model.value = "";
    dropdownOpenned.value = false;
  } else {
    toggleDropdown();
  }
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-dropdown__container {
  @apply flex justify-between items-center border  border-gray-tint-650 rounded-sm transition-all cursor-pointer relative text-nowrap;
}

.ui-dropdown__container__disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-dropdown__container__openned {
  @apply border-1 border-primary;
}

.ui-dropdown {
  @apply flex rounded-sm border-0 text-gray-shade-400 transition-all cursor-pointer;
}

.ui-dropdown__disabled {
  @apply cursor-not-allowed;
}

.ui-dropdown__filled {
  @apply text-gray-shade-800;
}

/* ===== size ===== */

.ui-dropdown__sm {
  @apply py-2 px-3 text-3xs placeholder:text-3xs;
}

.ui-dropdown__md {
  @apply py-2 px-3 text-2xs placeholder:text-2xs;
  line-height: 18px;
}

.ui-dropdown__lg {
  @apply py-2 px-3 text-sm placeholder:text-sm;
  line-height: 20px;
}

.ui-dropdown__xl {
  @apply py-3 px-4 text-base placeholder:text-base;
  line-height: 17px;
}

.ui-dropdown__icon {
  @apply flex justify-center items-center text-gray-shade-400 p-2;
}

.ui-dropdown__icon:hover {
  @apply text-primary cursor-pointer;
}

.ui-dropdown__icon__openned {
  @apply text-gray;
}

.ui-dropdown__icon.ui-dropdown__icon__disabled {
  @apply cursor-not-allowed;
}

.ui-dropdown__options {
  @apply absolute flex flex-col  bg-white border border-gray-tint-200 rounded-sm z-10 pb-2;
}

.ui-dropdown__options__sm {
  @apply top-10;
}

.ui-dropdown__options__md {
  @apply top-10.5;
}

.ui-dropdown__options__lg {
  @apply top-11;
}

.ui-dropdown__options__xl {
  @apply top-12;
}

.ui-dropdown__search {
  @apply mx-2 my-2;
}
.ui-dropdown__option {
  @apply text-gray-shade-800 hover:bg-gray-tint-200 cursor-pointer;
}

.ui-dropdown__option__sm {
  @apply px-3 py-2 text-3xs;
}

.ui-dropdown__option__md {
  @apply px-3 py-2.5 text-xs;
}

.ui-dropdown__option__lg {
  @apply px-3 py-2.5 text-sm;
}

.ui-dropdown__option__xl {
  @apply px-3 py-3 text-base;
}
</style>
