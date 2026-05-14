<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { mobileProjects } from '@/data/projects'
import { resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import ProjectTicketCardClassic from '@/components/ProjectTicketCardClassic.vue'
import type { ProjectCard, StoreType } from '@/types/projectCard'

const { t } = useI18n()

const storeBadgeSrc: Record<StoreType, string> = {
  appstore: resolveAssetUrl('src/assets/projects/icons/appstore.svg'),
  googleplay: resolveAssetUrl('src/assets/projects/icons/google-play.svg'),
  rustore: resolveAssetUrl('src/assets/projects/icons/rustore.svg'),
  website: '',
}

const featuredProject = computed<ProjectCard | null>(() => {
  const project = mobileProjects.find((item) => item.title === 'The Tone of Victory')
  if (!project) return null

  return {
    id: `mobile-${project.id}-${project.title}`,
    title: project.title,
    description: getProjectDescription(t, project.title, project.description || ''),
    technologies: project.technologies.filter(Boolean),
    iconUrl: resolveAssetUrl(project.iconPath),
    galleryUrls: resolveAssetUrls([
      'src/assets/projects/tag/tag0.png',
      'src/assets/projects/tag/tag1.png',
      'src/assets/projects/tag/tag2.png',
      'src/assets/projects/tag/tag3.png',
      'src/assets/projects/tag/tag4.png',
      'src/assets/projects/tag/tag5.png',
    ]),
    storeLinks: [],
  }
})

const standGalleryUrls = resolveAssetUrls([
  'src/assets/projects/tag/stand0.jpeg',
  'src/assets/projects/tag/stand1.jpeg',
  'src/assets/projects/tag/stand2.jpeg',
])
</script>

<template>
  <section class="relative overflow-hidden px-4 py-6 sm:px-6 xl:px-8">
    <div class="relative mx-auto max-w-[1580px]">
      <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-3xl">
          <p class="text-[11px] font-black uppercase tracking-[0.28em] text-[#f0b39b]">
            {{ t('home.featuredCaseEyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl font-black tracking-tight text-[#fff4ea] sm:text-4xl">
            {{ t('home.featuredCaseTitle') }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-white/72 sm:text-base">
            {{ t('home.featuredCaseLead') }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/86">
          <span class="rounded-full border border-white/16 bg-white/8 px-3 py-1.5">Spring 2025</span>
          <span class="rounded-full border border-[#ffb57d]/20 bg-[#ffb57d]/10 px-3 py-1.5 text-[#ffd5b2]">
            South Korea Stand
          </span>
          <span class="rounded-full border border-white/16 bg-white/8 px-3 py-1.5">TAG Heuer x Formula 1</span>
        </div>
      </div>

      <div class="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
        <aside class="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div class="rounded-[22px] border border-white/12 bg-white/8 p-3 backdrop-blur">
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-[#f6bea2]">{{ t('home.featuredCaseFacts.clientLabel') }}</p>
            <p class="mt-2 text-sm leading-6 text-white/88">{{ t('home.featuredCaseFacts.clientValue') }}</p>
          </div>
          <div class="rounded-[22px] border border-white/12 bg-white/8 p-3 backdrop-blur">
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-[#f6bea2]">{{ t('home.featuredCaseFacts.formatLabel') }}</p>
            <p class="mt-2 text-sm leading-6 text-white/88">{{ t('home.featuredCaseFacts.formatValue') }}</p>
          </div>
          <div class="rounded-[22px] border border-white/12 bg-white/8 p-3 backdrop-blur">
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-[#f6bea2]">{{ t('home.featuredCaseFacts.stackLabel') }}</p>
            <p class="mt-2 text-sm leading-6 text-white/88">{{ t('home.featuredCaseFacts.stackValue') }}</p>
          </div>
        </aside>

        <div class="min-w-0">
          <ProjectTicketCardClassic v-if="featuredProject" :project="featuredProject" :store-badge-src="storeBadgeSrc"
            :open-lightbox="() => { }" :no-images-text="t('projects.noImages')" />
        </div>
      </div>

      <aside class="mt-6">
          <div class="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-2xl">
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-[#f4b48b]">
              {{ t('home.featuredCaseStand.title') }}
            </p>
            <p class="mt-2 text-sm leading-6 text-white/70">
                {{ t('home.featuredCaseStand.description') }}
            </p>
            </div>
            <div class="text-[11px] font-bold uppercase tracking-[0.18em] text-white/62">
              {{ t('home.featuredCaseStand.meta') }}
            </div>
          </div>

          <div class="grid gap-3 lg:grid-cols-[1.25fr_0.9fr_0.9fr]">
            <figure
              class="group relative overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-2 shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur">
              <div
                class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] opacity-70" />
              <img :src="standGalleryUrls[0]" alt="The Tone of Victory stand 1"
                class="relative block h-[300px] w-full rounded-[22px] object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[340px] lg:h-[420px]" />
              <div
                class="absolute left-4 top-4 rounded-full border border-white/18 bg-black/36 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                Spring 2025
              </div>
            </figure>

            <figure v-for="(src, index) in standGalleryUrls.slice(1)" :key="`stand-${index + 1}`"
              class="group relative overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-2 shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur">
              <div
                class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] opacity-70" />
              <img :src="src" :alt="`The Tone of Victory stand ${index + 2}`"
                class="relative block h-[240px] w-full rounded-[22px] object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[280px] lg:h-[420px]" />
              <div
                class="absolute left-4 top-4 rounded-full border border-white/18 bg-black/36 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur">
                South Korea
              </div>
            </figure>
          </div>
      </aside>

      <div class="mt-4 flex justify-end">
        <RouterLink to="/projects" class="text-sm font-semibold text-[#fbe5d0] hover:text-white">
          {{ t('home.latestProjectsCta') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
