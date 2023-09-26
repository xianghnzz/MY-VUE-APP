<script setup lang="ts">
import { TableV2Props } from 'element-plus';
type Props = TableV2Props & {
    width?: number;
    height?: number;
};
const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    data: () => []
});
</script>
<template>
    <div class="c-table">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2
                    v-bind="props"
                    :width="width"
                    :height="height"
                    :data="data"
                    :columns="columns"
                />
            </template>
        </el-auto-resizer>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.c-table {
    height: 100%;
}
</style>
