<script setup lang="ts"></script>
<template>
    <div class="c-app-footer">
        <el-link
            href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
            class="c-app-footer__link"
            >苏ICP备14048805号-1</el-link
        >

        <el-link
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002001401"
            class="c-app-footer__link"
            >苏公网安备32059002001401号</el-link
        >

        <el-link
            href="https://static1.adidas.com.cn/ecp-member/cdn-image/right/aSports_business_license.png"
            class="c-app-footer__link"
            >营业执照</el-link
        >
    </div>
</template>
<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.c-app-footer {
    height: var(--plm-footer-height);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $mini;
    background-color: $info-light-8;
    gap: 0 $space-xx-big;

    &__link {
        font-size: $mini;
        transform: scale(0.88);
        color: $info-light-3;
    }
}
</style>
