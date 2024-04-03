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
