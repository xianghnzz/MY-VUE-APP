import { createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/layout/test.vue');
// import type { RouteRecordRaw } from 'vue-router';
const constantRoutes = [
    {
        path: '/',
        component: Layout,
        meta: {
            svgIcon: 'home',
            alwaysShow: false
        },
        children: []
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
});
export default router;
