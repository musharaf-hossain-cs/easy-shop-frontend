export const adminEmployeeRoutes = {
    path: 'employees',
    component: () => import('../../views/admin/employees/Employees'),
    children: [
        {
            path: '',
            name: 'employees-admin',
            component: () => import('../../views/admin/employees/EmployeesHome')
        },
        {
            path: 'recruit',
            name: 'recruit-employee',
            component: () => import('../../views/admin/employees/RecruitEmployee')
        },
        {
            path: '*',
            redirect: '/admin/employees'
        }
    ]
};
