
<template>
  <div v-if="modelValue" class="ui-modal-backdrop">
    <div :class="['ui-modal', sizeClass]">
      <!-- Header Slot -->
      <div class="ui-modal-header" v-if="$slots.header" :class="headerTitleClass">
        <slot name="header" />
        <button class="ui-modal-close-btn" @click="closeModal" type="button">
    <VsxIcon  v-if="sizeIconClass"
          iconName="CloseCircle"
          class="ui-modal-header-icon"
          :size="sizeIconClass"
          type="bold" />
  </button>
      </div>
      <!-- Body Slot -->
      <div class="ui-modal-body" :class="bodyTextClass">
        <div v-if="image" class="mb-4" >
          <img :src="image" alt="Modal image" class="w-full h-auto rounded object-cover max-h-60" />
        </div>
        <slot name="body" ></slot>
      </div>
      <!-- Footer Slot -->
      <div class="ui-modal-footer" v-if="$slots.footer"  >
        <slot name="footer" ></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  size: {
    type: String,
    default: 'md',
    validator: (v: string) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
  image: {
    type: String,
    default: '',
  },
});
const sizeIconClass = computed(() => {
    switch (props.size) {
      case "xl": return 28;
      case "lg": return 24;
      case "md": return 22;
      case "sm":
      default: return 18;
    }
  });
  const sizeClass = computed(() => `ui-modal-${props.size}`);

const headerTitleClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'modal-header-title-sm';
    case 'md': return 'modal-header-title-md';
    case 'lg': return 'modal-header-title-lg';
    case 'xl': return 'modal-header-title-xl';
    default: return 'modal-header-title-md';
  }
});

const bodyTextClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'modal-body-text-sm';
    case 'md': return 'modal-body-text-md';
    case 'lg': return 'modal-body-text-lg';
    case 'xl': return 'modal-body-text-xl';
    default: return 'modal-body-text-md';
  }
});



const emit = defineEmits(['update:modelValue']);
function closeModal() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
@reference "assets/css/main.css";
.ui-modal-backdrop {
  @apply fixed inset-0 bg-black/60  flex items-center justify-center z-50;
}
.ui-modal {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300;
 
}
.ui-modal-header-icon {
  @apply cursor-pointer p-0.5 text-gray-shade-800;
}
.ui-modal-sm { @apply w-80 pb-2 }
.ui-modal-md { @apply w-114 pb-3 }
.ui-modal-lg { @apply w-138 pb-3  }
.ui-modal-xl { @apply w-148 pb-4  }
.ui-modal-header {
  @apply  flex flex-row justify-between items-center bg-gray-tint-200 ;
}
.modal-header-title-sm { @apply p-2  text-sm font-semibold text-gray-shade-800; }
.modal-header-title-md { @apply p-3  text-base font-semibold text-gray-shade-800; }
.modal-header-title-lg { @apply p-3 text-h6 font-semibold text-gray-shade-800; }
.modal-header-title-xl { @apply p-4  text-h5 font-semibold text-gray-shade-800; }


.modal-body-text-sm { @apply text-2xs font-normal text-gray-shade-800 px-2 py-4; }
.modal-body-text-md { @apply text-sm font-normal text-gray-shade-800 px-3 py-4 ; }
.modal-body-text-lg { @apply text-sm font-normal text-gray-shade-800 px-3 py-4; }
.modal-body-text-xl { @apply text-base font-normal text-gray-shade-800 px-4 py-4; }

.ui-modal-footer {
  @apply  px-2 flex justify-end ;
}



</style>