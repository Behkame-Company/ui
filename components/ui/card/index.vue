<template>
    <div class="ui-card" :class="size_class">
        <div class="ui-card-header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="ui-card-body">
            <slot></slot>
        </div>
        <div class="ui-card-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    size: {
        type: String,
        default: 'sm',
        validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
})

const size_class = computed<string>(() => `ui-card-${props.size}`)

</script>
<style scoped>

@reference "assets/css/main.css";

.ui-card {
    @apply rounded-lg bg-white transition-all duration-300 ;
}

.ui-card-header {
    @apply border-b border-tint-200 ;
}

.ui-card-body {
    
}

.ui-card-footer {
     
}

/* shadow */

.ui-card-xl {
    @apply shadow-xs hover:shadow-lg ;
}

.ui-card-lg {
    @apply shadow-2xs hover:shadow-sm ;
}

.ui-card-md {
    @apply shadow-2xs hover:shadow-sm ;
}

.ui-card-sm {
    @apply shadow-2xs hover:shadow-sm ;
}

/* size header */

.ui-card-xl > .ui-card-header {
    @apply  p-4 ;
}

.ui-card-lg > .ui-card-header {
    @apply  p-3 ;
}

.ui-card-md > .ui-card-header {
    @apply  p-3 ;
}

.ui-card-sm > .ui-card-header {
    @apply  p-2 ;
}

/* size body */

.ui-card-xl > .ui-card-body {
    @apply  pt-4 pb-4 px-4 ;
}

.ui-card-lg > .ui-card-body {
    @apply pt-3 pb-3 px-3 ;
}

.ui-card-md > .ui-card-body {
    @apply  pt-3 pb-3 px-3 ;
}

.ui-card-sm > .ui-card-body {
    @apply  pt-2 pb-2 px-2 ;
}

/* size footer */

.ui-card-xl > .ui-card-footer {
    @apply pb-4 px-4 ;
}

.ui-card-lg > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-md > .ui-card-footer {
    @apply pb-3 px-3 ;
}

.ui-card-sm > .ui-card-footer {
    @apply pb-2 px-2 ;
}

</style>
