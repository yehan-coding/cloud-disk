import request from '@/utils/request'

export const getFileList = (data = {}) =>
  request({
    url: '/files/list',
    method: 'GET',
    params: data
  })
