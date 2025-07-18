# Behkame UI components 

Behkame UI is a collection of Vue components built with Nuxt 3 and Tailwind CSS. These components are designed to be simple, customizable, and easy to use in your Nuxt projects.

### Preview 

run `npm run dev` and go to `http://localhost:4321/docs` to see the components in action.

### How to use 

- install nuxt icon `npx nuxi module add icon`

- install `npm i @vueuse/core @vueuse/components`

- install tailwindcss `npm i @tailwindcss/vite`

- copy `assets/css/main.css` file in ui repository into your nuxt project

- in your `nuxt.config.ts` file, add this code:

```ts
extends: [
    [
        'github:Behkame-Company/ui',
        { 
            install: true,
        },
    ],
],

vite: {
    plugins: [
        tailwindcss(),
    ],
},
```

### Components 

- `UiCard`