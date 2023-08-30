<script setup lang="ts"></script>
<template>
    <div class="c-app-header">
        <div class="c-app-header__aside">
            <svg-icon
                name="fav"
                width="40px"
                height="40px"
            />
            <router-link to="/">
                <div class="c-app-header__title">POS Lifecycle Management</div>
            </router-link>
        </div>

        <div class="c-app-header__control">
            <el-dropdown trigger="click">
                <el-avatar
                    style="--el-avatar-bg-color: #00325a"
                    :size="30"
                    shape="circle"
                    class="c-app-header__control__avatar"
                >
                    <svg-icon
                        name="blod-fill"
                        width="20px"
                        height="20px"
                    />
                </el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Portal</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown trigger="click">
                <el-avatar
                    style="--el-avatar-bg-color: #00325a"
                    :size="30"
                    shape="circle"
                    class="c-app-header__control__avatar"
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
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.c-app-header {
    background-color: $white;
    width: 100%;
    height: var(--plm-header-height);
    padding: 0 $space-xx-big 0 $space-big;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__aside {
        display: flex;
        align-items: center;
    }
    &__title {
        font-size: $xx-big;
        color: $info-dark;
        margin-left: $space-small;
    }

    &__control {
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0 10px;
        &__avatar {
            cursor: pointer;
        }
    }
}
</style>
