import axios from 'axios'

export function uploadFile(data: FormData) {
  return axios.post('/api/file/upload', data)
}

export function downloadFile() {
  return false
}
