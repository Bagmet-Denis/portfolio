<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
  show: string
  hide: string
  title: string
}

const { tm } = useI18n()

const facts = tm('experience.factsCard.items') as FactItem[]
const expandedLabels = tm('experience.factsCard.expanded') as ExpandedLabels
const expanded = ref<Record<string, boolean>>({})

function toggleExpanded(key: string) {
  expanded.value[key] = !expanded.value[key]
}

function isExpanded(key: string) {
  return Boolean(expanded.value[key])
}

function animateEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.overflow = 'hidden'
  void element.offsetHeight
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

function animateAfterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

function animateLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
  element.style.overflow = 'hidden'
  void element.offsetHeight
  element.style.height = '0'
  element.style.opacity = '0'
}
</script>

<template>
  <div class="relative flex h-auto w-full max-w-full flex-col overflow-hidden rounded-[20px] border border-black/15 bg-[#FFFDF8] shadow-[0_10px_22px_rgba(0,0,0,0.1)] sm:w-[22rem] sm:rounded-[24px] sm:shadow-[0_14px_30px_rgba(0,0,0,0.14)]">
    <div class="relative z-10 flex h-full min-h-0 flex-col p-2.5 sm:p-3.5">
      <div class="mb-2.5 flex items-center gap-2 sm:mb-3 sm:gap-2.5">
        <div class="rounded-full border border-black/10 bg-[#5F8171] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white sm:px-2.5 sm:text-[10px] sm:tracking-[0.2em]">
          Life
        </div>
        <h3 class="text-[15px] font-semibold text-black/80 sm:text-base">
          {{ $t('experience.factsCard.title') }}
        </h3>
      </div>

      <div class="min-h-0 space-y-2.5 overflow-y-auto pr-1 sm:space-y-3">
        <div
          v-for="fact in facts"
          :key="fact.key"
          class="rounded-[14px] border border-black/8 bg-[#FAFAF7]/95 p-2 sm:rounded-[16px] sm:p-2.5"
        >
          <div class="text-[9px] uppercase tracking-[0.12em] text-black/45 sm:text-[11px] sm:tracking-[0.16em]">
            {{ fact.label }}
          </div>

          <p class="mt-1.5 text-[11px] leading-4.5 text-black/75 sm:text-[13px] sm:leading-5">
            {{ fact.value }}
          </p>

          <p v-if="fact.note" class="mt-1.5 text-[10px] leading-4 text-black/55 sm:text-[11px] sm:leading-4.5">
            {{ fact.note }}
          </p>

          <div v-if="fact.link || fact.countries?.length" class="mt-2 flex flex-wrap gap-2">
            <a
              v-if="fact.link"
              :href="fact.link.href"
              class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-medium text-black/70 transition hover:bg-[#F3EEE3] sm:px-3 sm:text-[11px]"
            >
              {{ fact.link.label }}
            </a>

            <button
              v-if="fact.countries?.length"
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-medium text-black/70 transition hover:bg-[#F3EEE3] sm:px-3 sm:text-[11px]"
              @click="toggleExpanded(fact.key)"
            >
              {{ isExpanded(fact.key) ? expandedLabels.hide : expandedLabels.show }}
            </button>
          </div>

          <Transition
            name="expand-body"
            @enter="animateEnter"
            @after-enter="animateAfterEnter"
            @leave="animateLeave"
          >
            <div v-if="fact.countries?.length && isExpanded(fact.key)" class="mt-3 overflow-hidden">
              <div class="mb-2 text-[9px] uppercase tracking-[0.12em] text-black/40 sm:text-[11px] sm:tracking-[0.16em]">
                {{ expandedLabels.title }}
              </div>

              <div class="flex w-full flex-wrap gap-1.5">
                <div
                  v-for="country in fact.countries"
                  :key="country.name"
                  class="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] text-black/75 sm:px-3 sm:text-xs"
                >
                  <img
                    v-if="country.flag"
                    :src="country.flag"
                    :alt="country.name"
                    class="h-3.5 w-3.5 rounded-full object-cover"
                  />
                  <span>{{ country.name }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply">
      <img src="/paper_overlay.png" alt="" class="h-full w-full object-cover" />
    </div>

    <div class="pointer-events-none absolute inset-0 opacity-55">
      <img src="/plastic_packet_overlay.png" alt="" class="h-full w-full object-cover" />
    </div>
  </div>
</template>

<style scoped>
.expand-body-enter-active,
.expand-body-leave-active {
  transition: height 0.28s ease, opacity 0.22s ease;
}
</style>
