/**
 * 公共基础请求模块
 */

import request from '@/utils/request'

export const getLoginInfo = (data) => {
  return request({
    method: 'POST',
	data:data,
    url: '/md/api/task/list'
  })
}
export const getFieldJob = (data) => {
  return request({
    method: 'GET',
    url: '/md/api/field-job?id='+data
  })
}

export const addFieldJob = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/field-job'
  })
}


//获取问题提报列表
export const getServiceCaseList = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-case/list',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//创建/更新问题提报
export const createServiceCase = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-case',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//获取问题提报详情
export const getServiceCaseItem = (data) => {
  return request({
    method: 'GET',
    url: `/md/api/service-case?id=${data.id}&neoid=${data.neoid}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


//获取订单列表
export const getOrderList = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/order/list',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

