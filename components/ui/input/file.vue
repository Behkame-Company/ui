<template>
  <div class="ui-file-input-container">
    <label class="ui-file-label" :class="{ 'has-icon': icon }">
      <span class="ui-file-choose" @click="fileInput?.click()">
        <template v-if="icon">
          <VsxIcon :iconName="icon" :size="size" type="bold" />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
      <span class="ui-file-name">
        {{ fileName || placeholder }}
      </span>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onFileChange"
        :accept="accept"
      />
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    default: "Choose File",
  },
  icon: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 20,
  },
  placeholder: {
    type: String,
    default: "No file chosen",
  },
  accept: {
    type: String,
    default: "*",
  },
});

const emit = defineEmits<{
  (e: "change", file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>("");


const onFileChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const file: File | null = target.files?.[0] || null;
  fileName.value = file?.name || "";
  emit("change", file);
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-file-input-container {
  @apply w-1/4  h-11 flex items-center gap-2;
}
.ui-file-label {
  @apply flex text-center w-full h-full border border-primary rounded-sm  transition-all cursor-pointer;
}
.ui-file-label.has-icon {
  @apply pl-0;
}
.ui-file-icon {
  @apply flex items-center justify-center  py-3 px-3.25 bg-blue-tint-250  text-primary rounded-sm;
}
.ui-file-choose {
  @apply text-primary  bg-blue-tint-250 text-base font-medium truncate cursor-pointer whitespace-nowrap px-3.25 py-2.75;
}
.ui-file-name {
  @apply text-gray-shade-400 text-base placeholder:text-base whitespace-nowrap text-center  px-2 py-2.75;
}

</style>
