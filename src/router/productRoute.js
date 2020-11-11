export const productRoutes = {
    path: '/products',
    component: () => import('../views/products/Products'),
    children: [
        {
            path: '',
            name: 'products',
            component: () => import('../views/products/ProductHome')
        },
        {
            path: 'insert',
            name: 'insert-product',
            component: () => import('../views/products/InsertProduct')
        }

    ]
};
