import {adminProductRoutes} from "@/router/admin-routes/adminProductsRoutes";
import {noAdmin, redirect, root} from "@/router/admin-routes/adminChildRoutes";

export const adminRoutes = {
    path: '/admin',
    component: () => import('../../views/admin/Admin'),
    children:[
        root,
        noAdmin,
        adminProductRoutes,
        {
            path: 'dashboard',
            name: 'AdminDashboard',
            component: () => import('@/views/admin/dashboard/AdminDashboard')
        },
        {
            path: 'employees',
            name: 'AdminEmployees',
            component: () => import('@/views/admin/employees/Employees')
        },
        redirect
    ]
}


