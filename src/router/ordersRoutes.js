import {orderChildCartsRoutes} from "@/router/orderChildCartsRoutes";

export const ordersRoutes = {
    path: '/orders',
    component: () => import('@/views/orders/Orders'),
    children: [
        {
            path: '',
            name: 'orders-home',
            redirect: '/orders/carts/current-cart'
        },
        orderChildCartsRoutes,
        {
            path: 'checkout/:id',
            name: 'checkout',
            component: () => import('@/views/orders/Checkout')
        },
        {
            path: 'order/:id/details',
            name: 'order-details',
            component: () => import('@/views/orders/OrderDetails')
        },
        {
            path: '*',
            redirect: '/orders'
        }
    ]
};
