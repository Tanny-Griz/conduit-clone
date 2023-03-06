export const locales = [
  {
    code: 'en',
    name: 'En',
    file: 'en.json'
  },
  {
    code: 'ua',
    name: 'Ua',
    file: 'ua.json'
  },
  {
    code: 'ru',
    name: 'Ru',
    file: 'ru.json'
  }
]

export const I18N = {
  locales,
  defaultLocale: 'en',
  lazy: true,
  langDir: 'modules/i18n/locales/',
  strategy: 'no_prefix',
  detectBrowserLanguage: {
    useCookie: true
  },
  vueI18n: {
    fallbackLocale: ['en', 'ua', 'ru']
  }
}
