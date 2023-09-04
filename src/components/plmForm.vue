<script lang="tsx" setup>
import { FormInstance } from 'element-plus';
/** 表单元素及formItem属性合集*/
interface FormColumn {
    span?: number; // 栅格布局,表单元素占几行
    el?: 'input' | 'number' | 'select' | 'checkbox' | 'checkboxGroup' | 'radioGroup' | 'switch' | 'date' | 'text'; // 自定义的组件属性，用来渲染对应的表单元素
    defaultValue?: any; // 默认值
    slot?: boolean; // 使用插槽
    render?: any; // 使用render函数
    methods?: {
        onBlur?: (event: FocusEvent) => void;
        onFocus?: (event: FocusEvent) => void;
        onChange?: (value: any) => void;
        onInput?: (value: any) => void;
        onClear?: () => void;
        visibleChange?: (visibility: boolean) => void;
        removeTag?: (value: any) => void;
        calendarChange?: (value: Date[]) => void;
        panelChange?: (date: any, model: any, view: any) => void;
    };
    formItemAttrs?: {
        // Form Item Attributes, 具体参照element-plus官方文档
        [key: string]: any;
    };
    // input,select等表单元素属性, 具体参照element-plus官方文档
    [key: string]: any;
}
interface Form {
    /** Form Attributes 具体参考element-plus官方文档*/
    formAttrs?: {
        [key: string]: any;
    };
    columns?: Array<FormColumn>;
    /** 栅格布列之前的间隔 */
    gutter?: number;
}
/**组件属性 */
const props = withDefaults(defineProps<Form>(), {
    formAttrs: () => {
        return {
            'label-position': 'left',
            'scroll-to-error': true
        };
    },
    columns: () => [],
    gutter: () => 10
});

const ruleForm = ref<FormInstance | null>(null);
/**表单数据对象 */
const model = reactive<{
    [key: string]: any;
}>({});
watchEffect(() => {
    for (const item of props.columns) {
        if (typeof item.defaultValue !== 'undefined') model[item.formItemAttrs?.prop] = item.defaultValue;
    }
});

/**获取元素需要绑定的属性对象 */
const getBindAttrs = computed(() => {
    return (column: any, bool: boolean = false) => {
        const { formItemAttrs, ...elAttrs } = column;
        if (bool) return formItemAttrs;
        return elAttrs;
    };
});
/**去除输入框值的前后空格 */
const trimVal = (event: FocusEvent, column: FormColumn): void => {
    const el = event.target as HTMLInputElement;
    model[column.formItemAttrs?.prop] = el.value.trim();
    return column.methods?.onBlur && column.methods.onBlur(event);
};
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
                    <el-form-item v-bind="getBindAttrs(column, true)">
                        <!-- input -->
                        <template v-if="column.el === 'input'">
                            <el-input
                                placeholder="请输入"
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @blur="(event: FocusEvent) => trimVal(event, column)"
                                @focus="column.methods?.onFocus"
                                @change="column.methods?.onChange"
                                @input="column.methods?.onInput"
                                @clear="column.methods?.onClear"
                            />
                        </template>
                        <!-- select -->
                        <template v-if="column.el === 'select'">
                            <!-- 单选 -->
                            <el-select-v2
                                v-if="!column.elAttrs?.multiple"
                                placeholder="请选择"
                                :clearable="true"
                                :filterable="true"
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                                @visible-change="column.methods?.visibleChange"
                                @remove-tag="column.methods?.removeTag"
                                @clear="column.methods?.onClear"
                                @blur="column.methods?.onBlur"
                                @focus="column.methods?.onFocus"
                            />
                            <!-- 多选 -->
                            <el-select-v2
                                v-else
                                placeholder="请选择"
                                :clearable="true"
                                :collapse-tags="true"
                                :collapse-tags-tooltip="true"
                                :filterable="true"
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                                @visible-change="column.methods?.visibleChange"
                                @remove-tag="column.methods?.removeTag"
                                @clear="column.methods?.onClear"
                                @blur="column.methods?.onBlur"
                                @focus="column.methods?.onFocus"
                            />
                        </template>
                        <!-- 单个复选框 -->
                        <template v-if="column.el === 'checkbox'">
                            <el-checkbox
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                            />
                        </template>
                        <!-- 复选框group -->
                        <template v-if="column.el === 'checkboxGroup'">
                            <el-checkbox-group
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                            >
                                <el-checkbox
                                    v-for="item in column.options"
                                    :key="item.value"
                                    :label="item.value"
                                    >{{ item.label }}</el-checkbox
                                >
                            </el-checkbox-group>
                        </template>
                        <!-- 单选框组 -->
                        <template v-if="column.el === 'radioGroup'">
                            <el-radio-group
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                            >
                                <el-radio
                                    v-for="radio in column.options"
                                    :key="radio.value"
                                    :label="radio.value"
                                >
                                    {{ radio.label }}
                                </el-radio>
                            </el-radio-group>
                        </template>
                        <!-- 日期控件 -->
                        <template v-if="column.el === 'date'">
                            <el-date-picker
                                placeholder="请选择"
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                                @blur="column.methods?.onBlur"
                                @focus="column.methods?.onFocus"
                                @calendar-change="column.methods?.calendarChange"
                                @panel-change="column.methods?.panelChange"
                            />
                        </template>
                        <!-- switch -->
                        <template v-if="column.el === 'switch'">
                            <el-switch
                                v-bind="getBindAttrs(column)"
                                v-model="model[column.formItemAttrs?.prop]"
                                @change="column.methods?.onChange"
                            />
                        </template>
                        <!-- 插槽没有统计到的或者有特殊需求的表单元素 -->
                        <template
                            v-if="column.slot && !column.render"
                            #default
                        >
                            <slot :name="column.formItemAttrs?.prop"> </slot>
                        </template>
                        <!-- 使用render函数 -->
                        <template v-if="column.render && !column.slot">
                            <!-- {{ column.render() }} -->
                            <!-- <div v-html="column.render()"></div> -->
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item></el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.c-form {
    :deep(.el-input) {
        width: 100%;
    }
    :deep(.el-select-v2) {
        width: 100%;
    }
}
</style>
