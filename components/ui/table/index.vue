<template>
  <div class="ui-table-wrapper">
   

    <table class="ui-table">
      <thead class="ui-thead">
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="ui-th">
            <component
              v-if="header.type !== 'action'"
              :is="getInputComponent(header.type)"
              v-model="filters[header.text]"
              :multiple="header.type === 'multi-select'"
              :placeholder="header.text"
              class="ui-input"
            >
              <!-- Render options for select/multi-select -->
              <option
                v-for="option in header.options || []"
                :key="option"
                :value="option"
                
              >
                {{ option }}
              </option>
            </component>
            <span v-else class="ui-action-text">{{ header.text }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-shade-800 text-3xs font-light">
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>


type HeaderType = {
  type: 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'time' | 'datetime' | 'action'
  text: string
  default?: string
  options?: string[]
}

const props = defineProps<{
  headers: HeaderType[]
}>()

const filters = reactive(
  Object.fromEntries(props.headers.map(h => [h.text, h.default ?? '']))
)



const getInputComponent = (type: string) => {
  switch (type) {
    case 'text':
    case 'number':
    case 'date':
    case 'time':
    case 'datetime':
      return 'input'
    case 'select':
    case 'multi-select':
      return 'select'
    default:
      return 'input'
  }
}
</script>

<style scoped>
@reference "assets/css/main.css";

.ui-table-wrapper {
  @apply w-full overflow-x-auto shadow-md sm:rounded-lg;
}

.ui-table {
  @apply w-full  text-left table-auto  bg-white  ;
}
.ui-thead {
  @apply text-xs text-gray-shade-400 uppercase  border-y border-gray-tint-200 ;
}
.ui-th {
  @apply px-6 py-3  ;
}
.ui-input {
  @apply w-28 border border-gray-tint-650 rounded-md p-1 text-center bg-transparent text-gray-shade-400 placeholder:text-gray-shade-400 placeholder:text-3xs placeholder:font-light text-3xs font-light;
}
.ui-action-text {
  @apply font-medium;
}
:deep(.ui-table) tbody tr:nth-child(odd) {
  @apply bg-transparent;
}
:deep(.ui-table) tbody tr:nth-child(even) {
  @apply bg-gray-tint-200;
}
:deep(.ui-table),
:deep(.ui-table tr) {
  @apply border-none text-center;
}
</style>
