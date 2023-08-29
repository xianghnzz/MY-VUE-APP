<script lang="ts" setup>
import { AppHeader, Sidebar, AppMain, Breadcrumb } from './components';
import { useAppStoreHook } from '@/store/app';
const appStore = useAppStoreHook();
</script>

<template>
    <div class="c-layout">
        <AppHeader />
        <div :class="{ 'c-layout__container': true, hideSidebar: !appStore.sidebarIsOpen }">
            <Sidebar />
            <Breadcrumb class="c-layout__breadcrumb" />
            <AppMain />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.c-layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: $grey;

    &__container {
        .c-slidebar {
            width: var(--plm-sidebar-width);
            transition: 0.28s;
        }

        .c-breadcrumb,
        .c-app-main {
            width: calc(100% - var(--plm-sidebar-width));
            margin-left: var(--plm-sidebar-width);
            transition: 0.28s;
        }
        &.hideSidebar {
            .c-slidebar {
                width: var(--plm-hide-sidebar-width);
            }
            .c-breadcrumb,
            .c-app-main {
                width: calc(100% - var(--plm-hide-sidebar-width));
                margin-left: var(--plm-hide-sidebar-width);
            }
            :deep(.c-slidebar__logo) {
                height: 46px !important;
                font-size: 16px;
            }
            :deep(.c-slidebar-item__icon) {
                margin-left: 12px;
                background: rgba($color: #ffffff, $alpha: 0.5);
                width: 50px;
                height: 50px;
                border-radius: 5px;
                svg {
                    width: 30px;
                    height: 30px;
                }
            }
            :deep(.el-menu-item) {
                text-align: center;
                margin-top: 10px;
                border: none;
                &.is-active {
                    background-color: transparent;
                    &::before {
                        display: none;
                    }
                }
            }
            :deep(.el-sub-menu) {
                margin-top: 10px;
            }
            :deep(.el-sub-menu__title) {
                border: none;
            }
            :deep(.el-tooltip__trigger) {
                padding: 0;
                justify-content: center;
            }
        }
    }
}
</style>
