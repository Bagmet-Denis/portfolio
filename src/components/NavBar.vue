<script setup lang="ts">
import { saveLocale, type AppLocale } from '@/i18n';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { t, locale } = useI18n()
watch(locale, (value) => saveLocale(value as AppLocale))
const localeMenu = ref<HTMLDetailsElement | null>(null)
const cvMenu = ref<HTMLDetailsElement | null>(null)

const localeOptions: Array<{ value: AppLocale; flag: string; label: string }> = [
  { value: 'ru', flag: '🇷🇺', label: 'RU' },
  { value: 'en', flag: '🇬🇧', label: 'EN' },
]

const cvOptions = [
  {
    value: 'ru',
    flag: '🇷🇺',
    label: 'RU CV',
    url: publicAssetUrl('cv/RU_CV_Bagmet_Denis.pdf'),
    filename: 'RU_CV_Bagmet_Denis.pdf',
  },
  {
    value: 'en',
    flag: '🇬🇧',
    label: 'EN CV',
    url: publicAssetUrl('cv/EN_CV_Bagmet_Denis.pdf'),
    filename: 'EN_CV_Bagmet_Denis.pdf',
  },
]

const selectedLocale = computed(
  () => localeOptions.find((option) => option.value === locale.value) ?? localeOptions[0],
)

function setLocale(value: AppLocale) {
  locale.value = value
  localeMenu.value?.removeAttribute('open')
}

function closeCvMenu() {
  cvMenu.value?.removeAttribute('open')
}
</script>

<template>
  <header class="sticky top-0 z-[1000]">
    <div class="relative z-[1000] flex w-full items-center justify-between border-b border-white/8 bg-[#191919]/96 px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur">
      <nav>
        <ul class="flex items-center gap-1.5 text-sm font-semibold">
          <li>
            <RouterLink to="/" v-slot="{ isActive }">
              <span :class="[
                'relative inline-flex cursor-pointer items-center rounded-full px-3 py-2 transition duration-200 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:transition after:duration-200',
                isActive
                  ? 'bg-white/8 text-[#FBEFD6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(176,70,74,0.12)] after:bg-[#D96138]'
                  : 'text-[#FBEFD6]/64 after:bg-transparent hover:bg-white/6 hover:text-[#FBEFD6] hover:after:bg-[#FBEFD6]/24'
              ]">
                {{ t('menu.home') }}
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/experience" v-slot="{ isActive }">
              <span :class="[
                'relative inline-flex cursor-pointer items-center rounded-full px-3 py-2 transition duration-200 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:transition after:duration-200',
                isActive
                  ? 'bg-white/8 text-[#FBEFD6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(176,70,74,0.12)] after:bg-[#D96138]'
                  : 'text-[#FBEFD6]/64 after:bg-transparent hover:bg-white/6 hover:text-[#FBEFD6] hover:after:bg-[#FBEFD6]/24'
              ]">
                {{ t('menu.experience') }}
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/projects" v-slot="{ isActive }">
              <span :class="[
                'relative inline-flex cursor-pointer items-center rounded-full px-3 py-2 transition duration-200 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:transition after:duration-200',
                isActive
                  ? 'bg-white/8 text-[#FBEFD6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(176,70,74,0.12)] after:bg-[#D96138]'
                  : 'text-[#FBEFD6]/64 after:bg-transparent hover:bg-white/6 hover:text-[#FBEFD6] hover:after:bg-[#FBEFD6]/24'
              ]">
                {{ t('menu.projects') }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <details ref="localeMenu" class="group relative z-[1100]">
          <summary
            class="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/12 bg-white/8 text-lg shadow-[0_8px_18px_rgba(0,0,0,0.16)] transition hover:border-[#FBEFD6]/45 hover:bg-white/12"
            :aria-label="t('controls.languageLabel')">
            <span aria-hidden="true">{{ selectedLocale.flag }}</span>
          </summary>

          <div
            class="absolute right-0 top-full z-[1100] mt-2 min-w-30 rounded-xl border border-white/12 bg-[#1f1b19]/98 p-1.5 shadow-[0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur">
            <button v-for="option in localeOptions" :key="option.value" type="button"
              class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition"
              :class="locale === option.value ? 'bg-[#FBEFD6] text-[#191919]' : 'text-[#FBEFD6]/76 hover:bg-white/8 hover:text-[#FBEFD6]'"
              @click="setLocale(option.value)">
              <span aria-hidden="true">{{ option.flag }}</span>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </details>

        <details ref="cvMenu" class="group relative z-[1100]">
          <summary
            class="cursor-pointer list-none rounded-full bg-[#B0464A] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(176,70,74,0.18)] transition duration-200 hover:bg-[#c05255]">
            {{ t('controls.downloadCv') }}
          </summary>

          <div
            class="absolute right-0 top-full z-[1100] mt-2 min-w-36 rounded-xl border border-white/12 bg-[#1f1b19]/98 p-1.5 shadow-[0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur">
            <a v-for="option in cvOptions" :key="option.value" :href="option.url" :download="option.filename"
              class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#FBEFD6]/76 transition hover:bg-white/8 hover:text-[#FBEFD6]"
              @click="closeCvMenu">
              <span aria-hidden="true">{{ option.flag }}</span>
              <span>{{ option.label }}</span>
            </a>
          </div>
        </details>
      </div>

    </div>
  </header>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
</style>
