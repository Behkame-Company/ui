<template>
  <div class="ui-pagination-container">
    <!-- Pagination Controls (Prev / Pages / Next) -->
    <div class="ui-pagination-wrapper">
      <!-- Previous Button -->
      <button class="ui-page-button" @click="prev" :disabled="isFirstPage">
        <Icon name="heroicons:chevron-left" class="ui-icon" />
      </button>

      <!-- Page Number Buttons: Hidden when 'All' is selected -->
      <template v-if="localPerPage !== -1">
        <button
          v-for="page in pages"
          :key="page"
          @click="() => goToPage(page)"
          :class="[
            'ui-page-button',
            page === currentPage
              ? 'ui-page-button-active'
              : type === 'bordered'
              ? 'ui-page-button-inactive-bordered'
              : 'ui-page-button-inactive',
          ]"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next Button -->
      <button class="ui-page-button" @click="next" :disabled="isLastPage">
        <Icon name="heroicons:chevron-right" class="ui-icon" />
      </button>
    </div>

    <!-- Page Info + Per Page Selector -->
    <div class="ui-pagination-info">
      From {{ from }} to {{ to }} of {{ total }} records

      <select
        v-model.number="localPerPage"
        @change="changePerPage"
        class="ui-page-size-select"
      >
        <option v-for="n in [5, 10, 15, 20]" :key="n" :value="n">
          {{ n }}
        </option>
        <option :value="-1">all</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "bordered"].includes(value),
  },
  // size: {
  //   type: String,
  //   default: "md",
  //   validator: (value: string) => ["sm", "md", "lg"].includes(value),
  // },
});

const emit = defineEmits<{
  (e: "update:perPage", value: number): void;
  (e: "update:currentPage", value: number): void;
}>();

const localPerPage = ref<number>(props.perPage);

watch(
  () => props.perPage,
  (val: number) => {
    localPerPage.value = val;
  }
);

const totalPages = computed<number>(() =>
  localPerPage.value === -1 ? 1 : Math.ceil(props.total / localPerPage.value)
);

// TODO: For large page counts, consider windowed pagination (e.g., 1 ... 4 5 6 ... 10)
const pages = computed<number[]>(() =>
  localPerPage.value === -1
    ? []
    : Array.from({ length: totalPages.value }, (_, i) => i + 1)
);

const goToPage = (page: number) => {
  emit("update:currentPage", page);
};

const isFirstPage = computed<boolean>(() =>
  props.currentPage === 1 || localPerPage.value === -1
);
const prev = () => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1);
};
const next = () => {
  if (props.currentPage < totalPages.value) emit("update:currentPage", props.currentPage + 1);
};

const isLastPage = computed<boolean>(() =>
  props.currentPage === totalPages.value || localPerPage.value === -1
);

const from = computed<number>(() =>
  localPerPage.value === -1 ? 1 : (props.currentPage - 1) * localPerPage.value + 1
);

const to = computed<number>(() =>
  localPerPage.value === -1
    ? props.total
    : Math.min(props.currentPage * localPerPage.value, props.total)
);

const changePerPage = (): void => {
  emit("update:perPage", localPerPage.value);
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-pagination-container {
  @apply flex justify-between items-center w-full text-sm;
}

.ui-pagination-wrapper {
  @apply flex items-center gap-2;
}

.ui-page-button {
  @apply w-5.5 h-7 flex items-center justify-center rounded-sm text-sm transition duration-300 cursor-pointer;
}

.ui-page-button-inactive {
  @apply py-1 px-0 bg-transparent text-gray-shade-400;
}

.ui-page-button-inactive-bordered {
  @apply bg-transparent text-primary border border-gray-tint-650;
}

.ui-page-button-active {
  @apply bg-primary text-white;
}

.ui-pagination-info {
  @apply flex items-center tracking-wide gap-6 text-gray-shade-400;
}

.ui-page-size-select {
  @apply border border-gray-tint-650 rounded-sm py-1 px-2 text-sm text-primary cursor-pointer;
}

.ui-icon {
  @apply text-gray-shade-800 w-8 h-8;
}
.ui-page-button:disabled {
 @apply opacity-50 cursor-not-allowed;
}
</style>
