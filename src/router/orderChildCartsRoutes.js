export const orderChildCartsRoutes = {
    path: 'carts',
    component: () => import('@/views/orders/carts/Carts'),
    children: [
        {
            path: '',
            name: 'carts',
            redirect: '/orders/carts/current-cart'
        },
        {
            path: 'current-cart',
            name: 'current-cart',
            component: () => import('@/views/orders/carts/CurrentCart')
        },
        {
            path: 'bought-carts',
            name: 'bought-carts',
            component: () => import('@/views/orders/carts/BoughtCarts')
        },
        {
            path: 'pending-carts',
            name: 'pending-carts',
            component: () => import('@/views/orders/carts/PendingCarts')
        },
        {
            path: 'bought-carts/:id/details',
            name: 'cart-details',
            component: () => import('@/views/orders/carts/CartDetails')
        }
    ]
};
