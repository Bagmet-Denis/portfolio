/**
 * Генератор «рваных краёв» для split-hero.
 *
 * Край — это линия, идущая сверху вниз: по оси Y мы идём от 0 до 100
 * (проценты), по оси X — интерполяция между `topX` и `bottomX` плюс
 * многооктавный шум, который и даёт эффект надрыва.
 *
 * Все координаты — в процентах, поэтому clip-path остаётся отзывчивым:
 * при ресайзе и смене брейкпоинта ничего пересчитывать не нужно.
 */

export type Point = [number, number]

export interface EdgeOptions {
  /** X-позиция края у верхней границы, % */
  topX: number
  /** X-позиция края у нижней границы, % */
  bottomX: number
  /** Сила «рваности», 0 — ровная линия, 1 — очень клочковатый край */
  roughness?: number
  /** Зерно рандома: одно и то же зерно всегда даёт один и тот же край */
  seed?: number
  /** Сколько точек сэмплить по вертикали */
  samples?: number
}

/** Быстрый детерминированный PRNG (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Плавное затухание для интерполяции value-noise. */
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

/** Одна октава value-noise: массив случайных узлов + мягкая интерполяция. */
function makeOctave(rand: () => number, nodes: number): (t: number) => number {
  const values = Array.from({ length: nodes + 1 }, () => rand() * 2 - 1)
  values[nodes] = values[0]
  return (t: number) => {
    const scaled = t * nodes
    const i = Math.floor(scaled)
    const frac = scaled - i
    const a = values[Math.min(i, nodes)]
    const b = values[Math.min(i + 1, nodes)]
    return a + (b - a) * smoothstep(frac)
  }
}

/**
 * Суммируем несколько октав: крупные волны задают силуэт разрыва,
 * мелкие — ворс бумаги.
 */
function makeTearNoise(seed: number): (t: number) => number {
  const rand = mulberry32(seed)
  const octaves: Array<{ fn: (t: number) => number; amp: number }> = [
    { fn: makeOctave(rand, 5), amp: 1 },
    { fn: makeOctave(rand, 13), amp: 0.46 },
    { fn: makeOctave(rand, 31), amp: 0.2 },
    { fn: makeOctave(rand, 73), amp: 0.09 },
  ]
  const total = octaves.reduce((sum, o) => sum + o.amp, 0)
  return (t: number) => octaves.reduce((sum, o) => sum + o.fn(t) * o.amp, 0) / total
}

const round = (n: number) => Math.round(n * 100) / 100

/** Точки одного рваного края, сверху вниз. */
export function sampleEdge(options: EdgeOptions): Point[] {
  const { topX, bottomX, roughness = 0.5, seed = 7, samples = 150 } = options
  const noise = makeTearNoise(seed)
  // Амплитуда в процентах ширины. 6% при roughness=1 — заметно, но не «пила».
  const amplitude = 6 * roughness

  const points: Point[] = []
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples
    const base = topX + (bottomX - topX) * t
    // Гасим шум у самых краёв, чтобы разрыв не «отрывался» от углов рывком.
    const falloff = smoothstep(Math.min(1, Math.min(t, 1 - t) * 8))
    points.push([round(base + noise(t) * amplitude * falloff), round(t * 100)])
  }
  return points
}

const toPolygonPoints = (points: Point[]) => points.map(([x, y]) => `${x}% ${y}%`).join(', ')
const toSvgPath = (points: Point[]) => `M ${points.map(([x, y]) => `${x} ${y}`).join(' L ')}`

export interface EdgeGeometry {
  /** clip-path для области ПРАВЕЕ края */
  clipRight: string
  /** clip-path для области ЛЕВЕЕ края */
  clipLeft: string
  /** SVG-полилинии по краям — для подсветки */
  paths: string[]
}

/** Режим «один разрыв»: страница делится краем на две половины. */
export function buildTear(options: EdgeOptions): EdgeGeometry {
  const points = sampleEdge(options)
  return {
    clipRight: `polygon(${toPolygonPoints(points)}, 100% 100%, 100% 0%)`,
    clipLeft: `polygon(${toPolygonPoints([...points].reverse())}, 0% 0%, 0% 100%)`,
    paths: [toSvgPath(points)],
  }
}

export interface BandOptions {
  /** Центр полосы у верхней границы, % */
  centerTop: number
  /** Центр полосы у нижней границы, % */
  centerBottom: number
  /** Ширина полосы, % */
  width: number
  roughness?: number
  seed?: number
  samples?: number
}

export interface BandGeometry {
  /** clip-path самой полосы */
  clip: string
  /** SVG-полилинии обоих краёв */
  paths: string[]
}

/**
 * Режим «прожектор»: вертикальная полоса с двумя независимыми рваными
 * краями. Слева и справа от неё страница остаётся как есть.
 */
export function buildBand(options: BandOptions): BandGeometry {
  const { centerTop, centerBottom, width, roughness, seed = 7, samples } = options
  const half = width / 2

  const left = sampleEdge({
    topX: centerTop - half,
    bottomX: centerBottom - half,
    roughness,
    seed,
    samples,
  })
  // Другое зерно у второго края — иначе полоса выглядит штампованной.
  const right = sampleEdge({
    topX: centerTop + half,
    bottomX: centerBottom + half,
    roughness,
    seed: seed + 977,
    samples,
  })

  // Вниз по левому краю, затем вверх по правому — получается замкнутая полоса.
  return {
    clip: `polygon(${toPolygonPoints(left)}, ${toPolygonPoints([...right].reverse())})`,
    paths: [toSvgPath(left), toSvgPath(right)],
  }
}
