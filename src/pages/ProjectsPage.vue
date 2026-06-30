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

const cloudSrc = publicAssetUrl('cloud.png')
const finderFolderIconUrl = resolveAssetUrl('src/assets/projects/finder-folder.svg')
const macosWindowControlsUrl = resolveAssetUrl('src/assets/projects/macos-window-controls.svg')
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
  'Тренировки. Блин да Гриф',
  '585Gold - золотые изделия',
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
      if (project.title === 'Teleprompter Automatic') {
        storeLinks.push({
          type: 'website',
          url: 'https://teleprompter.pw/',
          label: 'Сайт',
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
      if (left.card.title === '585Gold - золотые изделия') return 1
      if (right.card.title === '585Gold - золотые изделия') return -1

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
const activeCategoryLabel = computed(() => {
  const category = categoryOptions.find((option) => option.key === activeCategory.value)
  return category ? t(category.labelKey) : ''
})
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
              <div class="projects-filter-panel">
              <div class="projects-filter-toolbar">
                <div class="projects-filter-window-controls" aria-hidden="true">
                  <img
                    v-if="macosWindowControlsUrl"
                    :src="macosWindowControlsUrl"
                    alt=""
                    class="projects-filter-window-controls-image"
                  >
                  <template v-else>
                    <span></span>
                    <span></span>
                    <span></span>
                  </template>
                </div>
                <div class="projects-filter-pathbar">
                  <img
                    v-if="finderFolderIconUrl"
                    :src="finderFolderIconUrl"
                    alt=""
                    class="projects-filter-toolbar-folder"
                    aria-hidden="true"
                  >
                  <span v-else class="projects-filter-toolbar-folder-fallback" aria-hidden="true"></span>
                  <span>projects library / {{ activeCategoryLabel }}</span>
                </div>
                <strong class="projects-filter-toolbar-count">
                  {{ categoryCounts[activeCategory] }}
                  {{ locale.startsWith('ru') ? 'проектов' : 'projects' }}
                </strong>
              </div>

              <div class="projects-filter-body">
                <div class="projects-filter-intro">
                  <p>{{ locale.startsWith('ru') ? 'Библиотека проектов' : 'Projects Library' }}</p>
                  <strong>{{ activeCategoryLabel }}</strong>
                  <span>{{ activeCategoryMeta.description }}</span>
                </div>

                <div
                  class="projects-filter-dock"
                  role="tablist"
                  :aria-label="locale.startsWith('ru') ? 'Категории проектов' : 'Project categories'"
                >
                  <button
                    v-for="category in categoryOptions"
                    :key="category.key"
                    type="button"
                    class="projects-filter-dock-item"
                    :class="{ 'projects-filter-dock-item-active': activeCategory === category.key }"
                    role="tab"
                    :aria-selected="activeCategory === category.key"
                    :aria-pressed="activeCategory === category.key"
                    @click="activeCategory = category.key"
                  >
                    <span class="projects-filter-folder-frame" aria-hidden="true">
                      <img
                        v-if="finderFolderIconUrl"
                        :src="finderFolderIconUrl"
                        alt=""
                        class="projects-filter-folder-image"
                      >
                      <span
                        v-else
                        class="projects-filter-folder"
                        :class="`projects-filter-folder--${category.key}`"
                      ></span>
                    </span>
                    <span class="projects-filter-dock-copy">
                      <strong>{{ t(category.labelKey) }}</strong>
                      <small>
                        {{ categoryCounts[category.key] }}
                        {{ locale.startsWith('ru') ? 'шт.' : 'items' }}
                      </small>
                    </span>
                  </button>
                </div>
              </div>

              <div class="projects-markets">
                <div class="projects-markets-heading">
                  <span class="projects-markets-status-dot"></span>
                  <strong>{{ locale.startsWith('ru') ? 'География' : 'Markets' }}</strong>
                  <code>{{ locale.startsWith('ru') ? 'релизы:' : 'deployments:' }}</code>
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
                <span class="projects-markets-count">
                  {{ mobileProjectCountries.length }}
                </span>
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

.projects-filter-panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  margin-top: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  background:
    radial-gradient(ellipse at 16% 10%, rgba(79, 159, 255, 0.34), transparent 19rem),
    radial-gradient(ellipse at 82% 18%, rgba(177, 118, 255, 0.24), transparent 20rem),
    radial-gradient(ellipse at 62% 88%, rgba(69, 94, 132, 0.28), transparent 22rem),
    linear-gradient(180deg, rgba(28, 29, 34, 0.98), rgba(12, 13, 17, 0.98)),
    #0d0e12;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 22px 62px rgba(0, 0, 0, 0.34);
  color: #f5f5f7;
}

.projects-filter-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 34%),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08), transparent 18rem),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 0 1px, transparent 1px 3rem),
    linear-gradient(rgba(255, 255, 255, 0.016) 0 1px, transparent 1px 3rem);
  opacity: 0.86;
}

.projects-filter-panel::after {
  content: "";
  position: absolute;
  right: 1rem;
  bottom: 0.85rem;
  z-index: -1;
  width: 9rem;
  height: 9rem;
  background:
    linear-gradient(45deg, transparent 0 44%, rgba(255, 69, 58, 0.2) 45% 55%, transparent 56%),
    linear-gradient(-45deg, transparent 0 44%, rgba(255, 69, 58, 0.14) 45% 55%, transparent 56%);
  background-size: 1.05rem 1.05rem;
  opacity: 0.45;
  transform: rotate(45deg);
}

.projects-filter-toolbar {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  background:
    linear-gradient(180deg, rgba(42, 42, 46, 0.78), rgba(28, 28, 31, 0.72));
  padding: 0.72rem 0.88rem;
}

.projects-filter-window-controls {
  display: flex;
  align-items: center;
  gap: 0.42rem;
  flex: 0 0 auto;
  min-width: 3.5rem;
}

.projects-filter-window-controls-image {
  display: block;
  width: 3.5rem;
  height: 1rem;
  object-fit: contain;
}

.projects-filter-window-controls span {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 999px;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}

.projects-filter-window-controls span:nth-child(1) {
  background: #ff5f57;
}

.projects-filter-window-controls span:nth-child(2) {
  background: #febc2e;
}

.projects-filter-window-controls span:nth-child(3) {
  background: #28c840;
}

.projects-filter-pathbar {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.46rem;
  border: 1px solid rgba(48, 54, 61, 0.9);
  border-radius: 8px;
  background: rgba(8, 8, 10, 0.64);
  color: rgba(245, 245, 247, 0.62);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  padding: 0.38rem 0.58rem;
}

.projects-filter-pathbar span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-filter-toolbar-folder {
  width: 1.18rem;
  height: 1.18rem;
  flex: 0 0 auto;
  object-fit: contain;
  filter: drop-shadow(0 0.12rem 0.22rem rgba(0, 0, 0, 0.32));
}

.projects-filter-toolbar-folder-fallback {
  position: relative;
  width: 1rem;
  height: 0.72rem;
  flex: 0 0 auto;
  border-radius: 0.15rem 0.18rem 0.18rem;
  background: linear-gradient(180deg, #78bfff, #2f81f7);
}

.projects-filter-toolbar-folder-fallback::before {
  content: "";
  position: absolute;
  left: 0;
  top: -0.16rem;
  width: 0.52rem;
  height: 0.28rem;
  border-radius: 0.16rem 0.16rem 0 0;
  background: #96d0ff;
}

.projects-filter-toolbar-count {
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(245, 245, 247, 0.06);
  color: rgba(245, 245, 247, 0.82);
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.28rem 0.55rem;
}

.projects-filter-body {
  display: grid;
  gap: 1.2rem;
  justify-items: center;
  padding: 1.45rem 1.15rem 1.55rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 64%);
}

.projects-filter-intro {
  min-width: 0;
  max-width: 35rem;
  text-align: center;
}

.projects-filter-intro p {
  color: rgba(245, 245, 247, 0.62);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.projects-filter-intro strong {
  display: block;
  margin-top: 0.28rem;
  color: #f5f5f7;
  font-size: 1.85rem;
  font-weight: 900;
  line-height: 1.15;
}

.projects-filter-intro span {
  display: block;
  max-width: 38rem;
  margin-top: 0.5rem;
  color: rgba(245, 245, 247, 0.64);
  font-size: 0.86rem;
  line-height: 1.55;
}

.projects-filter-dock {
  display: grid;
  min-width: 0;
  width: min(100%, 36rem);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  justify-self: center;
  gap: 0.42rem;
}

.projects-filter-dock-item {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.52rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0);
  color: rgba(245, 245, 247, 0.86);
  padding: 0.9rem 0.55rem 0.78rem;
  text-align: center;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.projects-filter-dock-item:hover {
  border-color: transparent;
  background: transparent;
  color: #f5f5f7;
  transform: translateY(-4px);
}

.projects-filter-dock-item-active {
  border-color: transparent;
  background: transparent;
  color: #f5f5f7;
}

.projects-filter-dock-item-active::after {
  content: "";
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 999px;
  background: #f0f6fc;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.6);
}

.projects-filter-dock-item:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
}

.projects-filter-folder-frame {
  display: flex;
  width: 5.05rem;
  height: 5.05rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition:
    filter 180ms ease,
    transform 180ms ease;
}

.projects-filter-folder-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter:
    drop-shadow(0 0.52rem 0.82rem rgba(0, 0, 0, 0.34))
    drop-shadow(0 0.12rem 0.34rem rgba(88, 166, 255, 0.18));
}

.projects-filter-folder {
  position: relative;
  width: 4.95rem;
  height: 3.48rem;
  flex: 0 0 auto;
  border-radius: 0.52rem 0.68rem 0.76rem 0.76rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.42), transparent 34%),
    linear-gradient(180deg, #7ed4ff 0%, #4aa8ff 48%, #176dd8 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.22),
    inset 0 -0.55rem 0 rgba(0, 79, 180, 0.16),
    0 0.72rem 1.2rem rgba(13, 95, 214, 0.32),
    0 1.1rem 2.1rem rgba(0, 0, 0, 0.28);
  transition:
    filter 180ms ease,
    transform 180ms ease;
}

.projects-filter-folder::before {
  content: "";
  position: absolute;
  left: 0.05rem;
  top: -0.5rem;
  width: 2.18rem;
  height: 0.92rem;
  border-radius: 0.5rem 0.5rem 0.14rem 0.14rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.38), transparent 42%),
    linear-gradient(180deg, #a1e0ff, #55b2ff);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0.42rem 0.44rem 0 -0.28rem #5bb7ff;
}

.projects-filter-folder::after {
  content: "";
  position: absolute;
  inset: 0.58rem 0.62rem auto;
  height: 0.38rem;
  border-radius: 999px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.08));
  box-shadow: 0 1.4rem 0 -0.22rem rgba(255, 255, 255, 0.1);
}

.projects-filter-dock-item:hover .projects-filter-folder,
.projects-filter-dock-item-active .projects-filter-folder,
.projects-filter-dock-item:hover .projects-filter-folder-frame,
.projects-filter-dock-item-active .projects-filter-folder-frame {
  filter: saturate(1.1) brightness(1.06);
  transform: scale(1.08);
}

.projects-filter-dock-item-active .projects-filter-folder {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.26),
    inset 0 -0.55rem 0 rgba(0, 79, 180, 0.16),
    0 0.72rem 1.2rem rgba(13, 95, 214, 0.34),
    0 0 2rem rgba(68, 147, 248, 0.34),
    0 1.1rem 2.1rem rgba(0, 0, 0, 0.28);
}

.projects-filter-dock-item-active .projects-filter-folder-image {
  filter:
    drop-shadow(0 0.62rem 0.95rem rgba(0, 0, 0, 0.36))
    drop-shadow(0 0 1.25rem rgba(88, 166, 255, 0.38));
}

.projects-filter-dock-copy,
.projects-filter-dock-copy small,
.projects-filter-dock-copy strong {
  display: block;
  min-width: 0;
  max-width: 100%;
}

.projects-filter-dock-copy strong {
  display: block;
  overflow: visible;
  min-height: 0.8rem;
  color: inherit;
  font-size: 0.68rem;
  font-weight: 850;
  line-height: 1.15;
  white-space: nowrap;
}

.projects-filter-dock-copy small {
  margin-top: 0.12rem;
  color: rgba(245, 245, 247, 0.55);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.62rem;
  font-weight: 800;
  line-height: 1.1;
}

.projects-filter-dock-item-active .projects-filter-dock-copy small {
  color: #6bb8ff;
}

.projects-markets {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.62rem;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018)),
    rgba(8, 8, 10, 0.58);
  padding: 0.58rem 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.projects-markets-heading {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.4rem;
}

.projects-markets-heading strong {
  color: rgba(245, 245, 247, 0.88);
  font-size: 0.68rem;
}

.projects-markets-heading code {
  color: rgba(245, 245, 247, 0.5);
  font-size: 0.64rem;
}

.projects-markets-status-dot {
  width: 0.48rem;
  height: 0.48rem;
  flex: 0 0 0.48rem;
  border-radius: 999px;
  background: #28c840;
  box-shadow:
    0 0 0 3px rgba(40, 200, 64, 0.12),
    0 0 18px rgba(40, 200, 64, 0.28);
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
  gap: 0.36rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(245, 245, 247, 0.72);
  padding: 0.2rem 0.46rem 0.2rem 0.24rem;
}

.projects-market-country strong {
  font-size: 0.61rem;
  font-weight: 800;
  white-space: nowrap;
}

.projects-market-flag {
  width: 1.25rem;
  height: 0.8rem;
  flex: 0 0 auto;
  border-radius: 999px;
  object-fit: contain;
  filter: saturate(0.9);
}

.projects-market-emoji {
  width: 1.25rem;
  font-size: 0.8rem;
  text-align: center;
}

.projects-markets-count {
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(245, 245, 247, 0.6);
  font-size: 0.58rem;
  font-weight: 900;
  padding: 0.24rem 0.5rem;
}

@media (min-width: 1024px) {
  .projects-filter-body {
    grid-template-columns: minmax(14rem, 0.55fr) minmax(0, 1fr);
    align-items: center;
    justify-items: stretch;
    gap: 1rem;
    padding: 1rem 1.15rem 1.1rem;
  }

  .projects-filter-intro {
    text-align: left;
  }

  .projects-filter-intro strong {
    font-size: 1.45rem;
  }

  .projects-filter-intro span {
    font-size: 0.78rem;
  }

  .projects-filter-dock {
    width: min(100%, 30rem);
    gap: 0.22rem;
  }

  .projects-filter-dock-item {
    padding: 0.62rem 0.32rem 0.52rem;
  }

  .projects-filter-folder {
    width: 4.1rem;
    height: 2.9rem;
  }

  .projects-filter-folder-frame {
    width: 4.55rem;
    height: 4.55rem;
  }

  .projects-filter-folder::before {
    left: 0.04rem;
    top: -0.42rem;
    width: 1.8rem;
    height: 0.78rem;
  }

  .projects-filter-folder::after {
    inset: 0.48rem 0.52rem auto;
    height: 0.32rem;
  }

}

@media (max-width: 639px) {
  .projects-filter-toolbar {
    flex-wrap: wrap;
    gap: 0.58rem;
  }

  .projects-filter-pathbar {
    order: 3;
    flex-basis: 100%;
    font-size: 0.62rem;
  }

  .projects-filter-toolbar-count {
    margin-left: auto;
  }

  .projects-filter-body {
    gap: 0.8rem;
    padding: 0.8rem;
  }

  .projects-filter-intro strong {
    font-size: 1.42rem;
  }

  .projects-filter-dock {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .projects-filter-dock-item {
    padding: 0.72rem 0.35rem 0.62rem;
  }

  .projects-filter-folder {
    width: 3.45rem;
    height: 2.46rem;
  }

  .projects-filter-folder-frame {
    width: 4.05rem;
    height: 4.05rem;
  }

  .projects-filter-folder::before {
    left: 0.04rem;
    top: -0.34rem;
    width: 1.5rem;
    height: 0.64rem;
  }

  .projects-filter-folder::after {
    inset: 0.42rem 0.48rem auto;
    height: 0.28rem;
  }

  .projects-filter-dock-copy strong {
    font-size: 0.62rem;
  }

  .projects-filter-dock-copy small {
    font-size: 0.56rem;
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

  .projects-filter-toolbar {
    padding: 0.86rem 1rem;
  }

  .projects-filter-body {
    gap: 1.45rem;
    padding: 1.65rem 1.45rem 1.8rem;
  }

  .projects-filter-intro strong {
    font-size: 1.7rem;
  }

  .projects-filter-dock {
    width: min(100%, 34rem);
    gap: 0.3rem;
  }

  .projects-filter-folder {
    width: 4.75rem;
    height: 3.35rem;
  }

  .projects-filter-folder-frame {
    width: 5.45rem;
    height: 5.45rem;
  }

  .projects-filter-dock-copy strong {
    font-size: 0.74rem;
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
