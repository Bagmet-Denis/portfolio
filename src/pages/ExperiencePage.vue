<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { cyberSecurityProject, desktopProjects, mobileProjects } from '@/data/projects'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { t, tm, locale } = useI18n()
const router = useRouter()

interface ExperienceLink {
  label: string
  href: string
}

interface ExperienceHighlight {
  label: string
  text: string
}

interface ExperienceItem {
  company?: string
  title: string
  period: string
  duration?: string
  description?: string
  stack?: string[]
  bullets?: string[]
  achievements?: string[]
  links?: ExperienceLink[]
  highlight?: ExperienceHighlight
}

interface SkillCategory {
  key: string
  label: string
  items: string[]
}

type ExperienceTone = 'ios' | 'flutter' | 'security' | 'reverse' | 'default'

interface HighlightedTextSegment {
  text: string
  highlighted: boolean
}

const cloudSrc = publicAssetUrl('cloud.png')
const profilePhoto = publicAssetUrl('profile/about-me.png')

const experienceItems = computed(() => tm('experience.items') as ExperienceItem[])
const skillCategories = computed(() => tm('experience.skillsCard.categories') as SkillCategory[])
const stackToolCount = computed(() => new Set(skillCategories.value.flatMap((category) => category.items)).size)
const isStackExpanded = ref(false)
const expandedExperienceCards = ref<Record<string, boolean>>({})

const yearsOfExperience = computed(() => `${Math.max(new Date().getFullYear() - 2017, 1)}+`)
const mobileExperience = computed(() => `${Math.max(new Date().getFullYear() - 2019, 1)}+`)
const securityExperience = '3+'
const completedProjectsCount = computed(() => `${mobileProjects.length + desktopProjects.length + cyberSecurityProject.length}+`)
const animatedHeroValues = reactive<Record<string, number>>({
  total: 0,
  mobile: 0,
  security: 0,
  projects: 0,
})
const countAnimationFrames: number[] = []
const countAnimationTimers: number[] = []
const experienceHeroStats = computed(() => [
  {
    key: 'total',
    value: yearsOfExperience.value,
    unit: locale.value === 'ru' ? 'лет' : 'years',
    label: locale.value === 'ru' ? 'Продуктовая инженерия, релизы, архитектура' : 'Product engineering, releases, architecture',
    eyebrow: locale.value === 'ru' ? 'Инженерия' : 'Engineering',
    accent: 'bg-[#D25F3F]',
  },
  {
    key: 'mobile',
    value: mobileExperience.value,
    unit: locale.value === 'ru' ? 'лет' : 'years',
    label: locale.value === 'ru' ? 'iOS, Flutter, клиентская логика, публикации' : 'iOS, Flutter, client logic, publishing',
    eyebrow: locale.value === 'ru' ? 'Mobile' : 'Mobile',
    accent: 'bg-[#73BDA8]',
  },
  {
    key: 'security',
    value: securityExperience,
    unit: locale.value === 'ru' ? 'года' : 'years',
    label: locale.value === 'ru' ? 'Проверка клиентской логики, API и релизных рисков' : 'Client logic, API, and release risk review',
    eyebrow: 'Security',
    accent: 'bg-[#E2C96B]',
  },
  {
    key: 'projects',
    value: completedProjectsCount.value,
    unit: locale.value === 'ru' ? 'работ' : 'shipped',
    label: locale.value === 'ru' ? 'Приложения, backend, панели и интеграции' : 'Apps, backend, panels, integrations',
    eyebrow: locale.value === 'ru' ? 'Создано' : 'Shipped',
    accent: 'bg-[#C98466]',
  },
])

function statNumber(value: string): number {
  return Number.parseInt(value, 10) || 0
}

function statDisplayValue(key: string, value: string): string {
  return `${animatedHeroValues[key] || 0}${value.includes('+') ? '+' : ''}`
}

function animateHeroNumbers() {
  experienceHeroStats.value.forEach((stat, index) => {
    const target = statNumber(stat.value)
    const duration = 2700 + index * 360

    animatedHeroValues[stat.key] = 0

    const timer = window.setTimeout(() => {
      const startedAt = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(Math.max((now - startedAt) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        animatedHeroValues[stat.key] = Math.round(target * eased)

        if (progress < 1) {
          countAnimationFrames.push(requestAnimationFrame(tick))
        }
      }

      countAnimationFrames.push(requestAnimationFrame(tick))
    }, 1100 + index * 330)

    countAnimationTimers.push(timer)
  })
}

onMounted(() => {
  animateHeroNumbers()
})

onBeforeUnmount(() => {
  countAnimationFrames.forEach((frame) => cancelAnimationFrame(frame))
  countAnimationTimers.forEach((timer) => window.clearTimeout(timer))
})

const experienceHighlightPhrases: Record<string, string[]> = {
  ru: [
    'Разработал и выпустил более 30 мобильных',
    'выручкой более 1 млн ₽ в месяц',
    'реализовал full-stack решение',
    'Участвовал в запуске стартапов',
    'выпустил более 20 Flutter-приложений',
    'для рынков США, ОАЭ и России',
    'Решал сложные инженерные задачи',
    'выпустил более 8 Flutter-приложений',
    'Участвовал в полном цикле разработки',
    'Проводил исследование безопасности Android/iOS-приложений',
    'Документировал найденные уязвимости',
    'Обнаружил уязвимость в Telegram',
    'получал подтверждения и вознаграждения через HackerOne.',
    'помог найти и идентифицировать более 400 владельцев автомобилей в рамках отзывных кампаний крупных автопроизводителей.',
    'Получил сертификацию WAPT',
  ],
  en: [
    'Shipped 30+ mobile products',
    'monthly revenue above 1M RUB',
    'implemented a full-stack solution',
    'Contributed to startup launches',
    'Shipped 20+ Flutter applications',
    'for the US, UAE, and Russian markets',
    'Solved complex engineering tasks',
    'Shipped 8+ Flutter applications',
    'Worked across the full product cycle',
    'Researched Android/iOS app security',
    'Documented discovered vulnerabilities',
    'Discovered a Telegram vulnerability',
    'received confirmations and rewards through HackerOne.',
    'Helped identify 400+ vehicle owners for major automaker recall campaigns using custom OSINT tooling.',
    'Earned WAPT',
  ],
}

const technologyIconMap: Record<string, string> = {
  swift: publicAssetUrl('technologies/swift.svg'),
  swiftui: publicAssetUrl('technologies/swift.svg'),
  uikit: publicAssetUrl('technologies/swift.svg'),
  combine: publicAssetUrl('technologies/swift.svg'),
  asyncawait: publicAssetUrl('technologies/swift.svg'),
  mvvm: publicAssetUrl('technologies/swift.svg'),
  ios: publicAssetUrl('technologies/swift.svg'),
  iossdk: publicAssetUrl('technologies/swift.svg'),
  xcode: publicAssetUrl('technologies/xcode.svg'),
  flutter: publicAssetUrl('technologies/flutter.svg'),
  dart: publicAssetUrl('technologies/dart.svg'),
  android: publicAssetUrl('technologies/kotlin.svg'),
  androidsdk: publicAssetUrl('technologies/kotlin.svg'),
  androidstudio: publicAssetUrl('technologies/kotlin.svg'),
  kotlin: publicAssetUrl('technologies/kotlin.svg'),
  javascript: publicAssetUrl('technologies/js.svg'),
  typescript: publicAssetUrl('technologies/typescript.svg'),
  nodejs: publicAssetUrl('technologies/nodejs2.svg'),
  expressjs: publicAssetUrl('technologies/nodejs2.svg'),
  python: publicAssetUrl('technologies/python.svg'),
  firebase: publicAssetUrl('technologies/firebase.svg'),
  sqlite: publicAssetUrl('technologies/sqlite.svg'),
  coredata: publicAssetUrl('technologies/sqlite.svg'),
  realm: publicAssetUrl('technologies/mongodb.svg'),
  postgresql: publicAssetUrl('technologies/postgresql.svg'),
  mysql: publicAssetUrl('technologies/mysql.svg'),
  visualstudiocode: publicAssetUrl('technologies/vscode.svg'),
  vscode: publicAssetUrl('technologies/vscode.svg'),
  cursor: publicAssetUrl('technologies/vscode.svg'),
  pycharm: publicAssetUrl('technologies/pycharm.svg'),
  git: publicAssetUrl('technologies/github.svg'),
  github: publicAssetUrl('technologies/github.svg'),
  postman: publicAssetUrl('technologies/postman.svg'),
  rest: publicAssetUrl('technologies/swagger.svg'),
  restapi: publicAssetUrl('technologies/swagger.svg'),
  graphql: publicAssetUrl('technologies/graphql.svg'),
  websocket: publicAssetUrl('technologies/swagger.svg'),
  platformchannels: publicAssetUrl('technologies/flutter.svg'),
  bloc: publicAssetUrl('technologies/flutter.svg'),
  cicd: publicAssetUrl('technologies/github.svg'),
  proxyman: publicAssetUrl('technologies/postman.svg'),
  burpsuite: publicAssetUrl('technologies/postman.svg'),
  charlesproxy: publicAssetUrl('technologies/postman.svg'),
  frida: publicAssetUrl('technologies/python.svg'),
  mobilere: publicAssetUrl('technologies/python.svg'),
  dynamicanalysis: publicAssetUrl('technologies/python.svg'),
  reverseengineering: publicAssetUrl('technologies/python.svg'),
  objection: publicAssetUrl('technologies/python.svg'),
  jadx: publicAssetUrl('technologies/java.svg'),
  apktool: publicAssetUrl('technologies/java.svg'),
  ghidra: publicAssetUrl('technologies/java.svg'),
  hopper: publicAssetUrl('technologies/swift.svg'),
  mobsf: publicAssetUrl('technologies/python.svg'),
  appsec: publicAssetUrl('technologies/linux.svg'),
  mobileappsec: publicAssetUrl('technologies/linux.svg'),
  webappsec: publicAssetUrl('technologies/linux.svg'),
  ctf: publicAssetUrl('technologies/linux.svg'),
  bugbounty: publicAssetUrl('technologies/linux.svg'),
  linux: publicAssetUrl('technologies/linux.svg'),
}

function normalizeTechnologyName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function technologyIconFor(value: string): string {
  return technologyIconMap[normalizeTechnologyName(value)] ?? ''
}

function toneFromItem(item: ExperienceItem): ExperienceTone {
  const source = `${item.title} ${item.description ?? ''} ${(item.stack ?? []).join(' ')}`.toLowerCase()
  if (source.includes('flutter') || source.includes('dart')) return 'flutter'
  if (source.includes('ios') || source.includes('swift') || source.includes('swiftui')) return 'ios'
  if (source.includes('penetration') || source.includes('appsec') || source.includes('security')) return 'security'
  if (source.includes('reverse') || source.includes('frida') || source.includes('malware')) return 'reverse'
  return 'default'
}

function toneLabel(tone: ExperienceTone): string {
  switch (tone) {
    case 'ios':
      return 'iOS'
    case 'flutter':
      return 'Flutter'
    case 'security':
      return 'Security'
    case 'reverse':
      return 'Reverse'
    default:
      return 'Experience'
  }
}

function toneClasses(tone: ExperienceTone): { badge: string; accent: string; glow: string } {
  switch (tone) {
    case 'ios':
      return {
        badge: 'bg-[#dbeeff] text-[#215d8e]',
        accent: 'bg-[#7cc6ff]',
        glow: 'rgba(124,198,255,0.34)',
      }
    case 'flutter':
      return {
        badge: 'bg-[#d9f6f8] text-[#0d6e7d]',
        accent: 'bg-[#6ed8dd]',
        glow: 'rgba(110,216,221,0.34)',
      }
    case 'security':
      return {
        badge: 'bg-[#ffe1d8] text-[#8d3d2d]',
        accent: 'bg-[#ef8a63]',
        glow: 'rgba(239,138,99,0.34)',
      }
    case 'reverse':
      return {
        badge: 'bg-[#ffefc9] text-[#7d5b0d]',
        accent: 'bg-[#e4b64d]',
        glow: 'rgba(228,182,77,0.32)',
      }
    default:
      return {
        badge: 'bg-[#efe2d7] text-[#6c584d]',
        accent: 'bg-[#c69772]',
        glow: 'rgba(198,151,114,0.28)',
      }
  }
}

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

function resolvedExperienceHref(href: string): string {
  return href.startsWith('/') ? router.resolve(href).href : href
}

function toggleStackExpanded() {
  isStackExpanded.value = !isStackExpanded.value
}

function experienceCardKey(item: ExperienceItem, index: number): string {
  return `${item.title}-${item.period}-${index}`
}

function toggleExperienceCard(key: string) {
  expandedExperienceCards.value[key] = !expandedExperienceCards.value[key]
}

function isExperienceCardExpanded(key: string) {
  return Boolean(expandedExperienceCards.value[key])
}

function periodRange(value: string): { start: string; end: string } {
  const [start, ...rest] = value.split(/\s+[—–-]\s+/)
  return {
    start: start?.trim() || value,
    end: rest.join(' — ').trim() || '',
  }
}

function commitHash(item: ExperienceItem, index: number): string {
  const source = `${item.company ?? ''}${item.title}${item.period}${index}`
  let hash = 2166136261

  for (let characterIndex = 0; characterIndex < source.length; characterIndex += 1) {
    hash ^= source.charCodeAt(characterIndex)
    hash = Math.imul(hash, 16777619)
  }

  return Math.abs(hash >>> 0).toString(16).padStart(7, '0').slice(0, 7)
}

function commitPreviewLines(item: ExperienceItem): string[] {
  const source = item.achievements?.length ? item.achievements : item.bullets
  return source?.slice(0, 2) ?? []
}

function changeCount(item: ExperienceItem): number {
  return (item.bullets?.length ?? 0) + (item.achievements?.length ?? 0)
}

function animateEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.overflow = 'hidden'
  void element.offsetHeight
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

function animateAfterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

function animateLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
  element.style.overflow = 'hidden'
  void element.offsetHeight
  element.style.height = '0'
  element.style.opacity = '0'
}

function highlightedTextSegments(value: string): HighlightedTextSegment[] {
  const phrases = experienceHighlightPhrases[locale.value] ?? experienceHighlightPhrases.en
  const segments: HighlightedTextSegment[] = []
  let cursor = 0

  while (cursor < value.length) {
    let nextPhrase = ''
    let nextIndex = -1

    for (const phrase of phrases) {
      const phraseIndex = value.indexOf(phrase, cursor)
      if (phraseIndex === -1) continue

      if (nextIndex === -1 || phraseIndex < nextIndex || (phraseIndex === nextIndex && phrase.length > nextPhrase.length)) {
        nextIndex = phraseIndex
        nextPhrase = phrase
      }
    }

    if (nextIndex === -1) {
      segments.push({ text: value.slice(cursor), highlighted: false })
      break
    }

    if (nextIndex > cursor) {
      segments.push({ text: value.slice(cursor, nextIndex), highlighted: false })
    }

    segments.push({ text: nextPhrase, highlighted: true })
    cursor = nextIndex + nextPhrase.length
  }

  return segments
}
</script>

<template>
  <main class="relative overflow-hidden pb-12 sm:pb-16">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        :src="cloudSrc"
        alt=""
        class="experience-cloud-left absolute -left-16 top-8 w-44 select-none opacity-24 mix-blend-darken sm:-left-20 sm:w-56 lg:left-[3%] lg:top-12 lg:w-72"
      />
      <img
        :src="cloudSrc"
        alt=""
        class="experience-cloud-right absolute -right-12 top-[34rem] w-40 select-none opacity-20 mix-blend-darken sm:-right-16 sm:w-52 lg:right-[4%] lg:top-[24rem] lg:w-64"
      />
    </div>

    <section class="relative z-10 mx-auto max-w-[1480px] px-4 pt-4 sm:px-6 sm:pt-6 xl:px-8">
      <article class="experience-hero-card relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(72,54,37,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(72,54,37,0.08)_1px,transparent_1px)] bg-[length:28px_28px] opacity-70"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[28%] overflow-hidden opacity-80 sm:block">
          <div class="experience-corner-stripes absolute -bottom-64 -right-5 -top-64 w-[8rem] rotate-[24deg] lg:right-2 lg:w-[9.5rem]">
            <span v-for="stripe in 6" :key="stripe" :class="`experience-corner-stripe experience-corner-stripe-${stripe}`"></span>
          </div>
        </div>

        <div class="relative z-10 mx-auto w-full">
          <div class="grid items-center gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(430px,1.14fr)] lg:gap-12">
            <div class="experience-poster-main pt-1">
              <div class="experience-hero-kicker flex items-center gap-3">
                <span class="experience-hero-kicker-line h-1 w-10 bg-[#D25F3F] sm:w-14"></span>
                <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#8B5B45] sm:text-xs">
                  {{ locale === 'ru' ? 'Профессиональный журнал изменений' : 'Professional changelog' }}
                </p>
              </div>

              <div class="mt-4 max-w-[38rem]">
                <h1 class="experience-hero-title text-[2.55rem] font-black leading-[0.9] text-[#171717] sm:text-[4rem] lg:text-[4.65rem]">
                  <span class="block">Mobile Product</span>
                  <span class="experience-hero-outline block">Engineer</span>
                </h1>
                <p class="mt-5 max-w-[35rem] text-[15px] font-semibold leading-7 text-[#4f4038] sm:text-lg sm:leading-8">
                  {{ locale === 'ru'
                    ? 'Превращаю продуктовые задачи в работающие релизы: mobile, backend и security review в одной инженерной истории.'
                    : 'I turn product problems into shipped releases: mobile, backend, and security review in one engineering story.' }}
                </p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="experience-branch-pill">main</span>
                  <span class="experience-branch-pill experience-branch-pill-muted">iOS</span>
                  <span class="experience-branch-pill experience-branch-pill-muted">Flutter</span>
                  <span class="experience-branch-pill experience-branch-pill-muted">AppSec</span>
                </div>
              </div>
            </div>

            <div class="experience-review-window">
              <div class="experience-review-header">
                <div class="flex min-w-0 items-center gap-2">
                  <img :src="profilePhoto" alt="Denis Bagmet" class="experience-review-avatar" />
                  <p class="truncate text-xs text-[#b8c0cc]">
                    <strong class="text-[#f0f3f6]">denis-bagmet</strong>
                    {{ locale === 'ru' ? ' открыл pull request' : ' opened a pull request' }}
                  </p>
                </div>
                <span class="experience-review-status">{{ locale === 'ru' ? 'готов к review' : 'ready for review' }}</span>
              </div>
              <div class="experience-review-body">
                <div class="experience-review-meta">
                  <span>career/main</span>
                  <span>→</span>
                  <span>production</span>
                </div>
                <h2 class="mt-4 text-xl font-bold text-[#f0f3f6] sm:text-2xl">
                  {{ locale === 'ru' ? 'От идеи до стабильного продукта в production' : 'From idea to a stable product in production' }}
                </h2>
                <p class="mt-2 max-w-[42rem] text-sm leading-6 text-[#9da7b3]">
                  {{ locale === 'ru'
                    ? 'Беру ответственность за технический результат: проектирую решение, собираю ключевые части продукта и довожу их до работающего релиза.'
                    : 'I take ownership of the technical outcome: design the solution, build its key parts, and carry it through to a working release.' }}
                </p>
                <div class="experience-code-preview mt-5">
                  <div><span>+</span> shipped_mobile_products: 30+</div>
                  <div><span>+</span> flutter_releases: 20+</div>
                  <div><span>+</span> product_ownership: end_to_end</div>
                  <div><span>+</span> security_mindset: enabled</div>
                </div>
              </div>
              <div class="experience-review-footer">
                <span class="experience-review-check">✓</span>
                {{ locale === 'ru' ? 'Проверки пройдены · можно выпускать' : 'All checks passed · ready to merge' }}
              </div>
            </div>
          </div>

        </div>
      </article>

      <div class="experience-proof-strip">
        <div class="experience-proof-card">
          <div class="experience-rail-facts experience-proof-grid grid grid-cols-2 sm:grid-cols-4">
            <div
              v-for="(stat, index) in experienceHeroStats"
              :key="stat.key"
              class="experience-rail-fact experience-proof-ticket min-w-0"
              :style="{ '--stat-delay': `${480 + index * 420}ms` }"
            >
              <div class="experience-proof-ticket-top">
                <p>{{ stat.eyebrow }}</p>
              </div>
              <div class="mt-3 flex items-end gap-1.5">
                <p class="text-[1.65rem] font-black leading-none text-[#171717] sm:text-[2rem]">{{ statDisplayValue(stat.key, stat.value) }}</p>
                <p class="pb-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#4B3A32]/68">{{ stat.unit }}</p>
              </div>
              <div class="experience-proof-progress">
                <span :class="stat.accent"></span>
                <i></i>
              </div>
              <p class="mt-2 text-[10px] font-semibold leading-4 text-[#5f4f47] sm:text-[11px]">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-10 mx-auto max-w-[1480px] px-4 pb-2 pt-3 sm:px-6 xl:px-8">
      <div class="experience-stack-map">
        <div class="experience-stack-map-grid">
          <div class="experience-stack-intro">
            <p class="font-rubik text-xs uppercase tracking-[0.24em] text-[#9a6248]">
              {{ locale === 'ru' ? 'Рабочий стек' : 'Working stack' }}
            </p>
            <h2 class="mt-3 max-w-[26rem] text-2xl font-black leading-tight text-[#2f2521] sm:text-3xl">
              {{ locale === 'ru' ? 'Технологии как система, а не список логотипов' : 'Technology as a system, not a logo wall' }}
            </h2>
            <p class="mt-3 max-w-[30rem] text-sm leading-6 text-[#6a554a]">
              {{ locale === 'ru'
                ? 'Инструменты собраны по задачам: от клиентской разработки до анализа трафика и reverse engineering.'
                : 'Tools are organized by purpose: from client development to traffic analysis and reverse engineering.' }}
            </p>

            <div class="experience-stack-counter mt-6">
              <span class="experience-stack-counter-value">{{ stackToolCount }}</span>
              <span>{{ locale === 'ru' ? 'инструментов' : 'tools' }}</span>
              <span class="experience-stack-counter-divider"></span>
              <span class="experience-stack-counter-value">{{ skillCategories.length }}</span>
              <span>{{ locale === 'ru' ? 'модулей' : 'modules' }}</span>
            </div>

            <button
              type="button"
              class="experience-stack-toggle mt-6"
              :aria-expanded="isStackExpanded"
              @click="toggleStackExpanded"
            >
              <span>{{ isStackExpanded
                ? (locale === 'ru' ? 'Свернуть карту' : 'Collapse map')
                : (locale === 'ru' ? 'Изучить полный стек' : 'Explore full stack') }}</span>
              <span class="experience-stack-toggle-icon" :class="isStackExpanded ? 'rotate-45' : 'rotate-0'">+</span>
            </button>
          </div>

          <div class="experience-stack-modules">
            <div
              v-for="category in skillCategories"
              :key="category.key"
              class="experience-stack-module"
            >
              <div class="min-w-0">
                <h3>{{ category.label }}</h3>
                <p>{{ category.items.length }} {{ locale === 'ru' ? 'инструментов' : 'tools' }}</p>
                <div class="experience-stack-module-tools">
                  <span v-for="tool in category.items.slice(0, 3)" :key="tool" :title="tool">
                    <img
                      v-if="technologyIconFor(tool)"
                      :src="technologyIconFor(tool)"
                      :alt="tool"
                      loading="lazy"
                      decoding="async"
                    />
                    <span v-else>{{ tool.slice(0, 1) }}</span>
                  </span>
                  <span v-if="category.items.length > 3" class="experience-stack-module-more">
                    +{{ category.items.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Transition name="expand-body" @enter="animateEnter" @after-enter="animateAfterEnter" @leave="animateLeave">
          <div v-if="isStackExpanded" class="experience-stack-details overflow-hidden">
            <div
              v-for="(category, categoryIndex) in skillCategories"
              :key="category.key"
              class="stack-row"
            >
              <div class="experience-stack-detail-title">
                <span>{{ String(categoryIndex + 1).padStart(2, '0') }}</span>
                <h3>{{ category.label }}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="item in category.items" :key="item" class="experience-stack-tool">
                  <img
                    v-if="technologyIconFor(item)"
                    :src="technologyIconFor(item)"
                    :alt="item"
                    class="h-4 w-4 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <section class="relative z-10 mx-auto max-w-[1480px] px-4 py-2 sm:px-6 xl:px-8">
      <div class="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="font-rubik text-sm uppercase tracking-[0.24em] text-[#9a6248]">
            {{ locale === 'ru' ? 'История ветки' : 'Branch history' }}
          </p>
          <h2 class="mt-1 text-2xl font-semibold text-[#35241b] sm:text-3xl">
            {{ t('experience.sections.experience') }}
          </h2>
        </div>
        <div class="experience-branch-summary">
          <span class="experience-branch-dot"></span>
          <span>career/main</span>
          <span class="text-[#8b6f61]">· {{ experienceItems.length }} commits</span>
        </div>
      </div>

      <div class="experience-timeline grid gap-4">
        <article
          v-for="(item, index) in experienceItems"
          :key="experienceCardKey(item, index)"
          class="timeline-item group relative"
        >
          <div class="experience-commit-node" :class="toneClasses(toneFromItem(item)).accent"></div>

          <div class="experience-work-card relative min-w-0 overflow-hidden">
            <div class="experience-commit-header">
              <div class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <img :src="profilePhoto" alt="Denis Bagmet" class="experience-review-avatar experience-review-avatar-small" />
                <strong class="experience-commit-author text-sm">denis-bagmet</strong>
                <span class="experience-commit-action text-xs">{{ locale === 'ru' ? 'добавил опыт' : 'added experience' }}</span>
                <code class="experience-commit-hash">{{ commitHash(item, index) }}</code>
              </div>
              <span class="experience-change-count">+{{ changeCount(item) }} {{ locale === 'ru' ? 'изменений' : 'changes' }}</span>
            </div>

            <div class="relative z-10 p-4 sm:p-5">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 class="experience-work-title text-xl font-bold leading-tight sm:text-[1.45rem]">
                      {{ item.company || item.title }}
                    </h3>
                    <span
                      class="experience-role-tag"
                      :class="toneClasses(toneFromItem(item)).badge"
                    >
                      <span class="experience-role-tag-dot"></span>
                      {{ toneLabel(toneFromItem(item)) }}
                    </span>
                  </div>
                  <p v-if="item.company" class="experience-work-role mt-1 text-sm font-medium sm:text-base">
                    {{ item.title }}
                  </p>
                  <p v-if="item.description" class="experience-work-description mt-3 max-w-[850px] text-sm leading-6 sm:text-[15px]">
                    {{ item.description }}
                  </p>
                </div>

                <div class="flex flex-col items-start gap-3 sm:items-end">
                  <div class="experience-timecode">
                    <div class="flex items-center gap-2">
                      <span class="experience-timecode-start">{{ periodRange(item.period).start }}</span>
                      <span v-if="periodRange(item.period).end" class="experience-timecode-arrow"></span>
                      <span v-if="periodRange(item.period).end" class="experience-timecode-end">{{ periodRange(item.period).end }}</span>
                    </div>
                    <span v-if="item.duration" class="experience-timecode-duration">{{ item.duration }}</span>
                  </div>
                </div>
              </div>

              <div v-if="commitPreviewLines(item).length" class="experience-diff-preview mt-5">
                <div v-for="(line, lineIndex) in commitPreviewLines(item)" :key="line" class="experience-diff-line">
                  <span class="experience-diff-number">{{ lineIndex + 1 }}</span>
                  <span class="experience-diff-plus">+</span>
                  <span>
                    <template
                      v-for="(segment, segmentIndex) in highlightedTextSegments(line)"
                      :key="`${segment.text}-${segmentIndex}`"
                    >
                      <strong v-if="segment.highlighted" class="experience-key-phrase">{{ segment.text }}</strong>
                      <template v-else>{{ segment.text }}</template>
                    </template>
                  </span>
                </div>
              </div>

              <div class="mt-3 flex justify-end">
                <button
                  type="button"
                  class="experience-commit-toggle"
                  :aria-expanded="isExperienceCardExpanded(experienceCardKey(item, index))"
                  @click="toggleExperienceCard(experienceCardKey(item, index))"
                >
                  <span class="experience-commit-toggle-code">@@</span>
                  <span class="experience-commit-toggle-label">
                    {{ isExperienceCardExpanded(experienceCardKey(item, index))
                      ? (locale === 'ru' ? 'Свернуть diff' : 'Collapse diff')
                      : (locale === 'ru' ? 'Открыть полный diff' : 'Open full diff') }}
                  </span>
                  <span class="experience-commit-toggle-count">+{{ changeCount(item) }}</span>
                  <span
                    class="experience-commit-toggle-arrow"
                    :class="isExperienceCardExpanded(experienceCardKey(item, index)) ? 'rotate-180' : 'rotate-0'"
                  >
                    <svg viewBox="0 0 12 8" aria-hidden="true">
                      <path d="M1 1.25 6 6.25 11 1.25" />
                    </svg>
                  </span>
                </button>
              </div>

              <Transition name="expand-body" @enter="animateEnter" @after-enter="animateAfterEnter" @leave="animateLeave">
                <div v-if="isExperienceCardExpanded(experienceCardKey(item, index))" class="overflow-hidden">
                  <ul v-if="item.bullets?.length" class="mt-4 space-y-2.5">
                    <li v-for="bullet in item.bullets" :key="bullet" class="experience-detail-line flex gap-3 text-[15px] leading-7 lg:text-base lg:leading-8">
                      <span class="experience-detail-bullet mt-[0.8rem] text-sm font-black">+</span>
                      <span>
                        <template
                          v-for="(segment, segmentIndex) in highlightedTextSegments(bullet)"
                          :key="`${segment.text}-${segmentIndex}`"
                        >
                          <strong v-if="segment.highlighted" class="experience-key-phrase">{{ segment.text }}</strong>
                          <template v-else>{{ segment.text }}</template>
                        </template>
                      </span>
                    </li>
                  </ul>

                  <div
                    v-if="item.achievements?.length"
                    class="experience-achievement-panel mt-4 rounded-[10px] p-4"
                  >
                    <p class="experience-achievement-label text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {{ locale === 'ru' ? 'Ключевые результаты' : 'Key results' }}
                    </p>
                    <ul class="mt-3 space-y-2">
                      <li
                        v-for="achievement in item.achievements"
                        :key="achievement"
                        class="experience-detail-line flex gap-3 text-[15px] leading-7 lg:text-base lg:leading-8"
                      >
                        <span class="experience-detail-bullet mt-[0.8rem] text-sm font-black">+</span>
                        <span>
                          <template
                            v-for="(segment, segmentIndex) in highlightedTextSegments(achievement)"
                            :key="`${segment.text}-${segmentIndex}`"
                          >
                            <strong v-if="segment.highlighted" class="experience-key-phrase">{{ segment.text }}</strong>
                            <template v-else>{{ segment.text }}</template>
                          </template>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div
                    v-if="item.highlight"
                    class="experience-highlight-panel mt-4 rounded-[10px] p-4"
                  >
                    <p class="experience-highlight-label text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {{ item.highlight.label }}
                    </p>
                    <p class="experience-highlight-copy mt-2 text-[15px] leading-7 lg:text-base lg:leading-8">
                      {{ item.highlight.text }}
                    </p>
                  </div>

                  <div v-if="item.links?.length" class="mt-4 flex flex-wrap gap-3">
                    <a
                      v-for="link in item.links"
                      :key="link.href"
                      :href="resolvedExperienceHref(link.href)"
                      :target="isExternalHref(link.href) ? '_blank' : undefined"
                      :rel="isExternalHref(link.href) ? 'noopener noreferrer' : undefined"
                      class="experience-work-link group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5"
                    >
                      {{ link.label }}
                      <span v-if="isExternalHref(link.href)" class="transition group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.experience-timeline {
  position: relative;
  padding-left: 2.35rem;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  bottom: 2rem;
  left: 0.72rem;
  top: 1.5rem;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(210, 95, 63, 0.72), rgba(95, 129, 113, 0.56), rgba(226, 201, 107, 0.62));
}

.experience-branch-summary {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(67, 47, 39, 0.14);
  border-radius: 999px;
  background: rgba(255, 248, 238, 0.78);
  color: #4f4038;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 0.75rem;
}

.experience-branch-dot {
  width: 0.55rem;
  height: 0.55rem;
  border: 2px solid #fff8ee;
  border-radius: 999px;
  background: #d25f3f;
  box-shadow: 0 0 0 2px #d25f3f;
}

.stack-row {
  display: grid;
  gap: 1rem;
  border-bottom: 1px dashed rgba(67, 47, 39, 0.2);
  padding: 1rem 0;
}

.stack-row:last-child {
  border-bottom: 0;
}

.experience-stack-map {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(67, 47, 39, 0.2);
  border-radius: 22px;
  background:
    linear-gradient(rgba(95, 129, 113, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(95, 129, 113, 0.08) 1px, transparent 1px),
    #f6efdf;
  background-size: 24px 24px;
  box-shadow:
    0 18px 38px rgba(74, 54, 38, 0.09),
    inset 0 0 0 5px rgba(255, 250, 242, 0.52);
}

.experience-stack-map::before {
  content: '';
  position: absolute;
  width: 13rem;
  height: 13rem;
  right: -5rem;
  top: -6rem;
  border: 22px solid rgba(210, 95, 63, 0.12);
  border-radius: 999px;
  box-shadow:
    0 0 0 18px rgba(115, 189, 168, 0.11),
    0 0 0 36px rgba(226, 201, 107, 0.1);
}

.experience-stack-map-grid {
  position: relative;
  z-index: 1;
  display: grid;
}

.experience-stack-intro {
  padding: 1.5rem;
}

.experience-stack-counter {
  display: flex;
  width: fit-content;
  align-items: baseline;
  gap: 0.45rem;
  color: #796458;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
}

.experience-stack-counter-value {
  color: #2f2521;
  font-size: 1.4rem;
  font-weight: 900;
}

.experience-stack-counter-divider {
  width: 1px;
  height: 1.25rem;
  margin: 0 0.35rem;
  background: rgba(67, 47, 39, 0.24);
}

.experience-stack-toggle {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #2f2521;
  border-radius: 8px;
  background: #fffaf2;
  box-shadow: 6px 6px 0 #d25f3f;
  color: #2f2521;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.8rem 0.9rem;
  text-transform: uppercase;
  transition:
    box-shadow 180ms ease,
    transform 180ms ease;
}

.experience-stack-toggle:hover {
  box-shadow: 3px 3px 0 #d25f3f;
  transform: translate(3px, 3px);
}

.experience-stack-toggle-icon {
  display: grid;
  width: 1.3rem;
  height: 1.3rem;
  place-items: center;
  border-radius: 4px;
  background: #2f2521;
  color: #fffaf2;
  font-size: 1rem;
  line-height: 1;
  transition: transform 180ms ease;
}

.experience-stack-modules {
  position: relative;
  display: grid;
  border-top: 1px solid rgba(67, 47, 39, 0.18);
  background: rgba(255, 250, 242, 0.46);
}

.experience-stack-module {
  position: relative;
  display: block;
  min-height: 7.2rem;
  border-bottom: 1px solid rgba(67, 47, 39, 0.14);
  padding: 1rem;
}

.experience-stack-module:last-child {
  border-bottom: 0;
}

.experience-stack-module h3 {
  color: #352a24;
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1.25;
}

.experience-stack-module p {
  margin-top: 0.28rem;
  color: #8b7062;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.experience-stack-module-tools {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
}

.experience-stack-module-tools > span {
  display: grid;
  width: 1.85rem;
  height: 1.85rem;
  place-items: center;
  margin-left: -0.3rem;
  overflow: hidden;
  border: 2px solid #f6efdf;
  border-radius: 999px;
  background: #fffaf2;
  color: #6a554a;
  font-size: 0.62rem;
  font-weight: 900;
  box-shadow: 0 3px 8px rgba(74, 54, 38, 0.1);
}

.experience-stack-module-tools > span:first-child {
  margin-left: 0;
}

.experience-stack-module-tools img {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.experience-stack-module-tools .experience-stack-module-more {
  background: #2f2521;
  color: #fffaf2;
}

.experience-stack-details {
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(67, 47, 39, 0.2);
  background: rgba(255, 250, 242, 0.82);
  padding: 0.5rem 1.5rem 1rem;
}

.experience-stack-detail-title {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.experience-stack-detail-title span {
  color: #d25f3f;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 900;
}

.experience-stack-detail-title h3 {
  color: #352a24;
  font-size: 0.85rem;
  font-weight: 900;
}

.experience-stack-tool {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(67, 47, 39, 0.16);
  border-radius: 6px;
  background: #fffaf2;
  color: #5f4f47;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.42rem 0.6rem;
  box-shadow: 0 2px 0 rgba(95, 129, 113, 0.16);
}

.experience-hero-outline {
  color: transparent;
  -webkit-text-stroke: 2px #171717;
  text-shadow: 0.035em 0.035em 0 rgba(95, 129, 113, 0.18);
}

.experience-hero-card {
  border: 1px solid rgba(67, 47, 39, 0.2);
  border-radius: 22px;
  background-color: #f1ead8;
  box-shadow:
    0 18px 38px rgba(74, 54, 38, 0.1),
    inset 0 0 0 5px rgba(255, 250, 242, 0.4);
}

.experience-proof-strip {
  position: relative;
  z-index: 2;
  margin: 0.75rem 0 0;
}

.experience-proof-card {
  overflow: hidden;
  border: 1px solid rgba(255, 250, 242, 0.92);
  border-radius: 22px;
  background: rgba(255, 250, 242, 0.48);
  padding: 5px;
  box-shadow:
    0 12px 26px rgba(74, 54, 38, 0.08),
    0 0 0 1px rgba(67, 47, 39, 0.1);
}

.experience-proof-grid {
  overflow: hidden;
  border: 1px solid rgba(67, 47, 39, 0.12);
  border-radius: 16px;
  background:
    linear-gradient(rgba(72, 54, 37, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(72, 54, 37, 0.045) 1px, transparent 1px),
    #f7efdf;
  background-size: 20px 20px;
}

.experience-proof-ticket {
  position: relative;
  min-height: 8.5rem;
  overflow: hidden;
  border-right: 1px solid rgba(67, 47, 39, 0.11);
  border-bottom: 1px solid rgba(67, 47, 39, 0.11);
  padding: 1.35rem 1.1rem 1rem;
}

.experience-proof-ticket:nth-child(2n) {
  border-right: 0;
}

.experience-proof-ticket:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.experience-proof-ticket-top {
  display: flex;
  align-items: center;
}

.experience-proof-ticket-top p {
  color: #7b5647;
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.experience-proof-progress {
  position: relative;
  height: 4px;
  margin-top: 0.65rem;
  overflow: visible;
  border-radius: 999px;
  background: rgba(47, 37, 33, 0.12);
}

.experience-proof-progress > span {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  transform-origin: left;
  animation: experienceProofGrow 2200ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--stat-delay, 0ms) + 240ms) both;
}

.experience-proof-ticket:nth-child(2) .experience-proof-progress > span {
  width: 63%;
}

.experience-proof-ticket:nth-child(3) .experience-proof-progress > span {
  width: 48%;
}

.experience-proof-ticket:nth-child(4) .experience-proof-progress > span {
  width: 88%;
}

.experience-proof-progress i {
  position: absolute;
  left: calc(72% - 0.3rem);
  top: 50%;
  width: 0.6rem;
  height: 0.6rem;
  border: 2px solid #2f2521;
  border-radius: 999px;
  background: #fff8ee;
  opacity: 0;
  transform: translateY(-50%) scale(0.5);
  animation: experienceProofDot 500ms ease calc(var(--stat-delay, 0ms) + 2200ms) both;
}

.experience-proof-ticket:nth-child(2) .experience-proof-progress i {
  left: calc(63% - 0.3rem);
}

.experience-proof-ticket:nth-child(3) .experience-proof-progress i {
  left: calc(48% - 0.3rem);
}

.experience-proof-ticket:nth-child(4) .experience-proof-progress i {
  left: calc(88% - 0.3rem);
}

.experience-hero-outline-tight {
  -webkit-text-stroke-width: 1.5px;
}

.experience-hero-kicker {
  animation: experienceFadeRise 1560ms ease both;
}

.experience-hero-kicker-line {
  transform-origin: left;
  animation: experienceLineGrow 2280ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.experience-hero-title {
  animation: experienceFadeRise 1860ms ease 360ms both;
}

.experience-branch-pill {
  display: inline-flex;
  align-items: center;
  border: 1px solid #171717;
  border-radius: 999px;
  background: #171717;
  color: #f1ead8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.4rem 0.7rem;
}

.experience-branch-pill::before {
  content: '⌘';
  margin-right: 0.35rem;
  color: #73bda8;
}

.experience-branch-pill-muted {
  border-color: rgba(47, 37, 33, 0.18);
  background: rgba(255, 248, 238, 0.65);
  color: #4f4038;
}

.experience-review-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  box-shadow:
    14px 14px 0 rgba(36, 24, 19, 0.16),
    0 24px 50px rgba(36, 24, 19, 0.2);
  animation: experienceFadeRise 1400ms ease 520ms both;
}

.experience-review-header,
.experience-review-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #30363d;
  background: #161b22;
  padding: 0.75rem 0.9rem;
}

.experience-review-footer {
  justify-content: flex-start;
  border-top: 1px solid #30363d;
  border-bottom: 0;
  color: #8b949e;
  font-size: 0.72rem;
  font-weight: 700;
}

.experience-review-avatar {
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  object-fit: cover;
  object-position: center 20%;
}

.experience-review-avatar-small {
  width: 1.65rem;
  height: 1.65rem;
  font-size: 0.55rem;
}

.experience-review-status {
  flex: 0 0 auto;
  border: 1px solid #238636;
  border-radius: 999px;
  color: #7ee787;
  font-size: 0.62rem;
  font-weight: 800;
  padding: 0.3rem 0.55rem;
  text-transform: uppercase;
}

.experience-review-body {
  padding: 1.1rem;
}

.experience-review-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  color: #79c0ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
}

.experience-code-preview {
  overflow: hidden;
  border: 1px solid #2c5938;
  border-radius: 8px;
  background: #13231a;
  color: #c5d1c8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  line-height: 1.8;
}

.experience-code-preview div {
  border-bottom: 1px solid rgba(46, 96, 58, 0.42);
  padding: 0.25rem 0.8rem;
}

.experience-code-preview div:last-child {
  border-bottom: 0;
}

.experience-code-preview span,
.experience-review-check {
  color: #3fb950;
  font-weight: 900;
}

.experience-corner-stripes {
  transform-origin: center;
}

.experience-corner-stripe {
  position: absolute;
  bottom: 0;
  top: 0;
  animation: experienceStripeDrop 2100ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-origin: top;
}

.experience-corner-stripe-1 {
  left: 0;
  width: 15%;
  background: #6f5643;
  animation-delay: 260ms;
}

.experience-corner-stripe-2 {
  left: 15%;
  width: 15%;
  background: #73bda8;
  animation-delay: 560ms;
}

.experience-corner-stripe-3 {
  left: 30%;
  width: 15%;
  background: #5f8171;
  animation-delay: 860ms;
}

.experience-corner-stripe-4 {
  left: 45%;
  width: 15%;
  background: #d25f3f;
  animation-delay: 1160ms;
}

.experience-corner-stripe-5 {
  left: 60%;
  width: 15%;
  background: #c98466;
  animation-delay: 1460ms;
}

.experience-corner-stripe-6 {
  left: 75%;
  width: 25%;
  background: #e2c96b;
  animation-delay: 1760ms;
}

.experience-toggle-button {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid rgba(23, 23, 23, 0.88);
  border-radius: 8px;
  background: #171717;
  box-shadow: 0 8px 0 rgba(95, 129, 113, 0.18);
  color: #f1ead8;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  line-height: 1;
  padding: 0.72rem 0.9rem;
  text-transform: uppercase;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.experience-toggle-button:hover {
  border-color: #171717;
  background: #2f2521;
  box-shadow: 0 8px 0 rgba(210, 95, 63, 0.2);
  color: #fff8ee;
  transform: translateY(-2px);
}

.experience-toggle-button:focus-visible {
  outline: 2px solid #d25f3f;
  outline-offset: 3px;
}

.experience-toggle-icon {
  display: grid;
  width: 1.35rem;
  height: 1.35rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: 6px;
  background: #f1ead8;
  color: #171717;
  font-size: 1rem;
  line-height: 1;
  transition: transform 180ms ease;
}

.experience-poster-main,
.experience-rail-fact {
  position: relative;
}

.experience-rail-fact {
  padding-top: 0.15rem;
  animation: experienceFadeRise 1560ms ease var(--stat-delay, 0ms) both;
}

.experience-rail-line {
  position: relative;
  height: 2px;
  margin-top: 0.55rem;
  width: 100%;
  transform-origin: left;
  animation: experienceLineGrow 2520ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--stat-delay, 0ms) + 360ms) both;
}

.experience-rail-line::before {
  content: '';
  position: absolute;
  inset: -0.35rem 0;
  background: repeating-linear-gradient(90deg, rgba(47, 37, 33, 0.18) 0 1px, transparent 1px 11px);
  opacity: 0.45;
}

.experience-rail-line span {
  position: absolute;
  right: 0;
  top: 50%;
  height: 0.55rem;
  width: 0.55rem;
  border: 2px solid #171717;
  background: #f1ead8;
  opacity: 0;
  transform: translateY(-50%) rotate(45deg);
  animation: experienceDotPop 960ms ease calc(var(--stat-delay, 0ms) + 2340ms) both;
}

.experience-work-card {
  border: 1px solid #444c56;
  border-radius: 14px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    #22272e;
  background-size: 24px 24px;
  box-shadow:
    0 14px 30px rgba(41, 29, 24, 0.13),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.timeline-item:hover .experience-work-card {
  border-color: #6e7681;
  box-shadow: 0 20px 40px rgba(41, 29, 24, 0.2);
  transform: translateY(-2px);
}

.experience-commit-node {
  position: absolute;
  left: -2.08rem;
  top: 1.35rem;
  z-index: 2;
  width: 0.9rem;
  height: 0.9rem;
  border: 3px solid #fff8ee;
  border-radius: 999px;
  box-shadow: 0 0 0 1px rgba(47, 37, 33, 0.75);
}

.experience-commit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid #444c56;
  background: #2d333b;
  padding: 0.65rem 0.9rem;
}

.experience-commit-author,
.experience-work-title {
  color: #f0f3f6;
}

.experience-commit-action,
.experience-work-role {
  color: #a7b0ba;
}

.experience-work-description {
  color: #c5ccd3;
}

.experience-commit-hash {
  border-radius: 5px;
  border: 1px solid #444c56;
  background: #22272e;
  color: #adbac7;
  font-size: 0.68rem;
  padding: 0.2rem 0.4rem;
}

.experience-change-count {
  flex: 0 0 auto;
  color: #6bc46d;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 800;
}

.experience-role-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  border: 1px solid currentColor;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 1;
  padding: 0.36rem 0.5rem;
  text-transform: uppercase;
}

.experience-role-tag-dot {
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 1px;
  background: currentColor;
  transform: rotate(45deg);
}

.experience-diff-preview {
  overflow: hidden;
  border: 1px solid #347d39;
  border-radius: 8px;
  background: #1b2a20;
}

.experience-diff-line {
  display: grid;
  grid-template-columns: 2rem 1.1rem minmax(0, 1fr);
  border-bottom: 1px solid rgba(70, 149, 74, 0.22);
  color: #c7d1c9;
  font-size: 0.8rem;
  line-height: 1.55;
  padding: 0.45rem 0.75rem 0.45rem 0;
}

.experience-diff-line:last-child {
  border-bottom: 0;
}

.experience-diff-number {
  color: #768b79;
  text-align: center;
}

.experience-diff-plus {
  color: #57ab5a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 900;
}

.experience-key-phrase {
  color: #7ee787;
  font-weight: 850;
  box-shadow: inset 0 -0.3em rgba(46, 160, 67, 0.2);
}

.experience-commit-toggle {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.6rem;
  min-width: min(100%, 18rem);
  border: 1px solid #b8c0c8;
  border-radius: 9px;
  background: #f0f3f6;
  box-shadow:
    inset 3px 0 0 #2da44e,
    0 4px 0 rgba(13, 17, 23, 0.22);
  color: #24292f;
  font-size: 0.72rem;
  padding: 0.54rem 0.62rem;
  text-align: left;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.experience-commit-toggle:hover {
  border-color: #8c959f;
  background: #ffffff;
  box-shadow:
    inset 3px 0 0 #2da44e,
    0 6px 0 rgba(13, 17, 23, 0.2);
  transform: translateY(-2px);
}

.experience-commit-toggle-code {
  display: grid;
  min-width: 2rem;
  height: 1.55rem;
  place-items: center;
  border: 1px solid #b8c0c8;
  border-radius: 5px;
  background: #eaeef2;
  color: #57606a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.66rem;
  font-weight: 900;
}

.experience-commit-toggle-label {
  font-weight: 900;
  letter-spacing: 0.035em;
}

.experience-commit-toggle-count {
  color: #1a7f37;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.66rem;
  font-weight: 900;
}

.experience-commit-toggle-arrow {
  display: grid;
  width: 1rem;
  height: 1rem;
  place-items: center;
  color: #57606a;
  transition: transform 180ms ease;
}

.experience-commit-toggle-arrow svg {
  display: block;
  width: 0.7rem;
  height: 0.45rem;
  overflow: visible;
}

.experience-commit-toggle-arrow path {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.75;
}

.experience-detail-line {
  color: #c5ccd3;
}

.experience-detail-bullet,
.experience-achievement-label {
  color: #6bc46d;
}

.experience-achievement-panel {
  border: 1px solid #347d39;
  background: #1b2a20;
}

.experience-highlight-panel {
  border: 1px solid #8c7424;
  background: #332d18;
}

.experience-highlight-label {
  color: #d4a72c;
}

.experience-highlight-copy {
  color: #e4d4a2;
}

.experience-work-link {
  border: 1px solid #539bf5;
  background: #1c2d41;
  color: #96d0ff;
}

.experience-work-link:hover {
  border-color: #6cb6ff;
  background: #223a55;
}

.experience-timecode {
  color: #9da7b3;
  min-width: min(100%, 14rem);
  padding-top: 0.15rem;
}

.experience-timecode-start,
.experience-timecode-end {
  color: #f0f3f6;
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.15;
}

.experience-timecode-end {
  color: #c5ccd3;
}

.experience-timecode-arrow {
  position: relative;
  display: inline-block;
  height: 2px;
  min-width: 2.35rem;
  background: #d25f3f;
}

.experience-timecode-arrow::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  height: 0.45rem;
  width: 0.45rem;
  border-right: 2px solid #d25f3f;
  border-top: 2px solid #d25f3f;
  transform: translateY(-50%) rotate(45deg);
}

.experience-timecode-duration {
  display: block;
  margin-top: 0.55rem;
  color: #8b949e;
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
}

.expand-body-enter-active,
.expand-body-leave-active {
  transition: height 0.28s ease, opacity 0.22s ease;
}

.experience-cloud-left {
  animation: cloudDriftLeft 15s ease-in-out infinite;
}

.experience-cloud-right {
  animation: cloudDriftRight 18s ease-in-out infinite;
}

@keyframes cloudDriftLeft {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-6deg);
  }
  50% {
    transform: translate3d(22px, 12px, 0) rotate(-2deg);
  }
}

@keyframes cloudDriftRight {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(6deg);
  }
  50% {
    transform: translate3d(-20px, 10px, 0) rotate(2deg);
  }
}

@keyframes experienceFadeRise {
  from {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes experienceLineGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes experienceDotPop {
  from {
    opacity: 0;
    transform: translateY(-50%) rotate(45deg) scale(0.55);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) rotate(45deg) scale(1);
  }
}

@keyframes experienceStripesArrive {
  from {
    opacity: 0;
    transform: translate3d(4rem, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes experienceStripeDrop {
  from {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

@keyframes experienceProofGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes experienceProofDot {
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

@media (min-width: 768px) {
  .experience-proof-ticket {
    border-bottom: 0;
  }

  .experience-proof-ticket:nth-child(2n) {
    border-right: 1px solid rgba(67, 47, 39, 0.15);
  }

  .experience-proof-ticket:last-child {
    border-right: 0;
  }

  .experience-stack-map-grid {
    grid-template-columns: minmax(19rem, 0.72fr) minmax(0, 1.28fr);
  }

  .experience-stack-intro {
    border-right: 1px solid rgba(67, 47, 39, 0.2);
    padding: 2rem;
  }

  .experience-stack-modules {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 0;
  }

  .experience-stack-module {
    border-right: 1px solid rgba(67, 47, 39, 0.14);
  }

  .experience-stack-module:nth-child(2n) {
    border-right: 0;
  }

  .stack-row {
    grid-template-columns: minmax(13rem, 0.38fr) minmax(0, 1fr);
    align-items: start;
  }

  .experience-stack-details {
    padding: 0.75rem 2rem 1.25rem;
  }
}

@media (min-width: 1280px) {
  .experience-stack-map-grid {
    grid-template-columns: minmax(23rem, 0.68fr) minmax(0, 1.32fr);
  }

  .experience-stack-modules {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .experience-stack-module:nth-child(2n) {
    border-right: 1px solid rgba(67, 47, 39, 0.14);
  }

  .experience-stack-module:nth-child(3n) {
    border-right: 0;
  }
}

@media (max-width: 639px) {
  .experience-timeline {
    padding-left: 1.75rem;
  }

  .experience-timeline::before {
    left: 0.72rem;
  }

  .experience-commit-node {
    left: -1.48rem;
    width: 0.8rem;
    height: 0.8rem;
    border-width: 2px;
  }

  .experience-commit-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .experience-review-status {
    display: none;
  }

  .experience-diff-line {
    grid-template-columns: 1.55rem 0.9rem minmax(0, 1fr);
    font-size: 0.72rem;
  }

  .experience-timecode {
    min-width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience-hero-kicker,
  .experience-hero-kicker-line,
  .experience-hero-title,
  .experience-corner-stripes,
  .experience-corner-stripe,
  .experience-rail-fact,
  .experience-rail-line,
  .experience-rail-line span,
  .experience-proof-progress > span,
  .experience-proof-progress i {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

</style>
