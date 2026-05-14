export type ProjectDescriptionVariant = 'default' | 'listing'

const projectDescriptionKeys: Record<string, string> = {
  'Clone (Trezor Suite)': 'projects.descriptions.trezorSuite',
  Berry: 'projects.descriptions.berry',
  AV_Protection: 'projects.descriptions.avProtection',
  'Gif Maker generator plus': 'projects.descriptions.gifMaker',
  'Складолог': 'projects.descriptions.storekeeper',
  'Countdown Widget Timer': 'projects.descriptions.countdownWidget',
  'Boxing Timer Interval': 'projects.descriptions.boxingTimer',
  'Teleprompter Automatic': 'projects.descriptions.teleprompterAutomatic',
  'PartyDay: I Have Never': 'projects.descriptions.partyDay',
  'Truth or Dare - Super Party': 'projects.descriptions.truthOrDare',
  'Truth or Dare 2': 'projects.descriptions.truthOrDare2',
  'Password Manager - MyPassSaver': 'projects.descriptions.passwordManager',
  'PowerFit - Workout Logs': 'projects.descriptions.powerFit',
  'Армира': 'projects.descriptions.armira',
  'Table Coins': 'projects.descriptions.tableCoins',
  'Blur Photo Evolution': 'projects.descriptions.blurPhoto',
  'ProStor.ae': 'projects.descriptions.prostor',
  'Skin - Widgets, Icons, Themes': 'projects.descriptions.skin',
  'Я Никогда Не для взрослых игр': 'projects.descriptions.iHaveNeverAdult',
  '585Gold - золотые изделия': 'projects.descriptions.gold585',
  'Склад Меда': 'projects.descriptions.honeyWarehouse',
  'Project Estimator & Cash Flow': 'projects.descriptions.projectEstimator',
  'Mod Pack for Melon Playground': 'projects.descriptions.modPack',
  'ID & Passport Photos': 'projects.descriptions.passportPhotos',
  'Face Yoga – Massage Exercises': 'projects.descriptions.faceYoga',
  Femina: 'projects.descriptions.femina',
  'Алло - Запись звонков': 'projects.descriptions.allo',
  ProScan: 'projects.descriptions.proScan',
  TikTokSaver: 'projects.descriptions.tiktokSaver',
  'Simple Block Ads': 'projects.descriptions.simpleBlock',
  DMT: 'projects.descriptions.dmt',
  Tales: 'projects.descriptions.tales',
  'Gamer Minimap Watch Watch App': 'projects.descriptions.gamerMinimap',
  'ST Сервис': 'projects.descriptions.stService',
  'Город Курорт': 'projects.descriptions.gorodKurort',
  'The Tone of Victory': 'projects.descriptions.toneOfVictory',
  'Тренировки. Блин да Гриф': 'projects.descriptions.plates',
  Beautify: 'projects.descriptions.beautify',
  'Кража учетных данных браузеров c помощью Raspberry Pi Zero W': 'projects.descriptions.browserCredentials',
  'Получаем доступ к аккаунтам Meest Express': 'projects.descriptions.meestExpress',
  'Определяем кто дома с помощью ESP8266': 'projects.descriptions.whosHome',
  'Детектор деаутентификации (диссоциации) клиентов.': 'projects.descriptions.deauthDetector',
  'Пишем свой сигнатурный антивирус на C# (YARA)': 'projects.descriptions.yaraAntivirus',
  'Пишем RMS-Троян (Hellion)': 'projects.descriptions.hellion',
  'Закрытый OSINT-инструмент для поиска цифрового следа': 'projects.descriptions.closedOsintTool',
}

const projectDescriptionVariantKeys: Partial<Record<ProjectDescriptionVariant, Record<string, string>>> = {
  listing: {
    'The Tone of Victory': 'projects.descriptions.toneOfVictoryListing',
  },
}

export function getProjectDescription(
  t: (key: string) => string,
  title: string,
  fallback = '',
  variant: ProjectDescriptionVariant = 'default',
) {
  const key = projectDescriptionVariantKeys[variant]?.[title] ?? projectDescriptionKeys[title]
  if (!key) return fallback

  const translated = t(key)
  return translated === key ? fallback : translated
}
