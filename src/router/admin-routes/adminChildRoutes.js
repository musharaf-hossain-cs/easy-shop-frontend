export const root = {
    path: '',
    name: 'admin',
    component: () => import('../../views/admin/dashboard/AdminDashboard')
};
export const dashboard = {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/dashboard/AdminDashboard')
};
export const security = {
    path: 'security',
    name: 'AdminSecurity',
    component: () => import('@/views/admin/security/Security')
};
export const redirect = {
    path: '*',
    redirect: '/admin'
};
