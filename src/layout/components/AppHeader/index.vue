<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { useAppStoreHook } from '@/store/app';
import { i18n } from '@/i18n';
import { login } from '@/api';
import {
    getUserName,
    getInternal,
    getOnlyOneSystem
} from '@/utils/cache/sessionStorage';
import { useUserStoreHook } from '@/store/user';
import { validPwd } from '@/utils/validate';
import { getLanguage } from '@/utils/cache/localStorage';
import { encryption } from '@/utils/secure';

const appStore = useAppStoreHook();
const userStore = useUserStoreHook();
const t = i18n.global.t;
const { proxy } = getCurrentInstance() as any;

const modal = reactive({
    showModal: false,
    title: 'plm.login.changePassword',
    hideClose: false
});
const refPassword: Ref = ref<FormInstance>();
const changePasswordForm = reactive<Form>({
    config: [
        {
            label: 'plm.login.oldPassword',
            placeholder: 'plm.common.pleaseInput',
            prop: 'oldPassword',
            type: 'password',
            showPassword: true,
            el: 'input',
            span: 24,
            methods: {
                onChange: (val: any) => {
                    if (changePasswordForm.formData.newPassword) {
                        refPassword.value.validateFormItem('newPassword');
                    }
                }
            }
        },
        {
            label: 'plm.login.newPassword',
            placeholder: 'plm.common.pleaseInput',
            prop: 'newPassword',
            el: 'input',
            type: 'password',
            showPassword: true,
            span: 24
        },
        {
            label: 'plm.login.confirmNewPassword',
            placeholder: 'plm.common.pleaseInput',
            prop: 'confirmNewPassword',
            el: 'input',
            type: 'password',
            showPassword: true,
            span: 24
        }
    ],
    formData: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }
});
const checkPassWord = (rule: any, value: any, cb: any) => {
    if (value.length < 9 || !validPwd(value)) {
        return cb(new Error(t('plm.common.changePsw')));
    } else if (value === changePasswordForm.formData.oldPassword) {
        return cb(new Error(t('plm.common.noSame')));
    } else {
        return cb();
    }
};
const checkConfirmPas = (rule: any, value: any, cb: any) => {
    if (value.length < 9 || !validPwd(value)) {
        return cb(new Error(t('plm.common.changePsw')));
    } else if (value !== changePasswordForm.formData.newPassword) {
        return cb(new Error(t('plm.common.same')));
    } else {
        return cb();
    }
};
const rules = reactive({
    oldPassword: () => [
        {
            required: true,
            trigger: 'change',
            message: t('plm.common.pleaseInput')
        }
    ],
    newPassword: () => [
        {
            required: true,
            trigger: 'change',
            message: t('plm.common.pleaseInput')
        },
        { validator: checkPassWord, trigger: 'change' }
    ],
    confirmNewPassword: () => [
        {
            required: true,
            trigger: 'change',
            message: t('plm.common.pleaseInput')
        },
        { validator: checkConfirmPas, trigger: 'change' }
    ]
});
const handleCommand = (command: string) => {
    if (command === 'updatePassword') {
        modal.showModal = true;
    } else if (command === 'logout') {
        userStore.logout(true);
    } else if (command == 'zh-cn' || command == 'en') {
        appStore.toggleLanguage(command);
    }
};

const handleMenu = async (command: string) => {
    const [res, err] = await login.issueBill();
    if (err) {
        if (err.msg) proxy.$message('error', err.msg);
        return false;
    }
    const [success, fail] = await login.setPortalInfo({
        bill: res!.response
    });
    if (fail) {
        proxy.$message('error', fail.msg);
        return false;
    }
    sessionStorage.clear();
    localStorage.clear();
    if (import.meta.env.MODE === 'production') {
        window.open(
            `https://plmportal.adidas.com.cn?system=FRS&bill=${res?.response}&redirectSystemName=${command}`,
            '_self'
        );
    }
    if (import.meta.env.MODE === 'uat') {
        window.open(
            `https://plmportal-uat.adidas.com.cn?system=FRS&bill=${res?.response}&redirectSystemName=${command}`,
            '_self'
        );
    }
    if (
        import.meta.env.MODE === 'staging' ||
        import.meta.env.MODE === 'development'
    ) {
        window.open(
            `https://plmportal-dev.adidas.com.cn?system=FRS&bill=${res?.response}&redirectSystemName=${command}`,
            '_self'
        );
    }
};
const closeModal = () => {
    modal.showModal = false;
    refPassword.value?.resetForm();
};
const handleSubmit = async () => {
    const [success, fail] = await login.getUserInfo();
    if (fail) {
        proxy.$message('error', fail.msg);
        return false;
    }
    const valid = await refPassword.value?.validateForm();
    if (valid) {
        const OldPassword = encryption(changePasswordForm.formData.oldPassword);
        const NewPassword = encryption(changePasswordForm.formData.newPassword);
        appStore.loadingStart();
        const [res, err] = await login.updatePassword({
            OldPassword,
            NewPassword,
            userId: success?.response
        });
        appStore.loadingEnd();
        if (err) {
            if (err.msg) proxy.$message('error', err.msg);
            return false;
        }
        proxy.$message(
            'success',
            getLanguage() === 'en' ? 'Update' : '更新成功'
        );
        closeModal();
    }
};
const otherSystems: Ref = ref([]);
const getOtherSystem = async () => {
    const [res, err] = await login.getOtherSystem();
    if (err) {
        if (err.msg) proxy.$message('error', err.msg);
        return false;
    }
    otherSystems.value = res?.response || [];
};
onBeforeMount(() => {
    getOtherSystem();
});
</script>
<template>
    <div class="c-header">
        <router-link to="/" class="c-header__aside">
            <SvgIcon name="fav" class="c-header__logo" />
            <div class="c-header__title">POS Lifecycle Management</div>
        </router-link>
        <div class="c-header__user">
            <el-dropdown
                trigger="click"
                class="c-header__user__fill"
                v-if="!getOnlyOneSystem()"
            >
                <el-avatar :size="25" color="#003a5a">
                    <SvgIcon name="blod-fill"></SvgIcon>
                </el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.stop="handleMenu('Portal')"
                            >Portal</el-dropdown-item
                        >
                        <el-dropdown-item
                            v-for="(item, index) in otherSystems"
                            :key="index"
                            @click.stop="handleMenu(item)"
                            >{{ item }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown
                trigger="click"
                @command="handleCommand"
                class="c-header__user__filled"
            >
                <span class="el-dropdown-link">
                    <el-avatar :icon="UserFilled" :size="25" color="#003a5a" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="" disabled>{{
                            getUserName()
                        }}</el-dropdown-item>
                        <el-dropdown-item command="zh-cn" divided
                            >简体中文</el-dropdown-item
                        >
                        <el-dropdown-item command="en"
                            >English</el-dropdown-item
                        >
                        <el-dropdown-item
                            command="updatePassword"
                            v-if="!getInternal()"
                        >
                            {{ t('plm.common.editPwd') }}
                        </el-dropdown-item>
                        <el-dropdown-item command="logout">{{
                            t('plm.common.logout')
                        }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- 修改密码弹窗 -->
    <PlmModal :config="modal" @close="closeModal">
        <PlmForm
            :config="changePasswordForm?.config"
            :formData="changePasswordForm?.formData"
            :rules="rules"
            :label-width="getLanguage() === 'en' ? '1.2rem' : '0.7rem'"
            ref="refPassword"
        >
        </PlmForm>
        <template #footer>
            <el-button @click="closeModal" v-if="!modal.hideClose">{{
                t('plm.common.cancel')
            }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{
                t('plm.common.submit')
            }}</el-button>
        </template>
    </PlmModal>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.c-header {
    width: 100%;
    height: var(--plm-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $white;

    &__aside {
        display: flex;
        align-items: center;
        margin-left: $space-7;
        user-select: none;
        cursor: pointer;
    }

    &__logo {
        width: 40px;
        height: auto;
    }

    &__title {
        font-size: $font-24;
        margin-left: $space-10;
    }

    &__user {
        font-size: 0;
        display: flex;
        align-items: center;
        margin-right: $space-30;

        &__fill {
            margin-right: 15px;
            cursor: pointer;
        }

        &__filled {
            cursor: pointer;
        }
    }

    :deep(.el-avatar) {
        background-color: $darker-blue;
    }
}

:deep(.el-dialog) {
    width: 600px;

    .el-dialog__body {
        padding-right: 55px;
    }
}

.tips_dialog {
    :deep(.el-dialog) {
        width: 800px;
    }

    .show_img {
        height: 430px;
        padding: 15px;
        background: #f5f6f7;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

:deep(.el-dropdown-menu__item.is-disabled) {
    cursor: default;
    color: #606266;
}
</style>
