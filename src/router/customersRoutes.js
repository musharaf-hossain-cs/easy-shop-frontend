export const customersRoutes = {
    path: '/customers',
    component: () => import('../views/customers/Customers'),
    children: [
        {
            path: '',
            name: 'customer-home',
            redirect: '/customers/profile/dashboard'
        },
        {
          path: 'profile',
          redirect: '/customers/profile/dashboard'
        },
        {
            path: 'profile/dashboard',
            name: 'customer-dashboard',
            component: () => import('@/views/customers/dashboard/Dashboard')
        },
        {
            path: 'profile/history',
            name: 'customer-history',
            component: () => import('@/views/customers/OrderHistory')
        },
        {
            path: 'profile/edit',
            name: 'customer-edit',
            component: () => import('@/views/customers/CustomerEdit')
        },
        {
            path: 'profile/live-status',
            name: 'customer-live-status',
            component: () => import('@/views/customers/LiveStatus')
        },
        {
            path: 'profile/security',
            name: 'customer-security',
            component: () => import('@/views/customers/security/Security')
        },
        {
            path: '*',
            redirect: '/customers'
        }
    ]
};
