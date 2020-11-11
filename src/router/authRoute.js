export const authRoutes = {
    path: '/auth',
    component: () => import('../views/auth/Auth'),
    children: [
        {
            path: '',
            name: 'Auth',
            component: () => import('../views/auth/AuthHome')
        },
        {
            path: 'signin',
            name: 'SignIn',
            component: () => import('../views/auth/SignIn')
        },
        {
            path: 'signup',
            name: 'SignUp',
            component: () => import('../views/auth/SignUp')
        }

    ]
};

