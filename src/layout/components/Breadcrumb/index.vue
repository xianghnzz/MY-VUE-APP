<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';
import { compile } from 'path-to-regexp';
import { i18n } from '@/i18n';
import { getLanguage } from '@/utils/cache/localStorage';
import { useAppStoreHook } from '@/store/app';
const t = i18n.global.t;
const appStore = useAppStoreHook();
const route = useRoute();
const router = useRouter();
const pathValue = ref('');
const breadcrumbs = ref<RouteLocationMatched[]>([]);
const page = router.currentRoute.value;
const getBreadcrumb = () => {
    breadcrumbs.value = route.matched.filter((item) => {
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

watch(
    () => route.path,
    (path) => {
        pathValue.value = path;
        if (path.startsWith('/redirect/')) {
            return;
        }
        if (path !== '/pos-management/rollout-add') {
            appStore.setFullNameCn('');
            appStore.setFullNameEn('');
        }
        getBreadcrumb();
    },
    {
        deep: true,
        immediate: true
    }
);
const getTitle = (data: any) => {
    let newStr = data.meta.title.split('/');
    if (appStore.language === 'en') {
        newStr = data.meta?.titleEn.split('/');
    }
    return newStr;
};

getBreadcrumb();
</script>

<template>
    <el-breadcrumb class="c-breadcrumb">
        <div v-if="pathValue === '/pos-management/rollout-add'" class="rollout">
            <span>{{ appStore.rollOutId }}</span>
            <span v-if="appStore.rollOutId">&nbsp;-&nbsp;</span>
            <span>{{ appStore.posCode }}</span>
            <span v-if="appStore.posCode">&nbsp;-&nbsp;</span>
            <span>{{
                getLanguage() === 'en'
                    ? appStore.fullNameEn
                    : appStore.fullNameCn
            }}</span>
            <span v-if="appStore.fullNameEn && appStore.fullNameCn"
                >&nbsp;-&nbsp;</span
            >
            <span>{{ appStore.action }}</span>
        </div>
        <div v-else>
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs"
                :key="index"
            >
                <span
                    v-if="
                        item.redirect === 'noRedirect' ||
                        index === breadcrumbs.length - 1
                    "
                    class="no-redirect"
                >
                    <div v-if="item.meta.detail">
                        <span v-for="(subItem, i) in getTitle(item)" :key="i">
                            <span
                                :class="{
                                    firstLevel: i !== getTitle(item).length - 1
                                }"
                                >{{ subItem }}</span
                            ><span
                                class="firstLevel"
                                v-if="i !== getTitle(item).length - 1"
                                >&nbsp;&nbsp;/&nbsp;&nbsp;</span
                            >
                        </span>
                    </div>
                    <span v-else>{{
                        getLanguage() === 'en'
                            ? item.meta.titleEn
                            : item.meta.title
                    }}</span>
                </span>
                <span class="redirect" v-else>
                    {{
                        getLanguage() === 'en'
                            ? item.meta.titleEn
                            : item.meta.title
                    }}
                </span>
            </el-breadcrumb-item>
        </div>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.el-breadcrumb__inner,
.el-breadcrumb__inner a {
    font-weight: 400 !important;
}

.c-breadcrumb.el-breadcrumb {
    border-top: 1px solid $grey;
    height: var(--plm-breadcrumb-height);
    line-height: var(--plm-breadcrumb-height);
    background: $white;
    box-shadow: 0 2px 10px 0 $dark-white;

    .redirect {
        color: #97a8be;
    }

    .firstLevel {
        color: #97a8be;
    }

    .no-redirect {
        // color: #97a8be;
        color: $black;
        cursor: text;
    }

    .rollout {
        font-size: 18px;
        color: #030303;

        span {
            font-weight: 600;
        }
    }
}
</style>
