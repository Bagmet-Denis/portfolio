<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { tm } = useI18n()
const paperOverlay = publicAssetUrl('paper_overlay.png')

const personal = tm('experience.personal') as Array<{ key: string; label: string; value: string | string[] }>
const itemAccentStyles = [
    {
        badge: 'bg-[#6F5643] text-[#ECE6C2]',
        line: 'bg-[#6F5643]',
        chip: 'border-[#ECE6C2]/24 bg-white/8 text-[#ECE6C2]'
    },
    {
        badge: 'bg-[#CC6B49] text-[#ECE6C2]',
        line: 'bg-[#CC6B49]',
        chip: 'border-[#ECE6C2]/24 bg-white/8 text-[#ECE6C2]'
    },
    {
        badge: 'bg-[#D2A24C] text-[#6F5643]',
        line: 'bg-[#D2A24C]',
        chip: 'border-[#D2A24C]/35 bg-[#D2A24C]/16 text-[#ECE6C2]'
    },
    {
        badge: 'bg-[#73BDA8] text-[#6F5643]',
        line: 'bg-[#73BDA8]',
        chip: 'border-[#73BDA8]/35 bg-[#73BDA8]/14 text-[#ECE6C2]'
    }
] as const
const languageFlags: Record<string, string> = {
    'Украинский': publicAssetUrl('flags/ua.png'),
    'Русский': publicAssetUrl('flags/ru.png'),
    'Ukrainian': publicAssetUrl('flags/ua.png'),
    'Russian': publicAssetUrl('flags/ru.png'),
    'English': publicAssetUrl('flags/en.png'),
    'Английский': publicAssetUrl('flags/en.png')
}
</script>

<template>
    <div
        class="relative w-full max-w-[148px] shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-[#4F7D72] shadow-[0_12px_28px_rgba(47,72,66,0.22)] sm:max-w-[196px] sm:rounded-[20px] md:max-w-[228px] lg:max-w-sm lg:rounded-[24px]">
        <div
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(115,189,168,0.12),rgba(63,99,90,0.96)_34%,rgba(31,49,45,1)_100%)]">
        </div>
        <div
            class="pointer-events-none absolute rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] sm:rounded-[12px]">
        </div>
        <div class="pointer-events-none absolute mix-blend-multiply ">
            <img :src="paperOverlay" alt="" class="h-full w-full object-cover">
        </div>
        <div class="relative z-10 flex flex-col gap-1 sm:gap-1.5 p-2">
            <div v-for="(item, index) in personal" :key="item.label"
                class="grid grid-cols-[minmax(0,1fr)] gap-0.5 border-b border-white/8 pb-1 last:border-b-0 last:pb-0">
                <div>
                    <div class="flex items-center gap-1">
                        <span class="h-[2px] w-2.5 shrink-0 sm:w-3.5"
                            :class="itemAccentStyles[index % itemAccentStyles.length].line"></span>
                        <div class="w-fit px-1.5 skew-x-[-10deg]"
                            :class="itemAccentStyles[index % itemAccentStyles.length].badge">
                            <div
                                class="text-[6px] font-medium uppercase tracking-[0.14em] skew-x-[10deg] sm:text-[8px] sm:tracking-[0.18em] md:text-[9px]">
                                {{ item.label }}
                            </div>
                        </div>
                    </div>

                    <div v-if="item.key === 'languages'" class="mt-2 flex flex-wrap gap-1 sm:gap-1.5">
                        <div v-for="lang in (Array.isArray(item.value) ? item.value : [])" :key="lang"
                            class="flex items-center gap-1 rounded-full border px-1.5 py-0.5 sm:px-2 sm:py-0.5"
                            :class="itemAccentStyles[index % itemAccentStyles.length].chip">
                            <img v-if="languageFlags[lang]" :src="languageFlags[lang]"
                                class="h-3 w-3 rounded-full object-cover sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                            <span class="text-[9px] font-medium sm:text-[10px] md:text-[11px]">{{ lang }}</span>
                        </div>
                    </div>

                    <div v-else
                        class="mt-1 pl-3 text-[9px] leading-snug font-medium text-[#ECE6C2] sm:text-[10px] md:text-[11px]">
                        {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
