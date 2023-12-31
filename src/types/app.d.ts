export {};
declare global {
    /***********************表单组件数据类型 **********************/
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
            visibleChange?: (value: boolean) => void;
            removeTag?: (value: any) => void;
        };
        // formItem 属性及 input,select等表单元素属性, 具体参照element-plus官方文档
        [key: string]: any;
    }
    interface Form {
        // 表单数据对象
        modelValue: { [key: string]: any };
        // 单元设置
        columns: Array<FormColumn>;
        // 栅格布列之前的间隔
        gutter?: number;
        // Form Attributes 具体参考element-plus官方文档
        [key: string]: any;
    }
}
