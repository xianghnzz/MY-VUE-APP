<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue';
import { constantRoutes } from '@/router';
</script>

<template>
    <div class="c-slidebar">
        <el-scrollbar>
            <el-menu
                :unique-opened="true"
                :collapse="false"
                background-color="#003a5a"
                text-color="#ffffff"
                mode="vertical"
            >
                <SidebarItem
                    v-for="(item, index) in constantRoutes"
                    :key="index"
                    :item="item"
                    :base-path="item.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.c-slidebar {
    width: 100%;
    height: 100%;
    background-color: #003a5a;
}
</style>
