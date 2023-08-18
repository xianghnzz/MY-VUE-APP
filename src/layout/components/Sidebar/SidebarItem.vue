<script lang="ts" setup>
import { isExternal } from '@/utils/validate';
import { resolve } from 'path-browserify';
import SidebarItemLink from './SidebarItemLink.vue';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
});
/**子菜单数量 */
const showingChildNumber: ComputedRef<number> = computed(() => {
    if (props.item.children) {
        const showingChildren = props.item.children.filter((item: any) => {
            return !(item.meta && item.meta.hidden);
        });
        return showingChildren.length;
    }
    return 0;
});
/**只有一个子菜单or 没有子菜单 */
const theOnlyOneChild: any = computed(() => {
    if (showingChildNumber.value > 1) {
        return null;
    }
    if (props.item.children) {
        for (const child of props.item.children) {
            if (!child.meta || !child.meta.hidden) {
                child.meta!.svgIcon = props.item.meta?.svgIcon;
                return child;
            }
        }
    }
    return { ...props.item, path: '' };
});
/**始终显示各节点菜单 */
const alwaysShowRootMenu = computed(() => {
    return props.item.meta && props.item.meta.alwaysShow;
});
/**路由拼接 */
const resolvePath = (routePath: string): string => {
    if (isExternal(routePath)) {
        return routePath;
    }
    if (isExternal(props.basePath)) {
        return props.basePath;
    }
    return resolve(props.basePath, routePath);
};
</script>

<template>
    <div
        v-if="!item.meta?.hidden"
        class="c-sidebar-item"
    >
        <!-- 只有一个子菜单且根菜单alwaysShow等于false 或没有子菜单-->
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <SidebarItemLink
                v-if="theOnlyOneChild.meta"
                :to="resolvePath(theOnlyOneChild.path)"
            >
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <div class="c-sidebar-item__icon">
                        <SvgIcon
                            v-if="theOnlyOneChild.meta.svgIcon"
                            :name="theOnlyOneChild.meta.svgIcon"
                            width="20px"
                            fill="#ffffff"
                        />
                    </div>

                    <template
                        v-if="theOnlyOneChild.meta.title"
                        #title
                    >
                        {{ theOnlyOneChild.meta.title }}
                    </template>
                </el-menu-item>
            </SidebarItemLink>
        </template>
        <!-- 多个子菜单 -->
        <el-sub-menu
            v-else
            :index="resolvePath(item.path)"
        >
            <template #title>
                <div class="c-sidebar-item__icon">
                    <SvgIcon
                        v-if="item.meta && item.meta.svgIcon"
                        :name="item.meta.svgIcon"
                        width="20px"
                        fill="#ffffff"
                    />
                </div>

                <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                />
            </template>
        </el-sub-menu>
    </div>
</template>

<style lang="scss" scoped>
.c-sidebar-item {
    &__icon {
        display: inline-flex;
        margin-right: 12px;
    }
}
</style>
