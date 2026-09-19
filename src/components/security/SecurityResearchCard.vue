<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectCard } from '@/types/projectCard'

const props = defineProps<{
  project: ProjectCard
  index: number
  openLightbox?: (projectId: string, index: number) => void
}>()

/** Описание кейса приходит с HTML-разметкой — в карточке нужен только текст. */
const summary = computed(() =>
  props.project.description
    .replace(/<a[\s\S]*?<\/a>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim(),
)

const number = computed(() => String(props.index + 1).padStart(2, '0'))
/** Номер «канала» для CRT-заставки на ховере. */
const channel = computed(() => `CH-${number.value}`)

function openGallery() {
  if (props.project.galleryUrls.length) props.openLightbox?.(props.project.id, 0)
}
</script>

<template>
  <article class="sec-card">
    <div
      class="sec-card-media"
      :class="{ 'is-clickable': project.galleryUrls.length }"
      @click="openGallery"
    >
      <span class="sec-card-num">{{ number }}</span>
      <img v-if="project.iconUrl" :src="project.iconUrl" :alt="project.title" loading="lazy" decoding="async" />
      <span v-else class="sec-card-placeholder" aria-hidden="true"></span>

      <span class="sec-crt" aria-hidden="true">
        <span class="sec-crt-lines"></span>
        <span class="sec-crt-roll"></span>
        <span class="sec-crt-flash"></span>
        <span class="sec-crt-badge">
          <i></i>{{ channel }}
        </span>
        <span class="sec-crt-bar"><i></i></span>
      </span>
    </div>

    <div class="sec-card-body">
      <div v-if="project.technologies.length" class="sec-card-tags">
        <span v-for="technology in project.technologies.slice(0, 4)" :key="technology">{{ technology }}</span>
      </div>

      <h3>{{ project.title }}</h3>
      <p v-if="summary">{{ summary }}</p>
      <span v-if="project.notice" class="sec-card-notice">{{ project.notice }}</span>

      <div v-if="project.storeLinks.length" class="sec-card-foot">
        <a
          v-for="link in project.storeLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label || 'link' }}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.sec-card {
  --line: rgba(130, 200, 255, 0.14);
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(14, 26, 38, 0.72), rgba(6, 10, 18, 0.86));
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.sec-card::before,
.sec-card::after {
  content: '';
  position: absolute;
  z-index: 3;
  width: 10px;
  height: 10px;
  border: 1px solid rgba(110, 242, 192, 0.45);
}

.sec-card::before {
  top: -1px;
  left: -1px;
  border-right: 0;
  border-bottom: 0;
}

.sec-card::after {
  right: -1px;
  bottom: -1px;
  border-left: 0;
  border-top: 0;
}

.sec-card:hover {
  transform: translateY(-3px);
  border-color: rgba(110, 242, 192, 0.34);
}

.sec-card-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: #070d16;
}

.sec-card-media.is-clickable {
  cursor: zoom-in;
}

.sec-card-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(4, 8, 14, 0) 35%, rgba(4, 8, 14, 0.9) 100%);
}

.sec-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.5) contrast(1.05) brightness(0.82);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.sec-card:hover .sec-card-media img {
  transform: scale(1.03);
  filter: grayscale(0.08) contrast(1.12) brightness(1) saturate(1.12);
}

.sec-card-placeholder {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(45deg, rgba(110, 242, 192, 0.06) 0 8px, transparent 8px 16px),
    #070d16;
}

.sec-card-num {
  position: absolute;
  top: 0.5rem;
  left: 0.55rem;
  z-index: 2;
  font-family: var(--mono);
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  color: rgba(110, 242, 192, 0.7);
}

.sec-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.65rem 0.7rem 0.75rem;
}

.sec-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.sec-card-tags span {
  padding: 0.14rem 0.36rem;
  border: 1px solid rgba(130, 200, 255, 0.16);
  border-radius: 3px;
  font-family: var(--mono);
  font-size: 0.46rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(178, 214, 232, 0.6);
}

.sec-card h3 {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.25;
  font-weight: 800;
  color: #f0f8fb;
}

.sec-card p {
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  overflow: hidden;
  font-family: var(--mono);
  font-size: 0.58rem;
  line-height: 1.55;
  color: rgba(205, 226, 230, 0.5);
}

.sec-card-notice {
  font-family: var(--mono);
  font-size: 0.48rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 179, 71, 0.75);
}

.sec-card-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: auto;
  padding-top: 0.3rem;
}

.sec-card-foot a {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid rgba(110, 242, 192, 0.22);
  border-radius: 6px;
  background: rgba(110, 242, 192, 0.05);
  text-decoration: none;
  font-family: var(--mono);
  font-size: 0.48rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(174, 255, 232, 0.82);
  transition: background 0.2s ease, color 0.2s ease;
}

.sec-card-foot a:hover {
  background: rgba(110, 242, 192, 0.14);
  color: #fff;
}


/* ---- лёгкий CRT-эффект поверх обложки -------------------------------- */
.sec-crt {
  position: absolute;
  inset: 0;
  z-index: 3;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.sec-card:hover .sec-crt,
.sec-card:focus-within .sec-crt {
  opacity: 1;
}

.sec-crt-lines {
  position: absolute;
  inset: -2px;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0 1px, transparent 1px 3px);
  mix-blend-mode: multiply;
}

.sec-card:hover .sec-crt-lines {
  animation: sec-crt-scroll 1.8s linear infinite;
}

@keyframes sec-crt-scroll {
  to {
    transform: translateY(3px);
  }
}

.sec-crt-roll {
  position: absolute;
  top: -35%;
  right: 0;
  left: 0;
  height: 32%;
  background: linear-gradient(180deg, transparent, rgba(180, 255, 230, 0.16), transparent);
}

.sec-card:hover .sec-crt-roll {
  animation: sec-crt-roll 3.2s linear infinite;
}

@keyframes sec-crt-roll {
  0% {
    top: -35%;
  }
  100% {
    top: 110%;
  }
}

.sec-crt-flash {
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  height: 2px;
  opacity: 0;
  background: rgba(234, 255, 247, 0.9);
}

.sec-card:hover .sec-crt-flash {
  animation: sec-crt-flash 0.5s ease-out;
}

@keyframes sec-crt-flash {
  0% {
    opacity: 0.9;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(18);
  }
}

.sec-crt-badge {
  position: absolute;
  top: 0.45rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  padding: 0.14rem 0.36rem;
  border: 1px solid rgba(110, 242, 192, 0.35);
  border-radius: 3px;
  background: rgba(4, 10, 14, 0.55);
  font-family: var(--mono);
  font-size: 0.46rem;
  letter-spacing: 0.2em;
  color: rgba(214, 255, 240, 0.9);
  text-shadow:
    0.7px 0 rgba(255, 70, 70, 0.5),
    -0.7px 0 rgba(70, 200, 255, 0.5);
}

.sec-crt-badge i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ff5f52;
  box-shadow: 0 0 6px rgba(255, 95, 82, 0.9);
}

.sec-card:hover .sec-crt-badge i {
  animation: sec-crt-rec 1.4s steps(2) infinite;
}

@keyframes sec-crt-rec {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0.15;
  }
}

.sec-crt-bar {
  position: absolute;
  right: 0.5rem;
  bottom: 0.45rem;
  left: 0.5rem;
  display: block;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
}

.sec-crt-bar i {
  display: block;
  width: 8%;
  height: 100%;
  border-radius: 2px;
  background: #6ef2c0;
  box-shadow: 0 0 8px rgba(110, 242, 192, 0.8);
}

.sec-card:hover .sec-crt-bar i {
  animation: sec-crt-load 1.8s cubic-bezier(0.3, 0.8, 0.4, 1) forwards;
}

@keyframes sec-crt-load {
  0% {
    width: 8%;
  }
  60% {
    width: 62%;
  }
  100% {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sec-crt-lines,
  .sec-crt-roll,
  .sec-crt-flash,
  .sec-crt-badge i,
  .sec-crt-bar i {
    animation: none !important;
  }

  .sec-crt-bar i {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sec-card,
  .sec-card-media img,
  .sec-card-foot a {
    transition: none;
  }
}
</style>
