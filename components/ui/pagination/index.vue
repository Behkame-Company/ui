<template>
  <div class="ui-pagination-container">
    <!-- Pagination Controls (Prev / Pages / Next) -->
    <div class="ui-pagination-wrapper">
      <!-- Previous Button -->
      <button class="ui-button-arrow" @click="prev" :disabled="isFirstPage">
        <VsxIcon iconName="ArrowLeft2" class="ui-icon" :size="18" type="linear" />
      </button>

      <!-- Page Number Buttons: Hidden when 'All' is selected -->
      <template v-if="localPerPage !== -1">
        <template v-for="page in windowedPages" :key="page + '-' + Math.random()">
          <button
            v-if="page !== -1"
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
          <span v-else class="ui-page-ellipsis">...</span>
        </template>
      </template>

      <!-- Next Button -->
      <button class="ui-button-arrow" @click="next" :disabled="isLastPage">
        <VsxIcon iconName="ArrowRight2" class="ui-icon" :size="18" type="linear" />
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

const windowSize = 3; // Number of pages to show on each side of the current page

const windowedPages = computed<number[]>(() => {
  if (localPerPage.value === -1) return [];
  const total = totalPages.value;
  const current = props.currentPage;
  const window = windowSize;
  let start = Math.max(1, current - window);
  let end = Math.min(total, current + window);

  // Always show first and last page
  if (start > 2) start++;
  if (end < total - 1) end--;

  const pages: number[] = [];
  if (start > 1) pages.push(1);
  if (start > 2) pages.push(-1); // -1 will represent '...'

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) pages.push(-1); // -1 will represent '...'
  if (end < total) pages.push(total);

  return pages;
});

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
  @apply flex items-center justify-center gap-2;
}

.ui-page-button {
  @apply w-5.5 h-7 p-1.5 flex items-center justify-center rounded-sm text-sm transition duration-300 cursor-pointer;
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
  @apply text-gray-shade-800 cursor-pointer;
}
.ui-button-arrow:disabled {
 @apply opacity-50 cursor-not-allowed;
}

.ui-page-ellipsis {
  @apply px-2 text-gray-shade-400 select-none;
}
</style>
