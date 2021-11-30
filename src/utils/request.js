import axios from 'axios'

const bucketName = 'yehan'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const { params, data, method } = config
    if (method.toLocaleLowerCase() === 'get') {
      config.params = { ...params, bucketName }
    } else if (method.toLocaleLowerCase() === 'post') {
      config.data = { ...data, bucketName }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { status, data } = response
    if (status === 200)
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
