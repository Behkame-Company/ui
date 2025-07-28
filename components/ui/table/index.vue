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
            @click="header.type !== 'actions' ? toggleSort(header.text) : null"
          >
            <div class="flex items-center justify-center gap-1">
              <VsxIcon
                v-if="header.type !== 'actions' && sortState[header.text] === 'asc'"
                iconName="ArrowCircleUp2"
                class="w-4 h-4 text-success"
                :size="16"
                type="bold"
              />
              <VsxIcon
                v-else-if="header.type !== 'actions' && sortState[header.text] === 'desc'"
                iconName="ArrowCircleDown2"
                class="w-4 h-4 text-error"
                :size="16"
                type="bold"
              />
              <span v-if="header.type !== 'actions'">{{ header.text }}</span>
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
                v-else-if="header.type !== 'actions'"
                :type="header.type"
                :placeholder="header.text"
                :suffixIcon="header.suffixIcon"
                class="table-filter-input"
                size="sm"
                v-model="localFilters[header.text] as string"
                @input="onFilterChange"
                @change="onFilterChange"
              />
              <div v-else class="text-center text-gray-400 text-xs">
                Actions
              </div>
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
              <!-- Actions column -->
              <template v-if="header.type === 'actions'">
                <div class="flex items-center justify-center gap-2">
                  <div v-if="isLoadingActions" class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <template v-else>
                    <button
                      v-for="action in actionIcons[row[0]] || []"
                      :key="action.id || action.name"
                      @click="handleActionClick(action, rowIndex, row)"
                      class="p-1 hover:bg-gray-100 rounded transition-colors"
                      :title="action.tooltip || action.name"
                    >
                      <VsxIcon
                        v-if="action.icon"
                        :iconName="action.icon"
                        :size="16"
                        :class="action.iconClass || 'text-gray-600 hover:text-blue-600'"
                      />
                      <span v-else-if="action.text" class="text-xs">{{ action.text }}</span>
                    </button>
                  </template>
                </div>
              </template>
              <!-- Regular columns -->
              <template v-else>
                <span v-if="row[colIndex] === 'circle'" class="table-circle"></span>
                <span v-else>{{ row[colIndex] }}</span>
              </template>
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
  actionApiUrl?: string; // API URL for fetching action icons
};

const props = defineProps<{
  headers: HeaderType[];
  rows?: any[];
  filters?: Record<string, string | string[]>;
  apiUrl?: string;
  loading?: boolean;
  actionsApiUrl?: string; // API URL for fetching action icons
}>();
const emit = defineEmits(["update:filters", "action-click"]);

// API data state
const apiData = ref<any[]>([]);
const isLoading = ref(false);
const totalItems = ref(0);

// Actions API state
const actionIcons = ref<Record<string, any[]>>({});
const isLoadingActions = ref(false);

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

// Actions API fetching function
const fetchActionIcons = async (rowId: string | number) => {
  if (!props.actionsApiUrl) return;
  
  isLoadingActions.value = true;
  try {
    const response = await fetch(`${props.actionsApiUrl}?rowId=${rowId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    actionIcons.value[rowId] = data.actions || data.icons || data;
  } catch (error) {
    console.error('Error fetching action icons:', error);
    actionIcons.value[rowId] = [];
  } finally {
    isLoadingActions.value = false;
  }
};

// Handle action icon click
const handleActionClick = (action: any, rowIndex: number, rowData: any) => {
  emit("action-click", { action, rowIndex, rowData });
};

// Filter and sort rows
const filteredRows = computed(() => {
  let filtered = tableData.value.filter((row) => {
    return headers.every((header, index) => {
      // Skip filtering for actions column
      if (header.type === "actions") return true;
      
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

// Watch for paginated rows changes to fetch action icons
watch(
  () => paginatedRows.value,
  (newRows) => {
    if (props.actionsApiUrl && newRows.length > 0) {
      // Fetch action icons for each row
      newRows.forEach(row => {
        const rowId = row[0]; // Assuming first column is the ID
        if (rowId && !actionIcons.value[rowId]) {
          fetchActionIcons(rowId);
        }
      });
    }
  },
  { immediate: true }
);

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
    text: "Column 7",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Column 8",
    type: "text",
    options: undefined,
    width: "120px",
    suffixIcon: "",
  },
  {
    text: "Actions",
    type: "actions",
    width: "100px",
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
