<script lang="ts" setup>
import { constantRoutes } from '@/router';
console.log(constantRoutes);
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
                <!-- <SidebarItem /> -->
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
