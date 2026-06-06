<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { saveLocale, type AppLocale } from './i18n'
import SeasonsFalling from 'vue-seasons-falling'
import NavBar from './components/NavBar.vue'
import { publicAssetUrl } from './utils/resolveAssetUrl'

const { locale } = useI18n()

watch(locale, (value) => saveLocale(value as AppLocale))

// const backgroundPattern = resolveAssetUrl('src/assets/background_light_waves.svg');
// const backgroundPattern = resolveAssetUrl('src/assets/background_dark_waves.svg');
// const backgroundPattern = resolveAssetUrl('src/assets/paper_pattern.svg');
const backgroundPattern = publicAssetUrl('grid_pattern.svg')
const paperOverlay = publicAssetUrl('paper_overlay.png')
</script>

<template>
  <div class="relative flex h-[100dvh] overflow-hidden bg-[#f3eadf] p-0 md:p-4">


    <!-- Панель приложения -->
    <div
      class="relative z-10 flex h-full min-h-0 w-full flex-col overflow-hidden bg-(--color-header-bg) text-(--color-text) md:rounded-xl md:shadow-xl"
      :style="{ backgroundImage: `url(${backgroundPattern})`, backgroundRepeat: 'repeat', backgroundSize: '20px 20px' }">

      <div class="absolute inset-0 pointer-events-none z-0 mix-blend-darken opacity-60"
        :style="{ backgroundImage: `url(${paperOverlay})`, backgroundRepeat: 'repeat', backgroundSize: 'auto' }">
      </div>

      <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <SeasonsFalling season="summer" :amount="100" :wind="0.12" :mouseInteraction="true" />
      </div>

      <div class="relative z-[1000]">
        <NavBar class="sticky top-0" />
      </div>

      <div data-app-scroll
        class="relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-gutter:stable]">
        <div class="relative z-10">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
