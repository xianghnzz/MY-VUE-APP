import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
/**常驻路由 */
const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/index.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            svgIcon: 'home',
            alwaysShow: false
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/view/dashboard/index.vue'),
                meta: {
                    svgIcon: 'home'
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'UserManagement',
        component: Layout,
        meta: {
            alwaysShow: false
        },
        children: [
            {
                path: '',
                name: 'User',
                component: () => import('@/view/user/index.vue')
            }
        ]
    },
    {
        path: '/role',
        name: 'RoleManagement',
        component: Layout,
        meta: {
            alwaysShow: false
        },
        children: [
            {
                path: '',
                name: 'Role',
                component: () => import('@/view/role/index.vue')
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
});
export default router;
