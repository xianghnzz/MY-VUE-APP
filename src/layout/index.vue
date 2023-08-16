<script lang="ts" setup>
import {
    AppHeader
    // Sidebar,
    // AppMain,
    // Breadcrumb,
    // Hamburger
} from './components';
// import { useAppStoreHook } from '@/store/app';
/**展开收起菜单栏 */
// const appStore = useAppStoreHook();
// const slidebar = computed(() => {
//     return appStore.sidebar;
// });
// const toggleSidebar = () => {
//     appStore.toggleSidebar(false);
// };
// const classObj = computed(() => {
//     return {
//         hideSidebar: !appStore.sidebar.opened,
//         openSidebar: appStore.sidebar.opened,
//         withoutAnimation: appStore.sidebar.withAnimation
//     };
// });
</script>

<template>
    <div class="c-layout">
        <AppHeader />
        <div class="c-layout__container">
            <el-row>
                <el-col :span="4"></el-col>
                <el-col :span="20"></el-col>
            </el-row>
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
    }
}
</style>
