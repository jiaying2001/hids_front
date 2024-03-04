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
    {
      name: 'track',
      path: '/track',
      component: () => import('@/views/function/tracking/index.vue'),
      meta: {
        locale: 'menu.track',
      },
    },
  ],
}
