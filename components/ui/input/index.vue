<template>
  <div
    class="ui-input-container"
    :class="[
      focused ? 'ui-input-container-focused' : '',
      disabled ? 'ui-input-container-disabled' : '',
      prefixCallback ? 'gap-2' : 'gap-1',
      suffixCallback ? 'gap-2' : 'gap-1',
    ]"
  >
    <div
      class="ui-input-prefix-icon"
      v-if="prefixIcon"
      :class="[
        prefixCallback ? 'ui-input-prefix-icon-pointer' : '',
        disabled ? 'ui-input-prefix-icon-disabled' : '',
        focused
          ? prefixCallback
            ? 'ui-input-prefix-icon-pointer-focused'
            : 'ui-input-prefix-icon-focused'
          : '',
      ]"
      :disabled="disabled"
    >
      <VsxIcon :iconName="prefixIcon" :size="iconSizeClass" type="bold" />
    </div>

    <input
      type="text"
      class="ui-input"
      :class="[
        sizeClass,
        !prefixIcon ? 'pl-2' : 'pl-0',
        focused ? 'ui-input-focus' : '',
        disabled ? 'ui-input-disabled' : '',
      ]"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      class="ui-input-suffix-icon"
      v-if="suffixIcon"
      :class="[
        suffixCallback ? 'ui-input-suffix-icon-pointer' : '',
        disabled ? 'ui-input-suffix-icon-disabled' : '',
        focused
          ? suffixCallback
            ? 'ui-input-suffix-icon-pointer-focused'
            : 'ui-input-suffix-icon-focused'
          : '',
      ]"
      :disabled="disabled"
    >
      <VsxIcon :iconName="suffixIcon" :size="iconSizeClass" type="bold" />
    </div>
  </div>
</template>
<script setup lang="ts">
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
});

const focused = ref<boolean>(false);

const sizeClass = computed<string>(() => `ui-input-${props.size}`);

const iconSizeClass = computed<number>(() => {
  switch (props.size) {
    case "xl": return 20;
    case "lg": return 18;
    case "md": return 16;
    case "sm": return 14;
    default: return 16;
  }

});

const onFocus = () => (focused.value = true);

const onBlur = () => (focused.value = false);
</script>
<style>
@reference "assets/css/main.css";

.ui-input-container {
  @apply overflow-hidden flex justify-center  border border-gray-tint-650 rounded-sm transition-all placeholder:text-gray-shade-400;
}

.ui-input-container-disabled {
  @apply opacity-50;
}

.ui-input-container-focused {
  @apply border-1 border-primary;
}

.ui-input-prefix-icon {
  @apply flex justify-center items-center text-gray-shade-400 py-2 pr-1 pl-1.5 transition-all;
}

.ui-input-prefix-icon-focused {
  @apply text-gray-shade-800;
}

.ui-input-prefix-icon-pointer {
  @apply flex justify-center p-2.25 bg-gray-tint-650 hover:bg-blue-250 hover:text-primary cursor-pointer;
}
.ui-input-prefix-icon-pointer-focused {
  @apply bg-blue-250 text-primary cursor-pointer;
}

.ui-input-prefix-icon-pointer.ui-input-prefix-icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed;
}

.ui-input-suffix-icon {
  @apply flex justify-center  items-center text-gray-shade-400 py-2 pl-2 pr-1.5 transition-all;
}

.ui-input-suffix-icon-focused {
  @apply text-gray-shade-800;
}

.ui-input-suffix-icon-pointer {
  @apply bg-gray-tint-650 hover:bg-blue-250 p-2.25 hover:text-primary cursor-pointer;
}
.ui-input-suffix-icon-pointer-focused {
  @apply bg-blue-250 text-primary cursor-pointer;
}

.ui-input-suffix-icon-pointer.ui-input-suffix-icon-disabled {
  @apply hover:bg-gray-tint-650 hover:text-gray-shade-400 cursor-not-allowed;
}

.ui-input {
  @apply flex-1 rounded-sm ring-0 focus:ring-0 border-0 text-gray-shade-800 placeholder:text-gray-shade-400 transition-all;
}

.ui-input-focus {
  @apply text-gray-shade-800;
}

.ui-input-disabled {
  @apply cursor-not-allowed;
}

/* ===== size ===== */

.ui-input-sm {
  @apply py-2 pr-2  text-xs placeholder:text-3xs placeholder:font-normal;
}

.ui-input-md {
  @apply py-2 pr-2 text-2xs placeholder:text-2xs placeholder:font-normal;
}

.ui-input-lg {
  @apply py-2.25 pr-2  text-sm placeholder:text-sm placeholder:font-normal;
}

.ui-input-xl {
  @apply py-2 pr-3  text-base placeholder:text-base placeholder:font-normal;
}
</style>
