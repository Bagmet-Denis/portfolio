<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { resolveAssetUrls } from '@/utils/resolveAssetUrl'

const { t } = useI18n()

const mobileGallery = resolveAssetUrls([
  'src/assets/projects/teleprompter/teleprompter0.png',
  'src/assets/projects/teleprompter/teleprompter1.png',
  'src/assets/projects/teleprompter/teleprompter2.png',
  'src/assets/projects/teleprompter/teleprompter3.png',
  'src/assets/projects/teleprompter/teleprompter4.png',
  'src/assets/projects/teleprompter/teleprompter5.png',
  'src/assets/projects/teleprompter/teleprompter6.png',
  'src/assets/projects/teleprompter/teleprompter7.png',
  'src/assets/projects/teleprompter/teleprompter8.png',
  'src/assets/projects/teleprompter/teleprompter9.png',
  'src/assets/projects/teleprompter/teleprompter10.png',
  'src/assets/projects/teleprompter/teleprompter11.png',
  'src/assets/projects/teleprompter/teleprompter12.png',
  'src/assets/projects/teleprompter/teleprompter13.png',
  'src/assets/projects/teleprompter/teleprompter14.png',
  'src/assets/projects/teleprompter/teleprompter15.png',
  'src/assets/projects/teleprompter/teleprompter16.png',
  'src/assets/projects/teleprompter/teleprompter17.png',
  'src/assets/projects/teleprompter/teleprompter18.png',
])

const webGallery = resolveAssetUrls([
  'src/assets/projects/teleprompter/teleprompter_web_0.png',
  'src/assets/projects/teleprompter/teleprompter_web_1.png',
  'src/assets/projects/teleprompter/teleprompter_web_2.png',
  'src/assets/projects/teleprompter/teleprompter_web_3.png',
])

const platformItems = [
  'projects.teleprompter.info.platforms.items.0',
  'projects.teleprompter.info.platforms.items.1',
  'projects.teleprompter.info.platforms.items.2',
  'projects.teleprompter.info.platforms.items.3',
]

const capabilitySections = [
  {
    titleKey: 'projects.teleprompter.info.capture.title',
    items: [
      'projects.teleprompter.info.capture.items.0',
      'projects.teleprompter.info.capture.items.1',
      'projects.teleprompter.info.capture.items.2',
    ],
  },
  {
    titleKey: 'projects.teleprompter.info.teleprompter.title',
    items: [
      'projects.teleprompter.info.teleprompter.items.0',
      'projects.teleprompter.info.teleprompter.items.1',
      'projects.teleprompter.info.teleprompter.items.2',
    ],
  },
  {
    titleKey: 'projects.teleprompter.info.scripts.title',
    items: [
      'projects.teleprompter.info.scripts.items.0',
      'projects.teleprompter.info.scripts.items.1',
      'projects.teleprompter.info.scripts.items.2',
    ],
  },
  {
    titleKey: 'projects.teleprompter.info.editor.title',
    items: [
      'projects.teleprompter.info.editor.items.0',
      'projects.teleprompter.info.editor.items.1',
      'projects.teleprompter.info.editor.items.2',
    ],
  },
  {
    titleKey: 'projects.teleprompter.info.web.title',
    items: [
      'projects.teleprompter.info.web.items.0',
      'projects.teleprompter.info.web.items.1',
      'projects.teleprompter.info.web.items.2',
    ],
  },
  {
    titleKey: 'projects.teleprompter.info.watch.title',
    items: [
      'projects.teleprompter.info.watch.items.0',
      'projects.teleprompter.info.watch.items.1',
    ],
  },
]

const titleAccentStyles = [
  {
    badge: 'bg-[#6F5643] text-[#ECE6C2]',
    line: 'bg-[#6F5643]',
  },
  {
    badge: 'bg-[#CC6B49] text-[#ECE6C2]',
    line: 'bg-[#CC6B49]',
  },
  {
    badge: 'bg-[#D2A24C] text-[#6F5643]',
    line: 'bg-[#D2A24C]',
  },
  {
    badge: 'bg-[#73BDA8] text-[#6F5643]',
    line: 'bg-[#73BDA8]',
  },
] as const
</script>

<template>
  <div class="space-y-5 text-[#18242c]">
    <section
      class="rounded-[22px] border border-[#d6e1e8] bg-white p-5 shadow-[0_10px_24px_rgba(15,30,40,0.05)] sm:p-6">
      <div class="relative z-10">
        <p class="text-[11px] font-black uppercase tracking-[0.24em] text-[#5b7a8e]">
          {{ t('projects.teleprompter.info.eyebrow') }}
        </p>
        <div class="mt-2 flex items-center gap-2">
          <span class="h-[3px] w-6 shrink-0 bg-[#CC6B49] sm:w-8"></span>
          <div class="w-fit bg-[#CC6B49] px-2.5 py-1 skew-x-[-10deg]">
            <h2 class="max-w-4xl text-2xl font-black leading-tight text-[#ECE6C2] skew-x-[10deg] sm:text-4xl">
              {{ t('projects.teleprompter.info.title') }}
            </h2>
          </div>
        </div>
        <p class="mt-3 max-w-4xl text-sm leading-6 text-[#51616c] sm:text-[15px]">
          {{ t('projects.teleprompter.info.lead') }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="item in platformItems" :key="item"
            class="rounded-full border border-[#d7e3ea] bg-[#f5f9fb] px-3 py-1.5 text-xs font-semibold text-[#365467]">
            {{ t(item) }}
          </span>
        </div>
      </div>
    </section>

    <section
      class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <article class="rounded-[22px] border border-[#d6e1e8] bg-white p-5 shadow-[0_10px_24px_rgba(15,30,40,0.05)]">
        <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#5b7a8e]">
          {{ t('projects.teleprompter.info.roleLabel') }}
        </p>
        <div class="mt-2 flex items-center gap-2">
          <span class="h-[3px] w-5 shrink-0 bg-[#6F5643]"></span>
          <div class="w-fit bg-[#6F5643] px-2 py-1 skew-x-[-10deg]">
            <h3 class="text-xl font-black text-[#ECE6C2] skew-x-[10deg]">
              {{ t('projects.teleprompter.info.roleTitle') }}
            </h3>
          </div>
        </div>
        <p class="mt-3 text-sm leading-6 text-[#51616c]">
          {{ t('projects.teleprompter.info.roleLead') }}
        </p>
      </article>

      <article
        class="rounded-[22px] border border-[#d6e1e8] bg-[#eef4f7] p-5 shadow-[0_10px_24px_rgba(15,30,40,0.05)]">
        <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#5b7a8e]">
          {{ t('projects.teleprompter.info.scopeLabel') }}
        </p>
        <p class="mt-3 text-sm leading-6 text-[#51616c]">
          {{ t('projects.teleprompter.info.scopeText') }}
        </p>
      </article>
    </section>

    <section class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <article v-for="(section, index) in capabilitySections" :key="section.titleKey"
        class="rounded-[20px] border border-[#d6e1e8] bg-white p-5 shadow-[0_10px_24px_rgba(15,30,40,0.05)]">
        <div class="flex items-center gap-2">
          <span
            class="h-[3px] w-5 shrink-0"
            :class="titleAccentStyles[index % titleAccentStyles.length].line"
          ></span>
          <div
            class="w-fit px-2 py-1 skew-x-[-10deg]"
            :class="titleAccentStyles[index % titleAccentStyles.length].badge"
          >
            <p class="text-sm font-black uppercase tracking-[0.14em] skew-x-[10deg]">
              {{ t(section.titleKey) }}
            </p>
          </div>
        </div>
        <ul class="mt-3 space-y-2.5 text-sm leading-6 text-[#4f5f69]">
          <li v-for="item in section.items" :key="item" class="flex gap-2">
            <span class="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f96ad]"></span>
            <span>{{ t(item) }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
      <article class="rounded-[22px] border border-[#d6e1e8] bg-white p-4 shadow-[0_10px_24px_rgba(15,30,40,0.05)]">
        <div class="mb-4 flex items-end justify-between gap-3">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#5b7a8e]">
              {{ t('projects.teleprompter.info.mobileGalleryEyebrow') }}
            </p>
            <div class="mt-1 flex items-center gap-2">
              <span class="h-[3px] w-5 shrink-0 bg-[#D2A24C]"></span>
              <div class="w-fit bg-[#D2A24C] px-2 py-1 skew-x-[-10deg]">
                <h3 class="text-xl font-black text-[#6F5643] skew-x-[10deg]">
                  {{ t('projects.teleprompter.info.mobileGalleryTitle') }}
                </h3>
              </div>
            </div>
          </div>
          <span class="rounded-full border border-[#d7e3ea] bg-[#f5f9fb] px-3 py-1 text-xs font-semibold text-[#365467]">
            {{ mobileGallery.length }}
          </span>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div v-for="(src, index) in mobileGallery" :key="`teleprompter-mobile-${index}`"
            class="overflow-hidden rounded-[20px] border border-[#d6e1e8] bg-[#f4f8fb] shadow-[0_10px_20px_rgba(15,30,40,0.05)]">
            <img :src="src" :alt="`Teleprompter mobile ${index + 1}`"
              class="h-full max-h-[420px] w-full object-cover object-top" loading="lazy" decoding="async" />
          </div>
        </div>
      </article>

      <article
        class="rounded-[22px] border border-[#d6e1e8] bg-[#eef4f7] p-4 shadow-[0_10px_24px_rgba(15,30,40,0.05)]">
        <div class="mb-4 flex items-end justify-between gap-3">
          <div>
            <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#5b7a8e]">
              {{ t('projects.teleprompter.info.webGalleryEyebrow') }}
            </p>
            <div class="mt-1 flex items-center gap-2">
              <span class="h-[3px] w-5 shrink-0 bg-[#73BDA8]"></span>
              <div class="w-fit bg-[#73BDA8] px-2 py-1 skew-x-[-10deg]">
                <h3 class="text-xl font-black text-[#6F5643] skew-x-[10deg]">
                  {{ t('projects.teleprompter.info.webGalleryTitle') }}
                </h3>
              </div>
            </div>
          </div>
          <span class="rounded-full border border-[#d7e3ea] bg-white px-3 py-1 text-xs font-semibold text-[#365467]">
            {{ webGallery.length }}
          </span>
        </div>

        <p class="mb-4 text-sm leading-6 text-[#51616c]">
          {{ t('projects.teleprompter.info.webGalleryLead') }}
        </p>

        <div class="grid gap-3">
          <div v-for="(src, index) in webGallery" :key="`teleprompter-web-${index}`"
            class="overflow-hidden rounded-[20px] border border-[#d6e1e8] bg-white shadow-[0_10px_20px_rgba(15,30,40,0.05)]">
            <img :src="src" :alt="`Teleprompter web ${index + 1}`"
              class="h-full max-h-[320px] w-full object-cover object-top" loading="lazy" decoding="async" />
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
