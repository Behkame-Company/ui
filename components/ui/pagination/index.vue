<template>
  <div class="ui-pagination-container">
    <!-- Pagination Controls (Prev / Pages / Next) -->
    <div class="ui-pagination-wrapper">
      <!-- Previous Button -->
      <button class="ui-page-button" @click="prev" :disabled="isFirstPage">
        <Icon name="heroicons:chevron-left" class="ui-icon" />
      </button>

      <!-- Page Number Buttons -->
      <button
        v-for="page in pages"
        :key="page"
        @click="() => onClick(page)"
        :class="[
          'ui-page-button',
          // Style current page differently
          page === currentPage
            ? 'ui-page-button-active'
            : type === 'bordered'
            ? 'ui-page-button-inactive-bordered'
            : 'ui-page-button-inactive',
        ]"
      >
        {{ page }}
      </button>

      <!-- Next Button -->
      <button class="ui-page-button" @click="next" :disabled="isLastPage">
        <Icon name="heroicons:chevron-right" class="ui-icon" />
      </button>
    </div>

    <!-- Page Info + Per Page Selector -->
    <div class="ui-pagination-info">
      From {{ from }} to {{ to }} of {{ total }} records

      <!-- Page size select dropdown -->
      <select
        v-model="localPerPage"
        @change="changePerPage"
        class="ui-page-size-select"
      >
        <option v-for="n in [5, 10, 15, 20]" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
    </div>
  </div>
</template>



<script setup lang="ts">
// ✅ Define props and their types
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
  onClick: {
    // Callback when a page number is clicked
    type: Function as PropType<(page: number) => void>,
    required: true,
  },
  prev: {
    // Callback for previous page button
    type: Function as PropType<() => void>,
    required: true,
  },
  next: {
    // Callback for next page button
    type: Function as PropType<() => void>,
    required: true,
  },
  type: {
    // Style variant: default or bordered
    type: String,
    default: "default",
    validator: (value: string) => ["default", "bordered"].includes(value),
  },
  size: {
    // Size variant: sm, md, lg (not used in template currently)
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
})

// ✅ Define emit for updating page size
const emit = defineEmits<{
  (e: "update:perPage", value: number): void;
}>()

// ✅ Local state for perPage selector
const localPerPage = ref(props.perPage)

// ✅ Update local state when prop changes
watch(
  () => props.perPage,
  (val) => (localPerPage.value = val)
)

// ✅ Total pages, computed from total and perPage
const totalPages = computed(() => Math.ceil(props.total / localPerPage.value))

// ✅ Pages array [1, 2, ..., totalPages]
const pages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

// ✅ Is current page the first one?
const isFirstPage = computed(() => props.currentPage === 1)

// ✅ Is current page the last one?
const isLastPage = computed(() => props.currentPage === totalPages.value)

// ✅ Starting index of current page range (e.g., 21)
const from = computed(() => (props.currentPage - 1) * localPerPage.value + 1)

// ✅ Ending index of current page range (e.g., 40 or total)
const to = computed(() =>
  Math.min(props.currentPage * localPerPage.value, props.total)
)

// ✅ Emit updated page size
const changePerPage = () => emit("update:perPage", localPerPage.value)
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
  @apply w-5.5 h-7 flex items-center justify-center rounded-sm  text-sm transition duration-300;
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
  @apply border border-gray-tint-650 rounded-sm py-1 px-2 text-sm text-primary;
}

.ui-icon {
  @apply text-gray-shade-800 w-8 h-8;
}
</style>
