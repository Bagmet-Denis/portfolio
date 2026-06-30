<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  categoryAccentClasses,
  categoryOptions,
  categoryTicketCodes,
} from '@/pages/projects/projectsPageConfig'
import type { ProjectCategory, ProjectClientCountry } from '@/types/projectCard'

const props = defineProps<{
  activeCategory: ProjectCategory
  categoryCounts: Record<ProjectCategory, number>
  mobileProjectCountries: ProjectClientCountry[]
}>()

const emit = defineEmits<{
  'update:activeCategory': [category: ProjectCategory]
}>()

const { t, locale } = useI18n()

const activeCategoryLabel = computed(() => {
  const option = categoryOptions.find((category) => category.key === props.activeCategory)
  return t(option?.labelKey ?? 'projects.title')
})

const activeCategoryMeta = computed(() => ({
  eyebrow: t(`projects.categoryMeta.${props.activeCategory}.eyebrow`),
  description: t(`projects.categoryMeta.${props.activeCategory}.description`),
}))

function selectCategory(category: ProjectCategory) {
  emit('update:activeCategory', category)
}
</script>

<template>
  <section class="projects-passport-board relative overflow-hidden">
    <div class="projects-passport-board__texture" aria-hidden="true"></div>

    <div class="projects-passport-board__top">
      <div class="projects-passport-board__route">
        <span>{{ locale.startsWith('ru') ? 'Портфолио багаж' : 'Portfolio baggage' }}</span>
        <strong>{{ locale.startsWith('ru') ? 'Выбор направления' : 'Choose destination' }}</strong>
      </div>
      <span class="projects-passport-board__stamp">
        {{ categoryCounts[activeCategory] }}
        {{ locale.startsWith('ru') ? 'кейсов' : 'cases' }}
      </span>
    </div>

    <div class="projects-passport-board__main">
      <div class="projects-destination-tag">
        <div class="projects-destination-tag__hole" aria-hidden="true"></div>
        <div class="projects-destination-tag__frame">
          <span>{{ locale.startsWith('ru') ? 'Активная выборка' : 'Active collection' }}</span>
          <strong>{{ categoryTicketCodes[activeCategory] }}</strong>
          <p>{{ activeCategoryLabel }}</p>
        </div>
        <div class="projects-destination-tag__meta">
          <span>{{ activeCategoryMeta.eyebrow }}</span>
          <span>{{ categoryCounts[activeCategory] }} {{ locale.startsWith('ru') ? 'шт.' : 'pcs' }}</span>
        </div>
      </div>

      <div class="projects-boarding-pass">
        <div class="projects-boarding-pass__side">
          {{ locale.startsWith('ru') ? 'Проекты' : 'Projects' }}
        </div>
        <div class="projects-boarding-pass__content">
          <p>{{ locale.startsWith('ru') ? 'Каталог реализованных решений' : 'Shipped solutions catalog' }}</p>
          <h1>{{ t('projects.title') }}</h1>
          <p>{{ t('projects.subtitle') }}</p>
          <div class="projects-boarding-pass__description">
            {{ activeCategoryMeta.description }}
          </div>
        </div>
      </div>
    </div>

    <div class="projects-ticket-grid" role="tablist" :aria-label="t('projects.controlEyebrow')">
      <button
        v-for="category in categoryOptions"
        :key="category.key"
        type="button"
        class="projects-ticket-tab"
        :class="{ 'projects-ticket-tab--active': activeCategory === category.key }"
        role="tab"
        :aria-selected="activeCategory === category.key"
        @click="selectCategory(category.key)"
      >
        <span class="projects-ticket-tab__code" :class="categoryAccentClasses[category.key]">
          {{ categoryTicketCodes[category.key] }}
        </span>
        <span class="projects-ticket-tab__copy">
          <small>{{ t(`projects.categoryMeta.${category.key}.eyebrow`) }}</small>
          <strong>{{ t(category.labelKey) }}</strong>
        </span>
        <span class="projects-ticket-tab__count">{{ categoryCounts[category.key] }}</span>
      </button>
    </div>

    <div v-if="activeCategory === 'mobile'" class="projects-market-stamps">
      <div class="projects-market-stamps__heading">
        <span></span>
        <strong>Deployments</strong>
        <code>markets</code>
      </div>
      <div class="projects-market-stamps__list">
        <span
          v-for="country in mobileProjectCountries"
          :key="country.name"
          class="projects-market-stamp"
        >
          <img
            v-if="country.flagUrl"
            :src="country.flagUrl"
            :alt="country.name"
            class="projects-market-stamp__flag"
          >
          <span v-else class="projects-market-stamp__emoji">{{ country.flagEmoji }}</span>
          <strong>{{ country.name }}</strong>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-passport-board {
  isolation: isolate;
  border: 1px solid rgba(10, 8, 7, 0.72);
  background:
    radial-gradient(circle at 10% 16%, rgba(255, 255, 255, 0.09) 0 1px, transparent 2px),
    radial-gradient(circle at 54% 42%, rgba(255, 255, 255, 0.06) 0 1px, transparent 2px),
    linear-gradient(135deg, #181512, #2b231d 58%, #171412);
  background-size: 16px 16px, 22px 22px, auto;
  box-shadow:
    0 24px 56px rgba(42, 28, 20, 0.24),
    inset 0 0 0 1px rgba(255, 238, 205, 0.08);
  color: #f7ead4;
  padding: 0.8rem;
}

.projects-passport-board__texture {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(45deg, rgba(255, 255, 255, 0.025) 25%, transparent 25% 50%, rgba(255, 255, 255, 0.025) 50% 75%, transparent 75%),
    linear-gradient(135deg, rgba(0, 0, 0, 0.28), transparent 38%, rgba(0, 0, 0, 0.18));
  background-size: 6px 6px, auto;
  opacity: 0.7;
}

.projects-passport-board__top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(247, 234, 212, 0.2);
  border-bottom: 0;
  padding: 0.7rem 0.85rem;
  text-transform: uppercase;
}

.projects-passport-board__route {
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: 0.75rem;
}

.projects-passport-board__route span {
  color: #dfa05d;
  font-size: 0.66rem;
  font-weight: 950;
  letter-spacing: 0.14em;
}

.projects-passport-board__route strong {
  overflow: hidden;
  color: #f7ead4;
  font-size: 0.72rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-passport-board__stamp {
  flex: 0 0 auto;
  border: 2px solid rgba(172, 80, 69, 0.82);
  color: #dfa05d;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 950;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.55rem;
  transform: rotate(-1.5deg);
}

.projects-passport-board__main {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.85rem;
  border: 1px solid rgba(247, 234, 212, 0.2);
  padding: 0.85rem;
}

.projects-destination-tag {
  position: relative;
  min-height: 14rem;
  background: #f40b25;
  color: white;
  clip-path: polygon(6% 0, 100% 0, 100% 100%, 6% 100%, 0 90%, 0 10%);
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.28);
}

.projects-destination-tag__hole {
  position: absolute;
  left: 1.55rem;
  top: 50%;
  z-index: 2;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background:
    radial-gradient(circle, #221c17 0 38%, rgba(255, 255, 255, 0.2) 39% 50%, transparent 51%);
  transform: translateY(-50%);
}

.projects-destination-tag__frame {
  position: absolute;
  inset: 1rem 1rem 3.45rem 5rem;
  border: 1px solid rgba(255, 255, 255, 0.78);
  padding: 0.85rem 1rem;
}

.projects-destination-tag__frame span {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.68rem;
  font-weight: 950;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projects-destination-tag__frame strong {
  display: block;
  margin-top: 0.55rem;
  font-size: clamp(3.35rem, 16vw, 7rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.78;
}

.projects-destination-tag__frame p {
  margin-top: 0.65rem;
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1.1;
  text-transform: uppercase;
}

.projects-destination-tag__meta {
  position: absolute;
  inset-inline: 5rem 1rem;
  bottom: 0.85rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.82);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
}

.projects-destination-tag__meta span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-boarding-pass {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  min-height: 14rem;
  background:
    repeating-linear-gradient(-28deg, rgba(172, 80, 69, 0.12) 0 2px, transparent 2px 7px),
    #f5dfb8;
  color: #171412;
  clip-path: polygon(0 0, calc(100% - 1.4rem) 0, 100% 1.4rem, 100% 100%, 0 100%);
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.24);
}

.projects-boarding-pass__side {
  display: grid;
  place-items: center;
  border-right: 2px solid #123552;
  color: #123552;
  font-size: 0.74rem;
  font-weight: 950;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.projects-boarding-pass__content {
  padding: 1rem;
}

.projects-boarding-pass__content > p:first-child {
  color: #ac5045;
  font-size: 0.72rem;
  font-weight: 950;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projects-boarding-pass__content h1 {
  margin-top: 0.35rem;
  color: #123552;
  font-size: clamp(2.15rem, 8vw, 4.2rem);
  font-weight: 950;
  line-height: 0.9;
}

.projects-boarding-pass__content > p:nth-child(3) {
  max-width: 39rem;
  margin-top: 0.7rem;
  color: rgba(23, 20, 18, 0.74);
  font-size: 0.92rem;
  font-weight: 750;
  line-height: 1.5;
}

.projects-boarding-pass__description {
  margin-top: 0.95rem;
  border-top: 2px solid rgba(18, 53, 82, 0.28);
  color: rgba(18, 53, 82, 0.88);
  font-size: 0.78rem;
  font-weight: 850;
  line-height: 1.5;
  padding-top: 0.8rem;
}

.projects-ticket-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.65rem;
  padding-top: 0.85rem;
}

.projects-ticket-tab {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  min-height: 5rem;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  border: 0;
  background:
    repeating-linear-gradient(45deg, rgba(18, 53, 82, 0.08) 0 2px, transparent 2px 7px),
    #f8ead0;
  color: #171412;
  clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 0 100%);
  padding: 0.75rem 0.85rem;
  text-align: left;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.projects-ticket-tab::after {
  content: "";
  position: absolute;
  inset-block: 0.65rem;
  right: 3.15rem;
  border-right: 2px dashed rgba(18, 53, 82, 0.26);
}

.projects-ticket-tab:hover {
  background:
    repeating-linear-gradient(45deg, rgba(18, 53, 82, 0.1) 0 2px, transparent 2px 7px),
    #fff3df;
  box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.22);
  transform: translateY(-2px);
}

.projects-ticket-tab--active {
  background:
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0 2px, transparent 2px 7px),
    #dfa05d;
  box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.24);
}

.projects-ticket-tab:focus-visible {
  outline: 3px solid #78c8d3;
  outline-offset: 3px;
}

.projects-ticket-tab__code {
  display: grid;
  min-width: 3.2rem;
  height: 3.2rem;
  place-items: center;
  color: white;
  font-size: 1.05rem;
  font-weight: 950;
  letter-spacing: 0.02em;
}

.projects-ticket-tab__copy {
  min-width: 0;
}

.projects-ticket-tab__copy small,
.projects-ticket-tab__copy strong {
  display: block;
}

.projects-ticket-tab__copy small {
  overflow: hidden;
  color: rgba(18, 53, 82, 0.66);
  font-size: 0.58rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.projects-ticket-tab__copy strong {
  margin-top: 0.16rem;
  overflow-wrap: anywhere;
  color: #123552;
  font-size: 0.96rem;
  font-weight: 950;
  line-height: 1.1;
}

.projects-ticket-tab__count {
  position: relative;
  z-index: 1;
  display: grid;
  min-width: 2.2rem;
  height: 2.2rem;
  place-items: center;
  border: 2px solid rgba(18, 53, 82, 0.62);
  color: #123552;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.84rem;
  font-weight: 950;
}

.projects-market-stamps {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.85rem;
  border: 1px solid rgba(247, 234, 212, 0.16);
  background: rgba(10, 8, 7, 0.24);
  padding: 0.62rem 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.projects-market-stamps__heading {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.4rem;
}

.projects-market-stamps__heading span {
  width: 0.5rem;
  height: 0.5rem;
  background: #658761;
  box-shadow: 3px 3px 0 rgba(101, 135, 97, 0.24);
}

.projects-market-stamps__heading strong {
  color: #f7ead4;
  font-size: 0.68rem;
}

.projects-market-stamps__heading code {
  color: rgba(247, 234, 212, 0.56);
  font-size: 0.64rem;
}

.projects-market-stamps__list {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  gap: 0.55rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.projects-market-stamps__list::-webkit-scrollbar {
  display: none;
}

.projects-market-stamp {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.32rem;
  border: 1px solid rgba(223, 160, 93, 0.34);
  color: rgba(247, 234, 212, 0.78);
  padding: 0.28rem 0.4rem;
  transform: rotate(-0.6deg);
}

.projects-market-stamp:nth-child(2n) {
  transform: rotate(0.7deg);
}

.projects-market-stamp strong {
  font-size: 0.61rem;
  font-weight: 850;
  white-space: nowrap;
}

.projects-market-stamp__flag {
  width: 1.25rem;
  height: 0.8rem;
  flex: 0 0 auto;
  border-radius: 2px;
  object-fit: contain;
  filter: saturate(0.86);
}

.projects-market-stamp__emoji {
  width: 1.25rem;
  font-size: 0.8rem;
  text-align: center;
}

@media (min-width: 760px) {
  .projects-passport-board__main {
    grid-template-columns: minmax(19rem, 0.9fr) minmax(0, 1.1fr);
    align-items: stretch;
  }

  .projects-ticket-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1180px) {
  .projects-ticket-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .projects-passport-board {
    padding: 0.55rem;
  }

  .projects-passport-board__top {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects-passport-board__route {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.2rem;
  }

  .projects-destination-tag {
    min-height: 12.5rem;
  }

  .projects-destination-tag__frame {
    inset: 0.85rem 0.85rem 3.1rem 4.25rem;
    padding: 0.7rem 0.75rem;
  }

  .projects-destination-tag__hole {
    left: 1.25rem;
  }

  .projects-destination-tag__meta {
    inset-inline: 4.25rem 0.85rem;
  }

  .projects-boarding-pass {
    grid-template-columns: 2.6rem minmax(0, 1fr);
    min-height: 12.5rem;
  }

  .projects-boarding-pass__content {
    padding: 0.85rem;
  }

  .projects-ticket-tab {
    min-height: 4.55rem;
  }

  .projects-market-stamps {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects-market-stamps__heading code {
    display: none;
  }

  .projects-market-stamps__list {
    width: 100%;
  }
}

@media (min-width: 1600px) {
  .projects-passport-board {
    padding: 1rem;
  }

  .projects-passport-board__main {
    gap: 1rem;
    padding: 1rem;
  }

  .projects-destination-tag,
  .projects-boarding-pass {
    min-height: 16rem;
  }

  .projects-boarding-pass__content > p:nth-child(3) {
    font-size: 1.02rem;
  }

  .projects-boarding-pass__description {
    font-size: 0.9rem;
  }

  .projects-ticket-tab {
    min-height: 5.6rem;
  }

  .projects-ticket-tab__copy strong {
    font-size: 1.08rem;
  }
}
</style>
