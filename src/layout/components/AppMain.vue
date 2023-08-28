<script lang="ts" setup>
// import { useAppStoreHook } from '@/store/app';
// const appStore = useAppStoreHook();
const route = useRoute();
const key = computed(() => {
    return route.path;
});
</script>

<template>
    <section class="c-app-main">
        <router-view v-slot="{ Component }">
            <transition
                name="fade-transform"
                mode="out-in"
            >
                <component
                    :is="Component"
                    :key="key"
                />
            </transition>
        </router-view>
    </section>
</template>

<style lang="scss">
@import '@/styles/variables.scss';

.c-app-main {
    height: calc(100vh - var(--plm-header-height) - var(--plm-breadcrumb-height));
    padding: 14px;
}
</style>
