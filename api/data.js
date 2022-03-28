//接口请求

//引入封装的axios工具类
import axios from './axios.js'

export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',  //接口地址
    method: 'post',
    data: param
  })
}
export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}
export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
