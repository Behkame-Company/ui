<!--
<!-- /**
 * Reusable Data Table Component
 *
 *   <UiTable
 *     :headers="columns"
 *     :rows="data"
 *     :show-filters="true"
 *     :title="'User Management'"
 *     :current-page="currentPage"
 *     :per-page="perPage"
 *     :filters="filters"
 *     :sort="sort"
 *     @row-click="handleRowClick"
 *     @update:filters="handleFilterChange"
 *     @update:current-page="handlePageChange"
 *     @update:per-page="(val) => perPage = val"
 *     @update:sort="(val) => sort = val"
 *   >
 *    
 *     <template #cell-actions="{ row }">
  *       <button @click="editUser(row)">Edit</button>
  *       <button @click="deleteUser(row)">Delete</button>
  *     </template>
  *   </UiTable>
  

-->

<template>
  <div class="ui-table__container">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <UiSpinner size="lg" />
    </div>

    <table v-else class="ui-custom-table">
      <thead >
        <!-- Header titles row -->
        <h2 v-if="showTitle" class="ui-table__title">{{ title }}</h2>
        <NuxtLink v-if="linkPage" :to="linkPage"> See page </NuxtLink>
        <tr>
          <th
            v-for="(col, idx) in columns"
            :key="`th-${idx}-${colKey(col)}`"
            class="ui-table__th__title"
            :style="colWidthStyle(col)"
            :aria-sort="ariaSort(col)"
            @click="col.sortable ? toggleSort(col) : null"
          >
            <div
              class="ui-table__sort__icon"
              :class="{ 'cursor-pointer': col.sortable }"
            >
              <VsxIcon
                v-if="
                  col.sortable &&
                  sortState.key === colKey(col) &&
                  sortState.dir === 'asc'
                "
                iconName="ArrowCircleUp2"
                class="ui-table__sort__icon-asc"
                :size="16"
                type="bold"
              />
              <VsxIcon
                v-else-if="
                  col.sortable &&
                  sortState.key === colKey(col) &&
                  sortState.dir === 'desc'
                "
                iconName="ArrowCircleDown2"
                class="ui-table__sort__icon-desc"
                :size="16"
                type="bold"
              />
              <slot :name="`header-${colKey(col)}`" :column="col">
                <span>{{ col.text }}</span>
              </slot>
            </div>
          </th>
        </tr>

        <!-- Filters row -->
        <tr v-if="showFilters">
          <th
            v-for="(col, idx) in columns"
            :key="`filter-${idx}-${colKey(col)}`"
            class="ui-table__th"
            :style="colWidthStyle(col)"
          >
            <slot
              :name="`filter-${colKey(col)}`"
              :column="col"
              :filters="internalFilters"
              :update="applyFilter"
            >
              <template v-if="col.filterable !== false">
                <UiInputMultiDropDown
                  v-if="col.type === 'multiSelect'"
                  v-model="internalFilters[colKey(col)]"
                  :options="toOptions(col.options)"
                  :placeholder="col.text"
                  size="sm"
                  class="ui-table__filter__input"
                  @change="onFilterChange"
                />
                <UiInputDropDown
                  v-else-if="col.type === 'select'"
                  v-model="internalFilters[colKey(col)]"
                  :options="toOptions(col.options)"
                  :placeholder="col.text"
                  size="sm"
                  class="ui-table__filter__input"
                  @change="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'datetime'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'CalendarTime'"
                  size="sm"
                  type="datetime"
                  class="ui-table__filter__input"
                  @update:modelValue="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'date'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'CalendarAdd'"
                  size="sm"
                  type="date"
                  class="ui-table__filter__input"
                  @update:modelValue="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'time'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'Clock'"
                  size="sm"
                  type="time"
                  class="ui-table__filter__input"
                  @update:modelValue="onFilterChange"
                />
                <UiInput
                  v-else
                  v-model="internalFilters[colKey(col)]"
                  :type="col.type || 'text'"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon"
                  size="sm"
                  class="ui-table__filter__input"
                  @input="onFilterChange"
                />
              </template>
            </slot>
          </th>
        </tr>
      </thead>
      <!-- Body -->
      <tbody>
        <template v-if="pagedRows.length">
          <tr
            v-for="(row, rIndex) in pagedRows"
            :key="rowKeyValue(row, rIndex)"
            :class="
              rIndex % 2 === 1 ? 'ui-table__row__even' : 'ui-table__row__odd'
            "
            @click="$emit('row-click', row)"
          >
            <td
              v-for="(col, cIndex) in columns"
              :key="`td-${rIndex}-${cIndex}-${colKey(col)}`"
              class="ui-table__td"
            >
              <slot
                :name="`cell-${colKey(col)}`"
                :row="row"
                :value="getCell(row, col, cIndex)"
                :column="col"
                :rowIndex="rIndex"
                :colIndex="cIndex"
              >
                <span
                  v-if="getCell(row, col, cIndex) === 'circle'"
                  class="ui-table__circle"
                ></span>
                <span v-else>{{ getCell(row, col, cIndex) }}</span>
              </slot>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td :colspan="columns.length" class="ui-table__no-records">
            {{ emptyMessage }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <UiPagination
      v-if="showPagination"
      v-model:current-page="internalCurrentPage"
      v-model:per-page="internalPerPage"
      :total="filteredRows.length"
      @update:current-page="emitPageChange"
      @update:per-page="emitPerPageChange"
      class="py-2 px-2 mt-2"
    />
  </div>
</template>

<script setup lang="ts">
// ============================================================================
// 1. IMPORTS (External libraries and internal modules)
// ============================================================================
import UiInput from "../input/index.vue";
import UiInputDropDown from "../input/DropDown.vue";
import UiInputMultiDropDown from "../input/MultiDropDown.vue";
import UiInputDatePicker from "../input/DatePickerInput.vue";
import UiPagination from "../pagination/index.vue";

// ============================================================================
// 2. TYPE DEFINITIONS
// ============================================================================

/** Supported column input types for filtering */
type ColumnType =
  | "text"
  | "number"
  | "select"
  | "multiSelect"
  | "date"
  | "time"
  | "datetime"
  | "action";

/** Sort direction */
type Direction = "asc" | "desc" | null;

/** Column configuration interface */
export interface Column {
  /** Unique key to access cell value: object key (string) or positional index (number) */
  key: string | number;
  /** Column header text */
  text: string;
  /** Input type for filtering (optional) */
  type?: ColumnType;
  /** Options for select/multiSelect types */
  options?: string[];
  /** Column width (CSS value or number in pixels) */
  width?: string | number;
  /** Icon to display in filter input */
  suffixIcon?: string;
  /** Enable/disable filtering for this column (default: true) */
  filterable?: boolean;
  /** Enable/disable sorting for this column (default: false) */
  sortable?: boolean;
  /** Custom filter function (optional) */
  customFilter?: (cell: unknown, filter: unknown, row: any) => boolean;
  /** Custom sort function (optional) */
  customSort?: (a: any, b: any) => number;
}

// ============================================================================
// 3. PROPS (Only for components)
// ============================================================================
const props = defineProps({
  // Column definitions with configuration
  headers: {
    type: Array as () => Column[],
    required: true, // Column definitions with configuration
  },

  // Data rows (objects or arrays)
  rows: {
    type: Array,
    default: () => [], // Data rows (objects or arrays)
  },

  // API URL for server-side data fetching
  apiUrl: {
    type: String,
    default: "", // API URL for server-side data fetching
  },

  // Loading state indicator
  loading: {
    type: Boolean,
    default: false, // Loading state indicator
  },

  // Show/hide filter row
  showFilters: {
    type: Boolean,
    default: true, // Show/hide filter row
  },

  // Table title
  title: {
    type: String,
    default: "List", // Table title
  },

  // Show/hide title
  showTitle: {
    type: Boolean,
    default: true, // Show/hide title
  },

  // Filters v-model (alias for filters prop)
  modelValue: {
    type: Object as () => Record<string, any>,
    default: undefined, // Filters v-model (alias for filters prop)
  },

  // Active filters
  filters: {
    type: Object as () => Record<string, any>,
    default: undefined, // Active filters
  },

  // Current page number
  currentPage: {
    type: Number,
    default: 1, // Current page number
  },

  // Items per page
  perPage: {
    type: Number,
    default: 10, // Items per page
  },

  // Available page sizes (-1 = show all)
  pageSizes: {
    type: Array as () => number[],
    default: () => [5, 10, 20, 50, -1], // Available page sizes (-1 = show all)
  },

  // Current sort state
  sort: {
    type: Object as () => { key: string | number | null; dir: Direction },
    default: () => ({ key: null, dir: null }), // Current sort state
  },

  // Unique identifier field for rows (when rows are objects)
  rowKey: {
    type: String,
    default: "id", // Unique identifier field for rows (when rows are objects)
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  linkPage: {},
});

// ============================================================================
// 4. EMITS (Only for components)
// ============================================================================
const emit = defineEmits<{
  /** Filters changed */
  (e: "update:filters", v: Record<string, any>): void;
  /** Model value changed (alias for filters) */
  (e: "update:modelValue", v: Record<string, any>): void;
  /** Current page changed */
  (e: "update:currentPage", v: number): void;
  /** Items per page changed */
  (e: "update:perPage", v: number): void;
  /** Sort state changed */
  (e: "update:sort", v: { key: string | number | null; dir: Direction }): void;
  /** Row clicked */
  (e: "row-click", row: any): void;
  /** API fetch error */
  (e: "fetch-error", err: unknown): void;
  /** Sort changed (alias for update:sort) */
  (e: "sort-change", v: { key: string | number | null; dir: Direction }): void;
}>();

// ============================================================================
// 5. VARIABLES (ref, reactive but only for simple state)
// ============================================================================

/** Current page number (internal state) */
const internalCurrentPage = ref(props.currentPage || 1);

/** Items per page (internal state) */
const internalPerPage = ref(props.perPage || 10);

/** Current sort state */
const sortState = reactive<{ key: string | number | null; dir: Direction }>({
  key: props.sort?.key ?? null,
  dir: props.sort?.dir ?? null,
});

/** Server-side data rows */
const apiRows = ref<any[]>([]);

/** Active filters state */
const internalFilters = reactive<Record<string | number, any>>({});

// ============================================================================
// 6. COMPUTED PROPERTIES (computed declarations)
// ============================================================================

/** Processed columns with defaults */
const columns = computed<Column[]>(() =>
  (props.headers || []).map((c) => ({
    filterable: true,
    sortable: false,
    ...c,
  }))
);

/** Filtered data rows */
const filteredRows = computed(() => {
  const data = props.apiUrl ? apiRows.value : props.rows || [];
  if (!data.length) return data;

  return data.filter((row) => {
    return columns.value.every((col) => {
      const filterValue = internalFilters[colKey(col)];
      if (!filterValue || (Array.isArray(filterValue) && !filterValue.length))
        return true;

      const cellValue = getCell(row, col, columns.value.indexOf(col));

      // Use custom filter if provided
      if (col.customFilter) {
        return col.customFilter(cellValue, filterValue, row);
      }

      // Handle array-based filters (multi-select)
      if (Array.isArray(filterValue)) {
        return filterValue.includes(String(cellValue));
      }

      // Default string-based filtering
      const filterStr = String(filterValue).toLowerCase();
      const cellStr = String(cellValue).toLowerCase();
      return cellStr.includes(filterStr);
    });
  });
});

/** Sorted data rows */
const sortedRows = computed(() => {
  const data = [...filteredRows.value];
  const { key, dir } = sortState;
  if (!key || !dir) return data;

  const col = columns.value.find((c) => colKey(c) === key);
  if (!col) return data;

  const idx = columns.value.indexOf(col);
  const mult = dir === "asc" ? 1 : -1;

  const comparator =
    col.customSort ||
    ((a: any, b: any) => {
      const av = getCell(a, col, idx);
      const bv = getCell(b, col, idx);

      // Number sorting
      if (col.type === "number") {
        const an = Number(av);
        const bn = Number(bv);
        if (isNaN(an) || isNaN(bn))
          return String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
            numeric: true,
          });
        return an === bn ? 0 : an < bn ? -1 : 1;
      }

      // Date/datetime sorting
      if (col.type === "date" || col.type === "datetime") {
        const ad = av instanceof Date ? av : new Date(av);
        const bd = bv instanceof Date ? bv : new Date(bv);
        const at = ad?.getTime?.() ?? Number.NEGATIVE_INFINITY;
        const bt = bd?.getTime?.() ?? Number.NEGATIVE_INFINITY;
        return at === bt ? 0 : at < bt ? -1 : 1;
      }

      // Time sorting (HH:mm format)
      if (col.type === "time") {
        return String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
          numeric: true,
        });
      }

      // Default string sorting
      return String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

  return data.sort((a, b) => mult * comparator(a, b));
});

/** Paginated data rows */
const pagedRows = computed(() => {
  const all = sortedRows.value;
  if (internalPerPage.value === -1) return all;
  const start = (internalCurrentPage.value - 1) * internalPerPage.value;
  return all.slice(start, start + internalPerPage.value);
});

/** Empty state message */
const emptyMessage = computed(() => {
  const hasFilters = Object.values(internalFilters).some((f) =>
    Array.isArray(f) ? f.length : String(f ?? "").trim().length
  );
  if (hasFilters) return "Record not found";
  return "No records";
});

// ============================================================================
// 7. LIFECYCLE HOOKS (onMounted, onBeforeMount, onUnmounted, etc.)
// ============================================================================

onMounted(() => {
  // Initialize filters when component mounts
  Object.assign(
    internalFilters,
    initFilters(columns.value, props.filters ?? props.modelValue)
  );
});

// ============================================================================
// 8. WATCHERS (watch, watchEffect)
// ============================================================================

// Sync external filters with internal state
watch(
  () => props.filters,
  (v) => {
    if (v) Object.assign(internalFilters, v);
  },
  { deep: true }
);

// Sync modelValue with internal state
watch(
  () => props.modelValue,
  (v) => {
    if (v) Object.assign(internalFilters, v);
  },
  { deep: true }
);

// Sync external sort state
watch(
  () => props.sort,
  (v) => {
    if (!v) return;
    sortState.key = v.key ?? null;
    sortState.dir = v.dir ?? null;
  },
  { deep: true }
);

// Sync external pagination state
watch(
  () => [props.currentPage, props.perPage],
  () => {
    if (props.currentPage) internalCurrentPage.value = props.currentPage;
    if (props.perPage) internalPerPage.value = props.perPage;
  }
);

// ============================================================================
// 9. FUNCTION DEFINITIONS (helper functions and composables)
// ============================================================================

/**
 * Get column key (string or number)
 */
const colKey = (col: Column) => {
  return col.key;
};

/**
 * Generate CSS width style for column
 */
const colWidthStyle = (col: Column) => {
  if (col.width === undefined || col.width === null || col.width === "")
    return undefined;
  const w = typeof col.width === "number" ? `${col.width}px` : col.width;
  return { width: w };
};

/**
 * Convert string array to options format for dropdowns
 */
const toOptions = (opts?: string[]) => {
  return (opts || []).map((o) => ({ label: o, value: o }));
};

/**
 * Initialize filter state for all columns
 */
const initFilters = (cols: Column[], initial?: Record<string, any>) => {
  const base: Record<string | number, any> = {};
  cols.forEach((c) => {
    base[colKey(c)] = c.type === "multiSelect" ? [] : "";
  });
  return { ...base, ...(initial || {}) };
};

/**
 * Get cell value from row (supports object and array rows)
 */
const getCell = (row: any, col: Column, index: number) => {
  const key = colKey(col);
  if (typeof key === "number") return row?.[key];
  if (row && typeof row === "object" && key in row)
    return row[key as keyof typeof row];
  // Fallback positional for array rows
  return Array.isArray(row) ? row[index] : undefined;
};

/**
 * Generate unique key for v-for row rendering
 */
const rowKeyValue = (row: any, idx: number) => {
  if (row && typeof row === "object" && props.rowKey in row)
    return row[props.rowKey as keyof typeof row] as any;
  return idx;
};

/**
 * Apply filter to specific column
 */
const applyFilter = (key: string | number, value: any) => {
  internalFilters[key] = value;
  onFilterChange();
};

/**
 * Handle filter changes (reset to page 1 and emit events)
 */
const onFilterChange = () => {
  internalCurrentPage.value = 1;
  emit("update:filters", { ...internalFilters });
  emit("update:modelValue", { ...internalFilters });
};

/**
 * Handle page change
 */
const emitPageChange = (v: number) => {
  emit("update:currentPage", v);
};

/**
 * Handle per-page change
 */
const emitPerPageChange = (v: number) => {
  emit("update:perPage", v);
};

/**
 * Generate ARIA sort attribute for accessibility
 */
const ariaSort = (col: Column) => {
  if (sortState.key !== colKey(col) || !sortState.dir) return "none";
  return sortState.dir === "asc" ? "ascending" : "descending";
};

/**
 * Toggle sort for column (asc -> desc -> none)
 */
const toggleSort = (col: Column) => {
  const key = colKey(col);
  if (sortState.key === key) {
    // Cycle: asc -> desc -> none
    sortState.dir =
      sortState.dir === "asc"
        ? "desc"
        : sortState.dir === "desc"
        ? null
        : "asc";
    if (!sortState.dir) sortState.key = null;
  } else {
    sortState.key = key;
    sortState.dir = "asc";
  }
  emit("update:sort", { ...sortState });
  emit("sort-change", { ...sortState });
};
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-table__container {
  @apply  shadow-md rounded-lg bg-white;
}

.ui-table__title {
  @apply py-3.5  text-base font-bold;
}

.ui-custom-table {
  @apply w-full  text-sm shadow-sm rounded-lg table text-gray-shade-500 border-separate border-spacing-0 table-fixed p-2;
}

.ui-table__td {
  @apply px-2 py-2 text-center align-middle;
}

.ui-table__th {
  @apply font-medium bg-white border-y items-center border-gray-tint-200 text-left  py-2 select-none;
}

.ui-table__th__title {
  @apply font-medium bg-white text-center  py-2 select-none;
}

.ui-table__row__odd {
  @apply bg-white py-4 px-2;
}

.ui-table__row__even {
  @apply bg-gray-tint-200 rounded-sm py-4 px-2;
}

.ui-table__circle {
  @apply inline-block w-8 h-8 rounded-full bg-gray-shade-200;
}

.ui-table__no-records {
  @apply text-center text-gray-shade-400 py-8 px-2;
}

.ui-table__sort__icon {
  @apply flex items-center justify-center gap-1;
}

.ui-table__sort__icon-asc {
  @apply w-4 h-4 text-success;
}

.ui-table__sort__icon-desc {
  @apply w-4 h-4 text-error;
}

.ui-table__filter__input {
  @apply mx-2 text-left;
}
</style>
