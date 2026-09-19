<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SecurityGlobe, { type SecurityGlobeMarker } from './SecurityGlobe.vue'
import {
  PRIVATE_MARKER_COLOR,
  securityFindings,
  securityPrivateEngagements,
} from '@/data/securityFindings'
import LegalNoticeBanner from '@/components/LegalNoticeBanner.vue'

defineProps<{
  /** Сколько исследований показано ниже — для счётчика в заголовке. */
  researchCount: number
}>()

const { t } = useI18n()
const activeIndex = ref(-1)

/** Публичные цели идут первыми, закрытые — следом: индекс маркера общий для всех списков. */
const markers = computed<SecurityGlobeMarker[]>(() => [
  ...securityFindings.map((finding) => ({
    key: finding.key,
    name: finding.name,
    lon: finding.lon,
    lat: finding.lat,
    color: finding.color,
    ldx: finding.ldx,
    ldy: finding.ldy,
  })),
  ...securityPrivateEngagements.map((engagement) => ({
    key: engagement.key,
    name: t('projects.securityHud.privateRedacted'),
    lon: engagement.lon,
    lat: engagement.lat,
    color: PRIVATE_MARKER_COLOR,
    ldx: 0,
    ldy: -26,
    dim: true,
  })),
])

const publicCount = securityFindings.length

const activeFinding = computed(() =>
  activeIndex.value >= 0 && activeIndex.value < publicCount ? securityFindings[activeIndex.value] : null,
)

function setActive(index: number) {
  activeIndex.value = index
}

function toggleActive(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<template>
  <section class="sec-stage" :aria-label="t('projects.securityHud.vulnTitle')">
    <div class="sec-topbar">
      <span><i class="sec-live"></i>{{ t('projects.securityHud.topbarHandle') }} · <b>{{ t('projects.securityHud.topbarDisclosure') }}</b></span>
      <span class="sec-topbar-mid">{{ t('projects.securityHud.topbarMode') }}</span>
      <span>{{ t('projects.securityHud.topbarLinks') }}</span>
    </div>

    <div class="sec-hero">
      <div class="sec-frame sec-hero-copy">
        <span class="sec-kicker">{{ t('projects.securityHud.eyebrow') }}</span>
        <h2 class="sec-title">
          <small>{{ t('projects.securityHud.titleSmall') }}</small>
          <span>{{ t('projects.securityHud.titleMain') }}</span>
        </h2>
        <p class="sec-seq">{{ t('projects.securityHud.sequence') }}</p>
        <p class="sec-intro">{{ t('projects.securityHud.intro') }}</p>

        <div class="sec-actions">
          <a class="sec-btn" href="https://hackerone.com/debug_denis" target="_blank" rel="noopener noreferrer">
            {{ t('projects.securityHud.ctaHackerOne') }}
            <span aria-hidden="true">↗</span>
          </a>
          <a
            class="sec-btn sec-btn--ghost"
            href="https://codeby.net/members/debug.77915/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('projects.securityHud.ctaCodeby') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

      </div>

      <div class="sec-frame sec-globe-box">
        <SecurityGlobe
          :markers="markers"
          :active-index="activeIndex"
          @hover="setActive"
          @select="toggleActive"
        >
          <div class="sec-globe-head">
            {{ t('projects.securityHud.globeTitle') }}<br />
            <b>{{ t('projects.securityHud.globeSub') }}</b>
          </div>
          <div class="sec-globe-legend">
            <span><i class="is-public"></i>{{ t('projects.securityHud.legendPublic') }}</span>
            <span><i class="is-private"></i>{{ t('projects.securityHud.legendPrivate') }}</span>
          </div>
          <div class="sec-globe-foot">{{ t('projects.securityHud.globeHint') }}</div>
        </SecurityGlobe>
      </div>

    </div>

    <div class="sec-legal-wrap">
      <div class="sec-legal-card">
        <LegalNoticeBanner class="sec-legal" />
        <span class="sec-legal-fx" aria-hidden="true"></span>
        <span class="sec-legal-tag">{{ t('projects.securityHud.restrictedTag') }}</span>
      </div>
    </div>

    <div class="sec-findings">
      <section class="sec-frame">
        <header class="sec-fd-head">
          <div>
            <span class="sec-kicker">{{ t('projects.securityHud.vulnEyebrow') }}</span>
            <strong>{{ t('projects.securityHud.vulnTitle') }}</strong>
          </div>
          <code>{{ publicCount }} {{ t('projects.securityHud.vulnCountLabel') }}</code>
        </header>

        <table class="sec-table">
          <thead>
            <tr>
              <th>{{ t('projects.securityHud.colId') }}</th>
              <th>{{ t('projects.securityHud.colTarget') }}</th>
              <th>{{ t('projects.securityHud.colClass') }}</th>
              <th>{{ t('projects.securityHud.colSeverity') }}</th>
              <th>{{ t('projects.securityHud.colStatus') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(finding, index) in securityFindings"
              :key="finding.key"
              :style="{ '--c': finding.color }"
              :class="{ 'is-active': index === activeIndex }"
              @mouseenter="setActive(index)"
              @mouseleave="setActive(-1)"
              @click="toggleActive(index)"
            >
              <td class="sec-td-id">#{{ String(index + 1).padStart(3, '0') }}</td>
              <td>
                <span class="sec-td-target"><i></i>{{ finding.name }}</span>
              </td>
              <td>{{ t(`projects.securityHud.findings.${finding.key}.class`) }}</td>
              <td>
                <span class="sec-chip">{{ t(`projects.securityHud.severity.${finding.severity}`) }}</span>
              </td>
              <td>{{ t(`projects.securityHud.findings.${finding.key}.status`) }}</td>
              <td>
                <a
                  v-if="finding.link"
                  class="sec-td-link"
                  :href="finding.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                >
                  {{ t(`projects.securityHud.links.${finding.linkLabel}`) }} ↗
                </a>
                <span v-else class="sec-td-empty">—</span>
              </td>
            </tr>
          </tbody>
        </table>

        <footer class="sec-fd-foot">
          <p v-if="activeFinding" :style="{ '--c': activeFinding.color }">
            <b>{{ activeFinding.name }}</b>
            {{ t(`projects.securityHud.findings.${activeFinding.key}.note`) }}
          </p>
          <p v-else>{{ t('projects.securityHud.disclosureNote') }}</p>
          <p class="sec-fd-nda">{{ t('projects.securityHud.privateNote') }}</p>
        </footer>
      </section>

    </div>

    <header class="sec-research-head">
      <div>
        <span class="sec-kicker">{{ t('projects.securityHud.researchEyebrow') }}</span>
        <strong>{{ t('projects.securityHud.researchTitle') }}</strong>
      </div>
      <span class="sec-kicker">{{ researchCount }} {{ t('projects.securityHud.researchCountLabel') }}</span>
    </header>

    <div class="sec-cards">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sec-stage {
  --mint: #6ef2c0;
  --line: rgba(130, 200, 255, 0.14);
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 20px;
  padding: clamp(0.7rem, 1.6vw, 1.1rem);
  background: radial-gradient(120% 90% at 16% -10%, #0e1b2a 0%, #060b16 46%, #03050b 100%);
  box-shadow:
    inset 0 0 0 1px rgba(120, 190, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 1.4rem 3rem rgba(4, 10, 18, 0.35);
  color: #e8f4f2;
}

.sec-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(90deg, rgba(120, 190, 255, 0.035) 0 1px, transparent 1px 3.2rem),
    repeating-linear-gradient(0deg, rgba(120, 190, 255, 0.028) 0 1px, transparent 1px 3.2rem);
}

.sec-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 7;
  pointer-events: none;
  opacity: 0.5;
  background:
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0 1px, transparent 1px 3px),
    radial-gradient(130% 120% at 50% 40%, transparent 55%, rgba(0, 0, 0, 0.6) 100%);
}

.sec-stage > * {
  position: relative;
  z-index: 2;
}

.sec-kicker {
  display: block;
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(110, 242, 192, 0.6);
}

.sec-frame {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(14, 26, 38, 0.72), rgba(6, 10, 18, 0.82));
  min-width: 0;
}

.sec-frame::before,
.sec-frame::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid rgba(110, 242, 192, 0.45);
}

.sec-frame::before {
  top: -1px;
  left: -1px;
  border-right: 0;
  border-bottom: 0;
}

.sec-frame::after {
  right: -1px;
  bottom: -1px;
  border-left: 0;
  border-top: 0;
}

.sec-topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem 0.6rem;
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(6, 12, 20, 0.5);
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(198, 222, 226, 0.58);
}

.sec-topbar b {
  font-weight: 600;
  color: rgba(110, 242, 192, 0.85);
}

.sec-live {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 0.4rem;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px var(--mint);
  animation: sec-blink 2.4s ease-in-out infinite;
}

@keyframes sec-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}

.sec-hero {
  position: relative;
  display: grid;
  gap: 0.6rem;
  grid-template-columns: 1fr;
}

.sec-hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.1rem 0.95rem 1rem;
}

.sec-title {
  margin: 0;
  font-size: clamp(1.6rem, 2.9vw, 2.35rem);
  line-height: 0.98;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #f2fbf8;
  text-shadow: 0 0 26px rgba(110, 242, 192, 0.14);
}

.sec-title small {
  display: block;
  margin-bottom: 0.4rem;
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  color: rgba(198, 222, 226, 0.5);
}

.sec-title span {
  display: block;
  color: rgba(110, 242, 192, 0.92);
}

.sec-seq {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(110, 242, 192, 0.7);
}

.sec-intro {
  margin: 0;
  max-width: 40ch;
  font-family: var(--mono);
  font-size: 0.7rem;
  line-height: 1.6;
  color: rgba(205, 226, 230, 0.62);
}

.sec-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.sec-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.44rem 0.7rem;
  border-radius: 8px;
  border: 1px solid rgba(110, 242, 192, 0.3);
  background: rgba(110, 242, 192, 0.07);
  text-decoration: none;
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #bdfce6;
  transition: background 0.2s ease, transform 0.2s ease;
}

.sec-btn:hover {
  background: rgba(110, 242, 192, 0.16);
  transform: translateY(-1px);
}

.sec-btn--ghost {
  border-color: rgba(130, 200, 255, 0.22);
  background: rgba(130, 200, 255, 0.05);
  color: rgba(190, 224, 246, 0.86);
}

.sec-globe-box {
  overflow: hidden;
  min-height: 340px;
}

.sec-globe-head {
  position: absolute;
  top: 0.6rem;
  left: 0.7rem;
  z-index: 3;
  pointer-events: none;
  font-family: var(--mono);
  font-size: 0.52rem;
  line-height: 1.7;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(198, 222, 226, 0.45);
}

.sec-globe-head b {
  font-weight: 600;
  color: rgba(110, 242, 192, 0.8);
}

.sec-globe-foot {
  position: absolute;
  left: 0.7rem;
  bottom: 0.55rem;
  z-index: 3;
  pointer-events: none;
  text-align: left;
  font-family: var(--mono);
  font-size: 0.5rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(198, 222, 226, 0.35);
}

.sec-sep {
  height: 1px;
  background: var(--line);
}

.sec-findings {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: 1fr;
  margin-top: 0.6rem;
}

.sec-findings > * {
  min-width: 0;
}

.sec-fd-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.09);
}

.sec-fd-head strong {
  display: block;
  margin-top: 0.18rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #eef9f5;
}

.sec-fd-head code {
  flex: none;
  padding: 0.28rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(110, 242, 192, 0.2);
  background: rgba(110, 242, 192, 0.06);
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(174, 255, 232, 0.8);
}

.sec-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--mono);
}

.sec-table th {
  padding: 0.45rem 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-align: left;
  font-size: 0.48rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(198, 222, 226, 0.36);
}

.sec-table td {
  padding: 0.5rem 0.8rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
  font-size: 0.62rem;
  color: rgba(214, 232, 236, 0.72);
  vertical-align: middle;
}

.sec-table tbody tr {
  --c: var(--mint);
  cursor: pointer;
  transition: background 0.18s ease;
}

.sec-table tbody tr:hover,
.sec-table tbody tr.is-active {
  background: color-mix(in srgb, var(--c) 7%, transparent);
}

.sec-table tbody tr:last-child td {
  border-bottom: 0;
}

.sec-td-id {
  letter-spacing: 0.1em;
  color: color-mix(in srgb, var(--c) 70%, #fff 30%);
}

.sec-td-target {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #f1f8fb;
}

.sec-td-target i {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 8px var(--c);
}

.sec-chip {
  display: inline-block;
  padding: 0.12rem 0.4rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
  background: color-mix(in srgb, var(--c) 10%, transparent);
  font-size: 0.48rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c) 72%, #fff 28%);
}

.sec-td-link {
  text-decoration: none;
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c) 75%, #fff 25%);
  border-bottom: 1px dashed color-mix(in srgb, var(--c) 40%, transparent);
}

.sec-td-empty {
  opacity: 0.35;
}

.sec-side {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.7rem 0.75rem;
}

.sec-globe-legend {
  position: absolute;
  right: 0.7rem;
  bottom: 0.5rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-end;
  pointer-events: none;
  font-family: var(--mono);
  font-size: 0.46rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(198, 222, 226, 0.4);
}

.sec-globe-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.sec-globe-legend i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.sec-globe-legend i.is-public {
  background: #ff5f52;
  box-shadow: 0 0 8px rgba(255, 95, 82, 0.8);
}

.sec-globe-legend i.is-private {
  border: 1px dashed rgba(143, 166, 184, 0.9);
}

.sec-legal-wrap {
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
  animation: sec-legal-in 0.65s cubic-bezier(0.2, 0.9, 0.3, 1) both;
}

@keyframes sec-legal-in {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.sec-legal-card {
  position: relative;
  display: inline-block;
  transform: rotate(-1.5deg);
  transform-origin: top right;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.3, 1), filter 0.35s ease;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.5));
}

.sec-legal-card:hover {
  transform: rotate(0deg) translateY(-3px);
  filter: drop-shadow(0 16px 30px rgba(0, 0, 0, 0.58));
}

/* бумажная карточка: текст темнее и крупнее, фактура слабее */
.sec-legal :deep(.absolute) {
  opacity: 0.26;
}

.sec-legal :deep(.flex-1) {
  font-size: 0.66rem;
  line-height: 1.45;
  font-weight: 500;
  color: #0a1016;
}

.sec-legal :deep(.bg-\[\#FF8A00\]) {
  font-size: 0.58rem;
  letter-spacing: 0.06em;
  color: #170b00;
}

/* «экранный» слой поверх бумаги — под характер вкладки */
.sec-legal-fx {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  border-radius: 1rem;
  pointer-events: none;
  background:
    repeating-linear-gradient(0deg, rgba(4, 20, 16, 0.12) 0 1px, transparent 1px 3px),
    linear-gradient(160deg, rgba(110, 242, 192, 0.14), rgba(86, 200, 255, 0.05) 45%, rgba(4, 10, 16, 0.16));
  box-shadow:
    inset 0 0 0 1px rgba(110, 242, 192, 0.35),
    inset 0 0 22px rgba(4, 16, 14, 0.35);
}

.sec-legal-card:hover .sec-legal-fx {
  animation: sec-legal-scan 2.4s linear infinite;
}

@keyframes sec-legal-scan {
  to {
    background-position: 0 3px, 0 0;
  }
}

.sec-legal-fx::after {
  content: '';
  position: absolute;
  top: -40%;
  right: 0;
  left: 0;
  height: 34%;
  background: linear-gradient(180deg, transparent, rgba(180, 255, 230, 0.22), transparent);
}

.sec-legal-card:hover .sec-legal-fx::after {
  animation: sec-legal-roll 2.6s linear infinite;
}

@keyframes sec-legal-roll {
  0% {
    top: -40%;
  }
  100% {
    top: 112%;
  }
}

.sec-legal-tag {
  position: absolute;
  top: -0.55rem;
  left: 0.75rem;
  z-index: 3;
  padding: 0.16rem 0.42rem;
  border: 1px solid rgba(110, 242, 192, 0.45);
  border-radius: 4px;
  background: rgba(5, 12, 18, 0.95);
  font-family: var(--mono);
  font-size: 0.46rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(174, 255, 232, 0.9);
  box-shadow: 0 0 14px rgba(110, 242, 192, 0.18);
}

.sec-fd-nda {
  margin-top: 0.4rem !important;
  padding-top: 0.4rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.07);
  font-size: 0.54rem !important;
  color: rgba(198, 222, 226, 0.4) !important;
}

.sec-fd-foot {
  padding: 0.55rem 0.8rem 0.65rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
}

.sec-fd-foot p {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.58rem;
  line-height: 1.6;
  color: rgba(205, 226, 230, 0.55);
}

.sec-fd-foot b {
  margin-right: 0.35rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.52rem;
  color: color-mix(in srgb, var(--c) 78%, #fff 22%);
}

.sec-research-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.4rem 1rem;
  margin: 1rem 0.15rem 0.55rem;
}

.sec-research-head strong {
  display: block;
  margin-top: 0.2rem;
  font-size: 1.05rem;
  font-weight: 800;
  color: #eef6fa;
}

.sec-cards {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

@media (min-width: 1000px) {
  .sec-legal-wrap {
    position: absolute;
    z-index: 9;
    top: 3.45rem;
    right: 0.85rem;
    width: 262px;
    margin-top: 0;
  }

  /* сдвигаем сферу влево, чтобы стикер не налезал на планету */
  .sec-globe-box :deep(.sec-globe-canvas) {
    right: 15%;
  }

  .sec-legal-card {
    transform: rotate(3.2deg) scale(0.88);
  }

  .sec-legal-card:hover {
    transform: rotate(0.6deg) scale(0.91) translateY(-3px);
  }

  .sec-hero {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.25fr);
  }

  .sec-findings {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 759px) {
  .sec-topbar-mid,
  .sec-globe-foot {
    display: none;
  }

  .sec-table thead {
    display: none;
  }

  .sec-table,
  .sec-table tbody,
  .sec-table tr,
  .sec-table td {
    display: block;
    width: 100%;
  }

  .sec-table tbody tr {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.12rem 0.5rem;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.07);
  }

  .sec-table td {
    padding: 0;
    border: 0;
  }

  .sec-table td:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  .sec-table td:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }

  .sec-table td:nth-child(4) {
    grid-column: 3;
    grid-row: 1;
    text-align: right;
  }

  .sec-table td:nth-child(3) {
    grid-column: 2 / 4;
    grid-row: 2;
    font-size: 0.55rem;
    opacity: 0.7;
  }

  .sec-table td:nth-child(5) {
    grid-column: 2 / 4;
    grid-row: 3;
    font-size: 0.55rem;
    opacity: 0.75;
  }

  .sec-table td:nth-child(6) {
    grid-column: 2 / 4;
    grid-row: 4;
    margin-top: 0.15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sec-live,
  .sec-legal-wrap,
  .sec-legal-fx,
  .sec-legal-fx::after {
    animation: none;
  }

  .sec-legal-card {
    transition: none;
  }

  .sec-btn {
    transition: none;
  }
}
</style>
