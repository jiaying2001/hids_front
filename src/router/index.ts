import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory, LocationQueryRaw } from 'vue-router'

import usePermission from '@/hooks/permission'
import PageLayout from '@/layout/page-layout.vue'
import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'
import AddHarvester from '@/views/add-harvester/index.vue'
import DeleteHarvester from '@/views/delete-harvester/index.vue'
import appRoutes from './modules'
import Login from './modules/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    Login,
    {
      name: 'root',
      path: '/',
      component: PageLayout,
      children: appRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
    {
      name: 'harvester',
      path: '/harvester',
      component: PageLayout,
      children: [
        {
          name: 'add',
          path: 'add',
          component: AddHarvester,
        },
        {
          name: 'delete',
          path: 'delete',
          component: DeleteHarvester,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  next()
  NProgress.start()
  const userStore = useUserStore()
  async function crossroads() {
    // At this stage, users should have logged in and have their roles granted
    const Permission = usePermission()
    if (Permission.accessRouter(to)) await next()
    else {
      const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || {
        name: 'notFound',
      }
      await next(destination)
    }
    NProgress.done()
  }
  if (isLogin()) {
    // Check it token exists
    if (userStore.role.length !== 0) {
      //
      crossroads()
    } else {
      try {
        await userStore.info()
        crossroads()
      } catch (error) {
        next({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        })
        NProgress.done()
      }
    }
  } else {
    //  No token found -> direct to login page
    if (to.name === 'login') {
      next()
      NProgress.done()
      return
    }
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    })
    NProgress.done()
  }
})

export default router
