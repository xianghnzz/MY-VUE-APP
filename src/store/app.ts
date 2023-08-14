import { setLanguage } from '@/utils/cache/localStorage';

const store = createPinia();

export const useAppStore = defineStore('app', () => {
    /**系统语言 */
    const language: Ref = ref('zh-cn');
    const toggleLanguage = (lang: string): void => {
        language.value = lang;
        setLanguage(lang);
    };
    return { language, toggleLanguage };
});
export const useAppStoreHook = () => {
    return useAppStore(store);
};
