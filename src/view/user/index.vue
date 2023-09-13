<script setup lang="tsx">
import PlmForm from '@/components/plmForm.vue';
const ruleFormRef = ref<InstanceType<typeof PlmForm> | null>(null);
const model = reactive<any>({});
const columns = reactive<FormColumn[]>([
    {
        prop: 'username',
        label: '用户名',
        el: 'input',
        labelWidth: '100px',
        methods: {
            onChange: (val: string | number) => {
                console.log(val, '=====');
            }
        },
        rules: { required: true, message: '请输入用户名', trigger: 'change' }
    },
    {
        prop: 'pwd',
        label: '密码',
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
        prop: 'isEnable',
        label: '是否启用',
        el: 'checkbox',
        'true-label': 1,
        'false-label': 0,
        defaultValue: 1
    },
    {
        prop: 'city',
        label: '城市',
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
    },
    {
        prop: 'date',
        label: '日期',
        el: 'date',
        type: 'datetime'
    },
    {
        prop: 'radio',
        label: '单选',
        el: 'radioGroup',
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
    },
    {
        prop: 'swicth',
        label: '开关',
        el: 'switch'
    },
    {
        prop: 'slotprop',
        label: '插槽',
        slot: true
    },
    {
        prop: 'renderProp',
        label: 'render',
        render: () => {
            return (
                <el-input
                    placeholder="请输入"
                    v-model={model.renderProp}
                />
            );
        }
    }
]);

const getFormData = () => {
    console.log(model, '====');
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
            v-model:model="model"
            :columns="columns"
            ref="ruleFormRef"
        >
            <template #slotprop>
                <div>插槽</div>
            </template>
        </PlmForm>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
</style>
