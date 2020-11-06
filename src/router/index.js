import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/auth',
    component: () => import('../views/auth/Auth'),
    children: [
      {
        path: '',
        name: 'Auth',
        component: () => import('../views/auth/AuthHome')
      },
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import('../views/auth/SignIn')
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('../views/auth/SignUp')
      }

    ]
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
