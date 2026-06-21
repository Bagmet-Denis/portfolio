import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const outDir = path.join(root, 'hh-portfolio')
const fontPath = path.join(root, 'src/assets/fonts/Rubik.ttf')

const W = 1600
const H = 1000

const palette = {
  ink: '#17202A',
  muted: '#5B6672',
  paper: '#F7F3EA',
  white: '#FFFFFF',
  line: '#D9D1C3',
  green: '#226D5C',
  blue: '#2D5B8C',
  red: '#A33F3D',
  gold: '#B98224',
  violet: '#6B527E',
  graphite: '#2E3338',
}

const clean = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const asset = (relativePath) => path.join(root, relativePath)

async function ensureDir() {
  await fs.mkdir(outDir, { recursive: true })
}

function svg(content, width = W, height = H) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face { font-family: Rubik; src: url('${fontPath}'); }
          text { font-family: Rubik, Arial, sans-serif; }
        </style>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#000" stroke-opacity=".055" stroke-width="1"/>
        </pattern>
        <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#17202A" flood-opacity=".16"/>
        </filter>
      </defs>
      ${content}
    </svg>
  `)
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

function textLines(text, { x, y, size = 36, color = palette.ink, maxChars = 44, lineHeight = 1.2, weight = 500 }) {
  return wrap(text, maxChars)
    .map((line, index) => {
      const yy = y + index * size * lineHeight
      return `<text x="${x}" y="${yy}" font-size="${size}" font-weight="${weight}" fill="${color}">${clean(line)}</text>`
    })
    .join('\n')
}

function pill(text, x, y, fill, color = palette.white) {
  const width = Math.max(112, text.length * 11 + 34)
  return `
    <rect x="${x}" y="${y}" width="${width}" height="38" rx="19" fill="${fill}"/>
    <text x="${x + 17}" y="${y + 25}" font-size="18" font-weight="600" fill="${color}">${clean(text)}</text>
  `
}

function base({ eyebrow, title, subtitle, accent = palette.green, footer = 'HH.ru portfolio images' }) {
  return svg(`
    <rect width="${W}" height="${H}" fill="${palette.paper}"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <circle cx="1450" cy="120" r="270" fill="${accent}" opacity=".13"/>
    <circle cx="140" cy="900" r="330" fill="${palette.gold}" opacity=".10"/>
    <rect x="64" y="64" width="1472" height="872" rx="38" fill="#FFFDF7" stroke="${palette.line}" stroke-width="2"/>
    <rect x="64" y="64" width="1472" height="11" rx="5.5" fill="${accent}"/>
    <text x="112" y="132" font-size="22" font-weight="700" fill="${accent}" letter-spacing="0">${clean(eyebrow)}</text>
    ${textLines(title, { x: 112, y: 205, size: 62, maxChars: 24, lineHeight: 1.08, weight: 800 })}
    ${textLines(subtitle, { x: 114, y: 365, size: 26, color: palette.muted, maxChars: 45, lineHeight: 1.32, weight: 400 })}
    <text x="112" y="890" font-size="20" fill="${palette.muted}">${clean(footer)}</text>
  `)
}

async function imageCard(input, { width, height, radius = 34, background = palette.white, border = palette.line } = {}) {
  const image = await sharp(input)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'top' })
    .composite([
      {
        input: Buffer.from(`
          <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/>
          </svg>
        `),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  const outline = svg(`<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}" fill="none" stroke="${border}" stroke-width="2"/>`, width, height)
  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background,
    },
  })
    .composite([
      { input: image, left: 0, top: 0 },
      { input: outline, left: 0, top: 0 },
    ])
    .png()
    .toBuffer()
}

async function phoneMock(input, { width = 230, height = 498, radius = 42 } = {}) {
  const image = await sharp(input)
    .rotate()
    .resize(width, height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#00000000',
    },
  })
    .composite([
      {
        input: svg(`
          <ellipse cx="${width / 2}" cy="${height - 28}" rx="${width * 0.34}" ry="26" fill="#17202A" opacity=".16"/>
        `, width, height),
        left: 0,
        top: 0,
      },
      { input: image, left: 0, top: 0 },
    ])
    .png()
    .toBuffer()
}

async function desktopMock(input, { width = 690, height = 430 } = {}) {
  const screen = await imageCard(input, { width, height, radius: 24 })
  return sharp({
    create: {
      width: width + 36,
      height: height + 74,
      channels: 4,
      background: '#00000000',
    },
  })
    .composite([
      { input: screen, left: 18, top: 0 },
      {
        input: svg(`
          <rect x="0" y="0" width="${width + 36}" height="${height + 74}" fill="#00000000"/>
          <rect x="${width / 2 - 56 + 18}" y="${height + 12}" width="112" height="32" rx="10" fill="#2E3338"/>
          <rect x="${width / 2 - 150 + 18}" y="${height + 42}" width="300" height="22" rx="11" fill="#2E3338"/>
        `, width + 36, height + 74),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer()
}

async function writeImage(name, background, composites) {
  await sharp(background)
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, name))
}

async function overview() {
  const bg = base({
    eyebrow: 'Денис Багмет',
    title: 'Mobile, Frontend & Backend Developer',
    subtitle: 'Подборка коммерческих мобильных приложений, fullstack-продуктов, web/desktop-интерфейсов и security-исследований.',
    accent: palette.green,
    footer: 'Формат: готовые изображения для раздела «Портфолио» на hh.ru',
  })

  const shots = await Promise.all([
    phoneMock(asset('src/assets/projects/m-alien/mAlien0.png'), { width: 214, height: 464 }),
    phoneMock(asset('src/assets/projects/tag/tag0.png'), { width: 214, height: 464 }),
    phoneMock(asset('src/assets/projects/teleprompter/teleprompter0.png'), { width: 214, height: 464 }),
    phoneMock(asset('src/assets/projects/glavnaya-doroga/glavnayaDoroga0.png'), { width: 214, height: 464 }),
    phoneMock(asset('src/assets/projects/proscan/proscan0.png'), { width: 214, height: 464 }),
  ])

  await writeImage('00-cover-overview.png', bg, [
    ...shots.map((input, i) => ({ input, left: 735 + i * 128, top: 300 + (i % 2) * 42 })),
    { input: svg(`${pill('Flutter', 112, 710, palette.blue)}${pill('Swift / SwiftUI', 245, 710, palette.graphite)}${pill('Vue / TypeScript', 440, 710, palette.green)}${pill('Node.js', 640, 710, palette.red)}`), left: 0, top: 0 },
  ])
}

async function mobileCommercial() {
  const bg = base({
    eyebrow: 'Коммерческая mobile-разработка',
    title: 'Транспорт, сервисы, платежи',
    subtitle: 'Официальные приложения с балансом, оплатой, историей поездок, картами, авторизацией, push-уведомлениями и store-релизами.',
    accent: palette.blue,
    footer: 'Главная дорога / Транспондер / Главная дорога RFID',
  })

  const shots = await Promise.all([
    phoneMock(asset('src/assets/projects/glavnaya-doroga/glavnayaDoroga0.png')),
    phoneMock(asset('src/assets/projects/transponder/transponder0.png')),
    phoneMock(asset('src/assets/projects/glavnaya-doroga-rfid/glavnayaDorogaRfid0.png')),
    phoneMock(asset('src/assets/projects/glavnaya-doroga/glavnayaDoroga3.png'), { width: 210, height: 455 }),
  ])

  await writeImage('01-commercial-mobile-apps.png', bg, [
    { input: shots[0], left: 735, top: 292 },
    { input: shots[1], left: 944, top: 240 },
    { input: shots[2], left: 1154, top: 292 },
    { input: shots[3], left: 1340, top: 348 },
    { input: svg(`${pill('Flutter', 114, 716, palette.blue)}${pill('Payments', 250, 716, palette.green)}${pill('Maps', 405, 716, palette.gold)}${pill('Push', 514, 716, palette.red)}`), left: 0, top: 0 },
  ])
}

async function tagHeuer() {
  const bg = base({
    eyebrow: 'Premium iOS experience',
    title: 'TAG Heuer: The Tone of Victory',
    subtitle: 'SwiftUI-приложение для Formula 1 бренд-зон: видео, аудио, мультиязычность, kiosk UX и реальные стендовые сценарии.',
    accent: palette.red,
    footer: 'Swift / SwiftUI / AVFoundation / offline event experience',
  })

  const phone = await phoneMock(asset('src/assets/projects/tag/tag0.png'), { width: 236, height: 512 })
  const stand0 = await imageCard(asset('src/assets/projects/tag/stand0.jpeg'), { width: 420, height: 310, radius: 24 })
  const stand1 = await imageCard(asset('src/assets/projects/tag/stand1.jpeg'), { width: 360, height: 260, radius: 24 })
  const shot = await phoneMock(asset('src/assets/projects/tag/tag4.png'), { width: 210, height: 455 })

  await writeImage('02-tag-heuer-tone-of-victory.png', bg, [
    { input: stand0, left: 720, top: 245 },
    { input: stand1, left: 1035, top: 585 },
    { input: phone, left: 1170, top: 190 },
    { input: shot, left: 910, top: 385 },
    { input: svg(`${pill('SwiftUI', 112, 716, palette.red)}${pill('AVFoundation', 254, 716, palette.graphite)}${pill('Kiosk UX', 450, 716, palette.gold)}`), left: 0, top: 0 },
  ])
}

async function malien() {
  const bg = base({
    eyebrow: 'Fullstack product',
    title: 'M-Alien: приватный мессенджер',
    subtitle: 'Мобильное приложение и backend: регистрация по коду, личные и групповые чаты, медиа, голосовые, real-time перевод и уведомления.',
    accent: palette.violet,
    footer: 'Flutter / Node.js / MongoDB / Redis / Socket.IO / Firebase',
  })

  const shots = await Promise.all([
    phoneMock(asset('src/assets/projects/m-alien/mAlien0.png')),
    phoneMock(asset('src/assets/projects/m-alien/mAlien2.png')),
    phoneMock(asset('src/assets/projects/m-alien/mAlien5.png')),
    phoneMock(asset('src/assets/projects/m-alien/mAlien8.png'), { width: 210, height: 455 }),
  ])

  await writeImage('03-m-alien-fullstack-messenger.png', bg, [
    { input: shots[0], left: 735, top: 260 },
    { input: shots[1], left: 948, top: 310 },
    { input: shots[2], left: 1160, top: 260 },
    { input: shots[3], left: 1350, top: 355 },
    { input: svg(`${pill('Flutter', 112, 716, palette.violet)}${pill('Node.js', 250, 716, palette.green)}${pill('MongoDB', 382, 716, palette.graphite)}${pill('Socket.IO', 528, 716, palette.red)}`), left: 0, top: 0 },
  ])
}

async function teleprompter() {
  const bg = base({
    eyebrow: 'Native iOS + web panel',
    title: 'Teleprompter Automatic',
    subtitle: 'Запись видео, движок прокрутки, сценарии, встроенный редактор, web-панель управления, backend и Apple Watch integration.',
    accent: palette.gold,
    footer: 'Swift / SwiftUI / AVFoundation / Node.js / Web panel',
  })

  const phoneA = await phoneMock(asset('src/assets/projects/teleprompter/teleprompter0.png'), { width: 220, height: 478 })
  const phoneB = await phoneMock(asset('src/assets/projects/teleprompter/teleprompter5.png'), { width: 220, height: 478 })
  const webPanel = await desktopMock(asset('src/assets/projects/teleprompter/teleprompter_web_0.png'), { width: 620, height: 390 })

  await writeImage('04-teleprompter-automatic.png', bg, [
    { input: webPanel, left: 760, top: 305 },
    { input: phoneA, left: 724, top: 235 },
    { input: phoneB, left: 1270, top: 275 },
    { input: svg(`${pill('SwiftUI', 112, 716, palette.gold)}${pill('Video editor', 252, 716, palette.red)}${pill('Backend', 440, 716, palette.green)}${pill('Web panel', 580, 716, palette.graphite)}`), left: 0, top: 0 },
  ])
}

async function productivity() {
  const bg = base({
    eyebrow: 'Utility & productivity apps',
    title: 'Документы, фото, финансы, учет',
    subtitle: 'Практичные приложения с камерой, PDF, CoreData, локальным хранением, подписками, сканированием и рабочими пользовательскими сценариями.',
    accent: palette.graphite,
    footer: 'Password Manager / ProScan / Passport Photos / Beautify / Складолог',
  })

  const shots = await Promise.all([
    phoneMock(asset('src/assets/projects/passwordManager/password-manager-mypasssaver0.png'), { width: 196, height: 426 }),
    phoneMock(asset('src/assets/projects/proscan/proscan0.png'), { width: 196, height: 426 }),
    phoneMock(asset('src/assets/projects/passportPhoto/passportPhoto0.PNG'), { width: 196, height: 426 }),
    phoneMock(asset('src/assets/projects/beautify/beautify0.png'), { width: 196, height: 426 }),
    phoneMock(asset('src/assets/projects/storekeeper/storekeeper0.png'), { width: 196, height: 426 }),
  ])

  await writeImage('05-productivity-utilities.png', bg, [
    ...shots.map((input, i) => ({ input, left: 710 + i * 150, top: 320 + (i % 2) * 35 })),
    { input: svg(`${pill('Swift', 112, 716, palette.graphite)}${pill('Flutter', 235, 716, palette.blue)}${pill('PDF / Camera', 368, 716, palette.red)}${pill('CoreData', 558, 716, palette.green)}`), left: 0, top: 0 },
  ])
}

async function webDesktopSecurity() {
  const bg = base({
    eyebrow: 'Web, desktop & security',
    title: 'Интерфейсы и исследовательские проекты',
    subtitle: 'Vue-портфолио, desktop UI, OSINT/security-исследования и технические статьи: от продукта до инженерной упаковки результата.',
    accent: palette.green,
    footer: 'Vue / TypeScript / Flutter Desktop / C# / Raspberry Pi / OSINT',
  })

  const desktop = await desktopMock(asset('src/assets/projects/trezorSuite/trezorSuite0.png'), { width: 610, height: 390 })
  const securityA = await imageCard(asset('src/assets/projects/security/codeby-profile.png.png'), { width: 390, height: 245, radius: 22 })
  const securityB = await imageCard(asset('src/assets/projects/stealingBrowserCredentials/raspberry.png'), { width: 390, height: 245, radius: 22 })
  const site = await imageCard(asset('public/profile/about-me.png'), { width: 250, height: 250, radius: 30 })

  await writeImage('06-web-desktop-security.png', bg, [
    { input: desktop, left: 710, top: 280 },
    { input: securityA, left: 1110, top: 230 },
    { input: securityB, left: 1120, top: 510 },
    { input: site, left: 755, top: 580 },
    { input: svg(`${pill('Vue', 112, 716, palette.green)}${pill('TypeScript', 220, 716, palette.blue)}${pill('Flutter Desktop', 382, 716, palette.graphite)}${pill('Security research', 600, 716, palette.red)}`), left: 0, top: 0 },
  ])
}

async function uploadGuide() {
  const guide = `# HH.ru portfolio images

Рекомендуемый порядок загрузки:

1. 00-cover-overview.png
2. 01-commercial-mobile-apps.png
3. 02-tag-heuer-tone-of-victory.png
4. 03-m-alien-fullstack-messenger.png
5. 04-teleprompter-automatic.png
6. 05-productivity-utilities.png
7. 06-web-desktop-security.png

Короткая подпись для hh.ru:

Подборка проектов: коммерческие мобильные приложения на Flutter и Swift/SwiftUI, fullstack-мессенджер, web/backend-модули, desktop UI и security-исследования. В работах показаны реальные продуктовые экраны, релизные приложения, платежи, карты, push-уведомления, видео/аудио, PDF/camera workflows, realtime-функции и интеграции с backend.
`
  await fs.writeFile(path.join(outDir, 'README.md'), guide, 'utf8')
}

await ensureDir()
await overview()
await mobileCommercial()
await tagHeuer()
await malien()
await teleprompter()
await productivity()
await webDesktopSecurity()
await uploadGuide()

console.log(`Created HH portfolio images in ${outDir}`)
