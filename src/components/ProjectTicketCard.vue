<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import { useI18n } from 'vue-i18n'
import type { ProjectCard, StoreType } from '@/types/projectCard'
import { publicAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'

const [emblaRef, emblaApi] = emblaCarouselVue({
  align: 'start',
  containScroll: 'trimSnaps',
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
let galleryObserver: IntersectionObserver | null = null

const props = defineProps<{
  project: ProjectCard
  storeBadgeSrc: Record<StoreType, string>
  openLightbox: (projectId: string, index: number) => void
  openInfoModal?: (projectId: string) => void
  noImagesText: string
  infoButtonText?: string
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

const isCybersecurityCard = computed(() => props.project.category === 'cybersecurity')
const isInsentryCase = computed(() => props.project.id === 'mobile-insentry-raw-decoder')
const isClosedOsintCase = computed(() => props.project.title === 'Закрытый OSINT-инструмент для поиска цифрового следа')
const toneOfVictoryStandUrls = computed(() =>
  isToneOfVictoryProject(props.project)
    ? resolveAssetUrls([
        'src/assets/projects/tag/stand0.jpeg',
        'src/assets/projects/tag/stand1.jpeg',
        'src/assets/projects/tag/stand2.jpeg',
      ])
    : [],
)
const teleprompterSystemTitle = computed(() =>
  locale.value === 'ru' ? 'iOS app + backend + web-панель' : 'iOS app + backend + web control panel',
)
const teleprompterSystemHighlights = computed(() =>
  locale.value === 'ru'
    ? [
        {
          label: 'Backend',
          text: 'синхронизация сценариев, remote-control команды, серверная логика',
        },
        {
          label: 'Web panel',
          text: 'управление текстами, подписками и рабочими сценариями вне iOS-приложения',
        },
        {
          label: 'Device flow',
          text: 'iPhone, web и Apple Watch связаны в один управляемый продуктовый контур',
        },
      ]
    : [
        {
          label: 'Backend',
          text: 'script sync, remote-control commands, and server-side product logic',
        },
        {
          label: 'Web panel',
          text: 'script, subscription, and workflow management outside the iOS app',
        },
        {
          label: 'Device flow',
          text: 'iPhone, web, and Apple Watch connected into one controllable product loop',
        },
      ],
)
const mAlienSystemTitle = computed(() =>
  locale.value === 'ru' ? 'Flutter app + Node.js backend + real-time core' : 'Flutter app + Node.js backend + real-time core',
)
const mAlienSystemHighlights = computed(() =>
  locale.value === 'ru'
    ? [
        {
          label: 'Private auth',
          text: 'регистрация по уникальному коду без телефона, email и социальных сетей',
        },
        {
          label: 'Messaging backend',
          text: 'личные и групповые чаты, Socket.IO/WebSocket, медиа и голосовые сообщения',
        },
        {
          label: 'Product logic',
          text: 'real-time перевод, уведомления, кастомизация диалогов и серверная инфраструктура',
        },
      ]
    : [
        {
          label: 'Private auth',
          text: 'unique-code registration without phone, email, or social accounts',
        },
        {
          label: 'Messaging backend',
          text: 'direct and group chats, Socket.IO/WebSocket, media, and voice messages',
        },
        {
          label: 'Product logic',
          text: 'real-time translation, notifications, chat customization, and server infrastructure',
        },
      ],
)
const visibleTechnologies = computed(() => props.project.technologies.slice(0, 8))
const hiddenTechnologyCount = computed(() => Math.max(props.project.technologies.length - visibleTechnologies.value.length, 0))
const ticketStubWidth = computed(() => {
  if (isToneOfVictoryProject(props.project)) return 360
  if (isInsentryCase.value) return 320
  if (isClosedOsintCase.value) return 300
  if (isCybersecurityCard.value) return 260
  return 280
})
const ticketCardHeight = computed(() => {
  if (isToneOfVictoryProject(props.project)) return 720
  if (isTeleprompterAutomaticProject(props.project)) return 560
  if (props.project.title === 'Армира') return 510
  if (isInsentryCase.value) return 380
  if (isCybersecurityCard.value) return 340
  return 420
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
  <article ref="articleRef" class="h-full overflow-visible">
    <div
      class="project-ticket-shell relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[rgba(46,20,18,0.15)] bg-[#fff8f3] shadow-[0_10px_24px_rgba(32,14,12,0.08)] min-[900px]:grid min-[900px]:items-stretch"
      :style="{ '--ticket-stub-width': `${ticketStubWidth}px`, '--ticket-card-height': `${ticketCardHeight}px` }"
      :class="[
        isInsentryCase ? 'project-ticket-shell--insentry border-[#9DB5C9]/45 bg-[#EEF4F7] shadow-[0_16px_36px_rgba(50,73,88,0.14)]' : '',
      ]">
      <div v-if="isTeleprompterAutomaticProject(project)" class="pointer-events-none absolute inset-0 z-[1] opacity-55">
        <img :src="holographicOverlay" alt="" class="h-full w-full object-cover mix-blend-screen" />
      </div>

      <section class="project-ticket-info relative flex min-w-0 overflow-hidden bg-[#f7f8fa] p-3.5"
        :class="[
          isCybersecurityCard ? 'min-[900px]:overflow-visible' : '',
          isInsentryCase ? 'bg-[#EAF2F6]' : '',
        ]">
        <div class="relative z-10 flex flex-1 flex-col overflow-hidden">
          <div class="flex items-start gap-4">
            <img v-if="project.iconUrl" :src="project.iconUrl" alt=""
              class="h-14 w-14 shrink-0 rounded-[20px] border object-cover shadow-[0_8px_20px_rgba(47,37,33,0.12)]"
              :class="isInsentryCase ? 'border-[#9DB5C9]/55 bg-white shadow-[0_10px_22px_rgba(50,73,88,0.16)]' : 'border-black/10'"
              loading="lazy" decoding="async" />

            <div class="min-w-0 flex-1 self-center">
              <p v-if="project.eyebrow" class="mb-1 text-[10px] font-black uppercase tracking-[0.18em]"
                :class="isInsentryCase ? 'text-[#466B83]' : 'text-[#6F5643]'">
                {{ project.eyebrow }}
              </p>
              <div class="flex min-w-0 items-start gap-3">
                <h2 class="line-clamp-2 min-w-0 text-base font-black leading-tight sm:text-lg"
                  :class="isInsentryCase ? 'text-[#172A37]' : 'text-[#231814]'">
                  {{ project.title }}
                </h2>
                <div class="flex-1"></div>
                <div v-if="project.clientCountries?.length" class="flex shrink-0 flex-wrap justify-end gap-1">
                  <span
                    v-for="country in project.clientCountries"
                    :key="country.name"
                    class="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#b0464a]/18 bg-[#fff7ec]/86 px-1.5 py-1 text-[9px] font-bold leading-none text-[#743225] shadow-[0_6px_12px_rgba(116,50,37,0.08)]"
                    :class="isInsentryCase ? 'border-[#5E8DA9]/22 bg-white/58 text-[#38576A]' : ''"
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
                      :class="isInsentryCase ? 'bg-[#5E8DA9]' : ''"
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
              class="rounded-[18px] bg-white/58 p-3.5"
              :class="[
                isInsentryCase ? 'bg-white/48' : 'mt-3',
                isCybersecurityCard ? 'bg-[#fffaf3]/60' : '',
              ]">
              <p
                class="text-sm leading-6 text-[#4f413c] [&_a]:mt-2 [&_a]:inline-flex [&_a]:w-fit [&_a]:items-center [&_a]:rounded-full [&_a]:border [&_a]:border-[#AC3F2B]/20 [&_a]:bg-[#AC3F2B]/10 [&_a]:px-3 [&_a]:py-1.5 [&_a]:text-xs [&_a]:font-bold [&_a]:text-[#8B3224] [&_a]:no-underline [&_a]:shadow-[0_8px_18px_rgba(172,63,43,0.10)] [&_a]:transition [&_a:hover]:-translate-y-0.5 [&_a:hover]:bg-[#AC3F2B]/16"
                :class="isInsentryCase ? 'text-[13px] leading-5 text-[#344956]' : isCybersecurityCard ? 'line-clamp-8 text-[13px] leading-5' : 'line-clamp-6'"
                v-html="project.description"></p>
            </div>

            <div
              v-if="isTeleprompterAutomaticProject(project)"
              class="relative mt-3 overflow-hidden rounded-[20px] border border-[#746085]/26 bg-[linear-gradient(135deg,rgba(15,16,19,0.98)_0%,rgba(44,45,52,0.96)_48%,rgba(55,38,78,0.94)_100%)] p-3 text-white shadow-[0_18px_34px_rgba(31,28,42,0.24)]"
            >
              <div class="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#8e67d8]/24 blur-2xl"></div>
              <div class="pointer-events-none absolute -left-16 bottom-[-4.5rem] h-32 w-32 rounded-full bg-white/8 blur-2xl"></div>
              <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18"></div>

              <div class="relative min-w-0">
                <p class="text-[9px] font-black uppercase tracking-[0.18em] text-[#d8c8ff]">
                  Full-stack product system
                </p>
                <h3 class="mt-1 text-sm font-black leading-tight text-[#f7f4ef]">
                  {{ teleprompterSystemTitle }}
                </h3>
              </div>

              <div class="relative mt-3 grid gap-2 min-[1180px]:grid-cols-3">
                <div
                  v-for="highlight in teleprompterSystemHighlights"
                  :key="highlight.label"
                  class="min-w-0 rounded-[14px] border border-white/14 bg-white/12 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur"
                >
                  <p class="text-[10px] font-black uppercase tracking-[0.16em] text-[#d8c8ff]">
                    {{ highlight.label }}
                  </p>
                  <p class="mt-1 text-[12px] font-semibold leading-5 text-white/90">
                    {{ highlight.text }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="isMAlienProject(project)"
              class="mt-3 overflow-hidden rounded-[20px] border border-[#5ab7df]/26 bg-[linear-gradient(135deg,rgba(8,28,48,0.96)_0%,rgba(24,91,142,0.94)_52%,rgba(91,190,225,0.9)_100%)] p-3 text-white shadow-[0_18px_34px_rgba(32,116,174,0.22)]"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/72">
                    Full-stack messenger platform
                  </p>
                  <h3 class="mt-1 text-sm font-black leading-tight">
                    {{ mAlienSystemTitle }}
                  </h3>
                </div>
              </div>

              <div class="mt-3 grid gap-2 min-[1180px]:grid-cols-3">
                <div
                  v-for="highlight in mAlienSystemHighlights"
                  :key="highlight.label"
                  class="rounded-[14px] border border-white/14 bg-white/12 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur"
                >
                  <p class="text-[10px] font-black uppercase tracking-[0.16em] text-[#c9f2ff]">
                    {{ highlight.label }}
                  </p>
                  <p class="mt-1 text-[12px] leading-5 text-white/86">
                    {{ highlight.text }}
                  </p>
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
              :class="isInsentryCase ? 'border-[#9DB5C9]/32 bg-[#E6F0F4] text-[#38576A]' : 'border-black/10 bg-[#FAF7F1] text-black/65'">
                {{ tech }}
              </span>
              <span v-if="hiddenTechnologyCount"
                class="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] sm:px-3"
                :class="isInsentryCase ? 'border-[#9DB5C9]/26 bg-white/50 text-[#466B83]' : 'border-black/10 bg-white/70 text-black/50'">
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
              @click="openInfoModal(project.id)">
              {{ infoButtonText }}
              <span class="grid h-6 w-6 place-items-center rounded-full bg-[#fff8ee] text-base leading-none text-[#9f3a31] transition duration-200 group-hover:translate-x-0.5 group-hover:bg-white">
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
        <div v-if="!project.galleryUrls.length"
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

.project-ticket-info {
  background-color: #f8f5ef;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
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
