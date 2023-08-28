<script lang="ts" setup>
import {
    AppHeader,
    Sidebar
    // AppMain,
    // Breadcrumb,
    // Hamburger
} from './components';
import { useAppStoreHook } from '@/store/app';
const appStore = useAppStoreHook();
const classObj = computed(() => {
    return {
        hideSidebar: !appStore.sidebar.opened,
        withoutAnimation: appStore.sidebar.withAnimation
    };
});
const sideBarWidth = computed(() => {
    if (appStore.sidebar.opened) return 3;
    return 1;
});
const mainWidth = computed(() => {
    if (appStore.sidebar.opened) return 21;
    return 23;
});
</script>

<template>
    <div
        class="c-layout"
        :class="classObj"
    >
        <AppHeader />
        <el-row class="c-layout__container">
            <el-col :span="sideBarWidth">
                <Sidebar />
            </el-col>
            <el-col :span="mainWidth">
                <router-view></router-view>
            </el-col>
        </el-row>
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
    .el-col {
        transition: 0.28s;
    }

    // &__container {
    // }
}
</style>
