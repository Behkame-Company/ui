<!--
  Pagination Component Usage Guide:
    
    <UiPagination
      v-model:current-page="currentPage"
      v-model:per-page="perPage"
      :total="25"
    />

  
  PROPS:
  - currentPage: number (required) - Current active page number
  - perPage: number (required) - Number of items per page
  - total: number (required) - Total number of records
  - type: 'default' | 'bordered' (default: 'default') - Pagination style
  
  EVENTS:
  - update:currentPage: Emitted when page changes
  - update:perPage: Emitted when items per page changes
  
-->

<template>
  <div class="ui-pagination__container">
    <!-- Pagination Controls (Prev / Pages / Next) -->
    <div class="ui-pagination__wrapper">
      <!-- Previous Button -->
      <button class="ui-pagination__button__arrow" @click="prev" :disabled="isFirstPage">
        <VsxIcon iconName="ArrowLeft2" class="ui-pagination__icon" :size="18" type="linear" />
      </button>

      <!-- Page Number Buttons: Hidden when 'All' is selected -->
      <template v-if="localPerPage !== -1">
        <template v-for="page in windowedPages" :key="page + '-' + Math.random()">
          <button
            v-if="page !== -1"
            @click="() => goToPage(page)"
            :class="[
              'ui-pagination__page__button',
              page === currentPage
                ? 'ui-pagination__page__button-active'
                : type === 'bordered'
                ? 'ui-pagination__page__button-inactive-bordered'
                : 'ui-pagination__page__button-inactive',
            ]"
          >
            {{ page }}
          </button>
          <span v-else class="ui-page__ellipsis">...</span>
        </template>
      </template>

      <!-- Next Button -->
      <button class="ui-pagination__button__arrow" @click="next" :disabled="isLastPage">
        <VsxIcon iconName="ArrowRight2" class="ui-pagination__icon" :size="18" type="linear" />
      </button>
    </div>

    <!-- Page Info + Per Page Selector -->
    <div class="ui-pagination__info">
      From {{ from }} to {{ to }} of {{ total }} records

      <select
        v-model.number="localPerPage"
        @change="changePerPage"
        class="ui-page__size__select"
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
// ============================================================================
// 2. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  currentPage: {
    type: Number,
    required: true, // Current active page number
  },
  perPage: {
    type: Number,
    required: true, // Number of items per page
  },
  total: {
    type: Number,
    required: true, // Total number of records
  },
  type: {
    type: String,
    default: "default", // Pagination style
    validator: (value: string) => ["default", "bordered"].includes(value),
  },
})

// ============================================================================
// 3. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  (e: "update:perPage", value: number): void
  (e: "update:currentPage", value: number): void
}>()

// ============================================================================
// 4. VARIABLES (ref, reactive but only for simple state)
// ============================================================================
const localPerPage = ref<number>(props.perPage)

// ============================================================================
// 5. COMPUTED PROPERTIES (computed declarations)
// ============================================================================
const totalPages = computed<number>(() =>
  localPerPage.value === -1 ? 1 : Math.ceil(props.total / localPerPage.value)
)

const windowSize = 3 // Number of pages to show on each side of the current page

const windowedPages = computed<number[]>(() => {
  if (localPerPage.value === -1) return []
  const total = totalPages.value
  const current = props.currentPage
  const window = windowSize
  let start = Math.max(1, current - window)
  let end = Math.min(total, current + window)

  // Always show first and last page
  if (start > 2) start++
  if (end < total - 1) end--

  const pages: number[] = []
  if (start > 1) pages.push(1)
  if (start > 2) pages.push(-1) // -1 will represent '...'

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total - 1) pages.push(-1) // -1 will represent '...'
  if (end < total) pages.push(total)

  return pages
})

const isFirstPage = computed<boolean>(() =>
  props.currentPage === 1 || localPerPage.value === -1
)

const isLastPage = computed<boolean>(() =>
  props.currentPage === totalPages.value || localPerPage.value === -1
)

const from = computed<number>(() =>
  localPerPage.value === -1 ? 1 : (props.currentPage - 1) * localPerPage.value + 1
)

const to = computed<number>(() =>
  localPerPage.value === -1
    ? props.total
    : Math.min(props.currentPage * localPerPage.value, props.total)
)

// ============================================================================
// 7. WATCHERS (watch, watchEffect)
// ============================================================================
watch(
  () => props.perPage,
  (val: number) => {
    localPerPage.value = val
  }
)

// ============================================================================
// 8. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================
const goToPage = (page: number): void => {
  emit("update:currentPage", page)
}

const prev = (): void => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1)
}

const next = (): void => {
  if (props.currentPage < totalPages.value) emit("update:currentPage", props.currentPage + 1)
}

const changePerPage = (): void => {
  emit("update:perPage", localPerPage.value)
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.ui-pagination__container {
  @apply flex justify-between items-center w-full text-sm;
}

.ui-pagination__wrapper {
  @apply flex items-center justify-center gap-2;
}

.ui-pagination__page__button {
  @apply w-5.5 h-7 p-1.5 flex items-center justify-center rounded-sm text-sm transition duration-300 cursor-pointer;
}

.ui-pagination__page__button-inactive {
  @apply py-1 px-0 bg-transparent text-gray-shade-400;
}

.ui-pagination__page__button-inactive-bordered {
  @apply bg-transparent text-primary border border-gray-tint-650;
}

.ui-pagination__page__button-active {
  @apply bg-primary text-white;
}

.ui-pagination__info {
  @apply flex items-center tracking-wide gap-6 text-gray-shade-400;
}

.ui-page__size__select {
  @apply border border-gray-tint-650 rounded-sm py-1 px-2 text-sm text-primary cursor-pointer;
}

.ui-pagination__icon {
  @apply text-gray-shade-800 cursor-pointer;
}
.ui-pagination__button__arrow:disabled {
 @apply opacity-50 cursor-not-allowed;
}

.ui-page__ellipsis {
  @apply px-2 text-gray-shade-400 select-none;
}
</style>
