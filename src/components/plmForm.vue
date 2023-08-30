<script lang="ts" setup>
interface Props {
    /** Form Attributes 具体参考element-plus官方文档*/
    formAttrs?: {
        [key: string]: any;
    };
    /** 表单元素及formItem属性合集*/
    columns?: Array<{
        span?: number; // 栅格布局,表单元素占几行
        el?: 'input' | 'number' | 'select' | 'checkbox' | 'radioGroup' | 'switch' | 'date' | 'text'; // 自定义的组件属性，用来渲染对应的表单元素
        formItemAttrs?: {
            // Form Item Attributes, 具体参照element-plus官方文档
            [key: string]: any;
        };
        elAttrs?: {
            // input,select等表单元素属性, 具体参照element-plus官方文档
            [key: string]: any;
        };
    }>;
    /** 栅格布列之前的间隔 */
    gutter?: number;
}
/**组件属性 */
const props = withDefaults(defineProps<Props>(), {
    formAttrs: () => {
        return {
            'label-position': 'left',
            'scroll-to-error': true
        };
    },
    columns: () => [],
    gutter: () => 10
});
/**表单数据对象 */
const model = reactive<{
    [key: string]: any;
}>({});
/** */
/**导出组件内数据,用于在组件外部调用 */
defineExpose({
    model
});
</script>
<template>
    <div class="c-form">
        <el-form
            v-bind="{ ...props.formAttrs, model }"
            ref="ruleForm"
        >
            <el-row :gutter="gutter">
                <el-col
                    v-for="(column, index) in props.columns"
                    :key="index"
                    :span="column.span || 6"
                >
                    <el-form-item v-bind="column.formItemAttrs">
                        <!-- input -->
                        <template v-if="column.el === 'input'">
                            <el-input
                                v-bind="column.elAttrs"
                                v-model="model[column.formItemAttrs?.prop]"
                            />
                        </template>
                        <!-- select -->
                        <template v-if="column.el === 'select'">
                            <el-select-v2
                                v-bind="column.elAttrs"
                                v-model="model[column.formItemAttrs?.prop]"
                            />
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item></el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped></style>
