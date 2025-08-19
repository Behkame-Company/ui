<!--
  Input Component Usage Guide:

  PARENT COMPONENT USAGE:
    
    <UiInput
      v-model="search"
      placeholder="Search..."
      prefixIcon="SearchNormal1"
      prefixIconType="linear"
      size="lg"
    />
  </template>

  PROPS:
  - name: string (default: "")
  - placeholder: string (default: "")
  - size: 'sm' | 'md' | 'lg' | 'xl' (default: "md")
  - prefixIcon: string (default: "")
  - prefixCallback: Function | null (default: null)
  - suffixIcon: string (default: "")
  - suffixCallback: Function | null (default: null)
  - disabled: boolean (default: false)
  - prefixIconType: IconType (default: "bold")
  - suffixIconType: IconType (default: "bold")

-->

<template>
  <div
    class="ui-input__container"
    :class="[
      focused ? 'ui-input__container-focused' : '',
      disabled ? 'ui-input__container-disabled' : '',
      prefixCallback ? 'gap-2' : 'gap-1',
      suffixCallback ? 'gap-2' : 'gap-1',
    ]"
  >
    <div
      class="ui-input__prefix__icon"
      v-if="prefixIcon"
      :class="[
        prefixCallback ? 'ui-input__prefix__icon-pointer' : '',
        disabled ? 'ui-input__prefix__icon-disabled' : '',
        focused
          ? prefixCallback
            ? 'ui-input__prefix__icon-pointer-focused'
            : 'ui-input__prefix__icon-focused'
          : '',
      ]"
      :disabled="disabled"
    >
      <VsxIcon :iconName="prefixIcon" :size="iconSizeClass" :type="prefixIconType" />
    </div>

    <input
      type="text"
      class="w-full"
      :class="[
        sizeClass,
        !prefixIcon ? 'pl-2' : 'pl-0',
        focused ? 'ui-input__focus' : '',
        disabled ? 'ui-input__disabled' : '',
      ]"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      class="ui-input__suffix__icon"
      v-if="suffixIcon"
      :class="[
        suffixCallback ? 'ui-input__suffix__icon-pointer' : '',
        disabled ? 'ui-input__suffix__icon-disabled' : '',
        focused
          ? suffixCallback
            ? 'ui-input__suffix__icon-pointer-focused'
            : 'ui-input__suffix__icon-focused'
          : '',
      ]"
      :disabled="disabled"
      @click="!disabled && suffixCallback && suffixCallback()"
    >
      <VsxIcon :iconName="suffixIcon" :size="iconSizeClass" :type="suffixIconType" />
    </div>
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
// No external imports needed for this component

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
    default: "md", // valid values: sm, md, lg, xl
    validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
  },
  prefixIcon: {
    type: String,
    default: "", // choose icon name form iconify, example: `uil:bolt-alt`
  },
  prefixCallback: {
    type: Function || null,
    default: null, // if you put some callback value it will get new style for prefix icon
  },
  suffixIcon: {
    type: String,
    default: "", // choose icon name form iconify, example: `uil:bolt-alt`
  },
  suffixCallback: {
    type: Function || null,
    default: null, // if you put some callback value it will get new style for suffix icon
  },
  disabled: {
    type: Boolean,
    default: false, // pass this variable true if you want the input to get disabled
  },
  prefixIconType: {
    type: String,
    default: "bold",
    validator: (value: string) => ["linear", "outline", "bold", "bulk", "broken", "twotone"].includes(value)
  },
  suffixIconType: {
    type: String,
    default: "bold",
    validator: (value: string) => ["linear", "outline", "bold", "bulk", "broken", "twotone"].includes(value)
  },
  type: {
    type: String,
    default: "text",
    validator: (value: string) => ["text", "password", "email", "number", "tel", "url"].includes(value)
  }
})

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
// Using defineModel for v-model binding
const model = defineModel<string>({ required: true })

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
/** Controls the focus state of the input */
const focused = ref<boolean>(false)

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
/** Size class for the input based on the size prop */
const sizeClass = computed<string>(() => `ui-input__${props.size}`)

/** Icon size based on the input size */
const iconSizeClass = computed<number>(() => {
  switch (props.size) {
    case "xl": return 20
    case "lg": return 18
    case "md": return 16
    case "sm": return 14
    default: return 16
  }
})

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
/**
 * Handle input focus event
 */
 const onFocus = (): void => {
  focused.value = true
}

/**
 * Handle input blur event
 */
const onBlur = ():void =>{
  focused.value = false

} 
</script>
<style>
@reference "~/assets/css/main.css";
.ui-input__container {
  @apply overflow-hidden flex justify-center  border border-gray-tint-650 rounded-sm transition-all placeholder:text-gray-shade-400 text-nowrap ;
}

.ui-input__container-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.ui-input__container-focused {
  @apply border-1 border-primary;
}

.ui-input__prefix__icon {
  @apply flex justify-center items-center text-gray-shade-400 py-2 pr-1 pl-1.5 transition-all;
}

.ui-input__prefix__icon-focused {
  @apply text-gray-shade-800;
}

.ui-input__prefix__icon-pointer {
  @apply flex justify-center p-2.25 bg-gray-tint-650 hover:bg-blue-250 hover:text-primary cursor-pointer;
}
.ui-input__prefix__icon-pointer-focused {
  @apply bg-blue-250 text-primary cursor-pointer;
}

.ui-input__prefix__icon-pointer.ui-input__prefix__icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed;
}

.ui-input__suffix__icon {
  @apply flex justify-center  items-center text-gray-shade-400 py-2 pl-2 pr-1.5 transition-all;
}

.ui-input__suffix__icon-focused {
  @apply text-gray-shade-800;
}

.ui-input__suffix__icon-pointer {
  @apply bg-gray-tint-650 hover:bg-blue-250 p-2.25 hover:text-primary cursor-pointer;
}
.ui-input__suffix__icon-pointer-focused {
  @apply bg-blue-250 text-primary cursor-pointer;
}

.ui-input__suffix__icon-pointer.ui-input__suffix__icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed;
}

.ui-input {
  @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-gray-shade-800 placeholder:text-gray-shade-400 transition-all;
}

.ui-input__focus {
  @apply text-gray-shade-800 ;
}

.ui-input__disabled {
  @apply cursor-not-allowed;
}

/* ===== size ===== */

.ui-input__sm {
  @apply py-2 px-2  text-3xs placeholder:text-3xs placeholder:font-normal;
}

.ui-input__md {
  @apply py-2 px-2 text-2xs placeholder:text-2xs placeholder:font-normal;
}

.ui-input__lg {
  @apply py-2.25 px-2  text-sm placeholder:text-sm placeholder:font-normal;
}

.ui-input__xl {
  @apply py-2 px-3  text-base placeholder:text-base placeholder:font-normal;
}
</style>
