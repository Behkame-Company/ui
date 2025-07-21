<template>
  <div class="ui-checkbox">
    <input
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      class="hidden"
    />
    <label
      :class="[disabled_class]"
      class="ui-checkbox-input"
      @click.prevent="toggleCheckbox"
    >
      <div class="p-0.5">
        <VsxIcon
          v-if="model"
          iconName="TickSquare"
          class="ui-checkbox-icon-color"
          :size="size_icon_class"
          type="bold"
        />

        <span
          v-else
          class="checkbox-border"
          :class="[checkbox_class, size_class]"
        ></span>
      </div>

      <span :class="[text_size_class]" class="ui-checkbox-title">{{
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

const checkbox_class = computed(() => {
  return model.value
    ? "bg-primary border-primary"
    : "border-gray-shade-50 bg-transparent";
});

const disabled_class = computed(() => ({
  "ui-checkbox-disabled": props.disabled,
}));

const size_class = computed(() => {
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

const size_icon_class = computed(() => {
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

const text_size_class = computed(() => {
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
  @apply inline-flex items-center justify-center border-1  border-gray-shade-50 rounded-md gap-2;
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
