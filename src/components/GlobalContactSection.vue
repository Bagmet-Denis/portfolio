<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

type ContactItem = {
  key: string
  label: string
  value: string
  href: string
}

const { t, tm, locale } = useI18n()

const contacts = computed(() => {
  locale.value
  return tm('home.contactCard.items') as ContactItem[]
})

const contactIcons: Record<string, string> = {
  telegram: publicAssetUrl('socials/telegram.svg'),
  instagram: publicAssetUrl('socials/instagram.svg'),
  vk: publicAssetUrl('socials/vk.svg'),
  email: publicAssetUrl('socials/gmail.svg'),
}
</script>

<template>
  <section class="relative z-10 mx-auto flex w-full max-w-[1580px] justify-start px-4 pb-12 pt-5 sm:justify-end sm:px-6 sm:pb-16 xl:px-8">
    <div class="inline-flex max-w-full items-center gap-3 rounded-full bg-[#2f2521] px-3 py-3 shadow-[0_16px_34px_rgba(47,37,33,0.18)] sm:px-4">
      <span class="px-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#FFFDF8]/86 sm:text-xs">
        {{ t('home.socialsTitle') }}
      </span>
      <nav class="flex items-center gap-2" :aria-label="t('home.socialsTitle')">
        <a
          v-for="item in contacts"
          :key="item.key"
          :href="item.href"
          :aria-label="item.label"
          :title="`${item.label}: ${item.value}`"
          class="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDF8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F7F0E7]"
        >
          <img :src="contactIcons[item.key]" :alt="item.label" class="h-6 w-6" />
        </a>
      </nav>
    </div>
  </section>
</template>
