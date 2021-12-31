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

// 上传文件
export const uploadFile = (data = {}, fn) => {
  const { bucketName } = localStore.getItem('user')
  data.append('bucketName', bucketName || '')
  return request({
    timeout: 9999999999,
    url: '/files/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress: function (e) {
      fn(e)
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
