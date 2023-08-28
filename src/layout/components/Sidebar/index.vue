<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue';
import Hamburger from '../Hamburger/index.vue';
import { constantRoutes } from '@/router';
import { useAppStoreHook } from '@/store/app';

const appStore = useAppStoreHook();
</script>

<template>
    <div class="c-slidebar">
        <el-scrollbar>
            <el-menu
                :unique-opened="true"
                :collapse="!appStore.sidebar.opened"
                background-color="#003a5a"
                text-color="#ffffff"
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
.c-slidebar {
    width: 100%;
    height: 100%;
    background-color: #003a5a;
    position: relative;
    .el-menu {
        border: none;
    }

    &__hamburger {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }
}
.el-menu-vertical-demo {
    background-color: yellowgreen;
}
</style>
