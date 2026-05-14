<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { saveLocale, type AppLocale } from './i18n'
import SeasonsFalling from 'vue-seasons-falling';
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
  <div class="min-h-screen bg-[#f3eadf] flex items-center justify-center p-0 md:p-4 relative">


    <!-- Панель приложения -->
    <div
      class="relative z-10 w-full md:rounded-xl md:shadow-xl bg-(--color-header-bg) overflow-hidden flex flex-col text-(--color-text)"
      :style="{ backgroundImage: `url(${backgroundPattern})`, backgroundRepeat: 'repeat', backgroundSize: '20px 20px' }">

      <div class="absolute inset-0 pointer-events-none z-0 mix-blend-darken opacity-60"
        :style="{ backgroundImage: `url(${paperOverlay})`, backgroundRepeat: 'repeat', backgroundSize: 'auto' }">
      </div>

      <div class="relative z-[1000]">
        <NavBar class="sticky top-0" />
      </div>

      <div class="relative z-10 flex-1 overflow-auto">
        <div class="absolute inset-0">
          <SeasonsFalling season="spring" :amount="120" :mouseInteraction="true" />
        </div>

        <div class="relative z-10">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
