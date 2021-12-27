import request from '@/utils/request'
import { localStore } from '@/utils/StoreUtils.js'

// 获取文件/文件夹列表
export const getFileList = (data = {}) => {
  const { bucketName } = localStore.getItem('user')
  return request({
    url: '/files/list',
    method: 'GET',
    params: {
      ...data,
      bucketName: bucketName || ''
    }
  })
}
  

// 用户登录
export const login = (data = {}) => {
  return request({
    url: '/user/login',
    method: 'GET',
    params: data
  })
}

// 获取用户信息
export const info = (data = {}) => {
  return request({
    url: '/user/info',
    method: 'GET',
    params: data
  })
}
