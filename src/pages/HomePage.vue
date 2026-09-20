<script setup lang="ts">
import '@egjs/vue3-flicking/dist/flicking.css'
import CardAboutMe from '@/components/CardAboutMe.vue'
import CardCountProjects from '@/components/CardCountProjects.vue'
import CardInfoAboutMe from '@/components/CardInfoAboutMe.vue'
import BlockFeaturedProject from '@/components/BlockFeaturedProject.vue'
import BlockLastProjects from '@/components/BlockLastProjects.vue'
import HomeFooterSection from '@/components/HomeFooterSection.vue'
import HeroSplitStage from '@/components/hero-split/HeroSplitStage.vue'
import { darkMaterialStyle } from '@/components/hero-split/darkMaterial'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const cloudSrc = publicAssetUrl('cloud.png')
const paperOverlay = publicAssetUrl('paper_overlay.png')

/**
 * Тёмный материал: один и тот же у луча в хиро и у секции Featured case.
 * У луча фаза сетки прибита к низу, у секции — к верху, поэтому на стыке
 * линии продолжают друг друга.
 */
const darkMaterial = { color: '#17120f', gridOpacity: 0.14, grainUrl: paperOverlay }
const featuredSectionStyle = darkMaterialStyle({
  gridOpacity: darkMaterial.gridOpacity,
  grainUrl: darkMaterial.grainUrl,
  anchor: 'top',
  baseColor: darkMaterial.color,
  // Под материалом — прежний градиент секции. Первые ~110px — чистый цвет
  // материала, чтобы стык с лучом был буквально пиксель в пиксель.
  below: [
    { image: `linear-gradient(180deg, ${darkMaterial.color} 0px, rgba(23, 18, 15, 0) 110px)`, size: 'auto', blend: 'normal' },
    { image: 'radial-gradient(circle at top left, #531818 0%, #1d1716 45%, #121212 100%)', size: 'auto', blend: 'normal' },
  ],
})

const homeCloudDecorations = [
  {
    className:
      '-left-24 top-2 w-44 -rotate-8 opacity-34 mix-blend-darken saturate-75 sm:-left-28 sm:top-0 sm:w-56 lg:-left-24 lg:top-6 lg:w-64',
    initial: { x: -42, y: -14, opacity: 0, rotate: -12, scale: 0.92 },
    visible: { x: 0, y: 0, opacity: 0.34, rotate: -8, scale: 1 },
    transition: { duration: 1100, delay: 120 },
  },
  {
    className:
      '-right-20 top-28 w-36 rotate-6 opacity-28 mix-blend-darken saturate-75 sm:-right-20 sm:top-36 sm:w-44 lg:-right-16 lg:top-20 lg:w-52',
    initial: { x: 40, y: -4, opacity: 0, rotate: 10, scale: 0.94 },
    visible: { x: 0, y: 0, opacity: 0.28, rotate: 6, scale: 1 },
    transition: { duration: 1150, delay: 260 },
  },
  {
    className:
      '-left-16 top-[26rem] w-32 rotate-4 opacity-24 mix-blend-darken saturate-75 sm:-left-20 sm:top-[30rem] sm:w-40 lg:left-[8%] lg:top-[24rem] lg:w-48',
    initial: { x: -28, y: 14, opacity: 0, rotate: 8, scale: 0.9 },
    visible: { x: 0, y: 0, opacity: 0.24, rotate: 4, scale: 1 },
    transition: { duration: 1000, delay: 420 },
  },
  {
    className:
      '-right-24 top-[42rem] w-44 -rotate-5 opacity-30 mix-blend-darken saturate-75 sm:-right-28 sm:top-[48rem] sm:w-52 lg:-right-24 lg:top-[34rem] lg:w-64',
    initial: { x: 38, y: 18, opacity: 0, rotate: -9, scale: 0.92 },
    visible: { x: 0, y: 0, opacity: 0.3, rotate: -5, scale: 1 },
    transition: { duration: 1180, delay: 520 },
  },
]
</script>

<template>
  <div class="relative min-h-full overflow-x-hidden [touch-action:pan-y]">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img v-for="(cloud, index) in homeCloudDecorations" :key="`home-cloud-${index}`" v-motion :src="cloudSrc" alt=""
        class="absolute select-none blur-[0.35px]" :initial="cloud.initial" :visible-once="cloud.visible"
        :transition="cloud.transition" :class="cloud.className" />
    </div>

    <main class="relative z-10 mx-auto w-full">
      <!-- Рваная тёмная полоса поверх хиро. Карточки внутри — как были;
           параметры подобраны в /hero-lab, там же их можно докрутить. -->
      <HeroSplitStage
        dark-style="shade"
        :center-top="60"
        :center-bottom="40"
        :band-width="44"
        :band-min-px="300"
        :dark-color="darkMaterial.color"
        :grid-opacity="darkMaterial.gridOpacity"
        :grain-url="darkMaterial.grainUrl"
        top-color="#201e1c"
        :top-fade="140"
        :reveal-duration="900"
        :idle-drift="0.8"
        follow-cursor
        :follow-strength="3.5"
        :roughness="0.5"
        :seed="7"
      >
      <section class="relative mx-auto max-w-[1580px] px-4 py-4 sm:px-6 lg:pb-6 xl:px-8">
        <div class="relative z-10 space-y-3 lg:hidden">
          <div class="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <CardAboutMe class="mt-2 min-w-0 rotate-1" />
            <div class="flex justify-center md:justify-start">
              <CardCountProjects class="rotate-3" />
            </div>
          </div>

          <div class="grid gap-3 sm:gap-4">
            <CardInfoAboutMe class="min-w-0" />
          </div>
        </div>

        <div
          class="relative z-10 hidden lg:grid lg:grid-cols-[minmax(640px,880px)_minmax(260px,340px)] lg:items-start lg:gap-x-8 xl:grid-cols-[minmax(760px,940px)_minmax(300px,380px)] xl:gap-x-10">
          <div class="flex min-w-0 max-w-[900px] flex-col gap-3 xl:gap-4">
            <CardAboutMe class="mt-2 min-w-0 max-w-none lg:rotate-1 xl:rotate-2" />
            <CardInfoAboutMe class="lg:-rotate-1" />
          </div>

          <div class="flex justify-center xl:justify-start">
            <CardCountProjects class="w-full max-w-[340px] -rotate-3 xl:max-w-[380px] xl:-rotate-4" />
          </div>
        </div>
      </section>
      </HeroSplitStage>

      <!-- Featured case из того же «тёмного материала», что и луч в хиро.
           Красное свечение стартует чуть ниже верха: первые ~110px — чистый
           цвет материала, чтобы стык с лучом был буквально пиксель в пиксель. -->
      <!-- -mt-px: накрываем субпиксельную щель на стыке с хиро (его высота дробная
           из-за повёрнутых карточек, и антиалиасинг пропускал сквозь неё светлый фон). -->
      <section class="relative -mt-px overflow-hidden" :style="featuredSectionStyle">
        <div class="absolute -left-10 top-6 h-36 w-36 rounded-full bg-[#d7342a]/20 blur-3xl" />
        <div class="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#f3d0b6]/10 blur-3xl" />
        <div class="relative z-10">
          <BlockFeaturedProject />
        </div>
      </section>

      <section
        class="relative -mt-px overflow-hidden bg-[linear-gradient(180deg,#121212_0%,#19120f_82%,#19120f_100%)] pt-14 lg:pt-16">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-16 lg:h-20">
          <div
            class="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0)_0%,rgba(18,18,18,0.58)_58%,#121212_100%)]" />
        </div>
        <div class="relative z-10">
          <BlockLastProjects />
        </div>
      </section>

      <HomeFooterSection class="relative z-10 -mt-2 sm:-mt-3" />

    </main>
  </div>
</template>

<style scoped>
.flicking-panel {
  flex: 0 0 auto;
}
</style>
