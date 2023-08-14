/**设置当前语言 */
export const setLanguage = (payload: string): void => {
    localStorage.setItem('language', payload);
};
/**获取当前语言 */
export const getLanguage = (): string => {
    const data: any = localStorage.getItem('language');
    return data;
};
