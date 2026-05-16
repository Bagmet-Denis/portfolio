<script setup lang="ts">
import { resolveAssetUrls } from '@/utils/resolveAssetUrl'

const gallery = resolveAssetUrls([
  'src/assets/projects/m-alien/mAlien0.png',
  'src/assets/projects/m-alien/mAlien1.png',
  'src/assets/projects/m-alien/mAlien2.png',
  'src/assets/projects/m-alien/mAlien3.png',
  'src/assets/projects/m-alien/mAlien4.png',
  'src/assets/projects/m-alien/mAlien5.png',
  'src/assets/projects/m-alien/mAlien6.png',
  'src/assets/projects/m-alien/mAlien7.png',
  'src/assets/projects/m-alien/mAlien8.png',
  'src/assets/projects/m-alien/mAlien9.png',
  'src/assets/projects/m-alien/mAlien10.png',
])

const featureSections = [
  {
    title: 'Приватная авторизация',
    items: [
      'Регистрация и вход построены вокруг уникального кода без телефона, email и социальных сетей.',
      'Пользователь может начать общение без привязки личных идентификаторов к аккаунту.',
      'Сценарий авторизации сфокусирован на быстром входе и минимальном следе пользователя.',
    ],
  },
  {
    title: 'Сообщения и real-time',
    items: [
      'Личные и групповые чаты работают через real-time соединения на Socket.IO и WebSocket.',
      'Сервер не хранит историю переписки: сообщения проходят через него как через транспортный слой.',
      'Backend отвечает за доставку событий, синхронизацию состояний, уведомления и служебные операции.',
    ],
  },
  {
    title: 'Медиа и голос',
    items: [
      'В приложении реализована отправка изображений и других медиафайлов.',
      'Голосовые сообщения встроены в привычный сценарий переписки: запись, отправка, отображение и прослушивание внутри чата.',
      'Для локальных данных используются Hive, кеширование и файловое хранилище устройства.',
    ],
  },
  {
    title: 'Перевод и удобство',
    items: [
      'Сообщения можно переводить в реальном времени внутри диалога.',
      'Пользователь управляет уведомлениями и поведением чатов под себя.',
      'Интерфейс поддерживает локализацию, emoji, QR-сценарии и быстрые действия в переписке.',
    ],
  },
  {
    title: 'Кастомизация',
    items: [
      'Темы, визуальные настройки и оформление чатов сделаны в духе современных мессенджеров.',
      'Чаты можно персонализировать, чтобы разные диалоги ощущались по-разному.',
      'UI построен на Flutter с кастомными состояниями, анимациями и адаптивными элементами.',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Серверная часть написана на Node.js и Express с MongoDB через Mongoose.',
      'Redis используется для быстрых состояний и инфраструктурной логики real-time сценариев.',
      'Backend объединяет файловую инфраструктуру, push-уведомления, Firebase Admin, geoip-логику и API для клиентских сценариев.',
    ],
  },
]

const stackGroups = [
  {
    title: 'Mobile',
    items: ['Flutter', 'Dart', 'Provider', 'Dio', 'Hive', 'Firebase', 'Socket.IO client', 'WebView'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Redis', 'Socket.IO', 'ws', 'Firebase Admin'],
  },
  {
    title: 'Features',
    items: ['Private code auth', 'Group chats', 'Media uploads', 'Voice messages', 'Realtime translation', 'Push notifications'],
  },
]
</script>

<template>
  <div class="space-y-5 text-[#17242c]">
    <section
      class="overflow-hidden rounded-[22px] border border-[#d5e2e4] bg-[#f8fbfb] shadow-[0_10px_24px_rgba(10,30,35,0.06)]">
      <div class="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="p-5 sm:p-6">
          <p class="text-[11px] font-black uppercase tracking-[0.24em] text-[#4f777c]">
            Fullstack messenger
          </p>
          <div class="mt-2 flex items-center gap-2">
            <span class="h-[3px] w-7 shrink-0 bg-[#1B8A8F]"></span>
            <div class="w-fit bg-[#1B8A8F] px-2.5 py-1 skew-x-[-10deg]">
              <h2 class="max-w-4xl text-2xl font-black leading-tight text-white skew-x-[10deg] sm:text-4xl">
                M-Alien
              </h2>
            </div>
          </div>
          <p class="mt-4 max-w-4xl text-sm leading-6 text-[#4f6267] sm:text-[15px]">
            Fullstack-мессенджер, в котором на мне лежала полная ответственность за продуктовую и техническую реализацию:
            от мобильного клиента до backend-архитектуры и real-time инфраструктуры. Ключевая идея проекта:
            пользователь регистрируется по уникальному коду, без привязки к номеру телефона, email или соцсетям,
            а сервер не сохраняет историю переписки.
          </p>
        </div>

        <div class="border-t border-[#d5e2e4] bg-[#eaf4f4] p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p class="text-[11px] font-black uppercase tracking-[0.24em] text-[#4f777c]">Моя роль</p>
          <p class="mt-3 text-sm leading-6 text-[#4f6267]">
            Я вел проект end-to-end: продумывал архитектуру, реализовывал мобильное приложение на Flutter,
            проектировал backend на Node.js/Express, собирал real-time обмен сообщениями, медиа, уведомления,
            хранение локальных данных и все связующие сценарии между клиентом и сервером.
          </p>
        </div>
      </div>
    </section>

    <section class="grid gap-4 lg:grid-cols-3">
      <article v-for="group in stackGroups" :key="group.title"
        class="rounded-[20px] border border-[#d5e2e4] bg-white p-5 shadow-[0_10px_24px_rgba(10,30,35,0.05)]">
        <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#4f777c]">{{ group.title }}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-for="item in group.items" :key="item"
            class="rounded-full border border-[#1B8A8F]/18 bg-[#1B8A8F]/10 px-3 py-1.5 text-xs font-semibold text-[#235b60]">
            {{ item }}
          </span>
        </div>
      </article>
    </section>

    <section class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <article v-for="section in featureSections" :key="section.title"
        class="rounded-[20px] border border-[#d5e2e4] bg-white p-5 shadow-[0_10px_24px_rgba(10,30,35,0.05)]">
        <div class="flex items-center gap-2">
          <span class="h-[3px] w-5 shrink-0 bg-[#DE7C3C]"></span>
          <div class="w-fit bg-[#DE7C3C] px-2 py-1 skew-x-[-10deg]">
            <h3 class="text-sm font-black uppercase tracking-[0.12em] text-white skew-x-[10deg]">
              {{ section.title }}
            </h3>
          </div>
        </div>
        <ul class="mt-3 space-y-2.5 text-sm leading-6 text-[#4f6267]">
          <li v-for="item in section.items" :key="item" class="flex gap-2">
            <span class="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8A8F]"></span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="rounded-[22px] border border-[#d5e2e4] bg-white p-4 shadow-[0_10px_24px_rgba(10,30,35,0.05)]">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-[11px] font-black uppercase tracking-[0.22em] text-[#4f777c]">Галерея</p>
          <div class="mt-1 flex items-center gap-2">
            <span class="h-[3px] w-5 shrink-0 bg-[#1B8A8F]"></span>
            <div class="w-fit bg-[#1B8A8F] px-2 py-1 skew-x-[-10deg]">
              <h3 class="text-xl font-black text-white skew-x-[10deg]">Мобильное приложение</h3>
            </div>
          </div>
        </div>
        <span class="rounded-full border border-[#d5e2e4] bg-[#eaf4f4] px-3 py-1 text-xs font-semibold text-[#235b60]">
          {{ gallery.length }}
        </span>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div v-for="(src, index) in gallery" :key="`m-alien-${index}`"
          class="overflow-hidden rounded-[20px] border border-[#d5e2e4] bg-[#f3f8f8] shadow-[0_10px_20px_rgba(10,30,35,0.05)]">
          <img :src="src" :alt="`M-Alien screen ${index + 1}`"
            class="h-full max-h-[430px] w-full object-cover object-top" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  </div>
</template>
