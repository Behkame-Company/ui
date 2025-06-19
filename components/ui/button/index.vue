<template>
   
    <button class="ui-button" @click="onTap()" :disabled="disabled" :class="{
        [size_class]: true,
        [color_class]: true,
        'ui-button-disabled': disabled,
        'ui-button-loading': loading,
        'ui-button-with-prefix': prefix_icon,
        'ui-button-with-suffix': suffix_icon,
        'ui-button-with-both-icons': (prefix_icon && suffix_icon)
    }">

        <UiLoadingSpinner v-if="loading" :size="props.size" />
        
        <template v-else>

            <Icon v-if="prefix_icon" :class="`${prefix_icon_class}`" :name="prefix_icon" :size="props.size" />

            <span :class="`${text_size_class}`">
                <slot />
            </span>

            <Icon v-if="suffix_icon" :class="`${suffix_icon_class}`" :name="suffix_icon" :size="props.size" />

        </template>

    </button>

</template>
<script setup lang="ts">

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false, // set this to true to disable the button
    },
    loading: {
        type: Boolean,
        default: false, // set this to true to show the loading spinner
    },
    size: {
        type: String,
        default: 'sm', // set this to the size of the button
        validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
        type: String,
        default: 'primary', // set this to the color of the button
        validator: (value: string) => ['primary', 'outline', 'secondary', 'dark', 'text-bt', 'error', 'success', 'warning', 'info'].includes(value)
    },
    suffix_icon: {
        type: String,
        default: '', // set this name of the icon to add to the suffix of the button
    },
    prefix_icon: {
        type: String,
        default: '', // set this name of the icon to add to the prefix of the button
    },
})

const emit = defineEmits(['tap'])

function onTap() {
    emit('tap')
}
 
const color_class = computed<string>(() => {
    switch (props.color) {
        case 'primary':
            return 'ui-button-primary';
        case 'outline':
            return 'ui-button-outline';
        case 'secondary':
            return 'ui-button-secondary';
        case 'dark':
            return 'ui-button-dark';
        case 'text-bt':
            return 'ui-button-text-bt';
        case 'error':
            return 'ui-button-error';
        case 'success':
            return 'ui-button-success';
        case 'warning':
            return 'ui-button-warning';
        case 'info':
            return 'ui-button-info';
        default:
            return 'ui-button-primary';
    }
})

const size_class = computed<string>(() => {
    switch (props.size) {
        case 'xl':
            return 'ui-button-xl';
        case 'lg':
            return 'ui-button-lg';
        case 'md':
            return 'ui-button-md';
        case 'sm':
            return 'ui-button-sm';
        default:
            return 'ui-button-xl';
    }
})

const text_size_class = computed<string>(() => {
    switch (props.size) {
        case 'xl':
            return 'ui-button-text-xl';
        case 'lg':
            return 'ui-button-text-lg';
        case 'md':
            return 'ui-button-text-md';
        case 'sm':
            return 'ui-button-text-sm';
        default:
            return 'ui-button-text-xl';
    }
})

const prefix_icon_class = computed<string>(() => {
    switch (props.size) {
        case 'xl':
            return 'ui-button-prefix-icon-xl';
        case 'lg':
            return 'ui-button-prefix-icon-lg';
        case 'md':
            return 'ui-button-prefix-icon-md';
        case 'sm':
            return 'ui-button-prefix-icon-sm';
        default:
            return 'ui-button-prefix-icon-xl';
    }
})

const suffix_icon_class = computed<string>(() => {
    switch (props.size) {
        case 'xl':
            return 'ui-button-suffix-icon-xl';
        case 'lg':
            return 'ui-button-suffix-icon-lg';
        case 'md':
            return 'ui-button-suffix-icon-md';
        case 'sm':
            return 'ui-button-suffix-icon-sm';
        default:
            return 'ui-button-suffix-icon-xl';
    }
})
  
</script>
<style scoped>

@reference "assets/css/main.css";

.ui-button {
    @apply  flex items-center justify-center border-1 rounded-md transition-all cursor-pointer ;
}
 
.ui-button-disabled {
    @apply opacity-50 cursor-not-allowed;
}

/* ===== color ===== */

.ui-button-primary {
    @apply text-white bg-primary hover:bg-blue-600 border-primary hover:border-blue-600 ;
}

.ui-button-outline {
    @apply text-primary  bg-transparent hover:bg-blue-50 border-primary ;
}

.ui-button-secondary {
    @apply text-primary bg-blue-100 hover:bg-blue-200 border-blue-100 hover:border-blue-200 ;
}

.ui-button-dark  {
    @apply text-white bg-black hover:bg-shade-900 border-black hover:border-shade-900 ;
}

.ui-button-error {
    @apply text-white bg-error hover:bg-red-400 border-error hover:border-red-400 ;
}

.ui-button-success {
    @apply text-white bg-success hover:bg-green-400 border-success hover:border-green-400 ;
}

.ui-button-warning {
    @apply text-white bg-warning hover:bg-yellow-400 border-warning hover:border-yellow-400 ;
}

.ui-button-info {
    @apply text-white bg-info hover:bg-purple-400 border-info hover:border-purple-400 ;
}

/* ===== size ===== */

.ui-button-xl {
    @apply px-6 py-3.5  ;
}

.ui-button-lg {
    @apply px-4 py-3 ;
}

.ui-button-md {
    @apply px-2.5 py-3 ;
}

.ui-button-sm {
    @apply px-2.5 py-2 ;
}

/* ===== text size ===== */

.ui-button-text-xl {
    @apply px-2 text-h5 ;
}

.ui-button-text-lg {
    @apply px-2 text-h6;
}

.ui-button-text-md {
    @apply px-1.5 text-base;
}

.ui-button-text-sm {
    @apply px-1 text-base;
}

/* ===== loading ===== */

.ui-button-loading {
    @apply cursor-progress;
}

.ui-button-xl.ui-button-loading{
    @apply px-18 ;
}

.ui-button-lg.ui-button-loading{
    @apply px-14 ;
}

.ui-button-md.ui-button-loading{
    @apply px-12 ;
}

.ui-button-sm.ui-button-loading{
    @apply px-10 ;
}

/* ===== icon ===== */

.ui-button-prefix-icon-xl{
    @apply w-6 h-6 me-2; 
}

.ui-button-prefix-icon-lg{
    @apply w-5 h-5 me-2; 
}

.ui-button-prefix-icon-md{
    @apply w-4 h-4 me-1.5 ; 
}

.ui-button-prefix-icon-sm{
    @apply w-4 h-4 me-1 ; 
}

.ui-button-suffix-icon-xl{
    @apply w-6 h-6 ms-2; 
}

.ui-button-suffix-icon-lg{
    @apply w-5 h-5 ms-2; 
}

.ui-button-suffix-icon-md{
    @apply w-4 h-4 ms-1.5 ; 
}

.ui-button-suffix-icon-sm{
    @apply w-4 h-4 ms-1 ; 
}

</style>
