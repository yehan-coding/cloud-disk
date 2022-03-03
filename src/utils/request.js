import axios from 'axios'
import { localStore } from '@/utils/StoreUtils'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = localStore.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('request', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { status, data } = response
    console.log(response)
    if (status === 200)
    return data
  },
  error => {
    const { message } = error
    if (message.includes('403')) {
      localStore.removeItem('token')
      localStore.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default service
