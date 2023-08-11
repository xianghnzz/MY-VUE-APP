<script lang="ts" setup>
import {
    AppHeader,
    AppFooter,
    Sidebar,
    AppMain,
    Breadcrumb,
    Hamburger
} from './components';
import { useAppStoreHook } from '@/store/app';
/**展开收起菜单栏 */
const appStore = useAppStoreHook();
const slidebar = computed(() => {
    return appStore.sidebar;
});
const toggleSidebar = () => {
    appStore.toggleSidebar(false);
};
const classObj = computed(() => {
    return {
        hideSidebar: !appStore.sidebar.opened,
        openSidebar: appStore.sidebar.opened,
        withoutAnimation: appStore.sidebar.withoutAnimation
    };
});
</script>

<template>
    <div :class="classObj" class="c-layout">
        <AppHeader />
        <div class="c-layout__side">
            <Sidebar class="c-layout__sidebar-container" />
            <Hamburger
                :is-active="slidebar.opened"
                :class="[
                    'c-layout__hamburger',
                    classObj.hideSidebar ? 'closed' : ''
                ]"
                @toggle-click="toggleSidebar"
            />
        </div>
        <div class="c-layout__main-container">
            <Breadcrumb class="c-layout__breadcrumb" />
            <AppMain />
        </div>
    </div>
    <AppFooter />
</template>

<style lang="scss" scoped>
.c-layout {
    $c: &;

    position: relative;
    width: 100%;
    height: calc(100% - var(--plm-footer-height));
    overflow: hidden;

    &__side {
        transition: width 0.28s;
        width: var(--plm-side-width);
        position: fixed;
        font-size: 0px;
        top: var(--plm-header-height);
        bottom: var(--plm-footer-height);
        left: 0;
        z-index: 5;
        background-color: #003a5a;
    }

    &__hamburger {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);

        &.closed {
            right: calc(-1 * var(--plm-hamburger-width));
        }
    }

    &__sidebar-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &__main-container {
        height: calc(100% - var(--plm-header-height));
        transition: margin-left 0.28s;
        margin-left: var(--plm-side-width);
        position: relative;
        overflow: hidden;
    }

    &__breadcrumb {
        padding-left: var(--plm-hamburger-width);
    }

    &.hideSidebar {
        #{$c}__main-container {
            margin-left: var(--plm-hide-side-width);
        }

        #{$c}__side {
            width: var(--plm-hide-side-width) !important;
        }
    }

    &.withoutAnimation {
        #{$c}__main-container,
        #{$c}__sidebar__container {
            transition: none;
        }
    }
}
</style>
