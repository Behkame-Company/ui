<template>
    <button
      class="ui-button"
      @click="onTap"
      :disabled="disabled"
      :class="{
        [sizeClass]: true,
        [colorClass]: true,
        'ui-button-disabled': disabled,
      }"
    >
  
      
    
        <VsxIcon
          v-if="icon"
          :iconName="icon"
          :size="iconSize"
          type="bold"
        />
       
      
     
    
    </button>
  </template>
  <script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false, // set this to true to disable the button
    },
  
  
    size: {
      type: String,
      default: "sm", // set this to the size of the button
      validator: (value: string) =>
        ["md", "lg", "xl"].includes(value),
    },
    color: {
      type: String,
      default: "primary", // set this to the color of the button
      validator: (value: string) =>
        [
          "primary",
          "outline",
          "secondary",
          "dark",
          "text-bt",
          "error",
          "success",
          "warning",
          "info",
          "low-contrast",
        ].includes(value),
    },
  
    icon: {
      type: String,
      default: "", // set this name of the icon to add to the prefix of the button
    },
  
  });
  
  const emit = defineEmits<{
    (e: "tap"): void;
  }>();
  
  const onTap = () => emit("tap");
  
  const colorClass = computed<string>(() => {
    switch (props.color) {
      case "primary":
        return "ui-button-primary";
      case "outline":
        return "ui-button-outline";
      case "secondary":
        return "ui-button-secondary";
      case "dark":
        return "ui-button-dark";
      case "text-bt":
        return "ui-button-text-bt";
      case "gray":
        return "ui-button-gray";
      case "error":
        return "ui-button-error";
      case "success":
        return "ui-button-success";
      case "warning":
        return "ui-button-warning";
      case "info":
        return "ui-button-info";
      default:
        return "ui-button-primary";
    }
  });
  
  const sizeClass = computed<string>(() => {
    switch (props.size) {
      case "xl":
        return "ui-button-xl";
      case "lg":
        return "ui-button-lg";
      case "md":
        return "ui-button-md";
      case "sm":
        return "ui-button-sm";
      case "xs":
        return "ui-button-xs";
      default:
        return "ui-button-xl";
    }
  });
  

  
  const iconSize = computed<number>(() => {
    switch (props.size) {
      case "xl": return 24;
      case "lg": return 20;
      case "md": return 16;
      default: return 16;
    }
  });
 

  </script>
  <style scoped>
  @reference "assets/css/main.css";
  
  .ui-button {
    @apply flex items-center justify-center border-1 rounded-md transition-all cursor-pointer text-nowrap ;
  }
  
  .ui-button-disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  /* ===== color ===== */
  
  .ui-button-primary {
    @apply text-white bg-primary hover:bg-blue-800 border-primary hover:border-blue-800 focus:bg-blue-999  focus:border-primary;
  }
  
  .ui-button-primary:disabled {
    @apply hover:bg-primary hover:border-primary;
  }
  
  .ui-button-outline {
    @apply text-primary  bg-transparent border-primary hover:bg-blue-100 hover:border-2 hover:border-primary focus:bg-blue-200 focus:border-primary focus:border-2;
  }
  
  .ui-button-outline:disabled {
    @apply hover:bg-transparent hover:border-primary;
  }
  
  .ui-button-secondary {
    @apply text-primary bg-blue-200 hover:bg-blue-300 border-blue-200 hover:border-blue-300 focus:bg-blue-300 focus:border-primary focus:border-2;
  }
  
  .ui-button-secondary:disabled {
    @apply hover:bg-blue-200 hover:border-blue-200;
  }
  
  .ui-button-gray {
    @apply text-white bg-gray hover:bg-gray-shade-800 border-gray hover:border-gray-shade-800 focus:bg-gray-shade-900 focus:border-gray-shade-900;
  }
  
  .ui-button-gray:disabled {
    @apply hover:bg-gray hover:border-gray;
  }
  
  .ui-button-dark {
    @apply text-white bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-850 border-cyan-lc-shade-999 hover:border-cyan-lc-shade-850  focus:bg-cyan-lc-shade-700 focus:border-cyan-lc-shade-700;
  }
  .ui-button-dark:disabled {
    @apply bg-cyan-lc-shade-999 hover:bg-cyan-lc-shade-999;
  }
  
  .ui-button-text-bt {
    @apply text-gray hover:text-primary  bg-transparent  hover:bg-blue-200   border-none hover:border-blue-200 focus:text-blue-999  focus:bg-blue-250 focus:border-blue-250;
  }
  
  .ui-button-text-bt:disabled {
    @apply text-primary  bg-white;
  }
  
  .ui-button-error {
    @apply text-white bg-error hover:bg-red-800 border-error hover:border-red-800 focus:bg-red-900 focus:border-red-900;
  }
  
  .ui-button-error:disabled {
    @apply hover:bg-error hover:border-error;
  }
  
  .ui-button-success {
    @apply text-white bg-success hover:bg-green-750 border-success hover:border-green-750 focus:bg-green-950 focus:border-green-950;
  }
  
  .ui-button-success:disabled {
    @apply hover:bg-success hover:border-success;
  }
  
  .ui-button-warning {
    @apply text-white bg-warning hover:bg-orange-600 border-warning hover:border-orange-600 focus:bg-orange-900 focus:border-orange-900;
  }
  
  .ui-button-warning:disabled {
    @apply hover:bg-warning hover:border-warning;
  }
  
  .ui-button-info {
    @apply text-white bg-info hover:bg-purple-700 border-info hover:border-purple-700 focus:bg-purple-850 focus:border-purple-850;
  }
  
  .ui-button-info:disabled {
    @apply hover:bg-info hover:border-info;
  }
  
  /* ===== size ===== */
  
  .ui-button-xl {
    @apply p-3;
  }
  
  .ui-button-lg {
    @apply p-2.5;
  }
  
  .ui-button-md {
    @apply p-1;
  }

  .ui-button-text {
    @apply w-full;
  }
  </style>
  