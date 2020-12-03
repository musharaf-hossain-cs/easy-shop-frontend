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
            path: '*',
            redirect: '/orders'
        }
    ]
};
