/*
 ** services/i18n.ts
 ** i18nService
 ** Vue3 TS boilerplate web app | 2022
 */

import { createI18n } from 'vue-i18n';
import { merge } from 'lodash';

import globals from '@/assets/i18n/globals.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: merge(globals)
});

export default i18n;
