
import { updateAppConfig } from '#app'
import { defuFn } from 'C:/projectA/front_nuxt_백업_240103/node_modules/.pnpm/defu@6.1.2/node_modules/defu/dist/defu.mjs'

const inlineConfig = {
  "nuxt": {}
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
