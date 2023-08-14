import { setLanguage } from '../utils/cache/localStorage';

const store = createPinia();

export const useAppStore = defineStore('app', () => {
    const language: Ref = ref('zh-cn');
    const toggleLanguage = (lang: string): void => {
        setLanguage(lang);
    };
    return { language, toggleLanguage };
});
export const useAppStoreHook = () => {
    return useAppStore(store);
};
