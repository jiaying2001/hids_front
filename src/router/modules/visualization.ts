export default {
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    locale: 'menu.visualization',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      name: 'typology',
      path: 'typology',
      component: () => import('@/views/visualization/typology/index.vue'),
      meta: {
        locale: 'menu.visualization.typology',
        requiresAuth: true,
      },
    },
  ],
}
//
// children: [
//   {
//     path: 'data-analysis',
//     name: 'dataAnalysis',
//     component: () => import('@/views/v/data-analysis/index.vue'),
//     meta: {
//       locale: 'menu.visualization.dataAnalysis',
//       requiresAuth: true,
//       roles: ['admin'],
//     },
//   },
//   {
//     path: 'multi-dimension-data-analysis',
//     name: 'multiDimensionDataAnalysis',
//     component: () => import('@/views/v/multi-dimension-data-analysis/index.vue'),
//     meta: {
//       locale: 'menu.visualization.multiDimensionDataAnalysis',
//       requiresAuth: true,
//       roles: ['admin'],
//     },
//   },
// ],
