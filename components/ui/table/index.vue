<template>
  <div class="table-container">
    <h2 class="table-title">List A</h2>
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="(header, colIndex) in headers" :key="header.text" class="table-th" :style="header.width ? { width: header.width } : {}">
            <template v-if="header.text === '#'">
              {{ header.text }}
            </template>
            <template v-else>
              <component
                :is="header.type === 'select' ? 'select' : 'input'"
                :type="header.type !== 'select' ? header.type : undefined"
                :placeholder="header.text"
                class="table-filter-input"
                v-model="localFilters[header.text]"
                @input="onFilterChange"
                @change="onFilterChange"
              >
                <option v-for="option in header.options || []" :key="option" :value="option">
                  {{ option }}
                </option>
              </component>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" :class="rowIndex % 2 === 1 ? 'table-row-even' : 'table-row-odd'">
          <td v-for="(header, colIndex) in headers" :key="header.text" class="table-td">
            <span v-if="row[colIndex] === 'circle'" class="table-circle"></span>
            <span v-else>{{ row[colIndex] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

type HeaderType = {
  text: string
  type?: string // 'text', 'number', 'select', etc.
  options?: string[] | undefined
  width?: string | undefined
}

const props = defineProps<{
  headers: HeaderType[]
  rows: any[]
  filters: Record<string, string>
}>()
const emit = defineEmits(['update:filters'])

const localFilters = reactive({ ...props.filters })

watch(
  () => props.filters,
  (newVal) => {
    Object.assign(localFilters, newVal)
  }
)

function onFilterChange() {
  emit('update:filters', { ...localFilters })
}

const headers = [
  { text: "#", type: "text", options: undefined, width: undefined },
  { text: "Column 1", type: "text", options: undefined, width: undefined },
  { text: "Column 2", type: "text", options: undefined, width: undefined },
  { text: "Column 3", type: "text", options: undefined, width: undefined },
  { text: "Column 4", type: "text", options: undefined, width: undefined },
  { text: "Column 5", type: "text", options: undefined, width: undefined },
  { text: "Column 6", type: "text", options: undefined, width: undefined }
];

const rows = Array.from({ length: 8 }, (_, i) => [
  i + 1,
  "Example",
  "Example",
  "circle", // This will render the gray circle
  "Example",
  "Example",
  "Example"
]);
</script>

<style scoped>
@reference "assets/css/main.css";
.table-container {
  @apply p-2 shadow-md rounded-lg bg-white ;
}
.table-title {
  @apply py-3.5 px-2 text-base font-bold;
}
.custom-table {
  @apply w-full text-sm table text-gray-shade-500;
  border-collapse: separate;
  border-spacing: 0;
}
.table-th, .table-td {
  @apply px-2 py-2 text-center align-middle;
}
.table-th {
  @apply font-medium bg-white border border-gray-tint-200 text-center;
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
.table-filter-input {
  @apply border py-1.5 px-3 bg-white text-center placeholder:text-center placeholder:text-gray-shade-400;
}
</style>
