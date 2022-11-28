/*
 ** router/index.ts
 ** main router file
 ** Vue3 TS boilerplate web app | 2022
 */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/TheDashboard.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { selector: to.hash };
    return savedPosition ? savedPosition : { top: 0, behavior: 'smooth' };
  }
});

export default router;
