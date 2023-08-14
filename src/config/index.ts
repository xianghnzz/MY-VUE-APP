import { useAppStoreHook } from '../store/app';

const appStore = useAppStoreHook();
appStore.toggleLanguage(appStore.language);
export const themeConfig = ref({
    // 默认初始语言，可选值"<zh-cn|en>"，默认 zh-cn
    globalI18n: appStore.language
});
