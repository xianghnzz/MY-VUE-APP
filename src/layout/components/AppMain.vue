<script lang="ts" setup>
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
                <keep-alive>
                    <component
                        :is="Component"
                        :key="key"
                    />
                </keep-alive>
            </transition>
        </router-view>
    </section>
</template>

<style lang="scss">
@use '@/styles/variables.scss' as *;

.c-app-main {
    height: calc(100% - var(--plm-breadcrumb-height));
    padding: $space-normal;
}
</style>
