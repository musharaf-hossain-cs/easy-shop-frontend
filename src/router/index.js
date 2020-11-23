import Vue from 'vue'
import VueRouter from 'vue-router'

import {authRoutes} from '@/router/authRoute';
import {productRoutes} from "@/router/productRoute";
import {adminRoutes} from "@/router/admin-routes/adminRoutes";
import {root, home, redirect} from "@/router/homeRoutes";

Vue.use(VueRouter)

const routes = [
    authRoutes,
    adminRoutes,
    productRoutes,
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
