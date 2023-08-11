<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import path from 'path-browserify';
import { useAppStoreHook } from '@/store/app';
import { i18n } from '@/i18n';
import SidebarItemLink from './SidebarItemLink.vue';
import { isExternal } from '@/utils/validate';

const t = i18n.global.t;
const appStore = useAppStoreHook();

const props = defineProps({
    item: {
        type: Object as PropType<RouteRecordRaw>,
        required: true
    },
    isCollapse: {
        type: Boolean,
        default: false
    },
    isFirstLevel: {
        type: Boolean,
        default: true
    },
    basePath: {
        type: String,
        default: ''
    }
});
/**子菜单数量 */
const showingChildNumber = computed(() => {
    if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
            return !(item.meta && item.meta.hidden);
        });
        return showingChildren.length;
    }
    return 0;
});
/**只有一个子菜单or 没有子菜单 */
const theOnlyOneChild = computed(() => {
    if (showingChildNumber.value > 1) {
        return null;
    }
    if (props.item.children) {
        for (const child of props.item.children) {
            if (!child.meta || !child.meta.hidden) {
                child.meta!.svgIcon = props.item.meta?.svgIcon;
                return child;
            }
        }
    }
    return { ...props.item, path: '' };
});
/**始终显示各节点菜单 */
const alwaysShowRootMenu = computed(() => {
    return props.item.meta && props.item.meta.alwaysShow;
});
/**路由拼接 */
const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
        return routePath;
    }
    if (isExternal(props.basePath)) {
        return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
};
</script>

<template>
    <div
        v-if="!props.item.meta?.hidden"
        :class="{
            'simple-mode': props.isCollapse,
            'first-level': props.isFirstLevel
        }"
    >
        <!-- 只有一个菜单 -->
        <template
            v-if="
                !alwaysShowRootMenu &&
                theOnlyOneChild &&
                !theOnlyOneChild.children
            "
        >
            <SidebarItemLink
                v-if="theOnlyOneChild.meta"
                :to="resolvePath(theOnlyOneChild.path)"
            >
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <div
                        class="icon-continar"
                        v-if="theOnlyOneChild.meta.svgIcon"
                    >
                        <svg-icon :name="theOnlyOneChild.meta.svgIcon" />
                    </div>
                    <template v-if="theOnlyOneChild.meta.title" #title>
                        <span>
                            {{
                                appStore.language === 'en'
                                    ? (theOnlyOneChild.meta.titleEn as string)
                                    : theOnlyOneChild.meta.title
                            }}
                        </span>
                    </template>
                </el-menu-item>
            </SidebarItemLink>
        </template>
        <!-- 多级菜单 -->
        <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
            <template #title>
                <div
                    class="icon-continar"
                    v-if="props.item.meta && props.item.meta.svgIcon"
                >
                    <svg-icon :name="props.item.meta.svgIcon" />
                </div>
                <span v-if="props.item.meta && props.item.meta.title">
                    {{
                        appStore.language === 'en'
                            ? props.item.meta.titleEn
                            : props.item.meta.title
                    }}
                </span>
            </template>
            <template v-if="props.item.children">
                <sidebar-item
                    v-for="child in props.item.children"
                    :key="child.path"
                    :item="child"
                    :is-collapse="props.isCollapse"
                    :is-first-level="false"
                    :base-path="resolvePath(child.path)"
                />
            </template>
        </el-sub-menu>
    </div>
</template>

<style lang="scss" scoped>
.icon-continar {
    display: inline-flex;
    margin-right: 12px;
    width: 20px;
}

.c-svg-icon {
    width: 20px;
    font-size: 18px;
}

.el-icon {
    width: 20px;
    font-size: 18px;
}

.el-menu--popup-container {
    .simple-mode {
        & > a > .el-menu-item {
            height: 48px;
            margin-top: 0;
        }
    }
}

.simple-mode {
    overflow: hidden;

    & > a > .el-menu-item {
        height: 50px;
        margin-top: 20px;

        &.is-active {
            .icon-continar {
                background: rgba($color: #ffffff, $alpha: 0.5);
            }
        }

        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    }

    .el-sub-menu {
        height: 50px;
        margin-top: 20px;

        &.is-active {
            .icon-continar {
                background: rgba($color: #ffffff, $alpha: 0.5);
            }
        }
    }

    .icon-continar {
        width: 50px;
        height: 50px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 3px;
        margin-right: 0;
    }

    .el-icon {
        font-size: 30px;
        width: 30px;
        margin-right: 0;
    }

    .c-svg-icon {
        font-size: 30px;
        width: 30px;
        margin-right: 0;
    }

    &.first-level {
        :deep(.el-sub-menu) {
            .el-sub-menu__icon-arrow {
                display: none;
            }

            span {
                display: none;
            }
        }
    }
}
</style>
