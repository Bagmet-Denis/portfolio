<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type SkillCategory = {
  key: string
  label: string
  items: string[]
}

type ExpandedLabels = {
  show: string
  hide: string
}

const { tm } = useI18n()

const skillCategories = tm('experience.skillsCard.categories') as SkillCategory[]
const expandedLabels = tm('experience.skillsCard.expanded') as ExpandedLabels
const expanded = ref<Record<string, boolean>>({})
const skillAccentStyles = [
  {
    badge: 'bg-[#6F5643] text-[#ECE6C2]',
    line: 'bg-[#6F5643]',
    chip: 'border-[#6F5643]/14 bg-white text-black/72 hover:bg-[#F3EEE3]',
  },
  {
    badge: 'bg-[#CC6B49] text-[#ECE6C2]',
    line: 'bg-[#CC6B49]',
    chip: 'border-[#CC6B49]/16 bg-white text-black/72 hover:bg-[#F6ECE6]',
  },
  {
    badge: 'bg-[#D2A24C] text-[#6F5643]',
    line: 'bg-[#D2A24C]',
    chip: 'border-[#D2A24C]/18 bg-white text-black/72 hover:bg-[#F5F0E2]',
  },
  {
    badge: 'bg-[#73BDA8] text-[#284A42]',
    line: 'bg-[#73BDA8]',
    chip: 'border-[#73BDA8]/18 bg-white text-black/72 hover:bg-[#EAF5F1]',
  },
] as const

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
  <div
    class="relative flex h-auto w-full max-w-full flex-col overflow-hidden rounded-[20px] border border-black/15 bg-[#FFFDF8] shadow-[0_10px_22px_rgba(0,0,0,0.1)] sm:w-[22rem] sm:rounded-[24px] sm:shadow-[0_14px_30px_rgba(0,0,0,0.14)]">
    <div class="relative z-10 flex h-full min-h-0 flex-col p-2.5 sm:p-3.5">
      <div class="mb-2.5 flex items-center gap-2 sm:mb-3 sm:gap-2.5">
        <div
          class="rounded-full border border-black/10 bg-[#D96138] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white shadow-[0_4px_10px_rgba(217,97,56,0.22)] sm:px-2.5 sm:text-[10px] sm:tracking-[0.2em]">
          Stack
        </div>
        <h3 class="text-[15px] font-semibold text-black/80 sm:text-base">
          {{ $t('experience.skillsCard.title') }}
        </h3>
      </div>

      <div class="grid min-h-0 gap-2 overflow-y-auto pr-1 sm:gap-2.5">
        <div v-for="(category, index) in skillCategories" :key="category.key"
          class="group rounded-[14px] border border-black/8 bg-white/90 p-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,0.05)] sm:rounded-[16px] sm:p-2.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span
                class="h-[2px] w-3 shrink-0 sm:w-4"
                :class="skillAccentStyles[index % skillAccentStyles.length].line"
              ></span>
              <span
                class="inline-flex -rotate-[2deg] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] sm:text-[9px] sm:tracking-[0.16em]"
                :class="skillAccentStyles[index % skillAccentStyles.length].badge"
              >
                {{ category.label }}
              </span>
            </div>

            <button type="button"
              class="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#FAF7F1] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-black/60 sm:px-2.5 sm:text-[10px] sm:tracking-[0.12em]"
              @click="toggleExpanded(category.key)">
              {{ isExpanded(category.key) ? expandedLabels.hide : expandedLabels.show }}
            </button>
          </div>

          <Transition name="expand-body" @enter="animateEnter" @after-enter="animateAfterEnter" @leave="animateLeave">
            <div v-if="isExpanded(category.key)" class="mt-2.5 flex w-full flex-wrap gap-1.5 overflow-hidden">
              <span v-for="item in category.items" :key="`${category.key}-${item}`"
                class="rounded-full border px-2.5 py-1 text-[11px] transition duration-200 hover:-translate-y-0.5 sm:px-3 sm:text-xs"
                :class="skillAccentStyles[index % skillAccentStyles.length].chip">
                {{ item }}
              </span>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply">
      <img src="/paper_overlay.png" alt="" class="h-full w-full object-cover" />
    </div>

    <div class="pointer-events-none absolute inset-0 opacity-60">
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
