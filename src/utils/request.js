import axios from 'axios'
import { userInfoStore } from '../../src/store/userinfo';
import { BASE_URL } from "../../src/api/config"
const request = axios.create({
  baseURL: BASE_URL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log(config)
  const userinfo = userInfoStore().getUserInfo();
  // 统一设置用户身份 token
  // let token = userinfo.token ;
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  if(config["Authorization"]){
    config.headers["Authorization"] = config["Authorization"];
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 相应拦截器
request.interceptors.response.use(function (response) {
  // 统一设置接口相应错误, 比如 token 过期失效, 服务端异常
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
