export const adminEmployeeRoutes = {
    path: 'employees',
    component: () => import('@/views/admin/employees/Employees'),
    children: [
        {
            path: '',
            name: 'employees-admin',
            redirect: '/admin/employees/employee-list'
        },
        {
            path: 'recruit',
            name: 'recruit-employee',
            component: () => import('@/views/admin/employees/RecruitEmployee')
        },
        {
            path: 'employee-list',
            name: 'employee-list',
            component: () => import('@/views/admin/employees/EmployeeList')
        },
        {
            path: 'requests',
            name: 'employee-requests',
            component: () => import('@/views/admin/employees/EmployeeRequests')
        },
        {
            path: 'requests/:id/process',
            name: 'request-process',
            component: () => import('@/views/admin/employees/ProcessRequest')
        },
        {
            path: 'employee/:id/details',
            name: 'employee-details',
            component: () => import('@/views/admin/employees/EmployeeDetails')
        },
        {
            path: '*',
            redirect: '/admin/employees'
        }
    ]
};
