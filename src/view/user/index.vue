<script setup lang="tsx">
import AppForm from '@/components/appForm.vue';
const ruleFormRef = ref<InstanceType<typeof AppForm> | null>(null);
const model = reactive<any>({
    isEnable: 1
});
const columns = reactive<FormColumn[]>([
    {
        prop: 'username',
        label: '用户名',
        el: 'input',
        labelWidth: '0.5rem',
        customerClass: 'renderEl',
        clearable: true,
        suffix: 'RMB',
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
        labelWidth: '0.6rem',
        options: [
            {
                label: 'lixiang',
                value: '1'
            }
        ],
        rules: { required: true, message: '请选择', trigger: 'change' }
    },
    {
        prop: 'isEnable',
        label: '是否启用',
        el: 'checkbox',
        'true-label': 1,
        'false-label': 0,
        labelWidth: '0.7rem'
    },
    {
        prop: 'city',
        label: '城市',
        el: 'checkboxGroup',
        labelWidth: '0.4rem',
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
        type: 'datetime',
        labelWidth: '0.5rem'
    },
    {
        prop: 'radio',
        label: '单选',
        el: 'radioGroup',
        labelWidth: '0.6rem',
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
        el: 'switch',
        labelWidth: '0.7rem'
    },
    {
        prop: 'slotprop',
        label: '插槽',
        slot: true,
        labelWidth: '0.4rem'
    },
    {
        prop: 'renderProp',
        label: 'render',
        labelWidth: '0.5rem',
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

const handleSubmit = () => {
    ruleFormRef.value?.validate();
    console.log(model, '=====');
};
const handleReset = () => {
    ruleFormRef.value?.resetFields();
};
</script>
<template>
    <div class="page-list">
        <div class="page-list__header">
            <AppForm
                v-model:model="model"
                :columns="columns"
                searchForm
                ref="ruleFormRef"
            >
                <template #slotprop>
                    <div>插槽</div>
                </template>
                <template #handle>
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        >提交
                    </el-button>
                    <el-button
                        type="primary"
                        @click="handleReset"
                        >重置
                    </el-button>
                </template>
            </AppForm>
        </div>
        <div class="page-list__body">
            <AppTable
                :width="600"
                :height="600"
                :data="[]"
                :columns="[]"
            ></AppTable>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
:deep(.renderEl) {
    width: 80%;
}
</style>
