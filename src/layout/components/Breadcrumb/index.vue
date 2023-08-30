<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';
import { compile } from 'path-to-regexp';
import { useAppStoreHook } from '@/store/app';

const appStore = useAppStoreHook();
const route = useRoute();
const router = useRouter();
const breadcrumbs = ref<RouteLocationMatched[]>([]);

const getBreadcrumb = () => {
    breadcrumbs.value = route.matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
};
const pathCompile = (path: string) => {
    const { params } = route;
    const toPath = compile(path);
    return toPath(params);
};
const handleLink = (item: RouteLocationMatched) => {
    const { redirect, path } = item;
    if (redirect) {
        router.push(redirect as string);
        return;
    }
    router.push(pathCompile(path));
};
const computedTitle = computed(() => {
    return (data: any) => {
        if (appStore.language === 'en') {
            return data.meta.titleEn;
        } else {
            return data.meta.title;
        }
    };
});
watch(
    () => route.path,
    path => {
        if (path.startsWith('/redirect/')) {
            return;
        }
        getBreadcrumb();
    }
);
onMounted(() => {
    getBreadcrumb();
});
</script>

<template>
    <el-breadcrumb class="c-breadcrumb">
        <el-breadcrumb-item
            v-for="(item, index) in breadcrumbs"
            :key="index"
        >
            <span
                v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1"
                class="no-redirect"
            >
                {{ computedTitle(item) }}
            </span>
            <a
                v-else
                @click.prevent="handleLink(item)"
            >
                {{ computedTitle(item) }}
            </a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.el-breadcrumb__inner,
.el-breadcrumb__inner a {
    font-weight: 400;
    color: #97a8be;
}

.c-breadcrumb.el-breadcrumb {
    border-top: 1px solid $grey;
    height: var(--plm-breadcrumb-height);
    line-height: var(--plm-breadcrumb-height);
    background: $white;
    box-shadow: $shadow-lighter;
    padding: 0 14px;

    .no-redirect {
        color: $black;
        cursor: text;
        font-weight: 700;
    }
}
</style>
