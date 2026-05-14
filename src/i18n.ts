import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ru from './locales/ru'

export type AppLocale = 'ru' | 'en'

const DEFAULT_LOCALE: AppLocale = 'ru'
const STORAGE_KEY = 'locale'

function getInitialLocale(): AppLocale {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'ru' ? saved : DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    ru,
    en,
  },
})

export function saveLocale(locale: AppLocale) {
  localStorage.setItem(STORAGE_KEY, locale)
}
