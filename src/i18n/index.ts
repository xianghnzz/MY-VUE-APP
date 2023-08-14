import zhCnLocale from 'element-plus/dist/locale/zh-cn.mjs';
import enLocale from 'element-plus/dist/locale/en.mjs';
import nextZhCn from './lang/zh-cn';
import nextEn from './lang/en';
import { createI18n } from 'vue-i18n';

const messages = {
    [zhCnLocale.name]: {
        ...zhCnLocale,
        plm: { ...nextZhCn }
    },
    [enLocale.name]: {
        ...enLocale,
        plm: { ...nextEn }
    }
};

export const i18n = createI18n({
    // globalInjection: true,
    // legacy: false,
    // silentTranslationWarn: true,
    // missingWarn: false,
    // silentFallbackWarn: true,
    // fallbackWarn: false,
    // locale: themeConfig.value.globalI18n, // 采用全局参数配置初始化语言 项目中有`zh-cn`、`en`两种
    // fallbackLocale: zhCnLocale.name,
    messages
});
