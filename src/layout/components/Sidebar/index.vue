<script lang="ts" setup>
import { useAppStoreHook } from '@/store/app';
import { usePermissionStoreHook } from '@/store/permission';
import SidebarItem from './SidebarItem.vue';
import { i18n } from '@/i18n';

const t = i18n.global.t;

/**菜单展开闭合 */
const route = useRoute();
const appStore = useAppStoreHook();
const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta?.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});
const isCollapse = computed(() => {
    return !appStore.sidebar.opened;
});
/**动态菜单树 */
const permissionStore = usePermissionStoreHook();
</script>

<template>
    <div class="c-slidebar">
        <router-link to="/">
            <div :class="['c-slidebar__logo', isCollapse ? 'collapse' : '']">
                FRS
            </div>
        </router-link>
        <el-scrollbar
            :class="['c-slidebar__body', isCollapse ? 'collapse' : '']"
            wrap-class="c-slidebar__wrapper"
        >
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="#003a5a"
                text-color="#ffffff"
                active-text-color="#ffffff"
                :unique-opened="true"
                :collapse-transition="false"
                mode="vertical"
            >
                <SidebarItem
                    v-for="route in permissionStore.frontMenu"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<!-- TODO 去掉scoped 部分样式不生效 -->
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.c-slidebar {
    $c: &;
    height: calc(100% - 80px);
    overflow: hidden;

    &__body {
        height: calc(100% - 80px);
        overflow: hidden;

        &.collapse {
            height: calc(100% - 66px);
        }
    }

    @mixin tip-line {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: $darke-yellow;
        }
    }

    &__logo {
        height: 80px;
        font-size: 20px;
        color: $white;
        background-color: $darker-blue;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-24;

        &.collapse {
            height: 46px !important;
            font-size: 16px;
        }
    }

    &__hamburger {
        position: absolute;
        top: 50%;
        right: 0%;
        transform: translate(0, -50%);

        &.closed {
            left: 100%;
            z-index: 100;
        }
    }

    :deep(#{$c}__wrapper) {
        overflow-x: hidden !important;

        .el-scrollbar__view {
            height: 100%;
        }
    }

    :deep(.el-scrollbar__bar) {
        &.is-horizontal {
            // 隐藏水平滚动条
            display: none;
        }
    }

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title),
    :deep(.el-sub-menu .el-menu-item) {
        height: var(--plm-menu-item-height);
        line-height: var(--plm-menu-item-height);
        padding-left: calc(
            var(--el-menu-base-level-padding) + var(--el-menu-level) *
                var(--el-menu-level-padding) + 12px
        );

        &:hover {
            background-color: rgba($color: $white, $alpha: 0.1);
        }

        &.is-active {
            background-color: rgba($color: $white, $alpha: 0.3);
        }

        display: block;

        * {
            vertical-align: middle;
        }
    }

    :deep(.el-sub-menu__title) {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 0;
            bottom: 0;
            left: 0;
            border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
            z-index: 1;
        }
    }

    :deep(.el-menu > .first-level > a) {
        display: inline-block;
        width: 100%;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 0;
            bottom: 0;
            left: 0;
            border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
            z-index: 1;
        }
    }

    :deep(.el-sub-menu .el-menu-item span) {
        display: inline-block;
        width: 100%;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 0;
            bottom: 0;
            left: 0;
            border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
            z-index: 1;
        }
    }

    :deep(.el-menu-item) {
        &.is-active {
            @include tip-line;
        }
    }

    .el-menu--collapse {
        :deep(.el-sub-menu) {
            &.is-active {
                .el-sub-menu__title {
                    color: $black;
                    // @include tip-line;
                }
            }
        }

        :deep(.el-menu-item) {
            background-color: transparent;

            &.is-active {
                &::before {
                    display: none;
                }

                // @include tip-line;
            }
        }

        :deep(.el-sub-menu__title) {
            text-align: center;
            padding: 0;

            &::after {
                display: none;
            }
        }

        :deep(.el-sub-menu .el-menu-item span) {
            &::after {
                display: none;
            }
        }

        :deep(.el-menu-tooltip__trigger) {
            display: flex;
            justify-content: center !important;
        }
    }

    :deep(.el-menu--collapse.el-menu > .first-level > a) {
        &::after {
            display: none;
        }
    }
}
</style>
