import CacheKey from '@/constants/cacheKey';

/**设置当前语言 */
export const setLanguage = (payload: string): void => {
    localStorage.setItem(CacheKey.LANGUAGE, payload);
};
/**获取当前语言 */
export const getLanguage = (): string => {
    const data: any = localStorage.getItem(CacheKey.LANGUAGE);
    return data;
};
