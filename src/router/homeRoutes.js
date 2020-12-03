export const homeRoutes = {
    path: '/home',
    component: () => import('@/views/home/Home'),
    children: [
        {
            path: '',
            name: 'Home',
            component: () => import('@/views/home/AllProducts')
        },
        {
            path: 'all',
            name: 'all-products',
            component: () => import('@/views/home/AllProducts')
        },
        {
            path: 'category-view',
            name: 'category-view',
            component: () => import('@/views/home/CategoryView')
        },
        {
            path: 'search-products',
            name: 'search-products',
            component: () => import('@/views/home/SearchProducts')
        },
        {
            path: 'products/product/:id/details',
            name: 'product-details-home',
            component: () => import('@/views/home/ProductDetails')
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
};
