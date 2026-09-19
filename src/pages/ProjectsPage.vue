<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { cyberSecurityProject, desktopProjects, mobileProjects } from '@/data/projects'
import { publicAssetUrl, resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import { projectClientCountriesForLocale, projectClientCountryForTitle } from '@/utils/projectClientCountry'
import AntiAIBanner from '@/components/AntiAIBanner.vue'
import ProjectImageLightbox from '@/components/ProjectImageLightbox.vue'
import ProjectTicketCard from '@/components/ProjectTicketCard.vue'
import SecurityBoard from '@/components/security/SecurityBoard.vue'
import SecurityResearchCard from '@/components/security/SecurityResearchCard.vue'
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

const cybersecurityProjectMeta = new Map<
  string,
  {
    /** Ссылки на публикации: несколько частей одной статьи тоже поддерживаются. */
    articleLinks?: { url: string; labelKey: string }[]
    /** Ключ служебной пометки, например про архивную публикацию. */
    noticeKey?: string
    technologies: string[]
  }
>([
  [
    'Кража учетных данных браузеров c помощью Raspberry Pi Zero W',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/resources/krazha-uchetnykh-dannykh-brauzerov-c-pomoshch-yu-raspberry-pi-zero-w-chast-1.349/',
          labelKey: 'projects.articleLinks.part1',
        },
        {
          url: 'https://codeby.net/resources/krazha-uchetnykh-dannykh-s-brauzerov-pomoshch-yu-raspberry-pi-zero-w-chast-2-podgotovka.351/',
          labelKey: 'projects.articleLinks.part2',
        },
      ],
      technologies: ['Raspberry Pi Zero W', 'USB HID', 'Browser security', 'Lab research'],
    },
  ],
  [
    'Получаем доступ к аккаунтам Meest Express',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/threads/poluchaem-dostup-k-akkauntam-meest-express-moja-pervaja-najdennaja-ujazvimost.70233/',
          labelKey: 'projects.articleLinks.read',
        },
      ],
      technologies: ['Authorization logic', 'Web security', 'Bug bounty', 'Account access'],
    },
  ],
  [
    'Определяем кто дома с помощью ESP8266',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/threads/opredelyayem-kto-doma-s-pomoshch-yu-esp8266.66662/',
          labelKey: 'projects.articleLinks.read',
        },
      ],
      technologies: ['ESP8266', 'Wi-Fi signals', 'IoT security', 'Presence detection'],
    },
  ],
  [
    'Детектор деаутентификации (диссоциации) клиентов.',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/threads/detektor-deautentifikatsii-dissotsiatsii-kliyentov-chast-1.66349/',
          labelKey: 'projects.articleLinks.part1',
        },
        {
          url: 'https://codeby.net/threads/detektor-deautentifikatsii-dissotsiatsii-kliyentov-chast-2.66382/',
          labelKey: 'projects.articleLinks.part2',
        },
      ],
      technologies: ['Wi-Fi security', 'Deauth detection', '802.11', 'Monitoring'],
    },
  ],
  [
    'Пишем свой сигнатурный антивирус на C# (YARA)',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/threads/pishem-svoi-signaturnyi-antivirus-na-c-chast-1-nebol-shoi-ekskurs-v-yara.66414/',
          labelKey: 'projects.articleLinks.part1',
        },
        {
          url: 'https://codeby.net/threads/pishem-svoi-signaturnyi-antivirus-na-c-chast-2-pishem-yara-pravila.66453/',
          labelKey: 'projects.articleLinks.part2',
        },
      ],
      technologies: ['C#', 'YARA', 'Signature scanning', 'Malware detection'],
    },
  ],
  [
    'Пишем RMS-Троян (Hellion)',
    {
      articleLinks: [
        {
          url: 'https://codeby.net/threads/rms-hellion-telegram.65938/',
          labelKey: 'projects.articleLinks.archived',
        },
      ],
      noticeKey: 'projects.notices.archivedArticle',
      technologies: ['C#', 'RMS research', 'Remote control', 'Defensive analysis'],
    },
  ],
  [
    'Закрытый OSINT-инструмент для поиска цифрового следа',
    {
      technologies: ['Python', 'OSINT', 'Automation', 'Data aggregation'],
    },
  ],
])

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
const filterViewMode = ref<'icons' | 'list'>('icons')
const showAntiAIBanner = false

const isLightboxOpen = ref(false)
const lightboxProjectId = ref<string | null>(null)
const lightboxIndex = ref(0)
const infoProjectId = ref<string | null>(null)

function selectCategory(category: ProjectCategory) {
  const scrollY = typeof window === 'undefined' ? 0 : window.scrollY
  activeCategory.value = category

  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => window.scrollTo({ top: scrollY }))
  }
}

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
  cybersecurity: cyberSecurityProject.map((project) => {
    const meta = cybersecurityProjectMeta.get(project.title)
    const articleLinks: StoreLink[] = (meta?.articleLinks ?? []).map((link) => ({
      type: 'website',
      url: link.url,
      label: t(link.labelKey),
    }))

    return {
      id: `cyber-${project.id}-${project.title}`,
      category: 'cybersecurity',
      eyebrow: locale.value.startsWith('ru') ? 'Исследование' : 'Security research',
      title: project.title,
      description: getProjectDescription(t, project.title, project.description || t('projects.fallbackDescription')),
      technologies: meta?.technologies ?? [],
      iconUrl: resolveAssetUrl(project.imagePath),
      galleryUrls: resolveAssetUrls(project.imagePath ? [project.imagePath] : []),
      storeLinks: articleLinks,
      notice: meta?.noticeKey ? t(meta.noticeKey) : undefined,
    }
  }),
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
const activePreviewProject = computed<ProjectCard | null>(() => visibleProjects.value[0] ?? null)
const activePreviewTechnologies = computed(() => {
  const technologies = new Set<string>()

  visibleProjects.value.slice(0, 8).forEach((project) => {
    project.technologies.forEach((technology) => {
      const normalizedTechnology = technology.trim()
      if (normalizedTechnology) technologies.add(normalizedTechnology)
    })
  })

  return Array.from(technologies).slice(0, 6)
})
const activePreviewGalleryCount = computed(() =>
  visibleProjects.value.reduce((total, project) => total + project.galleryUrls.length, 0),
)
const activePreviewStoreCount = computed(() =>
  visibleProjects.value.reduce((total, project) => total + project.storeLinks.length, 0),
)
const activePathSegments = computed(() => [
  'bagmet',
  locale.value.startsWith('ru') ? 'Проекты' : 'Projects',
  activeCategoryLabel.value,
])
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

            <div class="projects-filter-toolbar-nav" aria-hidden="true">
              <span class="projects-filter-chevron projects-filter-chevron-left"></span>
              <span class="projects-filter-toolbar-divider"></span>
              <span class="projects-filter-chevron projects-filter-chevron-right"></span>
            </div>

            <div class="projects-filter-pathbar" aria-hidden="true">
              <img
                v-if="finderFolderIconUrl"
                :src="finderFolderIconUrl"
                alt=""
                class="projects-filter-toolbar-folder"
              >
              <span v-else class="projects-filter-toolbar-folder-fallback" aria-hidden="true"></span>
              <span>projects library / {{ activeCategoryLabel }}</span>
            </div>

            <div class="projects-filter-toolbar-actions">
              <button
                type="button"
                class="projects-filter-icon-button projects-filter-icon-grid"
                :class="{ 'projects-filter-icon-button-active': filterViewMode === 'icons' }"
                :aria-label="locale.startsWith('ru') ? 'Вид значками' : 'Icon view'"
                :aria-pressed="filterViewMode === 'icons'"
                @click="filterViewMode = 'icons'"
              >
                <i></i><i></i><i></i><i></i>
              </button>
              <button
                type="button"
                class="projects-filter-icon-button projects-filter-icon-list"
                :class="{ 'projects-filter-icon-button-active': filterViewMode === 'list' }"
                :aria-label="locale.startsWith('ru') ? 'Вид списком' : 'List view'"
                :aria-pressed="filterViewMode === 'list'"
                @click="filterViewMode = 'list'"
              >
                <i></i><i></i><i></i>
              </button>
            </div>
          </div>

          <div class="projects-filter-body">
            <div class="projects-filter-content">
              <div class="projects-filter-browser">
                <div class="projects-filter-content-head">
                  <div class="projects-filter-intro">
                    <p>{{ locale.startsWith('ru') ? 'Библиотека проектов' : 'Projects Library' }}</p>
                    <strong>{{ activeCategoryLabel }}</strong>
                    <span>{{ activeCategoryMeta.description }}</span>
                  </div>
                  <strong class="projects-filter-toolbar-count">
                    {{ categoryCounts[activeCategory] }}
                    {{ locale.startsWith('ru') ? 'проектов' : 'projects' }}
                  </strong>
                </div>

                <div class="projects-filter-pathline" aria-label="Project path">
                  <span
                    v-for="(segment, index) in activePathSegments"
                    :key="`${segment}-${index}`"
                    :class="{ 'projects-filter-pathline-current': index === activePathSegments.length - 1 }"
                  >
                    {{ segment }}
                  </span>
                </div>

                <div
                  class="projects-filter-dock"
                  :class="{ 'projects-filter-dock-list': filterViewMode === 'list' }"
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
                    @mousedown.prevent
                    @click="selectCategory(category.key)"
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

              <aside class="projects-filter-preview" :aria-label="locale.startsWith('ru') ? 'Сведения о категории' : 'Category info'">
                <div class="projects-filter-preview-visual" aria-hidden="true">
                  <span class="projects-filter-preview-folder-frame">
                    <img
                      v-if="finderFolderIconUrl"
                      :src="finderFolderIconUrl"
                      alt=""
                      class="projects-filter-preview-folder-image"
                    >
                    <span
                      v-else
                      class="projects-filter-folder projects-filter-preview-folder-fallback"
                    ></span>
                  </span>
                </div>

                <p class="projects-filter-preview-kicker">{{ locale.startsWith('ru') ? 'Сведения' : 'Info' }}</p>
                <strong class="projects-filter-preview-title">{{ activeCategoryLabel }}</strong>

                <dl class="projects-filter-preview-stats">
                  <div>
                    <dt>{{ locale.startsWith('ru') ? 'Проекты' : 'Projects' }}</dt>
                    <dd>{{ categoryCounts[activeCategory] }}</dd>
                  </div>
                  <div>
                    <dt>{{ locale.startsWith('ru') ? 'Снимки' : 'Shots' }}</dt>
                    <dd>{{ activePreviewGalleryCount }}</dd>
                  </div>
                  <div>
                    <dt>{{ locale.startsWith('ru') ? 'Ссылки' : 'Links' }}</dt>
                    <dd>{{ activePreviewStoreCount }}</dd>
                  </div>
                </dl>

                <div v-if="activePreviewProject" class="projects-filter-preview-featured">
                  <span>{{ locale.startsWith('ru') ? 'Первый в списке' : 'First item' }}</span>
                  <strong>{{ activePreviewProject.title }}</strong>
                </div>

                <div v-if="activePreviewTechnologies.length" class="projects-filter-preview-tags">
                  <span
                    v-for="technology in activePreviewTechnologies"
                    :key="technology"
                  >
                    {{ technology }}
                  </span>
                </div>
              </aside>
            </div>
          </div>

          <div class="projects-markets">
            <div class="projects-markets-heading">
              <span class="projects-markets-status-dot"></span>
              <strong>{{ locale.startsWith('ru') ? 'География' : 'Markets' }}</strong>
              <code>{{ locale.startsWith('ru') ? 'релизы:' : 'deployments:' }}</code>
            </div>
            <div class="projects-markets-selection">
              <span>{{ locale.startsWith('ru') ? 'Выбрано' : 'Selected' }}</span>
              <strong>{{ activeCategoryLabel }}</strong>
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
      </div>

      <SecurityBoard
        v-if="isCybersecurityCategory"
        class="relative z-10 mt-8"
        :research-count="visibleProjects.length"
      >
        <SecurityResearchCard
          v-for="(project, index) in visibleProjects"
          :key="project.id"
          :project="project"
          :index="index"
          :open-lightbox="openLightbox"
        />
      </SecurityBoard>

      <section
        v-else
        class="relative z-10 mt-8 grid gap-4 lg:grid-cols-2 lg:grid-flow-dense lg:items-start"
      >
        <ProjectTicketCard v-for="project in visibleProjects" :key="project.id" :project="project"
          :class="[
            fullWidthProjectTitles.has(project.title) ? 'lg:col-span-2' : '',
            project.id === 'mobile-insentry-raw-decoder' ? 'lg:col-span-2' : '',
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
  border: 0;
  background: transparent;
  box-shadow: none;
}

.projects-filter-panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  margin-top: 0;
  min-height: 23rem;
  border: 1px solid rgba(154, 170, 184, 0.22);
  border-radius: 26px;
  background: #22272c;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  color: #e8edf2;
}

.projects-filter-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 8rem),
    radial-gradient(circle at 72% 12%, rgba(112, 131, 145, 0.14), transparent 18rem);
  opacity: 1;
}

.projects-filter-panel::after {
  content: none;
}

.projects-filter-toolbar {
  display: flex;
  align-items: center;
  gap: 1.05rem;
  min-height: 4.65rem;
  border-bottom: 1px solid rgba(9, 12, 14, 0.18);
  background: linear-gradient(180deg, rgba(38, 45, 51, 0.98), rgba(33, 39, 45, 0.98));
  padding: 0 1.32rem;
}

.projects-filter-window-controls {
  display: flex;
  align-items: center;
  gap: 0.42rem;
  flex: 0 0 auto;
  width: 3.5rem;
  transform: translateY(-0.18rem);
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

.projects-filter-toolbar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.58rem;
  width: 5.05rem;
  height: 2.58rem;
  flex: 0 0 auto;
  border: 1px solid rgba(149, 164, 180, 0.16);
  border-radius: 999px;
  background: rgba(33, 40, 47, 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.05);
}

.projects-filter-chevron {
  display: block;
  width: 0.74rem;
  height: 0.74rem;
  border-top: 0.18rem solid rgba(239, 244, 249, 0.9);
  border-left: 0.18rem solid rgba(239, 244, 249, 0.9);
}

.projects-filter-chevron-left {
  transform: rotate(-45deg);
}

.projects-filter-chevron-right {
  border-color: rgba(239, 244, 249, 0.34);
  transform: rotate(135deg);
}

.projects-filter-toolbar-divider {
  width: 1px;
  height: 1.45rem;
  background: rgba(232, 237, 242, 0.13);
}

.projects-filter-pathbar {
  display: flex;
  min-width: 0;
  max-width: 36rem;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.62rem;
  height: 2.58rem;
  border: 1px solid rgba(149, 164, 180, 0.2);
  border-radius: 0.7rem;
  background: rgba(13, 16, 20, 0.62);
  color: rgba(235, 240, 245, 0.66);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  padding: 0 0.9rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    inset 0 -1px 0 rgba(0, 0, 0, 0.18);
}

.projects-filter-pathbar span:last-child {
  overflow: hidden;
  font-size: 0.9rem;
  font-weight: 820;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-filter-toolbar-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.22rem;
  margin-left: auto;
  border: 1px solid rgba(149, 164, 180, 0.16);
  border-radius: 999px;
  background: rgba(29, 35, 41, 0.62);
  padding: 0.18rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.projects-filter-icon-button {
  position: relative;
  display: grid;
  align-content: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(235, 240, 245, 0.78);
  box-shadow: none;
  transition:
    background 170ms ease,
    border-color 170ms ease,
    color 170ms ease,
    transform 170ms ease;
}

.projects-filter-icon-button:hover {
  background: rgba(255, 255, 255, 0.075);
  color: #ffffff;
}

.projects-filter-icon-button:focus-visible {
  outline: 1px solid rgba(235, 240, 245, 0.34);
  outline-offset: 1px;
}

.projects-filter-icon-button-active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.projects-filter-icon-grid {
  grid-template-columns: repeat(2, 0.36rem);
  grid-template-rows: repeat(2, 0.36rem);
  gap: 0.18rem;
  align-content: center;
  justify-content: center;
}

.projects-filter-icon-grid i {
  display: block;
  border: 1.8px solid currentColor;
  border-radius: 0.1rem;
}

.projects-filter-icon-list {
  grid-template-columns: 0.92rem;
  grid-template-rows: repeat(3, 0.12rem);
  gap: 0.18rem;
  align-content: center;
  justify-content: center;
}

.projects-filter-icon-list i {
  display: block;
  border: 0;
  border-radius: 999px;
  background: currentColor;
}

.projects-filter-toolbar-folder {
  width: 1.18rem;
  height: 1.18rem;
  flex: 0 0 auto;
  object-fit: contain;
  filter: drop-shadow(0 0.08rem 0.12rem rgba(22, 93, 154, 0.18));
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
  border: 1px solid rgba(149, 164, 180, 0.16);
  border-radius: 999px;
  background: rgba(36, 43, 50, 0.76);
  color: rgba(232, 237, 242, 0.78);
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.36rem 0.62rem;
}

.projects-filter-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
  min-height: 17rem;
  background: #22272c;
}

.projects-filter-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-width: 0;
  background:
    radial-gradient(circle at 82% 8%, rgba(255, 255, 255, 0.045), transparent 18rem),
    #22272c;
}

.projects-filter-browser {
  min-width: 0;
}

.projects-filter-content-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  min-height: 6.35rem;
  padding: 1.05rem 1.45rem 0;
}

.projects-filter-intro {
  min-width: 0;
  max-width: 42rem;
  border-bottom: 0;
  background: transparent;
  padding: 0;
  text-align: left;
}

.projects-filter-intro p {
  color: rgba(235, 240, 245, 0.48);
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.projects-filter-intro strong {
  display: block;
  margin-top: 0.22rem;
  color: rgba(247, 250, 253, 0.96);
  font-size: 1.12rem;
  font-weight: 900;
  line-height: 1.15;
}

.projects-filter-intro span {
  display: block;
  max-width: 42rem;
  min-height: 2.25rem;
  margin-top: 0.32rem;
  color: rgba(232, 237, 242, 0.58);
  font-size: 0.76rem;
  line-height: 1.45;
}

.projects-filter-pathline {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0;
  margin: 0 1.45rem;
  border-top: 1px solid rgba(235, 240, 245, 0.055);
  border-bottom: 1px solid rgba(9, 12, 14, 0.12);
  color: rgba(235, 240, 245, 0.46);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.63rem;
  font-weight: 820;
  overflow: hidden;
  padding: 0.42rem 0;
  white-space: nowrap;
}

.projects-filter-pathline span {
  display: inline-flex;
  min-width: 0;
  align-items: center;
}

.projects-filter-pathline span + span::before {
  content: "";
  width: 0.34rem;
  height: 0.34rem;
  margin: 0 0.5rem;
  border-top: 2px solid rgba(235, 240, 245, 0.22);
  border-right: 2px solid rgba(235, 240, 245, 0.22);
  transform: rotate(45deg);
}

.projects-filter-pathline-current {
  overflow: hidden;
  color: rgba(247, 250, 253, 0.78);
  text-overflow: ellipsis;
}

.projects-filter-dock {
  display: grid;
  min-width: 0;
  width: auto;
  grid-template-columns: repeat(4, 8.5rem);
  gap: 1.35rem 1.3rem;
  align-content: start;
  justify-content: start;
  padding: 0.95rem 1.55rem 2.35rem;
  background: transparent;
}

.projects-filter-dock-list {
  grid-template-columns: minmax(0, 1fr);
  gap: 0.16rem;
  padding-top: 0.72rem;
  padding-right: 1.18rem;
}

.projects-filter-dock-item {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.54rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: rgba(236, 241, 246, 0.84);
  padding: 0;
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
  color: #ffffff;
  transform: translateY(-2px);
}

.projects-filter-dock-item-active {
  border-color: transparent;
  background: transparent;
  color: #ffffff;
}

.projects-filter-dock-item-active::after {
  content: none;
}

.projects-filter-dock-item:focus-visible {
  outline: 2px solid rgba(0, 122, 255, 0.8);
  outline-offset: 2px;
}

.projects-filter-dock-list .projects-filter-dock-item {
  grid-template-columns: 2.35rem minmax(0, 1fr) auto;
  justify-items: stretch;
  align-items: center;
  gap: 0.72rem;
  width: 100%;
  min-height: 2.7rem;
  border-radius: 0.42rem;
  padding: 0.16rem 0.56rem;
  text-align: left;
}

.projects-filter-dock-list .projects-filter-dock-item:hover {
  background: rgba(255, 255, 255, 0.045);
  transform: none;
}

.projects-filter-dock-list .projects-filter-dock-item-active {
  background: rgba(10, 132, 255, 0.92);
}

.projects-filter-folder-frame {
  display: flex;
  width: 5.7rem;
  height: 5rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
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
    drop-shadow(0 0.45rem 0.5rem rgba(0, 0, 0, 0.28))
    drop-shadow(0 0.1rem 0.22rem rgba(47, 154, 215, 0.2));
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
  filter: saturate(1.05) brightness(1.04);
  transform: scale(1.03);
}

.projects-filter-dock-list .projects-filter-folder-frame,
.projects-filter-dock-list .projects-filter-dock-item:hover .projects-filter-folder-frame,
.projects-filter-dock-list .projects-filter-dock-item-active .projects-filter-folder-frame {
  width: 2.3rem;
  height: 2rem;
  justify-self: start;
  transform: none;
}

.projects-filter-dock-list .projects-filter-folder-image {
  filter:
    drop-shadow(0 0.18rem 0.22rem rgba(0, 0, 0, 0.26))
    drop-shadow(0 0.08rem 0.16rem rgba(47, 154, 215, 0.18));
}

.projects-filter-dock-list .projects-filter-folder {
  width: 2.05rem;
  height: 1.45rem;
}

.projects-filter-dock-list .projects-filter-folder::before {
  top: -0.22rem;
  width: 0.9rem;
  height: 0.42rem;
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
    drop-shadow(0 0.48rem 0.54rem rgba(0, 0, 0, 0.3))
    drop-shadow(0 0 0.8rem rgba(66, 174, 232, 0.22));
}

.projects-filter-dock-copy,
.projects-filter-dock-copy small,
.projects-filter-dock-copy strong {
  display: block;
  min-width: 0;
  max-width: 100%;
}

.projects-filter-dock-copy {
  width: 100%;
}

.projects-filter-dock-list .projects-filter-dock-copy {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
}

.projects-filter-dock-copy strong {
  display: block;
  overflow: visible;
  min-height: 0.8rem;
  max-width: 8.5rem;
  color: inherit;
  font-size: 0.74rem;
  font-weight: 850;
  line-height: 1.15;
  text-overflow: clip;
  white-space: normal;
}

.projects-filter-dock-list .projects-filter-dock-copy strong {
  overflow: hidden;
  max-width: none;
  min-height: 0;
  font-size: 0.78rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-filter-dock-item-active .projects-filter-dock-copy strong {
  border-radius: 0.24rem;
  background: #0a84ff;
  color: #ffffff;
  padding: 0.1rem 0.28rem 0.12rem;
}

.projects-filter-dock-list .projects-filter-dock-item-active .projects-filter-dock-copy strong {
  background: transparent;
  padding: 0;
}

.projects-filter-dock-copy small {
  margin-top: 0.2rem;
  color: rgba(236, 241, 246, 0.52);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.62rem;
  font-weight: 800;
  line-height: 1.1;
}

.projects-filter-dock-list .projects-filter-dock-copy small {
  margin-top: 0;
  justify-self: end;
  color: rgba(236, 241, 246, 0.56);
}

.projects-filter-dock-item-active .projects-filter-dock-copy small {
  color: rgba(236, 241, 246, 0.76);
}

.projects-filter-dock-list .projects-filter-dock-item-active .projects-filter-dock-copy small {
  color: rgba(255, 255, 255, 0.82);
}

.projects-filter-preview {
  display: none;
  min-width: 0;
  min-height: 0;
  border-left: 1px solid rgba(149, 164, 180, 0.14);
  background:
    linear-gradient(180deg, rgba(30, 36, 41, 0.58), rgba(27, 32, 37, 0.44)),
    rgba(24, 29, 34, 0.72);
  overflow: hidden;
  padding: 1rem 1rem 1.2rem;
}

.projects-filter-preview-visual {
  display: grid;
  min-height: 5.75rem;
  place-items: center;
}

.projects-filter-preview-folder-frame {
  display: flex;
  width: 5.45rem;
  height: 4.8rem;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0.55rem 0.7rem rgba(0, 0, 0, 0.32));
}

.projects-filter-preview-folder-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter:
    drop-shadow(0 0.16rem 0.16rem rgba(255, 255, 255, 0.12))
    drop-shadow(0 0 0.85rem rgba(66, 174, 232, 0.12));
}

.projects-filter-preview-folder-fallback {
  width: 4.5rem;
  height: 3.18rem;
}

.projects-filter-preview-kicker {
  margin: 0.25rem 0 0;
  color: rgba(235, 240, 245, 0.42);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

.projects-filter-preview-title {
  display: block;
  overflow: hidden;
  margin-top: 0.28rem;
  color: rgba(247, 250, 253, 0.94);
  font-size: 0.92rem;
  font-weight: 900;
  line-height: 1.18;
  text-align: center;
  text-overflow: ellipsis;
}

.projects-filter-preview-stats {
  display: grid;
  gap: 0;
  margin: 1rem 0 0;
  border-top: 1px solid rgba(235, 240, 245, 0.08);
}

.projects-filter-preview-stats div {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(235, 240, 245, 0.08);
  padding: 0.48rem 0;
}

.projects-filter-preview-stats dt,
.projects-filter-preview-stats dd {
  margin: 0;
}

.projects-filter-preview-stats dt {
  overflow: hidden;
  color: rgba(235, 240, 245, 0.48);
  font-size: 0.68rem;
  font-weight: 780;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-filter-preview-stats dd {
  color: rgba(247, 250, 253, 0.88);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 900;
}

.projects-filter-preview-featured {
  min-width: 0;
  margin-top: 1rem;
}

.projects-filter-preview-featured span {
  display: block;
  color: rgba(235, 240, 245, 0.42);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.projects-filter-preview-featured strong {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 0.28rem;
  color: rgba(247, 250, 253, 0.9);
  font-size: 0.78rem;
  font-weight: 850;
  line-height: 1.25;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.projects-filter-preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.36rem;
  max-height: 4.05rem;
  margin-top: 0.9rem;
  overflow: hidden;
}

.projects-filter-preview-tags span {
  max-width: 100%;
  overflow: hidden;
  border: 1px solid rgba(149, 164, 180, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(235, 240, 245, 0.66);
  font-size: 0.6rem;
  font-weight: 800;
  line-height: 1.1;
  padding: 0.24rem 0.42rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-markets {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.62rem;
  border-top: 1px solid rgba(149, 164, 180, 0.14);
  background: linear-gradient(180deg, #242b31, #20262c);
  padding: 0.78rem 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.projects-markets-heading {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.4rem;
}

.projects-markets-heading strong {
  color: rgba(235, 240, 245, 0.76);
  font-size: 0.68rem;
}

.projects-markets-heading code {
  color: rgba(235, 240, 245, 0.42);
  font-size: 0.64rem;
}

.projects-markets-selection {
  display: flex;
  min-width: 0;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.34rem;
  border-left: 1px solid rgba(235, 240, 245, 0.08);
  color: rgba(235, 240, 245, 0.46);
  padding-left: 0.62rem;
}

.projects-markets-selection span {
  font-size: 0.6rem;
  font-weight: 850;
}

.projects-markets-selection strong {
  overflow: hidden;
  max-width: 8.5rem;
  color: rgba(235, 240, 245, 0.72);
  font-size: 0.62rem;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border: 1px solid rgba(149, 164, 180, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(235, 240, 245, 0.72);
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
  border-radius: 0.18rem;
  object-fit: contain;
  filter: saturate(0.96);
}

.projects-market-emoji {
  width: 1.25rem;
  font-size: 0.8rem;
  text-align: center;
}

.projects-markets-count {
  flex: 0 0 auto;
  border: 1px solid rgba(149, 164, 180, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(235, 240, 245, 0.52);
  font-size: 0.58rem;
  font-weight: 900;
  padding: 0.24rem 0.5rem;
}

@media (min-width: 1280px) {
  .projects-filter-content {
    grid-template-columns: minmax(0, 1fr) 16.5rem;
    height: 24.7rem;
  }

  .projects-filter-preview {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 1024px) {
  .projects-filter-body {
    min-height: 18rem;
  }

  .projects-filter-intro strong {
    font-size: 1.2rem;
  }

  .projects-filter-intro span {
    font-size: 0.78rem;
  }

  .projects-filter-dock {
    grid-template-columns: repeat(4, 8.5rem);
    gap: 1.35rem 1.3rem;
    padding: 0.95rem 1.55rem 2.35rem;
  }

  .projects-filter-dock-list {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.16rem;
    padding-top: 0.72rem;
    padding-right: 1.18rem;
  }

  .projects-filter-dock-item {
    padding: 0;
  }

  .projects-filter-folder {
    width: 4.1rem;
    height: 2.9rem;
  }

  .projects-filter-folder-frame {
    width: 5.7rem;
    height: 5rem;
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

@media (max-width: 1023px) {
  .projects-filter-toolbar {
    gap: 0.72rem;
  }

  .projects-filter-toolbar-actions {
    gap: 0.42rem;
  }

  .projects-filter-body {
    grid-template-columns: 13.5rem minmax(0, 1fr);
  }

  .projects-filter-content-head {
    padding: 0.95rem 1rem 0;
  }

  .projects-filter-pathline {
    margin-inline: 1rem;
  }

  .projects-filter-dock {
    grid-template-columns: repeat(2, 7.1rem);
    gap: 1.1rem 1.25rem;
    padding: 1.1rem 1rem 1.45rem;
  }

  .projects-filter-dock-list {
    grid-template-columns: minmax(0, 1fr);
    padding-top: 0.75rem;
  }
}

@media (max-width: 639px) {
  .projects-review-shell {
    border-radius: 20px;
  }

  .projects-filter-panel {
    min-height: 0;
    border-radius: 20px;
  }

  .projects-filter-toolbar {
    flex-wrap: wrap;
    gap: 0.62rem;
    min-height: 0;
    padding: 0.82rem;
  }

  .projects-filter-window-controls {
    width: 3.5rem;
  }

  .projects-filter-window-controls-image {
    width: 3.5rem;
  }

  .projects-filter-toolbar-nav {
    width: 4.55rem;
    height: 2.35rem;
  }

  .projects-filter-pathbar {
    order: 3;
    flex-basis: 100%;
    max-width: none;
    height: 2.35rem;
  }

  .projects-filter-toolbar-actions {
    display: none;
  }

  .projects-filter-toolbar-count {
    align-self: flex-start;
  }

  .projects-filter-body {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .projects-filter-content-head {
    display: grid;
    padding: 0.82rem 0.82rem 0;
  }

  .projects-filter-intro strong {
    font-size: 1.08rem;
  }

  .projects-filter-intro span {
    font-size: 0.74rem;
  }

  .projects-filter-pathline {
    margin-inline: 0.82rem;
    font-size: 0.58rem;
  }

  .projects-filter-dock {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem 0.42rem;
    padding: 1rem 0.78rem 1.2rem;
  }

  .projects-filter-dock-item {
    padding: 0;
  }

  .projects-filter-folder {
    width: 3.45rem;
    height: 2.46rem;
  }

  .projects-filter-folder-frame {
    width: 4rem;
    height: 3.65rem;
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
    font-size: 0.68rem;
  }

  .projects-filter-dock-copy small {
    font-size: 0.56rem;
  }

  .projects-markets {
    gap: 0.5rem;
    padding-inline: 0.58rem;
  }

  .projects-markets-selection {
    display: none;
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
    padding: 0.85rem;
  }

  .projects-filter-toolbar {
    padding: 0 1.38rem;
  }

  .projects-filter-body {
    min-height: 19rem;
  }

  .projects-filter-intro strong {
    font-size: 1.28rem;
  }

  .projects-filter-dock {
    grid-template-columns: repeat(4, 9rem);
    gap: 1.55rem 1.45rem;
    padding: 1.08rem 1.7rem 2.55rem;
  }

  .projects-filter-dock-list {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.16rem;
    padding: 0.72rem 1.18rem 2.55rem 1.7rem;
  }

  .projects-filter-folder {
    width: 4.75rem;
    height: 3.35rem;
  }

  .projects-filter-folder-frame {
    width: 6rem;
    height: 5.25rem;
  }

  .projects-filter-dock-copy strong {
    font-size: 0.74rem;
  }

  .projects-markets {
    padding-block: 0.88rem;
  }

  .projects-markets-heading strong {
    font-size: 0.76rem;
  }

  .projects-market-country strong {
    font-size: 0.68rem;
  }
}
</style>
