<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { cyberSecurityProject, desktopProjects, mobileProjects } from '@/data/projects'
import { publicAssetUrl, resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import LegalNoticeBanner from '@/components/LegalNoticeBanner.vue'
import AntiAIBanner from '@/components/AntiAIBanner.vue'
import ProjectImageLightbox from '@/components/ProjectImageLightbox.vue'
import ProjectTicketCard from '@/components/ProjectTicketCard.vue'
import TeleprompterAutomaticInfoPage from '@/pages/project-details/TeleprompterAutomaticInfoPage.vue'
import MAlienInfoPage from '@/pages/project-details/MAlienInfoPage.vue'
import type { ProjectCard, ProjectCategory, StoreLink, StoreType } from '@/types/projectCard'

const { t, tm } = useI18n()
const categoryOptions: { key: ProjectCategory; labelKey: string }[] = [
  { key: 'mobile', labelKey: 'projects.categories.mobile' },
  { key: 'fullstack', labelKey: 'projects.categories.fullstack' },
  { key: 'desktop', labelKey: 'projects.categories.desktop' },
  { key: 'cybersecurity', labelKey: 'projects.categories.cybersecurity' },
]

const categoryMeta: Record<ProjectCategory, { eyebrowKey: string; descriptionKey: string }> = {
  mobile: {
    eyebrowKey: 'projects.categoryMeta.mobile.eyebrow',
    descriptionKey: 'projects.categoryMeta.mobile.description',
  },
  fullstack: {
    eyebrowKey: 'projects.categoryMeta.fullstack.eyebrow',
    descriptionKey: 'projects.categoryMeta.fullstack.description',
  },
  desktop: {
    eyebrowKey: 'projects.categoryMeta.desktop.eyebrow',
    descriptionKey: 'projects.categoryMeta.desktop.description',
  },
  cybersecurity: {
    eyebrowKey: 'projects.categoryMeta.cybersecurity.eyebrow',
    descriptionKey: 'projects.categoryMeta.cybersecurity.description',
  },
}

const categoryCardClasses: Record<ProjectCategory, string> = {
  mobile:
    'border-[#3E302A] bg-[#221A17]',
  fullstack:
    'border-[#26383D] bg-[#182124]',
  desktop:
    'border-[#334038] bg-[#1A201C]',
  cybersecurity:
    'border-[#432A24] bg-[#241917]',
}

const categoryCardActiveClasses: Record<ProjectCategory, string> = {
  mobile:
    'border-[#D96138]/50 bg-[#2A1C18] shadow-[0_12px_28px_rgba(217,97,56,0.16)]',
  fullstack:
    'border-[#006C7C]/50 bg-[#17272B] shadow-[0_12px_28px_rgba(0,108,124,0.16)]',
  desktop:
    'border-[#5F8171]/50 bg-[#1D2620] shadow-[0_12px_28px_rgba(95,129,113,0.16)]',
  cybersecurity:
    'border-[#AC3F2B]/50 bg-[#2B1B18] shadow-[0_12px_28px_rgba(172,63,43,0.16)]',
}

const categoryCountClasses: Record<ProjectCategory, string> = {
  mobile: 'border-[#D96138]/18 bg-[#D96138]/14 text-[#F8C6B3]',
  fullstack: 'border-[#006C7C]/18 bg-[#006C7C]/14 text-[#9BDEE5]',
  desktop: 'border-[#5F8171]/18 bg-[#5F8171]/14 text-[#C4D4CB]',
  cybersecurity: 'border-[#AC3F2B]/18 bg-[#AC3F2B]/14 text-[#F0BAAC]',
}

const categoryAccentClasses: Record<ProjectCategory, string> = {
  mobile: 'bg-[#D96138]',
  fullstack: 'bg-[#006C7C]',
  desktop: 'bg-[#5F8171]',
  cybersecurity: 'bg-[#AC3F2B]',
}

const cloudSrc = publicAssetUrl('cloud.png')
const paperOverlay = publicAssetUrl('paper_overlay.png')
const gridPattern = publicAssetUrl('grid_pattern.svg')
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
const categoryCounts = computed<Record<ProjectCategory, number>>(() => ({
  mobile: normalizedProjects.value.mobile.length,
  fullstack: normalizedProjects.value.fullstack.length,
  desktop: normalizedProjects.value.desktop.length,
  cybersecurity: normalizedProjects.value.cybersecurity.length,
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
        class="relative overflow-hidden rounded-[28px] border border-white/10 bg-black px-3 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-4 sm:py-4">
        <div class="absolute inset-0 opacity-22 mix-blend-screen"
          :style="{ backgroundImage: `url(${paperOverlay})`, backgroundSize: 'cover', backgroundPosition: 'center' }" />
        <div class="absolute inset-0 opacity-12"
          :style="{ backgroundImage: `url(${gridPattern})`, backgroundSize: '28px', backgroundPosition: 'center' }" />
        <div class="absolute -left-14 -top-12 h-36 w-36 rounded-full bg-[#D96138]/16 blur-3xl" />
        <div class="absolute right-[-40px] top-[-30px] h-40 w-40 rounded-full bg-[#006C7C]/12 blur-3xl" />
        <div class="absolute bottom-[-50px] left-1/3 h-36 w-36 rounded-full bg-[#5F8171]/12 blur-3xl" />
        <div
          class="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#D96138_0%,#AC3F2B_34%,#006C7C_68%,#5F8171_100%)]" />

        <div class="relative">
          <div class="flex flex-col gap-3">
            <div class="max-w-3xl">
              <h1 class="text-3xl font-black tracking-tight text-white sm:text-5xl">
                {{ t('projects.title') }}
              </h1>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-white/68 sm:text-base">
                {{ t('projects.subtitle') }}
              </p>
            </div>
            <div
              class="grid grid-cols-4 gap-2 overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_28px_rgba(0,0,0,0.18)] sm:gap-3 sm:p-3">
              <button v-for="category in categoryOptions" :key="category.key" type="button"
                class="group relative flex min-w-0 flex-col overflow-hidden rounded-[16px] border px-2 py-2.5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-white/14 sm:rounded-[18px] sm:px-3 sm:py-3"
                :class="[
                  categoryCardClasses[category.key],
                  activeCategory === category.key
                    ? categoryCardActiveClasses[category.key]
                    : 'shadow-[0_10px_20px_rgba(0,0,0,0.12)]',
                ]" @click="activeCategory = category.key">
                <span
                  class="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/4 sm:rounded-[18px]"></span>
                <span class="relative z-10 h-1 w-7 rounded-full sm:w-9"
                  :class="categoryAccentClasses[category.key]"></span>

                <div class="relative z-10 mt-2 min-w-0">
                  <span class="hidden text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/34 sm:block">
                    {{ t(categoryMeta[category.key].eyebrowKey) }}
                  </span>
                  <span
                    class="block text-[10px] font-semibold leading-[1.1] text-[#F8F2EA] sm:mt-1.5 sm:text-[13px] sm:font-bold sm:leading-[1.15]">
                    {{ t(category.labelKey) }}
                  </span>
                </div>

                <div class="relative z-10 mt-2 flex items-center justify-between gap-1.5 sm:mt-3">
                  <span
                    class="inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-semibold sm:px-2 sm:py-0.5 sm:text-[10px]"
                    :class="categoryCountClasses[category.key]">
                    {{ categoryCounts[category.key] }}
                  </span>
                  <span class="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-white/24 sm:block">
                    {{ activeCategory === category.key ? 'Active' : 'Select' }}
                  </span>
                </div>
              </button>
            </div>
            <div
              class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-sm text-white/62">
              <span class="h-2.5 w-2.5 rounded-full bg-(--color-accent)"></span>
              <span class="font-semibold text-white">{{ categoryCounts[activeCategory] }}</span>
              {{ t('projects.activeCategoryCountSuffix') }}
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
