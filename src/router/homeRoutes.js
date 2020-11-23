
export const root = {
    path: '/',
    name: '/',
    component: () => import('../views/Home')
};
export const home = {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home')
};

export const redirect = {
    path: '*',
    redirect: 'home'
};
