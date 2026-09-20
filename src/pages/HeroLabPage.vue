<script setup lang="ts">
/**
 * Песочница для split-hero.
 *
 * Внутри — ровно тот же блок карточек, что сейчас на главной: CardAboutMe,
 * CardCountProjects и CardInfoAboutMe без единой правки, вместе со всеми
 * брейкпоинтами. Эффект навешивается снаружи, поэтому подобранные здесь
 * параметры переносятся в HomePage.vue один в один.
 */
import { reactive } from 'vue'
import HeroSplitStage from '@/components/hero-split/HeroSplitStage.vue'
import CardAboutMe from '@/components/CardAboutMe.vue'
import CardCountProjects from '@/components/CardCountProjects.vue'
import CardInfoAboutMe from '@/components/CardInfoAboutMe.vue'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const cloudSrc = publicAssetUrl('cloud.png')
const paperOverlay = publicAssetUrl('paper_overlay.png')

// Облака один в один из HomePage — чтобы песочница выглядела как настоящая главная.
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
]

const darkStyles = [
  { value: 'shade', label: 'Мягкая тень', hint: 'карточки чуть приглушены, цвета свои' },
  { value: 'dim', label: 'Под навесом', hint: 'карточки заметно темнее' },
  { value: 'night', label: 'Негатив', hint: 'текст светлый, фото в оригинале' },
] as const

const settings = reactive({
  mode: 'band' as 'band' | 'edge',
  centerTop: 60,
  centerBottom: 40,
  bandWidth: 44,
  bandMinPx: 300,
  darkStyle: 'shade' as 'shade' | 'dim' | 'night',
  darkColor: '#17120f',
  gridOpacity: 0.14,
  grain: true,
  topColor: '#201e1c',
  topLine: '',
  topFade: 140,
  revealDuration: 900,
  idleDrift: 0.8,
  roughness: 0.5,
  seed: 7,
  followCursor: true,
  followStrength: 3.5,
  showEdgeGlow: true,
})

const presets = [
  { name: 'Диагональ справа-влево', centerTop: 60, centerBottom: 40, bandWidth: 44, roughness: 0.5, seed: 7 },
  { name: 'Круче наклон', centerTop: 68, centerBottom: 30, bandWidth: 40, roughness: 0.5, seed: 11 },
  { name: 'Узкая полоса', centerTop: 58, centerBottom: 44, bandWidth: 28, roughness: 0.6, seed: 17 },
  { name: 'Почти вертикальная', centerTop: 52, centerBottom: 48, bandWidth: 44, roughness: 0.45, seed: 21 },
]

function applyPreset(preset: (typeof presets)[number]) {
  Object.assign(settings, preset)
}
</script>

<template>
  <div class="relative min-h-full overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        v-for="(cloud, index) in homeCloudDecorations"
        :key="`lab-cloud-${index}`"
        v-motion
        :src="cloudSrc"
        alt=""
        class="absolute select-none blur-[0.35px]"
        :initial="cloud.initial"
        :visible-once="cloud.visible"
        :transition="cloud.transition"
        :class="cloud.className"
      />
    </div>

    <HeroSplitStage
      class="relative z-10"
      :mode="settings.mode"
      :center-top="settings.centerTop"
      :center-bottom="settings.centerBottom"
      :band-width="settings.bandWidth"
      :band-min-px="settings.bandMinPx"
      :dark-style="settings.darkStyle"
      :dark-color="settings.darkColor"
      :grid-opacity="settings.gridOpacity"
      :grain-url="settings.grain ? paperOverlay : ''"
      :top-color="settings.topColor"
      :top-line="settings.topLine"
      :top-fade="settings.topFade"
      :reveal-duration="settings.revealDuration"
      :idle-drift="settings.idleDrift"
      :roughness="settings.roughness"
      :seed="settings.seed"
      :follow-cursor="settings.followCursor"
      :follow-strength="settings.followStrength"
      :show-edge-glow="settings.showEdgeGlow"
    >
      <!-- Блок один в один как в HomePage — карточки и брейкпоинты не трогаем. -->
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
          class="relative z-10 hidden lg:grid lg:grid-cols-[minmax(640px,880px)_minmax(260px,340px)] lg:items-start lg:gap-x-8 xl:grid-cols-[minmax(760px,940px)_minmax(300px,380px)] xl:gap-x-10"
        >
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

    <!-- Панель настроек -->
    <div class="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-8">
      <h2 class="font-black-ops text-2xl">Настройки прожектора</h2>
      <p class="mt-1 text-sm text-(--color-muted-text)">
        Подбери параметры, потом перенесём готовые значения в HomePage.
      </p>

      <fieldset class="mt-6 flex flex-wrap gap-2">
        <legend class="mb-2 w-full text-sm text-(--color-muted-text)">Обработка тёмной зоны</legend>
        <label
          v-for="style in darkStyles"
          :key="style.value"
          class="cursor-pointer rounded-full border px-4 py-2 text-sm transition"
          :class="settings.darkStyle === style.value ? 'border-(--color-accent) text-(--color-accent)' : 'border-black/20'"
          :title="style.hint"
        >
          <input v-model="settings.darkStyle" type="radio" :value="style.value" class="sr-only" />
          {{ style.label }}
        </label>
      </fieldset>

      <div class="mt-6 flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.name"
          type="button"
          class="rounded-full border border-black/20 px-4 py-2 text-sm transition hover:border-(--color-accent) hover:text-(--color-accent)"
          @click="applyPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Центр сверху: {{ settings.centerTop }}%</span>
          <input v-model.number="settings.centerTop" type="range" min="0" max="100" step="1" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Центр снизу: {{ settings.centerBottom }}%</span>
          <input v-model.number="settings.centerBottom" type="range" min="0" max="100" step="1" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Ширина полосы: {{ settings.bandWidth }}%</span>
          <input v-model.number="settings.bandWidth" type="range" min="10" max="90" step="1" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Минимум на узком экране: {{ settings.bandMinPx }}px</span>
          <input v-model.number="settings.bandMinPx" type="range" min="0" max="600" step="10" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Сетка в тени: {{ settings.gridOpacity.toFixed(2) }}</span>
          <input v-model.number="settings.gridOpacity" type="range" min="0" max="0.8" step="0.01" />
        </label>

        <label class="flex items-center gap-3 text-sm">
          <span class="text-(--color-muted-text)">Цвет полосы</span>
          <input v-model="settings.darkColor" type="color" class="h-8 w-12 cursor-pointer rounded border border-black/20 bg-transparent" />
          <code class="text-xs">{{ settings.darkColor }}</code>
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Рваность: {{ settings.roughness.toFixed(2) }}</span>
          <input v-model.number="settings.roughness" type="range" min="0" max="1" step="0.01" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Зерно рисунка: {{ settings.seed }}</span>
          <input v-model.number="settings.seed" type="range" min="1" max="60" step="1" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Переход сверху: {{ settings.topFade }}px</span>
          <input v-model.number="settings.topFade" type="range" min="0" max="300" step="10" />
        </label>

        <label class="flex items-center gap-3 text-sm">
          <span class="text-(--color-muted-text)">Цвет сверху</span>
          <input v-model="settings.topColor" type="color" class="h-8 w-12 cursor-pointer rounded border border-black/20 bg-transparent" />
          <code class="text-xs">{{ settings.topColor }}</code>
        </label>

        <label class="flex items-center gap-3 text-sm">
          <span class="text-(--color-muted-text)">Линия шапки</span>
          <input v-model="settings.topLine" type="color" class="h-8 w-12 cursor-pointer rounded border border-black/20 bg-transparent" />
          <code class="text-xs">{{ settings.topLine }}</code>
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Дрейф в покое: {{ settings.idleDrift.toFixed(1) }}%</span>
          <input v-model.number="settings.idleDrift" type="range" min="0" max="5" step="0.1" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Раскрытие: {{ settings.revealDuration }}мс (обнови страницу)</span>
          <input v-model.number="settings.revealDuration" type="range" min="0" max="2000" step="100" />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="text-(--color-muted-text)">Ход за курсором: {{ settings.followStrength }}%</span>
          <input v-model.number="settings.followStrength" type="range" min="0" max="40" step="1" />
        </label>

        <div class="flex flex-col gap-3 text-sm">
          <label class="flex items-center gap-2">
            <input v-model="settings.followCursor" type="checkbox" />
            <span>Следить за курсором</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="settings.showEdgeGlow" type="checkbox" />
            <span>Кромка бумаги</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="settings.grain" type="checkbox" />
            <span>Зерно в полосе</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              :checked="settings.mode === 'edge'"
              @change="settings.mode = settings.mode === 'edge' ? 'band' : 'edge'"
            />
            <span>Один разрыв вместо полосы</span>
          </label>
        </div>
      </div>

      <pre class="mt-8 overflow-x-auto rounded-lg border border-black/15 bg-black/5 p-4 text-xs">&lt;HeroSplitStage
  mode="{{ settings.mode }}"
  :center-top="{{ settings.centerTop }}"
  :center-bottom="{{ settings.centerBottom }}"
  :band-width="{{ settings.bandWidth }}"
  :band-min-px="{{ settings.bandMinPx }}"
  dark-style="{{ settings.darkStyle }}"
  dark-color="{{ settings.darkColor }}"
  :grid-opacity="{{ settings.gridOpacity }}"
  :grain-url="paperOverlay"
  top-color="{{ settings.topColor }}"
  top-line="{{ settings.topLine }}"
  :top-fade="{{ settings.topFade }}"
  :reveal-duration="{{ settings.revealDuration }}"
  :idle-drift="{{ settings.idleDrift }}"
  :roughness="{{ settings.roughness }}"
  :seed="{{ settings.seed }}"
  :follow-cursor="{{ settings.followCursor }}"
  :follow-strength="{{ settings.followStrength }}"
/&gt;</pre>
    </div>
  </div>
</template>
