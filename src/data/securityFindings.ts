/** Публичные находки, которые показываются на глобусе и в таблице. */
export interface SecurityFinding {
  /** Ключ для локализации: projects.securityHud.findings.<key>. */
  key: string
  /** Название цели (не переводится). */
  name: string
  /** Координаты офиса/юрисдикции цели для маркера на планете. */
  lon: number
  lat: number
  /** Цвет маркера и акцента строки. */
  color: string
  /** Уровень критичности для чипа в таблице. */
  severity: 'critical' | 'high' | 'medium'
  /** Смещение подписи маркера, чтобы соседние цели не перекрывались. */
  ldx: number
  ldy: number
  /** Ссылка на отчёт/публикацию, если она публичная. */
  link?: string
  /** Подпись ссылки: projects.securityHud.links.<linkLabel>. */
  linkLabel?: string
}

/**
 * Заказные проверки под NDA: названия не раскрываются.
 * Координаты нужны только для «засекреченных» маркеров на планете —
 * поправьте список под реальные работы (количество, регионы, scope).
 */
export interface SecurityPrivateEngagement {
  key: string
  lon: number
  lat: number
  /** Тип работ: projects.securityHud.privateScope.<scope>. */
  scope: 'web' | 'mobile' | 'api' | 'infra'
}

export const securityFindings: SecurityFinding[] = [
  {
    key: 'telegram',
    name: 'Telegram',
    lon: 55.27,
    lat: 25.2,
    color: '#ff5f52',
    severity: 'critical',
    ldx: -86,
    ldy: 30,
  },
  {
    key: 'qiwi',
    name: 'QIWI',
    lon: 37.62,
    lat: 55.75,
    color: '#ffb347',
    severity: 'high',
    ldx: 68,
    ldy: -52,
    link: 'https://hackerone.com/debug_denis',
    linkLabel: 'hackerone',
  },
  {
    key: 'mailru',
    name: 'Mail.ru',
    lon: 37.44,
    lat: 55.7,
    color: '#b98dff',
    severity: 'high',
    ldx: -76,
    ldy: -24,
    link: 'https://hackerone.com/debug_denis',
    linkLabel: 'hackerone',
  },
  {
    key: 'meest',
    name: 'Meest Express',
    lon: 24.03,
    lat: 49.84,
    color: '#56c8ff',
    severity: 'medium',
    ldx: -92,
    ldy: 38,
    link: 'https://codeby.net/threads/poluchaem-dostup-k-akkauntam-meest-express-moja-pervaja-najdennaja-ujazvimost.70233/',
    linkLabel: 'article',
  },
]

export const securityPrivateEngagements: SecurityPrivateEngagement[] = [
  { key: 'p1', lon: 13.4, lat: 52.52, scope: 'web' },
  { key: 'p2', lon: 28.98, lat: 41.01, scope: 'api' },
  { key: 'p3', lon: 76.89, lat: 43.24, scope: 'mobile' },
  { key: 'p4', lon: -0.13, lat: 51.51, scope: 'web' },
  { key: 'p5', lon: 44.79, lat: 41.72, scope: 'infra' },
  { key: 'p6', lon: 30.52, lat: 50.45, scope: 'web' },
]

/** Цвет «засекреченных» маркеров на планете. */
export const PRIVATE_MARKER_COLOR = '#8fa6b8'
