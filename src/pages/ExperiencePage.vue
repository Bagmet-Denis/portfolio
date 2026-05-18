<script setup lang="ts">
import { computed } from 'vue'
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

const cloudSrc = publicAssetUrl('cloud.png')
const paperOverlay = publicAssetUrl('paper_overlay.png')

const experienceItems = computed(() => tm('experience.items') as ExperienceItem[])
const skillCategories = computed(() => tm('experience.skillsCard.categories') as SkillCategory[])

const yearsOfExperience = computed(() => `${Math.max(new Date().getFullYear() - 2017, 1)}+`)
const mobileExperience = computed(() => `${Math.max(new Date().getFullYear() - 2019, 1)}+`)
const securityExperience = '3+'
const completedProjectsCount = computed(() => `${mobileProjects.length + desktopProjects.length + cyberSecurityProject.length}+`)

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

    <section class="relative z-10 mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 xl:px-8">
      <article
        class="relative overflow-hidden rounded-[24px] border border-black/10 bg-[#f3e7d7] p-5 shadow-[0_16px_40px_rgba(98,63,38,0.12)] sm:p-7"
      >
        <div class="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.52),rgba(255,255,255,0.12)_42%,rgba(176,70,74,0.09)_100%)]"></div>
        <img :src="paperOverlay" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-78" />

        <div class="relative z-10 flex flex-col gap-7">
          <div class="max-w-[780px]">
            <p class="font-rubik text-sm uppercase tracking-[0.28em] text-[#a8634d]">
              {{ t('menu.experience') }}
            </p>
            <h1 class="mt-2 font-rubik text-[1.85rem] font-semibold leading-tight text-[#39231a] sm:text-[2.6rem] lg:text-[3.1rem]">
              {{ locale === 'ru' ? 'Опыт в мобильной разработке и AppSec' : 'Experience in mobile development and AppSec' }}
            </h1>
          </div>

          <div class="flex flex-wrap gap-3">
            <div class="min-w-[150px] rounded-[18px] border border-[#d2b79d] bg-[#fff8ef]/86 px-4 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9e674f]">
                {{ locale === 'ru' ? 'Общий опыт' : 'Total experience' }}
              </p>
              <p class="mt-1.5 font-black-ops text-3xl uppercase text-[#3c281f]">{{ yearsOfExperience }}</p>
            </div>

            <div class="min-w-[150px] rounded-[18px] border border-[#d2b79d] bg-[#fff8ef]/86 px-4 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9e674f]">
                {{ locale === 'ru' ? 'Мобильная разработка' : 'Mobile development' }}
              </p>
              <p class="mt-1.5 font-black-ops text-3xl uppercase text-[#3c281f]">{{ mobileExperience }}</p>
            </div>

            <div class="min-w-[150px] rounded-[18px] border border-[#d2b79d] bg-[#fff8ef]/86 px-4 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9e674f]">
                {{ locale === 'ru' ? 'AppSec / Reverse' : 'AppSec / Reverse' }}
              </p>
              <p class="mt-1.5 font-black-ops text-3xl uppercase text-[#3c281f]">{{ securityExperience }}</p>
            </div>

            <div class="min-w-[150px] rounded-[18px] border border-[#d2b79d] bg-[#fff8ef]/86 px-4 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9e674f]">
                {{ locale === 'ru' ? 'Сделано проектов' : 'Projects shipped' }}
              </p>
              <p class="mt-1.5 font-black-ops text-3xl uppercase text-[#3c281f]">{{ completedProjectsCount }}</p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="relative z-10 mx-auto max-w-[1280px] px-4 py-5 sm:px-6 xl:px-8">
      <div class="rounded-[24px] border border-[#432f27]/12 bg-[#fff8ee]/82 p-4 shadow-[0_14px_34px_rgba(98,63,38,0.07)] sm:p-5">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="font-rubik text-sm uppercase tracking-[0.24em] text-[#9a6248]">
                {{ locale === 'ru' ? 'Рабочий стек' : 'Working stack' }}
              </p>
              <h2 class="mt-1 text-2xl font-semibold text-[#35241b]">
                {{ locale === 'ru' ? 'Инструменты сгруппированы по смыслу' : 'Tools grouped by purpose' }}
              </h2>
            </div>
          </div>

          <div class="flex flex-col gap-2">
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
          :key="`${item.title}-${item.period}`"
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
                  <p v-if="item.company" class="mt-1 text-sm font-semibold text-[#8d4934]">
                    {{ item.company }}
                  </p>
                </div>

                <div class="flex flex-col items-start gap-1 sm:items-end">
                  <span class="inline-flex w-fit rounded-full border border-[#d9c1ae] bg-white/60 px-3 py-1 text-sm font-medium text-[#6d5b51]">
                    {{ item.period }}
                  </span>
                  <span v-if="item.duration" class="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b634d]">
                    {{ item.duration }}
                  </span>
                </div>
              </div>

              <p v-if="item.description" class="mt-3 max-w-[820px] text-sm leading-6 text-[#63534a] sm:text-[15px]">
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
                <li v-for="bullet in item.bullets" :key="bullet" class="flex gap-3 text-sm leading-6 text-[#5e4d45]">
                  <span class="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b0464a]"></span>
                  <span>{{ bullet }}</span>
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
                    class="flex gap-3 text-sm leading-6 text-[#5e4d45]"
                  >
                    <span class="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e4b64d]"></span>
                    <span>{{ achievement }}</span>
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
                <p class="mt-2 text-sm leading-7 text-[#5e4d45]">
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
