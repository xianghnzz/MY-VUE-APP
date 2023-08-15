<script setup lang="ts"></script>
<template>
    <el-row justify="space-between" align="middle" class="c-app-header">
        <el-col :span="12">
            <router-link to="/" class="c-header__aside">
                <div class="c-header__title">Vite Vue3</div>
            </router-link>
        </el-col>
        <el-col class="c-app-header__user" :span="12">
            <el-dropdown>
                <el-avatar :size="30" class="c-app-header__user__avatar">
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
@import '@/styles/variables.scss';
.c-app-header {
    // background-color: red;
    width: 100%;
    height: 60px;
    padding: 0 30px;

    &__user {
        text-align: right;

        // &__name {
        //     margin-right: 20px;
        //     font-weight: bold;
        // }

        &__avatar {
            // background-color: #00a2f0;
            cursor: pointer;
        }
    }
}
</style>
