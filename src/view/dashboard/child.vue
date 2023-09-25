<script lang="ts" setup>
const props = defineProps<{ model: any }>();
const emits = defineEmits<{
    (e: 'update:model', payload: any): void;
}>();
const handleTest = () => {
    emits('update:model', { test: 123 });
};
</script>

<template>
    <div>
        {{ props.model }}
        <el-button
            type="primary"
            @click="handleTest"
            >测试</el-button
        >
    </div>
</template>
