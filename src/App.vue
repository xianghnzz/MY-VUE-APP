<script setup lang="ts">
const currentPage1: Ref = ref(1);
</script>

<template>
    <el-config-provider size="default" z-index="10">
        <ElButton type="primary">按钮</ElButton>
        <el-pagination
            v-model:current-page="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000"
        />
    </el-config-provider>
</template>

<style scoped></style>
