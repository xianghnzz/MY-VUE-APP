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
            <transition name="fade-transform">
                <!-- <keep-alive >
      </keep-alive> -->
                <component
                    :is="Component"
                    :key="key"
                />
            </transition>
        </router-view>
    </section>
</template>

<style lang="scss">
// @import '@/styles/variables.scss';

// .c-app-main {
//     height: calc(
//         100vh - var(--plm-header-height) - var(--plm-breadcrumb-height) - var(
//                 --plm-footer-height
//             )
//     );
//     width: 100%;
//     position: relative;
//     overflow: hidden;
//     background-color: $grey;
//     padding: $space-14;
// }
</style>
