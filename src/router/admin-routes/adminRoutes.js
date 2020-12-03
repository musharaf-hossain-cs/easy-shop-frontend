import {adminProductRoutes} from "@/router/admin-routes/adminProductsRoutes";
import {dashboard, redirect, root, security} from "@/router/admin-routes/adminChildRoutes";
import {adminEmployeeRoutes} from "@/router/admin-routes/adminEmployeeRoute";

export const adminRoutes = {
    path: '/admin',
    component: () => import('@/views/admin/Admin'),
    children:[
        root,
        adminProductRoutes,
        adminEmployeeRoutes,
        dashboard,
        security,
        redirect
    ]
}


