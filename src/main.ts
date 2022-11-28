/*
 ** main.ts
 ** Vue3 TS boilerplate web app | 2022
 */

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';

import i18n from '@/services/i18n';

import '@/assets/stylesheets/app.scss';

const app = createApp(App).use(createPinia()).use(router).use(i18n);

router.isReady().then(() => app.mount('#app'));

export { app };
