<script setup lang="ts">
import { themeConfig } from '@/config';
import { useI18n } from 'vue-i18n';
import { useAppStoreHook } from '@/store/app';

const appStore = useAppStoreHook();
const { messages, locale }: any = useI18n();
const localeLang: Ref = ref(messages[themeConfig.value.globalI18n]);
/**切换语言 */
const changeLanguage = () => {
    locale.value = appStore.language;
    localeLang.value = messages.value[locale.value];
};
watchEffect(changeLanguage);
</script>

<template>
    <el-config-provider
        size="default"
        :z-index="10"
        :locale="localeLang"
    >
        <router-view />
    </el-config-provider>
</template>

<style lang="scss" scoped></style>
