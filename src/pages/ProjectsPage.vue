<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { cyberSecurityProject, desktopProjects, mobileProjects } from '@/data/projects'
import { publicAssetUrl, resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import { projectClientCountriesForLocale, projectClientCountryForTitle } from '@/utils/projectClientCountry'
import LegalNoticeBanner from '@/components/LegalNoticeBanner.vue'
import AntiAIBanner from '@/components/AntiAIBanner.vue'
import ProjectImageLightbox from '@/components/ProjectImageLightbox.vue'
import ProjectTicketCard from '@/components/ProjectTicketCard.vue'
import TeleprompterAutomaticInfoPage from '@/pages/project-details/TeleprompterAutomaticInfoPage.vue'
import MAlienInfoPage from '@/pages/project-details/MAlienInfoPage.vue'
import type { ProjectCard, ProjectCategory, StoreLink, StoreType } from '@/types/projectCard'

const { t, tm, locale } = useI18n()
const categoryOptions: { key: ProjectCategory; labelKey: string }[] = [
  { key: 'mobile', labelKey: 'projects.categories.mobile' },
  { key: 'fullstack', labelKey: 'projects.categories.fullstack' },
  { key: 'desktop', labelKey: 'projects.categories.desktop' },
  { key: 'cybersecurity', labelKey: 'projects.categories.cybersecurity' },
]

const categoryAccentClasses: Record<ProjectCategory, string> = {
  mobile: 'bg-[#D96138]',
  fullstack: 'bg-[#006C7C]',
  desktop: 'bg-[#5F8171]',
  cybersecurity: 'bg-[#AC3F2B]',
}

const cloudSrc = publicAssetUrl('cloud.png')
const profilePhoto = publicAssetUrl('profile/about-me.png')
const cloudDecorations = [
  {
    className:
      '-left-24 top-10 w-44 -rotate-6 opacity-32 mix-blend-darken saturate-75 sm:-left-28 sm:top-6 sm:w-56 lg:-left-32 lg:w-72',
    initial: { x: -48, y: -12, opacity: 0, rotate: -10, scale: 0.92 },
    visible: { x: 0, y: 0, opacity: 0.32, rotate: -6, scale: 1 },
    transition: { duration: 1100, delay: 120 },
  },
  {
    className:
      '-right-20 top-52 w-40 rotate-3 opacity-26 mix-blend-darken saturate-75 sm:-right-24 sm:top-64 sm:w-52 lg:-right-28 lg:top-72 lg:w-64',
    initial: { x: 52, y: 8, opacity: 0, rotate: 8, scale: 0.94 },
    visible: { x: 0, y: 0, opacity: 0.26, rotate: 3, scale: 1 },
    transition: { duration: 1200, delay: 280 },
  },
  {
    className:
      '-left-16 top-[38rem] w-36 rotate-6 opacity-22 mix-blend-darken saturate-75 sm:-left-20 sm:top-[34rem] sm:w-48 lg:-left-24 lg:top-[42rem] lg:w-60',
    initial: { x: -36, y: 16, opacity: 0, rotate: 10, scale: 0.9 },
    visible: { x: 0, y: 0, opacity: 0.22, rotate: 6, scale: 1 },
    transition: { duration: 1050, delay: 420 },
  },
  {
    className:
      '-right-24 bottom-24 w-48 -rotate-4 opacity-28 mix-blend-darken saturate-75 sm:-right-28 sm:bottom-28 sm:w-56 lg:-right-36 lg:bottom-20 lg:w-72',
    initial: { x: 44, y: 20, opacity: 0, rotate: -9, scale: 0.92 },
    visible: { x: 0, y: 0, opacity: 0.28, rotate: -4, scale: 1 },
    transition: { duration: 1180, delay: 520 },
  },
]

const storeBadgeSrc: Record<StoreType, string> = {
  appstore: resolveAssetUrl('src/assets/projects/icons/appstore.svg'),
  googleplay: resolveAssetUrl('src/assets/projects/icons/google-play.svg'),
  rustore: resolveAssetUrl('src/assets/projects/icons/rustore.svg'),
  website: '',
}

const codebyProfileIconUrl =
  resolveAssetUrl('src/assets/projects/security/codeby-profile.png') ||
  resolveAssetUrl('src/assets/projects/security/codeby-profile.png.png')
const hackerOneServicesIconUrl = resolveAssetUrl('src/assets/projects/security/hackerone-services.png')
const telegramLogoUrl = publicAssetUrl('socials/telegram.svg')

const fullStackProjectTitles = new Set([
  'Teleprompter Automatic',
  'Tales',
  'Skin - Widgets, Icons, Themes',
  'Mod Pack for Melon Playground',
  'Алло - Запись звонков',
  'M-Alien',
])

const prioritizedProjectTitles = [
  'Teleprompter Automatic',
  'Тренировки. Блин да Гриф',
  'Складолог',
  'ProStor.ae',
  'Город Курорт',
  '585Gold - золотые изделия',
  'Транспондер',
  'Главная дорога',
  'Главная дорога. RFID',
  'M-Alien',
  'Skin - Widgets, Icons, Themes',
  'Femina',
  'DMT',
  'The Tone of Victory',
] as const

const fullWidthProjectTitles = new Set([
  'ProStor.ae',
  'Teleprompter Automatic',
  'M-Alien',
  'The Tone of Victory',
  'Алло - Запись звонков',
])

const prioritizedProjectIndex = new Map<string, number>(
  prioritizedProjectTitles.map((title, index) => [title, index]),
)

const toneOfVictoryTitle = 'The Tone of Victory'
const toneOfVictoryProjectScreenshots = [
  'src/assets/projects/tag/tag0.png',
  'src/assets/projects/tag/tag1.png',
  'src/assets/projects/tag/tag2.png',
  'src/assets/projects/tag/tag3.png',
  'src/assets/projects/tag/tag4.png',
  'src/assets/projects/tag/tag5.png',
]
const toneOfVictoryProjectTechnologies = [
  'Swift',
  'SwiftUI',
  'AVFoundation',
  'AVKit',
  'Localization',
  'Audio',
  'Video',
  'Formula 1 activation',
  'Stand UI',
  'Multimarket content',
]

const insentryContributionCard = computed<ProjectCard>(() => ({
  id: 'mobile-insentry-raw-decoder',
  category: 'mobile',
  eyebrow: t('projects.caseLabels.engineeringContribution'),
  title: 'Insentry mobile client',
  description: t('projects.descriptions.insentryRawStream'),
  technologies: [
    'WebSocket',
    'Byte stream',
    'H.264 / H.265',
    'NALU',
    'Native decoder',
    'Flutter bridge',
    'Swift',
    'Platform Channels',
  ],
  iconUrl: resolveAssetUrl('src/assets/projects/insentry/1024x1024.jpg'),
  galleryUrls: resolveAssetUrls([
    'src/assets/projects/insentry/insentry0.jpg',
    'src/assets/projects/insentry/insentry1.jpg',
  ]),
  storeLinks: [],
  solvedTasksTitle: t('projects.caseLabels.solvedTasks'),
  solvedTasks: tm('projects.insentry.solvedTasks') as string[],
}))

const activeCategory = ref<ProjectCategory>('mobile')
const showAntiAIBanner = false

const isLightboxOpen = ref(false)
const lightboxProjectId = ref<string | null>(null)
const lightboxIndex = ref(0)
const infoProjectId = ref<string | null>(null)

function openInfoModal(projectId: string) {
  infoProjectId.value = projectId
}

function closeInfoModal() {
  infoProjectId.value = null
}

function openLightbox(projectId: string, index: number) {
  lightboxProjectId.value = projectId
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
  lightboxProjectId.value = null
  lightboxIndex.value = 0
}

const mobileProjectCards = computed<ProjectCard[]>(() =>
  mobileProjects
    .map((project, originalIndex) => {
      const isToneOfVictoryProject = project.title === toneOfVictoryTitle
      const storeLinks: StoreLink[] = []
      if (project.appStoreUrl) storeLinks.push({ type: 'appstore', url: project.appStoreUrl })
      if (project.googlePlayUrl) storeLinks.push({ type: 'googleplay', url: project.googlePlayUrl })
      if (project.ruStoreUrl) storeLinks.push({ type: 'rustore', url: project.ruStoreUrl })
      if (project.title === 'Склад Меда') {
        storeLinks.push({
          type: 'website',
          url: 'https://sklad-meda.ru/prilozhenie-dlya-android-sklad-meda',
          label: 'Скачать APK',
        })
      }
      if (project.title === 'Город Курорт') {
        storeLinks.push({
          type: 'website',
          url: 'https://vk.com/gorod_kurort',
          label: 'VK',
        })
      }
      return {
        card: {
          id: `mobile-${project.id}-${project.title}`,
          category: 'mobile',
          title: project.title,
          description: getProjectDescription(
            t,
            project.title,
            project.description || t('projects.fallbackDescription'),
            isToneOfVictoryProject ? 'listing' : 'default',
          ),
          technologies: (isToneOfVictoryProject
            ? toneOfVictoryProjectTechnologies
            : project.technologies).filter(Boolean),
          iconUrl: resolveAssetUrl(project.iconPath),
          galleryUrls: resolveAssetUrls(isToneOfVictoryProject ? toneOfVictoryProjectScreenshots : project.screenshots),
          storeLinks,
          ...projectClientCountryForTitle(project.title, locale),
          infoModalKey:
            project.title === 'Teleprompter Automatic'
              ? 'teleprompter-automatic'
              : project.title === 'M-Alien'
                ? 'm-alien'
                : undefined,
        } satisfies ProjectCard,
        originalIndex,
      }
    })
    .sort((left, right) => {
      const leftPriority = prioritizedProjectIndex.get(left.card.title)
      const rightPriority = prioritizedProjectIndex.get(right.card.title)

      if (leftPriority !== undefined && rightPriority !== undefined) {
        return leftPriority - rightPriority
      }

      if (leftPriority !== undefined) return -1
      if (rightPriority !== undefined) return 1

      return left.originalIndex - right.originalIndex
    })
    .map(({ card }) => card),
)

const normalizedProjects = computed<Record<ProjectCategory, ProjectCard[]>>(() => ({
  mobile: [
    ...mobileProjectCards.value.slice(0, 6),
    insentryContributionCard.value,
    ...mobileProjectCards.value.slice(6),
  ],
  fullstack: mobileProjectCards.value.filter((project) => fullStackProjectTitles.has(project.title)),
  desktop: desktopProjects.map((project) => ({
    id: `desktop-${project.id}-${project.title}`,
    category: 'desktop',
    title: project.title,
    description: getProjectDescription(t, project.title, project.description || t('projects.fallbackDescription')),
    technologies: project.technologies.filter(Boolean),
    iconUrl: resolveAssetUrl(project.iconPath),
    galleryUrls: resolveAssetUrls(project.screenshots),
    storeLinks: [],
  })),
  cybersecurity: cyberSecurityProject.map((project) => ({
    id: `cyber-${project.id}-${project.title}`,
    category: 'cybersecurity',
    title: project.title,
    description: getProjectDescription(t, project.title, project.description || t('projects.fallbackDescription')),
    technologies: [],
    iconUrl: '',
    galleryUrls: resolveAssetUrls(project.imagePath ? [project.imagePath] : []),
    storeLinks: [],
  })),
}))

const visibleProjects = computed(() => normalizedProjects.value[activeCategory.value])
const mobileProjectCountries = computed(() => projectClientCountriesForLocale(locale))
const categoryCounts = computed<Record<ProjectCategory, number>>(() => ({
  mobile: normalizedProjects.value.mobile.length,
  fullstack: normalizedProjects.value.fullstack.length,
  desktop: normalizedProjects.value.desktop.length,
  cybersecurity: normalizedProjects.value.cybersecurity.length,
}))
const activeCategoryMeta = computed(() => ({
  eyebrow: t(`projects.categoryMeta.${activeCategory.value}.eyebrow`),
  description: t(`projects.categoryMeta.${activeCategory.value}.description`),
}))
const isCybersecurityCategory = computed(() => activeCategory.value === 'cybersecurity')

const lightboxProject = computed(() => {
  const id = lightboxProjectId.value
  if (!id) return null
  return visibleProjects.value.find((p) => p.id === id) ?? null
})

const infoProject = computed(() => {
  const id = infoProjectId.value
  if (!id) return null

  const allProjects = Object.values(normalizedProjects.value).flat()
  return allProjects.find((project) => project.id === id) ?? null
})
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img v-for="(cloud, index) in cloudDecorations" :key="`cloud-${index}`" v-motion :src="cloudSrc" alt=""
        class="absolute select-none blur-[0.35px]" :initial="cloud.initial" :visible-once="cloud.visible"
        :transition="cloud.transition" :class="cloud.className" />
    </div>

    <main class="relative z-10 w-full px-3 pt-2 pb-16 sm:px-4 sm:pt-3">
      <section
        class="projects-review-shell relative overflow-hidden rounded-[26px] p-2 sm:p-3">
        <div class="projects-review-window relative">
          <div class="projects-review-header">
            <div class="flex min-w-0 items-center gap-2">
              <img :src="profilePhoto" alt="Denis Bagmet" class="projects-review-avatar" />
              <p class="truncate text-xs text-[#9da7b3]">
                <strong class="text-[#f0f3f6]">denis-bagmet</strong>
                {{ locale.startsWith('ru') ? ' открыл portfolio repository' : ' opened portfolio repository' }}
              </p>
            </div>
            <span class="projects-review-status">
              {{ locale.startsWith('ru') ? 'готов к просмотру' : 'ready to explore' }}
            </span>
          </div>

          <div class="projects-review-body">
            <div class="projects-review-main">
              <div class="projects-review-copy">
                <div class="projects-review-branch">
                  <span class="projects-review-branch-icon">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <circle cx="4" cy="3" r="2" />
                      <circle cx="12" cy="13" r="2" />
                      <path d="M4 5v2.2A2.8 2.8 0 0 0 6.8 10H9a3 3 0 0 1 3 3" />
                    </svg>
                  </span>
                  portfolio / projects / {{ activeCategory }}
                </div>
                <p class="projects-review-eyebrow">
                  {{ locale.startsWith('ru') ? 'Каталог реализованных решений' : 'Shipped solutions catalog' }}
                </p>
                <h1 class="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {{ t('projects.title') }}
                </h1>
                <p class="mt-3 max-w-2xl text-sm leading-6 sm:text-base">
                  {{ t('projects.subtitle') }}
                </p>
                <div class="projects-active-collection">
                  <span :class="categoryAccentClasses[activeCategory]"></span>
                  <div>
                    <strong>{{ activeCategoryMeta.eyebrow }}</strong>
                    <p>{{ activeCategoryMeta.description }}</p>
                  </div>
                </div>
              </div>

              <div class="projects-manifest">
                <div class="projects-manifest-header">
                  <span class="projects-manifest-dots"><i></i><i></i><i></i></span>
                  <code>release.manifest</code>
                  <span class="projects-manifest-valid">valid</span>
                </div>
                <div class="projects-manifest-lines">
                  <div>
                    <span class="projects-manifest-number">1</span>
                    <span class="projects-manifest-plus">+</span>
                    <code>active_collection:</code>
                    <strong>{{ activeCategory }}</strong>
                  </div>
                  <div>
                    <span class="projects-manifest-number">2</span>
                    <span class="projects-manifest-plus">+</span>
                    <code>projects_available:</code>
                    <strong>{{ categoryCounts[activeCategory] }}</strong>
                  </div>
                  <div>
                    <span class="projects-manifest-number">3</span>
                    <span class="projects-manifest-plus">+</span>
                    <code>implementation_details:</code>
                    <strong>enabled</strong>
                  </div>
                  <div>
                    <span class="projects-manifest-number">4</span>
                    <span class="projects-manifest-plus">+</span>
                    <code>production_status:</code>
                    <strong>shipped</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="projects-filter-panel">
              <p class="projects-filter-label">
                {{ locale.startsWith('ru') ? 'Выберите коллекцию — карточки ниже обновятся' : 'Choose a collection — cards below will update' }}
              </p>
              <button
                v-for="category in categoryOptions"
                :key="category.key"
                type="button"
                class="projects-filter-option"
                :class="{ 'projects-filter-option-active': activeCategory === category.key }"
                :aria-pressed="activeCategory === category.key"
                @click="activeCategory = category.key"
              >
                <span class="projects-filter-file">
                  <span class="projects-filter-accent" :class="categoryAccentClasses[category.key]"></span>
                  <span>
                    <small>{{ t(`projects.categoryMeta.${category.key}.eyebrow`) }}</small>
                    <strong>{{ t(category.labelKey) }}</strong>
                  </span>
                </span>
                <span class="projects-filter-count">{{ categoryCounts[category.key] }}</span>
                <span class="projects-filter-action">
                  {{ activeCategory === category.key
                    ? (locale.startsWith('ru') ? 'Открыто' : 'Opened')
                    : (locale.startsWith('ru') ? 'Открыть' : 'Open') }}
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </span>
              </button>
            </div>

            <div v-if="activeCategory === 'mobile'" class="projects-markets">
              <div class="projects-markets-heading">
                <span class="projects-markets-status-dot"></span>
                <strong>Deployments</strong>
                <code>markets:</code>
              </div>
              <div class="projects-markets-list">
                <span
                  v-for="country in mobileProjectCountries"
                  :key="country.name"
                  class="projects-market-country"
                >
                  <img
                    v-if="country.flagUrl"
                    :src="country.flagUrl"
                    :alt="country.name"
                    class="projects-market-flag"
                  >
                  <span v-else class="projects-market-emoji">{{ country.flagEmoji }}</span>
                  <strong>{{ country.name }}</strong>
                </span>
              </div>
              <span class="projects-markets-count">+{{ mobileProjectCountries.length }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 space-y-4">
        <AntiAIBanner v-if="showAntiAIBanner && activeCategory === 'mobile'" class="max-w-[420px] md:ml-2 md:rotate-[1deg]" />
        <div v-if="isCybersecurityCategory" class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div class="grid w-full gap-3 md:max-w-[360px]">
            <div
              class="group relative min-w-0 overflow-hidden rounded-[20px] border border-[#AC3F2B]/24 bg-[#0D0908] shadow-[0_18px_38px_rgba(0,0,0,0.24),0_14px_28px_rgba(172,63,43,0.10)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#AC3F2B]/36">
              <div class="absolute inset-x-0 top-0 h-1 bg-[#AC3F2B]"></div>
              <div class="grid">
                <div
                  class="relative flex h-32 items-center justify-center overflow-hidden bg-[#F7EFE7] p-4">
                  <img v-if="codebyProfileIconUrl" :src="codebyProfileIconUrl" alt=""
                    class="h-full w-full object-contain" loading="lazy" decoding="async" />
                  <span v-else class="text-xs font-black uppercase tracking-[0.14em] text-[#301B16]">Codeby</span>
                  <div
                    class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.74),transparent_32%),linear-gradient(90deg,transparent,rgba(172,63,43,0.08))]">
                  </div>
                </div>
                <div
                  class="min-w-0 border-t border-white/10 bg-[linear-gradient(135deg,rgba(32,20,18,0.96),rgba(43,27,24,0.92))] p-4">
                  <p class="text-[11px] font-black uppercase tracking-[0.2em] text-[#F0BAAC]/76">
                    Публикации и профиль
                  </p>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span
                      class="rounded-full border border-[#AC3F2B]/20 bg-[#AC3F2B]/12 px-3 py-1 text-xs font-bold text-[#FFEAE4]">Codeby.net</span>
                  </div>
                  <a href="https://codeby.net/members/debug.77915/" target="_blank" rel="noopener noreferrer"
                    class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-sm font-bold text-[#F0BAAC] transition hover:-translate-y-0.5 hover:border-[#AC3F2B]/28 hover:bg-white/10 hover:text-[#FFF0E8]">
                    Профиль на Codeby.net
                    <span class="text-[#F8D1C6]/70 transition group-hover:translate-x-0.5">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <LegalNoticeBanner class="max-w-[420px] xl:max-w-none xl:-rotate-[3deg]" />
        </div>
      </div>

      <section class="relative z-10 mt-8 grid gap-4 lg:grid-flow-dense lg:grid-cols-2 lg:items-start">
        <article
          v-if="isCybersecurityCategory"
          class="group relative min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#080707] p-3 shadow-[0_16px_36px_rgba(0,0,0,0.28),0_14px_28px_rgba(172,63,43,0.08)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/18 lg:col-span-2">
          <div class="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#F06F35_0%,#F06F35_42%,#2AABEE_58%,#2AABEE_100%)]"></div>
          <div class="grid gap-3 md:grid-cols-2">
            <div class="relative min-w-0 rounded-[18px] border border-[#F06F35]/18 bg-[linear-gradient(135deg,rgba(24,18,16,0.96),rgba(17,14,13,0.98))] p-4">
              <div class="flex items-start gap-4">
                <div class="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#F5EFE4] p-2">
                  <img v-if="hackerOneServicesIconUrl" :src="hackerOneServicesIconUrl" alt=""
                    class="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
                  <span v-else class="text-xs font-black uppercase tracking-[0.14em] text-[#161616]">H1</span>
                </div>
                <div class="min-w-0">
                  <p class="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFD1B5]/76">
                    Найдены уязвимости
                  </p>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span
                      class="rounded-full border border-[#F06F35]/18 bg-[#F06F35]/10 px-3 py-1 text-xs font-bold text-[#FFF0E8]">Mail.ru</span>
                    <span
                      class="rounded-full border border-[#F06F35]/18 bg-[#F06F35]/10 px-3 py-1 text-xs font-bold text-[#FFF0E8]">QIWI</span>
                  </div>
                </div>
              </div>
              <a href="https://hackerone.com/debug_denis" target="_blank" rel="noopener noreferrer"
                class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-sm font-bold text-[#FFD1B5] transition hover:-translate-y-0.5 hover:border-[#F06F35]/28 hover:bg-white/10 hover:text-[#FFF0E8]">
                Профиль на HackerOne
                <span class="text-[#FFDCC9]/70 transition group-hover:translate-x-0.5">↗</span>
              </a>
            </div>

            <div class="relative min-w-0 rounded-[18px] border border-[#2AABEE]/18 bg-[linear-gradient(135deg,rgba(8,20,30,0.96),rgba(12,23,31,0.98))] p-4">
              <div class="flex items-start gap-4">
                <img :src="telegramLogoUrl" alt=""
                  class="mt-0.5 h-11 w-11 shrink-0 object-contain" loading="lazy" decoding="async" />
                <div class="min-w-0">
                  <p class="text-[11px] font-black uppercase tracking-[0.2em] text-[#A9E4FF]/76">
                    Уязвимость в Telegram
                  </p>
                  <h3 class="mt-1 text-lg font-black leading-tight text-[#EAF8FF]">
                    Закрытый research и поиск уязвимости
                  </h3>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      class="rounded-full border border-[#2AABEE]/22 bg-[#2AABEE]/12 px-3 py-1 text-xs font-bold text-[#EAF8FF]">Поиск по заказу</span>
                    <span
                      class="rounded-full border border-[#2AABEE]/22 bg-[#2AABEE]/12 px-3 py-1 text-xs font-bold text-[#EAF8FF]">Уязвимость продана</span>
                  </div>
                  <p class="mt-3 text-sm leading-5 text-[#D8F2FF]/78">
                    Была найдена уязвимость в Telegram. Публичных деталей по кейсу нет: это был закрытый research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <ProjectTicketCard v-for="project in visibleProjects" :key="project.id" :project="project"
          :class="[
            fullWidthProjectTitles.has(project.title) ? 'lg:col-span-2' : '',
            project.id === 'mobile-insentry-raw-decoder' ? 'lg:col-span-2' : '',
            project.title === 'Закрытый OSINT-инструмент для поиска цифрового следа' ? 'lg:col-span-2' : '',
          ]"
          :store-badge-src="storeBadgeSrc" :open-lightbox="openLightbox" :open-info-modal="openInfoModal"
          :no-images-text="t('projects.noImages')" :info-button-text="t('projects.showInfo')" />
      </section>

      <div v-if="infoProject?.infoModalKey"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,27,34,0.52)] p-3 sm:p-5"
        role="dialog" aria-modal="true" @click.self="closeInfoModal" @keydown.esc="closeInfoModal" tabindex="0">
        <div
          class="w-full max-w-[1120px] overflow-hidden rounded-[26px] border border-[#d6e1e8] bg-[#f3f7fa] shadow-[0_24px_64px_rgba(12,23,30,0.20)]">
          <div class="max-h-[88vh] overflow-y-auto">
            <div class="sticky top-0 z-20 border-b border-[#d6e1e8] bg-[#f3f7fa]/96 px-4 py-4 backdrop-blur sm:px-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#537286]">
                    {{ t('projects.infoModalLabel') }}
                  </p>
                  <h3 class="mt-1 text-xl font-black text-[#18242c] sm:text-2xl">
                    {{ infoProject.title }}
                  </h3>
                </div>

                <button type="button"
                  class="shrink-0 rounded-2xl border border-[#c7d6df] bg-white px-4 py-2 text-sm font-semibold text-[#203744] transition hover:bg-[#edf4f8]"
                  @click="closeInfoModal">
                  {{ t('projects.closeModal') }}
                </button>
              </div>
            </div>

            <div class="p-4 sm:p-6">
              <TeleprompterAutomaticInfoPage v-if="infoProject.infoModalKey === 'teleprompter-automatic'" />
              <MAlienInfoPage v-else-if="infoProject.infoModalKey === 'm-alien'" />
            </div>
          </div>
        </div>
      </div>

      <ProjectImageLightbox
        v-if="isLightboxOpen"
        :project="lightboxProject"
        :index="lightboxIndex"
        :no-images-text="t('projects.noImages')"
        :close-label="t('projects.closeModal')"
        @close="closeLightbox"
        @update:index="lightboxIndex = $event"
      />
    </main>
  </div>
</template>

<style scoped>
.projects-review-shell {
  border: 1px solid rgba(67, 47, 39, 0.18);
  background:
    linear-gradient(rgba(72, 54, 37, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(72, 54, 37, 0.05) 1px, transparent 1px),
    rgba(255, 250, 242, 0.72);
  background-size: 24px 24px;
  box-shadow:
    0 20px 52px rgba(74, 54, 38, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.56);
}

.projects-review-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 18px;
  background: #0d1117;
  box-shadow:
    12px 12px 0 rgba(36, 24, 19, 0.16),
    0 24px 48px rgba(36, 24, 19, 0.2);
}

.projects-review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(67, 47, 39, 0.16);
  background: #161b22;
  padding: 0.72rem 0.9rem;
}

.projects-review-avatar {
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  object-fit: cover;
  object-position: center 20%;
}

.projects-review-status {
  flex: 0 0 auto;
  border: 1px solid #238636;
  border-radius: 999px;
  color: #7ee787;
  font-size: 0.62rem;
  font-weight: 800;
  padding: 0.3rem 0.55rem;
  text-transform: uppercase;
}

.projects-review-body {
  background:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    #0d1117;
  background-size: 24px 24px;
  color: #f0f3f6;
  padding: 1.25rem;
}

.projects-review-eyebrow {
  margin-top: 1.2rem;
  color: #7ee787;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.projects-review-main {
  display: grid;
  gap: 1.25rem;
}

.projects-review-copy > p {
  color: #9da7b3;
}

.projects-review-branch {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #30363d;
  border-radius: 999px;
  background: #161b22;
  color: #79c0ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  padding: 0.4rem 0.65rem;
}

.projects-review-branch-icon,
.projects-review-branch-icon svg {
  width: 0.9rem;
  height: 0.9rem;
}

.projects-review-branch-icon svg {
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.4;
}

.projects-active-collection {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
  border-left: 2px solid #30363d;
  padding-left: 0.9rem;
}

.projects-active-collection > span {
  width: 0.55rem;
  height: 0.55rem;
  flex: 0 0 auto;
  margin-top: 0.35rem;
  border-radius: 2px;
  transform: rotate(45deg);
}

.projects-active-collection strong {
  color: #f0f3f6;
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.projects-active-collection p {
  max-width: 44rem;
  margin-top: 0.3rem;
  color: #9da7b3;
  font-size: 0.75rem;
  line-height: 1.55;
}

.projects-manifest {
  align-self: end;
  overflow: hidden;
  border: 1px solid #347d39;
  border-radius: 10px;
  background: #13231a;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.18);
}

.projects-manifest-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid rgba(70, 149, 74, 0.35);
  background: #172b1e;
  color: #8b949e;
  font-size: 0.66rem;
  padding: 0.55rem 0.7rem;
}

.projects-manifest-dots {
  display: flex;
  align-items: center;
  gap: 0.28rem;
}

.projects-manifest-dots i {
  width: 0.58rem;
  height: 0.58rem;
  min-width: 0.58rem;
  flex: 0 0 0.58rem;
  aspect-ratio: 1;
  border-radius: 999px;
  background: #6e7681;
}

.projects-manifest-dots i:first-child {
  background: #d25f3f;
}

.projects-manifest-dots i:nth-child(2) {
  background: #e2c96b;
}

.projects-manifest-dots i:last-child {
  background: #3fb950;
}

.projects-manifest-valid {
  color: #7ee787;
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.projects-manifest-lines > div {
  display: grid;
  grid-template-columns: 1.5rem 0.8rem auto minmax(0, 1fr);
  gap: 0.35rem;
  border-bottom: 1px solid rgba(70, 149, 74, 0.2);
  color: #c5d1c8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
  line-height: 1.5;
  padding: 0.48rem 0.7rem 0.48rem 0;
}

.projects-manifest-lines > div:last-child {
  border-bottom: 0;
}

.projects-manifest-number {
  color: #768b79;
  text-align: right;
}

.projects-manifest-plus,
.projects-manifest-lines strong {
  color: #7ee787;
}

.projects-manifest-lines strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-filter-panel {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.25rem;
  border-top: 1px solid #30363d;
  padding-top: 1rem;
}

.projects-filter-label {
  margin-bottom: 0.15rem;
  color: #8b949e;
  font-size: 0.67rem;
  font-weight: 700;
}

.projects-filter-option {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  border: 1px solid #57606a;
  border-radius: 11px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.035), transparent 55%),
    #242a32;
  color: #c5ccd3;
  padding: 0.82rem 0.85rem;
  text-align: left;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.projects-filter-option:hover {
  border-color: #8c959f;
  background: #30363d;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  transform: translateY(-2px);
}

.projects-filter-option-active {
  border-color: #46954a;
  background:
    linear-gradient(135deg, rgba(63, 185, 80, 0.12), transparent 58%),
    #1b2a20;
  box-shadow:
    inset 4px 0 0 #3fb950,
    0 10px 24px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(63, 185, 80, 0.08);
}

.projects-filter-option:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 3px;
}

.projects-filter-file {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.7rem;
}

.projects-filter-accent {
  width: 0.68rem;
  height: 0.68rem;
  flex: 0 0 auto;
  border-radius: 2px;
  transform: rotate(45deg);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.04);
}

.projects-filter-file small,
.projects-filter-file strong {
  display: block;
}

.projects-filter-file small {
  overflow: hidden;
  color: #8b949e;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.projects-filter-file strong {
  margin-top: 0.12rem;
  color: #f0f3f6;
  font-size: 0.8rem;
  font-weight: 850;
}

.projects-filter-count {
  min-width: 1.8rem;
  text-align: center;
  border-radius: 999px;
  background: #0d1117;
  color: #f0f3f6;
  font-size: 0.68rem;
  font-weight: 900;
  padding: 0.28rem 0.48rem;
  box-shadow: inset 0 0 0 1px #444c56;
}

.projects-filter-action {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid rgba(88, 166, 255, 0.42);
  border-radius: 6px;
  background: rgba(56, 139, 253, 0.12);
  color: #79c0ff;
  font-size: 0.66rem;
  font-weight: 900;
  padding: 0.36rem 0.48rem;
}

.projects-filter-option-active .projects-filter-action {
  border-color: rgba(63, 185, 80, 0.48);
  background: rgba(46, 160, 67, 0.14);
  color: #7ee787;
}

.projects-filter-action svg {
  width: 0.7rem;
  height: 0.7rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
  transition: transform 180ms ease;
}

.projects-filter-option:hover .projects-filter-action svg {
  transform: translateX(2px);
}

.projects-markets {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.85rem;
  border-top: 1px solid #30363d;
  padding-top: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.projects-markets-heading {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.4rem;
}

.projects-markets-heading strong {
  color: #c9d1d9;
  font-size: 0.68rem;
}

.projects-markets-heading code {
  color: #8b949e;
  font-size: 0.64rem;
}

.projects-markets-status-dot {
  width: 0.48rem;
  height: 0.48rem;
  flex: 0 0 0.48rem;
  border-radius: 999px;
  background: #3fb950;
  box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.12);
}

.projects-markets-list {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  gap: 0.7rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.projects-markets-list::-webkit-scrollbar {
  display: none;
}

.projects-market-country {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.32rem;
  color: #8b949e;
  opacity: 0.82;
}

.projects-market-country strong {
  font-size: 0.61rem;
  font-weight: 700;
  white-space: nowrap;
}

.projects-market-flag {
  width: 1.25rem;
  height: 0.8rem;
  flex: 0 0 auto;
  border-radius: 2px;
  object-fit: contain;
  filter: saturate(0.82);
}

.projects-market-emoji {
  width: 1.25rem;
  font-size: 0.8rem;
  text-align: center;
}

.projects-markets-count {
  flex: 0 0 auto;
  border: 1px solid #30363d;
  border-radius: 999px;
  background: #161b22;
  color: #8b949e;
  font-size: 0.58rem;
  font-weight: 900;
  padding: 0.18rem 0.42rem;
}

@media (min-width: 640px) {
  .projects-filter-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .projects-filter-label {
    grid-column: 1 / -1;
  }

}

@media (min-width: 1024px) {
  .projects-review-body {
    padding: 1.5rem;
  }

  .projects-review-main {
    grid-template-columns: minmax(0, 1.08fr) minmax(24rem, 0.92fr);
    align-items: end;
  }

  .projects-filter-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}

@media (min-width: 1400px) {
  .projects-filter-panel {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .projects-review-status {
    display: none;
  }

  .projects-review-body {
    padding: 1rem;
  }

  .projects-filter-option {
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 0.5rem;
  }

  .projects-filter-action {
    grid-column: auto;
    justify-content: flex-start;
    border-top: 0;
    padding-top: 0;
  }

  .projects-manifest-lines > div {
    grid-template-columns: 1.2rem 0.7rem minmax(0, auto) minmax(0, 1fr);
    font-size: 0.62rem;
  }

  .projects-markets {
    gap: 0.5rem;
  }

  .projects-markets-heading code {
    display: none;
  }

  .projects-markets-list {
    gap: 0.65rem;
  }
}

@media (min-width: 1600px) {
  .projects-review-shell {
    padding: 1rem;
  }

  .projects-review-header {
    padding: 0.95rem 1.15rem;
  }

  .projects-review-avatar {
    width: 2.35rem;
    height: 2.35rem;
  }

  .projects-review-header p {
    font-size: 0.88rem;
  }

  .projects-review-status {
    font-size: 0.72rem;
    padding: 0.38rem 0.7rem;
  }

  .projects-review-body {
    padding: 2rem;
  }

  .projects-review-main {
    grid-template-columns: minmax(0, 1.06fr) minmax(31rem, 0.94fr);
    gap: 2rem;
  }

  .projects-review-branch {
    font-size: 0.82rem;
    padding: 0.52rem 0.8rem;
  }

  .projects-review-eyebrow {
    font-size: 0.8rem;
  }

  .projects-review-copy h1 {
    font-size: 3.75rem;
  }

  .projects-review-copy > p {
    font-size: 1.08rem;
    line-height: 1.75;
  }

  .projects-active-collection strong {
    font-size: 0.9rem;
  }

  .projects-active-collection p {
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .projects-manifest-header {
    font-size: 0.8rem;
    padding: 0.72rem 0.9rem;
  }

  .projects-manifest-dots i {
    width: 0.56rem;
    height: 0.56rem;
    min-width: 0.56rem;
    flex-basis: 0.56rem;
  }

  .projects-manifest-lines > div {
    grid-template-columns: 1.8rem 1rem auto minmax(0, 1fr);
    font-size: 0.88rem;
    padding: 0.62rem 0.9rem 0.62rem 0;
  }

  .projects-filter-panel {
    gap: 0.75rem;
    margin-top: 1.7rem;
    padding-top: 1.35rem;
  }

  .projects-filter-label {
    font-size: 0.82rem;
  }

  .projects-filter-option {
    padding: 1rem;
  }

  .projects-filter-file small {
    font-size: 0.7rem;
  }

  .projects-filter-file strong {
    font-size: 0.95rem;
  }

  .projects-filter-count,
  .projects-filter-action {
    font-size: 0.78rem;
  }

  .projects-markets {
    margin-top: 1rem;
    padding-top: 0.9rem;
  }

  .projects-markets-heading strong {
    font-size: 0.76rem;
  }

  .projects-market-country strong {
    font-size: 0.68rem;
  }
}
</style>
