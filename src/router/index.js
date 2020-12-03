import Vue from 'vue'
import VueRouter from 'vue-router'

import {authRoutes} from '@/router/authRoute';
import {adminRoutes} from "@/router/admin-routes/adminRoutes";
import {root, redirect, alreadySignedIn} from "@/router/OtherRoutes";
import {noticeRoutes} from "@/router/noticeRoutes";
import {customersRoutes} from "@/router/customersRoutes";
import {employeesRoutes} from "@/router/employeesRoutes";
import {notAdminRoute} from "@/router/admin-routes/notAdminRoute";
import {homeRoutes} from "@/router/homeRoutes";
import {ordersRoutes} from "@/router/ordersRoutes";

Vue.use(VueRouter)

const routes = [
    authRoutes,
    notAdminRoute,
    adminRoutes,
    noticeRoutes,
    customersRoutes,
    employeesRoutes,
    ordersRoutes,
    homeRoutes,
    root,
    alreadySignedIn,
    redirect
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
