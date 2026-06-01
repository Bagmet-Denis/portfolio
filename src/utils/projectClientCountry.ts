import { publicAssetUrl } from '@/utils/resolveAssetUrl'
import type { ProjectClientCountry } from '@/types/projectCard'

type LocaleCode = string | { value?: string }

interface ProjectClientCountryData {
  clientCountries: ProjectClientCountry[]
  clientCountryName: string
  clientCountryFlagUrl?: string
}

interface ClientCountryConfig {
  ru: string
  en: string
  flagPath: string | null
  flagEmoji: string
}

const clientCountryByProjectTitle: Record<string, ClientCountryConfig | ClientCountryConfig[]> = {
  Beautify: {
    ru: 'Украина',
    en: 'Ukraine',
    flagPath: 'flags/ukraine.svg',
    flagEmoji: '🇺🇦',
  },
  'ST Сервис': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Gamer Minimap Watch Watch App': {
    ru: 'Узбекистан',
    en: 'Uzbekistan',
    flagPath: 'flags/uzbekistan.svg',
    flagEmoji: '🇺🇿',
  },
  'Simple Block Ads': {
    ru: 'Сербия',
    en: 'Serbia',
    flagPath: null,
    flagEmoji: '🇷🇸',
  },
  TikTokSaver: {
    ru: 'Армения',
    en: 'Armenia',
    flagPath: null,
    flagEmoji: '🇦🇲',
  },
  'Face Yoga – Massage Exercises': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Mod Pack for Melon Playground': {
    ru: 'Беларусь',
    en: 'Belarus',
    flagPath: null,
    flagEmoji: '🇧🇾',
  },
  'Склад Меда': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Project Estimator & Cash Flow': {
    ru: 'Украина',
    en: 'Ukraine',
    flagPath: 'flags/ukraine.svg',
    flagEmoji: '🇺🇦',
  },
  Армира: {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Table Coins': {
    ru: 'Армения',
    en: 'Armenia',
    flagPath: null,
    flagEmoji: '🇦🇲',
  },
  'PowerFit - Workout Logs': {
    ru: 'США',
    en: 'United States',
    flagPath: null,
    flagEmoji: '🇺🇸',
  },
  'The Tone of Victory': {
    ru: 'Южная Корея',
    en: 'South Korea',
    flagPath: 'flags/south korea.svg',
    flagEmoji: '🇰🇷',
  },
  DMT: {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'M-Alien': {
    ru: 'США',
    en: 'United States',
    flagPath: null,
    flagEmoji: '🇺🇸',
  },
  'Главная дорога. RFID': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  Транспондер: {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Главная дорога': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Город Курорт': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Алло - Запись звонков': [
    {
      ru: 'Казахстан',
      en: 'Kazakhstan',
      flagPath: 'flags/kazakhstan.svg',
      flagEmoji: '🇰🇿',
    },
    {
      ru: 'Россия',
      en: 'Russia',
      flagPath: 'flags/russia.svg',
      flagEmoji: '🇷🇺',
    },
  ],
  Tales: {
    ru: 'Казахстан',
    en: 'Kazakhstan',
    flagPath: 'flags/kazakhstan.svg',
    flagEmoji: '🇰🇿',
  },
  ProScan: {
    ru: 'США',
    en: 'United States',
    flagPath: null,
    flagEmoji: '🇺🇸',
  },
  'Blur Photo Evolution': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Password Manager - MyPassSaver': {
    ru: 'Сербия',
    en: 'Serbia',
    flagPath: null,
    flagEmoji: '🇷🇸',
  },
  Femina: {
    ru: 'Сербия',
    en: 'Serbia',
    flagPath: null,
    flagEmoji: '🇷🇸',
  },
  'Skin - Widgets, Icons, Themes': {
    ru: 'США',
    en: 'United States',
    flagPath: null,
    flagEmoji: '🇺🇸',
  },
  'Тренировки. Блин да Гриф': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'Teleprompter Automatic': {
    ru: 'США',
    en: 'United States',
    flagPath: null,
    flagEmoji: '🇺🇸',
  },
  'ID & Passport Photos': {
    ru: 'Украина',
    en: 'Ukraine',
    flagPath: 'flags/ukraine.svg',
    flagEmoji: '🇺🇦',
  },
  'PartyDay: I Have Never': {
    ru: 'Украина',
    en: 'Ukraine',
    flagPath: 'flags/ukraine.svg',
    flagEmoji: '🇺🇦',
  },
  'Truth or Dare 2': {
    ru: 'Украина',
    en: 'Ukraine',
    flagPath: 'flags/ukraine.svg',
    flagEmoji: '🇺🇦',
  },
  'Countdown Widget Timer': {
    ru: 'Беларусь',
    en: 'Belarus',
    flagPath: null,
    flagEmoji: '🇧🇾',
  },
  'Gif Maker generator plus': {
    ru: 'Армения',
    en: 'Armenia',
    flagPath: null,
    flagEmoji: '🇦🇲',
  },
  'Truth or Dare - Super Party': {
    ru: 'Беларусь',
    en: 'Belarus',
    flagPath: null,
    flagEmoji: '🇧🇾',
  },
  'Boxing Timer Interval': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  '585Gold - золотые изделия': {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
  'ProStor.ae': {
    ru: 'ОАЭ',
    en: 'UAE',
    flagPath: 'flags/united arab emirates.svg',
    flagEmoji: '🇦🇪',
  },
  Складолог: {
    ru: 'Россия',
    en: 'Russia',
    flagPath: 'flags/russia.svg',
    flagEmoji: '🇷🇺',
  },
}

function localeCode(locale: LocaleCode): string {
  return typeof locale === 'string' ? locale : locale.value ?? 'en'
}

export function projectClientCountryForTitle(title: string, locale: LocaleCode): ProjectClientCountryData | undefined {
  const config = clientCountryByProjectTitle[title]
  if (!config) return undefined

  const language = localeCode(locale).startsWith('ru') ? 'ru' : 'en'
  const configs = Array.isArray(config) ? config : [config]
  const clientCountries = configs.map((country) => ({
    name: country[language],
    flagUrl: country.flagPath ? publicAssetUrl(country.flagPath) : undefined,
    flagEmoji: country.flagEmoji,
  }))

  return {
    clientCountries,
    clientCountryName: clientCountries.map((country) => country.name).join(' / '),
    clientCountryFlagUrl: clientCountries[0]?.flagUrl,
  }
}

export function projectClientCountriesForLocale(locale: LocaleCode): ProjectClientCountry[] {
  const language = localeCode(locale).startsWith('ru') ? 'ru' : 'en'
  const seen = new Set<string>()

  return Object.values(clientCountryByProjectTitle)
    .flatMap((config) => (Array.isArray(config) ? config : [config]))
    .reduce<ProjectClientCountry[]>((countries, country) => {
      const key = country.en
      if (seen.has(key)) return countries

      seen.add(key)
      countries.push({
        name: country[language],
        flagUrl: country.flagPath ? publicAssetUrl(country.flagPath) : undefined,
        flagEmoji: country.flagEmoji,
      })

      return countries
    }, [])
}

export function missingProjectClientCountryFlags(): string[] {
  return Object.entries(clientCountryByProjectTitle)
    .flatMap(([title, config]) => {
      const configs = Array.isArray(config) ? config : [config]
      return configs.filter((country) => !country.flagPath).map((country) => `${title} (${country.ru})`)
    })
}
