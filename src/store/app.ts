import { setLanguage, setSidebarStatus } from '@/utils/cache/localStorage';

const store = createPinia();

export const useAppStore = defineStore('app', () => {
    /**系统语言 */
    const language: Ref = ref('zh-cn');
    const toggleLanguage = (lang: string): void => {
        language.value = lang;
        setLanguage(lang);
    };
    /**菜单栏设置 */
    const sidebar: { opened: boolean; withAnimation: boolean } = reactive({
        opened: true,
        withAnimation: true
    });
    /**切换菜单栏状态 */
    const toggleSidebar = (withAnimation: boolean): void => {
        sidebar.opened = !sidebar.opened;
        sidebar.withAnimation = withAnimation;
        if (sidebar.opened) {
            setSidebarStatus('opened');
        } else {
            setSidebarStatus('closed');
        }
    };
    return { language, toggleLanguage, sidebar, toggleSidebar };
});
export const useAppStoreHook = () => {
    return useAppStore(store);
};
