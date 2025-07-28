<template>
  <div class="table-container">
    <h2 class="table-title">List A</h2>
    
    <!-- Loading state -->
    <div v-if="isLoading || props.loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    
    <table v-else class="custom-table">
      <thead>
        <!-- Titles Row -->
        <tr>
          <th class="table-th-title" style="width: 60px;">Title:</th>
          <th
            v-for="header in headers.slice(1)"
            :key="header.text + '-title'"
            class="table-th-title cursor-pointer hover:bg-gray-shade-50"
            :style="header.text === '#' ? { width: '60px' } : { width: '150px' }"
            @click="toggleSort(header.text)"
          >
            <div class="flex items-center justify-center gap-1">
              <VsxIcon
                v-if="sortState[header.text] === 'asc'"
                iconName="ArrowCircleUp2"
                class="w-4 h-4 text-success"
                :size="16"
                type="bold"
              />
              <VsxIcon
                v-else-if="sortState[header.text] === 'desc'"
                iconName="ArrowCircleDown2"
                class="w-4 h-4 text-error"
                :size="16"
                type="bold"
              />
              <span>{{ header.text }}</span>
            </div>
          </th>
        </tr>
        <!-- Filter Inputs Row -->
        <tr>
          <th
            v-for="header in headers"
            :key="header.text"
            class="table-th"
            :style="header.text === '#' ? { width: '60px' } : { width: '120px' }"
          >
            <template v-if="header.text === '#'" >
              #
            </template>
            <template v-else>
              <UiInputMultiDropDown
                v-if="header.type === 'multiSelect'"
                v-model="localFilters[header.text] as string[]"
                :options="
                  (header.options || []).map((opt) => ({
                    label: opt,
                    value: opt,
                  }))
                "
                :placeholder="header.text"
                size="sm"
              />
              <UiInputDropDown
                v-else-if="header.type === 'select'" 
                v-model="localFilters[header.text] as string"
                :options="
                  (header.options || []).map((opt) => ({
                    label: opt,
                    value: opt,
                  }))
                "
                :placeholder="header.text"
                size="sm"
              />
              <UiInputDatePicker
                v-else-if="header.type === 'datetime'"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                size="sm"
                type="header.type"
                @update:modelValue="onDateFilterChange"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
              />
              

              <UiInput
                v-else
                :type="header.type"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                class="table-filter-input"
                size="sm"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
              />
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody" :rows="paginatedRows" :headers="headers">
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="headers.length" class="text-center text-gray-500 py-8">
              No Records
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            :class="rowIndex % 2 === 1 ? 'table-row-even' : 'table-row-odd'"
          >
            <td
              v-for="(header, colIndex) in headers"
              :key="header.text"
              class="table-td"
            >
              <span v-if="row[colIndex] === 'circle'" class="table-circle"></span>
              <span v-else>{{ row[colIndex] }}</span>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
    
    <!-- Pagination -->
    <UiPagination
      v-model:current-page="currentPage"
      v-model:per-page="perPage"
      :total="props.apiUrl ? totalItems : filteredRows.length"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import UiInputDatePicker from "../input/DatePickerInput.vue";
import UiPagination from "../pagination/index.vue";

type HeaderType = {
  text: string;
  type?: string; // 'text', 'number', 'select', 'actions', etc.
  options?: string[] | undefined;
  width?: string | undefined;
  suffixIcon?: string;
  multiSelect?: boolean; // true for multi-select, false for single-select
};

const props = defineProps<{
  headers: HeaderType[];
  rows?: any[];
  filters?: Record<string, string | string[]>;
  apiUrl?: string;
  loading?: boolean;
}>();
const emit = defineEmits(["update:filters"]);

// API data state
const apiData = ref<any[]>([]);
const isLoading = ref(false);
const totalItems = ref(0);

// Pagination state
const currentPage = ref(1);
const perPage = ref(5);

// Sorting state
const sortState = reactive<Record<string, 'asc' | 'desc' | null>>({});
const currentSortColumn = ref<string | null>(null);

// API fetching function
const fetchData = async () => {
  if (!props.apiUrl) return;
  
  isLoading.value = true;
  try {
    const response = await fetch(props.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    apiData.value = data.rows || data.data || data;
    totalItems.value = data.total || data.rows?.length || data.data?.length || data.length || 0;
  } catch (error) {
    console.error('Error fetching data:', error);
    apiData.value = [];
    totalItems.value = 0;
  } finally {
    isLoading.value = false;
  }
};

// Sorting function
const toggleSort = (columnName: string) => {
  if (currentSortColumn.value === columnName) {
    // Cycle through: asc -> desc -> null (default)
    if (sortState[columnName] === 'asc') {
      sortState[columnName] = 'desc';
    } else if (sortState[columnName] === 'desc') {
      sortState[columnName] = null;
      currentSortColumn.value = null;
    }
  } else {
    // Reset other columns and set new column to asc
    Object.keys(sortState).forEach(key => {
      sortState[key] = null;
    });
    sortState[columnName] = 'asc';
    currentSortColumn.value = columnName;
  }
};

// Use API data if available, otherwise use props.rows
const tableData = computed(() => {
  return props.apiUrl ? apiData.value : (props.rows || []);
});

const localFilters = reactive<Record<string, string | string[]>>(
  Object.fromEntries(
    props.headers.map((header) => [
      header.text,
      header.type === "option" ? ([] as string[]) : "",
    ])
  )
);

const dateFilters = reactive<Record<string, string>>(
  Object.fromEntries(
    props.headers.map((header) => [
      header.text,
      header.type === "date" ? "" : "",
    ])
  )
);

// Watch for API URL changes
watch(
  () => props.apiUrl,
  () => {
    if (props.apiUrl) {
      fetchData();
    }
  },
  { immediate: true }
);

watch(
  () => props.filters,
  (newVal) => {
    Object.assign(localFilters, newVal);
  }
);

const onFilterChange = () => {
  emit("update:filters", { ...localFilters });
};

const onDateFilterChange = () => {
  emit("update:filters", { ...dateFilters });
};

// Filter and sort rows
const filteredRows = computed(() => {
  let filtered = tableData.value.filter((row) => {
    return headers.every((header, index) => {
      const filterValue = localFilters[header.text];
      if (!filterValue || filterValue === "") return true;

      const cellValue = row[index];

      if (header.type === "date") {
        // For date filtering, check if the date matches
        return cellValue === filterValue;
      } else if (header.type === "option") {
        // For option filtering, check if selected option(s) match
        if (Array.isArray(filterValue)) {
          // Multi-select: check if any selected option matches
          return filterValue.some((option) =>
            String(cellValue).toLowerCase().includes(option.toLowerCase())
          );
        } else {
          // Single-select: check if the selected option matches
          return String(cellValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
        }
      } else {
        // For text filtering, check if the cell contains the filter value
        return String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      }
    });
  });

  // Apply sorting
  if (currentSortColumn.value && sortState[currentSortColumn.value]) {
    const columnIndex = headers.findIndex(h => h.text === currentSortColumn.value);
    if (columnIndex !== -1) {
      filtered.sort((a, b) => {
        const aVal = String(a[columnIndex]);
        const bVal = String(b[columnIndex]);
        
        if (sortState[currentSortColumn.value!] === 'asc') {
          return aVal.localeCompare(bVal);
        } else {
          return bVal.localeCompare(aVal);
        }
      });
    }
  }

  return filtered;
});

// Paginated rows
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredRows.value.slice(start, end);
});

const headers = [
  {
    text: "#",
    type: "text",
    options: undefined,
    width: "30px",
    suffixIcon: "",
  },
  {
    text: "Column 1",
    type: "select",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Column 2",
    type: "multiSelect",
    options: undefined,  
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Date",
    type: "datetime",
    options: undefined,
    width: "120px",
    suffixIcon: "CalendarAdd",
  },
  {
    text: "Column 4",
    type: "time",
    options: undefined,
    width: "120px",
    suffixIcon: "", 
  },
  {
    text: "Column 5",
    type: "text",
    options: undefined,
    width: "120px", 
    suffixIcon: "",
  },
  {
    text: "Column 6",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Column 6",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Column 6",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Column 6",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },

];

const rows = Array.from({ length: 8 }, (_, i) => [
  i + 1,
  ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"][i],
  ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown"][i], 
  [
    "2024-01-15",
    "2024-02-20",
    "2024-03-10",
    "2024-04-05",
    "2024-05-12",
    "2024-06-18",
    "2024-07-25",
    "2024-08-30",
  ][i], // Different dates
  "Example",
  "Example",
  ["options324","options234","options33","options556","options6768","options678","options7686","options78","options980","options80"][i],
]);
</script>

<style scoped>
@reference "assets/css/main.css";
.table-container {
  @apply p-2  shadow-md rounded-lg bg-white;
}
.table-title {
  @apply py-3.5 px-2 text-base font-bold;
}
.custom-table {
  @apply w-full text-sm table text-gray-shade-500;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}
.table-td {
  @apply px-2 py-2 text-center align-middle;
}
.table-th {
  @apply font-medium w-28 bg-white border-y items-center border-gray-tint-200 text-left px-2 py-2 ;
}
.table-th-title {
  @apply font-medium bg-white  text-center px-2 py-2;
}
.table-row-odd {
  @apply bg-white;
}
.table-row-even {
  @apply bg-gray-tint-200 rounded-sm;
}
.table-circle {
  @apply inline-block w-8 h-8 rounded-full bg-gray-shade-200;
}

</style>
