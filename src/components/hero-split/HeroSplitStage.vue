<script setup lang="ts">
/**
 * Split-hero: существующий контент рисуется двумя слоями.
 *
 *  1. Нижний слой — обычный, «как есть», с прозрачным фоном: сквозь него
 *     видна сетка и бумага из App.vue. Он настоящий: ловит клики, фокус
 *     и читается скринридером.
 *  2. Верхний слой — тот же контент внутри тёмной полосы, обрезанной
 *     clip-path по рваным краям. Он помечен inert/aria-hidden и не ловит
 *     события: клики проваливаются на идентичный элемент снизу.
 *
 * Карточки внутри не правятся вообще — вся обработка делается фоном слоя
 * и CSS-фильтром на обёртке контента (не на фоне: фон полосы должен
 * оставаться ровно цвета материала, чтобы совпадать с секцией ниже).
 *
 * Фон полосы — общий «тёмный материал» из darkMaterial.ts, тот же, что у
 * Featured case. Фаза сетки прибита к нижнему краю, у секции — к верхнему,
 * поэтому на стыке линии продолжают друг друга без подгонки.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { buildBand, buildTear } from './tearPath'
import { darkMaterialStyle, type MaterialLayer } from './darkMaterial'

type DarkStyle = 'shade' | 'dim' | 'night'

const props = withDefaults(
  defineProps<{
    mode?: 'band' | 'edge'

    /* --- режим band --- */
    centerTop?: number
    centerBottom?: number
    bandWidth?: number
    /** Минимальная ширина полосы в px — чтобы на телефоне не было ленточки */
    bandMinPx?: number

    /* --- режим edge --- */
    topX?: number
    bottomX?: number
    invertedSide?: 'left' | 'right'

    /* --- материал полосы --- */
    darkStyle?: DarkStyle
    darkColor?: string
    gridSize?: number
    gridColor?: string
    gridOpacity?: number
    grainUrl?: string

    /* --- верхний стык --- */
    /** Цвет, из которого полоса «вытекает» сверху (обычно цвет навбара) */
    topColor?: string
    /** Цвет тонкой линии под навбаром, если она есть */
    topLine?: string
    /** Длина перехода от topColor к материалу, px */
    topFade?: number

    /* --- движение --- */
    revealDuration?: number
    idleDrift?: number
    followCursor?: boolean
    followStrength?: number

    /* --- общее --- */
    roughness?: number
    seed?: number
    showEdgeGlow?: boolean
  }>(),
  {
    mode: 'band',
    centerTop: 60,
    centerBottom: 40,
    bandWidth: 44,
    bandMinPx: 300,
    topX: 34,
    bottomX: 58,
    invertedSide: 'left',
    darkStyle: 'shade',
    darkColor: '#17120f',
    gridSize: 20,
    gridColor: '#F1CEB0',
    gridOpacity: 0.32,
    grainUrl: '',
    topColor: '',
    topLine: '',
    topFade: 120,
    revealDuration: 900,
    idleDrift: 0,
    followCursor: false,
    followStrength: 10,
    roughness: 0.5,
    seed: 7,
    showEdgeGlow: true,
  },
)

defineSlots<{
  default(): unknown
}>()

const root = ref<HTMLElement | null>(null)
const rootWidth = ref(0)

const shift = ref(0)
const targetShift = ref(0)
const tilt = ref(0)
const targetTilt = ref(0)
const drift = ref(0)
const driftTilt = ref(0)
const reveal = ref(1)

let frame = 0
let lastTick = 0
let revealStart = 0
let observer: ResizeObserver | null = null
let reduceMotion = false

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const effectiveBandWidth = computed(() => {
  let width = props.bandWidth
  if (rootWidth.value) {
    const minPercent = (props.bandMinPx / rootWidth.value) * 100
    width = Math.min(100, Math.max(width, minPercent))
  }
  return width * reveal.value
})

const geometry = computed(() => {
  const dx = shift.value + drift.value
  const dt = tilt.value + driftTilt.value

  if (props.mode === 'band') {
    const band = buildBand({
      centerTop: props.centerTop + dx - dt,
      centerBottom: props.centerBottom + dx + dt,
      width: effectiveBandWidth.value,
      roughness: props.roughness,
      seed: props.seed,
    })
    return { clip: band.clip, paths: band.paths }
  }

  const tear = buildTear({
    topX: props.topX + dx - dt,
    bottomX: props.bottomX + dx + dt,
    roughness: props.roughness,
    seed: props.seed,
  })
  return {
    clip: props.invertedSide === 'left' ? tear.clipLeft : tear.clipRight,
    paths: tear.paths,
  }
})

function withAlpha(hex: string, alpha: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return hex
  const n = parseInt(m[1], 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/** Верхний стык: линия шапки → цвет шапки → прозрачность (проступает материал). */
const topLayers = computed<MaterialLayer[]>(() => {
  if (!props.topColor) return []
  const head = props.topLine ? `${props.topLine} 0px, ${props.topColor} 3px` : `${props.topColor} 0px`
  return [
    {
      image: `linear-gradient(to bottom, ${head}, ${withAlpha(props.topColor, 0)} ${props.topFade}px)`,
      size: 'auto',
      blend: 'normal',
    },
  ]
})

const darkLayerStyle = computed(() => {
  const clipPath = geometry.value.clip
  if (props.darkStyle === 'night') {
    // Негатив требует непрозрачного светлого фона: инвертировать прозрачность нечего.
    return {
      clipPath,
      background: 'var(--color-header-bg, #ebe2d5)',
      filter: 'invert(1) hue-rotate(180deg) brightness(0.92) saturate(1.05)',
    }
  }
  return {
    clipPath,
    ...darkMaterialStyle({
      gridSize: props.gridSize,
      gridColor: props.gridColor,
      gridOpacity: props.gridOpacity,
      grainUrl: props.grainUrl,
      anchor: 'bottom',
      above: topLayers.value,
      baseColor: props.darkColor,
    }),
  }
})

/** Фильтр только на контенте: фон полосы должен остаться ровно цвета материала. */
const contentFilter = computed(() => {
  switch (props.darkStyle) {
    case 'dim':
      return 'brightness(0.62) saturate(0.88) contrast(1.04)'
    case 'shade':
      return 'brightness(0.86) saturate(0.96)'
    default:
      return 'none'
  }
})

/* ------------------------------------------------------------------ */
/* Анимация: одна rAF-петля на пружинку, дрейф и раскрытие.             */
/* ------------------------------------------------------------------ */

function tick(now: number) {
  if (now - lastTick < 32) {
    frame = requestAnimationFrame(tick)
    return
  }
  lastTick = now

  let busy = false

  if (reveal.value < 1) {
    const t = Math.min(1, (now - revealStart) / props.revealDuration)
    reveal.value = easeOutCubic(t)
    busy = busy || t < 1
  }

  const ease = 0.14
  const nextShift = shift.value + (targetShift.value - shift.value) * ease
  const nextTilt = tilt.value + (targetTilt.value - tilt.value) * ease
  const settled =
    Math.abs(nextShift - targetShift.value) < 0.02 && Math.abs(nextTilt - targetTilt.value) < 0.02
  shift.value = settled ? targetShift.value : nextShift
  tilt.value = settled ? targetTilt.value : nextTilt
  busy = busy || !settled

  if (props.idleDrift > 0) {
    const s = now / 1000
    drift.value = Math.sin(s / 4.3) * props.idleDrift
    driftTilt.value = Math.cos(s / 6.1) * props.idleDrift * 0.45
    busy = true
  }

  frame = busy ? requestAnimationFrame(tick) : 0
}

function kick() {
  if (reduceMotion) {
    shift.value = targetShift.value
    tilt.value = targetTilt.value
    reveal.value = 1
    return
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

function onPointerMove(event: PointerEvent) {
  if (!props.followCursor || event.pointerType !== 'mouse' || !root.value) return
  const rect = root.value.getBoundingClientRect()
  const nx = (event.clientX - rect.left) / rect.width
  const ny = (event.clientY - rect.top) / rect.height
  targetShift.value = (nx - 0.5) * 2 * props.followStrength
  targetTilt.value = (ny - 0.5) * 2 * (props.followStrength * 0.35)
  kick()
}

function onPointerLeave() {
  targetShift.value = 0
  targetTilt.value = 0
  kick()
}

watch(
  () => props.followCursor,
  (on) => {
    if (!on) onPointerLeave()
  },
)

watch(
  () => props.idleDrift,
  (amount) => {
    if (amount > 0) kick()
    else {
      drift.value = 0
      driftTilt.value = 0
    }
  },
)

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (root.value) {
    rootWidth.value = root.value.offsetWidth
    observer = new ResizeObserver(([entry]) => {
      rootWidth.value = entry.contentRect.width
    })
    observer.observe(root.value)
  }

  if (props.revealDuration > 0 && !reduceMotion) {
    reveal.value = 0
    revealStart = performance.now()
  }
  kick()
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="root"
    class="hero-split relative isolate"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- Слой 1: контент как есть, фон прозрачный. Интерактивный и доступный. -->
    <div class="hero-split__layer hero-split__layer--base">
      <slot />
    </div>

    <!-- Светлая кромка бумаги. Лежит ПОД тёмным слоем, поэтому видна только
         со стороны бумаги: внутри полосы её накрывает тёмное. -->
    <svg
      v-if="showEdgeGlow"
      class="hero-split__overlay hero-split__overlay--fiber"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <template v-for="(d, index) in geometry.paths" :key="index">
        <path :d="d" class="hero-split__fiber-soft" :class="{ 'is-lit': index === geometry.paths.length - 1 }" />
        <path :d="d" class="hero-split__fiber" :class="{ 'is-lit': index === geometry.paths.length - 1 }" />
      </template>
    </svg>

    <!-- Слой 2: тот же контент внутри тёмной полосы. Чисто визуальный. -->
    <div
      class="hero-split__layer hero-split__layer--dark"
      :class="`hero-split__layer--${darkStyle}`"
      :style="darkLayerStyle"
      aria-hidden="true"
      inert
    >
      <div class="hero-split__content" :style="{ filter: contentFilter }">
        <slot />
      </div>
    </div>

    <!-- Тень от краёв бумаги внутрь полосы. Свет слева-сверху: левый край
         в глубокой тени, правый почти освещён. Обрезано тем же полигоном. -->
    <svg
      class="hero-split__overlay"
      :style="{ clipPath: geometry.clip }"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        v-for="(d, index) in geometry.paths"
        :key="index"
        :d="d"
        class="hero-split__inner-shadow"
        :class="{ 'is-lit': index === geometry.paths.length - 1 && geometry.paths.length > 1 }"
      />
    </svg>
  </section>
</template>

<style scoped>
.hero-split {
  /* Оба слоя в одной ячейке грида: раскладка совпадает пиксель в пиксель,
     иначе рваный край «разъедется» по контенту. */
  display: grid;
}

.hero-split__layer {
  grid-area: 1 / 1;
  position: relative;
  min-width: 0;
  /* isolation обязателен: без него любой z-index внутри слоя (например,
     утилита z-10 у Tailwind) всплывает в общий контекст и нижний слой
     оказывается поверх верхнего. */
  isolation: isolate;
}

.hero-split__layer--base {
  z-index: 1;
  background: transparent;
}

.hero-split__layer--dark {
  z-index: 2;
  pointer-events: none;
}

.hero-split__content {
  min-width: 0;
}

/* В негативе возвращаем в оригинал только смысловые картинки — у них есть
   alt. Декоративные текстуры без alt инвертируются вместе с карточкой. */
.hero-split__layer--night :deep(img[alt]:not([alt=''])),
.hero-split__layer--night :deep(video),
.hero-split__layer--night :deep(canvas) {
  filter: invert(1) hue-rotate(180deg);
}

.hero-split__overlay {
  /* Строго absolute, а не grid-элемент: у SVG с viewBox есть собственная
     пропорция, и в роли grid-элемента он растягивал бы строку по высоте.
     Высота тоже явная — с height:auto он стал бы квадратом. */
  position: absolute;
  inset: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-split__overlay--fiber {
  /* Ниже тёмного слоя (z 2), но выше базового (z 1): виден только снаружи полосы. */
  z-index: 2;
}

.hero-split__fiber-soft {
  fill: none;
  stroke: rgba(255, 244, 226, 0.22);
  stroke-width: 5;
  vector-effect: non-scaling-stroke;
  filter: blur(2px);
}

.hero-split__fiber-soft.is-lit {
  stroke: rgba(255, 246, 230, 0.4);
}

.hero-split__fiber {
  fill: none;
  stroke: rgba(255, 250, 242, 0.55);
  stroke-width: 1.4;
  vector-effect: non-scaling-stroke;
}

.hero-split__fiber.is-lit {
  stroke: rgba(255, 252, 246, 0.8);
}

.hero-split__inner-shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.7);
  stroke-width: 30;
  vector-effect: non-scaling-stroke;
  filter: blur(12px);
}

.hero-split__inner-shadow.is-lit {
  stroke: rgba(0, 0, 0, 0.3);
  stroke-width: 18;
}
</style>
