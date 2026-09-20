/**
 * «Тёмный материал» — общий фон для луча в хиро и для секции Featured case.
 *
 * Одна функция на оба места, чтобы на стыке они совпадали не «примерно
 * по цвету», а буквально: одна сетка, одно зерно, один шаг, одна яркость.
 *
 * Сетка генерируется как data-URI SVG с нужной прозрачностью линий — так
 * не нужен затемняющий слой поверх, который иначе гасил бы и всё, что под
 * сеткой (например, красное свечение секции).
 */

export interface DarkMaterialOptions {
  /** Шаг сетки, px */
  gridSize?: number
  /** Цвет линий сетки */
  gridColor?: string
  /** Прозрачность линий 0..1; 0 — без сетки */
  gridOpacity?: number
  /** Зерно бумаги, накладывается soft-light */
  grainUrl?: string
  /**
   * К какому краю прибить фазу паттернов. У луча — к нижнему, у секции
   * под ним — к верхнему: тогда линии сетки на шве продолжают друг друга.
   */
  anchor?: 'top' | 'bottom'
}

export interface MaterialLayer {
  image: string
  size: string
  blend: string
}

function gridDataUri(size: number, color: string, opacity: number): string {
  // Линии по верхнему и левому краю тайла, со сдвигом на полпикселя — чёткие 1px.
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<path d='M0 .5H${size}M.5 0V${size}' stroke='${color}' stroke-opacity='${opacity}' fill='none'/>` +
    `</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/** Слои материала сверху вниз, без базового цвета — его задаёт вызывающий. */
export function darkMaterialLayers(options: DarkMaterialOptions = {}): MaterialLayer[] {
  const { gridSize = 20, gridColor = '#F1CEB0', gridOpacity = 0.32, grainUrl = '' } = options
  const layers: MaterialLayer[] = []
  if (gridOpacity > 0) {
    layers.push({ image: gridDataUri(gridSize, gridColor, gridOpacity), size: `${gridSize}px ${gridSize}px`, blend: 'normal' })
  }
  if (grainUrl) {
    layers.push({ image: `url(${grainUrl})`, size: 'auto', blend: 'soft-light' })
  }
  return layers
}

export interface DarkMaterialStyleOptions extends DarkMaterialOptions {
  /** Слои поверх материала (например, переход из цвета навбара) */
  above?: MaterialLayer[]
  /** Слои под материалом (например, градиент секции со свечением) */
  below?: MaterialLayer[]
  /** Базовый цвет под всеми слоями */
  baseColor?: string
}

/**
 * Готовый style-объект для ОДНОГО элемента.
 *
 * Важно: background-blend-mode смешивает слои только внутри одного элемента.
 * Поэтому зерно (soft-light) должно лежать в том же стеке, что и цвет или
 * градиент, с которым оно смешивается — отдельным div-ом поверх оно
 * не сработает.
 */
export function darkMaterialStyle(options: DarkMaterialStyleOptions = {}): Record<string, string> {
  const { above = [], below = [], baseColor = 'transparent' } = options
  const layers = [...above, ...darkMaterialLayers(options), ...below]
  if (!layers.length) return { background: baseColor }
  const anchorY = options.anchor === 'bottom' ? '100%' : '0'
  return {
    backgroundColor: baseColor,
    backgroundImage: layers.map((l) => l.image).join(', '),
    backgroundSize: layers.map((l) => l.size).join(', '),
    backgroundBlendMode: layers.map((l) => l.blend).join(', '),
    backgroundPosition: layers.map(() => `0 ${anchorY}`).join(', '),
    backgroundRepeat: 'repeat',
  }
}
