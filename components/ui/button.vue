<template>
   
   <div class="ui-button-container" :class="{ 'ui-button-container-focused': focused, 'ui-button-container-disabled': disabled }">
     
     <button class="ui-button" @click="onTap()" :disabled="disabled" :class="{
            'ui-button-loading': loading,
            'ui-button-loading-xl': loading && size_class === 'ui-button-xl',
            'ui-button-loading-lg': loading && size_class === 'ui-button-lg',
            'ui-button-loading-md': loading && size_class === 'ui-button-md',
            'ui-button-loading-sm': loading && size_class === 'ui-button-sm',
            [size_class]: !loading,
            'ui-button-with-icon': (prefix_icon || suffix_icon),
            'ui-button-with-prefix': prefix_icon,
            'ui-button-with-suffix': suffix_icon,
            'ui-button-with-both-icons': (prefix_icon && suffix_icon)
        }">

            <UiSpinner v-if="loading" :size="icon_size_class" />
          
            <div v-else class="ui-button-content" :class="{ 'ui-button-content-xl': size_class === 'ui-button-xl', 'ui-button-content-lg': size_class === 'ui-button-lg', 'ui-button-content-md': size_class === 'ui-button-md', 'ui-button-content-sm': size_class === 'ui-button-sm' }">
             
                <div v-if="prefix_icon" class="flex items-center justify-center">
                    <Icon :name="prefix_icon" :size="icon_size_class" />
                </div>

                <slot />

                <div v-if="suffix_icon" class="flex items-center justify-center">
                    <Icon :name="suffix_icon" :size="icon_size_class" />
                </div>

            </div>

        </button>

    </div>

</template>
<script setup lang="ts">

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    loading: {
        type: Boolean,
        default: false,
        required: false,
    },
    size: {
        type: String,
        default: 'xl',
        required: false,
        validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
        type: String,
        default: 'primary',
        required: false,
        validator: (value: string) => ['primary', 'outline', 'secondary', 'dark', 'text-bt', 'error', 'success', 'warning', 'info'].includes(value)
    },
    suffix_icon: {
        type: String,
        default: '',
    },
    prefix_icon: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['tap'])

function onTap() {
    emit('tap')
}

const focused = ref<boolean>(false)

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

const icon_size_class = computed<string>(() => {
    switch (props.size) {
        case 'sm':
            return "14px";
        case 'md':
            return "16px";
        case 'lg':
            return "18px";
        case 'xl':
            return "20px";
        default:
            return "0px";
    }
})

</script>
<style scoped>

@reference "assets/css/main.css";

.ui-button-container {
    @apply flex justify-center items-center;
}

.ui-button {
    @apply bg-primary rounded-md flex items-center justify-center hover:bg-blue-600 focus:bg-blue-800 focus:border-1 text-white;
    border-color: var(--color-blue-900);
}

.ui-button:disabled {
    @apply bg-primary opacity-[.2];
}

.ui-button-container-focused {
    @apply border-1 border-primary;
}

.ui-button-container-disabled {
    @apply opacity-50;
}

.ui-button-content {
    @apply flex flex-row items-center justify-center;
}

/* ===== size ===== */

.ui-button-content-xl {
    @apply flex gap-[8px] font-bold text-h6;
}

.ui-button-content-lg {
    @apply flex gap-[8px] font-normal text-base;
}

.ui-button-content-md {
    @apply flex gap-[6px] font-normal text-sm;
}

.ui-button-content-sm {
    @apply flex gap-[4px] font-normal text-sm;
}

/* Default  */
.ui-button-xl {
    @apply w-[168px] py-[14px] h-[52px];
}

.ui-button-lg {
    @apply w-[132px] py-[12px] h-[46px];
}

.ui-button-md {
    @apply w-[112px] py-[12px] h-[40px];
}

.ui-button-sm {
    @apply w-[96px] py-[8px] h-[32px];
}

/* Loading  */
.ui-button-loading-xl {
    @apply w-[168px] py-[14px] h-[52px];
}

.ui-button-loading-lg {
    @apply w-[132px] py-[12px] h-[46px];
}

.ui-button-loading-md {
    @apply w-[112px] py-[12px] h-[40px];
}

.ui-button-loading-sm {
    @apply w-[96px] py-[8px] h-[32px];
}

/*  prefix icon */
.ui-button-with-prefix.ui-button-xl {
    @apply pl-[24px] pr-[32px] py-[14px];
}

.ui-button-with-prefix.ui-button-lg {
    @apply pl-[16px] pr-[24px] py-[12px];
}

.ui-button-with-prefix.ui-button-md {
    @apply pl-[12px] pr-[18px] py-[12px];
}

.ui-button-with-prefix.ui-button-sm {
    @apply pl-[8px] pr-[14px] py-[8px];
}

/*  suffix icon */
.ui-button-with-suffix.ui-button-xl {
    @apply pr-[24px] pl-[32px] py-[14px];
}

.ui-button-with-suffix.ui-button-lg {
    @apply pr-[16px] pl-[24px] py-[12px];
}

.ui-button-with-suffix.ui-button-md {
    @apply pr-[12px] pl-[18px] py-[12px];
}

.ui-button-with-suffix.ui-button-sm {
    @apply pr-[8px] pl-[14px] py-[8px];
}

/* prefix and suffix icons */
.ui-button-with-both-icons.ui-button-xl {
    @apply px-[24px] py-[14px];
}

.ui-button-with-both-icons.ui-button-lg {
    @apply pl-[12px] pr-[12px] py-[12px];
}

.ui-button-with-both-icons.ui-button-md {
    @apply pl-[8px] pr-[8px] py-[12px];
}

.ui-button-with-both-icons.ui-button-sm {
    @apply pl-[6px] pr-[6px] py-[8px];
}

</style>
