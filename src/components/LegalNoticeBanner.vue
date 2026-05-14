<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <div class="relative max-w-sm overflow-hidden rounded-2xl md:max-w-md md:rounded-3xl">
    <div class="bg-white p-1.5 shadow-2xl md:p-2">
      <div class="flex flex-col rounded-xl border-4 border-black p-1 md:rounded-2xl md:p-1.5 md:[border-width:6px]">
        <div class="rounded-t-lg rounded-b-xs bg-[#FF8A00] p-1.5 text-[8px] font-semibold uppercase md:p-2 md:text-xs">
          <div class="flex flex-row items-center gap-1">
            <img src="/warning_shield.svg" alt="" class="w-3 md:w-4" />
            {{ t('restrictedProjectsNotice.title') }}
          </div>
        </div>

        <div v-for="(item, index) in tm('restrictedProjectsNotice.description')" :key="index"
          class="flex items-start gap-2 px-2 py-1">
          <span class="mt-2 h-2 w-2 rounded-full bg-black"></span>
          <span class="flex-1 text-[8px] md:text-xs">{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="absolute inset-0">
      <img src="/legal_notice_banner_overlay.png" alt="" class="h-full w-full scale-110 object-cover mix-blend-multiply" />
    </div>
  </div>
</template>
