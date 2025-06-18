<script setup lang="ts">
import { UiButton, UiInput, UiCard } from '#components';

</script>

<template>
  <div class="container mx-auto">

    <h1 class="text-center mt-4 mb-4 text-2xl font-bold">Behkame Design System</h1>


    <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Input Components</h3>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Diffrent sizes</h5>
    
        <UiInput class="my-1" name="name" size="sm" placeholder="Input size sm" />
        
        <UiInput class="my-1" name="name" size="md" placeholder="Input size md" />
        
        <UiInput class="my-1" name="name" size="lg" placeholder="Input size lg" />
        
        <UiInput class="my-1" name="name" size="xl" placeholder="Input size xl" />

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix icon</h5>
  
        <UiInput class="my-1" prefix_icon="material-symbols:bolt" placeholder="Input with prefix icon" />

        <UiInput class="my-1" suffix_icon="material-symbols:bolt" placeholder="Input with suffix icon" />

        <UiInput class="my-1" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt" placeholder="Input with prefix and suffix icon" />
        
      </div>

      <div class="w-1/4 px-2">

        <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix callback</h5>

        <UiInput class="my-1" prefix_icon="material-symbols:bolt" :prefix_callback="() => {}" placeholder="Input with prefix icon" />

        <UiInput class="my-1" suffix_icon="material-symbols:bolt" :suffix_callback="() => {}" placeholder="Input with suffix icon" />

        <UiInput class="my-1" prefix_icon="material-symbols:bolt" :prefix_callback="() => {}" suffix_icon="material-symbols:bolt" :suffix_callback="() => {}" placeholder="Input with prefix and suffix icon" />

      </div>
  
      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Disabled state</h5>
        
        <UiInput class="my-1" placeholder="Default state" />

        <UiInput class="my-1" :disabled="true" placeholder="Disabled state" />

  
      </div>

    </div>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Text area</h5>
    

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Password</h5>
    

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">File</h5>
    

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Upload image</h5>
    

      </div>

    </div>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Pin Code</h5>
    

      </div>


    </div>


    <UiCard class="w-full ">
      <span class="text-start mt-4 mb-4">this is content of card</span>
    </UiCard>

    <h3 class="text-start mt-4 mb-4 text-xl font-bold">Button Component</h3>

    <div class="flex flex-row gap-[8px]">

      <div>

     <h5 class="text-start mt-4 mb-4 text-lg font-bold">Default</h5>

    <UiButton class="mt-[16px]" size="xl"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" ><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm"><span class="text-white">Button</span></UiButton>
   
    </div>

    <div>

    <h5 class="text-start mt-4 mb-4 text-lg font-bold">Loading</h5>

    <UiButton class="mt-[16px]" size="xl" :loading="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" :loading="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md" :loading="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm" :loading="true"><span class="text-white">Button</span></UiButton>
   
    </div>

  <div>

    <h5 class="text-start mt-4 mb-4 text-lg font-bold">Disabled</h5>

    <UiButton class="mt-[16px]" size="xl" :disabled="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" :disabled="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md" :disabled="true"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm" :disabled="true"><span class="text-white">Button</span></UiButton>
   
    </div>

            <div>

    <h5 class="text-start mt-4 mb-4 text-lg font-bold">Suffix Icon</h5>

    <UiButton class="mt-[16px]" size="xl" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
   
    </div>

    <div>

    <h5 class="text-start mt-4 mb-4 text-lg font-bold">Prefix Icon</h5>

    <UiButton class="mt-[16px]" size="xl" prefix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" prefix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md" prefix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm" prefix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
   
    </div>

     <div>

    <h5 class="text-start mt-4 mb-4 text-lg font-bold whitespace-nowrap">Prefix Icon & Suffix Icon</h5>

    <UiButton class="mt-[16px]" size="xl" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="lg" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="md" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
     <UiButton class="mt-[16px]" size="sm" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt"><span class="text-white">Button</span></UiButton>
   
    </div>
      
    </div>
   
  </div>
</template>