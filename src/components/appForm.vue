<script lang="ts" setup>
import { FormInstance } from 'element-plus';
/** 表单元素及formItem属性合集*/
interface FormColumn {
    span?: number; // 栅格布局,表单元素占几行
    el?: 'input' | 'number' | 'select' | 'checkbox' | 'checkboxGroup' | 'radioGroup' | 'switch' | 'date' | 'text'; // 自定义的组件属性，用来渲染对应的表单元素
    slot?: boolean; // 使用插槽
    render?: () => any; // render函数
    customerClass?: string; // 自定义类名
    suffix?: string; // 后缀
    hidden?: boolean; // 是否隐藏该表单项
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
    // formItem属性及其input,select等表单元素属性, 具体参照element-plus官方文档
    [key: string]: any;
}
interface Form {
    // 表单数据对象
    modelValue: { [key: string]: any };
    // 单元设置
    columns: Array<FormColumn>;
    // 栅格布列之前的间隔
    gutter?: number;
    // 组件是否使用搜索栏样式和布局
    searchForm?: boolean;
    // Form Attributes 具体参考element-plus官方文档
    [key: string]: any;
}
/**组件属性 */
const props = withDefaults(defineProps<Form>(), {
    columns: () => [],
    modelValue: () => ({}),
    gutter: () => 0
});
const { proxy } = getCurrentInstance() as any;
const ruleForm = ref<FormInstance | null>(null);
/**获取元素需要绑定的属性对象 */
const formAttrs = [
    'rules',
    'inline',
    'labelPosition',
    'labelWidths',
    'labelSuffix',
    'hideRequiredAsterisk',
    'requireAsteriskPosition',
    'showMessage',
    'inlineMessage',
    'statusIcon',
    'validateOnRuleChange',
    'size',
    'disabled',
    'scrollToError',
    'scrollIntoViewOptions'
];
const formItemAttrs = ['prop', 'label', 'labelWidth', 'required', 'rules', 'error', 'showMessage', 'inlineMessage', 'size', 'validate-status'];
const customerAttrs = ['el', 'span', 'slot', 'render', 'methods', 'customerClass', 'suffix'];
const getBindAttrs = computed(() => {
    return (column?: any, type?: string) => {
        const attrs: { [key: string]: any } = {};
        if (!column && !type) {
            for (const [key, val] of Object.entries(proxy.$attrs)) {
                if (formAttrs.includes(key)) {
                    attrs[key] = val;
                }
            }
        }
        if (type === 'item') {
            for (const [key, val] of Object.entries(column)) {
                if (formItemAttrs.includes(key)) {
                    attrs[key] = val;
                }
            }
        }
        if (type === 'el') {
            for (const [key, val] of Object.entries(column)) {
                if (!formItemAttrs.includes(key) && !customerAttrs.includes(key)) {
                    attrs[key] = val;
                }
            }
        }
        return attrs;
    };
});
const emits = defineEmits<{
    (e: 'update:modelValue', payload: any): void;
}>();

/**更新表单数据对象 */
const updateModel = (val: any, column: FormColumn, eventName: 'input' | 'change' | 'blur') => {
    if (!column.prop) return;
    const formData = { ...props.modelValue };
    if (eventName === 'blur') {
        formData[column.prop] = val.target.value.trim();
    } else {
        formData[column.prop] = val;
    }
    emits('update:modelValue', formData);
    if (eventName === 'input') {
        !!column.methods?.onInput && column.methods.onInput(val);
    }
    if (eventName === 'change') {
        !!column.methods?.onChange && column.methods.onChange(val);
    }
    if (eventName === 'blur') {
        !!column.methods?.onBlur && column.methods.onBlur(val);
    }
};

/**校验整个表单 */
const validate = async () => {
    if (!ruleForm.value) return;
    const valid = await ruleForm.value.validate(valid => valid);
    return valid;
};
/**校验表单中的某个字段 */
const validateField = async (prop: string) => {
    if (!ruleForm.value) return;
    const valid = await ruleForm.value.validateField(prop, valid => valid);
    return valid;
};
/**重置该表单项，传入属性，重置某一项，不传默认重置整个表单*/
const resetFields = async (prop?: string) => {
    if (prop) {
        ruleForm.value?.resetFields(prop);
        return;
    }
    ruleForm.value?.resetFields();
};
/**清空某个字段的校验信息，不传参数默认清空整个表单的校验信息 */
const clearValidate = (prop?: string) => {
    if (prop) {
        ruleForm.value?.clearValidate(prop);
        return;
    }
    ruleForm.value?.clearValidate();
};
/**滚动到指定的字段 */
const scrollToField = (prop: string) => {
    ruleForm.value?.scrollToField(prop);
};
/**导出组件内数据,用于在组件外部调用 */
defineExpose({
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate
});
</script>
<template>
    <div :class="{ 'c-form': true, searchForm: searchForm }">
        <el-form
            :model="modelValue"
            v-bind="getBindAttrs()"
            ref="ruleForm"
        >
            <el-row :gutter="gutter">
                <el-col
                    v-for="(column, index) in columns"
                    :key="index"
                    :span="column.span || 6"
                >
                    <el-form-item
                        v-bind="getBindAttrs(column, 'item')"
                        :class="{ [column.customerClass]: !!column.customerClass }"
                    >
                        <!-- input -->
                        <template v-if="column.el === 'input'">
                            <el-input
                                placeholder="请输入"
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @input="(val: string) => updateModel(val, column, 'input')"
                                @blur="(event: FocusEvent) => updateModel(event, column, 'blur')"
                                @focus="column.methods?.onFocus"
                                @change="column.methods?.onChange"
                                @clear="column.methods?.onClear"
                            />
                        </template>
                        <!-- select -->
                        <template v-if="column.el === 'select'">
                            <!-- 单选 -->
                            <el-select-v2
                                v-if="!column.multiple"
                                placeholder="请选择"
                                :clearable="true"
                                :filterable="true"
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
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
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
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
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
                            />
                        </template>
                        <!-- 复选框group -->
                        <template v-if="column.el === 'checkboxGroup'">
                            <el-checkbox-group
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
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
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
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
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
                                @blur="column.methods?.onBlur"
                                @focus="column.methods?.onFocus"
                                @calendar-change="column.methods?.calendarChange"
                                @panel-change="column.methods?.panelChange"
                            />
                        </template>
                        <!-- switch -->
                        <template v-if="column.el === 'switch'">
                            <el-switch
                                v-bind="getBindAttrs(column, 'el')"
                                :model-value="modelValue[column.prop]"
                                @change="(val: string) => updateModel(val, column, 'change')"
                            />
                        </template>
                        <!-- 插槽没有统计到的或者有特殊需求的表单元素 -->
                        <template v-if="column.slot && !column.render">
                            <slot :name="column?.prop"> </slot>
                        </template>
                        <!-- render函数 -->
                        <template v-if="!column.slot && column.render">
                            <Component :is="column?.render" />
                        </template>
                        <!-- 表单验证错误信息插槽 -->
                        <template #error="{ error }">
                            <div class="c-form__error">
                                <el-tooltip
                                    effect="dark"
                                    placement="top"
                                >
                                    <div style="height: 100%; display: flex; align-items: center">
                                        <el-icon
                                            :size="16"
                                            v-if="error"
                                            color="#f74439"
                                        >
                                            <i-ep-WarningFilled />
                                        </el-icon>
                                    </div>

                                    <template #content>
                                        <div class="c-form__error__content">
                                            {{ error }}
                                        </div>
                                    </template>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-form-item>
                    <span
                        v-if="!!column.suffix"
                        class="c-form__suffix"
                        >{{ column.suffix }}</span
                    >
                </el-col>
            </el-row>
        </el-form>
        <div class="c-form__handle">
            <slot name="handle" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.c-form {
    $c: &;

    :deep(.el-form-item.is-error .el-input__wrapper) {
        padding-right: 27px;
    }
    :deep(.el-form-item.is-error .el-select-v2__suffix) {
        position: absolute;
        right: 25px;
    }
    :deep(.el-input) {
        width: 100%;
    }
    :deep(.el-select-v2) {
        width: 100%;
    }

    &.searchForm {
        display: flex;
        #{$c}__handle {
            white-space: nowrap;
            margin-left: $space-x-big;
        }
    }

    &__error {
        transition: 0s;
        position: absolute;
        height: 100%;
        right: 6px;
        top: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        &__content {
            max-width: 200px;
        }
    }

    &__suffix {
        color: $black;
        font-size: $mini;
        margin-left: $space-small;
    }
    .el-col {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: $x-big;
        .el-form-item {
            flex: 1;
            margin: 0;
        }
    }
}
</style>
