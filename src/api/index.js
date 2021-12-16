import request from '@/utils/request'

// 获取文件/文件夹列表
export const getFileList = (data = {}) =>
  request({
    url: '/files/list',
    method: 'GET',
    params: data
  })

// 用户登录
export const login = (data = {}) =>
  request({
    url: '/user/login',
    method: 'GET',
    params: data
  })
