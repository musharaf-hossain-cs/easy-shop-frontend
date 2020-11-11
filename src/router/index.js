import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import {authRoutes} from '../router/authRoute';
import {productRoutes} from "@/router/productRoute";

Vue.use(VueRouter)

const routes = [
    authRoutes,
    productRoutes,
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
