import CacheKey from '@/constants/cacheKey';

/**设置当前语言 */
export const setLanguage = (payload: string): void => {
    localStorage.setItem(CacheKey.LANGUAGE, payload);
};
/**获取当前语言 */
export const getLanguage = (): string | null => {
    return localStorage.getItem(CacheKey.LANGUAGE);
};

/**设置菜单栏状态 */
export const setSidebarStatus = (payload: string): void => {
    localStorage.setItem(CacheKey.SIDEBAESTATUS, payload);
};
/**获取菜单栏状态 */
export const getSidebarStatus = (): string | null => {
    return localStorage.getItem(CacheKey.SIDEBAESTATUS);
};
