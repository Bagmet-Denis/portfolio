<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { locale, tm } = useI18n()
const paperOverlay = publicAssetUrl('paper_overlay.png')
type PersonalItem = { key: string; label: string; value: string | string[] }

const basePersonalItems = computed(() => tm('experience.personal') as PersonalItem[])

function localizedItem(item: PersonalItem): PersonalItem {
    if (item.key !== 'location') return item

    return {
        ...item,
        value: locale.value === 'en' ? 'Serbia, Belgrade' : 'Россия, Москва'
    }
}

function pickItems(keys: string[]) {
    const items = basePersonalItems.value

    return keys
        .map((key) => items.find((item) => item.key === key))
        .filter((item): item is PersonalItem => Boolean(item))
        .map(localizedItem)
}

const personalInfoItems = computed(() => pickItems(['name', 'location', 'birth']))
const educationInfoItems = computed(() => pickItems(['specialty', 'university', 'educationLevel']))
const languagesItem = computed(() => pickItems(['languages'])[0])

const fallbackAccentStyle = {
    badge: 'bg-[#6F5643] text-[#ECE6C2]',
    line: 'bg-[#6F5643]',
    chip: 'border-[#ECE6C2]/24 bg-white/8 text-[#ECE6C2]'
}

const itemAccentStyles: Record<string, typeof fallbackAccentStyle> = {
    name: {
        badge: 'bg-[#6F5643] text-[#ECE6C2]',
        line: 'bg-[#6F5643]',
        chip: 'border-[#ECE6C2]/24 bg-white/8 text-[#ECE6C2]'
    },
    location: {
        badge: 'bg-[#E2C96B] text-[#3E3529]',
        line: 'bg-[#E2C96B]',
        chip: 'border-[#E2C96B]/35 bg-[#E2C96B]/14 text-[#ECE6C2]'
    },
    birth: {
        badge: 'bg-[#9C6B45] text-[#FFF3D1]',
        line: 'bg-[#9C6B45]',
        chip: 'border-[#ECE6C2]/24 bg-white/8 text-[#ECE6C2]'
    },
    specialty: {
        badge: 'bg-[#D25F3F] text-[#FFF3D1]',
        line: 'bg-[#D25F3F]',
        chip: 'border-[#D25F3F]/35 bg-[#D25F3F]/16 text-[#ECE6C2]'
    },
    university: {
        badge: 'bg-[#73BDA8] text-[#24443D]',
        line: 'bg-[#73BDA8]',
        chip: 'border-[#73BDA8]/35 bg-[#73BDA8]/14 text-[#ECE6C2]'
    },
    educationLevel: {
        badge: 'bg-[#C98466] text-[#2F2521]',
        line: 'bg-[#C98466]',
        chip: 'border-[#C98466]/35 bg-[#C98466]/16 text-[#ECE6C2]'
    },
    languages: {
        badge: 'bg-[#E2C96B] text-[#3E3529]',
        line: 'bg-[#E2C96B]',
        chip: 'border-[#E2C96B]/35 bg-[#E2C96B]/14 text-[#ECE6C2]'
    }
}

function accentFor(key: string) {
    return itemAccentStyles[key] ?? fallbackAccentStyle
}
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
        class="relative w-full max-w-full overflow-hidden rounded-[16px] border border-white/10 bg-[#4F7D72] shadow-[0_12px_28px_rgba(47,72,66,0.22)] sm:rounded-[20px] lg:max-w-none lg:rounded-[24px] lg:shadow-[0_18px_42px_rgba(47,72,66,0.24)]">
        <div
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(115,189,168,0.12),rgba(63,99,90,0.96)_34%,rgba(31,49,45,1)_100%)]">
        </div>
        <div
            class="pointer-events-none absolute inset-0 rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] sm:rounded-[12px] lg:rounded-[24px]">
        </div>
        <div class="pointer-events-none absolute inset-0 mix-blend-multiply opacity-80">
            <img :src="paperOverlay" alt="" class="h-full w-full object-cover">
        </div>
        <div class="relative z-10 p-2 sm:p-2.5 lg:px-5 lg:py-2.5 xl:px-5">
            <div class="grid grid-cols-1 gap-1 sm:gap-1.5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-4">
                <div class="space-y-0.5 lg:space-y-1">
                    <div v-for="item in personalInfoItems" :key="item.key"
                        class="border-b border-white/8 pb-0.5 last:border-b-0 lg:pb-1.5">
                        <div class="flex items-center gap-1 lg:gap-2">
                            <span class="h-[2px] w-2.5 shrink-0 sm:w-3.5 lg:h-[3px] lg:w-5.5"
                                :class="accentFor(item.key).line"></span>
                            <div class="w-fit px-1.5 skew-x-[-10deg] lg:px-2.5 lg:py-0.5"
                                :class="accentFor(item.key).badge">
                                <div
                                    class="text-[6px] font-medium uppercase tracking-[0.14em] skew-x-[10deg] sm:text-[8px] sm:tracking-[0.18em] md:text-[9px] lg:text-[11px]">
                                    {{ item.label }}
                                </div>
                            </div>
                        </div>

                        <div
                            class="mt-1 pl-3 text-[9px] leading-snug font-medium text-[#ECE6C2] sm:text-[10px] md:text-[11px] lg:mt-1.5 lg:pl-7 lg:text-[17px] lg:leading-snug xl:text-lg">
                            {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}
                        </div>
                    </div>
                </div>

                <div class="space-y-0.5 lg:space-y-1">
                    <div v-for="item in educationInfoItems" :key="item.key"
                        class="border-b border-white/8 pb-0.5 last:border-b-0 lg:pb-1.5">
                        <div class="flex items-center gap-1 lg:gap-2">
                            <span class="h-[2px] w-2.5 shrink-0 sm:w-3.5 lg:h-[3px] lg:w-5.5"
                                :class="accentFor(item.key).line"></span>
                            <div class="w-fit px-1.5 skew-x-[-10deg] lg:px-2.5 lg:py-0.5"
                                :class="accentFor(item.key).badge">
                                <div
                                    class="text-[6px] font-medium uppercase tracking-[0.14em] skew-x-[10deg] sm:text-[8px] sm:tracking-[0.18em] md:text-[9px] lg:text-[11px]">
                                    {{ item.label }}
                                </div>
                            </div>
                        </div>

                        <div
                            class="mt-1 pl-3 text-[9px] leading-snug font-medium text-[#ECE6C2] sm:text-[10px] md:text-[11px] lg:mt-1.5 lg:pl-7 lg:text-[17px] lg:leading-snug xl:text-lg">
                            {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="languagesItem" class="mt-2 border-t border-white/10 pt-1.5 lg:mt-2.5 lg:pt-2">
                <div class="flex items-center gap-1 lg:gap-2">
                    <span class="h-[2px] w-2.5 shrink-0 sm:w-3.5 lg:h-[3px] lg:w-5.5"
                        :class="accentFor(languagesItem.key).line"></span>
                    <div class="w-fit px-1.5 skew-x-[-10deg] lg:px-2.5 lg:py-0.5"
                        :class="accentFor(languagesItem.key).badge">
                        <div
                            class="text-[6px] font-medium uppercase tracking-[0.14em] skew-x-[10deg] sm:text-[8px] sm:tracking-[0.18em] md:text-[9px] lg:text-[11px]">
                            {{ languagesItem.label }}
                        </div>
                    </div>
                </div>

                <div class="mt-1.5 flex flex-wrap gap-1 sm:gap-1.5 lg:mt-2 lg:gap-2">
                    <div v-for="lang in (Array.isArray(languagesItem.value) ? languagesItem.value : [])" :key="lang"
                        class="flex items-center gap-1 rounded-full border px-1.5 py-0.5 sm:px-2 sm:py-0.5 lg:gap-1.5 lg:px-3 lg:py-1"
                        :class="accentFor(languagesItem.key).chip">
                        <img v-if="languageFlags[lang]" :src="languageFlags[lang]"
                            class="h-3 w-3 rounded-full object-cover sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                        <span class="text-[9px] font-medium sm:text-[10px] md:text-[11px] lg:text-[15px]">{{ lang
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
