<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { t, tm } = useI18n()
const holographicOverlay = publicAssetUrl('holographic.svg')
</script>

<template>
  <div class="relative w-full max-w-[420px] overflow-hidden rounded-xl border border-black/10 shadow-md sm:rounded-2xl">
    <div class="bg-[#F1E9E1] p-2 sm:p-3">
      <div class="rounded-lg border border-black/40 p-3 sm:rounded-xl sm:p-3.5">
        <div class="relative z-10 flex flex-col gap-2">
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="inline-flex items-center bg-[#5F8171] px-2 skew-x-[-10deg] text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[10px]">
              <span class="skew-x-[10deg]">{{ t('antiAiNotice.badge') }}</span>
            </span>
            <span
              class="inline-flex items-center bg-[#D96138] px-2 skew-x-[-10deg] text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[10px]">
              <span class="skew-x-[10deg]">95%</span>
            </span>
          </div>

          <h2 class="max-w-[28rem] text-sm font-bold leading-snug text-[#2f2521] sm:text-base">
            {{ t('antiAiNotice.title') }}
          </h2>

          <p class="max-w-[28rem] text-xs leading-5 text-(--color-muted-text) sm:text-sm">
            {{ t('antiAiNotice.lead') }}
          </p>

          <p class="w-fit max-w-[24rem] bg-[#FFF1D4] px-2 py-1 text-[11px] leading-4 text-[#2f2521]">
            {{ tm('antiAiNotice.description')[0] }}
          </p>
        </div>
      </div>
    </div>

    <div class="absolute inset-0">
      <img :src="holographicOverlay" alt="" class="h-full w-full object-cover" />
    </div>
  </div>
</template>
