import { UserState } from '@/store/modules/user/types'
import axios from 'axios'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  code: number
  message: string
  data: string
}

export interface UserInfoResponse {
  code: number
  message: string
  data: UserState
}

export interface RoleResponse {
  code: number
  message: string
  data: []
}

export function login(data: LoginData) {
  return axios.post<string>('/api/user/login', data)
}

export function logout() {
  return axios.post('/api/user/logout')
}

export function getUserInfo() {
  return axios.get<UserState>('/api/user/info')
}

export function getRole() {
  return axios.get<[]>('/api/user/role')
}
