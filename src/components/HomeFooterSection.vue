<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type ContactItem = {
  key: string
  label: string
  value: string
  href: string
}

type FactCountry = {
  name: string
  flag?: string
}

type FactItem = {
  key: string
  label: string
  value: string
  note?: string
  link?: {
    label: string
    href: string
  }
  countries?: FactCountry[]
}

type ExpandedLabels = {
  title: string
}

const { t, tm } = useI18n()

const contacts = tm('home.contactCard.items') as ContactItem[]
const facts = tm('experience.factsCard.items') as FactItem[]
const expandedLabels = tm('experience.factsCard.expanded') as ExpandedLabels
const travelFact = computed(() => facts.find((fact) => fact.key === 'travel') ?? facts[0])
const countriesCount = computed(() => travelFact.value?.countries?.length ?? 0)

const contactIcons: Record<string, string> = {
  telegram: '/socials/telegram.svg',
  instagram: '/socials/instagram.svg',
  email: '/socials/gmail.svg',
}

const countryChipStyles = [
  'bg-[#FFF7EA]/82 text-[#46382f]',
  'bg-[#ECF5F1]/82 text-[#294A40]',
  'bg-[#F8ECE6]/82 text-[#753E2F]',
] as const
</script>

<template>
  <section class="mx-auto w-full max-w-[1580px] px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 xl:px-8">
    <div class="relative overflow-hidden rounded-[28px] bg-[#FFFDF8]/72 px-4 py-5 shadow-[0_18px_48px_rgba(47,37,33,0.08)] backdrop-blur-[1px] sm:px-6 sm:py-6">
      <img
        src="/map_background.png"
        alt=""
        class="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rotate-6 object-cover opacity-[0.13] mix-blend-multiply sm:h-96 sm:w-96"
      />

      <div class="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.4fr)] lg:items-start">
        <header class="max-w-xl">
          <div class="flex flex-wrap items-center gap-2.5">
            <p class="font-rubik text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C95E3E]">Life</p>
            <span class="-rotate-2 rounded-full bg-[#5F8171] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFFDF8] shadow-[0_7px_14px_rgba(95,129,113,0.18)]">
              Travel log
            </span>
          </div>
          <h2 class="mt-3 max-w-sm text-[25px] font-semibold leading-tight text-[#2f2521] sm:text-4xl">
            {{ t('experience.factsCard.title') }}
          </h2>

          <article v-if="travelFact" class="mt-5 max-w-xl">
            <p class="text-[10px] font-black uppercase tracking-[0.18em] text-[#8B442F]">
              {{ travelFact.label }}
            </p>
            <p class="mt-2 text-base leading-7 text-[#2f2521] sm:text-[17px]">
              {{ travelFact.value }}
            </p>
            <p v-if="travelFact.note" class="mt-2 text-sm leading-6 text-[#6f5d52]">
              {{ travelFact.note }}
            </p>

            <a
              v-if="travelFact.link"
              :href="travelFact.link.href"
              class="mt-4 inline-flex items-center gap-2 rounded-full bg-white/78 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C95E3E] shadow-[0_8px_18px_rgba(47,37,33,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FFF7EA] hover:text-[#2f2521]"
            >
              <img src="/socials/instagram.svg" alt="" class="h-4 w-4" />
              {{ travelFact.link.label }}
            </a>
          </article>
        </header>

        <div v-if="travelFact?.countries?.length" class="rounded-[22px] bg-white/38 p-3 shadow-[inset_0_0_0_1px_rgba(47,33,26,0.04)] sm:p-4">
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p class="text-[10px] font-black uppercase tracking-[0.18em] text-[#6F5643]">
              {{ expandedLabels.title }}
            </p>
            <span class="rounded-full bg-[#2f2521] px-2.5 py-1 text-[10px] font-semibold text-[#FFFDF8]">
              {{ countriesCount }}
            </span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(country, index) in travelFact.countries"
              :key="country.name"
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold shadow-[0_7px_16px_rgba(47,37,33,0.06)] transition duration-200 hover:-translate-y-0.5"
              :class="countryChipStyles[index % countryChipStyles.length]"
            >
              <img
                v-if="country.flag"
                :src="country.flag"
                :alt="country.name"
                class="h-3.5 w-3.5 rounded-full object-cover"
              />
              {{ country.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <aside class="mt-4 flex justify-start sm:justify-end">
      <div class="inline-flex max-w-full items-center gap-2 rounded-full bg-[#2f2521] px-2 py-2 shadow-[0_12px_26px_rgba(47,37,33,0.14)]">
        <span class="px-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#FFFDF8]/82">
          {{ t('home.socialsTitle') }}
        </span>
        <nav class="flex items-center gap-1.5">
          <a
            v-for="item in contacts"
            :key="item.key"
            :href="item.href"
            :aria-label="item.label"
            :title="`${item.label}: ${item.value}`"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F7F0E7]"
          >
            <img :src="contactIcons[item.key]" :alt="item.label" class="h-5 w-5" />
          </a>
        </nav>
      </div>
    </aside>
  </section>
</template>
