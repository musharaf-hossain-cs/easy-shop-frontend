import {adminProductRoutes} from "@/router/admin-routes/adminProductsRoutes";
import {noAdmin, redirect, root} from "@/router/admin-routes/adminChildRoutes";
import {adminEmployeeRoutes} from "@/router/admin-routes/adminEmployeeRoute";

export const adminRoutes = {
    path: '/admin',
    component: () => import('../../views/admin/Admin'),
    children:[
        root,
        noAdmin,
        adminProductRoutes,
        adminEmployeeRoutes,
        {
            path: 'dashboard',
            name: 'AdminDashboard',
            component: () => import('@/views/admin/dashboard/AdminDashboard')
        },
        redirect
    ]
}


