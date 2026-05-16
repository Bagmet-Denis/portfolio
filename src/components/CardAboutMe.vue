<script setup lang="ts">
import { publicAssetUrl, resolveAssetUrl } from '@/utils/resolveAssetUrl';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const denimPattern = resolveAssetUrl('src/assets/paper_2_pattern.svg')
const plasticOverlay = publicAssetUrl('plastic_overlay.png')
</script>

<template>
    <div
        class="relative w-full  max-w-full overflow-hidden rounded-xl border border-black/10 shadow-md sm:h-auto sm:max-w-md sm:rounded-2xl lg:max-w-lg">
        <div class="bg-[#F1E9E1] p-2 sm:p-3 lg:p-4">
            <div class="rounded-lg border border-black/40 p-2 sm:rounded-xl sm:p-3 lg:p-4">
                <div class="flex flex-col gap-1">
                    <h1 class="max-w-3xl text-xl font-bold tracking-tight sm:text-3xl lg:text-5xl">
                        {{ t('hero.name') }}
                    </h1>

                    <div class="w-fit bg-[#5F8171] px-2 skew-x-[-10deg]">
                        <p class="text-xs leading-relaxed text-white/90 skew-x-10 sm:text-sm lg:text-base">
                            {{ t('hero.role') }}
                        </p>
                    </div>


                    <div class="w-fit bg-[#D96138] px-2 skew-x-[-10deg]">
                        <p class="text-xs leading-relaxed text-white/90 skew-x-10 sm:text-sm lg:text-base">
                            {{ t('hero.secondaryRole') }}
                        </p>
                    </div>


                    <p class="mt-2 text-xs leading-4 text-(--color-muted-text) sm:mt-3 sm:text-sm lg:text-base">
                        {{ t('hero.about') }}
                    </p>
                </div>
            </div>
        </div>

        <div class="absolute inset-0">
            <img :src="denimPattern" class="w-full h-full object-cover mix-blend-multiply opacity-70 sm:opacity-80" />
        </div>

        <div class="absolute inset-0">
            <img :src="plasticOverlay" class="w-full h-full object-cover opacity-80 sm:opacity-100" />
        </div>

    </div>
</template>
