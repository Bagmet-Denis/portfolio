<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { tm } = useI18n()
const paperOverlay = publicAssetUrl('paper_overlay.png')
const plasticPacketOverlay = publicAssetUrl('plastic_packet_overlay.png')

const contacts = tm('experience.contact') as Array<{
    key: string
    label: string
    value: string
}>
</script>

<template>
    <div class="relative w-fit overflow-hidden rounded-[24px] border border-black/15 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
        <div class="relative z-10 p-4">
            <div v-for="item in contacts" :key="item.key" class="mb-3 last:mb-0">
                <div class="text-xs uppercase tracking-[0.2em] text-gray-500">
                    {{ item.label }}
                </div>

                <div class="mt-1 flex items-center gap-2 text-base font-medium text-black/75">
                    {{ item.value }}
                </div>
            </div>
        </div>

        <div class="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply">
            <img :src="paperOverlay" alt="" class="h-full w-full object-cover" />
        </div>

        <div class="pointer-events-none absolute inset-0 opacity-45">
            <img :src="plasticPacketOverlay" alt="" class="h-full w-full object-cover" />
        </div>
    </div>
</template>
