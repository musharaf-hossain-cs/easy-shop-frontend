export const root = {
    path: '',
    name: 'admin',
    component: () => import('../../views/admin/AdminHome')
};
export const noAdmin = {
    path: 'notAdmin',
    name: 'notAdmin',
    component: () => import('../../views/admin/NotAdmin')
};
export const redirect = {
    path: '*',
    redirect: '/admin'
};
