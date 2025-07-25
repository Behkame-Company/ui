<template>
  <div
    class="ui-input-dropdown-container"
    :class="{
      'ui-input-dropdown-container-openned': dropdown_openned,
      'ui-input-dropdown-container-disabled': disabled,
    }"
  >
    <div
      class="ui-input-dropdown"
      :class="`${dropdown_size_class} ${
        disabled ? 'ui-input-dropdown-disabled' : ''
      } ${model ? 'ui-input-dropdown-filled' : ''}`"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      {{ model ? model : placeholder }}
    </div>

    <div
      class="ui-input-dropdown-suffix-icon"
      :class="{
        'ui-input-dropdown-suffix-icon-disabled': disabled,
        'ui-input-dropdown-suffix-icon-openned': dropdown_openned,
      }"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <VsxIcon
        :iconName="toggleIcon"
        :size="icon_size_class"
      />
    </div>

    <OnClickOutside
      v-if="dropdown_openned"
      class="ui-input-dropdown-options"
      :class="dropdown_options_size_class"
      :options="{ ignore: ['.ui-input-dropdown-container'] }"
      @trigger="closeDropdown"
    >
      <UiInput
        class="ui-input-dropdown-search"
        :size="size"
        :class="dropdown_search_size_class"
        v-model="search"
        placeholder="Search"
        suffixIcon="SearchNormal1"
        suffixIconType="linear"
      />
      <div
        class="ui-input-dropdown-option"
        :class="dropdown_option_size_class"
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

const model = defineModel<string>({
  required: true,
});

const props = defineProps({
  name: {
    type: String,
    default: "", // input name property
  },
  placeholder: {
    type: String,
    default: "", // place holder to show in input
  },
  size: {
    type: String,
    default: "sm", // valid values: sm, md, lg, xl
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false, // pass this variable true if you want the input to get disabled
  },
  options: {
    type: Array<{ label: string; value: string }>,
    default: () => [], // options to show in dropdown
    required: true,
  },
});

const dropdown_openned = ref<boolean>(false);

const search = ref<string>("");

const dropdown_size_class = computed<string>(
  () => `ui-input-dropdown-${props.size}`
);

const dropdown_options_size_class = computed<string>(
  () => `ui-input-dropdown-options-${props.size}`
);

const dropdown_search_size_class = computed<string>(
  () => `ui-input-dropdown-search-${props.size}`
);

const dropdown_option_size_class = computed<string>(
  () => `ui-input-dropdown-option-${props.size}`
);

const icon_size_class = computed<number>(() => {
  switch (props.size) {
    case "sm":
      return 14;
    case "md":
      return 16;
    case "lg":
      return 18;
    case "xl":
      return 20;
  }

  return 0;
});


const filtered_options = computed(() =>
  props.options.filter((option) =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  )
);

const toggleDropdown = () => {
  if (props.disabled) return;

  dropdown_openned.value = !dropdown_openned.value;
};

const closeDropdown = () => {
  if (props.disabled) return;

  dropdown_openned.value = false;
};

const selectOption = (option: { label: string; value: string }) => {
  if (option.value === model.value) model.value = "";
  else model.value = option.value;

  closeDropdown();
};
const toggleIcon = computed<string>(() => dropdown_openned.value ? 'ArrowUp2' : 'ArrowDown2');

</script>

<style scoped>
@reference "assets/css/main.css";

.ui-input-dropdown-container {
  @apply flex justify-between items-center border w-60 border-gray-tint-650 rounded-sm transition-all cursor-pointer relative;
}

.ui-input-dropdown-container-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-input-dropdown-container-openned {
  @apply border-1 border-primary w-60 ;
}

.ui-input-dropdown {
  @apply flex-1 rounded-sm border-0 text-gray-shade-800 transition-all cursor-pointer;
}

.ui-input-dropdown-disabled {
  @apply cursor-not-allowed;
}

.ui-input-dropdown-filled {
  @apply text-gray-shade-800;
}

/* ===== size ===== */

.ui-input-dropdown-sm {
  @apply py-2 px-3 text-sm placeholder:text-3xs;
}

.ui-input-dropdown-md {
  @apply py-2 px-3 text-base placeholder:text-xs;
  line-height: 18px;
}

.ui-input-dropdown-lg {
  @apply py-2 px-3 text-h6 placeholder:text-sm;
  line-height: 20px;
}

.ui-input-dropdown-xl {
  @apply py-3 px-4 text-h6 placeholder:text-base;
  line-height: 17px;
}

.ui-input-dropdown-suffix-icon {
  @apply flex justify-center items-center text-gray-shade-100 p-2 transition-all;
}

.ui-input-dropdown-suffix-icon-openned {
  @apply text-gray;
}



.ui-input-dropdown-suffix-icon.ui-input-dropdown-suffix-icon-disabled {
  @apply cursor-not-allowed;
}

.ui-input-dropdown-options {
  @apply absolute flex flex-col w-full top-10 bg-white border border-gray-tint-200 rounded-sm z-10 pb-2;
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
  @apply mx-2 my-2;
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
