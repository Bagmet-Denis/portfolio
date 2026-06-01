<script setup lang="ts">
import { desktopProjects, mobileProjects } from '@/data/projects'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const plasticPacketOverlay = publicAssetUrl('plastic_packet_overlay.png')
</script>

<template>
    <div
        class="relative overflow-hidden shrink-0 w-[140px] aspect-400/513 sm:w-[220px] md:w-[240px] lg:w-[300px] xl:w-[330px]">
        <div class="absolute inset-0 z-10">
            <div
                class="absolute left-1.5 sm:left-5 top-12 sm:top-16 lg:left-7 lg:top-17 w-[72px] sm:w-[132px] lg:w-[154px] xl:w-[166px] -rotate-6 rounded-lg bg-[#FFF1D4] p-0.5 sm:p-1 shadow-lg">
                <div class="rounded-md bg-[#D96138] px-1 py-1 sm:px-3 sm:py-3 lg:px-3.5 lg:py-3.5 text-white">
                    <div
                        class="text-[7px] leading-tight sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/70">
                        Core Focus
                    </div>
                    <div class="mt-0.5 text-[6px] leading-1.5 md:text-[14px] md:leading-3 lg:text-[15px] lg:leading-4 font-black">
                        Mobile apps
                    </div>
                    <div class="mt-0.5 leading-1 text-[4px] md:text-[10px] md:leading-3 lg:text-[11px] lg:leading-3 text-white/80">
                        iOS, Flutter, product delivery
                    </div>
                </div>
            </div>

            <div
                class="absolute right-1.5 top-20 sm:top-30 sm:right-5 lg:right-5 lg:top-34 w-[72px] sm:w-[132px] lg:w-[154px] xl:w-[166px] rotate-[7deg] rounded-lg bg-[#FFF1D4] p-0.5 sm:p-1 shadow-lg">
                <div class="rounded-md bg-[#006C7C] p-1 sm:px-3 sm:p-2 lg:px-3.5 lg:py-3 text-white">
                    <div
                        class="text-[7px] leading-tight sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/70">
                        Shipped
                    </div>
                    <div class="mt-0.5 text-[6px] leading-1.5 md:text-[14px] md:leading-3 lg:text-[15px] lg:leading-4 font-black">
                        {{ mobileProjects.length }}+
                    </div>
                    <div class="mt-0.5 leading-1 text-[4px] md:text-[10px] md:leading-3 lg:text-[11px] lg:leading-3 text-white/80">
                        {{ t('projects_completed') }}
                    </div>
                </div>
            </div>

            <div
                class="absolute left-1.5 top-28 sm:top-38 sm:left-6 lg:left-8 lg:top-44 w-[72px] sm:w-[132px] lg:w-[154px] xl:w-[166px] rotate-[4deg] rounded-lg bg-[#FFF1D4] p-0.5 sm:p-1 shadow-lg">
                <div class="rounded-md bg-[#5F8171] p-1 sm:px-3 sm:py-2 lg:px-3.5 lg:py-3 text-white">
                    <div
                        class="text-[7px] leading-tight sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/70">
                        Experience
                    </div>
                    <div class="mt-0.5 text-[6px] leading-1.5 md:text-[14px] md:leading-3 lg:text-[15px] lg:leading-4 font-black">
                        5+
                    </div>
                    <div class="mt-0.5 leading-1 text-[4px] md:text-[10px] md:leading-3 lg:text-[11px] lg:leading-3 text-white/80">
                        years in IT
                    </div>
                </div>
            </div>

            <div
                class="absolute right-1.5 bottom-2 sm:right-6 sm:bottom-10 lg:right-9 lg:bottom-16 w-[72px] sm:w-[132px] lg:w-[154px] xl:w-[166px] -rotate-[10deg] rounded-lg bg-[#FFF1D4] p-0.5 sm:p-1 shadow-lg">
                <div class="rounded-md bg-black px-1 py-1 sm:px-3 sm:py-3 lg:px-3.5 lg:py-3.5 text-[#FBEFD6]">
                    <div
                        class="text-[7px] leading-tight sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-white/45">
                        Extra
                    </div>
                    <div class="mt-0.5 text-[6px] leading-1.5 md:text-[14px] md:leading-3 lg:text-[15px] lg:leading-4 font-black">
                        {{ desktopProjects.length }}+ {{ t('desktop_completed') }}
                    </div>
                    <div class="mt-0.5 leading-1 text-[4px] md:text-[10px] md:leading-3 lg:text-[11px] lg:leading-3 text-white/80">
                        plus desktop and internal tools
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute inset-0 z-0 pointer-events-none">
            <img :src="plasticPacketOverlay" alt="" class="w-full h-full object-cover opacity-80 sm:opacity-100">
        </div>

    </div>
</template>
