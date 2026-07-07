import type { App } from 'vue';

import { createPinia } from 'pinia';

import { router } from './router';

export const setupApp = (app: App) => {
  app.use(createPinia());
  app.use(router);
};

