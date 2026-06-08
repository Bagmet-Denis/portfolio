<script setup lang="ts">
import { saveLocale, type AppLocale } from '@/i18n'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

const { t, locale } = useI18n()
watch(locale, (value) => saveLocale(value as AppLocale))
const cvMenu = ref<HTMLDetailsElement | null>(null)

const localeOptions: Array<{ value: AppLocale; flag: string; label: string }> = [
  { value: 'ru', flag: '🇷🇺', label: 'RU' },
  { value: 'en', flag: '🇬🇧', label: 'EN' },
]

const navigationItems = [
  { key: 'home', to: '/', labelKey: 'menu.home' },
  { key: 'experience', to: '/experience', labelKey: 'menu.experience' },
  { key: 'projects', to: '/projects', labelKey: 'menu.projects' },
] as const

const cvOptions = [
  {
    value: 'ru',
    flag: '🇷🇺',
    label: 'RU CV',
    url: publicAssetUrl('cv/RU_CV_Bagmet_Denis.pdf'),
    filename: 'RU_CV_Bagmet_Denis.pdf',
  },
  {
    value: 'en',
    flag: '🇬🇧',
    label: 'EN CV',
    url: publicAssetUrl('cv/EN_CV_Bagmet_Denis.pdf'),
    filename: 'EN_CV_Bagmet_Denis.pdf',
  },
]

const selectedCv = computed(() => cvOptions.find((option) => option.value === locale.value) ?? cvOptions[0])

function setLocale(value: AppLocale) {
  locale.value = value
}

function closeCvMenu() {
  cvMenu.value?.removeAttribute('open')
}
</script>

<template>
  <header class="site-header sticky top-0 z-[1000]">
    <div class="browser-bar">
      <div class="mac-window-identity" aria-hidden="true">
        <div class="mac-traffic-lights">
          <span class="mac-traffic-light mac-traffic-light-close"></span>
          <span class="mac-traffic-light mac-traffic-light-minimize"></span>
          <span class="mac-traffic-light mac-traffic-light-expand"></span>
        </div>
        <span class="mac-window-title">Denis.portfolio</span>
      </div>

      <nav class="browser-tabs" :aria-label="locale === 'ru' ? 'Основная навигация' : 'Main navigation'">
        <ul>
          <li v-for="item in navigationItems" :key="item.key">
            <RouterLink :to="item.to" v-slot="{ isActive }">
              <span class="browser-tab" :class="{ 'browser-tab-active': isActive }">
                <span class="browser-tab-icon" :class="`browser-tab-icon-${item.key}`">
                  <svg v-if="item.key === 'home'" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m2.5 7 5.5-4.5L13.5 7v6H9.8V9.5H6.2V13H2.5Z" />
                  </svg>
                  <svg v-else-if="item.key === 'experience'" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2.2 5.2h11.6v7.6H2.2zM5.5 5.2V3.4h5v1.8M2.2 8h11.6M6.5 8v1h3V8" />
                  </svg>
                  <svg v-else viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2 4.2h4l1.1 1.3H14v7.3H2z" />
                  </svg>
                </span>
                <span class="browser-tab-label">{{ t(item.labelKey) }}</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header-controls">
        <div class="locale-switcher" :aria-label="t('controls.languageLabel')">
          <button
            v-for="option in localeOptions"
            :key="option.value"
            type="button"
            :class="{ 'locale-option-active': locale === option.value }"
            :aria-pressed="locale === option.value"
            @click="setLocale(option.value)"
          >
            <span aria-hidden="true">{{ option.flag }}</span>
            <strong>{{ option.label }}</strong>
          </button>
        </div>

        <details ref="cvMenu" class="group relative z-[1100]">
          <summary class="cv-trigger">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2v7M5.2 6.5 8 9.3l2.8-2.8M3 11.5v2h10v-2" />
            </svg>
            <span>{{ t('controls.downloadCv') }}</span>
            <span class="cv-trigger-locale">{{ selectedCv.value.toUpperCase() }}</span>
          </summary>

          <div class="cv-menu">
            <a v-for="option in cvOptions" :key="option.value" :href="option.url" :download="option.filename"
              class="cv-menu-option"
              @click="closeCvMenu">
              <span aria-hidden="true">{{ option.flag }}</span>
              <span>{{ option.label }}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2v7M5.2 6.5 8 9.3l2.8-2.8M3 11.5v2h10v-2" />
              </svg>
            </a>
          </div>
        </details>
      </div>
    </div>
  </header>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}

.site-header {
  background: #2b2724;
}

.browser-bar {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) auto minmax(8rem, 1fr);
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(74, 54, 38, 0.24);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 70%),
    #292624;
  padding: 0.52rem 0.75rem;
  box-shadow: 0 10px 24px rgba(41, 29, 24, 0.16);
}

.mac-window-identity {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.8rem;
}

.mac-traffic-lights {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.48rem;
}

.mac-traffic-light {
  width: 0.72rem;
  height: 0.72rem;
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.mac-traffic-light-close {
  background: #ff5f57;
}

.mac-traffic-light-minimize {
  background: #febc2e;
}

.mac-traffic-light-expand {
  background: #28c840;
}

.mac-window-title {
  overflow: hidden;
  color: rgba(255, 245, 239, 0.48);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.browser-tabs {
  min-width: 0;
  justify-self: center;
}

.browser-tabs ul {
  display: flex;
  align-items: center;
  gap: 0.18rem;
  border: 1px solid rgba(255, 248, 238, 0.1);
  border-radius: 10px;
  background: rgba(8, 7, 7, 0.24);
  padding: 0.2rem;
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.035);
}

.browser-tab {
  position: relative;
  display: inline-flex;
  min-width: 6.8rem;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: rgba(255, 245, 239, 0.64);
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 750;
  padding: 0.48rem 0.72rem;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 120ms ease;
}

.browser-tab:hover {
  background: rgba(255, 248, 238, 0.08);
  color: #fff5ef;
}

.browser-tab-active {
  border-color: rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent),
    #4a4642;
  color: #fffaf2;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.28);
}

.browser-tab-icon {
  display: grid;
  width: 1.1rem;
  height: 1.1rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #e2c96b;
}

.browser-tab-active .browser-tab-icon {
  color: #73bda8;
}

.browser-tab-icon-experience {
  color: #73bda8;
}

.browser-tab-icon-projects {
  color: #c98466;
}

.browser-tab-icon svg {
  width: 0.9rem;
  height: 0.9rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.header-controls {
  display: flex;
  flex: 0 0 auto;
  justify-self: end;
  align-items: center;
  gap: 0.55rem;
}

.locale-switcher {
  display: flex;
  align-items: center;
  gap: 0.18rem;
  border: 1px solid rgba(255, 245, 239, 0.16);
  border-radius: 9px;
  background: rgba(255, 250, 242, 0.06);
  padding: 0.18rem;
}

.locale-switcher button {
  display: flex;
  align-items: center;
  gap: 0.28rem;
  cursor: pointer;
  border-radius: 6px;
  color: rgba(255, 245, 239, 0.58);
  font-size: 0.62rem;
  padding: 0.38rem 0.45rem;
  transition:
    background 180ms ease,
    color 180ms ease;
}

.locale-switcher button:hover {
  color: #fff5ef;
}

.locale-switcher .locale-option-active {
  background: #f1ead8;
  color: #352a24;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}

.cv-trigger {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  border: 1px solid #7f3438;
  border-radius: 9px;
  background: #b0464a;
  color: #fff5ef;
  font-size: 0.72rem;
  font-weight: 850;
  padding: 0.55rem 0.7rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 245, 239, 0.18),
    3px 3px 0 rgba(226, 201, 107, 0.22),
    0 7px 14px rgba(61, 28, 29, 0.2);
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    transform 120ms ease;
}

.cv-trigger:hover {
  background: #bb5054;
  box-shadow:
    inset 0 1px 0 rgba(255, 245, 239, 0.2),
    2px 2px 0 rgba(226, 201, 107, 0.26),
    0 8px 16px rgba(61, 28, 29, 0.22);
  transform: translateY(-1px);
}

.cv-trigger:active,
details[open] > .cv-trigger {
  background: #973b3f;
  box-shadow:
    inset 0 2px 4px rgba(70, 24, 26, 0.3),
    1px 1px 0 rgba(226, 201, 107, 0.16);
  transform: translateY(1px);
}

.cv-trigger > svg {
  color: #ffe4d8;
}

.cv-trigger svg,
.cv-menu-option svg {
  width: 0.9rem;
  height: 0.9rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
}

.cv-trigger-locale {
  border-left: 1px solid rgba(255, 245, 239, 0.26);
  color: rgba(255, 245, 239, 0.72);
  font-size: 0.58rem;
  padding-left: 0.45rem;
}

.cv-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.55rem);
  z-index: 1100;
  min-width: 10rem;
  border: 1px solid rgba(74, 54, 38, 0.18);
  border-radius: 11px;
  background:
    linear-gradient(rgba(72, 54, 37, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(72, 54, 37, 0.035) 1px, transparent 1px),
    rgba(241, 234, 216, 0.97);
  background-size: 14px 14px;
  padding: 0.35rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 250, 242, 0.7),
    0 18px 40px rgba(41, 29, 24, 0.26);
  backdrop-filter: blur(14px);
}

.cv-menu-option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.55rem;
  border-radius: 9px;
  color: #4f4038;
  font-size: 0.75rem;
  font-weight: 750;
  padding: 0.6rem 0.65rem;
  transition:
    background 180ms ease,
    color 180ms ease;
}

.cv-menu-option:hover {
  background: #ded2c2;
  color: #71363a;
  box-shadow:
    inset 3px 0 0 #b0464a,
    0 2px 6px rgba(74, 54, 38, 0.08);
}

@media (max-width: 720px) {
  .browser-bar {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.35rem;
    padding-bottom: 0.42rem;
    padding-top: 0.42rem;
    padding-left: 0.35rem;
    padding-right: 0.35rem;
  }

  .mac-window-identity {
    display: none;
  }

  .browser-tabs {
    justify-self: start;
  }

  .browser-tabs ul {
    gap: 0.12rem;
  }

  .browser-tab {
    min-width: 0;
    gap: 0.32rem;
    font-size: 0.66rem;
    padding: 0.42rem 0.5rem;
  }

  .browser-tab-icon {
    width: 1rem;
    height: 1rem;
  }

  .header-controls {
    gap: 0.3rem;
  }

  .locale-switcher button {
    padding: 0.34rem;
  }

  .locale-switcher button span {
    display: none;
  }

  .cv-trigger {
    padding: 0.5rem;
  }

  .cv-trigger > span:not(.cv-trigger-locale) {
    display: none;
  }

  .cv-trigger-locale {
    border-left: 0;
    padding-left: 0;
  }
}

@media (max-width: 420px) {
  .browser-tab-icon {
    display: none;
  }

  .browser-tab {
    padding-left: 0.42rem;
    padding-right: 0.42rem;
  }
}
</style>
