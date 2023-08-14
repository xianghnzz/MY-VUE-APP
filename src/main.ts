/**core */
import { createApp } from 'vue';
import App from '@/App.vue';
import { i18n } from '@/i18n';
/**css */
import './styles/index.scss';

const app = createApp(App);
const store = createPinia();
app.use(i18n);
app.use(store);
app.mount('#app');
