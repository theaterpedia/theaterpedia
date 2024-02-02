import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

const currentDir = dirname(fileURLToPath(import.meta.url))
const isRootDir = !(currentDir.endsWith('apps/home'))

export default defineNuxtConfig({
  extends: [
    '@crearis/theme-main',
    '@crearis/data-main/',
  ],

  // related to i18n, see below, fix from pi (which issue?)
  hooks: {
    close: (nuxt) => {
      if (!nuxt.options._prepare)
        process.exit()
    },
  },

  i18n: {
    // a bit strange, but it's the only way to make it work with the current setup (yarn build fails otherwise)
    vueI18n: isRootDir ? './node_modules/@crearis/theme-main/i18n.config.ts' : '../../node_modules/@crearis/theme-main/i18n.config.ts',
  },

  nitro: {
    prerender: {
      ignore: [
        '/product/',
        '/category',
        '/cart',
        '/checkout',
        '/search',
        '/my-account',
        '/order/success',
        '/order/failed',
        '/my-account/personal-data',
        '/my-account/billing-details',
        '/my-account/shipping-details',
        '/my-account/my-orders',
        '/my-account/returns',
        '/reset-password',
        '/reset-password-success',
        '/set-new-password',
        '/login',
        '/signup',
      ],
    },
  },
  // #TODO _05 enable-full-nitro-prerender
  // #TODO _05 html-validation modules: ['nuxt-hydration', '@nuxtjs/html-validator'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
})
