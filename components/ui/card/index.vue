<template>
    <div class="ui-card" :class="sizeClass">
      <!-- Header -->
      <div class="ui-card-header" :class="headerClass" v-if="$slots.header">
        <slot name="header" />
        <!-- Icon rendering with guards -->
        <VsxIcon
          v-if="sizeIcon"
          iconName="CloseCircle"
          class="ui-card-header-icon"
          :size="sizeIcon"
          type="bold"
        />
      </div>
  
      <!-- Body -->
      <div class="ui-card-body" :class="bodyClass">
        <div v-if="image" :class="imageSize">
          <img :src="image" alt="Card image" class="ui-card-image w-full block" />
        </div>
        <slot />
      </div>
  
      <!-- Footer -->
      <div class="ui-card-footer" v-if="$slots.footer">
        <slot
          name="footer"
          :button-class="`${buttonClass} ${buttonColorClass}`"
        ></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    size: {
      type: String,
      default: "sm",
      validator: (value: string) => ["sm", "md", "lg", "xl"].includes(value),
    },
    buttonColor: {
      type: String,
      default: "primary",
      validator: (value: string) =>
        ["primary", "success", "warning", "danger", "info", "gray"].includes(value),
    },
    image: {
      type: String,
      default: "",
    },
  });
  
  const sizeClass = computed(() => `ui-card-${props.size}`);
  const headerClass = computed(() => `ui-card-header-${props.size}`);
  const bodyClass = computed(() => `ui-card-body-${props.size}`);
  const buttonClass = computed(() => `ui-card-button-${props.size}`);
  const buttonColorClass = computed(() => `ui-card-button-${props.buttonColor}`);
  
  const sizeIcon = computed(() => {
    switch (props.size) {
      case "xl": return 28;
      case "lg": return 24;
      case "md": return 22;
      case "sm":
      default: return 18;
    }
  });
  
  const imageSize = computed(() => {
    switch (props.size) {
      case "xl": return "py-6";
      case "lg": return "py-4";
      case "md": return "py-4";
      case "sm":
      default: return "py-4";
    }
  });
  </script>
  
<style scoped>
@reference "assets/css/main.css";

.ui-card {
  @apply rounded-lg bg-white transition-all duration-300;
}

.ui-card-header {
  @apply flex flex-row justify-between items-center border-b border-gray-tint-400;
}

.ui-card-header-icon {
  @apply cursor-pointer p-0.5  text-gray-shade-800;
}
/* shadow */

.ui-card-xl {
  @apply shadow-xs hover:shadow-lg;
}

.ui-card-lg {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card-md {
  @apply shadow-2xs hover:shadow-sm;
}

.ui-card-sm {
  @apply shadow-2xs hover:shadow-sm;
}

/* size header */
.ui-card-xl > .ui-card-header {
  @apply pb-4;
}

.ui-card-lg > .ui-card-header {
  @apply pb-3;
}

.ui-card-md > .ui-card-header {
  @apply pb-3;
}

.ui-card-sm > .ui-card-header {
  @apply pb-2;
}

/* size body */

.ui-card-xl > .ui-card-body {
  @apply py-6;
}

.ui-card-lg > .ui-card-body {
  @apply py-4;
}

.ui-card-md > .ui-card-body {
  @apply py-4;
}

.ui-card-sm > .ui-card-body {
  @apply py-4;
}

/* size footer */

/* .ui-card-xl > .ui-card-footer {
    @apply pb-4 px-4 ;
}

.ui-card-lg > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-md > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-sm > .ui-card-footer {
    @apply pb-2 px-2 ;
}   */

/* Header font sizes */
.ui-card-header-sm {
  @apply text-sm font-bold;
}
.ui-card-header-md {
  @apply text-base font-bold;
}
.ui-card-header-lg {
  @apply text-h6 font-semibold;
}
.ui-card-header-xl {
  @apply text-h5 font-semibold;
}

/* Body font sizes */
.ui-card-body-sm {
  @apply text-2xs;
}
.ui-card-body-md {
  @apply text-xs;
}
.ui-card-body-lg {
  @apply text-sm;
}
.ui-card-body-xl {
  @apply text-base;
}

.ui-card-sm {
  @apply p-2;
}
.ui-card-md {
  @apply p-3;
}
.ui-card-lg {
  @apply p-4;
}
.ui-card-xl {
  @apply p-4;
}

.ui-card-button-primary {
  @apply bg-primary  text-white;
}
.ui-card-button-success {
  @apply bg-success  text-white;
}
.ui-card-button-warning {
  @apply bg-warning  text-white;
}
.ui-card-button-danger {
  @apply bg-error  text-white;
}
.ui-card-button-info {
  @apply bg-info  text-white;
}
.ui-card-button-gray {
  @apply bg-gray  text-white;
}

.ui-card-image {
  @apply w-full h-auto rounded-t-lg object-cover;
  max-height: 200px; /* or any value you prefer */
  display: block;
}
</style>
