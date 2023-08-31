/**core */
import { createApp } from 'vue';
import App from '@/App.vue';
import { i18n } from '@/i18n';
import router from './router';
import { loadSvg } from '@/icons';
import 'default-passive-events';
/**css */
import './styles/index.scss';

const app = createApp(App);
const store = createPinia();
app.use(i18n);
app.use(store);
app.use(router);
loadSvg(app);
app.mount('#app');
