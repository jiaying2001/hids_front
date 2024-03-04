export default {
  name: 'configuration',
  path: '/configuration',
  component: () => import('@/views/configuration/index.vue'),
  meta: {
    locale: 'menu.configuration',
    requiresAuth: true,
    icon: 'icon-settings',
  },
  children: [
    {
      name: 'ids',
      path: '/ids',
      component: () => import('@/views/configuration/ids/index.vue'),
      meta: {
        locale: 'menu.ids',
      },
    },
    {
      name: 'notification',
      path: '/notification',
      component: () => import('@/views/configuration/notification/index.vue'),
      meta: {
        locale: 'menu.notification',
      },
    },
  ],
}
