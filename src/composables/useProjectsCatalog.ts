import { computed, type Ref } from 'vue'
import { cyberSecurityProject, desktopProjects, mobileProjects } from '@/data/projects'
import { resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import { projectClientCountriesForLocale, projectClientCountryForTitle } from '@/utils/projectClientCountry'
import type { ProjectCard, ProjectCategory, StoreLink } from '@/types/projectCard'

interface UseProjectsCatalogOptions {
  t: (key: string) => string
  tm: (key: string) => unknown
  locale: Ref<string>
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

function getMobileStoreLinks(project: (typeof mobileProjects)[number]) {
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

  return storeLinks
}

function sortMobileProjectCards(
  left: { card: ProjectCard; originalIndex: number },
  right: { card: ProjectCard; originalIndex: number },
) {
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
}

export function useProjectsCatalog({ t, tm, locale }: UseProjectsCatalogOptions) {
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

  const mobileProjectCards = computed<ProjectCard[]>(() =>
    mobileProjects
      .map((project, originalIndex) => {
        const isToneOfVictoryProject = project.title === toneOfVictoryTitle

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
            storeLinks: getMobileStoreLinks(project),
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
      .sort(sortMobileProjectCards)
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

  const mobileProjectCountries = computed(() => projectClientCountriesForLocale(locale))

  return {
    normalizedProjects,
    mobileProjectCountries,
  }
}
