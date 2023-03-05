export const locales = [
  {
    code: 'en',
    name: 'English',
    file: 'en.json'
  },
  {
    code: 'ua',
    name: 'Ukranian',
    file: 'ua.json'
  },
  {
    code: 'ru',
    name: 'Russian',
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
    fallbackLocale: 'en'
  }
}
