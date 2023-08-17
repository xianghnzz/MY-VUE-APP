import type { App } from 'vue';
import SvgIcon from '@/components/svgIcon.vue';
import 'virtual:svg-icons-register';

export const loadSvg = (app: App): void => {
    app.component('SvgIcon', SvgIcon);
};
