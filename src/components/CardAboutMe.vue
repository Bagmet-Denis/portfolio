<script setup lang="ts">
import { ref } from 'vue';
import { publicAssetUrl, resolveAssetUrl } from '@/utils/resolveAssetUrl';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const denimPattern = resolveAssetUrl('src/assets/paper_2_pattern.svg')
const plasticOverlay = publicAssetUrl('plastic_overlay.png')
const profilePhoto = publicAssetUrl('profile/about-me.png')
const hasProfilePhoto = ref(true)
</script>

<template>
    <div
        class="relative w-full max-w-full overflow-hidden rounded-xl border border-black/10 shadow-md sm:h-auto sm:max-w-md sm:rounded-2xl lg:max-w-[720px] xl:max-w-[820px]">
        <div class="bg-[#F1E9E1] p-2 sm:p-3 lg:p-4">
            <div class="rounded-lg border border-black/40 p-2 sm:rounded-xl sm:p-3 lg:p-4">
                <div class="grid gap-3 sm:items-center lg:gap-4"
                    :class="hasProfilePhoto ? 'sm:grid-cols-[minmax(0,1fr)_124px] lg:grid-cols-[minmax(0,1fr)_156px] xl:grid-cols-[minmax(0,1fr)_172px]' : ''">
                    <div class="flex min-w-0 flex-col gap-1 lg:gap-1.5">
                        <h1
                            class="mb-2 max-w-3xl text-xl font-bold tracking-tight sm:mb-3 sm:text-3xl lg:mb-4 lg:text-5xl">
                            {{ t('hero.name') }}
                        </h1>

                        <div class="w-fit bg-[#5F8171] px-2 skew-x-[-10deg]">
                            <p
                                class="text-xs leading-relaxed text-white/90 skew-x-10 sm:text-sm lg:text-base">
                                {{ t('hero.role') }}
                            </p>
                        </div>


                        <div class="w-fit bg-[#D96138] px-2 skew-x-[-10deg]">
                            <p
                                class="text-xs leading-relaxed text-white/90 skew-x-10 sm:text-sm lg:text-base">
                                {{ t('hero.secondaryRole') }}
                            </p>
                        </div>


                        <p
                            class="mt-2 text-xs leading-4 text-(--color-muted-text) sm:mt-3 sm:text-sm lg:text-base lg:leading-6">
                            {{ t('hero.about') }}
                        </p>
                    </div>

                    <img v-if="hasProfilePhoto" :src="profilePhoto" alt="Denis Bagmet"
                        class="hidden aspect-[4/5] w-[116px] justify-self-end rounded-lg object-cover sm:block lg:w-[148px] xl:w-[164px]"
                        loading="eager" decoding="async" @error="hasProfilePhoto = false" />
                </div>
            </div>
        </div>

        <div class="pointer-events-none absolute inset-0">
            <img :src="denimPattern" class="w-full h-full object-cover mix-blend-multiply opacity-70 sm:opacity-80" />
        </div>

        <div class="pointer-events-none absolute inset-0">
            <img :src="plasticOverlay" class="w-full h-full object-cover opacity-80 sm:opacity-100" />
        </div>
    </div>
</template>
