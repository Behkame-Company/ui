<template>

    <div class="flex justify-center items-center w-full h-full">

        <svg class="animate-spin" :width="size" :height="size" viewBox="0 0 32 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">

            <path
                d="M29.6339 15.8777C29.613 8.92813 24.3583 3.07725 17.5021 2.38188C17.0655 2.33737 16.6207 2.37075 16.1842 2.32903C15.3431 2.25114 14.8483 1.75882 14.8914 1.07735C14.9331 0.413967 15.4224 -0.022728 16.2606 0.000914705C19.9195 0.102439 23.2239 1.23173 26.0542 3.5807C30.1969 7.01724 32.1681 11.4704 31.9888 16.8359C31.7344 24.4628 25.4467 31.0341 17.8482 31.8991C9.75892 32.8198 1.69745 27.3653 0.216945 18.573C0.0821001 17.7747 -0.0263315 16.9694 0.00564195 16.1545C0.0376154 15.345 0.45466 14.8708 1.14834 14.8541C1.84481 14.8374 2.35499 15.3381 2.3675 16.1725C2.38697 17.5994 2.61634 18.9818 3.06953 20.3323C6.26965 29.8853 18.4501 32.7753 25.583 25.6755C28.3021 22.9691 29.6297 19.6981 29.6353 15.8777H29.6339Z"
                fill="url(#paint0_linear_464_12455)" />

            <defs>

                <linearGradient id="paint0_linear_464_12455" x1="19.4607" y1="-7.09468" x2="4.8547" y2="18.281"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="transparent" />
                    <stop offset="1" stop-color="#ffff" />
                </linearGradient>

            </defs>

        </svg>

    </div>

</template>

<script setup lang="ts">

const props = defineProps({
    size: {
        type: String,
        default: '20px'
    }
})

</script>