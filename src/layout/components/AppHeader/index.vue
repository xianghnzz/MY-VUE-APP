<script setup lang="ts"></script>
<template>
    <el-row
        tag="div"
        justify="space-between"
        align="middle"
        class="c-app-header"
    >
        <el-col :span="12">
            <router-link to="/" class="c-header__aside">
                <SvgIcon name="fav" class="c-header__logo" />
                <div class="c-header__title">POS Lifecycle Management</div>
            </router-link>
        </el-col>
        <el-col class="c-app-header__user" :span="12">
            <span>User name</span>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.c-app-header {
    background-color: red;
    width: 100%;
    height: 60px;
    padding: 0 20px;

    &__user {
        text-align: right;
    }
}
</style>
