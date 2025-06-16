<template>
  <div class="ui-card">
    <slot />
  </div>
</template>
<style>

@reference "assets/css/main.css";

.ui-card {
  @apply bg-white rounded-lg p-4 border border-gray-200;
}

</style>