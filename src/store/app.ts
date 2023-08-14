const store = createPinia();

export const useAppStore = defineStore('app', () => {
    const language: Ref = ref('zh-cn');
    return { language };
});
export const useAppStoreHook = () => {
    return useAppStore(store);
};
