import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
/**常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
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
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'UserManagement',
        component: Layout,
        meta: {
            alwaysShow: false,
            svgIcon: 'system',
            title: '用户管理'
        },
        children: [
            {
                path: '',
                name: 'User',
                component: () => import('@/view/user/index.vue'),
                meta: {
                    title: '用户管理'
                }
            }
        ]
    },
    {
        path: '/role',
        name: 'RoleManagement',
        component: Layout,
        meta: {
            alwaysShow: false,
            svgIcon: 'store',
            title: '角色管理'
        },
        children: [
            {
                path: '',
                name: 'Role',
                component: () => import('@/view/role/index.vue'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'portal',
                name: 'Portal',
                component: () => import('@/view/role/portal.vue'),
                meta: {
                    title: 'Portal角色管理'
                }
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
});
export default router;
