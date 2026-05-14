<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type ContactItem = {
  key: string
  label: string
  value: string
  href: string
}

const { tm } = useI18n()

const contacts = tm('home.contactCard.items') as ContactItem[]

const contactAccents = [
  {
    badge: 'bg-[#6F5643] text-[#ECE6C2]',
    line: 'bg-[#D96138]',
    value: 'text-black/75',
    ring: 'hover:bg-[#F5EFE6]',
  },
  {
    badge: 'bg-[#CC6B49] text-[#ECE6C2]',
    line: 'bg-[#5F8171]',
    value: 'text-black/75',
    ring: 'hover:bg-[#F2F6F3]',
  },
  {
    badge: 'bg-[#73BDA8] text-[#284A42]',
    line: 'bg-[#006C7C]',
    value: 'text-black/75',
    ring: 'hover:bg-[#EEF5F6]',
  },
] as const
</script>

<template>
  <div
    class="relative ml-auto w-full max-w-[620px] overflow-hidden rounded-[20px] border border-black/15 bg-[#FFFDF8] shadow-[0_10px_22px_rgba(0,0,0,0.1)] sm:rounded-[24px] sm:shadow-[0_14px_30px_rgba(0,0,0,0.14)]"
  >
    <div class="relative z-10 flex flex-col gap-3 p-3 sm:gap-3.5 sm:p-4">
      <div class="mb-0.5 flex items-center justify-between gap-2 sm:gap-2.5">
        <h3 class="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-black/72 shadow-[0_4px_10px_rgba(0,0,0,0.04)] sm:text-[14px]">
          Socials
        </h3>
        <div class="rounded-full border border-black/10 bg-[#5F8171] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white shadow-[0_4px_10px_rgba(95,129,113,0.18)] sm:px-2.5 sm:text-[10px] sm:tracking-[0.2em]">
          Reach
        </div>
      </div>

      <div class="grid gap-2.5 sm:gap-3">
        <a
          v-for="(item, index) in contacts"
          :key="item.key"
          :href="item.href"
          :class="contactAccents[index % contactAccents.length].ring"
          class="group rounded-[14px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,250,247,0.98))] p-2.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,0.06)] sm:rounded-[16px] sm:p-3"
        >
          <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <span
                  class="h-[2px] w-3 shrink-0 sm:w-4"
                  :class="contactAccents[index % contactAccents.length].line"
                ></span>
                <span
                  class="inline-flex -rotate-[2deg] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] sm:text-[9px] sm:tracking-[0.16em]"
                  :class="contactAccents[index % contactAccents.length].badge"
                >
                  {{ item.label }}
                </span>
              </div>

              <div
                class="mt-1.5 pl-4 text-[11px] font-medium leading-4.5 break-all sm:text-[13px] sm:leading-5"
                :class="contactAccents[index % contactAccents.length].value"
              >
                {{ item.value }}
              </div>
            </div>

            <div class="shrink-0 rounded-full border border-black/10 bg-white px-2 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-black/62 transition duration-200 group-hover:translate-x-0.5 group-hover:bg-[#F3EEE3] sm:px-2.5 sm:text-[10px]">
              ↗
            </div>
          </div>
        </a>
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
