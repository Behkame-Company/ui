<template>
  <div class="container mx-auto">
    
    <h1 class="text-center mt-4 mb-4 text-h5 font-bold">Behkame Design System</h1>


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


  </div>
</template>
<script setup lang="ts">

const name = ref<string>("")

const updateName = (value: string) => {

  console.log(value)
  name.value = value 
}

</script>