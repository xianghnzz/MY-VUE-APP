<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue';
import Hamburger from '../Hamburger/index.vue';
import { constantRoutes } from '@/router';
import { useAppStoreHook } from '@/store/app';

const appStore = useAppStoreHook();
const route = useRoute();
const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta?.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});
</script>

<template>
    <div class="c-slidebar">
        <router-link to="/">
            <div class="c-slidebar__logo">Audit</div>
        </router-link>
        <el-scrollbar>
            <el-menu
                :default-active="activeMenu"
                :unique-opened="true"
                :collapse="!appStore.sidebarIsOpen"
                :collapse-transition="false"
                background-color="#00325a"
                text-color="#ffffff"
                active-text-color="#ffffff"
                mode="vertical"
            >
                <template
                    v-for="item in constantRoutes"
                    :key="item.path"
                >
                    <SidebarItem
                        v-if="!item.meta?.hidden"
                        :item="item"
                        :base-path="item.path"
                    />
                </template>
            </el-menu>
        </el-scrollbar>
        <div class="c-slidebar__hamburger">
            <Hamburger />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
@mixin tip-line {
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        width: 2px;
        height: calc(100% - 10px);
        background: $warning;
    }
}
// 默认样式
.c-slidebar {
    background-color: $primary;
    position: fixed;
    top: var(--plm-header-height);
    bottom: var(--plm-footer-height);
    display: flex;
    flex-direction: column;

    &__hamburger {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }

    &__logo {
        height: 80px;
        font-size: $x-big;
        color: $white;
        background-color: $primary-dark;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $xx-big;
        transition: 0.28s;
    }
    .el-scrollbar {
        flex: 1;
    }
    .el-menu {
        border: none;
        width: 100%;
    }

    :deep(.el-menu-item) {
        border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
        &.is-active {
            @include tip-line;
            background: rgba($color: #ffffff, $alpha: 0.5);
        }
    }
    :deep(.el-sub-menu__title) {
        border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
    }
    :deep(.el-sub-menu .el-menu a .el-menu-item) {
        border-bottom: none;
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            bottom: 0px;
            right: 0;
            width: calc(100% - var(--el-menu-base-level-padding) - var(--el-menu-level) * var(--el-menu-level-padding));
            height: 0;
            border-bottom: 1px dashed rgba($color: $white, $alpha: 0.3);
        }
    }
}
</style>
