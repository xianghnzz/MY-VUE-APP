<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const currentPage1: Ref = ref(1);
</script>

<template>
    <el-config-provider size="default" z-index="10" :locale="zhCn">
        <ElButton type="primary">{{ $t('plm.common.confirm') }}</ElButton>
        <el-pagination
            v-model:current-page="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000"
        />
    </el-config-provider>
</template>

<style scoped></style>
