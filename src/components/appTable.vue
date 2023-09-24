<script setup lang="ts">
import { Column } from 'element-plus';

interface Porps {
    columns?: Array<Column>;
    data?: Array<{ [key: string]: any }>;
    width: number;
    height: number;
}
const props = withDefaults(defineProps<Porps>(), {
    columns: () => [],
    data: () => [],
    width: 0,
    height: 0
});
</script>
<template>
    <div class="c-table">
        <el-table-v2 v-bind="props" />
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
</style>
