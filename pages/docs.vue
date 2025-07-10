<template>
  <div class="container mx-auto">

    <!-- <h1 class="text-center mt-4 mb-4 text-2xl font-bold">Behkame Design System</h1>

    <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Card Components</h3>

    <div class="flex justify-start items-start mt-4">
      <div class="w-1/4 px-2">
        <UiCard size="xl">
          <template #default>
            <span class="text-start text-h5">Card Body XL</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="lg">
          <template #default>
            <span class="text-start text-h6">Card Body LG</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="md">
          <template #default>
            <span class="text-start text-base">Card Body MD</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="sm">
          <template #default>
            <span class="text-start text-sm">Card Body SM</span>
          </template>
        </UiCard>
      </div>
    </div>
    
    <div class="flex justify-start items-start mt-4">
      <div class="w-1/4 px-2">
        <UiCard size="xl">
          <template #header>
            <span class="text-start text-h5">Card header XL</span>
          </template>
          <template #default>
            <span class="text-start text-h5">Card Body XL</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="lg">
          <template #header>
            <span class="text-start text-h6">Card header LG</span>
          </template>
          <template #default>
            <span class="text-start text-h6">Card Body LG</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="md">
          <template #header>
            <span class="text-start text-base">Card header MD</span>
          </template>
          <template #default>
            <span class="text-start text-base">Card Body MD</span>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="sm">
          <template #header>
            <span class="text-start text-sm">Card header SM</span>
          </template>
          <template #default>
            <span class="text-start text-sm">Card Body SM</span>
          </template>
        </UiCard>
      </div>
    </div>

    <div class="flex justify-start items-start mt-4">
      <div class="w-1/4 px-2">
        <UiCard size="xl">
          <template #header>
            <span class="text-start text-h5">Card header XL</span>
          </template>
          <template #default>
            <span class="text-start text-h5">Card Body XL</span>
          </template>
          <template #footer>
            <UiButton class="w-full" size="xl" color="primary"> Button Footer XL</UiButton>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="lg">
          <template #header>
            <span class="text-start text-h6">Card header LG</span>
          </template>
          <template #default>
            <span class="text-start text-h6">Card Body LG</span>
          </template>
          <template #footer>
            <UiButton class="w-full" size="lg" color="primary"> Button Footer LG</UiButton>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="md">
          <template #header>
            <span class="text-start text-base">Card header MD</span>
          </template>
          <template #default>
            <span class="text-start text-base">Card Body MD</span>
          </template>
          <template #footer>
            <UiButton class="w-full" size="md" color="primary"> Button Footer MD</UiButton>
          </template>
        </UiCard>
      </div>
      <div class="w-1/4 px-2">
        <UiCard size="sm">
          <template #header>
            <span class="text-start text-sm">Card header SM</span>
          </template>
          <template #default>
            <span class="text-start text-sm">Card Body SM</span>
          </template>
          <template #footer>
            <UiButton class="w-full"size="sm" color="primary"> Button Footer SM</UiButton>
          </template>
        </UiCard>
      </div>
    </div>

    <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Input Components</h3>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Diffrent sizes</h5>
    
        <UiInput class="my-4" name="name" size="sm" placeholder="Input size sm" />

        <UiInput class="my-4" name="name" size="sm" :disabled="true" placeholder="Input size sm disabled" />
        
        <UiInput class="my-4" name="name" size="md" placeholder="Input size md" />

        <UiInput class="my-4" name="name" size="md" :disabled="true" placeholder="Input size md disabled" />
        
        <UiInput class="my-4" name="name" size="lg" placeholder="Input size lg" />

        <UiInput class="my-4" name="name" size="lg" :disabled="true" placeholder="Input size lg disabled" />
        
        <UiInput class="my-4" name="name" size="xl" placeholder="Input size xl" />

        <UiInput class="my-4" name="name" size="xl" :disabled="true" placeholder="Input size xl disabled" />

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix icon</h5>
  
        <UiInput class="my-4" prefix_icon="material-symbols:bolt" placeholder="Input with prefix icon" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :disabled="true" placeholder="Input with prefix icon disabled" />

        <UiInput class="my-4" suffix_icon="material-symbols:bolt" placeholder="Input with suffix icon" />

        <UiInput class="my-4" suffix_icon="material-symbols:bolt" :disabled="true" placeholder="Input with suffix icon disabled" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" suffix_icon="material-symbols:bolt" placeholder="Input with prefix and suffix icon" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :disabled="true" suffix_icon="material-symbols:bolt" placeholder="Input with prefix and suffix icon disabled" />
        
      </div>

      <div class="w-1/4 px-2">

        <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix callback</h5>

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :prefix_callback="() => {}" placeholder="Input with prefix icon" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :disabled="true" :prefix_callback="() => {}" placeholder="Input with prefix icon" />

        <UiInput class="my-4" suffix_icon="material-symbols:bolt" :suffix_callback="() => {}" placeholder="Input with suffix icon" />

        <UiInput class="my-4" suffix_icon="material-symbols:bolt" :disabled="true" :suffix_callback="() => {}" placeholder="Input with suffix icon" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :prefix_callback="() => {}" suffix_icon="material-symbols:bolt" :suffix_callback="() => {}" placeholder="Input with prefix and suffix icon" />

        <UiInput class="my-4" prefix_icon="material-symbols:bolt" :disabled="true" :prefix_callback="() => {}" suffix_icon="material-symbols:bolt" :suffix_callback="() => {}" placeholder="Input with prefix and suffix icon" />

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Dropdown</h5>
    
        <UiInputDropdown class="my-4 w-96" size="sm" placeholder="dropdown sm" v-model="dropdown_model_1" :options="dropdown_options" />

        <UiInputDropdown class="my-4 w-96" size="sm" placeholder="dropdown sm disabled" v-model="dropdown_model_1" :options="dropdown_options" :disabled="true" />

        <UiInputDropdown class="my-4 w-96" size="md" placeholder="dropdown md" v-model="dropdown_model_2" :options="dropdown_options" />

        <UiInputDropdown class="my-4 w-96" size="md" placeholder="dropdown md disabled" v-model="dropdown_model_2" :options="dropdown_options" :disabled="true" />

        <UiInputDropdown class="my-4 w-96" size="lg" placeholder="dropdown lg" v-model="dropdown_model_3" :options="dropdown_options" />

        <UiInputDropdown class="my-4 w-96" size="lg" placeholder="dropdown lg disabled" v-model="dropdown_model_3" :options="dropdown_options" :disabled="true" />

        <UiInputDropdown class="my-4 w-96" size="xl" placeholder="dropdown xl" v-model="dropdown_model_4" :options="dropdown_options" />

        <UiInputDropdown class="my-4 w-96" size="xl" placeholder="dropdown xl disabled" v-model="dropdown_model_4" :options="dropdown_options" :disabled="true" />

      </div>

    </div>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Text area</h5>

        <UiInputTextArea class="w-full my-4" size="sm" :disabled="true" placeholder="sm text area" />

        <UiInputTextArea class="w-full my-4" size="sm" placeholder="sm text area" />

        <UiInputTextArea class="w-full my-4" size="md" placeholder="md text area" />

        <UiInputTextArea class="w-full my-4" size="lg" placeholder="lg text area" />
    
        <UiInputTextArea class="w-full my-4" size="xl" placeholder="xl text area" />

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Password</h5>
    
        <UiInputPassword class="my-4" size="sm" :disabled="true" placeholder="password sm" />
        
        <UiInputPassword class="my-4" size="sm" placeholder="password sm" />
        
        <UiInputPassword class="my-4" size="sm" :disabled="true" placeholder="password sm" />

        <UiInputPassword class="my-4" size="md" placeholder="password md" />
        
        <UiInputPassword class="my-4" size="md" :disabled="true" placeholder="password md" />

        <UiInputPassword class="my-4" size="lg" placeholder="password lg" />
        
        <UiInputPassword class="my-4" size="lg" :disabled="true" placeholder="password lg" />

        <UiInputPassword class="my-4" size="xl" placeholder="password xl" />
        
        <UiInputPassword class="my-4" size="xl" :disabled="true" placeholder="password xl" />
        

      </div>

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">Pin Code</h5>
    
        <UiInputPinCode class="my-4 w-52" size="sm" />
        
        <UiInputPinCode class="my-4 w-52" :disabled="true" size="sm" />

        <UiInputPinCode class="my-4 w-64" size="md" />
        
        <UiInputPinCode class="my-4 w-64" :disabled="true" size="md" />

        <UiInputPinCode class="my-4 w-72" size="lg" />
        
        <UiInputPinCode class="my-4 w-72" :disabled="true" size="lg" />

        <UiInputPinCode class="my-4 w-80" size="xl" />
        
        <UiInputPinCode class="my-4 w-80" :disabled="true" size="xl" />

      </div>

    </div>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-xl">File</h5>
    

      </div>


    </div> -->

    <h3 class="text-start mt-4 mb-4 text-xl font-bold">Button Component</h3>

    <div class="flex justify-start items-start">

      <div class="w-1/4 px-2">
  
        <h5 class="text-start mt-4 mb-4 text-lg font-bold">Default</h5>
        <UiButton color="primary" class="my-2" size="xs"> xs </UiButton>

        <UiButton class="my-2" size="sm">  sm </UiButton>

        <UiButton class="my-2" size="md">  md </UiButton>

        <UiButton class="my-2" size="lg" >  lg </UiButton>

        <UiButton  size="xl">  xl </UiButton>

    
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
      <UiLink text="Home" color="warning" size="xl"/>

    </div>
       <!-- <h3 class="text-start mt-4 mb-4 text-xl font-bold">
      toast-alert Component
    </h3>

    <div class="flex justify-start items-start gap-5">
      <div class="flex flex-col w-1/4 gap-2">
        <UiToastSnackbarAlert
          color="primary"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi its my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="outline"  
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi its my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="dark"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi it my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="error"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi it my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="success"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi it my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="warning"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi it my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="info"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          body_text="hi it my message"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
      </div>
      <div class="flex flex-col w-1/4 gap-2">
        <UiToastSnackbarAlert
          color="primary"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="outline"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="dark"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="error"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="success"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="warning"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
        <UiToastSnackbarAlert
          color="info"
          size="lg"
          cancel_icon="material-symbols:cancel-outline"
          title="Message"
          icon_size="lg"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="false"
        />
      </div>
      <div class="flex flex-col w-1/4 gap-2">
        <UiToastSnackbarAlert
          color="primary"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="outline"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="dark"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="error"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="success"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="warning"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
        <UiToastSnackbarAlert
          color="info"
          size="sm"
          title="Message"
          icon_size="sm"
          prefix_icon="material-symbols:electric-bolt-rounded"
          :auto_dismiss="true"
          :timer="30"
        />
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">

const dropdown_options = ref<{ label: string, value: string }[]>([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 9', value: 'option9' },
  { label: 'Option 10', value: 'option10' }
])

const dropdown_model_1 = ref<string>('')
const dropdown_model_2 = ref<string>('')
const dropdown_model_3 = ref<string>('')
const dropdown_model_4 = ref<string>('')

</script>