import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        meta: {
            svgIcon: 'home',
            alwaysShow: false
        }
    },
    {
        path: '/login',
        component: () => import('@/view/login/index.vue')
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
});
export default router;
