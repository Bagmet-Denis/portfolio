<script setup lang="ts">
import '@egjs/vue3-flicking/dist/flicking.css'
import CardAboutMe from '@/components/CardAboutMe.vue'
import CardCountProjects from '@/components/CardCountProjects.vue'
import CardInfoAboutMe from '@/components/CardInfoAboutMe.vue'
import BlockFeaturedProject from '@/components/BlockFeaturedProject.vue'
import BlockLastProjects from '@/components/BlockLastProjects.vue'
import CardProfileImage from '@/components/CardProfileImage.vue'
import HomeFooterSection from '@/components/HomeFooterSection.vue'

const cloudSrc = '/cloud.png'

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
  <div class="min-h-screen overflow-x-hidden [touch-action:pan-y]">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img v-for="(cloud, index) in homeCloudDecorations" :key="`home-cloud-${index}`" v-motion :src="cloudSrc" alt=""
        class="absolute select-none blur-[0.35px]" :initial="cloud.initial" :visible-once="cloud.visible"
        :transition="cloud.transition" :class="cloud.className" />
    </div>

    <main class="relative z-10 mx-auto w-full">
      <section class="mx-auto max-w-[1580px] px-4 py-4 sm:px-6 xl:px-8">
        <div class="space-y-4 lg:hidden">
          <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <CardAboutMe class="min-w-0 rotate-1" />
            <div class="flex justify-center md:justify-start">
              <CardCountProjects class="rotate-3" />
            </div>
          </div>

          <div
            class="grid grid-cols-[minmax(0,1fr)_minmax(116px,180px)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-4">
            <CardInfoAboutMe class="min-w-0" />
            <CardProfileImage />
          </div>
        </div>

        <div class="hidden lg:grid lg:grid-cols-12 lg:items-start lg:gap-4 xl:gap-6">
          <CardAboutMe class="min-w-0 lg:col-span-6 xl:col-span-7 lg:rotate-1 xl:rotate-2" />

          <div class="flex justify-center lg:col-span-3 xl:col-span-2 xl:justify-start">
            <CardCountProjects class="w-full max-w-[250px] -rotate-3 xl:-rotate-4" />
          </div>

          <div class="flex lg:col-span-3 lg:row-span-2 lg:min-h-full lg:items-end lg:justify-end lg:self-end">
            <CardProfileImage class="origin-bottom lg:translate-y-2 xl:translate-y-4" />
          </div>

          <CardInfoAboutMe class="lg:col-span-3 xl:col-span-3" />
        </div>
      </section>

      <div
        class="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#531818_0%,#1d1716_45%,#121212_100%)]"
      >
        <div
          class="absolute inset-0 opacity-18 mix-blend-screen"
          style="background-image: url('/grid_pattern.svg'); background-size: 28px; background-position: center;"
        />
        <div class="absolute -left-10 top-6 h-36 w-36 rounded-full bg-[#d7342a]/20 blur-3xl" />
        <div class="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#f3d0b6]/10 blur-3xl" />
        <BlockFeaturedProject />
        <BlockLastProjects />
      </div>

      <HomeFooterSection />

    </main>
  </div>
</template>

<style scoped>
.flicking-panel {
  flex: 0 0 auto;
}
</style>
