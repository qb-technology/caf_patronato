// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxthub/core',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-translation-manager',
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-27',

  hub: {
    // database: true,
    // blob: true
  },
  i18n: {
    baseUrl: 'http://localhost:3000',
    restructureDir: './i18n',
    langDir: './locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        language: 'en-US',
        name: 'English',
        files: ['en-US.json'],
      },
      {
        code: 'it',
        iso: 'it-IT',
        language: 'it-IT',
        name: 'Italiano',
        files: ['it-IT.json'],
      },
      {
        code: 'de',
        iso: 'de-DE',
        language: 'de-DE',
        name: 'Deutsch',
        files: ['de-DE.json'],
      },
    ],
    defaultLocale: 'en',
    defaultDirection: 'ltr',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  'translation-manager': {
    langDir: '../i18n/locales',
  },
});
