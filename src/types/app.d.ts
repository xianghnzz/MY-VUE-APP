export {};
declare global {
    /***********************表单组件数据类型 **********************/
    interface FormColumn {
        span?: number; // 栅格布局,表单元素占几行
        el?: 'input' | 'number' | 'select' | 'checkbox' | 'checkboxGroup' | 'radioGroup' | 'switch' | 'date' | 'text'; // 自定义的组件属性，用来渲染对应的表单元素
        defaultValue?: any; // 默认值
        slot?: boolean; // 使用插槽
        render?: () => any; // 使用render函数
        methods?: {
            onBlur?: (event: FocusEvent) => void;
            onFocus?: (event: FocusEvent) => void;
            onChange?: (value: any) => void;
            onInput?: (value: any) => void;
            onClear?: () => void;
            visibleChange?: (value: boolean) => void;
            removeTag?: (value: any) => void;
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
}
