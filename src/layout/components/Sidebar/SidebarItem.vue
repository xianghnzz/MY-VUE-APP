<script lang="ts" setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
/**子菜单数量 */
const showingChildNumber = computed(() => {
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
</script>

<template>
    <div v-if="!props.item.meta?.hidden">
        <!-- 只有一个菜单 -->
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <!-- <SidebarItemLink
                v-if="theOnlyOneChild.meta"
                :to="resolvePath(theOnlyOneChild.path)"
            >
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <div
                        class="icon-continar"
                        v-if="theOnlyOneChild.meta.svgIcon"
                    >
                        <svg-icon :name="theOnlyOneChild.meta.svgIcon" />
                    </div>
                    <template v-if="theOnlyOneChild.meta.title" #title>
                        <span>
                            {{
                                appStore.language === 'en'
                                    ? (theOnlyOneChild.meta.titleEn as string)
                                    : theOnlyOneChild.meta.title
                            }}
                        </span>
                    </template>
                </el-menu-item>
            </SidebarItemLink> -->
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
