<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import type { ProjectCard, StoreType } from '@/types/projectCard'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const [emblaRef, emblaApi] = emblaCarouselVue({
  align: 'start',
  containScroll: 'trimSnaps',
  loop: false,
} satisfies EmblaOptionsType)
void emblaRef

const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const selectedIndex = ref(0)
const articleRef = ref<HTMLElement | null>(null)
const isGalleryNearViewport = ref(false)
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

const isCybersecurityCard = computed(() => props.project.category === 'cybersecurity')
const isInsentryCase = computed(() => props.project.id === 'mobile-insentry-raw-decoder')
const isClosedOsintCase = computed(() => props.project.title === 'Закрытый OSINT-инструмент для поиска цифрового следа')
const visibleTechnologies = computed(() => props.project.technologies.slice(0, 8))
const hiddenTechnologyCount = computed(() => Math.max(props.project.technologies.length - visibleTechnologies.value.length, 0))
const ticketStubWidth = computed(() => {
  if (isInsentryCase.value) return 320
  if (isClosedOsintCase.value) return 300
  if (isCybersecurityCard.value) return 260
  return 280
})
const ticketCardHeight = computed(() => {
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

            <div class="min-w-0 self-center">
              <p v-if="project.eyebrow" class="mb-1 text-[10px] font-black uppercase tracking-[0.18em]"
                :class="isInsentryCase ? 'text-[#466B83]' : 'text-[#6F5643]'">
                {{ project.eyebrow }}
              </p>
              <h2 class="line-clamp-2 text-base font-black leading-tight sm:text-lg"
                :class="isInsentryCase ? 'text-[#172A37]' : 'text-[#231814]'">
                {{ project.title }}
              </h2>
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
              class="inline-flex items-center justify-center rounded-xl border border-[#24445a]/14 bg-[#eef4f7] px-4 py-2 text-sm font-semibold text-[#24445a] transition duration-200 hover:bg-[#e4eef3] hover:shadow-[0_8px_18px_rgba(36,68,90,0.10)]"
              @click="openInfoModal(project.id)">
              {{ infoButtonText }}
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
