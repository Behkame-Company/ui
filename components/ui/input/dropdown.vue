<template>
  <div
    class="ui-input-dropdown-container"
    :class="{
      'ui-input-dropdown-container-openned': dropdown_openned,
      'ui-input-dropdown-container-disabled': disabled,
    }"
  >
    <!-- Main input display -->
    <div
      class="ui-input-dropdown"
      :class="[
        classes.dropdown,
        {
          'ui-input-dropdown-disabled': disabled,
          'ui-input-dropdown-filled': model,
        },
      ]"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      {{ model || placeholder }}
    </div>

    <!-- Suffix icon -->
    <div
      class="ui-input-dropdown-suffix-icon"
      :class="{
        'ui-input-dropdown-suffix-icon-disabled': disabled,
        'ui-input-dropdown-suffix-icon-openned': dropdown_openned,
      }"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <VsxIcon :iconName="toggleIcon" :size="classes.iconSize" />
    </div>

    <!-- Dropdown -->
    <OnClickOutside
      v-if="dropdown_openned"
      class="ui-input-dropdown-options"
      :class="classes.options"
      :options="{ ignore: ['.ui-input-dropdown-container'] }"
      @trigger="closeDropdown"
    >
      <!-- Search -->
      <UiInput
        class="ui-input-dropdown-search"
        :size="size"
        :class="classes.search"
        v-model="search"
        placeholder="Search"
        suffixIcon="SearchNormal1"
        suffixIconType="linear"
      />

      <!-- Options -->
      <div
        class="ui-input-dropdown-option"
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
import { OnClickOutside } from "@vueuse/components";

// v-model binding
const model = defineModel<string>({ required: true });

// Props
const props = defineProps({
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  size: {
    type: String,
    default: "sm",
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  disabled: { type: Boolean, default: false },
  options: {
    type: Array<{ label: string; value: string }>,
    default: () => [],
    required: true,
  },
});

// State
const dropdown_openned = ref(false);
const search = ref("");

// ✅ Combined classes
const classes = computed(() => {
  const size = props.size;
  const iconSize = { sm: 14, md: 16, lg: 18, xl: 20 }[size] ?? 0;

  return {
    dropdown: `ui-input-dropdown-${size}`,
    options: `ui-input-dropdown-options-${size}`,
    search: `ui-input-dropdown-search-${size}`,
    option: `ui-input-dropdown-option-${size}`,
    iconSize,
  };
});

// Computed
const filtered_options = computed(() =>
  props.options.filter((option) =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
);

const toggleIcon = computed(() =>
  dropdown_openned.value ? "ArrowUp2" : "ArrowDown2"
);

// Methods
const toggleDropdown = () => {
  if (!props.disabled) dropdown_openned.value = !dropdown_openned.value;
};

const closeDropdown = () => {
  if (!props.disabled) dropdown_openned.value = false;
};

const selectOption = (option: { label: string; value: string }) => {
  model.value = option.value === model.value ? "" : option.value;
  closeDropdown();
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-input-dropdown-container {
  @apply flex justify-between items-center border  border-gray-tint-650 rounded-sm transition-all cursor-pointer relative text-nowrap ;
}

.ui-input-dropdown-container-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-input-dropdown-container-openned {
  @apply border-1 border-primary  ;
}

.ui-input-dropdown {
  @apply flex rounded-sm border-0 text-gray-shade-400 transition-all cursor-pointer;
}

.ui-input-dropdown-disabled {
  @apply cursor-not-allowed;
}

.ui-input-dropdown-filled {
  @apply text-gray-shade-800;
}

/* ===== size ===== */

.ui-input-dropdown-sm {
  @apply py-2 px-3 text-3xs placeholder:text-3xs;
}

.ui-input-dropdown-md {
  @apply py-2 px-3 text-2xs placeholder:text-2xs;
  line-height: 18px;
}

.ui-input-dropdown-lg {
  @apply py-2 px-3 text-sm placeholder:text-sm;
  line-height: 20px;
}

.ui-input-dropdown-xl {
  @apply py-3 px-4 text-base placeholder:text-base;
  line-height: 17px;
}

.ui-input-dropdown-suffix-icon {
  @apply flex justify-center items-center text-gray-shade-100 p-2 ;
}

.ui-input-dropdown-suffix-icon-openned {
  @apply text-gray;
}



.ui-input-dropdown-suffix-icon.ui-input-dropdown-suffix-icon-disabled {
  @apply cursor-not-allowed;
}

.ui-input-dropdown-options {
  @apply absolute flex flex-col  bg-white border border-gray-tint-200 rounded-sm z-10 pb-2;
}

.ui-input-dropdown-options-sm {
  @apply top-10;
}

.ui-input-dropdown-options-md {
  @apply top-10.5;
}

.ui-input-dropdown-options-lg {
  @apply top-11;
}

.ui-input-dropdown-options-xl {
  @apply top-12;
}

.ui-input-dropdown-search {
  @apply mx-2 my-2 ;
}
.ui-input-dropdown-option {
  @apply text-gray-shade-800 hover:bg-gray-tint-200 cursor-pointer;
}

.ui-input-dropdown-option-sm {
  @apply px-3 py-2 text-3xs;
}

.ui-input-dropdown-option-md {
  @apply px-3 py-2.5 text-xs;
}

.ui-input-dropdown-option-lg {
  @apply px-3 py-2.5 text-sm;
}

.ui-input-dropdown-option-xl {
  @apply px-3 py-3 text-base ;
}
</style>