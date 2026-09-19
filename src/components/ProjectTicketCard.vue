<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import { useI18n } from 'vue-i18n'
import type { ProjectCard, StoreType } from '@/types/projectCard'
import { publicAssetUrl, resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'

const [emblaRef, emblaApi] = emblaCarouselVue({
  align: 'start',
  containScroll: 'trimSnaps',
  duration: 32,
  loop: false,
} satisfies EmblaOptionsType)
void emblaRef

const { t, locale } = useI18n()
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const selectedIndex = ref(0)
const articleRef = ref<HTMLElement | null>(null)
const isGalleryNearViewport = ref(false)
const selectedToneStandUrl = ref('')
const selectedTeleprompterShowcaseIndex = ref(0)
const platesHeroBackgroundUrl = resolveAssetUrl('src/assets/projects/plates/background.png')
const gold585BackgroundUrl = resolveAssetUrl('src/assets/projects/gold585/background.webp')
let galleryObserver: IntersectionObserver | null = null

const props = defineProps<{
  project: ProjectCard
  storeBadgeSrc: Record<StoreType, string>
  openLightbox: (projectId: string, index: number) => void
  openInfoModal?: (projectId: string) => void
  noImagesText: string
  infoButtonText?: string
  reduceEffects?: boolean
}>()

function isTeleprompterAutomaticProject(project: ProjectCard) {
  return project.title === 'Teleprompter Automatic'
}

function isMAlienProject(project: ProjectCard) {
  return project.title === 'M-Alien'
}

function isToneOfVictoryProject(project: ProjectCard) {
  return project.title === 'The Tone of Victory'
}

function isPlatesProject(project: ProjectCard) {
  return project.title === 'Тренировки. Блин да Гриф'
}

function isGold585Project(project: ProjectCard) {
  return project.title === '585Gold - золотые изделия'
}

const isCybersecurityCard = computed(() => props.project.category === 'cybersecurity')
const isInsentryCase = computed(() => props.project.id === 'mobile-insentry-raw-decoder')
const isClosedOsintCase = computed(() => props.project.title === 'Закрытый OSINT-инструмент для поиска цифрового следа')
const toneOfVictoryStandUrls = computed(() =>
  isToneOfVictoryProject(props.project)
    ? resolveAssetUrls([
        'src/assets/projects/tag/stand0.jpeg',
        'src/assets/projects/tag/stand1.jpeg',
        'src/assets/projects/tag/stand2.jpeg',
        'src/assets/projects/tag/stand3.jpeg',
        'src/assets/projects/tag/stand4.jpeg',
      ])
    : [],
)
const toneEventLinks = [
  {
    label: 'TAG Heuer x F1',
    url: 'https://www.tagheuer.com/fi/en/partnerships/f1.html',
  },
  {
    label: 'ION Orchard coverage',
    url: 'https://senatus.net/article/racing-fever-takes-over-orchard-road-tag-heuer-unveils-high-octane-pop-ion-orchard/',
  },
  {
    label: 'Instagram 01',
    url: 'https://www.instagram.com/p/DH3WT-PCWQQ/',
  },
  {
    label: 'Instagram 02',
    url: 'https://www.instagram.com/p/DPA0Bw0jpF5/',
  },
  {
    label: 'Instagram 03',
    url: 'https://www.instagram.com/p/DP3CBxaD8v7/',
  },
  {
    label: 'Instagram 04',
    url: 'https://www.instagram.com/p/DHfIzRUzeLE/',
  },
]
const teleprompterSystemTitle = computed(() =>
  t('projects.teleprompter.card.systemTitle'),
)
const teleprompterRevenueStat = computed(() =>
  locale.value === 'ru'
    ? { value: '$50K+', label: 'выручка / мес, 2 платформы' }
    : { value: '$50K+', label: 'revenue / mo, 2 platforms' },
)
const teleprompterDownloadsStat = computed(() =>
  locale.value === 'ru'
    ? { value: '100K+', label: 'скачиваний / мес, 2 платформы' }
    : { value: '100K+', label: 'downloads / mo, 2 platforms' },
)
const teleprompterRatingStat = computed(() =>
  locale.value === 'ru'
    ? { value: '4.6', label: 'App Store + Google Play' }
    : { value: '4.6', label: 'App Store + Google Play' },
)
const teleprompterStats = computed(() => [
  teleprompterRevenueStat.value,
  teleprompterDownloadsStat.value,
  teleprompterRatingStat.value,
])
const gold585RetailProof = computed(() =>
  locale.value === 'ru'
    ? {
        value: '250+ магазинов',
        label: 'во всех федеральных округах России',
      }
    : {
        value: '250+ stores',
        label: 'across every federal district of Russia',
      },
)
const gold585StoreStory = computed(() =>
  locale.value === 'ru'
    ? '<strong>585Gold</strong> — российская ювелирная сеть с украшениями из золота и серебра, бриллиантами, камнями, акциями, бонусной лояльностью и trade-in. Приложение переводит офлайн-витрину федеральной сети в мобильный сценарий: от выбора изделия и проверки наличия до заказа, оплаты и получения.'
    : '<strong>585Gold</strong> is a Russian jewelry network with gold and silver pieces, diamonds, gemstones, offers, loyalty, and trade-in. The app turns the federal offline retail presence into a mobile journey: from choosing a piece and checking availability to order, payment, and pickup.',
)
const gold585FeaturePills = computed(() =>
  locale.value === 'ru'
    ? ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Combine', 'REST API', 'Yandex Maps', 'Mindbox', 'Yandex Metrica', 'ЮKassa', 'Deep links', 'Push Notifications']
    : ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Combine', 'REST API', 'Yandex Maps', 'Mindbox', 'Yandex Metrica', 'YooKassa', 'Deep links', 'Push Notifications'],
)
const securityArticleLinks = computed(() => props.project.storeLinks.filter((link) => link.type === 'website'))
const researchCaseNumber = computed(() => {
  const match = props.project.id.match(/^cyber-(\d+)-/)
  return match ? String(Number(match[1]) + 1).padStart(2, '0') : '—'
})
const securityDescriptionHtml = computed(() =>
  props.project.description
    .replace(/<br\s*\/?>\s*<a\b[^>]*>.*?<\/a>/gis, '')
    .replace(/<a\b[^>]*>(.*?)<\/a>/gis, '$1')
    .replace(/(<br\s*\/?>\s*){3,}/gi, '<br><br>'),
)
const teleprompterCapabilityLine = computed(() =>
  locale.value === 'ru'
    ? ['4K-съемка', 'real-time фильтры', 'сегментация фона', 'анимированный текст', 'StoreKit / Billing', 'Stripe / ЮKassa']
    : ['4K capture', 'real-time filters', 'background segmentation', 'animated text', 'StoreKit / Billing', 'Stripe / YooKassa'],
)
const teleprompterFeaturePills = computed(() =>
  locale.value === 'ru'
    ? ['App Store', 'Google Play', 'StoreKit', 'Google Play Billing', 'Stripe', 'ЮKassa', 'Apple Server Notifications']
    : ['App Store', 'Google Play', 'StoreKit', 'Google Play Billing', 'Stripe', 'YooKassa', 'Apple Server Notifications'],
)
const teleprompterSolvedHighlights = computed(() =>
  (locale.value === 'ru'
    ? [
        ['4K без просадки FPS', 'Синхронизировал плавный телесуфлер, запись видео, real-time фильтры и сегментацию фона так, чтобы съемка не разваливалась под нагрузкой.'],
        ['Собственный видеоредактор', 'Собрал обрезку, поворот, скорость, склейку роликов, замену фона, логотипы, изображения и анимированный текст в единый сценарий редактирования видео.'],
        ['Платежная инфраструктура', 'Связал StoreKit, Google Play Billing, Stripe, ЮKassa, webhooks, автопродления и восстановление покупок с доступом к premium-функциям на всех клиентах.'],
        ['Экосистема вместо одного app', 'iOS, Android, iPad, Apple Watch, web-панель и серверная часть работают как один подписочный продукт с релизами и поддержкой.'],
      ]
    : [
        ['4K without FPS drops', 'Kept smooth teleprompter scrolling, video capture, real-time filters, and background segmentation stable under heavy recording load.'],
        ['Custom video editor', 'Brought trimming, rotation, speed changes, clip merging, background replacement, logos, images, and animated text into one editing workflow.'],
        ['Payment infrastructure', 'Connected StoreKit, Google Play Billing, Stripe, YooKassa, webhooks, renewals, and purchase recovery with premium access across clients.'],
        ['Ecosystem, not one app', 'iOS, Android, iPad, Apple Watch, web panel, and backend operate as one subscription product with releases and support.'],
      ]).map(([label, text]) => ({ label, text })),
)
const teleprompterShowcaseItems = computed(() => {
  if (!isTeleprompterAutomaticProject(props.project)) return []

  return [
    {
      label: locale.value === 'ru' ? 'Web-оплата' : 'Web payments',
      caption: locale.value === 'ru' ? 'checkout, планы, Stripe / ЮKassa' : 'checkout, plans, Stripe / YooKassa',
      src: props.project.galleryUrls[19],
      galleryIndex: 19,
      type: 'web',
    },
    {
      label: locale.value === 'ru' ? 'Web-суфлер' : 'Web prompter',
      caption: locale.value === 'ru' ? 'сценарии, remote flow, текст' : 'scripts, remote flow, text',
      src: props.project.galleryUrls[20],
      galleryIndex: 20,
      type: 'web',
    },
    {
      label: locale.value === 'ru' ? 'iOS-съемка' : 'iOS capture',
      caption: locale.value === 'ru' ? 'камера, сценарии, запись' : 'camera, scripts, capture',
      src: props.project.galleryUrls[0],
      galleryIndex: 0,
      type: 'mobile',
    },
    {
      label: locale.value === 'ru' ? 'Устройства' : 'Devices',
      caption: locale.value === 'ru' ? 'сессии, premium, sync' : 'sessions, premium, sync',
      src: props.project.galleryUrls[8],
      galleryIndex: 8,
      type: 'mobile',
    },
  ].filter((item) => item.src)
})
const teleprompterShowcaseStripItems = computed(() => {
  if (!isTeleprompterAutomaticProject(props.project)) return []

  const labels =
    locale.value === 'ru'
      ? [
          'Сценарии',
          'Текст суфлера',
          'Запись видео',
          'Настройки',
          'Редактор',
          'Экспорт',
          'Premium-доступ',
        ]
      : [
          'Scripts',
          'Prompter text',
          'Video capture',
          'Settings',
          'Editor',
          'Export',
          'Premium access',
        ]
  const indexes = [0, 2, 5, 8, 12, 15, 18]

  return indexes
    .map((galleryIndex, index) => ({
      src: props.project.galleryUrls[galleryIndex],
      galleryIndex,
      label: labels[index] ?? `${props.project.title} ${index + 1}`,
      type: 'mobile',
    }))
    .filter((item) => item.src)
})
const activeTeleprompterShowcase = computed(() =>
  teleprompterShowcaseItems.value[selectedTeleprompterShowcaseIndex.value] ?? teleprompterShowcaseItems.value[0],
)
const mAlienSystemTitle = computed(() =>
  locale.value === 'ru'
    ? 'Internal messenger for an AI-drone company: Flutter app + Node.js backend'
    : 'Internal messenger for an AI-drone company: Flutter app + Node.js backend',
)
const mAlienSystemHighlights = computed(() =>
  locale.value === 'ru'
    ? [
        {
          label: 'Closed product',
          text: 'внутренний мессенджер под NDA для компании, которая разрабатывает дроны с ИИ',
        },
        {
          label: 'Realtime core',
          text: 'личные и групповые чаты, Socket.IO/WebSocket, статусы, сессии, доставка событий и push',
        },
        {
          label: 'Secure product layer',
          text: 'медиа, голосовые, локальный кеш, QR-сценарии, темы, локализация и управление устройствами',
        },
      ]
    : [
        {
          label: 'Closed product',
          text: 'internal NDA messenger for a company building AI-powered drones',
        },
        {
          label: 'Realtime core',
          text: 'direct and group chats, Socket.IO/WebSocket, statuses, sessions, event delivery, and push',
        },
        {
          label: 'Secure product layer',
          text: 'media, voice messages, local cache, QR flows, themes, localization, and device management',
        },
      ],
)
const mAlienMissionFacts = computed(() =>
  locale.value === 'ru'
    ? [
        { label: 'Internal NDA product', text: 'Не публичный store-проект, а закрытая коммуникационная платформа под внутренние процессы заказчика.' },
        { label: 'AI drone company', text: 'Заказчик работает в домене дронов с ИИ, поэтому акцент был на приватности, управлении устройствами и надежном real-time.' },
        { label: 'Full-stack ownership', text: 'Я отвечал за мобильный Flutter-клиент, Node.js backend, события, хранение, медиа, уведомления и связку между слоями.' },
      ]
    : [
        { label: 'Internal NDA product', text: 'Not a public store app, but a closed communication platform for the customer’s internal workflows.' },
        { label: 'AI drone company', text: 'The customer works in the AI-drone domain, so privacy, device control, and reliable realtime behavior mattered.' },
        { label: 'Full-stack ownership', text: 'I handled the Flutter mobile client, Node.js backend, events, storage, media, notifications, and the glue between layers.' },
      ],
)
const mAlienStackGroups = computed(() =>
  locale.value === 'ru'
    ? [
        { label: 'Flutter client', value: 'Dart, Provider, Dio, Hive, SharedPreferences, Image Picker, QR, WebView' },
        { label: 'Realtime', value: 'Socket.IO client, WebSocket, visibility tracking, delivery states, presence' },
        { label: 'Backend', value: 'Node.js, Express, MongoDB, PostgreSQL, Mongoose, Redis, multer' },
        { label: 'Firebase / ops', value: 'FCM, Firebase Admin, local notifications, Crashlytics, Analytics, geoip-lite' },
      ]
    : [
        { label: 'Flutter client', value: 'Dart, Provider, Dio, Hive, SharedPreferences, Image Picker, QR, WebView' },
        { label: 'Realtime', value: 'Socket.IO client, WebSocket, visibility tracking, delivery states, presence' },
        { label: 'Backend', value: 'Node.js, Express, MongoDB, PostgreSQL, Mongoose, Redis, multer' },
        { label: 'Firebase / ops', value: 'FCM, Firebase Admin, local notifications, Crashlytics, Analytics, geoip-lite' },
      ],
)
const mAlienOrbitStack = [
  { label: 'Flutter', className: 'm-alien-orbit-tech--flutter' },
  { label: 'Socket.IO', className: 'm-alien-orbit-tech--socket' },
  { label: 'Dart', className: 'm-alien-orbit-tech--dart' },
  { label: 'Node.js', className: 'm-alien-orbit-tech--node' },
  { label: 'Express.js', className: 'm-alien-orbit-tech--express' },
  { label: 'PostgreSQL', className: 'm-alien-orbit-tech--postgres' },
  { label: 'Redis', className: 'm-alien-orbit-tech--redis' },
  { label: 'BloC', className: 'm-alien-orbit-tech--bloc' },
  { label: 'Dio', className: 'm-alien-orbit-tech--dio' },
  { label: 'Retrofit', className: 'm-alien-orbit-tech--retrofit' },
]
const mAlienFeaturePills = computed(() =>
  locale.value === 'ru'
    ? ['ID-only auth', 'Device sessions', 'Direct chats', 'Group chats', 'Media uploads', 'Voice messages', 'Push', 'QR', 'Themes', 'Localization', 'Offline cache', 'Realtime translate', 'PostgreSQL']
    : ['ID-only auth', 'Device sessions', 'Direct chats', 'Group chats', 'Media uploads', 'Voice messages', 'Push', 'QR', 'Themes', 'Localization', 'Offline cache', 'Realtime translate', 'PostgreSQL'],
)
const mAlienShowcaseItems = computed(() => {
  if (!isMAlienProject(props.project)) return []

  return props.project.galleryUrls.map((src, index) => ({
    src,
    galleryIndex: index,
    label:
      locale.value === 'ru'
        ? ['Авторизация', 'Список чатов', 'Диалог', 'Профиль', 'Настройки', 'Медиа'][index] ?? `Экран ${index + 1}`
        : ['Auth', 'Chat list', 'Dialog', 'Profile', 'Settings', 'Media'][index] ?? `Screen ${index + 1}`,
  }))
})
const platesStats = computed(() =>
  locale.value === 'ru'
    ? [
        { value: 'Генерация тренировок', label: 'ИИ подбирает программу под цель, уровень и ограничения' },
        { value: 'Помощь по занятиям', label: 'AI-ассистент подсказывает, если упражнение не получается' },
        { value: '3-кратный чемпион Европы', label: 'программы с участием Владислава Туйнова' },
      ]
    : [
        { value: 'Workout generation', label: 'AI adapts programs to goals, level, and limits' },
        { value: 'Training support', label: 'AI assistant helps when an exercise is not working' },
        { value: '3-time European champion', label: 'programs with Vladislav Tuinov' },
      ],
)
const platesFeaturePills = computed(() =>
  locale.value === 'ru'
    ? ['AI-тренировки', 'AI-чат', 'Сообщество', 'Дневник питания', 'Статистика', 'Журнал', 'Награды', 'BLE']
    : ['AI workouts', 'AI chat', 'Community', 'Nutrition journal', 'Statistics', 'Journal', 'Rewards', 'BLE'],
)
const platesShowcaseItems = computed(() => {
  if (!isPlatesProject(props.project)) return []

  return props.project.galleryUrls.map((src, index) => ({
    index,
    src,
    label: `${props.project.title} screen ${index + 1}`,
  }))
})
const gold585ShowcaseItems = computed(() => {
  if (!isGold585Project(props.project)) return []

  const labels =
    locale.value === 'ru'
      ? ['Главная витрина', 'Каталог', 'Карточка изделия', 'Подборка', 'Скидки', 'Профиль']
      : ['Main showcase', 'Catalog', 'Product card', 'Collection', 'Offers', 'Profile']

  return props.project.galleryUrls.map((src, index) => ({
    src,
    galleryIndex: index,
    label: labels[index] ?? `${props.project.title} ${index + 1}`,
  }))
})
const visibleTechnologies = computed(() => props.project.technologies.slice(0, 8))
const hiddenTechnologyCount = computed(() => Math.max(props.project.technologies.length - visibleTechnologies.value.length, 0))
const ticketStubWidth = computed(() => {
  if (isToneOfVictoryProject(props.project)) return 432
  if (isTeleprompterAutomaticProject(props.project)) return 600
  if (isMAlienProject(props.project)) return 504
  if (isPlatesProject(props.project)) return 504
  if (isInsentryCase.value) return 384
  if (isClosedOsintCase.value) return 360
  if (isCybersecurityCard.value) return 312
  return 336
})
const ticketCardHeight = computed(() => {
  if (isToneOfVictoryProject(props.project)) return 720
  if (isTeleprompterAutomaticProject(props.project)) return 760
  if (isMAlienProject(props.project)) return 650
  if (isPlatesProject(props.project)) return 650
  if (props.project.title === 'Армира') return 540
  if (isInsentryCase.value) return 410
  if (isCybersecurityCard.value) return 365
  return 460
})
const holographicOverlay = publicAssetUrl('holographic.svg')
const backgroundPaperUrl = `url("${publicAssetUrl('background_paper.png')}")`

function syncEmblaState(api?: EmblaCarouselType) {
  canScrollPrev.value = api?.canScrollPrev() ?? false
  canScrollNext.value = api?.canScrollNext() ?? false
  selectedIndex.value = api?.selectedScrollSnap() ?? 0
}

watch(emblaApi, (api) => {
  if (!api) return
  syncEmblaState(api)
  api.on('select', () => syncEmblaState(api))
  api.on('reInit', () => syncEmblaState(api))
})

watch(() => props.project.galleryUrls, () => {
  emblaApi.value?.reInit()
  syncEmblaState(emblaApi.value)
  selectedTeleprompterShowcaseIndex.value = 0
})

function scrollPrev() {
  emblaApi.value?.scrollPrev()
}

function scrollNext() {
  emblaApi.value?.scrollNext()
}

function shouldRenderGalleryImage(index: number) {
  return isGalleryNearViewport.value && Math.abs(index - selectedIndex.value) <= 1
}

function openToneStandPreview(src: string) {
  selectedToneStandUrl.value = src
}

function closeToneStandPreview() {
  selectedToneStandUrl.value = ''
}

function selectTeleprompterShowcase(index: number) {
  selectedTeleprompterShowcaseIndex.value = index
}

function openTeleprompterShowcase(index: number) {
  const item = teleprompterShowcaseItems.value[index]
  if (!item) return
  props.openLightbox(props.project.id, item.galleryIndex)
}

onMounted(() => {
  if (!articleRef.value || typeof IntersectionObserver === 'undefined') {
    isGalleryNearViewport.value = true
    return
  }

  galleryObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isGalleryNearViewport.value = true
      galleryObserver?.disconnect()
      galleryObserver = null
    },
    { rootMargin: '720px 0px' },
  )
  galleryObserver.observe(articleRef.value)
})

onBeforeUnmount(() => {
  galleryObserver?.disconnect()
  emblaApi.value?.destroy()
})
</script>

<template>
  <article ref="articleRef" class="h-full min-w-0 w-full overflow-visible" :class="{ 'project-ticket-card--reduced-effects': reduceEffects }">
    <article
      v-if="isCybersecurityCard"
      class="rcard"
      :class="project.notice ? 'rcard--archive' : ''"
    >
      <div class="rcard-leading">
        <span class="rcard-id">{{ researchCaseNumber }}</span>
        <img
          v-if="project.galleryUrls[0]"
          :src="project.galleryUrls[0]"
          :alt="project.title"
          class="rcard-thumb"
          loading="lazy"
          decoding="async"
        >
      </div>

      <div class="rcard-body">
        <div class="rcard-head">
          <span class="rcard-eyebrow">
            {{ project.eyebrow || t('projects.researchCard.eyebrow') }}
            <i v-if="project.notice">{{ t('projects.researchCard.archive') }}</i>
            <i v-else-if="securityArticleLinks.length > 1">
              {{ t('projects.researchCard.parts', { n: securityArticleLinks.length }) }}
            </i>
          </span>
          <h2 class="rcard-title">{{ project.title }}</h2>
        </div>

        <p class="rcard-text" v-html="securityDescriptionHtml"></p>

        <p v-if="project.notice" class="rcard-warn">
          <b aria-hidden="true">!</b>
          <span>{{ project.notice }}</span>
        </p>

        <div v-if="project.technologies.length" class="rcard-tags">
          <span v-for="tech in visibleTechnologies" :key="tech">{{ tech }}</span>
        </div>
      </div>

      <div class="rcard-actions">
        <a
          v-for="link in securityArticleLinks"
          :key="link.url"
          class="rcard-link"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label ?? t('projects.articleLinks.read') }}
          <span aria-hidden="true">↗</span>
        </a>

        <button
          v-if="!securityArticleLinks.length"
          type="button"
          class="rcard-link rcard-link--ghost"
          disabled
          :title="t('projects.researchCard.linkSoonTitle')"
        >
          {{ t('projects.articleLinks.read') }}
          <span aria-hidden="true">/ {{ t('projects.researchCard.linkSoon') }}</span>
        </button>
      </div>
    </article>

    <div
      v-else-if="isGold585Project(project)"
      class="gold585-case-card relative mx-auto w-full overflow-hidden rounded-[30px] border border-[#b8944e]/25 p-2 text-[#f8edda] shadow-[0_30px_78px_rgba(31,5,9,0.44)] sm:p-2.5"
    >
      <div class="pointer-events-none absolute inset-0 gold585-case-surface"></div>
      <div class="pointer-events-none absolute inset-x-6 top-0 h-px bg-[#f2c86d]/45"></div>

      <div class="relative z-10">
        <section
          class="gold585-hero relative overflow-hidden rounded-[26px] px-4 pb-4 pt-5 sm:px-6 sm:pb-5"
        >
          <div
            class="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] gold585-store-backdrop sm:block"
            :style="{ '--gold585-store-bg': `url(${gold585BackgroundUrl})` }"
          ></div>
          <div class="pointer-events-none absolute inset-0 gold585-hero-shade"></div>
          <div class="pointer-events-none absolute inset-y-0 left-0 w-[0.45rem] bg-[#d4061c]"></div>

          <div class="relative z-10 grid gap-6 min-[1120px]:grid-cols-[minmax(0,1fr)_minmax(430px,480px)] min-[1120px]:items-stretch">
            <div class="gold585-hero-copy flex h-full min-w-0 flex-col">
              <div class="flex min-w-0 items-start gap-3.5">
                <img
                  v-if="project.iconUrl"
                  :src="project.iconUrl"
                  alt=""
                  class="h-14 w-14 shrink-0 rounded-[18px] object-cover shadow-[0_18px_36px_rgba(0,0,0,0.34)]"
                  loading="lazy"
                  decoding="async"
                />
                <div class="min-w-0">
                  <p class="gold585-kicker text-[10px] font-black uppercase">
                    {{ locale.startsWith('ru') ? 'Россия / jewelry retail / Swift iOS' : 'Russia / jewelry retail / Swift iOS' }}
                  </p>
                  <h2 class="mt-2 text-[2.75rem] font-black leading-[0.9] text-white sm:text-[4rem]">
                    585Gold
                  </h2>
                </div>
              </div>

              <p
                class="gold585-store-story mt-4 max-w-3xl text-[13px] font-semibold leading-6 text-[#f7e6c5]/88 [&_strong]:text-white"
                v-html="gold585StoreStory"
              ></p>

              <div class="gold585-retail-proof mt-5">
                <div class="flex flex-wrap items-end gap-x-3 gap-y-1">
                  <p class="gold585-retail-proof-value text-[2rem] font-black leading-none text-white sm:text-[2.65rem]">
                    {{ gold585RetailProof.value }}
                  </p>
                  <p class="max-w-sm pb-1 text-[13px] font-bold leading-5 text-[#f7dfad]">
                    {{ gold585RetailProof.label }}
                  </p>
                </div>
              </div>

              <div class="gold585-proof-strip relative z-10 mt-auto overflow-hidden px-0 pb-0 pt-5">
                <p class="mb-2 text-[12px] font-bold leading-5 text-[#f8edda]/86">
                  {{ locale.startsWith('ru') ? 'Стек и интеграции' : 'Stack and integrations' }}
                </p>
                <div class="flex flex-wrap items-center gap-1.5">
                  <span
                    v-for="pill in gold585FeaturePills"
                    :key="pill"
                    class="gold585-tech-chip text-[11px] font-semibold leading-none text-[#fff1d1]"
                  >
                    {{ pill }}
                  </span>
                </div>

                <div
                  v-if="project.storeLinks.length"
                  class="mt-3 flex flex-wrap items-center gap-2 border-t border-[#f0c36b]/20 pt-3"
                >
                  <a
                    v-for="link in project.storeLinks"
                    :key="`${link.type}-${link.url}`"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-[#f0c36b]/24 bg-white px-2 py-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff7ea]"
                    :title="link.type"
                  >
                    <img
                      v-if="storeBadgeSrc[link.type]"
                      :src="storeBadgeSrc[link.type]"
                      alt=""
                      class="h-10 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    <span v-else class="px-2 py-1 text-xs font-bold text-[#74202a]">{{ link.label ?? link.type }}</span>
                  </a>
                </div>
              </div>
            </div>

            <aside class="gold585-gallery-panel relative min-h-[520px] w-full max-w-[480px] justify-self-end overflow-visible p-0">
              <div class="absolute right-0 top-0 z-20 flex justify-end">
                <span class="shrink-0 rounded-full border border-[#f0c36b]/18 bg-black/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#d9bc77]">
                  {{ selectedIndex + 1 }} / {{ gold585ShowcaseItems.length }}
                </span>
              </div>

              <div class="gold585-gallery-shell relative min-h-0">
                <div class="h-full w-full overflow-hidden" ref="emblaRef">
                  <div class="flex h-full">
                    <button
                      v-for="item in gold585ShowcaseItems"
                      :key="`${project.id}-gold585-gallery-${item.galleryIndex}`"
                      type="button"
                      class="gold585-gallery-slide flex h-full min-w-full flex-[0_0_100%] items-center justify-center border-0 bg-transparent p-0"
                      @click="openLightbox(project.id, item.galleryIndex)"
                    >
                      <img
                        v-if="shouldRenderGalleryImage(item.galleryIndex)"
                        :src="item.src"
                        :alt="item.label"
                        class="h-full w-full object-contain drop-shadow-[0_30px_36px_rgba(0,0,0,0.48)] transition duration-300 hover:scale-[1.015]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div v-else class="h-full w-full" aria-hidden="true"></div>
                    </button>
                  </div>
                </div>

                <div
                  v-if="gold585ShowcaseItems.length > 1"
                  class="pointer-events-none absolute inset-x-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between"
                >
                  <button
                    type="button"
                    class="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-[#f0c36b]/20 bg-[#170306]/70 text-xl leading-none text-[#f8edda] backdrop-blur transition hover:bg-[#3d070e]/84"
                    :class="{ 'opacity-35': !canScrollPrev }"
                    aria-label="Previous"
                    @click.stop="scrollPrev"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    class="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-[#f0c36b]/20 bg-[#170306]/70 text-xl leading-none text-[#f8edda] backdrop-blur transition hover:bg-[#3d070e]/84"
                    :class="{ 'opacity-35': !canScrollNext }"
                    aria-label="Next"
                    @click.stop="scrollNext"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div
                v-if="gold585ShowcaseItems.length > 1"
                class="mt-3 flex items-center justify-center gap-1.5"
              >
                <span
                  v-for="item in gold585ShowcaseItems"
                  :key="`${project.id}-gold585-dot-${item.galleryIndex}`"
                  class="h-1.5 rounded-full transition"
                  :class="selectedIndex === item.galleryIndex ? 'w-6 bg-[#d4061c]' : 'w-1.5 bg-[#f0c36b]/34'"
                ></span>
              </div>
            </aside>
          </div>

        </section>
      </div>
    </div>

    <div
      v-else-if="isTeleprompterAutomaticProject(project)"
      class="teleprompter-case-card relative mx-auto w-full overflow-hidden rounded-[30px] border border-[#1b2a1d] p-2.5 text-white shadow-[0_28px_74px_rgba(0,0,0,0.42)] sm:p-3"
    >
      <div class="pointer-events-none absolute inset-0 teleprompter-case-surface"></div>
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#adffc2]/18"></div>

      <div class="relative z-10">
        <section class="teleprompter-hero relative overflow-hidden rounded-[26px] px-3 py-4 sm:px-4">
          <div class="relative z-10 min-w-0">
            <div class="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
              <img
                v-if="project.iconUrl"
                :src="project.iconUrl"
                alt=""
                class="h-14 w-14 shrink-0 rounded-[20px] border border-white/14 object-cover shadow-[0_0_34px_rgba(33,255,89,0.22)]"
                loading="lazy"
                decoding="async"
              />
              <div class="min-w-0">
                <p class="text-[10px] font-black uppercase tracking-[0.26em] text-[#8effaa]">
                  Full-stack commercial product
                </p>
                <h2 class="mt-1 text-[2.1rem] font-black leading-[0.98] text-white sm:text-[2.8rem]">
                  Teleprompter Automatic
                </h2>
                <p class="mt-1.5 max-w-3xl text-[13px] font-semibold leading-5 text-[#dceee0]">
                  {{ teleprompterSystemTitle }} / subscriptions / media pipeline
                </p>
              </div>
            </div>

            <p
              class="mt-3 max-w-5xl text-[13px] font-semibold leading-6 text-[#e7f7ea]/92 [&_strong]:text-white"
              v-html="project.description"
            ></p>

            <div class="mt-3 grid gap-2 sm:grid-cols-3">
              <div
                v-for="stat in teleprompterStats"
                :key="`${stat.value}-${stat.label}`"
                class="rounded-[18px] border border-[#8effaa]/14 bg-white/[0.055] p-3"
              >
                <p class="text-[1.45rem] font-black leading-none text-white">
                  {{ stat.value }}
                </p>
                <p class="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9dccaa]">
                  {{ stat.label }}
                </p>
              </div>
            </div>

            <div class="mt-2 flex flex-wrap gap-1.5">
              <span
                v-for="capability in teleprompterCapabilityLine"
                :key="capability"
                class="rounded-full border border-[#8effaa]/12 bg-[#8effaa]/10 px-2.5 py-1 text-[10px] font-bold text-[#dfffe7]"
              >
                {{ capability }}
              </span>
            </div>
          </div>
        </section>

        <section class="teleprompter-screen-strip relative mt-3 overflow-hidden rounded-[28px] border border-[#8effaa]/14 p-3 sm:p-4">
          <div class="mb-2 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <p class="text-[10px] font-black uppercase tracking-[0.24em] text-[#8effaa]">
                {{ locale.startsWith('ru') ? 'Экраны продукта' : 'Product screens' }}
              </p>
            </div>
            <span class="w-fit rounded-full border border-[#8effaa]/16 bg-[#8effaa]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#dfffe7]">
              {{ teleprompterShowcaseStripItems.length }} shots
            </span>
          </div>

          <div class="teleprompter-screen-row flex gap-0 overflow-x-auto pb-2 pt-1">
            <button
              v-for="item in teleprompterShowcaseStripItems"
              :key="`${project.id}-teleprompter-screen-${item.galleryIndex}`"
              type="button"
              class="teleprompter-screen-card group w-[184px] shrink-0 rounded-[24px] border-0 p-0 text-left transition sm:w-[220px] min-[1180px]:w-[198px]"
              @click="openLightbox(project.id, item.galleryIndex)"
            >
              <div
                class="teleprompter-screen-frame flex h-[340px] items-center justify-center rounded-[22px] sm:h-[390px] min-[1180px]:h-[376px]"
              >
                <img
                  :src="item.src"
                  :alt="item.label"
                  class="h-full w-full object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.42)] transition duration-300 group-hover:scale-[1.025]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </button>
          </div>

          <div
            v-if="project.storeLinks.length || (project.infoModalKey && openInfoModal && infoButtonText)"
            class="mt-3 flex flex-wrap items-center gap-2 border-t border-[#8effaa]/10 pt-4"
          >
            <a
              v-for="link in project.storeLinks"
              :key="`${link.type}-${link.url}`"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[52px] items-center justify-center rounded-2xl border transition duration-200 hover:-translate-y-0.5"
              :class="link.type === 'website' ? 'border-[#9affb6]/20 bg-[#9affb6]/12 px-4 text-sm font-black text-[#f4fff6] hover:bg-[#9affb6]/18' : 'border-white/14 bg-white px-2 py-1.5 hover:bg-[#eef6ef]'"
              :title="link.type"
            >
              <img
                v-if="storeBadgeSrc[link.type]"
                :src="storeBadgeSrc[link.type]"
                alt=""
                class="h-10 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span v-else class="inline-flex items-center gap-2">
                {{ link.type === 'website' ? (locale.startsWith('ru') ? 'Открыть сайт' : 'Website') : (link.label ?? link.type) }}
                <span class="grid h-6 w-6 place-items-center rounded-full bg-[#dffff0] text-base leading-none text-[#0f3618]">
                  →
                </span>
              </span>
            </a>
            <button
              v-if="project.infoModalKey && openInfoModal && infoButtonText"
              type="button"
              class="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border border-[#9affb6]/20 bg-[#9affb6]/12 px-4 text-sm font-black text-[#f4fff6] shadow-[0_14px_28px_rgba(36,255,94,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#9affb6]/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9affb6]"
              @click="openInfoModal(project.id)"
            >
              {{ infoButtonText }}
              <span class="grid h-6 w-6 place-items-center rounded-full bg-[#dffff0] text-base leading-none text-[#0f3618] transition duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>

    <div
      v-else-if="isToneOfVictoryProject(project)"
      class="tone-case-card relative mx-auto w-full overflow-hidden rounded-[30px] p-3 text-white shadow-[0_28px_74px_rgba(35,5,7,0.38)] sm:p-4"
    >
      <div class="pointer-events-none absolute inset-0 tone-case-surface"></div>
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#ffcbc0]/22"></div>

      <div class="relative z-10">
        <section class="tone-event-hero relative overflow-hidden rounded-[28px] px-4 py-5 sm:px-6">
          <img
            v-if="toneOfVictoryStandUrls[4] || toneOfVictoryStandUrls[0]"
            :src="toneOfVictoryStandUrls[4] || toneOfVictoryStandUrls[0]"
            :alt="`${project.title} event stand`"
            class="tone-event-hero-image absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="pointer-events-none absolute inset-0 tone-event-hero-shade"></div>

          <div class="relative z-10 grid gap-5 min-[1120px]:grid-cols-[minmax(0,0.92fr)_minmax(430px,0.68fr)] min-[1120px]:items-start min-[1500px]:grid-cols-[minmax(0,0.86fr)_minmax(500px,0.62fr)]">
            <div class="tone-hero-copy max-w-[760px] self-start">
              <div class="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                <img
                  v-if="project.iconUrl"
                  :src="project.iconUrl"
                  alt=""
                  class="h-14 w-14 shrink-0 rounded-[20px] object-cover shadow-[0_0_36px_rgba(255,53,55,0.24)]"
                  loading="lazy"
                  decoding="async"
                />
                <div class="min-w-0">
                  <p class="text-[10px] font-black uppercase tracking-[0.26em] text-[#ffb7a7]">
                    TAG Heuer x Formula 1
                  </p>
                  <h2 class="mt-2 text-[2.25rem] font-black leading-[1.02] text-white sm:text-[3rem] min-[1500px]:text-[3.35rem]">
                    {{ t('home.featuredCaseTitle') }}
                  </h2>
                  <p class="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#ffe2d8]/88">
                    {{ t('home.featuredCaseStand.meta') }}
                  </p>
                </div>
              </div>

              <p
                class="mt-5 max-w-3xl text-[13px] font-semibold leading-6 text-[#fff2ed]/90 [&_strong]:text-white"
                v-html="project.description"
              ></p>

              <div class="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-3">
                <div>
                  <p class="text-[9px] font-black uppercase tracking-[0.2em] text-[#ffbe9e]">
                    {{ t('home.featuredCaseFacts.clientLabel') }}
                  </p>
                  <p class="mt-1.5 text-[12px] font-semibold leading-5 text-white/78">
                    {{ t('home.featuredCaseFacts.clientValue') }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] font-black uppercase tracking-[0.2em] text-[#ffbe9e]">
                    {{ t('home.featuredCaseFacts.formatLabel') }}
                  </p>
                  <p class="mt-1.5 text-[12px] font-semibold leading-5 text-white/78">
                    {{ t('home.featuredCaseFacts.formatValue') }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] font-black uppercase tracking-[0.2em] text-[#ffbe9e]">
                    {{ t('home.featuredCaseFacts.stackLabel') }}
                  </p>
                  <p class="mt-1.5 text-[12px] font-semibold leading-5 text-white/78">
                    {{ t('home.featuredCaseFacts.stackValue') }}
                  </p>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#ffd2c8]/74">
                <span>Spring 2025</span>
                <span class="text-[#ff7463]">/</span>
                <span>Stand UI</span>
                <span class="text-[#ff7463]">/</span>
                <span>{{ locale.startsWith('ru') ? 'Видео и аудио' : 'Video and audio' }}</span>
                <span class="text-[#ff7463]">/</span>
                <span>{{ locale.startsWith('ru') ? 'Мультирынок' : 'Multimarket' }}</span>
              </div>
            </div>

            <div class="tone-hero-side min-w-0 self-start">
              <button
                v-if="project.galleryUrls[0]"
                type="button"
                class="tone-device-stage group relative w-full overflow-hidden rounded-[28px] p-2 text-left transition hover:brightness-110"
                @click="openLightbox(project.id, 0)"
              >
                <div class="tone-device-screen relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-[24px] min-[1500px]:min-h-[270px]">
                  <img
                    :src="project.galleryUrls[0]"
                    :alt="`${project.title} home screen`"
                    class="tone-device-screen-image max-h-[340px] w-full object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.42)] transition duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>

              <div class="mt-3 flex flex-wrap gap-2">
                <a
                  v-for="link in toneEventLinks"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-[#fff2ed] transition hover:-translate-y-0.5 hover:bg-white/18"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="tone-stand-strip relative mt-3 overflow-hidden rounded-[28px] px-3 py-2.5">
          <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div class="min-w-0">
              <p class="text-[10px] font-black uppercase tracking-[0.24em] text-[#ffb7a7]">
                {{ t('home.featuredCaseStand.title') }}
              </p>
              <h3 class="mt-1 text-lg font-black leading-tight text-white">
                {{ locale.startsWith('ru') ? 'Все фото стенда сразу' : 'All stand photos at once' }}
              </h3>
            </div>
            <p class="max-w-md text-[12px] font-semibold leading-5 text-white/62">
              {{ t('home.featuredCaseStand.description') }}
            </p>
          </div>

          <div class="tone-stand-reel grid gap-2 min-[1180px]:grid-cols-[1.05fr_1.05fr_1.05fr_0.72fr_1.35fr]">
            <button
              v-for="(src, standIndex) in toneOfVictoryStandUrls"
              :key="`${project.id}-tone-stand-gallery-${standIndex + 1}`"
              type="button"
              class="tone-stand-photo group relative flex items-center justify-center overflow-hidden rounded-[20px] text-left shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:brightness-110"
              :class="`tone-stand-photo--${standIndex + 1}`"
              @click="openToneStandPreview(src)"
            >
              <div
                class="relative flex h-[210px] w-full items-center justify-center sm:h-[240px] min-[1180px]:h-[220px]"
              >
                <img
                  :src="src"
                  :alt="`${project.title} stand ${standIndex + 1}`"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  :class="standIndex === 3 ? 'object-center' : ''"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.42)_100%)]"></div>
                <span class="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#4b090d] shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
                  {{ standIndex === 3 ? 'Victory booth' : standIndex === 4 ? 'Full pop-up' : 'South Korea' }}
                </span>
                <span
                  v-if="standIndex === 4"
                  class="absolute bottom-4 left-4 max-w-[280px] text-lg font-black leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]"
                >
                  {{ locale.startsWith('ru') ? 'Полная зона запуска: болид, стенд, звук и TAG Heuer сцена' : 'Full launch space: showcar, stand, sound, and TAG Heuer scene' }}
                </span>
              </div>
            </button>
          </div>
        </section>

        <div class="relative mt-2 flex flex-col gap-2 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div v-if="project.technologies.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in visibleTechnologies"
              :key="tech"
              class="rounded-full bg-[#ffb7a7]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.02em] text-[#ffe2d8] sm:px-3"
            >
              {{ tech }}
            </span>
            <span
              v-if="hiddenTechnologyCount"
              class="rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-white/62 sm:px-3"
            >
              +{{ hiddenTechnologyCount }}
            </span>
          </div>

          <div
            v-if="project.storeLinks.length || (project.infoModalKey && openInfoModal && infoButtonText)"
            class="flex flex-wrap items-center gap-2"
          >
            <a
              v-for="link in project.storeLinks"
              :key="`${link.type}-${link.url}`"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-white/14 bg-white px-1.5 py-1 transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff3ee]"
              :title="link.type"
            >
              <img
                v-if="storeBadgeSrc[link.type]"
                :src="storeBadgeSrc[link.type]"
                alt=""
                class="h-7 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span v-else class="px-2 py-1 text-xs font-bold text-[#4b1517]">{{ link.label ?? link.type }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="isPlatesProject(project)"
      class="plates-case-card relative mx-auto w-full overflow-hidden rounded-[30px] border border-[#3b1010] p-2.5 text-white shadow-[0_30px_78px_rgba(8,2,2,0.50)] sm:p-3"
    >
      <div class="pointer-events-none absolute inset-0 plates-case-surface"></div>
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#ff6b5f]/26"></div>

      <div class="relative z-10">
        <section
          class="plates-hero relative overflow-hidden rounded-[26px] px-4 py-5 sm:px-6"
          :style="platesHeroBackgroundUrl ? { '--plates-hero-bg': `url(${platesHeroBackgroundUrl})` } : undefined"
        >
          <div class="pointer-events-none absolute inset-0 plates-hero-shade"></div>

          <div class="relative z-10 grid min-w-0 gap-3 min-[1120px]:grid-cols-[minmax(0,1fr)_minmax(430px,34%)] min-[1120px]:items-stretch min-[1500px]:grid-cols-[minmax(0,1fr)_minmax(520px,34%)]">
            <aside class="plates-performance-console relative flex min-w-0 overflow-hidden rounded-[28px] border border-white/12 p-3">
              <div class="plates-screen-row flex h-full min-w-0 flex-1 items-center gap-0 overflow-x-auto pb-2 pt-1">
                <button
                  v-for="item in platesShowcaseItems"
                  :key="`${project.id}-plates-screen-${item.index}`"
                  type="button"
                  class="plates-screen-card group flex w-[184px] shrink-0 rounded-[24px] border-0 p-0 text-left transition duration-300 sm:w-[220px] min-[1180px]:w-[198px]"
                  @click="openLightbox(project.id, item.index)"
                >
                  <div class="plates-screen-frame flex h-[340px] flex-1 items-center justify-center rounded-[22px] sm:h-[390px] min-[1180px]:h-[376px]">
                    <img
                      :src="item.src"
                      :alt="item.label"
                      class="h-full w-full object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.42)] transition duration-300 group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </button>
              </div>
            </aside>

            <div class="plates-hero-copy w-full min-w-0 self-start min-[1120px]:justify-self-end">
              <div class="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                <img
                  v-if="project.iconUrl"
                  :src="project.iconUrl"
                  alt=""
                  class="h-14 w-14 shrink-0 rounded-[20px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div class="min-w-0">
                  <p class="text-[10px] font-black uppercase tracking-[0.26em] text-[#ff7b70]">
                    Workout app / Flutter / BLE
                  </p>
                  <h2 class="mt-2 max-w-3xl text-[2.15rem] font-black leading-[1.02] text-white sm:text-[3rem] min-[1500px]:text-[3.25rem]">
                    {{ project.title }}
                  </h2>
                  <p class="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#ffe2de]/88">
                    {{ locale.startsWith('ru') ? 'Мобильный фитнес-продукт с AI-генерацией тренировок, AI-чатом, сообществом, дневниками питания и программами от чемпиона Европы.' : 'A mobile fitness product with AI workout generation, AI chat, community, nutrition journals, and programs by a European champion.' }}
                  </p>
                </div>
              </div>

              <p
                class="mt-5 max-w-3xl text-[13px] font-semibold leading-6 text-[#fff4f1]/90 [&_strong]:text-white"
                v-html="project.description"
              ></p>

              <div class="mt-5 grid gap-2 sm:grid-cols-3">
                <div
                  v-for="stat in platesStats"
                  :key="stat.label"
                  class="plates-stat-tile rounded-[18px] border border-white/12 px-3 py-3"
                >
                  <p class="text-sm font-black leading-tight text-white">
                    {{ stat.value }}
                  </p>
                  <p class="mt-1.5 text-[10px] font-bold leading-4 text-[#ffada6]/78">
                    {{ stat.label }}
                  </p>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-1.5">
                <span
                  v-for="pill in platesFeaturePills"
                  :key="pill"
                  class="rounded-full border border-[#ff5c52]/18 bg-[#ff4a42]/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#ffe2de]"
                >
                  {{ pill }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div class="relative mt-3 flex flex-col gap-3 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div v-if="project.technologies.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in visibleTechnologies"
              :key="tech"
              class="rounded-full bg-[#ff4a42]/12 px-2.5 py-1 text-[10px] font-bold tracking-[0.02em] text-[#ffe2de] sm:px-3"
            >
              {{ tech }}
            </span>
            <span
              v-if="hiddenTechnologyCount"
              class="rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-white/62 sm:px-3"
            >
              +{{ hiddenTechnologyCount }}
            </span>
          </div>

          <div
            v-if="project.storeLinks.length || (project.infoModalKey && openInfoModal && infoButtonText)"
            class="flex flex-wrap items-center gap-2"
          >
            <a
              v-for="link in project.storeLinks"
              :key="`${link.type}-${link.url}`"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-white/14 bg-white px-1.5 py-1 transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff1ef]"
              :title="link.type"
            >
              <img
                v-if="storeBadgeSrc[link.type]"
                :src="storeBadgeSrc[link.type]"
                alt=""
                class="h-8 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span v-else class="px-2 py-1 text-xs font-bold text-[#4a1111]">{{ link.label ?? link.type }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="isMAlienProject(project)"
      class="m-alien-case-card relative mx-auto w-full overflow-hidden rounded-[30px] border border-[#123247] p-2.5 text-white shadow-[0_30px_80px_rgba(0,8,18,0.54)] sm:p-3"
    >
      <div class="pointer-events-none absolute inset-0 m-alien-case-surface"></div>
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#6fe7ff]/24"></div>

      <div class="relative z-10">
        <section class="m-alien-hero relative overflow-hidden rounded-[26px] px-3 py-3 sm:px-4">
          <div class="m-alien-saucer-field pointer-events-none absolute inset-0" aria-hidden="true">
            <span v-for="index in 12" :key="`m-alien-saucer-${index}`" class="m-alien-saucer"></span>
          </div>

          <div class="relative z-10 grid gap-3 min-[1180px]:grid-cols-[minmax(0,1fr)_minmax(390px,0.58fr)] min-[1180px]:items-stretch">
            <div class="min-w-0">
              <div class="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                <img
                  v-if="project.iconUrl"
                  :src="project.iconUrl"
                  alt=""
                  class="h-14 w-14 shrink-0 rounded-[20px] border border-[#6fe7ff]/24 object-cover shadow-[0_0_42px_rgba(65,217,255,0.26)]"
                  loading="lazy"
                  decoding="async"
                />
                <div class="min-w-0">
                  <p class="text-[10px] font-black uppercase tracking-[0.28em] text-[#6fe7ff]">
                    Internal NDA messenger / AI drone company
                  </p>
                  <h2 class="mt-1 text-[2.1rem] font-black leading-[0.98] text-white sm:text-[2.75rem]">
                    M-Alien
                  </h2>
                  <p class="mt-1.5 max-w-3xl text-[13px] font-semibold leading-5 text-[#c7e9f3]">
                    {{ mAlienSystemTitle }}
                  </p>
                </div>
              </div>

              <p
                class="m-alien-compact-lead mt-3 max-w-4xl text-[13px] font-semibold leading-6 text-[#e5f9ff]/90 [&_strong]:text-white"
                v-html="project.description"
              ></p>

              <div class="m-alien-flow-map relative mt-3 overflow-hidden rounded-[22px] border border-[#6fe7ff]/14 p-2.5">
                <div class="mb-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p class="text-[9px] font-black uppercase tracking-[0.24em] text-[#6fe7ff]">
                      {{ locale.startsWith('ru') ? 'Командный контур' : 'Command circuit' }}
                    </p>
                    <h3 class="mt-0.5 text-sm font-black leading-tight text-white">
                      {{ locale.startsWith('ru') ? 'Закрытый real-time продукт, собранный по слоям' : 'Closed realtime product, arranged by layers' }}
                    </h3>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="fact in mAlienMissionFacts"
                      :key="fact.label"
                      class="rounded-full border border-[#6fe7ff]/14 bg-[#6fe7ff]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#dcfaff]"
                    >
                      {{ fact.label }}
                    </span>
                  </div>
                </div>

                <div class="m-alien-command-route grid gap-2 min-[760px]:grid-cols-3">
                  <div
                    v-for="(highlight, index) in mAlienSystemHighlights"
                    :key="highlight.label"
                    class="m-alien-flow-node relative min-w-0 rounded-[16px] border border-[#6fe7ff]/14 bg-white/[0.06] p-3"
                  >
                    <div class="flex items-center gap-2">
                      <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#6fe7ff]/18 bg-[#6fe7ff]/12 text-[10px] font-black text-[#dffaff]">
                        {{ index + 1 }}
                      </span>
                      <p class="text-[10px] font-black uppercase tracking-[0.14em] text-[#86ecff]">
                        {{ highlight.label }}
                      </p>
                    </div>
                    <p class="m-alien-node-copy mt-1.5 text-[12px] font-semibold leading-5 text-[#edfaff]/86">
                      {{ highlight.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside class="m-alien-orbit-console relative min-w-0 overflow-hidden rounded-[24px] border border-[#6fe7ff]/14 p-3">
              <div class="relative mx-auto flex min-h-[238px] max-w-[430px] items-center justify-center">
                <div class="m-alien-orbit-ring m-alien-orbit-ring--outer"></div>
                <div class="m-alien-orbit-ring m-alien-orbit-ring--middle"></div>
                <div class="m-alien-orbit-ring m-alien-orbit-ring--inner"></div>
                <div class="m-alien-abduction-beam"></div>
                <span
                  v-for="tech in mAlienOrbitStack"
                  :key="tech.label"
                  class="m-alien-orbit-tech"
                  :class="tech.className"
                >
                  {{ tech.label }}
                </span>

                <div class="m-alien-mothership relative grid h-28 w-28 place-items-center rounded-[32px] border border-[#6fe7ff]/28">
                  <img
                    v-if="project.iconUrl"
                    :src="project.iconUrl"
                    alt=""
                    class="h-20 w-20 rounded-[26px] object-cover shadow-[0_0_42px_rgba(111,231,255,0.26)]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div class="mt-2 grid gap-2 min-[520px]:grid-cols-2 min-[1180px]:grid-cols-2">
                <div
                  v-for="group in mAlienStackGroups"
                  :key="group.label"
                  class="m-alien-stack-tile rounded-[16px] border border-white/10 p-2.5"
                >
                  <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#6fe7ff]/82">
                    {{ group.label }}
                  </p>
                  <p class="mt-1 text-[11px] font-semibold leading-[1.35] text-white/84">
                    {{ group.value }}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section class="m-alien-screen-strip relative mt-3 overflow-hidden rounded-[28px] border border-[#6fe7ff]/14 p-3 sm:p-4">
          <div class="mb-2 flex items-center justify-between gap-2">
            <p class="text-[10px] font-black uppercase tracking-[0.24em] text-[#6fe7ff]">
              {{ locale.startsWith('ru') ? 'Экраны приложения' : 'Application screens' }}
            </p>
            <span class="w-fit rounded-full border border-[#6fe7ff]/16 bg-[#6fe7ff]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#dcfaff]">
              {{ project.galleryUrls.length }} screens
            </span>
          </div>

          <div class="m-alien-screen-row flex gap-0 overflow-x-auto pb-2 pt-1">
            <button
              v-for="item in mAlienShowcaseItems"
              :key="`${project.id}-m-alien-screen-${item.galleryIndex}`"
              type="button"
              class="m-alien-screen-card group w-[200px] shrink-0 rounded-[24px] border-0 p-0 text-left transition sm:w-[240px] min-[1180px]:w-[214px]"
              @click="openLightbox(project.id, item.galleryIndex)"
            >
              <div class="m-alien-screen-frame flex h-[390px] items-center justify-center rounded-[22px] sm:h-[440px] min-[1180px]:h-[430px]">
                <img
                  :src="item.src"
                  :alt="item.label"
                  class="h-full w-full object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.42)] transition duration-300 group-hover:scale-[1.025]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </button>
          </div>

          <div class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="pill in mAlienFeaturePills"
              :key="pill"
              class="rounded-full border border-[#6fe7ff]/12 bg-[#6fe7ff]/10 px-2.5 py-1 text-[10px] font-bold text-[#dcfaff]"
            >
              {{ pill }}
            </span>
          </div>

          <div
            v-if="project.storeLinks.length || (project.infoModalKey && openInfoModal && infoButtonText)"
            class="mt-4 flex flex-wrap items-center gap-2 border-t border-[#6fe7ff]/10 pt-4"
          >
            <a
              v-for="link in project.storeLinks"
              :key="`${link.type}-${link.url}`"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/14 bg-white px-2 py-1.5 transition duration-200 hover:-translate-y-0.5 hover:bg-[#e9fbff]"
              :title="link.type"
            >
              <img
                v-if="storeBadgeSrc[link.type]"
                :src="storeBadgeSrc[link.type]"
                alt=""
                class="h-9 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span v-else class="px-2 py-1 text-xs font-bold text-[#05283a]">{{ link.label ?? link.type }}</span>
            </a>
            <button
              v-if="project.infoModalKey && openInfoModal && infoButtonText"
              type="button"
              class="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[#6fe7ff]/20 bg-[#6fe7ff]/13 px-4 text-sm font-black text-[#effdff] shadow-[0_14px_28px_rgba(65,217,255,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6fe7ff]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fe7ff]"
              @click="openInfoModal(project.id)"
            >
              {{ infoButtonText }}
              <span class="grid h-6 w-6 place-items-center rounded-full bg-[#dcfaff] text-base leading-none text-[#053142] transition duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>

    <div
      v-else
      class="project-ticket-shell relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[rgba(46,20,18,0.15)] bg-[#fff8f3] shadow-[0_10px_24px_rgba(32,14,12,0.08)] min-[900px]:grid min-[900px]:items-stretch"
      :style="{ '--ticket-stub-width': `${ticketStubWidth}px`, '--ticket-card-height': `${ticketCardHeight}px` }"
      :class="[
        isInsentryCase ? 'project-ticket-shell--insentry border-[#9DB5C9]/45 bg-[#EEF4F7] shadow-[0_16px_36px_rgba(50,73,88,0.14)]' : '',
        isTeleprompterAutomaticProject(project) ? 'project-ticket-shell--teleprompter border-[#1f3f2a]/70 bg-[#0d120d] shadow-[0_22px_54px_rgba(5,16,8,0.34)]' : '',
        isMAlienProject(project) ? 'project-ticket-shell--m-alien border-[#41d9ff]/24 bg-[#071421] shadow-[0_24px_58px_rgba(3,17,32,0.36)]' : '',
      ]">
      <div v-if="isTeleprompterAutomaticProject(project) || isMAlienProject(project)" class="pointer-events-none absolute inset-0 z-[1] opacity-35">
        <img :src="holographicOverlay" alt="" class="h-full w-full object-cover mix-blend-screen" />
      </div>

      <section class="project-ticket-info relative flex min-w-0 overflow-hidden bg-[#f7f8fa] p-3.5"
        :class="[
          isCybersecurityCard ? 'min-[900px]:overflow-visible' : '',
          isInsentryCase ? 'bg-[#EAF2F6]' : '',
          isTeleprompterAutomaticProject(project) ? 'project-ticket-info--teleprompter bg-[#101510] text-white' : '',
          isMAlienProject(project) ? 'project-ticket-info--m-alien bg-[#071421] text-white' : '',
        ]">
        <div class="relative z-10 flex flex-1 flex-col overflow-hidden">
          <div class="flex items-start gap-4">
            <img v-if="project.iconUrl" :src="project.iconUrl" alt=""
              class="h-14 w-14 shrink-0 rounded-[20px] border object-cover shadow-[0_8px_20px_rgba(47,37,33,0.12)]"
              :class="[
                isInsentryCase ? 'border-[#9DB5C9]/55 bg-white shadow-[0_10px_22px_rgba(50,73,88,0.16)]' : 'border-black/10',
                isTeleprompterAutomaticProject(project) ? 'border-white/18 bg-[#091209] shadow-[0_0_34px_rgba(42,217,93,0.24)] ring-1 ring-[#46d66e]/22' : '',
                isMAlienProject(project) ? 'border-white/18 bg-[#061926] shadow-[0_0_34px_rgba(65,217,255,0.22)] ring-1 ring-[#41d9ff]/22' : '',
              ]"
              loading="lazy" decoding="async" />

            <div class="min-w-0 flex-1 self-center">
              <p v-if="project.eyebrow" class="mb-1 text-[10px] font-black uppercase tracking-[0.18em]"
                :class="isTeleprompterAutomaticProject(project) ? 'text-[#8af5a9]' : isMAlienProject(project) ? 'text-[#6fe7ff]' : isInsentryCase ? 'text-[#466B83]' : 'text-[#6F5643]'">
                {{ project.eyebrow }}
              </p>
              <div class="flex min-w-0 items-start gap-3">
                <h2 class="line-clamp-2 min-w-0 text-base font-black leading-tight sm:text-lg"
                  :class="isTeleprompterAutomaticProject(project) || isMAlienProject(project) ? 'text-white' : isInsentryCase ? 'text-[#172A37]' : 'text-[#231814]'">
                  {{ project.title }}
                </h2>
                <div class="flex-1"></div>
                <div v-if="project.clientCountries?.length" class="flex shrink-0 flex-wrap justify-end gap-1">
                  <span
                    v-for="country in project.clientCountries"
                    :key="country.name"
                    class="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#b0464a]/18 bg-[#fff7ec]/86 px-1.5 py-1 text-[9px] font-bold leading-none text-[#743225] shadow-[0_6px_12px_rgba(116,50,37,0.08)]"
                    :class="isTeleprompterAutomaticProject(project) ? 'border-[#78ee99]/22 bg-white/8 text-[#d9ffe3] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : isMAlienProject(project) ? 'border-[#6fe7ff]/24 bg-white/8 text-[#d9f9ff] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : isInsentryCase ? 'border-[#5E8DA9]/22 bg-white/58 text-[#38576A]' : ''"
                  >
                    <img
                      v-if="country.flagUrl"
                      :src="country.flagUrl"
                      alt=""
                      class="h-3 w-[18px] shrink-0 rounded-[2px] object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      v-else
                      class="h-2 w-2 shrink-0 rounded-full bg-[#b0464a]"
                      :class="isMAlienProject(project) ? 'bg-[#41d9ff]' : isInsentryCase ? 'bg-[#5E8DA9]' : ''"
                      aria-hidden="true"
                    ></span>
                    <span class="whitespace-nowrap">
                      {{ country.name }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div :class="isInsentryCase ? 'mt-3 grid gap-3 min-[1180px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[1180px]:items-stretch' : ''">
            <div
              v-if="!isTeleprompterAutomaticProject(project)"
              class="rounded-[18px] bg-white/58 p-3.5"
              :class="[
                isInsentryCase ? 'bg-white/48' : 'mt-3',
                isCybersecurityCard ? 'bg-[#fffaf3]/60' : '',
                isMAlienProject(project) ? 'm-alien-lead-panel border border-[#6fe7ff]/14 bg-white/[0.07]' : '',
              ]">
              <p
                class="text-sm leading-6 text-[#4f413c] [&_a]:mt-2 [&_a]:inline-flex [&_a]:w-fit [&_a]:items-center [&_a]:rounded-full [&_a]:border [&_a]:border-[#AC3F2B]/20 [&_a]:bg-[#AC3F2B]/10 [&_a]:px-3 [&_a]:py-1.5 [&_a]:text-xs [&_a]:font-bold [&_a]:text-[#8B3224] [&_a]:no-underline [&_a]:shadow-[0_8px_18px_rgba(172,63,43,0.10)] [&_a]:transition [&_a:hover]:-translate-y-0.5 [&_a:hover]:bg-[#AC3F2B]/16"
                :class="isMAlienProject(project) ? 'text-[13px] font-medium leading-6 text-[#dff8ff] [&_strong]:text-white' : isInsentryCase ? 'text-[13px] leading-5 text-[#344956]' : isCybersecurityCard ? 'line-clamp-8 text-[13px] leading-5' : 'line-clamp-6'"
                v-html="project.description"></p>
            </div>

            <div
              v-else
              class="teleprompter-lead-panel relative mt-3 overflow-hidden rounded-[24px] border border-[#78f09a]/16 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div class="relative grid gap-4 min-[1180px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] min-[1180px]:items-center">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="teleprompter-icon-glass grid h-[92px] w-[92px] shrink-0 place-items-center rounded-[28px] border border-white/14">
                    <img
                      v-if="project.iconUrl"
                      :src="project.iconUrl"
                      alt=""
                      class="h-[76px] w-[76px] rounded-[24px] object-cover shadow-[0_22px_48px_rgba(20,255,91,0.24)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div class="min-w-0">
                    <p class="text-[9px] font-black uppercase tracking-[0.24em] text-[#8af5a9]">
                      Full-stack commercial product
                    </p>
                    <h3 class="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
                      {{ teleprompterSystemTitle }}
                    </h3>
                    <p class="mt-1 text-[12px] font-semibold leading-5 text-[#a9cfb1]">
                      App Store / Google Play / backend / web / payments / releases
                    </p>
                  </div>
                </div>

                <p
                  class="text-[13px] font-medium leading-6 text-[#e2f5e6] [&_strong]:text-white"
                  v-html="project.description"
                ></p>
              </div>
            </div>

            <div
              v-if="isTeleprompterAutomaticProject(project)"
              class="relative mt-3 overflow-hidden rounded-[24px] border border-[#69f08f]/18 bg-[linear-gradient(135deg,rgba(5,8,6,0.92)_0%,rgba(9,25,13,0.92)_58%,rgba(12,44,22,0.9)_100%)] p-3.5 text-white shadow-[0_22px_42px_rgba(0,0,0,0.34)]"
            >
              <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#9affb6]/26"></div>

              <div class="relative flex flex-col gap-3">
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div class="max-w-xl">
                    <p class="text-[9px] font-black uppercase tracking-[0.24em] text-[#8af5a9]">
                      {{ locale.startsWith('ru') ? 'Сложные задачи, которые были закрыты' : 'Hard problems solved' }}
                    </p>
                    <h3 class="mt-1 text-base font-black leading-tight text-[#f6fff8]">
                      {{ locale.startsWith('ru') ? 'То, где заказчик обычно говорит “вау”' : 'Where the client usually says “wow”' }}
                    </h3>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="stat in teleprompterStats"
                      :key="stat.label"
                      class="rounded-full border border-[#8af5a9]/14 bg-[#8af5a9]/10 px-2.5 py-1 text-[10px] font-bold text-[#dfffe7]"
                    >
                      <strong class="text-white">{{ stat.value }}</strong>
                      {{ stat.label }}
                    </span>
                  </div>
                </div>

                <div class="grid gap-2 min-[1180px]:grid-cols-3">
                  <div
                    v-for="(highlight, index) in teleprompterSolvedHighlights"
                    :key="highlight.label"
                    class="teleprompter-hard-problem min-w-0 rounded-[18px] border border-[#8af5a9]/14 bg-white/[0.07] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur"
                  >
                    <div class="flex items-center gap-2">
                      <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#8af5a9]/18 bg-[#8af5a9]/12 text-[10px] font-black text-[#bbffd0]">
                        {{ index + 1 }}
                      </span>
                      <p class="text-[10px] font-black uppercase tracking-[0.14em] text-[#8af5a9]">
                        {{ highlight.label }}
                      </p>
                    </div>
                    <p class="mt-2 text-[12px] font-semibold leading-5 text-[#edf9f0]/90">
                      {{ highlight.text }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-1.5 rounded-[18px] border border-[#8af5a9]/10 bg-black/20 p-2.5">
                  <span
                    v-for="pill in teleprompterFeaturePills"
                    :key="pill"
                    class="rounded-full border border-[#8af5a9]/12 bg-[#8af5a9]/10 px-2.5 py-1 text-[10px] font-bold text-[#dfffe7]"
                  >
                    {{ pill }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-if="isMAlienProject(project)"
              class="m-alien-architecture-panel relative mt-3 overflow-hidden rounded-[24px] border border-[#5ab7df]/24 p-3.5 text-white shadow-[0_22px_42px_rgba(0,0,0,0.24)]"
            >
              <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#9befff]/28"></div>

              <div class="relative flex flex-col gap-3">
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div class="max-w-2xl">
                    <p class="text-[9px] font-black uppercase tracking-[0.24em] text-[#6fe7ff]">
                      {{ locale.startsWith('ru') ? 'Архитектура мессенджера' : 'Messenger architecture' }}
                    </p>
                    <h3 class="mt-1 text-base font-black leading-tight text-white">
                      {{ mAlienSystemTitle }}
                    </h3>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="fact in mAlienMissionFacts"
                      :key="fact.label"
                      class="rounded-full border border-[#6fe7ff]/16 bg-[#6fe7ff]/10 px-2.5 py-1 text-[10px] font-bold text-[#dcfaff]"
                    >
                      {{ fact.label }}
                    </span>
                  </div>
                </div>

                <div class="grid gap-2 min-[1180px]:grid-cols-4">
                  <div
                    v-for="highlight in mAlienSystemHighlights"
                    :key="highlight.label"
                    class="m-alien-hard-problem min-w-0 rounded-[18px] border border-[#6fe7ff]/14 bg-white/[0.07] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur"
                  >
                    <p class="text-[10px] font-black uppercase tracking-[0.14em] text-[#86ecff]">
                      {{ highlight.label }}
                    </p>
                    <p class="mt-2 text-[12px] font-semibold leading-5 text-[#edfaff]/90">
                      {{ highlight.text }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-2 min-[1180px]:grid-cols-2">
                  <div
                    v-for="group in mAlienStackGroups"
                    :key="group.label"
                    class="rounded-[16px] border border-white/10 bg-black/18 p-3"
                  >
                    <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#6fe7ff]/82">
                      {{ group.label }}
                    </p>
                    <p class="mt-1 text-[12px] font-semibold leading-5 text-white/82">
                      {{ group.value }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-1.5 rounded-[18px] border border-[#6fe7ff]/10 bg-black/20 p-2.5">
                  <span
                    v-for="pill in mAlienFeaturePills"
                    :key="pill"
                    class="rounded-full border border-[#6fe7ff]/12 bg-[#6fe7ff]/10 px-2.5 py-1 text-[10px] font-bold text-[#dcfaff]"
                  >
                    {{ pill }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-if="isToneOfVictoryProject(project)"
              class="mt-3 overflow-hidden rounded-[24px] border border-[#e3b06d]/24 bg-[linear-gradient(135deg,rgba(16,17,20,0.96)_0%,rgba(82,31,29,0.95)_54%,rgba(189,93,54,0.92)_100%)] p-3 text-white shadow-[0_20px_38px_rgba(85,35,28,0.24)]"
            >
              <div class="grid gap-3 min-[1180px]:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] min-[1180px]:items-stretch">
                <div class="flex min-w-0 flex-col">
                  <p class="text-[10px] font-black uppercase tracking-[0.22em] text-[#f4b48b]">
                    TAG Heuer x Formula 1
                  </p>
                  <h3 class="mt-1 text-base font-black leading-tight text-[#fff4ea]">
                    {{ t('home.featuredCaseTitle') }}
                  </h3>
                  <p class="mt-2 text-[12px] leading-5 text-white/76">
                    {{ t('home.featuredCaseLead') }}
                  </p>

                  <div class="mt-3 grid gap-2 sm:grid-cols-3 min-[1180px]:grid-cols-1">
                    <div class="rounded-[14px] border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                      <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#ffd1ad]">
                        {{ t('home.featuredCaseFacts.clientLabel') }}
                      </p>
                      <p class="mt-1 text-[11px] leading-4 text-white/86">
                        {{ t('home.featuredCaseFacts.clientValue') }}
                      </p>
                    </div>
                    <div class="rounded-[14px] border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                      <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#ffd1ad]">
                        {{ t('home.featuredCaseFacts.formatLabel') }}
                      </p>
                      <p class="mt-1 text-[11px] leading-4 text-white/86">
                        {{ t('home.featuredCaseFacts.formatValue') }}
                      </p>
                    </div>
                    <div class="rounded-[14px] border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                      <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#ffd1ad]">
                        {{ t('home.featuredCaseStand.meta') }}
                      </p>
                      <p class="mt-1 text-[11px] leading-4 text-white/86">
                        {{ t('home.featuredCaseStand.description') }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid min-h-[230px] gap-2 sm:grid-cols-[1.16fr_0.84fr]">
                  <button
                    v-if="toneOfVictoryStandUrls[0]"
                    type="button"
                    class="group relative overflow-hidden rounded-[18px] border border-white/14 bg-white/8 p-1.5 text-left shadow-[0_16px_28px_rgba(0,0,0,0.22)] transition hover:border-[#f4b48b]/50 focus:outline-none focus:ring-2 focus:ring-[#f4b48b]/70"
                    @click="openToneStandPreview(toneOfVictoryStandUrls[0])"
                  >
                    <img
                      :src="toneOfVictoryStandUrls[0]"
                      :alt="`${project.title} stand 1`"
                      class="h-full min-h-[230px] w-full rounded-[14px] object-cover transition duration-300 group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                    <span class="absolute left-3 top-3 rounded-full border border-white/18 bg-black/42 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                      Spring 2025
                    </span>
                  </button>

                  <div class="grid gap-2">
                    <button
                      v-for="(src, standIndex) in toneOfVictoryStandUrls.slice(1)"
                      :key="`${project.id}-stand-${standIndex + 2}`"
                      type="button"
                      class="group relative overflow-hidden rounded-[18px] border border-white/14 bg-white/8 p-1.5 text-left shadow-[0_12px_22px_rgba(0,0,0,0.18)] transition hover:border-[#f4b48b]/50 focus:outline-none focus:ring-2 focus:ring-[#f4b48b]/70"
                      @click="openToneStandPreview(src)"
                    >
                      <img
                        :src="src"
                        :alt="`${project.title} stand ${standIndex + 2}`"
                        class="h-[108px] w-full rounded-[14px] object-cover transition duration-300 group-hover:scale-[1.025]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="absolute left-3 top-3 rounded-full border border-white/18 bg-black/42 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                        South Korea
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="project.solvedTasks?.length" class="rounded-[18px] p-3"
              :class="isInsentryCase ? 'bg-white/48' : 'mt-3 bg-white/56'">
              <p class="text-[10px] font-black uppercase tracking-[0.18em]"
                :class="isInsentryCase ? 'text-[#466B83]' : 'text-[#6F5643]'">
                {{ project.solvedTasksTitle }}
              </p>
              <div class="mt-2 grid gap-2">
                <div v-for="task in project.solvedTasks" :key="task" class="flex gap-2 text-[12px] leading-5"
                  :class="isInsentryCase ? 'text-[#344956]' : 'text-[#4f413c]'">
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    :class="isInsentryCase ? 'bg-[#5E8DA9]' : 'bg-[#D96138]'"></span>
                  <span>{{ task }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="project.technologies.length" class="mt-3">
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tech in visibleTechnologies" :key="tech"
              class="rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.02em] sm:px-3"
              :class="isTeleprompterAutomaticProject(project) ? 'border-[#8af5a9]/16 bg-[#8af5a9]/10 text-[#dfffe7]' : isMAlienProject(project) ? 'border-[#6fe7ff]/16 bg-[#6fe7ff]/10 text-[#dcfaff]' : isInsentryCase ? 'border-[#9DB5C9]/32 bg-[#E6F0F4] text-[#38576A]' : 'border-black/10 bg-[#FAF7F1] text-black/65'">
                {{ tech }}
              </span>
              <span v-if="hiddenTechnologyCount"
                class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] sm:px-3"
                :class="isTeleprompterAutomaticProject(project) ? 'border-[#8af5a9]/14 bg-white/8 text-[#9ff8b7]' : isMAlienProject(project) ? 'border-[#6fe7ff]/14 bg-white/8 text-[#86ecff]' : isInsentryCase ? 'border-[#9DB5C9]/26 bg-white/50 text-[#466B83]' : 'border-black/10 bg-white/70 text-black/50'">
                +{{ hiddenTechnologyCount }}
              </span>
            </div>
          </div>

          <div
            v-if="project.storeLinks.length || (project.infoModalKey && openInfoModal && infoButtonText)"
            class="mt-auto flex flex-wrap items-center gap-2 pt-3">
            <a v-for="link in project.storeLinks" :key="`${link.type}-${link.url}`" :href="link.url" target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-2xl border border-black/8 bg-white/84 px-2 py-1.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(47,37,33,0.12)]"
              :title="link.type">
              <img v-if="storeBadgeSrc[link.type]" :src="storeBadgeSrc[link.type]" alt="" class="h-10 object-contain"
                loading="lazy" decoding="async" />
              <span v-else class="px-2 py-1 text-xs font-bold text-[#5d4a43]">{{ link.label ?? link.type }}</span>
            </a>
            <button type="button"
              v-if="project.infoModalKey && openInfoModal && infoButtonText"
              class="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-[#241814] bg-[#241814] px-4 py-2.5 text-sm font-black text-[#fff8ee] shadow-[0_12px_24px_rgba(35,24,20,0.22)] ring-1 ring-white/55 transition duration-200 hover:-translate-y-0.5 hover:bg-[#3a2822] hover:shadow-[0_16px_30px_rgba(35,24,20,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#241814]"
              :class="isMAlienProject(project) ? 'border-[#6fe7ff]/20 bg-[#6fe7ff]/14 text-[#effdff] shadow-[0_14px_28px_rgba(65,217,255,0.12)] ring-1 ring-[#bff6ff]/12 hover:bg-[#6fe7ff]/20 focus-visible:outline-[#6fe7ff]' : ''"
              @click="openInfoModal(project.id)">
              {{ infoButtonText }}
              <span
                class="grid h-6 w-6 place-items-center rounded-full bg-[#fff8ee] text-base leading-none text-[#9f3a31] transition duration-200 group-hover:translate-x-0.5 group-hover:bg-white"
                :class="isMAlienProject(project) ? 'bg-[#dcfaff] text-[#053142]' : ''"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      <div class="project-ticket-divider relative block min-h-[22px] bg-transparent min-[900px]:min-h-0" aria-hidden="true">
        <span
          class="absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[rgba(125,96,83,0.65)] min-[900px]:top-3 min-[900px]:bottom-3 min-[900px]:left-1/2 min-[900px]:right-auto min-[900px]:translate-x-[-50%] min-[900px]:translate-y-0 min-[900px]:border-t-0 min-[900px]:border-l-2"
          :class="isInsentryCase ? 'border-[#7B97AA]/36' : ''"></span>
      </div>

      <section class="project-ticket-gallery relative flex min-w-0 items-center justify-center bg-transparent p-0">
        <div
          v-if="isTeleprompterAutomaticProject(project)"
          class="teleprompter-showcase relative z-10 flex h-full w-full flex-col overflow-hidden p-3"
        >
          <div class="mb-3 flex items-center justify-between gap-3">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.22em] text-[#8af5a9]">
                {{ locale.startsWith('ru') ? 'Живая витрина' : 'Live showcase' }}
              </p>
              <p class="mt-1 text-sm font-black leading-tight text-white">
                {{ activeTeleprompterShowcase?.type === 'web' ? 'Web panel' : 'iOS app' }}
              </p>
            </div>
            <button
              v-if="activeTeleprompterShowcase"
              type="button"
              class="rounded-full border border-[#8af5a9]/18 bg-[#8af5a9]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#ddffe6] transition hover:bg-[#8af5a9]/16"
              @click="openTeleprompterShowcase(selectedTeleprompterShowcaseIndex)"
            >
              {{ locale.startsWith('ru') ? 'Открыть' : 'Open' }}
            </button>
          </div>

          <button
            v-if="activeTeleprompterShowcase"
            type="button"
            class="teleprompter-showcase-main group relative min-h-0 flex-1 overflow-hidden rounded-[26px] border border-white/12 bg-black/28 p-2 text-left shadow-[0_24px_52px_rgba(0,0,0,0.38)] transition hover:border-[#8af5a9]/28"
            @click="openTeleprompterShowcase(selectedTeleprompterShowcaseIndex)"
          >
            <div
              v-if="activeTeleprompterShowcase.type === 'web'"
              class="mb-2 flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3"
            >
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
              <span class="ml-auto text-[9px] font-bold text-white/54">dashboard.teleprompter.pw</span>
            </div>
            <div
              v-else
              class="mb-2 flex h-7 items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3"
            >
              <span class="text-[9px] font-black uppercase tracking-[0.14em] text-white/70">iPhone 17 Pro</span>
              <span class="ml-auto text-[9px] font-bold text-white/46">iOS</span>
            </div>
            <div class="relative h-[calc(100%-2.25rem)] overflow-hidden rounded-[20px] bg-[#050805]">
              <img
                :src="activeTeleprompterShowcase.src"
                :alt="activeTeleprompterShowcase.label"
                class="h-full w-full transition duration-300 group-hover:scale-[1.015]"
                :class="activeTeleprompterShowcase.type === 'web' ? 'object-cover object-left-top' : 'object-contain'"
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>

          <div class="mt-3 grid grid-cols-2 gap-2">
            <button
              v-for="(item, index) in teleprompterShowcaseItems"
              :key="`${item.label}-${index}`"
              type="button"
              class="group min-w-0 rounded-[18px] border p-1.5 text-left transition"
              :class="selectedTeleprompterShowcaseIndex === index ? 'border-[#8af5a9]/40 bg-[#8af5a9]/15' : 'border-white/10 bg-white/[0.06] hover:border-[#8af5a9]/25'"
              @click="selectTeleprompterShowcase(index)"
            >
              <div class="h-16 overflow-hidden rounded-[13px] bg-black/32">
                <img
                  :src="item.src"
                  :alt="item.label"
                  class="h-full w-full transition duration-300 group-hover:scale-[1.03]"
                  :class="item.type === 'web' ? 'object-cover object-left-top' : 'object-contain'"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="mt-1.5 truncate text-[10px] font-black text-white">
                {{ item.label }}
              </p>
              <p class="truncate text-[9px] font-semibold text-[#b5d7bd]">
                {{ item.caption }}
              </p>
            </button>
          </div>
        </div>

        <div
          v-else-if="isMAlienProject(project)"
          class="m-alien-showcase relative z-10 flex h-full w-full flex-col overflow-hidden p-3"
        >
          <div class="mb-3 flex items-center justify-between gap-3">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.22em] text-[#6fe7ff]">
                {{ locale.startsWith('ru') ? 'Живой messenger flow' : 'Live messenger flow' }}
              </p>
              <p class="mt-1 text-sm font-black leading-tight text-white">
                Flutter app / realtime core
              </p>
            </div>
            <span class="rounded-full border border-[#6fe7ff]/18 bg-[#6fe7ff]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#dcfaff]">
              {{ project.galleryUrls.length }} screens
            </span>
          </div>

          <button
            v-if="mAlienShowcaseItems[0]"
            type="button"
            class="m-alien-phone-stage group relative min-h-0 flex-1 overflow-hidden rounded-[26px] border border-white/12 bg-black/28 p-3 text-left shadow-[0_24px_52px_rgba(0,0,0,0.34)] transition hover:border-[#6fe7ff]/30"
            @click="openLightbox(project.id, mAlienShowcaseItems[0].galleryIndex)"
          >
            <div class="mb-2 flex h-7 items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3">
              <span class="h-2 w-2 rounded-full bg-[#6fe7ff] shadow-[0_0_12px_rgba(111,231,255,0.72)]"></span>
              <span class="text-[9px] font-black uppercase tracking-[0.14em] text-white/72">M-Alien secure session</span>
              <span class="ml-auto text-[9px] font-bold text-white/46">online</span>
            </div>
            <div class="relative h-[calc(100%-2.25rem)] overflow-hidden rounded-[20px] bg-[#050d14]">
              <img
                :src="mAlienShowcaseItems[0].src"
                :alt="mAlienShowcaseItems[0].label"
                class="h-full w-full object-contain transition duration-300 group-hover:scale-[1.015]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>

          <div class="mt-3 grid grid-cols-2 gap-2">
            <button
              v-for="item in mAlienShowcaseItems.slice(1, 5)"
              :key="`${item.label}-${item.galleryIndex}`"
              type="button"
              class="group min-w-0 rounded-[18px] border border-white/10 bg-white/[0.06] p-1.5 text-left transition hover:border-[#6fe7ff]/28"
              @click="openLightbox(project.id, item.galleryIndex)"
            >
              <div class="h-16 overflow-hidden rounded-[13px] bg-black/32">
                <img
                  :src="item.src"
                  :alt="item.label"
                  class="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="mt-1.5 truncate text-[10px] font-black text-white">
                {{ item.label }}
              </p>
            </button>
          </div>
        </div>

        <div v-else-if="!project.galleryUrls.length"
          class="project-ticket-gallery-panel relative z-10 flex w-full items-center justify-center px-4 text-center text-sm text-[#6e635d]">
          {{ noImagesText }}
        </div>

        <div v-else class="project-ticket-gallery-panel relative z-10 w-full">
          <div class="relative h-full">
            <div class="h-full w-full overflow-hidden" ref="emblaRef">
              <div class="flex h-full">
                <div v-for="(src, index) in project.galleryUrls" :key="`${project.id}-img-${index}`"
                  class="flex h-full min-w-full flex-[0_0_100%] items-center justify-center">
                  <img v-if="shouldRenderGalleryImage(index)" :src="src" :alt="`${project.title} ${index + 1}`"
                    class="block h-full w-full object-contain" loading="lazy" fetchpriority="low"
                    decoding="async" @click="openLightbox(project.id, index)" />
                  <div v-else class="h-full w-full" aria-hidden="true"></div>
                </div>
              </div>
            </div>

            <div v-if="project.galleryUrls.length > 1"
              class="pointer-events-none absolute inset-0 z-20 hidden items-center justify-between px-2 sm:flex">
              <button type="button"
                class="pointer-events-auto grid h-8 w-8 place-items-center rounded-full border border-black/8 bg-white/10 text-[#231814] backdrop-blur transition hover:bg-white/20"
                :class="{ 'opacity-35': !canScrollPrev }" aria-label="Previous" @click.stop="scrollPrev">
                ‹
              </button>
              <button type="button"
                class="pointer-events-auto grid h-8 w-8 place-items-center rounded-full border border-black/8 bg-white/10 text-[#231814] backdrop-blur transition hover:bg-white/20"
                :class="{ 'opacity-35': !canScrollNext }" aria-label="Next" @click.stop="scrollNext">
                ›
              </button>
            </div>
          </div>

          <div v-if="project.galleryUrls.length > 1"
            class="relative z-20 mt-3 flex items-center justify-center gap-3 sm:hidden">
            <button type="button"
              class="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm text-[#231814] backdrop-blur"
              :class="{ 'opacity-35': !canScrollPrev }" aria-label="Previous" @click.stop="scrollPrev">
              ‹
            </button>
            <button type="button"
              class="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm text-[#231814] backdrop-blur"
              :class="{ 'opacity-35': !canScrollNext }" aria-label="Next" @click.stop="scrollNext">
              ›
            </button>
          </div>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedToneStandUrl"
        class="fixed inset-0 z-[90] flex items-center justify-center bg-black/78 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click.self="closeToneStandPreview"
      >
        <div class="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/14 bg-[#120f0d] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            class="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-black/48 text-xl font-bold text-white backdrop-blur transition hover:bg-black/70"
            :aria-label="t('projects.closeModal')"
            @click="closeToneStandPreview"
          >
            ×
          </button>
          <img
            :src="selectedToneStandUrl"
            :alt="`${project.title} stand photo`"
            class="max-h-[82vh] w-full rounded-[22px] object-contain"
          />
        </div>
      </div>
    </Teleport>
  </article>
</template>

<style scoped>
/* ---- Компактная карточка исследования ---- */
.rcard{
  --ac:#5cf0c0;
  position:relative;display:grid;gap:.65rem .85rem;
  grid-template-columns:auto minmax(0,1fr);
  padding:.72rem .85rem;border-radius:10px;
  background:linear-gradient(158deg, rgba(16,26,34,.94), rgba(6,10,16,.98));
  box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ac) 20%, transparent);
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  transition:box-shadow .2s ease, transform .2s ease;
}
.rcard:hover{
  transform:translateY(-1px);
  box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ac) 42%, transparent), 0 .8rem 1.6rem rgba(0,0,0,.35);
}
.rcard::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:2px;border-radius:2px 0 0 2px;
  background:var(--ac);box-shadow:0 0 .5rem color-mix(in srgb, var(--ac) 55%, transparent);
}
.rcard--archive{--ac:#ffc14d}
@media(min-width:900px){
  .rcard{grid-template-columns:auto minmax(0,1fr) auto;align-items:start}
  .rcard-actions{align-self:center}
}
.rcard-leading{display:flex;align-items:flex-start;gap:.45rem;padding-left:.15rem}
.rcard-id{
  flex:none;font-size:.58rem;letter-spacing:.18em;line-height:1.6;
  color:color-mix(in srgb, var(--ac) 72%, #fff 28%);
}
.rcard-thumb{
  width:2.75rem;height:2.75rem;flex:none;border-radius:6px;object-fit:cover;
  border:1px solid color-mix(in srgb, var(--ac) 24%, transparent);
  filter:grayscale(1) contrast(1.06);
}
.rcard-body{min-width:0;display:grid;gap:.35rem}
.rcard-head{display:grid;gap:.18rem}
.rcard-eyebrow{
  display:flex;flex-wrap:wrap;align-items:center;gap:.35rem;
  font-size:.54rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(190,214,230,.48);
}
.rcard-eyebrow i{
  font-style:normal;padding:.06rem .32rem;
  border:1px solid color-mix(in srgb, var(--ac) 28%, transparent);
  color:color-mix(in srgb, var(--ac) 82%, #fff 18%);
}
.rcard-title{
  margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;font-weight:800;
  font-size:clamp(.88rem,1.6vw,1.05rem);line-height:1.25;color:#eef6fb;
}
.rcard-text{
  margin:0;font-size:.66rem;line-height:1.5;color:rgba(206,222,234,.6);
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;
}
.rcard-tags{display:flex;flex-wrap:wrap;gap:.25rem}
.rcard-tags span{
  padding:.1rem .36rem;font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;
  border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(220,234,244,.65);
}
.rcard-warn{
  display:flex;gap:.4rem;margin:0;padding:.35rem .45rem;
  border:1px dashed rgba(255,193,77,.4);background:rgba(255,193,77,.05);
  font-size:.58rem;line-height:1.45;color:#ffe2ad;
}
.rcard-warn b{flex:none;color:#ffc14d}
.rcard-actions{
  grid-column:1/-1;display:flex;flex-wrap:wrap;gap:.35rem;padding-top:.15rem;
  border-top:1px dashed rgba(255,255,255,.08);
}
@media(min-width:900px){
  .rcard-actions{
    grid-column:3;grid-row:1;display:grid;gap:.35rem;padding-top:0;border-top:0;justify-items:end;
  }
}
.rcard-link{
  display:inline-flex;align-items:center;gap:.32rem;padding:.32rem .58rem;text-decoration:none;
  border:1px solid color-mix(in srgb, var(--ac) 38%, transparent);
  background:color-mix(in srgb, var(--ac) 7%, transparent);
  font-family:inherit;font-size:.54rem;letter-spacing:.12em;text-transform:uppercase;
  color:color-mix(in srgb, var(--ac) 88%, #fff 12%);white-space:nowrap;
  transition:background .2s ease,color .2s ease;
}
.rcard-link:hover{background:color-mix(in srgb, var(--ac) 18%, transparent);color:#fff}
.rcard-link--ghost{border-style:dashed;color:rgba(220,234,244,.4);cursor:not-allowed}

.gold585-case-card {
  background:
    radial-gradient(ellipse 62% 52% at 18% 0%, rgba(212, 6, 28, 0.28), transparent 62%),
    radial-gradient(ellipse 34% 70% at 100% 28%, rgba(185, 137, 54, 0.16), transparent 70%),
    linear-gradient(126deg, #190407 0%, #3a050c 43%, #090204 100%);
  border-radius: 30px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 0 0 1px rgba(240, 195, 107, 0.08),
    inset 0 -140px 180px rgba(0, 0, 0, 0.36),
    0 30px 78px rgba(31, 5, 9, 0.44);
}

.gold585-case-card::before,
.gold585-case-card::after {
  position: absolute;
  pointer-events: none;
  content: "";
}

.gold585-case-card::before {
  inset: -24% auto auto 52%;
  width: 19rem;
  height: 150%;
  transform: rotate(14deg);
  background:
    linear-gradient(180deg, rgba(240, 195, 107, 0.12), rgba(212, 6, 28, 0.22), rgba(0, 0, 0, 0.18)),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.075) 0 1px, transparent 1px 22px);
  opacity: 0.78;
}

.gold585-case-card::after {
  right: -7rem;
  bottom: 10rem;
  width: 22rem;
  height: 22rem;
  border-radius: 999px;
  background:
    radial-gradient(circle, rgba(240, 195, 107, 0.12), rgba(212, 6, 28, 0.08) 36%, transparent 70%);
}

.gold585-case-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 23%),
    linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.045) 34%, transparent 58%),
    linear-gradient(300deg, rgba(0, 0, 0, 0.26), transparent 52%);
}

.gold585-hero {
  min-height: 560px;
  background:
    radial-gradient(ellipse 68% 50% at 78% 16%, rgba(212, 6, 28, 0.24), transparent 66%),
    radial-gradient(ellipse 56% 48% at 22% 6%, rgba(240, 195, 107, 0.13), transparent 64%),
    linear-gradient(145deg, #180306 0%, #3f060d 48%, #0a0203 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.11),
    inset 0 -110px 150px rgba(0, 0, 0, 0.34);
}

.gold585-hero-shade {
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.05), transparent 42%, rgba(0, 0, 0, 0.32)),
    repeating-linear-gradient(90deg, transparent 0 76px, rgba(240, 195, 107, 0.04) 76px 77px, transparent 77px 152px),
    repeating-linear-gradient(0deg, transparent 0 76px, rgba(240, 195, 107, 0.026) 76px 77px, transparent 77px 152px),
    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.30));
}

.gold585-store-backdrop {
  background:
    linear-gradient(90deg, rgba(24, 3, 7, 0.30), rgba(24, 3, 7, 0.60) 42%, rgba(24, 3, 7, 0.94) 100%),
    linear-gradient(180deg, rgba(24, 3, 7, 0.28), rgba(24, 3, 7, 0.82)),
    var(--gold585-store-bg) center center / cover no-repeat;
  opacity: 0.72;
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 54%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 54%, transparent 100%);
}

.gold585-store-backdrop::after {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 44% 40% at 20% 18%, rgba(240, 195, 107, 0.13), transparent 70%),
    repeating-linear-gradient(135deg, rgba(240, 195, 107, 0.055) 0 1px, transparent 1px 18px);
  content: "";
}

.gold585-hero-copy {
  text-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
}

.gold585-kicker {
  letter-spacing: 0.32em;
  color: #f0c36b;
}

.gold585-store-story {
  border-left: 1px solid rgba(240, 195, 107, 0.34);
  padding-left: 0.95rem;
  text-shadow: 0 10px 26px rgba(0, 0, 0, 0.36);
}

.gold585-retail-proof {
  max-width: 46rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(240, 195, 107, 0.28);
}

.gold585-retail-proof-value {
  text-shadow:
    0 0 26px rgba(212, 6, 28, 0.30),
    0 18px 34px rgba(0, 0, 0, 0.42);
}

.gold585-gallery-panel {
  filter: drop-shadow(0 30px 42px rgba(0, 0, 0, 0.38));
}

.gold585-gallery-shell {
  height: 32rem;
  background:
    radial-gradient(ellipse 58% 16% at 50% 91%, rgba(240, 195, 107, 0.11), transparent 70%);
}

.gold585-gallery-slide {
  cursor: zoom-in;
}

.gold585-proof-strip {
  border-top: 1px solid rgba(240, 195, 107, 0.18);
}

.gold585-tech-chip {
  display: inline-flex;
  align-items: center;
  min-height: 1.65rem;
  padding: 0.42rem 0.62rem;
  border: 1px solid rgba(240, 195, 107, 0.16);
  border-radius: 999px;
  background: rgba(255, 244, 216, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.055);
}

@media (max-width: 640px) {
  .gold585-hero {
    min-height: 0;
    background-position: 66% center;
  }

  .gold585-gallery-shell {
    height: 27rem;
  }
}

.teleprompter-case-card {
  background:
    radial-gradient(ellipse 62% 58% at 18% 22%, rgba(12, 132, 37, 0.44), rgba(4, 42, 13, 0.22) 42%, transparent 72%),
    radial-gradient(ellipse 48% 42% at 84% 14%, rgba(35, 255, 87, 0.12), transparent 68%),
    linear-gradient(142deg, #151713 0%, #080a07 46%, #020302 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.035),
    inset 0 -110px 180px rgba(0, 0, 0, 0.58),
    0 28px 74px rgba(0, 0, 0, 0.42);
}

.teleprompter-case-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 18%),
    linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.028) 36%, transparent 58%),
    linear-gradient(300deg, rgba(0, 0, 0, 0.26), transparent 44%);
}

.teleprompter-solved-timeline {
  position: relative;
}

.teleprompter-solved-timeline::before {
  position: absolute;
  top: 0.75rem;
  bottom: 0.75rem;
  left: 0.875rem;
  width: 1px;
  content: "";
  background: linear-gradient(180deg, rgba(142, 255, 170, 0.38), rgba(142, 255, 170, 0.06));
}

.teleprompter-showcase-stage {
  border-radius: 1.75rem;
  padding: 0.875rem;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018) 38%, rgba(9, 43, 16, 0.22));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    inset 0 -34px 72px rgba(0, 0, 0, 0.32);
}

.teleprompter-showcase-frame {
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.018) 32%, rgba(0, 0, 0, 0.18)),
    rgba(0, 0, 0, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 18px 46px rgba(0, 0, 0, 0.32);
}

.teleprompter-hero,
.teleprompter-proof-panel {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.022) 42%, rgba(43, 255, 92, 0.08)),
    rgba(0, 0, 0, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -42px 82px rgba(0, 0, 0, 0.32);
}

.teleprompter-hero::before,
.teleprompter-proof-panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.055), transparent 38%),
    repeating-linear-gradient(90deg, transparent 0 64px, rgba(142, 255, 170, 0.035) 64px 65px, transparent 65px 128px);
  opacity: 0.44;
}

.teleprompter-screen-strip {
  background:
    radial-gradient(ellipse 86% 64% at 60% 16%, rgba(142, 255, 170, 0.13), transparent 68%),
    linear-gradient(90deg, rgba(142, 255, 170, 0.08), transparent 20%, transparent 80%, rgba(142, 255, 170, 0.08)),
    rgba(1, 12, 4, 0.54);
}

.teleprompter-screen-strip::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 34%),
    repeating-linear-gradient(90deg, transparent 0 72px, rgba(142, 255, 170, 0.042) 72px 73px, transparent 73px 144px);
  opacity: 0.5;
}

.teleprompter-screen-row {
  position: relative;
  z-index: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(142, 255, 170, 0.28) rgba(255, 255, 255, 0.05);
}

.teleprompter-screen-row::-webkit-scrollbar {
  height: 8px;
}

.teleprompter-screen-row::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
}

.teleprompter-screen-row::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(142, 255, 170, 0.28);
}

.teleprompter-screen-card {
  position: relative;
  z-index: 1;
  background: transparent;
  box-shadow: none;
  filter: drop-shadow(0 28px 28px rgba(0, 0, 0, 0.32));
}

.teleprompter-screen-card + .teleprompter-screen-card {
  margin-left: -2.15rem;
}

.teleprompter-screen-card:hover {
  z-index: 8;
  transform: translateY(-0.55rem) scale(1.03);
  filter: drop-shadow(0 34px 30px rgba(0, 0, 0, 0.38)) drop-shadow(0 0 22px rgba(142, 255, 170, 0.16));
}

.teleprompter-screen-frame {
  background:
    radial-gradient(ellipse 72% 12% at 50% 100%, rgba(142, 255, 170, 0.16), transparent 70%);
}

@media (min-width: 1180px) {
  .teleprompter-screen-row {
    overflow-x: auto;
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }

  .teleprompter-screen-card + .teleprompter-screen-card {
    margin-left: -2.65rem;
  }
}

@media (max-width: 640px) {
  .teleprompter-screen-card + .teleprompter-screen-card {
    margin-left: -1.65rem;
  }
}

.tone-case-card {
  background:
    radial-gradient(ellipse 72% 64% at 82% 18%, rgba(255, 88, 54, 0.26), transparent 64%),
    radial-gradient(ellipse 58% 48% at 18% 20%, rgba(188, 12, 25, 0.6), rgba(82, 8, 14, 0.25) 44%, transparent 72%),
    linear-gradient(145deg, #2e0308 0%, #120104 46%, #070001 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.035),
    inset 0 -120px 190px rgba(0, 0, 0, 0.58),
    0 28px 74px rgba(35, 5, 7, 0.38);
}

.tone-case-card::before,
.tone-case-card::after {
  position: absolute;
  pointer-events: none;
  content: "";
}

.tone-case-card::before {
  inset: 7% -18% auto 34%;
  height: 10rem;
  transform: rotate(-14deg);
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent 58%),
    linear-gradient(90deg, transparent 8%, rgba(255, 57, 48, 0.34) 28%, rgba(255, 190, 120, 0.18) 46%, transparent 72%);
  filter: blur(0.3px);
}

.tone-case-card::after {
  right: -8rem;
  bottom: 12rem;
  width: 24rem;
  height: 24rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 67, 54, 0.2), transparent 66%);
}

.tone-case-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.048), transparent 18%),
    linear-gradient(122deg, transparent 0%, rgba(255, 255, 255, 0.038) 34%, transparent 58%),
    radial-gradient(ellipse 80% 46% at 74% 24%, rgba(255, 86, 54, 0.2), transparent 62%),
    radial-gradient(ellipse 70% 44% at 18% 86%, rgba(255, 26, 31, 0.13), transparent 68%),
    linear-gradient(300deg, rgba(0, 0, 0, 0.32), transparent 45%);
}

.tone-event-hero {
  background: #160003;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -120px 180px rgba(0, 0, 0, 0.46);
}

.tone-event-hero-image {
  object-position: 62% center;
  transform: scale(1.07);
}

.tone-event-hero-shade {
  background:
    radial-gradient(ellipse 92% 72% at 98% 18%, rgba(255, 78, 45, 0.16), transparent 60%),
    linear-gradient(90deg, rgba(9, 0, 2, 0.98) 0%, rgba(12, 0, 2, 0.94) 24%, rgba(20, 0, 4, 0.78) 46%, rgba(18, 0, 3, 0.46) 72%, rgba(8, 0, 1, 0.58) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.2) 42%, rgba(0, 0, 0, 0.76));
}

.tone-hero-copy {
  text-shadow: 0 3px 24px rgba(0, 0, 0, 0.42);
}

.tone-hero-side {
  filter: drop-shadow(0 26px 42px rgba(0, 0, 0, 0.38));
}

.tone-hero-stage {
  background:
    linear-gradient(112deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.026) 34%, rgba(255, 50, 38, 0.12)),
    radial-gradient(ellipse 74% 60% at 92% 18%, rgba(255, 88, 54, 0.22), transparent 66%),
    rgba(40, 0, 5, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -42px 84px rgba(0, 0, 0, 0.24);
}

.tone-device-stage {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035) 42%, rgba(255, 65, 50, 0.12)),
    rgba(18, 0, 3, 0.44);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -38px 76px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(8px);
}

.tone-device-frame {
  background:
    radial-gradient(ellipse 74% 66% at 50% 44%, rgba(255, 70, 54, 0.18), transparent 68%),
    linear-gradient(130deg, rgba(255, 255, 255, 0.06), transparent 38%, rgba(255, 80, 48, 0.08));
}

.tone-device-screen {
  background: radial-gradient(ellipse 80% 70% at 52% 50%, rgba(255, 80, 56, 0.08), transparent 70%);
}

.tone-device-screen-image {
  transform: translateY(-7%) scale(1.12);
}

.tone-device-frame:hover .tone-device-screen-image {
  transform: translateY(-7%) scale(1.15);
}

.tone-event-pulse {
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.028) 34%, rgba(255, 64, 45, 0.13)),
    linear-gradient(90deg, rgba(255, 87, 58, 0.16), transparent 54%),
    rgba(19, 0, 2, 0.26);
}

.tone-event-pulse::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(90deg, rgba(255, 202, 180, 0.18), transparent 24%),
    radial-gradient(ellipse 42% 160% at 88% 10%, rgba(255, 74, 54, 0.18), transparent 70%);
  opacity: 0.62;
}

.tone-event-line {
  position: relative;
  padding-left: 1rem;
}

.tone-event-line::before {
  position: absolute;
  top: 0.2rem;
  bottom: 0.15rem;
  left: 0;
  width: 2px;
  content: "";
  background: linear-gradient(180deg, rgba(255, 186, 164, 0.78), rgba(255, 70, 54, 0.16));
}

.tone-race-strip {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.028) 42%, rgba(255, 64, 45, 0.16)),
    rgba(255, 255, 255, 0.055);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    inset 0 -28px 42px rgba(55, 0, 5, 0.2);
}

.tone-race-strip::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background: linear-gradient(90deg, rgba(255, 185, 154, 0.16), transparent 30%, rgba(255, 57, 48, 0.1));
}

.tone-race-strip-item {
  position: relative;
  flex: 1 1 0;
}

@media (min-width: 760px) {
  .tone-race-strip-item + .tone-race-strip-item::before {
    position: absolute;
    top: 0.1rem;
    bottom: 0.1rem;
    left: 0;
    width: 1px;
    content: "";
    background: linear-gradient(180deg, transparent, rgba(255, 211, 199, 0.34), transparent);
  }
}

.tone-stand-gallery {
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.026) 34%, rgba(118, 11, 16, 0.26)),
    linear-gradient(90deg, rgba(255, 77, 52, 0.12), transparent 48%, rgba(255, 182, 118, 0.1)),
    rgba(12, 0, 2, 0.2);
}

.tone-stand-strip {
  background:
    linear-gradient(130deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.024) 36%, rgba(255, 60, 45, 0.12)),
    rgba(18, 0, 3, 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -44px 88px rgba(0, 0, 0, 0.24);
}

.tone-stand-reel {
  align-items: stretch;
}

.tone-stand-wall {
  perspective: 1200px;
}

.tone-stand-photo {
  background: rgba(255, 255, 255, 0.055);
}

.plates-case-card {
  background:
    radial-gradient(ellipse 76% 62% at 82% 18%, rgba(255, 44, 38, 0.24), transparent 66%),
    radial-gradient(ellipse 58% 48% at 18% 18%, rgba(154, 10, 10, 0.46), rgba(58, 6, 6, 0.24) 44%, transparent 72%),
    linear-gradient(145deg, #170404 0%, #070202 48%, #020101 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 -130px 190px rgba(0, 0, 0, 0.62),
    0 30px 78px rgba(8, 2, 2, 0.50);
}

.plates-case-card::before,
.plates-case-card::after {
  position: absolute;
  pointer-events: none;
  content: "";
}

.plates-case-card::before {
  inset: 7% -18% auto 30%;
  height: 11rem;
  transform: rotate(-13deg);
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent 58%),
    linear-gradient(90deg, transparent 8%, rgba(255, 42, 35, 0.30) 28%, rgba(255, 135, 102, 0.16) 48%, transparent 74%);
  filter: blur(0.35px);
}

.plates-case-card::after {
  right: -9rem;
  bottom: 8rem;
  width: 27rem;
  height: 27rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 42, 35, 0.17), transparent 68%);
}

.plates-case-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 18%),
    linear-gradient(122deg, transparent 0%, rgba(255, 255, 255, 0.034) 34%, transparent 58%),
    radial-gradient(ellipse 78% 46% at 78% 24%, rgba(255, 64, 50, 0.18), transparent 64%),
    radial-gradient(ellipse 74% 50% at 16% 86%, rgba(178, 20, 20, 0.13), transparent 70%),
    linear-gradient(300deg, rgba(0, 0, 0, 0.38), transparent 45%);
}

.plates-hero {
  background:
    var(--plates-hero-bg) right bottom / contain no-repeat,
    #050303;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -130px 190px rgba(0, 0, 0, 0.54);
}

.plates-hero-shade {
  background:
    linear-gradient(90deg, rgba(5, 1, 1, 0.88) 0%, rgba(7, 1, 1, 0.68) 34%, rgba(8, 1, 1, 0.24) 62%, rgba(4, 1, 1, 0.08) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.10) 42%, rgba(0, 0, 0, 0.62));
}

.plates-hero-copy {
  text-shadow: 0 4px 26px rgba(0, 0, 0, 0.46);
}

.plates-stat-tile,
.plates-performance-console {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.026) 42%, rgba(255, 64, 50, 0.08)),
    rgba(0, 0, 0, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    inset 0 -30px 66px rgba(0, 0, 0, 0.24);
}

.plates-performance-console {
  min-width: 0;
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.11),
    inset 0 -42px 82px rgba(0, 0, 0, 0.34),
    0 26px 70px rgba(0, 0, 0, 0.30);
}

.plates-performance-console::before,
.plates-performance-console::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.055), transparent 38%),
    repeating-linear-gradient(90deg, transparent 0 34px, rgba(255, 92, 82, 0.035) 34px 35px, transparent 35px 68px);
  opacity: 0.44;
}

.plates-screen-row {
  position: relative;
  z-index: 1;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 92, 82, 0.42) rgba(255, 255, 255, 0.06);
}

.plates-screen-row::-webkit-scrollbar {
  height: 0.45rem;
}

.plates-screen-row::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
}

.plates-screen-row::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 92, 82, 0.42);
}

.plates-screen-card {
  position: relative;
  z-index: 1;
  width: 11.5rem;
  background: transparent;
  box-shadow: none;
  filter: drop-shadow(0 28px 28px rgba(0, 0, 0, 0.32));
}

.plates-screen-card + .plates-screen-card {
  margin-left: -2.1rem;
}

.plates-screen-card:hover {
  z-index: 8;
  transform: translateY(-0.55rem) scale(1.03);
  filter: drop-shadow(0 34px 30px rgba(0, 0, 0, 0.38)) drop-shadow(0 0 22px rgba(255, 92, 82, 0.16));
}

.plates-screen-frame {
  height: 21.25rem;
  background:
    radial-gradient(ellipse 72% 12% at 50% 100%, rgba(255, 92, 82, 0.16), transparent 70%);
}

@media (min-width: 640px) {
  .plates-screen-card {
    width: 13.75rem;
  }

  .plates-screen-frame {
    height: 24.375rem;
  }
}

@media (min-width: 1180px) {
  .plates-screen-row {
    overflow-x: auto;
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }

  .plates-screen-card + .plates-screen-card {
    margin-left: -2.65rem;
  }

  .plates-screen-card {
    width: 12.375rem;
  }

  .plates-screen-frame {
    height: 23.5rem;
  }
}

@media (max-width: 640px) {
  .plates-screen-card + .plates-screen-card {
    margin-left: -1.65rem;
  }
}

.m-alien-case-card {
  background:
    radial-gradient(ellipse 72% 58% at 14% 16%, rgba(39, 170, 219, 0.34), rgba(7, 40, 66, 0.22) 42%, transparent 72%),
    radial-gradient(ellipse 52% 44% at 88% 8%, rgba(94, 68, 210, 0.22), transparent 70%),
    radial-gradient(ellipse 56% 44% at 76% 86%, rgba(27, 112, 157, 0.18), transparent 74%),
    linear-gradient(145deg, #020711 0%, #06111d 46%, #01040a 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 -140px 190px rgba(0, 0, 0, 0.62),
    0 30px 80px rgba(0, 8, 18, 0.54);
}

.m-alien-case-card::before,
.m-alien-case-card::after {
  position: absolute;
  pointer-events: none;
  content: "";
}

.m-alien-case-card::before {
  inset: 6% -22% auto 28%;
  height: 11rem;
  transform: rotate(-12deg);
  background:
    linear-gradient(90deg, transparent, rgba(111, 231, 255, 0.16), transparent 62%),
    linear-gradient(90deg, transparent 10%, rgba(35, 160, 220, 0.24) 28%, rgba(122, 86, 255, 0.16) 48%, transparent 74%);
  filter: blur(0.4px);
}

.m-alien-case-card::after {
  right: -10rem;
  bottom: 10rem;
  width: 28rem;
  height: 28rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(65, 217, 255, 0.16), transparent 68%);
}

.m-alien-case-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 18%),
    linear-gradient(122deg, transparent 0%, rgba(255, 255, 255, 0.032) 34%, transparent 58%),
    radial-gradient(ellipse 74% 42% at 74% 20%, rgba(111, 231, 255, 0.16), transparent 64%),
    radial-gradient(ellipse 74% 48% at 16% 88%, rgba(68, 80, 255, 0.12), transparent 70%),
    linear-gradient(300deg, rgba(0, 0, 0, 0.36), transparent 45%);
}

.m-alien-hero {
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.018) 38%, rgba(12, 84, 126, 0.22)),
    radial-gradient(ellipse 72% 48% at 86% 18%, rgba(111, 231, 255, 0.18), transparent 70%),
    rgba(1, 9, 18, 0.68);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -80px 140px rgba(0, 0, 0, 0.36);
}

.m-alien-mission-card,
.m-alien-flow-map,
.m-alien-orbit-console,
.m-alien-screen-strip,
.m-alien-stack-tile,
.m-alien-screen-card {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.026) 42%, rgba(111, 231, 255, 0.07)),
    rgba(0, 0, 0, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -28px 64px rgba(0, 0, 0, 0.20);
}

.m-alien-compact-lead {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.m-alien-flow-map::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    radial-gradient(ellipse 52% 82% at 0% 0%, rgba(111, 231, 255, 0.12), transparent 68%),
    linear-gradient(90deg, rgba(111, 231, 255, 0.08), transparent 28%, rgba(111, 231, 255, 0.07));
  opacity: 0.74;
}

.m-alien-command-route {
  position: relative;
}

.m-alien-command-route::before {
  position: absolute;
  left: 4%;
  right: 4%;
  top: 50%;
  height: 1px;
  pointer-events: none;
  content: "";
  background: linear-gradient(90deg, transparent, rgba(111, 231, 255, 0.30), transparent);
  opacity: 0.72;
}

.m-alien-flow-node {
  z-index: 1;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    0 14px 26px rgba(0, 0, 0, 0.18);
}

.m-alien-node-copy {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.m-alien-saucer {
  position: absolute;
  display: block;
  width: 4.4rem;
  height: 2.2rem;
  opacity: 0.26;
  transform: rotate(var(--saucer-rotate, -8deg)) scale(var(--saucer-scale, 1));
  filter: drop-shadow(0 0 14px rgba(111, 231, 255, 0.34));
}

.m-alien-saucer::before {
  position: absolute;
  left: 18%;
  top: 0;
  width: 64%;
  height: 54%;
  border: 1px solid rgba(174, 245, 255, 0.32);
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  content: "";
  background:
    radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.5), transparent 25%),
    linear-gradient(180deg, rgba(111, 231, 255, 0.34), rgba(111, 231, 255, 0.05));
}

.m-alien-saucer::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.34rem;
  height: 0.78rem;
  border: 1px solid rgba(174, 245, 255, 0.28);
  border-radius: 999px;
  content: "";
  background:
    radial-gradient(circle at 24% 50%, rgba(165, 242, 255, 0.75) 0 5%, transparent 6%),
    radial-gradient(circle at 50% 50%, rgba(165, 242, 255, 0.75) 0 5%, transparent 6%),
    radial-gradient(circle at 76% 50%, rgba(165, 242, 255, 0.75) 0 5%, transparent 6%),
    linear-gradient(180deg, rgba(188, 248, 255, 0.26), rgba(29, 127, 172, 0.08));
}

.m-alien-saucer:nth-child(1) { left: 5%; top: 13%; --saucer-scale: 0.72; --saucer-rotate: -14deg; }
.m-alien-saucer:nth-child(2) { left: 22%; top: 7%; --saucer-scale: 0.48; --saucer-rotate: 10deg; opacity: 0.16; }
.m-alien-saucer:nth-child(3) { left: 45%; top: 16%; --saucer-scale: 0.64; --saucer-rotate: -6deg; opacity: 0.18; }
.m-alien-saucer:nth-child(4) { right: 8%; top: 10%; --saucer-scale: 0.9; --saucer-rotate: 8deg; opacity: 0.23; }
.m-alien-saucer:nth-child(5) { left: 12%; top: 52%; --saucer-scale: 0.5; --saucer-rotate: 13deg; opacity: 0.14; }
.m-alien-saucer:nth-child(6) { left: 34%; top: 63%; --saucer-scale: 0.78; --saucer-rotate: -10deg; opacity: 0.18; }
.m-alien-saucer:nth-child(7) { right: 22%; top: 48%; --saucer-scale: 0.54; --saucer-rotate: 15deg; opacity: 0.16; }
.m-alien-saucer:nth-child(8) { right: 6%; top: 68%; --saucer-scale: 0.72; --saucer-rotate: -12deg; opacity: 0.18; }
.m-alien-saucer:nth-child(9) { left: 57%; top: 82%; --saucer-scale: 0.42; --saucer-rotate: 8deg; opacity: 0.12; }
.m-alien-saucer:nth-child(10) { left: 3%; top: 82%; --saucer-scale: 0.62; --saucer-rotate: -4deg; opacity: 0.14; }
.m-alien-saucer:nth-child(11) { right: 35%; top: 5%; --saucer-scale: 0.36; --saucer-rotate: -18deg; opacity: 0.12; }
.m-alien-saucer:nth-child(12) { right: 2%; top: 34%; --saucer-scale: 0.42; --saucer-rotate: 12deg; opacity: 0.12; }

.m-alien-orbit-console {
  isolation: isolate;
  background:
    radial-gradient(ellipse 92% 56% at 50% 14%, rgba(111, 231, 255, 0.17), transparent 68%),
    radial-gradient(ellipse 82% 70% at 50% 56%, rgba(70, 176, 226, 0.13), transparent 72%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.026) 38%, rgba(111, 231, 255, 0.11)),
    rgba(0, 7, 13, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.11),
    inset 0 -42px 86px rgba(0, 0, 0, 0.34),
    0 24px 70px rgba(0, 0, 0, 0.22);
}

.m-alien-orbit-console::before,
.m-alien-orbit-console::after {
  position: absolute;
  pointer-events: none;
  content: "";
}

.m-alien-orbit-console::before {
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.055), transparent 38%),
    repeating-linear-gradient(90deg, transparent 0 32px, rgba(111, 231, 255, 0.035) 32px 33px, transparent 33px 64px);
  opacity: 0.46;
}

.m-alien-orbit-console::after {
  inset: auto 9% -18% 9%;
  z-index: 0;
  height: 42%;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%, rgba(111, 231, 255, 0.26), transparent 68%);
  filter: blur(18px);
  opacity: 0.74;
}

.m-alien-orbit-ring {
  position: absolute;
  z-index: 1;
  border: 1px solid rgba(111, 231, 255, 0.18);
  border-radius: 999px;
  box-shadow:
    inset 0 0 22px rgba(111, 231, 255, 0.04),
    0 0 24px rgba(111, 231, 255, 0.08);
}

.m-alien-orbit-ring--outer {
  width: 16rem;
  height: 16rem;
  transform: rotate(-18deg) scaleY(0.62);
}

.m-alien-orbit-ring--middle {
  width: 12.5rem;
  height: 12.5rem;
  transform: rotate(22deg) scaleY(0.72);
}

.m-alien-orbit-ring--inner {
  width: 9rem;
  height: 9rem;
  transform: rotate(-38deg) scaleY(0.82);
}

.m-alien-mothership {
  z-index: 3;
  background:
    linear-gradient(145deg, rgba(221, 253, 255, 0.18), rgba(255, 255, 255, 0.045) 42%, rgba(111, 231, 255, 0.12)),
    rgba(7, 34, 52, 0.38);
  backdrop-filter: blur(12px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -18px 34px rgba(0, 0, 0, 0.18),
    0 0 48px rgba(111, 231, 255, 0.21),
    0 20px 42px rgba(0, 0, 0, 0.26);
}

.m-alien-abduction-beam {
  position: absolute;
  left: 50%;
  top: 39%;
  z-index: 1;
  width: 13.5rem;
  height: 15rem;
  background:
    radial-gradient(ellipse at 50% 100%, rgba(111, 231, 255, 0.36), transparent 58%),
    linear-gradient(90deg, transparent, rgba(111, 231, 255, 0.24) 28%, rgba(214, 252, 255, 0.36) 50%, rgba(111, 231, 255, 0.22) 72%, transparent);
  clip-path: polygon(44% 0, 56% 0, 100% 100%, 0 100%);
  filter: blur(0.2px);
  opacity: 0.44;
  transform: translate(-50%, -9%) perspective(520px) rotateX(62deg);
  transform-origin: top center;
}

.m-alien-orbit-tech {
  position: absolute;
  z-index: 4;
  border: 1px solid rgba(111, 231, 255, 0.24);
  border-radius: 14px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035) 48%, rgba(111, 231, 255, 0.10)),
    rgba(2, 18, 30, 0.74);
  padding: 0.30rem 0.48rem;
  color: #dffaff;
  font-size: 0.52rem;
  font-weight: 900;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 28px rgba(111, 231, 255, 0.16),
    0 14px 24px rgba(0, 0, 0, 0.20);
}

.m-alien-orbit-tech--flutter { left: 3%; top: 9%; }
.m-alien-orbit-tech--socket { right: 4%; top: 10%; }
.m-alien-orbit-tech--dart { left: 31%; top: 2%; }
.m-alien-orbit-tech--node { left: 5%; top: 38%; }
.m-alien-orbit-tech--express { right: 5%; top: 37%; }
.m-alien-orbit-tech--postgres { left: 5%; bottom: 20%; }
.m-alien-orbit-tech--redis { right: 9%; bottom: 22%; }
.m-alien-orbit-tech--bloc { left: 28%; bottom: 6%; }
.m-alien-orbit-tech--dio { right: 31%; bottom: 5%; }
.m-alien-orbit-tech--retrofit { left: 36%; top: 25%; }

.m-alien-screen-strip {
  background:
    radial-gradient(ellipse 86% 64% at 60% 16%, rgba(111, 231, 255, 0.13), transparent 68%),
    linear-gradient(90deg, rgba(111, 231, 255, 0.08), transparent 20%, transparent 80%, rgba(111, 231, 255, 0.08)),
    rgba(1, 8, 15, 0.52);
}

.m-alien-screen-strip::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 34%),
    repeating-linear-gradient(90deg, transparent 0 72px, rgba(111, 231, 255, 0.045) 72px 73px, transparent 73px 144px);
  opacity: 0.5;
}

.m-alien-screen-row {
  position: relative;
  z-index: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(111, 231, 255, 0.28) rgba(255, 255, 255, 0.05);
}

.m-alien-screen-row::-webkit-scrollbar {
  height: 8px;
}

.m-alien-screen-row::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
}

.m-alien-screen-row::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(111, 231, 255, 0.28);
}

.m-alien-screen-card {
  position: relative;
  z-index: 1;
  background: transparent;
  box-shadow: none;
  filter: drop-shadow(0 28px 28px rgba(0, 0, 0, 0.32));
}

.m-alien-screen-card + .m-alien-screen-card {
  margin-left: -2.15rem;
}

.m-alien-screen-card:hover {
  z-index: 8;
  transform: translateY(-0.55rem) scale(1.03);
  filter: drop-shadow(0 34px 30px rgba(0, 0, 0, 0.38)) drop-shadow(0 0 22px rgba(111, 231, 255, 0.16));
}

.m-alien-screen-frame {
  background:
    radial-gradient(ellipse 72% 12% at 50% 100%, rgba(111, 231, 255, 0.16), transparent 70%);
}

@media (min-width: 1180px) {
  .m-alien-screen-row {
    overflow-x: auto;
    padding-left: 1.1rem;
    padding-right: 1.1rem;
  }

  .m-alien-screen-card + .m-alien-screen-card {
    margin-left: -2.65rem;
  }
}

@media (max-width: 640px) {
  .m-alien-screen-card + .m-alien-screen-card {
    margin-left: -1.65rem;
  }
}

@media (min-width: 1180px) {
  .tone-stand-reel .tone-stand-photo--4 img {
    object-position: 50% 47%;
  }

  .tone-stand-reel .tone-stand-photo--5 img {
    object-position: 57% center;
  }
}

.project-ticket-shell {
  background-color: #fff8f3;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
  box-shadow: 0 14px 34px rgba(32, 14, 12, 0.1);
}

.project-ticket-shell--insentry {
  background-color: #eef4f7;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.project-ticket-shell--teleprompter {
  background:
    linear-gradient(118deg, rgba(61, 255, 112, 0.20) 0%, rgba(20, 58, 27, 0.12) 28%, transparent 46%),
    linear-gradient(302deg, rgba(117, 255, 143, 0.12) 0%, rgba(15, 51, 22, 0.08) 34%, transparent 55%),
    linear-gradient(145deg, #060706 0%, #111711 44%, #071007 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    inset 0 -64px 110px rgba(0, 0, 0, 0.32),
    0 22px 54px rgba(5, 16, 8, 0.34);
}

.project-ticket-shell--m-alien {
  background:
    radial-gradient(ellipse 70% 58% at 12% 16%, rgba(28, 186, 231, 0.34), rgba(9, 48, 76, 0.18) 44%, transparent 72%),
    radial-gradient(ellipse 48% 42% at 86% 18%, rgba(125, 80, 255, 0.18), transparent 68%),
    linear-gradient(145deg, #061421 0%, #081a2b 46%, #03070d 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -74px 130px rgba(0, 0, 0, 0.38),
    0 24px 58px rgba(3, 17, 32, 0.36);
}

.project-ticket-info {
  background-color: #f8f5ef;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.project-ticket-info--teleprompter {
  background:
    linear-gradient(112deg, rgba(88, 255, 124, 0.16) 0%, rgba(34, 103, 46, 0.07) 32%, transparent 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 18%),
    linear-gradient(135deg, #101510 0%, #091009 100%);
}

.project-ticket-info--m-alien {
  background:
    linear-gradient(112deg, rgba(111, 231, 255, 0.14) 0%, rgba(32, 93, 137, 0.07) 34%, transparent 60%),
    radial-gradient(ellipse 80% 54% at 92% 6%, rgba(130, 93, 255, 0.18), transparent 66%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.065), transparent 18%),
    linear-gradient(135deg, #071421 0%, #06101c 100%);
}

.project-ticket-divider {
  background-color: #f7f0e8;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.project-ticket-gallery {
  background-color: #f8f5ef;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.project-ticket-gallery-panel {
  height: 360px;
}

.project-ticket-shell--insentry .project-ticket-info,
.project-ticket-shell--insentry .project-ticket-gallery,
.project-ticket-shell--insentry .project-ticket-divider {
  background-color: #eef4f7;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.project-ticket-shell--teleprompter .project-ticket-gallery,
.project-ticket-shell--teleprompter .project-ticket-divider {
  background:
    linear-gradient(140deg, rgba(88, 255, 124, 0.16) 0%, rgba(19, 60, 27, 0.08) 38%, transparent 62%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 18%),
    linear-gradient(180deg, #0c130c 0%, #060906 100%);
}

.project-ticket-shell--teleprompter .project-ticket-divider span {
  border-color: rgba(138, 245, 169, 0.36);
}

.project-ticket-shell--teleprompter .project-ticket-gallery-panel {
  filter: drop-shadow(0 24px 36px rgba(0, 0, 0, 0.34));
}

.project-ticket-shell--teleprompter .project-ticket-gallery-panel button {
  border-color: rgba(138, 245, 169, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #eaffef;
}

.project-ticket-shell--m-alien .project-ticket-gallery,
.project-ticket-shell--m-alien .project-ticket-divider {
  background:
    linear-gradient(140deg, rgba(111, 231, 255, 0.15) 0%, rgba(15, 66, 98, 0.09) 38%, transparent 62%),
    radial-gradient(ellipse 84% 48% at 82% 12%, rgba(120, 85, 255, 0.12), transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.065), transparent 18%),
    linear-gradient(180deg, #081827 0%, #030913 100%);
}

.project-ticket-shell--m-alien .project-ticket-divider span {
  border-color: rgba(111, 231, 255, 0.34);
}

.project-ticket-shell--m-alien .project-ticket-gallery-panel {
  filter: drop-shadow(0 24px 36px rgba(0, 0, 0, 0.30));
}

.project-ticket-shell--m-alien .project-ticket-gallery-panel button {
  border-color: rgba(111, 231, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #e9fbff;
}

.teleprompter-lead-panel {
  background:
    linear-gradient(100deg, rgba(153, 255, 182, 0.15), rgba(255, 255, 255, 0.065) 38%, rgba(255, 255, 255, 0.035)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035));
}

.m-alien-lead-panel {
  background:
    linear-gradient(100deg, rgba(111, 231, 255, 0.13), rgba(255, 255, 255, 0.06) 38%, rgba(255, 255, 255, 0.032)),
    radial-gradient(ellipse 90% 70% at 92% 10%, rgba(123, 92, 255, 0.14), transparent 68%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.032));
}

.teleprompter-icon-glass {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.035) 42%, rgba(40, 255, 102, 0.11)),
    linear-gradient(180deg, #182119, #091009);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -24px 48px rgba(0, 0, 0, 0.34),
    0 24px 60px rgba(42, 217, 93, 0.18);
}

.teleprompter-hard-problem {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.045) 44%, rgba(87, 255, 122, 0.08)),
    rgba(0, 0, 0, 0.14);
}

.m-alien-architecture-panel {
  background:
    linear-gradient(135deg, rgba(6, 14, 26, 0.96) 0%, rgba(8, 32, 55, 0.94) 52%, rgba(13, 69, 100, 0.9) 100%),
    radial-gradient(ellipse 80% 54% at 80% 0%, rgba(111, 231, 255, 0.18), transparent 68%);
}

.m-alien-hard-problem {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.042) 44%, rgba(111, 231, 255, 0.08)),
    rgba(0, 0, 0, 0.14);
}

.teleprompter-showcase {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.075), transparent 26%),
    linear-gradient(210deg, rgba(75, 255, 119, 0.14), rgba(10, 32, 14, 0.14) 44%, transparent 68%);
}

.teleprompter-showcase-main {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035) 36%, rgba(61, 255, 112, 0.08)),
    rgba(0, 0, 0, 0.3);
}

.m-alien-showcase {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.075), transparent 26%),
    radial-gradient(ellipse 74% 56% at 90% 10%, rgba(120, 85, 255, 0.15), transparent 70%),
    linear-gradient(210deg, rgba(111, 231, 255, 0.14), rgba(8, 38, 62, 0.16) 44%, transparent 68%);
}

.m-alien-phone-stage {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035) 36%, rgba(111, 231, 255, 0.08)),
    rgba(0, 0, 0, 0.3);
}

.project-ticket-card--reduced-effects {
  content-visibility: auto;
  contain-intrinsic-size: 720px;
}

.project-ticket-card--reduced-effects,
.project-ticket-card--reduced-effects * {
  animation: none !important;
  scroll-behavior: auto !important;
}

.project-ticket-card--reduced-effects :is(
  .gold585-case-card,
  .gold585-hero,
  .gold585-gallery-panel,
  .teleprompter-case-card,
  .teleprompter-showcase-stage,
  .teleprompter-showcase-frame,
  .teleprompter-hero,
  .teleprompter-proof-panel,
  .teleprompter-screen-card,
  .tone-case-card,
  .tone-event-hero,
  .tone-hero-side,
  .tone-hero-stage,
  .tone-device-stage,
  .tone-race-strip,
  .tone-stand-strip,
  .tone-stand-photo,
  .plates-case-card,
  .plates-stat-tile,
  .plates-performance-console,
  .plates-screen-card,
  .m-alien-case-card,
  .m-alien-mission-card,
  .m-alien-flow-map,
  .m-alien-orbit-console,
  .m-alien-screen-strip,
  .m-alien-stack-tile,
  .m-alien-screen-card,
  .m-alien-mothership,
  .m-alien-orbit-tech,
  .project-ticket-shell,
  .project-ticket-gallery-panel,
  .teleprompter-icon-glass,
  .teleprompter-hard-problem,
  .m-alien-architecture-panel,
  .m-alien-hard-problem,
  .teleprompter-showcase-main,
  .m-alien-phone-stage,
  img,
  a,
  button,
  span
) {
  box-shadow: none !important;
  filter: none !important;
  text-shadow: none !important;
}

.project-ticket-card--reduced-effects :is(
  .tone-device-stage,
  .plates-performance-console,
  .m-alien-mothership,
  .m-alien-orbit-tech,
  .teleprompter-hard-problem,
  .m-alien-hard-problem,
  button,
  a,
  span
) {
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

.project-ticket-card--reduced-effects :is(
  .gold585-case-card,
  .tone-case-card,
  .plates-case-card,
  .m-alien-case-card,
  .teleprompter-hero,
  .teleprompter-proof-panel,
  .teleprompter-screen-strip,
  .tone-case-card,
  .tone-event-pulse,
  .tone-race-strip,
  .tone-stand-strip,
  .plates-performance-console,
  .m-alien-flow-map,
  .m-alien-orbit-console,
  .m-alien-screen-strip
)::before,
.project-ticket-card--reduced-effects :is(
  .gold585-case-card,
  .tone-case-card,
  .plates-case-card,
  .m-alien-case-card,
  .m-alien-orbit-console
)::after {
  opacity: 0 !important;
}

@media (min-width: 900px) {
  .project-ticket-shell {
    --ticket-notch-x: calc(100% - var(--ticket-stub-width) - 9px);
    grid-template-columns: minmax(0, 1fr) 18px var(--ticket-stub-width);
    height: var(--ticket-card-height);
    -webkit-mask-image:
      radial-gradient(circle 14px at var(--ticket-notch-x) 0, transparent 13.5px, #000 14px),
      radial-gradient(circle 14px at var(--ticket-notch-x) 100%, transparent 13.5px, #000 14px);
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-composite: source-in;
    mask-image:
      radial-gradient(circle 14px at var(--ticket-notch-x) 0, transparent 13.5px, #000 14px),
      radial-gradient(circle 14px at var(--ticket-notch-x) 100%, transparent 13.5px, #000 14px);
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-composite: intersect;
  }

  .project-ticket-gallery {
    width: var(--ticket-stub-width);
  }

  .project-ticket-gallery-panel {
    height: var(--ticket-card-height);
  }
}
</style>
