/**深拷贝 */
export const deepClone = (dataSource: any) => {
    const cloneData = Array.isArray(dataSource) ? ([] as any[]) : ({} as { [key: string]: any });
    if (dataSource && typeof dataSource === 'object') {
        for (const key in dataSource) {
            if (dataSource[key] && typeof dataSource[key] === 'object') {
                cloneData[key] = deepClone(dataSource[key]);
            } else {
                cloneData[key] = dataSource[key];
            }
        }
        return cloneData;
    }
    return dataSource;
};
