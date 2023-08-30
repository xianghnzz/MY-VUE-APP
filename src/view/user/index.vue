<script setup lang="ts">
const ruleFormRef: Ref = ref(null);
const validateForm = reactive({
    formAttrs: {
        size: 'small'
    },
    columns: [
        {
            formItemAttrs: {
                prop: 'username',
                label: '用户名'
            },
            el: 'input',
            elAttrs: {
                placeholder: '请输入'
            }
        },
        {
            formItemAttrs: {
                prop: 'pwd',
                label: '密码'
            },
            el: 'select',
            elAttrs: {
                placeholder: '请选择',
                options: []
            }
        }
    ]
});
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
            v-bind="validateForm"
            ref="ruleFormRef"
        ></PlmForm>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
</style>
