<template>
  <div class="flex flex-row">
    <UiSidebar
      data="Data"
      button-color="info"
      sidebar-bg="#2F4F4F"
      :topSections="[
        { iconName: 'User', text: 'Profile', to: '/profile' },
        { iconName: 'UserAdd', text: 'Home', to: '/' },
        { iconName: 'User', text: 'Settings', to: '/settings' },
      ]"
      :bottomSections="[
        { iconName: 'User', text: 'Profile', to: '/profile' },
        { iconName: 'UserAdd', text: 'Home', to: '/' },
        { iconName: 'User', text: 'Settings', to: '/settings' },
      ]"
      :thirdSections="[{ iconName: 'User', text: 'Profile', to: '/profile' }]"
    />  
        
   
      
  <div class="w-11/12 p-5">
  
   
  <!-- ...rest of your docs content... -->


  <h1 class="text-center mt-4 mb-4 text-2xl font-bold">
    Behkame Design System
  </h1>

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
          <UiButton class="w-full" size="xl" color="primary">
            Button Footer XL</UiButton
          >
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
          <UiButton class="w-full" size="lg" color="primary">
            Button Footer LG</UiButton
          >
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
          <UiButton class="w-full" size="md" color="primary">
            Button Footer MD</UiButton
          >
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
          <UiButton class="w-full" size="sm" color="primary">
            Button Footer SM</UiButton
          >
        </template>
      </UiCard>
    </div>
  </div>
  <div class="flex justify-around items-start p-6">
    <UiCard
      size="sm"
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    >
      <template #header>
        <span>Card header with Image</span>
      </template>
      <template #default>
        <span
          >This card displays an image inside the body, edge-to-edge.</span
        >
      </template>
      <template #footer>
        <UiButton class="w-full" size="sm" color="primary">
          Button Footer SM
        </UiButton>
      </template>
    </UiCard>
    <UiCard
      size="md"
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    >
      <template #header>
        <span>Card header with Image</span>
      </template>
      <template #default>
        <span
          >This card displays an image inside the body, edge-to-edge.</span
        >
      </template>
      <template #footer>
        <UiButton class="w-full" size="md" color="primary">
          Button Footer M
        </UiButton>
      </template>
    </UiCard>
    <UiCard
      size="lg"
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    >
      <template #header>
        <span>Card header with Image</span>
      </template>
      <template #default>
        <span
          >This card displays an image inside the body, edge-to-edge.</span
        >
      </template>
      <template #footer>
        <UiButton class="w-full" size="lg" color="primary">
          Button Footer Lg
        </UiButton>
      </template>
    </UiCard>
    <UiCard
      size="xl"
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    >
      <template #header>
        <span>Card header with Image</span>
      </template>
      <template #default>
        <span
          >This card displays an image inside the body, edge-to-edge.</span
        >
      </template>
      <template #footer>
        <UiButton class="w-full" size="xl" color="primary">
          Button Footer Xl
        </UiButton>
      </template>
    </UiCard>
  </div>

  <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Input Components</h3>

  <div class="flex justify-start items-start">
    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Diffrent sizes</h5>

      <UiInput
        class="my-4"
        name="name"
        size="sm"
        placeholder="Input size sm"
        v-model="inputValue1"
      />

      <UiInput
        class="my-4"
        name="name"
        size="sm"
        :disabled="true"
        placeholder="Input size sm disabled"
      />

      <UiInput
        class="my-4"
        name="name"
        size="md"
        placeholder="Input size md"
      />

      <UiInput
        class="my-4"
        name="name"
        size="md"
        :disabled="true"
        placeholder="Input size md disabled"
      />

      <UiInput
        class="my-4"
        name="name"
        size="lg"
        placeholder="Input size lg"
      />

      <UiInput
        class="my-4"
        name="name"
        size="lg"
        :disabled="true"
        placeholder="Input size lg disabled"
      />

      <UiInput
        class="my-4"
        name="name"
        size="xl"
        placeholder="Input size xl"
      />

      <UiInput
        class="my-4"
        name="name"
        size="xl"
        :disabled="true"
        placeholder="Input size xl disabled"
      />
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix icon</h5>

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        placeholder="Input with prefix icon"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        :disabled="true"
        placeholder="Input with prefix icon disabled"
      />

      <UiInput
        class="my-4"
        suffixIcon="Flash"
        placeholder="Input with suffix icon"
      />

      <UiInput
        class="my-4"
        suffixIcon="Flash"
        :disabled="true"
        placeholder="Input with suffix icon disabled"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        suffixIcon="Flash"
        placeholder="Input with prefix and suffix icon"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        :disabled="true"
        suffixIcon="Flash"
        placeholder="Input with prefix and suffix icon disabled"
      />
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">
        Prefix and Suffix callback
      </h5>

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        :prefixCallback="() => {}"
        placeholder="Input with prefix icon"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash" 
        :disabled="true"
        :prefixCallback="() => {}"
        placeholder="Input with prefix icon"
      />

      <UiInput
        class="my-4"
        suffixIcon="Flash"
        :suffixCallback="() => {}"
        placeholder="Input with suffix icon"
      />

      <UiInput
        class="my-4"
        suffixIcon="Flash"
        :disabled="true"
        :suffixCallback="() => {}"
        placeholder="Input with suffix icon"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        :prefixCallback="() => {}"
        suffixIcon="Flash"
        :suffixCallback="() => {}"
        placeholder="Input with prefix and suffix icon"
      />

      <UiInput
        class="my-4"
        prefixIcon="Flash"
        :disabled="true"
        :prefixCallback="() => {}"
        suffixIcon="Flash"
        :suffixCallback="() => {}"
        placeholder="Input with prefix and suffix icon"
      />
    </div>

    <!-- <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Dropdown</h5>

      <UiInputDropdown
        class="my-4 w-96"
        size="sm"
        placeholder="dropdown sm"
        v-model="dropdown_model_1"
        :options="dropdown_options"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="sm"
        placeholder="dropdown sm disabled"
        v-model="dropdown_model_1"
        :options="dropdown_options"
        :disabled="true"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="md"
        placeholder="dropdown md"
        v-model="dropdown_model_2"
        :options="dropdown_options"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="md"
        placeholder="dropdown md disabled"
        v-model="dropdown_model_2"
        :options="dropdown_options"
        :disabled="true"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="lg"
        placeholder="dropdown lg"
        v-model="dropdown_model_3"
        :options="dropdown_options"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="lg"
        placeholder="dropdown lg disabled"
        v-model="dropdown_model_3"
        :options="dropdown_options"
        :disabled="true"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="xl"
        placeholder="dropdown xl"
        v-model="dropdown_model_4"
        :options="dropdown_options"
      />

      <UiInputDropdown
        class="my-4 w-96"
        size="xl"
        placeholder="dropdown xl disabled"
        v-model="dropdown_model_4"
        :options="dropdown_options"
        :disabled="true"
      />
    </div>
  </div> -->
   

    <div class="w-1/4 px-2 ">
      <h3 class="text-start mt-4 mb-4 text-h6 font-bold">
      DropDown Components
    </h3>
      <UiInputDropDown
        v-model="selectedCategory"
        :options="categoryOptions"
        placeholder="Select an option"
        class="my-2"
      />

      <UiInputMultiDropDown
        v-model="selectedOption"
        :options="options"
        placeholder="Select options"
      />
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Password</h5>

      <UiInputPassword
        class="my-4"
        size="sm"
        :disabled="true"
        placeholder="password sm"
      />

      <UiInputPassword class="my-4" size="sm" placeholder="password sm" />

      <UiInputPassword
        class="my-4"
        size="sm"
        :disabled="true"
        placeholder="password sm"
      />

      <UiInputPassword class="my-4" size="md" placeholder="password md" />

      <UiInputPassword
        class="my-4"
        size="md"
        :disabled="true"
        placeholder="password md"
      />

      <UiInputPassword class="my-4" size="lg" placeholder="password lg" />

      <UiInputPassword
        class="my-4"
        size="lg"
        :disabled="true"
        placeholder="password lg"
      />

      <UiInputPassword class="my-4" size="xl" placeholder="password xl" />

      <UiInputPassword
        class="my-4"
        size="xl"
        :disabled="true"
        placeholder="password xl"
      />
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Pin Code</h5>

      <UiInputPinCode class="my-4 w-52" size="xs" />
      <UiInputPinCode class="my-4 w-52" size="sm" />
      <UiInputPinCode class="my-4 w-52" size="md" />
      <UiInputPinCode class="my-4 w-52" size="lg" />
      <UiInputPinCode class="my-4 w-52" size="xl" />
    </div>
    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-xl">Text Area</h5>

      <UiInputTextArea
        class="my-4"
        size="sm"
        placeholder="Text Area size sm"
      />
      <UiInputTextArea
        class="my-4"
        size="md"
        placeholder="Text Area size md"
      />
      <UiInputTextArea
        class="my-4"
        size="lg"
        placeholder="Text Area size lg"
      />
      <UiInputTextArea
        class="my-4"
        size="xl"
        placeholder="Text Area size xl"
      />
    </div>
  </div>

  <h3 class="text-start mt-4 mb-4 text-xl font-bold">Button Component</h3>

  <div class="flex justify-start items-start">
    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Default</h5>
      <UiButton color="primary" class="my-2" size="xs"> xs </UiButton>

      <UiButton class="my-2" size="sm"> sm </UiButton>

      <UiButton class="my-2" size="md"> md </UiButton>

      <UiButton class="my-2" size="lg"> lg </UiButton>

      <UiButton size="xl"> xl </UiButton>
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
      <UiButton class="my-2" color="text-bt"> Button tb </UiButton>
      <UiButton class="my-2" color="gray"> Button gray </UiButton>

      <UiButton class="my-2" color="info"> Button Info </UiButton>
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Disabled state</h5>

      <UiButton class="my-2" :disabled="true" color="primary">
        Button Primary
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="outline">
        Button Outline
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="secondary">
        Button Secondary
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="dark">
        Button Dark
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="error">
        Button Error
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="success">
        Button Success
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="warning">
        Button Warning
      </UiButton>

      <UiButton class="my-2" :disabled="true" color="info">
        Button Info
      </UiButton>
      <UiButton class="my-2" :disabled="true" color="gray">
        Button gray
      </UiButton>
      <UiButton class="my-2" :disabled="true" color="text-bt">
        Button tb
      </UiButton>
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Loading state</h5>

      <UiButton class="my-2" size="sm" :loading="true" color="primary">
        Button Primary
      </UiButton>

      <UiButton class="my-2" size="md" :loading="true" color="outline">
        Button Outline
      </UiButton>

      <UiButton class="my-2" size="lg" :loading="true" color="secondary">
        Button Secondary
      </UiButton>

      <UiButton class="my-2" size="xl" :loading="true" color="dark">
        Button Dark
      </UiButton>

      <UiButton class="my-2" size="sm" :loading="true" color="error">
        Button Error
      </UiButton>

      <UiButton class="my-2" size="md" :loading="true" color="success">
        Button Success
      </UiButton>

      <UiButton class="my-2" size="lg" :loading="true" color="warning">
        Button Warning
      </UiButton>

      <UiButton class="my-2" size="xl" :loading="true" color="info">
        Button Info
      </UiButton>
      <UiButton class="my-2" size="xl" :loading="true" color="gray">
        Button gray
      </UiButton>
      <UiButton class="my-2" size="xl" :loading="true" color="text-bt">
        Button bt
      </UiButton>
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">
        Suffix / Prefix Icon
      </h5>

      <UiButton class="my-2" size="sm" suffixIcon="Flash">
        Suffix Icon
      </UiButton>

      <UiButton class="my-2" size="md" suffixIcon="Flash">
        Suffix Icon
      </UiButton>

      <UiButton class="my-2" size="lg" suffixIcon="Flash">
        Suffix Icon
      </UiButton>

      <UiButton class="my-2" size="xl" suffixIcon="Flash">
        Suffix Icon
      </UiButton>

      <UiButton class="my-2" size="sm" prefixIcon="Flash">
        Prefix Icon
      </UiButton>

      <UiButton class="my-2" size="md" prefixIcon="Flash">
        Prefix Icon
      </UiButton>

      <UiButton class="my-2" size="lg" prefixIcon="Flash">
        Prefix Icon
      </UiButton>

      <UiButton class="my-2" size="xl" prefixIcon="Flash">
        Prefix Icon
      </UiButton>
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-center font-bold">Link</h5>

      <UiLink text="XL Link" color="info" href="google.com" size="xl" />
      <UiLink text="MD Link" color="warning" size="md" />
      <UiLink text="SM Link" color="primary" size="sm" />
      <UiLink text="XS Link" color="dark" size="xs" />
      <UiLink text="LG Link" color="gray" size="lg" />
      <UiLink text="XL Link" color="error" size="xl" />
      <UiLink text="Success Link" color="success" size="xl" />
      <UiLink text="Warning Link" color="warning" size="xl" />
      <UiLink text="Gray Link" color="gray" size="xl" />
    </div>

    <div class="w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Radio</h5>
      <div class="space-y-4">
        <UiRadio
          v-for="op in options"
          :key="op.value"
          v-model="selectedRadio"
          name="myRadio"
          :value="op.value"
          :label="op.label"
          size="sm"
        />
        <UiRadio
          name="myRadio"
          value="option2"
          label="SM Radio"
          size="sm"
        />
        <UiRadio
          name="myRadio"
          value="option3"
          label="MD Radio"
          size="md"
        />
        <UiRadio
          name="myRadio"
          value="option4"
          label="LG Radio"
          size="lg"
        />
        <UiRadio
          name="myRadio"
          value="option5"
          label="Disabled Radio"
          size="md"
          :disabled="true"
        />
      </div>
    </div>

    <div class="flex flex-col w-1/4 px-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Toggle</h5>
      <UiSwitch v-model="isToggled" label="LG Toggle" size="lg" />
      <UiSwitch v-model="isToggled" label="MD Toggle" size="md" />

      <UiSwitch v-model="isToggled" label="SM Toggle" size="sm" />

      <UiSwitch
        v-model="isToggled1"
        label="Disabled Toggle"
        size="lg"
        :disabled="true"
      />
    </div>

    <div class="w-1/4 px-2 space-x-2">
      <h5 class="text-start mt-4 mb-4 text-lg font-bold">Checkbox</h5>
      <UiCheckbox v-model="isAccepted2" title="Small Size" size="sm" />
      <UiCheckbox v-model="isAccepted" title="Medium Size" size="md" />
      <UiCheckbox v-model="isAccepted3" title="Large Size" size="lg" />
      <UiCheckbox
        v-model="isAccepted1"
        title="Disabled Large Size"
        size="lg"
        :disabled="true"
      />
    </div>
  </div>
  <h3 class="text-start mt-4 mb-4 text-xl font-bold">
    toast-alert Component
  </h3>
  <div class="flex flex-row gap-2 my-4">
    <div class="flex flex-col w-1/4 gap-2">
      <UiToastSnackbarAlert
        color="primary"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi its my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="outline"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi its my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="dark"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi it my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="error"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi it my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="success"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi it my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="warning"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi it my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="info"
        size="lg"
        cancelIcon="CloseCircle"
        bodyText="hi it my message"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
    </div>
    <div class="flex flex-col w-1/4 gap-2">
      <UiToastSnackbarAlert
        color="primary"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="outline"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="dark"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="error"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="success"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="warning"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
      <UiToastSnackbarAlert
        color="info"
        size="lg"
        cancelIcon="CloseCircle"
        title="Message"
        iconSize="lg"
        prefixIcon="Flash"
        :auto_dismiss="false"
      />
    </div>
    <div class="flex flex-col w-1/4 gap-2">
      <UiToastSnackbarAlert
        color="primary"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="outline"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="dark"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="error"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="success"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="warning"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
      <UiToastSnackbarAlert
        color="info"
        size="sm"
        title="Message"
        iconSize="sm"
        prefixIcon="Flash"
        :auto_dismiss="true"
        :timer="30"
      />
    </div>
  </div>
  <h6 class="text-start mt-4 mb-4 text-xl">Tabs</h6>

  <div class="flex flex-row gap-2 my-4">
    <UiTab type="bordered" />
    <UiTab type="rounded" />
    <UiTab type="text" />
    <UiTab type="defualt" />
    <UiTab type="filled" />
  </div>
  <div>sm</div>
  <div class="flex flex-row gap-2 my-4">
    <UiTab type="bordered" size="sm" />
    <UiTab type="rounded" size="sm" />
    <UiTab type="text" size="sm" />
    <UiTab type="defualt" size="sm" />
    <UiTab type="filled" size="sm" />
  </div>
  <div>md</div>
  <div class="flex flex-row gap-2 my-4">
    <UiTab type="bordered" size="md " />
    <UiTab type="rounded" size="md" />
    <UiTab type="text" size="md" />
    <UiTab type="defualt" size="md" />
    <UiTab type="filled" size="md" />
  </div>
  <div>lg</div>
  <div class="flex flex-row gap-2 my-4">
    <UiTab type="bordered" size="lg" />
    <UiTab type="rounded" size="lg" />
    <UiTab type="text" size="lg" />
    <UiTab type="defualt" size="lg" />
    <UiTab type="filled" size="lg" />
  </div>

  <div class="felx flex-col gap-5 py-10">
    <h6 class="text-start mt-4 mb-4 text-xl">Pagination</h6>

    <UiPagination
      :currentPage="currentPage"
      :perPage="perPage"
      :total="total"
      @update:currentPage="(val) => (currentPage = val)"
      @update:perPage="(val) => (perPage = val)"
      type="defualt"
      class="mb-4"
    />
    <UiPagination
      :currentPage="currentPage"
      :perPage="perPage"
      :total="total"
      @update:currentPage="(val) => (currentPage = val)"
      @update:perPage="(val) => (perPage = val)"
      type="bordered"
    />
  </div>
  <h6 class="text-start mt-4 mb-4 text-xl">Tags</h6>

  <div class="flex gap-x-3 mb-4">
    <UiTag text="Primary" type="primary" />
    <UiTag text="Secondary" type="secondary" />
    <UiTag text="Success" type="success" />
    <UiTag text="Warning" type="warning" />
    <UiTag text="Error" type="error" />
    <UiTag text="Gray" type="gray" />
    <UiTag text="Blue" type="blue" />
    <UiTag text="Info" type="info" prefixIcon="InfoCircle" />
    <UiTag text="Closable" type="error" closeable />
    <UiTag text="Closable" type="light-purple" />
    <UiTag text="All" type="success" closeable prefixIcon="InfoCircle" />
  </div>
  <UiTable
:headers="headers1"
:rows="rows1"
v-model:filters="filters"
v-model:sort="sort"
:currentPage="1"
:perPage="5"
@row-click="(row) => console.log('row', row)"
>

<!-- Optional custom cell -->
<template #cell-action="{ row }">
  <UiTag color="primary" size="sm" text="Edit" />
</template>
</UiTable>
  <h6 class="text-start mt-4 mb-4 text-xl">File Input</h6>

  <div class="flex flex-row gap-2 my-4">
    <UiInputFile
      :chooseText="'Choose file'"
      :placeholder="'No file choosen'"
    />
    <UiInputFile
      placeholder="No file choosen"
      :icon="'InfoCircle'"
      :size="20"
    />
  </div>
  <div>
    <h6 class="text-start mt-4 mb-4 text-xl">List</h6>

    <UiList title="List" :items="list_items.map((item) => item.text)" />
  </div>
  <div class="flex flex-row gap-2 my-4">
    <button
      @click="showModal = true"
      class="px-4 py-2 bg-blue-600 text-white rounded-sm"
    >
      Open Modal1
    </button>
    <UiModal v-model="showModal" size="sm">
      <template #header> Modal Title </template>
      <template #body>
        <p>This is the modal body content.</p>
      </template>
      <template #footer>
        <UiButton color="primary" size="sm"> Button Footer sm </UiButton>
      </template>
    </UiModal>
    <button
      @click="showModal1 = true"
      class="px-4 py-2 bg-blue-600 text-white rounded-sm"
    >
      Open Modal2
    </button>
    <UiModal v-model="showModal1" size="md">
      <template #header> Modal Title </template>
      <template #body>
        <p>This is the modal body content.</p>
      </template>
      <template #footer size="md">
        <UiButton color="primary" size="md"> Button Footer md </UiButton>
      </template>
    </UiModal>
    <button
      @click="showModal2 = true"
      class="px-4 py-2 bg-blue-600 text-white rounded-sm"
    >
      Open Modal3
    </button>
    <UiModal v-model="showModal2" size="lg">
      <template #header> Modal Title </template>
      <template #body>
        <p>This is the modal body content.</p>
      </template>
      <template #footer>
        <UiButton color="primary" size="lg"> Button Footer lg </UiButton>
      </template>
    </UiModal>
    <button
      @click="showModal3 = true"
      class="px-4 py-2 bg-blue-600 text-white rounded-sm"
    >
      Open Modal4
    </button>
    <UiModal v-model="showModal3" size="xl">
      <template #header> Modal Title </template>
      <template #body>
        <p>This is the modal body content.</p>
      </template>
      <template #footer>
        <UiButton color="primary" size="xl"> Button Footer xl </UiButton>
      </template>
    </UiModal>
  </div>
  <button
    @click="showPopup = true"
    class="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Open PopUp
  </button>

  <UiModalPopUp
    v-if="showPopup"
    icon="Airdrop"
    title="Success"
    body="Body text.\nyou can type anything here"
    confirmText="Yes"
    cancelText="No"
    @confirm="showPopup = false"
    @cancel="showPopup = false"
  />
</div>
  </div>

 
  <!-- <UiButtonIcon icon="User" size="xl" color="error" class="m-4" /> -->
</template>

<script setup lang="ts">
import {
  today,
  toCalendar,
  CalendarDate,
  getLocalTimeZone,
} from '@internationalized/date'
// const todayGregorian = today(getLocalTimeZone())

// // Convert to Persian calendar
// const todayPersian = toCalendar(todayGregorian, 'persian')

// // Format Persian date for display
// const formattedPersian = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// }).format(todayPersian.toDate())
const date = ref(new Date());
const selectedDate = ref(new Date()) // default to today
const isToggled = ref(true);
const isToggled1 = ref(false);
const isAccepted2 = ref(false);
const isAccepted3 = ref(false);
const isAccepted = ref(false);
const showModal = ref(false);
const showModal1 = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const defaultValue = ref(new CalendarDate(2022, 2, 6))
const showPopup = ref(false);

const selectedOption = ref<string[]>([]);
const selectedCategory = ref<string>("");

const dropdown_options = ref<{ label: string; value: string }[]>([
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
  { label: "Option 6", value: "option6" },
  { label: "Option 7", value: "option7" },
  { label: "Option 8", value: "option8" },
  { label: "Option 9", value: "option9" },
  { label: "Option 10", value: "option10" },
]);
const selectedRadio = ref("");
const dropdown_model_1 = ref<string>("");
const dropdown_model_2 = ref<string>("");
const dropdown_model_3 = ref<string>("");
const dropdown_model_4 = ref<string>("");

const options = [
  { value: "a", label: " A" },
  { value: "b", label: " B" },
  { value: "c", label: " C" },
];
const options2 = [
  { value: "a", label: " A" },
  { value: "b", label: " B" },
  { value: "c", label: " C" },
];
const categoryOptions = [
    { label: 'Technology', value: 'tech' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' }
  ]
const currentPage = ref(1);
const perPage = ref(5);
const total = ref(100);

const headers = [
  { text: "#", type: "text", options: undefined },
  { text: "Column 1", type: "text", options: undefined },
  { text: "Column 2", type: "text", options: undefined },
  { text: "Column 3", type: "text", options: undefined },
  // ...
];
const rows = [
  { "#": 1, Color: "Silver", Category: "Laptop", Price: 2999 },
  { "#": 2, Color: "White", Category: "Laptop PC", Price: 1999 },
  // ...
];
const list_items = [
  { id: 1, text: "example1" },
  { id: 2, text: "example2" },
  { id: 3, text: "example3" },
  { id: 4, text: "example4" },
  { id: 5, text: "example5" },
  { id: 6, text: "example6" },
  { id: 7, text: "example7" },
  { id: 8, text: "example8" },
  { id: 9, text: "example9" },
  { id: 10, text: "example10" },
];
const headers1 = [
  { key: "id", text: "#", width: 60, sortable: true, filterable: false },
  { key: "name", text: "Product Name", type: "select" as const, options: ["Apple","Banana","Cherry"], sortable: true },
  { key: "color", text: "Color", type: "multiSelect" as const, options: ["Red","Blue","Green"], sortable: true },
  { key: "createdAt", text: "Created Date", type: "date" as const, sortable: true,},
  { key: "time", text: "Time", type: "time" as const, sortable: true,  },
  { key: "code", text: "Product Code", sortable: true, },
  { key: "status", text: "Status", type: "select" as const, options: ["Active","Inactive","Pending"], sortable: true },
  { key: "priority", text: "Priority", type: "datetime" as const, options: ["High","Medium","Low"], sortable: true },
  { key: "category", text: "Category", type: "select" as const, options: ["Premium","Standard","Basic"], sortable: true },
  { key: "stock", text: "Stock Status", type: "select" as const, options: ["In Stock","Low Stock","Out of Stock"], sortable: true },
  { key: "action", text: "Action", type: "action" as const, filterable: false, sortable: false, },
];

const rows1 = [
  { id: 1, name: "Apple", color: "Red", createdAt: "2024-01-15", time: "09:30", code: "PROD-001", status: "Active", priority: "High", category: "Premium", stock: "In Stock", action: "Edit" },
  { id: 2, name: "Banana", color: "Yellow", createdAt: "2024-01-16", time: "10:45", code: "PROD-002", status: "Inactive", priority: "Medium", category: "Standard", stock: "Low Stock", action: "Edit" },
  { id: 3, name: "Cherry", color: "Red", createdAt: "2024-01-17", time: "11:00", code: "PROD-003", status: "Pending", priority: "Low", category: "Basic", stock: "Out of Stock", action: "Edit" },
  { id: 4, name: "Date", color: "Green", createdAt: "2024-01-18", time: "12:15", code: "PROD-004", status: "Active", priority: "High", category: "Premium", stock: "In Stock", action: "Edit" },
  { id: 5, name: "Elderberry", color: "Purple", createdAt: "2024-01-19", time: "13:30", code: "PROD-005", status: "Inactive", priority: "Medium", category: "Standard", stock: "Low Stock", action: "Edit" },
  { id: 6, name: "Fig", color: "Brown", createdAt: "2024-01-20", time: "14:45", code: "PROD-006", status: "Pending", priority: "Low", category: "Basic", stock: "Out of Stock", action: "Edit" },
  { id: 7, name: "Grape", color: "Green", createdAt: "2024-01-21", time: "15:00", code: "PROD-007", status: "Active", priority: "High", category: "Premium", stock: "In Stock", action: "Edit" },
  { id: 8, name: "Honeydew", color: "Yellow", createdAt: "2024-01-22", time: "16:15", code: "PROD-008", status: "Inactive", priority: "Medium", category: "Standard", stock: "Low Stock", action: "Edit" },
  // ...
];
const activeTab = ref("users");

const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Brown", email: "bob@example.com", role: "User" },
];

const adminData = [
  { id: 101, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 102, name: "Mark Wilson", email: "mark@example.com", role: "Admin" },
];

const allRows = computed(() => {
  console.log(allRows.value) 
  if (activeTab.value === "users") return userData;
  if (activeTab.value === "admins") return adminData;
  return [];
});

const columns = [
  { key: "id", text: "ID", sortable: true },
  { key: "name", text: "Name", sortable: true },
  { key: "email", text: "Email" },
  { key: "role", text: "Role" },
];

const filters = ref({});
const sort = ref({ key: null, dir: 'asc' as const });
</script>
