<!--
  MultiDropDown Component Usage Guide:
  
  
  PARENT COMPONENT USAGE:
    
    <UiMultiDropDown
      v-model="selectedCategories"
      :options="categoryOptions"
      placeholder="Select categories"
      size="lg"
    />
    
  
  PROPS:
  - name: string (optional)
  - placeholder: string (default: '')
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
    <div
      class="ui-dropdown"
      :class="`${dropdownSizeClass} ${
        disabled ? 'ui-dropdown__disabled' : ''
      } ${selectedLabels.length > 0 ? 'ui-dropdown__filled' : 'ui-dropdown__empty'}`"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <template v-if="selectedLabels.length">
        {{ selectedLabels.join(', ') }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </div>

    <div
      class="ui-dropdown__suffix__icon"
      :class="{
        'ui-dropdown__suffix__icon__disabled': disabled,
        'ui-dropdown__suffix__icon__openned': dropdownOpenned,
      }"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <VsxIcon
        :iconName="toggleIcon"
        :size="iconSizeClass"
      />
    </div>

    <OnClickOutside
      v-if="dropdownOpenned"
      class="ui-dropdown__options"
      :class="dropdownOptionsSizeClass"
      :options="{ ignore: ['.ui-dropdown__container'] }"
      @trigger="closeDropdown"
      style="width: 100%; min-width: 100%;"
    >
      <UiInput
        class="ui-dropdown__search"
        :size="size"
        :class="dropdownSearchSizeClass"
        v-model="search"
        placeholder="Search"
        suffixIcon="SearchNormal1"
        suffixIconType="linear"
       
      />
      <!-- Select All Checkbox -->
      <div class="ui-dropdown__option">
        <span class="text-gray text-3xs px-2 py-3">Select All</span>
        <UiCheckbox
          class="p-3"
          :model-value="allSelected"
          @update:model-value="toggleSelectAll"
          size="sm"
        />
      </div>
      <hr class="text-gray-tint-650 mx-2">
      <!-- Option Checkboxes -->
      <div
        class="ui-dropdown__option"
        :class="dropdownOptionSizeClass"
        v-for="option in filteredOptions"
        :key="option.value"
        @click.stop
      >
        <span class="text-gray text-3xs">{{ option.label }}</span>
        <UiCheckbox
          :model-value="(model ?? []).includes(option.value)"
          @update:model-value="() => toggleOption(option.value)"
          size="sm"
        />
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 3. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  disabled: { type: Boolean, default: false },
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
const model = defineModel<string[]>({ required: true })

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls the visibility of the dropdown options */
const dropdownOpenned = ref<boolean>(false)

/** Search term for filtering options */
const search = ref<string>('')

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Size class for the dropdown container */
const dropdownSizeClass = computed<string>(() => `ui-dropdown__${props.size}`)

/** Size class for the dropdown options container */
const dropdownOptionsSizeClass = computed<string>(() => `ui-dropdown__options__${props.size}`)

/** Size class for the search input */
const dropdownSearchSizeClass = computed<string>(() => `ui-dropdown__search__${props.size}`)

/** Size class for individual dropdown options */
const dropdownOptionSizeClass = computed<string>(() => `ui-dropdown__option__${props.size}`)

/** Icon size based on dropdown size */
const iconSizeClass = computed<number>(() => {
  switch (props.size) {
    case 'sm': return 14;
    case 'md': return 16;
    case 'lg': return 18;
    case 'xl': return 20;
    default: return 0;
  }
})

/** Filtered options based on search term */
const filteredOptions = computed<{ label: string; value: string }[]>(() =>
  props.options.filter(option =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
)

/** Array of all option values */
const allOptionValues = computed<string[]>(() => props.options.map(opt => opt.value))

/** Whether all options are currently selected */
const allSelected = computed<boolean>(() => (model.value ?? []).length === allOptionValues.value.length && allOptionValues.value.length > 0)

/** Labels of currently selected options */
const selectedLabels = computed<string[]>(() =>
  props.options.filter(opt => (model.value ?? []).includes(opt.value)).map(opt => opt.label)
)

/** Toggle icon based on dropdown state */
/** Toggle icon based on dropdown state */
const toggleIcon = computed<string>(() => 
  // if (model.value) {
  //   return "CloseCircle";
  // }
  dropdownOpenned.value ? "ArrowUp2" : "ArrowDown2"
);

// const iconType = computed<string>(() => {
//   return model.value ? "bold" : "linear";
// });



// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Toggle select all functionality
 * Selects all options if none are selected, deselects all if all are selected
 */
const toggleSelectAll = (): void => {
  if (allSelected.value) {
    model.value = [];
  } else {
    model.value = [...allOptionValues.value];
  }
}

/**
 * Toggle individual option selection
 * @param value - The value of the option to toggle
 */
const toggleOption = (value: string): void => {
  const arr = model.value ?? [];
  if (arr.includes(value)) {
    model.value = arr.filter(v => v !== value);
  } else {
    model.value = [...arr, value];
  }
}

/**
 * Toggle dropdown visibility
 * Prevents toggle if component is disabled
 */
const toggleDropdown = (): void => {
  if (props.disabled) return;
  dropdownOpenned.value = !dropdownOpenned.value;
}

/**
 * Close dropdown
 * Prevents close if component is disabled
 */
const closeDropdown = (): void => {
  if (props.disabled) return;
  dropdownOpenned.value = false;
}

</script>

<style scoped>
@reference "~/assets/css/main.css";

.ui-dropdown__container {
  @apply flex justify-between items-center border  border-gray-tint-650 rounded-sm transition-all cursor-pointer relative text-nowrap;
}

.ui-dropdown__container__disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-dropdown__container__openned {
  @apply border-1 border-primary 
}

.ui-dropdown {
  @apply flex-1 rounded-sm border-0 text-gray-shade-400 transition-all cursor-pointer;
}

.ui-dropdown__disabled {
  @apply cursor-not-allowed;
}

.ui-dropdown__filled {
  @apply text-gray-shade-800;
}

.ui-dropdown__empty {
  @apply text-gray-shade-400;
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

.ui-dropdown__suffix__icon {
  @apply flex justify-center items-center text-gray-shade-400 p-2 transition-all;
}
.ui-dropdown__suffix__icon:hover {
  @apply text-primary cursor-pointer;
}

.ui-dropdown__suffix__icon__openned {
  @apply text-gray;
}

.ui-dropdown__suffix__icon.ui-dropdown__suffix__icon__disabled {
  @apply cursor-not-allowed;
}

.ui-dropdown__options {
  @apply absolute flex flex-col top-10 bg-white border border-gray-tint-200 rounded-sm z-10 pb-2 w-full;
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
  @apply mx-2 my-2 ;
}
.ui-dropdown__option {
  @apply flex items-center justify-between text-gray-shade-800 hover:bg-gray-tint-200 cursor-pointer;
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
  @apply px-3 py-3 text-base ;
}
</style>

  