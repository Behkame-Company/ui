<template>
  <div class="ui-checkbox">
    <input
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      class="hidden"
    />
    <label
      :class="[disabledClass]"
      class="ui-checkbox-input"
      @click.prevent="toggleCheckbox"
    >
      <div class="p-0.5">
        <span
          class="checkbox-border"
          :class="[checkboxClass, sizeClass, { 'border-1': !model }]"
        >
          <VsxIcon
            v-if="model"
            iconName="TickSquare"
            class="ui-checkbox-icon-color"
            :size="sizeIconClass"
            type="bold"
        /></span>
      </div>

      <span :class="[textSizeClass]" class="ui-checkbox-title">{{
        title
      }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "sm",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const checkboxClass = computed(() => {
  return model.value
    ? "border-none"
    : "border-1 border-gray-shade-50 bg-transparent";
});

const disabledClass = computed(() => ({
  "ui-checkbox-disabled": props.disabled,
}));

const sizeClass = computed(() => {
  switch (props.size) {
    case "lg":
      return "ui-checkbox-lg";
    case "md":
      return "ui-checkbox-md";
    case "sm":
      return "ui-checkbox-sm";
    default:
      return "ui-checkbox-md";
  }
});

const sizeIconClass = computed(() => {
  switch (props.size) {
    case "lg":
      return 24;
    case "md":
      return 20;
    case "sm":
      return 18;
    default:
      return 20;
  }
});

const textSizeClass = computed(() => {
  switch (props.size) {
    case "lg":
      return "ui-checkbox-text-lg";
    case "md":
      return "ui-checkbox-text-md";
    case "sm":
      return "ui-checkbox-text-sm";
    default:
      return "ui-checkbox-text-md";
  }
});

const toggleCheckbox = () => {
  if (!props.disabled) {
    model.value = !model.value;
  }
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-checkbox {
  @apply flex items-center gap-8;
}

.ui-checkbox-input {
  @apply cursor-pointer inline-flex items-center gap-2;
}

.checkbox-border {
  @apply flex items-center justify-center border-1 border-gray-shade-50 rounded-md;
}
.ui-checkbox-lg .checkbox-border {
  @apply w-6 h-6;
}
.ui-checkbox-md .checkbox-border {
  @apply w-5 h-5;
}
.ui-checkbox-sm .checkbox-border {
  @apply w-4.5 h-4.5;
}

.ui-checkbox-title {
  @apply text-gray text-nowrap;
}

.ui-checkbox-lg {
  @apply w-6 h-6;
}
.ui-checkbox-md {
  @apply w-5 h-5;
}
.ui-checkbox-sm {
  @apply w-4.5 h-4.5;
}

.ui-checkbox-text-lg {
  @apply text-base font-medium;
}
.ui-checkbox-text-md {
  @apply text-sm font-medium;
}
.ui-checkbox-text-sm {
  @apply text-2xs font-medium;
}

.ui-checkbox-disabled {
  @apply opacity-50 cursor-not-allowed;
}
.ui-checkbox-icon-color {
  @apply text-primary;
}
</style>
