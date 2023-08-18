/**校验是否是外部链接 */
export const isExternal = (path: string) => {
    const reg = /^(https?:|mailto:|tel:)/;
    return reg.test(path);
};
