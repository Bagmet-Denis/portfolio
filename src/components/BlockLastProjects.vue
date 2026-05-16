<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { mobileProjects } from '@/data/projects'
import { resolveAssetUrl, resolveAssetUrls } from '@/utils/resolveAssetUrl'
import { getProjectDescription } from '@/utils/projectDescriptions'
import ProjectTicketCard from '@/components/ProjectTicketCard.vue'
import type { ProjectCard, StoreType } from '@/types/projectCard'

const { t } = useI18n()

const storeBadgeSrc: Record<StoreType, string> = {
  appstore: resolveAssetUrl('src/assets/projects/icons/appstore.svg'),
  googleplay: resolveAssetUrl('src/assets/projects/icons/google-play.svg'),
  rustore: resolveAssetUrl('src/assets/projects/icons/rustore.svg'),
  website: '',
}

const latestProjects = computed<ProjectCard[]>(() => {
  const mapped: ProjectCard[] = mobileProjects.map((project) => {
    const storeLinks = []
    if (project.appStoreUrl) storeLinks.push({ type: 'appstore' as const, url: project.appStoreUrl })
    if (project.googlePlayUrl) storeLinks.push({ type: 'googleplay' as const, url: project.googlePlayUrl })
    if (project.ruStoreUrl) storeLinks.push({ type: 'rustore' as const, url: project.ruStoreUrl })
    if (project.title === 'Склад Меда') {
      storeLinks.push({
        type: 'website' as const,
        url: 'https://sklad-meda.ru/prilozhenie-dlya-android-sklad-meda',
        label: 'Скачать APK',
      })
    }

    return {
      id: `mobile-${project.id}-${project.title}`,
      title: project.title,
      description: stripHtml(getProjectDescription(t, project.title, project.description || '')).slice(0, 180),
      technologies: project.technologies.filter(Boolean).slice(0, 5),
      iconUrl: resolveAssetUrl(project.iconPath),
      galleryUrls: resolveAssetUrls(project.screenshots),
      storeLinks,
    }
  })

  const byTitle = (title: string) => mapped.find((project) => project.title === title)
  const insentryContribution: ProjectCard = {
    id: 'mobile-insentry-raw-decoder',
    category: 'mobile',
    eyebrow: t('projects.caseLabels.engineeringContribution'),
    title: 'Insentry mobile client',
    description: stripHtml(t('projects.descriptions.insentryRawStream')).slice(0, 220),
    technologies: [
      'WebSocket',
      'Byte stream',
      'H.264 / H.265',
      'NALU',
      'Native decoder',
      'Flutter bridge',
    ],
    iconUrl: resolveAssetUrl('src/assets/projects/insentry/1024x1024.jpg'),
    galleryUrls: resolveAssetUrls([
      'src/assets/projects/insentry/insentry0.jpg',
      'src/assets/projects/insentry/insentry1.jpg',
    ]),
    storeLinks: [],
    solvedTasksTitle: t('projects.caseLabels.solvedTasks'),
    solvedTasks: [
      t('projects.insentry.solvedTasks.0'),
      t('projects.insentry.solvedTasks.1'),
      t('projects.insentry.solvedTasks.2'),
    ],
  }

  return [
    byTitle('Teleprompter Automatic'),
    byTitle('Тренировки. Блин да Гриф'),
    byTitle('Складолог'),
    byTitle('ProStor.ae'),
    byTitle('Город Курорт'),
    byTitle('585Gold - золотые изделия'),
    insentryContribution,
  ].filter(Boolean) as ProjectCard[]
})

function stripHtml(input: string): string {
  return input
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function openLatestProjectLightbox() {
  // Homepage cards stay as lightweight previews for now.
}
</script>

<template>
  <section class="relative overflow-hidden p-6">
    <div class="relative z-10 flex flex-col">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="relative font-rubik uppercase text-2xl font-semibold sm:text-3xl">
          <div class="text-[#D96138]">
            {{ t('home.latestProjectsTitle') }}
          </div>

          <div class="absolute inset-0 -translate-x-[2px] -translate-y-[2px] text-[#5F8171]">
            {{ t('home.latestProjectsTitle') }}
          </div>
        </div>

        <RouterLink to="/projects" class="text-sm font-semibold text-[#FBEFD6] hover:text-[#B0464A]">
          {{ t('home.latestProjectsCta') }}
        </RouterLink>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-2 lg:items-start">
        <article
          v-for="(project, index) in latestProjects"
          :key="project.id"
          :class="project.id === 'mobile-insentry-raw-decoder' ? 'lg:col-span-2' : ''"
        >
          <div v-motion :initial="{
            opacity: 0,
            x: index % 2 === 0 ? 120 : -120,
            rotate: index % 2 === 0 ? 6 : -6,
            scale: 0.95
          }" :visibleOnce="{
            opacity: 1,
            x: 0,
            rotate: 0,
            scale: 1
          }" :transition="{
            type: 'spring',
            stiffness: 120,
            damping: 18
          }" :viewport="{ margin: '-120px' }" :delay="400">
            <ProjectTicketCard :project="project" :store-badge-src="storeBadgeSrc"
              :open-lightbox="openLatestProjectLightbox" :no-images-text="t('projects.noImages')" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
