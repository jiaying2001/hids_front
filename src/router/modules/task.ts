export default {
  name: 'task',
  path: '/task',
  component: () => import('@/views/task/index.vue'),
  meta: {
    locale: 'menu.task',
    icon: 'icon-select-all'
  },
  children: [
    {
      name: 'online-training-task',
      path: '/online-training-task',
      component: () => import('@/views/task/online-training/index.vue'),
      meta: {
        locale: 'menu.task.online-training',
      },
    },
  ],
}
