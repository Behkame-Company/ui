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
      <span class="checkbox-border" :class="[checkbox_class, size_class]">
        <Icon v-if="model" name="si:check-fill" :class="size_icon_class" />
      </span>
      <span :class="[text_size_class]" class="ui-checkbox-title">{{ title }}</span>
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
      return "ui-checkbox-icon-lg";
    case "md":
      return "ui-checkbox-icon-md";
    case "sm":
      return "ui-checkbox-icon-sm";
    default:
      return "ui-checkbox-icon-md";
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
  @apply inline-flex items-center justify-center rounded-sm gap-2 border-1 p-1;
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

.ui-checkbox-icon-lg {
  @apply w-4.5 h-4.5 text-white;
}
.ui-checkbox-icon-md {
  @apply w-3.5 h-3.5 text-white;
}
.ui-checkbox-icon-sm {
  @apply w-3 h-3 text-white;
}

.ui-checkbox-text-lg {
  @apply text-h6;
}
.ui-checkbox-text-md {
  @apply text-base;
}
.ui-checkbox-text-sm {
  @apply text-sm;
}

.ui-checkbox-disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
