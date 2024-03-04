import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
import { Message, Modal } from '@arco-design/web-vue'
import axios from 'axios'

export interface HttpResponse<T = unknown> {
  status: number
  msg: string
  code: number
  data: T
}

axios.defaults.baseURL = 'http://jiaying.info:8081'

axios.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  }
)
// add response interceptors
axios.interceptors.response.use(
  (response: any) => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.code !== 304) {
      console.log(res)
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if ([50008, 50012, 50014].includes(res.code) && response.config.url !== '/api/user/info') {
        Modal.error({
          title: 'Confirm logout',
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore()

            await userStore.logout()
            window.location.reload()
          },
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res.data
  },
  (error) => {
    Message.error({
      content: error.msg,
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)
