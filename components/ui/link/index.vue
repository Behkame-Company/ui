<template>
  
    <a
      class="ui-link-text"
      :href
      :class="{ [size_class]: true, [color_class]: true }"
      >{{ props.text }}</a
    >
 
</template>
<script lang="ts" setup>

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
 href:{
  type:String,
  default: "",
 },
  color: {
    type: String,
    default: "primary", // set this to the color of the link
    validator: (value: string) =>
      [
        "primary",
        "secondary",
        "dark",
        "error",
        "success",
        "warning",
        "info",
        "gray",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md", // set this to the size of the link
    validator: (value: string) =>
      ["xs", "sm", "md", "lg", "xl"].includes(value),
  },
});

const color_class = computed<string>(() => {
  switch (props.color) {
    case "primary":
      return "ui-link-primary";
    case "outline":
      return "ui-link-outline";
    case "secondary":
      return "ui-link-secondary";
    case "gray":
      return "ui-link-gray";
    case "text-bt":
      return "ui-link-text-bt";
    case "dark":
      return "ui-link-dark";
    case "error":
      return "ui-link-error";
    case "success":
      return "ui-link-success";
    case "warning":
      return "ui-link-warning";
    case "info":
      return "ui-link-info";
    default:
      return "ui-link-primary";
  }
});

const size_class = computed<string>(() => {
  switch (props.size) {
    case "xl":
      return "ui-link-text-xl";
    case "lg":
      return "ui-link-text-lg";
    case "md":
      return "ui-link-text-md";
    case "sm":
      return "ui-link-text-sm";
    case "xs":
      return "ui-link-text-xs";
    default:
      return "ui-link-text-md";
  }
});
</script>

<style scoped>
@reference "assets/css/main.css";


.ui-link-text {
  @apply flex justify-center items-center px-8 py-4 underline underline-offset-4;
}
.ui-link-primary {
  @apply text-primary decoration-primary;
}
.ui-link-gray {
  @apply text-gray decoration-gray;
}
.ui-link-secondary {
  @apply text-blue-200 decoration-blue-200;
}
.ui-link-dark {
  @apply text-cyan-lc-shade-999 decoration-cyan-lc-shade-999;
}
.ui-link-error {
  @apply text-error decoration-error;
}
.ui-link-success {
  @apply text-success decoration-success;
}
.ui-link-warning {
  @apply text-warning decoration-warning;
}
.ui-link-info {
  @apply text-info decoration-info;
}

.ui-link-text-xl {
  @apply text-h6 font-medium;
}

.ui-link-text-lg {
  @apply text-base font-medium;
}

.ui-link-text-md {
  @apply text-sm font-medium;
}

.ui-link-text-sm {
  @apply text-xs font-medium;
}
.ui-link-text-xs {
  @apply text-2xs font-medium;
}
</style>
