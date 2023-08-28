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
                :collapse="!appStore.sidebarIsOpen"
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
@import '@/styles/variables.scss';
.c-slidebar {
    background-color: #003a5a;
    position: fixed;
    top: var(--plm-header-height);
    bottom: 0;
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
</style>
