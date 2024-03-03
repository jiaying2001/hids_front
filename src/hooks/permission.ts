import { useUserStore } from '@/store'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth || !route.meta?.roles || route.meta?.roles?.includes('*') || userStore.role.some(str => route.meta?.roles?.includes(str))
      )
    },
    findFirstPermissionRoute(_routers: any, role = ['visitor']) {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.some(str => role.includes(str))
          })
        )
          return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    },
    // You can add any rules you want
  }
}
