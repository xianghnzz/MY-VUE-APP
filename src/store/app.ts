import { getSidebarStatus, setLanguage, setSidebarStatus } from '@/utils/cache/localStorage';

const store = createPinia();

export const useAppStore = defineStore('app', () => {
    /**系统语言 */
    const language: Ref = ref('zh-cn');
    const toggleLanguage = (lang: string): void => {
        language.value = lang;
        setLanguage(lang);
    };
    /**菜单栏设置 */
    const sidebarIsOpen: Ref<boolean> = ref(getSidebarStatus() !== 'closed');
    /**切换菜单栏状态 */
    const toggleSidebar = (): void => {
        sidebarIsOpen.value = !sidebarIsOpen.value;
        if (sidebarIsOpen.value) {
            setSidebarStatus('opened');
        } else {
            setSidebarStatus('closed');
        }
    };
    return { language, toggleLanguage, sidebarIsOpen, toggleSidebar };
});
export const useAppStoreHook = () => {
    return useAppStore(store);
};
