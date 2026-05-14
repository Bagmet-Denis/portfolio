<script setup lang="ts">
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const castleImage = publicAssetUrl('castle.png')
</script>

<template>
  <div
    class="relative flex w-[340px] max-w-full min-h-[320px] items-end justify-end sm:w-[430px] sm:min-h-[410px] lg:w-[520px] lg:min-h-[520px]">
    <div v-motion
      class="absolute bottom-0 right-0 z-0 h-88 w-88 translate-x-[34%] translate-y-[18%] rounded-full bg-[#AC3F2B] sm:h-112 sm:translate-x-[35%] sm:translate-y-[20%] lg:h-130 lg:w-130 lg:translate-x-[36%] lg:translate-y-[22%]"
      :initial="{ x: 400, scale: 0 }" :enter="{ x: 0, scale: 1 }" :transition="{ type: 'spring', stiffness: 100 }"
      :delay="400" :duration="1200" />

    <div v-motion class="absolute right-0 bottom-0" :initial="{ x: 400, scale: 0 }" :enter="{ x: 0, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 100 }" :delay="600" :duration="1200">
      <img :src="castleImage" alt="" class="w-90 md:w-100 opacity-35" />
    </div>
  </div>
</template>
