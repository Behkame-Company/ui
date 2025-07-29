<template>
  <div class="ui-table-container">
    <div class="flex items-center justify-between">
    </div>

    <!-- Loading -->
    <div v-if="isBusy" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <table v-else class="ui-custom-table">

      <thead>
        <!-- Header titles row -->
      <h2 v-if="showTitle" class="ui-table-title">{{ title }}</h2>

        <tr>
          <th
            v-for="(col, idx) in columns"
            :key="`th-${idx}-${colKey(col)}`"
            class="ui-table-th-title"
            :style="colWidthStyle(col)"
            :aria-sort="ariaSort(col)"
            @click="col.sortable ? toggleSort(col) : null"
          >
            <div class="ui-table-sort-icon" :class="{ 'cursor-pointer': col.sortable }">
              <VsxIcon
                v-if="col.sortable && sortState.key === colKey(col) && sortState.dir === 'asc'"
                iconName="ArrowCircleUp2"
                class="ui-table-sort-icon-asc"
                :size="16"
                type="bold"
              />
              <VsxIcon
                v-else-if="col.sortable && sortState.key === colKey(col) && sortState.dir === 'desc'"
                iconName="ArrowCircleDown2"
                class="ui-table-sort-icon-desc"
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
            class="ui-table-th"
            :style="colWidthStyle(col)"
          >
            <slot :name="`filter-${colKey(col)}`" :column="col" :filters="internalFilters" :update="applyFilter">
              <template v-if="col.filterable !== false">
                <UiInputMultiDropDown
                  v-if="col.type === 'multiSelect'"
                  v-model="internalFilters[colKey(col)]"
                  :options="toOptions(col.options)"
                  :placeholder="col.text"
                  size="sm"
                  class="table-filter-input"
                  @change="onFilterChange"
                />
                <UiInputDropDown
                  v-else-if="col.type === 'select'"
                  v-model="internalFilters[colKey(col)]"
                  :options="toOptions(col.options)"
                  :placeholder="col.text"
                  size="sm"
                  class="table-filter-input"
                  @change="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'datetime'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'CalendarTime'"
                  size="sm"
                  type="datetime"
                  class="table-filter-input"
                  @update:modelValue="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'date'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'CalendarAdd'"
                  size="sm"
                  type="date"
                  class="table-filter-input"
                  @update:modelValue="onFilterChange"
                />
                <UiInputDatePicker
                  v-else-if="col.type === 'time'"
                  v-model="internalFilters[colKey(col)]"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon || 'Clock'"
                  size="sm"
                  type="time"
                  class="table-filter-input"
                  @update:modelValue="onFilterChange"
                />
                <UiInput
                  v-else
                  v-model="internalFilters[colKey(col)]"
                  :type="col.type || 'text'"
                  :placeholder="col.text"
                  :suffixIcon="col.suffixIcon"
                  size="sm"
                  class="table-filter-input"
                  @input="onFilterChange"
                />
              </template>
            </slot>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="pagedRows.length">
          <tr
            v-for="(row, rIndex) in pagedRows"
            :key="rowKeyValue(row, rIndex)"
            :class="rIndex % 2 === 1 ? 'ui-table-row-even' : 'ui-table-row-odd'"
            @click="$emit('row-click', row)"
          >
            <td
              v-for="(col, cIndex) in columns"
              :key="`td-${rIndex}-${cIndex}-${colKey(col)}`"
              class="ui-table-td"
            >
              <slot
                :name="`cell-${colKey(col)}`"
                :row="row"
                :value="getCell(row, col, cIndex)"
                :column="col"
                :rowIndex="rIndex"
                :colIndex="cIndex"
              >
                <span v-if="getCell(row, col, cIndex) === 'circle'" class="ui-table-circle"></span>
                <span v-else>{{ getCell(row, col, cIndex) }}</span>
              </slot>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td :colspan="columns.length" class="ui-table-no-records">
            {{ emptyMessage }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <UiPagination
      v-model:current-page="internalCurrentPage"
      v-model:per-page="internalPerPage"
      :total="serverMode ? totalItems : filteredRows.length"
      
      @update:current-page="emitPageChange"
      @update:per-page="emitPerPageChange"
      class="py-2 px-2 mt-2"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Reusable Data Table
 * - Works with object or array rows
 * - Client-side or Server-side (apiUrl) modes
 * - Sorting, filtering, pagination
 * - Scoped slots for per-column customization
 */

import UiInput from "../input/index.vue";
import UiInputDropDown from "../input/DropDown.vue";
import UiInputMultiDropDown from "../input/MultiDropDown.vue";
import UiInputDatePicker from "../input/DatePickerInput.vue";
import UiPagination from "../pagination/index.vue";

type ColumnType =
  | "text"
  | "number"
  | "select"
  | "multiSelect"
  | "date"
  | "time"
  | "datetime"
  | "action";

type Direction = "asc" | "desc" | null;

export interface Column {
  /** Unique key to access cell value: object key (string) or positional index (number) */
  key: string | number;
  /** Column header text */
  text: string;
  /** Optional UI/behavior hints */
  type?: ColumnType;
  options?: string[];
  width?: string | number;
  suffixIcon?: string;
  /** Enable/disable filtering/sorting per column */
  filterable?: boolean;
  sortable?: boolean;
  /** Custom filter/sort comparators (optional) */
  customFilter?: (cell: unknown, filter: unknown, row: any) => boolean;
  customSort?: (a: any, b: any) => number;
}

const props = withDefaults(defineProps<{
  /** Column definitions */
  headers: Column[];
  /** Data rows; object or array-based */
  rows?: any[];
  /** Server-side fetch URL; enable serverMode when provided */
  apiUrl?: string;
  /** Pass true to treat rows as already loading */
  loading?: boolean;
  /** Show the filters row */
  showFilters?: boolean;
  /** Optional title */
  title?: string;
  showTitle?: boolean;
  /** v-models */
  modelValue?: Record<string, any>; // alias of filters (for convenience)
  filters?: Record<string, any>;
  currentPage?: number;
  perPage?: number;
  /** -1 means "show all" */
  pageSizes?: number[];
  /** Sort state */
  sort?: { key: string | number | null; dir: Direction };
  /** Unique row key field (when rows are objects) */
  rowKey?: string;
}>(), {
  rows: () => [],
  showFilters: true,
  title: "List",
  showTitle: true,
  modelValue: undefined,
  filters: undefined,
  currentPage: 1,
  perPage: 10,
  pageSizes: () => [5, 10, 20, 50, -1],
  sort: () => ({ key: null, dir: null }),
  rowKey: "id",
});

const emit = defineEmits<{
  (e: "update:filters", v: Record<string, any>): void;
  (e: "update:modelValue", v: Record<string, any>): void;
  (e: "update:currentPage", v: number): void;
  (e: "update:perPage", v: number): void;
  (e: "update:sort", v: { key: string | number | null; dir: Direction }): void;
  (e: "row-click", row: any): void;
  (e: "fetch-error", err: unknown): void;
  (e: "sort-change", v: { key: string | number | null; dir: Direction }): void;
}>();

/* ---------- State ---------- */

const serverMode = computed(() => !!props.apiUrl);

const isBusy = computed(() => busy.value || !!props.loading);
const busy = ref(false);

const columns = computed<Column[]>(() =>
  (props.headers || []).map((c) => ({
    filterable: true,
    sortable: false,
    ...c,
  })),
);

const internalFilters = reactive<Record<string | number, any>>(
  initFilters(columns.value, props.filters ?? props.modelValue),
);

const internalCurrentPage = ref(props.currentPage || 1);
const internalPerPage = ref(props.perPage || 10);

const sortState = reactive<{ key: string | number | null; dir: Direction }>({
  key: props.sort?.key ?? null,
  dir: props.sort?.dir ?? null,
});

const totalItems = ref(0);
const apiRows = ref<any[]>([]);

/* ---------- Watchers ---------- */

watch(
  () => props.filters,
  (v) => {
    if (v) Object.assign(internalFilters, v);
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  (v) => {
    if (v) Object.assign(internalFilters, v);
  },
  { deep: true },
);

watch(
  () => props.sort,
  (v) => {
    if (!v) return;
    sortState.key = v.key ?? null;
    sortState.dir = v.dir ?? null;
  },
  { deep: true },
);

watch(
  () => [props.currentPage, props.perPage],
  () => {
    if (props.currentPage) internalCurrentPage.value = props.currentPage;
    if (props.perPage) internalPerPage.value = props.perPage;
  },
);

/** Server-side auto-fetch on deps change */
watch(
  () => [props.apiUrl, internalCurrentPage.value, internalPerPage.value, JSON.stringify(sortState), JSON.stringify(internalFilters)],
  async () => {
    if (!serverMode.value) return;
    await fetchServer();
  },
  { immediate: true },
);

/* ---------- Methods ---------- */

function colKey(col: Column) {
  return col.key;
}

function colWidthStyle(col: Column) {
  if (col.width === undefined || col.width === null || col.width === "") return undefined;
  const w = typeof col.width === "number" ? `${col.width}px` : col.width;
  return { width: w };
}

function toOptions(opts?: string[]) {
  return (opts || []).map((o) => ({ label: o, value: o }));
}

function applyFilter(key: string | number, value: any) {
  internalFilters[key] = value;
  onFilterChange();
}

function onFilterChange() {
  internalCurrentPage.value = 1;
  emit("update:filters", { ...internalFilters });
  emit("update:modelValue", { ...internalFilters });
}

function emitPageChange(v: number) {
  emit("update:currentPage", v);
}

function emitPerPageChange(v: number) {
  emit("update:perPage", v);
}

function ariaSort(col: Column) {
  if (sortState.key !== colKey(col) || !sortState.dir) return "none";
  return sortState.dir === "asc" ? "ascending" : "descending";
}

function toggleSort(col: Column) {
  const key = colKey(col);
  if (sortState.key === key) {
    // asc -> desc -> none
    sortState.dir = sortState.dir === "asc" ? "desc" : sortState.dir === "desc" ? null : "asc";
    if (!sortState.dir) sortState.key = null;
  } else {
    sortState.key = key;
    sortState.dir = "asc";
  }
  emit("update:sort", { ...sortState });
  emit("sort-change", { ...sortState });
}

/** Get cell value supporting object or array rows */
function getCell(row: any, col: Column, index: number) {
  const key = colKey(col);
  if (typeof key === "number") return row?.[key];
  if (row && typeof row === "object" && key in row) return row[key as keyof typeof row];
  // Fallback positional for array rows
  return Array.isArray(row) ? row[index] : undefined;
}

/** v-for row key */
function rowKeyValue(row: any, idx: number) {
  if (row && typeof row === "object" && props.rowKey in row) return row[props.rowKey as keyof typeof row] as any;
  return idx;
}

/* ---------- Client-side pipeline ---------- */

const sourceRows = computed(() => (serverMode.value ? apiRows.value : props.rows || []));

const filteredRows = computed(() => {
  const data = sourceRows.value || [];
  const activeCols = columns.value;

  return data.filter((row) =>
    activeCols.every((col, idx) => {
      if (col.filterable === false) return true;
      const filter = internalFilters[colKey(col)];
      if (filter == null || (Array.isArray(filter) && filter.length === 0) || (typeof filter === "string" && filter.trim() === "")) {
        return true;
      }
      const cell = getCell(row, col, idx);

      // Custom filter takes precedence
      if (col.customFilter) return !!col.customFilter(cell, filter, row);

      switch (col.type) {
        case "number":
          return String(cell ?? "").includes(String(filter ?? ""));
        case "select":
          return String(cell ?? "").toLowerCase().includes(String(filter ?? "").toLowerCase());
        case "multiSelect":
          if (!Array.isArray(filter)) return true;
          return filter.some((f) => String(cell ?? "").toLowerCase().includes(String(f).toLowerCase()));
        case "date":
        case "time":
        case "datetime":
          // exact match (can customize to ranges if needed)
          return cell === filter;
        default:
          return String(cell ?? "").toLowerCase().includes(String(filter ?? "").toLowerCase());
      }
    }),
  );
});

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

      if (col.type === "number") {
        const an = Number(av);
        const bn = Number(bv);
        if (isNaN(an) || isNaN(bn)) return String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
        return an === bn ? 0 : an < bn ? -1 : 1;
      }

      if (col.type === "date" || col.type === "datetime") {
        const ad = av instanceof Date ? av : new Date(av);
        const bd = bv instanceof Date ? bv : new Date(bv);
        const at = ad?.getTime?.() ?? Number.NEGATIVE_INFINITY;
        const bt = bd?.getTime?.() ?? Number.NEGATIVE_INFINITY;
        return at === bt ? 0 : at < bt ? -1 : 1;
      }

      // time-only (HH:mm) basic compare
      if (col.type === "time") {
        return String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
      }

      return String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true, sensitivity: "base" });
    });

  return data.sort((a, b) => mult * comparator(a, b));
});

const pagedRows = computed(() => {
  const all = sortedRows.value;
  if (internalPerPage.value === -1) return all;
  const start = (internalCurrentPage.value - 1) * internalPerPage.value;
  return all.slice(start, start + internalPerPage.value);
});

const emptyMessage = computed(() => {
  const hasFilters = Object.values(internalFilters).some((f) => (Array.isArray(f) ? f.length : String(f ?? "").trim().length));
  if (hasFilters) return "Record not found";
  return "No records";
});

/* ---------- Server-side fetch ---------- */

async function fetchServer() {
  if (!props.apiUrl) return;
  busy.value = true;
  try {
    const url = new URL(props.apiUrl, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    // Attach query params
    url.searchParams.set("page", String(internalCurrentPage.value));
    url.searchParams.set("perPage", String(internalPerPage.value));
    if (sortState.key && sortState.dir) {
      url.searchParams.set("sortKey", String(sortState.key));
      url.searchParams.set("sortDir", String(sortState.dir));
    }
    // Flatten filters
    Object.entries(internalFilters).forEach(([k, v]) => {
      if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) return;
      url.searchParams.set(`filters[${k}]`, Array.isArray(v) ? v.join(",") : String(v));
    });

    const res = await fetch(url.toString(), { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Try common shapes
    apiRows.value = data.rows ?? data.data ?? data.items ?? data.results ?? [];
    totalItems.value = data.total ?? data.count ?? apiRows.value.length ?? 0;
  } catch (err) {
    emit("fetch-error", err);
    apiRows.value = [];
    totalItems.value = 0;
    // console.error(err);
  } finally {
    busy.value = false;
  }
}

/* ---------- Utils ---------- */

function initFilters(cols: Column[], initial?: Record<string, any>) {
  const base: Record<string | number, any> = {};
  cols.forEach((c) => {
    base[colKey(c)] = c.type === "multiSelect" ? [] : "";
  });
  return { ...base, ...(initial || {}) };
}
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-table-container {
  @apply m-10 shadow-md rounded-lg bg-white;
}

.ui-table-title {
  @apply py-3.5  text-base font-bold;
}

.ui-custom-table {
  @apply w-full  text-sm shadow-sm rounded-lg table text-gray-shade-500 border-separate border-spacing-0 table-fixed p-2;
}

.ui-table-td {
  @apply px-2 py-2 text-center align-middle;
}

.ui-table-th {
  @apply font-medium bg-white border-y items-center border-gray-tint-200 text-left px-2 py-2;
}

.ui-table-th-title {
  @apply font-medium bg-white text-center px-2 py-2;
}

.ui-table-row-odd {
  @apply bg-white py-4 px-2;
}

.ui-table-row-even {
  @apply bg-gray-tint-200 rounded-sm py-4 px-2;
}

.ui-table-circle {
  @apply inline-block w-8 h-8 rounded-full bg-gray-shade-200;
}

.ui-table-no-records {
  @apply text-center text-gray-shade-400 py-8 px-2;
}

.ui-table-sort-icon {
  @apply flex items-center justify-center gap-1;
}

.ui-table-sort-icon-asc {
  @apply w-4 h-4 text-success;
}

.ui-table-sort-icon-desc {
  @apply w-4 h-4 text-error;
}

.table-filter-input {
  @apply mx-2 text-left;
}
</style>
