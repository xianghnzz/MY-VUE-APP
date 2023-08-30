<script setup lang="ts">
const ruleFormRef: Ref = ref(null);
const columns = reactive([
    {
        el: 'input',
        formItemAttrs: {
            prop: 'username',
            label: '用户名'
        },
        elAttrs: {
            placeholder: '请输入'
        }
    },
    {
        el: 'select',
        formItemAttrs: {
            prop: 'pwd',
            label: '密码'
        },
        elAttrs: {
            placeholder: '请选择',
            clearable: true,
            options: [
                {
                    label: 'lixiang',
                    value: '1'
                }
            ]
        }
    }
]);
const getFormData = () => {
    console.log(ruleFormRef.value.model, '====');
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
