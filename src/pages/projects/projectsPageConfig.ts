import { publicAssetUrl, resolveAssetUrl } from '@/utils/resolveAssetUrl'
import type { ProjectCategory, StoreType } from '@/types/projectCard'

export const categoryOptions: { key: ProjectCategory; labelKey: string }[] = [
  { key: 'mobile', labelKey: 'projects.categories.mobile' },
  { key: 'fullstack', labelKey: 'projects.categories.fullstack' },
  { key: 'desktop', labelKey: 'projects.categories.desktop' },
  { key: 'cybersecurity', labelKey: 'projects.categories.cybersecurity' },
]

export const categoryAccentClasses: Record<ProjectCategory, string> = {
  mobile: 'bg-[#D96138]',
  fullstack: 'bg-[#006C7C]',
  desktop: 'bg-[#5F8171]',
  cybersecurity: 'bg-[#AC3F2B]',
}

export const categoryTicketCodes: Record<ProjectCategory, string> = {
  mobile: 'MOB',
  fullstack: 'F+B',
  desktop: 'DSK',
  cybersecurity: 'SEC',
}

export const cloudSrc = publicAssetUrl('cloud.png')

export const cloudDecorations = [
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

export const storeBadgeSrc: Record<StoreType, string> = {
  appstore: resolveAssetUrl('src/assets/projects/icons/appstore.svg'),
  googleplay: resolveAssetUrl('src/assets/projects/icons/google-play.svg'),
  rustore: resolveAssetUrl('src/assets/projects/icons/rustore.svg'),
  website: '',
}

export const codebyProfileIconUrl =
  resolveAssetUrl('src/assets/projects/security/codeby-profile.png') ||
  resolveAssetUrl('src/assets/projects/security/codeby-profile.png.png')

export const hackerOneServicesIconUrl = resolveAssetUrl('src/assets/projects/security/hackerone-services.png')
export const telegramLogoUrl = publicAssetUrl('socials/telegram.svg')

export const fullWidthProjectTitles = new Set([
  'ProStor.ae',
  'Teleprompter Automatic',
  'Тренировки. Блин да Гриф',
  '585Gold - золотые изделия',
  'M-Alien',
  'The Tone of Victory',
  'Алло - Запись звонков',
])

export const showAntiAIBanner = false
