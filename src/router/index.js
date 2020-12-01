import Vue from 'vue'
import VueRouter from 'vue-router'

import {authRoutes} from '@/router/authRoute';
import {productRoutes} from "@/router/productsRoutes";
import {adminRoutes} from "@/router/admin-routes/adminRoutes";
import {root, home, redirect} from "@/router/homeRoutes";
import {noticeRoutes} from "@/router/noticeRoutes";
import {customersRoutes} from "@/router/customersRoutes";
import {employeesRoutes} from "@/router/employeesRoutes";
import {notAdminRoute} from "@/router/admin-routes/notAdminRoute";

Vue.use(VueRouter)

const routes = [
    authRoutes,
    notAdminRoute,
    adminRoutes,
    productRoutes,
    noticeRoutes,
    customersRoutes,
    employeesRoutes,
    root,
    home,
    redirect
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
