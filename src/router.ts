import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import ExperiencePage from './pages/ExperiencePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import HeroLabPage from './pages/HeroLabPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    // Песочница эффекта хиро: подбор параметров на живых карточках.
    { path: '/hero-lab', name: 'hero-lab', component: HeroLabPage },
    { path: '/experience', name: 'experience', component: ExperiencePage },
    { path: '/projects', name: 'projects', component: ProjectsPage },
  ],
})
