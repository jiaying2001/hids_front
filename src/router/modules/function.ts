export default {
  path: '/function',
  name: 'function',
  component: () => import('@/views/function/index.vue'),
  meta: {
    title: '',
    requiresAuth: false,
    icon: 'icon-apps',
    locale: 'function.name',
  },
  children: [
    {
      path: '/online-training',
      name: 'online-training',
      component: () => import('@/views/function/online-training/index.vue'),
      meta: {
        requiresAuth: false,
        icon: 'icon-upload',
        locale: 'online.training',
      },
    },
  ],
}
