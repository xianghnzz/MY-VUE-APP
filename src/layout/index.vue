<script lang="ts" setup>
import {
    AppHeader,
    Sidebar,
    AppMain
    // Breadcrumb,
} from './components';
import { useAppStoreHook } from '@/store/app';
const appStore = useAppStoreHook();
const classObj = computed(() => {
    return {
        hideSidebar: !appStore.sidebarIsOpen
    };
});
</script>

<template>
    <div class="c-layout">
        <AppHeader />
        <div
            class="c-layout__container"
            :class="classObj"
        >
            <Sidebar />
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
            position: fixed;
            top: var(--plm-header-height);
            bottom: 0;
            transition: 0.28s;
        }
        .c-app-main {
            width: calc(100% - var(--plm-sidebar-width));
            margin-left: var(--plm-sidebar-width);
            transition: 0.28s;
        }
        &.hideSidebar {
            .c-slidebar {
                width: var(--plm-hide-sidebar-width);
                position: fixed;
                top: var(--plm-header-height);
                bottom: 0;
            }
            .c-app-main {
                width: calc(100% - var(--plm-hide-sidebar-width));
                margin-left: var(--plm-hide-sidebar-width);
            }
        }
    }
}
</style>
