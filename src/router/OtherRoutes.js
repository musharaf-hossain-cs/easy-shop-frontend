
export const root = {
    path: '/',
    name: '/',
    redirect: '/home'
};
export const alreadySignedIn = {
    path: '/already-signed-in',
    name: 'already-signed-in',
    component: () => import('@/views/auth/AlreadySignedIn')
};

export const redirect = {
    path: '*',
    redirect: '/home'
};


