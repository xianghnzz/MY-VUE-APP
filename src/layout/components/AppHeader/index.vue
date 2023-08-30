<script setup lang="ts"></script>
<template>
    <el-row
        justify="space-between"
        align="middle"
        class="c-app-header"
    >
        <el-col :span="12">
            <router-link to="/">
                <div class="c-app-header__title">Vite Vue3</div>
            </router-link>
        </el-col>
        <el-col
            class="c-app-header__user"
            :span="12"
        >
            <el-dropdown trigger="click">
                <el-avatar
                    :size="30"
                    class="c-app-header__user__avatar"
                >
                    <el-icon :size="20">
                        <i-ep-UserFilled />
                    </el-icon>
                </el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>User name</el-dropdown-item>
                        <el-dropdown-item>English</el-dropdown-item>
                        <el-dropdown-item>简体中文</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.c-app-header {
    background-color: $white;
    width: 100%;
    height: var(--plm-header-height);
    padding: 0 $space-xx-big;

    &__title {
        font-size: $xx-big;
        color: $black;
    }

    &__user {
        text-align: right;

        &__avatar {
            cursor: pointer;
        }
    }
}
</style>
