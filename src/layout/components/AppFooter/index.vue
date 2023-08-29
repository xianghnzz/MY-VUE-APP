<script setup lang="ts"></script>
<template>
    <el-footer class="c-app-footer">
        <el-link
            type="default"
            href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
            class="c-app-footer__link"
            >苏ICP备14048805号-1</el-link
        >
        <el-link
            type="default"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002001401"
            class="c-app-footer__link"
            >苏公网安备32059002001401号</el-link
        >
        <el-link
            type="default"
            href="https://static1.adidas.com.cn/ecp-member/cdn-image/right/aSports_business_license.png"
            class="c-app-footer__link"
            >营业执照</el-link
        >
    </el-footer>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.c-app-footer {
    height: var(--plm-footer-height);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    background-color: #e9e9eb;

    &__link {
        font-size: 12px;
        transform: scale(0.88);
        color: #b1b3b8;

        &:nth-child(2) {
            margin: 0 30px;
        }
    }
}
</style>
