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

export const updateTask= (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/task/update'
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

//获取问题提报分页
export const getServiceCasePage = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-case/page',
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

//获取订单分页列表
export const getOrderListByPage = (data) => {
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/order/page',
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

//根据id获取订单
export const getOrderListById = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/order?id='+data
  })
}

//根据NeoId获取订单
export const getOrderListByNeoId = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/order?neoid='+data
  })
}

export const getPickList = (apiName)=>{
  return request({
    method: 'GET',
    url: '/md/api/common/pick-list?apiName='+apiName
  })
}

//获取用户列表
export const getExternalUser = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/admin/external-user/list'
  })
}

//获取售后工单分页数据
export const getServiceticketPage = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-ticket/page'
  })
}
//获取售后工单byId
export const getServiceticketById = (data)=>{
  return request({
    method: 'GET',
    url: '/md/api/service-ticket?id='+data
  })
}
//获取售后工单列表
export const getServiceticketList = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-ticket/list'
  })
}

//获取创建或者更新售后工单
export const updateOrCreateServiceticket = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/service-ticket'
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
    url: '/md/api/admin/external-user/page'
  })
}

export const addExternalUser = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/admin/external-user'
  })
}


export const updateOrderData = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: '/md/api/order/delivery-info'
  })
}

export const getTicketSolutionByTicketId = (data)=>{
    return request({
      method: 'GET',
      url: '/md/api/ticket-solution?ticketId='+data
    })
}

export const sendCode = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: 'md/api/common/captcha'
  })
}

export const login = (data)=>{
  return request({
    method: 'POST',
    data:data,
    url: 'md/api/auth/login/phone'
  })
}

export const wecom = (data) =>{
  return request({
    method: 'POST',
    data:data,
    url: 'md/api/auth/login/wecom'
  })
}