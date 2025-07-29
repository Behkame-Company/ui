<template>
  <div class="ui-table-container">
    <h2 class="ui-table-title">List A</h2>
    
    <!-- Loading state -->
    <div v-if="isLoading || props.loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    
    <table v-else class="ui-custom-table">
      <thead>
        <!-- Titles Row -->
        <tr>
          <th class="ui-table-th-title" style="width: 60px;">Title:</th>
          <th
            v-for="header in headers.slice(1)"
            :key="header.text + '-title'"
            class="ui-table-th-title"
            :style="header.text === '#' ? { width: '60px' } : { width: '150px' }"
            @click="header.type !== 'Action' ? toggleSort(header.text) : null"
          > 
            <div class="ui-table-sort-icon">
              <VsxIcon
                v-if="sortState[header.text] === 'asc'"
                iconName="ArrowCircleUp2"
                class="ui-table-sort-icon-asc"
                :size="16"
                type="bold"
              />
              <VsxIcon
                v-else-if="sortState[header.text] === 'desc'"
                iconName="ArrowCircleDown2"
                class="ui-table-sort-icon-desc"
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
            <template v-else-if="header.text === 'Action'">
              <!-- Action column - no input needed -->
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
                class="table-filter-input"
                @input="onFilterChange"
                @change="onFilterChange"
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
                class="table-filter-input"
                  @input="onFilterChange"
                @change="onFilterChange"
              />
              <UiInputDatePicker
                v-else-if="header.type === 'datetime'"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                size="sm"
                type="datetime"
                @update:modelValue="onDateFilterChange"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
                class="table-filter-input"
              />
              <UiInputDatePicker
                v-else-if="header.type === 'date'"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                size="sm"
                type="date"
                @update:modelValue="onDateFilterChange"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
                class="table-filter-input"
              />
              
              <UiInputDatePicker
                v-else-if="header.type === 'time'"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                size="sm"
                type="time"
                @update:modelValue="onDateFilterChange"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
                class="table-filter-input"
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
            <td :colspan="headers.length" class="ui-table-no-records">
              No Records 
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            :class="rowIndex % 2 === 1 ? 'ui-table-row-even' : 'ui-table-row-odd'"
          >
            <td
              v-for="(header, colIndex) in headers"
              :key="header.text"
              class="ui-table-td"
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

// Sample data for testing
const headers = [
  {
    text: "#",
    type: "text",
    options: undefined,
    width: "60px",
    suffixIcon: "",
  },
  {
    text: "Product Name",
    type: "select",
    options: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", "Peach", "Quince"],
    width: "150px",
    suffixIcon: "",
  },
  {
    text: "Color",
    type: "multiSelect",
    options: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White", "Gray", "Cyan", "Magenta", "Lime", "Teal"],  
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Created Date",
    type: "date",
    options: undefined,
    width: "150px",
    suffixIcon: "CalendarAdd",
  },
  // {
  //   text: "Date",
  //   type: "date",
  //   options: undefined,
  //   width: "150px",
  //   suffixIcon: "CalendarAdd",
  // },
  {
    text: "Time",
    type: "time",
    options: undefined,
    width: "100px",
    suffixIcon: "Clock", 
  },
  {
    text: "Product Code",
    type: "text",
    options: undefined,
    width: "120px", 
    suffixIcon: "",
  },
  {
    text: "Status",
    type: "select",
    options: ["Active", "Inactive", "Pending"],
    width: "100px",
    suffixIcon: "",
  },
  {
    text: "Priority",
    type: "select",
    options: ["High", "Medium", "Low"],
    width: "100px",
    suffixIcon: "",
  },
  {
    text: "Category",
    type: "select",
    options: ["Premium", "Standard", "Basic"],
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Stock Status",
    type: "select",
    options: ["In Stock", "Low Stock", "Out of Stock"],
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Action",
    type: "action",
    options: undefined,
    width: "100px",
    suffixIcon: "",
  },
];

const rows = [
  [1, "Apple", "Red", "2024-01-15", "09:30", "PROD-001", "Active", "High", "Premium", "In Stock", "Edit"],
  [2, "Banana", "Blue", "2024-02-20", "14:15", "PROD-002", "Inactive", "Medium", "Standard", "Low Stock", "Edit"],
  [3, "Cherry", "Green", "2024-03-10", "11:45", "PROD-003", "Active", "Low", "Basic", "Out of Stock", "Edit"],
  [4, "Date", "Yellow", "2024-04-05", "16:20", "PROD-004", "Pending", "High", "Premium", "In Stock", "Edit"],
  [5, "Elderberry", "Purple", "2024-05-12", "08:00", "PROD-005", "Active", "Medium", "Standard", "In Stock", "Edit"],
  [6, "Fig", "Orange", "2024-06-18", "13:30", "PROD-006", "Inactive", "Low", "Basic", "Low Stock", "Edit"],
  [7, "Grape", "Pink", "2024-07-25", "10:15", "PROD-007", "Active", "High", "Premium", "In Stock", "Edit"],
  [8, "Honeydew", "Brown", "2024-08-30", "15:45", "PROD-008", "Pending", "Medium", "Standard", "Out of Stock", "Edit"],
  [9, "Kiwi", "Black", "2024-09-12", "12:00", "PROD-009", "Active", "Low", "Basic", "In Stock", "Edit"],
  [10, "Lemon", "White", "2024-10-05", "07:30", "PROD-010", "Inactive", "High", "Premium", "Low Stock", "Edit"],
  [11, "Mango", "Gray", "2024-11-18", "14:45", "PROD-011", "Active", "Medium", "Standard", "In Stock", "Edit"],
  [12, "Nectarine", "Cyan", "2024-12-01", "09:15", "PROD-012", "Pending", "Low", "Basic", "Out of Stock", "Edit"],
  [13, "Orange", "Magenta", "2025-01-10", "16:30", "PROD-013", "Active", "High", "Premium", "In Stock", "Edit"],
  [14, "Peach", "Lime", "2025-02-15", "11:00", "PROD-014", "Inactive", "Medium", "Standard", "Low Stock", "Edit"],
  [15, "Quince", "Teal", "2025-03-20", "13:20", "PROD-015", "Active", "Low", "Basic", "In Stock", "Edit"],
];


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

// Use API data if available, otherwise use props.rows or local rows
const tableData = computed(() => {
  if (props.apiUrl) {
    return apiData.value;
  } else if (props.rows && props.rows.length > 0) {
    return props.rows;
  } else {
    return rows; // Use local rows data
  }
});

const localFilters = reactive<Record<string, string | string[]>>(
  Object.fromEntries(
    headers.map((header) => [
      header.text,
      header.type === "multiSelect" ? ([] as string[]) : "",
    ])
  )
);

const dateFilters = reactive<Record<string, string>>(
  Object.fromEntries(
    headers.map((header) => [
      header.text,
      header.type === "datetime" ? "" : "",
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

// Watch for local filter changes to trigger re-computation
watch(
  localFilters,
  () => {
    console.log('Local filters updated:', localFilters);
  },
  { deep: true }
);

const onFilterChange = () => {
  currentPage.value = 1; // Reset to first page when filtering
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
      
      // Skip filtering if no filter value or empty string/array
      if (!filterValue || 
          (typeof filterValue === 'string' && filterValue.trim() === '') ||
          (Array.isArray(filterValue) && filterValue.length === 0)) {
        return true;
      }

      const cellValue = row[index];

      if (header.type === "datetime") {
        // For date filtering, check if the date matches
        return cellValue === filterValue;
      } else if (header.type === "time") {
        // For time filtering, check if the time matches
        return cellValue === filterValue;
      } else if (header.type === "multiSelect") {
        // For multi-select filtering, check if any selected option matches
        if (Array.isArray(filterValue)) {
          return filterValue.some((option) =>
            String(cellValue).toLowerCase().includes(option.toLowerCase())
          );
        } else {
          return String(cellValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
        }
      } else if (header.type === "select") {
        // For single-select filtering, check if the selected option matches
        return String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
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
  // If perPage is -1, show all rows
  if (perPage.value === -1) {
    return filteredRows.value;
  }
  
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredRows.value.slice(start, end);
});

// const tableHeaders = computed(() => {
//   return props.headers && props.headers.length > 0 ? props.headers : headers;
// });
</script>

<style scoped>
@reference "assets/css/main.css";
.ui-table-container {
  @apply p-2  shadow-md rounded-lg bg-white;
}
.ui-table-title {
  @apply py-3.5 px-2 text-base font-bold;
}
.ui-custom-table {
  @apply w-full text-sm table text-gray-shade-500 border-separate border-spacing-0 table-fixed;

}
.ui-table-td {
  @apply px-2 py-2 text-center align-middle;
}
.ui-table-th {
  @apply font-medium w-28 bg-white border-y items-center border-gray-tint-200 text-left px-2 py-2;
}
.ui-table-th-title {
  @apply font-medium bg-white  text-center px-2 py-2  cursor-pointer ;
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
.ui-table-sort-icon{
  @apply flex items-center justify-center gap-1;
}
.ui-table-sort-icon-asc{
  @apply w-4 h-4 text-success;
}
.ui-table-sort-icon-desc{
  @apply w-4 h-4 text-error;
}
.table-filter-input {
  @apply mx-2 text-left;
}
</style>
