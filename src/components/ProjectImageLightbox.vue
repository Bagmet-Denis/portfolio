<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { ProjectCard } from '@/types/projectCard'

const props = defineProps<{
  project: ProjectCard | null
  index: number
  noImagesText: string
  closeLabel: string
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:index', value: number): void
}>()

const lightboxRoot = ref<HTMLElement | null>(null)
const lightboxImage = computed(() => {
  if (!props.project) return null
  return props.project.galleryUrls[props.index] ?? null
})

let lockedScrollContainer: HTMLElement | null = null
let previousHtmlOverflow = ''
let previousBodyOverflow = ''
let previousScrollContainerOverflow = ''
let isScrollLocked = false

const canScrollPrev = computed(() => props.index > 0)
const canScrollNext = computed(() => {
  if (!props.project) return false
  return props.index < props.project.galleryUrls.length - 1
})

function setIndex(index: number) {
  if (!props.project) return
  emit('update:index', Math.min(Math.max(index, 0), props.project.galleryUrls.length - 1))
}

function lightboxPrev() {
  if (!canScrollPrev.value) return
  setIndex(props.index - 1)
}

function lightboxNext() {
  if (!canScrollNext.value) return
  setIndex(props.index + 1)
}

async function lockPageScroll() {
  if (isScrollLocked || typeof document === 'undefined') return

  await nextTick()

  if (!props.project || isScrollLocked) return

  lockedScrollContainer =
    lightboxRoot.value?.closest<HTMLElement>('[data-app-scroll]') ??
    document.querySelector<HTMLElement>('[data-app-scroll]')
  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  previousScrollContainerOverflow = lockedScrollContainer?.style.overflow ?? ''

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'

  if (lockedScrollContainer) {
    lockedScrollContainer.style.overflow = 'hidden'
  }

  isScrollLocked = true
}

function unlockPageScroll() {
  if (!isScrollLocked || typeof document === 'undefined') return

  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow

  if (lockedScrollContainer) {
    lockedScrollContainer.style.overflow = previousScrollContainerOverflow
  }

  lockedScrollContainer = null
  isScrollLocked = false
}

watch(
  () => props.project,
  (project) => {
    if (project) {
      void lockPageScroll()
      return
    }

    unlockPageScroll()
  },
  { immediate: true },
)

onBeforeUnmount(unlockPageScroll)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      ref="lightboxRoot"
      class="fixed inset-0 z-[5000] flex items-center justify-center overflow-hidden bg-[#070504]/78 p-3 text-[#fff8f0] backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      @click.self="emit('close')"
      @wheel.stop
      @keydown.esc="emit('close')"
    >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(217,97,56,0.20),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(246,190,162,0.14),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.42))]"
    />

    <div class="relative flex h-full max-h-[94vh] w-full max-w-[1320px] items-center justify-center">
      <div
        class="absolute left-0 top-0 z-30 max-w-[calc(100%-56px)] rounded-[18px] border border-white/12 bg-[#17100d]/72 px-3 py-2 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-4"
      >
        <p class="truncate text-sm font-black sm:text-base">{{ project.title }}</p>
        <p class="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0b39b]/78">
          {{ index + 1 }} / {{ project.galleryUrls.length }}
        </p>
      </div>

      <button
        type="button"
        class="absolute right-0 top-0 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-[#17100d]/72 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:border-[#f0b39b]/36 hover:bg-[#261814]/82 focus:outline-none focus:ring-2 focus:ring-[#f0b39b]/60"
        :aria-label="closeLabel"
        @click="emit('close')"
      >
        <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
        </svg>
      </button>

      <button
        v-if="project.galleryUrls.length > 1"
        type="button"
        class="absolute left-0 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#17100d]/66 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:border-[#f0b39b]/36 hover:bg-[#261814]/82 disabled:cursor-default disabled:opacity-35 sm:grid"
        :disabled="!canScrollPrev"
        aria-label="Previous"
        @click.stop="lightboxPrev"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="relative flex max-h-full w-full items-center justify-center px-0 pb-20 pt-16 sm:px-16 sm:pb-24 sm:pt-16">
        <img
          v-if="lightboxImage"
          :src="lightboxImage"
          :alt="`${project.title} ${index + 1}`"
          class="block max-h-[calc(94vh-156px)] w-full object-contain drop-shadow-[0_30px_74px_rgba(0,0,0,0.62)]"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="flex min-h-[240px] w-full items-center justify-center rounded-lg text-sm text-white/62">
          {{ noImagesText }}
        </div>
      </div>

      <button
        v-if="project.galleryUrls.length > 1"
        type="button"
        class="absolute right-0 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#17100d]/66 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:border-[#f0b39b]/36 hover:bg-[#261814]/82 disabled:cursor-default disabled:opacity-35 sm:grid"
        :disabled="!canScrollNext"
        aria-label="Next"
        @click.stop="lightboxNext"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div
        v-if="project.galleryUrls.length > 1"
        class="absolute bottom-20 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-3 sm:hidden"
      >
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-[#17100d]/74 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_14px_32px_rgba(0,0,0,0.34)] backdrop-blur-xl disabled:opacity-35"
          :disabled="!canScrollPrev"
          aria-label="Previous"
          @click.stop="lightboxPrev"
        >
          <svg class="h-5.5 w-5.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-[#17100d]/74 text-[#fff8f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_14px_32px_rgba(0,0,0,0.34)] backdrop-blur-xl disabled:opacity-35"
          :disabled="!canScrollNext"
          aria-label="Next"
          @click.stop="lightboxNext"
        >
          <svg class="h-5.5 w-5.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div
        v-if="project.galleryUrls.length > 1"
        class="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[760px] rounded-[20px] border border-white/12 bg-[#17100d]/72 px-2 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-3"
      >
        <div class="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] sm:justify-center">
          <button
            v-for="(src, thumbIndex) in project.galleryUrls"
            :key="`${project.id}-thumb-${thumbIndex}`"
            type="button"
            class="group relative h-14 w-11 shrink-0 overflow-hidden rounded-[10px] bg-black transition sm:h-[72px] sm:w-14"
            :class="thumbIndex === index
              ? 'opacity-100 shadow-[0_0_0_2px_rgba(240,179,155,0.92),0_10px_22px_rgba(0,0,0,0.36)]'
              : 'opacity-58 shadow-[0_0_0_1px_rgba(255,255,255,0.14)] hover:opacity-95 hover:shadow-[0_0_0_1px_rgba(240,179,155,0.46)]'"
            :aria-label="`${project.title} ${thumbIndex + 1}`"
            @click.stop="setIndex(thumbIndex)"
          >
            <img
              :src="src"
              alt=""
              class="h-full w-full object-cover transition duration-200 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>
      </div>
    </div>
  </Teleport>
</template>
