export const employeesRoutes = {
    path: '/employees',
    component: () => import('../views/employees/Employees'),
    children: [
        {
            path: '',
            name: 'employee-home',
            redirect: '/employees/profile/dashboard'
        },
        {
            path: 'profile',
            redirect: '/employees/profile/dashboard'
        },
        {
            path: 'profile/dashboard',
            name: 'employee-dashboard',
            component: () => import('@/views/employees/dashboard/Dashboard')
        },
        {
            path: 'profile/history',
            name: 'employee-history',
            component: () => import('@/views/employees/History')
        },
        {
            path: 'profile/edit',
            name: 'employee-edit',
            component: () => import('@/views/employees/EmployeeEdit')
        },
        {
            path: 'profile/live-status',
            name: 'employee-live-status',
            component: () => import('@/views/employees/LiveStatus')
        },
        {
            path: 'profile/security',
            name: 'employee-security',
            component: () => import('@/views/employees/security/Security')
        },
        {
            path: '*',
            redirect: '/employees'
        }
    ]
};
