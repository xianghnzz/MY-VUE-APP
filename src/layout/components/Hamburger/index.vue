<script lang="ts" setup>
import { useAppStoreHook } from '@/store/app';

const appStore = useAppStoreHook();
const toggleClick = () => {
    appStore.toggleSidebar();
};
</script>

<template>
    <div
        :class="['c-humburger', !appStore.sidebarIsOpen ? 'closed' : '']"
        @click="toggleClick"
    >
        <el-icon
            class="c-humburger__icon"
            color="#ffffff"
            :size="16"
        >
            <i-ep-fold></i-ep-fold>
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.c-humburger {
    $c: &;

    width: 0;
    height: 90px;
    border-right: 20px solid rgba($color: #00283e, $alpha: 0.8);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    cursor: pointer;
    position: relative;
    transition: 0.2s;

    &__icon {
        vertical-align: middle;
        color: #fff;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(-8px, -50%);
    }

    &.closed {
        transform: scaleX(-1);
        transform-origin: right;
    }
}
</style>
