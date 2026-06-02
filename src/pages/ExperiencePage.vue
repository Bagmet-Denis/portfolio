<script setup lang="ts">
import { computed, ref } from 'vue'
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

interface ExpandedLabels {
  show: string
  hide: string
}

type ExperienceTone = 'ios' | 'flutter' | 'security' | 'reverse' | 'default'

interface HighlightedTextSegment {
  text: string
  highlighted: boolean
}

const cloudSrc = publicAssetUrl('cloud.png')
const paperOverlay = publicAssetUrl('paper_overlay.png')

const experienceItems = computed(() => tm('experience.items') as ExperienceItem[])
const skillCategories = computed(() => tm('experience.skillsCard.categories') as SkillCategory[])
const stackExpandedLabels = computed(() => tm('experience.skillsCard.expanded') as ExpandedLabels)
const isStackExpanded = ref(false)
const expandedExperienceCards = ref<Record<string, boolean>>({})

const yearsOfExperience = computed(() => `${Math.max(new Date().getFullYear() - 2017, 1)}+`)
const mobileExperience = computed(() => `${Math.max(new Date().getFullYear() - 2019, 1)}+`)
const securityExperience = '3+'
const completedProjectsCount = computed(() => `${mobileProjects.length + desktopProjects.length + cyberSecurityProject.length}+`)
const experienceHeroStats = computed(() => [
  {
    key: 'total',
    value: yearsOfExperience.value,
    unit: locale.value === 'ru' ? 'лет' : 'years',
    label: locale.value === 'ru' ? 'Коммерческая разработка с 2017 года' : 'Commercial development since 2017',
    eyebrow: locale.value === 'ru' ? 'Общий опыт' : 'Total experience',
    accent: 'bg-[#D25F3F]',
  },
  {
    key: 'mobile',
    value: mobileExperience.value,
    unit: locale.value === 'ru' ? 'лет' : 'years',
    label: locale.value === 'ru' ? 'iOS, Flutter, релизы и рост продуктов' : 'iOS, Flutter, releases, and product growth',
    eyebrow: locale.value === 'ru' ? 'Mobile dev' : 'Mobile dev',
    accent: 'bg-[#73BDA8]',
  },
  {
    key: 'security',
    value: securityExperience,
    unit: locale.value === 'ru' ? 'года' : 'years',
    label: locale.value === 'ru' ? 'Mobile AppSec, reverse engineering, bug bounty' : 'Mobile AppSec, reverse engineering, bug bounty',
    eyebrow: 'AppSec / Reverse',
    accent: 'bg-[#E2C96B]',
  },
  {
    key: 'projects',
    value: completedProjectsCount.value,
    unit: locale.value === 'ru' ? 'работ' : 'shipped',
    label: locale.value === 'ru' ? 'Мобильные приложения, backend и web-панели' : 'Mobile apps, backend, and web panels',
    eyebrow: locale.value === 'ru' ? 'Сделано проектов' : 'Projects shipped',
    accent: 'bg-[#C98466]',
  },
])

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

    <section class="relative z-10 w-full pt-0">
      <article
        class="experience-hero-card relative min-h-[520px] overflow-hidden border-y border-black/10 bg-[#f1ead8] px-4 py-8 shadow-[0_18px_42px_rgba(74,54,38,0.12)] sm:min-h-[560px] sm:px-7 sm:py-10 lg:min-h-[610px] lg:px-10 lg:py-12"
      >
        <div class="pointer-events-none absolute inset-0 opacity-75 mix-blend-multiply">
          <img :src="paperOverlay" alt="" class="h-full w-full object-cover" />
        </div>
        <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(72,54,37,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(72,54,37,0.08)_1px,transparent_1px)] bg-[length:28px_28px] opacity-70"></div>
        <div class="pointer-events-none absolute -right-24 top-[-7rem] hidden h-[46rem] w-5 rotate-[24deg] bg-[#D96138] opacity-90 shadow-[-24px_0_0_#E2C96B,-48px_0_0_#C98466,-72px_0_0_#AC3F2B,-96px_0_0_#006C7C,-120px_0_0_#5F8171] sm:block lg:right-[14%]"></div>
        <div class="pointer-events-none absolute right-[10%] top-0 hidden h-full w-px bg-black/10 lg:block"></div>
        <div class="pointer-events-none absolute right-[18%] top-0 hidden h-full w-px bg-black/8 lg:block"></div>

        <div class="relative z-10 mx-auto flex min-h-[468px] w-full max-w-[1580px] flex-col justify-center sm:min-h-[500px] lg:min-h-[540px]">
          <div class="max-w-[920px]">
            <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#8B5B45] sm:text-xs">
              {{ locale === 'ru' ? 'Опыт с 2017 года' : 'Experience since 2017' }}
            </p>

            <h1 class="mt-4 max-w-[860px] text-[2.75rem] font-black leading-[0.86] text-[#171717] sm:text-[4.95rem] lg:text-[6.35rem]">
              <span class="block">{{ locale === 'ru' ? 'Mobile Product' : 'Mobile Product' }}</span>
              <span class="block">{{ locale === 'ru' ? 'Engineer' : 'Engineer' }}</span>
            </h1>

            <p class="mt-5 max-w-[43rem] text-[16px] font-semibold leading-7 text-[#3B302A] sm:mt-6 sm:text-xl sm:leading-9">
              {{ locale === 'ru' ? 'Делаю мобильные продукты на iOS и Flutter: от релиза и роста приложения до сложной интеграции, backend-связок и Mobile AppSec.' : 'I build mobile products with iOS and Flutter: from releases and growth to complex integrations, backend-connected flows, and Mobile AppSec.' }}
            </p>

            <div class="mt-6 flex flex-wrap gap-2.5">
              <span class="-rotate-1 bg-[#5F8171] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#FFFDF8] shadow-[0_8px_16px_rgba(95,129,113,0.16)]">iOS</span>
              <span class="rotate-1 bg-[#D96138] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#FFFDF8] shadow-[0_8px_16px_rgba(217,97,56,0.16)]">Flutter</span>
              <span class="-rotate-1 bg-[#006C7C] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#FFFDF8] shadow-[0_8px_16px_rgba(0,108,124,0.14)]">Mobile AppSec</span>
              <span class="rotate-1 bg-[#E2C96B] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3E3529] shadow-[0_8px_16px_rgba(226,201,107,0.18)]">Product delivery</span>
            </div>
          </div>

          <div class="mt-9 max-w-[960px] bg-[#171717] px-4 py-4 text-[#f1ead8] shadow-[10px_10px_0_rgba(95,129,113,0.22)] sm:px-5 lg:mt-10 lg:px-6">
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div v-for="stat in experienceHeroStats" :key="stat.key" class="min-w-0 sm:border-l sm:border-[#f1ead8]/18 sm:pl-3 sm:first:border-l-0 sm:first:pl-0">
                <p class="text-[10px] font-black uppercase tracking-[0.16em] text-[#E2C96B]">
                  {{ stat.eyebrow }}
                </p>
                <div class="mt-2 flex items-end gap-1.5">
                  <p class="text-[2.25rem] font-black leading-none text-[#f1ead8] sm:text-[2.55rem]">{{ stat.value }}</p>
                  <p class="pb-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#f1ead8]/62">{{ stat.unit }}</p>
                </div>
                <span class="mt-2 block h-1 w-12" :class="stat.accent"></span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="relative z-10 mx-auto max-w-[1280px] px-4 py-5 sm:px-6 xl:px-8">
      <div class="rounded-[24px] border border-[#432f27]/12 bg-[#fff8ee]/82 p-4 shadow-[0_14px_34px_rgba(98,63,38,0.07)] sm:p-5">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="font-rubik text-sm uppercase tracking-[0.24em] text-[#9a6248]">
                {{ locale === 'ru' ? 'Рабочий стек' : 'Working stack' }}
              </p>
              <h2 class="mt-1 text-2xl font-semibold text-[#35241b]">
                {{ locale === 'ru' ? 'Инструменты сгруппированы по смыслу' : 'Tools grouped by purpose' }}
              </h2>
            </div>
            <button
              type="button"
              class="inline-flex w-fit items-center gap-2 rounded-full border border-[#b0464a]/18 bg-[#fffaf2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8d4934] shadow-[0_10px_22px_rgba(98,63,38,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#b0464a]/30 hover:bg-white"
              :aria-expanded="isStackExpanded"
              @click="toggleStackExpanded"
            >
              {{ isStackExpanded ? stackExpandedLabels.hide : stackExpandedLabels.show }}
              <span
                class="text-base leading-none transition duration-200"
                :class="isStackExpanded ? 'rotate-45' : 'rotate-0'"
                aria-hidden="true"
              >
                +
              </span>
            </button>
          </div>

          <Transition name="expand-body" @enter="animateEnter" @after-enter="animateAfterEnter" @leave="animateLeave">
            <div v-if="isStackExpanded" class="flex flex-col gap-2 overflow-hidden">
              <div
                v-for="category in skillCategories"
                :key="category.key"
                class="stack-row flex flex-col gap-3 rounded-[16px] border border-[#e0cab6] bg-[#fffaf2]/84 p-3 sm:flex-row sm:items-center"
              >
                <h3 class="w-full shrink-0 text-sm font-semibold text-[#3f2a21] sm:w-[15rem]">
                  {{ category.label }}
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="item in category.items"
                    :key="item"
                    class="inline-flex items-center gap-1.5 rounded-full bg-[#efe0d0] px-2.5 py-1 text-xs font-medium text-[#6c5448]"
                  >
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
      </div>
    </section>

    <section class="relative z-10 mx-auto max-w-[1280px] px-4 py-2 sm:px-6 xl:px-8">
      <div class="mb-5 flex flex-col gap-2">
        <p class="font-rubik text-sm uppercase tracking-[0.24em] text-[#9a6248]">
          {{ locale === 'ru' ? 'Career path' : 'Career path' }}
        </p>
        <h2 class="text-2xl font-semibold text-[#35241b] sm:text-3xl">
          {{ t('experience.sections.experience') }}
        </h2>
      </div>

      <div class="experience-timeline">
        <article
          v-for="(item, index) in experienceItems"
          :key="experienceCardKey(item, index)"
          class="timeline-item group relative flex gap-4 pb-5 last:pb-0 sm:gap-6"
        >
          <div class="relative flex w-10 shrink-0 justify-center sm:w-14">
            <span
              class="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fbf3e7] text-sm font-semibold text-[#35241b] shadow-[0_10px_22px_rgba(98,63,38,0.12)]"
              :class="toneClasses(toneFromItem(item)).accent"
            >
              {{ index + 1 }}
            </span>
          </div>

          <div
            class="relative min-w-0 flex-1 overflow-hidden rounded-[20px] border border-black/10 bg-[#fbf3e7] p-4 shadow-[0_14px_34px_rgba(98,63,38,0.08)] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_42px_rgba(98,63,38,0.12)] sm:p-5"
          >
            <div
              class="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-100"
              :style="{ backgroundColor: toneClasses(toneFromItem(item)).glow }"
            ></div>

            <div class="relative z-10">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0">
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    :class="toneClasses(toneFromItem(item)).badge"
                  >
                    {{ toneLabel(toneFromItem(item)) }}
                  </span>
                  <h3 class="mt-2 text-xl font-semibold leading-tight text-[#2f211a] sm:text-2xl">
                    {{ item.title }}
                  </h3>
                  <div
                    v-if="item.company"
                    class="mt-2 inline-flex max-w-full items-center gap-2 rounded-[10px] border border-[#b0464a]/24 bg-[linear-gradient(135deg,#fffaf2_0%,#f5d8c8_100%)] px-3 py-1.5 text-sm font-bold text-[#743225] shadow-[0_8px_18px_rgba(116,50,37,0.12)]"
                  >
                    <span class="h-2 w-2 shrink-0 rounded-full bg-[#b0464a] shadow-[0_0_0_4px_rgba(176,70,74,0.12)]"></span>
                    <span class="min-w-0 truncate">{{ item.company }}</span>
                  </div>
                </div>

                <div class="flex flex-col items-start gap-2 sm:items-end">
                  <span class="inline-flex w-fit rounded-full border border-[#d9c1ae] bg-white/60 px-3 py-1 text-sm font-medium text-[#6d5b51]">
                    {{ item.period }}
                  </span>
                  <span v-if="item.duration" class="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b634d]">
                    {{ item.duration }}
                  </span>
                  <button
                    type="button"
                    class="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#5e211a] bg-[#8f302a] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#fff8ee] shadow-[0_12px_24px_rgba(143,48,42,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6f261f] hover:shadow-[0_16px_30px_rgba(143,48,42,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0464a]"
                    :aria-expanded="isExperienceCardExpanded(experienceCardKey(item, index))"
                    @click="toggleExperienceCard(experienceCardKey(item, index))"
                  >
                    {{ isExperienceCardExpanded(experienceCardKey(item, index)) ? stackExpandedLabels.hide : stackExpandedLabels.show }}
                    <span
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-[#fff8ee] text-base leading-none text-[#8f302a] transition duration-200"
                      :class="isExperienceCardExpanded(experienceCardKey(item, index)) ? 'rotate-45' : 'rotate-0'"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </div>
              </div>

              <Transition name="expand-body" @enter="animateEnter" @after-enter="animateAfterEnter" @leave="animateLeave">
                <div v-if="isExperienceCardExpanded(experienceCardKey(item, index))" class="overflow-hidden">
                  <p v-if="item.description" class="mt-3 max-w-[900px] text-[15px] leading-7 text-[#63534a] lg:text-[17px] lg:leading-8">
                    {{ item.description }}
                  </p>

                  <div v-if="item.stack?.length" class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="tag in item.stack"
                      :key="tag"
                      class="inline-flex items-center gap-1.5 rounded-full border border-[#dcc7b4] bg-[#fff8ee] px-3 py-1 text-xs font-medium text-[#705d53]"
                    >
                      <img
                        v-if="technologyIconFor(tag)"
                        :src="technologyIconFor(tag)"
                        :alt="tag"
                        class="h-4 w-4 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      {{ tag }}
                    </span>
                  </div>

                  <ul v-if="item.bullets?.length" class="mt-4 space-y-2.5">
                    <li v-for="bullet in item.bullets" :key="bullet" class="flex gap-3 text-[15px] leading-7 text-[#5e4d45] lg:text-base lg:leading-8">
                      <span class="mt-[0.8rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b0464a] lg:mt-[0.9rem]"></span>
                      <span>
                        <template
                          v-for="(segment, segmentIndex) in highlightedTextSegments(bullet)"
                          :key="`${segment.text}-${segmentIndex}`"
                        >
                          <strong v-if="segment.highlighted" class="font-bold text-[#9d3438]">{{ segment.text }}</strong>
                          <template v-else>{{ segment.text }}</template>
                        </template>
                      </span>
                    </li>
                  </ul>

                  <div
                    v-if="item.achievements?.length"
                    class="mt-4 rounded-[16px] border border-[#d9c1ae] bg-[#fff8ee] p-4"
                  >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b634d]">
                      {{ locale === 'ru' ? 'Ключевые результаты' : 'Key results' }}
                    </p>
                    <ul class="mt-3 space-y-2">
                      <li
                        v-for="achievement in item.achievements"
                        :key="achievement"
                        class="flex gap-3 text-[15px] leading-7 text-[#5e4d45] lg:text-base lg:leading-8"
                      >
                        <span class="mt-[0.8rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e4b64d] lg:mt-[0.9rem]"></span>
                        <span>
                          <template
                            v-for="(segment, segmentIndex) in highlightedTextSegments(achievement)"
                            :key="`${segment.text}-${segmentIndex}`"
                          >
                            <strong v-if="segment.highlighted" class="font-bold text-[#9d3438]">{{ segment.text }}</strong>
                            <template v-else>{{ segment.text }}</template>
                          </template>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div
                    v-if="item.highlight"
                    class="mt-4 rounded-[16px] border border-[#d9c1ae] bg-[#fff8ee] p-4"
                  >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b634d]">
                      {{ item.highlight.label }}
                    </p>
                    <p class="mt-2 text-[15px] leading-7 text-[#5e4d45] lg:text-base lg:leading-8">
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
                      class="group inline-flex items-center gap-2 rounded-full border border-[#b0464a]/18 bg-[linear-gradient(180deg,rgba(255,248,238,0.92),rgba(176,70,74,0.08))] px-4 py-2 text-sm font-semibold text-[#8d4934] shadow-[0_10px_22px_rgba(98,63,38,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#b0464a]/30 hover:bg-[#fff8ee] hover:shadow-[0_14px_28px_rgba(98,63,38,0.12)]"
                    >
                      {{ link.label }}
                      <span v-if="isExternalHref(link.href)" class="text-[#b0464a]/68 transition group-hover:translate-x-0.5">
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
  --timeline-marker-center: 1.25rem;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  bottom: 1.25rem;
  left: calc(var(--timeline-marker-center) - 1px);
  top: 0.75rem;
  width: 2px;
  background: linear-gradient(180deg, rgba(176, 70, 74, 0.46), rgba(198, 151, 114, 0.18));
}

.stack-row {
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.stack-row:hover {
  border-color: rgba(176, 70, 74, 0.24);
  background: rgba(255, 252, 246, 0.96);
  transform: translateX(2px);
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

@media (min-width: 640px) {
  .experience-timeline {
    --timeline-marker-center: 1.75rem;
  }
}
</style>
