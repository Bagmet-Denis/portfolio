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
        <span class="mac-window-title">Denis Bagmet</span>
      </div>

      <nav class="browser-tabs" :aria-label="locale === 'ru' ? 'Основная навигация' : 'Main navigation'">
        <ul>
          <li v-for="item in navigationItems" :key="item.key">
            <RouterLink :to="item.to" v-slot="{ isActive }">
              <span class="browser-tab" :class="{ 'browser-tab-active': isActive }">
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
  background: rgba(32, 30, 28, 0.94);
  backdrop-filter: blur(18px);
}

.browser-bar {
  display: grid;
  grid-template-columns: minmax(10rem, 1fr) auto minmax(10rem, 1fr);
  min-width: 0;
  align-items: center;
  gap: 1rem;
  background:
    linear-gradient(180deg, rgba(255, 245, 239, 0.045), transparent 100%),
    rgba(31, 29, 27, 0.96);
  padding: 0.68rem 0.9rem;
  box-shadow: 0 8px 22px rgba(20, 18, 16, 0.16);
}

.mac-window-identity {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.65rem;
}

.mac-window-title {
  overflow: hidden;
  color: rgba(255, 247, 239, 0.86);
  font-size: 0.78rem;
  font-weight: 760;
  letter-spacing: 0.01em;
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
  gap: 1.35rem;
  background: transparent;
  padding: 0;
}

.browser-tab {
  position: relative;
  display: inline-flex;
  min-width: 0;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: rgba(255, 245, 239, 0.54);
  cursor: pointer;
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 0.32rem 0;
  transition:
    color 180ms ease;
}

.browser-tab::after {
  position: absolute;
  right: 0;
  bottom: -0.32rem;
  left: 0;
  height: 1px;
  border-radius: 999px;
  background: #d8c8b6;
  content: "";
  opacity: 0;
  transform: scaleX(0.62);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.browser-tab:hover {
  color: rgba(255, 245, 239, 0.84);
}

.browser-tab-active {
  color: #fff7ef;
}

.browser-tab-active::after {
  opacity: 0.72;
  transform: scaleX(1);
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
  gap: 0;
  border: 1px solid rgba(255, 245, 239, 0.12);
  border-radius: 999px;
  background: rgba(255, 250, 242, 0.035);
  padding: 0.16rem;
}

.locale-switcher button {
  display: flex;
  align-items: center;
  gap: 0.28rem;
  cursor: pointer;
  border-radius: 999px;
  color: rgba(255, 245, 239, 0.52);
  font-size: 0.62rem;
  padding: 0.36rem 0.5rem;
  transition:
    background 180ms ease,
    color 180ms ease;
}

.locale-switcher button:hover {
  color: #fff5ef;
}

.locale-switcher .locale-option-active {
  background: rgba(255, 245, 239, 0.9);
  color: #2f2925;
  box-shadow: none;
}

.cv-trigger {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  border: 1px solid rgba(255, 245, 239, 0.16);
  border-radius: 999px;
  background: rgba(255, 245, 239, 0.075);
  color: rgba(255, 245, 239, 0.88);
  font-size: 0.72rem;
  font-weight: 760;
  padding: 0.48rem 0.68rem;
  box-shadow: none;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 120ms ease;
}

.cv-trigger:hover {
  border-color: rgba(255, 245, 239, 0.28);
  background: rgba(255, 245, 239, 0.11);
  color: #fff7ef;
}

.cv-trigger:active,
details[open] > .cv-trigger {
  background: rgba(255, 245, 239, 0.14);
  transform: translateY(1px);
}

.cv-trigger > svg {
  color: rgba(255, 245, 239, 0.78);
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
  border-left: 1px solid rgba(255, 245, 239, 0.18);
  color: rgba(255, 245, 239, 0.58);
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
    gap: 0.52rem;
  }

  .browser-tab {
    min-width: 0;
    gap: 0.32rem;
    font-size: 0.66rem;
    padding: 0.42rem 0.1rem;
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
  .browser-tab {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }

  .browser-tab::after {
    right: 0;
    left: 0;
  }
}
</style>
