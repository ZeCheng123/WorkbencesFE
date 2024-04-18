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

export const getTaskByPage= (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/task/page'
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

export const getFieldJobByPage = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/field-job/page'
  })
}


export const getOrderListById = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/order?id='+data
  })
}

export const getPickList = (apiName)=>{
  return request({
    method: 'GET',
    url: '/md/api/common/pick-list?apiName='+apiName
  })
}

export const getExternalUser = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/admin/external-user/list'
  })
}

export const getServiceticketPage = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-ticket/page'
  })
}

export const getServiceticketById = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/service-ticket?id='+data
  })
}

// 查询售后记录处理详情
export const getTicketSolutionById = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/ticket-solution?id='+data
  })
}


// 查询售后记录处理详情
export const getTicketSolutionByneoID = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/ticket-solution?neoid='+data
  })
}

//获取根据参数派工单列表fieldJobType__c	string派工单类型,appointmentEndTime	string预约结束时间,status	string状态,fieldJobOrderId	integer($int64)订单销售易id
export const getFeildJobList = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/field-job/list'
  })
}

export const getDispatchNoteByGet = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/service-ticket?'+data
  })
}

export const getticketsolution = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/ticket-solution'
  })
}

export const getExternalUserList = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/admin/external-user/list'
  })
}

export const addExternalUser = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/admin/external-user'
  })
}

