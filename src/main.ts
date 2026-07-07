import { createApp } from 'vue';

import App from './App.vue';
import { setupApp } from './app';
import './styles/index.css';

const app = createApp(App);

setupApp(app);

app.mount('#app');

