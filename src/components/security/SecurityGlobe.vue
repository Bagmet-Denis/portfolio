<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { SecurityGlobeEngine, type GlobeProjection } from './securityGlobe'
import { LAND_DOTS } from './landDots'

export interface SecurityGlobeMarker {
  key: string
  name: string
  lon: number
  lat: number
  color: string
  ldx: number
  ldy: number
  /** Закрытый NDA-маркер: тусклый, подпись видна только при наведении. */
  dim?: boolean
}

const props = defineProps<{
  markers: SecurityGlobeMarker[]
  activeIndex: number
}>()

const emit = defineEmits<{
  (event: 'hover', index: number): void
  (event: 'select', index: number): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const boxRef = ref<HTMLElement | null>(null)
const labelRefs = ref<HTMLElement[]>([])

let engine: SecurityGlobeEngine | null = null
let observer: ResizeObserver | null = null

function setLabelRef(element: Element | null, index: number) {
  if (element instanceof HTMLElement) labelRefs.value[index] = element
}

function placeLabels(points: GlobeProjection[]) {
  const box = boxRef.value
  if (!box) return
  const boxWidth = box.clientWidth
  points.forEach((point, index) => {
    const label = labelRefs.value[index]
    const marker = props.markers[index]
    if (!label || !marker) return
    if (point.z <= 0.05 || (marker.dim && index !== props.activeIndex)) {
      label.style.opacity = '0'
      return
    }
    const half = label.offsetWidth / 2 + 6
    const x = Math.min(boxWidth - half, Math.max(half, point.x + marker.ldx))
    label.style.opacity = String(Math.min(1, (point.z - 0.05) / 0.2))
    label.style.transform = `translate(-50%, -50%) translate(${x}px, ${point.y + marker.ldy}px)`
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  engine = new SecurityGlobeEngine(canvas, {
    dots: LAND_DOTS,
    targets: props.markers,
    palette: {
      glowInner: 'rgba(86,200,255,.16)',
      sphereHi: 'rgba(20,44,64,.85)',
      sphereLo: 'rgba(4,9,17,.95)',
      grid: 'rgba(120,190,255,.10)',
      land: (alpha: number) => `rgba(120,230,200,${alpha * 0.55})`,
      limbShade: 'rgba(2,5,10,.65)',
      rim: 'rgba(120,200,255,.28)',
      arc: 'rgba(255,150,70,.35)',
      packet: '#ffd08a',
      sweep: 'rgba(110,242,192,.22)',
    },
    onHover: (index) => emit('hover', index),
    onSelect: (index) => emit('select', index),
    onFrame: placeLabels,
  })

  if (typeof ResizeObserver !== 'undefined' && boxRef.value) {
    observer = new ResizeObserver(() => engine?.resize())
    observer.observe(boxRef.value)
  } else {
    window.addEventListener('resize', handleWindowResize)
  }
})

function handleWindowResize() {
  engine?.resize()
}

watch(
  () => props.activeIndex,
  (index) => {
    if (!engine) return
    engine.focus(index >= 0 ? index : null)
    engine.paused = index >= 0
  },
)

watch(
  () => props.markers,
  (markers) => engine?.setTargets(markers),
)

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', handleWindowResize)
  engine?.destroy()
  engine = null
})
</script>

<template>
  <div ref="boxRef" class="sec-globe">
    <canvas ref="canvasRef" class="sec-globe-canvas"></canvas>
    <span
      v-for="(marker, index) in markers"
      :key="marker.key"
      :ref="(element) => setLabelRef(element as Element | null, index)"
      class="sec-globe-label"
      :class="{ 'is-active': index === activeIndex, 'is-dim': marker.dim }"
      :style="{ '--c': marker.color }"
    >
      {{ marker.name }}
    </span>
    <slot />
  </div>
</template>

<style scoped>
.sec-globe {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.sec-globe-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.sec-globe-label {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  white-space: nowrap;
  padding: 0.16rem 0.38rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
  background: color-mix(in srgb, var(--c) 12%, rgba(4, 8, 14, 0.82));
  color: color-mix(in srgb, var(--c) 70%, #ffffff 30%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

.sec-globe-label.is-dim {
  letter-spacing: 0.22em;
}

.sec-globe-label.is-active {
  border-color: color-mix(in srgb, var(--c) 80%, transparent);
  box-shadow: 0 0 14px color-mix(in srgb, var(--c) 35%, transparent);
  color: #fff;
}
</style>
