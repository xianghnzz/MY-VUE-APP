const SYSTEM_NAME = 'SYSTEM';

/** 缓存数据时用到的 Key */
class CacheKey {
    static TOKEN = `${SYSTEM_NAME}-token`; // token
    static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status`; // 菜单状态
    static LANGUAGE = `${SYSTEM_NAME}-language`; // 系统当前语言
    static USERNAME = `${SYSTEM_NAME}-username`; // 用户名
}

export default CacheKey;
