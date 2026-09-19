/**
 * Рендер «планеты» для раздела кибербезопасности.
 * Canvas 2D, без внешних зависимостей: точечная суша, сетка, маркеры целей,
 * дуги между ними и лёгкий HUD-антураж.
 */

export interface GlobeTarget {
  /** Долгота цели в градусах. */
  lon: number
  /** Широта цели в градусах. */
  lat: number
  /** Цвет маркера. */
  color: string
  /** Смещение подписи по X в пикселях. */
  ldx?: number
  /** Смещение подписи по Y в пикселях. */
  ldy?: number
  /** Приглушённый «засекреченный» маркер: тусклее и без дуг. */
  dim?: boolean
}

export interface GlobeProjection {
  x: number
  y: number
  z: number
}

export interface GlobePalette {
  glowInner: string
  sphereHi: string
  sphereLo: string
  grid: string
  land: (alpha: number) => string
  limbShade: string
  rim: string
  arc: string
  packet: string
  sweep: string
}

export interface GlobeOptions {
  dots: string
  targets: GlobeTarget[]
  palette: GlobePalette
  onHover?: (index: number) => void
  onSelect?: (index: number) => void
  onFrame?: (points: GlobeProjection[]) => void
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const INDEX: Record<string, number> = {}
for (let i = 0; i < B64.length; i += 1) INDEX[B64[i] as string] = i

const RAD = Math.PI / 180

/** Распаковывает строку с координатами суши в плоский массив [lon, lat, ...]. */
export function decodeLandDots(packed: string): Float32Array {
  const out = new Float32Array((packed.length / 4) * 2)
  let k = 0
  for (let i = 0; i < packed.length; i += 4) {
    const lon = ((INDEX[packed[i] as string] ?? 0) * 64 + (INDEX[packed[i + 1] as string] ?? 0)) / 10 - 180
    const lat = ((INDEX[packed[i + 2] as string] ?? 0) * 64 + (INDEX[packed[i + 3] as string] ?? 0)) / 10 - 90
    out[k] = lon
    out[k + 1] = lat
    k += 2
  }
  return out
}

export class SecurityGlobeEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly dots: Float32Array
  private readonly palette: GlobePalette
  private readonly onHover: (index: number) => void
  private readonly onSelect: (index: number) => void
  private readonly onFrame: (points: GlobeProjection[]) => void

  private targets: GlobeTarget[]
  private lon = -18
  private tilt = 16
  private lonGoal: number | null = null
  private hovered = -1
  private projected: GlobeProjection[] = []
  private raf = 0
  private last = 0
  private readonly started = typeof performance !== 'undefined' ? performance.now() : 0
  private width = 1
  private height = 1
  private cx = 0
  private cy = 0
  private radius = 1
  private reducedMotion = false

  active = -1
  paused = false

  constructor(canvas: HTMLCanvasElement, options: GlobeOptions) {
    this.canvas = canvas
    const context = canvas.getContext('2d')
    if (!context) throw new Error('2d context is not available')
    this.ctx = context
    this.dots = decodeLandDots(options.dots)
    this.targets = options.targets
    this.palette = options.palette
    this.onHover = options.onHover ?? (() => {})
    this.onSelect = options.onSelect ?? (() => {})
    this.onFrame = options.onFrame ?? (() => {})
    this.reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    this.handlePointerMove = this.handlePointerMove.bind(this)
    this.handlePointerLeave = this.handlePointerLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.loop = this.loop.bind(this)

    canvas.addEventListener('pointermove', this.handlePointerMove)
    canvas.addEventListener('pointerleave', this.handlePointerLeave)
    canvas.addEventListener('click', this.handleClick)

    this.resize()
    this.raf = requestAnimationFrame(this.loop)
  }

  destroy(): void {
    cancelAnimationFrame(this.raf)
    this.canvas.removeEventListener('pointermove', this.handlePointerMove)
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave)
    this.canvas.removeEventListener('click', this.handleClick)
  }

  setTargets(targets: GlobeTarget[]): void {
    this.targets = targets
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect()
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    this.width = Math.max(1, rect.width)
    this.height = Math.max(1, rect.height)
    this.canvas.width = Math.round(this.width * dpr)
    this.canvas.height = Math.round(this.height * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.cx = this.width / 2
    this.cy = this.height / 2
    this.radius = Math.min(this.width, this.height) * 0.4
  }

  /** Доворачивает планету так, чтобы цель оказалась лицом к зрителю. */
  focus(index: number | null): void {
    this.active = index ?? -1
    const target = index == null ? null : this.targets[index]
    if (!target) {
      this.lonGoal = null
      return
    }
    const want = -target.lon
    this.lonGoal = this.lon + ((((want - this.lon) % 360) + 540) % 360) - 180
  }

  private project(lon: number, lat: number): GlobeProjection {
    const phi = lat * RAD
    const lambda = (lon + this.lon) * RAD
    const tilt = this.tilt * RAD
    const cosPhi = Math.cos(phi)
    const x = cosPhi * Math.sin(lambda)
    const y = Math.sin(phi)
    const z = cosPhi * Math.cos(lambda)
    const yTilted = y * Math.cos(tilt) - z * Math.sin(tilt)
    const zTilted = y * Math.sin(tilt) + z * Math.cos(tilt)
    return {
      x: this.cx + x * this.radius,
      y: this.cy - yTilted * this.radius,
      z: zTilted,
    }
  }

  private handlePointerMove(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    const mx = event.clientX - rect.left
    const my = event.clientY - rect.top
    let found = -1
    let best = 26 * 26
    this.projected.forEach((point, index) => {
      if (point.z <= 0.02) return
      const distance = (point.x - mx) ** 2 + (point.y - my) ** 2
      if (distance < best) {
        best = distance
        found = index
      }
    })
    if (found === this.hovered) return
    this.hovered = found
    this.canvas.style.cursor = found >= 0 ? 'pointer' : 'default'
    this.onHover(found)
  }

  private handlePointerLeave(): void {
    if (this.hovered !== -1) {
      this.hovered = -1
      this.onHover(-1)
    }
    this.canvas.style.cursor = 'default'
  }

  private handleClick(): void {
    if (this.hovered >= 0) this.onSelect(this.hovered)
  }

  private loop(now: number): void {
    const delta = Math.min(48, now - (this.last || now))
    this.last = now
    const time = (now - this.started) / 1000

    if (this.lonGoal != null) {
      // Плавный доворот с ограничением скорости, чтобы планета не «срывалась».
      const diff = this.lonGoal - this.lon
      const maxStep = (delta / 16.7) * 1.15
      const step = Math.max(-maxStep, Math.min(maxStep, diff * 0.07))
      this.lon += step
      if (Math.abs(diff) < 0.05) this.lon = this.lonGoal
    } else if (!this.paused && !this.reducedMotion) {
      this.lon -= delta * 0.0075
    }
    if (this.lon < -360) this.lon += 360
    if (this.lon > 360) this.lon -= 360

    this.draw(time)
    this.raf = requestAnimationFrame(this.loop)
  }

  private draw(time: number): void {
    const { ctx, width, height, cx, cy, radius } = this
    const palette = this.palette
    ctx.clearRect(0, 0, width, height)

    const glow = ctx.createRadialGradient(cx, cy, radius * 0.72, cx, cy, radius * 1.5)
    glow.addColorStop(0, palette.glowInner)
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2)
    ctx.fill()

    const body = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.45, radius * 0.1, cx, cy, radius)
    body.addColorStop(0, palette.sphereHi)
    body.addColorStop(1, palette.sphereLo)
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = palette.grid
    ctx.lineWidth = 0.6
    for (let lat = -60; lat <= 60; lat += 30) this.strokeRing((lon) => this.project(lon, lat), -180, 180, 4)
    for (let lon = -180; lon < 180; lon += 30) this.strokeRing((lat) => this.project(lon, lat), -90, 90, 4)

    const dots = this.dots
    const size = Math.max(1, radius * 0.0105)
    for (let i = 0; i < dots.length; i += 2) {
      const point = this.project(dots[i] as number, dots[i + 1] as number)
      if (point.z <= 0.02) continue
      ctx.fillStyle = palette.land(0.16 + point.z * 0.74)
      const s = size * (0.62 + point.z * 0.5)
      ctx.fillRect(point.x - s / 2, point.y - s / 2, s, s)
    }

    const shade = ctx.createRadialGradient(cx, cy, radius * 0.55, cx, cy, radius)
    shade.addColorStop(0, 'rgba(0,0,0,0)')
    shade.addColorStop(1, palette.limbShade)
    ctx.fillStyle = shade
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = palette.rim
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.stroke()

    this.projected = this.targets.map((target) => this.project(target.lon, target.lat))
    const linked = this.targets.filter((target) => !target.dim)
    for (let i = 0; i < linked.length; i += 1) {
      const from = linked[i] as GlobeTarget
      const to = linked[(i + 1) % linked.length] as GlobeTarget
      this.drawArc(from, to, time, i)
    }

    this.targets.forEach((target, index) => {
      const point = this.projected[index] as GlobeProjection
      if (point.z <= 0.02) return
      const focused = index === this.hovered || index === this.active
      const dim = target.dim === true
      const fade = Math.min(1, Math.max(0, (point.z - 0.02) / 0.22)) * (dim && !focused ? 0.5 : 1)
      const pulse = this.reducedMotion ? 0.35 : (time * 0.55 + index * 0.27) % 1

      ctx.strokeStyle = target.color
      ctx.globalAlpha = fade * (1 - pulse) * (focused ? 0.85 : dim ? 0.28 : 0.5)
      ctx.lineWidth = focused ? 1.6 : 1.1
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4 + pulse * (focused ? 26 : dim ? 11 : 18), 0, Math.PI * 2)
      ctx.stroke()

      ctx.globalAlpha = fade
      ctx.lineWidth = 1
      if (dim) ctx.setLineDash([2, 3])
      ctx.beginPath()
      ctx.arc(point.x, point.y, focused ? 9 : dim ? 5 : 6.5, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = target.color
      ctx.shadowColor = target.color
      ctx.shadowBlur = focused ? 16 : dim ? 4 : 8
      ctx.beginPath()
      ctx.arc(point.x, point.y, focused ? 3.4 : dim ? 1.8 : 2.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      if ((target.ldx || target.ldy) && (!dim || focused)) {
        ctx.globalAlpha = fade * (focused ? 0.8 : 0.4)
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(point.x + (target.ldx ?? 0) * 0.55, point.y + (target.ldy ?? 0) * 0.62)
        ctx.lineTo(point.x + (target.ldx ?? 0), point.y + (target.ldy ?? 0))
        ctx.stroke()
        ctx.globalAlpha = fade
      }

      if (focused) {
        ctx.globalAlpha = fade * 0.7
        ctx.lineWidth = 0.9
        const arm = 16
        ctx.beginPath()
        ctx.moveTo(point.x - arm, point.y)
        ctx.lineTo(point.x - 11, point.y)
        ctx.moveTo(point.x + 11, point.y)
        ctx.lineTo(point.x + arm, point.y)
        ctx.moveTo(point.x, point.y - arm)
        ctx.lineTo(point.x, point.y - 11)
        ctx.moveTo(point.x, point.y + 11)
        ctx.lineTo(point.x, point.y + arm)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    })

    ctx.save()
    ctx.translate(cx, cy)
    ctx.strokeStyle = palette.rim
    for (let i = 0; i < 72; i += 1) {
      const major = i % 6 === 0
      ctx.globalAlpha = major ? 0.5 : 0.18
      ctx.lineWidth = major ? 1 : 0.7
      ctx.beginPath()
      ctx.moveTo(0, -(radius * 1.09))
      ctx.lineTo(0, -(radius * 1.09) - (major ? 7 : 3.5))
      ctx.stroke()
      ctx.rotate((Math.PI * 2) / 72)
    }
    ctx.restore()
    ctx.globalAlpha = 1

    this.onFrame(this.projected)

    if (!this.reducedMotion) {
      const angle = (time * 0.35) % (Math.PI * 2)
      const sweep = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
      sweep.addColorStop(0, palette.sweep)
      sweep.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.strokeStyle = sweep
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
      ctx.stroke()
    }
  }

  private strokeRing(
    projector: (value: number) => GlobeProjection,
    from: number,
    to: number,
    step: number,
  ): void {
    const ctx = this.ctx
    ctx.beginPath()
    let started = false
    for (let value = from; value <= to; value += step) {
      const point = projector(value)
      if (point.z > 0) {
        if (started) ctx.lineTo(point.x, point.y)
        else {
          ctx.moveTo(point.x, point.y)
          started = true
        }
      } else {
        started = false
      }
    }
    ctx.stroke()
  }

  private drawArc(from: GlobeTarget, to: GlobeTarget, time: number, seed: number): void {
    const ctx = this.ctx
    const steps = 48
    const path: GlobeProjection[] = []
    for (let step = 0; step <= steps; step += 1) {
      const f = step / steps
      const lon = from.lon + ((((to.lon - from.lon + 540) % 360) - 180)) * f
      const lat = from.lat + (to.lat - from.lat) * f
      const lift = 1 + Math.sin(f * Math.PI) * 0.16
      const point = this.project(lon, lat)
      path.push({
        x: this.cx + (point.x - this.cx) * lift,
        y: this.cy + (point.y - this.cy) * lift,
        z: point.z,
      })
    }

    ctx.lineWidth = 1
    ctx.strokeStyle = this.palette.arc
    ctx.setLineDash([3, 5])
    ctx.beginPath()
    let started = false
    path.forEach((point) => {
      if (point.z > -0.15) {
        if (started) ctx.lineTo(point.x, point.y)
        else {
          ctx.moveTo(point.x, point.y)
          started = true
        }
      } else {
        started = false
      }
    })
    ctx.stroke()
    ctx.setLineDash([])

    if (this.reducedMotion) return
    const progress = (time * 0.22 + seed * 0.31) % 1
    const packet = path[Math.floor(progress * steps)]
    if (!packet || packet.z <= -0.05) return
    ctx.fillStyle = this.palette.packet
    ctx.shadowColor = this.palette.packet
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(packet.x, packet.y, 1.9, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }
}
