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

        <UiInputTextArea class="w-full my-1" size="sm" placeholder="sm text area" />

        <UiInputTextArea class="w-full my-1" size="md" placeholder="md text area" />

        <UiInputTextArea class="w-full my-1" size="lg" placeholder="lg text area" />
    
        <UiInputTextArea class="w-full my-1" size="xl" placeholder="xl text area" />

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Password</h5>
    
        <UiInputPassword class="my-1" size="sm" placeholder="password sm" />

        <UiInputPassword class="my-1" size="md" placeholder="password md" />

        <UiInputPassword class="my-1" size="lg" placeholder="password lg" />

        <UiInputPassword class="my-1" size="xl" placeholder="password xl" />

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

    <h3 class="text-start mt-4 mb-4 text-xl font-bold">Button Component</h3>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Default</h5>

        <UiButton class="my-2" size="sm"> Button sm </UiButton>

        <UiButton class="my-2" size="md"> Button md </UiButton>

        <UiButton class="my-2" size="lg" > Button lg </UiButton>

        <UiButton class="my-2" size="xl"> Button xl </UiButton>

    
      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Colors</h5>

        <UiButton class="my-2" color="primary"> Button Primary </UiButton>

        <UiButton class="my-2" color="outline"> Button Outline </UiButton>

        <UiButton class="my-2" color="secondary"> Button Secondary </UiButton>

        <UiButton class="my-2" color="dark"> Button Dark </UiButton>

        <UiButton class="my-2" color="error"> Button Error </UiButton>

        <UiButton class="my-2" color="success"> Button Success </UiButton>

        <UiButton class="my-2" color="warning"> Button Warning </UiButton>

        <UiButton class="my-2" color="info"> Button Info </UiButton>

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Disabled state</h5>

        <UiButton class="my-2" :disabled="true" color="primary"> Button Primary </UiButton>

        <UiButton class="my-2" :disabled="true" color="outline"> Button Outline </UiButton>

        <UiButton class="my-2" :disabled="true" color="secondary"> Button Secondary </UiButton>

        <UiButton class="my-2" :disabled="true" color="dark"> Button Dark </UiButton>

        <UiButton class="my-2" :disabled="true" color="error"> Button Error </UiButton>

        <UiButton class="my-2" :disabled="true" color="success"> Button Success </UiButton>

        <UiButton class="my-2" :disabled="true" color="warning"> Button Warning </UiButton>

        <UiButton class="my-2" :disabled="true" color="info"> Button Info </UiButton>

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Loading state</h5>

        <UiButton class="my-2" size="sm" :loading="true" color="primary"> Button Primary </UiButton>

        <UiButton class="my-2" size="md" :loading="true" color="outline"> Button Outline </UiButton>

        <UiButton class="my-2" size="lg" :loading="true" color="secondary"> Button Secondary </UiButton>

        <UiButton class="my-2" size="xl" :loading="true" color="dark"> Button Dark </UiButton>

        <UiButton class="my-2" size="sm" :loading="true" color="error"> Button Error </UiButton>

        <UiButton class="my-2" size="md" :loading="true" color="success"> Button Success </UiButton>

        <UiButton class="my-2" size="lg" :loading="true" color="warning"> Button Warning </UiButton>

        <UiButton class="my-2" size="xl" :loading="true" color="info"> Button Info </UiButton>

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Suffix / Prefix Icon</h5>

        <UiButton class="my-2" size="sm" suffix_icon="material-symbols:bolt"> Suffix Icon </UiButton>

        <UiButton class="my-2" size="md" suffix_icon="material-symbols:bolt"> Suffix Icon </UiButton>

        <UiButton class="my-2" size="lg" suffix_icon="material-symbols:bolt"> Suffix Icon </UiButton>

        <UiButton class="my-2" size="xl" suffix_icon="material-symbols:bolt"> Suffix Icon </UiButton>

        <UiButton class="my-2" size="sm" prefix_icon="material-symbols:bolt"> Prefix Icon </UiButton>

        <UiButton class="my-2" size="md" prefix_icon="material-symbols:bolt"> Prefix Icon </UiButton>

        <UiButton class="my-2" size="lg" prefix_icon="material-symbols:bolt"> Prefix Icon </UiButton>

        <UiButton class="my-2" size="xl" prefix_icon="material-symbols:bolt"> Prefix Icon </UiButton>

      </div>

    </div>
    
  </div>
</template>