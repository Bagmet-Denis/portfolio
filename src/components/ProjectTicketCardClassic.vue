<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
const backgroundPaperUrl = `url("${publicAssetUrl('background_paper.png')}")`

const props = defineProps<{
  project: ProjectCard
  storeBadgeSrc: Record<StoreType, string>
  openLightbox: (projectId: string, index: number) => void
  noImagesText: string
}>()

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
  <article ref="articleRef" class="ticket-card overflow-visible">
    <div class="ticket-card__shell">
      <section class="ticket-card__info">
        <div class="ticket-card__content relative z-10">
          <div class="flex items-start gap-4">
            <img v-if="project.iconUrl" :src="project.iconUrl" alt=""
              class="h-14 w-14 shrink-0 rounded-[20px] border border-black/10 object-cover shadow-[0_8px_20px_rgba(47,37,33,0.12)]"
              loading="lazy" decoding="async" />

            <div class="min-w-0 flex-1">
              <div class="flex min-w-0 items-start gap-3">
                <h2 class="min-w-0 text-lg font-black leading-tight text-[#231814] sm:text-xl">
                  {{ project.title }}
                </h2>
                <div class="flex-1"></div>
                <div v-if="project.clientCountries?.length" class="flex shrink-0 flex-wrap justify-end gap-1">
                  <span
                    v-for="country in project.clientCountries"
                    :key="country.name"
                    class="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#b0464a]/18 bg-[#fff7ec]/86 px-1.5 py-1 text-[9px] font-bold leading-none text-[#743225] shadow-[0_6px_12px_rgba(116,50,37,0.08)]"
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

          <div
            class="mt-4 rounded-[22px] bg-white/58 p-3.5">
            <p class="text-sm leading-5 text-[#4f413c]" v-html="project.description"></p>
          </div>

          <div v-if="project.technologies.length" class="mt-3.5 flex flex-wrap gap-2">
            <span v-for="tech in project.technologies.slice(0, 8)" :key="tech"
              class="rounded-full border border-black/10 bg-[#FAF7F1] px-2.5 py-1 text-[10px] font-medium tracking-[0.02em] text-black/65 sm:px-3">
              {{ tech }}
            </span>
          </div>

          <div v-if="project.storeLinks.length" class="mt-4 flex flex-wrap items-center gap-2">
            <a v-for="link in project.storeLinks" :key="`${link.type}-${link.url}`" :href="link.url" target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-2xl border border-black/8 bg-white/84 px-2 py-1.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(47,37,33,0.12)]"
              :title="link.type">
              <img v-if="storeBadgeSrc[link.type]" :src="storeBadgeSrc[link.type]" alt="" class="h-10 object-contain"
                loading="lazy" decoding="async" />
              <span v-else class="px-2 py-1 text-xs font-bold text-[#5d4a43]">{{ link.label ?? link.type }}</span>
            </a>
          </div>
        </div>
      </section>

      <div class="ticket-card__divider" aria-hidden="true">
        <span class="ticket-card__dash"></span>
      </div>

      <section class="ticket-card__gallery">
        <div v-if="!project.galleryUrls.length"
          class="relative z-10 flex min-h-[160px] items-center justify-center px-4 text-center text-sm text-[#6e635d]">
          {{ noImagesText }}
        </div>

        <div v-else class="relative z-10 h-full">
          <div class="relative h-full">
            <div class="project-ticket-embla overflow-hidden" ref="emblaRef">
              <div class="project-ticket-embla__container">
                <div v-for="(src, index) in project.galleryUrls" :key="`${project.id}-img-${index}`"
                  class="project-ticket-embla__slide flex items-center justify-center">
                  <img v-if="shouldRenderGalleryImage(index)" :src="src" :alt="`${project.title} ${index + 1}`"
                    class="h-[240px] w-full object-contain sm:h-[280px] min-[900px]:h-full"
                    loading="lazy" fetchpriority="low" decoding="async" @click="openLightbox(project.id, index)" />
                  <div v-else class="h-[240px] w-full sm:h-[280px] min-[900px]:h-full" aria-hidden="true"></div>
                </div>
              </div>
            </div>

            <div v-if="project.galleryUrls.length > 1"
              class="pointer-events-none absolute inset-0 hidden items-center justify-between px-3 sm:flex">
              <button type="button"
                class="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-black/8 bg-white/50 text-[#231814] backdrop-blur transition hover:bg-white/70 disabled:cursor-default disabled:opacity-35"
                :disabled="!canScrollPrev" aria-label="Previous" @click.stop="scrollPrev">
                ‹
              </button>
              <button type="button"
                class="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-black/8 bg-white/50 text-[#231814] backdrop-blur transition hover:bg-white/70 disabled:cursor-default disabled:opacity-35"
                :disabled="!canScrollNext" aria-label="Next" @click.stop="scrollNext">
                ›
              </button>
            </div>
          </div>

          <div v-if="project.galleryUrls.length > 1"
            class="relative z-10 mt-4 flex items-center justify-center gap-3 sm:hidden">
            <button type="button"
              class="rounded-xl border border-black/10 bg-white/60 px-4 py-2 text-sm text-[#231814] backdrop-blur disabled:opacity-35"
              :disabled="!canScrollPrev" aria-label="Previous" @click.stop="scrollPrev">
              ‹
            </button>
            <button type="button"
              class="rounded-xl border border-black/10 bg-white/60 px-4 py-2 text-sm text-[#231814] backdrop-blur disabled:opacity-35"
              :disabled="!canScrollNext" aria-label="Next" @click.stop="scrollNext">
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.ticket-card__shell {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  border: 1px solid rgba(46, 20, 18, 0.15);
  border-radius: 24px;
  background-color: #fff8f3;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
  box-shadow: 0 14px 34px rgba(32, 14, 12, 0.1);
}

.ticket-card__info,
.ticket-card__gallery {
  position: relative;
  min-width: 0;
}

.ticket-card__info {
  overflow: hidden;
  padding: 0.9rem;
  background-color: #f8f5ef;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.ticket-card__gallery {
  padding: 0.35rem;
  background-color: #f8f5ef;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.ticket-card__divider {
  position: relative;
  display: block;
  min-height: 14px;
  background-color: #f7f0e8;
  background-image: v-bind(backgroundPaperUrl);
  background-size: 420px;
}

.ticket-card__dash {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 2px dashed rgba(125, 96, 83, 0.65);
}

.project-ticket-embla {
  width: 100%;
  height: 100%;
}

.project-ticket-embla__container {
  display: flex;
  height: 100%;
}

.project-ticket-embla__slide {
  min-width: 100%;
  flex: 0 0 100%;
  height: 100%;
}

@media (min-width: 900px) {
  .ticket-card__shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 18px minmax(280px, 32%);
    align-items: stretch;
    min-height: 460px;
  }

  .ticket-card__shell {
    --ticket-notch-x: calc(68% - 9px);
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

  .ticket-card__divider {
    min-height: auto;
  }

  .ticket-card__dash {
    top: 12px;
    bottom: 12px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    border-top: 0;
    border-left: 2px dashed rgba(125, 96, 83, 0.65);
  }
}
</style>
