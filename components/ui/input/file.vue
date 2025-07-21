<template>
  <div class="ui-file-input-container">
    <label class="ui-file-label" :class="{ 'has-icon': chooseIcon }">
     
      <span class="ui-file-choose" @click="triggerFileInput">
        <template v-if="chooseIcon">
          <VsxIcon :iconName="chooseIcon" :size="chooseIconSize" type="bold" />
        </template>
        <template v-else>
          {{ chooseText }}
        </template>
      </span>
      <span class="ui-file-name">
        {{ fileName || placeholder }}
      </span>
      <input
        ref="fileInput"
        type="file"
        class="ui-file-input"
        @change="onFileChange"
        :accept="accept"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  chooseText?: string;  // text for choose file button
  chooseIcon?: string;  // icon name for choose file button
  chooseIconSize?: number | string; // icon size for choose file button
  placeholder?: string; // placeholder text for file name
  prefix_icon?: string; // optional icon at the start
  prefix_icon_size?: number | string; // size for prefix icon
  accept?: string; // accept file type
}>();

const emit = defineEmits<{
  (e: 'change', file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>('');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  fileName.value = file?.name || '';
  emit('change', file);
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-file-input-container {
  @apply w-max-content h-11 flex items-center;
}
.ui-file-label {
  @apply flex text-center w-full h-full border border-primary rounded-sm transition-all cursor-pointer ;
}
.ui-file-label.has-icon {
  @apply pl-0;
}
.ui-file-icon {
  @apply flex items-center justify-center w-5 h-5 py-3 px-3.25 bg-blue-tint-250   text-primary rounded-sm;
}
.ui-file-choose {
  @apply text-primary  bg-blue-tint-250 text-base font-medium  cursor-pointer whitespace-nowrap px-3.25 py-2.75;
}
.ui-file-name {
  @apply  text-gray-shade-400 text-base placeholder:text-base whitespace-nowrap  px-2 py-2 ;
}
.ui-file-input {
  @apply hidden;
}
</style>