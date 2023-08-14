import zhCnLocale from 'element-plus/dist/locale/zh-cn.mjs';
import enLocale from 'element-plus/dist/locale/en.mjs';
import nextZhCn from './lang/zh-cn';
import nextEn from './lang/en';
import { createI18n } from 'vue-i18n';
import { themeConfig } from '../config';

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
    globalInjection: true, // 全局注册可以直接使用 $t(),$tc()
    legacy: false,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    locale: themeConfig.value.globalI18n, // 用于切换当前系统语言
    fallbackLocale: zhCnLocale.name, // 当language 不是 zh-cn,en当中的其中一种,使用zh-cn
    messages // 自定义语言包
});
