import { LoginData, getRole, getUserInfo, login as userLogin, logout as userLogout } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const res = await getUserInfo()
      const role = await getRole()
      res.role = role
      this.setInfo(res)
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res)
      } catch (err) {
        clearToken()
        throw err
      }
    },

    // Logout
    async logout() {
      await userLogout()

      this.resetInfo()
      clearToken()
    },
  },
})

export default useUserStore
