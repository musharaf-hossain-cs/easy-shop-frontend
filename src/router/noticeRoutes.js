export const noticeRoutes = {
    path: '/notices',
    component: () => import('@/views/notices/Notices'),
    children: [
        {
            path: '',
            name: 'Notice',
            component: () => import('@/views/notices/NoticeHome')
        }

    ]
};
