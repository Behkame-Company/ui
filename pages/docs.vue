<template>
  <div class="container mx-auto">
    <h1 class="text-center mt-4 mb-4 text-2xl font-bold">
      Behkame Design System
    </h1>

    <!-- <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Card Components</h3>

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
    </div> -->
    <!-- 
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
    </div> -->

    <h3 class="text-start mt-4 mb-4 text-h6 font-bold">Input Components</h3>

    <div class="flex justify-start items-start">
      <div class="w-1/4 px-2">
        <h5 class="text-start mt-4 mb-4 text-xl">Diffrent sizes</h5>

        <UiInput
          class="my-4"
          name="name"
          size="sm"
          placeholder="Input size sm"
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
          prefix_icon="Flash"
          placeholder="Input with prefix icon"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :disabled="true"
          placeholder="Input with prefix icon disabled"
        />

        <UiInput
          class="my-4"
          suffix_icon="Flash"
          placeholder="Input with suffix icon"
        />

        <UiInput
          class="my-4"
          suffix_icon="Flash"
          :disabled="true"
          placeholder="Input with suffix icon disabled"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          suffix_icon="Flash"
          placeholder="Input with prefix and suffix icon"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :disabled="true"
          suffix_icon="Flash"
          placeholder="Input with prefix and suffix icon disabled"
        />
      </div>

      <div class="w-1/4 px-2">
        <h5 class="text-start mt-4 mb-4 text-xl">Prefix and Suffix callback</h5>

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :prefix_callback="() => {}"
          placeholder="Input with prefix icon"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :disabled="true"
          :prefix_callback="() => {}"
          placeholder="Input with prefix icon"
        />

        <UiInput
          class="my-4"
          suffix_icon="Flash"
          :suffix_callback="() => {}"
          placeholder="Input with suffix icon"
        />

        <UiInput
          class="my-4"
          suffix_icon="Flash"
          :disabled="true"
          :suffix_callback="() => {}"
          placeholder="Input with suffix icon"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :prefix_callback="() => {}"
          suffix_icon="Flash"
          :suffix_callback="() => {}"
          placeholder="Input with prefix and suffix icon"
        />

        <UiInput
          class="my-4"
          prefix_icon="Flash"
          :disabled="true"
          :prefix_callback="() => {}"
          suffix_icon="Flash"
          :suffix_callback="() => {}"
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

        <UiInputPinCode class="my-4 w-52" size="sm" />
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

        <UiButton class="my-2" size="sm" suffix_icon="Flash">
          Suffix Icon
        </UiButton>

        <UiButton class="my-2" size="md" suffix_icon="Flash">
          Suffix Icon
        </UiButton>

        <UiButton class="my-2" size="lg" suffix_icon="Flash">
          Suffix Icon
        </UiButton>

        <UiButton class="my-2" size="xl" suffix_icon="Flash">
          Suffix Icon
        </UiButton>

        <UiButton class="my-2" size="sm" prefix_icon="Flash">
          Prefix Icon
        </UiButton>

        <UiButton class="my-2" size="md" prefix_icon="Flash">
          Prefix Icon
        </UiButton>

        <UiButton class="my-2" size="lg" prefix_icon="Flash">
          Prefix Icon
        </UiButton>

        <UiButton class="my-2" size="xl" prefix_icon="Flash">
          Prefix Icon
        </UiButton>
      </div>

      <div class="w-1/4 px-2">
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
          <UiRadio name="myRadio" value="option2" label="SM Radio" size="sm" />
          <UiRadio name="myRadio" value="option3" label="MD Radio" size="md" />
          <UiRadio name="myRadio" value="option4" label="LG Radio" size="lg" />
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
        <UiToggle v-model="isToggled" label="LG Toggle" size="lg" />
        <UiToggle v-model="isToggled" label="MD Toggle" size="md" />

        <UiToggle v-model="isToggled" label="SM Toggle" size="sm" />

        <UiToggle
          v-model="isToggled1"
          label="Disabled Toggle"
          size="lg"
          :disabled="true"
        />
      </div>

      <div class="w-1/4 px-2 space-x-2">
        <UiCheckbox v-model="isAccepted2" title="Hello" size="md" />
        <UiCheckbox v-model="isAccepted" title="I agree" size="sm" />
        <UiCheckbox v-model="isAccepted3" title="I agree" size="lg" />
        <UiCheckbox
          v-model="isAccepted1"
          title="I agree"
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
    </div>
    <h6 class="text-start mt-4 mb-4 text-xl">Tabs</h6>
    <div>bordered/rounded/text/defualt/filled</div>

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
      <UiTag text="All" type="success" closeable />
    </div>
    <div class="p-6">
      <UiTable :headers="headers">
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="bg-white hover:bg-gray-50"
        >
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td class="px-6 py-4">{{ item.name }}</td>
          <td class="px-6 py-4">{{ item.color }}</td>
          <td class="px-6 py-4">{{ item.category }}</td>
          <td class="px-6 py-4">{{ item.price }}</td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </UiTable>
    </div>
    <div class="my-4">
      <UiInputFile
        chooseText="Choose file"
        placeholder="No file choosen"
        accept="image/*"
      />
    
    </div>
  </div>
</template>
<script setup lang="ts">
const isToggled = ref(true);
const isToggled1 = ref(false);
const isAccepted2 = ref(false);
const isAccepted3 = ref(false);
const isAccepted = ref(false);

const selectedOption = ref(false);
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
  { value: "a", title: " A" },
  { value: "b", title: " B" },
  { value: "c", title: " C" },
];
const currentPage = ref(1);
const perPage = ref(5);
const total = ref(100);

const headers = [
  { type: "number", text: "#" },
  { type: "text", text: "Name" },
  { type: "select", text: "Color", options: ["Silver", "Black", "Gold"] },
  { type: "text", text: "Category" },
  { type: "number", text: "Price" },
  { type: "action", text: "Action" },
];

const items = [
  { name: "MacBook Pro", color: "Silver", category: "Laptop", price: "$2999" },
  { name: "iPad", color: "Gold", category: "Tablet", price: "$699" },
  { name: "iMac", color: "Silver", category: "Desktop", price: "$3999" },
];
</script>
