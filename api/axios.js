import axios from 'axios'
import config from '../config'

//通过当前环境的判断改变请求的地址

//对环境变量进行判断 开发环境还是生产环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// axios二次封装
//创建axios工具类
class HttpRequest {
  constructor(baseUrl) {
    //初始化
    this.baseUrl = baseUrl
  }
  //定义axios相关配置
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }
  //拦截器 instance是axios的实例
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      console.log(error, 'error');

      return Promise.reject(error);
    });

    //添加响应拦截器
    instance.interceptors.response.use(function (response) {
      console.log(response, 'response');
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
  request(options) {
    const instance = axios.create()
    options = { ...this.getInsideConfig(), ...options }
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)