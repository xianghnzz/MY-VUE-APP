<script setup lang="ts">
import PlmForm from '@/components/plmForm.vue';
const ruleFormRef = ref<InstanceType<typeof PlmForm> | null>(null);
const columns = reactive<FormColumn[]>([
    {
        formItemAttrs: {
            prop: 'username',
            label: '用户名'
        },
        el: 'input',
        placeholder: '请输入',
        methods: {
            onChange: (val: string | number) => {
                console.log(val, '=====');
            }
        }
    },
    {
        formItemAttrs: {
            prop: 'pwd',
            label: '密码'
        },
        el: 'select',
        placeholder: '请选择',
        multiple: true,
        options: [
            {
                label: 'lixiang',
                value: '1'
            }
        ]
    },
    {
        formItemAttrs: {
            prop: 'isEnable',
            label: '是否启用'
        },
        el: 'checkbox',
        'true-label': 1,
        'false-label': 0,
        defaultValue: 0
    },
    {
        formItemAttrs: {
            prop: 'city',
            label: '城市'
        },
        el: 'checkboxGroup',
        options: [
            {
                label: '郑州',
                value: 1
            },
            {
                label: '上海',
                value: 2
            },
            {
                label: '北京',
                value: 3
            }
        ]
    }
]);
const getFormData = () => {
    console.log(ruleFormRef.value?.model, '====');
};
</script>
<template>
    <div>
        <el-button
            type="primary"
            @click="getFormData"
            >用户</el-button
        >
        <PlmForm
            :columns="columns"
            ref="ruleFormRef"
        ></PlmForm>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
</style>
